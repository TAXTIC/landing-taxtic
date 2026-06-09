"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import Image from "next/image";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { track } from "@/lib/analytics";

interface HeroProps {
  content: Omit<HomeContent["hero"], "ctaPrimary" | "ctaSecondary">;
  ctaPrimary: ResolvedCta;
  ctaSecondary: ResolvedCta;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero({ content, ctaPrimary, ctaSecondary }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "18%"]);
  const contentY = useTransform(scrollY, [0, 600], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  function handleWhatsApp() {
    track("whatsapp_click", { position: "hero" });
  }

  return (
    <Section
      variant="light"
      id="hero"
      bleed
      className="relative isolate overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduceMotion ? undefined : { y: bgY }}
      >
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-cover object-[right_center] scale-110"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: "var(--hero-photo-overlay)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-(--container-max) px-(--space-section-x-mobile) lg:px-(--space-section-x-desktop)">
        <motion.div
          className="flex min-h-[clamp(34rem,88vh,52rem)] max-w-xl flex-col justify-center gap-9 py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={
            reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
          }
        >
          <motion.div
            variants={itemVariants}
            className="w-[min(402px,72vw)] [&_img]:h-auto [&_img]:w-full"
          >
            <BrandLogo
              variant="principal"
              surface="light"
              clearSpace="compact"
              size="xl"
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-[28rem] text-lg leading-normal text-(--foreground)"
          >
            {content.lede}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3.5"
          >
            <Button variant="primary-orange" size="lg" asChild>
              <a
                href={ctaPrimary.href}
                target={ctaPrimary.external ? "_blank" : undefined}
                rel={ctaPrimary.external ? "noopener noreferrer" : undefined}
                onClick={handleWhatsApp}
              >
                {ctaPrimary.label}
                <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </Button>
            <Button variant="outline-dark" size="lg" asChild>
              <a href={ctaSecondary.href}>
                {ctaSecondary.label}
                <ArrowDown size={20} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
