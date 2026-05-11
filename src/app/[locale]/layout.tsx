import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { getBaseUrl } from "@/lib/company";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import "@/app/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const baseUrl = getBaseUrl();

  const titles: Record<Locale, string> = {
    de: "Autoankauf Deutschland - Schnell, Fair & Unkompliziert | Ihr Auto verkaufen",
    en: "Car Purchase Germany - Fast, Fair & Easy | Sell Your Car",
    fr: "Achat de voiture Allemagne - Rapide, juste et facile | Vendez votre voiture",
  };

  const descriptions: Record<Locale, string> = {
    de: "Verkaufen Sie Ihr Auto schnell und zu fairen Preisen. Kostenlose Bewertung, sofortige Auszahlung, deutschlandweiter Service. Jetzt unverbindliches Angebot erhalten!",
    en: "Sell your car quickly and at fair prices. Free valuation, instant payment, nationwide service in Germany. Get a non-binding offer now!",
    fr: "Vendez votre voiture rapidement et a des prix equitables. Evaluation gratuite, paiement immediat, service dans toute l'Allemagne.",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: titles[locale],
      template: `%s | Autoankauf Deutschland`,
    },
    description: descriptions[locale],
    keywords: [
      "Autoankauf",
      "Auto verkaufen",
      "PKW Ankauf",
      "Gebrauchtwagen Ankauf",
      "Auto Ankauf Deutschland",
      "Fahrzeug verkaufen",
    ],
    authors: [{ name: "Autoankauf Deutschland" }],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    alternates: {
      canonical: "./",
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "fr_FR",
      url: "./",
      siteName: "Autoankauf SR",
      images: [
        {
          url: "/images/LOGO.png",
          alt: "Autoankauf SR",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/images/LOGO.png"],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
