import type { ReactNode } from "react";

/**
 * Fuerza el remonte de la página de detalle cuando cambia el `slug` (navegación
 * catálogo / siguiente-servicio dentro del mismo segmento). Sin esto, React
 * reconcilia el mismo componente y la animación de entrada no se reproduce; con
 * el template, el segmento remonta una sola vez y el reveal anima de nuevo —
 * sin el doble montaje que causaba el `AnimatePresence` a nivel layout.
 */
export default function ServiceDetailTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
