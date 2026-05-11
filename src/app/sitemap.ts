import { MetadataRoute } from "next";
import { getAllStates, getCitiesByState } from "@/data/location-data";
import { blogPosts } from "@/data/blog-posts";
import { getBaseUrl } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales = ["de", "en", "fr"] as const;
  const lastModified = new Date();

  function buildAlternates(path: string, alternateLocales: readonly string[] = locales) {
    const normalizedPath = path === "/" ? "" : path;
    const languages: Record<string, string> = {};

    alternateLocales.forEach((locale) => {
      languages[locale] =
        locale === "de"
          ? `${baseUrl}${normalizedPath}`
          : `${baseUrl}/${locale}${normalizedPath}`;
    });

    if (languages.de) {
      languages["x-default"] = languages.de;
    }

    return {
      languages,
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
    });

    // City pages are only included for German to avoid duplicate EN/FR city URLs in sitemap.
    const cities = getCitiesByState(state.slug);
    cities.forEach((city) => {
      const cityPath = `/standorte/${state.slug}/${city.slug}`;

      sitemap.push({
        url: `${baseUrl}${cityPath}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: buildAlternates(cityPath, ["de"]),
      });
    });
  });

  blogPosts.forEach((post) => {
    locales.forEach((locale) => {
      const blogPostPath = `/blog/${post.slug}`;
      const blogPostUrl = locale === "de"
        ? `${baseUrl}${blogPostPath}`
        : `${baseUrl}/${locale}${blogPostPath}`;

      sitemap.push({
        url: blogPostUrl,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: buildAlternates(blogPostPath),
      });
    });
  });

  return sitemap;
}

