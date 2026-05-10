function PlantImageCard({ imageUrl, title, description }) {
  return (
    <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Plant Capture</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{title}</h3>
        </div>
      </div>
      <div className="mt-5 overflow-hidden rounded-[26px] bg-primary-light/50">
        <img src={imageUrl} alt={title} className="h-[320px] w-full object-cover" />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export default PlantImageCard;
