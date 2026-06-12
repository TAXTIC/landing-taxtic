import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { JSX } from "react";

import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { CTASection } from "@/components/sections/CTASection";
import { ProseWrapper } from "@/components/sections/ProseWrapper";
import { ServiceCatalogNav } from "@/components/sections/ServiceCatalogNav";
import { ServiceDetailHero } from "@/components/sections/ServiceDetailHero";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { serviceMdxFrontmatterSchema } from "@/content-lib/schemas/service-mdx.schema";
import { Link } from "@/i18n/navigation";
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

  const index = services.services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const service = services.services[index]!;
  const nextService =
    services.services[(index + 1) % services.services.length]!;

  const mdxModule = await import(`@content/${locale}/services/${slug}.mdx`);
  const Content = mdxModule.default as () => JSX.Element;
  serviceMdxFrontmatterSchema.parse(mdxModule.service);

  const whatsapp = resolveCtaHref(
    { kind: "whatsapp", label: t("catalogNav.whatsappButton") },
    site,
  );
  const ctaButton = resolveCtaHref(
    { kind: "whatsapp", label: t("cta.buttonLabel") },
    site,
  );

  return (
    <>
      <Section variant="light">
        <Reveal>
          <ServiceDetailHero service={service} />
        </Reveal>
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="lg:sticky lg:top-30 lg:self-start">
            <Reveal>
              <ServiceCatalogNav
                services={services.services.map((s) => ({
                  slug: s.slug,
                  title: s.title,
                }))}
                currentSlug={slug}
                eyebrow={t("catalogNav.eyebrow")}
                whatsappHeading={t("catalogNav.whatsappHeading")}
                whatsappBody={t("catalogNav.whatsappBody")}
                whatsapp={whatsapp}
              />
            </Reveal>
          </div>
          <div>
            <Reveal mode="scroll">
              <ProseWrapper>
                <Content />
              </ProseWrapper>
            </Reveal>
            <Reveal mode="scroll">
              <div className="mt-20 border-t border-(--border) pt-14">
                <span className="label-upper inline-flex items-center gap-2.5 text-(--foreground-muted)">
                  <span
                    className="inline-block size-2 bg-(--brand-orange)"
                    aria-hidden="true"
                  />
                  {t("nextService")}
                </span>
                <h3 className="mt-3 font-display text-[36px] font-normal uppercase leading-none tracking-[-0.01em]">
                  <Link
                    href={`/servicios/${nextService.slug}` as never}
                    className="inline-flex items-center gap-2 border-b border-current text-(--brand-orange) transition-opacity hover:opacity-80"
                  >
                    {nextService.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                </h3>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
      <CTASection
        content={{ title: t("cta.title"), subtitle: t("cta.subtitle") }}
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
