import { z } from "zod";

export const serviceMdxFrontmatterSchema = z.object({
  title: z.string().min(1),
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(50),
});

export type ServiceMdxFrontmatter = z.infer<typeof serviceMdxFrontmatterSchema>;
