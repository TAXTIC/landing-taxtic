import { z } from "zod";

import { ctaDescriptorSchema } from "./cta.schema";

const heroSchema = z.object({
  lede: z.string().min(20),
  ctaPrimary: ctaDescriptorSchema,
  ctaSecondary: ctaDescriptorSchema,
  image: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(10),
  }),
});

const statSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  variant: z.enum(["count", "accent"]),
});

const servicesTeaserSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  serviceSlugs: z.array(z.string().min(1)).length(3),
  seeDetailLabel: z.string().min(1),
});

const aboutTeaserSchema = z.object({
  eyebrow: z.string().min(1),
  quote: z.string().min(1),
  accentWord: z.string().min(1),
  body: z.string().min(20),
  cta: ctaDescriptorSchema,
});

export const homeSchema = z.object({
  hero: heroSchema,
  stats: z.array(statSchema).length(3),
  servicesTeaser: servicesTeaserSchema,
  aboutTeaser: aboutTeaserSchema,
  cta: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    button: ctaDescriptorSchema,
  }),
});

export type HomeContent = z.infer<typeof homeSchema>;
