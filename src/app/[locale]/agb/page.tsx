import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "AGB | Autoankauf Deutschland",
  description: "Allgemeine Geschaftsbedingungen von Autoankauf Deutschland.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AGBPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Allgemeine Geschaftsbedingungen</h1>
        
        <div className="prose max-w-none">
          <h2>§ 1 Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschaftsbedingungen (AGB) gelten fur alle Geschaftsbeziehungen 
            zwischen [Firmenname] (nachfolgend "Ankaufer") und dem Verkaufer. Maßgeblich ist 
            die jeweils zum Zeitpunkt des Vertragsschlusses gultige Fassung.
          </p>

          <h2>§ 2 Vertragsschluss</h2>
          <p>
            (1) Die Darstellung unserer Dienstleistungen auf der Website stellt kein rechtlich 
            bindendes Angebot dar, sondern eine Aufforderung zur Abgabe eines Angebots.
          </p>
          <p>
            (2) Durch das Ausfullen des Kontaktformulars gibt der Verkaufer ein unverbindliches 
            Angebot zur Kontaktaufnahme ab.
          </p>
          <p>
            (3) Der Kaufvertrag kommt erst zustande, wenn beide Parteien einen schriftlichen 
            Kaufvertrag unterzeichnet haben.
          </p>

          <h2>§ 3 Fahrzeugbewertung</h2>
          <p>
            (1) Die erste Bewertung erfolgt auf Basis der vom Verkaufer mitgeteilten Angaben 
            und Fotos. Diese Bewertung ist unverbindlich.
          </p>
          <p>
            (2) Ein verbindliches Angebot erfolgt erst nach Besichtigung und Prufung des 
            Fahrzeugs vor Ort.
          </p>
          <p>
            (3) Abweichungen zwischen den Angaben des Verkaufers und dem tatsachlichen 
            Fahrzeugzustand konnen zu einer Anpassung des Angebots fuhren.
          </p>

          <h2>§ 4 Kaufpreis und Zahlung</h2>
          <p>
            (1) Der endgultige Kaufpreis wird nach der Fahrzeugbesichtigung vereinbart.
          </p>
          <p>
            (2) Die Zahlung erfolgt nach Wahl des Verkaufers bar oder per Uberweisung 
            bei Fahrzeugubergabe.
          </p>
          <p>
            (3) Die Zahlung ist fallig Zug um Zug gegen Ubergabe des Fahrzeugs und aller 
            erforderlichen Dokumente.
          </p>

          <h2>§ 5 Fahrzeugubergabe</h2>
          <p>
            (1) Bei Ubergabe sind folgende Dokumente zu ubergeben:
          </p>
          <ul>
            <li>Zulassungsbescheinigung Teil I (Fahrzeugschein)</li>
            <li>Zulassungsbescheinigung Teil II (Fahrzeugbrief)</li>
            <li>Alle vorhandenen Fahrzeugschlussel</li>
            <li>Serviceheft (soweit vorhanden)</li>
            <li>HU-Bescheinigung (soweit vorhanden)</li>
          </ul>
          <p>
            (2) Der Verkaufer versichert, dass er berechtigt ist, uber das Fahrzeug zu 
            verfugen und dass keine Rechte Dritter bestehen.
          </p>

          <h2>§ 6 Gewahrleistung</h2>
          <p>
            (1) Der Verkaufer versichert, dass alle gemachten Angaben uber das Fahrzeug 
            der Wahrheit entsprechen.
          </p>
          <p>
            (2) Versteckte Mangel, die dem Verkaufer bekannt waren und nicht mitgeteilt 
            wurden, konnen zur Ruckabwicklung des Kaufvertrags oder Schadensersatz fuhren.
          </p>

          <h2>§ 7 Rucktrittsrecht</h2>
          <p>
            (1) Bis zur Unterzeichnung des Kaufvertrags konnen beide Parteien jederzeit 
            von den Verhandlungen zurucktreten.
          </p>
          <p>
            (2) Nach Unterzeichnung des Kaufvertrags ist ein Rucktritt nur aus wichtigem 
            Grund moglich.
          </p>

          <h2>§ 8 Datenschutz</h2>
          <p>
            Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemas unserer 
            Datenschutzerklarung.
          </p>

          <h2>§ 9 Schlussbestimmungen</h2>
          <p>
            (1) Es gilt das Recht der Bundesrepublik Deutschland.
          </p>
          <p>
            (2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, beruhrt dies 
            die Wirksamkeit der ubrigen Bestimmungen nicht.
          </p>
          <p>
            (3) Erfulungsort und Gerichtsstand ist [Stadt], soweit der Verkaufer 
            Kaufmann ist.
          </p>

          <p className="mt-8 text-sm text-muted-foreground">
            Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}
