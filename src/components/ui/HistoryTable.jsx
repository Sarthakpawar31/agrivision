import StatusBadge from "./StatusBadge";

function HistoryTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-primary-light/50 text-sm text-primary-dark">
            <tr>
              {["Image", "Disease", "Confidence", "Temp", "Humidity", "Location", "Status", "Date", "Suggestion"].map((header) => (
                <th key={header} className="px-4 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 align-top text-sm text-slate-600">
                <td className="px-4 py-4">
                  <img src={row.image_url} alt={row.disease_name} className="h-14 w-14 rounded-2xl object-cover" />
                </td>
                <td className="px-4 py-4 font-semibold text-slate-900">{row.disease_name}</td>
                <td className="px-4 py-4">{row.confidence}%</td>
                <td className="px-4 py-4">{row.temperature} C</td>
                <td className="px-4 py-4">{row.humidity}%</td>
                <td className="px-4 py-4">
                  {row.latitude}, {row.longitude}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge
                    label={row.health_status}
                    tone={row.health_status.toLowerCase() === "healthy" ? "success" : "danger"}
                  />
                </td>
                <td className="px-4 py-4">{row.created_at_label}</td>
                <td className="px-4 py-4">{row.suggestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;
