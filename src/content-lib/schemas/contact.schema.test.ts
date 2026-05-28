import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact.schema";

const validContact = {
  hero: {
    eyebrow: "Conversemos",
    title: "Estamos para resolver tu pregunta",
    lead: "Cuéntanos sobre tu empresa y en qué podemos ayudarte. Respondemos por WhatsApp en horario hábil; si prefieres correo o teléfono fijo, también funciona.",
  },
  channels: {
    sectionTitle: "Cómo contactarnos",
    labels: {
      hours: "Horario de atención",
      email: "Correo",
      whatsapp: "WhatsApp",
      social: "Redes sociales",
      portal: "Portal de clientes",
    },
    hoursDisplay: "Lunes a viernes · 08:00 – 17:30 (jornada continua)",
  },
  branches: {
    sectionTitle: "Visítanos",
    iframeTitleTemplate: "Mapa de la {{label}} en {{street}}, {{city}}",
    openInMapsLabel: "Abrir en Google Maps",
  },
};

describe("contactSchema", () => {
  it("parses a valid contact content", () => {
    expect(() => contactSchema.parse(validContact)).not.toThrow();
  });

  it("rejects hero.title shorter than 10 chars", () => {
    const bad = structuredClone(validContact);
    bad.hero.title = "short";
    expect(() => contactSchema.parse(bad)).toThrow();
  });

  it("rejects hero.lead shorter than 20 chars", () => {
    const bad = structuredClone(validContact);
    bad.hero.lead = "too short";
    expect(() => contactSchema.parse(bad)).toThrow();
  });

  it("rejects missing channel label", () => {
    const bad = structuredClone(validContact);
    delete (bad.channels.labels as Partial<typeof bad.channels.labels>)
      .whatsapp;
    expect(() => contactSchema.parse(bad)).toThrow();
  });

  it("rejects empty hoursDisplay", () => {
    const bad = structuredClone(validContact);
    bad.channels.hoursDisplay = "";
    expect(() => contactSchema.parse(bad)).toThrow();
  });

  it("rejects empty branches.iframeTitleTemplate", () => {
    const bad = structuredClone(validContact);
    bad.branches.iframeTitleTemplate = "";
    expect(() => contactSchema.parse(bad)).toThrow();
  });
});
