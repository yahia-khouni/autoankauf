import { MetadataRoute } from "next";
import { getAllStates, getCitiesByState } from "@/data/location-data";
import { getBaseUrl } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales = ["de", "en", "fr"];
  const lastModified = new Date();

  function buildAlternates(path: string) {
    const normalizedPath = path === "/" ? "" : path;
    return {
      languages: {
        de: `${baseUrl}${normalizedPath}`,
        en: `${baseUrl}/en${normalizedPath}`,
        fr: `${baseUrl}/fr${normalizedPath}`,
        "x-default": `${baseUrl}${normalizedPath}`,
      },
    };
  }

  const staticPages = [
    "",
    "/standorte",
    "/so-funktionierts",
    "/ueber-uns",
    "/kontakt",
    "/blog",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const url = locale === "de" 
        ? `${baseUrl}${page}` 
        : `${baseUrl}/${locale}${page}`;
      
      sitemap.push({
        url,
        lastModified,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/standorte" ? 0.9 : 0.7,
        alternates: buildAlternates(page),
      });
    });
  });

  const states = getAllStates();

  states.forEach((state) => {
    locales.forEach((locale) => {
      const statePath = `/standorte/${state.slug}`;
      const stateUrl = locale === "de"
        ? `${baseUrl}${statePath}`
        : `${baseUrl}/${locale}${statePath}`;

      sitemap.push({
        url: stateUrl,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: buildAlternates(statePath),
      });

      const cities = getCitiesByState(state.slug);
      cities.forEach((city) => {
        const cityPath = `/standorte/${state.slug}/${city.slug}`;
        const cityUrl = locale === "de"
          ? `${baseUrl}${cityPath}`
          : `${baseUrl}/${locale}${cityPath}`;

        sitemap.push({
          url: cityUrl,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: buildAlternates(cityPath),
        });
      });
    });
  });

  return sitemap;
}

