"use client";

import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, type Variants } from "motion/react";

import type { ServicesIndex } from "@/content-lib/schemas/services.schema";
import { Link } from "@/i18n/navigation";

interface ServicesShowcaseProps {
  services: ServicesIndex["services"];
  seeDetailLabel: string;
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

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Square;
}

export function ServicesShowcase({
  services,
  seeDetailLabel,
}: ServicesShowcaseProps) {
  const total = services.length;

  return (
    <motion.div
      className="grid grid-cols-1 border-l border-t border-(--border) sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={gridVariants}
    >
      {services.map((service, i) => {
        const Icon = resolveIcon(service.iconName);
        return (
          <motion.div key={service.slug} variants={cardVariants}>
            <Link
              href={`/servicios/${service.slug}` as never}
              className="group flex h-full min-h-[20rem] flex-col justify-between border-r border-b border-(--border) bg-(--surface) p-8 transition-colors duration-200 ease-out hover:bg-(--surface-inverse)"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-14 items-center justify-center bg-(--brand-orange)">
                  <Icon
                    size={24}
                    strokeWidth={1.75}
                    className="text-(--brand-white)"
                  />
                </span>
                <span className="font-mono text-xs tracking-wide text-(--foreground-subtle) group-hover:text-(--brand-orange)">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 flex-1">
                <h3 className="font-display text-2xl uppercase leading-none tracking-tight text-(--foreground) group-hover:text-(--brand-white)">
                  {service.title}
                </h3>
                <p className="mt-3.5 text-sm leading-normal text-(--foreground-muted) group-hover:text-(--gray-300)">
                  {service.shortDescription}
                </p>
              </div>
              <span className="label-upper mt-6 inline-flex items-center gap-2 text-(--foreground) group-hover:text-(--brand-orange)">
                {seeDetailLabel}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
