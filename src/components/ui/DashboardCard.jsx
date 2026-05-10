import StatusBadge from "./StatusBadge";

function DashboardCard({ title, value, subtitle, icon: Icon, tone = "success" }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/88 p-5 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="rounded-3xl bg-primary-light p-3 text-primary-dark">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-5">
        <StatusBadge label={tone === "success" ? "Stable" : tone === "warning" ? "Attention" : "Alert"} tone={tone} />
      </div>
    </div>
  );
}

export default DashboardCard;
