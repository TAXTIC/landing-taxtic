import { z } from "zod";

export const contactSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(5),
    accentWord: z.string().min(1),
    lead: z.string().min(20),
  }),
  dataColumn: z.object({
    eyebrow: z.string().min(1),
    emailLabel: z.string().min(1),
    hoursLabel: z.string().min(1),
    hoursDisplay: z.string().min(1),
  }),
  whatsappPanel: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    lead: z.string().min(10),
    altEmailPrefix: z.string().min(1),
  }),
  map: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    accentWord: z.string().min(1),
    badge: z.string().min(1),
  }),
});

export type ContactContent = z.infer<typeof contactSchema>;
