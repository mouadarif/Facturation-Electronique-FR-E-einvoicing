import fs from "node:fs";
import path from "node:path";

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
  "connect-src 'self' ws: wss:"
].join("; ");

const deniedPathPattern = /^\/(?:package(?:-lock)?\.json|AGENTS\.md|README\.md|\.env(?:\..*)?|vite\.config\.js)$/i;
const companySettingsDir = path.resolve(".company-local");
const companySettingsFile = path.join(companySettingsDir, "case-settings.json");
const allowedCaseTones = new Set(["category", "neutral", "indigo", "teal", "green", "amber", "rose", "blue"]);
const allowedApplicability = new Set(["not-applicable", "applicable", "review"]);

function securityMiddleware(req, res, next) {
  const pathname = decodeURIComponent((req.url || "").split("?")[0]);
  if (deniedPathPattern.test(pathname) || pathname.includes("/../") || pathname.startsWith("/.")) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  res.setHeader("Content-Security-Policy", csp);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
}

function companyCaseSettingsMiddleware(req, res, next) {
  const pathname = decodeURIComponent((req.url || "").split("?")[0]);
  if (pathname !== "/api/company-case-settings") {
    next();
    return;
  }

  res.setHeader("Content-Security-Policy", csp);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");

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

export default {
  server: {
    host: "127.0.0.1",
    headers: {
      "Content-Security-Policy": csp,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    }
  },
  preview: {
    host: "127.0.0.1",
    headers: {
      "Content-Security-Policy": csp,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    }
  },
  plugins: [
    {
      name: "facture-pack-security",
      configureServer(server) {
        server.middlewares.use(companyCaseSettingsMiddleware);
        server.middlewares.use(securityMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use(companyCaseSettingsMiddleware);
        server.middlewares.use(securityMiddleware);
      }
    }
  ]
};
