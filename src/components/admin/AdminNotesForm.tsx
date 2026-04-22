"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface AdminNotesFormProps {
  leadId: string;
  initialNotes: string;
}

export default function AdminNotesForm({
  leadId,
  initialNotes,
}: AdminNotesFormProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function save(value: string) {
    setError("");
    setSaved(false);
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: value }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Fehler beim Speichern");
        return;
      }

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Netzwerkfehler.");
    } finally {
      setLoading(false);
    }
  }

  function handleBlur() {
    if (notes !== initialNotes) {
      save(notes);
    }
  }

  function handleChange(value: string) {
    setNotes(value);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-700">
          Interne Notizen
        </h2>
        {saved && (
          <span className="text-xs font-medium text-green-600">Gespeichert ✓</span>
        )}
        {loading && (
          <span className="text-xs text-slate-400">Speichern…</span>
        )}
      </div>

      <textarea
        value={notes}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        rows={5}
        placeholder="Interne Notizen zu diesem Lead…"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}

      <button
        type="button"
        onClick={() => save(notes)}
        disabled={loading}
        className="mt-3 w-full rounded-lg bg-slate-800 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
      >
        {loading ? "Speichern…" : "Manuell speichern"}
      </button>
    </div>
  );
}
