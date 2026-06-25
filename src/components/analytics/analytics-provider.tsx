"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { analyticsConfig, detectLandingPageType, trackEvent } from "@/lib/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (!analyticsConfig.hasGtm && !analyticsConfig.hasDirectGa) return;

    const search = window.location.search;
    const pagePath = search ? `${pathname}${search}` : pathname;
    trackEvent("page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
      locale,
      landing_page_type: detectLandingPageType(pathname),
    });
  }, [locale, pathname]);

  useEffect(() => {
    if (!analyticsConfig.hasGtm && !analyticsConfig.hasDirectGa) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const rawHref = anchor.getAttribute("href") ?? "";
      const hrefLower = anchor.href.toLowerCase();
      const commonPayload = {
        locale,
        page_path: window.location.pathname,
        landing_page_type: detectLandingPageType(window.location.pathname),
        link_text: anchor.textContent?.trim().slice(0, 80) || "unknown",
        link_url: rawHref.slice(0, 200),
      };

      if (rawHref.startsWith("tel:")) {
        trackEvent("contact_phone_click", {
          ...commonPayload,
          contact_type: "phone",
        });
        return;
      }

      if (hrefLower.includes("wa.me") || hrefLower.includes("whatsapp")) {
        trackEvent("contact_whatsapp_click", {
          ...commonPayload,
          contact_type: "whatsapp",
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [locale]);

  if (!analyticsConfig.hasGtm && !analyticsConfig.hasDirectGa) {
    return null;
  }

  return (
    <>
      {analyticsConfig.hasGtm && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];`}
          </Script>
          <Script
            id="gtm-loader"
            src={`https://www.googletagmanager.com/gtm.js?id=${analyticsConfig.gtmId}`}
            strategy="afterInteractive"
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        </>
      )}

      {analyticsConfig.hasDirectGa && (
        <>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${analyticsConfig.gaMeasurementId}', { send_page_view: false });`}
          </Script>
        </>
      )}

      {analyticsConfig.hasGoogleAds && (
        <>
          <Script
            id="google-ads-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${analyticsConfig.googleAdsId}');`}
          </Script>
        </>
      )}
    </>
  );
}

