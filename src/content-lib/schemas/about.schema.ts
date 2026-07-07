import { z } from "zod";

const valueItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
});

const historyMilestoneSchema = z.object({
  year: z.string().min(4),
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(50)).min(1),
});

// `milestones` es flexible a propósito (a diferencia de values.length(6),
// que el manual de marca fija): un hito nuevo es editar JSON, sin código.
const historySchema = z.object({
  lede: z.string().min(10),
  milestones: z.array(historyMilestoneSchema).min(1),
  closing: z.string().min(50),
});

export const aboutSchema = z.object({
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(50),
  values: z.array(valueItemSchema).length(6),
  history: historySchema,
});

export type AboutContent = z.infer<typeof aboutSchema>;
