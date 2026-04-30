import { MetadataRoute } from "next";
import { getAllStates, getCitiesByState } from "@/data/location-data";
import { getBaseUrl } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales = ["de", "en", "fr"];

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
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/standorte" ? 0.9 : 0.7,
      });
    });
  });

  const states = getAllStates();

  states.forEach((state) => {
    locales.forEach((locale) => {
      const stateUrl = locale === "de"
        ? `${baseUrl}/standorte/${state.slug}`
        : `${baseUrl}/${locale}/standorte/${state.slug}`;

      sitemap.push({
        url: stateUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });

      const cities = getCitiesByState(state.slug);
      cities.forEach((city) => {
        const cityUrl = locale === "de"
          ? `${baseUrl}/standorte/${state.slug}/${city.slug}`
          : `${baseUrl}/${locale}/standorte/${state.slug}/${city.slug}`;

        sitemap.push({
          url: cityUrl,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    });
  });

  return sitemap;
}
