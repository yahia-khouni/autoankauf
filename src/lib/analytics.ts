export type LandingPageType =
  | "home"
  | "locations_hub"
  | "state_page"
  | "city_page"
  | "blog_hub"
  | "blog_post"
  | "contact"
  | "how_it_works"
  | "other";

type AnalyticsPrimitive = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsPrimitive | null | undefined>;

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "";

export const analyticsConfig = {
  gtmId: GTM_ID,
  gaMeasurementId: GA_MEASUREMENT_ID,
  googleAdsId: GOOGLE_ADS_ID,
  hasGtm: GTM_ID.length > 0,
  hasDirectGa: GTM_ID.length === 0 && GA_MEASUREMENT_ID.length > 0,
  hasGoogleAds: GOOGLE_ADS_ID.length > 0,
};

function normalizeParams(params: AnalyticsParams): Record<string, AnalyticsPrimitive> {
  const normalized: Record<string, AnalyticsPrimitive> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    normalized[key] = typeof value === "string" ? value.slice(0, 200) : value;
  }

  return normalized;
}

export function detectLandingPageType(pathname: string): LandingPageType {
  const cleanPath = pathname.split("?")[0].split("#")[0] || "/";
  const withoutLocale = cleanPath.replace(/^\/(de|en|fr)(?=\/|$)/, "") || "/";
  const normalized = withoutLocale.startsWith("/") ? withoutLocale : `/${withoutLocale}`;
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length === 0) return "home";
  if (segments[0] === "standorte" && segments.length === 1) return "locations_hub";
  if (segments[0] === "standorte" && segments.length === 2) return "state_page";
  if (segments[0] === "standorte" && segments.length >= 3) return "city_page";
  if (segments[0] === "blog" && segments.length === 1) return "blog_hub";
  if (segments[0] === "blog" && segments.length >= 2) return "blog_post";
  if (segments[0] === "kontakt") return "contact";
  if (segments[0] === "so-funktionierts") return "how_it_works";

  return "other";
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  if (!analyticsConfig.hasGtm && !analyticsConfig.hasDirectGa) return;

  const eventPayload = normalizeParams(params);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventPayload,
  });

  if (analyticsConfig.hasDirectGa && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);
  }
}

/**
 * Fire a Google Ads conversion event (send_to: AW-XXXXXXX/label).
 * Should be called immediately after a successful lead form submission.
 */
export function trackGoogleAdsConversion(params: { value?: number; currency?: string } = {}) {
  if (typeof window === "undefined") return;
  if (!analyticsConfig.hasGoogleAds) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: `${analyticsConfig.googleAdsId}/oVp-CPHZ17ocEI3_y_BD`,
    value: params.value ?? 1.0,
    currency: params.currency ?? "EUR",
  });
}

