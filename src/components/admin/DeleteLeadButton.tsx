"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";

interface DeleteLeadButtonProps {
  leadId: string;
  customerName?: string;
}

export default function DeleteLeadButton({
  leadId,
  customerName,
}: DeleteLeadButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastClosing, setToastClosing] = useState(false);
  const toastCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastCloseTimerRef.current) {
        clearTimeout(toastCloseTimerRef.current);
      }
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  async function handleDelete() {
    const target = customerName ? customerName : "diesen Lead";

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "DELETE",
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(payload?.error ?? "Löschen fehlgeschlagen.");
        return;
      }

      setConfirmOpen(false);
      setShowSuccessToast(true);
      setToastClosing(false);

      toastCloseTimerRef.current = setTimeout(() => {
        setToastClosing(true);
      }, 1800);

      redirectTimerRef.current = setTimeout(() => {
        setShowSuccessToast(false);
        router.push("/admin/leads");
        router.refresh();
      }, 2300);
    } catch {
      setError("Netzwerkfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-slate-700">Lead löschen</h2>
        <p className="mb-4 text-sm text-slate-500">
          Diese Aktion entfernt den Lead dauerhaft.
        </p>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 className="h-4 w-4" />
          {loading ? "Wird gelöscht..." : "Lead löschen"}
        </button>

        {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      </div>

      {confirmOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => !loading && setConfirmOpen(false)}
            />

            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-800">
                    Lead endgültig löschen?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {customerName ? `${customerName}` : "Dieser Lead"} wird dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
                  </p>
                </div>
              </div>

              {error && (
                <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  disabled={loading}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                  {loading ? "Lösche..." : "Ja, löschen"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {showSuccessToast &&
        createPortal(
          <div className="pointer-events-none fixed right-4 top-4 z-[10001]">
            <div
              className={`pointer-events-auto flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg ring-1 ring-emerald-100 duration-300 ${toastClosing
                  ? "animate-out fade-out slide-out-to-top-2"
                  : "animate-in fade-in slide-in-from-top-2"
                }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Kunde gelöscht</p>
                <p className="text-xs text-slate-500">
                  {customerName ? `${customerName} wurde erfolgreich entfernt.` : "Lead wurde erfolgreich entfernt."}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}