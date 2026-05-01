import { z } from "zod";

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean(),
});

const heroStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  verified: z.boolean(),
});

const heroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(10),
  subtitle: z.string().min(20),
  ctaPrimary: ctaSchema,
  ctaSecondary: ctaSchema,
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

const valueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  iconName: z.string().min(1),
});

const aboutTeaserSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  lead: z.string().min(20),
  mission: z.object({
    label: z.string().min(1),
    text: z.string().min(20),
  }),
  vision: z.object({
    label: z.string().min(1),
    text: z.string().min(20),
  }),
  values: z.array(valueSchema).length(5),
  cta: ctaSchema,
});

const ctaPreFooterSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  buttonLabel: z.string().min(1),
  buttonHref: z.string().min(1),
});

export const homeSchema = z.object({
  hero: heroSchema,
  servicesTeaser: servicesTeaserSchema,
  aboutTeaser: aboutTeaserSchema,
  cta: ctaPreFooterSchema,
});

export type HomeContent = z.infer<typeof homeSchema>;
