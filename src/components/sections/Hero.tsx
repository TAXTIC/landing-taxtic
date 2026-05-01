"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatInline } from "@/components/sections/StatInline";
import { Button } from "@/components/ui/button";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { Link } from "@/i18n/navigation";

interface HeroProps {
  content: HomeContent["hero"];
  ctaPrimary: ResolvedCta;
  ctaSecondary: ResolvedCta;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

function parseStatValue(raw: string): { numericValue: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { numericValue: 0, suffix: raw };
  return { numericValue: Number(match[1]), suffix: match[2] ?? "" };
}

export function Hero({ content, ctaPrimary, ctaSecondary }: HeroProps) {
  const visibleStats = content.stats.filter((s) => s.verified);

  return (
    <Section variant="light" id="hero">
      <motion.div
        className="grid gap-10 lg:grid-cols-12 items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <SectionHeader
              eyebrow={content.eyebrow}
              title={content.title}
              subtitle={content.subtitle}
              as="h1"
              align="left"
            />
          </motion.div>

          <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
            <Button variant="primary-orange" size="lg" asChild>
              {ctaPrimary.external ? (
                <a
                  href={ctaPrimary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ctaPrimary.label}
                  <ArrowRight size={20} strokeWidth={1.75} />
                </a>
              ) : (
                <Link href={ctaPrimary.href}>
                  {ctaPrimary.label}
                  <ArrowRight size={20} strokeWidth={1.75} />
                </Link>
              )}
            </Button>

            <Button variant="outline-dark" size="lg" asChild>
              {ctaSecondary.external ? (
                <a
                  href={ctaSecondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ctaSecondary.label}
                </a>
              ) : (
                <a href={ctaSecondary.href}>{ctaSecondary.label}</a>
              )}
            </Button>
          </motion.div>

          {visibleStats.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-[var(--border)]"
              variants={itemVariants}
            >
              {visibleStats.map((stat) => {
                const parsed = parseStatValue(stat.value);
                return (
                  <StatInline
                    key={stat.label}
                    numericValue={parsed.numericValue}
                    suffix={parsed.suffix}
                    label={stat.label}
                  />
                );
              })}
            </motion.div>
          )}
        </div>

        <motion.div className="lg:col-span-5" variants={itemVariants}>
          <div className="relative">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 bg-[var(--brand-orange-soft)]"
              aria-hidden="true"
            />
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 41vw, 100vw"
              quality={85}
              priority
              className="relative w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
