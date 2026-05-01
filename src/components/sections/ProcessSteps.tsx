"use client";

import { motion, type Variants } from "motion/react";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProcessStep } from "@/components/sections/ProcessStep";
import type { ProcessContent } from "@/content-lib/schemas/process.schema";

interface ProcessStepsProps {
  content: ProcessContent;
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ProcessSteps({ content }: ProcessStepsProps) {
  return (
    <Section variant="muted" id="proceso">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        align="left"
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {content.steps.map((step) => (
          <motion.div key={step.stepNumber} variants={stepVariants}>
            <ProcessStep
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
