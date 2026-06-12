import { describe, expect, it } from "vitest";

import { aboutSchema } from "./about.schema";

const validAbout = {
  metaTitle: "Quiénes somos — Taxtic, contabilidad en Curicó",
  metaDescription:
    "Conoce a Taxtic: firma de asesoría contable, tributaria y laboral con base en Curicó. Manifiesto, valores y equipo multidisciplinario.",
  values: [
    {
      title: "Responsabilidad",
      description: "Respondemos en el tiempo y la forma prevista.",
    },
    {
      title: "Excelencia",
      description: "Buscamos el más alto estándar en cada etapa.",
    },
    {
      title: "Profesionalismo",
      description: "Aplicamos todas las competencias necesarias.",
    },
    {
      title: "Confianza",
      description: "Generamos una relación sólida y permanente.",
    },
    {
      title: "Integridad",
      description: "Cumplimos nuestros principios con ética.",
    },
    { title: "Compromiso", description: "Asumimos con seriedad cada entrega." },
  ],
};

describe("aboutSchema", () => {
  it("acepta un about válido con 6 valores", () => {
    expect(() => aboutSchema.parse(validAbout)).not.toThrow();
  });

  it("rechaza si hay distinto de 6 valores", () => {
    const five = { ...validAbout, values: validAbout.values.slice(0, 5) };
    expect(() => aboutSchema.parse(five)).toThrow();
  });

  it("rechaza un valor sin description", () => {
    const broken = {
      ...validAbout,
      values: [
        { title: "X", description: "corta" },
        ...validAbout.values.slice(1),
      ],
    };
    expect(() => aboutSchema.parse(broken)).toThrow();
  });
});
