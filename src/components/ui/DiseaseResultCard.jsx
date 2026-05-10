import { AlertTriangle, ShieldCheck, Syringe } from "lucide-react";
import StatusBadge from "./StatusBadge";

function DiseaseResultCard({ record }) {
  if (!record) return null;

  const healthy = record.health_status?.toLowerCase() === "healthy";

  return (
    <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Prediction Result
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{record.disease_name}</h2>
          <p className="mt-2 text-sm text-slate-500">
            Confidence: {record.confidence}% • Analysed at {record.created_at_label}
          </p>
        </div>
        <StatusBadge label={record.health_status} tone={healthy ? "success" : "danger"} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] bg-primary-light/60 p-4">
          <div className="flex items-center gap-2 text-primary-dark">
            <AlertTriangle className="h-5 w-5" />
            <p className="font-semibold">Health Summary</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{record.summary}</p>
        </div>
        <div className="rounded-[24px] bg-white p-4 ring-1 ring-primary/10">
          <div className="flex items-center gap-2 text-primary-dark">
            <Syringe className="h-5 w-5" />
            <p className="font-semibold">Fertilizer / Pesticide</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{record.suggestion}</p>
        </div>
        <div className="rounded-[24px] bg-white p-4 ring-1 ring-primary/10">
          <div className="flex items-center gap-2 text-primary-dark">
            <ShieldCheck className="h-5 w-5" />
            <p className="font-semibold">Prevention Tips</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{record.prevention_tips}</p>
        </div>
      </div>
    </div>
  );
}

export default DiseaseResultCard;
