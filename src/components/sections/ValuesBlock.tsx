import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { AboutContent } from "@/content-lib/schemas/about.schema";

interface ValuesBlockProps {
  eyebrow: string;
  title: string;
  accentWord: string;
  values: AboutContent["values"];
}

export function ValuesBlock({
  eyebrow,
  title,
  accentWord,
  values,
}: ValuesBlockProps) {
  const grid = values.slice(0, 4);
  const band = values.slice(4, 6);

  return (
    <Section variant="dark">
      <Reveal mode="scroll">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          accentWord={accentWord}
          tone="dark"
          display
          eyebrowAccent
          className="mb-12 lg:mb-14"
        />

        {/* 4-up grid: container carries border-l + border-t; each cell border-r + border-b */}
        <div className="grid grid-cols-1 border-l border-t border-(--gray-700) sm:grid-cols-2 lg:grid-cols-4">
          {grid.map((value, i) => (
            <div
              key={value.title}
              className="group relative border-r border-b border-(--gray-700) px-8 pt-14 pb-10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <span
                className="absolute left-0 top-0 h-2 w-14 bg-(--brand-orange)"
                aria-hidden="true"
              />
              <span className="block font-display text-6xl leading-[0.9] text-(--brand-orange)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[22px] font-medium leading-tight text-(--brand-white)">
                {value.title}
              </h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-(--gray-300)">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Orange band: values 05 and 06 */}
        <div className="grid grid-cols-1 gap-8 bg-(--brand-orange) px-8 py-10 sm:grid-cols-2 sm:gap-12">
          {band.map((value, i) => (
            <div
              key={value.title}
              className="grid grid-cols-[auto_1fr] items-start gap-5"
            >
              <span className="font-display text-5xl leading-[0.9] text-(--brand-black)">
                {String(i + 5).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium text-(--brand-white)">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-(--brand-white)/85">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
