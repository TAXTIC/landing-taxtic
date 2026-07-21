import { BrandLogo } from "@/components/brand/BrandLogo";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { splitOnWord } from "@/lib/text";

interface ManifestoBlockProps {
  eyebrow: string;
  quote: string;
  accentWord: string;
  body: string;
  logoAlt: string;
}

export function ManifestoBlock({
  eyebrow,
  quote,
  accentWord,
  body,
  logoAlt,
}: ManifestoBlockProps) {
  const parts = splitOnWord(quote, accentWord);

  return (
    <Section variant="light">
      <Reveal mode="scroll">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-6">
            <span className="label-upper inline-flex items-center gap-2.5 text-(--foreground-muted)">
              <span
                className="inline-block size-2 bg-(--brand-orange)"
                aria-hidden="true"
              />
              {eyebrow}
            </span>
            <h2 className="font-display font-normal uppercase tracking-tight text-3xl leading-[1.05] sm:text-4xl lg:text-5xl text-(--foreground)">
              {parts ? (
                <>
                  {parts.before}
                  <span className="text-(--brand-orange)">{accentWord}</span>
                  {parts.after}
                </>
              ) : (
                quote
              )}
            </h2>
            <p className="max-w-[40ch] text-lg leading-relaxed font-light text-(--foreground-muted)">
              {body}
            </p>
          </div>

          <div className="flex aspect-square items-center justify-center bg-(--surface-inverse) p-12">
            <BrandLogo
              variant="principal"
              surface="dark"
              size="lg"
              alt={logoAlt}
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
