"use client";

import { useState } from "react";
import { signIn, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ClipboardList, MapPinned, Gauge, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Ungültige E-Mail oder Passwort.");
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Left panel ── */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0f172a] p-12 lg:flex">
        {/* Gradient orbs — no grid, just smooth depth */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-indigo-700 opacity-20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-violet-700 opacity-15 blur-[100px]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-900/60">
            <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-400">Admin</span>
            <span className="text-lg font-extrabold tracking-tight text-white">Auto<span className="text-indigo-300">ankauf</span></span>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Admin-Bereich
          </span>
          <h2 className="mt-5 text-[2.6rem] font-extrabold leading-[1.15] tracking-tight text-white">
            Leads verwalten.<br />
            <span className="text-indigo-400">Verkäufe</span> abschließen.
          </h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-slate-400">
            Ihr zentrales Dashboard für alle Fahrzeugankauf-Anfragen in Deutschland — übersichtlich, schnell, effizient.
          </p>

          {/* Feature list */}
          <ul className="mt-8 space-y-3">
            {[
              {
                icon: ClipboardList,
                text: "Leads in Echtzeit verfolgen",
                iconColor: "text-sky-300",
                iconBg: "bg-sky-500/15",
              },
              {
                icon: MapPinned,
                text: "Anfragen nach Standort filtern",
                iconColor: "text-emerald-300",
                iconBg: "bg-emerald-500/15",
              },
              {
                icon: Gauge,
                text: "Schnelle Statusverwaltung",
                iconColor: "text-amber-300",
                iconBg: "bg-amber-500/15",
              },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}>
                  <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                </span>
                <span className="text-sm text-slate-300">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats row */}
        <div className="relative z-10">
          <div className="mb-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <div className="flex gap-8">
            {[
              { label: "Städte", value: "180+" },
              { label: "Abschlussrate", value: "94%" },
              { label: "Ø Reaktionszeit", value: "2 Std" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow shadow-indigo-200">
            <ShieldCheck className="h-4 w-4 text-white" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-indigo-500">Admin</span>
            <span className="text-base font-extrabold tracking-tight text-slate-800">Auto<span className="text-indigo-600">ankauf</span></span>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Willkommen zurück</h1>
            <p className="mt-1 text-sm text-slate-500">
              Melden Sie sich in Ihrem Admin-Konto an.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="admin@autoankauf.de"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <svg className="h-4 w-4 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Wird angemeldet…
                </span>
              ) : (
                "Anmelden"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <SessionProvider>
      <LoginForm />
    </SessionProvider>
  );
}