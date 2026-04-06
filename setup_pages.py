#!/usr/bin/env python3
"""
Part 2: Creates App Router pages, components, and API routes.
Run after setup_project.py

Usage: python setup_pages.py
"""
import os
from pathlib import Path

base_path = Path(__file__).parent.resolve()

files = {}

# =============================================================================
# APP ROUTER - CORE FILES
# =============================================================================

files["src/app/globals.css"] = '''@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Focus styles */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2;
}
'''

files["src/middleware.ts"] = '''import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\\\..*).*)"],
};
'''

files["src/app/[locale]/layout.tsx"] = '''import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Autoankauf Deutschland — Wir kaufen Ihr Auto",
    template: "%s | Autoankauf",
  },
  description: "Verkaufen Sie Ihr Auto schnell und unkompliziert. Faire Preise, sofortige Abwicklung, deutschlandweiter Service.",
  keywords: ["Autoankauf", "Auto verkaufen", "Gebrauchtwagen verkaufen", "Deutschland"],
  authors: [{ name: "Autoankauf" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Autoankauf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
'''

files["src/app/[locale]/page.tsx"] = '''import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { WhyUsSection } from "@/components/sections/why-us";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { LocationsMapSection } from "@/components/sections/locations-map";
import { FAQSection } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <WhyUsSection />
      <TestimonialsSection />
      <LocationsMapSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
'''

files["src/app/[locale]/not-found.tsx"] = '''import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Seite nicht gefunden</h2>
        <p className="text-muted-foreground mb-8">
          Die angeforderte Seite existiert nicht.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
'''

# =============================================================================
# LEGAL PAGES
# =============================================================================

files["src/app/[locale]/impressum/page.tsx"] = '''import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Informationen von Autoankauf Deutschland.",
};

export default function ImpressumPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>
      
      <div className="prose prose-slate max-w-none">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>[Firmenname]</strong><br />
          [Straße und Hausnummer]<br />
          [PLZ] [Stadt]<br />
          Deutschland
        </p>
        
        <h2>Kontakt</h2>
        <p>
          Telefon: [Telefonnummer]<br />
          E-Mail: [E-Mail-Adresse]
        </p>
        
        <h2>Vertreten durch</h2>
        <p>[Name des Geschäftsführers/Inhabers]</p>
        
        <h2>Registereintrag</h2>
        <p>
          Eintragung im Handelsregister.<br />
          Registergericht: [Stadt]<br />
          Registernummer: [HRB-Nummer]
        </p>
        
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          [USt-IdNr.]
        </p>
        
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          [Name]<br />
          [Adresse]
        </p>
        
        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach 
          den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter 
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen 
          oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        
        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        </p>
        
        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </div>
    </div>
  );
}
'''

files["src/app/[locale]/datenschutz/page.tsx"] = '''import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Autoankauf Deutschland.",
};

export default function DatenschutzPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>
      
      <div className="prose prose-slate max-w-none">
        <h2>1. Datenschutz auf einen Blick</h2>
        
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
          Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
        
        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
          Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
        </p>
        
        <p>
          <strong>Wie erfassen wir Ihre Daten?</strong><br />
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei 
          kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        </p>
        
        <p>
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
          durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. 
          Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
        </p>
        
        <h2>2. Hosting</h2>
        <p>
          Wir hosten die Inhalte unserer Website bei Vercel Inc. Anbieter ist die Vercel Inc., 
          340 S Lemon Ave #4133, Walnut, CA 91789, USA.
        </p>
        
        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
        
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
          gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        
        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
          [Firmenname]<br />
          [Adresse]<br />
          Telefon: [Telefonnummer]<br />
          E-Mail: [E-Mail-Adresse]
        </p>
        
        <h2>4. Datenerfassung auf dieser Website</h2>
        
        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
          Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
          der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben 
          wir nicht ohne Ihre Einwilligung weiter.
        </p>
        
        <h3>Anfrage per E-Mail, Telefon oder WhatsApp</h3>
        <p>
          Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, wird Ihre Anfrage inklusive 
          aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der 
          Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
        </p>
        
        <h2>5. Analyse-Tools und Werbung</h2>
        
        <h3>Plausible Analytics</h3>
        <p>
          Wir nutzen Plausible Analytics, einen datenschutzfreundlichen Webanalysedienst. Plausible 
          verwendet keine Cookies und erfasst keine personenbezogenen Daten. Alle erhobenen Daten 
          werden anonymisiert und aggregiert verarbeitet.
        </p>
        
        <h2>6. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
          personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung 
          sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
        </p>
        
        <p className="text-sm text-muted-foreground mt-8">
          Stand: April 2026
        </p>
      </div>
    </div>
  );
}
'''

