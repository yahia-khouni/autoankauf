"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Car,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";

type ActiveTab = "makes" | "models";
type NoticeType = "success" | "error";

interface CarMake {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    models: number;
  };
}

interface CarModel {
  id: string;
  name: string;
  slug: string;
  makeId: string;
  yearsProduced?: string | null;
  createdAt: string;
  updatedAt: string;
  make: {
    id: string;
    name: string;
    slug: string;
  };
}

interface NoticeState {
  type: NoticeType;
  text: string;
}

interface PendingDeleteState {
  type: "make" | "model";
  id: string;
  label: string;
}

interface MakeFormState {
  id: string | null;
  name: string;
  slug: string;
  logoUrl: string;
}

interface ModelFormState {
  id: string | null;
  makeId: string;
  name: string;
  slug: string;
  yearsProduced: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyMakeForm: MakeFormState = {
  id: null,
  name: "",
  slug: "",
  logoUrl: "",
};

const emptyModelForm: ModelFormState = {
  id: null,
  makeId: "",
  name: "",
  slug: "",
  yearsProduced: "",
};

export default function CarCatalogManager() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("makes");

  const [makes, setMakes] = useState<CarMake[]>([]);
  const [models, setModels] = useState<CarModel[]>([]);

  const [makesLoading, setMakesLoading] = useState(true);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [makeSearch, setMakeSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [modelMakeFilter, setModelMakeFilter] = useState("");

  const [makeForm, setMakeForm] = useState<MakeFormState>(emptyMakeForm);
  const [modelForm, setModelForm] = useState<ModelFormState>(emptyModelForm);

  const [notice, setNotice] = useState<NoticeState | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<PendingDeleteState | null>(null);

  function showNotice(type: NoticeType, text: string) {
    setNotice({ type, text });
  }

  async function loadMakes() {
    setMakesLoading(true);
    try {
      const res = await fetch("/api/admin/cars/makes?limit=500&sort=name&order=asc", {
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Marken konnten nicht geladen werden");
      }

      setMakes(Array.isArray(data?.makes) ? data.makes : []);
    } catch (error) {
      showNotice(
        "error",
        error instanceof Error ? error.message : "Marken konnten nicht geladen werden"
      );
      setMakes([]);
    } finally {
      setMakesLoading(false);
    }
  }

  async function loadModels() {
    setModelsLoading(true);
    try {
      const res = await fetch("/api/admin/cars/models?limit=1000&sort=name&order=asc", {
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Modelle konnten nicht geladen werden");
      }

      setModels(Array.isArray(data?.models) ? data.models : []);
    } catch (error) {
      showNotice(
        "error",
        error instanceof Error ? error.message : "Modelle konnten nicht geladen werden"
      );
      setModels([]);
    } finally {
      setModelsLoading(false);
    }
  }

  useEffect(() => {
    void Promise.all([loadMakes(), loadModels()]);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!modelMakeFilter) return;
    if (!makes.some((item) => item.id === modelMakeFilter)) {
      setModelMakeFilter("");
    }
  }, [makes, modelMakeFilter]);

  const filteredMakes = useMemo(() => {
    const term = makeSearch.trim().toLowerCase();
    if (!term) return makes;
    return makes.filter(
      (item) =>
        item.name.toLowerCase().includes(term) || item.slug.toLowerCase().includes(term)
    );
  }, [makes, makeSearch]);

  const filteredModels = useMemo(() => {
    const term = modelSearch.trim().toLowerCase();

    return models.filter((item) => {
      const passMake = modelMakeFilter ? item.makeId === modelMakeFilter : true;
      const passSearch = term
        ? item.name.toLowerCase().includes(term) ||
        item.slug.toLowerCase().includes(term) ||
        item.make.name.toLowerCase().includes(term)
        : true;

      return passMake && passSearch;
    });
  }, [models, modelMakeFilter, modelSearch]);

  async function refreshAll() {
    await Promise.all([loadMakes(), loadModels()]);
  }

  function startEditMake(item: CarMake) {
    setMakeForm({
      id: item.id,
      name: item.name,
      slug: item.slug,
      logoUrl: item.logoUrl ?? "",
    });
  }

  function resetMakeForm() {
    setMakeForm(emptyMakeForm);
  }

  function startEditModel(item: CarModel) {
    setModelForm({
      id: item.id,
      makeId: item.makeId,
      name: item.name,
      slug: item.slug,
      yearsProduced: item.yearsProduced ?? "",
    });
    setActiveTab("models");
  }

  function resetModelForm() {
    setModelForm((prev) => ({ ...emptyModelForm, makeId: prev.makeId }));
  }

  async function handleMakeSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name: makeForm.name.trim(),
      slug: makeForm.slug.trim(),
      logoUrl: makeForm.logoUrl.trim(),
    };

    if (!payload.name || !payload.slug) {
      showNotice("error", "Bitte Name und Slug ausfuellen");
      return;
    }

    setSubmitLoading(true);

    try {
      const isEdit = Boolean(makeForm.id);
      const endpoint = isEdit
        ? `/api/admin/cars/makes/${makeForm.id}`
        : "/api/admin/cars/makes";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Speichern fehlgeschlagen");
      }

      showNotice("success", isEdit ? "Marke aktualisiert" : "Marke erstellt");
      resetMakeForm();
      await refreshAll();
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Speichern fehlgeschlagen");
    } finally {
      setSubmitLoading(false);
    }
  }

  function requestDeleteMake(item: CarMake) {
    setConfirmError("");
    setPendingDelete({ type: "make", id: item.id, label: item.name });
    setConfirmOpen(true);
  }

  async function handleModelSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      makeId: modelForm.makeId,
      name: modelForm.name.trim(),
      slug: modelForm.slug.trim(),
      yearsProduced: modelForm.yearsProduced.trim(),
    };

    if (!payload.makeId || !payload.name || !payload.slug) {
      showNotice("error", "Bitte Marke, Modellname und Slug ausfuellen");
      return;
    }

    setSubmitLoading(true);

    try {
      const isEdit = Boolean(modelForm.id);
      const endpoint = isEdit
        ? `/api/admin/cars/models/${modelForm.id}`
        : "/api/admin/cars/models";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Speichern fehlgeschlagen");
      }

      showNotice("success", isEdit ? "Modell aktualisiert" : "Modell erstellt");
      resetModelForm();
      await refreshAll();
    } catch (error) {
      showNotice("error", error instanceof Error ? error.message : "Speichern fehlgeschlagen");
    } finally {
      setSubmitLoading(false);
    }
  }

  function requestDeleteModel(item: CarModel) {
    setConfirmError("");
    setPendingDelete({
      type: "model",
      id: item.id,
      label: `${item.make.name} ${item.name}`,
    });
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;

    setConfirmLoading(true);
    setConfirmError("");

    try {
      const endpoint =
        pendingDelete.type === "make"
          ? `/api/admin/cars/makes/${pendingDelete.id}`
          : `/api/admin/cars/models/${pendingDelete.id}`;

      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Loeschen fehlgeschlagen");
      }

      if (pendingDelete.type === "make") {
        const removedId = pendingDelete.id;
        showNotice("success", "Marke geloescht");
        if (makeForm.id === removedId) {
          resetMakeForm();
        }
        if (modelForm.makeId === removedId) {
          setModelForm(emptyModelForm);
        }
        if (modelMakeFilter === removedId) {
          setModelMakeFilter("");
        }
      } else {
        const removedId = pendingDelete.id;
        showNotice("success", "Modell geloescht");
        if (modelForm.id === removedId) {
          resetModelForm();
        }
      }

      setConfirmOpen(false);
      setPendingDelete(null);
      await refreshAll();
    } catch (error) {
      setConfirmError(error instanceof Error ? error.message : "Loeschen fehlgeschlagen");
    } finally {
      setConfirmLoading(false);
    }
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Free-Offer-Formular: Marken und Modelle
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Verwalten Sie die Fahrzeugmarken und Modelle, die im Formular angezeigt werden.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            void refreshAll();
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Aktualisieren
        </button>
      </div>

      <div className="mb-6 flex w-full sm:w-auto sm:inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
        <button
          type="button"
          onClick={() => {
            setActiveTab("makes");
            void loadMakes();
          }}
          className={`flex-1 sm:flex-none whitespace-nowrap rounded-lg px-4 py-2 text-center text-sm font-medium transition ${activeTab === "makes"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
            }`}
        >
          Marken
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("models");
            void loadModels();
          }}
          className={`flex-1 sm:flex-none whitespace-nowrap rounded-lg px-4 py-2 text-center text-sm font-medium transition ${activeTab === "models"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
            }`}
        >
          Modelle
        </button>
      </div>

      {notice && (
        <div
          className={`mb-4 rounded-lg px-3 py-2 text-sm ${notice.type === "success"
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-red-200 bg-red-50 text-red-700"
            }`}
        >
          {notice.text}
        </div>
      )}

      {activeTab === "makes" && (
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                {makeForm.id ? "Marke bearbeiten" : "Neue Marke"}
              </h3>
              {makeForm.id && (
                <button
                  type="button"
                  onClick={resetMakeForm}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                  Zuruecksetzen
                </button>
              )}
            </div>

            <form onSubmit={handleMakeSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Name
                </label>
                <input
                  value={makeForm.name}
                  onChange={(e) =>
                    setMakeForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                      slug: prev.id ? prev.slug : slugify(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="z.B. Volkswagen"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Slug
                </label>
                <input
                  value={makeForm.slug}
                  onChange={(e) => setMakeForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="z.B. volkswagen"
                  required
                />
              </div>



              <button
                type="submit"
                disabled={submitLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {submitLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : makeForm.id ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {makeForm.id ? "Aenderungen speichern" : "Marke erstellen"}
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden min-w-0">
            <div className="border-b border-slate-100 px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={makeSearch}
                  onChange={(e) => setMakeSearch(e.target.value)}
                  placeholder="Marke suchen..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="max-h-[460px] overflow-auto">
              <table className="w-full min-w-[500px] text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Marke</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Modelle</th>
                    <th className="px-4 py-3 text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {makesLoading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                        Wird geladen...
                      </td>
                    </tr>
                  ) : filteredMakes.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                        Keine Marken gefunden
                      </td>
                    </tr>
                  ) : (
                    filteredMakes.map((item) => (
                      <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <span className="font-medium text-slate-800">{item.name}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{item.slug}</td>
                        <td className="px-4 py-3 text-slate-500">{item._count?.models ?? 0}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => startEditMake(item)}
                              className="rounded-md p-1.5 text-slate-600 transition hover:bg-slate-200"
                              title="Bearbeiten"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => requestDeleteMake(item)}
                              className="rounded-md p-1.5 text-red-600 transition hover:bg-red-50"
                              title="Loeschen"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "models" && (
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                {modelForm.id ? "Modell bearbeiten" : "Neues Modell"}
              </h3>
              {modelForm.id && (
                <button
                  type="button"
                  onClick={resetModelForm}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                  Zuruecksetzen
                </button>
              )}
            </div>

            <form onSubmit={handleModelSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Marke
                </label>
                <select
                  value={modelForm.makeId}
                  onChange={(e) => setModelForm((prev) => ({ ...prev, makeId: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  required
                >
                  <option value="">Marke waehlen</option>
                  {makes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Modellname
                </label>
                <input
                  value={modelForm.name}
                  onChange={(e) =>
                    setModelForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                      slug: prev.id ? prev.slug : slugify(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="z.B. Golf"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Slug
                </label>
                <input
                  value={modelForm.slug}
                  onChange={(e) =>
                    setModelForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="z.B. golf"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Baujahre (optional)
                </label>
                <input
                  value={modelForm.yearsProduced}
                  onChange={(e) =>
                    setModelForm((prev) => ({ ...prev, yearsProduced: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="z.B. 2012-2020"
                />
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {submitLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : modelForm.id ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {modelForm.id ? "Aenderungen speichern" : "Modell erstellen"}
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden min-w-0">
            <div className="grid gap-3 border-b border-slate-100 px-4 py-3 md:grid-cols-[1fr_220px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  placeholder="Modell suchen..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <select
                value={modelMakeFilter}
                onChange={(e) => setModelMakeFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Alle Marken</option>
                {makes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-[460px] overflow-auto">
              <table className="w-full min-w-[600px] text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Modell</th>
                    <th className="px-4 py-3">Marke</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Baujahre</th>
                    <th className="px-4 py-3 text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {modelsLoading ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        Wird geladen...
                      </td>
                    </tr>
                  ) : filteredModels.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        Keine Modelle gefunden
                      </td>
                    </tr>
                  ) : (
                    filteredModels.map((item) => (
                      <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                        <td className="px-4 py-3 text-slate-500">{item.make.name}</td>
                        <td className="px-4 py-3 text-slate-500">{item.slug}</td>
                        <td className="px-4 py-3 text-slate-500">{item.yearsProduced || "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => startEditModel(item)}
                              className="rounded-md p-1.5 text-slate-600 transition hover:bg-slate-200"
                              title="Bearbeiten"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => requestDeleteModel(item)}
                              className="rounded-md p-1.5 text-red-600 transition hover:bg-red-50"
                              title="Loeschen"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {confirmOpen &&
        pendingDelete &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => !confirmLoading && setConfirmOpen(false)}
            />

            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-800">
                    Eintrag endgueltig loeschen?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {pendingDelete.label} wird dauerhaft geloescht.
                    {pendingDelete.type === "make"
                      ? " Zugehoerige Modelle werden ebenfalls entfernt."
                      : " Diese Aktion kann nicht rueckgaengig gemacht werden."}
                  </p>
                </div>
              </div>

              {confirmError && (
                <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  {confirmError}
                </p>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  disabled={confirmLoading}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void handleConfirmDelete();
                  }}
                  disabled={confirmLoading}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                  {confirmLoading ? "Loesche..." : "Ja, loeschen"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      <div className="mt-6 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-indigo-50 px-4 py-3 text-xs text-slate-700">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
          <div>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
              Premium
            </span>
            <p className="mt-1 text-xs text-slate-700">
              Diese Einstellungen steuern direkt die Auswahlfelder fuer Marke und Modell im
              Free-Offer-Formular.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
