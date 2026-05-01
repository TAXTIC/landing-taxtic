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
