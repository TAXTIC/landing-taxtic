import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import {
  type Discipline,
  DisciplinesList,
} from "@/components/sections/DisciplinesList";
import { HistoryTimeline } from "@/components/sections/HistoryTimeline";
import { LocationTeaser } from "@/components/sections/LocationTeaser";
import { ManifestoBlock } from "@/components/sections/ManifestoBlock";
import { ValuesBlock } from "@/components/sections/ValuesBlock";
import { loadAbout, loadSite, type Locale } from "@/lib/content";
import { resolveCtaHref } from "@/lib/cta";

type Props = { params: Promise<{ locale: string }> };

function formatHours(site: Awaited<ReturnType<typeof loadSite>>): string {
  const { open, close } = site.hours.weekdays;
  return `Lun a Vie · ${open} – ${close}`;
}

export default async function NosotrosPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const [about, site, t, tContacto] = await Promise.all([
    loadAbout(locale),
    loadSite(),
    getTranslations({ locale, namespace: "nosotros" }),
    getTranslations({ locale, namespace: "contacto" }),
  ]);

  const ctaButton = resolveCtaHref(
    { kind: "whatsapp", label: tContacto("ctaSection.buttonLabel") },
    site,
  );

  return (
    <>
      <Section variant="light">
        <SectionHeader
          as="h1"
          display
          eyebrowAccent
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          accentWord={t("hero.accentWord")}
          subtitle={t("hero.subtitle")}
        />
      </Section>

      <ManifestoBlock
        eyebrow={t("manifesto.eyebrow")}
        quote={t("manifesto.quote")}
        accentWord={t("manifesto.accentWord")}
        body={t("manifesto.body")}
        logoAlt={t("manifesto.logoAlt")}
      />

      <HistoryTimeline eyebrow={t("history.eyebrow")} history={about.history} />

      <ValuesBlock
        eyebrow={t("values.eyebrow")}
        title={t("values.title")}
        accentWord={t("values.accentWord")}
        values={about.values}
      />

      <DisciplinesList
        eyebrow={t("disciplines.eyebrow")}
        title={t("disciplines.title")}
        accentWord={t("disciplines.accentWord")}
        items={t.raw("disciplines.items") as Discipline[]}
      />

      <LocationTeaser
        eyebrow={t("location.eyebrow")}
        quote={t("location.quote")}
        ctaLabel={t("location.ctaLabel")}
        imageAlt={t("location.imageAlt")}
        branches={site.branches}
        email={site.channels.email}
        hoursDisplay={formatHours(site)}
      />

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
  const about = await loadAbout(locale);
  return { title: about.metaTitle, description: about.metaDescription };
}
