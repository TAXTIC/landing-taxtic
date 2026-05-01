import { setRequestLocale } from "next-intl/server";

import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { AISection } from "@/components/sections/AISection";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import {
  loadAISection,
  loadHome,
  loadProcess,
  loadServicesIndex,
  type Locale,
} from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const locale = rawLocale as Locale;

  const [home, services, aiSection, process] = await Promise.all([
    loadHome(locale),
    loadServicesIndex(locale),
    loadAISection(locale),
    loadProcess(locale),
  ]);

  return (
    <>
      <Hero content={home.hero} />
      <ServicesGrid teaser={home.servicesTeaser} services={services.services} />
      <AISection content={aiSection} />
      <ProcessSteps content={process} />
      <AboutTeaser content={home.aboutTeaser} />
      <CTASection content={home.cta} />
    </>
  );
}
