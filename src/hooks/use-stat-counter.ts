"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION_MS = 600;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useStatCounter<T extends Element>(
  target: number,
  duration: number = DEFAULT_DURATION_MS,
): { ref: React.RefObject<T | null>; value: number } {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let animationFrameId: number | null = null;

    if (prefersReducedMotion()) {
      animationFrameId = requestAnimationFrame(() => {
        setValue(target);
      });
      return () => {
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      };
    }

    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const startTime = performance.now();

        function tick(now: number): void {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          setValue(Math.round(target * eased));
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(tick);
          }
        }

        animationFrameId = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);

  return { ref, value };
}
