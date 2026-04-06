#!/usr/bin/env python3
"""
Part 3: Creates location pages (Standorte) and blog system.
Run after setup_project.py and setup_pages.py

Usage: python setup_locations.py
"""
import os
from pathlib import Path

base_path = Path(__file__).parent.resolve()

files = {}

# =============================================================================
# LOCATION PAGES
# =============================================================================

files["src/app/[locale]/standorte/page.tsx"] = '''import type { Metadata } from "next";
import Link from "next/link";
import { germanStates } from "@/data/locations";
import { MapPin, ChevronRight, Users } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Autoankauf Standorte — Deutschlandweit",
  description: "Autoankauf in ganz Deutschland. Wir kaufen Ihr Auto in allen 16 Bundesländern. Schnell, fair, unkompliziert.",
};

export default function StandortePage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Autoankauf Standorte
          </h1>
          <p className="text-xl text-muted-foreground">
            Wir kaufen Ihr Auto in ganz Deutschland — egal ob Großstadt oder ländliche Region. 
            Wählen Sie Ihr Bundesland für mehr Informationen.
          </p>
        </div>

        {/* States Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {germanStates.map((state) => {
            const totalPopulation = state.cities.reduce((sum, c) => sum + c.population, 0);
            
            return (
              <Link
                key={state.slug}
                href={`/standorte/${state.slug}`}
                className="group block p-6 rounded-xl border bg-white hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
                  Autoankauf {state.name}
                </h2>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {state.cities.length > 0 && (
                    <>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {state.cities.length} Städte
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {formatNumber(totalPopulation)} Einwohner
                      </span>
                    </>
                  )}
                  {state.cities.length === 0 && (
                    <span>Stadtstaat</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Auto verkaufen — egal wo in Deutschland
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Unser Service ist deutschlandweit verfügbar. Wir holen Ihr Fahrzeug 
            kostenlos ab und zahlen sofort per Überweisung.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>
      </div>
    </div>
  );
}
'''

