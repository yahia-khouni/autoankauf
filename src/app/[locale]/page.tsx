import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero";
import { WhoWeAreSection } from "@/components/sections/who-we-are";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { WhyUsSection } from "@/components/sections/why-us";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { LocationsMapSection } from "@/components/sections/locations-map";
import { FAQSection } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta";
import { OrganizationSchema, FAQSchema } from "@/components/seo/schema-markup";
import { locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faqT = await getTranslations({ locale, namespace: "faq" });

  const homeFaqs = [
    { q: faqT("homeQ1"), a: faqT("homeA1") },
    { q: faqT("homeQ2"), a: faqT("homeA2") },
    { q: faqT("homeQ3"), a: faqT("homeA3") },
    { q: faqT("homeQ4"), a: faqT("homeA4") },
    { q: faqT("homeQ5"), a: faqT("homeA5") },
    { q: faqT("homeQ6"), a: faqT("homeA6") },
    { q: faqT("homeQ7"), a: faqT("homeA7") },
    { q: faqT("homeQ8"), a: faqT("homeA8") },
  ];

    return (
    <>
      <OrganizationSchema />
      <FAQSchema items={homeFaqs.map(f => ({ question: f.q, answer: f.a }))} />
      <HeroSection />
      <WhoWeAreSection />
      <HowItWorksSection />
      <WhyUsSection />
      <TestimonialsSection />
      <LocationsMapSection />
      <FAQSection faqs={homeFaqs} />
      <CTASection />
    </>
  );
}
