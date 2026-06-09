import { z } from "zod";

const areaSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(20),
});

export const techSectionSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(20),
  areas: z.array(areaSchema).length(3),
});

export type TechSectionContent = z.infer<typeof techSectionSchema>;
