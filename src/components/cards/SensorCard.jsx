import StatusBadge from "../common/StatusBadge";

function SensorCard({ icon: Icon, label, value, unit, status, accent = "from-primary/20 to-primary/5" }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className={`rounded-3xl bg-gradient-to-br ${accent} p-4`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <h3 className="mt-4 text-4xl font-bold text-ink">
              {value}
              <span className="ml-2 text-base font-medium text-slate-400">{unit}</span>
            </h3>
          </div>
          <div className="rounded-2xl bg-white/90 p-3 text-primary-dark shadow-sm">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Status</span>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>
    </div>
  );
}

export default SensorCard;