files["src/app/[locale]/agb/page.tsx"] = '''import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: "AGB von Autoankauf Deutschland.",
};

export default function AGBPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
      
      <div className="prose prose-slate max-w-none">
        <h2>§ 1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen 
          [Firmenname] (nachfolgend "Ankäufer") und dem Verkäufer über den Ankauf 
          von Kraftfahrzeugen.
        </p>
        
        <h2>§ 2 Vertragsschluss</h2>
        <p>
          (1) Die Darstellung unserer Ankaufsleistungen auf der Website stellt kein 
          rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Abgabe eines 
          Angebots durch den Verkäufer.
        </p>
        <p>
          (2) Durch das Ausfüllen und Absenden des Kontaktformulars gibt der Verkäufer 
          ein unverbindliches Angebot zur Veräußerung seines Fahrzeugs ab.
        </p>
        <p>
          (3) Ein Kaufvertrag kommt erst durch beiderseitige Unterzeichnung eines 
          schriftlichen Kaufvertrags bei Fahrzeugübergabe zustande.
        </p>
        
        <h2>§ 3 Fahrzeugbewertung</h2>
        <p>
          (1) Die vom Ankäufer abgegebenen Angebote basieren auf den vom Verkäufer 
          gemachten Angaben und sind unverbindlich.
        </p>
        <p>
          (2) Der endgültige Kaufpreis wird nach persönlicher Begutachtung des 
          Fahrzeugs festgelegt.
        </p>
        <p>
          (3) Weichen die tatsächlichen Fahrzeugdaten von den angegebenen Daten ab, 
          behält sich der Ankäufer eine Anpassung des Angebots vor.
        </p>
        
        <h2>§ 4 Pflichten des Verkäufers</h2>
        <p>Der Verkäufer verpflichtet sich:</p>
        <ul>
          <li>Alle Angaben zum Fahrzeug wahrheitsgemäß und vollständig zu machen</li>
          <li>Das Fahrzeug frei von Rechten Dritter zu übereignen</li>
          <li>Alle zum Fahrzeug gehörenden Dokumente (Fahrzeugbrief, Fahrzeugschein, 
          Serviceheft etc.) zu übergeben</li>
          <li>Das Fahrzeug ordnungsgemäß abzumelden oder die Abmeldung zu ermöglichen</li>
        </ul>
        
        <h2>§ 5 Zahlung</h2>
        <p>
          (1) Die Zahlung des Kaufpreises erfolgt per Banküberweisung bei Übergabe 
          des Fahrzeugs und aller erforderlichen Dokumente.
        </p>
        <p>
          (2) Der Verkäufer erhält eine Kaufbestätigung als Nachweis.
        </p>
        
        <h2>§ 6 Gewährleistung</h2>
        <p>
          Der Verkäufer haftet für die Richtigkeit seiner Angaben zum Fahrzeug. Bei 
          arglistig verschwiegenen Mängeln kann der Ankäufer Ansprüche geltend machen.
        </p>
        
        <h2>§ 7 Datenschutz</h2>
        <p>
          Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer 
          Datenschutzerklärung und den geltenden Datenschutzgesetzen.
        </p>
        
        <h2>§ 8 Schlussbestimmungen</h2>
        <p>
          (1) Es gilt das Recht der Bundesrepublik Deutschland.
        </p>
        <p>
          (2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die 
          Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
        
        <p className="text-sm text-muted-foreground mt-8">
          Stand: April 2026
        </p>
      </div>
    </div>
  );
}
'''

# =============================================================================
# LAYOUT COMPONENTS
# =============================================================================

files["src/components/layout/header.tsx"] = '''"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/standorte", label: t("locations") },
    { href: "/so-funktionierts", label: t("howItWorks") },
    { href: "/ueber-uns", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/kontakt", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with contact info */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+4912345678900" className="flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" />
              +49 123 456 789 00
            </a>
            <a 
              href="https://wa.me/4912345678900" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Über 5.000 Autos angekauft</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Autoankauf</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/#lead-form"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-t",
          isOpen ? "block" : "hidden"
        )}
      >
        <nav className="container py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#lead-form"
            className="block w-full text-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            onClick={() => setIsOpen(false)}
          >
            Jetzt Angebot erhalten
          </Link>
          <div className="pt-4 border-t">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
'''

