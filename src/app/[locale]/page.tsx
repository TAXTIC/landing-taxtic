import { setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { AISection } from "@/components/sections/AISection";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  loadAISection,
  loadHome,
  loadProcess,
  loadServicesIndex,
  loadSite,
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

  const [home, services, aiSection, process, site] = await Promise.all([
    loadHome(locale),
    loadServicesIndex(locale),
    loadAISection(locale),
    loadProcess(locale),
    loadSite(),
  ]);

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
      <Section variant="muted" id="servicios">
        <SectionHeader
          eyebrow={home.servicesTeaser.eyebrow}
          title={home.servicesTeaser.title}
          align="center"
        />
        <div className="mt-10">
          <ServicesGrid services={services.services} />
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="ghost-light" asChild>
            <Link href={"/servicios" as never}>
              {home.servicesTeaser.seeAllLabel} →
            </Link>
          </Button>
        </div>
      </Section>
      <AISection content={aiSection} />
      <ProcessSteps content={process} />
      <AboutTeaser content={home.aboutTeaser} cta={aboutCta} />
      <CTASection content={home.cta} button={ctaButton} />
    </>
  );
}
