import fs from "node:fs";
import path from "node:path";
import { sources } from "../src/data/sources.js";

const timeoutMs = 15000;
const root = process.cwd();
const scanRoots = ["wiki", "juridique", "src/data"];

function controllerWithTimeout() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeout };
}

function walk(dir) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(entryPath);
    if (entryPath.replaceAll("\\", "/") === "src/data/sourceReferenceIndex.js") return [];
    return entry.isFile() && /\.(md|js|json)$/i.test(entry.name) ? [entryPath] : [];
  });
}

function extractedLinks() {
  const urls = new Map();
  for (const source of sources) {
    urls.set(source.url, { label: source.label, url: source.url });
  }
  const urlPattern = /https:\/\/[^\s)"'<>]+/g;
  for (const file of scanRoots.flatMap(walk)) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    for (const match of text.matchAll(urlPattern)) {
      const url = match[0].replace(/[.,;:]+$/, "");
      if (!urls.has(url)) urls.set(url, { label: `${file}`, url });
    }
  }
  return [...urls.values()];
}

async function check(source) {
  for (const method of ["HEAD", "GET"]) {
    const { controller, timeout } = controllerWithTimeout();
    try {
      const response = await fetch(source.url, {
        method,
        signal: controller.signal,
        redirect: "follow",
        headers: {
          "user-agent": "facture-electronique-wiki-link-check/1.0"
        }
      });
      clearTimeout(timeout);
      if (response.ok || [401, 403, 405, 429].includes(response.status)) {
        return { source, ok: true, status: response.status, method };
      }
      if (method === "GET") {
        return { source, ok: false, status: response.status, method };
      }
    } catch (error) {
      clearTimeout(timeout);
      if (method === "GET") {
        return { source, ok: false, status: "ERR", error: error.message, method };
      }
    }
  }
}

const links = extractedLinks();
const results = await Promise.all(links.map(check));
const failed = results.filter((result) => !result.ok || [404, 410].includes(result.status) || String(result.status).startsWith("5"));

for (const result of results) {
  const marker = result.ok ? "OK " : "ERR";
  console.log(`${marker} ${String(result.status).padEnd(4)} ${result.source.label} - ${result.source.url}`);
}

if (failed.length) {
  console.error(`\n${failed.length} lien(s) non valides ou inaccessibles.`);
  process.exit(1);
}

console.log(`\n${results.length} liens testes avec succes.`);