files["src/components/layout/footer.tsx"] = '''import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Autoankauf</h3>
            <p className="text-sm mb-4">
              Wir kaufen Ihr Auto schnell, fair und unkompliziert. 
              Deutschlandweiter Service mit sofortiger Abwicklung.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/4912345678900"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+4912345678900" className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4" />
                  +49 123 456 789 00
                </a>
              </li>
              <li>
                <a href="mailto:info@autoankauf.de" className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4" />
                  info@autoankauf.de
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  [Straße]<br />
                  [PLZ Stadt]<br />
                  Deutschland
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/standorte" className="hover:text-white">
                  Standorte
                </Link>
              </li>
              <li>
                <Link href="/so-funktionierts" className="hover:text-white">
                  So funktioniert&apos;s
                </Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="hover:text-white">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Ratgeber
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-white">
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-white">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
'''

files["src/components/layout/language-switcher.tsx"] = '''"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    const newPath = newLocale === "de" 
      ? `/${segments.join("/")}`
      : `/${newLocale}/${segments.join("/")}`;
    router.push(newPath || "/");
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={`text-sm px-2 py-1 rounded ${
            locale === l 
              ? "bg-white/20 font-semibold" 
              : "hover:bg-white/10"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
'''

# =============================================================================
# SECTION COMPONENTS
# =============================================================================

