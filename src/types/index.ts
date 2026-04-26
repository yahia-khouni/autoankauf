export type LeadStatus = 
  | "NEW" 
  | "CONTACTED" 
  | "OFFER_MADE" 
  | "NEGOTIATING" 
  | "SOLD" 
  | "LOST" 
  | "SPAM";

export type ContactMethod = "PHONE" | "EMAIL" | "WHATSAPP";

export type CarCondition = "EXCELLENT" | "GOOD" | "FAIR" | "POOR";

export type LocationType = "STATE" | "CITY";

// ─── Car Types ───────────────────────────────────────────────

export interface CarMake {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface CarModel {
  id: string;
  name: string;
  slug: string;
  makeId: string;
  yearsProduced?: string;
}

// ─── Location Types (JSON Data Architecture) ─────────────────

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationMeta {
  title: string;
  description: string;
  keywords: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MarketingFact {
  value: string;
  label: string;
}

export interface MarketingStep {
  step: string;
  title: string;
  desc: string;
}

export interface MarketingSignal {
  title: string;
  copy: string;
}

export interface StatePageContent {
  localBusinessName: string;
  heroHighlight: string;
  seoSectionTitle: string;
  benefitsTitle: string;
  benefits: string[];
  processTitle: string;
  processSteps: MarketingStep[];
  marketDepthTitle: string;
  marketDepthIntro: string;
  marketSignals: MarketingSignal[];
  vehicleTypesTitle: string;
  vehicleTypes: string[];
  payoutTitle: string;
  payoutText: string;
  semanticTitle: string;
  semanticIntro: string;
  semanticQueries: string[];
  cityLinksTitle: string;
  cityLinksIntro: string;
  trustTitle: string;
  trustDescription: string;
  trustFacts: MarketingFact[];
  sidebarBadge: string;
  sidebarTitle: string;
  sidebarSubtitle: string;
  sidebarTrustItems: string[];
}

export interface CityPageContent {
  localBusinessName: string;
  heroTitlePrefix: string;
  linkAnchors: string[];
  heroTrustPills: string[];
  heroCardRatingText: string;
  heroCardDescription: string;
  heroCardStats: MarketingFact[];
  heroCardCtaText: string;
  introTitle: string;
  localHooksTitle: string;
  localHooksIntro: string;
  localHooks: MarketingSignal[];
  landmarksTitle: string;
  benefitsTitle: string;
  benefits: string[];
  processTitle: string;
  processSteps: MarketingStep[];
  conversionTitle: string;
  conversionIntro: string;
  conversionItems: string[];
  vehicleTypesTitle: string;
  vehicleTypesIntro: string;
  vehicleTypes: string[];
  semanticTitle: string;
  semanticIntro: string;
  semanticQueries: string[];
  trustTitle: string;
  trustDescription: string;
  trustFacts: MarketingFact[];
  nearbyIntro: string;
  otherCitiesTitle: string;
  sidebarBadge: string;
  sidebarTitle: string;
  sidebarSubtitle: string;
  sidebarTrustItems: string[];
  populationCardTitle: string;
  populationCardDescription: string;
  testimonialsTitle: string;
  testimonialsBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  bottomCtaBadge: string;
  bottomCtaTitle: string;
  bottomCtaDescription: string;
  bottomCtaButton: string;
}

export interface NationData {
  id: string;
  name: string;
  slug: string;
  locale: string;
  meta: LocationMeta;
  stats: {
    totalStates: number;
    totalCities: number;
    averageRating: number;
    totalReviews: number;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    whyUsTitle: string;
    whyUsDescription: string;
  };
  stateOrder: string[];
}

export interface StateData {
  id: string;
  name: string;
  slug: string;
  stateCode: string;
  capital: string;
  area: number;
  population: number;
  isStateCity: boolean;
  meta: LocationMeta;
  content: {
    heroDescription: string;
    seoText: string;
    page: StatePageContent;
  };
  cities: string[];
}

export interface CityData {
  id: string;
  name: string;
  slug: string;
  stateSlug: string;
  stateCode: string;
  stateName: string;
  population: number;
  postalCodeRange: string;
  coordinates: Coordinates;
  meta: LocationMeta;
  content: {
    heroDescription: string;
    localContent: string;
    page: CityPageContent;
  };
  landmarks: string[];
  nearbyCities: string[];
  faq: FAQ[];
}

// ─── Legacy Location Type (kept for backward compat) ─────────

export interface Location {
  id: string;
  type: LocationType;
  name: string;
  slug: string;
  stateId?: string;
  population?: number;
  latitude?: number;
  longitude?: number;
}

// ─── Lead Types ──────────────────────────────────────────────

export interface LeadFormData {
  makeId: string;
  modelId: string;
  year: number;
  mileage: number;
  condition: CarCondition;
  knownIssues: string[];
  photos: File[];
  name: string;
  email: string;
  phone: string;
  preferredContact: ContactMethod;
  postalCode: string;
  description?: string;
}

export interface Lead extends LeadFormData {
  id: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}
