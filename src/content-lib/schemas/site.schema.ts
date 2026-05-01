import { z } from "zod";

const phoneSchema = z.object({
  tel: z
    .string()
    .regex(/^\+?[0-9]+$/, "tel must be digits, optionally prefixed with +"),
  display: z.string().min(1),
});

export const siteSchema = z.object({
  org: z.object({
    legalName: z.string().min(1),
    tagline: z.string().min(1),
  }),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    country: z.string().min(1),
    countryCode: z.string().length(2),
  }),
  hours: z.object({
    weekdays: z.object({
      open: z.string().regex(/^\d{2}:\d{2}$/, "open must be HH:MM"),
      close: z.string().regex(/^\d{2}:\d{2}$/, "close must be HH:MM"),
    }),
    format: z.enum(["continuous", "split"]),
  }),
  channels: z.object({
    phoneLandline: phoneSchema,
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
