import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

// Locales públicamente habilitados en el switch de idioma. `routing.locales`
// declara todos los locales que el router conoce; este subconjunto es el que
// se ofrece al visitante. EN está bloqueado (redirige a ES en proxy.ts) hasta
// que su traducción exista — agregar "en" aquí lo reactiva sin tocar el shell.
export const enabledLocales = ["es"] as const satisfies ReadonlyArray<
  (typeof routing.locales)[number]
>;
