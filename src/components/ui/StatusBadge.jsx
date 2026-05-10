import { cn } from "../../lib/utils";

const toneMap = {
  success: "bg-primary-light text-primary-dark border-primary/15",
  danger: "bg-rose-50 text-danger border-danger/10",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
};

function StatusBadge({ label, tone = "neutral" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        toneMap[tone] || toneMap.neutral,
      )}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
