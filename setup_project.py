#!/usr/bin/env python3
"""
Complete project generator for Autoankauf.
This script creates all directories and source files.

Run: python setup_project.py
"""
import os
from pathlib import Path

base_path = Path(__file__).parent.resolve()

# =============================================================================
# DIRECTORY STRUCTURE
# =============================================================================

directories = [
    "prisma",
    "src/app/[locale]/(main)",
    "src/app/[locale]/standorte/[state]/[city]",
    "src/app/[locale]/blog/[slug]",
    "src/app/[locale]/kontakt",
    "src/app/[locale]/ueber-uns",
    "src/app/[locale]/so-funktionierts",
    "src/app/[locale]/impressum",
    "src/app/[locale]/datenschutz",
    "src/app/[locale]/agb",
    "src/app/api/leads/[id]",
    "src/app/api/cars/makes/[id]",
    "src/app/api/contact",
    "src/components/ui",
    "src/components/layout",
    "src/components/forms",
    "src/components/sections",
    "src/lib",
    "src/data",
    "src/messages",
    "src/types",
    "public/images",
    "src/app/admin/leads/[id]",
]

# =============================================================================
# FILE CONTENTS
# =============================================================================

files = {}

# -----------------------------------------------------------------------------
# Prisma Schema
# -----------------------------------------------------------------------------
files["prisma/schema.prisma"] = '''// Prisma Schema for Autoankauf
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model CarMake {
  id        String     @id @default(cuid())
  name      String     @unique
  slug      String     @unique
  logoUrl   String?
  models    CarModel[]
  leads     Lead[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  @@map("car_makes")
}

model CarModel {
  id            String   @id @default(cuid())
  name          String
  slug          String
  makeId        String
  make          CarMake  @relation(fields: [makeId], references: [id], onDelete: Cascade)
  yearsProduced String?
  leads         Lead[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  @@unique([makeId, slug])
  @@map("car_models")
}

model Location {
  id          String     @id @default(cuid())
  type        LocationType
  name        String
  slug        String     @unique
  stateId     String?
  state       Location?  @relation("StateToCity", fields: [stateId], references: [id], onDelete: SetNull)
  cities      Location[] @relation("StateToCity")
  population  Int?
  latitude    Float?
  longitude   Float?
  postalCodes String[]
  metaTitle       String?
  metaDescription String?
  seoContent      Json?
  leads       Lead[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  @@index([type])
  @@index([stateId])
  @@map("locations")
}

enum LocationType {
  STATE
  CITY
}

model Lead {
  id                String      @id @default(cuid())
  name              String
  email             String
  phone             String
  preferredContact  ContactMethod @default(PHONE)
  makeId            String
  make              CarMake     @relation(fields: [makeId], references: [id])
  modelId           String
  model             CarModel    @relation(fields: [modelId], references: [id])
  year              Int
  mileage           Int
  condition         CarCondition
  knownIssues       String[]
  description       String?     @db.Text
  photos            String[]
  locationId        String?
  location          Location?   @relation(fields: [locationId], references: [id])
  postalCode        String?
  status            LeadStatus  @default(NEW)
  assignedTo        String?
  notes             String?     @db.Text
  statusHistory     Json[]
  sourcePage        String?
  utmSource         String?
  utmMedium         String?
  utmCampaign       String?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  contactedAt       DateTime?
  closedAt          DateTime?
  @@index([status])
  @@index([createdAt])
  @@index([makeId])
  @@index([locationId])
  @@map("leads")
}

enum LeadStatus {
  NEW
  CONTACTED
  OFFER_MADE
  NEGOTIATING
  SOLD
  LOST
  SPAM
}

enum ContactMethod {
  PHONE
  EMAIL
  WHATSAPP
}

enum CarCondition {
  EXCELLENT
  GOOD
  FAIR
  POOR
}

model BlogPost {
  id            String    @id @default(cuid())
  title         String
  slug          String
  language      String    @default("de")
  excerpt       String?   @db.Text
  content       String    @db.Text
  featuredImage String?
  metaTitle       String?
  metaDescription String?
  published     Boolean   @default(false)
  publishedAt   DateTime?
  authorName    String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  @@unique([slug, language])
  @@index([published, language])
  @@map("blog_posts")
}

model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  role         AdminRole @default(ADMIN)
  lastLoginAt  DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@map("admins")
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  VIEWER
}

model Testimonial {
  id          String    @id @default(cuid())
  name        String
  location    String?
  carInfo     String?
  rating      Int       @default(5)
  text        String    @db.Text
  photoUrl    String?
  verified    Boolean   @default(false)
  published   Boolean   @default(false)
  language    String    @default("de")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  @@map("testimonials")
}

model Setting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     Json
  updatedAt DateTime @updatedAt
  @@map("settings")
}
'''

