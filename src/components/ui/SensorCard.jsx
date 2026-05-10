import StatusBadge from "./StatusBadge";

function SensorCard({ icon: Icon, label, value, unit, status, helper }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/88 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="rounded-3xl bg-primary-light p-3 text-primary-dark">
          <Icon className="h-5 w-5" />
        </div>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>
      <h3 className="mt-2 text-4xl font-bold text-slate-900">
        {value}
        <span className="ml-2 text-lg font-medium text-slate-400">{unit}</span>
      </h3>
      <p className="mt-3 text-sm text-slate-500">{helper}</p>
    </div>
  );
}

export default SensorCard;
