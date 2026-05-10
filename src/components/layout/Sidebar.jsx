import {
  Activity,
  BarChart3,
  History,
  LayoutDashboard,
  LogOut,
  MapPinned,
  MenuSquare,
  Microscope,
  Settings,
  Sprout,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { label: "Plant Analysis", to: "/app/analysis", icon: Microscope },
  { label: "Sensor Data", to: "/app/sensors", icon: BarChart3 },
  { label: "GPS Location", to: "/app/location", icon: MapPinned },
  { label: "History", to: "/app/history", icon: History },
  { label: "Robot Status", to: "/app/control", icon: Activity },
  { label: "Settings", to: "/app/settings", icon: Settings },
];

function Sidebar({ mobileOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/login");
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-primary-dark/40 backdrop-blur-sm transition md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[300px] flex-col border-r border-white/15 bg-primary-dark/95 px-6 py-6 text-white shadow-2xl backdrop-blur-xl transition md:sticky md:z-20 md:w-72 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="rounded-3xl bg-white/10 p-3 shadow-soft">
              <Sprout className="h-6 w-6 text-primary-light" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold">AgriVision AI</p>
              <p className="text-[11px] uppercase tracking-[0.32em] text-emerald-100/70">
                Smart robot dashboard
              </p>
            </div>
          </NavLink>
          <button
            type="button"
            className="rounded-2xl border border-white/10 p-2 text-white md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-300/15 p-3 text-emerald-100">
              <MenuSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Mission</p>
              <p className="text-sm font-semibold text-white">
                AI crop diagnosis with live field telemetry
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-white text-primary-dark shadow-soft"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-[28px] border border-emerald-300/15 bg-gradient-to-br from-white/10 to-emerald-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">Project note</p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Built to present disease prediction, sensor intelligence, and robot mobility in one
              polished student-ready interface.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
