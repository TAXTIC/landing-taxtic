import { z } from "zod";

export const contactSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(10),
    lead: z.string().min(20),
  }),
  channels: z.object({
    sectionTitle: z.string().min(1),
    labels: z.object({
      address: z.string().min(1),
      hours: z.string().min(1),
      email: z.string().min(1),
      phoneLandline: z.string().min(1),
      whatsapp: z.string().min(1),
      social: z.string().min(1),
      portal: z.string().min(1),
    }),
    hoursDisplay: z.string().min(1),
  }),
  map: z.object({
    sectionTitle: z.string().min(1),
    iframeTitle: z.string().min(10),
    openInMapsLabel: z.string().min(1),
  }),
});

export type ContactContent = z.infer<typeof contactSchema>;