files["src/app/[locale]/standorte/[state]/page.tsx"] = '''import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { germanStates, getStateBySlug } from "@/data/locations";
import { LeadForm } from "@/components/forms/lead-form";
import { MapPin, ChevronRight, Phone, CheckCircle } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface StatePageProps {
  params: { state: string; locale: string };
}

export async function generateStaticParams() {
  return germanStates.map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  if (!state) return {};

  return {
    title: `Autoankauf ${state.name} — Schnell & Fair`,
    description: `Verkaufen Sie Ihr Auto in ${state.name}. Faire Preise, kostenlose Abholung, sofortige Zahlung. Jetzt unverbindliches Angebot erhalten!`,
  };
}

export default function StatePage({ params }: StatePageProps) {
  const state = getStateBySlug(params.state);
  
  if (!state) {
    notFound();
  }

  const totalPopulation = state.cities.reduce((sum, c) => sum + c.population, 0);
  const neighborStates = germanStates
    .filter((s) => s.slug !== state.slug)
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-background py-12 lg:py-16">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Startseite</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/standorte" className="hover:text-primary">Standorte</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{state.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Autoankauf {state.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Verkaufen Sie Ihr Auto in {state.name} — schnell, fair und unkompliziert. 
                Wir bieten kostenlose Abholung und sofortige Zahlung in der gesamten Region.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Faire Preise durch persönliche Bewertung",
                  "Kostenlose Abholung in ganz " + state.name,
                  "Sofortige Zahlung per Banküberweisung",
                  "Alle Marken und Modelle willkommen",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Quick Contact */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Direkte Beratung</p>
                  <a href="tel:+4912345678900" className="text-lg font-semibold hover:text-primary">
                    +49 123 456 789 00
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-2">
                Kostenloses Angebot für {state.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Erhalten Sie innerhalb von 24 Stunden ein faires Angebot.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      {state.cities.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8">
              Autoankauf in Städten in {state.name}
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/standorte/${state.slug}/${city.slug}`}
                  className="group flex items-center justify-between p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium group-hover:text-primary">
                        Autoankauf {city.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatNumber(city.population)} Einwohner
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Region */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
            Autoankauf in {state.name} — Ihr Partner vor Ort
          </h2>
          
          <div className="prose prose-slate max-w-none">
            <p>
              Mit unserem Autoankauf-Service in {state.name} bieten wir Ihnen eine schnelle und 
              unkomplizierte Möglichkeit, Ihr Fahrzeug zu verkaufen. Egal ob Sie in einer der 
              großen Städte{state.cities.length > 0 ? ` wie ${state.cities.slice(0, 3).map(c => c.name).join(", ")}` : ""} 
              oder in einer kleineren Gemeinde wohnen — wir kommen zu Ihnen.
            </p>
            
            <h3>Warum Autoankauf {state.name}?</h3>
            <p>
              Als erfahrener Autoankäufer wissen wir, dass jedes Fahrzeug seinen Wert hat. 
              Anders als große Online-Plattformen setzen wir auf persönliche Bewertung statt 
              automatisierter Algorithmen. Das bedeutet für Sie: faire Preise, die den 
              tatsächlichen Wert Ihres Autos widerspiegeln.
            </p>
            
            <h3>Unser Service in {state.name}</h3>
            <ul>
              <li>Kostenlose Fahrzeugbewertung vor Ort oder per Formular</li>
              <li>Schnelle Abwicklung — oft innerhalb von 24-48 Stunden</li>
              <li>Sofortige Bezahlung per Banküberweisung</li>
              <li>Wir übernehmen alle Formalitäten inkl. Abmeldung</li>
              <li>Ankauf aller Marken, auch mit Mängeln oder ohne TÜV</li>
            </ul>
          </div>

          {/* Stats */}
          {state.cities.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {state.cities.length}
                </div>
                <div className="text-sm text-muted-foreground">Städte mit Service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {formatNumber(totalPopulation)}+
                </div>
                <div className="text-sm text-muted-foreground">Einwohner in der Region</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Angebot-Garantie</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Neighboring States */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">
            Autoankauf in weiteren Bundesländern
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {neighborStates.map((s) => (
              <Link
                key={s.slug}
                href={`/standorte/${s.slug}`}
                className="flex items-center gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium hover:text-primary">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Bereit, Ihr Auto in {state.name} zu verkaufen?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Füllen Sie unser Formular aus und erhalten Sie innerhalb von 24 Stunden 
            ein unverbindliches Angebot.
          </p>
          <Link
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>
      </section>
    </div>
  );
}
'''

