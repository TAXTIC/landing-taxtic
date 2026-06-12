import { z } from "zod";

const phoneSchema = z.object({
  tel: z
    .string()
    .regex(/^\+?[0-9]+$/, "tel must be digits, optionally prefixed with +")
    .min(7, "tel must be at least 7 digits"),
  display: z.string().min(1),
});

const branchSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    country: z.string().min(1),
    countryCode: z
      .string()
      .regex(
        /^[A-Z]{2}$/,
        "countryCode must be 2 uppercase letters (ISO 3166-1 alpha-2)",
      ),
    mapEmbedUrl: z.string().url(),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  phoneLandline: phoneSchema,
});

export const siteSchema = z.object({
  org: z.object({
    legalName: z.string().min(1),
    tagline: z.string().min(1),
  }),
  canonicalUrl: z.string().url(),
  branches: z.array(branchSchema).min(1),
  hours: z.object({
    weekdays: z.object({
      open: z.string().regex(/^\d{2}:\d{2}$/, "open must be HH:MM"),
      close: z.string().regex(/^\d{2}:\d{2}$/, "close must be HH:MM"),
    }),
    format: z.enum(["continuous", "split"]),
  }),
  channels: z.object({
    whatsapp: phoneSchema.extend({ url: z.string().url() }),
    email: z.object({ primary: z.string().email() }),
  }),
  social: z.object({
    instagram: z.string().url(),
    facebook: z.string().url(),
    linkedin: z.string().url(),
  }),
  portal: z.object({ url: z.string().url() }),
});

export type SiteContent = z.infer<typeof siteSchema>;
export type Branch = SiteContent["branches"][number];
