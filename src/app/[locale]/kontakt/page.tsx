import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LeadForm } from "@/components/forms/lead-form";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Kontakt | Autoankauf Deutschland",
  description: "Kontaktieren Sie uns fur ein kostenloses Angebot fur Ihr Auto. Telefon, E-Mail oder Kontaktformular - wir sind fur Sie da!",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Kontaktieren Sie uns</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Haben Sie Fragen oder mochten Sie ein Angebot fur Ihr Auto? 
            Wir sind fur Sie da - wahlen Sie Ihren bevorzugten Kontaktweg.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Kontaktmoglichkeiten</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <a href="tel:+4912345678900" className="text-primary hover:underline">
                    +49 123 456 789 00
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mo - Fr: 9:00 - 18:00 Uhr<br />
                    Sa: 10:00 - 14:00 Uhr
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a 
                    href="https://wa.me/4912345678900" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Nachricht senden
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Schnelle Antwort - auch am Wochenende
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">E-Mail</h3>
                  <a href="mailto:info@autoankauf.de" className="text-primary hover:underline">
                    info@autoankauf.de
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Antwort innerhalb von 24 Stunden
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p>
                    [Strasse und Hausnummer]<br />
                    [PLZ Stadt]<br />
                    Deutschland
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Offnungszeiten</h3>
                  <p className="text-sm">
                    Montag - Freitag: 9:00 - 18:00 Uhr<br />
                    Samstag: 10:00 - 14:00 Uhr<br />
                    Sonntag: Geschlossen
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Angebot anfordern</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fullen Sie das Formular aus und erhalten Sie ein kostenloses Angebot.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
