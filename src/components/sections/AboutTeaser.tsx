"use client";

import { motion, type Variants } from "motion/react";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ValueCard } from "@/components/sections/ValueCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { Link } from "@/i18n/navigation";

interface AboutTeaserProps {
  content: Omit<HomeContent["aboutTeaser"], "cta">;
  cta: ResolvedCta;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const valuesContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.24 } },
};

export function AboutTeaser({ content, cta }: AboutTeaserProps) {
  return (
    <Section variant="light" id="nosotros">
      <motion.div
        className="max-w-[var(--container-prose)] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            align="left"
          />
        </motion.div>

        <motion.p
          className="text-base leading-relaxed text-[var(--foreground-muted)] italic mt-6"
          variants={itemVariants}
        >
          {content.lead}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card variant="with-orange-border" className="p-6">
              <div className="label-upper text-[var(--brand-orange)] mb-2">
                {content.mission.label}
              </div>
              <p className="text-sm leading-relaxed text-[var(--gray-900)]">
                {content.mission.text}
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card variant="with-orange-border" className="p-6">
              <div className="label-upper text-[var(--brand-orange)] mb-2">
                {content.vision.label}
              </div>
              <p className="text-sm leading-relaxed text-[var(--gray-900)]">
                {content.vision.text}
              </p>
            </Card>
          </motion.div>
        </motion.div>

        <div className="label-upper text-[var(--foreground-muted)] mt-12 mb-3">
          Valores
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={valuesContainerVariants}
        >
          {content.values.map((value) => (
            <motion.div key={value.title} variants={itemVariants}>
              <ValueCard
                title={value.title}
                description={value.description}
                iconName={value.iconName}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-10" variants={itemVariants}>
          <Button variant="outline-dark" asChild>
            {cta.external ? (
              <a href={cta.href} target="_blank" rel="noopener noreferrer">
                {cta.label} →
              </a>
            ) : (
              <Link href={cta.href as never}>{cta.label} →</Link>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
