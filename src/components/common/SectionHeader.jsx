function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="overflow-hidden rounded-[34px] border border-white/70 bg-white/85 p-6 shadow-soft sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative">
          <div className="absolute -left-12 top-0 h-24 w-24 rounded-full bg-primary-light/70 blur-2xl" />
          <div className="absolute left-28 top-8 h-16 w-16 rounded-full bg-primary/10 blur-xl" />
          <div className="relative">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>
        ) : null}
            <h1 className="mt-2 max-w-3xl text-3xl font-bold text-ink sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {action}
      </div>
    </div>
  );
}

export default SectionHeader;
