# Autoankauf Germany

A premium car-buying lead-generation website for the German market, built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## 🚗 Project Overview

This is an SEO-optimized website designed to:
- Rank for "Autoankauf" + location keywords across Germany
- Convert visitors into qualified leads
- Build trust through premium design and clear messaging

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Resend
- **i18n**: next-intl (German, English, French)
- **Hosting**: Vercel (recommended)

## 📦 Quick Setup

### Step 1: Run Setup Scripts

```bash
# Create directory structure and core files
python setup_project.py

# Create pages and components
python setup_pages.py

# Create location and blog pages
python setup_locations.py
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values:
# - DATABASE_URL (PostgreSQL connection string)
# - RESEND_API_KEY (from resend.com)
# - ADMIN_EMAIL (notification recipient)
```

### Step 4: Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Or run migrations (production)
npx prisma migrate dev
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
autoankauf/
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   └── images/            # Static images
├── src/
│   ├── app/
│   │   ├── [locale]/      # i18n routes
│   │   │   ├── page.tsx   # Homepage
│   │   │   ├── standorte/ # Location pages (SEO)
│   │   │   ├── blog/      # Blog pages
│   │   │   └── ...        # Other pages
│   │   └── api/           # API routes
│   ├── components/
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Header, Footer, etc.
│   │   ├── forms/         # Lead form
│   │   └── sections/      # Page sections
│   ├── data/
│   │   ├── locations.ts   # German states & cities
│   │   └── car-makes.ts   # Car brands & models
│   ├── lib/
│   │   ├── utils.ts       # Utility functions
│   │   ├── db.ts          # Prisma client
│   │   └── i18n.ts        # i18n config
│   ├── messages/          # Translation files
│   │   ├── de.json
│   │   ├── en.json
│   │   └── fr.json
│   └── types/             # TypeScript types
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## 🌍 SEO Structure

The site generates ~100-120 location pages:

- `/standorte` - Main locations hub
- `/standorte/[state]` - 16 federal states (Bundesländer)
- `/standorte/[state]/[city]` - 80+ major cities

Each page targets different keyword combinations:
- "Autoankauf Bayern"
- "Auto verkaufen München"
- "Gebrauchtwagen Ankauf Berlin"

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Database management
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed database with data
```

## 📧 Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain
3. Copy your API key to `.env`
4. Configure email templates in the API routes

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel automatically:
- Builds and deploys on push
- Generates static location pages
- Optimizes images and assets
- Provides edge caching

## 📋 TODO / Next Steps

### Phase 2: Core Functionality
- [ ] Connect lead form to database
- [ ] Implement email sending with Resend
- [ ] Add file upload for car photos
- [ ] Build admin dashboard

### Phase 3: Admin Dashboard
- [ ] Lead list view with filters
- [ ] Lead detail view
- [ ] Status management workflow
- [ ] Basic analytics

### Phase 4: Content & SEO
- [ ] Generate unique content per location
- [ ] Add structured data (Schema.org)
- [ ] Create XML sitemap
- [ ] Set up Google Search Console

### Phase 5: Analytics & Optimization
- [ ] Plausible Analytics integration
- [ ] Google Analytics 4 (with consent)
- [ ] Core Web Vitals optimization
- [ ] A/B testing for conversion

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ for the German automotive market.
