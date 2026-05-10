import {
  ArrowRight,
  Bot,
  Cpu,
  Leaf,
  MapPinned,
  Microscope,
  ShieldCheck,
  Sprout,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardSections } from "../config/navigation";

const features = [
  {
    icon: Microscope,
    title: "Plant Disease Prediction",
    text: "Raspberry Pi images are analyzed by an ML model to detect disease type, confidence, and plant health status.",
  },
  {
    icon: Waves,
    title: "Live Sensor Monitoring",
    text: "Temperature, humidity, soil moisture, and environmental trends stay visible through clean analytics cards and charts.",
  },
  {
    icon: MapPinned,
    title: "GPS Robot Tracking",
    text: "Monitor the robot path, latest coordinates, and last update time on a responsive live map.",
  },
  {
    icon: Bot,
    title: "Robot Control Room",
    text: "Track battery, camera, DHT11, GPS, and Raspberry Pi connection status from one polished dashboard.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-canvas text-slate-900">
      <div className="absolute inset-0 bg-orchard-pattern opacity-80" />
      <section className="relative isolate">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8 lg:pb-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-primary-dark p-3 text-white shadow-soft">
                <Sprout className="h-7 w-7" />
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary-dark">AgriVision AI</p>
                <p className="text-xs uppercase tracking-[0.34em] text-primary">
                  Plant Disease Prediction & Smart Agriculture Robot Dashboard
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="rounded-full border border-primary/15 bg-white/85 px-5 py-3 text-sm font-semibold text-primary-dark transition hover:border-primary/30"
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

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-dark">
                <Leaf className="h-4 w-4" />
                Smart Plant Disease Detection Using AI, IoT and Robotics
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight text-primary-dark md:text-6xl">
                Premium agriculture intelligence for your field robot mission.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                AgriVision AI connects Raspberry Pi image capture, IoT sensor streams, GPS movement,
                ML disease prediction, and Supabase history into one futuristic green dashboard.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-card transition hover:bg-primary-dark"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/app/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-white/85 px-7 py-4 text-sm font-semibold text-primary-dark transition hover:border-primary/35"
                >
                  View Dashboard
                </Link>
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[38px] border border-white/70 p-6 shadow-card">
              <div className="absolute right-5 top-5 rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-dark">
                AI + IoT + Robotics
              </div>
              <div className="mt-12 grid gap-4">
                <div className="rounded-[30px] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-white/70">Live crop mission</p>
                      <h2 className="mt-3 text-3xl font-bold">Field Robot Intelligence</h2>
                    </div>
                    <div className="rounded-3xl bg-white/15 p-4">
                      <Cpu className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[22px] bg-white/12 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">AI disease</p>
                      <p className="mt-2 text-2xl font-bold">94.2%</p>
                    </div>
                    <div className="rounded-[22px] bg-white/12 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Temperature</p>
                      <p className="mt-2 text-2xl font-bold">29.1 C</p>
                    </div>
                    <div className="rounded-[22px] bg-white/12 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Humidity</p>
                      <p className="mt-2 text-2xl font-bold">78%</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-primary/10 bg-primary-light/70 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-primary-dark/70">How it works</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Capture image, detect disease, store results, and stream live field readings.
                    </p>
                  </div>
                  <div className="rounded-[28px] border border-primary/10 bg-white p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-primary-dark/70">Project-ready UI</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Clean charts, rounded cards, leaf accents, responsive panels, and presentation-quality visuals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            {dashboardSections.map((section) => (
              <div key={section.title} className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
                <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[34px] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 p-8 text-white shadow-card">
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">Features</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "Latest disease detected",
                  "Manual image upload testing",
                  "Live sensor charts",
                  "Robot movement path",
                  "History filters and search",
                  "Admin status monitoring",
                ].map((item) => (
                  <div key={item} className="rounded-[24px] bg-white/12 px-4 py-3 text-sm font-semibold">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[34px] border border-white/70 bg-white/88 p-8 shadow-soft">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">Contact</p>
              <h3 className="mt-3 text-3xl font-bold text-slate-900">Built for modern agriculture projects</h3>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                Use AgriVision AI as a polished academic project, prototype dashboard, or future-ready
                smart farming interface with Supabase, FastAPI, and Raspberry Pi integration.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary-dark">Email support</span>
                <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary-dark">API ready</span>
                <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary-dark">Responsive UI</span>
              </div>
              <div className="mt-8">
                <Link
                  to="/app/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft"
                >
                  Explore Live Dashboard
                  <ShieldCheck className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