# -----------------------------------------------------------------------------
# Lib Files
# -----------------------------------------------------------------------------
files["src/lib/utils.ts"] = '''import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("de-DE").format(num);
}

export function formatMileage(km: number): string {
  return `${formatNumber(km)} km`;
}

export function formatDate(date: Date | string, locale: string = "de-DE"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^\\w\\s-]/g, "")
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\\D/g, "");
  const baseUrl = `https://wa.me/${cleanPhone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

export function generateTelLink(phone: string): string {
  return `tel:${phone.replace(/\\s/g, "")}`;
}

export function getYearRange(startYear: number = 1990): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
}
'''

files["src/lib/db.ts"] = '''import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
'''

files["src/lib/i18n.ts"] = '''export const locales = ["de", "en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
};

export const localeRegions: Record<Locale, string> = {
  de: "de-DE",
  en: "en-US",
  fr: "fr-FR",
};
'''

# -----------------------------------------------------------------------------
# i18n config
# -----------------------------------------------------------------------------
files["src/i18n.ts"] = '''import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
'''

# -----------------------------------------------------------------------------
# Messages (i18n)
# -----------------------------------------------------------------------------
files["src/messages/de.json"] = '''{
  "metadata": {
    "title": "Autoankauf Deutschland — Wir kaufen Ihr Auto",
    "description": "Verkaufen Sie Ihr Auto schnell und unkompliziert. Faire Preise, sofortige Abwicklung, deutschlandweiter Service."
  },
  "nav": {
    "home": "Startseite",
    "locations": "Standorte",
    "howItWorks": "So funktioniert's",
    "about": "Über uns",
    "contact": "Kontakt",
    "blog": "Ratgeber"
  },
  "hero": {
    "title": "Wir kaufen Ihr Auto",
    "subtitle": "Schnell, Fair, Unkompliziert",
    "description": "Erhalten Sie innerhalb von 24 Stunden ein faires Angebot. Wir holen Ihr Fahrzeug deutschlandweit ab und zahlen sofort.",
    "cta": "Jetzt Angebot erhalten"
  },
  "form": {
    "step1": "Fahrzeugdaten",
    "step2": "Zustand",
    "step3": "Kontakt",
    "make": "Marke",
    "model": "Modell",
    "year": "Erstzulassung",
    "mileage": "Kilometerstand",
    "condition": "Zustand",
    "conditionExcellent": "Ausgezeichnet",
    "conditionGood": "Gut",
    "conditionFair": "Akzeptabel",
    "conditionPoor": "Reparaturbedürftig",
    "name": "Name",
    "email": "E-Mail",
    "phone": "Telefon",
    "preferredContact": "Bevorzugte Kontaktart",
    "contactPhone": "Telefon",
    "contactEmail": "E-Mail",
    "contactWhatsApp": "WhatsApp",
    "postalCode": "PLZ",
    "description": "Zusätzliche Informationen",
    "submit": "Anfrage absenden",
    "submitting": "Wird gesendet...",
    "success": "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    "error": "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    "selectMake": "Marke auswählen",
    "selectModel": "Modell auswählen",
    "selectYear": "Jahr auswählen",
    "next": "Weiter",
    "back": "Zurück"
  },
  "howItWorks": {
    "title": "So funktioniert's",
    "step1Title": "1. Formular ausfüllen",
    "step1Description": "Geben Sie die Daten Ihres Fahrzeugs ein. Dauert nur 2 Minuten.",
    "step2Title": "2. Angebot erhalten",
    "step2Description": "Wir melden uns innerhalb von 24 Stunden mit einem fairen Angebot.",
    "step3Title": "3. Geld erhalten",
    "step3Description": "Wir holen Ihr Auto ab und zahlen sofort per Überweisung."
  },
  "whyUs": {
    "title": "Warum Autoankauf?",
    "reason1Title": "Faire Preise",
    "reason1Description": "Keine algorithmische Abwertung — echte Menschen, echte Bewertungen.",
    "reason2Title": "Schnelle Abwicklung",
    "reason2Description": "Angebot in 24h, Abholung und Zahlung innerhalb weniger Tage.",
    "reason3Title": "Deutschlandweit",
    "reason3Description": "Wir holen Ihr Fahrzeug überall in Deutschland kostenlos ab.",
    "reason4Title": "Alle Marken",
    "reason4Description": "Wir kaufen alle Fahrzeugmarken und -modelle."
  },
  "testimonials": {
    "title": "Das sagen unsere Kunden"
  },
  "locations": {
    "title": "Autoankauf in Ihrer Nähe",
    "description": "Wir kaufen Autos in ganz Deutschland. Wählen Sie Ihr Bundesland.",
    "viewAll": "Alle Standorte anzeigen"
  },
  "faq": {
    "title": "Häufig gestellte Fragen",
    "q1": "Wie schnell erhalte ich ein Angebot?",
    "a1": "In der Regel innerhalb von 24 Stunden nach Eingang Ihrer Anfrage.",
    "q2": "Welche Autos kaufen Sie?",
    "a2": "Wir kaufen alle Marken und Modelle — auch Fahrzeuge mit Mängeln oder ohne TÜV.",
    "q3": "Wie erfolgt die Zahlung?",
    "a3": "Per sofortiger Banküberweisung bei Fahrzeugübergabe.",
    "q4": "Ist der Service wirklich kostenlos?",
    "a4": "Ja, für Sie entstehen keine Kosten. Wir holen das Fahrzeug kostenlos ab.",
    "q5": "Was passiert nach meiner Anfrage?",
    "a5": "Wir prüfen Ihre Angaben und melden uns telefonisch oder per E-Mail mit einem Angebot."
  },
  "cta": {
    "title": "Bereit, Ihr Auto zu verkaufen?",
    "description": "Füllen Sie jetzt unser Formular aus und erhalten Sie ein unverbindliches Angebot.",
    "button": "Jetzt starten"
  },
  "footer": {
    "contact": "Kontakt",
    "legal": "Rechtliches",
    "privacy": "Datenschutz",
    "imprint": "Impressum",
    "terms": "AGB",
    "copyright": "© {year} Autoankauf. Alle Rechte vorbehalten."
  },
  "contact": {
    "title": "Kontakt",
    "phone": "Telefon",
    "whatsapp": "WhatsApp",
    "email": "E-Mail"
  }
}
'''

