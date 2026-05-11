import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { COMPANY, getBaseUrl } from "@/lib/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getBaseUrl();
  const path = "/datenschutz";
  const localizedPath = locale === "de" ? path : `/${locale}${path}`;
  const canonicalUrl = `${baseUrl}${localizedPath}`;
  const title = `Datenschutz | ${COMPANY.legalName}`;
  const description = "Datenschutzinformationen gemaess DSGVO fuer Autoankauf SR.";

  return {
    title,
    description,
    keywords: ["Datenschutz", "DSGVO", "Autoankauf SR", "TDDDG", "personenbezogene Daten"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        fr: `${baseUrl}/fr${path}`,
        "x-default": `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "Autoankauf SR",
    },
  };
}

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

const deSections: Array<{ id: string; title: string; content: ReactNode }> = [
  {
    id: "verantwortlicher",
    title: "1. Verantwortlicher",
    content: (
      <p>
        Verantwortlich fuer die Datenverarbeitung auf dieser Website ist:
        <br />
        {COMPANY.legalName}
        <br />
        {COMPANY.streetAddress}
        <br />
        {COMPANY.postalCode} {COMPANY.city}
        <br />
        Deutschland
        <br />
        Telefon: {COMPANY.phoneDisplay}
        <br />
        E-Mail: {COMPANY.email}
        <br />
        Website: {COMPANY.websiteHost}
      </p>
    ),
  },
  {
    id: "allgemeine-hinweise",
    title: "2. Allgemeine Hinweise zur Datenverarbeitung",
    content: (
      <>
        <p>
          Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Personenbezogene Daten sind alle
          Informationen, mit denen Sie persoenlich identifiziert werden koennen.
        </p>
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website,
          zur Bearbeitung von Anfragen, zur Durchfuehrung vorvertraglicher Massnahmen oder zur
          Erfuellung rechtlicher Pflichten erforderlich ist.
        </p>
        <p>Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a, b, c und f DSGVO.</p>
      </>
    ),
  },
  {
    id: "zugriffsdaten",
    title: "3. Zugriffsdaten und Server-Logfiles",
    content: (
      <>
        <p>Beim Besuch unserer Website werden automatisch technische Informationen erfasst, z. B.:</p>
        <ul>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>aufgerufene Seite</li>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer-URL</li>
          <li>Hostname des zugreifenden Rechners</li>
        </ul>
        <p>
          Diese Daten dienen der technischen Bereitstellung, Sicherheit und Stabilitaet der Website.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </>
    ),
  },
  {
    id: "kontaktaufnahme",
    title: "4. Kontaktaufnahme per Formular, E-Mail oder Telefon",
    content: (
      <>
        <p>
          Wenn Sie uns per Kontaktformular, E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten
          wir die uebermittelten Daten zur Bearbeitung Ihrer Anfrage.
        </p>
        <p>Bei einer Fahrzeugankaufsanfrage koennen insbesondere folgende Daten verarbeitet werden:</p>
        <ul>
          <li>Name, Telefonnummer, E-Mail-Adresse</li>
          <li>Fahrzeugmarke und Modell</li>
          <li>Baujahr / Erstzulassung</li>
          <li>Kilometerstand</li>
          <li>gewuenschter Verkaufspreis</li>
          <li>freiwillige Zusatzangaben in Nachrichtenfeldern</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und fuer die Kommunikation ueber einen
          moeglichen Fahrzeugankauf (Art. 6 Abs. 1 lit. b DSGVO, ansonsten Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </>
    ),
  },
  {
    id: "bilder-uploads",
    title: "5. Fahrzeugbilder und Uploads",
    content: (
      <>
        <p>
          Sofern im Rahmen einer Anfrage Fahrzeugbilder uebermittelt werden (z. B. per E-Mail oder
          Messenger), verwenden wir diese ausschliesslich zur Bewertung des Fahrzeugs und zur
          Bearbeitung Ihrer Anfrage.
        </p>
        <p>
          Bitte uebermitteln Sie keine unnoetigen personenbezogenen Inhalte auf Bildern (z. B.
          Ausweisdokumente oder Daten Dritter).
        </p>
      </>
    ),
  },
  {
    id: "double-opt-in",
    title: "6. Double-Opt-In / Bestaetigung der Anfrage",
    content: (
      <>
        <p>
          Sofern wir zur Bestaetigung bestimmter Einwilligungen oder Kommunikationsprozesse ein
          Double-Opt-In-Verfahren einsetzen, speichern wir zu Nachweiszwecken Zeitpunkt der Anmeldung,
          Zeitpunkt der Bestaetigung und IP-Adresse.
        </p>
        <p>
          Das Verfahren dient der rechtssicheren Dokumentation einer erklaerten Einwilligung.
        </p>
      </>
    ),
  },
  {
    id: "speicherung",
    title: "7. Speicherung und Loeschung",
    content: (
      <>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie dies fuer die Bearbeitung Ihrer
          Anfrage, die Vertragsanbahnung, den Vertragsschluss oder gesetzliche Aufbewahrungspflichten
          erforderlich ist.
        </p>
        <p>
          Kommt kein Vertrag zustande, werden Anfragedaten nach angemessener Frist geloescht, sofern
          keine gesetzlichen Pflichten oder berechtigten Interessen entgegenstehen.
        </p>
      </>
    ),
  },
  {
    id: "weitergabe",
    title: "8. Weitergabe von Daten",
    content: (
      <>
        <p>
          Eine Weitergabe personenbezogener Daten an Dritte erfolgt nur, wenn dies erforderlich ist
          oder Sie eingewilligt haben.
        </p>
        <p>Empfaenger koennen insbesondere sein:</p>
        <ul>
          <li>IT- und Hosting-Dienstleister</li>
          <li>E-Mail-Dienstleister</li>
          <li>Steuerberater/Buchhaltung</li>
          <li>Behoerden (bei gesetzlicher Pflicht)</li>
          <li>Transport- oder Abschleppdienstleister bei vereinbarter Abholung</li>
        </ul>
        <p>Eine Weitergabe zu Werbezwecken an Dritte erfolgt nicht.</p>
      </>
    ),
  },
  {
    id: "hosting",
    title: "9. Hosting",
    content: (
      <>
        <p>
          Unsere Website wird bei einem externen Hosting-Anbieter betrieben. Der Anbieter verarbeitet
          technische Zugriffsdaten und gegebenenfalls Formulardaten, soweit dies zur Bereitstellung
          der Website erforderlich ist.
        </p>
        <p>
          Sofern gesetzlich erforderlich, wird mit dem Hosting-Anbieter ein Vertrag zur
          Auftragsverarbeitung gemaess Art. 28 DSGVO geschlossen.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "10. Cookies und aehnliche Technologien",
    content: (
      <>
        <p>
          Unsere Website kann Cookies oder aehnliche Technologien verwenden. Technisch notwendige
          Cookies dienen der Funktion der Website.
        </p>
        <p>
          Fuer nicht notwendige Cookies (z. B. Statistik, Marketing, Tracking, externe Medien) holen
          wir vorab Ihre Einwilligung ein.
        </p>
        <p>
          Rechtsgrundlagen: Art. 6 Abs. 1 lit. f DSGVO (notwendige Cookies), Art. 6 Abs. 1 lit. a
          DSGVO sowie § 25 TDDDG (einwilligungspflichtige Speicher-/Zugriffsvorgaenge).
        </p>
      </>
    ),
  },
  {
    id: "externe-dienste",
    title: "11. Externe Dienste",
    content: (
      <>
        <p>
          Wenn externe Dienste eingebunden werden (z. B. Karten, Videos, Analyse-Tools oder
          Messenger), koennen personenbezogene Daten an diese Anbieter uebertragen werden.
        </p>
        <p>
          Nicht technisch notwendige externe Dienste werden erst nach Ihrer Einwilligung geladen.
        </p>
      </>
    ),
  },
  {
    id: "whatsapp",
    title: "12. WhatsApp-Kontakt",
    content: (
      <>
        <p>
          Wenn Sie uns ueber WhatsApp kontaktieren, verarbeitet WhatsApp bzw. Meta eigene
          personenbezogene Daten. Wir haben keinen vollstaendigen Einfluss auf diese Verarbeitung.
        </p>
        <p>
          Wir verwenden Ihre WhatsApp-Nachrichten ausschliesslich zur Bearbeitung Ihrer Anfrage. Falls
          Sie keine WhatsApp-Kommunikation wuenschen, koennen Sie uns alternativ per Telefon oder
          E-Mail kontaktieren.
        </p>
      </>
    ),
  },
  {
    id: "rechte",
    title: "13. Ihre Rechte",
    content: (
      <>
        <p>Sie haben nach DSGVO insbesondere folgende Rechte:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Loeschung (Art. 17 DSGVO)</li>
          <li>Einschraenkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenuebertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen mit Wirkung fuer die Zukunft</li>
          <li>Beschwerde bei einer Datenschutzaufsichtsbehoerde</li>
        </ul>
        <p>
          Zur Ausuebung Ihrer Rechte erreichen Sie uns unter:
          <br />
          {COMPANY.email}
        </p>
      </>
    ),
  },
  {
    id: "tls",
    title: "14. SSL-/TLS-Verschluesselung",
    content: (
      <p>
        Unsere Website nutzt aus Sicherheitsgruenden eine SSL-/TLS-Verschluesselung. Eine
        verschluesselte Verbindung erkennen Sie an der Browserzeile mit &quot;https://&quot; und dem
        Schloss-Symbol.
      </p>
    ),
  },
  {
    id: "aenderungen",
    title: "15. Aenderung dieser Datenschutzerklaerung",
    content: (
      <p>
        Wir behalten uns vor, diese Datenschutzerklaerung anzupassen, wenn sich technische, rechtliche
        oder organisatorische Rahmenbedingungen aendern.
        <br />
        Stand: April 2026
      </p>
    ),
  },
];

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const getLocalizedHref = (path: string) => {
    if (locale === "de") return path;
    return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const copyByLocale: Record<Locale, LocalizedCopy> = {
    de: {
      eyebrow: "Datenschutz",
      title: "Datenschutzerklaerung",
      description: "Datenschutzinformationen gemaess DSGVO fuer die Nutzung unserer Website.",
      tocLabel: "Inhaltsverzeichnis",
      legalInfoLabel: "Datenschutzinformationen gemaess DSGVO",
      sections: [
        ...deSections,
        {
          id: "impressum-link",
          title: "Weitere rechtliche Angaben",
          content: (
            <p>
              Weitere Anbieterangaben finden Sie im{" "}
              <Link href={getLocalizedHref("/impressum")}>Impressum</Link>.
            </p>
          ),
        },
      ],
    },
    en: {
      eyebrow: "Privacy Policy",
      title: "Privacy Policy",
      description:
        "GDPR-related privacy information. The complete legal wording below is provided in German.",
      tocLabel: "Contents",
      legalInfoLabel: "Data protection information (GDPR)",
      sections: [
        {
          id: "notice",
          title: "Important note",
          content: (
            <p>
              This page contains the full legal privacy text in German to ensure legal consistency with
              the business location and governing law. For privacy-related questions, contact us at{" "}
              {COMPANY.email}.
            </p>
          ),
        },
        ...deSections,
        {
          id: "imprint-link",
          title: "Further legal details",
          content: (
            <p>
              Further provider details are available in the{" "}
              <Link href={getLocalizedHref("/impressum")}>Imprint</Link>.
            </p>
          ),
        },
      ],
    },
    fr: {
      eyebrow: "Politique de confidentialite",
      title: "Politique de confidentialite",
      description:
        "Informations de protection des donnees (RGPD). Le texte juridique complet ci-dessous est fourni en allemand.",
      tocLabel: "Sommaire",
      legalInfoLabel: "Informations de protection des donnees (RGPD)",
      sections: [
        {
          id: "notice",
          title: "Information importante",
          content: (
            <p>
              Cette page contient le texte juridique complet en allemand afin d&apos;assurer la coherence
              juridique avec le droit applicable. Pour toute question sur la protection des donnees,
              contactez-nous a l&apos;adresse {COMPANY.email}.
            </p>
          ),
        },
        ...deSections,
        {
          id: "impressum-link",
          title: "Informations legales complementaires",
          content: (
            <p>
              Les informations legales complementaires figurent dans les{" "}
              <Link href={getLocalizedHref("/impressum")}>mentions legales</Link>.
            </p>
          ),
        },
      ],
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
