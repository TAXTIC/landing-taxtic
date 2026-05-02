import { z } from "zod";

export const aboutMdxFrontmatterSchema = z.object({
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(50),
});

export type AboutMdxFrontmatter = z.infer<typeof aboutMdxFrontmatterSchema>;
