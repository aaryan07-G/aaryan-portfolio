"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A large, very low-opacity radial glow that trails the cursor across the
 * whole page — the ambient version of the per-card glass spotlight. Purely
 * decorative: skipped entirely on touch devices and for users who prefer
 * reduced motion, and throttled to one update per animation frame.
 */
export function CursorSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setEnabled(true);
    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        glowRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
        glowRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
        frame = 0;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] [background:radial-gradient(600px_circle_at_var(--cursor-x,50%)_var(--cursor-y,50%),rgb(var(--accent)/0.06),transparent_70%)]"
    />
  );
}
