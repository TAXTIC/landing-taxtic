import { describe, expect, it } from "vitest";

import { siteSchema } from "./site.schema";

const validFixture = {
  org: { legalName: "Taxtic", tagline: "Consultoría contable y tributaria" },
  address: {
    street: "Carmen #459",
    city: "Curicó",
    region: "Región del Maule",
    country: "Chile",
    countryCode: "CL",
  },
  hours: {
    weekdays: { open: "08:00", close: "17:30" },
    format: "continuous",
  },
  channels: {
    phoneLandline: { tel: "+56752221800", display: "+56 75 2 221800" },
    whatsapp: {
      tel: "+56942204624",
      display: "+56 9 4220 4624",
      url: "https://wa.me/56942204624",
    },
    email: { primary: "contacto@taxtic.com" },
  },
  social: {
    instagram: "https://www.instagram.com/taxtic.chile/",
    facebook: "https://www.facebook.com/Taxtic/",
    linkedin: "https://cl.linkedin.com/company/taxtic-chile",
  },
  portal: { url: "https://sitax.taxticapp.com/login" },
};

describe("siteSchema", () => {
  it("parses a valid fixture", () => {
    expect(() => siteSchema.parse(validFixture)).not.toThrow();
  });

  it("rejects malformed phone tel (letters)", () => {
    const bad = structuredClone(validFixture);
    bad.channels.phoneLandline.tel = "+5675abc";
    expect(() => siteSchema.parse(bad)).toThrow(/digits/);
  });

  it("rejects invalid email", () => {
    const bad = structuredClone(validFixture);
    bad.channels.email.primary = "not-an-email";
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects countryCode != 2 chars", () => {
    const bad = structuredClone(validFixture);
    bad.address.countryCode = "CHI";
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects non-HH:MM hours", () => {
    const bad = structuredClone(validFixture);
    bad.hours.weekdays.open = "8am";
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects invalid social URL", () => {
    const bad = structuredClone(validFixture);
    bad.social.instagram = "not a url";
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects unknown hours format", () => {
    const input = {
      ...validFixture,
      hours: { ...validFixture.hours, format: "unknown" },
    };
    expect(() => siteSchema.parse(input)).toThrow();
  });

  it("rejects too-short phone tel", () => {
    const bad = structuredClone(validFixture);
    bad.channels.phoneLandline.tel = "+5";
    expect(() => siteSchema.parse(bad)).toThrow(/at least 7 digits/);
  });
});
