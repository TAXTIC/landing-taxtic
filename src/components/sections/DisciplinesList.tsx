"use client";

import { motion, type Variants } from "motion/react";

import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";

export interface Discipline {
  areaLabel: string;
  title: string;
  body: string;
}

interface DisciplinesListProps {
  eyebrow: string;
  title: string;
  accentWord: string;
  items: Discipline[];
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export function DisciplinesList({
  eyebrow,
  title,
  accentWord,
  items,
}: DisciplinesListProps) {
  return (
    <Section variant="muted">
      <Reveal mode="scroll">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          accentWord={accentWord}
          display
          eyebrowAccent
          className="mb-12 lg:mb-14"
        />
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {items.map((item) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
              className="flex flex-col gap-3 border border-(--glass-border) bg-(--glass-bg) p-8 transition-[background-color,box-shadow] duration-300 hover:bg-(--surface-muted) hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.10)]"
              style={{ backdropFilter: "blur(var(--glass-blur))" }}
            >
              <span className="font-mono text-xs tracking-wide text-(--brand-orange)">
                {item.areaLabel}
              </span>
              <h3 className="font-display text-xl font-normal uppercase leading-tight tracking-tight text-(--foreground)">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-(--foreground-muted)">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Reveal>
    </Section>
  );
}
