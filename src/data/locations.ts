/**
 * Backward-compatible exports from the new JSON data architecture.
 * 
 * This file re-exports the old API surface using the new location-data.ts layer.
 * Existing imports like `import { germanStates, getStateBySlug } from "@/data/locations"`
 * will continue to work without changes.
 * 
 * @deprecated — Prefer importing from "@/data/location-data" directly.
 */

import { getAllStates, getStateBySlug as _getStateBySlug, getAllLocations as _getAllLocations } from "./location-data";

// ─── Legacy interface (matches old shape) ────────────────────
export interface StateData {
  slug: string;
  name: string;
  cities: { slug: string; name: string; population: number }[];
}

// ─── Build legacy germanStates array from new JSON data ──────
function buildLegacyStates(): StateData[] {
  const states = getAllStates();
  return states.map((state) => {
    // For each state, load its cities from the new JSON data
    const citySlugs = state.cities;
    const cities = citySlugs
      .map((citySlug) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const cityData = require(`./locations/cities/${citySlug}.json`);
          return {
            slug: cityData.slug as string,
            name: cityData.name as string,
            population: cityData.population as number,
          };
        } catch {
          return null;
        }
      })
      .filter((c): c is { slug: string; name: string; population: number } => !!c);

    return {
      slug: state.slug,
      name: state.name,
      cities,
    };
  });
}

export const germanStates: StateData[] = buildLegacyStates();

// ─── Legacy helper functions ─────────────────────────────────

export function getAllLocations() {
  return _getAllLocations();
}

export function getStateBySlug(slug: string) {
  const state = _getStateBySlug(slug);
  if (!state) return undefined;
  // Return legacy shape
  return germanStates.find((s) => s.slug === slug);
}

export function getCityBySlug(stateSlug: string, citySlug: string) {
  const state = germanStates.find((s) => s.slug === stateSlug);
  if (!state) return null;
  return state.cities.find((c) => c.slug === citySlug) || null;
}
