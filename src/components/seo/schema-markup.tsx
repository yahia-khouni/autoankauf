/**
 * Schema.org structured data components for SEO.
 * Renders JSON-LD <script> tags with structured data.
 */

import { COMPANY } from "@/lib/company";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
}

export function LocalBusinessSchema({
  name,
  description,
  url,
  areaServed,
  telephone,
  address,
}: LocalBusinessSchemaProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    areaServed,
    priceRange: "$$",
    ...(telephone && { telephone }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Organization schema for the homepage — enables Google Knowledge Panel.
 */
export function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: COMPANY.legalName,
    url: COMPANY.websiteUrl,
    telephone: COMPANY.phoneDisplayIntl,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.city,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.countryCode,
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    priceRange: "$$",
    description:
      "Autoankauf SR kauft Ihr Auto schnell, fair und unkompliziert. Deutschlandweiter Service mit sofortiger Auszahlung.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

