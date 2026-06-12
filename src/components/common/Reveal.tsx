"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animación de entrada: el contenido sube 36px y aparece (opacity + translateY,
 * 700ms, ease-out). Anima **on-mount** para coordinarse con el fade de
 * `PageTransition` en navegación cliente; usar `whileInView` aquí produce una
 * segunda fase asíncrona (el IntersectionObserver dispara después del fade de
 * ruta) que se percibe como doble animación en contenido above-the-fold.
 * `className` se pasa al `motion.div` para casos donde el contenedor revelado
 * también es sticky.
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
      animate="visible"
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}
