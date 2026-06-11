import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { loadServicesIndex, loadSite, type Locale } from "@/lib/content";
import { resolveCtaHref } from "@/lib/cta";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesIndexPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const locale = rawLocale as Locale;

  const [services, site, t] = await Promise.all([
    loadServicesIndex(locale),
    loadSite(),
    getTranslations({ locale, namespace: "services" }),
  ]);

  const ctaButton = resolveCtaHref(
    { kind: "whatsapp", label: t("cta.buttonLabel") },
    site,
  );

  return (
    <>
      <Section variant="light">
        <SectionHeader
          as="h1"
          display
          eyebrow={t("indexHero.eyebrow")}
          title={t("indexHero.title")}
          accentWord={t("indexHero.accentWord")}
          subtitle={t("indexHero.subtitle")}
        />
        <div className="mt-12 lg:mt-16">
          <ServicesShowcase
            services={services.services}
            seeDetailLabel={t("cards.seeDetailLabel")}
            showHighlights
            headingLevel="h2"
          />
        </div>
      </Section>
      <CTASection
        content={{ title: t("cta.title"), subtitle: t("cta.subtitle") }}
        button={ctaButton}
      />
    </>
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
