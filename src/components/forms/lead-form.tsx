"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carMakes, getModelsByMake } from "@/data/car-makes";
import { getYearRange } from "@/lib/utils";
import { Loader2, CheckCircle, ChevronRight, ChevronLeft, Car, User } from "lucide-react";

const years = getYearRange();

export function LeadForm() {
  const t = useTranslations("form");
  const tCommon = useTranslations("common");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Translated options
  const conditions = [
    { value: "excellent", label: t("conditionExcellent") },
    { value: "good", label: t("conditionGood") },
    { value: "fair", label: t("conditionFair") },
    { value: "poor", label: t("conditionPoor") },
  ];

  const contactMethods = [
    { value: "phone", label: t("phone") },
    { value: "email", label: t("email") },
    { value: "whatsapp", label: "WhatsApp" },
  ];

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "phone",
    notes: "",
    privacyAccepted: false,
  });

  const models = formData.make ? getModelsByMake(formData.make) : [];

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "make") {
      setFormData((prev) => ({ ...prev, model: "" }));
    }
  };

  const canProceedStep1 = formData.make && formData.model && formData.year && formData.mileage && formData.condition;
  const canProceedStep2 = formData.firstName && formData.lastName && formData.email && formData.phone && formData.privacyAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || tCommon("error"));
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : tCommon("error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-scale-in">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-3">{t("successTitle")}</h3>
        <p className="text-slate-600">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex gap-3 mb-2">
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 1 ? "bg-gradient-gold shadow-gold" : "bg-slate-200"}`} />
          <div className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 2 ? "bg-gradient-gold shadow-gold" : "bg-slate-200"}`} />
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span className={step === 1 ? "text-gold-600 font-medium" : ""}>1. {t("step1Title")}</span>
          <span className={step === 2 ? "text-gold-600 font-medium" : ""}>2. {t("step2Title")}</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-navy-50">
              <Car className="h-5 w-5 text-navy-600" />
            </div>
            <h3 className="font-semibold text-navy-900">{t("step1Title")}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make" className="text-sm font-medium text-navy-700">{t("carMake")} *</Label>
              <Select value={formData.make} onValueChange={(v) => updateField("make", v)}>
                <SelectTrigger className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white">
                  <SelectValue placeholder={tCommon("select")} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-premium">
                  {carMakes.map((make) => (
                    <SelectItem key={make.id} value={make.id} className="rounded-lg">
                      {make.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-sm font-medium text-navy-700">{t("carModel")} *</Label>
              <Select 
                value={formData.model} 
                onValueChange={(v) => updateField("model", v)}
                disabled={!formData.make}
              >
                <SelectTrigger className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white disabled:opacity-50">
                  <SelectValue placeholder={tCommon("select")} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-premium">
                  {models.map((model) => (
                    <SelectItem key={model} value={model} className="rounded-lg">
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-medium text-navy-700">{t("year")} *</Label>
              <Select value={formData.year} onValueChange={(v) => updateField("year", v)}>
                <SelectTrigger className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white">
                  <SelectValue placeholder={tCommon("select")} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-premium max-h-60">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="rounded-lg">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage" className="text-sm font-medium text-navy-700">{t("mileage")} *</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="z.B. 85000"
                className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
                value={formData.mileage}
                onChange={(e) => updateField("mileage", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition" className="text-sm font-medium text-navy-700">{t("condition")} *</Label>
            <Select value={formData.condition} onValueChange={(v) => updateField("condition", v)}>
              <SelectTrigger className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white">
                <SelectValue placeholder={tCommon("select")} />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 shadow-premium">
                {conditions.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value} className="rounded-lg">
                    {condition.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-gold hover:shadow-gold-lg transition-all duration-300 text-navy-900 group"
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
          >
            {t("next")}
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-navy-50">
              <User className="h-5 w-5 text-navy-600" />
            </div>
            <h3 className="font-semibold text-navy-900">{t("step2Title")}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-navy-700">{t("firstName")} *</Label>
              <Input
                id="firstName"
                className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-navy-700">{t("lastName")} *</Label>
              <Input
                id="lastName"
                className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-navy-700">{t("email")} *</Label>
            <Input
              id="email"
              type="email"
              className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-navy-700">{t("phone")} *</Label>
            <Input
              id="phone"
              type="tel"
              className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-navy-700">{t("contactMethod")}</Label>
            <Select value={formData.contactMethod} onValueChange={(v) => updateField("contactMethod", v)}>
              <SelectTrigger className="h-12 border-2 border-slate-200 hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all rounded-xl bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 shadow-premium">
                {contactMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value} className="rounded-lg">
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-navy-700">{t("notes")}</Label>
            <textarea
              id="notes"
              className="flex min-h-[100px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm transition-all hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 focus:outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t("notesPlaceholder")}
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <input
              type="checkbox"
              id="privacy"
              className="mt-0.5 h-5 w-5 rounded border-2 border-slate-300 text-gold-500 focus:ring-gold-400 focus:ring-offset-0"
              checked={formData.privacyAccepted}
              onChange={(e) => updateField("privacyAccepted", e.target.checked)}
            />
            <Label htmlFor="privacy" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
              {t("privacy")} *
            </Label>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setStep(1)}
              className="h-14 px-6 rounded-xl border-2 border-slate-200 hover:border-navy-300 hover:bg-navy-50 transition-all group"
            >
              <ChevronLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              {t("back")}
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-14 text-lg font-semibold rounded-xl bg-gradient-gold hover:shadow-gold-lg transition-all duration-300 text-navy-900 disabled:opacity-50"
              disabled={!canProceedStep2 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
