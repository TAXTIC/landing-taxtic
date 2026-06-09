import { describe, expect, it } from "vitest";

import { loadHome } from "@/lib/content";

import { homeSchema } from "./home.schema";

describe("homeSchema · stats", () => {
  it("parsea stats top-level con variants count y accent", async () => {
    const home = await loadHome("es");
    expect(home.stats).toHaveLength(3);
    expect(home.stats[2]!.variant).toBe("accent");
  });

  it("rechaza un variant de stat inválido", () => {
    const base = {
      value: "10+",
      label: "Años de experiencia",
      variant: "bogus",
    };
    expect(() => homeSchema.shape.stats.parse([base, base, base])).toThrow();
  });
});

describe("homeSchema · servicesTeaser", () => {
  it("expone 3 serviceSlugs y un seeDetailLabel", async () => {
    const home = await loadHome("es");
    expect(home.servicesTeaser.serviceSlugs).toHaveLength(3);
    expect(home.servicesTeaser.seeDetailLabel.length).toBeGreaterThan(0);
  });
});
