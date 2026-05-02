import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/", "/_next/", "/api/"],
      },
    ],
    sitemap: "https://taxtic.com/sitemap.xml",
  };
}
