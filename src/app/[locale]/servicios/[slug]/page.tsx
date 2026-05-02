import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { JSX } from "react";

import { Section } from "@/components/common/Section";
import { CTASection } from "@/components/sections/CTASection";
import { EntregablesCard } from "@/components/sections/EntregablesCard";
import { ProseWrapper } from "@/components/sections/ProseWrapper";
import { ServicePageHero } from "@/components/sections/ServicePageHero";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { serviceMdxFrontmatterSchema } from "@/content-lib/schemas/service-mdx.schema";
import {
  getAllServiceSlugs,
  loadServicesIndex,
  loadSite,
  type Locale,
} from "@/lib/content";
import { resolveCtaHref } from "@/lib/cta";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams(): Promise<
  Array<{ locale: Locale; slug: string }>
> {
  const slugs = await getAllServiceSlugs();
  const locales: Locale[] = ["es", "en"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

export default async function ServiceSlugPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);

  const locale = rawLocale as Locale;

  const [services, site, t] = await Promise.all([
    loadServicesIndex(locale),
    loadSite(),
    getTranslations({ locale, namespace: "services" }),
  ]);

  const service = services.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const mdxModule = await import(`@content/${locale}/services/${slug}.mdx`);
  const Content = mdxModule.default as () => JSX.Element;
  serviceMdxFrontmatterSchema.parse(mdxModule.service);

  const ctaButton = resolveCtaHref(
    {
      kind: "whatsapp",
      label: t("slugCta.buttonLabel"),
    },
    site,
  );

  return (
    <>
      <Section variant="light">
        <ServicePageHero service={service} />
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16 mt-12 lg:mt-16">
          <ProseWrapper>
            <Content />
          </ProseWrapper>
          <EntregablesCard
            title={t("slugHero.entregablesLabel")}
            items={service.entregables}
          />
        </div>
      </Section>
      <CTASection
        content={{
          title: t("slugCta.title"),
          subtitle: t("slugCta.subtitle"),
        }}
        button={ctaButton}
      />
      <ServiceJsonLd service={service} site={site} />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const mdxModule = await import(`@content/${locale}/services/${slug}.mdx`);
  const meta = serviceMdxFrontmatterSchema.parse(mdxModule.service);
  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
  };
}
