import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-canvas text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-orchard-pattern opacity-80" />
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-100 blur-3xl" />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="relative z-10 flex-1 px-4 py-4 sm:px-6 lg:px-8">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppShell;
