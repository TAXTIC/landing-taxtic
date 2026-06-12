"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animación de entrada: el contenido sube 36px y aparece (opacity + translateY,
 * 700ms, ease-out).
 *
 * - `mode="mount"` (default): anima al montar. Es lo correcto para contenido
 *   **above-the-fold**, que ya está en pantalla al navegar — coordina con la
 *   navegación sin segundas fases.
 * - `mode="scroll"`: anima cuando el elemento entra al viewport (`whileInView`).
 *   Para contenido **below-the-fold** que revela al hacer scroll, replicando el
 *   reveal-on-scroll del diseño. No usar en contenido above-the-fold: dispara
 *   igual que mount pero de forma asíncrona (el IntersectionObserver corre un
 *   tick después), lo que se nota como una entrada desacoplada.
 *
 * `className` se pasa al `motion.div` (p. ej. cuando el contenedor también es
 * sticky). El doble montaje de página en navegación que antes duplicaba estas
 * entradas se resolvió a nivel transición (ver ADR-0023), no acá.
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
  mode?: "mount" | "scroll";
}

export function Reveal({ children, className, mode = "mount" }: RevealProps) {
  if (mode === "scroll") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={revealVariants}
      >
        {children}
      </motion.div>
    );
  }

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
