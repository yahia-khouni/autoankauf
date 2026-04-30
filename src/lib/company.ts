export const COMPANY = {
  legalName: "Autoankauf SR",
  streetAddress: "Sulterkamp 70",
  postalCode: "45356",
  city: "Essen",
  country: "Deutschland",
  countryCode: "DE",
  phoneDisplay: "01521 3107213",
  phoneDisplayIntl: "+49 1521 3107213",
  phoneHref: "tel:+4915213107213",
  whatsAppHref: "https://wa.me/4915213107213",
  email: "info@autoankauf-sr.de",
  websiteHost: "www.autoankauf-sr.de",
  websiteUrl: "https://www.autoankauf-sr.de",
} as const;

export function getBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_URL?.trim().replace(/\/+$/, "");
  if (!configured) return COMPANY.websiteUrl;
  return /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;
}
