import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const csp = [
  "default-src 'self'",
  "script-src 'self' https://cdn.tailwindcss.com",
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

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Not found");
}
