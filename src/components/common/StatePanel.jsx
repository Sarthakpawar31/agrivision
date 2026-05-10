function StatePanel({ title, description, action }) {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-primary/10 bg-white/85 p-8 text-center shadow-soft sm:p-10">
      <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-primary-light/80 blur-3xl" />
      <div className="absolute -right-4 bottom-2 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute inset-0 border border-dashed border-primary/15" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          AgriCorex
        </p>
        <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">{title}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          {description}
        </p>
      {action ? <div className="mt-5">{action}</div> : null}
      </div>
    </div>
  );
}

export default StatePanel;
