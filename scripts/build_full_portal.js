"use strict";
const fs = require("fs");
const path = require("path");
const magis = require("../usr/palm/services/com.webosflux.xuptertv.fidelity.service/magis.js");

const ROOT_DEFS = [
  { key: "masnew_featured", root: "featured", category: "destacado" },
  { key: "masnew_movies", root: "movies", category: "pelicula" },
  { key: "masnew_series", root: "series", category: "serie" },
  { key: "masnew_kids", root: "kids", category: "infantil" },
  { key: "masnew_anime", root: "anime", category: "anime" },
  { key: "masnew_free", root: "free", category: "gratis" }
];

const SEARCH_WORDS = [
  "el", "la", "de", "the", "en", "un", "una", "los", "las", "por",
  "para", "con", "del", "al", "amor", "vida", "noche", "dia", "muerte",
  "mundo", "hombre", "mujer", "casa", "ciudad", "corazon", "tiempo",
  "guerra", "fuego", "rey", "reina", "policia", "perro", "secreto",
  "destino", "camino", "amigo", "sombra", "sangre", "misterio", "ojos",
  "cielo", "tierra", "mar", "viaje", "ultimo", "primero", "juego",
  "2026", "2025", "2024", "spider", "batman", "marvel", "disney", "netflix"
];

function normalizeItem(raw, defaultCat, rowName) {
  if (!raw || !raw.contentId) return null;
  const isTeleplay = raw.programType === "teleplay" || raw.programType === "series" || (raw.volumnCount && parseInt(raw.volumnCount, 10) > 1);
  const kind = isTeleplay ? "serie" : "película";
  const type = isTeleplay ? "teleplay" : "movie";

  let cat = defaultCat || (isTeleplay ? "serie" : "pelicula");
  if (defaultCat && defaultCat !== (isTeleplay ? "serie" : "pelicula")) {
    cat = defaultCat + "," + (isTeleplay ? "serie" : "pelicula");
  }

  // Tags
  let genres = [];
  if (raw.tags) {
    genres = String(raw.tags).split(",").map(t => t.trim()).filter(Boolean);
  }

  // Posters
  let poster = "", landscape = "", backdrop = "";
  if (Array.isArray(raw.posterList)) {
    for (const p of raw.posterList) {
      if (!p || !p.fileUrl) continue;
      if (p.fileType === "icon" && !poster) poster = p.fileUrl.trim();
      if (p.fileType === "poster" && !landscape) landscape = p.fileUrl.trim();
      if (p.fileType === "stage" && !backdrop) backdrop = p.fileUrl.trim();
    }
  }
  if (!poster) poster = landscape || backdrop || (raw.posterUrl ? String(raw.posterUrl).trim() : "");
  if (!landscape) landscape = poster || backdrop;
  if (!backdrop) backdrop = landscape || poster;

  // Year
  let year = "—";
  const rel = raw.releaseTime || raw.releaseDate;
  if (rel && String(rel).length >= 4) {
    year = String(rel).slice(0, 4);
  }

  let score = "—";
  if (raw.score !== undefined && raw.score !== null && String(raw.score).trim() !== "") {
    score = String(raw.score).trim();
  }

  return {
    id: String(raw.contentId).trim(),
    title: String(raw.name || raw.title || "").trim(),
    category: cat,
    kind: kind,
    score: score,
    year: year,
    duration: String(raw.duration || "").trim(),
    genres: genres,
    director: String(raw.director || "").trim(),
    actors: String(raw.actorDisplay || raw.actors || "").trim(),
    synopsis: String(raw.description || raw.synopsis || "").trim(),
    poster: poster,
    landscape: landscape,
    backdrop: backdrop,
    type: type,
    alias: String(raw.alias || "").trim(),
    country: String(raw.originalCountry || raw.country || "").trim(),
    releaseDate: String(raw.releaseTime || raw.releaseDate || "").trim(),
    tagline: String(raw.viewPoint || raw.tagline || "").trim(),
    volumeCount: parseInt(raw.volumnCount || raw.volumeCount, 10) || 0,
    updateCount: parseInt(raw.updateCount, 10) || 0,
    row: rowName ? String(rowName).trim() : "",
    streamUrl: "",
    portal: true
  };
}

