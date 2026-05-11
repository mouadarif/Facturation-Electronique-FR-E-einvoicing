import { cases, categories } from "../data/cases.js";
import { sources } from "../data/sources.js";
import { sourceReferenceIndex } from "../data/sourceReferenceIndex.js";
import { primaryReferences } from "../data/primaryReferences.js";
import { annexAReferences } from "../data/annexAReferences.js";
import { officialAnnexData } from "../data/officialAnnexData.js";
import { applicableContextCases } from "../data/companyContext.js";

const sourceById = new Map(sources.map((source) => [source.id, source]));
const sourceReferenceById = new Map(sourceReferenceIndex.map((source) => [source.id, source]));
const categoriesWithoutAll = categories.filter((cat) => cat.id !== "all");

export const initialState = {
  activeView: "library",
  category: "all",
  query: "",
  selectedCaseId: null,
  selectedTableCaseId: null,
  selectedContextId: null
};

export function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function toneFor(categoryId) {
  const tone = categories.find((cat) => cat.id === categoryId)?.tone || "neutral";
  const map = {
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
    teal: "bg-teal-100 text-teal-700 border-teal-200",
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    rose: "bg-rose-100 text-rose-700 border-rose-200",
    blue: "bg-sky-100 text-sky-700 border-sky-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200"
  };
  return map[tone] || map.neutral;
}

export function caseChartData() {
  return {
    labels: categoriesWithoutAll.map((cat) => cat.label),
    values: categoriesWithoutAll.map((cat) => cases.filter((item) => item.category === cat.id).length)
  };
}

export function allCaseSourceReferences(item) {
  return [...new Set(item.sources || [])]
    .map((id) => {
      const source = sourceById.get(id);
      const reference = sourceReferenceById.get(id);
      if (!source) return null;
      return {
        ...source,
        reference: reference || null
      };
    })
    .filter(Boolean);
}

export function contextSourceReferences(contextItem) {
  const relatedCases = casesByIds(contextItem?.matchedCaseIds || []);
  const seen = new Set();
  return relatedCases
    .flatMap((item) => allCaseSourceReferences(item))
    .filter((source) => {
      if (seen.has(source.id)) return false;
      seen.add(source.id);
      return true;
    });
}

export function primaryReferenceForCase(item) {
  if (item?.afnorSource) {
    return {
      title: item.afnorSource.sourceTitle,
      localRelativePath: item.afnorSource.localRelativePath,
      localUrl: item.afnorSource.localUrl,
      page: item.afnorSource.page,
      pageLabel: item.afnorSource.pageLabel,
      note: `${item.afnorCase} - ${item.title}`
    };
  }

  return item ? primaryReferences[item.id] || null : null;
}

export function annexAReferenceForCase(item) {
  if (item?.afnorSource?.page) {
    return {
      sourceTitle: item.afnorSource.sourceTitle,
      localRelativePath: item.afnorSource.localRelativePath,
      localUrl: item.afnorSource.localUrl,
      page: item.afnorSource.page,
      pageLabel: item.afnorSource.pageLabel,
      afnorCase: item.afnorCase,
      title: item.title,
      note: item.description
    };
  }

  return item ? annexAReferences[item.id] || null : null;
}

export function primaryReferenceForContext(contextItem) {
  const firstCase = casesByIds(contextItem?.matchedCaseIds || [])[0];
  return primaryReferenceForCase(firstCase);
}

export function contextById(id) {
  return applicableContextCases.find((item) => item.id === id) || null;
}

export function casesByIds(ids = []) {
  return ids.map((id) => cases.find((item) => item.id === id)).filter(Boolean);
}

export function filteredCases(state) {
  const q = normalize(state.query.trim());
  return cases.filter((item) => {
    const categoryOk = state.category === "all" || item.category === state.category;
    if (!q) return categoryOk;
    const haystack = normalize([item.title, item.type, item.description, item.example, item.format, item.erp].join(" "));
    return categoryOk && haystack.includes(q);
  });
}

export function tableKindForCase(item) {
  if (item.category === "plateforme" && /annuaire|routage|reception/i.test(item.title)) return "annuaire";
  if (item.category === "statuts" && !item.type.includes("paiement")) return "status";
  if (item.type.includes("E-reporting") || item.category === "b2c" || item.category === "b2b-int") return "reporting";
  return "invoice";
}

export function tableRowsForCase(item) {
  const kind = tableKindForCase(item);
  if (kind === "annuaire") return { kind, rows: officialAnnexData.annuaire.slice(0, 20) };
  if (kind === "status") return { kind, rows: officialAnnexData.statuses.slice(0, 20) };
  if (kind === "reporting") return { kind, rows: officialAnnexData.reporting.slice(0, 20) };
  return { kind, rows: officialAnnexData.invoice.slice(0, 20) };
}

export function listHtml(items) {
  return items.map((entry) => `<li>${entry}</li>`).join("");
}

export { cases, categories };
