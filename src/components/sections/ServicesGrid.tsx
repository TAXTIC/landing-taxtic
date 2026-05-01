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

type ServicesGridProps =
  | {
      density?: "compact";
      teaser: HomeContent["servicesTeaser"];
      services: ServicesIndex["services"];
      showSeeAll?: boolean;
    }
  | {
      density: "expanded";
      services: ServicesIndex["services"];
      teaser?: never;
      showSeeAll?: false;
    };

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

export function ServicesGrid(props: ServicesGridProps) {
  const isExpanded = props.density === "expanded";
  const showSeeAll = !isExpanded && (props.showSeeAll ?? true);

  const gridClasses = isExpanded
    ? "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10";

  const cardPaddingClass = isExpanded ? "p-8" : "p-6";

  return (
    <Section variant={isExpanded ? "light" : "muted"} id="servicios">
      {!isExpanded && props.teaser && (
        <SectionHeader
          eyebrow={props.teaser.eyebrow}
          title={props.teaser.title}
          align="center"
        />
      )}

      <motion.div
        className={gridClasses}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {props.services.map((service) => {
          const Icon = resolveIcon(service.iconName);
          return (
            <motion.div key={service.slug} variants={cardVariants}>
              <Link
                href={`/servicios/${service.slug}` as never}
                className="block h-full"
              >
                <Card
                  className={`h-full ${cardPaddingClass} transition-colors hover:border-[var(--brand-orange)] hover:-translate-y-0.5 transition-transform duration-200 ease-out`}
                >
                  <Icon
                    size={isExpanded ? 28 : 24}
                    strokeWidth={1.75}
                    className="text-[var(--brand-orange)] mb-4"
                  />
                  <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--gray-700)] mb-4">
                    {service.shortDescription}
                  </p>
                  {isExpanded && (
                    <ul className="space-y-1.5 text-sm text-[var(--gray-700)] mb-4 list-disc pl-5">
                      {service.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {isExpanded && (
                    <span className="text-sm font-bold text-[var(--brand-orange)]">
                      Ver detalles →
                    </span>
                  )}
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {showSeeAll && !isExpanded && props.teaser && (
        <div className="mt-10 flex justify-center">
          <Button variant="ghost-light" asChild>
            <Link href={"/servicios" as never}>
              {props.teaser.seeAllLabel} →
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
