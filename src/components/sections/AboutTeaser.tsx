import { BrandLogo } from "@/components/brand/BrandLogo";
import { Section } from "@/components/common/Section";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { Link } from "@/i18n/navigation";
import { splitOnWord } from "@/lib/text";

interface AboutTeaserProps {
  content: Omit<HomeContent["aboutTeaser"], "cta">;
  cta: ResolvedCta;
}

/** Parte la frase antes de la palabra acentuada y la pinta en naranjo. */
function renderQuote(quote: string, accentWord: string) {
  const parts = splitOnWord(quote, accentWord);
  if (!parts) return quote;
  return (
    <>
      {parts.before.trimEnd()}
      <br />
      <span className="text-(--brand-orange)">{accentWord}</span>
      {parts.after}
    </>
  );
}

export function AboutTeaser({ content, cta }: AboutTeaserProps) {
  return (
    <Section variant="light" id="nosotros">
      <span className="label-upper mb-12 inline-flex items-center gap-2.5 text-(--foreground-muted)">
        <span
          className="inline-block size-2 bg-(--brand-orange)"
          aria-hidden="true"
        />
        {content.eyebrow}
      </span>

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display font-normal uppercase text-4xl leading-[1.05] tracking-tight text-(--foreground) lg:text-5xl">
            {renderQuote(content.quote, content.accentWord)}
          </h2>
          <p className="mt-6 text-lg leading-normal text-(--foreground-muted)">
            {content.body}
          </p>
          <Link
            href={cta.href as never}
            className="mt-8 inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-medium text-(--foreground) transition-colors hover:text-(--brand-orange)"
          >
            {cta.label} →
          </Link>
        </div>

        <div className="flex aspect-square items-center justify-center bg-(--brand-orange) p-12">
          <div className="w-3/5 [&_img]:h-auto [&_img]:w-full">
            <BrandLogo
              variant="principal"
              surface="orange"
              clearSpace="compact"
              size="xl"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
