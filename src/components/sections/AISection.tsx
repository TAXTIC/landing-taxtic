"use client";

import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import type { AISectionContent } from "@/content-lib/schemas/ai-section.schema";

interface AISectionProps {
  content: AISectionContent;
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Square;
}

export function AISection({ content }: AISectionProps) {
  return (
    <Section variant="light" id="tecnologia">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.intro}
        align="left"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {content.capabilities.map((capability) => {
          const Icon = resolveIcon(capability.iconName);
          return (
            <motion.div key={capability.title} variants={cardVariants}>
              <Card variant="with-orange-border" className="h-full">
                <Icon
                  size={24}
                  strokeWidth={1.75}
                  className="text-[var(--brand-orange)] mb-4"
                />
                <h3 className="text-base font-bold text-[var(--gray-900)] mb-2">
                  {capability.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--gray-700)]">
                  {capability.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
