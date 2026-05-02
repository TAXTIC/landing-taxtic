"use client";

import type { Route } from "next";

import { useRouter } from "@/i18n/navigation";

export function usePageTransition<T extends string>(): {
  navigate: (href: Route<T>) => void;
} {
  const router = useRouter();
  return {
    navigate: (href) => router.push(href),
  };
}