files["src/components/sections/hero.tsx"] = '''import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckCircle } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  const benefits = [
    "Faire Preise garantiert",
    "Angebot in 24 Stunden",
    "Kostenlose Abholung",
    "Sofortige Zahlung",
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-16 lg:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              🚗 Deutschlandweit • Schnell • Fair
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("title")}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              {t("description")}
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5.000+</div>
                <div className="text-xs text-muted-foreground">Autos angekauft</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9/5</div>
                <div className="text-xs text-muted-foreground">Kundenbewertung</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-xs text-muted-foreground">Angebot</div>
              </div>
            </div>
          </div>
          
          {/* Right: Form */}
          <div id="lead-form" className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-xl border p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-2">
                Kostenloses Angebot erhalten
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/sections/how-it-works.tsx"] = '''import { useTranslations } from "next-intl";
import { ClipboardList, MessageSquare, CreditCard } from "lucide-react";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: ClipboardList,
      title: t("step1Title"),
      description: t("step1Description"),
    },
    {
      icon: MessageSquare,
      title: t("step2Title"),
      description: t("step2Description"),
    },
    {
      icon: CreditCard,
      title: t("step3Title"),
      description: t("step3Description"),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In nur 3 einfachen Schritten verkaufen Sie Ihr Auto
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/sections/why-us.tsx"] = '''import { useTranslations } from "next-intl";
import { Euro, Zap, MapPin, Car } from "lucide-react";

export function WhyUsSection() {
  const t = useTranslations("whyUs");

  const reasons = [
    {
      icon: Euro,
      title: t("reason1Title"),
      description: t("reason1Description"),
    },
    {
      icon: Zap,
      title: t("reason2Title"),
      description: t("reason2Description"),
    },
    {
      icon: MapPin,
      title: t("reason3Title"),
      description: t("reason3Description"),
    },
    {
      icon: Car,
      title: t("reason4Title"),
      description: t("reason4Description"),
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Im Gegensatz zu großen Plattformen bieten wir persönlichen Service und faire Preise
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <reason.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/sections/testimonials.tsx"] = '''import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Thomas M.",
    location: "München",
    car: "BMW 3er, 2019",
    rating: 5,
    text: "Super schnelle Abwicklung! Innerhalb von 2 Tagen war alles erledigt und das Geld auf meinem Konto. Sehr professionell.",
  },
  {
    name: "Sarah K.",
    location: "Berlin",
    car: "VW Golf, 2018",
    rating: 5,
    text: "Endlich ein ehrlicher Autoankauf. Das Angebot war fair und die Mitarbeiter sehr freundlich. Kann ich nur empfehlen!",
  },
  {
    name: "Michael W.",
    location: "Hamburg",
    car: "Audi A4, 2020",
    rating: 5,
    text: "Ich war skeptisch, aber wurde positiv überrascht. Besseres Angebot als bei anderen Händlern. Top Service!",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-muted-foreground">Basierend auf 500+ Bewertungen</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-4">"{testimonial.text}"</p>
              
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location} • {testimonial.car}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/sections/locations-map.tsx"] = '''import Link from "next/link";
import { useTranslations } from "next-intl";
import { germanStates } from "@/data/locations";
import { MapPin, ChevronRight } from "lucide-react";

export function LocationsMapSection() {
  const t = useTranslations("locations");

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {germanStates.map((state) => (
            <Link
              key={state.slug}
              href={`/standorte/${state.slug}`}
              className="group flex items-center gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
            >
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate group-hover:text-primary">
                  {state.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {state.cities.length > 0 
                    ? `${state.cities.length} Städte`
                    : "Stadtland"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/standorte"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {t("viewAll")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
'''

files["src/components/sections/faq.tsx"] = '''import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const t = useTranslations("faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
'''

files["src/components/sections/cta.tsx"] = '''import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          {t("title")}
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          {t("description")}
        </p>
        <Link
          href="/#lead-form"
          className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          {t("button")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
'''

# =============================================================================
# UI COMPONENTS (shadcn/ui style)
# =============================================================================

files["src/components/ui/button.tsx"] = '''import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
'''

files["src/components/ui/input.tsx"] = '''import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
'''

files["src/components/ui/label.tsx"] = '''"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
'''

files["src/components/ui/select.tsx"] = '''"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
'''

files["src/components/ui/accordion.tsx"] = '''"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
'''

# =============================================================================
# LEAD FORM COMPONENT
# =============================================================================

files["src/components/forms/lead-form.tsx"] = '''"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { carMakes } from "@/data/car-makes";
import { getYearRange } from "@/lib/utils";
import { CheckCircle, Loader2 } from "lucide-react";

type FormStep = 1 | 2 | 3;

interface FormData {
  makeId: string;
  modelId: string;
  year: string;
  mileage: string;
  condition: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  postalCode: string;
  description: string;
}

export function LeadForm() {
  const t = useTranslations("form");
  const [step, setStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    makeId: "",
    modelId: "",
    year: "",
    mileage: "",
    condition: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "PHONE",
    postalCode: "",
    description: "",
  });

  const selectedMake = carMakes.find((m) => m.slug === formData.makeId);
  const years = getYearRange(1990);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "makeId") {
      setFormData((prev) => ({ ...prev, modelId: "" }));
    }
  };

  const canProceedStep1 = formData.makeId && formData.modelId && formData.year && formData.mileage;
  const canProceedStep2 = formData.condition;
  const canSubmit = formData.name && formData.email && formData.phone && formData.postalCode;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Submit failed");
      
      setIsSuccess(true);
    } catch (err) {
      setError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Vielen Dank!</h3>
        <p className="text-muted-foreground">{t("success")}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full ${
              s <= step ? "bg-primary" : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Vehicle Details */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground mb-4">
            {t("step1")}: {t("make")} & {t("model")}
          </div>
          
          <div className="space-y-2">
            <Label>{t("make")} *</Label>
            <Select value={formData.makeId} onValueChange={(v) => updateField("makeId", v)}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectMake")} />
              </SelectTrigger>
              <SelectContent>
                {carMakes.map((make) => (
                  <SelectItem key={make.slug} value={make.slug}>
                    {make.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("model")} *</Label>
            <Select 
              value={formData.modelId} 
              onValueChange={(v) => updateField("modelId", v)}
              disabled={!formData.makeId}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectModel")} />
              </SelectTrigger>
              <SelectContent>
                {selectedMake?.models.map((model) => (
                  <SelectItem key={model} value={model.toLowerCase().replace(/\\s+/g, "-")}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("year")} *</Label>
              <Select value={formData.year} onValueChange={(v) => updateField("year", v)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectYear")} />
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
              <Label>{t("mileage")} *</Label>
              <Input
                type="number"
                placeholder="z.B. 80000"
                value={formData.mileage}
                onChange={(e) => updateField("mileage", e.target.value)}
              />
            </div>
          </div>

          <Button 
            className="w-full mt-4" 
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
          >
            {t("next")}
          </Button>
        </div>
      )}

      {/* Step 2: Condition */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground mb-4">
            {t("step2")}: {t("condition")}
          </div>

          <div className="space-y-2">
            <Label>{t("condition")} *</Label>
            <div className="grid grid-cols-2 gap-2">
              {["EXCELLENT", "GOOD", "FAIR", "POOR"].map((condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => updateField("condition", condition)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.condition === condition
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {t(`condition${condition.charAt(0) + condition.slice(1).toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              {t("back")}
            </Button>
            <Button onClick={() => setStep(3)} disabled={!canProceedStep2} className="flex-1">
              {t("next")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground mb-4">
            {t("step3")}: {t("name")} & {t("phone")}
          </div>

          <div className="space-y-2">
            <Label>{t("name")} *</Label>
            <Input
              placeholder="Max Mustermann"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("email")} *</Label>
            <Input
              type="email"
              placeholder="max@beispiel.de"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("phone")} *</Label>
              <Input
                type="tel"
                placeholder="+49 123 456 789"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("postalCode")} *</Label>
              <Input
                placeholder="12345"
                value={formData.postalCode}
                onChange={(e) => updateField("postalCode", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("preferredContact")}</Label>
            <div className="flex gap-2">
              {["PHONE", "EMAIL", "WHATSAPP"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => updateField("preferredContact", method)}
                  className={`flex-1 p-2 rounded border text-xs font-medium ${
                    formData.preferredContact === method
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-200"
                  }`}
                >
                  {t(`contact${method.charAt(0) + method.slice(1).toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              {t("back")}
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!canSubmit || isSubmitting} 
              className="flex-1"
            >
              {isSubmitting ? (
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
    </div>
  );
}
'''

# =============================================================================
# API ROUTES
# =============================================================================

files["src/app/api/leads/submit/route.ts"] = '''import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const required = ["makeId", "modelId", "year", "mileage", "condition", "name", "email", "phone", "postalCode"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: Save to database
    // const lead = await prisma.lead.create({
    //   data: {
    //     name: body.name,
    //     email: body.email,
    //     phone: body.phone,
    //     preferredContact: body.preferredContact || "PHONE",
    //     makeId: body.makeId,
    //     modelId: body.modelId,
    //     year: parseInt(body.year),
    //     mileage: parseInt(body.mileage),
    //     condition: body.condition,
    //     knownIssues: body.knownIssues || [],
    //     postalCode: body.postalCode,
    //     description: body.description,
    //     sourcePage: request.headers.get("referer"),
    //   },
    // });

    // TODO: Send confirmation email to user
    // await resend.emails.send({
    //   from: process.env.FROM_EMAIL!,
    //   to: body.email,
    //   subject: "Ihre Anfrage bei Autoankauf — Wir melden uns!",
    //   html: `...`,
    // });

    // TODO: Send notification email to admin
    // await resend.emails.send({
    //   from: process.env.FROM_EMAIL!,
    //   to: process.env.ADMIN_EMAIL!,
    //   subject: `🚗 Neue Anfrage: ${body.makeId} aus PLZ ${body.postalCode}`,
    //   html: `...`,
    // });

    console.log("Lead received:", body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
'''

files["src/app/api/cars/makes/route.ts"] = '''import { NextResponse } from "next/server";
import { carMakes } from "@/data/car-makes";

export async function GET() {
  const makes = carMakes.map((m) => ({
    slug: m.slug,
    name: m.name,
  }));
  
  return NextResponse.json(makes);
}
'''

files["src/app/api/cars/makes/[id]/models/route.ts"] = '''import { NextResponse } from "next/server";
import { carMakes } from "@/data/car-makes";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const make = carMakes.find((m) => m.slug === params.id);
  
  if (!make) {
    return NextResponse.json({ error: "Make not found" }, { status: 404 });
  }
  
  const models = make.models.map((name) => ({
    slug: name.toLowerCase().replace(/\\s+/g, "-"),
    name,
  }));
  
  return NextResponse.json(models);
}
'''

# =============================================================================
# CREATE ALL FILES
# =============================================================================

def main():
    print(f"Setting up pages at: {base_path}")
    print("=" * 60)
    
    created = 0
    for file_path, content in files.items():
        full_path = base_path / file_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✓ {file_path}")
        created += 1
    
    print("\\n" + "=" * 60)
    print(f"✅ Created {created} files!")
    print("\\nRun 'python setup_project.py' first if you haven't already.")

if __name__ == "__main__":
    main()
