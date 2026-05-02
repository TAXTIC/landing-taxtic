import { describe, expect, it } from "vitest";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("incluye apex /es y rutas estáticas con prefijo /es", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain("https://taxtic.com/es");
    expect(urls).toContain("https://taxtic.com/es/nosotros");
    expect(urls).toContain("https://taxtic.com/es/contacto");
    expect(urls).toContain("https://taxtic.com/es/servicios");
    expect(urls).toContain("https://taxtic.com/es/recursos");
  });

  it("incluye 6 rutas de servicios con slug del index", async () => {
    const entries = await sitemap();
    const serviceUrls = entries
      .map((e) => e.url)
      .filter((url) => url.includes("/servicios/"));

    expect(serviceUrls).toHaveLength(6);
    serviceUrls.forEach((url) => {
      expect(url).toMatch(
        /^https:\/\/taxtic\.com\/es\/servicios\/[a-z][a-z0-9-]*$/,
      );
    });
  });

  it("nunca incluye URLs /en", async () => {
    const entries = await sitemap();
    const enUrls = entries
      .map((e) => e.url)
      .filter((url) => url.includes("/en/") || url.endsWith("/en"));

    expect(enUrls).toHaveLength(0);
  });

  it("apex /es tiene priority 1.0, resto 0.8", async () => {
    const entries = await sitemap();
    const apex = entries.find((e) => e.url === "https://taxtic.com/es");
    const otra = entries.find(
      (e) => e.url === "https://taxtic.com/es/nosotros",
    );

    expect(apex?.priority).toBe(1.0);
    expect(otra?.priority).toBe(0.8);
  });
});
