import { companyProfile, applicableContextCases, trainingExpectations } from "../data/companyContext.js";
import { renderSaaSTable } from "./tables.js";
import {
  allCaseSourceReferences,
  caseApplicabilityFor,
  caseApplicabilityOptions,
  annexAReferenceForCase,
  caseColorOptions,
  caseOverrideFor,
  cases,
  casesByIds,
  categories,
  contextSourceReferences,
  contextById,
  filteredCases,
  hierarchyForCase,
  isCaseApplicableToCompany,
  listHtml,
  primaryReferenceForCase,
  primaryReferenceForContext,
  tableRowsForCase,
  toneFor,
  toneForCase,
  wikiPathForCase
} from "./model.js";

const viewCards = [
  {
    id: "context",
    title: "Cas applicables",
    eyebrow: "Votre contexte",
    description: "Carte des cas applicables a votre entreprise, reliee au referentiel complet."
  },
  {
    id: "library",
    title: "Les 44 cas AFNOR",
    eyebrow: "Referentiel complet",
    description: "Liste complete des cas d'usage B2B, pas seulement les cas applicables a votre contexte."
  },
  {
    id: "datasets",
    title: "Tables officielles",
    eyebrow: "Annexes Excel",
    description: "Acces aux tables BT, e-reporting, statuts et annuaire converties en JSON et consultables en pop-out."
  },
  {
    id: "training",
    title: "Parcours de formation",
    eyebrow: "Formation",
    description: "Attentes de formation reliees aux cas complexes et aux obligations e-invoicing et e-reporting."
  },
  {
    id: "management",
    title: "Pilotage des cas",
    eyebrow: "Parametrage",
    description: "Ajuster la couleur, l'applicabilite et les notes locales propres a votre entreprise."
  }
];

export function buildAppHtml(state) {
  const selectedCase = state.selectedCaseId ? cases.find((item) => item.id === state.selectedCaseId) : null;
  const selectedTableCase = state.selectedTableCaseId ? cases.find((item) => item.id === state.selectedTableCaseId) : null;
  const selectedContext = state.selectedContextId ? contextById(state.selectedContextId) : null;
  const tablePack = selectedTableCase ? tableRowsForCase(selectedTableCase) : null;

  return `
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      ${renderHeader(state)}
      ${state.activeView === "home" ? renderHome() : ""}
      ${state.activeView === "context" ? renderContextExplorer() : ""}
      ${state.activeView === "library" ? renderCaseLibrary(state) : ""}
      ${state.activeView === "datasets" ? renderDatasets() : ""}
      ${state.activeView === "training" ? renderTraining() : ""}
      ${state.activeView === "management" ? renderCaseManagement(state) : ""}
    </div>
    ${buildCaseModal(selectedCase, state)}
    ${buildTableModal(selectedTableCase, tablePack)}
    ${buildContextModal(selectedContext)}
  `;
}

function formatPrimaryReferencePath(primaryReference) {
  if (!primaryReference) return "";
  return `${primaryReference.localRelativePath}${primaryReference.pageLabel ? ` - ${primaryReference.pageLabel}` : ""}`;
}

function isTextLocalUrl(url = "") {
  const cleanUrl = url.split("#")[0].split("?")[0];
  return /\.(md|csv|txt|json|js)$/i.test(cleanUrl);
}

