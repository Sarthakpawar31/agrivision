import { Eye, EyeOff, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  if (user && location.pathname === "/login") {
    return <Navigate to="/app/dashboard" replace />;
  }

  const from = location.state?.from?.pathname || "/app/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const { error: loginError } = await login(form);
    setSubmitting(false);
    if (loginError) {
      setError(loginError.message);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="absolute inset-0 bg-orchard-pattern opacity-80" />
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden rounded-[40px] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 p-8 text-white shadow-card lg:block">
          <div className="inline-flex rounded-3xl bg-white/10 p-4">
            <Sprout className="h-8 w-8 text-primary-light" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold">AgriVision AI</h1>
          <p className="mt-4 max-w-md text-white/80">
            Secure access to plant disease prediction, sensor analytics, robot tracking, and historical field records.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "Dashboard with live telemetry",
              "Responsive green glassmorphism design",
              "Supabase mode with demo fallback",
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/10 p-4 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel relative rounded-[40px] border border-white/70 p-8 shadow-card sm:p-10">
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-primary-light p-3 text-primary-dark">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Welcome back</p>
              <h2 className="text-3xl font-bold text-slate-900">Login to your dashboard</h2>
            </div>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
                placeholder="student@agrivision.ai"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Password</span>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 pr-12 outline-none transition focus:border-primary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>

            {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-danger">{error}</div> : null}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark disabled:opacity-70"
            >
              <ShieldCheck className="h-4 w-4" />
              {submitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Need an account?{" "}
            <Link to="/register" className="font-semibold text-primary">
              Register here
            </Link>
          </p>
          <p className="mt-3 text-xs text-slate-400">
            Demo mode works without Supabase configuration, so you can explore the full UI immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
