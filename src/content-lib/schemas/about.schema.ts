import { z } from "zod";

const valueItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  iconName: z.string().min(1),
});

export const aboutSchema = z.object({
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(50),
  mission: z.object({
    label: z.string().min(1),
    text: z.string().min(20),
  }),
  vision: z.object({
    label: z.string().min(1),
    text: z.string().min(20),
  }),
  valuesLabel: z.string().min(1),
  values: z.array(valueItemSchema).length(5),
});

export type AboutContent = z.infer<typeof aboutSchema>;
