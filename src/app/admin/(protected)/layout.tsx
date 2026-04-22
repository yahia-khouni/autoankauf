import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth-utils";
import SessionProvider from "@/components/admin/SessionProvider";
import AdminShell from "@/components/admin/AdminShell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const adminName = session.user?.name ?? session.user?.email ?? "Admin";

  return (
    <SessionProvider>
      <AdminShell adminName={adminName}>{children}</AdminShell>
    </SessionProvider>
  );
}
