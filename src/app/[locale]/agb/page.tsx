import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions | Autoankauf Deutschland",
  description: "Terms and conditions for vehicle purchase services by Autoankauf Deutschland.",
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

export default async function AGBPage({
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
      eyebrow: "Terms & Conditions",
      title: "Allgemeine Geschaeftsbedingungen",
      description:
        "Vertragsbedingungen fuer Ankaufsanfragen und Fahrzeugankaeufe durch Autoankauf Deutschland.",
      tocLabel: "Inhaltsverzeichnis",
      legalInfoLabel: "Vertragsbedingungen gemaess deutschem Zivilrecht",
      sections: [
        {
          id: "geltungsbereich",
          title: "1. Geltungsbereich",
          content: (
            <p>
              Diese AGB gelten fuer alle vorvertraglichen Kontakte, Ankaufsangebote und
              Kaufvertraege zwischen Autoankauf Deutschland (nachfolgend "Ankaeufer") und dem
              Verkaeufer eines Fahrzeugs.
            </p>
          ),
        },
        {
          id: "leistung",
          title: "2. Leistungsbeschreibung",
          content: (
            <>
              <p>
                Gegenstand unserer Leistung ist der Ankauf gebrauchter Fahrzeuge nach individueller
                Pruefung des Fahrzeugzustands.
              </p>
              <p>
                Erstbewertungen auf Basis uebermittelter Angaben sind unverbindlich und stellen kein
                verbindliches Kaufangebot dar.
              </p>
            </>
          ),
        },
        {
          id: "vertragsschluss",
          title: "3. Vertragsschluss",
          content: (
            <ol>
              <li>Anfragen ueber Website, Telefon oder E-Mail sind unverbindlich.</li>
              <li>Ein verbindliches Angebot folgt erst nach individueller Fahrzeugpruefung.</li>
              <li>Ein Kaufvertrag entsteht erst durch beiderseitige Annahme.</li>
            </ol>
          ),
        },
        {
          id: "mitwirkung",
          title: "4. Pflichten des Verkaeufers",
          content: (
            <ul>
              <li>Wahrheitsgemaesse und vollstaendige Fahrzeugangaben</li>
              <li>Mitteilung bekannter Maengel und Vorschaden</li>
              <li>Uebergabe aller erforderlichen Unterlagen und Schluessel</li>
              <li>Nachweis der Verfuegungsberechtigung am Fahrzeug</li>
            </ul>
          ),
        },
        {
          id: "preis-zahlung",
          title: "5. Preis, Zahlung und Uebergabe",
          content: (
            <>
              <p>
                Der finale Kaufpreis wird auf Basis des tatsaechlichen Fahrzeugzustands festgelegt.
              </p>
              <p>
                Die Zahlung erfolgt nach Vereinbarung. Fahrzeug und Unterlagen werden Zug um Zug gegen
                Zahlung uebergeben.
              </p>
            </>
          ),
        },
        {
          id: "haftung",
          title: "6. Haftung",
          content: (
            <>
              <p>
                Der Verkaeufer haftet fuer die Richtigkeit seiner Angaben. Rechte wegen arglistig
                verschwiegener Maengel bleiben unberuehrt.
              </p>
              <p>
                Unsere Haftung richtet sich nach den gesetzlichen Bestimmungen.
              </p>
            </>
          ),
        },
        {
          id: "datenschutz",
          title: "7. Datenschutz",
          content: (
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <Link href={getLocalizedHref("/datenschutz")}>Datenschutzerklaerung</Link>.
            </p>
          ),
        },
        {
          id: "schluss",
          title: "8. Schlussbestimmungen",
          content: (
            <>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts,
                soweit keine zwingenden Verbraucherschutzvorschriften entgegenstehen.
              </p>
              <p>
                Sollten einzelne Regelungen unwirksam sein, bleibt die Wirksamkeit der uebrigen
                Bestimmungen unberuehrt.
              </p>
            </>
          ),
        },
      ],
    },
    en: {
      eyebrow: "Terms & Conditions",
      title: "Terms & Conditions",
      description:
        "Contract terms for vehicle purchase enquiries and transactions with Autoankauf Deutschland.",
      tocLabel: "Contents",
      legalInfoLabel: "Contract terms under applicable German civil law",
      sections: [
        {
          id: "scope",
          title: "1. Scope",
          content: (
            <p>
              These Terms & Conditions apply to all pre-contractual contacts, purchase offers, and
              purchase agreements between Autoankauf Deutschland (the "Buyer") and the vehicle seller.
            </p>
          ),
        },
        {
          id: "service",
          title: "2. Service description",
          content: (
            <>
              <p>
                Our service consists of purchasing used vehicles after individual condition review.
              </p>
              <p>
                Initial valuations based on submitted information are non-binding and do not constitute
                a binding purchase offer.
              </p>
            </>
          ),
        },
        {
          id: "conclusion",
          title: "3. Contract conclusion",
          content: (
            <ol>
              <li>Requests via website, phone, or e-mail are non-binding.</li>
              <li>A binding offer is issued only after individual vehicle review.</li>
              <li>A purchase agreement is concluded only upon mutual acceptance.</li>
            </ol>
          ),
        },
        {
          id: "seller-obligations",
          title: "4. Seller obligations",
          content: (
            <ul>
              <li>Provide complete and truthful vehicle information</li>
              <li>Disclose known defects and prior damage</li>
              <li>Provide all required documents and keys</li>
              <li>Prove legal right to dispose of the vehicle</li>
            </ul>
          ),
        },
        {
          id: "price-payment",
          title: "5. Price, payment and handover",
          content: (
            <>
              <p>
                The final purchase price is determined based on the actual vehicle condition.
              </p>
              <p>
                Payment is made as agreed. Vehicle and documents are handed over against payment.
              </p>
            </>
          ),
        },
        {
          id: "liability",
          title: "6. Liability",
          content: (
            <>
              <p>
                The seller is liable for the accuracy of the provided information. Rights related to
                fraudulently concealed defects remain unaffected.
              </p>
              <p>Our liability is governed by applicable statutory law.</p>
            </>
          ),
        },
        {
          id: "privacy",
          title: "7. Data protection",
          content: (
            <p>
              Information on personal data processing is available in our{" "}
              <Link href={getLocalizedHref("/datenschutz")}>Privacy Policy</Link>.
            </p>
          ),
        },
        {
          id: "final",
          title: "8. Final provisions",
          content: (
            <>
              <p>
                German law applies, excluding the UN Convention on Contracts for the International
                Sale of Goods, unless mandatory consumer protection law states otherwise.
              </p>
              <p>
                If any provision is invalid, the validity of the remaining provisions remains
                unaffected.
              </p>
            </>
          ),
        },
      ],
    },
    fr: {
      eyebrow: "Conditions generales",
      title: "Conditions generales",
      description:
        "Conditions contractuelles pour les demandes d'achat et les transactions de vehicules avec Autoankauf Deutschland.",
      tocLabel: "Sommaire",
      legalInfoLabel: "Conditions contractuelles selon le droit civil allemand",
      sections: [
        {
          id: "champ",
          title: "1. Champ d'application",
          content: (
            <p>
              Les presentes conditions generales s'appliquent a tous les contacts precontractuels,
              offres d'achat et contrats conclus entre Autoankauf Deutschland (l'"Acheteur") et le
              vendeur du vehicule.
            </p>
          ),
        },
        {
          id: "prestations",
          title: "2. Description des prestations",
          content: (
            <>
              <p>
                Notre prestation consiste en l'achat de vehicules d'occasion apres evaluation
                individuelle de leur etat.
              </p>
              <p>
                Les estimations initiales basees sur les informations transmises sont non contraignantes.
              </p>
            </>
          ),
        },
        {
          id: "conclusion",
          title: "3. Conclusion du contrat",
          content: (
            <ol>
              <li>Les demandes via site, telephone ou e-mail sont non contraignantes.</li>
              <li>Une offre ferme est etablie apres verification du vehicule.</li>
              <li>Le contrat est conclu uniquement apres acceptation mutuelle.</li>
            </ol>
          ),
        },
        {
          id: "obligations",
          title: "4. Obligations du vendeur",
          content: (
            <ul>
              <li>Fournir des informations exactes et completes sur le vehicule</li>
              <li>Signaler les defauts et dommages connus</li>
              <li>Remettre tous les documents et cles necessaires</li>
              <li>Prouver le droit de disposer du vehicule</li>
            </ul>
          ),
        },
        {
          id: "prix-paiement",
          title: "5. Prix, paiement et remise",
          content: (
            <>
              <p>Le prix final est fixe selon l'etat reel du vehicule.</p>
              <p>
                Le paiement est effectue selon accord. La remise du vehicule et des documents se fait
                contre paiement.
              </p>
            </>
          ),
        },
        {
          id: "responsabilite",
          title: "6. Responsabilite",
          content: (
            <>
              <p>
                Le vendeur est responsable de l'exactitude des informations communiquees. Les droits
                en cas de vice dissimule restent reserves.
              </p>
              <p>Notre responsabilite est regie par les dispositions legales applicables.</p>
            </>
          ),
        },
        {
          id: "protection-donnees",
          title: "7. Protection des donnees",
          content: (
            <p>
              Les informations relatives au traitement des donnees personnelles figurent dans notre{" "}
              <Link href={getLocalizedHref("/datenschutz")}>Politique de confidentialite</Link>.
            </p>
          ),
        },
        {
          id: "finales",
          title: "8. Dispositions finales",
          content: (
            <>
              <p>
                Le droit allemand s'applique, a l'exclusion de la Convention des Nations Unies sur la
                vente internationale de marchandises, sous reserve des regles de protection du
                consommateur obligatoires.
              </p>
              <p>
                Si une disposition est invalide, les autres dispositions restent pleinement valables.
              </p>
            </>
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
