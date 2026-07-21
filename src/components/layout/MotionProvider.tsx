"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Provee la configuración global de `motion` (respeta el `prefers-reduced-motion`
 * del usuario) a todo el árbol. No introduce keyed remounts ni `AnimatePresence`
 * a nivel layout: la animación de entrada por navegación se maneja con
 * `template.tsx` en el segmento que corresponda, evitando el doble montaje del
 * subtree que producía el patrón `AnimatePresence` + `key={pathname}`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