files["src/messages/en.json"] = '''{
  "metadata": {
    "title": "Autoankauf Germany — We Buy Your Car",
    "description": "Sell your car quickly and easily. Fair prices, immediate processing, service across Germany."
  },
  "nav": {
    "home": "Home",
    "locations": "Locations",
    "howItWorks": "How it Works",
    "about": "About Us",
    "contact": "Contact",
    "blog": "Blog"
  },
  "hero": {
    "title": "We Buy Your Car",
    "subtitle": "Fast, Fair, Simple",
    "description": "Receive a fair offer within 24 hours. We pick up your vehicle anywhere in Germany and pay immediately.",
    "cta": "Get Your Offer Now"
  },
  "form": {
    "step1": "Vehicle Details",
    "step2": "Condition",
    "step3": "Contact",
    "make": "Make",
    "model": "Model",
    "year": "First Registration",
    "mileage": "Mileage",
    "condition": "Condition",
    "conditionExcellent": "Excellent",
    "conditionGood": "Good",
    "conditionFair": "Fair",
    "conditionPoor": "Poor",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "preferredContact": "Preferred Contact Method",
    "contactPhone": "Phone",
    "contactEmail": "Email",
    "contactWhatsApp": "WhatsApp",
    "postalCode": "Postal Code",
    "description": "Additional Information",
    "submit": "Submit Request",
    "submitting": "Submitting...",
    "success": "Thank you! We will contact you within 24 hours.",
    "error": "An error occurred. Please try again.",
    "selectMake": "Select make",
    "selectModel": "Select model",
    "selectYear": "Select year",
    "next": "Next",
    "back": "Back"
  },
  "howItWorks": {
    "title": "How it Works",
    "step1Title": "1. Fill out the form",
    "step1Description": "Enter your vehicle details. Takes only 2 minutes.",
    "step2Title": "2. Receive an offer",
    "step2Description": "We'll contact you within 24 hours with a fair offer.",
    "step3Title": "3. Get paid",
    "step3Description": "We pick up your car and pay immediately via bank transfer."
  },
  "whyUs": {
    "title": "Why Choose Us?",
    "reason1Title": "Fair Prices",
    "reason1Description": "No algorithmic lowballing — real people, real valuations.",
    "reason2Title": "Fast Processing",
    "reason2Description": "Offer within 24h, pickup and payment within days.",
    "reason3Title": "Nationwide",
    "reason3Description": "We pick up your vehicle anywhere in Germany for free.",
    "reason4Title": "All Brands",
    "reason4Description": "We buy all vehicle makes and models."
  },
  "testimonials": {
    "title": "What Our Customers Say"
  },
  "locations": {
    "title": "Car Buying Near You",
    "description": "We buy cars throughout Germany. Select your region.",
    "viewAll": "View All Locations"
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "q1": "How quickly will I receive an offer?",
    "a1": "Usually within 24 hours after we receive your request.",
    "q2": "What cars do you buy?",
    "a2": "We buy all makes and models — even vehicles with issues or without inspection.",
    "q3": "How is payment made?",
    "a3": "By immediate bank transfer upon vehicle handover.",
    "q4": "Is the service really free?",
    "a4": "Yes, there are no costs for you. We pick up the vehicle for free.",
    "q5": "What happens after my request?",
    "a5": "We review your information and contact you by phone or email with an offer."
  },
  "cta": {
    "title": "Ready to Sell Your Car?",
    "description": "Fill out our form now and receive a non-binding offer.",
    "button": "Get Started"
  },
  "footer": {
    "contact": "Contact",
    "legal": "Legal",
    "privacy": "Privacy Policy",
    "imprint": "Imprint",
    "terms": "Terms",
    "copyright": "© {year} Autoankauf. All rights reserved."
  },
  "contact": {
    "title": "Contact",
    "phone": "Phone",
    "whatsapp": "WhatsApp",
    "email": "Email"
  }
}
'''

