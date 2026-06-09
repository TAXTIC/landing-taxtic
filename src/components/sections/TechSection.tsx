"use client";

import { motion, type Variants } from "motion/react";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { TechSectionContent } from "@/content-lib/schemas/tech-section.schema";

interface TechSectionProps {
  content: TechSectionContent;
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export function TechSection({ content }: TechSectionProps) {
  return (
    <Section variant="light" id="tecnologia">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.intro}
        layout="split"
        display
        eyebrowAccent
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {content.areas.map((area, i) => (
          <motion.article
            key={area.title}
            variants={cardVariants}
            className="border border-(--glass-border) bg-(--glass-bg) p-8 backdrop-blur-md transition-transform duration-200 ease-out hover:-translate-y-1"
          >
            <span className="font-mono text-xs tracking-wide text-(--brand-orange)">
              ▸ {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display uppercase text-xl tracking-tight leading-tight mt-4 mb-2.5 text-(--foreground)">
              {area.title}
            </h3>
            <p className="text-sm leading-normal text-(--foreground-muted)">
              {area.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
