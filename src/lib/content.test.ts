import { describe, expect, it } from "vitest";

import { getAllServiceSlugs, loadSite } from "./content";

describe("loadSite", () => {
  it("loads and parses content/site.json", async () => {
    const site = await loadSite();
    expect(site.org.legalName).toBe("Taxtic");
    expect(site.canonicalUrl).toBe("https://taxtic.com");
    expect(site.channels.whatsapp.url).toBe("https://wa.me/56942204624");
  });

  it("returns 2 branches with Carmen first and Avenida España second", async () => {
    const site = await loadSite();
    expect(site.branches).toHaveLength(2);
    expect(site.branches[0]!.id).toBe("carmen");
    expect(site.branches[0]!.label).toBe("Sucursal Carmen");
    expect(site.branches[0]!.address.city).toBe("Curicó");
    expect(site.branches[0]!.phoneLandline.tel).toBe("+56752221800");
    expect(site.branches[1]!.id).toBe("avenida-espana");
    expect(site.branches[1]!.label).toBe("Sucursal Avenida España");
    expect(site.branches[1]!.phoneLandline.tel).toBe("+56752405901");
  });

  it("returns a shape conforming to SiteContent type", async () => {
    const site = await loadSite();
    expect(site.hours.weekdays.open).toMatch(/^\d{2}:\d{2}$/);
    expect(site.branches[0]!.address.countryCode.length).toBe(2);
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
