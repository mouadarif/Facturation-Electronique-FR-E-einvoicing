import fs from "node:fs";
import path from "node:path";
import { cases } from "../src/data/cases.js";
import { officialAnnexData } from "../src/data/officialAnnexData.js";

const outDir = path.resolve("src/data/case-hierarchies");

fs.mkdirSync(outDir, { recursive: true });

for (const item of cases) {
  const hierarchy = buildCaseHierarchy(item);
  fs.writeFileSync(
    path.join(outDir, `case_${String(item.id).padStart(2, "0")}.json`),
    `${JSON.stringify(hierarchy, null, 2)}\n`,
    "utf8"
  );
}

const imports = cases
  .map((item) => `import case${String(item.id).padStart(2, "0")} from "./case-hierarchies/case_${String(item.id).padStart(2, "0")}.json";`)
  .join("\n");
const entries = cases.map((item) => `  ${item.id}: case${String(item.id).padStart(2, "0")}`).join(",\n");

fs.writeFileSync(
  path.resolve("src/data/caseHierarchies.js"),
  `${imports}\n\nexport const caseHierarchies = {\n${entries}\n};\n`,
  "utf8"
);

function buildCaseHierarchy(item) {
  const kind = tableKindForCase(item);
  const rows = rowsForKind(kind);
  return {
    caseId: item.id,
    afnorCase: item.afnorCase,
    title: item.title,
    sourceKind: kind,
    generatedFrom: "src/data/officialAnnexData.js",
    summary: summaryFor(kind, rows),
    hierarchies: hierarchiesFor(kind, rows)
  };
}

function tableKindForCase(item) {
  if (item.category === "plateforme" && /annuaire|routage|reception/i.test(item.title)) return "annuaire";
  if (item.category === "statuts" && !item.type.includes("paiement")) return "status";
  if (item.type.includes("E-reporting") || item.category === "b2c" || item.category === "b2b-int") return "reporting";
  return "invoice";
}

function rowsForKind(kind) {
  if (kind === "annuaire") return officialAnnexData.annuaire;
  if (kind === "status") return officialAnnexData.statuses;
  if (kind === "reporting") return officialAnnexData.reporting;
  return officialAnnexData.invoice;
}

function summaryFor(kind, rows) {
  return {
    rowCount: rows.length,
    sourceLabel: {
      invoice: "Annexe 1 - Flux 1 e-invoicing",
      reporting: "Annexes e-reporting",
      status: "Annexe 2 - Statuts cycle de vie",
      annuaire: "Annuaire / routage"
    }[kind]
  };
}

function hierarchiesFor(kind, rows) {
  if (kind === "invoice") {
    return [
      buildPathHierarchy("ubl", "UBL XML", "xml", rows, "ubl"),
      buildPathHierarchy("cii", "CII / Factur-X XML", "xml", rows, "cii")
    ].filter((hierarchy) => hierarchy.root.children.length);
  }

  if (kind === "reporting" || kind === "annuaire") {
    return [buildPathHierarchy(kind, kind === "reporting" ? "E-reporting JSON/XML" : "Annuaire JSON", "json", rows, "path")];
  }

  return [buildStatusHierarchy(rows)];
}

function buildPathHierarchy(id, label, format, rows, pathKey) {
  const root = { name: label, count: 0, children: [] };
  const childByPath = new Map();

  for (const row of rows) {
    const rawPath = row[pathKey];
    if (!rawPath) continue;
    const parts = splitPath(rawPath);
    if (!parts.length) continue;
    root.count += 1;
    let current = root;
    let currentKey = "";
    for (const part of parts) {
      currentKey = `${currentKey}/${part}`;
      let child = childByPath.get(currentKey);
      if (!child) {
        child = { name: part, count: 0, children: [], examples: [] };
        childByPath.set(currentKey, child);
        current.children.push(child);
      }
      child.count += 1;
      if (child.examples.length < 3) {
        child.examples.push({
          id: row.id,
          label: row.label,
          cardinality: row.cardinality || "",
          row: row.row
        });
      }
      current = child;
    }
  }

  trimTree(root, 8, 3);
  return { id, label, format, root };
}

function buildStatusHierarchy(rows) {
  const groups = new Map();
  for (const row of rows) {
    const group = row.group || "statuts";
    if (!groups.has(group)) groups.set(group, { name: group, count: 0, children: [], examples: [] });
    const node = groups.get(group);
    node.count += 1;
    if (node.examples.length < 5) {
      node.examples.push({ id: row.id, label: row.label, row: row.row });
    }
  }

  return {
    id: "statuses",
    label: "Statuts cycle de vie",
    format: "json",
    root: {
      name: "Cycle de vie",
      count: rows.length,
      children: [...groups.values()].slice(0, 10)
    }
  };
}

function splitPath(rawPath) {
  return String(rawPath)
    .replaceAll("\\", "/")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/\s+\/\s+/g, " | "));
}

function trimTree(node, maxChildren, maxDepth, depth = 0) {
  if (!node.children?.length) return;
  node.children.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  if (node.children.length > maxChildren) {
    const hidden = node.children.slice(maxChildren);
    node.children = [
      ...node.children.slice(0, maxChildren),
      {
        name: "Autres noeuds",
        count: hidden.reduce((sum, child) => sum + child.count, 0),
        children: [],
        examples: []
      }
    ];
  }
  if (depth >= maxDepth) {
    node.children = [];
    return;
  }
  node.children.forEach((child) => trimTree(child, maxChildren, maxDepth, depth + 1));
}
