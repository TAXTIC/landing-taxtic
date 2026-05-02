import { z } from "zod";

export const ctaDescriptorSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("whatsapp"),
    label: z.string().min(1),
  }),
  z.object({
    kind: z.literal("internal"),
    label: z.string().min(1),
    href: z.string().startsWith("/"),
  }),
  z.object({
    kind: z.literal("external"),
    label: z.string().min(1),
    href: z.string().url(),
  }),
  z.object({
    kind: z.literal("anchor"),
    label: z.string().min(1),
    href: z.string().startsWith("#"),
  }),
]);

export type CtaDescriptor = z.infer<typeof ctaDescriptorSchema>;

export type ResolvedCta = {
  label: string;
  href: string;
  external: boolean;
};
