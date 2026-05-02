import { z } from "zod";

const capabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20),
  iconName: z.string().min(1),
});

export const aiSectionSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(20),
  capabilities: z.array(capabilitySchema).length(3),
});

export type AISectionContent = z.infer<typeof aiSectionSchema>;