async function run() {
  console.log("Iniciando conexión con Magis...");
  await new Promise((resolve, reject) => {
    magis.ensureSession((err, sess) => {
      if (err) return reject(err);
      console.log("Sesión Magis lista. Usuario:", sess.userId);
      resolve();
    });
  });

  const rootsOutput = {};
  const masterMap = new Map();

  // 1. Fetch all roots and shelves
  for (const def of ROOT_DEFS) {
    console.log(`Descargando estantes para raíz ${def.key} (${def.root})...`);
    const res = await new Promise(resolve => {
      magis.call("getNextColumns", { columnCode: def.key, pageNum: 1, pageSize: 60, version: "" }, (err, data) => {
        if (err) {
          console.error(`Error en ${def.key}:`, err.message);
          resolve(null);
        } else {
          resolve(data);
        }
      });
    });

    const shelves = [];
    const rootItems = [];
    if (res && Array.isArray(res.recommendList)) {
      for (const rec of res.recommendList) {
        if (!rec || !rec.name) continue;
        const shelfName = String(rec.name).trim();
        const assetList = rec.assetList || [];
        const shelfItems = [];

        for (const a of assetList) {
          const item = normalizeItem(a, def.category, shelfName);
          if (item) {
            shelfItems.push(item);
            rootItems.push(item);
            if (!masterMap.has(item.id)) {
              masterMap.set(item.id, item);
            } else {
              // Merge categories and tags
              const existing = masterMap.get(item.id);
              if (def.category && !existing.category.includes(def.category)) {
                existing.category += "," + def.category;
              }
              if (shelfName && !existing.row) existing.row = shelfName;
            }
          }
        }

        if (shelfItems.length) {
          shelves.push({
            name: shelfName,
            columnId: rec.columnId,
            code: rec.code,
            items: shelfItems
          });
        }
      }
    }

    rootsOutput[def.key] = {
      name: def.root,
      shelves: shelves,
      items: rootItems
    };
    console.log(`Raíz ${def.key}: ${shelves.length} estantes, ${rootItems.length} títulos.`);
  }

  // 2. Fetch search words to expand catalog
  console.log(`Buscando ${SEARCH_WORDS.length} palabras clave para enriquecer catálogo...`);
  for (let i = 0; i < SEARCH_WORDS.length; i++) {
    const word = SEARCH_WORDS[i];
    await new Promise(resolve => {
      magis.call("v3/searchByName", { value: word, type: "0", columnId: "", filter: "", pageNum: 1, pageSize: 50 }, (err, res) => {
        if (!err && res && Array.isArray(res.searchItemList)) {
          for (const si of res.searchItemList) {
            for (const it of (si.itemList || [])) {
              const item = normalizeItem(it, "", "");
              if (item && !masterMap.has(item.id)) {
                masterMap.set(item.id, item);
              }
            }
          }
        }
        resolve();
      });
    });
    if ((i + 1) % 10 === 0 || i === SEARCH_WORDS.length - 1) {
      console.log(`Palabras completadas: ${i + 1}/${SEARCH_WORDS.length}. Títulos únicos en catálogo: ${masterMap.size}`);
    }
  }

  // 3. Assemble and write portal.js
  const allItems = Array.from(masterMap.values());
  console.log(`\nTOTAL DE TÍTULOS ÚNICOS OBTENIDOS DE MAGIS: ${allItems.length}`);

  const portalPayload = {
    generatedAt: new Date().toISOString(),
    source: "Magis portal full snapshot (live sync ready)",
    roots: rootsOutput,
    items: allItems
  };

  const portalJsPath = path.resolve(__dirname, "../usr/palm/applications/com.webosflux.xuptertv.fidelity/data/portal.js");
  const content = "window.XUPERTV_PORTAL=" + JSON.stringify(portalPayload) + ";\n";
  fs.writeFileSync(portalJsPath, content, "utf8");
  console.log(`Archivo generado exitosamente: ${portalJsPath} (${(content.length / 1024).toFixed(1)} KB)`);
}

run().catch(err => {
  console.error("Error fatal:", err);
  process.exit(1);
});

