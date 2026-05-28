import { describe, expect, it } from "vitest";

import type { SiteContent } from "@/content-lib/schemas/site.schema";

import { resolveCtaHref } from "./cta";

const fakeSite: Pick<SiteContent, "channels"> = {
  channels: {
    whatsapp: {
      tel: "+56942204624",
      display: "+56 9 4220 4624",
      url: "https://wa.me/56942204624",
    },
    email: { primary: "contacto@taxtic.com" },
  },
};

describe("resolveCtaHref", () => {
  it("resolves whatsapp kind to site whatsapp url + external true", () => {
    const resolved = resolveCtaHref(
      { kind: "whatsapp", label: "Hablemos" },
      fakeSite as SiteContent,
    );
    expect(resolved).toEqual({
      label: "Hablemos",
      href: "https://wa.me/56942204624",
      external: true,
    });
  });

  it("resolves internal kind preserving href + external false", () => {
    const resolved = resolveCtaHref(
      { kind: "internal", label: "Servicios", href: "/servicios" },
      fakeSite as SiteContent,
    );
    expect(resolved).toEqual({
      label: "Servicios",
      href: "/servicios",
      external: false,
    });
  });

  it("resolves anchor kind preserving href + external false", () => {
    const resolved = resolveCtaHref(
      { kind: "anchor", label: "Ver", href: "#servicios" },
      fakeSite as SiteContent,
    );
    expect(resolved).toEqual({
      label: "Ver",
      href: "#servicios",
      external: false,
    });
  });

  it("resolves external kind preserving href + external true", () => {
    const resolved = resolveCtaHref(
      { kind: "external", label: "Portal", href: "https://example.com/x" },
      fakeSite as SiteContent,
    );
    expect(resolved).toEqual({
      label: "Portal",
      href: "https://example.com/x",
      external: true,
    });
  });
});
