"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollState {
  direction: "up" | "down";
  isScrolled: boolean;
}

/**
 * Reports scroll direction (for hiding/showing the nav) and whether the
 * page has scrolled past a small threshold (for switching the nav's glass
 * intensity from "resting" to "elevated"). Throttled via rAF.
 */
export function useScrollDirection(threshold: number = 12): ScrollState {
  const [state, setState] = useState<ScrollState>({ direction: "up", isScrolled: false });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY.current;

      setState({
        direction: diff > 0 && currentY > 80 ? "down" : "up",
        isScrolled: currentY > threshold,
      });

      lastY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
