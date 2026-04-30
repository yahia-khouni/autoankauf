import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: `AGB | ${COMPANY.legalName}`,
  description: "Allgemeine Geschaeftsbedingungen fuer Anfragen, Angebote und Fahrzeugankauf.",
  keywords: ["AGB", "Autoankauf", "Fahrzeugankauf", "Vertragsbedingungen", "Autoankauf SR"],
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

const deSections: Array<{ id: string; title: string; content: ReactNode }> = [
  {
    id: "anbieter",
    title: "1. Anbieter",
    content: (
      <p>
        Diese Allgemeinen Geschaeftsbedingungen gelten fuer die Nutzung der Website und die
        Anbahnung von Fahrzeugankaeufen durch:
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
    id: "geltungsbereich",
    title: "2. Geltungsbereich",
    content: (
      <p>
        Diese AGB gelten fuer alle Anfragen, Angebote, Vorbewertungen und Fahrzeugankaeufe, die ueber
        unsere Website, per Telefon, per E-Mail, per WhatsApp oder persoenlich angebahnt werden.
        Unser Angebot richtet sich an private und gewerbliche Fahrzeugverkaeufer.
      </p>
    ),
  },
  {
    id: "leistungen",
    title: "3. Leistungen von Autoankauf SR",
    content: (
      <>
        <p>Wir bieten den Ankauf gebrauchter Fahrzeuge an, insbesondere:</p>
        <ul>
          <li>Gebrauchtwagen</li>
          <li>Unfallwagen</li>
          <li>Fahrzeuge mit Motorschaden</li>
          <li>Fahrzeuge ohne TUEV</li>
          <li>Fahrzeuge mit hoher Laufleistung</li>
          <li>Exportfahrzeuge</li>
          <li>Transporter und Nutzfahrzeuge</li>
          <li>Fahrzeuge mit technischen oder optischen Maengeln</li>
        </ul>
        <p>
          Ueber die Website koennen Nutzer Fahrzeugdaten uebermitteln und eine unverbindliche
          Einschaetzung oder ein Ankaufangebot anfragen.
        </p>
      </>
    ),
  },
  {
    id: "anfrage-website",
    title: "4. Anfrage ueber die Website",
    content: (
      <p>
        Die Uebermittlung einer Anfrage ueber die Website stellt noch kein verbindliches
        Verkaufsangebot und keinen Kaufvertrag dar. Nutzer geben Fahrzeugdaten nach bestem Wissen an;
        wir koennen daraufhin Kontakt aufnehmen, Rueckfragen stellen oder ein unverbindliches Angebot
        abgeben.
      </p>
    ),
  },
  {
    id: "unverbindlichkeit",
    title: "5. Unverbindlichkeit der Online-Bewertung",
    content: (
      <p>
        Alle online, telefonisch, per E-Mail oder WhatsApp genannten Preiseinschaetzungen sind
        zunaechst unverbindlich, solange das Fahrzeug nicht besichtigt und geprueft wurde. Ein
        endgueltiger Ankaufspreis kann erst nach Pruefung des Fahrzeugs und der Unterlagen festgelegt
        werden.
      </p>
    ),
  },
  {
    id: "vertragsschluss",
    title: "6. Vertragsschluss",
    content: (
      <>
        <p>
          Ein Kaufvertrag kommt erst zustande, wenn beide Parteien den Verkauf ausdruecklich
          vereinbaren und die wesentlichen Vertragsbestandteile feststehen, insbesondere:
        </p>
        <ul>
          <li>Fahrzeug</li>
          <li>Verkaeufer</li>
          <li>Kaeufer</li>
          <li>Kaufpreis</li>
          <li>Uebergabezeitpunkt</li>
          <li>Fahrzeugpapiere</li>
          <li>Zahlungsart</li>
        </ul>
        <p>
          Die blosse Uebermittlung eines Formulars, eine automatische Bestaetigungsmail oder eine erste
          Preiseinschaetzung fuehrt noch nicht zum Vertragsschluss.
        </p>
      </>
    ),
  },
  {
    id: "pflichten-verkaeufer",
    title: "7. Pflichten des Verkaeufers",
    content: (
      <>
        <p>
          Der Verkaeufer verpflichtet sich, alle Angaben zum Fahrzeug vollstaendig und wahrheitsgemaess
          zu machen.
        </p>
        <p>Insbesondere sind mitzuteilen:</p>
        <ul>
          <li>Unfallschaeden, Motor- oder Getriebeschaeden</li>
          <li>Manipulationen am Kilometerstand</li>
          <li>bekannte technische Maengel</li>
          <li>fehlende Fahrzeugpapiere</li>
          <li>bestehende Finanzierung, Sicherungsuebereignung oder Eigentumsvorbehalt</li>
          <li>Import-/Exportstatus</li>
          <li>Anzahl der Fahrzeughalter (soweit bekannt)</li>
          <li>abgelaufener TUEV</li>
          <li>sonstige erhebliche Maengel</li>
        </ul>
        <p>
          Der Verkaeufer versichert, verfuegungsberechtigt zu sein und das Fahrzeug verkaufen zu
          duerfen.
        </p>
      </>
    ),
  },
  {
    id: "fahrzeugpapiere",
    title: "8. Fahrzeugpapiere und Eigentum",
    content: (
      <>
        <p>Bei Verkauf sind grundsaetzlich folgende Unterlagen vorzulegen:</p>
        <ul>
          <li>Zulassungsbescheinigung Teil I (soweit vorhanden)</li>
          <li>Zulassungsbescheinigung Teil II</li>
          <li>gueltiger Ausweis oder Identitaetsnachweis</li>
          <li>vorhandene Schluessel</li>
          <li>Serviceheft, Rechnungen oder sonstige Unterlagen (soweit vorhanden)</li>
        </ul>
        <p>
          Fehlen Unterlagen, ist dies vor Vertragsschluss mitzuteilen. Wir sind nicht verpflichtet, ein
          Fahrzeug ohne vollstaendige Unterlagen anzukaufen.
        </p>
      </>
    ),
  },
  {
    id: "kaufpreis-zahlung",
    title: "9. Kaufpreis und Zahlung",
    content: (
      <p>
        Der Kaufpreis wird individuell vereinbart. Die Zahlung erfolgt je nach Vereinbarung bar, per
        Echtzeitueberweisung oder per Bankueberweisung. Die Uebergabe des Fahrzeugs erfolgt
        grundsaetzlich erst nach Zahlung oder verbindlicher Zahlungsvereinbarung.
      </p>
    ),
  },
  {
    id: "abholung-uebergabe",
    title: "10. Abholung und Uebergabe",
    content: (
      <p>
        Eine Fahrzeugabholung kann nach Vereinbarung erfolgen. Ort und Zeitpunkt werden individuell
        abgestimmt. Entstehen durch falsche Angaben, Nichterscheinen oder fehlende Unterlagen
        unnoetige Kosten, kann der Ankauf abgelehnt werden.
      </p>
    ),
  },
  {
    id: "abmeldung",
    title: "11. Abmeldung des Fahrzeugs",
    content: (
      <p>
        Die Abmeldung erfolgt je nach Vereinbarung durch den Verkaeufer oder durch uns. Wird
        vereinbart, dass wir die Abmeldung uebernehmen, erfolgt diese innerhalb angemessener Frist. Bis
        zur tatsaechlichen Abmeldung koennen Pflichten aus Versicherung, Steuer oder
        Halterverantwortung beim bisherigen Halter verbleiben, soweit gesetzlich nichts anderes gilt.
      </p>
    ),
  },
  {
    id: "falsche-angaben",
    title: "12. Haftung fuer falsche Angaben",
    content: (
      <p>
        Macht der Verkaeufer vorsaetzlich oder fahrlaessig falsche Angaben zum Fahrzeug (insbesondere zu
        Unfallschaeden, Kilometerstand, Eigentum, Finanzierung oder erheblichen Maengeln), koennen wir
        vom Vertrag zuruecktreten oder Schadensersatz geltend machen.
      </p>
    ),
  },
  {
    id: "gewaehrleistung",
    title: "13. Gewaehrleistung beim Ankauf",
    content: (
      <p>
        Beim Ankauf gelten die gesetzlichen Regelungen. Bei Verkaeufen durch Verbraucher an Unternehmer
        ist ein Gewaehrleistungsausschluss zugunsten des Verkaeufers grundsaetzlich moeglich, soweit
        gesetzlich zulaessig und individuell vereinbart. Diese AGB begruenden keine automatische
        Garantie oder Beschaffenheitsvereinbarung.
      </p>
    ),
  },
  {
    id: "widerrufsrecht",
    title: "14. Widerrufsrecht",
    content: (
      <p>
        Soweit Verbraucher ueber die Website einen Fernabsatzvertrag schliessen, koennen gesetzliche
        Widerrufsrechte bestehen. Da ueber diese Website in der Regel zunaechst nur eine unverbindliche
        Anfrage gestellt wird und der Kaufvertrag erst nach individueller Pruefung und Vereinbarung
        zustande kommt, entsteht durch das Absenden des Formulars noch kein Kaufvertrag.
      </p>
    ),
  },
  {
    id: "keine-pflicht",
    title: "15. Keine Pflicht zum Ankauf",
    content: (
      <>
        <p>Wir sind nicht verpflichtet, jedes angebotene Fahrzeug anzukaufen.</p>
        <p>Ein Ankauf kann insbesondere abgelehnt werden, wenn:</p>
        <ul>
          <li>Angaben unvollstaendig oder falsch sind</li>
          <li>Fahrzeugpapiere fehlen</li>
          <li>Eigentumsverhaeltnisse unklar sind</li>
          <li>der Zustand erheblich von den Angaben abweicht</li>
          <li>der Verkaeufer nicht verfuegungsberechtigt ist</li>
          <li>wirtschaftliche oder rechtliche Gruende entgegenstehen</li>
        </ul>
      </>
    ),
  },
  {
    id: "nutzung-website",
    title: "16. Nutzung der Website",
    content: (
      <p>
        Die Website darf nur rechtmaessig genutzt werden. Es ist untersagt, falsche Daten einzugeben,
        fremde Identitaeten zu verwenden oder die Website technisch zu missbrauchen. Wir bemuehen uns
        um eine staendige Verfuegbarkeit, uebernehmen jedoch keine Garantie fuer ununterbrochene
        Erreichbarkeit.
      </p>
    ),
  },
  {
    id: "datenschutz",
    title: "17. Datenschutz",
    content: (
      <p>
        Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
        <Link href="/datenschutz">Datenschutzerklaerung</Link>.
      </p>
    ),
  },
  {
    id: "streitbeilegung",
    title: "18. Streitbeilegung",
    content: (
      <>
        <p>
          Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
          <br />
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen, sofern keine gesetzliche Pflicht besteht.
        </p>
      </>
    ),
  },
  {
    id: "anwendbares-recht",
    title: "19. Anwendbares Recht",
    content: (
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Bei Verbrauchern gilt diese Rechtswahl nur,
        soweit dadurch keine zwingenden Verbraucherschutzvorschriften des Staates eingeschraenkt werden,
        in dem der Verbraucher seinen gewoehnlichen Aufenthalt hat.
      </p>
    ),
  },
  {
    id: "salvatorische-klausel",
    title: "20. Salvatorische Klausel",
    content: (
      <p>
        Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der
        uebrigen Bestimmungen unberuehrt. Anstelle der unwirksamen Regelung gelten die gesetzlichen
        Vorschriften.
      </p>
    ),
  },
];

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

  const localizedSections = deSections.map((section) => {
    if (section.id !== "datenschutz") return section;
    return {
      ...section,
      content: (
        <p>
          Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
          <Link href={getLocalizedHref("/datenschutz")}>Datenschutzerklaerung</Link>.
        </p>
      ),
    };
  });

  const copyByLocale: Record<Locale, LocalizedCopy> = {
    de: {
      eyebrow: "AGB",
      title: "Allgemeine Geschaeftsbedingungen",
      description: "Vertragsbedingungen fuer Ankaufsanfragen und Fahrzeugankaeufe.",
      tocLabel: "Inhaltsverzeichnis",
      legalInfoLabel: "Vertragsbedingungen gemaess deutschem Zivilrecht",
      sections: localizedSections,
    },
    en: {
      eyebrow: "Terms & Conditions",
      title: "Terms & Conditions",
      description:
        "The complete legally binding terms are provided in German below for legal consistency.",
      tocLabel: "Contents",
      legalInfoLabel: "Contract terms under German civil law",
      sections: [
        {
          id: "notice",
          title: "Important note",
          content: (
            <p>
              This page contains the full legal terms in German as the governing language for our
              contractual process in Germany.
            </p>
          ),
        },
        ...localizedSections,
      ],
    },
    fr: {
      eyebrow: "Conditions generales",
      title: "Conditions generales",
      description:
        "Le texte contractuel complet juridiquement contraignant est fourni en allemand ci-dessous.",
      tocLabel: "Sommaire",
      legalInfoLabel: "Conditions contractuelles selon le droit allemand",
      sections: [
        {
          id: "notice",
          title: "Information importante",
          content: (
            <p>
              Cette page contient le texte contractuel complet en allemand, langue de reference pour
              les contrats conclus en Allemagne.
            </p>
          ),
        },
        ...localizedSections,
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