files["src/app/[locale]/standorte/[state]/[city]/page.tsx"] = '''import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { germanStates, getStateBySlug, getCityBySlug } from "@/data/locations";
import { LeadForm } from "@/components/forms/lead-form";
import { MapPin, ChevronRight, Phone, CheckCircle } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface CityPageProps {
  params: { state: string; city: string; locale: string };
}

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = [];
  
  for (const state of germanStates) {
    for (const city of state.cities) {
      params.push({ state: state.slug, city: city.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  const city = getCityBySlug(params.state, params.city);
  if (!state || !city) return {};

  return {
    title: `Autoankauf ${city.name} — Schnell & Fair | ${state.name}`,
    description: `Verkaufen Sie Ihr Auto in ${city.name}, ${state.name}. Faire Preise, kostenlose Abholung, sofortige Zahlung. Jetzt Angebot erhalten!`,
  };
}

export default function CityPage({ params }: CityPageProps) {
  const state = getStateBySlug(params.state);
  const city = getCityBySlug(params.state, params.city);
  
  if (!state || !city) {
    notFound();
  }

  const otherCities = state.cities.filter((c) => c.slug !== city.slug).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-background py-12 lg:py-16">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/" className="hover:text-primary">Startseite</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/standorte" className="hover:text-primary">Standorte</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/standorte/${state.slug}`} className="hover:text-primary">{state.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{city.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Autoankauf {city.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Verkaufen Sie Ihr Auto in {city.name} — wir bieten faire Preise, 
                schnelle Abwicklung und sofortige Zahlung.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Persönliche Bewertung vor Ort in " + city.name,
                  "Kostenlose Abholung im gesamten Stadtgebiet",
                  "Sofortige Auszahlung bei Fahrzeugübergabe",
                  "Auch Autos mit Mängeln oder ohne TÜV",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* City Info */}
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{city.name}, {state.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(city.population)} Einwohner
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-2">
                Angebot für {city.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                In 2 Minuten ausgefüllt — Angebot in 24 Stunden.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none">
            <h2>Autoankauf {city.name} — Ihr lokaler Ankaufspartner</h2>
            <p>
              Sie möchten Ihr Auto in {city.name} verkaufen? Dann sind Sie bei uns genau richtig! 
              Als erfahrener Autoankäufer bieten wir Ihnen einen schnellen, fairen und 
              unkomplizierten Service direkt in Ihrer Stadt.
            </p>
            
            <h3>So funktioniert der Autoankauf in {city.name}</h3>
            <ol>
              <li>
                <strong>Anfrage stellen:</strong> Füllen Sie unser Online-Formular aus oder 
                rufen Sie uns direkt an.
              </li>
              <li>
                <strong>Angebot erhalten:</strong> Wir melden uns innerhalb von 24 Stunden 
                mit einem fairen Angebot.
              </li>
              <li>
                <strong>Termin vereinbaren:</strong> Bei Interesse kommen wir zu Ihnen nach 
                {city.name} zur Fahrzeugübergabe.
              </li>
              <li>
                <strong>Sofort Geld erhalten:</strong> Nach Übergabe überweisen wir den 
                vereinbarten Betrag umgehend.
              </li>
            </ol>

            <h3>Diese Fahrzeuge kaufen wir in {city.name} an</h3>
            <ul>
              <li>Gebrauchtwagen aller Marken und Modelle</li>
              <li>Fahrzeuge mit hoher Laufleistung</li>
              <li>Autos ohne TÜV</li>
              <li>Fahrzeuge mit Motorschaden oder anderen Defekten</li>
              <li>Unfallwagen (auch nicht fahrbereit)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      {otherCities.length > 0 && (
        <section className="py-12 lg:py-16 bg-slate-50">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">
              Autoankauf in weiteren Städten in {state.name}
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/standorte/${state.slug}/${c.slug}`}
                  className="flex items-center gap-3 p-4 rounded-lg border bg-white hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium hover:text-primary">Autoankauf {c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(c.population)} Einwohner
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <Link
                href={`/standorte/${state.slug}`}
                className="text-primary font-medium hover:underline"
              >
                Alle Städte in {state.name} anzeigen →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold mb-8">
            Häufige Fragen zum Autoankauf in {city.name}
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: `Wie schnell kann ich mein Auto in ${city.name} verkaufen?`,
                a: `In der Regel können wir den gesamten Prozess innerhalb von 24-48 Stunden abwickeln. Nach Ihrer Anfrage erhalten Sie schnellstmöglich ein Angebot.`
              },
              {
                q: `Muss ich für die Abholung in ${city.name} bezahlen?`,
                a: `Nein, die Abholung ist für Sie komplett kostenlos. Wir kommen zu Ihnen nach ${city.name} und übernehmen alle Kosten.`
              },
              {
                q: `Kaufen Sie auch Autos mit Mängeln in ${city.name}?`,
                a: `Ja, wir kaufen auch Fahrzeuge mit technischen Mängeln, ohne TÜV oder nach einem Unfall. Schildern Sie uns einfach den Zustand.`
              },
            ].map((faq, i) => (
              <div key={i} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Jetzt Auto in {city.name} verkaufen
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Erhalten Sie noch heute ein unverbindliches Angebot.
          </p>
          <Link
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90"
          >
            Angebot erhalten
          </Link>
        </div>
      </section>
    </div>
  );
}
'''

# =============================================================================
# BLOG PAGES
# =============================================================================

