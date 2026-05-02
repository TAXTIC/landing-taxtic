import type {
  CtaDescriptor,
  ResolvedCta,
} from "@/content-lib/schemas/cta.schema";
import type { SiteContent } from "@/content-lib/schemas/site.schema";

export function resolveCtaHref(
  descriptor: CtaDescriptor,
  site: SiteContent,
): ResolvedCta {
  switch (descriptor.kind) {
    case "whatsapp":
      return {
        label: descriptor.label,
        href: site.channels.whatsapp.url,
        external: true,
      };
    case "internal":
      return {
        label: descriptor.label,
        href: descriptor.href,
        external: false,
      };
    case "anchor":
      return {
        label: descriptor.label,
        href: descriptor.href,
        external: false,
      };
    case "external":
      return {
        label: descriptor.label,
        href: descriptor.href,
        external: true,
      };
  }
}
