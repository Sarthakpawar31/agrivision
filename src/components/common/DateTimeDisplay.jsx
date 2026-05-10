import { formatDateTime } from "../../lib/utils";
import { useLiveClock } from "../../hooks/useLiveClock";

function DateTimeDisplay({ label = "Current IST Time" }) {
  const now = useLiveClock();

  return (
    <div className="rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-ink">{formatDateTime(now)}</p>
    </div>
  );
}

export default DateTimeDisplay;
