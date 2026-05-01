"use client";

import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import type { ServicesIndex } from "@/content-lib/schemas/services.schema";
import { Link } from "@/i18n/navigation";

interface ServicesGridProps {
  teaser: HomeContent["servicesTeaser"];
  services: ServicesIndex["services"];
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Square;
}

export function ServicesGrid({ teaser, services }: ServicesGridProps) {
  return (
    <Section variant="muted" id="servicios">
      <SectionHeader
        eyebrow={teaser.eyebrow}
        title={teaser.title}
        align="center"
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {services.map((service) => {
          const Icon = resolveIcon(service.iconName);
          return (
            <motion.div key={service.slug} variants={cardVariants}>
              <Link
                href={`/servicios/${service.slug}` as never}
                className="block h-full"
              >
                <Card className="h-full p-6 transition-colors hover:border-[var(--brand-orange)] hover:-translate-y-0.5 transition-transform duration-200 ease-out">
                  <Icon
                    size={24}
                    strokeWidth={1.75}
                    className="text-[var(--brand-orange)] mb-4"
                  />
                  <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--gray-700)]">
                    {service.shortDescription}
                  </p>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Button variant="ghost-light" asChild>
          <Link href={"/servicios" as never}>{teaser.seeAllLabel} →</Link>
        </Button>
      </div>
    </Section>
  );
}
