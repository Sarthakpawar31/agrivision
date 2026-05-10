import { Camera, Leaf, ShieldAlert } from "lucide-react";
import { formatDateTime, formatNumber, healthTone } from "../../lib/utils";
import StatusBadge from "../common/StatusBadge";

function DiseaseCard({ record, compact = false }) {
  if (!record) return null;

  const healthy = String(record.health_status).toLowerCase() === "healthy";

  return (
    <div
      className={`rounded-[28px] border p-5 shadow-soft ${
        healthy
          ? "border-primary/10 bg-gradient-to-br from-white to-primary-light/40"
          : "border-danger/10 bg-gradient-to-br from-white to-red-50"
      }`}
    >
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="overflow-hidden rounded-[24px] border border-white/70 bg-slate-100 xl:w-64">
          {record.image_url ? (
            <img
              src={record.image_url}
              alt={record.disease_name || "Plant analysis"}
              className="h-56 w-full object-cover"
            />
          ) : (
            <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
              <Camera className="h-10 w-10" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Latest analysis
            </p>
            <StatusBadge
              label={record.health_status || "Unknown"}
              tone={healthTone(record.health_status)}
            />
          </div>
          <h3 className="mt-3 text-2xl font-bold text-ink">
            {record.disease_name || "Disease not available"}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Captured on {formatDateTime(record.created_at)}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-white/80 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-sm font-medium">Confidence</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-ink">
                {formatNumber(record.confidence, 1)}%
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Leaf className="h-4 w-4" />
                <span className="text-sm font-medium">Suggestion</span>
              </div>
              <p className={`mt-2 text-sm ${compact ? "max-w-xl" : ""} text-slate-600`}>
                {record.fertilizer_suggestion || "No suggestion available yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseCard;
