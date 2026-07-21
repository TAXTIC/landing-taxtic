import type { MetadataRoute } from "next";

import { loadServicesIndex } from "@/lib/content";

const SITE_URL = "https://taxtic.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services } = await loadServicesIndex("es");
  const lastModified = new Date();

  const staticRoutes = ["", "/nosotros", "/contacto", "/servicios"];
  const serviceRoutes = services.map((s) => `/servicios/${s.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${SITE_URL}/es${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
