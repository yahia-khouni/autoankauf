"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carMakes, getModelsByMake } from "@/data/car-makes";
import { getYearRange } from "@/lib/utils";
import { Loader2, CheckCircle } from "lucide-react";

const years = getYearRange();
const conditions = [
  { value: "excellent", label: "Ausgezeichnet" },
  { value: "good", label: "Gut" },
  { value: "fair", label: "Akzeptabel" },
  { value: "poor", label: "Beschadigt/Defekt" },
];

const contactMethods = [
  { value: "phone", label: "Telefon" },
  { value: "email", label: "E-Mail" },
  { value: "whatsapp", label: "WhatsApp" },
];

export function LeadForm() {
  const t = useTranslations("form");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        throw new Error(data.error || "Ein Fehler ist aufgetreten");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{t("successTitle")}</h3>
        <p className="text-muted-foreground">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2 mb-6">
        <div className={`flex-1 h-2 rounded ${step >= 1 ? "bg-primary" : "bg-slate-200"}`} />
        <div className={`flex-1 h-2 rounded ${step >= 2 ? "bg-primary" : "bg-slate-200"}`} />
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-medium text-lg">{t("step1Title")}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">{t("carMake")} *</Label>
              <Select value={formData.make} onValueChange={(v) => updateField("make", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wahlen..." />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem key={make.id} value={make.id}>
                      {make.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">{t("carModel")} *</Label>
              <Select 
                value={formData.model} 
                onValueChange={(v) => updateField("model", v)}
                disabled={!formData.make}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wahlen..." />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">{t("year")} *</Label>
              <Select value={formData.year} onValueChange={(v) => updateField("year", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wahlen..." />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">{t("mileage")} *</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="z.B. 85000"
                value={formData.mileage}
                onChange={(e) => updateField("mileage", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">{t("condition")} *</Label>
            <Select value={formData.condition} onValueChange={(v) => updateField("condition", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Wahlen..." />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value}>
                    {condition.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
          >
            {t("next")}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-medium text-lg">{t("step2Title")}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("firstName")} *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("lastName")} *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")} *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")} *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("contactMethod")}</Label>
            <Select value={formData.contactMethod} onValueChange={(v) => updateField("contactMethod", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contactMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t("notes")}</Label>
            <textarea
              id="notes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t("notesPlaceholder")}
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1"
              checked={formData.privacyAccepted}
              onChange={(e) => updateField("privacyAccepted", e.target.checked)}
            />
            <Label htmlFor="privacy" className="text-sm font-normal">
              {t("privacy")} *
            </Label>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              {t("back")}
            </Button>
            <Button type="submit" className="flex-1" disabled={!canProceedStep2 || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
