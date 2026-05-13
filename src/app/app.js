import { renderCasesChart } from "./chart.js";
import { caseApplicabilityOptions, caseChartData, caseColorOptions, initialState } from "./model.js";
import { buildAppHtml } from "./view.js";

const STORAGE_KEY = "factureExplorerCaseOverrides";
const SETTINGS_ENDPOINT = "/api/company-case-settings";

export class FactureExplorerApp {
  constructor(root) {
    this.root = root;
    this.state = { ...initialState, caseOverrides: normalizeCaseOverrides(loadCaseOverrides()) };
    this.loadPersistedSettings();
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    if (Object.hasOwn(partial, "caseOverrides")) saveCaseOverrides(this.state.caseOverrides);
    this.render();
  }

  render() {
    this.root.className = "min-h-screen bg-slate-50 text-slate-900 antialiased";
    this.root.innerHTML = buildAppHtml(this.state);
    this.bindEvents();
    this.renderChart();
  }

  renderChart() {
    const { labels, values } = caseChartData();
    renderCasesChart(this.root.querySelector("#casesChart"), labels, values);
  }

  bindEvents() {
    this.onEach(".category-filter", (button) => this.setState({ category: button.dataset.category }));
    this.onEach("[data-view]", (button) => this.setState({ activeView: button.dataset.view }));
    this.onEach(".manager-case-select", (button) => this.setState({ managerCaseId: Number(button.dataset.managerCase) }));

    const search = this.root.querySelector("#searchInput");
    if (search) {
      search.addEventListener("input", (event) => this.setState({ query: event.target.value }));
    }

    this.onEach(".case-card", (card) => this.setState({ selectedCaseId: Number(card.dataset.case), selectedContextId: null }));
    this.onEach(".context-card", (card) => this.setState({ selectedContextId: card.dataset.context }));
    this.root.querySelectorAll(".case-color-select").forEach((select) => {
      select.addEventListener("change", (event) => {
        const id = Number(event.target.dataset.caseColor);
        this.updateCaseOverride(id, { tone: event.target.value });
      });
    });
    this.root.querySelectorAll(".case-applicability-select").forEach((select) => {
      select.addEventListener("change", (event) => {
        const id = Number(event.target.dataset.caseApplicability);
        this.updateCaseOverride(id, { applicability: event.target.value });
      });
    });
    const companyCaseNote = this.root.querySelector("#companyCaseNote");
    if (companyCaseNote) {
      companyCaseNote.addEventListener("change", (event) => {
        const id = Number(event.target.dataset.caseNote);
        this.updateCaseOverride(id, { note: event.target.value });
      });
    }

    const resetCaseManagement = this.root.querySelector("#resetCaseManagement");
    if (resetCaseManagement) {
      resetCaseManagement.addEventListener("click", () => this.setState({ caseOverrides: {} }));
    }

    const closeCase = this.root.querySelector("#closeCaseModal");
    if (closeCase) {
      closeCase.addEventListener("click", () => this.setState({ selectedCaseId: null }));
    }

    const caseModal = this.root.querySelector("#caseModal");
    if (caseModal) {
      caseModal.addEventListener("click", (event) => {
        if (event.target.id === "caseModal") this.setState({ selectedCaseId: null });
      });
    }

    const closeContext = this.root.querySelector("#closeContextModal");
    if (closeContext) {
      closeContext.addEventListener("click", () => this.setState({ selectedContextId: null }));
    }

    const contextModal = this.root.querySelector("#contextModal");
    if (contextModal) {
      contextModal.addEventListener("click", (event) => {
        if (event.target.id === "contextModal") this.setState({ selectedContextId: null });
      });
    }

    this.onEach(".table-entry", (button, event) => {
      event.stopPropagation();
      this.setState({ selectedTableCaseId: Number(button.dataset.tableCase) });
    });

    const closeTable = this.root.querySelector("#closeTableModal");
    if (closeTable) {
      closeTable.addEventListener("click", () => this.setState({ selectedTableCaseId: null }));
    }

    const tableModal = this.root.querySelector("#tableModal");
    if (tableModal) {
      tableModal.addEventListener("click", (event) => {
        if (event.target.id === "tableModal") this.setState({ selectedTableCaseId: null });
      });
    }

    document.onkeydown = (event) => {
      if (event.key !== "Escape") return;
      if (this.state.selectedTableCaseId) {
        this.setState({ selectedTableCaseId: null });
        return;
      }
      if (this.state.selectedContextId) {
        this.setState({ selectedContextId: null });
        return;
      }
      if (this.state.selectedCaseId) this.setState({ selectedCaseId: null });
    };
  }

  onEach(selector, handler) {
    this.root.querySelectorAll(selector).forEach((element) => {
      element.addEventListener("click", (event) => handler(element, event));
    });
  }

  updateCaseOverride(caseId, patch) {
    const current = this.state.caseOverrides[caseId] || {};
    const next = {
      ...this.state.caseOverrides,
      [caseId]: {
        ...current,
        ...patch
      }
    };
    this.setState({ caseOverrides: next, managerCaseId: caseId });
  }

  async loadPersistedSettings() {
    const localOverrides = this.state.caseOverrides;
    try {
      const response = await fetch(SETTINGS_ENDPOINT, { headers: { Accept: "application/json" } });
      if (!response.ok) return;
      const payload = await response.json();
      const remoteOverrides = normalizeCaseOverrides(payload.cases || {});
      if (!hasOverrides(remoteOverrides) && hasOverrides(localOverrides)) {
        saveCaseOverrides(localOverrides);
        return;
      }
      this.state = { ...this.state, caseOverrides: remoteOverrides };
      this.render();
    } catch {
      // Static publication has no local write API; localStorage remains the fallback.
    }
  }
}

function loadCaseOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCaseOverrides(value) {
  const normalized = normalizeCaseOverrides(value);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Local storage can be disabled; the app still works for the current session.
  }

  fetch(SETTINGS_ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ version: 1, cases: normalized })
  }).catch(() => {
    // The endpoint exists only in local dev/preview; published static builds just use localStorage.
  });
}

function normalizeCaseOverrides(value = {}) {
  const allowedTones = new Set(caseColorOptions.map((option) => option.id));
  const allowedApplicability = new Set(caseApplicabilityOptions.map((option) => option.id));
  return Object.fromEntries(
    Object.entries(value || {})
      .map(([key, entry]) => {
        const caseId = Number(key);
        if (!Number.isInteger(caseId) || caseId <= 0 || !entry || typeof entry !== "object") return null;
        const normalized = {};
        if (allowedTones.has(entry.tone)) normalized.tone = entry.tone;
        if (allowedApplicability.has(entry.applicability)) normalized.applicability = entry.applicability;
        if (!normalized.applicability && typeof entry.applicable === "boolean") {
          normalized.applicability = entry.applicable ? "applicable" : "not-applicable";
        }
        if (typeof entry.note === "string") normalized.note = entry.note.slice(0, 4000);
        return [String(caseId), normalized];
      })
      .filter(Boolean)
  );
}

function hasOverrides(value = {}) {
  return Object.keys(value || {}).length > 0;
}
