import { renderCasesChart } from "./chart.js";
import { caseChartData, initialState } from "./model.js";
import { buildAppHtml } from "./view.js";

export class FactureExplorerApp {
  constructor(root) {
    this.root = root;
    this.state = { ...initialState };
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
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

    const search = this.root.querySelector("#searchInput");
    if (search) {
      search.addEventListener("input", (event) => this.setState({ query: event.target.value }));
    }

    this.onEach(".case-card", (card) => this.setState({ selectedCaseId: Number(card.dataset.case), selectedContextId: null }));
    this.onEach(".context-card", (card) => this.setState({ selectedContextId: card.dataset.context }));

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
}
