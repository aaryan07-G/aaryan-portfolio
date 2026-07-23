"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface RotatingTextProps {
  items: string[];
  /** Milliseconds each item stays visible. */
  interval?: number;
  className?: string;
}

/**
 * Cycles through `items` with a soft blur/slide crossfade. Falls back to a
 * static join of all items (no animation, no timers) for users who prefer
 * reduced motion.
 */
export function RotatingText({ items, interval = 2400, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || items.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [items.length, interval, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{items.join(" · ")}</span>;
  }

  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[index]}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