files["src/app/[locale]/blog/page.tsx"] = '''import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ratgeber — Auto verkaufen Tipps & Informationen",
  description: "Tipps und Informationen rund um das Thema Auto verkaufen. Erfahren Sie, wie Sie den besten Preis für Ihr Fahrzeug erzielen.",
};

// TODO: Replace with actual blog posts from database/CMS
const blogPosts = [
  {
    slug: "auto-verkaufen-tipps",
    title: "10 Tipps für mehr Geld beim Autoverkauf",
    excerpt: "Erfahren Sie, wie Sie den bestmöglichen Preis für Ihr Gebrauchtfahrzeug erzielen können.",
    date: "2024-03-15",
    readTime: "5 Min.",
    image: "/images/blog/tips.jpg",
  },
  {
    slug: "was-ist-mein-auto-wert",
    title: "Was ist mein Auto wert? Kostenlose Bewertung",
    excerpt: "Lernen Sie die Faktoren kennen, die den Wert Ihres Fahrzeugs beeinflussen.",
    date: "2024-03-10",
    readTime: "4 Min.",
    image: "/images/blog/value.jpg",
  },
  {
    slug: "privat-oder-haendler",
    title: "Auto verkaufen: Privat vs. Händler — Was ist besser?",
    excerpt: "Vor- und Nachteile beider Optionen im direkten Vergleich.",
    date: "2024-03-05",
    readTime: "6 Min.",
    image: "/images/blog/comparison.jpg",
  },
  {
    slug: "auto-ohne-tuev-verkaufen",
    title: "Auto ohne TÜV verkaufen — Ist das möglich?",
    excerpt: "Ja! Erfahren Sie, worauf Sie achten müssen und welche Optionen Sie haben.",
    date: "2024-02-28",
    readTime: "4 Min.",
    image: "/images/blog/tuev.jpg",
  },
  {
    slug: "motorschaden-verkaufen",
    title: "Auto mit Motorschaden verkaufen",
    excerpt: "Auch defekte Fahrzeuge haben ihren Wert. So verkaufen Sie smart.",
    date: "2024-02-20",
    readTime: "5 Min.",
    image: "/images/blog/engine.jpg",
  },
  {
    slug: "fahrzeugbrief-verloren",
    title: "KFZ-Brief verloren: Auto trotzdem verkaufen?",
    excerpt: "Welche Schritte Sie unternehmen müssen und wie der Verkauf trotzdem klappt.",
    date: "2024-02-15",
    readTime: "4 Min.",
    image: "/images/blog/documents.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Ratgeber
          </h1>
          <p className="text-xl text-muted-foreground">
            Tipps, Informationen und Wissenswertes rund um das Thema Auto verkaufen.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <span className="text-4xl">🚗</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString("de-DE", { 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                >
                  Weiterlesen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Bereit, Ihr Auto zu verkaufen?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nutzen Sie unser einfaches Online-Formular und erhalten Sie innerhalb von 
            24 Stunden ein unverbindliches Angebot.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>
      </div>
    </div>
  );
}
'''

