"use strict";

const http = require("http");
const https = require("https");
const crypto = require("crypto");
const urlmod = require("url");
const tsIndexer = require("./ts-indexer");

const MAX_TOKENS = 16;
const tokens = {};
const order = [];

const subtitleTokens = {};
const subtitleOrder = [];
const MAX_SUBTITLES = 12;

let server = null;
let port = 0;

const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 8, keepAliveMsecs: 20000 });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 8, keepAliveMsecs: 20000, rejectUnauthorized: false });

let activeToken = null;
const activeUpstreams = [];

const TS_PACKET_BYTES = 188;
const HLS_SEGMENT_SECONDS = 10;

// ==========================================
// Live HLS Sequence Stabilizer
// Eliminates stalls and sequence jumps caused
// by multi-origin Cloudflare load balancing
// ==========================================
const liveStreams = {}; // token -> state

function stabilizeLiveManifest(streamToken, rawManifest) {
  const cleaned = rawManifest.replace(/^#EXT-SEGMENT[^\r\n]*[\r\n]+/gm, "");
  const seqMatch = cleaned.match(/#EXT-X-MEDIA-SEQUENCE:(\d+)/);
  const rawSeq = seqMatch ? parseInt(seqMatch[1], 10) : 0;

  // Extract segment URLs
  const lines = cleaned.split(/\r?\n/);
  const segments = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith("#")) {
      segments.push(line);
    }
  }

  if (!segments.length) {
    return cleaned;
  }

  let state = liveStreams[streamToken];
  if (!state) {
    state = {
      baseSeq: rawSeq > 0 ? rawSeq : 1,
      segments: segments,
      lastManifest: cleaned
    };
    liveStreams[streamToken] = state;
    return cleaned;
  }

  const prevSegs = state.segments;
  const firstNew = segments[0];
  const prevIdx = prevSegs.indexOf(firstNew);

  let virtualSeq = state.baseSeq;

  if (prevIdx >= 0) {
    // Normal progression: segments rolled off by prevIdx
    virtualSeq = state.baseSeq + prevIdx;
  } else {
    // Check if new playlist is lagging behind (previous first segment appears later in new segments)
    const firstPrev = prevSegs[0];
    const newIdx = segments.indexOf(firstPrev);
    if (newIdx > 0) {
      // Incoming is older than what we already served
      const lastNew = segments[segments.length - 1];
      if (prevSegs.indexOf(lastNew) >= 0) {
        // No newer segments in this lagging manifest, serve cached manifest
        return state.lastManifest;
      }
      virtualSeq = state.baseSeq;
    } else {
      // Discontinuity / gap: calculate delta from timestamp in segment filename if available
      const prevMatch = (prevSegs[prevSegs.length - 1] || "").match(/_(\d{8,12})\.ts/);
      const newMatch = (segments[0] || "").match(/_(\d{8,12})\.ts/);
      if (prevMatch && newMatch) {
        const prevTime = parseInt(prevMatch[1], 10);
        const newTime = parseInt(newMatch[1], 10);
        const diffMs = newTime - prevTime;
        const targetDurMatch = cleaned.match(/#EXT-X-TARGETDURATION:(\d+)/);
        const targetDurSec = targetDurMatch ? parseInt(targetDurMatch[1], 10) : 5;
        const skipped = Math.max(1, Math.round(diffMs / (targetDurSec * 1000)));
        virtualSeq = state.baseSeq + prevSegs.length + skipped - 1;
      } else {
        virtualSeq = state.baseSeq + Math.max(1, prevSegs.length);
      }
    }
  }

  // Guarantee monotonic sequence (never drops)
  if (virtualSeq < state.baseSeq) {
    virtualSeq = state.baseSeq;
  }

  state.baseSeq = virtualSeq;
  state.segments = segments;

  const stabilized = cleaned.replace(/#EXT-X-MEDIA-SEQUENCE:\d+/, "#EXT-X-MEDIA-SEQUENCE:" + virtualSeq);
  state.lastManifest = stabilized;
  return stabilized;
}

function resetLiveStabilizer(token) {
  if (token) {
    delete liveStreams[token];
  } else {
    for (const k in liveStreams) {
      delete liveStreams[k];
    }
  }
}

function destroyConnection(c) {
  if (!c) return;
  if (c.up) {
    try { c.up.unpipe(); } catch (e) { }
    try { if (typeof c.up.destroy === "function") c.up.destroy(); } catch (e) { }
    try { if (c.up.socket) c.up.socket.destroy(); } catch (e) { }
    c.up = null;
  }
  try { if (c.upstream) c.upstream.abort(); } catch (e) { }
  try { if (c.upstream && c.upstream.socket) c.upstream.socket.destroy(); } catch (e) { }
  c.upstream = null;
  c.res = null;
  c.req = null;
}

function killActiveStreams() {
  while (activeUpstreams.length > 0) {
    destroyConnection(activeUpstreams.shift());
  }
  resetLiveStabilizer();
}

function remember(key, value) {
  tokens[key] = value;
  order.push(key);
  while (order.length > MAX_TOKENS) {
    const expired = order.shift();
    if (expired) {
      delete tokens[expired];
      resetLiveStabilizer(expired);
    }
  }
}

function add(url, headers, duration) {
  const token = crypto.randomBytes(12).toString("hex");
  remember(token, {
    url: url,
    headers: headers || {},
    duration: Number(duration) || 0,
    contentLength: 0,
    lengthWaiters: null,
    at: Date.now()
  });
  return token;
}

function addSubtitle(url) {
  const token = crypto.randomBytes(12).toString("hex");
  subtitleTokens[token] = { url: url, at: Date.now() };
  subtitleOrder.push(token);
  while (subtitleOrder.length > MAX_SUBTITLES) {
    const expired = subtitleOrder.shift();
    if (expired) delete subtitleTokens[expired];
  }
  return baseUrl() + "/sub/" + token + ".srt";
}

function sendSubtitle(req, res, subData) {
  const parsed = urlmod.parse(subData.url || "");
  const isHttps = parsed.protocol === "https:";
  const opts = {
    hostname: parsed.hostname,
    servername: parsed.hostname,
    rejectUnauthorized: false,
    port: parsed.port || (isHttps ? 443 : 80),
    path: parsed.path,
    method: "GET",
    headers: { "User-Agent": "Ranger/4.9.4-17294ac0", Accept: "*/*" },
    agent: isHttps ? httpsAgent : httpAgent
  };
  let handled = false;
  const subReq = (isHttps ? https : http).request(opts, (subRes) => {
    const chunks = [];
    subRes.on("data", (c) => chunks.push(c));
    subRes.on("end", () => {
      if (!handled) {
        handled = true;
        const buf = Buffer.concat(chunks);
        const ok = subRes.statusCode >= 200 && subRes.statusCode < 300;
        res.writeHead(ok ? 200 : 502, {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Length": buf.length,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "private, max-age=300"
        });
        res.end(buf);
      }
    });
  });
  subReq.setTimeout(20000, () => {
    try { subReq.abort(); } catch (e) { }
  });
  subReq.on("error", () => {
    if (!handled) {
      handled = true;
      try {
        res.writeHead(502, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
        res.end("subtitle upstream error");
      } catch (e) { }
    }
  });
  subReq.end();
}

function mediaRequest(tokenData, method, extraHeaders) {
  const parsed = urlmod.parse(tokenData.url);
  const isHttps = parsed.protocol === "https:";
  const headers = {};
  for (const k in tokenData.headers) {
    if (Object.prototype.hasOwnProperty.call(tokenData.headers, k)) {
      headers[k] = tokenData.headers[k];
    }
  }
  for (const k in (extraHeaders || {})) {
    if (Object.prototype.hasOwnProperty.call(extraHeaders, k)) {
      headers[k] = extraHeaders[k];
    }
  }
  return {
    secure: isHttps,
    options: {
      hostname: parsed.hostname,
      servername: parsed.hostname,
      rejectUnauthorized: false,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.path,
      method: method,
      headers: headers,
      agent: isHttps ? httpsAgent : httpAgent
    }
  };
}

function sourceLength(tokenData, cb) {
  if (tokenData.contentLength > 0) return cb(null, tokenData.contentLength);
  if (tokenData.lengthWaiters) {
    tokenData.lengthWaiters.push(cb);
  } else {
    tokenData.lengthWaiters = [cb];
    const mReq = mediaRequest(tokenData, "GET", { Range: "bytes=0-0" });
    const req = (mReq.secure ? https : http).request(mReq.options, (res) => {
      const match = /\/(\d+)$/.exec(String(res.headers["content-range"] || ""));
      const len = match ? parseInt(match[1], 10) : parseInt(res.headers["content-length"], 10);
      res.resume();
      const waiters = tokenData.lengthWaiters || [];
      tokenData.lengthWaiters = null;
      if (len > 0) tokenData.contentLength = len;
      for (let i = 0; i < waiters.length; i++) {
        waiters[i](len > 0 ? null : new Error("el CDN no informó el tamaño"), len);
      }
    });
    req.setTimeout(15000, () => {
      try { req.abort(); } catch (e) { }
    });
    req.on("error", (err) => {
      const waiters = tokenData.lengthWaiters || [];
      tokenData.lengthWaiters = null;
      for (let i = 0; i < waiters.length; i++) waiters[i](err);
    });
    req.end();
  }
}

function readRange(tokenData, start, end, cb) {
  const mReq = mediaRequest(tokenData, "GET", { Range: "bytes=" + start + "-" + end });
  const req = (mReq.secure ? https : http).request(mReq.options, (res) => {
    const chunks = [];
    res.on("data", (c) => chunks.push(c));
    res.on("end", () => {
      cb(res.statusCode >= 200 && res.statusCode < 300 ? null : new Error("rango rechazado"), Buffer.concat(chunks));
    });
  });
  req.setTimeout(25000, () => {
    try { req.abort(); } catch (e) { }
  });
  req.on("error", (err) => cb(err));
  req.end();
}

function sendVirtualHls(req, res, subpath, tokenData) {
  sourceLength(tokenData, (err, sLen) => {
    if (err) {
      res.writeHead(502, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
      return res.end("no se pudo crear el manifiesto HLS");
    }
    const dur = Number(tokenData.duration) || 0;
    if (dur > 0 && sLen > 0) {
      const segDur = HLS_SEGMENT_SECONDS || 10;
      const numSegs = Math.ceil(dur / segDur);
      const bps = sLen / dur;
      let segBytes = Math.floor((segDur * bps) / TS_PACKET_BYTES) * TS_PACKET_BYTES;
      if (segBytes < TS_PACKET_BYTES) segBytes = TS_PACKET_BYTES;

      const lines = [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "#EXT-X-TARGETDURATION:" + segDur,
        "#EXT-X-MEDIA-SEQUENCE:0"
      ];
      let curByte = 0;
      for (let c = 0; c < numSegs; c++) {
        let d = (c === numSegs - 1) ? dur - (c * segDur) : segDur;
        if (d <= 0) d = segDur;
        let nextByte = (c === numSegs - 1) ? sLen : Math.min(sLen, curByte + segBytes);
        if (c !== numSegs - 1) nextByte = Math.floor(nextByte / TS_PACKET_BYTES) * TS_PACKET_BYTES;
        const len = nextByte - curByte;
        if (len <= 0) break;
        lines.push("#EXTINF:" + d.toFixed(3) + ",");
        lines.push("#EXT-X-BYTERANGE:" + len + "@" + curByte);
        lines.push("stream.ts");
        curByte = nextByte;
        if (curByte >= sLen) break;
      }
      lines.push("#EXT-X-ENDLIST");
      const out = lines.join("\n") + "\n";
      res.writeHead(200, {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Content-Length": Buffer.byteLength(out),
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "private, max-age=3600"
      });
      return res.end(out);
    }

    if (!tokenData.indexer) {
      tokenData.indexer = tsIndexer.create(sLen, (start, end, cb) => {
        readRange(tokenData, start, end, cb);
      });
      tokenData.indexer.start();
    }
    const idx = tokenData.indexer;
    if (idx.segments.length >= 3 || idx.complete) {
      const lines = ["#EXTM3U", "#EXT-X-VERSION:4"];
      if (idx.complete) lines.push("#EXT-X-PLAYLIST-TYPE:VOD");
      lines.push("#EXT-X-TARGETDURATION:" + HLS_SEGMENT_SECONDS, "#EXT-X-MEDIA-SEQUENCE:0");
      for (let c = 0; c < idx.segments.length; c++) {
        const seg = idx.segments[c];
        lines.push("#EXTINF:" + seg.duration.toFixed(3) + ",");
        lines.push("#EXT-X-BYTERANGE:" + (seg.end - seg.start + 1) + "@" + seg.start);
        lines.push("stream.ts");
      }
      if (idx.complete) lines.push("#EXT-X-ENDLIST");
      const out = lines.join("\n") + "\n";
      res.writeHead(200, {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Content-Length": Buffer.byteLength(out),
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      });
      res.end(out);
    } else {
      idx.when(() => sendVirtualHls(req, res, subpath, tokenData));
    }
  });
}

function forward(clientReq, clientRes, tokenData, streamToken) {
  if (activeToken !== streamToken) {
    killActiveStreams();
    activeToken = streamToken;
  }

  const rangeHeaders = {};
  if (clientReq.headers.range) rangeHeaders.Range = clientReq.headers.range;
  if (clientReq.headers["if-range"]) rangeHeaders["If-Range"] = clientReq.headers["if-range"];

  const mReq = mediaRequest(tokenData, clientReq.method === "HEAD" ? "HEAD" : "GET", rangeHeaders);
  const isSecure = mReq.secure;
  const reqOptions = mReq.options;

  if (clientRes.socket) {
    try { clientRes.socket.setNoDelay(true); } catch (e) { }
  }

  const connEntry = { upstream: null, res: clientRes, req: clientReq, up: null };
  activeUpstreams.push(connEntry);

  function cleanupConn(destroy) {
    const idx = activeUpstreams.indexOf(connEntry);
    if (idx !== -1) activeUpstreams.splice(idx, 1);
    if (destroy) {
      destroyConnection(connEntry);
    } else {
      connEntry.res = null;
      connEntry.req = null;
      connEntry.up = null;
      connEntry.upstream = null;
    }
  }

  clientReq.on("close", () => {
    if (!clientRes.writableEnded) cleanupConn(true);
  });
  clientReq.on("aborted", () => cleanupConn(true));
  clientRes.on("close", () => {
    if (!clientRes.writableEnded) cleanupConn(true);
  });
  clientRes.on("finish", () => {
    // Clean finish: do not destroy socket so keepAlive connection can be reused
    cleanupConn(false);
  });
  clientRes.on("error", () => cleanupConn(true));

  const upReq = (isSecure ? https : http).request(reqOptions, (upRes) => {
    connEntry.up = upRes;
    if (upRes.socket) {
      try { upRes.socket.setNoDelay(true); } catch (e) { }
    }
    try { upReq.setTimeout(0); } catch (e) { }
    try { if (upReq.socket) upReq.socket.setTimeout(0); } catch (e) { }

    const cType = (upRes.headers["content-type"] || "").toLowerCase();
    let streamMime = "video/mp2t";
    if (cType.indexOf("mp4") !== -1) {
      streamMime = "video/mp4";
    } else if (cType.indexOf("mpegurl") !== -1 || (tokenData.url && tokenData.url.indexOf(".m3u8") !== -1)) {
      streamMime = "application/vnd.apple.mpegurl";
    }

    const isM3u8 = streamMime === "application/vnd.apple.mpegurl";
    const resHeaders = {
      "Content-Type": streamMime,
      "Accept-Ranges": upRes.headers["accept-ranges"] || "bytes",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": isM3u8 ? "no-cache, no-store, must-revalidate" : "private, max-age=120",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    };

    if (isM3u8) {
      resHeaders["Pragma"] = "no-cache";
      resHeaders["Expires"] = "0";
    }

    if (upRes.headers["content-length"]) resHeaders["Content-Length"] = upRes.headers["content-length"];
    if (upRes.headers["content-range"]) resHeaders["Content-Range"] = upRes.headers["content-range"];

    if (clientReq.method === "HEAD") {
      clientRes.writeHead(upRes.statusCode || 200, resHeaders);
      clientRes.end();
      return upRes.resume();
    }

    if (isM3u8) {
      const chunks = [];
      upRes.on("data", (d) => chunks.push(d));
      upRes.on("end", () => {
        const raw = Buffer.concat(chunks).toString("utf8");
        const stabilized = stabilizeLiveManifest(streamToken, raw);
        const buf = Buffer.from(stabilized, "utf8");
        resHeaders["Content-Length"] = buf.length;
        clientRes.writeHead(upRes.statusCode || 200, resHeaders);
        clientRes.end(buf);
      });
      upRes.on("error", () => cleanupConn(true));
    } else {
      clientRes.writeHead(upRes.statusCode || 200, resHeaders);
      upRes.on("error", () => cleanupConn(true));
      upRes.pipe(clientRes);
    }
  });

  connEntry.upstream = upReq;
  if (upReq.socket) {
    try { upReq.socket.setNoDelay(true); } catch (e) { }
  }

  upReq.setTimeout(25000, () => {
    if (!clientRes.headersSent) {
      const cached = liveStreams[streamToken] && liveStreams[streamToken].lastManifest;
      if (cached) {
        const buf = Buffer.from(cached, "utf8");
        clientRes.writeHead(200, {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Content-Length": buf.length,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        });
        clientRes.end(buf);
      } else {
        try { upReq.abort(); } catch (e) { }
        try {
          clientRes.writeHead(504, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
          clientRes.end("gateway timeout");
        } catch (e) { }
      }
    }
    cleanupConn(true);
  });

  upReq.on("error", () => {
    if (!clientRes.headersSent) {
      const cached = liveStreams[streamToken] && liveStreams[streamToken].lastManifest;
      if (cached) {
        const buf = Buffer.from(cached, "utf8");
        clientRes.writeHead(200, {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Content-Length": buf.length,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        });
        clientRes.end(buf);
      } else {
        try {
          clientRes.writeHead(502, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
          clientRes.end("upstream error");
        } catch (e) { }
      }
    }
    cleanupConn(true);
  });

  upReq.end();
}

function handler(req, res) {
  try { req.setTimeout(0); } catch (e) { }
  try { res.setTimeout(0); } catch (e) { }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Range"
    });
    return res.end();
  }

  if (req.url === "/media/abort") {
    killActiveStreams();
    activeToken = null;
    res.writeHead(200, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
    return res.end("aborted");
  }

  const subMatch = /^\/sub\/([a-f0-9]{24})\.srt$/.exec(req.url || "");
  if (subMatch) {
    const sData = subtitleTokens[subMatch[1]];
    if (!sData) {
      res.writeHead(410, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
      return res.end("expired");
    }
    return sendSubtitle(req, res, sData);
  }

  const mediaMatch = /^\/media\/([a-f0-9]{24})(?:\/([^\?#]*))?(?:[?#].*)?$/.exec(req.url || "");
  if (!mediaMatch) {
    res.writeHead(404, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
    return res.end("not found");
  }

  const token = mediaMatch[1];
  const subpath = mediaMatch[2] || "";
  const tokenData = tokens[token];

  if (!tokenData) {
    res.writeHead(410, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
    return res.end("expired");
  }

  forward(req, res, tokenData, token);
}

function start(cb) {
  if (server && port) return cb(null, port);
  server = http.createServer(handler);
  server.timeout = 0;
  if (typeof server.setTimeout === "function") server.setTimeout(0);
  server.on("error", (err) => cb(err));
  server.listen(0, () => {
    port = server.address().port;
    cb(null, port);
  });
}

function baseUrl() {
  return port ? "http://127.0.0.1:" + port : "";
}

module.exports = {
  start: start,
  add: add,
  addSubtitle: addSubtitle,
  baseUrl: baseUrl,
  port: function () { return port; },
  killActiveStreams: killActiveStreams
};
