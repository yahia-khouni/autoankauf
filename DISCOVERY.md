# Autoankauf Germany — Discovery Session

> This document captures all discovery questions and answers that informed the project plan.

---

## Business Foundation

### 1. Current Website Status
**Question**: Does your client have an existing website right now?  
**Answer**: There's a website but we're rebuilding completely. The site has been taken down.

### 2. Domain & Brand Name
**Question**: What is the domain name your client owns (or plans to use)?  
**Answer**: Autoankauf (corrected from typo "Autoankouf")

**Note**: "Autoankauf" is the exact-match German keyword for "car buying/purchase" — excellent for SEO. Keywords like "Autoankauf Berlin" get ~2,400 searches/month.

### 3. Geographic Coverage
**Question**: Does your client actually buy cars from all of Germany, or only specific regions?  
**Answer**: All of Germany — he travels or has partners nationwide.

**Impact**: Justifies full location-based SEO strategy for all 16 federal states.

### 4. Competitive Differentiator
**Question**: Against giants like wirkaufendeinauto.de, why would someone choose your client?  
**Answer**: **Speed + Better Prices**

**Impact**: Core messaging will focus on human evaluation vs. algorithmic lowballing, faster payment, personalized service.

### 5. Design & Quality Level
**Question**: What's the expected quality level for this website?  
**Answer**: **Premium** — rivals wirkaufendeinauto in polish and features.

---

## Technical & Feature Depth

### 6. Lead Form Complexity
**Question**: How sophisticated should the lead capture form be?  
**Answer**: **Advanced form with dropdowns** (Make → Model → Year → Mileage from database)

**Impact**: Requires car make/model database, dependent dropdowns, structured data collection.

### 7. Tech Stack Preference
**Question**: Does your client or team have any technical preferences?  
**Answer**: **Trust your recommendation**

**Decision**: Next.js 14 with App Router for SSR/SSG SEO benefits, Tailwind + shadcn/ui for premium design.

### 8. Language Requirements
**Question**: Should the website support multiple languages?  
**Answer**: **German + English + French**

**Impact**: Requires i18n setup, hreflang tags, content translation strategy. French suggests cross-border targeting or specific demographic.

### 9. Email System
**Question**: For automatic emails, what's the preferred approach?  
**Answer**: **Need recommendation**

**Decision**: Resend — modern API, great deliverability, EU-compliant, generous free tier (3,000 emails/month).

### 10. Lead Management
**Question**: Beyond email notifications, does your client need a way to manage leads?  
**Answer**: **Simple dashboard to view/manage leads on the website**

**Impact**: Build custom admin panel with lead list, detail view, status workflow — no external CRM needed.

### 11. Location Page Scope
**Question**: How deep should the location-based SEO strategy go?  
**Answer**: **States + major cities (100-200 pages)**

**Impact**: Target 16 Bundesländer + ~80-100 cities with 100k+ population. Sweet spot for effort vs. SEO impact.

### 12. Content Creation
**Question**: How will content for 100-200 unique location pages be created?  
**Answer**: **AI-generated content with human review**

**Impact**: Build content generation templates, ensure uniqueness per location, human quality control.

### 13. Timeline Expectation
**Question**: What's the expected timeline for launch?  
**Answer**: **Flexible — quality over speed**

**Impact**: Can build properly without rushing. Phased approach with thorough testing.

---

## Conversion & Trust Elements

### 14. Social Proof / Testimonials
**Question**: Does your client have existing testimonials or reviews?  
**Answer**: Has reviews via word-of-mouth, not on Google Reviews or formal platforms. Unknown about case studies.

**Impact**: Need testimonial collection strategy, potentially add review request flow post-transaction, consider written testimonials with client's help.

### 15. Blog / Content Marketing
**Question**: Should we include a blog section?  
**Answer**: **Yes — a blog for SEO content**

**Impact**: Build blog system for informational queries ("Was ist mein Auto wert?", "Auto verkaufen Tipps"), funnels traffic to leads.

### 16. Contact Methods
**Question**: Beyond the lead form, should there be additional contact options?  
**Answer**: **Both phone and WhatsApp**

**Impact**: Prominent phone number, WhatsApp floating button, click-to-call/chat functionality.

### 17. Analytics & Tracking
**Question**: What analytics and tracking should be implemented?  
**Answer**: **Need recommendation**

**Decision**: Plausible (privacy-focused, GDPR-compliant) as primary + GA4 for deep marketing insights with cookie consent.

### 18. Hosting Preference
**Question**: Where should the website be hosted?  
**Answer**: **Vercel (Recommended for Next.js)**

**Impact**: Optimal Next.js performance, edge network, EU data centers available.

### 19. Google Business Profile
**Question**: Should Google Business Profile setup be part of the project?  
**Answer**: **Need recommendation**

**Decision**: Recommend setting up early (post-launch priority) — SEO takes months, local signals help.

---

## Summary Matrix

| Aspect | Decision |
|--------|----------|
| Domain | Autoankauf (exact-match keyword ✓) |
| Coverage | All of Germany |
| USP | Speed + Better Prices |
| Quality Level | Premium (wirkaufendeinauto-level) |
| Lead Form | Advanced with Make/Model/Year dropdowns |
| Tech Stack | Next.js 14, Tailwind, Prisma, PostgreSQL |
| Languages | German + English + French |
| Email Provider | Resend |
| Lead Management | Built-in admin dashboard |
| Location Pages | ~100-120 (16 states + 80-100 cities) |
| Content Strategy | AI-generated with human review |
| Blog | Yes, for informational SEO |
| Contact Methods | Form + Phone + WhatsApp |
| Analytics | Plausible + GA4 |
| Hosting | Vercel |
| Timeline | Flexible, quality-focused |

---

## Competitive Landscape Analysis

### Key Competitors Analyzed
1. **wirkaufendeinauto.de** — Market leader, instant valuation, physical locations
2. **mobile.de Ankauf** — Marketplace integration, dealer network
3. **AutoScout24 Verkaufen** — Similar marketplace approach

### Our Differentiation Strategy
- **Personal service** vs. corporate experience
- **Better prices** vs. algorithmic lowballing
- **Speed** vs. standardized slow processes
- **Nationwide pickup** vs. location-dependent service

### Messaging Focus
> "Unlike big platforms, we don't lowball you with algorithms. Real people, real offers, real service."

---

*Discovery completed: April 6, 2026*