function pageFromLocalUrl(url = "") {
  return url.match(/[#&?]page=(\d+)/i)?.[1] || "";
}

function readableLocalUrl(url = "", title = "") {
  const cleanUrl = url.split("#")[0].split("?")[0];
  const isPdf = /\.pdf$/i.test(cleanUrl);
  if (!isPdf && !isTextLocalUrl(url)) return url;
  const params = new URLSearchParams({ path: url, title });
  const page = pageFromLocalUrl(url);
  if (page) params.set("page", page);
  return `/local-viewer.html?${params.toString()}`;
}

function renderPrimaryReferenceCard(primaryReference) {
  if (!primaryReference) return "";
  return `<div class="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"><p class="font-semibold text-slate-700">Reference principale</p><p class="mt-1">${primaryReference.pageLabel || primaryReference.title}</p></div>`;
}


function renderWikiCaseCard(item) {
  const wikiPath = wikiPathForCase(item);
  if (!wikiPath) return "";
  return `<div class="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
    <p class="font-semibold">Fiche wiki locale</p>
    <p class="mt-1 break-all">${wikiPath}</p>
    <a href="${readableLocalUrl(`/${wikiPath}`, `Wiki - ${item.afnorCase || item.title}`)}" target="_blank" rel="noreferrer" class="inline-flex mt-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 hover:border-emerald-300 hover:bg-emerald-100">Ouvrir la fiche wiki</a>
  </div>`;
}

function renderAnnexACard(annexAReference) {
  if (!annexAReference) return "";
  return `<div class="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
    <p class="font-semibold">Fiche AFNOR Annexe A</p>
    <p class="mt-1">${annexAReference.afnorCase} - ${annexAReference.pageLabel}</p>
  </div>`;
}

function renderPrimaryReferenceSection(primaryReference) {
  if (!primaryReference) return "";
  return `
    <section class="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 class="mb-2 text-lg font-semibold text-slate-900">Reference principale conseillee</h3>
      <p class="text-sm font-semibold text-slate-800">${primaryReference.title}</p>
      <p class="mt-2 text-sm leading-6 text-slate-700">${primaryReference.note}</p>
      <div class="mt-3">
        ${primaryReference.localUrl ? `<a href="${readableLocalUrl(primaryReference.localUrl, primaryReference.title)}" target="_blank" rel="noreferrer" class="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50">Ouvrir la reference principale</a>` : ""}
      </div>
    </section>
  `;
}

function renderAnnexASection(annexAReference) {
  if (!annexAReference) return "";
  return `
    <section class="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <h3 class="mb-2 text-lg font-semibold text-amber-950">Fiche AFNOR Annexe A liee au cas</h3>
      <p class="text-sm font-semibold text-amber-900">${annexAReference.afnorCase} - ${annexAReference.title}</p>
      <p class="mt-2 break-all text-sm text-amber-800">${annexAReference.localRelativePath} - ${annexAReference.pageLabel}</p>
      <p class="mt-2 text-sm leading-6 text-amber-900">${annexAReference.note}</p>
      <div class="mt-3">
        <a href="${readableLocalUrl(annexAReference.localUrl, annexAReference.sourceTitle)}" target="_blank" rel="noreferrer" class="inline-flex rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-semibold text-amber-900 hover:border-amber-300 hover:bg-amber-100">Ouvrir la fiche Annexe A</a>
      </div>
    </section>
  `;
}

function renderWikiCaseSection(item, primaryReference) {
  const wikiPath = wikiPathForCase(item);
  if (!wikiPath) return "";
  return `
    <section class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <h3 class="mb-2 text-lg font-semibold text-emerald-950">Synthese wiki locale</h3>
      <p class="text-sm leading-6 text-emerald-900">La synthese wiki sert de lecture metier. Pour trancher, privilegier la reference principale du cas.</p>
      <div class="mt-3 flex flex-wrap gap-2">
        ${primaryReference?.localUrl ? `<a href="${readableLocalUrl(primaryReference.localUrl, primaryReference.title)}" target="_blank" rel="noreferrer" class="inline-flex rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 hover:border-emerald-300 hover:bg-emerald-100">Ouvrir la reference principale</a>` : ""}
        <a href="${readableLocalUrl(`/${wikiPath}`, `Wiki - ${item.afnorCase || item.title}`)}" target="_blank" rel="noreferrer" class="inline-flex rounded-lg border border-emerald-200 bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-900 hover:border-emerald-300 hover:bg-emerald-200">Ouvrir la synthese wiki</a>
      </div>
    </section>
  `;
}

function renderCompanyCaseNoteSection(override) {
  if (!override.note) return "";
  return `
    <section class="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <h3 class="mb-2 text-lg font-semibold text-amber-950">Note entreprise locale</h3>
      <p class="whitespace-pre-wrap text-sm leading-6 text-amber-900">${escapeHtml(override.note)}</p>
    </section>
  `;
}

function renderCaseHierarchySection(hierarchy, table, selectedCase) {
  if (!hierarchy) return "";
  const gridClass = hierarchy.hierarchies.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1";
  return `
    <section>
      <div class="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">Hierarchie structuree</h3>
          <p class="mt-1 text-sm text-slate-600">Rendu depuis le JSON du cas, genere a partir des annexes structurees locales.</p>
        </div>
        <button data-table-case="${selectedCase.id}" class="table-entry rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50">Ouvrir la table officielle (${table.rows.length})</button>
      </div>
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div class="flex flex-wrap gap-2">
          <span class="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600">${hierarchy.sourceKind.toUpperCase()}</span>
          <span class="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600">${hierarchy.summary.rowCount} lignes source</span>
          <span class="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600">${hierarchy.generatedFrom}</span>
        </div>
        <div class="mt-4 grid gap-3 ${gridClass}">
          ${hierarchy.hierarchies.map(renderHierarchyCard).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderHierarchyCard(hierarchy) {
  return `
    <article class="rounded-lg border border-slate-200 bg-white p-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h4 class="text-sm font-bold text-slate-900">${hierarchy.label}</h4>
          <p class="mt-1 text-xs uppercase tracking-wide text-slate-500">${hierarchy.format}</p>
        </div>
        <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">${hierarchy.root.count}</span>
      </div>
      <div class="mt-3 space-y-2">
        ${renderHierarchyNodes(hierarchy.root.children || [], 0)}
      </div>
    </article>
  `;
}

function renderHierarchyNodes(nodes, depth) {
  if (!nodes.length) {
    return `<p class="text-xs text-slate-500">Aucune hierarchie detaillee disponible dans la source structuree.</p>`;
  }
  return nodes
    .slice(0, 6)
    .map(
      (node) => `
        <div class="${depth ? "ml-4 border-l border-slate-200 pl-3" : ""}">
          <div class="flex items-center justify-between gap-2 rounded-md bg-slate-50 px-2 py-1">
            <span class="truncate text-xs font-semibold text-slate-700">${escapeHtml(node.name)}</span>
            <span class="shrink-0 text-[11px] font-semibold text-slate-400">${node.count}</span>
          </div>
          ${node.examples?.length ? `<div class="mt-1 flex flex-wrap gap-1">${node.examples.slice(0, 2).map((example) => `<span class="rounded bg-white px-1.5 py-1 text-[11px] text-slate-500">${escapeHtml(example.id)}${example.cardinality ? ` ${escapeHtml(example.cardinality)}` : ""}</span>`).join("")}</div>` : ""}
          ${depth < 1 && node.children?.length ? `<div class="mt-2">${renderHierarchyNodes(node.children, depth + 1)}</div>` : ""}
        </div>
      `
    )
    .join("");
}

function renderHeader(state) {
  return `
    <header class="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-indigo-600">Reforme francaise de la facturation electronique</p>
          <h1 class="mt-1 text-2xl font-bold text-slate-950">Referentiel des 44 cas d'usage B2B</h1>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-slate-600">${companyProfile.conclusion}</p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"><p class="text-xs text-slate-500">Elements de contexte</p><p class="text-xl font-bold text-slate-900">${applicableContextCases.length}</p></div>
          <div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"><p class="text-xs text-slate-500">Cas AFNOR</p><p class="text-xl font-bold text-slate-900">${cases.length}</p></div>
        </div>
      </div>
      <nav class="mt-4 flex flex-wrap gap-2">
        ${["home", "context", "library", "datasets", "training", "management"]
          .map(
            (view) =>
              `<button data-view="${view}" class="view-tab rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                state.activeView === view
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }">${labelForView(view)}</button>`
          )
          .join("")}
      </nav>
    </header>
  `;
}

function labelForView(view) {
  return {
    home: "Vue d'ensemble",
    context: "Cas applicables",
    library: "44 cas AFNOR",
    datasets: "Tables officielles",
    training: "Formation",
    management: "Pilotage"
  }[view];
}

function renderHome() {
  return `
    <section class="grid gap-4 lg:grid-cols-4">
      ${viewCards
        .map(
          (card) => `
            <button data-view="${card.id}" class="view-card rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
              <p class="text-xs font-semibold uppercase tracking-wider text-indigo-600">${card.eyebrow}</p>
              <h2 class="mt-2 text-lg font-bold text-slate-950">${card.title}</h2>
              <p class="mt-2 text-sm leading-6 text-slate-600">${card.description}</p>
            </button>
          `
        )
        .join("")}
    </section>
    <section class="mt-6 grid gap-4 lg:grid-cols-3">
      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
        <h2 class="text-lg font-bold text-slate-950">Contexte entreprise</h2>
        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          ${companyProfile.facts.map((fact) => `<div class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">${fact}</div>`).join("")}
        </div>
      </article>
      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-bold text-slate-950">Repartition</h2>
        <div class="mt-3 h-60"><canvas id="casesChart"></canvas></div>
      </article>
    </section>
  `;
}

function renderContextExplorer() {
  const grouped = groupBy(applicableContextCases, "domain");
  return `
    <section class="space-y-5">
      ${Object.entries(grouped)
        .map(
          ([domain, items]) => `
          <div>
            <div class="mb-3 flex items-center justify-between">
              <h2 class="text-lg font-bold text-slate-950">${domain}</h2>
              <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">${items.length} elements</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              ${items.map(renderContextCard).join("")}
            </div>
          </div>
        `
        )
        .join("")}
    </section>
  `;
}

function renderContextCard(item) {
  const primaryReference = primaryReferenceForContext(item);
  return `
    <button data-context="${item.id}" class="context-card rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div class="flex items-start justify-between gap-3">
        <span class="rounded-md border px-2 py-1 text-xs font-semibold ${statusTone(item.applicability)}">${item.applicability}</span>
        <span class="text-xs font-semibold text-slate-400">${item.priority}</span>
      </div>
      <h3 class="mt-3 text-base font-bold text-slate-950">${item.title}</h3>
      <p class="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">${item.explanation}</p>
      ${renderPrimaryReferenceCard(primaryReference)}
      <div class="mt-3 flex flex-wrap gap-1">
        ${item.matchedCaseIds.map((id) => `<span class="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">Cas ${id}</span>`).join("")}
      </div>
    </button>
  `;
}

function statusTone(status) {
  if (status === "Applicable") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status.includes("qualifier")) return "border-amber-200 bg-amber-50 text-amber-700";
  if (status.includes("Hors")) return "border-slate-200 bg-slate-50 text-slate-700";
  return "border-sky-200 bg-sky-50 text-sky-700";
}

function renderCaseLibrary(state) {
  const visibleCases = filteredCases(state);
  return `
    <section class="grid gap-4 lg:grid-cols-[260px_1fr]">
      <aside class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 class="text-sm font-bold text-slate-950">Familles de cas</h2>
        <div class="mt-3 grid gap-2">
          ${categories
            .map(
              (cat) => `
                <button data-category="${cat.id}" class="category-filter rounded-lg border px-3 py-2 text-left text-sm font-semibold ${
                state.category === cat.id
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }">${cat.label}</button>
              `
            )
            .join("")}
        </div>
      </aside>
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-lg font-bold text-slate-950">Cartes de cas de reference</h2>
            <p class="text-sm text-slate-600">${visibleCases.length} cas sur ${cases.length}</p>
          </div>
          <input id="searchInput" value="${state.query.replaceAll('"', "&quot;")}" placeholder="Rechercher : acompte, affacturage, TVA etrangere..." class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 sm:w-96" />
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              ${visibleCases.map((item) => renderCaseCard(item, state)).join("") || `<div class="col-span-full rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">Aucun cas correspondant.</div>`}
        </div>
      </div>
    </section>
  `;
}

function renderCaseCard(item, state = { caseOverrides: {} }) {
  const applicability = caseApplicabilityFor(item, state.caseOverrides);
  const override = caseOverrideFor(item, state.caseOverrides);
  return `
    <button data-case="${item.id}" class="case-card rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div class="mb-3 flex items-start justify-between gap-2">
        <span class="inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${toneForCase(item, state.caseOverrides)}">${item.type}</span>
        <span class="text-xs font-semibold text-slate-400">#${String(item.id).padStart(2, "0")}</span>
      </div>
      ${renderApplicabilityBadge(applicability, "mb-2")}
      <h3 class="line-clamp-2 text-base font-semibold text-slate-900">${item.title}</h3>
      <p class="mt-2 line-clamp-3 text-sm text-slate-600">${item.description}</p>
      ${override.note ? `<span class="mt-3 inline-flex max-w-full rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700">Note entreprise</span>` : ""}
    </button>
  `;
}

function renderCaseManagement(state) {
  const selected = cases.find((item) => item.id === state.managerCaseId) || cases[0];
  const selectedOverride = caseOverrideFor(selected, state.caseOverrides);
  const applicableCount = cases.filter((item) => isCaseApplicableToCompany(item, state.caseOverrides)).length;
  const reviewCount = cases.filter((item) => caseApplicabilityFor(item, state.caseOverrides) === "review").length;
  return `
    <section class="grid gap-4 xl:grid-cols-[1fr_360px]">
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-lg font-bold text-slate-950">Pilotage couleur et applicabilite</h2>
            <p class="text-sm text-slate-600">${applicableCount} cas applicables, ${reviewCount} cas a verifier. Les notes et arbitrages sont stockes localement hors livrable.</p>
          </div>
          <button id="resetCaseManagement" type="button" class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-rose-200 hover:bg-rose-50">Reinitialiser</button>
        </div>
        <div class="overflow-auto rounded-lg border border-slate-200">
          <table class="w-full min-w-[980px] border-collapse text-sm">
            <thead class="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th class="px-3 py-3">Selection</th>
                <th class="px-3 py-3">Cas</th>
                <th class="px-3 py-3">Famille</th>
                <th class="px-3 py-3">Couleur</th>
                <th class="px-3 py-3">Applicabilite entreprise</th>
                <th class="px-3 py-3">Note</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${cases.map((item) => renderCaseManagementRow(item, state)).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <aside class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600">Cas selectionne</p>
        <h2 class="mt-2 text-lg font-bold text-slate-950">${selected.afnorCase}</h2>
        <p class="mt-1 text-sm font-semibold text-slate-800">${selected.title}</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span class="inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${toneForCase(selected, state.caseOverrides)}">${selected.type}</span>
          ${renderApplicabilityBadge(selectedOverride.applicability)}
        </div>
        <p class="mt-4 text-sm leading-6 text-slate-600">${selected.description}</p>
        <label for="companyCaseNote" class="mt-5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Note entreprise locale</label>
        <textarea id="companyCaseNote" data-case-note="${selected.id}" rows="7" class="mt-2 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100" placeholder="Note interne, arbitrage, point a confirmer...">${escapeHtml(selectedOverride.note)}</textarea>
        <p class="mt-2 text-xs leading-5 text-slate-500">Stockee dans .company-local/case-settings.json en local, avec fallback navigateur si l'app est publiee sans serveur local.</p>
        <button data-case="${selected.id}" class="case-card mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50">Ouvrir la fiche du cas</button>
      </aside>
    </section>
  `;
}

function renderCaseManagementRow(item, state) {
  const override = caseOverrideFor(item, state.caseOverrides);
  const selected = item.id === state.managerCaseId;
  return `
    <tr class="${selected ? "bg-indigo-50/60" : "bg-white"}">
      <td class="px-3 py-3">
        <button type="button" data-manager-case="${item.id}" class="manager-case-select rounded-lg border ${selected ? "border-indigo-300 bg-white text-indigo-700" : "border-slate-200 bg-white text-slate-600"} px-3 py-2 text-xs font-semibold hover:border-indigo-200 hover:bg-indigo-50">${selected ? "Selectionne" : "Choisir"}</button>
      </td>
      <td class="px-3 py-3">
        <p class="font-semibold text-slate-900">#${String(item.id).padStart(2, "0")} - ${item.afnorCase}</p>
        <p class="mt-1 max-w-xl text-xs leading-5 text-slate-600">${item.title}</p>
      </td>
      <td class="px-3 py-3">
        <span class="inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${toneFor(item.category)}">${categories.find((cat) => cat.id === item.category)?.label || item.category}</span>
      </td>
      <td class="px-3 py-3">
        <select data-case-color="${item.id}" class="case-color-select rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          ${caseColorOptions.map((option) => `<option value="${option.id}" ${override.tone === option.id ? "selected" : ""}>${option.label}</option>`).join("")}
        </select>
      </td>
      <td class="px-3 py-3">
        <select data-case-applicability="${item.id}" class="case-applicability-select rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          ${caseApplicabilityOptions.map((option) => `<option value="${option.id}" ${override.applicability === option.id ? "selected" : ""}>${option.label}</option>`).join("")}
        </select>
      </td>
      <td class="px-3 py-3">
        <button type="button" data-manager-case="${item.id}" class="manager-case-select max-w-48 truncate rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50">
          ${override.note ? escapeHtml(override.note) : "Ajouter une note"}
        </button>
      </td>
    </tr>
  `;
}

function renderApplicabilityBadge(applicability, extraClass = "") {
  const map = {
    applicable: ["Applicable entreprise", "border-emerald-200 bg-emerald-50 text-emerald-700"],
    review: ["A verifier", "border-amber-200 bg-amber-50 text-amber-700"],
    "not-applicable": ["Non coche", "border-slate-200 bg-slate-50 text-slate-500"]
  };
  const [label, classes] = map[applicability] || map["not-applicable"];
  return `<span class="${extraClass} inline-flex rounded-md border px-2 py-1 text-[11px] font-semibold ${classes}">${label}</span>`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function renderDatasets() {
  const datasetCards = [
    ["invoice", "BT e-invoicing", 1],
    ["reporting", "E-reporting TT/TG/TB", 8],
    ["status", "Cycle de vie statuts", 22],
    ["annuaire", "Annuaire routage", 37]
  ];
  return `
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      ${datasetCards
        .map(([kind, title, caseId]) => {
          const pack = tableRowsForCase(cases.find((item) => item.id === caseId));
          return `
            <button data-table-case="${caseId}" class="table-entry rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
              <p class="text-xs font-semibold uppercase tracking-wider text-indigo-600">${kind}</p>
              <h2 class="mt-2 text-lg font-bold text-slate-950">${title}</h2>
              <p class="mt-2 text-sm text-slate-600">${pack.rows.length} lignes officielles connectees depuis le JSON issu d'Excel.</p>
            </button>
          `;
        })
        .join("")}
    </section>
  `;
}

function renderTraining() {
  return `
    <section class="grid gap-4 md:grid-cols-2">
      ${trainingExpectations
        .map(
          (item) => `
            <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 class="text-lg font-bold text-slate-950">${item.title}</h2>
              <div class="mt-3 flex flex-wrap gap-2">
                ${item.matchedContextIds
                  .map((id) => {
                    const ctx = contextById(id);
                    return `<button data-context="${id}" class="context-card rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50">${ctx?.title || id}</button>`;
                  })
                  .join("")}
              </div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function buildContextModal(selectedContext) {
  if (!selectedContext) return `<div id="contextModal" class="hidden"></div>`;
  const matched = casesByIds(selectedContext.matchedCaseIds);
  const references = contextSourceReferences(selectedContext);
  return `
    <div id="contextModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <article class="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div class="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="rounded-md border px-2 py-1 text-xs font-semibold ${statusTone(selectedContext.applicability)}">${selectedContext.applicability}</span>
              <h2 class="mt-2 text-2xl font-bold text-slate-950">${selectedContext.title}</h2>
              <p class="mt-1 text-sm text-slate-500">${selectedContext.domain} - Priorite ${selectedContext.priority}</p>
            </div>
            <button id="closeContextModal" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Fermer</button>
          </div>
        </div>
        <div class="grid gap-5 px-6 py-6 lg:grid-cols-2">
          <section class="lg:col-span-2 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <h3 class="text-lg font-semibold text-indigo-950">Explication</h3>
            <p class="mt-2 text-sm leading-6 text-indigo-800">${selectedContext.explanation}</p>
          </section>
          <section class="rounded-xl border border-slate-200 bg-white p-4">
            <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Obligations</h3>
            <ul class="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">${listHtml(selectedContext.obligations)}</ul>
          </section>
          <section class="rounded-xl border border-slate-200 bg-white p-4">
            <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Hierarchie des donnees</h3>
            <ol class="mt-2 space-y-2 text-sm text-slate-700">${selectedContext.hierarchy.map((item, index) => `<li><span class="font-semibold text-slate-900">${index + 1}.</span> ${item}</li>`).join("")}</ol>
          </section>
          <section class="rounded-xl border border-slate-200 bg-white p-4">
            <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Exemple concret</h3>
            <p class="mt-2 text-sm leading-6 text-slate-700">${selectedContext.example}</p>
          </section>
          <section class="rounded-xl border border-slate-200 bg-white p-4">
            <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Actions ERP</h3>
            <ul class="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">${listHtml(selectedContext.erpActions)}</ul>
          </section>
          <section class="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">Cas de reforme associes</h3>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              ${matched
                .map((item) => {
                  const primaryReference = primaryReferenceForCase(item);
                  const annexAReference = annexAReferenceForCase(item);
                  return `
                    <button data-case="${item.id}" class="case-card rounded-lg border border-slate-200 bg-white p-3 text-left hover:border-indigo-200 hover:bg-indigo-50">
                      <p class="text-xs font-semibold text-slate-400">Cas #${item.id}</p>
                      <p class="mt-1 text-sm font-semibold text-slate-900">${item.title}</p>
                      <p class="mt-1 text-xs text-slate-600">${item.type}</p>
                      ${primaryReference ? `<p class="mt-2 text-[11px] text-slate-500">${formatPrimaryReferencePath(primaryReference)}</p>` : ""}
                      ${annexAReference ? `<p class="mt-1 text-[11px] font-semibold text-amber-700">Annexe A: ${annexAReference.afnorCase} - ${annexAReference.pageLabel}</p>` : ""}
                    </button>
                  `;
                })
                .join("")}
            </div>
          </section>
          <section class="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
            <h3 class="text-sm font-bold uppercase tracking-wide text-slate-500">References documentaires locales et officielles</h3>
            <div class="mt-3 grid gap-3">
              ${renderSourceReferenceCards(references)}
            </div>
          </section>
        </div>
      </article>
    </div>
  `;
}

function buildCaseModal(selectedCase, state) {
  if (!selectedCase) return `<div id="caseModal" class="hidden"></div>`;
  const table = tableRowsForCase(selectedCase);
  const hierarchy = hierarchyForCase(selectedCase);
  const sourceReferences = allCaseSourceReferences(selectedCase);
  const primaryReference = primaryReferenceForCase(selectedCase);
  const override = caseOverrideFor(selectedCase, state.caseOverrides);
  return `
    <div id="caseModal" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <article class="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div class="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${toneFor(selectedCase.category)}">${selectedCase.type}</span>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">${selectedCase.title}</h2>
            </div>
            <button id="closeCaseModal" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Fermer</button>
          </div>
        </div>
        <div class="space-y-6 px-6 py-6">
          <section class="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 class="mb-2 text-lg font-semibold text-amber-950">Important — source d'autorité</h3>
            <p class="text-sm leading-relaxed text-amber-900">
              Les textes <span class="font-semibold">Explication</span>, <span class="font-semibold">Exemple</span> et <span class="font-semibold">Impact ERP</span> sont des
              <span class="font-semibold">synthèses locales</span> destinées à faciliter la lecture. La référence normative à privilégier est la
              <span class="font-semibold">fiche AFNOR Annexe A</span> (lien ci-dessous).
            </p>
          </section>
          <section><h3 class="mb-2 text-lg font-semibold text-slate-900">Explication (synthèse)</h3><p class="text-sm leading-relaxed text-slate-700">${selectedCase.description}</p></section>
          <section class="rounded-xl border border-indigo-200 bg-indigo-50 p-4"><h3 class="mb-2 text-lg font-semibold text-indigo-900">Exemple concret (illustratif)</h3><p class="text-sm leading-relaxed text-indigo-800">${selectedCase.example}</p></section>
          ${renderCompanyCaseNoteSection(override)}
          ${renderPrimaryReferenceSection(primaryReference)}
          ${renderWikiCaseSection(selectedCase, primaryReference)}
          ${renderCaseHierarchySection(hierarchy, table, selectedCase)}
          <section>
            <h3 class="mb-2 text-lg font-semibold text-slate-900">Impact ERP</h3>
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-xl border border-slate-200 bg-white p-3"><p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Format</p><p class="mt-1 text-sm text-slate-700">${selectedCase.format}</p></div>
              <div class="rounded-xl border border-slate-200 bg-white p-3"><p class="text-xs font-semibold uppercase tracking-wide text-slate-500">ERP</p><p class="mt-1 text-sm text-slate-700">${selectedCase.erp}</p></div>
            </div>
          </section>
          <section>
            <h3 class="mb-2 text-lg font-semibold text-slate-900">Fichiers de reference locaux et liens officiels</h3>
            <div class="grid gap-3">
              ${renderSourceReferenceCards(sourceReferences)}
            </div>
          </section>
        </div>
      </article>
    </div>
  `;
}

function buildTableModal(selectedTableCase, tablePack) {
  if (!selectedTableCase || !tablePack) return `<div id="tableModal" class="hidden"></div>`;
  return `
    <div id="tableModal" class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <article class="max-h-[94vh] w-full max-w-6xl overflow-auto rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
          <div><span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">${tablePack.kind.toUpperCase()}</span><h2 class="mt-2 text-xl font-bold text-slate-900">Table officielle - ${selectedTableCase.title}</h2></div>
          <button id="closeTableModal" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Fermer</button>
        </div>
        <div class="p-6">${renderSaaSTable(tablePack.kind, tablePack.rows)}</div>
      </article>
    </div>
  `;
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key];
    acc[value] ||= [];
    acc[value].push(item);
    return acc;
  }, {});
}

function renderSourceReferenceCards(items) {
  if (!items.length) {
    return `<div class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">Aucune reference documentaire n'est disponible pour ce cas.</div>`;
  }

  return items
    .map((item) => {
      const reference = item.reference;
      const hasLocal = Boolean(reference?.localExists && reference?.localUrl);
      const localLabel = reference?.localPageLabel || "Document local";
      const localPath = reference?.localRelativePath || item.local || "";
      const excerpt = reference?.excerpt || "Aucun extrait local n'est disponible pour cette source.";
      return `
        <article class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">${item.type}</span>
                <span class="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600">${hasLocal ? "Local disponible" : "Lien officiel"}</span>
                ${hasLocal ? `<span class="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600">${localLabel}</span>` : ""}
              </div>
              <h4 class="mt-2 text-sm font-bold text-slate-900">${item.label}</h4>
              <p class="mt-2 break-all text-xs text-slate-500">${hasLocal ? localPath : item.url}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              ${hasLocal ? `<a href="${readableLocalUrl(reference.localUrl, item.label)}" target="_blank" rel="noreferrer" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50">Ouvrir le fichier local</a>` : ""}
              <a href="${item.url}" target="_blank" rel="noreferrer" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50">Ouvrir le lien officiel</a>
            </div>
          </div>
          <div class="mt-3 rounded-lg border border-slate-200 bg-white p-3">
            <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Extrait local charge</p>
            <p class="mt-2 text-sm leading-6 text-slate-700">${excerpt}</p>
          </div>
        </article>
      `;
    })
    .join("");
}
