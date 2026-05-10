import { BellRing, Database, Shield, UserCircle2 } from "lucide-react";
import StatusBadge from "../components/ui/StatusBadge";
import { useAgriData } from "../contexts/AgriDataContext";
import { useAuth } from "../contexts/AuthContext";

function SettingsPage() {
  const { profile, user, isConfigured } = useAuth();
  const { meta } = useAgriData();

  return (
    <div className="space-y-6">
      <div className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">Profile / Settings</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage account, alerts, and integration mode</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
          <UserCircle2 className="h-7 w-7 text-primary-dark" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Profile</h2>
          <p className="mt-3 text-sm text-slate-500">Name: {profile?.full_name || user?.name || "Demo User"}</p>
          <p className="mt-1 text-sm text-slate-500">Email: {profile?.email || user?.email}</p>
        </div>
        <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
          <Database className="h-7 w-7 text-primary-dark" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Data Mode</h2>
          <p className="mt-3 text-sm text-slate-500">Current source: {meta.mode === "live" ? "Supabase Live" : "Demo Sample Data"}</p>
          <div className="mt-4">
            <StatusBadge label={isConfigured ? "Supabase Configured" : "Supabase Not Configured"} tone={isConfigured ? "success" : "warning"} />
          </div>
        </div>
        <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
          <BellRing className="h-7 w-7 text-primary-dark" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Alerts</h2>
          <p className="mt-3 text-sm text-slate-500">Notifications are prepared for disease alerts, sensor anomalies, and robot connectivity changes.</p>
        </div>
      </div>

      <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary-dark" />
          <h2 className="text-2xl font-bold text-slate-900">Project Settings Summary</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Theme: Green & white premium dashboard",
            "Realtime layer: Supabase or mock fallback",
            "Authentication: Supabase Auth or demo local mode",
            "Map engine: React Leaflet with OpenStreetMap",
          ].map((item) => (
            <div key={item} className="rounded-[22px] bg-primary-light/60 p-4 text-sm font-semibold text-primary-dark">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
