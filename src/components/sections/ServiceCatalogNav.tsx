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
    <aside className="flex flex-col gap-10">
      <nav aria-label={eyebrow}>
        <span className="label-upper inline-flex items-center gap-2.5 text-(--foreground-muted)">
          <span
            className="inline-block size-2 bg-(--brand-orange)"
            aria-hidden="true"
          />
          {eyebrow}
        </span>
        <ol className="mt-8 flex flex-col">
          {services.map((s, i) => {
            const isCurrent = s.slug === currentSlug;
            const n = String(i + 1).padStart(2, "0");
            return (
              <li
                key={s.slug}
                className="flex items-center justify-between border-b border-(--border) py-3.5 text-sm"
              >
                {isCurrent ? (
                  <>
                    <span
                      aria-current="page"
                      className="font-medium text-(--brand-orange)"
                    >
                      {n} · {s.title}
                    </span>
                    <span aria-hidden="true" className="text-(--brand-orange)">
                      ●
                    </span>
                  </>
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
      </nav>

      <div className="bg-(--brand-orange) p-6 text-(--brand-white)">
        <span className="label-upper text-(--brand-white)/85">
          {whatsappHeading}
        </span>
        <p className="mt-3 text-sm leading-normal">{whatsappBody}</p>
        <a
          href={whatsapp.href}
          target={whatsapp.external ? "_blank" : undefined}
          rel={whatsapp.external ? "noopener noreferrer" : undefined}
          className="group/wa mt-4 inline-flex items-center gap-2 bg-(--brand-black) px-3 py-2 text-xs font-medium uppercase tracking-[0.04em] text-(--brand-white) transition-opacity hover:opacity-90"
        >
          {whatsapp.label}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/wa:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </aside>
  );
}
