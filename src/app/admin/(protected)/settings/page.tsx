import { getAdminSession } from "@/lib/auth-utils";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import CarCatalogManager from "@/components/admin/CarCatalogManager";

export default async function SettingsPage() {
  const session = await getAdminSession();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Einstellungen
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Konto und Formularoptionen zentral verwalten.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              Kontoinformationen
            </h2>
            <p className="mt-1 text-xs text-slate-500">Ihr aktuelles Admin-Profil.</p>
          </div>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Name
              </dt>
              <dd className="mt-0.5 text-sm text-slate-700">
                {session?.user?.name ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                E-Mail
              </dt>
              <dd className="mt-0.5 text-sm text-slate-700">
                {session?.user?.email ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Rolle
              </dt>
              <dd className="mt-0.5 text-sm text-slate-700">
                {(session?.user as { role?: string })?.role ?? "ADMIN"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Change Password */}
        <ChangePasswordForm />
      </div>

      <CarCatalogManager />
    </div>
  );
}
