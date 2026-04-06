import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Datenschutzerklarung | Autoankauf Deutschland",
  description: "Datenschutzerklarung und Informationen zum Datenschutz bei Autoankauf Deutschland.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklarung</h1>
        
        <div className="prose max-w-none">
          <h2>1. Datenschutz auf einen Blick</h2>
          
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Uberblick daruber, was mit Ihren 
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
            Daten sind alle Daten, mit denen Sie personlich identifiziert werden konnen.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <h4>Wer ist verantwortlich fur die Datenerfassung auf dieser Website?</h4>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
            Dessen Kontaktdaten konnen Sie dem Impressum dieser Website entnehmen.
          </p>

          <h4>Wie erfassen wir Ihre Daten?</h4>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
            Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
          </p>
          <p>
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
            durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, 
            Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h4>Wofur nutzen wir Ihre Daten?</h4>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
            gewahrleisten. Andere Daten konnen zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </p>

          <h4>Welche Rechte haben Sie bezuglich Ihrer Daten?</h4>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft uber Herkunft, Empfanger und 
            Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben auserdem 
            ein Recht, die Berichtigung oder Loschung dieser Daten zu verlangen.
          </p>

          <h2>2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter: [Hosting-Anbieter]
          </p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          
          <h3>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer personlichen Daten sehr ernst. 
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
            Datenschutzvorschriften sowie dieser Datenschutzerklarung.
          </p>

          <h3>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle fur die Datenverarbeitung auf dieser Website ist:
          </p>
          <p>
            [Firmenname]<br />
            [Strasse]<br />
            [PLZ Stadt]<br />
            Telefon: [Telefonnummer]<br />
            E-Mail: [E-Mail-Adresse]
          </p>

          <h2>4. Datenerfassung auf dieser Website</h2>
          
          <h3>Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
            dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
            Bearbeitung der Anfrage und fur den Fall von Anschlussfragen bei uns gespeichert.
          </p>

          <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
          <p>
            Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage 
            inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) 
            zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
          </p>

          <h2>5. Ihre Rechte</h2>
          <p>Sie haben folgende Rechte:</p>
          <ul>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Loschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschrankung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenubertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          </ul>

          <h2>6. Kontakt</h2>
          <p>
            Bei Fragen zum Datenschutz konnen Sie sich jederzeit an uns wenden:
            datenschutz@autoankauf.de
          </p>
        </div>
      </div>
    </div>
  );
}
