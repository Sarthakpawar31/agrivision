import {
  ArrowRight,
  Bug,
  MapPinned,
  RadioTower,
  Sprout,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: RadioTower,
    title: "Real-Time Monitoring",
    description: "Live telemetry from Raspberry Pi field hardware and cloud-synced Supabase streams.",
  },
  {
    icon: Bug,
    title: "Plant Disease Detection",
    description: "Camera captures, AI disease results, and treatment suggestions in one review flow.",
  },
  {
    icon: MapPinned,
    title: "GPS Robot Tracking",
    description: "Robot path visibility with location status and fast monitoring for movement anomalies.",
  },
  {
    icon: Waves,
    title: "Sensor Data History",
    description: "Temperature, humidity, and soil moisture trends ready for presentation and analysis.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-canvas text-ink">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-hero-glow" />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8 lg:pb-28 lg:pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-primary-dark p-3 text-white shadow-soft">
                <Sprout className="h-7 w-7" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold">AgriCorex</p>
                <p className="text-xs uppercase tracking-[0.28em] text-primary">
                  Smart Agriculture Robot Dashboard
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                to="/login"
                className="rounded-full border border-primary/15 bg-white/80 px-5 py-3 text-sm font-semibold text-primary-dark transition hover:border-primary/30"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                Field robotics intelligence
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-tight text-primary-dark md:text-6xl">
                Smart Agriculture Robot Monitoring System
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Real-time crop health, robot location, and sensor monitoring using Raspberry Pi and Supabase.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/app/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-card transition hover:bg-primary-dark"
                >
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/app/analysis"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-white/85 px-7 py-4 text-sm font-semibold text-primary-dark transition hover:border-primary/35"
                >
                  View Analysis
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-12 h-24 w-24 rounded-full bg-primary-light blur-2xl" />
              <div className="absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
              <div className="glass-panel relative overflow-hidden rounded-[36px] border border-white/70 p-6 shadow-card">
                <div className="absolute right-5 top-5 rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary-dark">
                  Raspberry Pi + Supabase
                </div>
                <div className="mt-14 grid gap-4">
                  <div className="rounded-[28px] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-white/75">
                          Robot & crop sync
                        </p>
                        <h3 className="mt-3 text-3xl font-bold">Live Field Intelligence</h3>
                      </div>
                      <div className="animate-float rounded-3xl bg-white/15 p-4">
                        <Sprout className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[28px] border border-primary/10 bg-primary-light/60 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-primary-dark/70">Crop health</p>
                      <p className="mt-2 text-3xl font-bold text-primary-dark">AI</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Image analysis with disease detection confidence.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-primary/10 bg-white p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-primary-dark/70">Robot path</p>
                      <p className="mt-2 text-3xl font-bold text-primary-dark">GPS</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Accurate location monitoring with mapping and history.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-primary/10 bg-slate-50 p-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Temperature</p>
                        <p className="mt-2 text-2xl font-bold text-ink">26.8 C</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Humidity</p>
                        <p className="mt-2 text-2xl font-bold text-ink">71%</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soil Moisture</p>
                        <p className="mt-2 text-2xl font-bold text-ink">58%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[30px] border border-white/70 bg-white/85 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
