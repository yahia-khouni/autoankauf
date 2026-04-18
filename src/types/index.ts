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
