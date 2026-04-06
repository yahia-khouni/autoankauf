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
