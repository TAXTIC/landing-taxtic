"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { track } from "@/lib/analytics";

interface CTASectionProps {
  content: Pick<HomeContent["cta"], "title" | "subtitle">;
  button: ResolvedCta;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export function CTASection({ content, button }: CTASectionProps) {
  function handleClick() {
    track("whatsapp_click", { position: "cta-prefooter" });
  }

  return (
    <Section variant="light" id="contacto">
      <motion.div
        className="bg-(--surface-inverse) px-6 py-30 text-center sm:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        <span className="label-upper text-(--brand-orange)">Conversemos</span>
        <h2 className="mx-auto mt-4 max-w-[18ch] font-display uppercase text-4xl leading-[0.98] tracking-tight text-(--brand-white) sm:text-5xl lg:text-display-l">
          {content.title}
        </h2>
        <p className="mx-auto mt-6 max-w-[34rem] text-lg leading-normal text-(--gray-300)">
          {content.subtitle}
        </p>
        <div className="mt-9">
          <Button variant="primary-orange" size="lg" asChild>
            <a
              href={button.href}
              target={button.external ? "_blank" : undefined}
              rel={button.external ? "noopener noreferrer" : undefined}
              onClick={handleClick}
            >
              {button.label}
              <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
