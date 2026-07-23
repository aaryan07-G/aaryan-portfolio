"use client";

import { forwardRef, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type GlassVariant = "nav" | "card" | "modal" | "chip" | "flat";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  /** Applies the elevated, larger-radius shadow — use for modals/overlays. */
  elevated?: boolean;
  /** Disable the mouse-tracked highlight (e.g. for tiny chips where it's not worth the cost). */
  spotlight?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<GlassVariant, string> = {
  nav: "rounded-pill backdrop-blur-glass shadow-glass",
  card: "rounded-xl backdrop-blur-glass shadow-glass",
  modal: "rounded-2xl backdrop-blur-glass-lg shadow-glass-lg",
  chip: "rounded-pill backdrop-blur-xs shadow-none",
  flat: "rounded-lg backdrop-blur-xs shadow-none",
};

// Skip the mouse-tracking JS entirely on touch devices and for users who
// prefer reduced motion — it's a decorative hover effect, not functional.
function shouldTrackPointer() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The single source of the Liquid Glass material: translucent fill, hairline
 * border, specular top-edge highlight, and a mouse-reactive spotlight that
 * mimics light catching real glass. Every glass-looking element in the app
 * should compose this rather than reimplementing blur/opacity by hand.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      variant = "card",
      elevated = false,
      spotlight = true,
      as = "div",
      className,
      onMouseMove,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as as React.ElementType;
    const spotRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(event);
        if (!spotlight || !spotRef.current || !shouldTrackPointer()) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        spotRef.current.style.setProperty("--spot-x", `${x}%`);
        spotRef.current.style.setProperty("--spot-y", `${y}%`);
        spotRef.current.dataset.active = "true";
      },
      [onMouseMove, spotlight]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(event);
        if (spotRef.current) spotRef.current.dataset.active = "false";
      },
      [onMouseLeave]
    );

    return (
      <Component
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "glass-surface",
          variantStyles[variant],
          elevated && "shadow-glass-lg",
          className
        )}
        {...props}
      >
        {spotlight && <div ref={spotRef} className="glass-spotlight" aria-hidden="true" />}
        {children}
      </Component>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
