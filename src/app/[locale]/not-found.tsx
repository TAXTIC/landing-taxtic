import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { loadSite } from "@/lib/content";

type Suggestion = { label: string; href: string };

export default async function LocalizedNotFound() {
  const [t, site] = await Promise.all([
    getTranslations("notFound"),
    loadSite(),
  ]);

  const suggestions = t.raw("suggestions") as Suggestion[];

  return (
    <Section variant="light" className="min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <p className="label-upper text-(--brand-orange) mb-4">{t("eyebrow")}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-(--gray-900) mb-6">
          {t("title")}
        </h1>
        <p className="text-lg text-(--gray-700) mb-10">{t("lead")}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="primary-orange" asChild>
            <Link href={"/" as never}>{t("primaryCta")}</Link>
          </Button>
          <Button variant="outline-dark" asChild>
            <a
              href={site.channels.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("secondaryCta")}
            </a>
          </Button>
        </div>

        {suggestions.length >= 2 && (
          <div className="border-t border-(--border) pt-8">
            <p className="label-upper text-(--gray-700) mb-4">
              {t("suggestionsLabel")}
            </p>
            <ul className="flex flex-wrap gap-3 justify-center">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href as never}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-(--border) text-(--gray-900) hover:border-(--brand-orange) hover:text-(--brand-orange) transition-colors"
                  >
                    {s.label}
                    <ChevronRight
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
