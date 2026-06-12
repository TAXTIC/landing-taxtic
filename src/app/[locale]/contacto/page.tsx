import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BranchesMap } from "@/components/sections/BranchesMap";
import { ContactDataColumn } from "@/components/sections/ContactDataColumn";
import { CTASection } from "@/components/sections/CTASection";
import { WhatsAppPanel } from "@/components/sections/WhatsAppPanel";
import { loadContact, loadSite, type Locale } from "@/lib/content";
import { resolveCtaHref } from "@/lib/cta";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactoPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const [contact, site, t] = await Promise.all([
    loadContact(locale),
    loadSite(),
    getTranslations({ locale, namespace: "contacto" }),
  ]);

  const whatsappCta = resolveCtaHref(
    { kind: "whatsapp", label: t("ctaSection.buttonLabel") },
    site,
  );

  return (
    <>
      <Section variant="light">
        <SectionHeader
          as="h1"
          display
          eyebrowAccent
          eyebrow={contact.hero.eyebrow}
          title={contact.hero.title}
          accentWord={contact.hero.accentWord}
          subtitle={contact.hero.lead}
        />
      </Section>

      <Section variant="light">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <ContactDataColumn
            content={contact.dataColumn}
            branches={site.branches}
            email={site.channels.email}
          />
          {/* Columna reservada al formulario de contacto cuando exista. */}
          <WhatsAppPanel
            content={contact.whatsappPanel}
            whatsappCta={whatsappCta}
            email={site.channels.email.primary}
          />
        </div>
      </Section>

      <BranchesMap content={contact.map} branches={site.branches} />

      <CTASection
        content={{
          title: t("ctaSection.title"),
          subtitle: t("ctaSection.subtitle"),
        }}
        button={whatsappCta}
      />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const contact = await loadContact(locale);
  return { title: contact.hero.title, description: contact.hero.lead };
}
