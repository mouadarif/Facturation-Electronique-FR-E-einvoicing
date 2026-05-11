const tableSchemas = {
  status: [
    ["id", "Code", "font-semibold text-slate-800"],
    ["label", "Libelle"],
    ["group", "Groupe"]
  ],
  annuaire: [
    ["id", "ID", "font-semibold text-slate-800"],
    ["label", "Libelle"],
    ["path", "Path", "break-all"],
    ["type", "Type"]
  ],
  reporting: [
    ["id", "ID", "font-semibold text-slate-800"],
    ["label", "Libelle"],
    ["path", "Path", "break-all"],
    ["b2c", "B2C"],
    ["b2bInternational", "B2B int."]
  ],
  invoice: [
    ["id", "BT", "font-semibold text-slate-800"],
    ["label", "Libelle"],
    ["ubl", "UBL", "break-all"],
    ["cii", "CII / Factur-X", "break-all"]
  ]
};

export function renderSaaSTable(kind, rows) {
  const schema = tableSchemas[kind] || tableSchemas.invoice;

  return `
    <div class="overflow-auto rounded-xl border border-slate-200">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-100 text-slate-700">
          <tr>${schema.map(([, label]) => `<th class="px-4 py-3 text-left font-semibold">${label}</th>`).join("")}</tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          ${rows
            .map(
              (row) => `
                <tr>
                  ${schema.map(([key, , extraClass = ""]) => `<td class="px-4 py-3 text-slate-600 ${extraClass}">${row[key] ?? ""}</td>`).join("")}
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}
