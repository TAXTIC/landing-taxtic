"use client";

import { MessageCircle } from "lucide-react";
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
        className="bg-(--surface-inverse) px-6 py-24 text-center sm:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        <span className="label-upper inline-flex items-center justify-center gap-2.5 text-(--brand-orange)">
          <span
            className="inline-block size-2 bg-(--brand-orange)"
            aria-hidden="true"
          />
          Conversemos
        </span>
        <h2 className="mx-auto mt-4 max-w-[18ch] font-display uppercase text-4xl leading-tight tracking-tight text-(--brand-white) lg:text-5xl">
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
              <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
              {button.label}
            </a>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
