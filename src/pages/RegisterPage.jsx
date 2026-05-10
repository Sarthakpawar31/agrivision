import { Eye, EyeOff, Leaf, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password must match.");
      return;
    }

    setSubmitting(true);
    setError("");
    const { error: registerError } = await register(form);
    setSubmitting(false);
    if (registerError) {
      setError(registerError.message);
      return;
    }
    navigate("/app/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="absolute inset-0 bg-orchard-pattern opacity-80" />
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden rounded-[40px] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 p-8 text-white shadow-card lg:block">
          <div className="rounded-3xl bg-white/10 p-4 text-white inline-flex">
            <Leaf className="h-8 w-8" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold">Create your AgriVision AI account</h1>
          <p className="mt-4 max-w-md text-white/80">
            Register farmers, students, researchers, and evaluators with a clean entry point into the agriculture robot dashboard.
          </p>
        </div>

        <div className="glass-panel rounded-[40px] border border-white/70 p-8 shadow-card sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">New account</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Register and start monitoring</h2>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Full name</span>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
                placeholder="Your full name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 outline-none transition focus:border-primary"
                placeholder="you@agrivision.ai"
              />
            </label>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Password</span>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 pr-12 outline-none transition focus:border-primary"
                    placeholder="Create password"
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
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Confirm password</span>
                <div className="relative mt-2">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={form.confirmPassword}
                    onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                    className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 pr-12 outline-none transition focus:border-primary"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    onClick={() => setShowConfirm((value) => !value)}
                  >
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>
            </div>
            {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-danger">{error}</div> : null}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark disabled:opacity-70"
            >
              <UserPlus className="h-4 w-4" />
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
