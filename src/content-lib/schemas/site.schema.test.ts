import { describe, expect, it } from "vitest";

import siteJson from "../../../content/site.json";
import { siteSchema } from "./site.schema";

const validFixture = {
  org: { legalName: "Taxtic", tagline: "Consultoría contable y tributaria" },
  canonicalUrl: "https://taxtic.com",
  branches: [
    {
      id: "carmen",
      label: "Sucursal Carmen",
      address: {
        street: "Carmen #459",
        city: "Curicó",
        region: "Región del Maule",
        country: "Chile",
        countryCode: "CL",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!example",
        lat: -34.9853,
        lng: -71.2398,
      },
      phoneLandline: { tel: "+56752221800", display: "+56 75 2 221800" },
    },
    {
      id: "avenida-espana",
      label: "Sucursal Avenida España",
      address: {
        street: "Avenida España #784",
        city: "Curicó",
        region: "Región del Maule",
        country: "Chile",
        countryCode: "CL",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!other",
        lat: -34.9836,
        lng: -71.2361,
      },
      phoneLandline: { tel: "+56752405901", display: "+56 75 240 5901" },
    },
  ],
  hours: {
    weekdays: { open: "08:00", close: "17:30" },
    format: "continuous",
  },
  channels: {
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
    bad.branches[0]!.phoneLandline.tel = "+5675abc";
    expect(() => siteSchema.parse(bad)).toThrow(/digits/);
  });

  it("rejects too-short phone tel", () => {
    const bad = structuredClone(validFixture);
    bad.branches[0]!.phoneLandline.tel = "+5";
    expect(() => siteSchema.parse(bad)).toThrow(/at least 7 digits/);
  });

  it("rejects invalid email", () => {
    const bad = structuredClone(validFixture);
    bad.channels.email.primary = "not-an-email";
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects countryCode != 2 chars", () => {
    const bad = structuredClone(validFixture);
    bad.branches[0]!.address.countryCode = "CHI";
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
});

describe("siteSchema.branches", () => {
  it("rejects empty branches array", () => {
    const bad = structuredClone(validFixture);
    bad.branches = [];
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects branch without id", () => {
    const bad = structuredClone(validFixture);
    delete (bad.branches[0]! as Partial<(typeof bad.branches)[number]>).id;
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects branch without label", () => {
    const bad = structuredClone(validFixture);
    delete (bad.branches[0]! as Partial<(typeof bad.branches)[number]>).label;
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects branch without mapEmbedUrl", () => {
    const bad = structuredClone(validFixture);
    delete (
      bad.branches[0]!.address as Partial<(typeof bad.branches)[0]["address"]>
    ).mapEmbedUrl;
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects branch with malformed mapEmbedUrl", () => {
    const bad = structuredClone(validFixture);
    bad.branches[0]!.address.mapEmbedUrl = "not-a-url";
    expect(() => siteSchema.parse(bad)).toThrow();
  });
});

describe("siteSchema.canonicalUrl", () => {
  it("rejects site without canonicalUrl", () => {
    const bad = structuredClone(validFixture);
    delete (bad as Partial<typeof bad>).canonicalUrl;
    expect(() => siteSchema.parse(bad)).toThrow();
  });

  it("rejects malformed canonicalUrl", () => {
    const bad = structuredClone(validFixture);
    bad.canonicalUrl = "not-a-url";
    expect(() => siteSchema.parse(bad)).toThrow();
  });
});

describe("siteSchema — content/site.json real data", () => {
  it("exige lat/lng numéricos en cada sede", () => {
    const site = siteSchema.parse(siteJson);
    for (const branch of site.branches) {
      expect(typeof branch.address.lat).toBe("number");
      expect(typeof branch.address.lng).toBe("number");
    }
  });
});
