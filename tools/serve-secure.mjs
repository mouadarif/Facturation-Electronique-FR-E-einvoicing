import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const csp = [
  "default-src 'self'",
  "script-src 'self' https://cdn.tailwindcss.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "connect-src 'self'"
].join("; ");
const allowedPrefixes = [
  "/assets/",
  "/docs_core/",
  "/docs_tech/",
  "/docs_tpe/",
  "/docs_platforms/",
  "/docs_international/",
  "/docs_specific/",
  "/wiki/",
  "/juridique/",
  "/metier/",
  "/technique/",
  "/notes/"
];
const rootFiles = new Set(["/", "/index.html", "/local-viewer.html", "/local-viewer.js"]);
const companySettingsDir = path.join(root, ".company-local");
const companySettingsFile = path.join(companySettingsDir, "case-settings.json");
const allowedCaseTones = new Set(["category", "neutral", "indigo", "teal", "green", "amber", "rose", "blue"]);
const allowedApplicability = new Set(["not-applicable", "applicable", "review"]);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  const pathname = safePathname(req.url || "/");
  setSecurityHeaders(res);

  if (!pathname || pathname.startsWith("/.") || pathname.includes("/../")) {
    return notFound(res);
  }

  if (pathname === "/api/company-case-settings") {
    return handleCompanyCaseSettings(req, res);
  }

  if (pathname === "/" || pathname === "/index.html") {
    return serveFile(res, path.join(root, "dist", "index.html"));
  }

  if (pathname === "/local-viewer.html" || pathname === "/local-viewer.js") {
    return serveFile(res, path.join(root, pathname.slice(1)));
  }

  if (!allowedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return notFound(res);
  }

  const base = pathname.startsWith("/assets/") ? path.join(root, "dist") : root;
  const target = path.resolve(base, `.${pathname}`);
  if (!target.startsWith(base)) return notFound(res);
  return serveFile(res, target);
});

server.listen(port, host, () => {
  console.log(`Secure preview listening on http://${host}:${port}`);
});

function safePathname(url) {
  try {
    return decodeURIComponent(new URL(url, "http://localhost").pathname).replaceAll("\\", "/");
  } catch {
    return "";
  }
}

function setSecurityHeaders(res) {
  res.setHeader("Content-Security-Policy", csp);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
}

function serveFile(res, target) {
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) return notFound(res);
  const ext = path.extname(target).toLowerCase();
  res.statusCode = 200;
  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
  fs.createReadStream(target).pipe(res);
}

function handleCompanyCaseSettings(req, res) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (!fs.existsSync(companySettingsFile)) {
      res.end(JSON.stringify({ version: 1, cases: {} }));
      return;
    }
    fs.createReadStream(companySettingsFile).pipe(res);
    return;
  }

  if (req.method !== "PUT") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, PUT");
    res.end("Method not allowed");
    return;
  }

  readRequestBody(req)
    .then((body) => {
      const payload = normalizeCompanySettings(JSON.parse(body || "{}"));
      fs.mkdirSync(companySettingsDir, { recursive: true });
      fs.writeFileSync(companySettingsFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(payload));
    })
    .catch(() => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Invalid company case settings");
    });
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 256_000) reject(new Error("Body too large"));
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function normalizeCompanySettings(payload = {}) {
  const cases = payload && typeof payload === "object" && payload.cases && typeof payload.cases === "object" ? payload.cases : {};
  const normalizedCases = {};

  for (const [rawId, entry] of Object.entries(cases)) {
    const caseId = Number(rawId);
    if (!Number.isInteger(caseId) || caseId <= 0 || !entry || typeof entry !== "object") continue;
    const normalized = {};
    if (allowedCaseTones.has(entry.tone)) normalized.tone = entry.tone;
    if (allowedApplicability.has(entry.applicability)) normalized.applicability = entry.applicability;
    if (typeof entry.note === "string") normalized.note = entry.note.slice(0, 4000);
    normalizedCases[String(caseId)] = normalized;
  }

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    cases: normalizedCases
  };
}

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Not found");
}
