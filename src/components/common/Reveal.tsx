"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animación de entrada: el contenido sube 36px y aparece (opacity + translateY,
 * 700ms, ease-out).
 *
 * - `mode="mount"` (default): anima al montar. Para contenido above-the-fold,
 *   que ya está en pantalla al navegar — entrada inmediata y coordinada.
 * - `mode="scroll"`: anima cuando el elemento entra al viewport (`whileInView`).
 *   Para contenido below-the-fold que revela al hacer scroll.
 *
 * `className` se pasa al `motion.div` (p. ej. cuando el contenedor también es
 * sticky). El doble montaje de página en navegación que antes duplicaba estas
 * entradas se resolvió a nivel de transición — un `template.tsx` remonta el
 * árbol al cambiar de ruta — no en este componente.
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
  const isScroll = mode === "scroll";
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isScroll ? undefined : "visible"}
      whileInView={isScroll ? "visible" : undefined}
      viewport={isScroll ? { once: true, amount: 0.3 } : undefined}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}
