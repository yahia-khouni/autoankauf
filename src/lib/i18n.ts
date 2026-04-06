export const locales = ["de", "en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
};

export const localeRegions: Record<Locale, string> = {
  de: "de-DE",
  en: "en-US",
  fr: "fr-FR",
};