files["src/messages/fr.json"] = '''{
  "metadata": {
    "title": "Autoankauf Allemagne — Nous achetons votre voiture",
    "description": "Vendez votre voiture rapidement et facilement. Prix équitables, traitement immédiat, service dans toute l'Allemagne."
  },
  "nav": {
    "home": "Accueil",
    "locations": "Emplacements",
    "howItWorks": "Comment ça marche",
    "about": "À propos",
    "contact": "Contact",
    "blog": "Blog"
  },
  "hero": {
    "title": "Nous achetons votre voiture",
    "subtitle": "Rapide, Équitable, Simple",
    "description": "Recevez une offre équitable sous 24 heures. Nous récupérons votre véhicule partout en Allemagne et payons immédiatement.",
    "cta": "Obtenez votre offre maintenant"
  },
  "form": {
    "step1": "Détails du véhicule",
    "step2": "État",
    "step3": "Contact",
    "make": "Marque",
    "model": "Modèle",
    "year": "Première immatriculation",
    "mileage": "Kilométrage",
    "condition": "État",
    "conditionExcellent": "Excellent",
    "conditionGood": "Bon",
    "conditionFair": "Acceptable",
    "conditionPoor": "Mauvais",
    "name": "Nom",
    "email": "E-mail",
    "phone": "Téléphone",
    "preferredContact": "Méthode de contact préférée",
    "contactPhone": "Téléphone",
    "contactEmail": "E-mail",
    "contactWhatsApp": "WhatsApp",
    "postalCode": "Code postal",
    "description": "Informations supplémentaires",
    "submit": "Envoyer la demande",
    "submitting": "Envoi en cours...",
    "success": "Merci ! Nous vous contacterons sous 24 heures.",
    "error": "Une erreur s'est produite. Veuillez réessayer.",
    "selectMake": "Sélectionner la marque",
    "selectModel": "Sélectionner le modèle",
    "selectYear": "Sélectionner l'année",
    "next": "Suivant",
    "back": "Retour"
  },
  "howItWorks": {
    "title": "Comment ça marche",
    "step1Title": "1. Remplissez le formulaire",
    "step1Description": "Entrez les détails de votre véhicule. Cela ne prend que 2 minutes.",
    "step2Title": "2. Recevez une offre",
    "step2Description": "Nous vous contactons sous 24 heures avec une offre équitable.",
    "step3Title": "3. Soyez payé",
    "step3Description": "Nous récupérons votre voiture et payons immédiatement par virement."
  },
  "whyUs": {
    "title": "Pourquoi nous choisir ?",
    "reason1Title": "Prix équitables",
    "reason1Description": "Pas de sous-évaluation algorithmique — de vraies personnes, de vraies évaluations.",
    "reason2Title": "Traitement rapide",
    "reason2Description": "Offre sous 24h, récupération et paiement en quelques jours.",
    "reason3Title": "National",
    "reason3Description": "Nous récupérons votre véhicule partout en Allemagne gratuitement.",
    "reason4Title": "Toutes marques",
    "reason4Description": "Nous achetons toutes les marques et modèles de véhicules."
  },
  "testimonials": {
    "title": "Ce que disent nos clients"
  },
  "locations": {
    "title": "Achat de voitures près de chez vous",
    "description": "Nous achetons des voitures dans toute l'Allemagne. Sélectionnez votre région.",
    "viewAll": "Voir tous les emplacements"
  },
  "faq": {
    "title": "Questions fréquemment posées",
    "q1": "Combien de temps pour recevoir une offre ?",
    "a1": "Généralement sous 24 heures après réception de votre demande.",
    "q2": "Quelles voitures achetez-vous ?",
    "a2": "Nous achetons toutes les marques et modèles — même les véhicules avec des problèmes.",
    "q3": "Comment se fait le paiement ?",
    "a3": "Par virement bancaire immédiat lors de la remise du véhicule.",
    "q4": "Le service est-il vraiment gratuit ?",
    "a4": "Oui, il n'y a aucun frais pour vous. Nous récupérons le véhicule gratuitement.",
    "q5": "Que se passe-t-il après ma demande ?",
    "a5": "Nous examinons vos informations et vous contactons par téléphone ou e-mail avec une offre."
  },
  "cta": {
    "title": "Prêt à vendre votre voiture ?",
    "description": "Remplissez notre formulaire maintenant et recevez une offre sans engagement.",
    "button": "Commencer"
  },
  "footer": {
    "contact": "Contact",
    "legal": "Mentions légales",
    "privacy": "Confidentialité",
    "imprint": "Mentions légales",
    "terms": "CGV",
    "copyright": "© {year} Autoankauf. Tous droits réservés."
  },
  "contact": {
    "title": "Contact",
    "phone": "Téléphone",
    "whatsapp": "WhatsApp",
    "email": "E-mail"
  }
}
'''

