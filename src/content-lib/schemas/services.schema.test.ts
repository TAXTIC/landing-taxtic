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
  entregables: [
    "Contabilidad mensual conciliada con bancos.",
    "Estados financieros con reportes ejecutivos en lenguaje claro.",
    "Respaldo y acompañamiento ante fiscalizaciones del SII.",
  ],
  iconName: "BookOpen",
};

const validIndex = {
  services: Array(6)
    .fill(validService)
    .map((s, i) => ({
      ...s,
      slug: `slug-${i}`,
    })),
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

  it("rejects index with !== 6 services", () => {
    const bad = { services: validIndex.services.slice(0, 5) };
    expect(() => servicesIndexSchema.parse(bad)).toThrow(/6/);
  });

  it("rejects services with fewer than 3 entregables", () => {
    const bad = structuredClone(validIndex);
    bad.services[0]!.entregables = ["one"];
    expect(() => servicesIndexSchema.parse(bad)).toThrow();
  });

  it("rejects services with more than 8 entregables", () => {
    const bad = structuredClone(validIndex);
    bad.services[0]!.entregables = Array(9).fill("Suficientemente largo");
    expect(() => servicesIndexSchema.parse(bad)).toThrow();
  });

  it("rejects entregables with item shorter than 10 chars", () => {
    const bad = structuredClone(validIndex);
    bad.services[0]!.entregables = [
      "short",
      "Lo suficientemente largo",
      "Otro item válido",
    ];
    expect(() => servicesIndexSchema.parse(bad)).toThrow();
  });
});