files["src/app/[locale]/blog/[slug]/page.tsx"] = '''import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronRight, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: { slug: string; locale: string };
}

// TODO: Replace with actual data fetching
const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}> = {
  "auto-verkaufen-tipps": {
    title: "10 Tipps für mehr Geld beim Autoverkauf",
    excerpt: "Erfahren Sie, wie Sie den bestmöglichen Preis für Ihr Gebrauchtfahrzeug erzielen können.",
    date: "2024-03-15",
    readTime: "5 Min.",
    content: `
## 1. Bereiten Sie Ihr Fahrzeug vor

Bevor Sie Ihr Auto verkaufen, sollten Sie es gründlich reinigen — sowohl innen als auch außen. Ein sauberes Auto macht einen deutlich besseren Eindruck und kann den Verkaufspreis positiv beeinflussen.

## 2. Sammeln Sie alle Unterlagen

Stellen Sie sicher, dass Sie alle wichtigen Dokumente bereit haben:
- Fahrzeugbrief (Zulassungsbescheinigung Teil II)
- Fahrzeugschein (Zulassungsbescheinigung Teil I)
- Serviceheft mit Wartungshistorie
- TÜV-Bericht
- Rechnungen über Reparaturen und Wartungen

## 3. Ermitteln Sie den Marktwert

Recherchieren Sie den aktuellen Marktwert Ihres Fahrzeugs. Nutzen Sie verschiedene Quellen:
- Online-Bewertungstools
- Vergleichbare Angebote auf Autoportalen
- Händleranfragen

## 4. Seien Sie ehrlich bei Mängeln

Verschweigen Sie keine bekannten Mängel. Ehrlichkeit schafft Vertrauen und schützt Sie vor späteren Reklamationen.

## 5. Wählen Sie den richtigen Zeitpunkt

Bestimmte Jahreszeiten können den Verkaufspreis beeinflussen. Cabrios verkaufen sich im Frühjahr besser, SUVs im Herbst vor der Wintersaison.

## 6. Professionelle Fotos

Gute Fotos sind das A und O bei Online-Inseraten. Fotografieren Sie bei Tageslicht, zeigen Sie alle Perspektiven und auch Details wie den Innenraum.

## 7. Realistische Preisvorstellung

Setzen Sie einen realistischen Preis an. Ein zu hoher Preis schreckt potenzielle Käufer ab, ein zu niedriger lässt Spielraum für Verhandlungen.

## 8. Mehrere Angebote einholen

Holen Sie mehrere Angebote ein — von Privatpersonen, Händlern und Ankaufsdiensten. So bekommen Sie ein Gefühl für den realistischen Marktpreis.

## 9. Sichere Zahlungsabwicklung

Bestehen Sie auf sichere Zahlungsmethoden. Am sichersten ist die Barzahlung bei Fahrzeugübergabe oder eine Banküberweisung vor Übergabe.

## 10. Professionellen Ankauf in Betracht ziehen

Ein professioneller Autoankauf wie wir bietet viele Vorteile:
- Schnelle Abwicklung
- Sichere Zahlung
- Keine Verhandlungen mit Privatpersonen
- Übernahme aller Formalitäten
    `
  },
  "was-ist-mein-auto-wert": {
    title: "Was ist mein Auto wert? Kostenlose Bewertung",
    excerpt: "Lernen Sie die Faktoren kennen, die den Wert Ihres Fahrzeugs beeinflussen.",
    date: "2024-03-10",
    readTime: "4 Min.",
    content: `
## Die wichtigsten Faktoren für den Fahrzeugwert

Der Wert eines Gebrauchtwagens wird von verschiedenen Faktoren beeinflusst. Hier erfahren Sie, welche das sind.

### 1. Marke und Modell

Einige Marken und Modelle sind gefragter als andere und erzielen höhere Wiederverkaufswerte. Deutsche Premium-Marken wie BMW, Mercedes und Audi halten ihren Wert oft besser.

### 2. Alter und Kilometerstand

Je älter das Fahrzeug und je höher der Kilometerstand, desto geringer in der Regel der Wert. Als Faustregel gilt: Etwa 10.000-15.000 km pro Jahr sind durchschnittlich.

### 3. Zustand des Fahrzeugs

Der technische und optische Zustand spielt eine große Rolle:
- Lackzustand
- Innenraumzustand
- Technische Funktionsfähigkeit
- Vorhandene Mängel

### 4. Ausstattung

Extras wie Navigationssystem, Lederausstattung oder Standheizung können den Wert steigern.

### 5. Wartungshistorie

Ein lückenloses Serviceheft und regelmäßige Inspektionen bei Vertragswerkstätten erhöhen den Wert.

### 6. Unfallhistorie

Unfallfreie Fahrzeuge erzielen höhere Preise. Ein reparierter Unfallschaden mindert den Wert, auch wenn die Reparatur professionell durchgeführt wurde.

## Kostenlose Bewertung bei uns

Bei Autoankauf erhalten Sie eine kostenlose und unverbindliche Bewertung Ihres Fahrzeugs. Füllen Sie einfach unser Formular aus und wir melden uns innerhalb von 24 Stunden mit einem fairen Angebot.
    `
  },
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug];
  
  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 lg:py-16">
      <div className="container max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Startseite</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-primary">Ratgeber</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("de-DE", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime} Lesezeit
            </span>
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\\n/g, '<br>') }}
        />

        {/* CTA */}
        <div className="mt-12 bg-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Bereit, Ihr Auto zu verkaufen?
          </h2>
          <p className="text-muted-foreground mb-6">
            Erhalten Sie jetzt ein kostenloses und unverbindliches Angebot.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-8 pt-8 border-t">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Ratgeber
          </Link>
        </div>
      </div>
    </article>
  );
}
'''

