import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { HowWeWorkBlock } from "@/components/sections/HowWeWorkBlock";
import { IconCardGrid } from "@/components/sections/IconCardGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ProseWrapper } from "@/components/sections/ProseWrapper";
import { loadAbout, loadSite, type Locale } from "@/lib/content";
import { resolveCtaHref } from "@/lib/cta";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NosotrosPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const [{ MDXContent }, t, tContacto, site] = await Promise.all([
    loadAbout(locale),
    getTranslations({ locale, namespace: "nosotros" }),
    getTranslations({ locale, namespace: "contacto" }),
    loadSite(),
  ]);

  const ctaButton = resolveCtaHref(
    {
      kind: "whatsapp",
      label: tContacto("ctaSection.buttonLabel"),
    },
    site,
  );

  return (
    <>
      <PageHero
        eyebrow={t("pageHero.eyebrow")}
        title={t("pageHero.title")}
        subtitle={t("pageHero.subtitle")}
      />

      <Section variant="muted">
        <SectionHeader
          eyebrow={t("differentiators.eyebrow")}
          title={t("differentiators.title")}
          align="center"
        />
        <IconCardGrid
          items={
            t.raw("differentiators.items") as Array<{
              title: string;
              description: string;
              iconName: string;
            }>
          }
        />
      </Section>

      <Section variant="light">
        <SectionHeader
          eyebrow={t("howWeWork.eyebrow")}
          title={t("howWeWork.title")}
          align="left"
        />
        <HowWeWorkBlock
          lead={t("howWeWork.lead")}
          principles={
            t.raw("howWeWork.principles") as Array<{
              label: string;
              description: string;
            }>
          }
          ctaLabel={t("howWeWork.ctaLabel")}
          ctaHref={t("howWeWork.ctaHref")}
        />
      </Section>

      <Section variant="orange-soft">
        <SectionHeader
          eyebrow={t("missionVision.eyebrow")}
          title={t("missionVision.title")}
          align="center"
        />
        <ProseWrapper>
          <MDXContent />
        </ProseWrapper>
      </Section>

      <Section variant="light">
        <SectionHeader
          eyebrow={t("areas.eyebrow")}
          title={t("areas.title")}
          subtitle={t("areas.lead")}
          align="center"
        />
        <IconCardGrid
          items={
            t.raw("areas.items") as Array<{
              title: string;
              description: string;
              iconName: string;
            }>
          }
        />
      </Section>

      <CTASection
        content={{
          title: tContacto("ctaSection.title"),
          subtitle: tContacto("ctaSection.subtitle"),
        }}
        button={ctaButton}
      />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const { frontmatter } = await loadAbout(locale);
  return {
    title: frontmatter.metaTitle,
    description: frontmatter.metaDescription,
  };
}
