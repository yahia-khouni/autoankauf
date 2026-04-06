import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Impressum | Autoankauf Deutschland",
  description: "Impressum und rechtliche Informationen von Autoankauf Deutschland.",
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

  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <div className="prose max-w-none">
          <h2>Angaben gemas § 5 TMG</h2>
          <p>
            [Firmenname]<br />
            [Strasse und Hausnummer]<br />
            [PLZ] [Stadt]
          </p>

          <h2>Vertreten durch</h2>
          <p>[Name des Geschaftsfuhrers]</p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +49 123 456 789 00<br />
            E-Mail: info@autoankauf.de
          </p>

          <h2>Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.<br />
            Registergericht: [Amtsgericht]<br />
            Registernummer: HRB [Nummer]
          </p>

          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemas § 27 a Umsatzsteuergesetz:<br />
            DE [Nummer]
          </p>

          <h2>Verantwortlich fur den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            [Name]<br />
            [Adresse]
          </p>

          <h2>Streitschlichtung</h2>
          <p>
            Die Europaische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Haftung fur Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemas § 7 Abs.1 TMG fur eigene Inhalte auf diesen Seiten 
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
            Diensteanbieter jedoch nicht verpflichtet, ubermittelte oder gespeicherte fremde 
            Informationen zu uberwachen oder nach Umstanden zu forschen, die auf eine rechtswidrige 
            Tatigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
            allgemeinen Gesetzen bleiben hiervon unberuhrt. Eine diesbezugliche Haftung ist jedoch 
            erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung moglich. Bei 
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte 
            umgehend entfernen.
          </p>

          <h2>Haftung fur Links</h2>
          <p>
            Unser Angebot enthalt Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
            Einfluss haben. Deshalb konnen wir fur diese fremden Inhalte auch keine Gewahr ubernehmen. 
            Fur die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
            der Seiten verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
            dem deutschen Urheberrecht. Die Vervielfaltigung, Bearbeitung, Verbreitung und jede Art 
            der Verwertung auserhalb der Grenzen des Urheberrechtes bedurfen der schriftlichen 
            Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  );
}
