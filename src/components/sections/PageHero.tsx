import Image from "next/image";

import { Section } from "@/components/common/Section";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: { src: string; alt: string };
}

export function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <Section variant="light">
      {image ? (
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
          <div className="flex flex-col gap-4">
            <span className="label-upper text-(--brand-orange)">{eyebrow}</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-(--gray-900) leading-tight">
              {title}
            </h1>
            <p className="text-base lg:text-lg leading-relaxed text-(--gray-700)">
              {subtitle}
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[420px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-[42rem] mx-auto text-center items-center">
          <span className="label-upper text-(--brand-orange)">{eyebrow}</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-(--gray-900) leading-tight">
            {title}
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-(--gray-700)">
            {subtitle}
          </p>
        </div>
      )}
    </Section>
  );
}
