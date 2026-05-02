import { describe, expect, it } from "vitest";

import { getAllServiceSlugs, loadSite } from "./content";

describe("loadSite", () => {
  it("loads and parses content/site.json", async () => {
    const site = await loadSite();
    expect(site.org.legalName).toBe("Taxtic");
    expect(site.channels.whatsapp.url).toBe("https://wa.me/56942204624");
    expect(site.address.city).toBe("Curicó");
  });

  it("returns a shape conforming to SiteContent type", async () => {
    const site = await loadSite();
    // typecheck-only: si el shape no matcha, esta línea falla a typecheck
    expect(site.hours.weekdays.open).toMatch(/^\d{2}:\d{2}$/);
    expect(site.address.countryCode.length).toBe(2);
  });
});

describe("getAllServiceSlugs", () => {
  it("returns 6 slugs from _index.json", async () => {
    const slugs = await getAllServiceSlugs();
    expect(slugs).toHaveLength(6);
    expect(slugs).toContain("asesoria-contable");
    expect(slugs).toContain("asesoria-tributaria");
    expect(slugs).toContain("outsourcing");
    expect(slugs).toContain("asesoria-legal");
    expect(slugs).toContain("asesoria-laboral");
    expect(slugs).toContain("documentos-electronicos");
  });

  it("returns slugs in the order declared in _index.json", async () => {
    const slugs = await getAllServiceSlugs();
    expect(slugs[0]).toBe("asesoria-contable");
    expect(slugs[5]).toBe("documentos-electronicos");
  });
});

describe("loadAbout", () => {
  it("loads about content with valid metadata and 5 values for ES", async () => {
    const { loadAbout } = await import("./content");
    const about = await loadAbout("es");
    expect(about.metaTitle.length).toBeGreaterThanOrEqual(10);
    expect(about.metaDescription.length).toBeGreaterThanOrEqual(50);
    expect(about.values.length).toBe(5);
  });

  it("loads about content for EN", async () => {
    const { loadAbout } = await import("./content");
    const about = await loadAbout("en");
    expect(about.metaTitle.length).toBeGreaterThanOrEqual(10);
    expect(about.values.length).toBe(5);
  });
});

describe("loadContact", () => {
  it("loads contact JSON for ES", async () => {
    const { loadContact } = await import("./content");
    const contact = await loadContact("es");
    expect(contact.hero.title.length).toBeGreaterThanOrEqual(10);
    expect(contact.channels.labels.whatsapp).toBeTruthy();
    expect(contact.map.iframeTitle.length).toBeGreaterThanOrEqual(10);
  });

  it("loads contact JSON for EN", async () => {
    const { loadContact } = await import("./content");
    const contact = await loadContact("en");
    expect(contact.hero.title.length).toBeGreaterThanOrEqual(10);
  });
});
