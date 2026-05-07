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
  email: "info@autoankaufsr.de",
  websiteHost: "www.autoankaufsr.de",
  websiteUrl: "https://www.autoankaufsr.de",
} as const;

export function getBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_URL?.trim().replace(/\/+$/, "");
  if (!configured) return COMPANY.websiteUrl;

  const withProtocol = /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;

  if (!/^https?:\/\/[^\s]+$/i.test(withProtocol)) {
    return COMPANY.websiteUrl;
  }

  const parsed = new URL(withProtocol);
  const preferredHost = COMPANY.websiteHost.toLowerCase();
  const apexHost = preferredHost.replace(/^www\./, "");

  if (parsed.hostname.toLowerCase() === apexHost) {
    parsed.hostname = preferredHost;
  }

  return parsed.toString().replace(/\/+$/, "");
}
