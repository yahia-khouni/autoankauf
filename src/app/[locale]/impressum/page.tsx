import type { ReactNode } from "react";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: `Impressum | ${COMPANY.legalName}`,
  description: "Rechtliche Pflichtangaben und Anbieterkennzeichnung gemäß deutschem Recht für Autoankauf SR.",
  keywords: ["Impressum", "Anbieterkennzeichnung", "Autoankauf SR", "rechtliche Angaben"],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocalizedCopy = {
  eyebrow: string;
  title: string;
  description: string;
  tocLabel: string;
  legalInfoLabel: string;
  sections: Array<{ id: string; title: string; content: ReactNode }>;
};

const legalSections: Array<{ id: string; title: string; content: ReactNode }> = [
  {
    id: "anbieter",
    title: "1. Anbieterkennzeichnung",
    content: (
      <p>
        {COMPANY.legalName}
        <br />
        {COMPANY.streetAddress}
        <br />
        {COMPANY.postalCode} {COMPANY.city}
        <br />
        Deutschland
      </p>
    ),
  },
  {
    id: "kontakt",
    title: "2. Kontakt",
    content: (
      <p>
        Telefon: {COMPANY.phoneDisplay}
        <br />
        E-Mail: {COMPANY.email}
        <br />
        Website: {COMPANY.websiteHost}
      </p>
    ),
  },
  {
    id: "streitbeilegung",
    title: "3. Verbraucherstreitbeilegung",
    content: (
      <>
        <p>
          Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <br />
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen, sofern keine gesetzliche Pflicht besteht.
        </p>
      </>
    ),
  },
  {
    id: "haftung",
    title: "4. Haftung fuer Inhalte und Links",
    content: (
      <>
        <p>
          Als Diensteanbieter sind wir fuer eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Wir uebernehmen keine Gewaehr fuer Aktualitaet, Vollstaendigkeit
          und Richtigkeit der bereitgestellten Informationen.
        </p>
        <p>
          Unser Angebot enthaelt Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Fuer diese fremden Inhalte uebernehmen wir keine Haftung.
        </p>
      </>
    ),
  },
  {
    id: "urheberrecht",
    title: "5. Urheberrecht",
    content: (
      <p>
        Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht.
        Vervielfaeltigung, Bearbeitung und Verwertung ausserhalb der gesetzlichen Grenzen beduerfen
        der vorherigen Zustimmung des jeweiligen Rechteinhabers.
      </p>
    ),
  },
];

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copyByLocale: Record<Locale, LocalizedCopy> = {
    de: {
      eyebrow: "Impressum",
      title: "Impressum",
      description:
        "Rechtliche Pflichtangaben zum Betreiber dieser Website gemaess den geltenden Vorgaben in Deutschland.",
      tocLabel: "Inhaltsverzeichnis",
      legalInfoLabel: "Rechtliche Informationen gemaess deutschem Recht",
      sections: legalSections,
    },
    en: {
      eyebrow: "Imprint",
      title: "Imprint",
      description:
        "Mandatory legal provider information for this website under applicable German law.",
      tocLabel: "Contents",
      legalInfoLabel: "Legal information under German law",
      sections: legalSections,
    },
    fr: {
      eyebrow: "Mentions legales",
      title: "Mentions legales",
      description:
        "Informations legales obligatoires concernant l'exploitant de ce site selon le droit allemand.",
      tocLabel: "Sommaire",
      legalInfoLabel: "Informations juridiques selon le droit allemand",
      sections: legalSections,
    },
  };

  const copy = copyByLocale[locale];

  return (
    <LegalPageShell
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      tocLabel={copy.tocLabel}
      legalInfoLabel={copy.legalInfoLabel}
      sections={copy.sections}
    />
  );
}
