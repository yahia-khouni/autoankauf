import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Autoankauf Deutschland",
  description: "Privacy policy and data protection information for Autoankauf Deutschland.",
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
      eyebrow: "Privacy Policy",
      title: "Datenschutzerklaerung",
      description:
        "Informationen zur Verarbeitung personenbezogener Daten bei der Nutzung unserer Website und Services.",
      tocLabel: "Inhaltsverzeichnis",
      legalInfoLabel: "Datenschutzinformationen gemaess DSGVO",
      sections: [
        {
          id: "ueberblick",
          title: "1. Datenschutz auf einen Blick",
          content: (
            <>
              <p>
                Wir verarbeiten personenbezogene Daten nur, soweit dies fuer den Betrieb unserer
                Website, die Bearbeitung von Anfragen und die Anbahnung oder Abwicklung von
                Geschaeftsbeziehungen erforderlich ist.
              </p>
              <p>
                Personenbezogene Daten sind alle Informationen, mit denen Sie persoenlich identifiziert
                werden koennen.
              </p>
            </>
          ),
        },
        {
          id: "verantwortliche-stelle",
          title: "2. Verantwortliche Stelle",
          content: (
            <>
              <p>
                Verantwortlich fuer die Datenverarbeitung:
                <br />
                Autoankauf Deutschland
                <br />
                [Name der juristischen Person]
                <br />
                [Strasse und Hausnummer], [PLZ] [Ort]
                <br />
                E-Mail: datenschutz@autoankauf.de
              </p>
              <p>
                Weitere Anbieterangaben finden Sie im{" "}
                <Link href={getLocalizedHref("/impressum")}>Impressum</Link>.
              </p>
            </>
          ),
        },
        {
          id: "rechtsgrundlagen",
          title: "3. Rechtsgrundlagen",
          content: (
            <ul>
              <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung und Vertragserfuellung)</li>
              <li>Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtungen)</li>
              <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
              <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
            </ul>
          ),
        },
        {
          id: "datenquellen",
          title: "4. Welche Daten wir verarbeiten",
          content: (
            <>
              <p>
                <strong>Technische Daten:</strong> z. B. IP-Adresse, Browsertyp, Datum/Uhrzeit,
                Logdaten beim Aufruf der Website.
              </p>
              <p>
                <strong>Kontakt- und Formulardaten:</strong> z. B. Name, Telefonnummer, E-Mail,
                Fahrzeugangaben und Nachrichtentexte.
              </p>
            </>
          ),
        },
        {
          id: "zwecke",
          title: "5. Zwecke der Datenverarbeitung",
          content: (
            <ul>
              <li>Bereitstellung und Sicherheit der Website</li>
              <li>Bearbeitung von Kontakt- und Angebotsanfragen</li>
              <li>Kundenkommunikation und Terminabstimmung</li>
              <li>Erfuellung gesetzlicher Dokumentationspflichten</li>
            </ul>
          ),
        },
        {
          id: "empfaenger",
          title: "6. Empfaenger und Speicherdauer",
          content: (
            <>
              <p>
                Wir setzen Auftragsverarbeiter ein (z. B. Hosting oder E-Mail-Versand), die Daten
                ausschliesslich auf Grundlage unserer Weisungen verarbeiten.
              </p>
              <p>
                Daten werden nur so lange gespeichert, wie es fuer den jeweiligen Zweck erforderlich
                ist oder gesetzliche Aufbewahrungspflichten bestehen.
              </p>
            </>
          ),
        },
        {
          id: "rechte",
          title: "7. Ihre Rechte",
          content: (
            <ul>
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Loeschung (Art. 17 DSGVO)</li>
              <li>Einschraenkung (Art. 18 DSGVO)</li>
              <li>Datenuebertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch (Art. 21 DSGVO)</li>
            </ul>
          ),
        },
        {
          id: "kontakt",
          title: "8. Datenschutz-Kontakt",
          content: (
            <p>
              Bei Fragen zum Datenschutz erreichen Sie uns unter:
              <br />
              datenschutz@autoankauf.de
            </p>
          ),
        },
      ],
    },
    en: {
      eyebrow: "Privacy Policy",
      title: "Privacy Policy",
      description:
        "Information about how we process personal data when you use our website and services.",
      tocLabel: "Contents",
      legalInfoLabel: "Data protection information under GDPR",
      sections: [
        {
          id: "overview",
          title: "1. Data protection at a glance",
          content: (
            <>
              <p>
                We process personal data only to the extent necessary to operate our website, respond
                to enquiries, and prepare or perform contractual relationships.
              </p>
              <p>
                Personal data means any information that can identify you directly or indirectly.
              </p>
            </>
          ),
        },
        {
          id: "controller",
          title: "2. Data controller",
          content: (
            <>
              <p>
                Responsible for data processing:
                <br />
                Autoankauf Deutschland
                <br />
                [Legal entity name]
                <br />
                [Street and number], [ZIP] [City]
                <br />
                E-mail: datenschutz@autoankauf.de
              </p>
              <p>
                Further provider details are available in the{" "}
                <Link href={getLocalizedHref("/impressum")}>Imprint</Link>.
              </p>
            </>
          ),
        },
        {
          id: "legal-basis",
          title: "3. Legal basis",
          content: (
            <ul>
              <li>Art. 6(1)(b) GDPR (pre-contractual and contractual measures)</li>
              <li>Art. 6(1)(c) GDPR (legal obligations)</li>
              <li>Art. 6(1)(f) GDPR (legitimate interests)</li>
              <li>Art. 6(1)(a) GDPR (consent, where required)</li>
            </ul>
          ),
        },
        {
          id: "data-categories",
          title: "4. Data we process",
          content: (
            <>
              <p>
                <strong>Technical data:</strong> e.g. IP address, browser type, date/time, server log
                data.
              </p>
              <p>
                <strong>Contact and form data:</strong> e.g. name, phone number, e-mail, vehicle data,
                and messages.
              </p>
            </>
          ),
        },
        {
          id: "purposes",
          title: "5. Processing purposes",
          content: (
            <ul>
              <li>Website operation and security</li>
              <li>Handling contact and quote requests</li>
              <li>Customer communication and scheduling</li>
              <li>Compliance with legal retention duties</li>
            </ul>
          ),
        },
        {
          id: "recipients",
          title: "6. Recipients and retention",
          content: (
            <>
              <p>
                We use processors (e.g. hosting and e-mail providers) who process data solely under our
                instructions.
              </p>
              <p>
                Data is retained only as long as necessary for the specific purpose or as required by
                law.
              </p>
            </>
          ),
        },
        {
          id: "rights",
          title: "7. Your rights",
          content: (
            <ul>
              <li>Access (Art. 15 GDPR)</li>
              <li>Rectification (Art. 16 GDPR)</li>
              <li>Erasure (Art. 17 GDPR)</li>
              <li>Restriction (Art. 18 GDPR)</li>
              <li>Data portability (Art. 20 GDPR)</li>
              <li>Objection (Art. 21 GDPR)</li>
            </ul>
          ),
        },
        {
          id: "contact",
          title: "8. Privacy contact",
          content: (
            <p>
              For privacy-related questions, contact us at:
              <br />
              datenschutz@autoankauf.de
            </p>
          ),
        },
      ],
    },
    fr: {
      eyebrow: "Politique de confidentialite",
      title: "Politique de confidentialite",
      description:
        "Informations sur le traitement des donnees personnelles lors de l'utilisation de notre site et de nos services.",
      tocLabel: "Sommaire",
      legalInfoLabel: "Informations de protection des donnees selon le RGPD",
      sections: [
        {
          id: "apercu",
          title: "1. Protection des donnees en bref",
          content: (
            <>
              <p>
                Nous traitons les donnees personnelles uniquement dans la mesure necessaire pour
                exploiter le site, traiter les demandes et preparer ou executer des relations
                contractuelles.
              </p>
              <p>
                Les donnees personnelles sont toutes les informations permettant de vous identifier.
              </p>
            </>
          ),
        },
        {
          id: "responsable",
          title: "2. Responsable du traitement",
          content: (
            <>
              <p>
                Responsable du traitement:
                <br />
                Autoankauf Deutschland
                <br />
                [Raison sociale]
                <br />
                [Rue et numero], [Code postal] [Ville]
                <br />
                E-mail: datenschutz@autoankauf.de
              </p>
              <p>
                Les informations legales complementaires figurent dans les{" "}
                <Link href={getLocalizedHref("/impressum")}>mentions legales</Link>.
              </p>
            </>
          ),
        },
        {
          id: "bases-legales",
          title: "3. Bases legales",
          content: (
            <ul>
              <li>Art. 6(1)(b) RGPD (mesures precontractuelles et contractuelles)</li>
              <li>Art. 6(1)(c) RGPD (obligations legales)</li>
              <li>Art. 6(1)(f) RGPD (interets legitimes)</li>
              <li>Art. 6(1)(a) RGPD (consentement, si necessaire)</li>
            </ul>
          ),
        },
        {
          id: "donnees",
          title: "4. Donnees traitees",
          content: (
            <>
              <p>
                <strong>Donnees techniques:</strong> adresse IP, type de navigateur, date/heure,
                journaux serveur.
              </p>
              <p>
                <strong>Donnees de contact et formulaires:</strong> nom, telephone, e-mail,
                informations vehicule et messages.
              </p>
            </>
          ),
        },
        {
          id: "finalites",
          title: "5. Finalites du traitement",
          content: (
            <ul>
              <li>Exploitation et securite du site</li>
              <li>Traitement des demandes de contact et d'offre</li>
              <li>Communication client et planification</li>
              <li>Respect des obligations legales de conservation</li>
            </ul>
          ),
        },
        {
          id: "destinataires",
          title: "6. Destinataires et conservation",
          content: (
            <>
              <p>
                Nous faisons appel a des sous-traitants (hebergement, e-mail) qui traitent les donnees
                uniquement selon nos instructions.
              </p>
              <p>
                Les donnees sont conservees uniquement pendant la duree necessaire ou imposee par la
                loi.
              </p>
            </>
          ),
        },
        {
          id: "droits",
          title: "7. Vos droits",
          content: (
            <ul>
              <li>Acces (Art. 15 RGPD)</li>
              <li>Rectification (Art. 16 RGPD)</li>
              <li>Effacement (Art. 17 RGPD)</li>
              <li>Limitation (Art. 18 RGPD)</li>
              <li>Portabilite des donnees (Art. 20 RGPD)</li>
              <li>Opposition (Art. 21 RGPD)</li>
            </ul>
          ),
        },
        {
          id: "contact",
          title: "8. Contact protection des donnees",
          content: (
            <p>
              Pour toute question relative aux donnees personnelles:
              <br />
              datenschutz@autoankauf.de
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
