import { describe, expect, it } from "vitest";

import { servicesIndexSchema } from "./services.schema";

const validService = {
  slug: "asesoria-contable",
  title: "Asesoría contable",
  shortDescription:
    "Llevamos tu contabilidad al día con información clara para tomar decisiones.",
  highlights: [
    "Conciliación bancaria mensual",
    "Estados financieros oportunos y sin jerga",
    "Respaldo ante fiscalizaciones del SII",
  ],
  iconName: "FileText",
};

const validIndex = {
  services: Array(3)
    .fill(validService)
    .map((s, i) => ({ ...s, slug: `slug-${i}` })),
};

describe("servicesIndexSchema", () => {
  it("parses a valid services index with highlights", () => {
    expect(() => servicesIndexSchema.parse(validIndex)).not.toThrow();
  });

  it("rejects services with !== 3 highlights", () => {
    const bad = structuredClone(validIndex);
    bad.services[0]!.highlights = ["only one"];
    expect(() => servicesIndexSchema.parse(bad)).toThrow(/3/);
  });

  it("rejects services with empty highlight string", () => {
    const bad = structuredClone(validIndex);
    bad.services[0]!.highlights = ["valid", "", "valid"];
    expect(() => servicesIndexSchema.parse(bad)).toThrow();
  });

  it("rejects index with !== 3 services", () => {
    const bad = { services: validIndex.services.slice(0, 2) };
    expect(() => servicesIndexSchema.parse(bad)).toThrow(/3/);
  });
});
