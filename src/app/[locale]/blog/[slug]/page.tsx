import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, Clock, Lightbulb } from "lucide-react";
import { getBaseUrl, COMPANY } from "@/lib/company";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import { locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

function getUiCopy(locale: Locale) {
  if (locale === "fr") {
    return {
      backToBlog: "Retour au guide",
      keyPoints: "Points clés",
      offerTitle: "Obtenir une offre gratuite pour votre véhicule",
      offerSubtitle: "Réponse rapide et sans engagement.",
      offerCta: "Demander une offre",
      articleNotFound: "Article introuvable",
    };
  }

  if (locale === "en") {
    return {
      backToBlog: "Back to guide",
      keyPoints: "Key points",
      offerTitle: "Get a free offer for your vehicle",
      offerSubtitle: "Fast and non-binding response.",
      offerCta: "Request offer",
      articleNotFound: "Article not found",
    };
  }

  return {
    backToBlog: "Zurück zum Ratgeber",
    keyPoints: "Kernpunkte",
    offerTitle: "Kostenloses Angebot für Ihr Fahrzeug erhalten",
    offerSubtitle: "Schnelle und unverbindliche Rückmeldung.",
    offerCta: "Jetzt Angebot anfragen",
    articleNotFound: "Artikel nicht gefunden",
  };
}

function getBlogPath(locale: Locale, slug?: string) {
  const basePath = slug ? `/blog/${slug}` : "/blog";
  return locale === "de" ? basePath : `/${locale}${basePath}`;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: getUiCopy(locale).articleNotFound };
  }

  const baseUrl = getBaseUrl();
  const canonicalPath = getBlogPath(locale, slug);
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  return {
    title: post.titles[locale],
    description: post.excerpts[locale],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: `${baseUrl}${getBlogPath("de", slug)}`,
        en: `${baseUrl}${getBlogPath("en", slug)}`,
        fr: `${baseUrl}${getBlogPath("fr", slug)}`,
        "x-default": `${baseUrl}${getBlogPath("de", slug)}`,
      },
    },
    openGraph: {
      title: post.titles[locale],
      description: post.excerpts[locale],
      type: "article",
      url: canonicalUrl,
      siteName: "Autoankauf SR",
      locale: locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: post.titles[locale],
      description: post.excerpts[locale],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const ui = getUiCopy(locale);
  const blogListHref = getBlogPath(locale);
  const leadFormHref = locale === "de" ? "/#lead-form" : `/${locale}/#lead-form`;
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "de" ? "de-DE" : locale === "fr" ? "fr-FR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${getBlogPath(locale, slug)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titles[locale],
    description: post.excerpts[locale],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Autoankauf SR",
    },
    publisher: {
      "@type": "Organization",
      name: "Autoankauf SR",
      url: baseUrl,
    },
  };

  return (
    <article className="py-20 sm:py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="container max-w-4xl px-4 sm:px-6">
        <Link
          href={blogListHref}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {ui.backToBlog}
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 leading-tight mb-4">
            {post.titles[locale]}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-5">
            {post.excerpts[locale]}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime} min
            </span>
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-gold-200 bg-gold-50/70 p-5 sm:p-6">
          <p className="mb-3 text-xs font-black tracking-widest uppercase text-gold-700">
            {ui.keyPoints}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.keyPoints[locale].map((point, index) => (
              <span
                key={`${post.slug}-kp-${index}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold-200 bg-white px-3 py-1 text-xs font-semibold text-navy-800"
              >
                <CheckCircle className="h-3.5 w-3.5 text-gold-500" />
                {point}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          {post.fullContent.map((section, index) => (
            <div key={`${post.slug}-section-${index}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3">
                {section.heading[locale]}
              </h2>
              <p className="text-slate-700 leading-relaxed">{section.body[locale]}</p>
              {section.tip && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium leading-relaxed text-amber-900">
                    {section.tip[locale]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-3xl bg-navy-900 p-7 sm:p-9 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{ui.offerTitle}</h2>
          <p className="text-slate-300 mb-6">{ui.offerSubtitle}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href={leadFormHref}
              className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-3 text-sm font-bold text-navy-900 hover:bg-gold-300 transition-colors"
            >
              {ui.offerCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:text-gold-200 transition-colors"
            >
              {COMPANY.phoneDisplayIntl}
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}

