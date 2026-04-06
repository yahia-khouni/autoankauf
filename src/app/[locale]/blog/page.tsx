import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Ratgeber & Blog | Autoankauf Deutschland",
  description: "Tipps und Informationen rund um den Autoverkauf. Erfahren Sie, wie Sie den besten Preis fur Ihr Auto erhalten.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const blogPosts = [
  {
    slug: "auto-verkaufen-tipps",
    title: "Auto verkaufen: 10 Tipps fur den besten Preis",
    excerpt: "Mit diesen Tipps maximieren Sie den Verkaufspreis Ihres Fahrzeugs und vermeiden typische Fehler beim Autoverkauf.",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Tipps",
  },
  {
    slug: "fahrzeugbewertung-verstehen",
    title: "Fahrzeugbewertung: So wird der Wert Ihres Autos ermittelt",
    excerpt: "Welche Faktoren beeinflussen den Wert Ihres Fahrzeugs? Wir erklaren die wichtigsten Bewertungskriterien.",
    date: "2024-01-10",
    readTime: "4 min",
    category: "Wissen",
  },
  {
    slug: "unterlagen-autoverkauf",
    title: "Welche Unterlagen brauche ich fur den Autoverkauf?",
    excerpt: "Eine komplette Checkliste aller Dokumente, die Sie fur einen reibungslosen Autoverkauf benotigen.",
    date: "2024-01-05",
    readTime: "3 min",
    category: "Checklisten",
  },
  {
    slug: "unfallwagen-verkaufen",
    title: "Unfallwagen verkaufen: Das mussen Sie wissen",
    excerpt: "Auch beschadigte Fahrzeuge lassen sich verkaufen. Erfahren Sie, worauf Sie achten sollten.",
    date: "2023-12-28",
    readTime: "6 min",
    category: "Spezial",
  },
  {
    slug: "kfz-abmeldung-anleitung",
    title: "KFZ-Abmeldung: Schritt-fur-Schritt Anleitung",
    excerpt: "So melden Sie Ihr Fahrzeug richtig ab - mit allen wichtigen Informationen und Tipps.",
    date: "2023-12-20",
    readTime: "4 min",
    category: "Anleitungen",
  },
  {
    slug: "elektroauto-verkaufen",
    title: "Elektroauto verkaufen: Besonderheiten und Tipps",
    excerpt: "Der Markt fur gebrauchte E-Autos wachst. So verkaufen Sie Ihr Elektrofahrzeug erfolgreich.",
    date: "2023-12-15",
    readTime: "5 min",
    category: "Spezial",
  },
];

export default async function BlogPage({
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
          <h1 className="text-4xl font-bold mb-4">Ratgeber & Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nutzliche Tipps und Informationen rund um den Autoverkauf. 
            Bleiben Sie informiert und holen Sie das Beste aus Ihrem Fahrzeugverkauf heraus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-video bg-slate-100 flex items-center justify-center">
                <span className="text-4xl text-slate-300">📝</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("de-DE")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                >
                  Weiterlesen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Bereit, Ihr Auto zu verkaufen?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Nutzen Sie unser Wissen aus dem Blog und starten Sie jetzt mit dem Verkauf. 
            Kostenlose Bewertung in nur 2 Minuten.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>
      </div>
    </div>
  );
}
