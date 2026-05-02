import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { ContactChannelsList } from "@/components/sections/ContactChannelsList";
import { ContactMapEmbed } from "@/components/sections/ContactMapEmbed";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { loadContact, loadSite, type Locale } from "@/lib/content";
import { resolveCtaHref } from "@/lib/cta";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactoPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const [contactContent, t, site] = await Promise.all([
    loadContact(locale),
    getTranslations({ locale, namespace: "contacto" }),
    loadSite(),
  ]);

  const ctaButton = resolveCtaHref(
    {
      kind: "whatsapp",
      label: t("ctaSection.buttonLabel"),
    },
    site,
  );

  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.country}`)}`;

  return (
    <>
      <PageHero
        eyebrow={contactContent.hero.eyebrow}
        title={contactContent.hero.title}
        subtitle={contactContent.hero.lead}
      />

      <Section variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <ContactChannelsList content={contactContent.channels} site={site} />
          <ContactMapEmbed
            embedUrl={site.address.mapEmbedUrl}
            iframeTitle={contactContent.map.iframeTitle}
            openInMapsLabel={contactContent.map.openInMapsLabel}
            externalUrl={externalMapUrl}
          />
        </div>
      </Section>

      <CTASection
        content={{
          title: t("ctaSection.title"),
          subtitle: t("ctaSection.subtitle"),
        }}
        button={ctaButton}
      />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const contact = await loadContact(locale);
  return {
    title: contact.hero.title,
    description: contact.hero.lead,
  };
}
