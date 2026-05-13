import { cases, categories } from "../data/cases.js";
import { sources } from "../data/sources.js";
import { sourceReferenceIndex } from "../data/sourceReferenceIndex.js";
import { primaryReferences } from "../data/primaryReferences.js";
import { annexAReferences } from "../data/annexAReferences.js";
import { officialAnnexData } from "../data/officialAnnexData.js";
import { applicableContextCases } from "../data/companyContext.js";
import { caseHierarchies } from "../data/caseHierarchies.js";

const sourceById = new Map(sources.map((source) => [source.id, source]));
const sourceReferenceById = new Map(sourceReferenceIndex.map((source) => [source.id, source]));
const categoriesWithoutAll = categories.filter((cat) => cat.id !== "all");
const defaultApplicableCaseIds = new Set(applicableContextCases.flatMap((item) => item.matchedCaseIds || []));
const wikiPathsByCaseId = {
  1: "wiki/cas_applicables/cas_01_multi_commande_multi_livraison.md",
  2: "wiki/cas_applicables/cas_02_facture_deja_payee.md",
  3: "wiki/cas_applicables/cas_03_tiers_payeur_connu.md",
  4: "wiki/cas_applicables/cas_04_prise_en_charge_partielle.md",
  5: "wiki/cas_applicables/cas_05_frais_collaborateur_facture_entreprise.md",
  6: "wiki/cas_applicables/cas_06_frais_collaborateur_sans_facture_entreprise.md",
  7: "wiki/cas_applicables/cas_07_carte_logee.md",
  8: "wiki/cas_applicables/cas_08_09_10_paiement_tiers_affacturage.md",
  9: "wiki/cas_applicables/cas_09_facture_traitee_par_tiers.md",
  10: "wiki/cas_applicables/cas_10_intermediaire_transparent_acheteur.md"
};

export const initialState = {
  activeView: "library",
  category: "all",
  query: "",
  selectedCaseId: null,
  selectedTableCaseId: null,
  selectedContextId: null,
  managerCaseId: 1,
  caseOverrides: {}
};

export function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function toneFor(categoryId) {
  const tone = categories.find((cat) => cat.id === categoryId)?.tone || "neutral";
  return toneClass(tone);
}

export const caseColorOptions = [
  { id: "category", label: "Famille" },
  { id: "neutral", label: "Neutre" },
  { id: "indigo", label: "Indigo" },
  { id: "teal", label: "Sarcelle" },
  { id: "green", label: "Vert" },
  { id: "amber", label: "Ambre" },
  { id: "rose", label: "Rose" },
  { id: "blue", label: "Bleu" }
];

export const caseApplicabilityOptions = [
  { id: "not-applicable", label: "Non coche" },
  { id: "applicable", label: "Applicable" },
  { id: "review", label: "A verifier" }
];

export function toneForCase(item, overrides = {}) {
  const override = overrides[item.id]?.tone;
  if (override && override !== "category") return toneClass(override);
  return toneFor(item.category);
}

export function caseApplicabilityFor(item, overrides = {}) {
  const override = overrides[item.id] || {};
  if (caseApplicabilityOptions.some((option) => option.id === override.applicability)) {
    return override.applicability;
  }
  if (typeof override.applicable === "boolean") {
    return override.applicable ? "applicable" : "not-applicable";
  }
  return defaultApplicableCaseIds.has(item.id) ? "applicable" : "not-applicable";
}

export function isCaseApplicableToCompany(item, overrides = {}) {
  return caseApplicabilityFor(item, overrides) === "applicable";
}

export function caseOverrideFor(item, overrides = {}) {
  const override = overrides[item.id] || {};
  return {
    tone: override.tone || "category",
    applicability: caseApplicabilityFor(item, overrides),
    note: typeof override.note === "string" ? override.note : ""
  };
}

function toneClass(tone) {
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

export function wikiPathForCase(item) {
  if (!item) return null;
  return wikiPathsByCaseId[item.id] || `wiki/cas_applicables/cas_${String(item.id).padStart(2, "0")}.md`;
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
  if (kind === "annuaire") return { kind, rows: officialAnnexData.annuaire };
  if (kind === "status") return { kind, rows: officialAnnexData.statuses };
  if (kind === "reporting") return { kind, rows: officialAnnexData.reporting };
  return { kind, rows: officialAnnexData.invoice };
}

export function hierarchyForCase(item) {
  return item ? caseHierarchies[item.id] || null : null;
}

export function listHtml(items) {
  return items.map((entry) => `<li>${entry}</li>`).join("");
}

export { cases, categories };
