"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useMagnetic } from "@/hooks/useMagnetic";
import type { ComponentProps } from "react";

type MagneticButtonProps = ComponentProps<typeof Button>;

/**
 * A Button with a subtle cursor-attraction effect — reserved for the one or
 * two highest-intent CTAs per page (hero, footer). Overusing this dilutes
 * it, so most buttons should stay plain.
 */
export function MagneticButton({ children, ...props }: MagneticButtonProps) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(0.25);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