# =============================================================================
# ADDITIONAL PAGES
# =============================================================================

files["src/app/[locale]/so-funktionierts/page.tsx"] = '''import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, MessageSquare, CreditCard, Truck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "So funktioniert\\'s — Autoankauf in 4 Schritten",
  description: "Erfahren Sie, wie einfach Sie Ihr Auto bei uns verkaufen können. Vom Formular bis zur Zahlung in nur 4 Schritten.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: ClipboardList,
      number: "01",
      title: "Formular ausfüllen",
      description: "Geben Sie die wichtigsten Daten zu Ihrem Fahrzeug ein. Das dauert nur 2-3 Minuten. Je mehr Details Sie angeben, desto genauer können wir Ihr Auto bewerten.",
      details: [
        "Marke, Modell und Baujahr",
        "Kilometerstand",
        "Allgemeiner Zustand",
        "Ihre Kontaktdaten",
      ],
    },
    {
      icon: MessageSquare,
      number: "02",
      title: "Angebot erhalten",
      description: "Unser Team prüft Ihre Angaben und meldet sich innerhalb von 24 Stunden mit einem fairen Angebot bei Ihnen — telefonisch, per E-Mail oder WhatsApp.",
      details: [
        "Persönliche Bewertung statt Algorithmus",
        "Transparente Preisgestaltung",
        "Unverbindliches Angebot",
        "Bei Fragen: direkte Ansprechpartner",
      ],
    },
    {
      icon: Truck,
      number: "03",
      title: "Termin & Abholung",
      description: "Gefällt Ihnen unser Angebot? Dann vereinbaren wir einen Termin. Wir kommen zu Ihnen — kostenlos und deutschlandweit.",
      details: [
        "Flexible Terminvereinbarung",
        "Kostenlose Abholung vor Ort",
        "Kurze Fahrzeuginspektion",
        "Alle Formalitäten übernehmen wir",
      ],
    },
    {
      icon: CreditCard,
      number: "04",
      title: "Sofortige Zahlung",
      description: "Nach Übergabe aller Dokumente und des Fahrzeugs überweisen wir den vereinbarten Betrag umgehend auf Ihr Konto.",
      details: [
        "Zahlung per Banküberweisung",
        "Sofortige Auszahlung",
        "Sichere Abwicklung",
        "Sie erhalten eine Kaufbestätigung",
      ],
    },
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            So funktioniert&apos;s
          </h1>
          <p className="text-xl text-muted-foreground">
            In nur 4 einfachen Schritten verkaufen Sie Ihr Auto — schnell, sicher und unkompliziert.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-px bg-border hidden md:block" />
              )}
              
              <div className="flex gap-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">{step.title}</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Häufige Fragen zum Ablauf
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Wie lange dauert der gesamte Prozess?",
                a: "In der Regel können wir alles innerhalb von 24-48 Stunden abwickeln — von der Anfrage bis zur Zahlung.",
              },
              {
                q: "Muss ich für die Abholung bezahlen?",
                a: "Nein, die Abholung ist für Sie komplett kostenlos. Wir kommen zu Ihnen, egal wo in Deutschland.",
              },
              {
                q: "Was passiert, wenn das Angebot vor Ort niedriger ausfällt?",
                a: "Sollte sich bei der Inspektion herausstellen, dass der Zustand vom beschriebenen abweicht, können wir das Angebot anpassen. Sie sind aber nicht verpflichtet, das neue Angebot anzunehmen.",
              },
              {
                q: "Welche Unterlagen brauche ich?",
                a: "Fahrzeugbrief (Zulassungsbescheinigung Teil II), Fahrzeugschein (Teil I), Ihren Personalausweis und idealerweise das Serviceheft sowie relevante Rechnungen.",
              },
            ].map((faq, i) => (
              <div key={i} className="border rounded-lg p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bereit loszulegen?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Füllen Sie jetzt unser Formular aus und erhalten Sie in Kürze ein unverbindliches Angebot.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>
      </div>
    </div>
  );
}
'''

