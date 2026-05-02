import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
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

  return (
    <Section variant="light">
      <SectionHeader
        eyebrow={t("indexHero.eyebrow")}
        title={t("indexHero.title")}
        subtitle={t("indexHero.subtitle")}
        align="center"
        as="h1"
      />
      <div className="mt-12">
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
