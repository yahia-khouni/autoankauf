"use client";

import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

interface AdminTopbarProps {
  adminName: string;
}

export default function AdminTopbar({ adminName }: AdminTopbarProps) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
            <User className="h-3.5 w-3.5" />
          </span>
          <span className="font-medium">{adminName}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <LogOut className="h-4 w-4" />
          Abmelden
        </button>
      </div>
    </header>
  );
}
