import { formatDate, formatNumber, formatTime } from "../../lib/utils";
import StatusBadge from "../common/StatusBadge";

function HistoryTable({ columns, rows, type }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 text-sm text-slate-600">
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-4 align-middle">
                    {renderCell(type, row, column.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderCell(type, row, key) {
  if (key === "image") {
    return row.image_url ? (
      <img
        src={row.image_url}
        alt={row.disease_name || "Plant"}
        className="h-14 w-14 rounded-2xl object-cover"
      />
    ) : (
      <div className="h-14 w-14 rounded-2xl bg-slate-100" />
    );
  }

  if (key === "date") return formatDate(row.created_at);
  if (key === "time") return formatTime(row.created_at);
  if (key === "confidence") return `${formatNumber(row.confidence, 1)}%`;

  if (type === "location" && key === "status") {
    return <StatusBadge label={row.status || "Unknown"} tone="neutral" />;
  }

  if (type === "location" && ["latitude", "longitude"].includes(key)) {
    return formatNumber(row[key], 5);
  }

  if (type === "sensor" && ["temperature", "humidity", "soil_moisture"].includes(key)) {
    return formatNumber(row[key], 1);
  }

  return row[key] || "--";
}

export default HistoryTable;
