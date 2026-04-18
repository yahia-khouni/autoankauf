# Task Progress: Programmatic SEO Data & UI Overhaul

## Component 1: JSON Data Framework

### Phase 1A: Type Definitions
- [ ] Update `src/types/index.ts` with new types (NationData, StateData, CityData, LocationMeta, FAQ, Coordinates)

### Phase 1B: JSON Data Files
- [ ] Create `src/data/locations/nation/germany.json`
- [ ] Create all 16 state JSON files under `src/data/locations/states/`
- [ ] Create all city JSON files under `src/data/locations/cities/`

### Phase 1C: Data Access Layer
- [ ] Create `src/data/location-data.ts` with typed accessor functions
- [ ] Update `src/data/locations.ts` to re-export from new layer (backward compat)
- [ ] Update `src/app/sitemap.ts` to use new data layer

## Component 2: Premium UI Redesign

### Phase 2A: Reusable Components
- [ ] Create `src/components/seo/schema-markup.tsx` (JSON-LD components)
- [ ] Create `src/components/locations/state-card.tsx`
- [ ] Create `src/components/locations/city-card.tsx`
- [ ] Create `src/components/locations/stats-counter.tsx`
- [ ] Create `src/components/locations/breadcrumb.tsx`
- [ ] Create `src/components/locations/germany-map-svg.tsx`

### Phase 2B: Page Redesign
- [ ] Redesign `standorte/page.tsx` (Nation page)
- [ ] Redesign `standorte/[state]/page.tsx` (State page)
- [ ] Redesign `standorte/[state]/[city]/page.tsx` (City page)

## Component 3: Verification
- [ ] Run `npx tsc --noEmit` — type check
- [ ] Run `npm run build` — full build test
- [ ] Visual inspection via dev server

---

## Notes & Comments

- Keeping borderline cities (Cottbus, Schwerin, Kaiserslautern, Flensburg, Gera) — they're important regionally
- Using proper German umlauts in display names, ASCII-safe slugs
- Going SVG-based for visual elements (no hero images)
- Creating all ~80 city JSON files in one pass
- Global CSS has duplicate keyframes/rules — should clean up but not blocking
- `locations.json` in project root is a leftover sample — can be removed later
