import { z } from "zod";

const serviceItemSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z][a-z0-9-]*$/, "slug must be kebab-case lowercase"),
  title: z.string().min(1),
  shortDescription: z.string().min(20),
  highlights: z.array(z.string().min(1)).length(3),
  iconName: z.string().min(1),
});

export const servicesIndexSchema = z.object({
  services: z.array(serviceItemSchema).length(3),
});

export type ServicesIndex = z.infer<typeof servicesIndexSchema>;
export type ServiceItem = z.infer<typeof serviceItemSchema>;
