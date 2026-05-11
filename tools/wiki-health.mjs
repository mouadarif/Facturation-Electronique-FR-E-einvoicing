import fs from "node:fs";
import path from "node:path";
import { cases } from "../src/data/cases.js";
import { annexAReferences } from "../src/data/annexAReferences.js";
import { sourceReferenceIndex } from "../src/data/sourceReferenceIndex.js";

const root = process.cwd();
const errors = [];
const warnings = [];
const requiredFiles = [
  "AGENTS.md",
  "wiki/index.md",
  "wiki/log.md",
  "wiki/00_query_hub.md",
  "wiki/04_journal_evolutions_et_points_ouverts.md",
  "juridique/02_DEFINITIONS_NOTIONS_REFORME.md",
  "juridique/03_NOTIONS_PAR_CAS_REFORME.md",
  "notes/documentation_catalog.md",
  "notes/documentation_catalog.csv",
  "notes/document_page_index.md",
  "notes/document_page_index.csv"
];
const markdownRoots = ["wiki", "juridique", "metier", "technique", "notes"];
const sourceRoots = ["src", "tools", "wiki", "juridique", "metier", "technique"];

for (const file of requiredFiles) {
  if (!exists(file)) errors.push(`Missing required file: ${file}`);
}

checkMarkdownHealth();
checkPersistentWiki();
checkCatalog();
checkPageIndex();
checkRawSourceSeparation();
checkAppDataCoherence();
checkViewerHardening();
checkSensitiveFiles();

if (warnings.length) {
  console.warn("Wiki health warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Wiki health check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Wiki health check OK (${requiredFiles.length} required files, ${markdownRoots.flatMap(walkMarkdown).length} markdown files checked).`);

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir, predicate = () => true) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(entryPath, predicate);
    return entry.isFile() && predicate(entry.name, entryPath) ? [entryPath] : [];
  });
}

function walkMarkdown(dir) {
  return walk(dir, (name) => name.endsWith(".md"));
}

function checkMarkdownHealth() {
  const mojibakePattern = /Ã|â€|â€™|â€œ|â€|�|Â(?!©)/;
  for (const file of markdownRoots.flatMap(walkMarkdown)) {
    const absolute = path.join(root, file);
    const text = fs.readFileSync(absolute, "utf8");
    if (text.charCodeAt(0) === 0xfeff) errors.push(`UTF-8 BOM detected in ${file}`);
    if (mojibakePattern.test(text)) errors.push(`Possible mojibake in ${file}`);
    for (const link of localMarkdownLinks(text)) {
      const target = path.resolve(path.dirname(absolute), link);
      if (!target.startsWith(root)) {
        errors.push(`Link escapes repository in ${file}: ${link}`);
        continue;
      }
      if (!fs.existsSync(target)) errors.push(`Broken local markdown link in ${file}: ${link}`);
    }
  }
}

function localMarkdownLinks(text) {
  const links = [];
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(text))) {
    const raw = match[1].trim();
    if (!raw || raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("#")) continue;
    if (raw.startsWith("mailto:")) continue;
    const clean = raw.split("#")[0].split("?")[0].replace(/^<|>$/g, "");
    if (clean) links.push(clean);
  }
  return links;
}

function checkPersistentWiki() {
  const logText = exists("wiki/log.md") ? read("wiki/log.md") : "";
  if (!/^## \[\d{4}-\d{2}-\d{2}\] /m.test(logText)) {
    errors.push("wiki/log.md has no parseable maintenance entries");
  }
  const agents = exists("AGENTS.md") ? read("AGENTS.md").toLowerCase() : "";
  for (const term of ["ingest workflow", "query workflow", "lint workflow"]) {
    if (!agents.includes(term)) errors.push(`AGENTS.md does not document ${term}`);
  }
}

function checkCatalog() {
  const csvPath = "notes/documentation_catalog.csv";
  const mdPath = "notes/documentation_catalog.md";
  if (!exists(csvPath) || !exists(mdPath)) return;
  const rows = parseCsv(read(csvPath));
  if (!rows.length) errors.push("documentation_catalog.csv is empty");
  const requiredColumns = ["path", "scope", "kind", "pages", "definition"];
  for (const column of requiredColumns) {
    if (!(column in rows[0])) errors.push(`documentation_catalog.csv missing column: ${column}`);
  }
  const seen = new Set();
  for (const row of rows) {
    if (!row.path) errors.push("documentation_catalog.csv row with empty path");
    if (!row.definition) errors.push(`Empty definition in documentation_catalog.csv for ${row.path || "<missing path>"}`);
    if (row.path && !exists(row.path)) errors.push(`Catalog path does not exist: ${row.path}`);
    if (row.path && seen.has(row.path)) errors.push(`Duplicate catalog path: ${row.path}`);
    seen.add(row.path);
  }
  const mdText = read(mdPath);
  const mdPaths = [...mdText.matchAll(/\| `([^`]+)` \|/g)].map((match) => match[1]);
  if (mdPaths.length && mdPaths.length !== rows.length) {
    errors.push(`Catalog CSV/Markdown count mismatch: csv=${rows.length}, md=${mdPaths.length}`);
  }
  for (const row of rows) {
    if (mdPaths.length && !mdPaths.includes(row.path)) errors.push(`Catalog Markdown missing path from CSV: ${row.path}`);
  }
}

function checkPageIndex() {
  const csvPath = "notes/document_page_index.csv";
  if (!exists(csvPath) || !exists("notes/documentation_catalog.csv")) return;
  const indexRows = parseCsv(read(csvPath));
  const catalogRows = parseCsv(read("notes/documentation_catalog.csv"));
  const pagesByPath = new Map(
    catalogRows
      .filter((row) => row.kind === "pdf")
      .map((row) => [row.path, Number(row.pages || 0)])
  );
  for (const row of indexRows) {
    if (!row.path || !exists(row.path)) errors.push(`Page index PDF missing: ${row.path || "<missing path>"}`);
    const page = Number(row.page);
    const pageCount = pagesByPath.get(row.path);
    if (!Number.isInteger(page) || page < 1) errors.push(`Invalid page number in page index: ${row.path} page=${row.page}`);
    if (pageCount && page > pageCount) errors.push(`Page index out of range: ${row.path} page=${page} pages=${pageCount}`);
    if (row.page_url !== `/${row.path}#page=${page}`) errors.push(`Invalid page URL for ${row.path} page ${page}: ${row.page_url}`);
  }
}

