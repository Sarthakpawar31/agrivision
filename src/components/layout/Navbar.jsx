import { Bell, Menu, Search, Wifi, WifiOff } from "lucide-react";
import NotificationPanel from "../ui/NotificationPanel";
import StatusBadge from "../ui/StatusBadge";
import { useAgriData } from "../../contexts/AgriDataContext";
import { useAuth } from "../../contexts/AuthContext";

function Navbar({ onMenuClick }) {
  const { user, profile } = useAuth();
  const { latestRobotStatus, notifications, meta } = useAgriData();
  const isOnline = latestRobotStatus?.connection_status === "online";

  return (
    <header className="glass-panel sticky top-4 z-30 rounded-[30px] border border-white/70 px-4 py-4 shadow-soft sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-2xl border border-primary/10 p-2 text-primary-dark md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Smart Plant Disease Detection Using AI, IoT and Robotics
            </p>
            <h1 className="text-2xl font-bold text-slate-900">AgriVision AI Command Center</h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white/80 px-4 py-3">
            <Search className="h-4 w-4 text-primary-dark" />
            <input
              type="text"
              placeholder="Search crops, alerts, disease records..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none sm:w-72"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 xl:flex">
              {isOnline ? <Wifi className="h-4 w-4 text-primary" /> : <WifiOff className="h-4 w-4 text-danger" />}
              <span>Robot {isOnline ? "Online" : "Offline"}</span>
              <StatusBadge
                label={meta.mode === "live" ? "Live" : "Demo"}
                tone={meta.mode === "live" ? "success" : "warning"}
              />
            </div>
            <NotificationPanel items={notifications} />
            <div className="hidden rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-right md:block">
              <p className="text-sm font-bold text-slate-900">
                {profile?.full_name || user?.user_metadata?.full_name || user?.name || "Project User"}
              </p>
              <p className="text-xs text-slate-500">{user?.email || "demo@agrivision.ai"}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 text-sm font-bold text-white shadow-soft">
              {(profile?.full_name || user?.user_metadata?.full_name || user?.name || "A")
                .slice(0, 1)
                .toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
