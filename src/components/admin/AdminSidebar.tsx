"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/settings", label: "Einstellungen", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay placeholder — sidebar collapses via CSS */}
      <aside className="hidden w-60 flex-shrink-0 flex-col bg-[#0f172a] md:flex">
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <span className="text-lg font-bold text-white">Autoankauf</span>
          <span className="ml-1 text-xs font-medium text-indigo-400">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-4">
          <p className="text-xs text-slate-500">© 2026 Autoankauf</p>
        </div>
      </aside>

      {/* Mobile top nav bar */}
      <div className="flex h-14 items-center gap-4 border-b border-slate-800 bg-[#0f172a] px-4 md:hidden">
        <span className="text-sm font-bold text-white">Autoankauf Admin</span>
        <nav className="ml-auto flex gap-2">
          {NAV_ITEMS.map(({ href, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded p-2 transition-colors",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
