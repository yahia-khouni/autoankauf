# Autoankauf Germany — Project Plan

## Executive Summary

**Project**: Premium car-buying lead-generation website for the German market  
**Domain**: Autoankauf (exact-match SEO keyword)  
**Goal**: Rank #1 for "Autoankauf" + location keywords across Germany, convert visitors into qualified leads  
**USP**: Speed + Better Prices vs. corporate platforms like wirkaufendeinauto  

---

## 1. Technical Architecture

### 1.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 14 (App Router) | SSR/SSG for SEO, React ecosystem, excellent DX |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid premium UI development, consistent design system |
| **Database** | PostgreSQL (via Supabase or Neon) | Relational data for leads, cars, locations |
| **ORM** | Prisma | Type-safe database access, migrations |
| **Email** | Resend | Modern transactional email, great deliverability, EU-compliant |
| **Hosting** | Vercel | Optimized for Next.js, edge network, EU region available |
| **Analytics** | Plausible (primary) + GA4 (secondary) | Privacy-focused + full marketing insights |
| **CMS for Blog** | MDX or Sanity.io | Structured content, easy editing |
| **i18n** | next-intl | Multi-language support (DE/EN/FR) |

### 1.2 Database Schema

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     leads       │     │   car_makes     │     │   locations     │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │     │ id              │
│ name            │     │ name            │     │ type (state/city│
│ email           │     │ slug            │     │ name            │
│ phone           │     └────────┬────────┘     │ slug            │
│ whatsapp        │              │              │ state_id (FK)   │
│ car_make_id     │     ┌────────┴────────┐     │ population      │
│ car_model_id    │     │   car_models    │     │ coordinates     │
│ year            │     ├─────────────────┤     │ seo_content     │
│ mileage         │     │ id              │     └─────────────────┘
│ condition       │     │ make_id (FK)    │
│ description     │     │ name            │
│ photos[]        │     │ years_produced  │
│ location_id     │     └─────────────────┘
│ status          │
│ source_page     │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│   blog_posts    │     │     admins      │
├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │
│ title           │     │ email           │
│ slug            │     │ password_hash   │
│ content (MDX)   │     │ role            │
│ excerpt         │     └─────────────────┘
│ featured_image  │
│ published_at    │
│ language        │
└─────────────────┘
```

### 1.3 API Routes Structure

```
/api/
├── leads/
│   ├── POST /submit          # Submit new lead (public)
│   ├── GET /                 # List leads (admin)
│   ├── GET /[id]             # Get lead details (admin)
│   ├── PATCH /[id]/status    # Update lead status (admin)
│   └── DELETE /[id]          # Delete lead (admin)
├── cars/
│   ├── GET /makes            # List all car makes
│   └── GET /makes/[id]/models # List models for make
├── locations/
│   └── GET /                 # List all locations (for sitemap)
└── contact/
    └── POST /whatsapp        # Generate WhatsApp link with pre-filled message
```

---

## 2. SEO Architecture

### 2.1 URL Structure

```
/ (Homepage)
│
├── /standorte (Locations Hub)
│   ├── /standorte/bayern (State page)
│   │   ├── /standorte/bayern/muenchen (City page)
│   │   ├── /standorte/bayern/nuernberg
│   │   └── ...
│   ├── /standorte/berlin
│   ├── /standorte/nordrhein-westfalen
│   │   ├── /standorte/nordrhein-westfalen/koeln
│   │   ├── /standorte/nordrhein-westfalen/duesseldorf
│   │   └── ...
│   └── ... (all 16 states)
│
├── /blog (Blog Hub)
│   ├── /blog/auto-verkaufen-tipps
│   ├── /blog/was-ist-mein-auto-wert
│   └── ...
│
├── /so-funktionierts (How it Works)
├── /ueber-uns (About Us)
├── /kontakt (Contact)
├── /datenschutz (Privacy Policy)
├── /impressum (Legal Notice - required in Germany)
└── /agb (Terms & Conditions)
```

### 2.2 Keyword Strategy by Page Type

| Page Type | Primary Keywords | Secondary Keywords |
|-----------|------------------|-------------------|
| **Homepage** | "Autoankauf", "Auto verkaufen" | "Autoankauf Deutschland", "Gebrauchtwagen verkaufen" |
| **State Pages** | "Autoankauf [State]" | "Auto verkaufen [State]", "Gebrauchtwagen Ankauf [State]" |
| **City Pages** | "Autoankauf [City]" | "Auto verkaufen [City]", "[City] Autoankauf Erfahrungen" |
| **Blog Posts** | Informational queries | Long-tail variations |

### 2.3 Location Page Content Strategy

Each location page MUST have unique elements to avoid duplicate content:

1. **Unique H1**: "Autoankauf in [Location] — Schnell & Fair"
2. **Local Statistics**: Population, registered vehicles (Kraftfahrt-Bundesamt data)
3. **Regional Context**: 2-3 paragraphs about car market in that region
4. **Nearby Locations**: Internal links to neighboring cities/states
5. **Local Trust Signals**: Region-specific testimonials when available
6. **Unique FAQ**: Location-specific questions
7. **Schema Markup**: LocalBusiness + Service schema per location

**Content Template Structure:**
```
[Intro - 100 words, location-specific hook]
[Why sell to us in {location} - 150 words]
[Our process in {location} - 100 words]
[What cars we buy - 100 words]
[Local statistics - unique data per location]
[FAQ - 3-5 location-specific questions]
[CTA with form]
[Nearby locations - internal linking]
```

### 2.4 Technical SEO Checklist

- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Mobile-First**: Responsive design, mobile-optimized forms
- [ ] **XML Sitemap**: Auto-generated, split by type (pages, blog, locations)
- [ ] **Robots.txt**: Proper crawl directives
- [ ] **Canonical URLs**: Self-referencing canonicals on all pages
- [ ] **Hreflang Tags**: For DE/EN/FR language versions
- [ ] **Schema Markup**: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList
- [ ] **Internal Linking**: Strategic linking between location pages
- [ ] **Image Optimization**: WebP, lazy loading, descriptive alt text
- [ ] **Page Speed**: Static generation where possible, edge caching

---

## 3. Page Specifications

### 3.1 Homepage

**Purpose**: Convert high-intent visitors, establish trust, rank for head terms

**Sections**:
1. **Hero Section**
   - Headline: "Wir kaufen Ihr Auto — Schnell, Fair, Unkompliziert"
   - Subheadline: USP (better prices, fast payment)
   - Primary CTA: Lead form (above fold)
   - Trust badges: Years in business, cars purchased, customer rating

2. **How It Works** (3 steps)
   - Step 1: Fill out form (2 minutes)
   - Step 2: Receive offer (within 24 hours)
   - Step 3: Get paid (immediate bank transfer)

3. **Why Choose Us**
   - Better prices than competitors
   - Same-day payment possible
   - We buy all brands
   - Free pickup anywhere in Germany

4. **Testimonials Carousel**
   - Real customer quotes with photos
   - Star ratings

5. **Car Brands We Buy** (logo grid)
   - All major German + international brands

6. **Location Coverage Map**
   - Interactive Germany map
   - Clickable states linking to /standorte/[state]

7. **FAQ Section**
   - 5-7 common questions with schema markup

8. **Final CTA**
   - Repeat form or simplified version

### 3.2 Location Pages (State Level)

**Purpose**: Rank for "[State] Autoankauf" keywords

**Sections**:
1. Hero with state name + lead form
2. State-specific intro content (150-200 words unique)
3. Cities we serve (grid with links)
4. How it works (condensed)
5. State statistics (registered vehicles, etc.)
6. Testimonials (state-filtered if available)
7. FAQ (state-specific)
8. Nearby states (internal links)

### 3.3 Location Pages (City Level)

**Purpose**: Rank for "[City] Autoankauf" keywords

**Sections**:
1. Hero: "Autoankauf [City]" + compact form
2. City-specific content (100-150 words unique)
3. Process (adapted for local context)
4. Nearby cities in same state (internal links)
5. City-specific FAQ
6. Breadcrumb: Home > Standorte > [State] > [City]

### 3.4 Lead Form Specification

**Multi-Step Form** (reduces abandonment):

**Step 1: Car Details**
- Make (dropdown, required)
- Model (dropdown, dependent on make, required)
- First Registration Year (dropdown, required)
- Mileage (number input, required)

**Step 2: Condition**
- General condition (radio: excellent/good/fair/poor)
- Known issues (checkboxes: engine, transmission, body damage, etc.)
- Photos (file upload, optional but encouraged)

**Step 3: Contact**
- Name (required)
- Email (required)
- Phone (required)
- Preferred contact method (radio: phone/email/WhatsApp)
- Location/PLZ (for assignment)
- Additional notes (textarea, optional)

**UX Features**:
- Progress indicator
- Save progress (localStorage)
- Mobile-optimized
- Instant validation
- Success animation on submit

### 3.5 Admin Dashboard

**Features**:
1. **Lead List View**
   - Sortable/filterable table
   - Status column (New, Contacted, Offer Made, Sold, Lost)
   - Quick actions (change status, view details)

2. **Lead Detail View**
   - All submitted information
   - Photo gallery
   - Status history
   - Notes field
   - Quick contact buttons (call, WhatsApp, email)

3. **Analytics Overview**
   - Leads this week/month
   - Conversion funnel
   - Top performing location pages
   - Lead sources

4. **Settings**
   - Notification preferences
   - Email recipients
   - Auto-response templates

### 3.6 Blog

**Initial Article Ideas** (German keywords):
1. "Was ist mein Auto wert? — Kostenlose Bewertung"
2. "Auto verkaufen: Privat vs. Händler — Was ist besser?"
3. "Autoankauf Erfahrungen: Worauf achten?"
4. "Gebrauchtwagen verkaufen: 10 Tipps für mehr Geld"
5. "Auto mit Motorschaden verkaufen — Geht das?"
6. "Unfallwagen verkaufen: Das müssen Sie wissen"
7. "KFZ-Brief verloren: Auto trotzdem verkaufen?"
8. "Autoankauf ohne TÜV — Ist das möglich?"

---

## 4. Email System

### 4.1 Email Templates

**Email 1: Lead Confirmation (to User)**
```
Subject: Ihre Anfrage bei Autoankauf — Wir melden uns!
From: anfrage@autoankauf.de

Hallo [Name],

vielen Dank für Ihre Anfrage!

Ihre Angaben:
- Fahrzeug: [Make] [Model] ([Year])
- Kilometerstand: [Mileage] km
- Standort: [Location]

Was passiert jetzt?
Unser Team prüft Ihre Angaben und meldet sich innerhalb von 24 Stunden 
mit einem fairen Angebot bei Ihnen.

Bei Fragen erreichen Sie uns unter:
📞 [Phone]
💬 WhatsApp: [Number]

Mit freundlichen Grüßen,
Ihr Autoankauf-Team
```

**Email 2: Lead Notification (to Client)**
```
Subject: 🚗 Neue Anfrage: [Make] [Model] aus [City]
From: system@autoankauf.de

NEUE LEAD-ANFRAGE

Kontakt:
- Name: [Name]
- Telefon: [Phone]
- Email: [Email]
- Bevorzugt: [Contact Method]

Fahrzeug:
- [Make] [Model] ([Year])
- [Mileage] km
- Zustand: [Condition]

Standort: [Location/PLZ]

Notizen: [Description]

[Link to Admin Dashboard]
```

### 4.2 Email Configuration

- **Provider**: Resend
- **Domain Setup**: SPF, DKIM, DMARC records
- **Sending Domain**: mail.autoankauf.de

---

## 5. Multi-Language Implementation

### 5.1 URL Strategy (Subdirectory)

```
autoankauf.de/           → German (default)
autoankauf.de/en/        → English
autoankauf.de/fr/        → French
```

### 5.2 Content Coverage per Language

| Content Type | German | English | French |
|--------------|--------|---------|--------|
| Homepage | Full | Full | Full |
| Location Pages | All locations | Key cities only | Key cities only |
| Blog | Full | Selected articles | Selected articles |
| Legal Pages | Full | Full | Full |

---

## 6. Trust & Conversion Elements

### 6.1 Trust Signals

1. **Header**: Phone number, "Über X Autos angekauft" counter
2. **Throughout**: Real photos, physical address, testimonials
3. **Footer**: Legal compliance, industry memberships

### 6.2 Conversion Tactics

1. Exit Intent Popup: Offer callback
2. Sticky CTA: Mobile bottom bar
3. WhatsApp Widget: Floating button
4. Social Proof: "Max aus Berlin hat gerade angefragt"

---

## 7. Analytics Setup

| Tool | Purpose |
|------|---------|
| **Plausible** | Primary analytics (GDPR-compliant) |
| **Google Analytics 4** | Deep marketing insights |
| **Google Search Console** | SEO monitoring |
| **Microsoft Clarity** | Heatmaps, recordings |

### Key Events to Track
- Form step completions
- Form submissions
- Phone/WhatsApp clicks
- Location page visits
- Blog reads

---

## 8. Location Data

### 8.1 Federal States (16)

| Slug | Name | Major Cities |
|------|------|--------------|
| baden-wuerttemberg | Baden-Württemberg | Stuttgart, Karlsruhe, Mannheim, Freiburg, Heidelberg |
| bayern | Bayern | München, Nürnberg, Augsburg, Regensburg, Würzburg |
| berlin | Berlin | (city-state) |
| brandenburg | Brandenburg | Potsdam, Cottbus, Frankfurt (Oder) |
| bremen | Bremen | Bremen, Bremerhaven |
| hamburg | Hamburg | (city-state) |
| hessen | Hessen | Frankfurt, Wiesbaden, Kassel, Darmstadt, Offenbach |
| mecklenburg-vorpommern | Mecklenburg-Vorpommern | Rostock, Schwerin |
| niedersachsen | Niedersachsen | Hannover, Braunschweig, Osnabrück, Oldenburg, Wolfsburg |
| nordrhein-westfalen | Nordrhein-Westfalen | Köln, Düsseldorf, Dortmund, Essen, Duisburg, Bochum, Wuppertal, Bielefeld, Bonn, Münster |
| rheinland-pfalz | Rheinland-Pfalz | Mainz, Ludwigshafen, Koblenz, Trier, Kaiserslautern |
| saarland | Saarland | Saarbrücken |
| sachsen | Sachsen | Dresden, Leipzig, Chemnitz |
| sachsen-anhalt | Sachsen-Anhalt | Magdeburg, Halle |
| schleswig-holstein | Schleswig-Holstein | Kiel, Lübeck, Flensburg |
| thueringen | Thüringen | Erfurt, Jena, Gera |

**Total: ~100-120 location pages** (16 states + 80-100 major cities)

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Project setup (Next.js, Tailwind, TypeScript)
- [ ] Database schema + Prisma setup
- [ ] Basic page layouts + design system
- [ ] Homepage structure
- [ ] Legal pages (Impressum, Datenschutz, AGB)

### Phase 2: Core Functionality (Week 3-4)
- [ ] Car make/model database
- [ ] Lead form (multi-step)
- [ ] Email system (Resend integration)
- [ ] Form submission + database storage
- [ ] Basic admin authentication

### Phase 3: Admin Dashboard (Week 5)
- [ ] Lead list view
- [ ] Lead detail view
- [ ] Status management
- [ ] Basic analytics display

### Phase 4: Location Pages (Week 6-7)
- [ ] Location data seeding
- [ ] Dynamic location page generation
- [ ] Location-specific content
- [ ] Internal linking system

### Phase 5: SEO & Content (Week 8-9)
- [ ] Technical SEO implementation
- [ ] Schema markup
- [ ] XML sitemap generation
- [ ] Blog system setup
- [ ] Initial blog posts

### Phase 6: Internationalization (Week 10)
- [ ] next-intl setup
- [ ] English translation
- [ ] French translation
- [ ] Hreflang implementation

### Phase 7: Polish & Launch (Week 11-12)
- [ ] Analytics setup
- [ ] Performance optimization
- [ ] Testing & QA
- [ ] Production deployment
- [ ] Google Search Console setup

---

## 10. Competitive Advantages

| Aspect | wirkaufendeinauto | Our Approach |
|--------|-------------------|--------------|
| Pricing | Algorithmic lowballing | Human evaluation, fairer offers |
| Speed | Standardized process | Personalized, faster |
| Communication | Corporate call center | Direct owner contact |
| Reach | Physical locations only | Pickup anywhere |

---

## 11. Success Metrics

| Metric | Target (6 months) | Target (12 months) |
|--------|-------------------|-------------------|
| Organic Traffic | 5,000/month | 20,000/month |
| Leads/Month | 50 | 200 |
| Top 10 Rankings | 20 keywords | 100 keywords |
| Conversion Rate | 2% | 3% |

---

*Plan Version: 1.0*  
*Created: April 6, 2026*
