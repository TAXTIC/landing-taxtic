import { describe, expect, it } from "vitest";

import { loadSite } from "./content";

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
