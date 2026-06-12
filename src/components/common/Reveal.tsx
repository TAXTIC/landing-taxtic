"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Envoltorio de entrada reveal-on-scroll: el contenido sube 36px y aparece
 * cuando entra al viewport. Replica el patrón `.reveal` del diseño aprobado
 * (opacity + translateY, 700ms, ease-out, una sola vez). `className` se pasa
 * al `motion.div` para casos donde el elemento revelado también es sticky.
 */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}
