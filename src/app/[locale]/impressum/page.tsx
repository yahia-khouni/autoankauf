import type { ReactNode } from "react";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Imprint | Autoankauf Deutschland",
  description: "Legal provider information for Autoankauf Deutschland.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copyByLocale = {
    de: {
      eyebrow: "Imprint",
      title: "Impressum",
      description:
        "Rechtliche Pflichtangaben zum Betreiber dieser Website gemaess den geltenden Vorgaben in Deutschland.",
      tocLabel: "Inhaltsverzeichnis",
      legalInfoLabel: "Rechtliche Informationen gemaess deutschem Recht",
      sections: [
        {
          id: "anbieter",
          title: "1. Anbieterkennzeichnung",
          content: (
            <>
              <p>
                Autoankauf Deutschland
                <br />
                [Name der juristischen Person]
                <br />
                [Strasse und Hausnummer]
                <br />
                [PLZ] [Ort], Deutschland
              </p>
              <p>
                Vertreten durch die Geschaeftsleitung:
                <br />
                [Vorname Nachname]
              </p>
            </>
          ),
        },
        {
          id: "kontakt",
          title: "2. Kontakt",
          content: (
            <>
              <p>
                Telefon: +49 123 456 789 00
                <br />
                E-Mail: info@autoankauf.de
              </p>
              <p>
                Fuer rechtsverbindliche Erklaerungen bevorzugen wir die Kontaktaufnahme in Textform per
                E-Mail.
              </p>
            </>
          ),
        },
        {
          id: "register",
          title: "3. Register und Steuerangaben",
          content: (
            <>
              <p>
                Handelsregister: [Amtsgericht]
                <br />
                Registernummer: [HRB-Nummer]
              </p>
              <p>
                Umsatzsteuer-Identifikationsnummer gemaess UStG:
                <br />
                [DE-Nummer]
              </p>
            </>
          ),
        },
        {
          id: "inhaltlich",
          title: "4. Inhaltlich Verantwortlicher",
          content: (
            <p>
              Verantwortlich fuer journalistisch-redaktionelle Inhalte:
              <br />
              [Vorname Nachname]
              <br />
              [Anschrift, falls abweichend]
            </p>
          ),
        },
        {
          id: "streitbeilegung",
          title: "5. Verbraucherstreitbeilegung",
          content: (
            <>
              <p>
                Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:
                <br />
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </>
          ),
        },
        {
          id: "haftung",
          title: "6. Haftung fuer Inhalte und Links",
          content: (
            <>
              <p>
                Als Diensteanbieter sind wir fuer eigene Inhalte auf diesen Seiten nach den allgemeinen
                Gesetzen verantwortlich. Wir uebernehmen keine Gewaehr fuer die Aktualitaet,
                Vollstaendigkeit und Richtigkeit der bereitgestellten Informationen.
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
          title: "7. Urheberrecht",
          content: (
            <p>
              Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen
              Urheberrecht. Vervielfaeltigung, Bearbeitung und Verwertung ausserhalb der gesetzlichen
              Grenzen beduerfen der vorherigen Zustimmung des jeweiligen Rechteinhabers.
            </p>
          ),
        },
      ],
    },
    en: {
      eyebrow: "Imprint",
      title: "Imprint",
      description:
        "Mandatory legal provider information for the operator of this website in accordance with German law.",
      tocLabel: "Contents",
      legalInfoLabel: "Legal information under applicable German law",
      sections: [
        {
          id: "provider",
          title: "1. Provider Identification",
          content: (
            <>
              <p>
                Autoankauf Deutschland
                <br />
                [Legal entity name]
                <br />
                [Street and number]
                <br />
                [ZIP] [City], Germany
              </p>
              <p>
                Represented by management:
                <br />
                [First name Last name]
              </p>
            </>
          ),
        },
        {
          id: "contact",
          title: "2. Contact",
          content: (
            <>
              <p>
                Phone: +49 123 456 789 00
                <br />
                E-Mail: info@autoankauf.de
              </p>
              <p>
                For legally binding declarations, we recommend contacting us in text form by email.
              </p>
            </>
          ),
        },
        {
          id: "register",
          title: "3. Registry and Tax Information",
          content: (
            <>
              <p>
                Commercial register: [Local court]
                <br />
                Register number: [HRB number]
              </p>
              <p>
                VAT identification number:
                <br />
                [DE number]
              </p>
            </>
          ),
        },
        {
          id: "editorial",
          title: "4. Content Responsibility",
          content: (
            <p>
              Responsible for editorial content:
              <br />
              [First name Last name]
              <br />
              [Address, if different]
            </p>
          ),
        },
        {
          id: "dispute",
          title: "5. Consumer Dispute Resolution",
          content: (
            <>
              <p>
                The European Commission provides an Online Dispute Resolution platform:
                <br />
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                We are neither obligated nor willing to participate in dispute resolution proceedings
                before a consumer arbitration board.
              </p>
            </>
          ),
        },
        {
          id: "liability",
          title: "6. Liability for Content and Links",
          content: (
            <>
              <p>
                As a service provider, we are responsible for our own content according to general
                laws. We do not guarantee the timeliness, completeness, or accuracy of provided
                information.
              </p>
              <p>
                Our website contains links to external third-party websites. We have no influence on
                their content and assume no liability for those external contents.
              </p>
            </>
          ),
        },
        {
          id: "copyright",
          title: "7. Copyright",
          content: (
            <p>
              Content and works created on this website are subject to German copyright law.
              Reproduction, editing, and any use beyond legal limits require prior consent of the
              respective rights holder.
            </p>
          ),
        },
      ],
    },
    fr: {
      eyebrow: "Mentions legales",
      title: "Mentions legales",
      description:
        "Informations legales obligatoires concernant l'exploitant de ce site, conformement au droit allemand.",
      tocLabel: "Sommaire",
      legalInfoLabel: "Informations juridiques selon le droit allemand applicable",
      sections: [
        {
          id: "fournisseur",
          title: "1. Identification du fournisseur",
          content: (
            <>
              <p>
                Autoankauf Deutschland
                <br />
                [Raison sociale]
                <br />
                [Rue et numero]
                <br />
                [Code postal] [Ville], Allemagne
              </p>
              <p>
                Representation legale:
                <br />
                [Prenom Nom]
              </p>
            </>
          ),
        },
        {
          id: "contact",
          title: "2. Contact",
          content: (
            <>
              <p>
                Telephone: +49 123 456 789 00
                <br />
                E-mail: info@autoankauf.de
              </p>
              <p>
                Pour les declarations juridiquement contraignantes, nous recommandons un contact par
                e-mail.
              </p>
            </>
          ),
        },
        {
          id: "registre",
          title: "3. Registre et informations fiscales",
          content: (
            <>
              <p>
                Registre du commerce: [Tribunal competent]
                <br />
                Numero d'immatriculation: [Numero HRB]
              </p>
              <p>
                Numero de TVA intracommunautaire:
                <br />
                [Numero DE]
              </p>
            </>
          ),
        },
        {
          id: "responsable",
          title: "4. Responsable du contenu",
          content: (
            <p>
              Responsable editorial:
              <br />
              [Prenom Nom]
              <br />
              [Adresse, si differente]
            </p>
          ),
        },
        {
          id: "litiges",
          title: "5. Reglement des litiges",
          content: (
            <>
              <p>
                La Commission europeenne met a disposition une plateforme de reglement en ligne des
                litiges:
                <br />
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Nous ne sommes ni tenus ni disposes a participer a une procedure de mediation pour les
                consommateurs.
              </p>
            </>
          ),
        },
        {
          id: "responsabilite",
          title: "6. Responsabilite relative au contenu et aux liens",
          content: (
            <>
              <p>
                En tant que fournisseur de services, nous sommes responsables de notre propre contenu
                conformement aux lois generales. Aucune garantie n'est accordee sur l'actualite,
                l'exhaustivite ou l'exactitude des informations.
              </p>
              <p>
                Notre site contient des liens vers des sites tiers externes. Nous n'avons aucun
                controle sur ces contenus et declinons toute responsabilite a leur egard.
              </p>
            </>
          ),
        },
        {
          id: "droit-auteur",
          title: "7. Droit d'auteur",
          content: (
            <p>
              Les contenus et oeuvres de ce site sont soumis au droit d'auteur allemand. Toute
              reproduction, adaptation ou utilisation au-dela des limites legales necessite
              l'autorisation prealable du titulaire des droits.
            </p>
          ),
        },
      ],
    },
  } satisfies Record<
    Locale,
    {
      eyebrow: string;
      title: string;
      description: string;
      tocLabel: string;
      legalInfoLabel: string;
      sections: Array<{ id: string; title: string; content: ReactNode }>;
    }
  >;

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