# -----------------------------------------------------------------------------
# Types
# -----------------------------------------------------------------------------
files["src/types/index.ts"] = '''export type LeadStatus = 
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
  // Step 1: Car Details
  makeId: string;
  modelId: string;
  year: number;
  mileage: number;
  
  // Step 2: Condition
  condition: CarCondition;
  knownIssues: string[];
  photos: File[];
  
  // Step 3: Contact
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
'''

# -----------------------------------------------------------------------------
# Data (locations)
# -----------------------------------------------------------------------------
files["src/data/locations.ts"] = '''export interface StateData {
  slug: string;
  name: string;
  cities: { slug: string; name: string; population: number }[];
}

export const germanStates: StateData[] = [
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    cities: [
      { slug: "stuttgart", name: "Stuttgart", population: 635911 },
      { slug: "karlsruhe", name: "Karlsruhe", population: 313092 },
      { slug: "mannheim", name: "Mannheim", population: 311831 },
      { slug: "freiburg", name: "Freiburg", population: 231195 },
      { slug: "heidelberg", name: "Heidelberg", population: 162273 },
      { slug: "ulm", name: "Ulm", population: 128928 },
      { slug: "heilbronn", name: "Heilbronn", population: 127480 },
      { slug: "pforzheim", name: "Pforzheim", population: 125542 },
      { slug: "reutlingen", name: "Reutlingen", population: 117166 },
    ],
  },
  {
    slug: "bayern",
    name: "Bayern",
    cities: [
      { slug: "muenchen", name: "München", population: 1488202 },
      { slug: "nuernberg", name: "Nürnberg", population: 523026 },
      { slug: "augsburg", name: "Augsburg", population: 299637 },
      { slug: "regensburg", name: "Regensburg", population: 153094 },
      { slug: "ingolstadt", name: "Ingolstadt", population: 139130 },
      { slug: "wuerzburg", name: "Würzburg", population: 129000 },
      { slug: "fuerth", name: "Fürth", population: 128497 },
      { slug: "erlangen", name: "Erlangen", population: 113292 },
    ],
  },
  {
    slug: "berlin",
    name: "Berlin",
    cities: [],
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    cities: [
      { slug: "potsdam", name: "Potsdam", population: 183154 },
      { slug: "cottbus", name: "Cottbus", population: 99678 },
      { slug: "frankfurt-oder", name: "Frankfurt (Oder)", population: 57015 },
    ],
  },
  {
    slug: "bremen",
    name: "Bremen",
    cities: [
      { slug: "bremen-stadt", name: "Bremen", population: 569352 },
      { slug: "bremerhaven", name: "Bremerhaven", population: 114024 },
    ],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    cities: [],
  },
  {
    slug: "hessen",
    name: "Hessen",
    cities: [
      { slug: "frankfurt", name: "Frankfurt am Main", population: 764104 },
      { slug: "wiesbaden", name: "Wiesbaden", population: 283083 },
      { slug: "kassel", name: "Kassel", population: 202137 },
      { slug: "darmstadt", name: "Darmstadt", population: 162643 },
      { slug: "offenbach", name: "Offenbach", population: 132045 },
    ],
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    cities: [
      { slug: "rostock", name: "Rostock", population: 209191 },
      { slug: "schwerin", name: "Schwerin", population: 99609 },
    ],
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    cities: [
      { slug: "hannover", name: "Hannover", population: 545061 },
      { slug: "braunschweig", name: "Braunschweig", population: 252738 },
      { slug: "osnabrueck", name: "Osnabrück", population: 170880 },
      { slug: "oldenburg", name: "Oldenburg", population: 172747 },
      { slug: "wolfsburg", name: "Wolfsburg", population: 128227 },
      { slug: "goettingen", name: "Göttingen", population: 117665 },
    ],
  },
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    cities: [
      { slug: "koeln", name: "Köln", population: 1087863 },
      { slug: "duesseldorf", name: "Düsseldorf", population: 621877 },
      { slug: "dortmund", name: "Dortmund", population: 588250 },
      { slug: "essen", name: "Essen", population: 583084 },
      { slug: "duisburg", name: "Duisburg", population: 502634 },
      { slug: "bochum", name: "Bochum", population: 365529 },
      { slug: "wuppertal", name: "Wuppertal", population: 359012 },
      { slug: "bielefeld", name: "Bielefeld", population: 334195 },
      { slug: "bonn", name: "Bonn", population: 333243 },
      { slug: "muenster", name: "Münster", population: 317713 },
    ],
  },
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    cities: [
      { slug: "mainz", name: "Mainz", population: 220552 },
      { slug: "ludwigshafen", name: "Ludwigshafen", population: 172557 },
      { slug: "koblenz", name: "Koblenz", population: 114052 },
      { slug: "trier", name: "Trier", population: 111528 },
      { slug: "kaiserslautern", name: "Kaiserslautern", population: 99845 },
    ],
  },
  {
    slug: "saarland",
    name: "Saarland",
    cities: [
      { slug: "saarbruecken", name: "Saarbrücken", population: 181959 },
    ],
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    cities: [
      { slug: "leipzig", name: "Leipzig", population: 616093 },
      { slug: "dresden", name: "Dresden", population: 563011 },
      { slug: "chemnitz", name: "Chemnitz", population: 249922 },
    ],
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    cities: [
      { slug: "halle", name: "Halle (Saale)", population: 242083 },
      { slug: "magdeburg", name: "Magdeburg", population: 239364 },
    ],
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    cities: [
      { slug: "kiel", name: "Kiel", population: 249023 },
      { slug: "luebeck", name: "Lübeck", population: 217198 },
      { slug: "flensburg", name: "Flensburg", population: 91113 },
    ],
  },
  {
    slug: "thueringen",
    name: "Thüringen",
    cities: [
      { slug: "erfurt", name: "Erfurt", population: 214969 },
      { slug: "jena", name: "Jena", population: 111407 },
      { slug: "gera", name: "Gera", population: 93125 },
    ],
  },
];

export function getAllLocations() {
  const locations: { slug: string; name: string; type: "state" | "city"; stateSlug?: string }[] = [];
  
  for (const state of germanStates) {
    locations.push({ slug: state.slug, name: state.name, type: "state" });
    for (const city of state.cities) {
      locations.push({ slug: city.slug, name: city.name, type: "city", stateSlug: state.slug });
    }
  }
  
  return locations;
}

export function getStateBySlug(slug: string) {
  return germanStates.find((s) => s.slug === slug);
}

export function getCityBySlug(stateSlug: string, citySlug: string) {
  const state = getStateBySlug(stateSlug);
  if (!state) return null;
  return state.cities.find((c) => c.slug === citySlug);
}
'''