files["src/app/[locale]/ueber-uns/page.tsx"] = '''import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Users, Car, Award, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Über uns — Ihr Autoankauf-Partner",
  description: "Lernen Sie uns kennen: Erfahrene Autoankäufer mit Leidenschaft für faire Deals und zufriedene Kunden.",
};

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Über Autoankauf
          </h1>
          <p className="text-xl text-muted-foreground">
            Wir sind Ihr vertrauenswürdiger Partner für den Autoankauf in ganz Deutschland. 
            Fair, schnell und unkompliziert.
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Unsere Geschichte
            </h2>
            <div className="prose prose-slate">
              <p>
                Was als kleine Idee begann, ist heute ein deutschlandweiter Service: 
                Menschen dabei zu helfen, ihr Auto schnell, fair und unkompliziert zu verkaufen.
              </p>
              <p>
                Wir haben selbst erlebt, wie frustrierend der Autoverkauf sein kann — 
                endlose Preisverhandlungen, unseriöse Anfragen, komplizierte Abwicklung. 
                Deshalb haben wir Autoankauf gegründet: Um einen besseren Weg zu bieten.
              </p>
              <p>
                Heute kaufen wir jedes Jahr tausende Fahrzeuge von zufriedenen Kunden in 
                ganz Deutschland. Unsere Mission bleibt die gleiche: Faire Preise, 
                persönlicher Service und maximale Transparenz.
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Car, value: "5.000+", label: "Autos angekauft" },
              { icon: Users, value: "4.9/5", label: "Kundenbewertung" },
              { icon: MapPin, value: "100+", label: "Städte in Deutschland" },
              { icon: Award, value: "10+", label: "Jahre Erfahrung" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
            Was uns ausmacht
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Faire Preise",
                description: "Wir setzen auf persönliche Bewertung statt automatisierter Algorithmen. Das bedeutet faire Preise, die den echten Wert Ihres Autos widerspiegeln.",
              },
              {
                title: "Schnelle Abwicklung",
                description: "Zeit ist Geld — auch beim Autoverkauf. Deshalb garantieren wir Ihnen ein Angebot innerhalb von 24 Stunden und schnelle Abwicklung.",
              },
              {
                title: "Persönlicher Service",
                description: "Bei uns sind Sie keine Nummer. Wir nehmen uns Zeit für Ihre Fragen und begleiten Sie durch den gesamten Verkaufsprozess.",
              },
            ].map((value, i) => (
              <div key={i} className="bg-white border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why us vs competition */}
        <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
            Warum Autoankauf statt großer Plattformen?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Große Online-Plattformen</h3>
              <ul className="space-y-3">
                {[
                  "Automatische Bewertung durch Algorithmen",
                  "Oft niedrigere Angebote",
                  "Standardisierte Prozesse",
                  "Call-Center-Support",
                  "Lange Wartezeiten",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-red-500 mt-1">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-lg text-primary">Autoankauf</h3>
              <ul className="space-y-3">
                {[
                  "Persönliche Bewertung durch Experten",
                  "Faire, marktgerechte Preise",
                  "Individueller Service",
                  "Direkter Ansprechpartner",
                  "Schnelle Abwicklung in 24-48h",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Überzeugen Sie sich selbst
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Füllen Sie unser Formular aus und erleben Sie den Unterschied. 
            Unverbindlich und kostenlos.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>
      </div>
    </div>
  );
}
'''

