import { z } from "zod";

const stepSchema = z.object({
  stepNumber: z.number().int().min(1).max(4),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const processSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  steps: z.array(stepSchema).length(4),
});

export type ProcessContent = z.infer<typeof processSchema>;
