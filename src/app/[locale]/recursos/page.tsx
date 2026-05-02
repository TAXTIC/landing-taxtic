import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { loadSite, type Locale } from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RecursosPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const [t, site] = await Promise.all([
    getTranslations({ locale, namespace: "recursos" }),
    loadSite(),
  ]);

  return (
    <Section variant="light" className="min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <p className="label-upper text-[var(--brand-orange)] mb-4">
          {t("pageHero.eyebrow")}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--gray-900)] mb-6">
          {t("pageHero.title")}
        </h1>
        <p className="text-lg text-[var(--gray-700)] mb-10">
          {t("pageHero.lead")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary-orange" asChild>
            <a
              href={site.channels.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("pageHero.buttonLabel")}
            </a>
          </Button>
          <Button variant="outline-dark" asChild>
            <Link href={"/" as never}>{t("pageHero.secondaryLinkLabel")}</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "recursos" });
  return {
    title: t("pageHero.title"),
    description: t("pageHero.lead"),
    robots: { index: false, follow: true },
  };
}
