import { setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { TechSection } from "@/components/sections/TechSection";
import {
  loadHome,
  loadProcess,
  loadServicesIndex,
  loadSite,
  loadTechSection,
  type Locale,
} from "@/lib/content";
import { resolveCtaHref } from "@/lib/cta";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const locale = rawLocale as Locale;

  const [home, services, techSection, process, site] = await Promise.all([
    loadHome(locale),
    loadServicesIndex(locale),
    loadTechSection(locale),
    loadProcess(locale),
    loadSite(),
  ]);

  const homeServices = home.servicesTeaser.serviceSlugs
    .map((slug) => services.services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services.services)[number] => Boolean(s));

  const heroCtaPrimary = resolveCtaHref(home.hero.ctaPrimary, site);
  const heroCtaSecondary = resolveCtaHref(home.hero.ctaSecondary, site);
  const aboutCta = resolveCtaHref(home.aboutTeaser.cta, site);
  const ctaButton = resolveCtaHref(home.cta.button, site);

  return (
    <>
      <Hero
        content={home.hero}
        ctaPrimary={heroCtaPrimary}
        ctaSecondary={heroCtaSecondary}
      />
      <StatsStrip stats={home.stats} />
      <Section variant="light" id="servicios">
        <SectionHeader
          eyebrow={home.servicesTeaser.eyebrow}
          title={home.servicesTeaser.title}
          align="left"
          display
          eyebrowAccent
        />
        <div className="mt-12">
          <ServicesShowcase
            services={homeServices}
            seeDetailLabel={home.servicesTeaser.seeDetailLabel}
          />
        </div>
      </Section>
      <TechSection content={techSection} />
      <ProcessSteps content={process} />
      <AboutTeaser content={home.aboutTeaser} cta={aboutCta} />
      <CTASection content={home.cta} button={ctaButton} />
    </>
  );
}
