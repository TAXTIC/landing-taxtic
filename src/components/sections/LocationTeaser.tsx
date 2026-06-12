"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { Section } from "@/components/common/Section";
import type { Branch, SiteContent } from "@/content-lib/schemas/site.schema";
import { Link } from "@/i18n/navigation";

interface LocationTeaserProps {
  eyebrow: string;
  quote: string;
  ctaLabel: string;
  imageAlt: string;
  branches: Branch[];
  email: SiteContent["channels"]["email"];
  hoursDisplay: string;
}

export function LocationTeaser({
  eyebrow,
  quote,
  ctaLabel,
  imageAlt,
  branches,
  email,
  hoursDisplay,
}: LocationTeaserProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Section variant="light">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <span className="label-upper inline-flex items-center gap-2.5 text-(--foreground-muted)">
            <span
              className="inline-block size-2 bg-(--brand-orange)"
              aria-hidden="true"
            />
            {eyebrow}
          </span>
          <h2 className="font-display text-3xl font-normal uppercase leading-[1.05] tracking-tight text-(--foreground) sm:text-4xl">
            {quote}
          </h2>
          <ul className="flex flex-col">
            {branches.map((branch) => (
              <li
                key={branch.id}
                className="flex items-center gap-4 border-t border-(--border) py-[18px] text-base text-(--foreground)"
              >
                <span
                  className="size-3 shrink-0 bg-(--brand-orange)"
                  aria-hidden="true"
                />
                <span>
                  {branch.address.street}, {branch.address.city} ·{" "}
                  <a
                    href={`tel:${branch.phoneLandline.tel}`}
                    className="text-(--brand-orange) hover:text-(--brand-orange-hover)"
                  >
                    {branch.phoneLandline.display}
                  </a>
                </span>
              </li>
            ))}
            <li className="flex items-center gap-4 border-y border-(--border) py-[18px] text-base text-(--foreground-muted)">
              <span
                className="size-3 shrink-0 bg-(--brand-orange)"
                aria-hidden="true"
              />
              <span>
                {hoursDisplay} ·{" "}
                <a
                  href={`mailto:${email.primary}`}
                  className="text-(--brand-orange) hover:text-(--brand-orange-hover)"
                >
                  {email.primary}
                </a>
              </span>
            </li>
          </ul>
          <Link
            href={"/contacto" as never}
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-(--foreground) hover:text-(--brand-orange)"
          >
            {ctaLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <div
          ref={ref}
          className="relative aspect-[3/4] w-full overflow-hidden bg-(--surface-inverse)"
          style={{ position: "relative" }}
        >
          <motion.div
            className="absolute inset-x-0 -inset-y-[6%]"
            style={reduce ? undefined : { y }}
          >
            <Image
              src="/images/businesswoman.jpg"
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
