"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getYearRange } from "@/lib/utils";
import { detectLandingPageType, trackEvent } from "@/lib/analytics";
import { Loader2, CheckCircle, ChevronLeft, Car, User } from "lucide-react";

const years = getYearRange();

interface MakeOption {
  id: string;
  name: string;
}

interface ModelOption {
  id: string;
  name: string;
}

const CATALOG_REFRESH_INTERVAL_MS = 10000;

type LeadAttributionPayload = {
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPageType: string;
  locale: string;
};

function getLeadAttribution(locale: string): LeadAttributionPayload {
  if (typeof window === "undefined") {
    return {
      sourcePage: "/",
      landingPageType: "other",
      locale,
    };
  }

  const { pathname, search } = window.location;
  const params = new URLSearchParams(search);

  return {
    sourcePage: `${pathname}${search}`,
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    landingPageType: detectLandingPageType(pathname),
    locale,
  };
}

export function LeadForm() {
  const t = useTranslations("form");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [isModelsLoading, setIsModelsLoading] = useState(false);
  const [makes, setMakes] = useState<MakeOption[]>([]);
  const [models, setModels] = useState<ModelOption[]>([]);

  const contactMethods = [
    { value: "phone", label: t("phone") },
    { value: "email", label: t("email") },
    { value: "whatsapp", label: "WhatsApp" },
  ];

  const [formData, setFormData] = useState({
    makeId: "",
    modelId: "",
    year: "",
    mileage: "",
    offeredPrice: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "phone",
    notes: "",
    privacyAccepted: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => {
      if (field === "makeId") {
        return { ...prev, makeId: value as string, modelId: "" };
      }
      return { ...prev, [field]: value };
    });
  };

  useEffect(() => {
    let isMounted = true;
    let intervalId: number | null = null;

    async function loadMakes(showLoading: boolean) {
      if (showLoading) {
        setIsCatalogLoading(true);
      }
      setCatalogError(null);

      try {
        const res = await fetch("/api/cars/makes", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load makes");
        }

        if (isMounted) {
          setMakes(Array.isArray(data?.makes) ? data.makes : []);
        }
      } catch {
        if (isMounted) {
          setCatalogError("Fahrzeugdaten konnten nicht geladen werden. Bitte versuchen Sie es erneut.");
          setMakes([]);
        }
      } finally {
        if (isMounted && showLoading) {
          setIsCatalogLoading(false);
        }
      }
    }

    void loadMakes(true);
    intervalId = window.setInterval(() => {
      void loadMakes(false);
    }, CATALOG_REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    if (!formData.makeId) return;
    if (!makes.some((item) => item.id === formData.makeId)) {
      setFormData((prev) => ({ ...prev, makeId: "", modelId: "" }));
      setModels([]);
    }
  }, [makes, formData.makeId]);

  useEffect(() => {
    let isMounted = true;
    let intervalId: number | null = null;

    async function loadModels(showLoading: boolean) {
      if (!formData.makeId) {
        setModels([]);
        setIsModelsLoading(false);
        return;
      }

      if (showLoading) {
        setIsModelsLoading(true);
      }
      setCatalogError(null);

      try {
        const res = await fetch(`/api/cars/makes/${encodeURIComponent(formData.makeId)}/models`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load models");
        }

        if (isMounted) {
          setModels(Array.isArray(data?.models) ? data.models : []);
        }
      } catch {
        if (isMounted) {
          setCatalogError("Modelldaten konnten nicht geladen werden. Bitte versuchen Sie es erneut.");
          setModels([]);
        }
      } finally {
        if (isMounted && showLoading) {
          setIsModelsLoading(false);
        }
      }
    }

    void loadModels(true);
    intervalId = window.setInterval(() => {
      void loadModels(false);
    }, CATALOG_REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [formData.makeId]);

  useEffect(() => {
    if (!formData.modelId) return;
    if (!models.some((item) => item.id === formData.modelId)) {
      setFormData((prev) => ({ ...prev, modelId: "" }));
    }
  }, [models, formData.modelId]);

  const selectedMake = makes.find((entry) => entry.id === formData.makeId);
  const selectedModel = models.find((entry) => entry.id === formData.modelId);

  const canProceedStep1 =
    formData.makeId &&
    formData.modelId &&
    formData.year &&
    formData.mileage &&
    formData.offeredPrice;
  const canProceedStep2 = formData.firstName && formData.lastName && formData.email && formData.phone && formData.privacyAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const attribution = getLeadAttribution(locale);

      const response = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          makeId: formData.makeId,
          modelId: formData.modelId,
          make: selectedMake?.name ?? "",
          model: selectedModel?.name ?? "",
          ...attribution,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || tCommon("error"));
      }

      setIsSuccess(true);
      trackEvent("generate_lead", {
        locale,
        landing_page_type: attribution.landingPageType,
        preferred_contact: formData.contactMethod,
        car_make: selectedMake?.name ?? "unknown",
        car_model: selectedModel?.name ?? "unknown",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : tCommon("error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-scale-in">
          <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2 sm:mb-3">{t("successTitle")}</h3>
        <p className="text-sm sm:text-base text-slate-600 px-2">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Progress Bar - Mobile Optimized */}
      <div className="relative">
        <div className="flex gap-2 sm:gap-3 mb-2">
          <div className={`flex-1 h-1.5 sm:h-2 rounded-full transition-all duration-500 ${step >= 1 ? "bg-gradient-gold shadow-gold" : "bg-slate-200"}`} />
          <div className={`flex-1 h-1.5 sm:h-2 rounded-full transition-all duration-500 ${step >= 2 ? "bg-gradient-gold shadow-gold" : "bg-slate-200"}`} />
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs text-slate-400">
          <span className={`${step === 1 ? "text-gold-600 font-semibold" : ""} flex items-center gap-1`}>
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-[10px] sm:text-xs font-bold">1</span>
            <span className="hidden xs:inline">{t("step1Title")}</span>
          </span>
          <span className={`${step === 2 ? "text-gold-600 font-semibold" : ""} flex items-center gap-1`}>
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] sm:text-xs font-bold">2</span>
            <span className="hidden xs:inline">{t("step2Title")}</span>
          </span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Step Header - Mobile Compact */}
          <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-slate-100">
            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-navy-50 to-navy-100">
              <Car className="h-4 w-4 sm:h-5 sm:w-5 text-navy-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-navy-900">{t("step1Title")}</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">Bitte füllen Sie alle Felder aus</p>
            </div>
          </div>

          {/* Make & Model - Stack on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="make" className="text-xs sm:text-sm font-medium text-navy-700">{t("carMake")} *</Label>
              <Select
                value={formData.makeId}
                onValueChange={(v) => updateField("makeId", v)}
                disabled={isCatalogLoading}
              >
                <SelectTrigger className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white active:scale-[0.98]">
                  <SelectValue
                    placeholder={isCatalogLoading ? "Wird geladen..." : tCommon("select")}
                  />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-premium max-h-[40vh] custom-scrollbar">
                  {makes.length === 0 && !isCatalogLoading ? (
                    <div className="px-3 py-2 text-xs text-slate-500">Keine Marken verfugbar</div>
                  ) : (
                    makes.map((make) => (
                      <SelectItem key={make.id} value={make.id} className="rounded-lg py-3 sm:py-2">
                        {make.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="model" className="text-xs sm:text-sm font-medium text-navy-700">{t("carModel")} *</Label>
              <Select
                value={formData.modelId}
                onValueChange={(v) => updateField("modelId", v)}
                disabled={!formData.makeId || isModelsLoading || isCatalogLoading}
              >
                <SelectTrigger className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white disabled:opacity-50 active:scale-[0.98]">
                  <SelectValue
                    placeholder={isModelsLoading ? "Wird geladen..." : tCommon("select")}
                  />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-premium max-h-[40vh] custom-scrollbar">
                  {models.length === 0 && formData.makeId && !isModelsLoading ? (
                    <div className="px-3 py-2 text-xs text-slate-500">Keine Modelle verfugbar</div>
                  ) : (
                    models.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="rounded-lg py-3 sm:py-2">
                        {model.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {catalogError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {catalogError}
            </p>
          )}

          {/* Year & Mileage - Stack on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="year" className="text-xs sm:text-sm font-medium text-navy-700">{t("year")} *</Label>
              <Select value={formData.year} onValueChange={(v) => updateField("year", v)}>
                <SelectTrigger className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white active:scale-[0.98]">
                  <SelectValue placeholder={tCommon("select")} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-premium max-h-[40vh]">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="rounded-lg py-3 sm:py-2">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="mileage" className="text-xs sm:text-sm font-medium text-navy-700">{t("mileage")} *</Label>
              <Input
                id="mileage"
                type="number"
                inputMode="numeric"
                placeholder="z.B. 85000"
                className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
                value={formData.mileage}
                onChange={(e) => updateField("mileage", e.target.value)}
              />
            </div>
          </div>

          {/* Customer Offer */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="offeredPrice" className="text-xs sm:text-sm font-medium text-navy-700">{t("offerPrice")} *</Label>
            <Input
              id="offeredPrice"
              type="number"
              inputMode="numeric"
              min={1}
              step={100}
              placeholder={t("offerPricePlaceholder")}
              className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
              value={formData.offeredPrice}
              onChange={(e) => updateField("offeredPrice", e.target.value)}
            />
          </div>

          {/* Next Button - Mobile Optimized */}
          <Button
            type="button"
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl bg-gradient-gold hover:shadow-gold-lg transition-all duration-300 text-navy-900 group active:scale-[0.98]"
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
          >
            {t("next")}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          {/* Step Header - Mobile Compact */}
          <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-slate-100">
            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-navy-50 to-navy-100">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-navy-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-navy-900">{t("step2Title")}</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">Fast geschafft!</p>
            </div>
          </div>

          {/* First & Last Name - Stack on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium text-navy-700">{t("firstName")} *</Label>
              <Input
                id="firstName"
                autoComplete="given-name"
                className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium text-navy-700">{t("lastName")} *</Label>
              <Input
                id="lastName"
                autoComplete="family-name"
                className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-navy-700">{t("email")} *</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="phone" className="text-xs sm:text-sm font-medium text-navy-700">{t("phone")} *</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          {/* Contact Method */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-xs sm:text-sm font-medium text-navy-700">{t("contactMethod")}</Label>
            <Select value={formData.contactMethod} onValueChange={(v) => updateField("contactMethod", v)}>
              <SelectTrigger className="h-12 sm:h-12 text-sm border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white active:scale-[0.98]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 shadow-premium">
                {contactMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value} className="rounded-lg py-3 sm:py-2">
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes - Smaller on Mobile */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="notes" className="text-xs sm:text-sm font-medium text-navy-700">{t("notes")}</Label>
            <textarea
              id="notes"
              className="flex min-h-[80px] sm:min-h-[100px] w-full rounded-xl border-2 border-slate-200 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm transition-all hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 focus:outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t("notesPlaceholder")}
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          {/* Privacy Checkbox - Mobile Optimized */}
          <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200">
            <input
              type="checkbox"
              id="privacy"
              className="mt-0.5 h-5 w-5 sm:h-5 sm:w-5 rounded border-2 border-slate-300 text-gold-500 focus:ring-gold-400 focus:ring-offset-0 cursor-pointer"
              checked={formData.privacyAccepted}
              onChange={(e) => updateField("privacyAccepted", e.target.checked)}
            />
            <Label htmlFor="privacy" className="text-xs sm:text-sm text-slate-600 cursor-pointer leading-relaxed">
              {t("privacy")} *
            </Label>
          </div>

          {error && (
            <div className="text-xs sm:text-sm text-red-600 bg-red-50 p-3 sm:p-4 rounded-xl border border-red-100 animate-fade-in">
              {error}
            </div>
          )}

          {/* Action Buttons - Mobile Optimized */}
          <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setStep(1)}
              className="h-12 sm:h-14 px-4 sm:px-6 rounded-xl border-2 border-slate-200 hover:border-navy-300 hover:bg-navy-50 transition-all group active:scale-[0.98]"
            >
              <ChevronLeft className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">{t("back")}</span>
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl bg-gradient-gold hover:shadow-gold-lg transition-all duration-300 text-navy-900 disabled:opacity-50 active:scale-[0.98]"
              disabled={!canProceedStep2 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                  <span className="text-sm sm:text-base">{t("submitting")}</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">{t("submit")}</span>
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
