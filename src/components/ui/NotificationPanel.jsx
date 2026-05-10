import { BellDot } from "lucide-react";
import StatusBadge from "./StatusBadge";

function NotificationPanel({ items }) {
  return (
    <div className="relative hidden rounded-2xl border border-primary/10 bg-white/80 p-3 lg:block">
      <BellDot className="h-5 w-5 text-primary-dark" />
      {items?.length ? (
        <div className="absolute right-0 top-14 z-20 hidden w-80 rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-card group-hover:block" />
      ) : null}
      <div className="absolute right-0 top-14 z-20 hidden w-80 rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-card xl:block">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-900">Notifications</p>
          <StatusBadge label={`${items.length} alerts`} tone="warning" />
        </div>
        <div className="mt-4 space-y-3">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationPanel;
