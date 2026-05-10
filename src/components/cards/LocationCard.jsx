import { MapPinned, Navigation } from "lucide-react";
import { formatDateTime, formatNumber } from "../../lib/utils";
import StatusBadge from "../common/StatusBadge";

function LocationCard({ record }) {
  if (!record) return null;

  const tone =
    String(record.status).toLowerCase().includes("active") ||
    String(record.status).toLowerCase().includes("online")
      ? "success"
      : "warning";

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Robot location
          </p>
          <h3 className="mt-3 text-2xl font-bold text-ink">
            {formatNumber(record.latitude, 5)}, {formatNumber(record.longitude, 5)}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Last updated {formatDateTime(record.created_at)}
          </p>
        </div>
        <div className="rounded-3xl bg-primary-light p-3 text-primary-dark">
          <MapPinned className="h-7 w-7" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between rounded-3xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Navigation className="h-4 w-4" />
          Location status
        </div>
        <StatusBadge label={record.status || "Unknown"} tone={tone} />
      </div>
    </div>
  );
}

export default LocationCard;
