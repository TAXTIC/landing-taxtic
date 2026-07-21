import { describe, expect, it } from "vitest";

import { techSectionSchema } from "./tech-section.schema";

const valid = {
  eyebrow: "Tecnología aplicada",
  title: "Qué hace la tecnología por los servicios de Taxtic",
  intro:
    "No usamos 'IA' como decoración. Usamos automatización y procesamiento de datos para tareas específicas donde agregan valor medible.",
  areas: [
    {
      title: "Tributario",
      body: "Tu equipo tributario respaldado por herramientas.",
    },
    { title: "Contable", body: "Tu contabilidad gestionada con tecnología." },
    {
      title: "Laboral",
      body: "Tu área de personas respaldada por especialistas.",
    },
  ],
};

describe("techSectionSchema", () => {
  it("parsea un objeto válido con 3 áreas", () => {
    const parsed = techSectionSchema.parse(valid);
    expect(parsed.areas).toHaveLength(3);
    expect(parsed.areas[0]!.title).toBe("Tributario");
  });

  it("rechaza un número de áreas distinto de 3", () => {
    expect(() =>
      techSectionSchema.parse({ ...valid, areas: valid.areas.slice(0, 2) }),
    ).toThrow();
  });

  it("rechaza un área sin body", () => {
    expect(() =>
      techSectionSchema.parse({
        ...valid,
        areas: [{ title: "Tributario" }, ...valid.areas.slice(1)],
      }),
    ).toThrow();
  });
});
