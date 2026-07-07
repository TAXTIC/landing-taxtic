import { describe, expect, it } from "vitest";

import { aboutSchema } from "./about.schema";

const validHistory = {
  lede: "Una década construyendo soluciones tributarias.",
  milestones: [
    {
      year: "2015",
      title: "Nuestros orígenes",
      paragraphs: [
        "TAXTIC nace en 2015 en Curicó, fundada por dos profesionales con trayectoria previa en el Servicio de Impuestos Internos.",
      ],
    },
  ],
  closing:
    "El camino recorrido desde 2015 transformó aquel proyecto inicial de dos personas en una consultora con presencia en la zona centro.",
};

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
  history: validHistory,
};

describe("aboutSchema", () => {
  it("acepta un about válido con 6 valores e historia", () => {
    expect(() => aboutSchema.parse(validAbout)).not.toThrow();
  });

  it("rechaza si hay distinto de 6 valores", () => {
    const five = { ...validAbout, values: validAbout.values.slice(0, 5) };
    expect(() => aboutSchema.parse(five)).toThrow();
  });

  it("rechaza un valor con description demasiado corta", () => {
    const broken = {
      ...validAbout,
      values: [
        { title: "X", description: "corta" },
        ...validAbout.values.slice(1),
      ],
    };
    expect(() => aboutSchema.parse(broken)).toThrow();
  });

  it("rechaza un about sin historia", () => {
    const withoutHistory = { ...validAbout, history: undefined };
    expect(() => aboutSchema.parse(withoutHistory)).toThrow();
  });

  it("rechaza una historia sin hitos", () => {
    const empty = {
      ...validAbout,
      history: { ...validHistory, milestones: [] },
    };
    expect(() => aboutSchema.parse(empty)).toThrow();
  });

  it("rechaza un hito sin párrafos", () => {
    const noParagraphs = {
      ...validAbout,
      history: {
        ...validHistory,
        milestones: [{ year: "2015", title: "Orígenes", paragraphs: [] }],
      },
    };
    expect(() => aboutSchema.parse(noParagraphs)).toThrow();
  });
});
