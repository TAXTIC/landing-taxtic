"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    const img = imageRef.current;
    if (reduce || !el || !img) {
      if (img) img.style.transform = "";
      return;
    }
    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      img.style.transform = `translateY(${(prog - 0.5) * 60}px)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

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
            className="inline-flex w-fit items-center gap-2 border-b border-current pb-0.5 text-[13px] font-medium tracking-[0.02em] text-(--foreground) transition-[gap,color] duration-200 hover:gap-3.5 hover:text-(--brand-orange)"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[3/4] w-full overflow-hidden bg-(--surface-inverse)"
        >
          <div ref={imageRef} className="absolute inset-x-0 -inset-y-[15%] will-change-transform">
            <Image
              src="/images/businesswoman.jpg"
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
