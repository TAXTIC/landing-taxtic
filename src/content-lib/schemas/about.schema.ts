import { z } from "zod";

const valueItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
});

export const aboutSchema = z.object({
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(50),
  values: z.array(valueItemSchema).length(6),
});

export type AboutContent = z.infer<typeof aboutSchema>;
