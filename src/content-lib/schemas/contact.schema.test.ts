import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact.schema";

const valid = {
  hero: {
    eyebrow: "Conversemos",
    title: "Contacto directo",
    accentWord: "directo",
    lead: "Cuéntanos en qué podemos ayudarte. Respondemos por WhatsApp en horario hábil.",
  },
  dataColumn: {
    eyebrow: "Datos directos",
    emailLabel: "Email",
    hoursLabel: "Horario",
    hoursDisplay: "Lun a Vie · 08:00 – 17:30",
  },
  whatsappPanel: {
    eyebrow: "Conversemos",
    title: "Escríbenos por WhatsApp",
    lead: "Cuéntanos sobre tu empresa y en qué podemos ayudarte.",
    altEmailPrefix: "¿Prefieres correo?",
  },
  map: {
    eyebrow: "Cómo llegar",
    title: "Visítanos en Curicó",
    accentWord: "Curicó",
    badge: "Taxtic · Curicó",
  },
};

describe("contactSchema", () => {
  it("acepta un contact válido V2", () => {
    expect(() => contactSchema.parse(valid)).not.toThrow();
  });

  it("rechaza si falta whatsappPanel", () => {
    const rest = { ...valid };
    delete (rest as Partial<typeof valid>).whatsappPanel;
    expect(() => contactSchema.parse(rest)).toThrow();
  });
});
