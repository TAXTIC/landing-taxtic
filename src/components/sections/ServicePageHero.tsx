import { useTranslations } from "next-intl";

import { Section } from "@/components/common/Section";
import type { ServiceItem } from "@/content-lib/schemas/services.schema";
import { Link } from "@/i18n/navigation";

interface ServicePageHeroProps {
  service: ServiceItem;
}

export function ServicePageHero({ service }: ServicePageHeroProps) {
  const tServices = useTranslations("services");

  return (
    <Section variant="light">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 text-sm text-[var(--gray-700)]"
      >
        <Link
          href={"/servicios" as never}
          className="hover:text-[var(--brand-orange)] transition-colors"
        >
          {tServices("breadcrumb.back")}
        </Link>
        <span className="mx-2 text-[var(--gray-500)]">/</span>
        <span className="font-bold text-[var(--gray-900)]">
          {service.title}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
        <div className="flex flex-col gap-4">
          <span className="label-upper text-[var(--brand-orange)]">
            {tServices("slugHero.eyebrow")}
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] leading-tight">
            {service.title}
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-[var(--gray-700)]">
            {service.shortDescription}
          </p>
        </div>

        <aside className="border-l-[3px] border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] p-6 lg:p-8">
          <span className="label-upper text-[var(--gray-700)] mb-4 block">
            {tServices("slugHero.anchorLabel")}
          </span>
          <ul className="space-y-2 text-sm lg:text-base text-[var(--gray-900)] list-disc pl-5">
            {service.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
