import Chart from "chart.js/auto";

let chartInstance = null;

export function renderCasesChart(canvas, labels, values) {
  if (!canvas) return;
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ["#4f46e5", "#0f766e", "#059669", "#d97706", "#e11d48", "#0284c7"],
          borderColor: "#f8fafc",
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 16 } }
      },
      cutout: "62%"
    }
  });
}
