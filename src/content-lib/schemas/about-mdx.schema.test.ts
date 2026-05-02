import { describe, expect, it } from "vitest";

import { aboutMdxFrontmatterSchema } from "./about-mdx.schema";

const validFrontmatter = {
  metaTitle: "Quiénes somos — Taxtic, contabilidad y tributaria en Curicó",
  metaDescription:
    "Conoce a Taxtic: firma de asesoría contable, tributaria, laboral y legal con base en Curicó. Misión, visión y valores institucionales.",
};

describe("aboutMdxFrontmatterSchema", () => {
  it("parses a valid about frontmatter", () => {
    expect(() =>
      aboutMdxFrontmatterSchema.parse(validFrontmatter),
    ).not.toThrow();
  });

  it("rejects metaTitle shorter than 10 chars", () => {
    const bad = { ...validFrontmatter, metaTitle: "short" };
    expect(() => aboutMdxFrontmatterSchema.parse(bad)).toThrow();
  });

  it("rejects metaDescription shorter than 50 chars", () => {
    const bad = { ...validFrontmatter, metaDescription: "too short" };
    expect(() => aboutMdxFrontmatterSchema.parse(bad)).toThrow();
  });

  it("rejects missing fields", () => {
    expect(() => aboutMdxFrontmatterSchema.parse({})).toThrow();
  });
});
