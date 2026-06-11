import { ArrowRight } from "lucide-react";

import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { ServiceItem } from "@/content-lib/schemas/services.schema";
import { Link } from "@/i18n/navigation";

interface ServiceCatalogNavProps {
  services: Pick<ServiceItem, "slug" | "title">[];
  currentSlug: string;
  eyebrow: string;
  whatsappHeading: string;
  whatsappBody: string;
  whatsapp: ResolvedCta;
}

export function ServiceCatalogNav({
  services,
  currentSlug,
  eyebrow,
  whatsappHeading,
  whatsappBody,
  whatsapp,
}: ServiceCatalogNavProps) {
  return (
    <aside className="flex flex-col gap-8">
      <div>
        <span className="label-upper text-(--foreground-muted)">{eyebrow}</span>
        <ol className="mt-4 flex flex-col">
          {services.map((s, i) => {
            const isCurrent = s.slug === currentSlug;
            const n = String(i + 1).padStart(2, "0");
            return (
              <li
                key={s.slug}
                className="border-b border-(--border) py-3 text-sm last:border-b-0"
              >
                {isCurrent ? (
                  <span className="font-medium text-(--brand-orange)">
                    {n} · {s.title}
                  </span>
                ) : (
                  <Link
                    href={`/servicios/${s.slug}` as never}
                    className="text-(--foreground-muted) transition-colors hover:text-(--brand-orange)"
                  >
                    {n} · {s.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="bg-(--brand-orange) p-6 text-(--brand-white)">
        <span className="label-upper text-(--brand-white)/85">
          {whatsappHeading}
        </span>
        <p className="mt-3 text-sm leading-normal">{whatsappBody}</p>
        <a
          href={whatsapp.href}
          target={whatsapp.external ? "_blank" : undefined}
          rel={whatsapp.external ? "noopener noreferrer" : undefined}
          className="mt-4 inline-flex items-center gap-2 bg-(--brand-black) px-4 py-2 text-sm font-medium text-(--brand-white) transition-opacity hover:opacity-90"
        >
          {whatsapp.label}
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
