import { Download, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import HistoryTable from "../components/ui/HistoryTable";
import { useAgriData } from "../contexts/AgriDataContext";

function HistoryPage() {
  const { plantAnalysis } = useAgriData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [disease, setDisease] = useState("all");

  const diseases = useMemo(
    () => ["all", ...new Set(plantAnalysis.map((item) => item.disease_name))],
    [plantAnalysis],
  );

  const filteredRows = useMemo(
    () =>
      plantAnalysis.filter((row) => {
        const matchesQuery =
          !query ||
          row.disease_name.toLowerCase().includes(query.toLowerCase()) ||
          row.suggestion.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status === "all" || row.health_status.toLowerCase() === status;
        const matchesDisease = disease === "all" || row.disease_name === disease;
        return matchesQuery && matchesStatus && matchesDisease;
      }),
    [plantAnalysis, query, status, disease],
  );

  return (
    <div className="space-y-6">
      <div className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">History</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Plant analysis records stored in Supabase</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft lg:grid-cols-[1fr_0.7fr_0.7fr]">
        <label className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white px-4 py-3">
          <Search className="h-4 w-4 text-primary-dark" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search disease name or suggestion"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white px-4 py-3">
          <Filter className="h-4 w-4 text-primary-dark" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full bg-transparent text-sm outline-none">
            <option value="all">All status</option>
            <option value="healthy">Healthy</option>
            <option value="diseased">Diseased</option>
          </select>
        </label>
        <select
          value={disease}
          onChange={(event) => setDisease(event.target.value)}
          className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm outline-none"
        >
          {diseases.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All disease types" : option}
            </option>
          ))}
        </select>
      </div>

      <HistoryTable rows={filteredRows} />
    </div>
  );
}

export default HistoryPage;
