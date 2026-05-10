import { cn } from "../../lib/utils";

const toneStyles = {
  success: "bg-primary/10 text-primary-dark ring-primary/20",
  danger: "bg-danger/10 text-danger ring-danger/20",
  warning: "bg-warning/20 text-amber-800 ring-amber-200",
  neutral: "bg-slate-100 text-slate-600 ring-slate-200",
};

function StatusBadge({ label, tone = "neutral", className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        toneStyles[tone] ?? toneStyles.neutral,
        className,
      )}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