files["src/app/[locale]/kontakt/page.tsx"] = '''import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt — So erreichen Sie uns",
  description: "Haben Sie Fragen? Kontaktieren Sie uns per Telefon, E-Mail oder WhatsApp. Wir helfen Ihnen gerne weiter.",
};

export default function ContactPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Kontakt
          </h1>
          <p className="text-xl text-muted-foreground">
            Haben Sie Fragen? Wir sind für Sie da.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">So erreichen Sie uns</h2>
            
            <div className="space-y-6">
              <a 
                href="tel:+4912345678900"
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <p className="text-primary text-lg">+49 123 456 789 00</p>
                  <p className="text-sm text-muted-foreground">Mo-Fr 9:00-18:00 Uhr</p>
                </div>
              </a>

              <a 
                href="https://wa.me/4912345678900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-green-600 text-lg">+49 123 456 789 00</p>
                  <p className="text-sm text-muted-foreground">Schnelle Antworten, auch am Wochenende</p>
                </div>
              </a>

              <a 
                href="mailto:info@autoankauf.de"
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">E-Mail</h3>
                  <p className="text-primary text-lg">info@autoankauf.de</p>
                  <p className="text-sm text-muted-foreground">Antwort innerhalb von 24 Stunden</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-muted-foreground">
                    [Firmenname]<br />
                    [Straße und Hausnummer]<br />
                    [PLZ Stadt]<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="mt-8 p-6 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Öffnungszeiten</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span className="font-medium">9:00 - 18:00 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span className="font-medium">10:00 - 14:00 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag</span>
                  <span className="text-muted-foreground">Geschlossen</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                WhatsApp-Anfragen werden auch außerhalb der Öffnungszeiten bearbeitet.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Häufige Fragen</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "Wie schnell erhalte ich eine Antwort?",
                  a: "Bei Telefonanrufen und WhatsApp-Nachrichten antworten wir in der Regel sofort während unserer Geschäftszeiten. E-Mails beantworten wir innerhalb von 24 Stunden.",
                },
                {
                  q: "Kann ich auch am Wochenende ein Auto verkaufen?",
                  a: "Ja, Sie können jederzeit eine Anfrage über unser Online-Formular stellen. Wir melden uns dann schnellstmöglich bei Ihnen.",
                },
                {
                  q: "Muss ich für ein Angebot vorbeikommen?",
                  a: "Nein, für ein erstes Angebot reichen die Angaben in unserem Online-Formular. Wir kommen dann zu Ihnen.",
                },
                {
                  q: "Bieten Sie auch Beratung an?",
                  a: "Selbstverständlich! Wenn Sie unsicher sind, ob sich der Verkauf lohnt oder Fragen zum Ablauf haben, beraten wir Sie gerne unverbindlich.",
                },
                {
                  q: "Kaufen Sie auch Autos mit Mängeln?",
                  a: "Ja, wir kaufen auch Fahrzeuge mit technischen Mängeln, ohne TÜV oder nach Unfällen. Schildern Sie uns einfach den Zustand.",
                },
              ].map((faq, i) => (
                <div key={i} className="border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'''

# =============================================================================
# TAILWIND ANIMATE PLUGIN (needed for accordion)
# =============================================================================

files["tailwindcss-animate.d.ts"] = '''declare module "tailwindcss-animate";
'''

# =============================================================================
# CREATE FILES
# =============================================================================

def main():
    print(f"Setting up location pages at: {base_path}")
    print("=" * 60)
    
    created = 0
    for file_path, content in files.items():
        full_path = base_path / file_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✓ {file_path}")
        created += 1
    
    print("\\n" + "=" * 60)
    print(f"✅ Created {created} files!")

if __name__ == "__main__":
    main()