function checkRawSourceSeparation() {
  const afnorFiles = walk("docs_tech/afnor", () => true);
  for (const file of afnorFiles) {
    const name = path.basename(file).toLowerCase();
    if (name === "readme.md") continue;
    if (!name.includes("afnor") && !name.includes("xp_z12")) errors.push(`Unexpected non-AFNOR file in docs_tech/afnor: ${file}`);
    if (name.includes("cegos") || name.includes("comexa")) errors.push(`Company-specific file in AFNOR folder: ${file}`);
  }
  const specificFiles = walk("docs_specific", () => true);
  for (const file of specificFiles) {
    const name = path.basename(file).toLowerCase();
    if (name.includes("afnor") || name.includes("xp_z12")) errors.push(`AFNOR file found in docs_specific: ${file}`);
  }
}

function checkAppDataCoherence() {
  const knownCaseIds = new Set(cases.map((item) => item.id));
  for (const [caseId, reference] of Object.entries(annexAReferences)) {
    if (!knownCaseIds.has(Number(caseId))) errors.push(`annexAReferences has unknown case id: ${caseId}`);
    if (!exists(reference.localRelativePath)) errors.push(`Annex A reference path missing for case ${caseId}: ${reference.localRelativePath}`);
    if (!reference.localUrl.endsWith(`#page=${reference.page}`)) errors.push(`Annex A reference URL/page mismatch for case ${caseId}`);
  }
  for (const item of cases) {
    if (!annexAReferences[item.id] && item.noAnnexAEquivalent !== true && !item.afnorSource) {
      errors.push(`Case ${item.id} has no Annex A mapping and no explicit noAnnexAEquivalent: true`);
    }
  }
  for (const source of sourceReferenceIndex) {
    if (source.localExists && source.localRelativePath && !exists(source.localRelativePath)) {
      errors.push(`sourceReferenceIndex points to missing file: ${source.id} -> ${source.localRelativePath}`);
    }
  }
}

function checkViewerHardening() {
  const html = exists("local-viewer.html") ? read("local-viewer.html") : "";
  const js = exists("local-viewer.js") ? read("local-viewer.js") : "";
  const vite = exists("vite.config.js") ? read("vite.config.js") : "";
  if (!html.includes("Content-Security-Policy")) errors.push("local-viewer.html has no CSP meta tag");
  if (!js.includes("allowedPrefixes")) errors.push("local-viewer.js does not whitelist allowed local prefixes");
  if (!js.includes('params.get("file")')) errors.push("local-viewer.js does not handle the legacy file parameter");
  if (js.includes("innerHTML")) errors.push("local-viewer.js uses innerHTML");
  if (!js.includes("textContent")) errors.push("local-viewer.js does not render text with textContent");
  if (!vite.includes("Content-Security-Policy")) errors.push("vite.config.js does not set CSP headers");
  const cspDeclaration = vite.match(/const csp = \[([\s\S]*?)\]\.join/)?.[1] || "";
  if (/unsafe-eval|["']\*["']/.test(cspDeclaration)) errors.push("vite.config.js CSP contains unsafe-eval or wildcard");
  if (!vite.includes("127.0.0.1")) errors.push("vite.config.js does not bind server/preview to 127.0.0.1");
  if (!vite.includes("package(?:-lock)?\\.json")) errors.push("vite.config.js does not block package.json/package-lock.json");
}

function checkSensitiveFiles() {
  for (const file of [".env", ".env.local", ".env.production"]) {
    if (exists(file)) errors.push(`Sensitive env file present in repository root: ${file}`);
  }
  const gitignore = exists(".gitignore") ? read(".gitignore") : "";
  if (!gitignore.includes(".env")) errors.push(".gitignore does not ignore .env files");
  const secretPattern = /\b(api[_-]?key|secret|token|password)\b\s*[:=]\s*['"]?[A-Za-z0-9_\-]{16,}/i;
  for (const file of sourceRoots.flatMap((dir) => walk(dir, (name) => /\.(js|json|md|html|css|mjs)$/i.test(name)))) {
    const text = read(file);
    if (secretPattern.test(text)) errors.push(`Possible hardcoded secret in ${file}`);
  }
}

function parseCsv(text) {
  const rows = [];
  const records = [];
  let field = "";
  let record = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      record.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      record.push(field);
      field = "";
      if (record.some((value) => value.length)) records.push(record);
      record = [];
    } else {
      field += char;
    }
  }
  if (field || record.length) {
    record.push(field);
    records.push(record);
  }
  const [headers = [], ...lines] = records;
  for (const line of lines) {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = line[index] || "";
    });
    rows.push(row);
  }
  return rows;
}
