import { getAdminSession } from "@/lib/auth-utils";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function SettingsPage() {
  const session = await getAdminSession();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Einstellungen</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-700">
            Kontoinformationen
          </h2>
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
    </div>
  );
}
