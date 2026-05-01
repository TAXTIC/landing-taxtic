// landing-taxtic/src/lib/analytics.ts
type EventProps = Record<string, string | number | boolean>;

interface PlausibleWindow extends Window {
  plausible?: (event: string, options?: { props?: EventProps }) => void;
}

/**
 * Wrapper para eventos de analytics. Hoy no-op porque el script externo
 * de Plausible aún no se carga; cuando se agregue el `<Script>` al layout
 * raíz, los eventos comienzan a registrarse sin tocar este wrapper ni los
 * consumers que ya lo invocan.
 *
 * Trabaja silenciosamente en SSR (returns sin hacer nada) y silenciosamente
 * en cliente cuando window.plausible no está definido.
 */
export function track(eventName: string, props?: EventProps): void {
  if (typeof window === "undefined") return;
  const w = window as PlausibleWindow;
  w.plausible?.(eventName, props ? { props } : undefined);
}
