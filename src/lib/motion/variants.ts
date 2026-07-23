import type { Variants } from "framer-motion";
import { easeReveal, springHeavy, springSoft, staggerNormal } from "./transitions";

/** Scroll/mount reveal for text blocks and cards — the workhorse variant. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeReveal,
  },
};

/** Reduced-motion-safe fallback: opacity only, no transform. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeReveal },
};

/** Glass overlay / modal entrance — blur, scale and opacity together. */
export const glassIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: springHeavy,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(6px)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

/** Card hover-lift — used with `whileHover`/`whileTap`. */
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: springSoft },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

/** Stagger container — wrap groups of `fadeUp` children with this. */
export const staggerContainer = (stagger: number = staggerNormal): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
});

/** Slide-down/up for mobile glass sheet menus. */
export const sheetIn: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springSoft },
  exit: { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.2 } },
};
