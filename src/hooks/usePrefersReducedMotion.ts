"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion` live (not just at mount), so components
 * can swap spring/transform variants for opacity-only ones instantly if the
 * user changes their OS setting mid-session.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
