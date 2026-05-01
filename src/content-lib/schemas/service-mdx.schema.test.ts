import { describe, expect, it } from "vitest";

import { serviceMdxFrontmatterSchema } from "./service-mdx.schema";

const valid = {
  title: "Asesoría contable",
  metaTitle: "Asesoría contable para empresas chilenas — Taxtic",
  metaDescription:
    "Llevamos tu contabilidad completa, conciliación bancaria, estados financieros y respaldo ante el SII.",
};

describe("serviceMdxFrontmatterSchema", () => {
  it("parses a valid frontmatter", () => {
    expect(() => serviceMdxFrontmatterSchema.parse(valid)).not.toThrow();
  });

  it("rejects missing title", () => {
    const bad = { ...valid, title: "" };
    expect(() => serviceMdxFrontmatterSchema.parse(bad)).toThrow();
  });

  it("rejects metaTitle < 10 chars", () => {
    const bad = { ...valid, metaTitle: "short" };
    expect(() => serviceMdxFrontmatterSchema.parse(bad)).toThrow();
  });

  it("rejects metaDescription < 50 chars", () => {
    const bad = { ...valid, metaDescription: "too short" };
    expect(() => serviceMdxFrontmatterSchema.parse(bad)).toThrow();
  });
});
