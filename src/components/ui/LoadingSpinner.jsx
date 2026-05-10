function LoadingSpinner({ title = "Loading", message = "Please wait..." }) {
  return (
    <div className="rounded-[30px] border border-white/70 bg-white/85 px-8 py-7 text-center shadow-soft backdrop-blur-xl">
      <div className="mx-auto h-14 w-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
