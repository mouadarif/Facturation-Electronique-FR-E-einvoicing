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
  "connect-src 'self' ws: wss:"
].join("; ");

const deniedPathPattern = /^\/(?:package(?:-lock)?\.json|AGENTS\.md|README\.md|\.env(?:\..*)?|vite\.config\.js)$/i;

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
        server.middlewares.use(securityMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use(securityMiddleware);
      }
    }
  ]
};
