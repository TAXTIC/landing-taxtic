import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Cifra grande + etiqueta en mayúsculas. Separador superior sobre el label
 * en `--brand-orange` (acento de marca como tope, no como sombra).
 *
 * Sin background propio (hereda la superficie del padre), sin shadow,
 * sin radius (sigue la regla de cards cuadradas).
 */
export function StatCard({
  value,
  label,
  align = "left",
  className,
}: StatCardProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <span className="font-bold tracking-tight text-3xl lg:text-4xl text-(--foreground)">
        {value}
      </span>
      <span className="label-upper text-(--foreground-muted) border-t-2 border-(--brand-orange) pt-3">
        {label}
      </span>
    </div>
  );
}
