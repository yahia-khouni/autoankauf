import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/*/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
