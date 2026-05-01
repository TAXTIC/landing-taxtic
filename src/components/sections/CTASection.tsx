"use client";

import { MessageCircle } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { track } from "@/lib/analytics";

interface CTASectionProps {
  content: Pick<HomeContent["cta"], "title" | "subtitle">;
  button: ResolvedCta;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CTASection({ content, button }: CTASectionProps) {
  function handleClick() {
    track("whatsapp_click", { position: "cta-prefooter" });
  }

  return (
    <Section variant="orange-soft" id="contacto">
      <motion.div
        className="max-w-[600px] mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariants}
      >
        <SectionHeader
          title={content.title}
          subtitle={content.subtitle}
          align="center"
        />
        <div className="mt-8">
          <Button variant="primary-orange" size="lg" asChild>
            <a
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
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
