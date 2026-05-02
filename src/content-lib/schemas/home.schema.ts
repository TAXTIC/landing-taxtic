import { z } from "zod";

import { ctaDescriptorSchema } from "./cta.schema";

const heroStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  verified: z.boolean(),
});

const heroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(10),
  subtitle: z.string().min(20),
  ctaPrimary: ctaDescriptorSchema,
  ctaSecondary: ctaDescriptorSchema,
  image: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(10),
  }),
  stats: z.array(heroStatSchema).length(3),
});

const servicesTeaserSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  seeAllLabel: z.string().min(1),
});

const aboutTeaserSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(10),
  lead: z.string().min(20),
  highlights: z.array(z.string().min(1)).min(1).max(2),
  cta: ctaDescriptorSchema,
});

export const homeSchema = z.object({
  hero: heroSchema,
  servicesTeaser: servicesTeaserSchema,
  aboutTeaser: aboutTeaserSchema,
  cta: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    button: ctaDescriptorSchema,
  }),
});

export type HomeContent = z.infer<typeof homeSchema>;
