import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { AnchorHighlights } from "@/components/sections/AnchorHighlights";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { loadServicesIndex, type Locale } from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesIndexPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const locale = rawLocale as Locale;

  const [services, t] = await Promise.all([
    loadServicesIndex(locale),
    getTranslations({ locale, namespace: "services" }),
  ]);

  const anchorItems = t.raw("indexHero.anchorHighlights.items") as string[];

  return (
    <Section variant="light">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
        <div className="flex flex-col gap-4">
          <span className="label-upper text-[var(--brand-orange)]">
            {t("indexHero.eyebrow")}
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] leading-tight">
            {t("indexHero.title")}
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-[var(--gray-700)]">
            {t("indexHero.subtitle")}
          </p>
        </div>
        <AnchorHighlights
          label={t("indexHero.anchorHighlights.label")}
          items={anchorItems}
        />
      </div>
      <div className="mt-12 lg:mt-16">
        <ServicesGrid services={services.services} density="expanded" />
      </div>
    </Section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const t = await getTranslations({
    locale: rawLocale,
    namespace: "services",
  });
  return {
    title: t("indexHero.title"),
    description: t("indexHero.subtitle"),
  };
}