# -----------------------------------------------------------------------------
# Data (car makes)
# -----------------------------------------------------------------------------
files["src/data/car-makes.ts"] = '''export interface CarMakeData {
  slug: string;
  name: string;
  models: string[];
}

export const carMakes: CarMakeData[] = [
  {
    slug: "audi",
    name: "Audi",
    models: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "e-tron", "TT", "R8"],
  },
  {
    slug: "bmw",
    name: "BMW",
    models: ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX"],
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    models: ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "AMG GT", "EQC", "EQS"],
  },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    models: ["Polo", "Golf", "Passat", "Arteon", "T-Roc", "T-Cross", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.5", "Touran", "Sharan"],
  },
  {
    slug: "opel",
    name: "Opel",
    models: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Combo", "Zafira"],
  },
  {
    slug: "ford",
    name: "Ford",
    models: ["Fiesta", "Focus", "Mondeo", "Puma", "Kuga", "Explorer", "Mustang", "Ranger"],
  },
  {
    slug: "toyota",
    name: "Toyota",
    models: ["Yaris", "Corolla", "Camry", "C-HR", "RAV4", "Highlander", "Land Cruiser", "Supra", "Prius"],
  },
  {
    slug: "honda",
    name: "Honda",
    models: ["Jazz", "Civic", "Accord", "HR-V", "CR-V", "e"],
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    models: ["i10", "i20", "i30", "Kona", "Tucson", "Santa Fe", "IONIQ 5", "IONIQ 6"],
  },
  {
    slug: "kia",
    name: "Kia",
    models: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "EV6", "Niro", "Stinger"],
  },
  {
    slug: "skoda",
    name: "Škoda",
    models: ["Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq"],
  },
  {
    slug: "seat",
    name: "SEAT",
    models: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco"],
  },
  {
    slug: "renault",
    name: "Renault",
    models: ["Clio", "Megane", "Kadjar", "Captur", "Arkana", "Scenic", "Zoe"],
  },
  {
    slug: "peugeot",
    name: "Peugeot",
    models: ["208", "308", "508", "2008", "3008", "5008", "e-208"],
  },
  {
    slug: "citroen",
    name: "Citroën",
    models: ["C1", "C3", "C4", "C5 Aircross", "Berlingo"],
  },
  {
    slug: "fiat",
    name: "Fiat",
    models: ["500", "Panda", "Tipo", "500X", "500L"],
  },
  {
    slug: "mazda",
    name: "Mazda",
    models: ["2", "3", "6", "CX-3", "CX-30", "CX-5", "MX-5", "MX-30"],
  },
  {
    slug: "nissan",
    name: "Nissan",
    models: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya"],
  },
  {
    slug: "volvo",
    name: "Volvo",
    models: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40"],
  },
  {
    slug: "porsche",
    name: "Porsche",
    models: ["911", "718 Boxster", "718 Cayman", "Panamera", "Cayenne", "Macan", "Taycan"],
  },
  {
    slug: "tesla",
    name: "Tesla",
    models: ["Model 3", "Model Y", "Model S", "Model X"],
  },
  {
    slug: "mini",
    name: "MINI",
    models: ["Cooper", "Countryman", "Clubman"],
  },
  {
    slug: "smart",
    name: "smart",
    models: ["fortwo", "forfour", "#1"],
  },
  {
    slug: "suzuki",
    name: "Suzuki",
    models: ["Swift", "Ignis", "Vitara", "S-Cross", "Jimny"],
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    models: ["Space Star", "ASX", "Eclipse Cross", "Outlander"],
  },
  {
    slug: "dacia",
    name: "Dacia",
    models: ["Sandero", "Duster", "Logan", "Spring", "Jogger"],
  },
  {
    slug: "jeep",
    name: "Jeep",
    models: ["Renegade", "Compass", "Wrangler", "Grand Cherokee"],
  },
  {
    slug: "land-rover",
    name: "Land Rover",
    models: ["Defender", "Discovery", "Range Rover", "Range Rover Sport", "Evoque", "Velar"],
  },
  {
    slug: "jaguar",
    name: "Jaguar",
    models: ["XE", "XF", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  },
  {
    slug: "alfa-romeo",
    name: "Alfa Romeo",
    models: ["Giulia", "Stelvio", "Tonale"],
  },
];

export function getMakeBySlug(slug: string) {
  return carMakes.find((m) => m.slug === slug);
}

export function getAllMakes() {
  return carMakes.map((m) => ({ slug: m.slug, name: m.name }));
}
'''

# =============================================================================
# CREATE FILES
# =============================================================================

def main():
    print(f"Setting up project at: {base_path}")
    print("=" * 60)
    
    # Create directories
    print("\\n📁 Creating directories...")
    for directory in directories:
        dir_path = base_path / directory
        dir_path.mkdir(parents=True, exist_ok=True)
    print(f"   ✓ Created {len(directories)} directories")
    
    # Create files
    print("\\n📄 Creating files...")
    for file_path, content in files.items():
        full_path = base_path / file_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"   ✓ {file_path}")
    
    print("\\n" + "=" * 60)
    print("✅ Project setup complete!")
    print("\\nNext steps:")
    print("1. Run: npm install")
    print("2. Copy .env.example to .env and configure")
    print("3. Run: npx prisma generate")
    print("4. Run: npm run dev")

if __name__ == "__main__":
    main()
