import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { COMPANY, getBaseUrl } from "@/lib/company";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/app/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const baseUrl = getBaseUrl();
  
  const titles: Record<Locale, string> = {
    de: "Autoankauf SR - Schnell, Fair & Unkompliziert | Ihr Auto verkaufen",
    en: "Autoankauf SR - Fast, Fair & Easy | Sell Your Car in Germany",
    fr: "Autoankauf SR - Rapide, juste et simple | Vendez votre voiture en Allemagne",
  };

  const descriptions: Record<Locale, string> = {
    de: "Verkaufen Sie Ihr Auto schnell und zu fairen Preisen. Kostenlose Bewertung, sofortige Auszahlung, deutschlandweiter Service. Jetzt unverbindliches Angebot erhalten!",
    en: "Sell your car quickly and at fair prices. Free valuation, instant payment, nationwide service in Germany. Get a non-binding offer now!",
    fr: "Vendez votre voiture rapidement et a des prix equitables. Evaluation gratuite, paiement immediat, service dans toute l'Allemagne.",
  };

  return {
    title: {
      default: titles[locale],
      template: `%s | ${COMPANY.legalName}`,
    },
    metadataBase: new URL(baseUrl),
    description: descriptions[locale],
    keywords: [
      "Autoankauf",
      "Auto verkaufen",
      "PKW Ankauf",
      "Gebrauchtwagen Ankauf",
      "Auto Ankauf Deutschland",
      "Fahrzeug verkaufen",
    ],
    authors: [{ name: COMPANY.legalName }],
    alternates: {
      canonical: locale === "de" ? "/" : `/${locale}`,
      languages: {
        de: "/",
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      url: locale === "de" ? baseUrl : `${baseUrl}/${locale}`,
      siteName: COMPANY.legalName,
      locale: locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "fr_FR",
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
