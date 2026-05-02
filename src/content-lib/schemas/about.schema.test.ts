import { describe, expect, it } from "vitest";

import { aboutSchema } from "./about.schema";

const validAbout = {
  metaTitle: "Quiénes somos — Taxtic, contabilidad y tributaria en Curicó",
  metaDescription:
    "Conoce a Taxtic: firma de asesoría contable, tributaria, laboral y legal con base en Curicó. Misión, visión y valores institucionales.",
  mission: {
    label: "Misión",
    text: "Entregar un servicio de excelencia en contabilidad, asesoría tributaria y remuneraciones.",
  },
  vision: {
    label: "Visión",
    text: "Ser reconocidos a nivel nacional como una empresa de excelencia.",
  },
  valuesLabel: "Valores",
  values: [
    { title: "Excelencia", description: "Estandar alto.", iconName: "Award" },
    {
      title: "Ética",
      description: "Principios morales sólidos.",
      iconName: "ShieldCheck",
    },
    {
      title: "Compromiso",
      description: "Relaciones duraderas.",
      iconName: "Handshake",
    },
    {
      title: "Profesionalismo",
      description: "Competencias completas.",
      iconName: "Briefcase",
    },
    {
      title: "Responsabilidad",
      description: "Seriedad y calidad.",
      iconName: "BadgeCheck",
    },
  ],
};

describe("aboutSchema", () => {
  it("parses valid about content", () => {
    expect(() => aboutSchema.parse(validAbout)).not.toThrow();
  });

  it("rejects values array with !== 5 items", () => {
    const bad = structuredClone(validAbout);
    bad.values = bad.values.slice(0, 4);
    expect(() => aboutSchema.parse(bad)).toThrow(/5/);
  });

  it("rejects metaDescription shorter than 50 chars", () => {
    const bad = structuredClone(validAbout);
    bad.metaDescription = "too short";
    expect(() => aboutSchema.parse(bad)).toThrow();
  });

  it("rejects mission.text shorter than 20 chars", () => {
    const bad = structuredClone(validAbout);
    bad.mission.text = "short";
    expect(() => aboutSchema.parse(bad)).toThrow();
  });

  it("rejects value with empty iconName", () => {
    const bad = structuredClone(validAbout);
    bad.values[0]!.iconName = "";
    expect(() => aboutSchema.parse(bad)).toThrow();
  });
});
