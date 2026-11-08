!function () {
  "use strict"; function i() { return !1 } function a() { } function n(e, t, i) { var a = document.createElement(e); return t && (a.className = t), null != i && (a.textContent = i), a } function r(e) { return document.getElementById(e) } function o(e) { for (; e.firstChild;)e.removeChild(e.firstChild) } function l(e, t, i, a, n) { return e.style.position = "absolute", e.style.left = t + "px", e.style.top = i + "px", void 0 !== a && (e.style.width = a + "px"), void 0 !== n && (e.style.height = n + "px"), e } function s(e, t) { for (; e && e !== document;) { if (1 === e.nodeType && e.matches && e.matches(t)) return e; e = e.parentNode } return null } function d(e) { return e < 10 ? "0" + e : "" + e } function c(e) { return (e = String(e).toLowerCase()).normalize && (e = e.normalize("NFD").replace(/[\u0300-\u036f]/g, "")), e } var p = ["Acción", "Drama", "Comedia", "Suspenso", "Aventura", "Animación", "Familiar", "Ciencia ficción"], u = [], f = { Destacado: "destacado", "Película": "pelicula", Serie: "serie", Gratis: "gratis", Infantil: "infantil", UHD: "uhd", Extra: "extra" }; function v(e, t, i) { for (var a = 1; a <= t; a++) { var n = p[(i + a) % p.length], r = p[(i + a + 3) % p.length]; u.push({ id: u.length + 1, title: e + " demo " + d(a), category: f[e] || "", score: (7.9 + (i + a) % 16 / 10).toFixed(1), year: 2018 + (i + a) % 7, duration: 1 + (i + a) % 2 + " h " + (10 + (7 * i + 5 * a) % 45) + " min", genres: n === r ? [n] : [n, r], director: "Director demo " + d(a), actors: "Actor demo " + d(a) + ", Actriz demo " + d(a + 1), synopsis: "Sinopsis de demostración para " + e.toLowerCase() + " demo " + d(a) + '. Este texto sólo existe para comprobar el recorte a dos líneas, el interlineado y la sangría de la etiqueta "Sinopsis :" definidos en activity_voddetails.', kind: e.toLowerCase() }) } } v("Destacado", 5, 1), v("Película", 7, 2), v("Serie", 7, 3), v("Gratis", 5, 4), v("Infantil", 8, 5), v("UHD", 4, 6), v("Extra", 4, 7); var h = window.XUPERTV_API || {}, m = /[?&]service=([^&]+)/.exec(window.location.search || ""); m && (h.devServiceUrl = decodeURIComponent(m[1])); var g = { loading: !1, source: "demo", error: null }, y = { refreshing: !1, lastSync: 0, roots: 0, error: null }, b = ["featured", "movies", "series", "anime", "kids", "free"]; function C(e) { if ("[object Array]" === Object.prototype.toString.call(e)) return e; if (!e) return []; for (var t = ["items", "movies", "results", "recommendList", "movieList", "totalMovieList", "programList", "data"], i = 0; i < t.length; i++) { if ("[object Array]" === Object.prototype.toString.call(e[t[i]])) return e[t[i]]; if (e[t[i]] && "object" == typeof e[t[i]]) { var a = C(e[t[i]]); if (a.length) return a } } return [] } function w(e) { var t = h[e + "Url"]; if (t) return String(t); var i = String(h.baseUrl || "").replace(/\/$/, ""), a = String(h[e + "Path"] || ""); return i && a ? i + ("/" === a.charAt(0) ? a : "/" + a) : "" } function S() { var e = h.session || {}; return { userId: String(e.userId || ""), userToken: String(e.userToken || ""), portalCode: String(e.portalCode || ""), homePageCode: String(e.homePageCode || ""), version: String(e.version || "4.34.4") } } function x() { var e = S(); return !!(e.userId && e.userToken && e.portalCode) } function _(e, t) { var i = S(); return "catalog" === e ? { userId: i.userId, userToken: i.userToken, portalCode: i.portalCode, homePageCode: i.homePageCode, version: i.version } : "search" === e ? { userToken: i.userToken, userId: i.userId, portalCode: i.portalCode, columnId: "", value: t || "", type: "", pageSize: 20, pageNum: 1, filter: "" } : { userToken: i.userToken, userId: i.userId, portalCode: i.portalCode, programId: t } } function L(e) { return e ? (e = String(e), /^https?:\/\//i.test(e) || 0 === e.indexOf("data:") ? e : h.imageBaseUrl ? String(h.imageBaseUrl).replace(/\/$/, "") + "/" + e.replace(/^\//, "") : e) : "" } function k(e, t) { return null == e || "" === e ? t : String(e) } function I(e) { if (!e) return !1; if ("película" === e.kind || "pelicula" === e.kind || "movie" === e.type) return !1; return "teleplay" === e.type || "series" === e.type || "serie" === e.kind || (e.category && -1 !== e.category.indexOf("serie")) || (e.volumeCount && parseInt(e.volumeCount, 10) > 1) || (e.seasons && e.seasons.length > 1) || (e.episodes && e.episodes.length > 1) } function T(e, t) { var i = (e = e || {}).genres || e.genre || []; "string" == typeof i && (i = i.split(",")), "[object Array]" !== Object.prototype.toString.call(i) && (i = []); for (var a = [], n = 0; n < i.length; n++)a.push("string" == typeof i[n] ? i[n] : i[n].name || ""); var r = e.duration || e.runtime || e.runtimeMinutes || ""; "number" == typeof r && (r = Math.floor(r / 60) + " h " + r % 60 + " min"); var o = k(e.type || e.programType, ""), isExpMovie = "movie" === o || "película" === c(k(e.kind || "", "")) || "pelicula" === c(k(e.kind || "", "")), l = !isExpMovie && ("teleplay" === o || "series" === o || "serie" === c(k(e.kind || "", "")) || -1 !== c(k(e.category || "", "")).indexOf("serie") || (e.volumeCount && parseInt(e.volumeCount, 10) > 1) || (e.volumnCount && parseInt(e.volumnCount, 10) > 1) || (e.seasons && e.seasons.length > 1) || (e.episodes && e.episodes.length > 1)); return { id: k(e.id || e.vodId || e.programId || e.program_id || e.tmdb_id, "api-" + t), title: k(e.title || e.name || e.programName || e.programTitle || e.original_title, "Sin título"), category: c(k(e.category || e.section || e.collection || e.homeSection, "")), score: k(e.score || e.vote_average || e.rating || e.movieRate || e.programScore, "—"), year: k(e.year || e.release_year || e.programYear || (e.releaseDate || e.releaseTime || e.release_date || "").slice(0, 4), "—"), duration: k(r, "—"), genres: a.length ? a : ["Sin clasificar"], director: k(e.director, "—"), actors: k(e.actors || e.actorDisplay || e.cast, "—"), synopsis: k(e.synopsis || e.overview || e.description || e.programUpdateContent, "Sin sinopsis disponible."), kind: l ? "serie" : (isExpMovie ? "película" : k(e.kind || e.media_type, "película")), poster: L(e.posterUrl || e.poster_url || e.poster || e.poster_path || e.image || e.imageUrl || e.cover || e.coverUrl || e.programPoster || e.programImage), landscape: L(e.landscapeUrl || e.landscape_url || e.landscape || e.wideImage || e.bannerImage), backdrop: L(e.backdropUrl || e.backdrop_url || e.backdrop || e.backdrop_path), streamUrl: e.streamUrl || e.stream_url || "", type: isExpMovie ? "movie" : (o || (l ? "teleplay" : "movie")), row: k(e.row, ""), alias: k(e.alias, ""), country: k(e.country || e.originalCountry, ""), releaseDate: k(e.releaseDate || e.releaseTime, ""), tagline: k(e.tagline || e.viewPoint, ""), volumeCount: parseInt(e.volumeCount || e.volumnCount, 10) || 0, updateCount: parseInt(e.updateCount, 10) || 0, episodes: e.episodes || [], seasons: e.seasons || [], moreAudio: void 0 !== e.moreAudio ? e.moreAudio : 0, moreSubtitle: void 0 !== e.moreSubtitle ? e.moreSubtitle : 0, _portal: !0 === e.portal || !0 === e._portal || h && "portal" === h.mode && String(e.id || "").length > 10 } } function E(e, t, i) { i = i || {}; var a = new XMLHttpRequest, n = !1, r = parseInt(h.timeoutMs, 10) || 1e4; function o(e, i) { n || (n = !0, t(e, i)) } a.open(i.method || "GET", e, !0), a.timeout = r; var l = h.headers || {}; for (var s in l) Object.prototype.hasOwnProperty.call(l, s) && a.setRequestHeader(s, l[s]); void 0 === i.body || l["Content-Type"] || l["content-type"] || a.setRequestHeader("Content-Type", "application/json;charset=utf-8"), a.onreadystatechange = function () { if (4 === a.readyState) if (a.status < 200 || a.status >= 300) o("HTTP " + a.status); else try { o(null, JSON.parse(a.responseText)) } catch (e) { o("La API no devolvió JSON válido") } }, a.onerror = function () { o("Error de red o CORS") }, a.ontimeout = function () { o("Tiempo de espera agotado") }; try { a.send(void 0 === i.body ? null : JSON.stringify(i.body)) } catch (e) { o(e.message || "No se pudo iniciar la petición") } } function M(e, t, i) { if (!e.length) return !1; for (var a = {}, n = 0; n < u.length; n++)a[String(u[n].id)] = u[n]; u.splice(0, u.length); for (var o = 0; o < e.length; o++) { var l = T(e[o], o + 1); i && !1 !== e[o].portal && (l._portal = !0); var d = a[String(l.id)]; d && (d.episodes && (l.episodes = d.episodes), d.seasons && (l.seasons = d.seasons), d._detailsLoaded && (l._detailsLoaded = !0), !l.streamUrl && d.streamUrl && (l.streamUrl = d.streamUrl)), u.push(l) } if (ke.detail) { for (var c = !1, p = 0; p < u.length; p++)if (String(u[p].id) === String(ke.detail.id)) { ke.detail = u[p], c = !0; break } c || (ke.detail = u[0]) } return g.source = t, g.error = null, function () { if (Ie) { var e = r("home-tabs"), t = !(!e || !e.classList.contains("is-expanded") || e.classList.contains("is-collapsed")), i = !(!ke.focus || void 0 === ke.focus._tab), a = !(!ke.focus || !s(ke.focus, "#home-notify")), n = !(!ke.focus || !s(ke.focus, ".home-page")); if (Te = [], Ee = [], Ke(), Ze(ke.tab, !1), "home" === ke.screen) { if (i && Ee[ke.tab]) Fe(Ee[ke.tab], !0); else if (a) { var o = Be(r("home-notify")); o && Fe(o, !0) } else if (n) { var l = Te[_e[ke.tab].page], d = l ? Be(l) : null; d && Fe(d, !0) } if (t && e) { e.classList.add("is-expanded"), e.classList.remove("is-collapsed"); var c = document.querySelector(".home-sidebar-bg"); c && c.classList.add("is-on") } } } Z && (Bt(), ke.searchQuery && $t()); ke.detail && Pt(ke.detail) }(), !0 } function q(e, t, i) { var a, n = []; if (e) for (a = 0; a < u.length; a++) { -1 !== c(u[a].category || "").split(",").indexOf(e) && n.push(u[a]) } if (n.length || (n = u.slice(i, i + t)), n.length || (n = u.slice(0, t)), n.length < t && u.length) { var r = {}; for (a = 0; a < n.length; a++)r[String(n[a].id)] = !0; for (var o = 0; n.length < t && o < 2 * u.length;) { var l = u[o % u.length]; o++, r[String(l.id)] || (n.push(l), r[String(l.id)] = !0) } } return n } function O() { var e = window.XUPERTV_CATALOG; return e ? C(e) : [] } function A() { return !window.PalmServiceBridge || window.webOS && window.webOS.service || (window.webOS = window.webOS || {}, window.webOS.service = { request: function (e, t) { t = t || {}; var i = new window.PalmServiceBridge; i.onservicecallback = function (e) { var i; try { i = JSON.parse(e) } catch (t) { i = { returnValue: !1, errorText: e } } !1 === i.returnValue ? t.onFailure && t.onFailure(i) : t.onSuccess && t.onSuccess(i) }; var a = t.method ? e.replace(/\/$/, "") + "/" + t.method : e; return i.call(a, JSON.stringify(t.parameters || {})), i } }), !!(window.webOS && window.webOS.service && window.webOS.service.request) } function D(e, t, n) { var r = h.serviceId || "com.webosflux.xuptertv.fidelity.service", o = !1; function l(e, t) { o || (o = !0, n(e, t)) } if (A() && window.PalmServiceBridge) try { return window.webOS.service.request("luna://" + r, { method: e, parameters: t || {}, timeout: parseInt(h.timeoutMs, 10) || 2e4, onSuccess: function (e) { l(null, e) }, onFailure: function (e) { l(e && e.errorText || "Error del servicio Xuper WebOS", null) } }), !0 } catch (e) { if (!h.devServiceUrl) return l("Error comunicando con el servicio: " + (e.message || e), null), !1 } return h.devServiceUrl ? (E(String(h.devServiceUrl).replace(/\/$/, "") + "/" + e + "?" + function (e) { var t = []; for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i])); return t.join("&") }(t || {}), function (e, t) { l(e, t) }, null), !0) : (l("El servicio Xuper WebOS no está disponible", null), !1) } function P(e) { var t = {}, i = [], a = {}; function n(e) { if (e && e.id) { var n = String(e.id); if (t[n]) { var r = t[n]; for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && "" !== e[o] && "—" !== e[o] && null !== e[o] && void 0 !== e[o] && (r[o] = e[o]) } else t[n] = e, i.push(n); var l = String(e.category || "").split(","); a[n] = a[n] || {}; for (var s = 0; s < l.length; s++)l[s] && (a[n][l[s]] = !0) } } for (var r = 0; r < b.length; r++)for (var o = e[b[r]] || [], l = 0; l < o.length; l++)o[l].portal = !0, n(o[l]); if (i.length) { for (var s = [], d = 0; d < i.length; d++) { var c = t[i[d]]; c.category = Object.keys(a[i[d]]).join(","), s.push(c) } for (var p = function () { for (var e = O(), t = [], i = 0; i < e.length; i++)if (e[i] && e[i].streamUrl) { var a = {}; for (var n in e[i]) Object.prototype.hasOwnProperty.call(e[i], n) && (a[n] = e[i][n]); a.category = "demo", a.portal = !1, t.push(a) } return t }(), u = 0; u < p.length; u++)s.push(p[u]); s.length && M(s, "portal", !0) } } function N() { if (!y.refreshing) { y.refreshing = !0, y.error = null; var e = {}, t = 0; !function i() { if (t >= b.length) return y.refreshing = !1, y.lastSync = Date.now(), void P(e); var a = b[t++]; D("home", { root: a }, function (t, n) { !t && n && !1 !== n.returnValue && n.items && n.items.length ? (e[a] = n.items, y.roots++) : t && (y.error = t), i() }) }() } } function R() { var e, t = (e = window.XUPERTV_PORTAL) ? C(e) : []; t.length && M(t, "portal-snapshot", !0), !1 !== h.refresh ? N() : t.length || (g.error = "Sin snapshot del portal") } function U(e, t) { return M(O(), e || "bundled") ? (t && (g.error = t), !0) : (g.error = t || "No hay catálogo local ni remoto", !1) } function F() { if (h.enabled) if ("portal" !== h.mode) if ("static" !== h.mode) { var e = w("catalog"); "xuper" !== h.mode || x() ? e ? (g.loading = !0, E(e, function (e, t) { g.loading = !1; var i = function (e) { if (!e || "object" != typeof e) return ""; var t = e.returnCode || e.code || e.errorCode || "", i = e.errorMessage || e.message || e.msg || ""; return t || i ? (t ? String(t) + ": " : "") + (i ? String(i) : "La API rechazó la petición") : "" }(t); if (e || i || !M(C(t), "api")) { var a = e || i || "La API no devolvió películas"; U("bundled-fallback", a) || (g.error = a) } }, "xuper" === h.mode ? { method: "POST", body: _("catalog") } : null)) : h.useBundledCatalog ? U("bundled", null) : g.error = "Falta baseUrl/catalogUrl del catálogo autorizado" : g.error = "Falta la sesión Xuper WebOS (userId, userToken y portalCode)" } else U("bundled", null); else R() } function B(e, t) { var i = T(t, e.id); for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && "—" !== i[a] && "" !== i[a] && "Sin sinopsis disponible." !== i[a] && (e[a] = i[a]) } function H(e, t) { if (t = t || function () { }, !e) return t(null); if (e._detailsLoaded) return t(e); if (e._detailLoading) return e._detailWait = e._detailWait || [], void e._detailWait.push(t); var isPortal = !0 === e._portal || !0 === e.portal || ("portal" === h.mode && String(e.id || "").length > 15); if (isPortal) return e._portal = !0, e._detailLoading = !0, e._detailWait = [t], void D("detail", { contentId: e.id }, function (t, i) { if (e._detailLoading = !1, !t && i && !1 !== i.returnValue && i.item) { if (B(e, i.item), e.episodes = i.episodes || [], e.seasons = i.seasons || [], e.seasonId || (e.seasonId = e.id), e.seasons && e.seasons.length && e.seasons.sort(function (e, t) { return (parseInt(e.number, 10) || 0) - (parseInt(t.number, 10) || 0) }), (!e.seasons || !e.seasons.length) && I(e)) { var a = 1, n = /S(\d+)/i.exec(e.alias || "") || /T(\d+)/i.exec(e.title || ""); n && (a = parseInt(n[1], 10) || 1), e.seasons = [{ id: e.id, number: a }] } if (e.seasons && e.seasons.length) { for (var r = 0, o = 0; o < e.seasons.length; o++)if (e.seasons[o].id === e.id) { r = o; break } ke.detailSeason = r } e.episodes && e.episodes.length && !ke.detailEpisode && (ke.detailEpisode = e.episodes[0]), e._detailsLoaded = !0 } var l = e._detailWait || []; e._detailWait = []; for (var s = 0; s < l.length; s++)l[s](e); ke.detail === e && "detail" === ke.screen && (Pt(e), pe && (pe.currentSrc || pe.src) && !pe.paused || fn(e, ke.detailEpisode)) }); var i = w("detail"); return h.enabled && i && ("xuper" !== h.mode || x()) ? (e._detailLoading = !0, void E(i.replace("{id}", encodeURIComponent(e.id)), function (i, a) { if (e._detailLoading = !1, !i) { var n = C(a), r = n.length ? n[0] : a && (a.item || a.movie || a); r && "object" == typeof r && (B(e, r), e._detailsLoaded = !0, ke.detail === e && "detail" === ke.screen && (Pt(e), pe && (pe.currentSrc || pe.src) && !pe.paused || fn(e, ke.detailEpisode))) } t(e) }, "xuper" === h.mode ? { method: "POST", body: _("detail", e.id) } : null)) : t(e) } var z = []; !function () { for (var e = ["Canal demo 01", "Canal demo 02", "Canal demo 03", "Canal demo 04", "Canal demo 05", "Canal demo 06", "Canal demo 07", "Canal demo 08", "Canal demo 09", "Canal demo 10", "Canal demo 11", "Canal demo 12"], t = 0; t < e.length; t++)z.push({ index: t + 1, name: e[t], now: "Programa demo " + d(t + 1), next: "Programa demo " + d(t + 2), time: "20:00 - 21:30", fav: t % 3 == 0, uhd: 2 === t || 6 === t }) }(); var V, j, W, $, X, Q, G, J, K, Y, Z, ee, te, ie, ae, ne, re, oe, le, se, de, ce, pe, ue, fe, ve, he, me, ge, ye, be, Ce, we, Se, xe = { tv: '<svg viewBox="0 0 33 33"><rect x="3.5" y="7" width="26" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M11 24.5v3h11v-3" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>', thumb: '<svg viewBox="0 0 33 33"><path d="M12 15.5V28H7.6A2.6 2.6 0 0 1 5 25.4v-7.3a2.6 2.6 0 0 1 2.6-2.6H12z" fill="currentColor"/><path d="M14 15.6l4.3-9.2a2.2 2.2 0 0 1 4 1.6V13h5.6a2.9 2.9 0 0 1 2.8 3.6l-2 9A3.4 3.4 0 0 1 25.4 28H14z" fill="currentColor"/></svg>', film: '<svg viewBox="0 0 33 33"><circle cx="16.5" cy="16.5" r="11.5" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="16.5" cy="16.5" r="2.4" fill="currentColor"/><circle cx="16.5" cy="9.5" r="2.1" fill="currentColor"/><circle cx="16.5" cy="23.5" r="2.1" fill="currentColor"/><circle cx="9.5" cy="16.5" r="2.1" fill="currentColor"/><circle cx="23.5" cy="16.5" r="2.1" fill="currentColor"/></svg>', strip: '<svg viewBox="0 0 33 33"><rect x="4" y="7" width="25" height="19" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M9 7v19M24 7v19" stroke="currentColor" stroke-width="1.8"/><rect x="5.6" y="9" width="2.4" height="2.6" fill="currentColor"/><rect x="5.6" y="15.2" width="2.4" height="2.6" fill="currentColor"/><rect x="5.6" y="21.4" width="2.4" height="2.6" fill="currentColor"/><rect x="25" y="9" width="2.4" height="2.6" fill="currentColor"/><rect x="25" y="15.2" width="2.4" height="2.6" fill="currentColor"/><rect x="25" y="21.4" width="2.4" height="2.6" fill="currentColor"/></svg>', kids: '<svg viewBox="0 0 33 33"><circle cx="8.6" cy="8.6" r="4" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="24.4" cy="8.6" r="4" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="16.5" cy="18" r="9.6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="13" cy="17" r="1.5" fill="currentColor"/><circle cx="20" cy="17" r="1.5" fill="currentColor"/><ellipse cx="16.5" cy="21.6" rx="2.4" ry="1.7" fill="currentColor"/></svg>', anime: '<svg viewBox="0 0 33 33"><circle cx="8.5" cy="9" r="4.5" fill="currentColor"/><circle cx="24.5" cy="9" r="4.5" fill="currentColor"/><path d="M16.5 9c5.8 0 10.5 4.6 10.5 10.3 0 5.7-4.7 9.7-10.5 9.7S6 25 6 19.3C6 13.6 10.7 9 16.5 9z" fill="currentColor"/><circle cx="12.5" cy="18" r="1.6" fill="#0b0b0b"/><circle cx="20.5" cy="18" r="1.6" fill="#0b0b0b"/><ellipse cx="16.5" cy="23" rx="3" ry="2" fill="#0b0b0b"/></svg>', compass: '<svg viewBox="0 0 33 33"><circle cx="16.5" cy="16.5" r="11.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M22 11l-3.2 7.8L11 22l3.2-7.8z" fill="currentColor"/></svg>', sports: '<svg viewBox="0 0 33 33"><circle cx="16.5" cy="16.5" r="11.5" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="16.5,10.5 20.5,13.8 19,19 14,19 12.5,13.8" fill="currentColor"/><path d="M16.5 10.5V5M20.5 13.8L25.5 12M19 19L23 23M14 19L10 23M12.5 13.8L7.5 12" stroke="currentColor" stroke-width="1.8"/></svg>' }, _e = [{ label: "TV", page: 0, icon: "tv" }, { label: "DESTACADO", page: 1, icon: "thumb" }, { label: "PELICULA", page: 2, icon: "film" }, { label: "SERIES", page: 3, icon: "strip" }, { label: "KIDS", page: 4, icon: "kids" }, { label: "ANIME", page: 5, icon: "anime" }, { label: "DEPORTES", page: 6, icon: "sports" }], Le = [{ id: "playback", label: "Reproducción" }, { id: "parent", label: "Control Parental (+18)" }, { id: "history", label: "Historial de vistas" }, { id: "feedback", label: "Ayuda y Feedback" }, { id: "upgrade", label: "Actualización" }, { id: "about", label: "Sobre nosotros" }], ke = { screen: "welcome", tab: 0, channel: 0, focus: null, detail: null, detailReturn: null, detailRange: 0, detailSeason: 0, detailNeedsRebuild: !1, playerReturn: null, playerMode: "live", playerItem: null, playerEpisode: null, playerSeasonIndex: 0, episodeBrowserOpen: !1, browserSeason: 0, streamError: "", streamMode: "normal", trackIndex: 0, channelsOpen: !1, infobar: !0, infoTimer: null, searchQuery: "", searchNumeric: !1, searchSeq: 0, searchFocus: null, playback: { screen: 0, audio: 0, subLang: 0, size: 0, style: 0, subtitle: !0 }, crOn: (function () { try { return localStorage.getItem("xuper_cr_on") === "1"; } catch (e) { return !1; } })(), favs: {} }, Ie = !1, Te = [], Ee = [], Me = [], qe = [], Oe = {}, Ae = [], De = [], Pe = null;
  var xuperActiveProfileId = "p1";
  function getProfileStorageKey(baseKey) {
    var profId = (typeof xuperActiveProfileId === "string" && xuperActiveProfileId) ? xuperActiveProfileId : "p1";
    return baseKey + "_" + profId;
  }

  function saveToHistory(item, episode, currentTime) {
    if (!item || !item.id) return;
    try {
      var key = getProfileStorageKey("xuper_history");
      var hist = JSON.parse(localStorage.getItem(key) || "[]");
      if (!hist.length && xuperActiveProfileId === "p1") {
        try {
          var legacyHist = JSON.parse(localStorage.getItem("xuper_history") || "[]");
          if (legacyHist && legacyHist.length) hist = legacyHist;
        } catch (ex) { }
      }
      var existing = null;
      for (var i = 0; i < hist.length; i++) {
        if (String(hist[i].id) === String(item.id)) { existing = hist[i]; break; }
      }
      hist = hist.filter(function (h) { return String(h.id) !== String(item.id); });
      var finalEp = episode ? { id: episode.id, number: episode.number, title: episode.title } : (existing && existing.episode ? existing.episode : null);
      var finalProgress = (typeof currentTime === "number" && currentTime > 0) ? currentTime : (existing && existing.progress ? existing.progress : 0);
      hist.unshift({
        id: item.id,
        title: item.title || "Sin título",
        poster: item.poster || item.cover || "",
        landscape: item.landscape || item.backdrop || item.poster || "",
        category: item.category || item.kind || "",
        year: item.year || "",
        duration: item.duration || "",
        score: item.score || "",
        synopsis: item.synopsis || "",
        genres: item.genres || [],
        director: item.director || "",
        actors: item.actors || "",
        type: item.type || (I(item) ? "teleplay" : "movie"),
        episodes: item.episodes || [],
        seasons: item.seasons || [],
        episode: finalEp,
        progress: finalProgress,
        viewedAt: Date.now()
      });
      if (hist.length > 60) hist = hist.slice(0, 60);
      localStorage.setItem(key, JSON.stringify(hist));
    } catch (e) { console.error("history save error:", e); }
  }

  function saveVodProgress(item, episode, currentTime, seasonIndex) {
    if (!item || !item.id) return;
    var id = String(item.id);
    var isSer = I(item);
    var curTime = (typeof currentTime === "number" && isFinite(currentTime) && currentTime >= 0) ? currentTime : 0;
    var dur = (pe && pe.duration && isFinite(pe.duration)) ? pe.duration : (item.duration ? parseFloat(item.duration) : 0);
    if (dur > 60 && curTime > dur - 30) { curTime = 0; }
    var key = getProfileStorageKey("xuper_vod_progress");
    var store = {};
    try {
      store = JSON.parse(localStorage.getItem(key) || "{}");
      if (!Object.keys(store).length && xuperActiveProfileId === "p1") {
        var legStore = JSON.parse(localStorage.getItem("xuper_vod_progress") || "{}");
        if (legStore && Object.keys(legStore).length) store = legStore;
      }
    } catch (e) { store = {}; }
    var sIdx = (typeof seasonIndex === "number" && seasonIndex >= 0) ? seasonIndex : (ke.playerSeasonIndex || ke.detailSeason || 0);
    var sObj = (item.seasons && item.seasons[sIdx]) ? item.seasons[sIdx] : null;
    var ep = episode || ke.playerEpisode || ke.detailEpisode || null;
    store[id] = {
      id: id,
      title: item.title || "",
      isSeries: isSer,
      seasonIndex: sIdx,
      seasonNumber: sObj && sObj.number ? sObj.number : (sIdx + 1),
      seasonId: sObj && sObj.id ? sObj.id : (item.seasonId || ""),
      episodeId: ep && ep.id ? ep.id : "",
      episodeNumber: ep && (ep.number || ep.seriesNumber) ? (ep.number || ep.seriesNumber) : 1,
      episodeTitle: ep && (ep.title || ep.name) ? (ep.title || ep.name) : "",
      progress: curTime,
      duration: dur,
      updatedAt: Date.now()
    };
    try { localStorage.setItem(key, JSON.stringify(store)); } catch (e) { }
    saveToHistory(item, ep, curTime);
  }

  function getVodProgress(itemId) {
    if (!itemId) return null;
    var keyProg = getProfileStorageKey("xuper_vod_progress");
    try {
      var store = JSON.parse(localStorage.getItem(keyProg) || "{}");
      if (store && store[String(itemId)]) return store[String(itemId)];
      if (xuperActiveProfileId === "p1") {
        var legStore = JSON.parse(localStorage.getItem("xuper_vod_progress") || "{}");
        if (legStore && legStore[String(itemId)]) return legStore[String(itemId)];
      }
    } catch (e) { }
    var keyHist = getProfileStorageKey("xuper_history");
    try {
      var hist = JSON.parse(localStorage.getItem(keyHist) || "[]");
      if (!hist.length && xuperActiveProfileId === "p1") {
        hist = JSON.parse(localStorage.getItem("xuper_history") || "[]");
      }
      for (var i = 0; i < hist.length; i++) {
        if (String(hist[i].id) === String(itemId)) {
          var h = hist[i];
          return {
            id: String(h.id),
            isSeries: h.type === "teleplay" || (h.episode ? !0 : !1),
            seasonIndex: 0,
            seasonNumber: 1,
            seasonId: "",
            episodeId: h.episode && h.episode.id ? h.episode.id : "",
            episodeNumber: h.episode && h.episode.number ? h.episode.number : 1,
            episodeTitle: h.episode && h.episode.title ? h.episode.title : "",
            progress: h.progress || 0,
            duration: 0,
            updatedAt: h.viewedAt || 0
          };
        }
      }
    } catch (e) { }
    return null;
  }

  function isAdultContent(item) {
    if (!item) return !1;
    var name = String(item.name || item.title || "").toLowerCase();
    var cat = String(item.category || item.genre || item.categoryName || "").toLowerCase();
    var code = String(item.channelCode || item.code || "").toLowerCase();
    var id = item.id || item.categoryId || 0;
    if (id === 76203 || id === 76204 || item.categoryId === 76203 || item.categoryId === 76204) return !0;
    var terms = ["+18", "18+", "xxx", "adult", "adulto", "adultos", "playboy", "venus", "hustler", "penthouse", "brazzers", "dorcel", "sextreme", "hot go", "erotic", "erótico", "erotica", "erótica", "for man", "redlight", "man-x", "private tv", "vivid", "hustler tv", "babes tv", "bangbros"];
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      if (name.indexOf(term) !== -1 || cat.indexOf(term) !== -1 || code.indexOf(term) !== -1) return !0;
    }
    return !1;
  }

  function openSettingsHistory() {
    oe || Gt();
    ze("settings");
    Kt(2, !0);
  }

  var renameModalOpen = !1, renamePrevFocus = null, renameCurrentText = "";
  var xuperProfiles = [];
  var DEFAULT_AVATARS = ["👤", "⭐", "🎬", "🍿", "🎧", "🎮", "📺", "🔥"];
  var PROFILE_COLORS = ["#B8154D", "#0084ff", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

  function saveProfiles() {
    try {
      localStorage.setItem("xuper_profiles_v3", JSON.stringify(xuperProfiles));
      localStorage.setItem("xuper_active_profile_v3", xuperActiveProfileId);
      localStorage.setItem("xuper_profiles", JSON.stringify(xuperProfiles));
      localStorage.setItem("xuper_active_profile", xuperActiveProfileId);
    } catch (e) { console.error("saveProfiles error:", e); }
  }

  function loadProfiles() {
    var loaded = !1;
    try {
      var rawV3 = localStorage.getItem("xuper_profiles_v3");
      if (rawV3) {
        var pV3 = JSON.parse(rawV3);
        if (Array.isArray(pV3) && pV3.length > 0) {
          xuperProfiles = pV3;
          loaded = !0;
        }
      }
    } catch (e) { }

    if (!loaded) {
      try {
        var rawOld = localStorage.getItem("xuper_profiles");
        if (rawOld) {
          var pOld = JSON.parse(rawOld);
          if (Array.isArray(pOld) && pOld.length > 0) {
            if (pOld.length === 2 && pOld[0].name === "Principal" && pOld[1].name === "Familia") {
              xuperProfiles = [
                { id: "p1", name: "Usuario", avatar: "👤", color: "#B8154D", isKids: !1 }
              ];
            } else {
              xuperProfiles = pOld.map(function (item, idx) {
                if (item.name === "Principal") item.name = "Usuario";
                if (!item.id) item.id = "p" + (idx + 1);
                return item;
              });
            }
            loaded = !0;
          }
        }
      } catch (e) { }
    }

    if (!loaded || !xuperProfiles || !xuperProfiles.length) {
      xuperProfiles = [
        { id: "p1", name: "Usuario", avatar: "👤", color: "#B8154D", isKids: !1 }
      ];
    }

    try {
      var actId = localStorage.getItem("xuper_active_profile_v3") || localStorage.getItem("xuper_active_profile");
      if (actId && xuperProfiles.some(function (p) { return p.id === actId; })) {
        xuperActiveProfileId = actId;
      } else {
        xuperActiveProfileId = xuperProfiles[0].id;
      }
    } catch (e) {
      xuperActiveProfileId = xuperProfiles[0].id;
    }

    saveProfiles();
  }

  function getActiveProfile() {
    for (var i = 0; i < xuperProfiles.length; i++) {
      if (xuperProfiles[i].id === xuperActiveProfileId) return xuperProfiles[i];
    }
    return xuperProfiles[0];
  }

  function openRenameModal(act) {
    if (!act) return;
    renameModalOpen = !0;
    renamePrevFocus = ke.focus;
    renameCurrentText = act.name || "Usuario";

    var overlay = r("dialog-profile-rename");
    if (!overlay) return;
    overlay.classList.add("is-active");

    var display = r("dr-input-display");
    if (display) display.textContent = renameCurrentText;

    var kbContainer = r("dr-keyboard");
    if (kbContainer) {
      kbContainer.innerHTML = "";
      var kbRows = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
        ["Z", "X", "C", "V", "B", "N", "M", "ESPACIO", "BORRAR"]
      ];
      for (var ri = 0; ri < kbRows.length; ri++) {
        var rowEl = n("div", "dr-row");
        for (var ci = 0; ci < kbRows[ri].length; ci++) {
          var ch = kbRows[ri][ci];
          var isSpace = "ESPACIO" === ch;
          var isDel = "BORRAR" === ch;
          var key = n("div", "dr-key focusable" + (isSpace ? " space" : (isDel ? " del" : "")), isDel ? "⌫ BORRAR" : (isSpace ? "ESPACIO" : ch));
          key._char = ch;
          (function (cChar, cSpace, cDel) {
            key._activate = function () {
              if (cDel) {
                if (renameCurrentText.length > 0) {
                  renameCurrentText = renameCurrentText.slice(0, -1);
                }
              } else if (cSpace) {
                if (renameCurrentText.length < 16) {
                  renameCurrentText += " ";
                }
              } else {
                if (renameCurrentText.length < 16) {
                  renameCurrentText += cChar;
                }
              }
              if (display) display.textContent = renameCurrentText || " ";
            };
          })(ch, isSpace, isDel);
          rowEl.appendChild(key);
        }
        kbContainer.appendChild(rowEl);
      }
    }

    var saveBtn = r("dr-btn-save");
    if (saveBtn) {
      saveBtn._activate = function () {
        var clean = renameCurrentText.trim();
        if (!clean) clean = "Usuario";
        act.name = clean;
        saveProfiles();
        closeRenameModal();
        cn("Nombre cambiado a " + act.name);
        renderProfilesScreenUI();
        var rBtn = r("ps-btn-rename");
        rBtn && Fe(rBtn);
      };
    }

    var cancelBtn = r("dr-btn-cancel");
    if (cancelBtn) {
      cancelBtn._activate = function () {
        closeRenameModal();
        var rBtn = r("ps-btn-rename");
        rBtn && Fe(rBtn);
      };
    }

    var firstKey = overlay.querySelector(".dr-key.focusable");
    if (firstKey) Fe(firstKey);
  }

  function closeRenameModal() {
    renameModalOpen = !1;
    var overlay = r("dialog-profile-rename");
    if (overlay) overlay.classList.remove("is-active");
    _lastBackTime = Date.now();
    if (renamePrevFocus && Ne(renamePrevFocus)) Fe(renamePrevFocus);
    else Fe(r("ps-btn-rename") || r("ps-cards-row"));
  }

  function _exitApp() {
    _n();
    try { ht(); } catch (e) { }
    try { dn(); } catch (e) { }
    if (window.webOSTV && window.webOSTV.platformBack) {
      try { window.webOSTV.platformBack(); } catch (e) { }
    } else if (window.PalmSystem && window.PalmSystem.platformBack) {
      try { window.PalmSystem.platformBack(); } catch (e) { }
    }
    try { window.close(); } catch (e) { }
  }

  function openProfilesScreen(returnScreen, isInitial) {
    loadProfiles();
    ke.profilesReturnScreen = isInitial ? null : (returnScreen || (ke.screen !== "profiles" ? ke.screen : null));
    ze("profiles");

    var exitBtn = r("ps-btn-exit");
    if (exitBtn) {
      if (isInitial || !ke.profilesReturnScreen) {
        exitBtn.textContent = "✕ Salir";
        exitBtn._activate = function () {
          _exitApp();
        };
      } else {
        exitBtn.textContent = "✕ Volver";
        exitBtn._activate = closeProfilesScreen;
      }
    }

    var renameBtn = r("ps-btn-rename");
    if (renameBtn) {
      renameBtn._activate = function () {
        var act = getActiveProfile();
        if (!act) return;
        openRenameModal(act);
      };
    }

    var deleteBtn = r("ps-btn-delete");
    if (deleteBtn) {
      deleteBtn._activate = function () {
        if (xuperProfiles.length <= 1) {
          cn("Debe haber al menos 1 perfil");
          return;
        }
        var remIdx = -1;
        for (var i = 0; i < xuperProfiles.length; i++) {
          if (xuperProfiles[i].id === xuperActiveProfileId) { remIdx = i; break; }
        }
        if (remIdx !== -1) {
          var removed = xuperProfiles.splice(remIdx, 1)[0];
          try {
            localStorage.removeItem("xuper_history_" + removed.id);
            localStorage.removeItem("xuper_vod_progress_" + removed.id);
            localStorage.removeItem("xuper_live_favs_" + removed.id);
          } catch (e) { }
          xuperActiveProfileId = xuperProfiles[0].id;
          saveProfiles();
          loadLiveFavs();
          cn("Perfil " + removed.name + " eliminado");
          renderProfilesScreenUI();
          var cards = document.querySelectorAll(".ps-card.focusable");
          if (cards && cards.length) Fe(cards[0]);
        }
      };
    }

    renderProfilesScreenUI();
  }

  function switchToLiveTV() {
    Pe && (clearTimeout(Pe), clearInterval(Pe), Pe = null);
    Ie || Ke();
    ze("home");
    Ze(0, !1);
    var curChan = Me.filter(function (e) { return e._channel === ke.channel })[0];
    if (curChan) Fe(curChan);
    else if (X) Fe(X);
    else if (Ee[0]) Fe(Ee[0]);
    var e = r("home-tabs");
    e && (e.classList.add("is-expanded"), e.classList.remove("is-collapsed"));
    var t = document.querySelector(".home-sidebar-bg");
    t && t.classList.add("is-on");
  }

  function closeProfilesScreen() {
    saveProfiles();
    _lastBackTime = Date.now();
    if (!ke.profilesReturnScreen || ke.profilesReturnScreen === "welcome" || ke.profilesReturnScreen === "profiles") {
      _exitApp();
      return;
    }
    var ret = ke.profilesReturnScreen || "home";
    ze(ret);
    if (ret === "home") {
      switchToLiveTV();
    } else if (ret === "settings") {
      Jt();
    } else if (ret === "detail" && ke.detail) {
      Pt(ke.detail);
    }
  }

  function renderProfilesScreenUI() {
    var row = r("ps-cards-row");
    if (!row) return;
    row.innerHTML = "";

    var deleteBtn = r("ps-btn-delete");
    if (deleteBtn) {
      deleteBtn.style.display = xuperProfiles.length > 1 ? "inline-block" : "none";
    }

    var renameBtn = r("ps-btn-rename");
    var exitBtn = r("ps-btn-exit");

    if (renameBtn) {
      renameBtn._onMove = function (dir) {
        if (dir === "up") {
          var act = row.querySelector(".is-active-profile") || row.querySelector(".focusable");
          if (act) { Fe(act); return !0; }
        }
        return !1;
      };
    }
    if (deleteBtn) {
      deleteBtn._onMove = function (dir) {
        if (dir === "up") {
          var act = row.querySelector(".is-active-profile") || row.querySelector(".focusable");
          if (act) { Fe(act); return !0; }
        }
        return !1;
      };
    }
    if (exitBtn) {
      exitBtn._onMove = function (dir) {
        if (dir === "up") {
          var act = row.querySelector(".is-active-profile") || row.querySelector(".focusable");
          if (act) { Fe(act); return !0; }
        }
        return !1;
      };
    }

    xuperProfiles.forEach(function (prof, idx) {
      var card = n("div", "ps-card focusable" + (prof.id === xuperActiveProfileId ? " is-active-profile" : ""));
      card._profile = prof;

      var avatar = n("div", "ps-avatar");
      avatar.style.background = prof.color || PROFILE_COLORS[idx % PROFILE_COLORS.length];
      avatar.textContent = prof.avatar || "👤";
      card.appendChild(avatar);

      var nameEl = n("div", "ps-card-name", prof.name);
      card.appendChild(nameEl);

      if (prof.id === xuperActiveProfileId) {
        var badge = n("div", "ps-card-badge", "✔ ACTIVO");
        card.appendChild(badge);
      }

      card._activate = function () {
        if (xuperActiveProfileId !== prof.id) {
          xuperActiveProfileId = prof.id;
          saveProfiles();
          loadLiveFavs();
          if (Q) { Ct(!1); }
          if (ke.screen === "detail" && ke.detail) { Pt(ke.detail); }
          cn("Perfil: " + prof.name);
        } else {
          cn("Perfil: " + prof.name);
        }
        switchToLiveTV();
      };

      card._onMove = function (dir) {
        if (dir === "down") {
          if (renameBtn) { Fe(renameBtn); return !0; }
        }
        return !1;
      };

      row.appendChild(card);
    });

    if (xuperProfiles.length < 5) {
      var addCard = n("div", "ps-card ps-card-add focusable");
      var addAvatar = n("div", "ps-avatar", "＋");
      addCard.appendChild(addAvatar);
      var addName = n("div", "ps-card-name", "Nuevo perfil");
      addCard.appendChild(addName);

      addCard._activate = function () {
        if (xuperProfiles.length >= 5) {
          cn("Máximo 5 perfiles alcanzado");
          return;
        }
        var nextNum = xuperProfiles.length + 1;
        var newName = "Usuario " + nextNum;
        var newProf = {
          id: "p_" + Date.now(),
          name: newName,
          avatar: DEFAULT_AVATARS[xuperProfiles.length % DEFAULT_AVATARS.length] || "👤",
          color: PROFILE_COLORS[xuperProfiles.length % PROFILE_COLORS.length] || "#0084ff",
          isKids: !1
        };
        xuperProfiles.push(newProf);
        xuperActiveProfileId = newProf.id;
        saveProfiles();
        loadLiveFavs();
        if (Q) { Ct(!1); }
        if (ke.screen === "detail" && ke.detail) { Pt(ke.detail); }
        cn("Perfil " + newName + " creado");
        renderProfilesScreenUI();
        var allCards = row.querySelectorAll(".ps-card.focusable");
        if (allCards.length >= 2) Fe(allCards[allCards.length - 2]);
      };

      addCard._onMove = function (dir) {
        if (dir === "down") {
          if (renameBtn) { Fe(renameBtn); return !0; }
        }
        return !1;
      };

      row.appendChild(addCard);
    }

    var activeCard = row.querySelector(".is-active-profile");
    if (activeCard) Fe(activeCard);
    else {
      var anyCard = row.querySelector(".focusable");
      if (anyCard) Fe(anyCard);
    }
  }
  loadProfiles();


  var genreList = [
    { name: "Todos", keys: null },
    { name: "Acción", keys: ["action", "acción", "accion"] },
    { name: "Comedia", keys: ["comedy", "comedia"] },
    { name: "Drama", keys: ["drama"] },
    { name: "Terror", keys: ["horror", "terror"] },
    { name: "Aventura", keys: ["adventure", "aventura"] },
    { name: "Ciencia Ficción", keys: ["sci-fi", "science", "ficción", "ficcion"] },
    { name: "Animación", keys: ["animation", "cartoon", "anime", "animación", "animacion"] },
    { name: "Romance", keys: ["romance"] },
    { name: "Suspenso", keys: ["thriller", "mystery", "suspenso"] },
    { name: "Familiar", keys: ["family", "familiar"] },
    { name: "Crimen", keys: ["crime", "crimen"] },
    { name: "Fantasía", keys: ["fantasy", "fantasía", "fantasia"] },
    { name: "Documental", keys: ["documentary", "documental"] }
  ];
  var activeFilterGenre = "Todos";
  var filterOpen = !1, filterPrevFocus = null;

  function filterItemsByGenre(items, genreName) {
    if (!genreName || genreName === "Todos") return items;
    var gObj = genreList.filter(function (g) { return g.name === genreName; })[0];
    if (!gObj || !gObj.keys) return items;
    return items.filter(function (it) {
      if (!it.genres || !Array.isArray(it.genres)) return false;
      return it.genres.some(function (g) {
        var lower = String(g).toLowerCase();
        return gObj.keys.some(function (k) { return lower.indexOf(k) !== -1; });
      });
    });
  }

  function renderGenreCatalog(e, kind, startY) {
    var allKindItems = qt(kind);
    var currentGenre = "Todos";
    var gridContainer = n("div", "genre-grid-container");

    var bar = n("div", "home-genre-bar scrollable");
    l(bar, 192, startY, 1600, 56);

    function updateGrid(genre) {
      currentGenre = genre;
      gridContainer.innerHTML = "";
      var filtered = filterItemsByGenre(allKindItems, genre);
      var posters = filtered.slice(6);
      if (!posters.length) posters = filtered;

      var subTitleText = (genre === "Todos" ? (kind === "pelicula" ? "Más películas" : (kind === "serie" ? "Más series" : "Títulos destacados")) : (kind === "pelicula" ? "Películas de " : (kind === "serie" ? "Series de " : "Destacados de ")) + genre) + " (" + filtered.length + " títulos)";
      var subtitle = n("div", "kids-subtitle", subTitleText);
      l(subtitle, 192, startY + 68, 1249, 36);
      gridContainer.appendChild(subtitle);

      var r = startY + 115;
      for (var s = Math.min(posters.length, 60), d = 0; d < s; d++) {
        var c = 192 + 276 * (d % 6),
          p = r + 390 * Math.floor(d / 6);
        var posterEl = et(posters[d], c, p, 250, 360, { gold: !0, posterIdx: d, posterList: posters });
        posterEl._posterIdx = d;
        posterEl._onMove = function (idx) {
          return function (dir) {
            if ("up" === dir && idx < 6) {
              var selectedPill = bar.querySelector(".home-genre-pill.is-selected") || bar.querySelector(".home-genre-pill");
              if (selectedPill) return Fe(selectedPill), !0;
            }
            return !1;
          };
        }(d);
        gridContainer.appendChild(posterEl);
      }
    }

    genreList.forEach(function (g, idx) {
      var pill = n("div", "home-genre-pill focusable" + (idx === 0 ? " is-selected" : ""), g.name);
      pill.setAttribute("data-genre", g.name);
      pill._activate = function () {
        var pills = bar.querySelectorAll(".home-genre-pill");
        for (var p = 0; p < pills.length; p++) pills[p].classList.remove("is-selected");
        pill.classList.add("is-selected");
        updateGrid(g.name);
        var firstPoster = gridContainer.querySelector(".poster.focusable");
        if (firstPoster) Fe(firstPoster);
      };
      pill._onMove = function (dir) {
        if ("down" === dir) {
          var firstPoster = gridContainer.querySelector(".poster.focusable");
          if (firstPoster) return Fe(firstPoster), !0;
        }
        return !1;
      };
      bar.appendChild(pill);
    });

    e.appendChild(bar);
    e.appendChild(gridContainer);
    updateGrid("Todos");
  }

  var _filterTipo = "Pelicula";
  var _filterGenero = "Todos";
  var _filterYear = "Todos";
  var _filterCountry = "Todos";
  var _filterAudio = "Todos";
  var _filterGridElements = [];

  var _GENRE_KEYWORDS = {
    "Acción": ["action", "accion", "artes marciales", "belica", "superheroe", "aventura"],
    "Drama": ["drama", "melodrama", "telenovela"],
    "Aventuras": ["adventure", "aventura", "aventuras", "action & adventure"],
    "Crimen": ["crime", "crimen", "gangster", "mafia", "policiaco"],
    "Ciencia ficción": ["sci-fi", "science fiction", "ciencia ficcion", "scifi", "ficcion"],
    "Diseño": ["diseno", "design", "arte", "documentary", "animacion", "biography", "documental", "art"],
    "Comedia": ["comedy", "comedia", "stand-up", "sitcom", "humor"],
    "Romántico": ["romance", "romantico", "romantica", "romantic", "amor"],
    "Animación": ["animation", "animacion", "anime", "cartoon", "infantil", "dibujos"],
    "Familiar": ["family", "familiar", "kids", "infantil", "ninos"],
    "Suspenso": ["thriller", "suspenso", "suspense", "misterio", "intriga", "mystery"],
    "Terror": ["horror", "terror", "miedo", "pesadilla"],
    "Fantasía": ["fantasy", "fantasia", "sobrenatural", "magia"],
    "Historia": ["history", "historia", "historico", "epica"],
    "Biografía": ["biography", "biografia", "biopic"],
    "Documental": ["documentary", "documental"],
    "Western": ["western", "vaqueros", "oeste"],
    "Guerra": ["war", "guerra", "belica", "militar"],
    "Deportes": ["sport", "sports", "deporte", "deportes", "futbol", "boxeo"],
    "Música": ["music", "musical", "musica", "concierto", "cancion"]
  };

  var _COUNTRY_KEYWORDS = {
    "Brasil": ["brasil", "brazil", "brasileira", "portugues", "globo"],
    "Portugal": ["portugal", "portugues"],
    "Estados Unidos": ["estados unidos", "eeuu", "ee.uu.", "usa", "us", "united states", "hollywood", "marvel", "dc", "hbo", "netflix", "universal", "disney", "warner"],
    "México": ["mexico", "mexicana", "mexicano", "televisa", "azteca", "narco", "cartel", "sinaloa", "juarez"],
    "Reino Unido": ["reino unido", "uk", "united kingdom", "gran bretana", "england", "inglaterra", "london", "londres", "bbc"],
    "Japón": ["japon", "japan", "anime", "manga", "tokyo", "naruto", "one piece", "dragon ball", "chainsaw"],
    "Corea del Sur": ["corea", "korea", "k-drama", "kdrama", "drama coreano", "seoul"],
    "España": ["espana", "spain", "espanol", "espanola", "madrid", "barcelona"],
    "Colombia": ["colombia", "colombiana", "colombiano", "caracol", "rcn", "vallenato", "bogota"],
    "Argentina": ["argentina", "argentino", "buenos aires", "uruguay"]
  };

  function _getFilterItemYear(item) {
    if (item.year && item.year !== "—" && item.year !== "-" && String(item.year).length >= 4) return String(item.year).slice(0, 4);
    if (item.releaseDate && String(item.releaseDate).length >= 4) return String(item.releaseDate).slice(0, 4);
    if (item.releaseTime && String(item.releaseTime).length >= 4) return String(item.releaseTime).slice(0, 4);
    var mRow = String(item.row || "").match(/\b(19\d\d|20\d\d)\b/);
    if (mRow) return mRow[1];
    var mTit = String(item.title || "").match(/\b(19\d\d|20\d\d)\b/);
    if (mTit) return mTit[1];
    return "2025";
  }

  function openFilterDialog() {
    filterOpen = !0;
    filterPrevFocus = ke.focus;
    var overlay = r("dialog-filter");
    if (!overlay) return;
    overlay.classList.add("is-active");

    var tipoRow = r("fo-tipo");
    var generoRow = r("fo-genero");
    var yearRow = r("fo-year");
    var countryRow = r("fo-country");
    var audioRow = r("fo-audio");
    var exitBtn = r("df-btn-exit");

    var tipos = ["Pelicula", "Series", "Kids", "Anime"];
    var generos = ["Todos", "Acción", "Drama", "Aventuras", "Crimen", "Ciencia ficción", "Diseño", "Comedia", "Romántico", "Animación", "Familiar", "Suspenso", "Terror", "Fantasía", "Historia", "Biografía", "Documental", "Western", "Guerra", "Deportes", "Música"];
    var years = ["Todos", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
    var countries = ["Todos", "Brasil", "Portugal", "Estados Unidos", "México", "Reino Unido", "Japón", "Corea del Sur", "España", "Colombia", "Argentina"];
    var audios = ["Todos", "Portugués", "Español", "Inglés"];

    var rowElements = [[], [], [], [], []];

    function buildFilterRow(containerEl, items, currentVal, rowIndex, isTipo) {
      if (!containerEl) return;
      o(containerEl);
      rowElements[rowIndex] = [];
      for (var i = 0; i < items.length; i++) {
        (function (val, optIdx) {
          var isSel = (val === currentVal);
          var cls = isTipo ? "filter-opt-tipo" : "filter-opt";
          var btn = n("button", cls + " focusable" + (isSel ? " is-selected" : ""), val);
          btn._val = val;
          btn._activate = function () {
            if (rowIndex === 0) {
              _filterTipo = val;
              _filterGenero = "Todos";
            }
            else if (rowIndex === 1) _filterGenero = val;
            else if (rowIndex === 2) _filterYear = val;
            else if (rowIndex === 3) _filterCountry = val;
            else if (rowIndex === 4) _filterAudio = val;

            buildAllRows();
            renderFilterResults();

            var newBtn = rowElements[rowIndex].filter(function (b) { return b._val === val; })[0];
            if (newBtn) {
              Fe(newBtn, !0);
              Ue(newBtn);
            }
          };

          btn._onMove = function (dir) {
            if ("left" === dir) {
              if (optIdx > 0 && rowElements[rowIndex][optIdx - 1]) {
                Fe(rowElements[rowIndex][optIdx - 1]);
                Ue(rowElements[rowIndex][optIdx - 1]);
                return !0;
              }
              return !0;
            }
            if ("right" === dir) {
              if (optIdx < rowElements[rowIndex].length - 1 && rowElements[rowIndex][optIdx + 1]) {
                Fe(rowElements[rowIndex][optIdx + 1]);
                Ue(rowElements[rowIndex][optIdx + 1]);
                return !0;
              }
              if (rowIndex === 0 && exitBtn) return Fe(exitBtn, !0), !0;
              return !0;
            }
            if ("down" === dir) {
              if (rowIndex < 4) {
                var nextRow = rowElements[rowIndex + 1];
                var targetOpt = nextRow.filter(function (b) { return b.classList.contains("is-selected"); })[0] || nextRow[0];
                if (targetOpt) {
                  Fe(targetOpt, !0);
                  Ue(targetOpt);
                  return !0;
                }
              } else {
                if (_filterGridElements.length) {
                  Fe(_filterGridElements[0], !0);
                  Ue(_filterGridElements[0]);
                  return !0;
                }
              }
              return !1;
            }
            if ("up" === dir) {
              if (rowIndex > 0) {
                var prevRow = rowElements[rowIndex - 1];
                var targetOpt = prevRow.filter(function (b) { return b.classList.contains("is-selected"); })[0] || prevRow[0];
                if (targetOpt) {
                  Fe(targetOpt, !0);
                  Ue(targetOpt);
                  return !0;
                }
              } else if (exitBtn) {
                Fe(exitBtn, !0);
                return !0;
              }
              return !1;
            }
            return !1;
          };

          containerEl.appendChild(btn);
          rowElements[rowIndex].push(btn);
        })(items[i], i);
      }
    }

    function buildAllRows() {
      buildFilterRow(tipoRow, tipos, _filterTipo, 0, !0);
      buildFilterRow(generoRow, generos, _filterGenero, 1, !1);
      buildFilterRow(yearRow, years, _filterYear, 2, !1);
      buildFilterRow(countryRow, countries, _filterCountry, 3, !1);
      buildFilterRow(audioRow, audios, _filterAudio, 4, !1);
    }

    if (exitBtn) {
      exitBtn._activate = function () {
        closeFilterDialog();
      };
      exitBtn._onMove = function (dir) {
        if ("down" === dir || "left" === dir) {
          if (rowElements[0].length) {
            Fe(rowElements[0][0], !0);
            return !0;
          }
        }
        return !1;
      };
    }

    buildAllRows();
    renderFilterResults();

    var firstFocus = (tipoRow && tipoRow.querySelector(".is-selected")) || (tipoRow && tipoRow.querySelector(".focusable")) || exitBtn;
    if (firstFocus) Fe(firstFocus, !0);
  }

  function closeFilterDialog() {
    filterOpen = !1;
    var overlay = r("dialog-filter");
    if (overlay) overlay.classList.remove("is-active");
    if (filterPrevFocus && filterPrevFocus.isConnected) {
      Fe(filterPrevFocus, !0);
    } else if (Ee && Ee[ke.tab]) {
      Fe(Ee[ke.tab], !0);
    }
    filterPrevFocus = null;
  }

  function renderFilterResults() {
    var grid = r("filter-grid");
    var empty = r("filter-empty");
    if (!grid) return;
    o(grid);
    _filterGridElements = [];

    var portalItems = (window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.items) || [];
    var memoryItems = (u && u.length) ? u : [];

    var seenIds = {};
    var masterPool = [];

    // Add all portal items
    for (var pIdx = 0; pIdx < portalItems.length; pIdx++) {
      var itP = portalItems[pIdx];
      if (itP && itP.id && !seenIds[itP.id]) {
        seenIds[itP.id] = !0;
        masterPool.push(itP);
      }
    }

    // Add memory items
    for (var mIdx = 0; mIdx < memoryItems.length; mIdx++) {
      var itM = memoryItems[mIdx];
      if (itM && itM.id && !seenIds[itM.id]) {
        seenIds[itM.id] = !0;
        masterPool.push(itM);
      }
    }

    var filtered = masterPool.filter(function (item) {
      var cat = (item.category || "").toLowerCase();
      var kind = (item.kind || "").toLowerCase();
      var isSer = I(item);

      // 1. Tipo
      if (_filterTipo === "Pelicula") {
        if (isSer || kind === "serie" || cat.indexOf("serie") !== -1) return false;
      } else if (_filterTipo === "Series") {
        if (!isSer && kind !== "serie" && cat.indexOf("serie") === -1) return false;
      } else if (_filterTipo === "Kids") {
        var isKid = (cat.indexOf("infantil") !== -1 || cat.indexOf("kids") !== -1 || kind.indexOf("infantil") !== -1);
        if (!isKid && item.genres && Array.isArray(item.genres)) {
          for (var kg = 0; kg < item.genres.length; kg++) {
            if (/cartoon|family|familiar|kids|infantil/i.test(item.genres[kg])) { isKid = true; break; }
          }
        }
        if (!isKid) return false;
      } else if (_filterTipo === "Anime") {
        var isAni = (cat.indexOf("anime") !== -1);
        if (!isAni && item.genres && Array.isArray(item.genres)) {
          for (var ag = 0; ag < item.genres.length; ag++) {
            if (/anime|manga/i.test(item.genres[ag])) { isAni = true; break; }
          }
        }
        if (!isAni && /japan|japón/i.test(item.country)) isAni = true;
        if (!isAni) return false;
      }

      // 2. Género
      if (_filterGenero !== "Todos") {
        var genreKeys = _GENRE_KEYWORDS[_filterGenero] || [c(_filterGenero)];
        var allGenres = (item.genres || []).concat([item.genre || "", item.row || "", item.category || "", item.tagline || ""]).map(c);
        var matchGen = false;
        for (var gk = 0; gk < genreKeys.length; gk++) {
          var k = genreKeys[gk];
          for (var gi = 0; gi < allGenres.length; gi++) {
            if (allGenres[gi].indexOf(k) !== -1) { matchGen = true; break; }
          }
          if (matchGen) break;
        }
        if (!matchGen) return false;
      }

      // 3. Año
      if (_filterYear !== "Todos") {
        var itemYear = _getFilterItemYear(item);
        if (itemYear !== _filterYear) return false;
      }

      // 4. País
      if (_filterCountry !== "Todos") {
        var countryKeys = _COUNTRY_KEYWORDS[_filterCountry] || [c(_filterCountry)];
        var countryHay = c((item.country || "") + " " + (item.row || "") + " " + (item.title || "") + " " + (item.alias || "") + " " + (item.synopsis || ""));
        var matchCountry = false;
        for (var ck = 0; ck < countryKeys.length; ck++) {
          if (countryHay.indexOf(countryKeys[ck]) !== -1) { matchCountry = true; break; }
        }
        if (!matchCountry) return false;
      }

      // 5. Audio
      if (_filterAudio !== "Todos") {
        if (_filterAudio === "Portugués") {
          var ptHay = c((item.streamAudioInfo || "") + " " + (item.audio || "") + " " + (item.country || "") + " " + (item.title || "") + " " + (item.row || ""));
          if (!/portugues|brasil|brazil|pt\b|globo/i.test(ptHay)) return false;
        } else if (_filterAudio === "Inglés") {
          var enHay = c((item.streamAudioInfo || "") + " " + (item.audio || "") + " " + (item.country || "") + " " + (item.alias || ""));
          if (!/ingles|english|\ben\b|united states|estados unidos|reino unido|uk/i.test(enHay)) return false;
        } else if (_filterAudio === "Español") {
          if (/^portugues$/i.test(item.audio)) return false;
        }
      }

      return true;
    });

    if (!filtered.length) {
      if (empty) empty.style.display = "block";
      return;
    }
    if (empty) empty.style.display = "none";

    var BATCH_SIZE = 36;
    var renderedCount = 0;
    var totalToRender = Math.min(filtered.length, 720);

    function createFilterCard(item, idx) {
      var card = n("div", "filter-card focusable");
      var thumb = n("div", "filter-card-thumb");

      var img = n("img");
      img.loading = (idx < 12) ? "eager" : "lazy";
      img.decoding = "async";
      var imgSrc = item.poster || item.landscape || item.cover || "assets/original/common/bg_placehoder_vertical.png";
      img.src = imgSrc;
      img.onerror = function () { this.src = "assets/original/common/bg_placehoder_vertical.png"; };
      thumb.appendChild(img);

      var scoreVal = item.score && item.score !== "—" && item.score !== "-" ? String(item.score) : "7.5";
      if (scoreVal.indexOf(".") === -1 && scoreVal.length === 1) scoreVal += ".0";
      var scoreBadge = n("div", "filter-card-badge-score", scoreVal);
      thumb.appendChild(scoreBadge);

      var ccBadge = n("div", "filter-card-badge-cc", "CC");
      thumb.appendChild(ccBadge);

      card.appendChild(thumb);

      var titleEl = n("div", "filter-card-title", item.title || "Sin título");
      card.appendChild(titleEl);

      card._item = item;
      card._activate = function () {
        closeFilterDialog();
        At(item);
      };

      card._onMove = function (dir) {
        if ("left" === dir) {
          if (idx % 6 > 0 && _filterGridElements[idx - 1]) {
            Fe(_filterGridElements[idx - 1]);
            Ue(_filterGridElements[idx - 1]);
            return !0;
          }
          return !0;
        }
        if ("right" === dir) {
          if (idx % 6 < 5 && idx < _filterGridElements.length - 1 && _filterGridElements[idx + 1]) {
            Fe(_filterGridElements[idx + 1]);
            Ue(_filterGridElements[idx + 1]);
            return !0;
          }
          return !0;
        }
        if ("up" === dir) {
          if (idx >= 6 && _filterGridElements[idx - 6]) {
            Fe(_filterGridElements[idx - 6]);
            Ue(_filterGridElements[idx - 6]);
            return !0;
          } else {
            var audioRow = r("fo-audio");
            var selOpt = (audioRow && audioRow.querySelector(".is-selected")) || (audioRow && audioRow.querySelector(".focusable"));
            if (selOpt) {
              Fe(selOpt, !0);
              Ue(selOpt);
              return !0;
            }
          }
          return !1;
        }
        if ("down" === dir) {
          if (idx + 6 < _filterGridElements.length && _filterGridElements[idx + 6]) {
            Fe(_filterGridElements[idx + 6]);
            Ue(_filterGridElements[idx + 6]);
            if (renderedCount < totalToRender && idx >= renderedCount - 18) {
              appendFilterBatch();
            }
            return !0;
          } else if (renderedCount < totalToRender) {
            appendFilterBatch();
            if (idx + 6 < _filterGridElements.length && _filterGridElements[idx + 6]) {
              Fe(_filterGridElements[idx + 6]);
              Ue(_filterGridElements[idx + 6]);
              return !0;
            }
          }
          return !0;
        }
        return !1;
      };

      grid.appendChild(card);
      _filterGridElements.push(card);
    }

    function appendFilterBatch() {
      if (renderedCount >= totalToRender) return;
      var nextBatchEnd = Math.min(renderedCount + BATCH_SIZE, totalToRender);
      for (var bi = renderedCount; bi < nextBatchEnd; bi++) {
        createFilterCard(filtered[bi], bi);
      }
      renderedCount = nextBatchEnd;
    }

    // Render initial batch immediately (instant load!)
    appendFilterBatch();
  }
  function Ne(e) { if (renameModalOpen) return !!s(e, "#dialog-profile-rename"); if (filterOpen) return !!s(e, "#dialog-filter"); if (Ut) return !!s(e, ".season-popup"); if (!e || !e.getBoundingClientRect) return !1; if (null === e.offsetParent) return !1; var t = e.getBoundingClientRect(); if (t.width < 1 || t.height < 1) return !1; if (ke.episodeBrowserOpen) return !!s(e, "#player-episodes"); if (ji) return !!s(e, "#dialog-playsettings"); if (Vi) return !!s(e, "#player-playsetting-view"); var i = s(e, ".home-page"); if (i && !i.classList.contains("is-current")) return !1; var a = s(e, ".settings-panel"); if (a && !a.classList.contains("is-active")) return !1; var n = s(e, ".search-hot"); if (n && n.classList.contains("is-hidden")) return !1; var r = s(e, ".search-results"); if (r && !r.classList.contains("is-active")) return !1; var o = s(e, ".player-channels"); if (o && !o.classList.contains("is-active")) return !1; var l = s(e, ".player-infobar"); return !(l && !l.classList.contains("is-active")) } function Re() { for (var e = document.querySelectorAll(".focusable"), t = [], i = 0; i < e.length; i++)Ne(e[i]) && t.push(e[i]); return t } function Ue(e) {
    var elem = s(e, ".cell") || s(e, ".search-cell") || e;
    for (var t = s(e, ".scrollable"); t;) {
      var i = elem.getBoundingClientRect(), a = t.getBoundingClientRect();
      var isHorizOnly = t.classList.contains("poster-row") || t.classList.contains("detail-grid") || t.classList.contains("detail-episodes") || t.classList.contains("pc-categories");
      if (!isHorizOnly && t.scrollHeight > t.clientHeight + 1) {
        i.top < a.top ? t.scrollTop = Math.max(0, t.scrollTop - (a.top - i.top + 35)) : i.bottom > a.bottom && (t.scrollTop += i.bottom - a.bottom + 35);
      }
      var isVertOnly = t.classList.contains("home-page") || t.classList.contains("search-grid") || t.classList.contains("home-tabs") || t.classList.contains("player-channels") || t.classList.contains("live-list") || t.classList.contains("settings-menu");
      if (!isVertOnly && t.scrollWidth > t.clientWidth + 1) {
        if (i.left < a.left) {
          if (elem._posterIdx === 0) {
            t.scrollLeft = 0;
          } else {
            t.scrollLeft = Math.max(0, t.scrollLeft - (a.left - i.left + 50));
          }
        } else if (i.right > a.right) {
          if (elem._rowEl && elem._posterIdx === elem._rowEl.children.length - 1) {
            t.scrollLeft = t.scrollWidth - t.clientWidth;
          } else {
            t.scrollLeft += (i.right - a.right + 50);
          }
        }
      }
      t = s(t.parentNode, ".scrollable");
    }
  } function Fe(e, t) { if (e) if (ke.focus !== e) { ke.focus && ke.focus.classList.remove("is-focused"), ke.focus = e, e.classList.add("is-focused"), e._onFocus && e._onFocus(), La(); var i = r("home-tabs"); if (i && "home" === ke.screen) { var a = s(e, ".home-tabs"); i.classList.toggle("is-expanded", !!a), i.classList.toggle("is-collapsed", !a); var n = document.querySelector(".home-sidebar-bg"); n && n.classList.toggle("is-on", !!a) } t || Ue(e) } else t || Ue(e) } function Be(e) { for (var t = e.querySelectorAll(".focusable"), i = 0; i < t.length; i++)if (Ne(t[i])) return t[i]; return null } function He(e) { if (ke.focus) { if (!ke.focus._onMove || !ke.focus._onMove(e)) { for (var t = "home" === ke.screen && s(ke.focus, ".home-page"), i = "home" === ke.screen && s(ke.focus, ".home-tabs"), a = Re(), n = ke.focus.getBoundingClientRect(), r = n.left + n.width / 2, o = n.top + n.height / 2, l = null, d = 1e9, c = 0; c < a.length; c++) { var p = a[c]; if (p !== ke.focus && ((!t || !s(p, ".home-tabs")) && (!i || s(p, ".home-tabs")))) { var u, f, v, h = p.getBoundingClientRect(), m = h.left + h.width / 2 - r, g = h.top + h.height / 2 - o; if ("left" === e) { if (m > -4) continue; u = Math.max(0, n.left - h.right), f = Math.abs(g), v = h.bottom > n.top + 2 && h.top < n.bottom - 2 } else if ("right" === e) { if (m < 4) continue; u = Math.max(0, h.left - n.right), f = Math.abs(g), v = h.bottom > n.top + 2 && h.top < n.bottom - 2 } else if ("up" === e) { if (g > -4) continue; u = Math.max(0, n.top - h.bottom), f = Math.abs(m), v = h.right > n.left + 2 && h.left < n.right - 2 } else { if (g < 4) continue; u = Math.max(0, h.top - n.bottom), f = Math.abs(m), v = h.right > n.left + 2 && h.left < n.right - 2 } var y = u + 2 * f + (v ? 0 : 320); y < d && (d = y, l = p) } } l ? Fe(l) : "left" === e && t && Ee[ke.tab] && Fe(Ee[ke.tab]) } } else { var b = Re(); b.length && Fe(b[0]) } } function ze(e) { for (var t = document.querySelectorAll(".screen"), i = 0; i < t.length; i++)t[i].classList.remove("is-active"); var a = r("screen-" + e); if (a && a.classList.add("is-active"), ke.screen = e, "home" !== e && ht(), "player" !== e && ke.episodeBrowserOpen && qa(!0), "player" !== e && "detail" !== e) { ji && Ha(), Vi && xa(); var n = r("screen-player"); n && (n.classList.remove("is-mini"), n.classList.remove("is-active")), dn(), Ki++, ta = [], zi && (zi.innerHTML = "") } } var Ve = 0; function je() { var e = Date.now(); if (!(e - Ve < 250)) if (Ve = e, ji) Ha(); else { if ("player" === ke.screen) { if ("vod" === ke.playerMode && pe && pe.currentTime > 5 && ke.playerItem) { saveVodProgress(ke.playerItem, ke.playerEpisode, pe.currentTime); } return ke.episodeBrowserOpen ? void qa() : Vi ? void xa() : void (ke.channelsOpen ? Sn() : ke.infobar ? ui() : ke.vodInfobarVisible ? vi() : function () { ui(), vi(); var e = ke.playerReturn; if (e && "detail" === e.screen) { var t = r("screen-player"), i = r("screen-detail"); t && (t.classList.add("is-mini"), t.classList.add("is-active")), i && i.classList.add("is-active"), ke.screen = "detail"; var a = !1; if (ke.detailNeedsRebuild && ke.detail) { ke.detailNeedsRebuild = !1, Pt(ke.detail), a = !0; var n = Y ? Y.querySelector(".detail-season") : null; n && Fe(n) } else ke.detail && Na(ke.detail); if (!a) if (e.focus && Ne(e.focus)) Fe(e.focus); else { var o = K ? K.querySelector(".focusable") : null; o && Fe(o) } } else { dn(); var l = r("screen-player"); l && (l.classList.remove("is-mini"), l.classList.remove("is-active")), e && "search" === e.screen ? (ze("search"), Fe(e.focus)) : (ze("home"), Ze(ke.tab, !1), e && e.focus && Ne(e.focus) ? Fe(e.focus) : Ee[ke.tab] && Fe(Ee[ke.tab])) } }()); } if ("detail" !== ke.screen) { if ("search" === ke.screen) return Wt(), ze("home"), Ze(ke.tab, !1), void (Ee[ke.tab] && Fe(Ee[ke.tab])); if ("settings" === ke.screen) return ze("home"), Ze(ke.tab, !1), void (Ee[ke.tab] && Fe(Ee[ke.tab])); if ("profiles" === ke.screen) return closeProfilesScreen(); if ("welcome" === ke.screen) return void _exitApp(); if ("home" === ke.screen) { if (0 !== ke.tab) return Ze(0, !0), void (Ee[0] && Fe(Ee[0])); return void _exitApp(); } } else { if (Ut) { Ft(); var t = Y ? Y.querySelector(".detail-season") : null; return void (t && Fe(t)) } var i = r("screen-detail"); if (i && i.classList.contains("is-synopsis-open")) return void Dt(); dn(); var a = r("screen-player"); a && (a.classList.remove("is-mini"), a.classList.remove("is-active")); var n = ke.detailReturn; n && "search" === n.screen ? (ze("search"), Fe(n.focus)) : (ze("home"), Ze(ke.tab, !1), n && n.focus && Ne(n.focus) ? Fe(n.focus) : Ee[ke.tab] && Fe(Ee[ke.tab])) } } } function We() { ke.focus && ke.focus._activate && ke.focus._activate() } var _lastBackTime = 0; function $e(e) {
    var t = e.keyCode || e.which, n = e.key || "", r = !0;
    if (36 === t || "Home" === n) {
      _exitApp();
      return void (e.preventDefault && e.preventDefault());
    }
    if (renameModalOpen) { if (8 === t || "Backspace" === n) { if (renameCurrentText.length > 0) { renameCurrentText = renameCurrentText.slice(0, -1); var disp = r("dr-input-display"); if (disp) disp.textContent = renameCurrentText || " "; } return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()); } if (461 === t || 27 === t || "Back" === n || "GoBack" === n || "Escape" === n) { closeRenameModal(); return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()); } if (13 === t || "Enter" === n) { if (ke.focus && ke.focus._activate) { ke.focus._activate(); return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()); } } if (!e.ctrlKey && !e.altKey && !e.metaKey && n && 1 === n.length && t >= 32 && t <= 255) { if (37 !== t && 38 !== t && 39 !== t && 40 !== t && 13 !== t) { if (renameCurrentText.length < 16) { renameCurrentText += n.toUpperCase(); var disp2 = r("dr-input-display"); if (disp2) disp2.textContent = renameCurrentText || " "; } return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()); } } } if ("search" === ke.screen) { if (8 === t || "Backspace" === n) { if (ke.searchQuery && ke.searchQuery.length > 0) { jt(ke.searchQuery.slice(0, -1)) } return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()) } if (461 === t || 27 === t || "Back" === n || "GoBack" === n || "Escape" === n) { return je(), void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()) } if (!e.ctrlKey && !e.altKey && !e.metaKey && n && 1 === n.length && t >= 32 && t <= 255) { if (37 !== t && 38 !== t && 39 !== t && 40 !== t && 13 !== t) { jt(ke.searchQuery + n.toUpperCase()); return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()) } } } if (ke.liveSearchOpen) {
      if (8 === t || "Backspace" === n) {
        if (_liveSearchQuery && _liveSearchQuery.length > 0) { _setLiveSearchQuery(_liveSearchQuery.slice(0, -1)) }
        return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation());
      }
      if (461 === t || 27 === t || "Back" === n || "GoBack" === n || "Escape" === n) {
        _closeLiveSearch();
        return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation());
      }
      if (!e.ctrlKey && !e.altKey && !e.metaKey && n && 1 === n.length && t >= 32 && t <= 255) {
        if (37 !== t && 38 !== t && 39 !== t && 40 !== t && 13 !== t) {
          _setLiveSearchQuery(_liveSearchQuery + n.toUpperCase());
          return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation());
        }
      }
    }
    if ("player" === ke.screen && "live" === ke.playerMode && (428 === t || "Search" === n)) {
      wn(); _openLiveSearch();
      return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation());
    } if (461 === t || 27 === t || 8 === t || "Back" === n || "GoBack" === n || "Escape" === n) {
      var _now = Date.now();
      if (_now - _lastBackTime < 400) {
        return void (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation());
      }
      _lastBackTime = _now;
      return renameModalOpen ? (closeRenameModal(), e.preventDefault && e.preventDefault(), void (e.stopPropagation && e.stopPropagation())) :
        ke.episodeBrowserOpen ? (qa(), e.preventDefault && e.preventDefault(), void (e.stopPropagation && e.stopPropagation())) :
          filterOpen ? (closeFilterDialog(), e.preventDefault && e.preventDefault(), void (e.stopPropagation && e.stopPropagation())) :
            ji ? (Ha(), e.preventDefault && e.preventDefault(), void (e.stopPropagation && e.stopPropagation())) :
              Vi ? (xa(), e.preventDefault && e.preventDefault(), void (e.stopPropagation && e.stopPropagation())) :
                (je(), e.preventDefault && e.preventDefault(), void (e.stopPropagation && e.stopPropagation()));
    }

    if (ke.episodeBrowserOpen) {
      var o = s(ke.focus, "#pe-seasons"), l = s(ke.focus, "#pe-episodes");
      if (37 === t) {
        if (l && Mi && "none" !== Mi.style.display) {
          var d = Ei ? Ei.children[ke.browserSeason] || Be(Ei) : null;
          d && Fe(d);
        }
      } else if (39 === t) {
        if (o) {
          var c = qi ? qi.querySelector(".pe-ep.is-current") || Be(qi) : null;
          c && Fe(c);
        }
      } else if (38 === t) {
        He("up");
      } else if (40 === t) {
        He("down");
      } else if (13 === t || 32 === t) {
        We();
      } else {
        r = !1;
      }
      r && e.preventDefault && e.preventDefault();
    } else {
      // Handle media keys
      var p = 415 === t || "MediaPlay" === n || "Play" === n,
        u = 19 === t || "MediaPause" === n || "Pause" === n,
        f = 10252 === t || "MediaPlayPause" === n,
        v = 417 === t || "MediaFastForward" === n || "FastForward" === n,
        h = 412 === t || "MediaRewind" === n || "Rewind" === n,
        m = 413 === t || "MediaStop" === n || "Stop" === n;

      if ("player" === ke.screen) {
        if (p) {
          if (pe && pe.paused) {
            try { pe.play(); } catch (e) { }
            li("none"); pi();
          }
          return void (e.preventDefault && e.preventDefault());
        }
        if (u) {
          if (pe && !pe.paused) {
            try { pe.pause(); } catch (e) { }
            li("pause"); pi();
          }
          return void (e.preventDefault && e.preventDefault());
        }
        if (f) return di(), void (e.preventDefault && e.preventDefault());
        if (v) return si(15), void (e.preventDefault && e.preventDefault());
        if (h) return si(-15), void (e.preventDefault && e.preventDefault());
        if (m) return je(), void (e.preventDefault && e.preventDefault());
      }

      var g = 457 === t || 93 === t || 467 === t || "Menu" === n || "ContextMenu" === n || "Info" === n;

      if ("player" === ke.screen && "vod" === ke.playerMode && g) {
        return ji ? Ha() : Vi ? xa() : Sa(), void (e.preventDefault && e.preventDefault());
      }

      if ("player" === ke.screen && "live" === ke.playerMode && g) {
        if (!ke.infobar) {
          pi();
          _piFocusBtn(0);
        } else {
          ci();
        }
        return void (e.preventDefault && e.preventDefault());
      }

      var isFavKey = 405 === t || 406 === t || 70 === t || "f" === n || "F" === n || "Yellow" === n || "YellowColorKey" === n || "Blue" === n || "BlueColorKey" === n;
      if (isFavKey) {
        if ("player" === ke.screen && "live" === ke.playerMode) {
          if (ke.channelsOpen) {
            var row = ke.focus;
            var targetCh = (row && typeof row._channel === "number") ? z[row._channel] : z[ke.channel];
            if (targetCh) toggleChannelFav(targetCh);
            return void (e.preventDefault && e.preventDefault());
          } else {
            if (z[ke.channel]) toggleChannelFav(z[ke.channel]);
            return void (e.preventDefault && e.preventDefault());
          }
        } else if ("home" === ke.screen && 0 === ke.tab) {
          if (ke.focus && typeof ke.focus._channel === "number" && z[ke.focus._channel]) {
            toggleChannelFav(z[ke.focus._channel]);
            return void (e.preventDefault && e.preventDefault());
          }
        }
      }

      if ("player" === ke.screen && "live" === ke.playerMode) {
        // Live TV Navigation
        if (ke.channelsOpen) {
          // Channel drawer open: arrow navigation
          if (37 === t) He("left");
          else if (38 === t) He("up");
          else if (39 === t) He("right");
          else if (40 === t) He("down");
          else if (13 === t || 32 === t) We();
          return void (e.preventDefault && e.preventDefault());
        }

        // Channel drawer is closed
        if (38 === t || 33 === t || "ChannelUp" === n) {
          ke.channel < z.length - 1 ? St(ke.channel + 1, !1) : z.length && St(0, !1);
          pi();
          return void (e.preventDefault && e.preventDefault());
        }
        if (40 === t || 34 === t || "ChannelDown" === n) {
          ke.channel > 0 ? St(ke.channel - 1, !1) : z.length && St(z.length - 1, !1);
          pi();
          return void (e.preventDefault && e.preventDefault());
        }
        if (37 === t) {
          // Left arrow: if InfoBar is open, navigate buttons to the left; if closed, open InfoBar! Never close on left.
          if (ke.infobar) {
            _piMoveBtn(-1);
            ci();
          } else {
            pi();
            _piFocusBtn(0);
          }
          return void (e.preventDefault && e.preventDefault());
        }
        if (39 === t) {
          // Right arrow: if InfoBar is open, navigate buttons to the right; if closed, open InfoBar!
          if (ke.infobar) {
            _piMoveBtn(1);
            ci();
          } else {
            pi();
            _piFocusBtn(0);
          }
          return void (e.preventDefault && e.preventDefault());
        }
        if (13 === t || 32 === t) {
          if (ke.infobar) {
            if (_piButtons && _piButtons.length) {
              if (_piFocusIndex < 0 || _piFocusIndex >= _piButtons.length) _piFocusIndex = 0;
              _piActivateCurrentBtn();
              ci();
            }
          } else {
            wn();
          }
          return void (e.preventDefault && e.preventDefault());
        }
      } else if ("player" === ke.screen && "vod" === ke.playerMode) {
        // VOD navigation
        if (ji) {
          if (13 === t || 32 === t) return We(), void (e.preventDefault && e.preventDefault());
          return (37 === t ? He("left") : 38 === t ? He("up") : 39 === t ? He("right") : 40 === t && He("down")), void (e.preventDefault && e.preventDefault());
        }
        if (Vi) {
          if (13 === t || 32 === t) return wa(), We(), void (e.preventDefault && e.preventDefault());
          return wa(), (37 === t ? He("left") : 38 === t ? He("up") : 39 === t ? He("right") : 40 === t && He("down")), void (e.preventDefault && e.preventDefault());
        }
        if (typeof _isSeeking !== "undefined" && _isSeeking && (13 === t || 32 === t)) {
          _commitSeek();
          return void (e.preventDefault && e.preventDefault());
        }
        if (37 === t) return si(-10), void (e.preventDefault && e.preventDefault());
        if (39 === t) return si(10), void (e.preventDefault && e.preventDefault());
        if (40 === t) return Sa(), void (e.preventDefault && e.preventDefault());
        if (38 === t) return ke.infobar ? ui() : pi(), void (e.preventDefault && e.preventDefault());
        if (13 === t || 32 === t) return di(), void (e.preventDefault && e.preventDefault());
      }

      // General navigation (outside player)
      if (37 === t) He("left");
      else if (38 === t) He("up");
      else if (39 === t) He("right");
      else if (40 === t) He("down");
      else if (13 === t || 32 === t) {
        if ("welcome" === ke.screen) return void Xe();
        if (ke.episodeBrowserOpen) return void We();
        if (ji) We();
        else if (Vi) wa(), We();
        else if ("player" === ke.screen && ke.streamError && pe && (pe.currentSrc || pe.src)) {
          var S = pe.play();
          S && S.catch && S.catch(function () { });
          ke.streamError = "";
          cn("");
        } else {
          We();
        }
      } else {
        r = !1;
      }
      r && e.preventDefault && e.preventDefault();
    }
  }
  function Xe() {
    Pe && (clearTimeout(Pe), clearInterval(Pe), Pe = null);
    openProfilesScreen(null, !0);
  }
  function shelfScore(sh) { var n = (sh && sh.name || "").toLowerCase(); if (n.indexOf("2026") !== -1 && (n.indexOf("teatral") !== -1 || n.indexOf("pelicula") !== -1)) return 100; if (n.indexOf("2026") !== -1) return 90; if (n.indexOf("estreno") !== -1 || n.indexOf("novedad") !== -1) return 80; if (n.indexOf("top") !== -1) return 70; if (n.indexOf("tráiler") !== -1 || n.indexOf("trailer") !== -1) return 10; return 50; }
  function renderMagisShelves(containerEl, rootCode, startY) {
    var pRoots = window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.roots;
    var rootObj = pRoots && pRoots[rootCode];
    var rawShelves = (rootObj && rootObj.shelves) || [];
    var shelves = rawShelves.slice().sort(function (a, b) { return shelfScore(b) - shelfScore(a); });
    if (!shelves.length) return;

    var curY = startY;
    var maxShelves = Math.min(shelves.length, 16);
    for (var s = 0; s < maxShelves; s++) {
      var shelf = shelves[s];
      if (!shelf || !shelf.items || !shelf.items.length) continue;

      var titleEl = n("div", "home-shelf-title", shelf.name);
      l(titleEl, 192, curY, 1600, 36);
      containerEl.appendChild(titleEl);

      var rowEl = n("div", "poster-row scrollable");
      l(rowEl, 192, curY + 45, 1728, 360);
      rowEl._shelfIdx = s;

      var pList = shelf.items;
      var isCurPage = containerEl.classList.contains("is-current");
      for (var d = 0; d < pList.length; d++) {
        var posterEl = et(pList[d], 0, 0, 250, 350, { gold: !0, posterIdx: d, deferImage: (!isCurPage || s >= 2) });
        posterEl._shelfIdx = s;
        posterEl._posterIdx = d;
        posterEl._rowEl = rowEl;
        posterEl.style.position = "relative";
        posterEl.style.display = "inline-block";
        posterEl.style.marginRight = "26px";
        posterEl.style.verticalAlign = "top";
        posterEl.style.left = "";
        posterEl.style.top = "";
        posterEl._onMove = function (dir) {
          var row = this._rowEl;
          var pIdx = this._posterIdx;
          var allRows = containerEl.querySelectorAll(".poster-row");
          if ("left" === dir) {
            if (pIdx > 0 && row.children[pIdx - 1]) {
              Fe(row.children[pIdx - 1]);
              return !0;
            }
            if (Ee[ke.tab]) {
              Fe(Ee[ke.tab]);
              return !0;
            }
            return !0;
          }
          if ("right" === dir) {
            if (pIdx < row.children.length - 1 && row.children[pIdx + 1]) {
              Fe(row.children[pIdx + 1]);
              return !0;
            }
            return !0;
          }
          if ("up" === dir) {
            var rPos = -1;
            for (var ri = 0; ri < allRows.length; ri++) {
              if (allRows[ri] === row) { rPos = ri; break; }
            }
            if (rPos <= 0) {
              var bentos = containerEl.querySelectorAll(".bento");
              if (bentos && bentos.length >= 6) {
                var bIdx = 2 + Math.min(3, Math.floor(pIdx / 2));
                if (bentos[bIdx]) {
                  Fe(bentos[bIdx]);
                  return !0;
                }
              }
            } else {
              var prevRow = allRows[rPos - 1];
              if (prevRow && prevRow.children.length) {
                var targetIdx = Math.min(pIdx, prevRow.children.length - 1);
                Fe(prevRow.children[targetIdx]);
                return !0;
              }
            }
            return !1;
          }
          if ("down" === dir) {
            var rPos = -1;
            for (var rj = 0; rj < allRows.length; rj++) {
              if (allRows[rj] === row) { rPos = rj; break; }
            }
            if (rPos >= 0 && rPos < allRows.length - 1) {
              var nextRow = allRows[rPos + 1];
              if (nextRow && nextRow.children.length) {
                var targetIdx = Math.min(pIdx, nextRow.children.length - 1);
                Fe(nextRow.children[targetIdx]);
                return !0;
              }
            }
            return !0;
          }
          return !1;
        };
        rowEl.appendChild(posterEl);
      }
      containerEl.appendChild(rowEl);
      curY += 430;
    }
  }

  function extractFreshBentoItems(rootKey, rootObj) {
    if (!rootObj) return [];
    var rawShelves = rootObj.shelves || [];
    var shelves = rawShelves.slice().sort(function (a, b) { return shelfScore(b) - shelfScore(a); });
    var allItems = rootObj.items || [];
    var candidates = [];
    var seen = {};

    function addCandidate(it) {
      if (!it || !it.id || seen[it.id]) return;
      seen[it.id] = true;
      candidates.push(it);
    }

    for (var s = 0; s < shelves.length; s++) {
      var sh = shelves[s];
      if (!sh || !sh.name) continue;
      var nameLower = sh.name.toLowerCase();
      if (nameLower.indexOf("2026") !== -1 || nameLower.indexOf("estreno") !== -1 || nameLower.indexOf("novedad") !== -1 || nameLower.indexOf("teatral") !== -1 || nameLower.indexOf("top") !== -1) {
        for (var k = 0; k < (sh.items || []).length; k++) {
          addCandidate(sh.items[k]);
          if (candidates.length >= 24) break;
        }
      }
      if (candidates.length >= 24) break;
    }

    for (var j = 0; j < shelves.length; j++) {
      var sh2 = shelves[j];
      for (var m = 0; m < (sh2.items || []).length; m++) {
        addCandidate(sh2.items[m]);
        if (candidates.length >= 24) break;
      }
      if (candidates.length >= 24) break;
    }

    for (var p = 0; p < allItems.length; p++) {
      addCandidate(allItems[p]);
      if (candidates.length >= 24) break;
    }

    return candidates.slice(0, 24);
  }

  function updateSingleBentoBox(b, it) {
    if (!b || !it) return;
    b._item = it;
    (function (item) {
      b._activate = function () { At(item); };
    })(it);
    var d = it.landscape || it.backdrop || it.poster || "";
    var img = b.querySelector(".bento-img");
    if (d) {
      if (!img) {
        img = n("img", "bento-img");
        img.decoding = "async";
        try { img.fetchPriority = "high"; } catch (ex) { }
        img.onload = function () { this.classList.add("is-loaded"); };
        img.onerror = function () {
          if (it.backdrop && it.backdrop !== d) {
            this.src = it.backdrop;
          } else if (it.poster && it.poster !== d) {
            this.src = it.poster;
          } else {
            this.style.display = "none";
          }
        };
        b.insertBefore(img, b.firstChild);
        img.src = d;
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add("is-loaded");
        }
      } else if (img.src !== d && img.getAttribute("src") !== d) {
        img.decoding = "async";
        try { img.fetchPriority = "high"; } catch (ex) { }
        img.src = d;
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add("is-loaded");
        }
      }
    }
    var shade = b.querySelector(".bento-shade");
    if (!shade) {
      shade = n("div", "bento-shade");
      b.appendChild(shade);
    }
    var title = b.querySelector(".bento-title");
    if (it.title) {
      if (!title) {
        title = n("div", "bento-title", it.title);
        b.appendChild(title);
      } else {
        title.textContent = it.title;
      }
    }
  }

  function updateBentoItems(containerEl, items, options) {
    if (!containerEl || !items || !items.length) return;
    var bentos = containerEl.querySelectorAll(".bento");
    if (!bentos || bentos.length < 6) return;
    options = options || {};
    for (var i = 0; i < 6; i++) {
      var it = items[i % items.length];
      if (it && bentos[i]) {
        updateSingleBentoBox(bentos[i], it);
      }
    }
  }

  function updatePageShelves(containerEl, rootCode, startY) {
    if (!containerEl) return;
    var existingTitles = containerEl.querySelectorAll(".home-shelf-title");
    var existingRows = containerEl.querySelectorAll(".poster-row");
    var focusInShelves = false;
    if (ke.focus) {
      for (var r = 0; r < existingRows.length; r++) {
        if (existingRows[r].contains(ke.focus)) {
          focusInShelves = true;
          break;
        }
      }
    }
    if (focusInShelves) return;
    for (var i = 0; i < existingTitles.length; i++) {
      existingTitles[i].parentNode && existingTitles[i].parentNode.removeChild(existingTitles[i]);
    }
    for (var j = 0; j < existingRows.length; j++) {
      existingRows[j].parentNode && existingRows[j].parentNode.removeChild(existingRows[j]);
    }
    renderMagisShelves(containerEl, rootCode, startY);
  }

  var _syncingRoots = {};
  function syncMagisRoot(rootKey, pageIdx, pageEl) {
    var now = Date.now();
    if (_syncingRoots[rootKey] && (now - _syncingRoots[rootKey] < 60000)) return;
    _syncingRoots[rootKey] = now;
    D("home", { root: rootKey }, function (err, res) {
      if (!err && res && res.shelves && res.shelves.length) {
        var rootCode = "masnew_" + rootKey;
        if (window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.roots) {
          window.XUPERTV_PORTAL.roots[rootCode] = {
            name: rootKey,
            shelves: res.shelves,
            items: res.items || []
          };
        }
        if (res.items && res.items.length && Array.isArray(u)) {
          var existingMap = {};
          for (var k = 0; k < u.length; k++) existingMap[u[k].id] = true;
          for (var m = 0; m < res.items.length; m++) {
            if (!existingMap[res.items[m].id]) {
              existingMap[res.items[m].id] = true;
              u.push(T(res.items[m], u.length + 1));
            }
          }
        }
        var targetEl = pageEl || (Te && Te[pageIdx]);
        if (targetEl) {
          var freshBento = extractFreshBentoItems(rootKey, res);
          if (freshBento && freshBento.length) {
            if (targetEl._setBentoItems) {
              targetEl._setBentoItems(freshBento);
            } else {
              updateBentoItems(targetEl, freshBento, { titles: true });
            }
          }
          updatePageShelves(targetEl, rootCode, 840);
        }
      }
    });
  }

  var _customSportsChannels = [
    { id: 9001, channelCode: "espn_n_1", name: "ESPN (N)", streamUrl: "http://190.60.52.28:5001/play/a0d7/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9002, channelCode: "espn_2_n1", name: "ESPN 2 (N1)", streamUrl: "http://190.60.52.28:5001/play/a0f5/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9003, channelCode: "espn_2_n2", name: "ESPN 2 (N2)", streamUrl: "http://190.60.52.28:5001/play/a0d6/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9004, channelCode: "espn_2_n3", name: "ESPN 2 (N3)", streamUrl: "http://190.60.52.28:5001/play/a0c6/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9005, channelCode: "espn_2_hd_n2", name: "ESPN 2 HD (N2)", streamUrl: "http://190.60.52.28:5001/play/a09t/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9006, channelCode: "espn_3_n", name: "ESPN 3 (N)", streamUrl: "http://190.60.52.28:5001/play/a0cl/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9007, channelCode: "espn_3_hd_n2", name: "ESPN 3 HD (N2)", streamUrl: "http://190.60.52.28:5001/play/a094/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9008, channelCode: "espn_4_hd_n", name: "ESPN 4HD (N)", streamUrl: "http://190.60.52.28:5001/play/a0as/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9009, channelCode: "espn_5_n", name: "ESPN 5 (N)", streamUrl: "http://190.60.52.28:5001/play/a0dn/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9010, channelCode: "espn_5_hd_n2", name: "ESPN 5HD (N2)", streamUrl: "http://190.60.52.28:5001/play/a09q/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9011, channelCode: "espn_6_n", name: "ESPN 6 (N)", streamUrl: "http://190.60.52.28:5001/play/a0de/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9012, channelCode: "espn_6_hd_n2", name: "ESPN 6HD (N2)", streamUrl: "http://190.60.52.28:5001/play/a095/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9013, channelCode: "espn_7_n", name: "ESPN 7 (N)", streamUrl: "http://190.60.52.28:5001/play/a0dd/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9014, channelCode: "espn_7_hd_n2", name: "ESPN 7HD (N2)", streamUrl: "http://190.60.52.28:5001/play/a0ak/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9015, channelCode: "espn_hd_n", name: "ESPN HD (N)", streamUrl: "http://190.60.52.28:5001/play/a0ar/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9016, channelCode: "espn_prem_hd_n1", name: "ESPN Premium HD (N1)", streamUrl: "http://190.60.52.28:5001/play/a09d/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9017, channelCode: "espn_prem_hd_n", name: "ESPN Premium HD (N)", streamUrl: "http://190.60.52.28:5001/play/a0fz/index.m3u8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9018, channelCode: "espn_alt_1", name: "ESPN", streamUrl: "http://181.78.79.131:8000/play/a0s7", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9019, channelCode: "espn_2_hd_alt", name: "ESPN 2 HD", streamUrl: "http://181.78.79.131:8000/play/a0qj", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9020, channelCode: "espn_3_hd_alt", name: "ESPN 3 HD", streamUrl: "http://181.78.79.131:8000/play/a0s6", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9021, channelCode: "espn_4_hd_alt", name: "ESPN 4 HD", streamUrl: "http://181.78.79.131:8000/play/a0s9", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9022, channelCode: "espn_5_hd_alt", name: "ESPN 5 HD", streamUrl: "http://181.78.79.131:8000/play/a0s5", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9023, channelCode: "espn_6_hd_alt", name: "ESPN 6 HD", streamUrl: "http://181.78.79.131:8000/play/a0s3", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9024, channelCode: "espn_7_hd_alt", name: "ESPN 7 HD", streamUrl: "http://181.78.79.131:8000/play/a0s8", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9025, channelCode: "espn_prem_alt", name: "Espn Premium", streamUrl: "http://181.78.79.131:8000/play/a0r2", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true },
    { id: 9026, channelCode: "gol_tv", name: "GOL TV", streamUrl: "http://181.78.79.131:8000/play/a0t0", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: false },
    { id: 9027, channelCode: "l1_max", name: "L1 MAX", streamUrl: "http://181.78.79.131:8000/play/a0ql", logo: "assets/original/home/live_channel_default_icon.png", category: "Deportes", categoryId: 76206, now: "En vivo", time: "24/7", uhd: true }
  ];

  function _mergeCustomSportsChannels(apiList) {
    var list = (apiList && apiList.slice()) || [];
    var custom = _customSportsChannels.map(function (c, i) {
      var item = {};
      for (var k in c) if (c.hasOwnProperty(k)) item[k] = c[k];
      item.index = i + 1;
      return item;
    });
    var seenUrls = {};
    for (var i = 0; i < list.length; i++) {
      if (list[i].streamUrl) seenUrls[list[i].streamUrl] = true;
    }
    var added = [];
    for (var j = 0; j < custom.length; j++) {
      if (!seenUrls[custom[j].streamUrl]) {
        added.push(custom[j]);
      }
    }
    var res = added.concat(list);
    for (var idx = 0; idx < res.length; idx++) {
      res[idx].index = idx + 1;
    }
    return res;
  }

  var Qe = [function (e) { $ = n("div", "live-main"), (dt = document.createElement("video")).className = "live-preview-video", dt.preload = "auto", dt.muted = !1, dt.volume = 1, dt.removeAttribute("muted"), dt.setAttribute("playsinline", ""), dt.setAttribute("webkit-playsinline", ""), $.appendChild(dt), $.appendChild(n("div", "live-frame")), $.appendChild(n("div", "live-logo")), ct = n("div", "live-preview-status"), $.appendChild(ct), e.appendChild($); var t = n("div", "live-info"); (W = n("div", "live-channel")).style.right = "112.5px", t.appendChild(W); var i = n("div", "live-fullscreen"); i._activate = function () { hn("live") }, t.appendChild(i), $.appendChild(t); var a = n("div", "live-arrow-up"), r = n("div", "live-arrow-down"); e.appendChild(a), e.appendChild(r), Q = n("div", "live-list scrollable"), e.appendChild(Q), Ct(!1), bt(76197), (X = n("div", "live-focus focusable"))._onMove = function (e) { if ("up" === e) return ke.channel > 0 && St(ke.channel - 1), !0; if ("down" === e) return ke.channel < z.length - 1 && St(ke.channel + 1), !0; if ("right" === e) { var t = Me.filter(function (e) { return e._channel === ke.channel })[0]; return t ? Fe(t) : Me.length && Fe(Me[0]), !0 } return "left" === e && (Ee[0] && Fe(Ee[0]), !0) }, X._activate = function () { hn("live") }, e.appendChild(X) }, function (e) {
    var pRoots = window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.roots;
    var featRoot = pRoots && pRoots["masnew_featured"];
    var bentoItems = extractFreshBentoItems("featured", featRoot);
    if (!bentoItems.length) bentoItems = ((featRoot && featRoot.items && featRoot.items.length) ? featRoot.items : qt("destacado")).slice(0, 24);
    Mt(e, bentoItems, { titles: !0, dots: 4, shade: !0 });
    renderMagisShelves(e, "masnew_featured", 840);
    syncMagisRoot("featured", 1, e);
  }, function (e) {
    var pRoots = window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.roots;
    var movRoot = pRoots && pRoots["masnew_movies"];
    var bentoItems = extractFreshBentoItems("movies", movRoot);
    if (!bentoItems.length) bentoItems = ((movRoot && movRoot.items && movRoot.items.length) ? movRoot.items : qt("pelicula")).slice(0, 24);
    Mt(e, bentoItems, { titles: !0, dots: 4, shade: !0 });
    renderMagisShelves(e, "masnew_movies", 840);
    syncMagisRoot("movies", 2, e);
  }, function (e) {
    var pRoots = window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.roots;
    var serRoot = pRoots && pRoots["masnew_series"];
    var bentoItems = extractFreshBentoItems("series", serRoot);
    if (!bentoItems.length) bentoItems = ((serRoot && serRoot.items && serRoot.items.length) ? serRoot.items : qt("serie")).slice(0, 24);
    Mt(e, bentoItems, { titles: !0, dots: 3, shade: !0 });
    renderMagisShelves(e, "masnew_series", 840);
    syncMagisRoot("series", 3, e);
  }, function (e) {
    var pRoots = window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.roots;
    var kidsRoot = pRoots && pRoots["masnew_kids"];
    var bentoItems = extractFreshBentoItems("kids", kidsRoot);
    if (!bentoItems.length) bentoItems = ((kidsRoot && kidsRoot.items && kidsRoot.items.length) ? kidsRoot.items : q("infantil", 24, 0)).slice(0, 24);
    Mt(e, bentoItems, { titles: !0, dots: 4, shade: !0 });
    renderMagisShelves(e, "masnew_kids", 840);
    syncMagisRoot("kids", 4, e);
  }, function (e) {
    var pRoots = window.XUPERTV_PORTAL && window.XUPERTV_PORTAL.roots;
    var aniRoot = pRoots && pRoots["masnew_anime"];
    var bentoItems = extractFreshBentoItems("anime", aniRoot);
    if (!bentoItems.length) bentoItems = ((aniRoot && aniRoot.items && aniRoot.items.length) ? aniRoot.items : qt("anime")).slice(0, 24);
    Mt(e, bentoItems, { titles: !0, dots: 3, shade: !0 });
    renderMagisShelves(e, "masnew_anime", 840);
    syncMagisRoot("anime", 5, e);
  }, function (e) {
    var sportItems = [];
    for (var i = 0; i < u.length; i++) {
      var it = u[i];
      var g = (it.genres || []).map(function (x) { return String(x).toLowerCase(); });
      if (g.indexOf("sport") !== -1 || g.indexOf("deportes") !== -1 || g.indexOf("deporte") !== -1 || (it.category && String(it.category).toLowerCase().indexOf("deport") !== -1)) {
        sportItems.push(it);
      }
    }
    if (!sportItems.length) {
      sportItems = u.slice(0, 12);
    }
    Mt(e, sportItems, { titles: !0, dots: 3, shade: !0 });

    var titleEl = n("div", "home-shelf-title", "Canales de Deportes en Vivo");
    l(titleEl, 192, 840, 1600, 36);
    e.appendChild(titleEl);

    var rowEl = n("div", "poster-row scrollable");
    l(rowEl, 192, 885, 1728, 360);
    e.appendChild(rowEl);

    function _renderSportCards(chs) {
      o(rowEl);
      for (var d = 0; d < chs.length; d++) {
        (function (ch, idx) {
          var card = n("div", "poster focusable");
          l(card, 216 * idx, 0, 192, 288);
          var img = n("img", "p-img");
          img.src = ch.logo || "assets/original/home/live_channel_default_icon.png";
          img.onerror = function () { this.src = "assets/original/home/live_channel_default_icon.png"; };
          card.appendChild(img);
          card.appendChild(n("div", "p-shade"));
          card.appendChild(n("div", "p-title", ch.name));
          card._activate = function () {
            rt = { id: 76206, name: "Deportes" };
            var fullSports = _mergeCustomSportsChannels(_catChannelsCache[76206] || []);
            _catChannelsCache[76206] = fullSports;
            z.splice(0, z.length);
            for (var s = 0; s < fullSports.length; s++) z.push(fullSports[s]);
            var chIdx = -1;
            for (var k = 0; k < z.length; k++) {
              if ((z[k].channelCode && z[k].channelCode === ch.channelCode) || (z[k].streamUrl && z[k].streamUrl === ch.streamUrl)) { chIdx = k; break; }
            }
            if (chIdx >= 0) {
              ke.channel = chIdx;
            } else {
              z.push(ch);
              ke.channel = z.length - 1;
            }
            hn("live", ch);
          };
          rowEl.appendChild(card);
        })(chs[d], d);
      }
    }

    _renderSportCards(_mergeCustomSportsChannels(_catChannelsCache[76206] || []));

    D("liveChannels", { columnId: 76206 }, function (err, res) {
      var chs = (res && res.channels && res.channels.length) ? res.channels : [];
      var full = _mergeCustomSportsChannels(chs);
      _catChannelsCache[76206] = full;
      _registerMasterChannels(full);
      _renderSportCards(full);
    });

    if (sportItems.length > 3) {
      var title2 = n("div", "home-shelf-title", "Películas y Series Deportivas");
      l(title2, 192, 1280, 1600, 36);
      e.appendChild(title2);

      var row2 = n("div", "poster-row scrollable");
      l(row2, 192, 1325, 1728, 360);
      e.appendChild(row2);

      for (var s = 0; s < sportItems.length; s++) {
        (function (sp, sIdx) {
          var card = et(sp, 216 * sIdx, 0, 192, 288, { title: !0, shade: !0 });
          row2.appendChild(card);
        })(sportItems[s], s);
      }
    }
  }], Ge = {}; function Je(e) { !Ge[e] && Te[e] && Qe[e] && (Ge[e] = !0, Qe[e](Te[e])) } function Ke() {
    Ie = !0; V = r("home-pages"); j = r("home-notify"); o(V); Te = []; Ge = {}; for (var e = 0; e < Qe.length; e++) { var t = n("div", "home-page scrollable"); 0 === e && t.classList.add("is-current"); V.appendChild(t); Te.push(t) }
    Je(_e[ke.tab] && _e[ke.tab].page >= 0 ? _e[ke.tab].page : 0);
    // Staggered pre-warming of category pages during startup/welcome/profiles so Bento DOM and images are ready instantly
    setTimeout(function () { Je(1); }, 250);
    setTimeout(function () { Je(2); }, 500);
    setTimeout(function () { Je(3); }, 750);
    setTimeout(function () { Je(4); }, 1000);
    setTimeout(function () { Je(5); }, 1250);
    setTimeout(function () { Je(6); }, 1500);
    setTimeout(function () {
      if (Te[1]) syncMagisRoot("featured", 1, Te[1]);
      setTimeout(function () { if (Te[2]) syncMagisRoot("movies", 2, Te[2]); }, 1500);
      setTimeout(function () { if (Te[3]) syncMagisRoot("series", 3, Te[3]); }, 3000);
    }, 2500); (function () { var e = r("home-tabs"); o(e); e.classList.add("scrollable"); e.classList.add("is-expanded"); Ee = []; for (var t = 0; t < _e.length; t++) { var i = n("div", "tab-item focusable"); i.appendChild(n("div", "tab-pill")); var a = n("div", "tab-icon"); a.innerHTML = xe[_e[t].icon] || ""; i.appendChild(a); var l = n("div", "tab-title", _e[t].label); i.appendChild(l); i._tab = t; i._activate = (function (e) { return function () { if (Ze(e, !1), 0 === e) { var t = Me.filter(function (e) { return e._channel === ke.channel })[0]; t ? Fe(t) : Me.length ? Fe(Me[0]) : X && Fe(X) } else if (_e[e].page >= 0) { var i = Be(Te[_e[e].page]); i && Fe(i) } } })(t); i._onMove = (function (e) { return function (t) { if ("up" === t) { if (e > 0 && Ee[e - 1]) return Fe(Ee[e - 1]), Ze(e - 1, !1), !0; var rec = j ? j.querySelector(".rec") || j.querySelector(".notify-item") : null; return rec ? (Fe(rec), !0) : !0; } if ("down" === t) return e < Ee.length - 1 && Ee[e + 1] && (Fe(Ee[e + 1]), Ze(e + 1, !1)), !0; if ("left" === t) return !0; if ("right" === t) { if (Ze(e, !1), 0 === e) { var i = Me.filter(function (e) { return e._channel === ke.channel })[0]; i ? Fe(i) : Me.length ? Fe(Me[0]) : X && Fe(X) } else if (_e[e].page >= 0) { var a = Be(Te[_e[e].page]); a && Fe(a) } return !0 } return !1 } })(t); e.appendChild(i); Ee.push(i) } })(); (function () {
      o(j); for (var e = [{ cls: "search", icon: "assets/original/home/icon_notify_search.png", small: !0 }, { cls: "filter", icon: "assets/original/search/icon_category_filter_n.png", small: !0 }, { cls: "rec", icon: "assets/original/home/icon_notify_records.png", small: !1 }, { cls: "settings", icon: "assets/original/home/icon_notify_setting.png", small: !0 }, { cls: "profile", icon: "assets/original/home/icon_notify_personal.png", small: !0 }], t = 0; t < e.length; t++) {
        var i = e[t], a = n("div", "notify-item focusable " + i.cls + (i.small ? " is-small" : "")), r = n("div", "n-normal"); r.style.backgroundImage = "url(" + i.icon + ")"; a.appendChild(r); a._idx = t;
        if ("settings" === i.cls) a._activate = function () { Jt(); };
        else if ("profile" === i.cls) a._activate = function () { openProfilesScreen("home"); };
        else if ("search" === i.cls) a._activate = function () { zt(); };
        else if ("rec" === i.cls) a._activate = function () { openSettingsHistory(); };
        else if ("filter" === i.cls) a._activate = function () { openFilterDialog(); };
        else a._activate = function () { };
        a._onMove = (function (idx) {
          return function (dir) {
            var items = j.querySelectorAll(".notify-item");
            if ("left" === dir) {
              if (idx > 0 && items[idx - 1]) return Fe(items[idx - 1]), !0;
              if (Ee[ke.tab]) return Fe(Ee[ke.tab]), !0;
            }
            if ("right" === dir) {
              if (idx < items.length - 1 && items[idx + 1]) return Fe(items[idx + 1]), !0;
              return !0;
            }
            if ("down" === dir) {
              if (0 === ke.tab) {
                var curChan = Me.filter(function (e) { return e._channel === ke.channel; })[0];
                return curChan ? Fe(curChan) : Me.length ? Fe(Me[0]) : X ? Fe(X) : Ee[0] && Fe(Ee[0]), !0;
              }
              var page = Te[_e[ke.tab].page];
              var first = page ? Be(page) : null;
              if (first) return Fe(first), !0;
              if (Ee[ke.tab]) return Fe(Ee[ke.tab]), !0;
            }
            return !1;
          };
        })(t);
        j.appendChild(a)
      } var l = n("div", "notify-divider"); j.appendChild(l); var s = n("div", "notify-wifi"); s.innerHTML = '<svg viewBox="0 0 30 22"><path d="M15 19.5a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2z" fill="currentColor"/><path d="M8.4 12.2a9.6 9.6 0 0 1 13.2 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M4.2 7.6a15.6 15.6 0 0 1 21.6 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>'; j.appendChild(s); var d = n("div", "notify-time"); d.id = "notify-time"; d.title = "Ajuste de hora"; d.addEventListener("click", function () {
        if (_clockHourOffset === 0) _clockHourOffset = 1;
        else if (_clockHourOffset === 1) _clockHourOffset = -1;
        else _clockHourOffset = 0;
        try { localStorage.setItem("xuper_clock_offset", _clockHourOffset); } catch (ex) { }
        Ye();
      }); j.appendChild(d); Ye(); setInterval(Ye, 3e4);
    })();
  } var _clockHourOffset = 0;
  try {
    localStorage.removeItem("xuper_clock_offset");
  } catch (e) { }

  function Ye() {
    var e = r("notify-time");
    if (e) {
      var now = new Date(Date.now() + _clockHourOffset * 3600000);
      var h = now.getHours();
      var ampm = h >= 12 ? "PM" : "AM";
      0 === (h %= 12) && (h = 12);
      var m = now.getMinutes();
      e.textContent = (h < 10 ? "0" + h : h) + ":" + d(m) + " " + ampm;
    }
  } function Ze(e, t) { var i = _e[e]; if (i.page < 0) Jt(); else { var a = _e[ke.tab] ? _e[ke.tab].page : i.page; ke.tab = e; for (var n = 0; n < Ee.length; n++)Ee[n].classList.toggle("is-selected", n === e); i.page >= 0 && Je(i.page), 0 === i.page ? mt(z[ke.channel]) : ht(); var _tabRootKeys = { 1: "featured", 2: "movies", 3: "series", 4: "kids", 5: "anime" }; if (_tabRootKeys[e] && Te && Te[i.page]) { syncMagisRoot(_tabRootKeys[e], i.page, Te[i.page]); } for (var r = 0; r < Te.length; r++)Te[r].classList.remove("is-entering", "from-left", "from-right"), Te[r].classList.toggle("is-current", r === i.page); if (i.page !== a && Te[i.page]) { var o = Te[i.page]; o.classList.add("is-entering", i.page > a ? "from-right" : "from-left"), setTimeout(function () { o.classList.remove("is-entering", "from-left", "from-right") }, 320) } if (t) if (0 === i.page) { var l = Me.filter(function (e) { return e._channel === ke.channel })[0]; l ? Fe(l) : Me.length ? Fe(Me[0]) : X && Fe(X) } else { var s = Be(Te[i.page]); s && Fe(s) } } } function et(e, t, i, a, r, o) {
  o = o || {};
  var s = n("div", "poster focusable" + (o.gold ? " gold" : "") + (o.type3 ? " type3" : ""));
  if (l(s, t, i, a, r), e && e.poster) {
    var d = n("img", "p-img");
    d.onload = function () { this.style.display = "block"; };
    d.onerror = function () { this.style.display = "none"; };
    if (o.deferImage) {
      setTimeout(function () {
        if (!d.src) {
          try { d.fetchPriority = "low"; } catch (ex) { }
          d.src = e.poster;
        }
      }, 350);
    } else {
      try { d.fetchPriority = (o.posterIdx < 6 ? "high" : "low"); } catch (ex) { }
      d.src = e.poster;
    }
    s.appendChild(d);
  }
  s.appendChild(n("div", "p-shade"));
  s.appendChild(n("div", "p-title", e && e.title ? e.title : ""));
  s._item = e;
  s._activate = function () { At(e); };
  return s;
}
  var nt = [], rt = null, ot = !1, lt = !1, st = !1, dt = null, ct = null, pt = 0, ut = null, ft = "", vt = !1;
  function ht() { if (pt++, ft = "", ut && (clearTimeout(ut), ut = null), $ && $.classList.remove("is-preview-playing", "is-preview-loading"), ct && (ct.textContent = ""), dt) { try { dt.pause() } catch (e) { } dt.removeAttribute("src"); try { dt.src = "", dt.load() } catch (e) { } } }
  function mt(e) { ut && clearTimeout(ut), ut = setTimeout(function () { ut = null, function (e) { if (dt && e && (e.channelCode || e.streamUrl) && "home" === ke.screen && 0 === ke.tab) { var t = e.channelCode || e.streamUrl; if (t !== ft || !$ || !$.classList.contains("is-preview-loading") && !$.classList.contains("is-preview-playing")) { ht(), ft = t; var i = ++pt; $.classList.add("is-preview-loading"), ct && (ct.textContent = "Cargando " + (e.name || "canal") + "…"), D("resolveLive", e.streamUrl ? { streamUrl: e.streamUrl } : { channelCode: e.channelCode }, function (e, t) { if (i === pt && "home" === ke.screen && 0 === ke.tab) { var a = !e && t && !1 !== t.returnValue && (t.proxyPath || t.url); if (!a) return $.classList.remove("is-preview-loading"), void (ct && (ct.textContent = "")); dt.onloadeddata = function () { i === pt && ($.classList.remove("is-preview-loading"), $.classList.add("is-preview-playing"), ct && (ct.textContent = "")) }, dt.onerror = function () { i === pt && ($.classList.remove("is-preview-loading", "is-preview-playing"), ct && (ct.textContent = "")) }; try { dt.src = a, dt.load(), dt.muted = !1, dt.volume = 1; var n = dt.play(); n && n.catch && n.catch(function () { }) } catch (e) { $.classList.remove("is-preview-loading") } } }) } } }(e || z[ke.channel]) }, 200) }
  function gt(e, t) {
    if (e) {
      _selectCategory(e, null, !1, t);
    }
  }
  var _catChannelsCache = {};
  var _liveCategoryLoadSeq = 0;

  function bt(e, t) {
    e = e || (rt ? rt.id : 76197);
    var loadSeq = ++_liveCategoryLoadSeq;
    var isSports = (e === 76206 || String(e) === "76206");
    D("liveChannels", e && 76182 !== e ? { columnId: e } : {}, function (i, a) {
      if (loadSeq === _liveCategoryLoadSeq) {
        var chs = (a && a.channels && a.channels.length) ? a.channels : [];
        if (isSports) chs = _mergeCustomSportsChannels(chs);
        if (chs.length) {
          _catChannelsCache[e] = chs;
          z.splice(0, z.length);
          for (var n = 0; n < chs.length; n++)z.push(chs[n]);
          _registerMasterChannels(chs), _rawChannels = z.slice(), lt = !0, Ct(!1), Ja(), ke.channel >= z.length && (ke.channel = 0), z[ke.channel] && W && (W.textContent = z[ke.channel].name), "player" === ke.screen && "live" === ke.playerMode ? bn() : mt(z[ke.channel]);
        }
      }
      ot || function (e) {
        ot && nt.length ? e && e(null, nt) : D("liveCategories", {}, function (t, i) {
          var a = [];
          if (i && i.categories && i.categories.length) {
            for (var n = 0; n < i.categories.length; n++) {
              var r = i.categories[n], o = r.name;
              "ChannelList" !== o && 76182 !== r.id || (o = "Todos"), a.push({ id: r.id, name: o, code: r.code });
            }
          } else a = [{ id: 76197, name: "México" }, { id: 76188, name: "Colombia" }, { id: 76206, name: "Deportes" }, { id: 76205, name: "Cine y Series" }, { id: 76191, name: "España" }];
          var _mexIdx = -1;
          for (var mi = 0; mi < a.length; mi++) {
            if (a[mi].id === 76197 || /m[ée]xic/i.test(a[mi].name)) { _mexIdx = mi; break; }
          }
          if (_mexIdx > 0) { var _mItem = a.splice(_mexIdx, 1)[0]; a.unshift(_mItem); }
          else if (_mexIdx === -1) { a.unshift({ id: 76197, name: "México" }); }
          nt = a, ot = !0, rt = nt[0];
          if (ce) {
            Qa();
          }
          e && e(null, nt);
        });
      }(), t && t(i, a);
    });
  } function Ct(e) { if (Q) { o(Q), Me = []; for (var t = 0; t < z.length; t++)if ((ke.crOn || !isAdultContent(z[t])) && (!e || z[t].fav)) { var i = n("div", "live-row focusable"); i._channel = t; var a = n("div", "row-icon"); z[t].logo && (a.style.backgroundImage = "url(" + z[t].logo + ")", a.style.backgroundSize = "contain", a.style.backgroundRepeat = "no-repeat", a.style.backgroundPosition = "center"); var r = n("div", "row-play"), l = n("div", "row-name", z[t].name); i.appendChild(a), i.appendChild(r), i.appendChild(l), t === ke.channel && i.classList.add("is-current"), i._activate = function (e) { return function () { St(e, !0), hn("live") } }(t), i._onMove = function (e) { return function (t) { return "left" === t ? (X ? Fe(X) : Ee[0] && Fe(Ee[0]), !0) : "up" === t ? (e > 0 && Me[e - 1] ? Fe(Me[e - 1]) : (function () { var rec = j ? j.querySelector(".rec") || j.querySelector(".notify-item") : null; rec && Fe(rec); })(), !0) : "down" === t && (e < Me.length - 1 && Me[e + 1] && Fe(Me[e + 1]), !0) } }(t), Q.appendChild(i), Me.push(i) } z[ke.channel] && W && (W.textContent = z[ke.channel].name), wt() } } var _prevLiveIdx = -1; function wt() { if (Me.length && Q) { var e = ke.channel; var t = 120 * e, i = Math.max(0, Q.scrollHeight - Q.clientHeight), a = Q.scrollTop; t < a && (a = t), t + 100.5 > a + Q.clientHeight && (a = t + 100.5 - Q.clientHeight), Q.scrollTop = Math.max(0, Math.min(i, a)) } } function St(e, t) { e < 0 && (e = 0), e > z.length - 1 && (e = z.length - 1); var prev = _prevLiveIdx >= 0 ? _prevLiveIdx : ke.channel; if (ke.channel !== e && ke.channel >= 0) { _lastWatchedLiveChannel = ke.channel; } ke.channel = e, _prevLiveIdx = e; if (Me[prev] && prev !== e) Me[prev].classList.remove("is-current"); if (Me[e]) Me[e].classList.add("is-current"); z[e] && W && (W.textContent = z[e].name), wt(), "player" === ke.screen ? (!function () { if (!se) return; bn() }(), "live" === ke.playerMode && yn(z[e], !!t)) : "home" === ke.screen && 0 === ke.tab && mt(z[e]) }
  var It = { bigW: 831, bigH: 534, bigY: 38.5, smallW: 413, smallH: 222, smallY: 578.5, bigX: [192, 1029], smallX: [192, 609, 1028, 1446] };
  function Tt(e, t, i, a, r, o) {
    o = o || {};
    var s = n("div", "bento focusable");
    l(s, t, i, a, r);
    var d = e ? (e.landscape || e.backdrop || e.poster || "") : "";
    if (d) {
      var c = n("img", "bento-img");
      c.decoding = "async";
      try { c.fetchPriority = "high"; } catch (ex) { }
      c.onload = function () { c.classList.add("is-loaded"); };
      c.onerror = function () {
        if (e && e.backdrop && e.backdrop !== d) {
          this.src = e.backdrop;
        } else if (e && e.poster && e.poster !== d) {
          this.src = e.poster;
        } else {
          this.style.display = "none";
        }
      };
      c.src = d;
      if (c.complete && c.naturalWidth > 0) {
        c.classList.add("is-loaded");
      }
      s.appendChild(c);
    }
    return o.shade && s.appendChild(n("div", "bento-shade")),
      o.title && e && s.appendChild(n("div", "bento-title", e.title)),
      o.badge && s.appendChild(n("div", "bento-badge", o.badge)),
      s._item = e,
      e && (s._activate = function () { At(e); }),
      s._onMove = function (dir) {
        if ("up" === dir && i <= 50) {
          var rec = j ? j.querySelector(".rec") || j.querySelector(".notify-item") : null;
          if (rec) return Fe(rec), !0;
        }
        return !1;
      },
      s;
  }
  function Et(e, t, i, a) { var r = n("div", "bento-dots"); l(r, e, t, 21 + 40 * Math.max(0, i - 1), 11); for (var o = 0; o < i; o++)r.appendChild(n("span", "bento-dot" + (o === a ? " is-active" : ""))); return r }
  function Mt(e, t, i) {
    i = i || {};
    var a = t.length ? t : u;
    if (!a.length) return;
    if (e._bentoTimer) {
      clearInterval(e._bentoTimer);
      e._bentoTimer = null;
    }
    var totalItems = a;
    var heroCount = Math.min(5, Math.max(2, i.dots || 4));
    if (totalItems.length <= heroCount) {
      heroCount = Math.max(1, totalItems.length);
    }
    var heroList = totalItems.slice(0, heroCount);
    for (var hi = 0; hi < heroList.length; hi++) {
      var hItem = heroList[hi];
      var hUrl = hItem ? (hItem.landscape || hItem.backdrop || hItem.poster) : "";
      if (hUrl) {
        var hPre = new Image();
        hPre.decoding = "async";
        try { hPre.fetchPriority = "high"; } catch (ex) { }
        hPre.src = hUrl;
      }
    }
    var numPages = heroList.length;
    var curPage = 0;
    var staticList = [];
    var sIdx = heroCount;
    for (var si = 0; si < 5; si++) {
      staticList.push(totalItems[(sIdx + si) % totalItems.length]);
    }
    var bList = [];

    // Big Card 0: Dynamic Carousel Hero (rotates)
    var bHero = Tt(heroList[0], It.bigX[0], It.bigY, It.bigW, It.bigH, { shade: !0, title: !0 });
    bHero._bentoIdx = 0;
    bHero._bentoContainer = e;
    e.appendChild(bHero);
    bList.push(bHero);

    // Big Card 1: Static category highlight
    var bBigStatic = Tt(staticList[0], It.bigX[1], It.bigY, It.bigW, It.bigH, { shade: !0, title: !0 });
    bBigStatic._bentoIdx = 1;
    bBigStatic._bentoContainer = e;
    e.appendChild(bBigStatic);
    bList.push(bBigStatic);

    // Small Cards 2..5: 4 Static category tiles
    for (var n = 0; n < 4; n++) {
      var bSm = Tt(staticList[n + 1], It.smallX[n], It.smallY, It.smallW, It.smallH, { shade: !0, title: !0 });
      bSm._bentoIdx = n + 2;
      bSm._bentoContainer = e;
      e.appendChild(bSm);
      bList.push(bSm);
    }

    var dotsContainer = null;
    function updateDots() {
      if (dotsContainer && dotsContainer.parentNode) {
        dotsContainer.parentNode.removeChild(dotsContainer);
        dotsContainer = null;
      }
      if (numPages > 1) {
        dotsContainer = Et(848, 535.5, numPages, curPage);
        e.appendChild(dotsContainer);
        var dotSpans = dotsContainer.querySelectorAll(".bento-dot");
        for (var di = 0; di < dotSpans.length; di++) {
          (function (dIndex) {
            dotSpans[dIndex].onclick = function (ev) {
              ev && ev.stopPropagation && ev.stopPropagation();
              setCarouselPage(dIndex);
              resetBentoTimer();
            };
          })(di);
        }
      }
    }
    updateDots();

    function setCarouselPage(pIdx) {
      if (!heroList.length) return;
      curPage = (pIdx + numPages) % numPages;
      if (dotsContainer) {
        var allDots = dotsContainer.querySelectorAll(".bento-dot");
        for (var d = 0; d < allDots.length; d++) {
          allDots[d].classList.toggle("is-active", d === curPage);
        }
      }
      // Update ONLY the first big box (Hero)
      updateSingleBentoBox(bList[0], heroList[curPage]);
    }

    function isFocusInBento() {
      if (!ke.focus || ke.screen !== "home") return !1;
      for (var b = 0; b < bList.length; b++) {
        if (bList[b] === ke.focus || (bList[b].contains && bList[b].contains(ke.focus))) return !0;
      }
      return !1;
    }

    function resetBentoTimer() {
      if (e._bentoTimer) {
        clearInterval(e._bentoTimer);
        e._bentoTimer = null;
      }
      if (numPages > 1) {
        e._bentoTimer = setInterval(function () {
          if (ke.screen !== "home") return;
          if (!e.classList.contains("is-current")) return;
          if (!isFocusInBento()) return;
          setCarouselPage(curPage + 1);
        }, 4500);
      }
    }

    for (var bi = 0; bi < bList.length; bi++) {
      (function (idx, el) {
        el._onFocus = function () {
          resetBentoTimer();
        };
        el._onMove = function (dir) {
          if ("left" === dir) {
            if (idx === 0 || idx === 2) {
              if (Ee[ke.tab]) return Fe(Ee[ke.tab]), !0;
            } else if (idx === 1) {
              return Fe(bList[0]), !0;
            } else if (idx > 2) {
              return Fe(bList[idx - 1]), !0;
            }
            return !1;
          } else if ("right" === dir) {
            if (idx === 0) {
              return Fe(bList[1]), !0;
            } else if (idx === 1) {
              return !0;
            } else if (idx >= 2 && idx < 5) {
              return Fe(bList[idx + 1]), !0;
            } else if (idx === 5) {
              return !0;
            }
            return !1;
          } else if ("up" === dir) {
            if (idx === 0 || idx === 1) {
              var rec = j ? (j.querySelector(".rec") || j.querySelector(".notify-item")) : null;
              if (rec) return Fe(rec), !0;
            } else if (idx === 2 || idx === 3) {
              return Fe(bList[0]), !0;
            } else if (idx === 4 || idx === 5) {
              return Fe(bList[1]), !0;
            }
            return !1;
          } else if ("down" === dir) {
            if (idx === 0) {
              return Fe(bList[2]), !0;
            } else if (idx === 1) {
              return Fe(bList[4]), !0;
            } else if (idx >= 2) {
              var firstRow = e.querySelector(".poster-row");
              if (firstRow && firstRow.children.length) {
                var targetIdx = Math.min((idx - 2) * 2, firstRow.children.length - 1);
                return Fe(firstRow.children[targetIdx]), !0;
              }
            }
            return !1;
          }
          return !1;
        };
      })(bi, bList[bi]);
    }

    e._setBentoItems = function (newItems) {
      if (newItems && newItems.length) {
        totalItems = newItems;
        heroCount = Math.min(5, Math.max(2, i.dots || 4));
        if (totalItems.length <= heroCount) {
          heroCount = Math.max(1, totalItems.length);
        }
        heroList = totalItems.slice(0, heroCount);
        numPages = heroList.length;
        curPage = curPage % numPages;
        staticList = [];
        var sIdx = heroCount;
        for (var si = 0; si < 5; si++) {
          staticList.push(totalItems[(sIdx + si) % totalItems.length]);
        }
        for (var sb = 1; sb < 6; sb++) {
          if (bList[sb] && staticList[sb - 1]) {
            updateSingleBentoBox(bList[sb], staticList[sb - 1]);
          }
        }
        updateDots();
        setCarouselPage(curPage);
        resetBentoTimer();
      }
    };

    resetBentoTimer();
  } function qt(e) { var t, i = []; for (t = 0; t < u.length; t++) { if (!ke.crOn && isAdultContent(u[t])) continue; if (!e || -1 !== c(u[t].category || "").split(",").indexOf(e) || u[t].kind && -1 !== c(u[t].kind).indexOf(e)) { i.push(u[t]); } } return i.length ? i : u } function Ot(e, t, i, a) { if (t && t.length) { var r = i || 860, o = n("div", "kids-subtitle", a || "Catálogo"); l(o, 192, r, 1249, 40), e.appendChild(o), r += 50; for (var s = Math.min(t.length, 60), d = 0; d < s; d++) { var c = 192 + 276 * (d % 6), p = r + 390 * Math.floor(d / 6); e.appendChild(et(t[d], c, p, 250, 360, { gold: !0, posterIdx: d, posterList: t })) } } } function At(e) {
    if (e && (e.portal || !e._portal && ("portal" === h.mode || String(e.id || "").length > 15))) e._portal = !0;
    var saved = getVodProgress(e.id);
    ke.detail = e;
    ke.detailReturn = { screen: ke.screen, focus: ke.focus };
    ke.detailRange = 0;
    ke.detailSeason = 0;
    ke.detailEpisode = null;
    if (saved && I(e)) {
      if (typeof saved.seasonIndex === "number" && saved.seasonIndex >= 0) {
        ke.detailSeason = saved.seasonIndex;
      }
      ke.playerSeasonIndex = ke.detailSeason;
    } else if (e.seasons && e.seasons.length) {
      for (var t = 0; t < e.seasons.length; t++)if (e.seasons[t].id === e.id) { ke.detailSeason = t; break; }
    }
    if (e.episodes && e.episodes.length) {
      if (saved && I(e)) {
        var foundEp = null;
        for (var epI = 0; epI < e.episodes.length; epI++) {
          var epObj = e.episodes[epI];
          if ((saved.episodeId && epObj.id === saved.episodeId) || (saved.episodeNumber && epObj.number === saved.episodeNumber)) {
            foundEp = epObj; ke.detailRange = Math.floor(epI / 20); break;
          }
        }
        ke.detailEpisode = foundEp || e.episodes[0];
      } else {
        ke.detailEpisode = e.episodes[0];
      }
    }
    va(), ua(e), ga(e), Pt(e), ze("detail"), se || Xa();
    var i = r("screen-player");
    i && (i.classList.add("is-mini"), i.classList.add("is-active"));
    var a = K ? K.querySelector(".focusable") : null;
    a && Fe(a);
    if (e._detailsLoaded) {
      if (saved && I(e) && saved.seasonIndex > 0 && e.seasons && e.seasons[saved.seasonIndex] && e.seasons[saved.seasonIndex].id !== e.seasonId) {
        var targetSeason = e.seasons[saved.seasonIndex];
        cn("Cargando temporada " + (targetSeason.number || saved.seasonIndex + 1) + "…");
        D("detail", { contentId: targetSeason.id }, function (err, res) {
          if (!err && res && !1 !== res.returnValue) {
            res.item && B(e, res.item);
            e.episodes = res.episodes || [];
            e.seasonId = targetSeason.id;
            if (e.episodes.length) {
              var found = null;
              for (var k = 0; k < e.episodes.length; k++) {
                if ((saved.episodeId && e.episodes[k].id === saved.episodeId) || (saved.episodeNumber && e.episodes[k].number === saved.episodeNumber)) {
                  found = e.episodes[k]; ke.detailRange = Math.floor(k / 20); break;
                }
              }
              ke.detailEpisode = found || e.episodes[0];
            }
          }
          Pt(e);
          ke.detailEpisode && fn(e, ke.detailEpisode);
        });
      } else {
        fn(e, ke.detailEpisode);
      }
    } else {
      cn("Preparando la reproducción…");
      H(e, function (loadedItem) {
        if (loadedItem && "detail" === ke.screen && ke.detail === loadedItem) {
          if (saved && I(loadedItem) && saved.seasonIndex > 0 && loadedItem.seasons && loadedItem.seasons[saved.seasonIndex]) {
            var targetSeason = loadedItem.seasons[saved.seasonIndex];
            cn("Cargando temporada " + (targetSeason.number || saved.seasonIndex + 1) + "…");
            D("detail", { contentId: targetSeason.id }, function (err, res) {
              if (!err && res && !1 !== res.returnValue) {
                res.item && B(loadedItem, res.item);
                loadedItem.episodes = res.episodes || [];
                loadedItem.seasonId = targetSeason.id;
                if (loadedItem.episodes.length) {
                  var found = null;
                  for (var k = 0; k < loadedItem.episodes.length; k++) {
                    if ((saved.episodeId && loadedItem.episodes[k].id === saved.episodeId) || (saved.episodeNumber && loadedItem.episodes[k].number === saved.episodeNumber)) {
                      found = loadedItem.episodes[k]; ke.detailRange = Math.floor(k / 20); break;
                    }
                  }
                  ke.detailEpisode = found || loadedItem.episodes[0];
                }
              }
              Pt(loadedItem);
              ke.detailEpisode && fn(loadedItem, ke.detailEpisode);
            });
          } else {
            if (saved && I(loadedItem) && loadedItem.episodes && loadedItem.episodes.length) {
              var found = null;
              for (var k = 0; k < loadedItem.episodes.length; k++) {
                if ((saved.episodeId && loadedItem.episodes[k].id === saved.episodeId) || (saved.episodeNumber && loadedItem.episodes[k].number === saved.episodeNumber)) {
                  found = loadedItem.episodes[k]; ke.detailRange = Math.floor(k / 20); break;
                }
              }
              if (found) { ke.detailEpisode = found; Pt(loadedItem); }
            }
            fn(loadedItem, ke.detailEpisode);
          }
        }
      });
    }
  } function Dt() { var e = r("screen-detail"); if (e) { var t = !e.classList.contains("is-synopsis-open"); e.classList.toggle("is-synopsis-open", t); var i = document.querySelector(".detail-more"); i && (i.textContent = t ? "Menos" : "Más") } } function extractFranchiseRoot(title) { var raw = String(title || ""); var subIdx = raw.search(/[:\-–—|]/); var t = subIdx > 2 ? c(raw.slice(0, subIdx)) : c(raw); t = t.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim(); t = t.replace(/\b(parte|part|capitulo|chapter|episodio|episode|trilogia|saga|temporada)\b/gi, ""); t = t.replace(/\b(i|ii|iii|iv|v|vi|vii|viii|ix|x|\d+)\b/gi, ""); t = t.replace(/^(el|la|los|las|the|un|una|unos|unas)\s+/i, ""); t = t.replace(/\s+/g, " ").trim(); var words = t.split(" "); if (words.length >= 3 && (words[2] === "y" || words[2] === "and" || words[2] === "en" || words[2] === "in")) { return words.slice(0, 2).join(" "); } return t; } function isFranchiseMatch(titleA, titleB) { if (!titleA || !titleB) return !1; var rA = extractFranchiseRoot(titleA); var rB = extractFranchiseRoot(titleB); if (rA.length >= 3 && rB.length >= 3) { if (rA === rB) return !0; if (rA.length >= 4 && rB.indexOf(rA) === 0) return !0; if (rB.length >= 4 && rA.indexOf(rB) === 0) return !0; } var cleanA = c(titleA).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim().replace(/^(el|la|los|las|the)\s+/i, ""); var cleanB = c(titleB).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim().replace(/^(el|la|los|las|the)\s+/i, ""); var wA = cleanA.split(" "), wB = cleanB.split(" "); if (wA.length >= 2 && wB.length >= 2) { var pA = wA[0] + " " + wA[1], pB = wB[0] + " " + wB[1]; if (pA.length >= 6 && pA === pB) return !0; } if (wA.length >= 1 && wB.length >= 1 && wA[0] === wB[0] && wA[0].length >= 5) { var common = ["pelicula", "historia", "mundo", "hombre", "mujer", "noche", "camino", "amigos", "muerte", "tiempo", "destino", "guerra"]; if (-1 === common.indexOf(wA[0])) return !0; } return !1; } function getSmartRecommendations(currentDoc, maxCount) { maxCount = maxCount || 16; if (!currentDoc || !u || !u.length) return []; var isCurSeries = I(currentDoc); var curId = String(currentDoc.id || ""); var curTitle = String(currentDoc.title || ""); var curDirector = c(currentDoc.director || "").replace(/[^a-z0-9\s]/g, " ").trim(); var curActors = c(currentDoc.actors || "").replace(/[^a-z0-9\s]/g, " ").trim(); var curCategory = c(currentDoc.category || "").trim(); var curYear = parseInt(currentDoc.year || "", 10) || 0; var curGenres = currentDoc.genres || []; if (typeof curGenres === "string") curGenres = curGenres.split(","); var genreMap = {}; for (var gi = 0; gi < curGenres.length; gi++) { var gName = c(typeof curGenres[gi] === "string" ? curGenres[gi] : (curGenres[gi].name || "")).trim(); if (gName) genreMap[gName] = !0; } var candidates = []; var seenIds = {}; seenIds[curId] = !0; for (var i = 0; i < u.length; i++) { var cand = u[i]; if (!cand) continue; var candId = String(cand.id || ""); if (!candId || seenIds[candId]) continue; if (cand.title && c(cand.title).trim() === c(curTitle).trim()) continue; if (!ke.crOn && isAdultContent(cand)) continue; var isCandSeries = I(cand); if (isCurSeries !== isCandSeries) continue; var score = 0; var isFranchise = isFranchiseMatch(curTitle, cand.title || ""); if (isFranchise) { score += 3000; } var candGenres = cand.genres || []; if (typeof candGenres === "string") candGenres = candGenres.split(","); var sharedGenres = 0; for (var cg = 0; cg < candGenres.length; cg++) { var cgName = c(typeof candGenres[cg] === "string" ? candGenres[cg] : (candGenres[cg].name || "")).trim(); if (cgName && genreMap[cgName]) { sharedGenres++; score += 150; } } if (curCategory && cand.category) { var candCat = c(cand.category).trim(); if (curCategory === candCat) { score += 100; } else { var parts = curCategory.split(","); for (var cp = 0; cp < parts.length; cp++) { var part = parts[cp].trim(); if (part && candCat.indexOf(part) !== -1) { score += 50; } } } } if (curDirector && cand.director) { var candDir = c(cand.director).replace(/[^a-z0-9\s]/g, " ").trim(); if (candDir && (curDirector.indexOf(candDir) !== -1 || candDir.indexOf(curDirector) !== -1)) { score += 120; } } if (curActors && cand.actors) { var candActors = c(cand.actors).split(","); for (var ca = 0; ca < candActors.length; ca++) { var act = candActors[ca].replace(/[^a-z0-9\s]/g, " ").trim(); if (act && act.length >= 4 && curActors.indexOf(act) !== -1) { score += 60; } } } if (curYear > 1900 && cand.year) { var candYr = parseInt(cand.year, 10); if (candYr > 1900) { var yrDiff = Math.abs(curYear - candYr); if (yrDiff <= 2) score += 30; else if (yrDiff <= 5) score += 15; } } if (cand.score) { var numScore = parseFloat(cand.score); if (!isNaN(numScore)) score += Math.floor(numScore); } if (isFranchise || sharedGenres > 0 || score >= 50) { candidates.push({ item: cand, score: score, isFranchise: isFranchise }); seenIds[candId] = !0; } } if (candidates.length < maxCount) { for (var j = 0; j < u.length; j++) { var fillCand = u[j]; if (!fillCand) continue; var fillId = String(fillCand.id || ""); if (seenIds[fillId]) continue; if (isCurSeries !== I(fillCand)) continue; if (!ke.crOn && isAdultContent(fillCand)) continue; candidates.push({ item: fillCand, score: parseFloat(fillCand.score || "7.0") || 7, isFranchise: !1 }); seenIds[fillId] = !0; if (candidates.length >= maxCount * 2) break; } } candidates.sort(function (a, b) { if (a.isFranchise && b.isFranchise) { var yrA = parseInt(a.item.year, 10) || 0; var yrB = parseInt(b.item.year, 10) || 0; if (yrA !== yrB) return yrA - yrB; return (a.item.title || "").localeCompare(b.item.title || ""); } return b.score - a.score; }); var result = []; for (var r = 0; r < Math.min(maxCount, candidates.length); r++) { result.push(candidates[r].item); } return result; } function Pt(e) { G = r("detail-left"), J = r("detail-player"), K = r("detail-buttons"), Y = r("detail-bottom"), o(G), o(K), o(Y); var t, i = n("div", "detail-titlewrap"); i.appendChild(n("div", "detail-title", e.title || "Sin título")); if (e.score && "—" !== e.score && "-" !== e.score) i.appendChild(n("div", "detail-score", e.score)); G.appendChild(i); var yrStr = (e.year && "—" !== e.year && "-" !== e.year) ? String(e.year) : (e.releaseTime || e.releaseDate || "").slice(0, 4); var countryStr = e.country || e.originalCountry || ""; if ("—" === countryStr || "-" === countryStr) countryStr = ""; var durStr = (e.duration && "—" !== e.duration && "-" !== e.duration) ? String(e.duration) : ""; if (durStr) { var durMatch = /^0?(\d+):0?(\d+)(?::\d+)?$/.exec(durStr); if (durMatch) { var hrs = parseInt(durMatch[1], 10), mins = parseInt(durMatch[2], 10); durStr = hrs > 0 ? (hrs + "h " + mins + "min") : (mins + " min"); } } var metaParts = []; if (yrStr && yrStr.length >= 4) metaParts.push(yrStr); if (countryStr) metaParts.push(countryStr); if (durStr) metaParts.push(durStr); metaParts.push("HD"); t = metaParts.join("  ·  "); G.appendChild(n("div", "detail-meta", t)); if (I(e)) { var d = 0, c = /S(\d+)/i.exec(e.alias || "") || /T(\d+)/i.exec(e.title || ""); if (c && (d = parseInt(c[1], 10) || 0), !d && e.seasons && e.seasons.length) { var p = e.seasons[ke.detailSeason] || e.seasons[0]; d = p && p.number || 1 } d || (d = 1); var f = e.updateCount || e.volumeCount || (e.episodes ? e.episodes.length : 0); f && G.appendChild(n("div", "detail-update", "T" + d + " - E" + f)) } var v = n("div", "detail-genres"); v.appendChild(n("span", "label", "Género : ")); for (var h = 0; h < e.genres.length; h++) { var m = n("div", "chip focusable", e.genres[h]); m._activate = function () { }, v.appendChild(m) } G.appendChild(v); var g = n("div", "detail-row"); g.appendChild(document.createTextNode("Director : ")); var y = n("span", "val focusable", e.director); y._activate = function () { }, g.appendChild(y), G.appendChild(g); var b = n("div", "detail-row"); b.appendChild(document.createTextNode("Actores : ")); var C = n("span", "val focusable", e.actors); C._activate = function () { }, b.appendChild(C), G.appendChild(b); var w = n("div", "detail-synopsis"); w.appendChild(n("span", "label", "Sinopsis : ")), w.appendChild(n("div", "text", e.synopsis)); var S = n("div", "detail-more focusable", "Más"); S._activate = Dt, w.appendChild(S), G.appendChild(w), o(J), J.classList.add("focusable"), J._activate = function () { vn(e, ke.detailEpisode) }, J._onMove = function () { return !1 }; var x = [{ icon: "icon_detail_fullscreen.png", label: "Pantalla completa" }, { icon: "icon_detail_subtitle_audio.png", label: "Idioma" }, { icon: "icon_detail_quality.png", label: "Resolución" }, { icon: "icon_detail_favorite.png", label: "Favorito" }]; I(e) && x.push({ icon: "icon_detail_subscribe.png", label: "Notificaciones" }); for (var _ = 0; _ < x.length; _++) { var L = n("div", "detail-btn focusable"), k = n("img"); k.src = "assets/original/vod/" + x[_].icon, k.alt = "", L.appendChild(k), L.appendChild(n("span", null, x[_].label)), L._kind = _, L._activate = function (e, t) { return function () { if (0 === e) vn(t, ke.detailEpisode); else if (1 === e) Ba(t, "audio"); else if (2 === e) Ba(t, "quality"); else if (3 === e) ke.favs[t.id] = !ke.favs[t.id]; else if (4 === e) { var i = this.querySelector("img"), a = -1 === i.src.indexOf("subscribed"); i.src = "assets/original/vod/icon_detail_" + (a ? "subscribed" : "subscribe") + ".png" } } }(_, e), K.appendChild(L) }; (function (e) { var t = I(e) && e.episodes ? e.episodes : [], i = t.length > 0, a = Nt(t.length); ke.detailRange >= a.length && (ke.detailRange = 0); if (I(e)) { var r = n("div", "detail-season focusable"); l(r, 80, 42, 280, 53), r.appendChild(n("span", "season-text", function (e) { var t = 0; if (e.seasons && e.seasons.length > 0) { var i = e.seasons[ke.detailSeason] || e.seasons[0]; t = i && i.number ? i.number : ke.detailSeason + 1 } if (!t) { var a = /S(\d+)/i.exec(e.alias || "") || /T(\d+)/i.exec(e.title || ""); a && (t = parseInt(a[1], 10) || 0) } return "Temporada " + (t || 1) }(e))); var o = n("img", "season-arrow"); o.src = "assets/original/vod/ic_down_icon.png", o.alt = "▼", r.appendChild(o), r._activate = function () { !e.seasons || e.seasons.length < 2 || function (e, t) { if (Ut) return void Ft(); if (!t.seasons || t.seasons.length < 2) return; var i = e.querySelector(".season-arrow"); i && i.classList.add("is-open"); l(Ut = n("div", "season-popup scrollable"), 80, 100, 280, Math.min(320, 54 * t.seasons.length)); for (var a = 0; a < t.seasons.length; a++)(function (e) { var i = t.seasons[e], a = n("div", "season-popup-item focusable" + (e === ke.detailSeason ? " is-selected" : "")), r = "Temporada " + (i.number || e + 1); a.appendChild(n("span", "season-item-text", r)); var o = n("img", "season-item-check"); o.src = "assets/original/vod/icon_nation_selected.png", o.alt = "", a.appendChild(o); a._onMove = function (dir) { var items = Ut ? Array.from(Ut.querySelectorAll(".season-popup-item")) : []; if (!items.length) return !0; var curIdx = items.indexOf(this); if ("up" === dir) { var prevIdx = curIdx > 0 ? curIdx - 1 : 0; Fe(items[prevIdx]); _scrollSeasonPopup(items[prevIdx]); return !0; } if ("down" === dir) { var nextIdx = curIdx < items.length - 1 ? curIdx + 1 : items.length - 1; Fe(items[nextIdx]); _scrollSeasonPopup(items[nextIdx]); return !0; } if ("left" === dir || "right" === dir) { return !0; } return !1; }; a._onFocus = function () { _scrollSeasonPopup(this); }; a._activate = function () { if (Ft(), ke.detailSeason !== e) { ke.detailSeason = e, ke.detailRange = 0, ke.detailEpisode = null; var i = t.seasons[e]; i && i.id && (cn("Cargando temporada…"), D("detail", { contentId: i.id }, function (e, a) { !e && a && !1 !== a.returnValue && (a.item && B(t, a.item), t.episodes = a.episodes || [], t.seasonId = i.id, ke.detailEpisode = t.episodes[0] || null), Pt(t), ke.detailEpisode && fn(t, ke.detailEpisode); var n = Y ? Y.querySelector(".detail-season") : null; n && Fe(n) })) } else { var a = Y ? Y.querySelector(".detail-season") : null; a && Fe(a) } }; Ut.appendChild(a) })(a); Y.appendChild(Ut); var r = Ut.children[ke.detailSeason] || Ut.children[0]; r && (Fe(r), _scrollSeasonPopup(r)) }(r, e) }, Y.appendChild(r) } if (i && t.length > 20) { var s = n("div", "detail-ranges"); l(s, 398, 51, 1522, 46); for (var d = 0; d < a.length; d++)(function (t) { var i = n("div", "detail-range focusable" + (t === ke.detailRange ? " is-selected" : ""), a[t].start + 1 + "-" + a[t].end); l(i, 160 * t, 0, 150, 46), i._activate = function () { Rt(t, e) }, s.appendChild(i) })(d); Y.appendChild(s) } if (i) { var c = a[ke.detailRange] || { start: 0, end: t.length }, p = n("div", "detail-episodes scrollable"); l(p, 80, 149, 1840, 65); for (var f = c.start; f < c.end; f++)(function (t, i) { var a = n("div", "detail-episode focusable" + (ke.detailEpisode && (ke.detailEpisode.id === t.id || ke.detailEpisode === t || (ke.detailEpisode.number && ke.detailEpisode.number === t.number)) ? " is-playing" : "")); l(a, 160 * i, 0, 150, 65); var r = void 0 !== t.number && null !== t.number ? String(t.number) : String(f + 1); a.appendChild(n("span", "ep-num", r)), a._ep = t, a._activate = function () { Pa(e, t) }, p.appendChild(a) })(t[f], f - c.start); Y.appendChild(p) } var v = i ? 240 : 25, h = i ? 290 : 91, m = n("div", "detail-related", "Quizás te guste"); l(m, 80, v, 400, 44), Y.appendChild(m); var g = n("div", "detail-grid scrollable"); l(g, 80, h, 1750, i ? 180 : 380); var recs = getSmartRecommendations(e, 16); for (var w = 0; w < recs.length; w++) { var S = recs[w]; if (S) { var x = n("div", "cell"); x.appendChild(et(S, 0, 0, 210, 308, { gold: !0 })), x.appendChild(n("div", "d-name", S.title)), g.appendChild(x) } } Y.appendChild(g) })(e) } function Nt(e) { for (var t = [], i = 0; i < e; i += 20)t.push({ start: i, end: Math.min(e, i + 20) }); return t } function Rt(e, t) { ke.detailRange = e, Pt(t); var i = Y.querySelector(".detail-range.is-selected"); i && Fe(i) } var Ut = null; function _scrollSeasonPopup(item) { if (!Ut || !item) return; var uRect = Ut.getBoundingClientRect(); var iRect = item.getBoundingClientRect(); if (iRect.top < uRect.top) { Ut.scrollTop = Math.max(0, Ut.scrollTop - (uRect.top - iRect.top + 10)); } else if (iRect.bottom > uRect.bottom) { Ut.scrollTop += (iRect.bottom - uRect.bottom + 10); } } function Ft() { Ut && Ut.parentNode && (Ut.parentNode.removeChild(Ut), Ut = null); var e = Y ? Y.querySelector(".season-arrow") : null; e && e.classList.remove("is-open") } function Bt() { Z = r("search-keyboard"), ee = r("search-hot"), te = r("search-results"), ie = r("search-empty"), ae = r("search-hot-grid"), ne = r("search-result-grid"), ae && ae.classList.add("scrollable"), ne && ne.classList.add("scrollable"), o(Z), o(ae), o(ne), (re = n("div", "kb-edit focusable"))._activate = function () { var e = Z.querySelector(".kb-key"); e && Fe(e, !0) }, re._onMove = function (e) { if ("down" === e) { var t = Z.querySelector(".kb-action"); if (t) return Fe(t, !0), !0 } return !1 }, Z.appendChild(re); for (var e = n("div", "kb-actions"), t = [{ cls: "switch", w: 100.5 }, { cls: "clear", w: 100.5 }, { cls: "del", w: 100.5 }, { cls: "go", w: 120 }], i = 0; i < t.length; i++) { var a = n("div", "kb-action focusable " + t[i].cls); a.style.width = t[i].w + "px", "go" === t[i].cls ? a.textContent = "Busca" : a.appendChild(n("div", "ico")), a._kind = t[i].cls, a._activate = function (e) { return function () { if ("switch" === e) Qt(); else if ("clear" === e) jt(""); else if ("del" === e) jt(ke.searchQuery.slice(0, -1)); else { var t = (ke.searchQuery || "").trim(); if (t) { ke.searchTimer && clearTimeout(ke.searchTimer); var i = ie ? ie.querySelector(".search-empty-title") : null; i && (i.textContent = "Buscando «" + t + "»…"), ie && ie.classList.add("is-active"), te && te.classList.add("is-active"), ee && ee.classList.add("is-hidden"), D("search", { value: t }, function (e, r) { if (!e && r && r.items && r.items.length) { for (var a = [], n = 0; n < r.items.length; n++)a.push(T(r.items[n], n + 1)); Xt(a); var o = ne.querySelector(".poster.focusable"); o && Fe(o, !0) } else i && (i.textContent = "No hay resultados para «" + t + "»"), ie && ie.classList.add("is-active") }) } } } }(t[i].cls), e.appendChild(a) } Z.appendChild(e), qe = []; for (var l = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"], ["Z", "X", "C", "V", "B", "N", "M", " "]], s = 0; s < l.length; s++) { var d = n("div", "kb-row"); d.style.top = 250 + 72 * s + "px"; for (var c = 0; c < l[s].length; c++) { var p = n("div", "kb-key focusable" + (" " === l[s][c] ? " space" : ""), " " === l[s][c] ? "ESPACIO" : l[s][c]); p._char = l[s][c], p._activate = function (e) { return function () { jt(ke.searchQuery + e) } }(l[s][c]), d.appendChild(p), qe.push(p) } Z.appendChild(d) } var u = n("div", "kb-feedback focusable", "Feedback"); u._activate = function () { }, Z.appendChild(u); var f = function () { for (var e = O(), t = [], i = 0; i < e.length; i++)-1 !== String(e[i] && e[i].category || "").toLowerCase().indexOf("busqueda") && t.push(T(e[i], i + 1)); return t }(); f.length || (f = q("busqueda", 10, 0)); for (var v = 0; v < f.length; v++)ae.appendChild(Ht(f[v], v)); te.classList.remove("is-active"), ie.classList.remove("is-active"), ee.classList.remove("is-hidden"), Vt() } function Ht(e, t) { var i = n("div", "search-cell"); l(i, t % 5 * 246, 437 * Math.floor(t / 5), 246, 437); var a = et(e, 0, 0, 222, 329, { gold: !0 }); return a._onMove = function (e) { if ("left" === e && t % 5 == 0) { var i = Z ? (Z.querySelector(".kb-action.del") || Z.querySelector(".kb-key") || re) : null; if (i) return Fe(i, !0), !0 } return !1 }, i.appendChild(a), i.appendChild(n("div", "s-name", e.title)), i } function zt() { Z || Bt(), ze("search"); var e = Z.querySelector(".kb-key") || re; Fe(e, !0) } function Vt() { re && (ke.searchQuery ? (re.textContent = ke.searchQuery, re.classList.remove("is-placeholder")) : (re.textContent = "Buscar películas, series, directores y actores.", re.classList.add("is-placeholder"))) } function jt(e) { ke.searchQuery = e, Vt(), $t() } function Wt() { ke.searchTimer && (clearTimeout(ke.searchTimer), ke.searchTimer = null), ke.searchQuery = "", Vt(), ne && (o(ne), ne.scrollTop = 0), ae && (ae.scrollTop = 0), te && te.classList.remove("is-active"), ie && ie.classList.remove("is-active"), ee && ee.classList.remove("is-hidden") } function $t() { var e = ke.searchQuery || "", t = c(e.trim()); if (t) { for (var i = [], a = 0; a < u.length; a++) { if (!ke.crOn && isAdultContent(u[a])) continue; var n = c(u[a].title || ""), r = u[a].alias ? c(u[a].alias) : ""; (-1 !== n.indexOf(t) || r && -1 !== r.indexOf(t)) && i.push(u[a]) } if (i.length > 0) Xt(i); else { var o = ie ? ie.querySelector(".search-empty-title") : null; o && (o.textContent = "Buscando «" + e.trim() + "»…"), ee && ee.classList.add("is-hidden"), te && te.classList.add("is-active"), ie && ie.classList.add("is-active"), ne && o(ne) } if (ke.searchTimer && clearTimeout(ke.searchTimer), "portal" === h.mode && t.length >= 1) { var l = ++ke.searchSeq; ke.searchTimer = setTimeout(function () { D("search", { value: e.trim() }, function (a, n) { if (l === ke.searchSeq) { var r = i.slice(), s = {}; for (var d = 0; d < r.length; d++)s[String(r[d].id)] = !0; if (!a && n && !1 !== n.returnValue && n.items && n.items.length) for (var c = 0; c < n.items.length; c++) { var p = T(n.items[c], r.length + 1); s[String(p.id)] || (s[String(p.id)] = !0, r.push(p)) } if (r.length > 0) Xt(r); else { var u = ie ? ie.querySelector(".search-empty-title") : null; u && (u.textContent = "No hay resultados para «" + e.trim() + "»"), ee && ee.classList.add("is-hidden"), te && te.classList.add("is-active"), ie && ie.classList.add("is-active"), ne && o(ne) } } }) }, 350) } } else Wt() } function Xt(e) { if (ee && ee.classList.add("is-hidden"), te && te.classList.add("is-active"), ne && o(ne), ne && (ne.scrollTop = 0), e && 0 !== e.length) { ie && ie.classList.remove("is-active"); for (var t = Math.min(e.length, 30), i = 0; i < t; i++)ne.appendChild(Ht(e[i], i)); if ("search" === ke.screen && s(ke.focus, ".search-hot")) { var a = Be(ne); a && Fe(a, !0) } } else ie && ie.classList.add("is-active") } function Qt() { ke.searchNumeric = !ke.searchNumeric; var e = Z.querySelector(".kb-action.switch .ico"); e && (e.style.backgroundImage = "url(assets/original/search/" + (ke.searchNumeric ? "ic_vod_search_abc.png" : "ic_vod_search_123.png") + ")"); var t = Z.querySelectorAll(".kb-row:not(.kb-row-num)"); if (ke.searchNumeric) { for (var i = 0; i < t.length; i++)t[i].classList.add("hidden"); if (!Z.querySelector(".kb-row-num")) for (var a = [["1", "2", "3", "4", "5", "6", "7"], ["8", "9", "0", " "]], r = 0; r < a.length; r++) { var o = n("div", "kb-row kb-row-num"); o.style.top = 264 + 88.5 * r + "px"; for (var l = 0; l < a[r].length; l++) { var s = n("div", "kb-key focusable" + (" " === a[r][l] ? " space" : ""), " " === a[r][l] ? "" : a[r][l]); s._activate = function (e) { return function () { jt(ke.searchQuery + e) } }(a[r][l]), o.appendChild(s) } Z.appendChild(o) } for (var d = Z.querySelectorAll(".kb-row-num"), c = 0; c < d.length; c++)d[c].classList.remove("hidden") } else { for (var p = 0; p < t.length; p++)t[p].classList.remove("hidden"); qe.forEach(function (e) { e.classList.remove("hidden") }); for (var u = Z.querySelectorAll(".kb-row-num"), f = 0; f < u.length; f++)u[f].classList.add("hidden") } } function Gt() {
    oe = r("settings-menu");
    le = r("settings-right");
    o(oe); o(le);
    Ae = [];
    for (var e = 0; e < Le.length; e++) {
      var t = n("div", "settings-item focusable", Le[e].label);
      t._index = e;
      t._activate = (function (idx) {
        return function () {
          Kt(idx, !0);
        };
      })(e);
      t._onMove = function (dir) {
        if ("right" === dir) {
          var actPanel = le.querySelector(".settings-panel.is-active");
          var f = actPanel ? Be(actPanel) : null;
          return f && Fe(f), !0;
        }
        return !1;
      };
      oe.appendChild(t);
      Ae.push(t);
    }
    Oe = {};
    Oe.playback = function () {
      var e = function (title) { var panel = n("div", "settings-panel"); return panel.appendChild(n("div", "sp-title", title)), panel }("Configuración global de reproducción");
      e.appendChild(n("div", "sp-hr"));
      Yt(e, 227, "Formato de pantalla", ["Pantalla completa", "Normal", "16:9", "4:3"], "screen", ke.playback.screen);
      Yt(e, 374, "Audio", ["Español", "Portugués", "Inglés"], "audio", ke.playback.audio);
      e.appendChild(l(n("div", "sp-hr"), 0, 536, 1498, 1));
      e.appendChild(n("div", "sp-subtitle-h", "Subtitulos"));
      var sw = n("div", "sp-switch focusable " + (ke.playback.subtitle ? "on" : "off"));
      sw._activate = function () {
        ke.playback.subtitle = !ke.playback.subtitle;
        sw.className = "sp-switch focusable " + (ke.playback.subtitle ? "on" : "off");
        Fe(sw);
      };
      e.appendChild(sw);
      Yt(e, 682, "Idioma", ["Español", "Portugués", "Inglés"], "subLang", ke.playback.subLang);
      Yt(e, 803, "Tamaño", ["Normal", "Grande", "Pequeño"], "size", ke.playback.size);
      (function (el, top) {
        var row = n("div", "pb-row");
        row.style.top = top + "px";
        row.appendChild(n("div", "pb-label", "Estilo"));
        var colors = ["#ffffff", "#f6e33f", "#ffffff"];
        for (var r = 0; r < 3; r++) {
          var opt = n("div", "pb-opt focusable" + (r === ke.playback.style ? " is-checked" : ""));
          opt.style.marginLeft = (0 === r ? 0 : 28) + "px";
          opt.appendChild(n("div", "radio"));
          var lbl = n("span", null, "Aa");
          lbl.style.color = colors[r];
          if (r === 2) { lbl.style.background = "#000000"; lbl.style.display = "inline-block"; lbl.style.width = "94px"; lbl.style.height = "50px"; lbl.style.lineHeight = "50px"; lbl.style.fontSize = "28px"; }
          opt.appendChild(lbl);
          opt._group = "style"; opt._index = r;
          opt._activate = function () {
            ke.playback.style = this._index;
            for (var t = el.querySelectorAll(".pb-opt"), i = 0; i < t.length; i++)"style" === t[i]._group && t[i].classList.toggle("is-checked", t[i]._index === this._index);
          };
          row.appendChild(opt);
        }
        el.appendChild(row);
      })(e, 924);
      return e;
    }();

    Oe.parent = function () {
      var e = n("div", "settings-panel");
      e.appendChild(n("div", "sp-title", "Control Parental y Contenido +18"));
      e.appendChild(l(n("div", "sp-hr"), 0, 160, 1498, 1));

      var head = n("div", "cr-head");
      head.style.top = "210px";
      head.appendChild(n("span", "t", "Mostrar canales y contenido +18"));
      var sw = n("div", "sw focusable " + (ke.crOn ? "on" : "off"));
      sw._activate = function () {
        ke.crOn = !ke.crOn;
        try { localStorage.setItem("xuper_cr_on", ke.crOn ? "1" : "0"); } catch (ex) { }
        sw.className = "sw focusable " + (ke.crOn ? "on" : "off");
        tip.textContent = ke.crOn ?
          "Estado: ACTIVADO (Los canales +18 y contenido para adultos son VISIBLES)" :
          "Estado: OCULTO (Los canales +18 y contenido para adultos están COMPLETAMENTE OCULTOS)";
        tip.style.color = ke.crOn ? "#f59e0b" : "#10b981";
        if (typeof Ct === "function") Ct(!1);
        if (typeof Qa === "function") Qa();
        cn(ke.crOn ? "Contenido +18 activado (visible)" : "Contenido +18 desactivado (oculto)");
        Fe(sw);
      };
      head.appendChild(sw);
      e.appendChild(head);

      var tip = n("div", "cr-tip");
      tip.style.top = "280px";
      tip.style.fontSize = "26px";
      tip.textContent = ke.crOn ?
        "Estado: ACTIVADO (Los canales +18 y contenido para adultos son VISIBLES)" :
        "Estado: OCULTO (Los canales +18 y contenido para adultos están COMPLETAMENTE OCULTOS)";
      tip.style.color = ke.crOn ? "#f59e0b" : "#10b981";
      e.appendChild(tip);

      var note = n("div", "cr-tip");
      note.style.top = "340px";
      note.style.color = "rgba(255,255,255,0.6)";
      note.textContent = "Al activar esta opción se mostrarán los canales para adultos (+18) y contenidos para mayores en el catálogo y en la lista de canales. Si la desactivas, quedan completamente ocultos para la seguridad familiar.";
      e.appendChild(note);

      return e;
    }();

    Oe.history = function () {
      var e = n("div", "settings-panel settings-history-panel");
      var header = n("div", "sh-header");
      header.appendChild(n("div", "sp-title", "Historial de vistas"));

      var subRow = n("div", "sh-sub-row");
      subRow.appendChild(n("div", "sh-subtitle", "Películas y series reproducidas recientemente"));

      var clearBtn = n("button", "sh-btn-clear focusable", "🗑️ Limpiar historial");
      clearBtn._activate = function () {
        try {
          localStorage.removeItem(getProfileStorageKey("xuper_history"));
          if (xuperActiveProfileId === "p1") localStorage.removeItem("xuper_history");
        } catch (ex) { }
        cn("Historial borrado");
        renderSettingsHistory(bodyEl);
        Fe(clearBtn);
      };
      clearBtn._onMove = function (dir) {
        if (dir === "left") {
          if (Ae && Ae[2]) { Fe(Ae[2]); return !0; }
        } else if (dir === "down") {
          var firstCard = bodyEl.querySelector(".sh-card.focusable");
          if (firstCard) { Fe(firstCard); return !0; }
        }
        return !1;
      };
      subRow.appendChild(clearBtn);
      header.appendChild(subRow);
      e.appendChild(header);

      e.appendChild(l(n("div", "sp-hr"), 0, 160, 1498, 1));

      var bodyEl = n("div", "sh-body scrollable");
      e.appendChild(bodyEl);

      function renderSettingsHistory(container) {
        container.innerHTML = "";
        var hist = [];
        try {
          hist = JSON.parse(localStorage.getItem(getProfileStorageKey("xuper_history")) || "[]");
          if (!hist.length && xuperActiveProfileId === "p1") {
            hist = JSON.parse(localStorage.getItem("xuper_history") || "[]");
          }
        } catch (ex) { }

        if (!hist || !hist.length) {
          var emptyEl = n("div", "sh-empty");
          emptyEl.appendChild(n("div", "sh-empty-icon", "🎬"));
          emptyEl.appendChild(n("div", "sh-empty-title", "No hay contenido en tu historial aún"));
          emptyEl.appendChild(n("div", "sh-empty-desc", "Las películas y series que reproduzcas aparecerán aquí automáticamente para que puedas retomarlas fácilmente en cualquier momento."));
          container.appendChild(emptyEl);
          return;
        }

        var grid = n("div", "sh-grid");
        hist.forEach(function (item, idx) {
          var card = n("div", "sh-card focusable");
          var img = n("img", "sh-card-img");
          img.src = item.landscape || item.poster || "assets/original/common/bg_placehoder_vertical.png";
          card.appendChild(img);

          if (item.episode && item.episode.number) {
            var badge = n("div", "sh-card-badge", "Cap. " + item.episode.number);
            card.appendChild(badge);
          }
          var info = n("div", "sh-card-info");
          var title = n("div", "sh-card-title", item.title);
          info.appendChild(title);
          var sub = n("div", "sh-card-sub", (item.year && item.year !== "—" ? item.year + " · " : "") + (I(item) ? "Serie" : "Película"));
          info.appendChild(sub);
          card.appendChild(info);

          card._activate = function () {
            At(item);
          };
          card._onMove = function (dir) {
            if (dir === "left" && (idx % 4 === 0)) {
              if (Ae && Ae[2]) { Fe(Ae[2]); return !0; }
            } else if (dir === "up" && idx < 4) {
              Fe(clearBtn);
              return !0;
            }
            return !1;
          };
          grid.appendChild(card);
        });
        container.appendChild(grid);
      }

      e._onShow = function () {
        renderSettingsHistory(bodyEl);
      };
      renderSettingsHistory(bodyEl);

      return e;
    }();

    Oe.feedback = function () {
      var e = n("div", "settings-panel");
      e.appendChild(n("div", "fb-title", "Ayuda y Feedback"));
      e.appendChild(n("div", "fb-hr"));
      e.appendChild(n("div", "fb-contact", "Si tiene alguna duda, puede ponerse en contacto con nosotros a través de los siguientes medios:"));
      e.appendChild(n("div", "fb-qr-note", "Email de soporte:"));
      var mail = n("div", "sp-about-mail");
      mail.style.position = "relative";
      mail.style.left = "0";
      mail.style.top = "20px";
      var img = n("img");
      img.src = "assets/original/settings/vod_email_icon.png";
      img.alt = "";
      mail.appendChild(img);
      mail.appendChild(n("span", null, "escuchamos-tv@outlook.com"));
      e.appendChild(mail);
      return e;
    }();

    Oe.upgrade = function () {
      var e = n("div", "settings-panel");
      e.appendChild(n("div", "sp-title plain", "Actualización"));
      e.appendChild(l(n("div", "sp-hr soft"), 0, 165, 1498, 1));
      var card = n("div", "sp-card");
      l(card, 30, 198, 1360, 250);
      card.appendChild(n("h3", null, "Versión de la aplicación"));
      var ver = n("div", "sp-version", "v1.0.5 - Sistema actualizado");
      card.appendChild(ver);
      e.appendChild(card);
      return e;
    }();

    Oe.about = function () {
      var e = n("div", "settings-panel");
      e.appendChild(n("div", "sp-title plain", "Sobre nosotros"));
      e.appendChild(l(n("div", "sp-hr soft"), 0, 165, 1498, 1));
      e.appendChild(n("div", "sp-about-body", "Xuper WebOS se dedica a ofrecer a los usuarios una amplia variedad de recursos de alta calidad. Aquí encontrarás miles de películas, series, animes y canales en vivo, todo reunido en un solo lugar. Brindamos una experiencia estable, diversa y siempre actualizada, además de contenidos gratuitos para disfrutar."));
      var t = n("div", "sp-about-mail"), i = n("img");
      i.src = "assets/original/settings/vod_email_icon.png", i.alt = "", t.appendChild(i), t.appendChild(n("span", null, "escuchamos-tv@outlook.com")), e.appendChild(t);
      return e;
    }();

    for (var pId in Oe) {
      if (Oe.hasOwnProperty(pId)) le.appendChild(Oe[pId]);
    }
  }

  function Jt() {
    oe || Gt();
    ze("settings");
    Kt(0, !1);
    Fe(Ae[0]);
  }

  function Kt(e, t) {
    var targetItem = Le[e];
    var targetId = targetItem ? targetItem.id : "playback";
    for (var a = 0; a < Ae.length; a++) {
      Ae[a].classList.toggle("is-selected", a === e);
    }
    for (var n in Oe) {
      if (Oe.hasOwnProperty(n)) {
        var isActive = (n === targetId);
        Oe[n].classList.toggle("is-active", isActive);
        if (isActive && Oe[n]._onShow) {
          Oe[n]._onShow();
        }
      }
    }
    if (t) {
      var p = Oe[targetId];
      Fe((p && Be(p)) || Ae[e]);
    }
  }
  function Yt(e, t, i, a, r, o) { var l = n("div", "pb-row"); l.style.top = t + "px", l.appendChild(n("div", "pb-label", i)); for (var s = 0; s < a.length; s++) { var d = n("div", "pb-opt focusable" + (s === o ? " is-checked" : "")); d.style.marginLeft = (0 === s ? 0 : 28) + "px", d.appendChild(n("div", "radio")), d.appendChild(n("span", null, a[s])), d._group = r, d._index = s, d._activate = function () { ke.playback[this._group] = this._index; for (var t = e.querySelectorAll(".pb-opt"), i = 0; i < t.length; i++)t[i]._group === this._group && t[i].classList.toggle("is-checked", t[i]._index === this._index) }, l.appendChild(d) } e.appendChild(l) } function Zt(e, t) { var i = n("div", "settings-panel"); return i.appendChild(n("div", "sp-title", e)), i.appendChild(n("div", "sp-hr")), i.appendChild(n("div", "sp-pending", t)), i } var ei = 5e3, ti = null; function ii(e) { e = Math.max(0, Math.floor(e || 0)); var t = Math.floor(e / 3600), i = Math.floor(e % 3600 / 60), a = e % 60; return d(t) + ":" + d(i) + ":" + d(a) } function ai(e) { if ("number" == typeof e && isFinite(e) && e > 0) return e; if ("string" != typeof e) return 0; var t = e.trim(); if (!t || "—" === t || "-" === t) return 0; var i = t.match(/(\d+)\s*h(?:our|ora|s)?/i), a = t.match(/(\d+)\s*m(?:in|uto|s)?/i), n = t.match(/(\d+)\s*s(?:ec|eg)?/i); if (i || a || n) return 3600 * (i ? parseInt(i[1], 10) : 0) + 60 * (a ? parseInt(a[1], 10) : 0) + (n ? parseInt(n[1], 10) : 0); if (-1 !== t.indexOf(":")) { var r = t.split(":"); if (2 === r.length) { var o = Number(r[0]), l = Number(r[1]); if (isFinite(o) && isFinite(l) && o >= 0 && l >= 0) return 60 * o + l } else if (3 === r.length) { o = Number(r[0]), l = Number(r[1]); var s = Number(r[2]); if (isFinite(o) && isFinite(l) && isFinite(s) && o >= 0 && l >= 0 && s >= 0) return 3600 * o + 60 * l + s } } var d = Number(t); return isFinite(d) && d > 0 ? d : 0 } var ni = null; function ri() { ni && (clearInterval(ni), ni = null) } function _resolveVodDuration() { var d = 0; if (pe && isFinite(pe.duration) && pe.duration > 0) d = pe.duration; if (!d && ke.playerEpisode && ke.playerEpisode.duration) d = ai(ke.playerEpisode.duration); if (!d && ke.playerItem && ke.playerItem.duration) d = ai(ke.playerItem.duration); if (!d && ta && ta.length) { var a = ta[ta.length - 1]; a && a.end > 0 && (d = Math.round(a.end + 60)) } return d > 0 ? d : (I && I(ke.playerItem) ? 2700 : 7200) } var _targetSeekTime = -1, _seekClearTimer = null, _seekCommitTimer = null, _seekSafetyTimer = null, _wasPlayingBeforeSeek = false, _isSeeking = false;
  function oi(e, t) {
    if (!ge) ge = r("vod-time-current");
    if (!ye) ye = r("vod-time-total");
    if (!be) be = r("vod-seek-progress");
    if (!we) we = r("vod-seek-thumb");
    if (ge && ye && be) {
      var dur = ai(t);
      if (!dur && pe && isFinite(pe.duration) && pe.duration > 0) dur = pe.duration;
      if (!dur) dur = _resolveVodDuration();
      dur = Math.max(1, Number(dur) || 0);
      var cur = (_targetSeekTime >= 0) ? _targetSeekTime : Number(e);
      cur = Math.max(0, Math.min(dur, cur || 0));
      ge.textContent = ii(cur);
      ye.textContent = ii(dur);
      var pct = Math.min(100, Math.max(0, (cur / dur) * 100)).toFixed(2) + "%";
      be.style.width = pct;
      if (we) we.style.left = pct;
    }
  } function li(e) { Se || (Se = r("player-osd-icon")), Se && (ti && (clearTimeout(ti), ti = null), "pause" === e ? (Se.style.backgroundImage = "url(assets/original/common/icon_status_pause.png)", Se.classList.add("is-active")) : "forward" === e ? (Se.style.backgroundImage = "url(assets/original/common/icon_status_forward.png)", Se.classList.add("is-active"), ti = setTimeout(function () { Se.classList.remove("is-active") }, 900)) : "backward" === e ? (Se.style.backgroundImage = "url(assets/original/common/icon_status_backward.png)", Se.classList.add("is-active"), ti = setTimeout(function () { Se.classList.remove("is-active") }, 900)) : Se.classList.remove("is-active")) } function di() { if (pe) if (pe.paused) { try { var e = pe.play(); e && e.catch && e.catch(function () { }) } catch (e) { } li("none"), pi() } else { try { pe.pause() } catch (e) { } li("pause"), pi() } } function ci() { ke.infoTimer && clearTimeout(ke.infoTimer), ke.infoTimer = setTimeout(function () { ke.infoTimer = null, "player" !== ke.screen || ke.channelsOpen || ui() }, ei) } function pi() { ke.infobar = !0, "vod" === ke.playerMode ? (ve && ve.classList.add("is-active"), de && de.classList.remove("is-active")) : (bn(), de && de.classList.add("is-active"), ve && ve.classList.remove("is-active")), ci() } function ui() {
    ke.infoTimer && (clearTimeout(ke.infoTimer), ke.infoTimer = null);
    ke.infobar = !1;
    de && de.classList.remove("is-active");
    ve && ve.classList.remove("is-active");
    if (_piButtons) {
      for (var i = 0; i < _piButtons.length; i++) {
        _piButtons[i].classList.remove("is-focused");
      }
    }
    if ("player" === ke.screen && !ke.channelsOpen && se) {
      Fe(se, !0);
    }
  } function fi() { pi() } function vi() { ui() } var hi = null, mi = null, gi = null, yi = null, bi = null, Ci = null, wi = null, Si = null, xi = null, _i = null, Li = null, ki = null, Ii = null, Ti = null, Ei = null, Mi = null, qi = null, Oi = null, Ai = null, Di = null, Pi = null, Ni = null, Ri = null, Ui = null, Fi = null, Bi = null, Hi = null, zi = null, Vi = !1, ji = !1, Wi = null, $i = 0, Xi = !1, Qi = null, Gi = !1, Ji = !1, Ki = 0, Yi = "normal", Zi = "white", ea = "contain", ta = [], ia = {}, aa = {}, na = null; function ra(e) { if (!e) return 0; var t = e.replace(",", ".").split(":"); return 3 === t.length ? 3600 * parseFloat(t[0]) + 60 * parseFloat(t[1]) + parseFloat(t[2]) : 0 } function oa(e) { var t = ++Ki; if (!e || !e.url) return ta = [], void (zi && (zi.innerHTML = "")); try { var i = new XMLHttpRequest; i.open("GET", e.url, !0), i.onload = function () { t === Ki && i.status >= 200 && i.status < 300 && (ta = function (e) { var t = []; if (!e) return t; for (var i = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n\n"), a = 0; a < i.length; a++) { var n = i[a].trim().split("\n"); if (n.length >= 2) { var r = -1 !== n[0].indexOf("--\x3e") ? n[0] : n[1], o = -1 !== n[0].indexOf("--\x3e") ? n.slice(1) : n.slice(2); if (r && -1 !== r.indexOf("--\x3e")) { var l = r.split("--\x3e"), s = ra(l[0].trim()), d = ra(l[1].trim()), c = o.join("<br>").replace(/<font[^>]*>/gi, "").replace(/<\/font>/gi, "").trim(); c && t.push({ start: s, end: d, text: c }) } } } return t }(i.responseText)) }, i.send() } catch (e) { } } function la() { zi && (zi.classList.remove("size-small", "size-normal", "size-big"), zi.classList.add("size-" + Yi), zi.classList.remove("color-white", "color-yellow", "color-black"), zi.classList.add("color-" + Zi)) } function sa(e) { if (zi) if (Gi && ta && ta.length) { for (var t = null, i = 0; i < ta.length; i++)if (e >= ta[i].start && e <= ta[i].end) { t = ta[i]; break } if (t) { var a = '<span class="player-subtitles-text">' + t.text + "</span>"; zi.innerHTML !== a && (zi.innerHTML = a) } else "" !== zi.innerHTML && (zi.innerHTML = "") } else "" !== zi.innerHTML && (zi.innerHTML = "") } function da() { return "detail" === ke.screen ? ke.detail || null : ke.playerItem || ke.detail || null } var ca = {}; function pa(e) { return e && (e.seriesId || e.id) || "" } function ua(e) { var t = pa(e); ke.streamMode = ca[t] ? "smooth" : "normal" } function fa(e, t) { var i = pa(e); ke.streamMode = t ? "smooth" : "normal", i && (ca[i] = !!t) } function va() { $i = 0, Xi = !1, Qi = null, Gi = !1, Ji = !1, Ki++, ke.trackIndex = 0, ta = [], zi && (zi.innerHTML = "") } function ha(e) { return e && I(e) ? "player" === ke.screen && ke.playerEpisode ? ke.playerEpisode : ke.detailEpisode ? ke.detailEpisode : e.episodes && e.episodes[0] || null : null } function ma(e) { if (!e) return ""; var t = ha(e); return t && t.id ? t.id : e.id || "" } function ga(e, t) { if (t = t || function () { }, !e) return t(null); var i = ma(e); if (!i) return t(null); if (ia[i]) return Ca(ia[i]), t(ia[i]); if (aa[i]) aa[i].push(t); else { aa[i] = [t]; var a = ha(e), n = { contentId: i }, r = e.seasonId || e.id; a && a.id && r && a.id !== r && (n.seriesContentId = r), D("mediaInfo", n, function (e, t) { var a = aa[i] || []; delete aa[i]; var n = !e && t && !1 !== t.returnValue ? t : null; n && (ia[i] = n, Ca(n)); for (var r = 0; r < a.length; r++)try { a[r](n) } catch (e) { } }) } } function ya(e) { if (!e) return 0; var t = (e || "").split(/[\/,]/), bestIdx = 0, bestScore = -1; for (var i = 0; i < t.length; i++) { var raw = t[i].trim().toLowerCase(), score = 0; if (/^(lat|latino|la|spa_lat|es[-_]?419|es[-_]?la)$/i.test(raw)) { score = 100; } else if (/^(spa|esp|es)$/i.test(raw)) { score = 90; } else if (/^(cast|castellano|spa_es|es[-_]?es)$/i.test(raw)) { score = 80; } else if (/^(eng|en|ing|ingles)$/i.test(raw)) { score = 50; } else if (/^(por|pt|portugues)$/i.test(raw)) { score = 40; } if (score > bestScore) { bestScore = score; bestIdx = i; } } return bestIdx; } function ba(e) { for (var t = [], i = e && e.subtitles || [], a = 0; a < i.length; a++)t.push({ lang: i[a].lang, url: i[a].url, format: i[a].format }); return t.sort(function (e, t) { return (/^(es|spa|esp)$/i.test(e.lang || "") ? 0 : 1) - (/^(es|spa|esp)$/i.test(t.lang || "") ? 0 : 1) }), t } function Ca(e) { var t = ba(e); if (!Ji) return t.length ? (Gi = !0, void oa(Qi = t[0])) : (Gi = !1, Qi = null, void oa(null)); if (Gi) { if (!t.length) return Gi = !1, Qi = null, void oa(null); var i = !1; if (Qi) for (var a = 0; a < t.length; a++)if (t[a].url === Qi.url) { Qi = t[a], i = !0; break } i || oa(Qi = t[0]) } } function wa() { Wi && clearTimeout(Wi), Wi = setTimeout(function () { xa() }, 8e3) } function Sa() { (hi || Xa(), hi) && (Vi = !0, ji = !1, ui(), _a(), hi.classList.add("is-active"), zi && zi.classList.add("shift-up"), ga(ke.playerItem, function () { Vi && _a() }), wa(), I(ke.playerItem) && Li ? Fe(Li) : bi && Fe(bi)) } function xa() { Wi && (clearTimeout(Wi), Wi = null), Vi = !1, hi && hi.classList.remove("is-active"), zi && zi.classList.remove("shift-up"), _lastBackTime = Date.now(), Ve = Date.now() + 500, "player" !== ke.screen || ji || Fe(se) } function _a() { var e = ke.focus ? s(ke.focus, ".psv-row") : null, t = e ? e.id : "", i = e && ke.focus ? ke.focus.textContent : ""; if (ka(), updatePsvAudio(), Ra(), Ua(), La(), Vi && t && hi) for (var a = hi.querySelectorAll(".psv-row"), n = 0; n < a.length; n++)if (a[n].id === t) { for (var r = a[n].querySelectorAll(".focusable"), o = null, l = 0; l < r.length; l++)if (r[l].textContent === i) { o = r[l]; break } var d = o || Be(a[n]); d && Fe(d, !0); break } } function La() { if (hi) { for (var e = hi.querySelectorAll(".psv-row"), t = 0; t < e.length; t++)e[t].classList.remove("is-row-focused"); var i = ke.focus ? s(ke.focus, ".psv-row") : null; i && i.classList.add("is-row-focused") } } function ka() { if (gi) { var e = ke.playerItem; if (e && I(e)) { if (gi.style.display = "block", yi) { o(yi); var t = Ia(e), i = t[ke.playerSeasonIndex] || t[0], a = i && i.id === (e.seasonId || e.id) && e.episodes && e.episodes.length ? e.episodes : i && i._episodes || e.episodes || []; if (a.length) { for (var r = 0, l = 0; l < a.length; l++)if (ke.playerEpisode && (a[l].id === ke.playerEpisode.id || a[l].number === ke.playerEpisode.number)) { r = l; break } var s = Nt(a.length); (void 0 === ke.playerEpisodeRange || ke.playerEpisodeRange >= s.length) && (ke.playerEpisodeRange = Math.floor(r / 20)); for (var d = s[ke.playerEpisodeRange] || s[0], c = n("div", "psv-episode-numbers"), p = d.start; p < d.end; p++)(function (e, t) { var i = String(void 0 !== e.number && null !== e.number ? e.number : t + 1), a = n("button", "psv-ep-btn focusable" + (t === r ? " is-selected" : ""), i); a._activate = function () { Da(e) }, c.appendChild(a) })(a[p], p); yi.appendChild(c); for (var u = n("div", "psv-episode-ranges"), f = 0; f < s.length; f++)(function (e, t) { var i = n("button", "psv-range-btn focusable" + (e === ke.playerEpisodeRange ? " is-selected" : ""), t.start + 1 + "-" + t.end); i._activate = function () { ke.playerEpisodeRange = e, ka(); var t = yi.querySelector(".psv-ep-btn"); t && Fe(t) }, u.appendChild(i) })(f, s[f]); yi.appendChild(u) } else yi.appendChild(n("div", "psv-selection-empty", "Temporadas y episodios")) } } else gi.style.display = "none" } } function Ia(e) { return e && e.seasons && e.seasons.length ? e.seasons : [{ id: e ? e.id : "", number: 1 }] } function Ta(e, t, i) { var a = t && void 0 !== t.number && null !== t.number ? t.number : i + 1, n = String(t && (t.title || t.name) || "").trim(), r = String(e && e.title || "").trim().replace(/[\s\-–_]*[TtSs]\d+$/, ""); return r && 0 === n.indexOf(r) && (n = n.substring(r.length)), (n = n.replace(/^[\s\-–_:.]+/, "").trim()) && !/^(?:[TtSs]?\d+[\s\-–_.:]*)+$/.test(n) || (n = "Episodio " + a), n } function Ea(e) { var t = String(e && e.duration || "").trim(), i = /^(\d+):(\d+)(?::(\d+))?$/.exec(t); return i ? i[3] ? (parseInt(i[1], 10) || 0) + " h " + (parseInt(i[2], 10) || 0) + " min" : (parseInt(i[1], 10) || 0) + " min" : t } function Ma() { var e = ke.playerItem; if (e && I(e) && (Vi && xa(), ki || Xa(), ki)) { if (!(e.episodes && e.episodes.length || e._detailsLoaded)) return cn("Cargando capítulos…"), void H(e, function () { "player" === ke.screen && (!ke.playerEpisode && e.episodes && e.episodes.length && (ke.playerEpisode = e.episodes[0], ke.detailEpisode = e.episodes[0]), Ma()) }); !ke.playerEpisode && e.episodes && e.episodes.length && (ke.playerEpisode = e.episodes[0], ke.detailEpisode = e.episodes[0], ke.playerSeasonIndex = ke.detailSeason || 0), ke.episodeBrowserOpen = !0, ke.browserSeason = ke.playerSeasonIndex || 0, ki.classList.add("is-active"), vi(), function () { var e = ke.playerItem; if (!e || !ki) return; var t = Ia(e); ke.browserSeason >= t.length && (ke.browserSeason = 0); ke.browserSeason < 0 && (ke.browserSeason = 0); var i = t[ke.browserSeason], a = t[ke.playerSeasonIndex] || t[0], r = ke.playerEpisode; Ii && (Ii.textContent = e.title || ""); if (Ti) if (r) { var l = []; a && a.number && l.push("T" + a.number), r.number && l.push("E" + r.number), Ti.textContent = "Reproduciendo " + l.join(" ") + " · " + Ta(e, r) } else Ti.textContent = "Elige un episodio"; Oi && (Oi.textContent = "Episodios · Temporada " + (i && i.number || ke.browserSeason + 1)); (function (e, t) { if (!Ei || !Mi) return; o(Ei), Mi.style.display = "flex"; for (var i = 0; i < t.length; i++)(function (e) { var i = n("div", "pe-season focusable", "Temporada " + (t[e].number || e + 1)); e === ke.browserSeason && i.classList.add("is-selected"), i._onFocus = function () { ke.browserSeason !== e && Aa(e, !1) }, i._activate = function () { Aa(e, !0) }, Ei.appendChild(i) })(i) })(0, t), Oa(e, i) }(); var t = (qi ? qi.querySelector(".pe-ep.is-current") : null) || (qi ? Be(qi) : null) || (Mi && "none" !== Mi.style.display ? Be(Ei) : null); t && Fe(t) } } function qa(e) { ki && ke.episodeBrowserOpen && (ke.episodeBrowserOpen = !1, ki.classList.remove("is-active"), !e && "player" === ke.screen && se && Fe(se)) } function Oa(e, t) { if (qi && t) { o(qi); var i = t.id === (e.seasonId || e.id) && e.episodes && e.episodes.length ? e.episodes : t._episodes || []; if (!i.length) return qi.appendChild(n("div", "pe-loading", "Cargando episodios…")), void function (e, t, i) { i = i || function () { }, e && t ? t.id === (e.seasonId || e.id) && e.episodes && e.episodes.length ? (t._episodes = e.episodes, i(e.episodes)) : t._episodes ? i(t._episodes) : t._loading ? (t._wait = t._wait || [], t._wait.push(i)) : (t._loading = !0, t._wait = [i], D("detail", { contentId: t.id }, function (e, i) { t._loading = !1; var a = !e && i && !1 !== i.returnValue && i.episodes ? i.episodes : []; a.length && (t._episodes = a); var n = t._wait || []; t._wait = []; for (var r = 0; r < n.length; r++)try { n[r](a) } catch (e) { } })) : i([]) }(e, t, function (i) { if (ke.episodeBrowserOpen && (Ia(e)[ke.browserSeason] === t && (Oa(e, t), s(ke.focus, "#pe-episodes")))) { var a = qi.querySelector(".pe-ep.is-current") || Be(qi); a && Fe(a) } }); for (var a = Math.min(i.length, 24), r = 0; r < a; r++)(function (t, i) { var a = n("div", "pe-ep focusable"), r = void 0 !== t.number && null !== t.number ? t.number : i + 1; a.appendChild(n("div", "pe-num", String(r))); var o = n("div", "pe-thumb"), l = n("div", "pe-thumb-play", "▶"); o.appendChild(l), a.appendChild(o); var s = n("div", "pe-info"); s.appendChild(n("div", "pe-name", Ta(e, t, i))); var d = [], c = Ea(t); c && d.push(c), t.quality && d.push(String(t.quality).split(",")[0].toUpperCase()), s.appendChild(n("div", "pe-meta", d.join("   ·   "))), t.description && s.appendChild(n("div", "pe-desc", t.description)), a.appendChild(s); var p = ke.playerEpisode && (ke.playerEpisode.id === t.id || void 0 !== ke.playerEpisode.number && ke.playerEpisode.number === t.number); a.appendChild(n("div", "pe-badge", "▶ REPRODUCIENDO")), p && a.classList.add("is-current"), a._activate = function () { Da(t) }, qi.appendChild(a) })(i[r], r); i.length > a && qi.appendChild(n("div", "pe-loading", "Mostrando los primeros " + a + " capítulos")) } } function Aa(e, t) { var i = ke.playerItem, a = Ia(i); if (a[e] && (ke.browserSeason = e, function () { if (Ei) for (var e = Ei.children, t = 0; t < e.length; t++)e[t].classList.toggle("is-selected", t === ke.browserSeason) }(), Oi && (Oi.textContent = "Episodios · Temporada " + (a[e].number || e + 1)), Oa(i, a[e]), t)) { var n = qi ? qi.querySelector(".pe-ep.is-current") || Be(qi) : null; n && Fe(n) } } function Da(e) { var t = ke.playerItem; if (t && e) { var i = Ia(t), a = i[ke.playerSeasonIndex]; a && a.id === (t.seasonId || t.id) && t.episodes && t.episodes.length && (a._episodes = t.episodes); var n = void 0 !== ke.playerSeasonIndex && null !== ke.playerSeasonIndex ? ke.playerSeasonIndex : ke.browserSeason || 0, r = i[n]; r && (ke.detailSeason !== n && (ke.detailSeason = n, ke.detailNeedsRebuild = !0), r.id && (t.seasonId = r.id), r._episodes && (t.episodes = r._episodes)), qa(), Vi && xa(), Pa(t, e) } } function Pa(e, t) { if (e && t) { ke.playerItem = e, ke.playerEpisode = t, ke.detailEpisode = t, ke.playerSeasonIndex = ke.detailSeason || 0, se && de && bn(), Na(e), ke.episodeSwitchTimer && clearTimeout(ke.episodeSwitchTimer), ke.episodeSwitchSeq = (ke.episodeSwitchSeq || 0) + 1; var i = ke.episodeSwitchSeq; dn(), cn("Cambiando capítulo…"), ke.episodeSwitchTimer = setTimeout(function () { ke.episodeSwitchTimer = null, i === ke.episodeSwitchSeq && ("player" === ke.screen || "detail" === ke.screen) && fn(e, t) }, 600) } } function Na(e) { if (Y) for (var t = Y.querySelectorAll(".detail-episode"), i = 0; i < t.length; i++) { var curEp = t[i]._ep; var a = !!(curEp && ke.detailEpisode && (curEp.id === ke.detailEpisode.id || (curEp.number && curEp.number === ke.detailEpisode.number))); t[i].classList.toggle("is-playing", a) } } function Ra() {
    var row = r("psv-player-row");
    if (!row) return;
    var sec = r("psv-sec-player");
    if (sec) {
      var tit = sec.querySelector(".psv-title");
      if (tit) tit.textContent = "CALIDAD / RESOLUCIÓN";
    }

    function _qName(trk, idx) {
      if (!trk) return "Calidad " + (idx + 1);
      var q = String(trk.quality || "").toUpperCase().trim();
      var h = parseInt(trk.height, 10) || 0;
      if (q.indexOf("4K") >= 0 || q.indexOf("2160") >= 0 || h >= 2160) return "4K Ultra HD";
      if (q.indexOf("1080") >= 0 || h >= 1080) return "1080p FHD";
      if (q.indexOf("720") >= 0 || h >= 720) return "720p HD";
      if (q.indexOf("480") >= 0 || h >= 480) return "480p SD";
      if (q.indexOf("360") >= 0 || h >= 360) return "360p SD";
      if (q) return q;
      return "Calidad " + (idx + 1);
    }

    var item = da();
    var media = item ? ia[ma(item)] : null;
    var streamInfo = window.__xuperStreamInfo || {};
    var tracks = (streamInfo.availableTracks && streamInfo.availableTracks.length) ?
      streamInfo.availableTracks :
      (media && media.tracks && media.tracks.length ? media.tracks : []);

    var qualList = [];
    if (tracks && tracks.length > 1) {
      var baseLabels = tracks.map(function (t, i) { return _qName(t, i); });
      var isDuplicate = baseLabels.some(function (l, i) { return baseLabels.indexOf(l) !== i; });
      tracks.forEach(function (trk, idx) {
        var lbl = baseLabels[idx];
        if (isDuplicate) {
          var codec = (trk && trk.codec) ? trk.codec.toUpperCase().trim() : "";
          if (codec === "H265" || codec === "HEVC") lbl += " (HEVC)";
          else if (codec === "H264" || codec === "AVC") lbl += " (H.264)";
          else if (codec) lbl += " (" + codec + ")";
          else lbl += " #" + (idx + 1);
        }
        qualList.push({ index: idx, label: lbl });
      });
    } else {
      qualList = [
        { index: 0, label: "1080p FHD" },
        { index: 1, label: "720p HD" }
      ];
    }

    var curSel = (typeof ke.trackIndex === "number" && ke.trackIndex >= 0) ? ke.trackIndex : 0;
    row.innerHTML = "";
    qualList.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "psv-btn focusable" + (opt.index === curSel ? " is-selected" : "");
      var chk = document.createElement("span");
      chk.className = "psv-check";
      chk.textContent = "✔";
      chk.style.display = (opt.index === curSel ? "block" : "none");
      btn.appendChild(chk);
      btn.appendChild(document.createTextNode(opt.label));
      btn._trackIndex = opt.index;
      btn._activate = function () {
        if (ke.trackIndex !== opt.index) {
          ke.trackIndex = opt.index;
          Ra();
          qaQuality();
          if ("player" === ke.screen && "vod" === ke.playerMode && pe) {
            var curPos = (pe.currentTime && isFinite(pe.currentTime)) ? pe.currentTime : 0;
            cn("Cambiando a " + opt.label + "…");
            un(ke.playerItem, function (streamUrl) {
              if (streamUrl) {
                pn(streamUrl, curPos);
                cn("");
              } else {
                cn("No se pudo cambiar la resolución");
              }
            });
          }
        }
        wa();
      };
      row.appendChild(btn);
    });
  }
  function Ua() { if (_i) for (var e = _i.querySelectorAll(".psv-btn"), t = 0; t < e.length; t++) { var i = e[t].getAttribute("data-aspect") === ea; e[t].classList.toggle("is-selected", i); var a = e[t].querySelector(".psv-check"); a && (a.style.display = i ? "block" : "none") } } function Fa(e) { ea = e || "contain", pe && (pe.classList.remove("aspect-cover", "aspect-contain", "aspect-16-9", "aspect-4-3"), pe.classList.add("aspect-" + ea)), Ua() } function qaQuality() {
    var qCont = r("dps-quality-options");
    if (!qCont) return;
    o(qCont);
    var item = da();
    var media = item ? ia[ma(item)] : null;
    var streamInfo = window.__xuperStreamInfo || {};
    var tracks = (streamInfo.availableTracks && streamInfo.availableTracks.length) ? streamInfo.availableTracks : (media && media.tracks && media.tracks.length ? media.tracks : []);
    var qualList = [];
    if (tracks && tracks.length > 0) {
      tracks.forEach(function (trk, idx) {
        var q = String(trk.quality || "").toUpperCase().trim();
        var h = parseInt(trk.height, 10) || 0;
        var lbl = "1080p FHD";
        if (q.indexOf("720") >= 0 || h === 720) lbl = "720p HD";
        else if (q.indexOf("480") >= 0 || h === 480) lbl = "480p SD";
        else if (q.indexOf("4K") >= 0 || h >= 2160) lbl = "4K Ultra HD";
        else if (q) lbl = q;
        qualList.push({ index: idx, label: lbl });
      });
    } else {
      qualList = [{ index: 0, label: "Automático (HD)" }];
    }
    var curSel = (typeof ke.trackIndex === "number" && ke.trackIndex >= 0 && ke.trackIndex < qualList.length) ? ke.trackIndex : 0;
    qualList.forEach(function (opt) {
      var btn = n("button", "dps-btn focusable" + (opt.index === curSel ? " is-selected" : ""));
      btn.textContent = opt.label;
      btn._trackIndex = opt.index;
      btn._activate = function () {
        if (ke.trackIndex === opt.index) { Ha(); return; }
        ke.trackIndex = opt.index;
        qaQuality();
        Ra();
        var pItem = ke.playerItem || ke.detail;
        if (pItem) {
          var curPos = (pe && pe.currentTime && isFinite(pe.currentTime)) ? pe.currentTime : 0;
          cn("Cambiando a " + opt.label + "…");
          dn();
          Ya = null;
          un(pItem, function (streamUrl) {
            if (streamUrl) {
              pn(streamUrl, curPos);
              cn("");
            } else {
              cn("No se pudo cambiar la calidad");
            }
          });
        }
        Ha();
      };
      qCont.appendChild(btn);
    });
  }

  function updatePsvAudio() {
    var aRow = r("psv-audio-row");
    if (!aRow) return;
    aRow.innerHTML = "";
    var item = da();
    var cfgBtn = document.createElement("button");
    cfgBtn.className = "psv-btn focusable psv-btn-config is-selected";
    cfgBtn.id = "psv-btn-config";
    cfgBtn.innerHTML = '<span class="psv-check" style="display:inline-block;margin-right:6px">⚙</span>Idioma y Subtítulos';
    cfgBtn._activate = function () {
      Ba(item, "audio");
    };
    aRow.appendChild(cfgBtn);
    bi = cfgBtn;
  }
  function Ba(e, focusSection) {
    if (mi || Xa(), mi) {
      Wi && (clearTimeout(Wi), Wi = null), ji = !0, na = ke.focus;
      var t = e || da();
      "detail" === ke.screen && (t = ke.detail || t);
      za(); Va(); qaQuality(); la();
      mi.classList.add("is-active");
      ga(t, function () { if (ji) { za(); Va(); qaQuality(); } });
      var i = null;
      if ("quality" === focusSection) {
        var qRow = mi.querySelector("#dps-quality-options");
        i = qRow && qRow.querySelector(".focusable");
      }
      if (!i) i = Ai && Ai.querySelector(".focusable") || Di || Hi;
      i && Fe(i);
    }
  } function Ha() { ji = !1, mi && mi.classList.remove("is-active"), _lastBackTime = Date.now(), Ve = Date.now() + 500, Vi ? (bi && Fe(bi), wa()) : na && Ne(na) ? Fe(na) : "player" === ke.screen && Fe(se), na = null } function za() { if (!Ai) return; o(Ai); var item = da(), e = item ? ia[ma(item)] : null, audioStr = (e && e.audio) || (item && item.streamAudioInfo) || (e && e.streamAudioInfo) || ""; var t = []; if (pe && pe.audioTracks && pe.audioTracks.length > 1) { for (var k = 0; k < pe.audioTracks.length; k++) { var at = pe.audioTracks[k], code = at.language || at.label || ""; t.push({ index: k, code: code, label: ja(code, k) }); } } else if (audioStr) { var parts = audioStr.split(/[\/,]/), hasLatino = !1; for (var p = 0; p < parts.length; p++) { if (/^(lat|latino|la)$/i.test(parts[p].trim())) hasLatino = !0; } var spaCount = 0; for (var a = 0; a < parts.length; a++) { var nStr = parts[a].trim(); if (nStr) { var lbl = ja(nStr, a); if (/^(spa|esp|es)$/i.test(nStr)) { spaCount++; lbl = hasLatino ? "Castellano" : (spaCount === 1 ? "Español Latino" : "Castellano"); } t.push({ index: a, code: nStr, label: lbl }); } } } if (!t.length) { t = [{ index: 0, code: "spa", label: "Español Latino" }]; } var selIdx = typeof $i === "number" ? $i : 0; if (pe && pe.audioTracks && pe.audioTracks.length > 1) { for (var k = 0; k < pe.audioTracks.length; k++) { if (pe.audioTracks[k].enabled) { selIdx = k; break; } } } for (var i = 0; i < t.length; i++)(function (tr) { var btn = n("button", "dps-btn focusable"); btn.textContent = tr.label; tr.index === selIdx && btn.classList.add("is-selected"); btn._activate = function () { Wa(tr.index); za(); wa(); }; Ai.appendChild(btn); })(t[i]); } function Va() { var e = ba(ia[ma(da())]); if (Di) { var t = Di.parentNode; t && t.classList.toggle("is-hidden", !e.length), Di.classList.toggle("is-on", Gi); var i = Di.querySelector(".dps-switch-text"); i && (i.textContent = Gi ? "ON" : "OFF") } if (Pi && Pi.classList.toggle("is-visible", Gi && e.length > 0), Ni && Ni.classList.toggle("is-visible", Gi && e.length > 0), Ri && Ri.classList.toggle("is-visible", Gi && e.length > 0), Gi) { if (Ui) { o(Ui); for (var a = 0; a < e.length; a++)(function (e) { var t = n("button", "dps-btn focusable"); t.textContent = ja(e.lang || "Sub"), Qi && Qi.url === e.url && t.classList.add("is-selected"), t._activate = function () { Qi = e, Gi = !0, Ji = !0, oa(e), Va(), wa() }, Ui.appendChild(t) })(e[a]) } if (Fi) for (var r = Fi.querySelectorAll(".dps-btn"), l = 0; l < r.length; l++) { var s = r[l].getAttribute("data-size"); r[l].classList.toggle("is-selected", s === Yi) } if (Bi) for (var d = Bi.querySelectorAll(".dps-btn"), c = 0; c < d.length; c++) { var p = d[c].getAttribute("data-style"); d[c].classList.toggle("is-selected", p === Zi) } } } function ja(e, idx) { var t = (e || "").toLowerCase().trim().split(/[-_]/)[0]; if (/^(lat|latino|la)$/i.test(t)) return "Español Latino"; if (/^(cast|castellano)$/i.test(t)) return "Castellano"; if (/^(spa|esp|es)$/i.test(t)) return "Español Latino"; if (/^(eng|ing|en|ingles)$/i.test(t)) return "Inglés"; if (/^(por|pt|portugues)$/i.test(t)) return "Portugués"; if (/^(fra|fre|fr|franc|frances)$/i.test(t)) return "Francés"; if (/^(ita|it|italiano)$/i.test(t)) return "Italiano"; if (/^(jpn|jap|ja|japones)$/i.test(t)) return "Japonés"; if (/^(kor|cor|ko|coreano)$/i.test(t)) return "Coreano"; if (/^(deu|ger|de|aleman)$/i.test(t)) return "Alemán"; if (/^(rus|ru|ruso)$/i.test(t)) return "Ruso"; if (/^(chi|zho|zh|chino)$/i.test(t)) return "Chino"; return e ? (e.charAt(0).toUpperCase() + e.slice(1)) : ("Pista " + ((idx || 0) + 1)) } function Wa(e) {
    $i = e; Xi = !0;
    if (pe && pe.audioTracks && pe.audioTracks.length > 1) {
      try {
        for (var k = 0; k < pe.audioTracks.length; k++) { pe.audioTracks[k].enabled = (k === e); }
        cn("");
        return;
      } catch (err) { }
    }
    var pItem = ke.playerItem || ke.detail;
    if (pItem) {
      var curPos = (pe && pe.currentTime && isFinite(pe.currentTime)) ? pe.currentTime : 0;
      cn("Cambiando audio…");
      dn();
      Ya = null;
      un(pItem, function (streamUrl) {
        if (streamUrl) {
          pn(streamUrl, curPos);
          cn("");
        } else {
          cn("No se pudo cambiar el audio");
        }
      });
    }
  } function $a() { } function Xa() {
    if (se = r("player-stage"), de = r("player-infobar"), ve = r("player-vod-infobar"), ce = r("player-channels"), pe = r("player-video"), fe = r("player-status"), Se = r("player-osd-icon"), ue = se ? se.querySelector(".player-frame") : null, he = r("vod-infobar-poster"), me = r("vod-infobar-title"), ge = r("vod-time-current"), ye = r("vod-time-total"), be = r("vod-seek-progress"), Ce = r("vod-seek-buffered"), we = r("vod-seek-thumb"), hi = r("player-playsetting-view"), gi = r("psv-sec-selection"), yi = r("psv-episodes-row"), Li = r("psv-btn-episodes"), bi = r("psv-btn-config"), Ci = r("psv-btn-p1"), wi = r("psv-btn-p2"), Si = r("psv-sec-audio"), r("psv-sec-quality"), r("psv-quality-row"), r("psv-sec-aspect"), r("psv-sec-player"), xi = r("psv-btn-feedback"), _i = r("psv-aspect-row"), ki = r("player-episodes"), Ii = r("pe-title"), Ti = r("pe-sub"), Ei = r("pe-seasons"), Mi = r("pe-seasons-col"), qi = r("pe-episodes"), Oi = r("pe-season-label"), Li && (Li._activate = function () { Ma() }), xi && (xi._activate = function () { wa() }), bi && (bi._activate = function () { Ba() }), Ci && (Ci._activate = function () { fa(da(), !0), Ra(), wa(), $a() }), wi && (wi._activate = function () { fa(da(), !1), Ra(), wa(), $a() }), _i) for (var e = _i.querySelectorAll(".psv-btn"), t = 0; t < e.length; t++)(function (e) { e._activate = function () { Fa(e.getAttribute("data-aspect")) } })(e[t]); if (mi = r("dialog-playsettings"), Ai = r("dps-audio-options"), Di = r("dps-sub-switch"), Pi = r("dps-row-lang"), Ni = r("dps-row-size"), Ri = r("dps-row-style"), Ui = r("dps-lang-options"), Fi = r("dps-size-options"), Bi = r("dps-style-options"), Hi = r("dps-btn-exit"), zi = r("player-subtitles"), Di && (Di._activate = function () { if (Ji = !0, Gi = !Gi) { var e = ba(ia[ma(da())]); !Qi && e.length && (Qi = e[0]), Qi && oa(Qi) } else oa(null); Va(), wa() }), Fi) for (var i = Fi.querySelectorAll(".dps-btn"), a = 0; a < i.length; a++)(function (e) { e._activate = function () { Yi = e.getAttribute("data-size") || "normal", la(), Va() } })(i[a]); if (Bi) for (var l = Bi.querySelectorAll(".dps-btn"), s = 0; s < l.length; s++)(function (e) { e._activate = function () { Zi = e.getAttribute("data-style") || "white", la(), Va() } })(l[s]); Hi && (Hi._activate = function () { Ha() }), la(), Fa(ea), o(ce), se.classList.add("focusable"), se._onMove = function (e) {
      if ("vod" === ke.playerMode) {
        return "left" === e ? (si(-10), !0) : "right" === e ? (si(10), !0) : "down" === e ? (Sa(), !0) : "up" === e && (ke.infobar ? ui() : pi(), !0);
      }
      if ("left" === e) {
        if (ke.infobar) { _piMoveBtn(-1); ci(); } else { pi(); _piFocusBtn(0); }
        return !0;
      }
      if ("right" === e) {
        if (ke.infobar) { _piMoveBtn(1); ci(); } else { pi(); _piFocusBtn(0); }
        return !0;
      }
      if ("up" === e) {
        ke.channel < z.length - 1 ? St(ke.channel + 1) : z.length && St(0);
        pi();
        return !0;
      }
      if ("down" === e) {
        ke.channel > 0 ? St(ke.channel - 1) : z.length && St(z.length - 1);
        pi();
        return !0;
      }
      return !1;
    }, se._activate = function () {
      if ("vod" !== ke.playerMode) {
        if (ke.channelsOpen) {
          Sn();
        } else if (ke.infobar) {
          ci();
        } else {
          wn();
        }
      } else {
        di();
      }
    };
    _initLiveInfoBar();

    // 1. Left Column: Categories
    var C = n("div", "pc-categories scrollable");
    C.id = "pc-categories";
    ce.appendChild(C);

    // 2. Right Column: Channels
    var channelsCol = n("div", "pc-channels-col");
    channelsCol.id = "pc-channels-col";

    var chHeader = n("div", "pc-channel-header");
    var chTitle = n("div", "pc-channel-header-title", "México");
    chTitle.id = "pc-channel-header-title";
    chHeader.appendChild(chTitle);
    channelsCol.appendChild(chHeader);

    var w = n("div", "pc-list scrollable");
    w.id = "pc-list";
    channelsCol.appendChild(w);

    ce.appendChild(channelsCol);

    // Create Live TV Search View Container
    var searchView = n("div", "pc-search-view");
    searchView.id = "pc-search-view";

    var searchLeft = n("div", "pc-search-left");

    // 1. Search Box
    var queryBox = n("div", "pc-search-box focusable is-empty", "Buscar canal...");
    queryBox.id = "pc-search-box";
    queryBox._onFocus = function () { _liveSearchLastKey = queryBox };
    queryBox._onMove = function (e) {
      if ("down" === e) return Fe(btnClear, !0), !0;
      if ("right" === e) {
        if (_liveSearchResultsElements.length) Fe(_liveSearchResultsElements[0], !0);
        return !0;
      }
      return !1;
    };
    searchLeft.appendChild(queryBox);

    // 2. Action buttons: Limpiar / Borrar
    var actionsRow = n("div", "pc-search-actions");

    var btnClear = n("button", "pc-search-act-btn pc-btn-clear focusable");
    var icoClear = n("div", "ico");
    icoClear.style.backgroundImage = "url(assets/original/search/icon_search_clear.png)";
    btnClear.appendChild(icoClear);
    btnClear.appendChild(n("span", null, "Limpiar"));
    btnClear._onFocus = function () { _liveSearchLastKey = btnClear };
    btnClear._activate = function () { _setLiveSearchQuery("") };
    btnClear._onMove = function (e) {
      if ("up" === e) return Fe(queryBox, !0), !0;
      if ("down" === e) return _searchGridKeys.length && Fe(_searchGridKeys[0], !0), !0;
      if ("right" === e) return Fe(btnDel, !0), !0;
      return !1;
    };
    actionsRow.appendChild(btnClear);

    var btnDel = n("button", "pc-search-act-btn pc-btn-del focusable");
    var icoDel = n("div", "ico");
    icoDel.style.backgroundImage = "url(assets/original/search/icon_search_delete.png)";
    btnDel.appendChild(icoDel);
    btnDel.appendChild(n("span", null, "Borrar"));
    btnDel._onFocus = function () { _liveSearchLastKey = btnDel };
    btnDel._activate = function () {
      if (_liveSearchQuery && _liveSearchQuery.length > 0) {
        _setLiveSearchQuery(_liveSearchQuery.slice(0, -1));
      }
    };
    btnDel._onMove = function (e) {
      if ("up" === e) return Fe(queryBox, !0), !0;
      if ("down" === e) return _searchGridKeys.length > 3 && Fe(_searchGridKeys[3], !0), !0;
      if ("left" === e) return Fe(btnClear, !0), !0;
      if ("right" === e) {
        if (_liveSearchResultsElements.length) Fe(_liveSearchResultsElements[0], !0);
        return !0;
      }
      return !1;
    };
    actionsRow.appendChild(btnDel);

    searchLeft.appendChild(actionsRow);

    // 3. Grid of keys: 6 rows x 6 cols
    var gridContainer = n("div", "pc-search-grid");
    var letters = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
      "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
      "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ",
      "Z", "X", "C", "V", "B", "N", "M"
    ];
    _searchGridKeys = [];
    for (var ki = 0; ki < letters.length; ki++) {
      (function (kIdx, ch) {
        var keyBtn = n("button", "pc-search-key focusable", ch);
        keyBtn._char = ch;
        keyBtn._idx = kIdx;
        keyBtn._onFocus = function () { _liveSearchLastKey = keyBtn };
        keyBtn._activate = function () {
          _setLiveSearchQuery(_liveSearchQuery + ch);
        };
        var r = Math.floor(kIdx / 10);
        var c = kIdx % 10;
        keyBtn._onMove = function (dir) {
          if ("left" === dir) {
            if (c > 0) Fe(_searchGridKeys[kIdx - 1], !0);
            return !0;
          }
          if ("right" === dir) {
            if (c < 9 && kIdx + 1 < _searchGridKeys.length && Math.floor((kIdx + 1) / 10) === r) {
              Fe(_searchGridKeys[kIdx + 1], !0);
            } else {
              if (_liveSearchResultsElements.length) {
                var targetIdx = Math.min(r * 2, _liveSearchResultsElements.length - 1);
                Fe(_liveSearchResultsElements[targetIdx] || _liveSearchResultsElements[0], !0);
              }
            }
            return !0;
          }
          if ("up" === dir) {
            if (r > 0) {
              Fe(_searchGridKeys[kIdx - 10], !0);
            } else {
              if (c < 5) Fe(btnClear, !0);
              else Fe(btnDel, !0);
            }
            return !0;
          }
          if ("down" === dir) {
            if (kIdx + 10 < _searchGridKeys.length) {
              Fe(_searchGridKeys[kIdx + 10], !0);
            } else {
              Fe(btnSpace, !0);
            }
            return !0;
          }
          return !1;
        };
        gridContainer.appendChild(keyBtn);
        _searchGridKeys.push(keyBtn);
      })(ki, letters[ki]);
    }
    searchLeft.appendChild(gridContainer);

    // 4. Bottom row: Space & Close
    var bottomRow = n("div", "pc-search-bottom-row");

    var btnSpace = n("button", "pc-key-space focusable");
    var icoSpace = n("div", "ico");
    icoSpace.style.backgroundImage = "url(assets/original/search/icon_search_space.png)";
    btnSpace.appendChild(icoSpace);
    btnSpace.appendChild(n("span", null, "ESPACIO"));
    btnSpace._onFocus = function () { _liveSearchLastKey = btnSpace };
    btnSpace._activate = function () {
      _setLiveSearchQuery(_liveSearchQuery + " ");
    };
    btnSpace._onMove = function (e) {
      if ("up" === e) return _searchGridKeys.length > 31 && Fe(_searchGridKeys[31], !0), !0;
      if ("right" === e) return Fe(btnClose, !0), !0;
      return !1;
    };
    bottomRow.appendChild(btnSpace);

    var btnClose = n("button", "pc-key-close focusable", "✕ Salir");
    btnClose._onFocus = function () { _liveSearchLastKey = btnClose };
    btnClose._activate = function () {
      _closeLiveSearch();
    };
    btnClose._onMove = function (e) {
      if ("up" === e) return _searchGridKeys.length > 34 && Fe(_searchGridKeys[34], !0), !0;
      if ("left" === e) return Fe(btnSpace, !0), !0;
      if ("right" === e) {
        if (_liveSearchResultsElements.length) Fe(_liveSearchResultsElements[0], !0);
        return !0;
      }
      return !1;
    };
    bottomRow.appendChild(btnClose);

    searchLeft.appendChild(bottomRow);
    searchView.appendChild(searchLeft);

    // 5. Right column: Results list
    var searchRight = n("div", "pc-search-right");
    var resultsStatus = n("div", "pc-search-status", "Canales de TV");
    resultsStatus.id = "pc-search-status";
    searchRight.appendChild(resultsStatus);

    var resultsList = n("div", "pc-search-results scrollable");
    resultsList.id = "pc-search-results";
    searchRight.appendChild(resultsList);

    searchView.appendChild(searchRight);
    ce.appendChild(searchView);

    Qa();
    Ja();
  }

  var _rawChannels = [];
  var _allMasterChannels = [];
  var _liveSearchQuery = "";
  var _liveSearchLastKey = null;
  var _searchGridKeys = _searchGridKeys || [];
  var _liveSearchResultsElements = _liveSearchResultsElements || [];
  var _masterCatalogLoading = !1;
  var _masterCatalogLoaded = !1;
  var _masterCatalogCallbacks = [];

  function loadLiveFavs() {
    if (!ke.favs) ke.favs = {};
    else {
      for (var fk in ke.favs) { if (Object.prototype.hasOwnProperty.call(ke.favs, fk)) delete ke.favs[fk]; }
    }
    if (!ke.favChannelsMap) ke.favChannelsMap = {};
    else {
      for (var mk in ke.favChannelsMap) { if (Object.prototype.hasOwnProperty.call(ke.favChannelsMap, mk)) delete ke.favChannelsMap[mk]; }
    }
    var keyFavs = getProfileStorageKey("xuper_live_favs");
    var keyItems = getProfileStorageKey("xuper_live_fav_items");
    try {
      var rawFavs = localStorage.getItem(keyFavs);
      if (!rawFavs && xuperActiveProfileId === "p1") {
        rawFavs = localStorage.getItem("xuper_live_favs");
      }
      if (rawFavs) {
        var parsed = JSON.parse(rawFavs);
        if (parsed && typeof parsed === "object") {
          for (var k in parsed) {
            if (parsed[k]) ke.favs[k] = !0;
          }
        }
      }
    } catch (e) { console.warn("loadLiveFavs favs error", e); }
    try {
      var rawItems = localStorage.getItem(keyItems);
      if (!rawItems && xuperActiveProfileId === "p1") {
        rawItems = localStorage.getItem("xuper_live_fav_items");
      }
      if (rawItems) {
        var parsedItems = JSON.parse(rawItems);
        if (parsedItems && typeof parsedItems === "object") {
          ke.favChannelsMap = parsedItems;
        }
      }
    } catch (e) { console.warn("loadLiveFavs items error", e); }
    return ke.favs;
  }

  function saveLiveFavs() {
    try {
      if (!ke.favs) ke.favs = {};
      localStorage.setItem(getProfileStorageKey("xuper_live_favs"), JSON.stringify(ke.favs));
      if (!ke.favChannelsMap) ke.favChannelsMap = {};
      localStorage.setItem(getProfileStorageKey("xuper_live_fav_items"), JSON.stringify(ke.favChannelsMap));
    } catch (e) { console.warn("saveLiveFavs error", e); }
  }

  function isChannelFav(ch) {
    if (!ch) return !1;
    if (!ke.favs) loadLiveFavs();
    var code = ch.channelCode || ch.id || "";
    var name = ch.name || "";
    if (ch.fav) return !0;
    if (code && ke.favs[code]) return !0;
    if (name && ke.favs[name]) return !0;
    return !1;
  }

  function _updateDrawerFavIcons() {
    if (!ce) return;
    var rows = ce.querySelectorAll(".pc-row");
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var chIdx = row._channel;
      var ch = z[chIdx];
      var star = row.querySelector(".pc-fav-star");
      if (star && ch) {
        var fav = isChannelFav(ch);
        star.textContent = fav ? "★" : "☆";
        star.classList.toggle("is-fav", fav);
      }
    }
  }

  function toggleChannelFav(ch) {
    if (!ch) return;
    if (!ke.favs) loadLiveFavs();
    var wasFav = isChannelFav(ch);
    var newState = !wasFav;
    var code = ch.channelCode || ch.id || "";
    var name = ch.name || "";
    var key = code || name;

    ch.fav = newState;
    if (code) {
      if (newState) ke.favs[code] = !0;
      else delete ke.favs[code];
    }
    if (name) {
      if (newState) ke.favs[name] = !0;
      else delete ke.favs[name];
    }

    if (!ke.favChannelsMap) ke.favChannelsMap = {};
    if (newState) {
      ke.favChannelsMap[key] = {
        name: ch.name || "",
        channelCode: ch.channelCode || ch.id || "",
        id: ch.id || ch.channelCode || "",
        logo: ch.logo || "",
        urls: ch.urls || (ch.streamUrl ? [{ playUrl: ch.streamUrl }] : (ch.liveAddressList || [])),
        liveAddressList: ch.liveAddressList || ch.urls || [],
        streamUrl: ch.streamUrl || (ch.urls && ch.urls[0] && ch.urls[0].playUrl) || (ch.liveAddressList && ch.liveAddressList[0] && ch.liveAddressList[0].playUrl) || "",
        index: ch.index || 0,
        fav: !0
      };
    } else {
      delete ke.favChannelsMap[key];
      if (code) delete ke.favChannelsMap[code];
      if (name) delete ke.favChannelsMap[name];
    }

    saveLiveFavs();

    var sync = function (arr) {
      if (!arr || !arr.length) return;
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        if (it && ((code && (it.channelCode === code || it.id === code)) || (name && it.name === name))) {
          it.fav = newState;
        }
      }
    };
    sync(_allMasterChannels);
    sync(_rawChannels);
    sync(z);
    if (typeof _catChannelsCache === "object" && _catChannelsCache) {
      for (var ck in _catChannelsCache) {
        if (Array.isArray(_catChannelsCache[ck])) sync(_catChannelsCache[ck]);
      }
    }

    _updatePiFavIcon();
    _updateDrawerFavIcons();

    if (typeof cn === "function") {
      cn(newState ? ("⭐ Añadido a Favoritos: " + (ch.name || "")) : ("☆ Eliminado de Favoritos: " + (ch.name || "")));
      setTimeout(function () { cn(""); }, 2200);
    }

    if (rt && rt.isFavorites) {
      _showFavorites();
    }
  }

  function _registerMasterChannels(list) {
    if (!list || !list.length) return;
    if (!ke.favs) loadLiveFavs();
    var seen = {};
    for (var i = 0; i < _allMasterChannels.length; i++) {
      var c = _allMasterChannels[i];
      seen[c.channelCode || c.streamUrl || c.name] = !0;
    }
    for (var j = 0; j < list.length; j++) {
      var ch = list[j];
      if (isChannelFav(ch)) ch.fav = !0;
      var k = ch.channelCode || ch.streamUrl || ch.name;
      if (!seen[k]) {
        seen[k] = !0;
        _allMasterChannels.push(ch);
      }
    }
  }

  if (window.XUPERTV_MASTER_CHANNELS && window.XUPERTV_MASTER_CHANNELS.length) {
    loadLiveFavs();
    _registerMasterChannels(window.XUPERTV_MASTER_CHANNELS);
    _masterCatalogLoaded = !0;
  }

  function _loadMasterCatalog(cb) {
    if (_customSportsChannels && _customSportsChannels.length) _registerMasterChannels(_customSportsChannels);
    if (_masterCatalogLoaded && _allMasterChannels.length > 500) {
      cb && cb();
      return;
    }
    if (cb) _masterCatalogCallbacks.push(cb);
    if (_masterCatalogLoading) return;
    _masterCatalogLoading = !0;

    // 1. Fetch all portal channels from 76182 (Todos)
    D("liveChannels", { columnId: 76182 }, function (err, res) {
      _masterCatalogLoading = !1;
      if (!err && res && res.channels && res.channels.length) {
        _registerMasterChannels(res.channels);
        _masterCatalogLoaded = !0;
      }

      var cbs = _masterCatalogCallbacks.slice();
      _masterCatalogCallbacks = [];
      for (var i = 0; i < cbs.length; i++) {
        try { cbs[i](); } catch (e) { }
      }

      if (ke.liveSearchOpen) {
        _setLiveSearchQuery(_liveSearchQuery);
      }
    });
  }

  function _openLiveSearch() {
    ke.liveSearchOpen = !0;
    if (!ce) return;
    ce.classList.add("is-searching");
    var title = ce.querySelector(".pc-title");
    if (title) title.textContent = "🔍 Búsqueda General de Canales";
    _loadMasterCatalog();
    _setLiveSearchQuery("");
    var target = (_searchGridKeys && _searchGridKeys.length) ? _searchGridKeys[0] : (ce.querySelector(".pc-search-box") || ce.querySelector(".pc-btn-close-search"));
    if (target) Fe(target, !0);
  }

  function _closeLiveSearch() {
    ke.liveSearchOpen = !1;
    if (!ce) return;
    ce.classList.remove("is-searching");
    var title = ce.querySelector(".pc-title");
    if (title) title.textContent = "Canales de TV";
    var searchBtn = ce.querySelector("#pc-btn-search") || ce.querySelector(".pc-cat-pill.is-selected") || (De && De.length ? De[0] : null);
    if (searchBtn) Fe(searchBtn, !0);
  }

  function _playLiveChannel(ch) {
    if (!ch) return;

    var idx = -1;
    for (var i = 0; i < z.length; i++) {
      if (z[i] === ch || (ch.channelCode && z[i].channelCode === ch.channelCode) || (ch.index && z[i].index === ch.index && z[i].name === ch.name)) {
        idx = i;
        break;
      }
    }

    if (idx !== -1) {
      St(idx, !0);
    } else {
      // Switch to "Todos" category (id 76182) so full master channel lineup is active in exact numerical order
      var masterSorted = _allMasterChannels.slice().sort(function (a, b) {
        return (parseInt(a.index, 10) || 0) - (parseInt(b.index, 10) || 0);
      });

      if (masterSorted.length > 0) {
        z.splice(0, z.length);
        for (var k = 0; k < masterSorted.length; k++) {
          z.push(masterSorted[k]);
        }
        _rawChannels = z.slice();
      } else {
        z.unshift(ch);
      }

      rt = { id: 76182, name: "Todos" };
      if (ce) {
        var pills = ce.querySelectorAll(".pc-cat-pill");
        for (var p = 0; p < pills.length; p++) {
          pills[p].classList.toggle("is-selected", pills[p]._cat && pills[p]._cat.id === 76182);
        }
      }

      idx = -1;
      for (var j = 0; j < z.length; j++) {
        if (z[j] === ch || (ch.channelCode && z[j].channelCode === ch.channelCode) || (ch.index && z[j].index === ch.index)) {
          idx = j;
          break;
        }
      }
      if (idx === -1) idx = 0;

      Ja();
      Ct(!1);
      St(idx, !0);
    }

    _closeLiveSearch();
    Sn();
    if ("player" === ke.screen && se) {
      Fe(se);
    }
  }

  function _setLiveSearchQuery(val) {
    _liveSearchQuery = val || "";
    if (ce) {
      var qb = ce.querySelector("#pc-search-box");
      if (qb) {
        if (_liveSearchQuery) {
          qb.textContent = _liveSearchQuery;
          qb.classList.remove("is-empty");
        } else {
          qb.textContent = "Buscar por número o nombre de canal...";
          qb.classList.add("is-empty");
        }
      }
    }
    var rawQ = (_liveSearchQuery || "").trim();
    var q = c(rawQ);
    var pool = (_allMasterChannels && _allMasterChannels.length) ? _allMasterChannels : (_rawChannels && _rawChannels.length ? _rawChannels : z);
    var filtered = [];

    if (q) {
      var isNum = /^\d+$/.test(rawQ);
      var scored = [];
      var qTokens = q.split(/\s+/).filter(Boolean);

      for (var i = 0; i < pool.length; i++) {
        var item = pool[i];
        var nameNorm = c(item.name || "");
        var groupNorm = c(item.group || "");
        var nowNorm = c(item.now || "");
        var idxStr = String(item.index || (i + 1));
        var score = 0;

        if (isNum) {
          if (idxStr === rawQ) {
            score = 1000;
          } else if (idxStr.indexOf(rawQ) === 0) {
            score = 500 - (idxStr.length - rawQ.length) * 10;
          } else if (idxStr.indexOf(rawQ) !== -1) {
            score = 200;
          }
        }

        if (nameNorm === q) {
          score = Math.max(score, 800);
        } else if (nameNorm.indexOf(q) === 0) {
          score = Math.max(score, 600);
        } else if (nameNorm.indexOf(q) !== -1) {
          score = Math.max(score, 400);
        } else if (qTokens.length > 1) {
          var allMatch = true;
          var fullText = nameNorm + " " + groupNorm + " " + nowNorm + " " + idxStr;
          for (var k = 0; k < qTokens.length; k++) {
            if (fullText.indexOf(qTokens[k]) === -1) {
              allMatch = false;
              break;
            }
          }
          if (allMatch) {
            score = Math.max(score, 300);
          }
        } else if (groupNorm.indexOf(q) !== -1 || nowNorm.indexOf(q) !== -1) {
          score = Math.max(score, 100);
        }

        if (score > 0) {
          scored.push({ item: item, score: score, index: parseInt(item.index, 10) || (i + 1) });
        }
      }

      scored.sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.index - b.index;
      });

      for (var s = 0; s < scored.length; s++) {
        filtered.push(scored[s].item);
      }
    } else {
      filtered = pool.slice(0, 60);
    }

    _renderLiveSearchResults(filtered, rawQ);
  }

  function _renderLiveSearchResults(list, query) {
    var container = ce ? ce.querySelector("#pc-search-results") : null;
    var statusEl = ce ? ce.querySelector("#pc-search-status") : null;
    if (!container) return;
    o(container);
    _liveSearchResultsElements = [];
    var pool = (_allMasterChannels && _allMasterChannels.length) ? _allMasterChannels : (_rawChannels && _rawChannels.length ? _rawChannels : z);
    if (statusEl) {
      if (_masterCatalogLoading && (!_allMasterChannels || !_allMasterChannels.length)) {
        statusEl.textContent = "Cargando catálogo general de canales...";
      } else if (query) {
        statusEl.textContent = "Resultados para «" + query + "» (" + list.length + " de " + pool.length + " canales)";
      } else {
        statusEl.textContent = "Todos los canales disponibles (" + pool.length + " canales)";
      }
    }
    if (!list || !list.length) {
      var emptyDiv = n("div", "pc-search-empty", query ? "No se encontraron canales para «" + query + "»" : "No hay canales disponibles");
      container.appendChild(emptyDiv);
      return;
    }
    var renderLimit = Math.min(list.length, 60);
    for (var i = 0; i < renderLimit; i++) {
      (function (idx, ch) {
        var row = n("div", "pc-row focusable");
        row._channelData = ch;
        row._idx = idx;
        var ic = n("div", "ic");
        if (ch.logo) {
          ic.style.backgroundImage = "url(" + ch.logo + ")";
          ic.style.backgroundSize = "contain";
          ic.style.backgroundRepeat = "no-repeat";
          ic.style.backgroundPosition = "center";
        }
        var num = n("div", "num", d(ch.index || (idx + 1)));
        var nm = n("div", "nm", ch.name);
        var epgText = ch.group ? (ch.group + " • " + (ch.now || "En vivo")) : (ch.now || "En vivo");
        var epg = n("div", "epg", epgText);
        row.appendChild(ic);
        row.appendChild(num);
        row.appendChild(nm);
        row.appendChild(epg);

        row._activate = function () {
          _playLiveChannel(ch);
        };
        row._onMove = function (dir) {
          if ("left" === dir) {
            var target = _liveSearchLastKey || (_searchGridKeys.length ? _searchGridKeys[0] : null);
            if (target) Fe(target, !0);
            return !0;
          }
          if ("up" === dir) {
            if (idx > 0 && _liveSearchResultsElements[idx - 1]) {
              Fe(_liveSearchResultsElements[idx - 1]);
              Ue(_liveSearchResultsElements[idx - 1]);
            }
            return !0;
          }
          if ("down" === dir) {
            if (idx < _liveSearchResultsElements.length - 1 && _liveSearchResultsElements[idx + 1]) {
              Fe(_liveSearchResultsElements[idx + 1]);
              Ue(_liveSearchResultsElements[idx + 1]);
            }
            return !0;
          }
          return !1;
        };
        container.appendChild(row);
        _liveSearchResultsElements.push(row);
      })(i, list[i]);
    }
  }
  var _catPills = [];

  function _showFavorites() {
    if (!ke.favs) loadLiveFavs();
    var favList = [];
    var seen = {};

    var pools = [_allMasterChannels, _rawChannels, z];
    for (var p = 0; p < pools.length; p++) {
      var pool = pools[p];
      if (!pool || !pool.length) continue;
      for (var k = 0; k < pool.length; k++) {
        var c = pool[k];
        if (c && isChannelFav(c)) {
          var sKey = c.channelCode || c.name;
          if (sKey && !seen[sKey] && !seen[c.name]) {
            seen[sKey] = !0;
            seen[c.name] = !0;
            c.fav = !0;
            favList.push(c);
          }
        }
      }
    }

    if (ke.favChannelsMap) {
      for (var fk in ke.favChannelsMap) {
        var saved = ke.favChannelsMap[fk];
        if (saved && isChannelFav(saved)) {
          var sKey2 = saved.channelCode || saved.name;
          if (sKey2 && !seen[sKey2] && !seen[saved.name]) {
            seen[sKey2] = !0;
            seen[saved.name] = !0;
            saved.fav = !0;
            favList.push(saved);
          }
        }
      }
    }

    z.splice(0, z.length);
    for (var f = 0; f < favList.length; f++)z.push(favList[f]);
    Ja();
  }

  function _selectCategory(cat, pill, moveFocusToChannels, cb) {
    if (!cat) return;
    rt = cat;

    if (ce) {
      var pills = ce.querySelectorAll(".pc-cat-pill");
      for (var k = 0; k < pills.length; k++) {
        var isSel = pills[k]._cat && pills[k]._cat.id === cat.id;
        pills[k].classList.toggle("is-selected", isSel);
      }
    }

    var headerTitle = document.getElementById("pc-channel-header-title");
    if (headerTitle) {
      headerTitle.textContent = cat.name || "Canales";
    }

    if (cat.isSearch) {
      _openLiveSearch();
      cb && cb();
      return;
    }
    if (cat.isFavorites) {
      _showFavorites();
      if (moveFocusToChannels && De && De.length && De[0]) Fe(De[0]);
      cb && cb();
      return;
    }

    var catId = cat.id;
    var isSports = (catId === 76206 || String(catId) === "76206");
    if (_catChannelsCache[catId] && _catChannelsCache[catId].length) {
      z.splice(0, z.length);
      var cached = _catChannelsCache[catId];
      if (isSports) cached = _mergeCustomSportsChannels(cached);
      for (var c = 0; c < cached.length; c++)z.push(cached[c]);
      Ja();
      if (moveFocusToChannels && De && De.length && De[0]) Fe(De[0]);
      cb && cb();
      return;
    }

    var listEl = ce ? (ce.querySelector("#pc-list") || ce.querySelector(".pc-list")) : null;
    if (listEl) {
      listEl.innerHTML = '<div class="pc-loading-channels" style="padding:40px 24px;color:var(--lg-crimson-accent,#FD1E4D);font-size:24px;font-weight:600;">Cargando ' + (cat.name || 'canales') + '…</div>';
    }

    var loadSeq = ++_liveCategoryLoadSeq;
    var params = (catId && catId !== 76182) ? { columnId: catId } : {};
    D("liveChannels", params, function (err, res) {
      if (loadSeq !== _liveCategoryLoadSeq) return;
      var rawList = (res && res.channels && res.channels.length) ? res.channels : [];
      if (isSports) rawList = _mergeCustomSportsChannels(rawList);
      if (rawList.length) {
        _catChannelsCache[catId] = rawList;
        _registerMasterChannels(rawList);
        _rawChannels = rawList.slice();
        z.splice(0, z.length);
        for (var n = 0; n < rawList.length; n++)z.push(rawList[n]);
        Ja();
        if (moveFocusToChannels && De && De.length && De[0]) Fe(De[0]);
        cb && cb();
      } else {
        if (listEl) {
          listEl.innerHTML = '<div style="padding:40px 24px;color:#8b929d;font-size:22px;">No hay canales disponibles en esta categoría</div>';
        }
        cb && cb(err);
      }
    });
  }

  function Qa() {
    if (!ce) return;
    var catCol = ce.querySelector("#pc-categories") || ce.querySelector(".pc-categories");
    if (!catCol) return;
    o(catCol);

    var specialItems = [
      { id: "search", name: "Busca", icon: "🔍", isSearch: !0 },
      { id: "favorites", name: "Favoritos", icon: "⭐", isFavorites: !0 },
      { id: 76182, name: "Lista de canales", icon: "☰", isChannelList: !0 }
    ];

    var apiCats = (nt && nt.length) ? nt.filter(function (c) {
      if (!ke.crOn && isAdultContent(c)) return !1;
      return c.id !== 76182 && c.id !== "search" && c.id !== "favorites" && !c.isSearch && !c.isAddon;
    }) : [
      { id: 76197, name: "México" },
      { id: 76188, name: "Colombia" },
      { id: 77690, name: "Venezuela" },
      { id: 76190, name: "Ecuador" },
      { id: 76207, name: "Chile" },
      { id: 76187, name: "Perú" },
      { id: 76202, name: "Bolivia" },
      { id: 76201, name: "Uruguay" },
      { id: 77688, name: "Paraguay" },
      { id: 77689, name: "Panamá" },
      { id: 77988, name: "Puerto Rico" },
      { id: 76191, name: "España" },
      { id: 76206, name: "Deportes" },
      { id: 76205, name: "Cine y Series" }
    ];

    var _mexCatIdx = -1;
    for (var ki = 0; ki < apiCats.length; ki++) {
      if (apiCats[ki].id === 76197 || /m[ée]xic/i.test(apiCats[ki].name)) {
        _mexCatIdx = ki; break;
      }
    }
    if (_mexCatIdx > 0) {
      var _mexEl = apiCats.splice(_mexCatIdx, 1)[0];
      apiCats.unshift(_mexEl);
    } else if (_mexCatIdx === -1) {
      apiCats.unshift({ id: 76197, name: "México" });
    }

    var allCats = specialItems.concat(apiCats);

    if (!rt) {
      rt = apiCats[0] || allCats[0];
    }

    var headerTitle = document.getElementById("pc-channel-header-title");
    if (headerTitle && rt) {
      headerTitle.textContent = rt.name;
    }

    var catPills = [];
    allCats.forEach(function (cat, aIdx) {
      var pill = n("button", "pc-cat-pill focusable");
      pill._cat = cat;
      pill._idx = aIdx;

      if (cat.icon) {
        var ico = n("span", "pc-cat-icon", cat.icon);
        pill.appendChild(ico);
      }
      var txt = n("span", "pc-cat-text", cat.name);
      pill.appendChild(txt);

      if (rt && rt.id === cat.id) {
        pill.classList.add("is-selected");
      }

      pill._activate = function () {
        _selectCategory(cat, pill, !0);
      };

      pill._onMove = function (dir) {
        if ("up" === dir) {
          if (aIdx > 0 && catPills[aIdx - 1]) {
            Fe(catPills[aIdx - 1]);
            Ue(catPills[aIdx - 1]);
          }
          return !0;
        }
        if ("down" === dir) {
          if (aIdx < catPills.length - 1 && catPills[aIdx + 1]) {
            Fe(catPills[aIdx + 1]);
            Ue(catPills[aIdx + 1]);
          }
          return !0;
        }
        if ("right" === dir) {
          if (rt && rt.id === cat.id) {
            var curCh = (De && De[ke.channel]) || (De && De[0]);
            if (curCh) Fe(curCh);
          } else {
            _selectCategory(cat, pill, !0);
          }
          return !0;
        }
        if ("left" === dir) {
          return !0;
        }
        return !1;
      };

      catCol.appendChild(pill);
      catPills.push(pill);
    });
    _catPills = catPills;
  }

  function Ga(e, t) {
    if (e && t) {
      var i = t.offsetLeft, a = t.offsetWidth, n = e.scrollLeft, r = e.clientWidth;
      i < n ? e.scrollLeft = i - 20 : i + a > n + r && (e.scrollLeft = i + a - r + 20);
    }
  }

  var _renderedChannelCount = 0;
  var CHANNELS_CHUNK_SIZE = 45;

  function _appendChannelChunk(container) {
    if (!container || _renderedChannelCount >= z.length) return;
    var start = _renderedChannelCount;
    var end = Math.min(z.length, start + CHANNELS_CHUNK_SIZE);
    _renderedChannelCount = end;

    for (var r = start; r < end; r++) {
      (function (chIdx) {
        var ch = z[chIdx];
        if (!ch) return;
        if (!ke.crOn && isAdultContent(ch)) return;
        var l = n("div", "pc-row focusable");
        l._channel = chIdx;

        // 1. Logo
        var s = n("div", "ic");
        if (ch.logo) {
          s.style.backgroundImage = "url(" + ch.logo + ")";
          s.style.backgroundSize = "contain";
          s.style.backgroundRepeat = "no-repeat";
          s.style.backgroundPosition = "center";
        }
        l.appendChild(s);

        // 2. Play icon
        var playIco = n("span", "pc-play-icon", "▶");
        if (chIdx === ke.channel) {
          l.classList.add("is-current");
          playIco.style.display = "inline-block";
        } else {
          playIco.style.display = "none";
        }
        l.appendChild(playIco);

        // 3. Number
        var c = n("div", "num", String(ch.index || chIdx + 1));
        l.appendChild(c);

        // 4. Name
        var p = n("div", "nm", ch.name);
        l.appendChild(p);

        // 5. Star icon
        var favStar = n("div", "pc-fav-star" + (isChannelFav(ch) ? " is-fav" : ""), isChannelFav(ch) ? "★" : "☆");
        favStar.title = "Favorito (Tecla Amarilla / F)";
        favStar.onclick = function (ev) {
          ev.stopPropagation();
          toggleChannelFav(ch);
        };
        l.appendChild(favStar);

        l._activate = function () {
          St(chIdx, !0);
          var allRows = container.querySelectorAll(".pc-row");
          for (var k = 0; k < allRows.length; k++) {
            var isCur = (allRows[k]._channel === chIdx);
            allRows[k].classList.toggle("is-current", isCur);
            var pi = allRows[k].querySelector(".pc-play-icon");
            if (pi) pi.style.display = isCur ? "inline-block" : "none";
          }
        };

        l._onMove = function (dir) {
          if ("right" === dir) return Sn(), Fe(se), !0;
          if ("left" === dir) {
            var catCol = ce ? (ce.querySelector("#pc-categories") || ce.querySelector(".pc-categories")) : null;
            var selCat = catCol ? (catCol.querySelector(".pc-cat-pill.is-selected") || catCol.querySelector(".pc-cat-pill")) : null;
            return selCat ? (Fe(selCat), !0) : !1;
          }
          if ("up" === dir) {
            if (chIdx > 0 && De[chIdx - 1]) {
              Fe(De[chIdx - 1]);
              Ue(De[chIdx - 1]);
            }
            return !0;
          }
          if ("down" === dir) {
            if (chIdx < De.length - 1 && De[chIdx + 1]) {
              Fe(De[chIdx + 1]);
              Ue(De[chIdx + 1]);
              if (chIdx >= De.length - 8 && _renderedChannelCount < z.length) {
                _appendChannelChunk(container);
              }
            } else if (chIdx === De.length - 1 && _renderedChannelCount < z.length) {
              _appendChannelChunk(container);
              if (De[chIdx + 1]) {
                Fe(De[chIdx + 1]);
                Ue(De[chIdx + 1]);
              }
            }
            return !0;
          }
          return !1;
        };

        container.appendChild(l);
        De.push(l);
      })(r);
    }
  }

  function Ja() {
    if (ce) {
      var e = ce.querySelector("#pc-list") || ce.querySelector(".pc-list");
      var headerTitle = document.getElementById("pc-channel-header-title");
      if (headerTitle && rt) {
        headerTitle.textContent = rt.name || "Canales";
      }
      if (e) {
        o(e);
        De = [];
        _renderedChannelCount = 0;
        if (!z.length) {
          var a = n("div", "pc-empty-channels");
          a.innerHTML = (rt && rt.isFavorites)
            ? "No tienes canales en Favoritos todavía.<br><span style='font-size:18px;color:#8b929d;font-weight:normal;'>Marca cualquier canal con el icono de corazón (♥), la estrella (★) o la tecla Amarilla del control.</span>"
            : "No hay canales disponibles en esta categoría";
          a.style.padding = "40px 24px";
          a.style.color = "#8b929d";
          a.style.fontSize = "22px";
          a.style.lineHeight = "1.5";
          return void e.appendChild(a);
        }
        _appendChannelChunk(e);
        while (ke.channel >= _renderedChannelCount && _renderedChannelCount < z.length) {
          _appendChannelChunk(e);
        }
      }
    }
  }
  var Ka = "", Ya = "", Za = 0, en = "", tn = 0, an = 0, nn = null, rn = !1, on = null, _waitTimer = null; function _clearWait() { _waitTimer && (clearTimeout(_waitTimer), _waitTimer = null) } function ln() { rn = !1, on && (clearTimeout(on), on = null) } function _ensurePlaying() { if (!pe || ("player" !== ke.screen && "detail" !== ke.screen)) return; try { pe.autoplay = !0; var p = pe.play(); p && p.catch && p.catch(function () { }) } catch (e) { } }
  function _commitSeek() {
    if (_seekCommitTimer) { clearTimeout(_seekCommitTimer); _seekCommitTimer = null; }
    if (!pe || _targetSeekTime < 0) { _isSeeking = false; return; }
    var seekTo = _targetSeekTime;
    try { pe.currentTime = seekTo; } catch (err) { }
    if (_seekSafetyTimer) clearTimeout(_seekSafetyTimer);
    _seekSafetyTimer = setTimeout(function () {
      _seekSafetyTimer = null;
      _onSeekFinished();
    }, 3000);
  }
  function _onSeekFinished() {
    if (_seekSafetyTimer) { clearTimeout(_seekSafetyTimer); _seekSafetyTimer = null; }
    if (_seekCommitTimer) { clearTimeout(_seekCommitTimer); _seekCommitTimer = null; }
    _targetSeekTime = -1;
    _isSeeking = false;
    if (_wasPlayingBeforeSeek) {
      _wasPlayingBeforeSeek = false;
      _ensurePlaying();
    }
    if ("vod" === ke.playerMode && pe) {
      var cur = pe.currentTime || 0, dur = _resolveVodDuration();
      oi(cur, dur);
      sa(cur);
    }
    li("none");
  }
  function sn() { }
  function si(e) {
    if (pe) {
      var dur = _resolveVodDuration();
      if (!dur || dur <= 0) dur = (pe.duration > 0 ? pe.duration : 86400);
      var base = (_targetSeekTime >= 0) ? _targetSeekTime : (pe.currentTime || 0);
      var nextTime = Math.max(0, Math.min(dur - 2, base + e));
      _targetSeekTime = nextTime;
      if (!_isSeeking) {
        _wasPlayingBeforeSeek = pe && !pe.paused;
        _isSeeking = true;
        if (_wasPlayingBeforeSeek) {
          try { pe.pause(); } catch (err) { }
        }
      }
      oi(nextTime, dur);
      pi();
      li(e > 0 ? "forward" : "backward");
      if (_seekCommitTimer) clearTimeout(_seekCommitTimer);
      _seekCommitTimer = setTimeout(function () {
        _commitSeek();
      }, 450);
    }
  }
  function dn() {
    _clearWait();
    if ("vod" === ke.playerMode && pe && pe.currentTime > 5 && ke.playerItem) {
      saveVodProgress(ke.playerItem, ke.playerEpisode, pe.currentTime);
    }
    if (_seekCommitTimer) { clearTimeout(_seekCommitTimer); _seekCommitTimer = null; }
    if (_seekSafetyTimer) { clearTimeout(_seekSafetyTimer); _seekSafetyTimer = null; }
    _targetSeekTime = -1;
    _isSeeking = false;
    _wasPlayingBeforeSeek = false;
    ke.streamError = "";
    cn("");
    li("none");
    ri();
    nn && (clearTimeout(nn), nn = null, an = 0);
    ln();
    en = "";
    tn = 0;
    Za++;
    var e = Ka;
    if (!e && Ya && -1 !== Ya.indexOf("127.0.0.1")) {
      var t = /^(http:\/\/127\.0\.0\.1:\d+)/.exec(Ya);
      t && (e = t[1]);
    }
    if (e) try { var i = new XMLHttpRequest; i.open("GET", e + "/media/abort", !0), i.send() } catch (e) { }
    try { D("abortMedia", {}, function () { }) } catch (e) { }
    if (Ya = "", Ka = "", pe) {
      try { pe.pause() } catch (e) { }
      try { pe.currentTime = 0 } catch (e) { }
      pe.removeAttribute("src");
      try { pe.src = "" } catch (e) { }
      for (; pe.firstChild;)pe.removeChild(pe.firstChild);
      pe.classList.remove("is-active");
      ue && (ue.style.display = "block");
    }
  }
  function cn(e) { fe || (fe = r("player-status")), fe && (e ? (fe.textContent = e, fe.classList.add("is-active")) : (fe.textContent = "", fe.classList.remove("is-active"))) }
  function pn(e, startTime) {
    if (pe && e) {
      var startSec = (startTime > 0 && isFinite(startTime)) ? startTime : 0;
      if (Ya !== e) { dn() } else { _clearWait(), ln() }
      Ya = e;
      var t = /^(http:\/\/127\.0\.0\.1:\d+)/.exec(e);
      t && (Ka = t[1]), en = "", tn = 0;
      startSec <= 0 && cn("Conectando con el vídeo…");
      ke.streamError = "";
      pe.onerror = function () {
        ln();
        var errCode = pe.error && pe.error.code;
        ke.streamError = "No se pudo abrir el stream (código " + (errCode || "error") + ")";
        pe.classList.remove("is-active");
        ue && (ue.style.display = "block");
        cn(ke.streamError);
      };
      pe.onloadeddata = function () { _clearVideoLoadingState(); };
      pe.oncanplay = function () {
        ln();
        _clearVideoLoadingState();
        _ensurePlaying();
      };
      pe.onloadedmetadata = function () {
        _clearVideoLoadingState();
        if ("vod" === ke.playerMode) {
          var cur = startSec > 0 ? startSec : (pe.currentTime || 0), dur = _resolveVodDuration();
          oi(cur, dur);
        }
      };
      pe.ondurationchange = function () {
        if ("vod" === ke.playerMode) {
          var cur = pe.currentTime || 0, dur = _resolveVodDuration();
          oi(cur, dur);
        }
      };
      pe.onplaying = function () {
        _clearVideoLoadingState();
        ke.streamError = "";
        cn("");
        "vod" === ke.playerMode && li("none");
      };
      pe.onseeked = function () {
        _onSeekFinished();
      };
      pe.onseeking = function () {
        _clearWait();
      };
      var _lastProgressSave = 0;
      pe.ontimeupdate = function () {
        if (pe.currentTime > 0) _clearVideoLoadingState();
        if ("vod" === ke.playerMode) {
          if (pe && pe.seeking) return;
          var cur = (_targetSeekTime >= 0) ? _targetSeekTime : (pe.currentTime || 0), dur = _resolveVodDuration();
          oi(cur, dur);
          sa(cur);
          var now = Date.now();
          if (now - _lastProgressSave > 4000) {
            _lastProgressSave = now;
            if (cur > 5) {
              saveVodProgress(ke.playerItem, ke.playerEpisode, cur);
            }
          }
        }
      };
      pe.onpause = function () {
        ri();
        if ("vod" === ke.playerMode) {
          li("pause");
          if (pe && pe.currentTime > 5) {
            saveVodProgress(ke.playerItem, ke.playerEpisode, pe.currentTime);
          }
        }
      };
      pe.onended = function () {
        if ("vod" === ke.playerMode && ke.playerItem) {
          if (I(ke.playerItem) && ke.playerItem.episodes && ke.playerItem.episodes.length) {
            var curIdx = -1, curEp = ke.playerEpisode;
            for (var i = 0; i < ke.playerItem.episodes.length; i++) {
              var ep = ke.playerItem.episodes[i];
              if (curEp && (ep.id === curEp.id || (ep.number && ep.number === curEp.number))) {
                curIdx = i;
                break;
              }
            }
            if (curIdx >= 0 && curIdx < ke.playerItem.episodes.length - 1) {
              var nextEp = ke.playerItem.episodes[curIdx + 1];
              cn("Capítulo finalizado. Siguiente: Capítulo " + (nextEp.number || (curIdx + 2)) + "…");
              saveVodProgress(ke.playerItem, nextEp, 0);
              setTimeout(function () {
                Pa(ke.playerItem, nextEp);
              }, 1200);
              return;
            }
          }
          saveVodProgress(ke.playerItem, ke.playerEpisode, 0);
          cn("Reproducción finalizada");
        }
      };
      pe.onplay = function () {
        "vod" === ke.playerMode && (li("none"), ri(), ni = setInterval(function () {
          if ("player" === ke.screen && "vod" === ke.playerMode && pe && !pe.paused) {
            if (pe && pe.seeking) return;
            var cur = pe.currentTime || 0, dur = _resolveVodDuration();
            oi(cur, dur);
            sa(cur);
          }
        }, 500));
      };
      pe.onwaiting = function () {
        if (!_waitTimer && !ke.streamError) {
          _waitTimer = setTimeout(function () {
            _waitTimer = null;
            pe && !pe.paused && !ke.streamError && pe.readyState < 3 && cn("Cargando vídeo…");
          }, 1500);
        }
      };
      pe.onstalled = function () {
        if (!_waitTimer && !ke.streamError) {
          _waitTimer = setTimeout(function () {
            _waitTimer = null;
            pe && !pe.paused && !ke.streamError && pe.readyState < 3 && cn("Conectando…");
          }, 1500);
        }
      };
      var a = ke.playerItem && ke.playerItem.streamMime || "",
        n = -1 !== e.indexOf(".m3u8") || -1 !== a.indexOf("mpegurl") || !(!ke.playerItem || !ke.playerItem.isHls),
        startMs = startSec > 0 ? Math.round(startSec * 1000) : 0,
        r = { mediaTransportType: n ? "HLS" : "URI" };
      if ("vod" === ke.playerMode && startMs > 0) {
        r.option = { transmission: { playTime: { start: startMs } } };
      }
      var o = (n ? "application/vnd.apple.mpegurl" : -1 !== e.indexOf(".mp4") || -1 !== a.indexOf("mp4") ? "video/mp4" : "video/mp2t") + ";mediaOption=" + encodeURI(JSON.stringify(r));
      for (; pe.firstChild;)pe.removeChild(pe.firstChild);
      pe.removeAttribute("src");
      try { pe.mediaOption = r } catch (e) { }
      var l = document.createElement("source");
      l.src = e, l.type = o, pe.appendChild(l);
      if (!window.PalmSystem) { try { pe.src = e } catch (e) { } }
      pe.classList.add("is-active"), ue && (ue.style.display = "none");
      try {
        pe.autoplay = !0;
        pe.load();
        setTimeout(function () { pe && pe.paused && !pe.error && "player" === ke.screen && _ensurePlaying() }, 600);
      } catch (e) {
        setTimeout(_ensurePlaying, 600);
      }
    }
  }
  function _clearVideoLoadingState() { _clearWait(), cn("") } function un(e, t) {
    if (e && (e.portal || ("portal" === h.mode && String(e.id || "").length > 15))) e._portal = !0; var i = Za; function a() {
      var a = { contentId: e.id }; a.playbackMode = ke.streamMode, a.forceRelay = "smooth" === ke.streamMode || "relay" === ke.streamMode, a.trackIndex = ke.trackIndex || 0; var n = ia[ma(e)]; if (n && !Xi && ($i = ya(n.audio)), a.audioTrack = $i || 0, I(e)) { var r = ke.playerEpisode, o = e.seasonId || e.id; if (r && r.id) a.contentId = r.id, a.seriesContentId = o; else { if (!e.episodes || !e.episodes.length) return t(""); ke.playerEpisode = e.episodes[0], a.contentId = e.episodes[0].id, a.seriesContentId = o } } D(a.forceRelay ? "resolveSmooth" : "resolve", a, function (a, n) {
        if (i === Za) {
          if (a || !n || !1 === n.returnValue) {
            if (!e._retryCount) e._retryCount = 0;
            if (e._retryCount < 2) {
              e._retryCount++;
              cn("Reconectando sesión…");
              return setTimeout(function () { if (i === Za) a(); }, 700);
            }
            e._retryCount = 0;
            var userMsg = (a && String(a).length < 60 && !/[\u4e00-\u9fa5]|aaa/i.test(String(a))) ? String(a) : "Error de servidor. Reintentando reproducción…";
            return ke.streamError = userMsg, cn(ke.streamError), t("");
          } e.streamMime = n.mime || "", e.streamCodec = n.codec || "", n.duration > 0 ? (e.duration = n.duration, ke.playerEpisode && (ke.playerEpisode.duration = n.duration)) : e.duration = e.duration || 0, e.subtitles = n.subtitles || [], e.streamAudioInfo = n.audio || "", e.isHls = !!n.isHls; try { window.__xuperStreamInfo = { selectedTrack: n.selectedTrack || {}, availableTracks: n.availableTracks || [] } } catch (e) { } t(n.proxyPath || n.url || "")
        }
      })
    } if (I(e) && !ke.playerEpisode && (!e.episodes || !e.episodes.length) && !e._detailsLoaded) return cn("Cargando capítulos…"), void H(e, function () { i === Za && a() }); a()
  } function fn(e, t, customStartTime) { if (pe) { t && (ke.playerEpisode = t, ke.playerSeasonIndex = ke.detailSeason || 0), e && (ke.playerItem = e); var i = e || ke.playerItem; if (i && ua(i), dn(), i) { if (!Xi) { $i = 0; } ga(i); var startTime = 0; if (typeof customStartTime === "number" && isFinite(customStartTime) && customStartTime > 0) { startTime = customStartTime; } else { var prog = getVodProgress(i.id); if (prog && prog.progress > 10) { if (I(i)) { var epMatch = t && ((prog.episodeId && t.id === prog.episodeId) || (prog.episodeNumber && t.number === prog.episodeNumber)); if (epMatch) startTime = prog.progress; } else { startTime = prog.progress; } } } var isPortal = !0 === i._portal || !0 === i.portal || ("portal" === h.mode && String(i.id || "").length > 15); if (isPortal) { i._portal = !0; var a = t && (t.number || t.seriesNumber) || ""; var loadMsg = a ? "Cargando capítulo " + a + "…" : "Cargando…"; if (startTime > 10) { var mins = Math.floor(startTime / 60), secs = Math.floor(startTime % 60), tStr = (mins > 0 ? (mins + "m ") : "") + secs + "s"; loadMsg += " (Reanudando en " + tStr + ")"; } return cn(loadMsg), void un(i, function (e) { e ? pn(e, startTime) : ke.streamError || cn("Sin fuente de reproducción") }) } i.streamUrl && pn(i.streamUrl, startTime) } } } function vn(e, t) { if ("vod" === ke.playerMode && pe && pe.currentTime > 5 && ke.playerItem) { saveVodProgress(ke.playerItem, ke.playerEpisode, pe.currentTime); } se || Xa(), ke.playerMode = "vod"; var c = t || (e && e.episodes && e.episodes[0]) || ke.playerEpisode || null, p = ke.playerItem && e && (String(ke.playerItem.id) === String(e.id)) && (!c || !ke.playerEpisode || (c.id ? String(c.id) === String(ke.playerEpisode.id) : c.number === ke.playerEpisode.number)), u = p && pe && (pe.currentSrc || pe.src) && !pe.ended; p || va(), e && (ke.playerItem = e), t && (ke.playerEpisode = t), e && ua(e), ke.playerReturn = { screen: "detail", focus: ke.focus }; var i = r("screen-player"), a = r("screen-detail"); i && (i.classList.remove("is-mini"), i.classList.add("is-active")), a && a.classList.remove("is-active"), ke.screen = "player", se.classList.add("is-vod"), bn(), Fe(se), fi(), u ? pe.paused && function () { try { var e = pe.play(); e && e.catch && e.catch(function () { }) } catch (e) { } }() : fn(ke.playerItem, ke.playerEpisode) } function hn(e, t, i) { "vod" !== e || "detail" !== ke.screen ? (se || Xa(), "live" === e && ht(), ke.playerMode = e, t && ke.playerItem !== t && va(), ke.playerItem = t || null, ke.playerEpisode = i || null, "vod" === e && t && ua(t), ke.playerReturn = { screen: ke.screen, focus: ke.focus }, ke.channelsOpen = !1, de.classList.remove("is-active"), ce.classList.remove("is-active"), se.classList.toggle("is-vod", "vod" === e), bn(), ze("player"), Fe(se), bn(), "vod" === e ? (fi(), fn(ke.playerItem, ke.playerEpisode)) : (pi(), yn(z[ke.channel]))) : vn(t, i) } var mn = 0, gn = null; function yn(e, t) {
    if (gn && (clearTimeout(gn), gn = null), e || (e = z[ke.channel]), e && (e.channelCode || e.streamUrl)) {
      var doResolve = function () {
        var t = ++mn; cn("Cargando señal " + (e.name || "") + "…"), D("resolveLive", e.streamUrl ? { streamUrl: e.streamUrl } : { channelCode: e.channelCode }, function (rErr, rRes) {
          if (t === mn) {
            if (rErr || !rRes || !1 === rRes.returnValue) {
              if (!z._liveRetries) z._liveRetries = {};
              var chKey = (e && e.channelCode) || ke.channel;
              if (!z._liveRetries[chKey]) z._liveRetries[chKey] = 0;
              if (z._liveRetries[chKey] < 2) {
                z._liveRetries[chKey]++;
                cn("Reconectando señal…");
                return setTimeout(function () { if (t === mn) doResolve(); }, 800);
              }
              z._liveRetries[chKey] = 0;
              var userMsg = (rErr && String(rErr).length < 60 && !/[\u4e00-\u9fa5]|aaa/i.test(String(rErr))) ? String(rErr) : "Señal no disponible por el momento";
              return ke.streamError = userMsg, void cn(ke.streamError);
            } var a = rRes.proxyPath || rRes.url; if (!a) return ke.streamError = "Señal no disponible", void cn(ke.streamError); cn(""), pi(), pn(a)
          }
        })
      }; t ? doResolve() : gn = setTimeout(doResolve, 180)
    }
  }
  var _piButtons = [];
  var _piFocusIndex = 0;
  var _lastWatchedLiveChannel = -1;

  function _updatePiScaleLabel() {
    var lbl = de ? de.querySelector(".pi-scale-lbl") : null;
    if (!lbl) return;
    if (ea === "16-9") lbl.textContent = "16:9";
    else if (ea === "4-3") lbl.textContent = "4:3";
    else lbl.textContent = "Normal";
  }

  function _updatePiFavIcon() {
    var btn = de ? de.querySelector("#pi-act-fav") : null;
    if (!btn) return;
    var ch = z[ke.channel];
    var isFav = ch && isChannelFav(ch);
    btn.classList.toggle("is-fav", !!isFav);
    var icon = btn.querySelector(".pi-heart-icon");
    if (icon) {
      icon.style.fill = isFav ? "#ff1744" : "currentColor";
    }
  }

  function _piActPrev() {
    if (_lastWatchedLiveChannel >= 0 && _lastWatchedLiveChannel !== ke.channel && z[_lastWatchedLiveChannel]) {
      St(_lastWatchedLiveChannel);
    } else if (ke.channel > 0) {
      St(ke.channel - 1);
    } else if (z.length) {
      St(z.length - 1);
    }
  }

  function _piActScale() {
    if (ea === "contain" || ea === "cover") {
      Fa("16-9");
    } else if (ea === "16-9") {
      Fa("4-3");
    } else {
      Fa("contain");
    }
    _updatePiScaleLabel();
  }

  function _piActFav() {
    var ch = z[ke.channel];
    if (!ch) return;
    toggleChannelFav(ch);
  }

  function _piActLock() {
    var ch = z[ke.channel];
    if (!ch) return;
    ch.locked = !ch.locked;
    var btn = de ? de.querySelector("#pi-act-lock") : null;
    if (btn) btn.classList.toggle("is-locked", !!ch.locked);
    cn(ch.locked ? "Canal bloqueado" : "Canal desbloqueado");
    setTimeout(function () { cn(""); }, 2000);
  }

  function _piActAudio() {
    Ba();
  }

  function _piFocusBtn(idx) {
    if (!_piButtons || !_piButtons.length) {
      _piButtons = de ? Array.from(de.querySelectorAll(".pi-circle-btn")) : [];
    }
    if (!_piButtons.length) return;
    if (idx < 0) idx = 0;
    if (idx >= _piButtons.length) idx = _piButtons.length - 1;
    _piFocusIndex = idx;
    for (var i = 0; i < _piButtons.length; i++) {
      _piButtons[i].classList.toggle("is-focused", i === idx);
    }
    Fe(_piButtons[idx], !0);
  }

  function _piMoveBtn(delta) {
    if (!_piButtons || !_piButtons.length) {
      _piButtons = de ? Array.from(de.querySelectorAll(".pi-circle-btn")) : [];
    }
    if (!_piButtons.length) return;
    var next = _piFocusIndex + delta;
    if (next < 0) next = _piButtons.length - 1;
    if (next >= _piButtons.length) next = 0;
    _piFocusBtn(next);
  }

  function _piActivateCurrentBtn() {
    if (!_piButtons || !_piButtons.length) {
      _piButtons = de ? Array.from(de.querySelectorAll(".pi-circle-btn")) : [];
    }
    if (_piButtons[_piFocusIndex] && _piButtons[_piFocusIndex]._activate) {
      _piButtons[_piFocusIndex]._activate();
    }
  }

  function _initLiveInfoBar() {
    if (!de) de = r("player-infobar");
    if (!de) return;
    de.onclick = function (e) {
      e.stopPropagation();
      ci();
    };
    var logoEl = de.querySelector(".pi-logo");
    if (logoEl) {
      logoEl.style.cursor = "pointer";
      logoEl.onclick = function (e) {
        e.stopPropagation();
        ui();
        wn();
      };
    }
    var chBox = de.querySelector(".pi-channel-box");
    if (chBox) {
      chBox.style.cursor = "pointer";
      chBox.onclick = function (e) {
        e.stopPropagation();
        ui();
        wn();
      };
    }
    var btns = de.querySelectorAll(".pi-circle-btn");
    _piButtons = Array.from(btns);
    _piButtons.forEach(function (btn, idx) {
      btn._activate = function () {
        var act = btn.getAttribute("data-act");
        if ("prev" === act) _piActPrev();
        else if ("scale" === act) _piActScale();
        else if ("fav" === act) _piActFav();
        else if ("lock" === act) _piActLock();
        else if ("audio" === act) _piActAudio();
      };
      btn.onclick = function (e) {
        e.stopPropagation();
        _piFocusBtn(idx);
        btn._activate();
        ci();
      };
      btn.onmouseenter = function () {
        _piFocusBtn(idx);
        ci();
      };
    });
  }

  function bn() {
    if (!de) de = r("player-infobar");
    if (!de) return;
    var e = "live" === ke.playerMode,
      t = z[ke.channel] || {},
      i = de.querySelector(".pi-index"),
      a = de.querySelector(".pi-name"),
      n = de.querySelector(".pi-date"),
      r = de.querySelector(".pi-range"),
      o = de.querySelector(".pi-now"),
      l = de.querySelector(".pi-next"),
      s = de.querySelector(".pi-uhd"),
      c = de.querySelector(".pi-logo");
    if (e) {
      ve && ve.classList.remove("is-active");
      de.style.display = "";
      i && (i.style.display = "inline-block", i.textContent = (t.index || ke.channel + 1));
      a && (a.style.display = "inline-block", a.textContent = t.name || "");
      var _now = new Date(), _y = _now.getFullYear(), _m = ("0" + (_now.getMonth() + 1)).slice(-2), _d = ("0" + _now.getDate()).slice(-2);
      n && (n.textContent = _y + "-" + _m + "-" + _d);
      r && (r.textContent = t.time || "00:00-23:59");
      o && (o.textContent = t.now || "En vivo");
      var nextLbl = de.querySelector(".pi-next-lbl");
      if (nextLbl) nextLbl.style.display = t.next ? "inline-block" : "none";
      if (l) {
        l.style.display = t.next ? "inline-block" : "none";
        l.textContent = t.next || "";
      }
      s && (s.style.display = t.uhd ? "block" : "none");
      if (c) {
        c.style.display = "block";
        if (t.logo) {
          c.style.backgroundImage = "url(" + t.logo + ")";
          c.style.backgroundSize = "contain";
          c.style.backgroundRepeat = "no-repeat";
          c.style.backgroundPosition = "center";
        } else {
          c.style.backgroundImage = "";
        }
      }
      _updatePiFavIcon();
      _updatePiScaleLabel();
    } else {
      de && (de.classList.remove("is-active"), de.style.display = "none");
      var p = ke.playerItem || u[0];
      if (me) {
        if (I(p) && ke.playerEpisode) {
          var f = ke.playerEpisode.title || ke.playerEpisode.name,
            v = ke.playerEpisode.number || ke.playerEpisode.seriesNumber,
            h = f || (v ? "Capítulo " + v : "");
          me.textContent = h ? p.title + " - " + h : p.title;
        } else {
          me.textContent = p.title;
        }
      }
      he && (he.src = p.poster || p.cover || "assets/original/common/bg_placehoder_vertical.png");
      oi(pe ? pe.currentTime : 0, pe ? pe.duration : 0);
    }
    for (var m = 0; m < De.length; m++) {
      De[m].classList.toggle("is-current", De[m]._channel === ke.channel);
    }
    Cn();
  }
  function Cn() { _updatePiScaleLabel(); _updatePiFavIcon(); } function wn() {
    if ("live" === ke.playerMode) {
      ke.channelsOpen = !0;
      ce.classList.add("is-active");
      Qa();
      Ja();
      var e = De[ke.channel] || (De.length && De[0]);
      if (e) {
        Fe(e);
        var t = e.parentNode;
        if (t) {
          var i = 66 * ke.channel;
          t.scrollTop = Math.max(0, i - 180);
        }
      }
    }
  } function Sn() { if (ke.liveSearchOpen) _closeLiveSearch(); ke.channelsOpen = !1, ce.classList.remove("is-active"), "player" === ke.screen && Fe(se) } function xn() { var e, t; (document.addEventListener("keydown", $e, !1), document.addEventListener("keyup", function (e) { var t = e.keyCode || e.which; if (461 === t || "Back" === e.key || "GoBack" === e.key) { e.preventDefault && e.preventDefault(); return; } }, !1), window.addEventListener("popstate", function () { je() }, !1), document.addEventListener("click", function (e) { if ("welcome" === ke.screen) { Xe(); return; } if (Ut && !s(e.target, ".season-popup") && !s(e.target, ".detail-season")) { Ft(); return; } var t = s(e.target, ".focusable"); t && (Fe(t, !0), t._activate && t._activate()) }), loadLiveFavs(), Bt(), e = null, Pe = setTimeout(function () { Xe(); }, 2100), setTimeout(function () { Ie || Ke(); }, 100), F(), bt(76197), _loadMasterCatalog(), function () { if (A()) { var e = h.serviceId || "com.webosflux.xuptertv.fidelity.service"; try { window.webOS.service.request("luna://" + e, { method: "keepAlive", parameters: { subscribe: !0 }, resubscribe: !0, onSuccess: function () { }, onFailure: function () { } }) } catch (e) { } setInterval(function () { try { window.webOS.service.request("luna://" + e, { method: "heartbeat", parameters: {}, onSuccess: function () { }, onFailure: function () { } }) } catch (e) { } }, 15e3) } }(), window.__xuper = { version: "4.34.4", state: ke, vod: u, channels: z, api: g, portal: y, service: D, refreshPortal: N, reloadVod: F, skipWelcome: Xe, show: function (e) { "home" === e ? Xe() : "detail" === e ? At(u[0]) : "search" === e ? zt() : "settings" === e ? Jt() : "player" === e ? hn("live") : ze(e) }, selectTab: function (e) { Xe(), Ze(e, !0) }, openDetail: function (e) { At(u[e] || u[0]) }, openSearch: zt, openSettings: Jt, openPlayer: function (e, t) { hn(e || "live", u[t] || null) }, focus: function (e) { var t = "string" == typeof e ? document.querySelector(e) : e; t && Fe(t) }, key: function (e) { $e({ keyCode: e, preventDefault: function () { } }) }, search: function (e) { zt(), jt(e) }, settingsPanel: function (e) { Jt(), Kt(e, !0) } }, function () { var e = String(location.search || "").replace(/^\?/, ""); if (!e) return; for (var t = {}, i = e.split("&"), a = 0; a < i.length; a++)if (i[a]) { var n = i[a].split("="); t[decodeURIComponent(n[0])] = decodeURIComponent(n.slice(1).join("=") || "") } if (void 0 !== t.ch) { var r = parseInt(t.ch, 10) || 0; ke.channel = Math.max(0, Math.min(z.length - 1, r)) } var o = t.screen || "home"; if ("welcome" === o) return; Xe(), void 0 !== t.tab ? Ze(parseInt(t.tab, 10) || 0, !0) : (Ze(0, !1), Fe(X)); "detail" === o ? At(u[parseInt(t.vod, 10) || 0]) : "search" === o ? (zt(), t.q && jt(t.q)) : "settings" === o ? (Jt(), void 0 !== t.panel && Kt(parseInt(t.panel, 10) || 0, !0)) : "player" === o && (hn("vod" === t.mode ? "vod" : "live", u[parseInt(t.vod, 10) || 0]), "1" === t.channels && wn()); if (t.focus) { var l = document.querySelector(t.focus); l && Fe(l) } }()) }   function _n() {
    try { saveProfiles(); } catch (e) { }
    try { ht(); } catch (e) { }
    try { dn(); } catch (e) { }
    try { Wt(); } catch (e) { }
  }

  document.addEventListener("webOSRelaunch", function () {
    _exitApp();
  }, !1);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      _exitApp();
    }
  }, !1);

  window.addEventListener("pagehide", function () {
    _exitApp();
  }, !1);

  window.addEventListener("beforeunload", _n);
  window.addEventListener("unload", _n);
  "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", xn) : xn();
}();
