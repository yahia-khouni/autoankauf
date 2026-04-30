import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { germanStates } from "@/data/locations";
import { getStateBySlug, getCityBySlug, getCitiesByState } from "@/data/location-data";
import {
  MapPin,
  ArrowRight,
  Phone,
  Clock,
  Euro,
  Car,
  Star,
  ShieldCheck,
  Shield,
  CheckCircle,
  Users,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { getBaseUrl } from "@/lib/company";
import { LeadForm } from "@/components/forms/lead-form";
import { locales, type Locale } from "@/lib/i18n";
import { LocationBreadcrumb } from "@/components/locations/breadcrumb";
import { BreadcrumbSchema, LocalBusinessSchema, FAQSchema } from "@/components/seo/schema-markup";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";

function getCityAnchorText(
  city: { name: string; content: { page: { linkAnchors: string[] } } },
  index: number,
): string {
  const anchors = city.content.page.linkAnchors;
  if (!Array.isArray(anchors) || anchors.length === 0) return city.name;
  return anchors[index % anchors.length];
}

type Props = {
  params: Promise<{ locale: Locale; state: string; city: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; state: string; city: string }[] = [];
  locales.forEach((locale) => {
    germanStates.forEach((state) => {
      state.cities.forEach((city) => {
        params.push({ locale, state: state.slug, city: city.slug });
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = getCityBySlug(stateSlug, citySlug);

  if (!city) return { title: "Nicht gefunden" };

  return {
    title: city.meta.title,
    description: city.meta.description,
    keywords: city.meta.keywords,
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, state: stateSlug, city: citySlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale: "de", namespace: "locations" });

  const featureCards = [
    { icon: Clock, title: t("featureClockTitle"), desc: t("featureClockDesc"), gradient: "from-gold-400 to-gold-600" },
    { icon: Euro, title: t("featureEuroTitle"), desc: t("featureEuroDesc"), gradient: "from-gold-500 to-amber-600" },
    { icon: Car, title: t("featureCarTitle"), desc: t("featureCarDesc2"), gradient: "from-navy-600 to-navy-800" },
    { icon: Phone, title: t("feature4Title"), desc: t("feature4Desc"), gradient: "from-navy-500 to-navy-700" },
  ];

  const state = getStateBySlug(stateSlug);
  const city = getCityBySlug(stateSlug, citySlug);

  if (!state || !city) notFound();

  const testimonials = [
    { name: "Thomas K.", location: city.name, rating: 5, text: t("testimonial1"), car: "BMW 3er", verified: true },
    { name: "Sandra M.", location: city.name, rating: 5, text: t("testimonial2"), car: "VW Golf", verified: true },
    { name: "Markus L.", location: city.name, rating: 5, text: t("testimonial3"), car: "Mercedes C-Klasse", verified: true },
  ];

  const allCities = getCitiesByState(stateSlug);
  const otherCities = allCities.filter((c) => c.slug !== city.slug).slice(0, 6);
  const nearbyCityData = city.nearbyCities
    .map((slug) => allCities.find((c) => c.slug === slug))
    .filter(Boolean);
  const cityPageContent = city.content.page;
  const heroPillIcons = [Zap, Shield, TrendingUp];

  const baseUrl = getBaseUrl();

  return (
    <div className="relative overflow-hidden">
      {/* Schema.org */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Standorte", url: `${baseUrl}/standorte` },
          { name: state.name, url: `${baseUrl}/standorte/${state.slug}` },
          { name: city.name, url: `${baseUrl}/standorte/${state.slug}/${city.slug}` },
        ]}
      />
      <LocalBusinessSchema
        name={cityPageContent.localBusinessName}
        description={city.meta.description}
        url={`${baseUrl}/standorte/${state.slug}/${city.slug}`}
        areaServed={city.name}
        address={{
          addressLocality: city.name,
          addressRegion: state.name,
          postalCode: city.postalCodeRange.split("–")[0],
          addressCountry: "DE",
        }}
      />
      {city.faq.length > 0 && <FAQSchema items={city.faq} />}

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-gold-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-navy-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gold-300/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container relative">
          {/* Breadcrumb */}
          <LocationBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Standorte", href: "/standorte" },
              { label: state.name, href: `/standorte/${state.slug}` },
              { label: city.name },
            ]}
          />

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: Headline */}
            <div className="lg:col-span-3">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-gold-400/30 backdrop-blur-sm px-4 py-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gold-300">{city.stateCode}</span>
                </div>
                <span className="text-sm font-medium text-gold-300">
                  {city.name}, {state.name}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                {cityPageContent.heroTitlePrefix}{" "}
                <span className="text-gold-gradient block sm:inline">{city.name}</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-[80%]">
                {city.content.heroDescription}
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3">
                {cityPageContent.heroTrustPills.map((pillLabel, i) => {
                  const PillIcon = heroPillIcons[i] ?? Zap;
                  return (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 backdrop-blur-sm"
                  >
                    <PillIcon className="h-4 w-4 text-gold-400" />
                    <span className="text-sm text-white font-medium">{pillLabel}</span>
                  </div>
                )})}
              </div>
            </div>

            {/* Right: Hero mini-card */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-gold rounded-3xl blur-2xl opacity-10" />
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-gold-400 fill-gold-400" />
                    <span className="text-gold-300 font-semibold text-sm">{cityPageContent.heroCardRatingText}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {cityPageContent.heroCardDescription}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {cityPageContent.heroCardStats.map((s, i) => (
                      <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                        <div className="text-base font-bold text-gold-400">{s.value}</div>
                        <div className="text-[10px] text-slate-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="#city-lead-form"
                    id={`city-hero-cta-${city.slug}`}
                    className="group flex items-center justify-center gap-2 w-full bg-gradient-gold text-navy-900 font-bold px-6 py-3.5 rounded-2xl transition-all hover:shadow-gold-lg btn-cta-glow text-sm"
                  >
                    {cityPageContent.heroCardCtaText}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE STRIP
      ══════════════════════════════════════════ */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-gold-200 p-4 transition-all duration-300 hover:shadow-md"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN CONTENT + STICKY SIDEBAR
      ══════════════════════════════════════════ */}
      <section id="city-lead-form" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ── CONTENT ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Intro */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-4">
                  {cityPageContent.introTitle}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {city.content.localContent}
                </p>
              </div>

              {/* Local market hooks */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {cityPageContent.localHooksTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-5">
                  {cityPageContent.localHooksIntro}
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {cityPageContent.localHooks.map((hook, i) => (
                    <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-navy-900 mb-1">{hook.title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{hook.copy}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmarks / Local Highlights */}
              {city.landmarks.length > 0 && (
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold-500" />
                    {cityPageContent.landmarksTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {city.landmarks.map((landmark, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium"
                      >
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits Block */}
              <div className="bg-gradient-to-br from-navy-50 to-slate-50 rounded-3xl border border-navy-100 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                    <Shield className="h-5 w-5 text-navy-900" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">
                    {cityPageContent.benefitsTitle}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cityPageContent.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-3xl border border-gold-200 p-6 lg:p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  {cityPageContent.processTitle}
                </h3>
                <div className="space-y-5">
                  {cityPageContent.processSteps.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center font-bold text-navy-900 flex-shrink-0 shadow-gold text-sm group-hover:scale-105 transition-transform">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-bold text-navy-900 mb-1">{item.title}</div>
                        <div className="text-sm text-slate-600 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion intent block */}
              <div className="bg-gradient-to-br from-navy-50 to-blue-50 rounded-3xl border border-navy-100 p-6 lg:p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {cityPageContent.conversionTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {cityPageContent.conversionIntro}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {cityPageContent.conversionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Car types */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  {cityPageContent.vehicleTypesTitle}
                </h3>
                <p className="text-slate-600 mb-4">
                  {cityPageContent.vehicleTypesIntro}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {cityPageContent.vehicleTypes.map((car, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-slate-100 last:border-0">
                      <Car className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{car}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semantic keyword coverage */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {cityPageContent.semanticTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {cityPageContent.semanticIntro}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cityPageContent.semanticQueries.map((query, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700"
                    >
                      {query}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust and E-E-A-T signals */}
              <div className="bg-navy-900 rounded-3xl border border-navy-800 p-6 lg:p-8 text-white">
                <h3 className="text-xl font-bold mb-4">{cityPageContent.trustTitle}</h3>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {cityPageContent.trustFacts.map((fact, i) => (
                    <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <p className="text-xl font-bold text-gold-400">{fact.value}</p>
                      <p className="text-xs text-slate-300 uppercase tracking-wide">{fact.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {cityPageContent.trustDescription}
                </p>
              </div>

              {/* Nearby Cities */}
              {nearbyCityData.length > 0 && (
                <div className="bg-slate-50 rounded-3xl p-6 lg:p-8">
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {t("nearbyAutoankauf", { city: city.name })}
                  </h3>
                  <p className="text-sm text-slate-500 mb-5">
                    {cityPageContent.nearbyIntro}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {nearbyCityData.map((c, index) => c && (
                      <Link
                        key={c.slug}
                        href={`/standorte/${stateSlug}/${c.slug}`}
                        className="group inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:border-gold-300 hover:bg-gold-50 rounded-xl text-sm font-medium text-navy-700 hover:text-gold-700 transition-all shadow-sm hover:shadow-md"
                      >
                        <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-gold-500 transition-colors" />
                        {getCityAnchorText(c, index)}
                        <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Cities in same state */}
              {otherCities.length > 0 && (
                <div className="bg-slate-50 rounded-3xl p-6 lg:p-8">
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {cityPageContent.otherCitiesTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {otherCities.map((c, index) => (
                      <Link
                        key={c.slug}
                        href={`/standorte/${stateSlug}/${c.slug}`}
                        className="group inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:border-gold-300 hover:bg-gold-50 rounded-xl text-sm font-medium text-navy-700 hover:text-gold-700 transition-all shadow-sm hover:shadow-md"
                      >
                        <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-gold-500 transition-colors" />
                        {getCityAnchorText(c, index + 1)}
                        <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                    {allCities.length > 7 && (
                      <Link
                        href={`/standorte/${stateSlug}`}
                        className="inline-flex items-center gap-1 px-4 py-2.5 text-gold-600 hover:text-gold-700 text-sm font-bold transition-colors"
                      >
                        {`Alle Staedte in ${state.name}`}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── STICKY SIDEBAR FORM ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Glow halo */}
                <div className="absolute -inset-3 bg-gradient-gold rounded-3xl blur-2xl opacity-15 pointer-events-none" />

                <div className="relative bg-white border border-slate-200/60 rounded-3xl p-7 shadow-premium overflow-hidden">
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-gold-50 to-transparent rounded-bl-3xl opacity-80 pointer-events-none" />

                  <div className="relative">
                    {/* Premium badge */}
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-4 w-4 text-gold-500 fill-gold-500" />
                      <span className="text-xs font-semibold text-gold-600 uppercase tracking-wide">
                        {cityPageContent.sidebarBadge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-navy-900 mb-1">
                      {cityPageContent.sidebarTitle}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      {cityPageContent.sidebarSubtitle}
                    </p>

                    <LeadForm />

                    {/* Trust micro-copy */}
                    <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                      {cityPageContent.sidebarTrustItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-xs text-slate-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Population fact card */}
                <div className="mt-4 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-5 text-white border border-navy-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-gold-400" />
                    <span className="text-xs font-semibold text-gold-400 uppercase tracking-wide">
                      {cityPageContent.populationCardTitle}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatNumber(city.population)}+
                  </div>
                  <div className="text-xs text-slate-400">
                    {cityPageContent.populationCardDescription}
                  </div>
                  {city.postalCodeRange && (
                    <div className="mt-3 pt-3 border-t border-navy-700">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">PLZ-Bereich</div>
                      <div className="text-sm text-gold-400 font-semibold">{city.postalCodeRange}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection 
        title={cityPageContent.testimonialsTitle}
        badge={cityPageContent.testimonialsBadge}
        testimonials={testimonials} 
      />

      {city.faq.length > 0 && (
        <FAQSection 
          title={cityPageContent.faqTitle}
          subtitle={cityPageContent.faqSubtitle}
          faqs={city.faq.map(f => ({ q: f.question, a: f.answer }))} 
        />
      )}

      {/* ══════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container">
          <div className="relative bg-gradient-hero rounded-3xl p-8 lg:p-12 text-center overflow-hidden border border-navy-700/30">
            <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-28 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-1.5 bg-gold-400/20 border border-gold-400/30 text-navy-900 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <ShieldCheck className="h-3.5 w-3.5 text-navy-900" />
                {cityPageContent.bottomCtaBadge}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-4">
                {cityPageContent.bottomCtaTitle}
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                {cityPageContent.bottomCtaDescription}
              </p>
              <Link
                href="#city-lead-form"
                id={`city-bottom-cta-${city.slug}`}
                className="group inline-flex items-center gap-2 bg-gradient-gold text-navy-900 font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-gold-lg hover:-translate-y-0.5 btn-cta-glow"
              >
                {cityPageContent.bottomCtaButton}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
