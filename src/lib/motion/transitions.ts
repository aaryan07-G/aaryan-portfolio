import type { Transition } from "framer-motion";

/**
 * Central transition presets. Components should import these rather than
 * inlining spring configs, so the whole site's motion "weight" stays
 * consistent and can be re-tuned in one place.
 */

/** Light, responsive — small UI elements: buttons, chips, toggles. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.7,
};

/** Medium weight — cards, panels, nav indicator. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

/** Heaviest — full-screen overlays, modals, the loading screen. */
export const springHeavy: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 26,
  mass: 1.1,
};

/** Pure fades / reveals — no spring, deliberate ease-out duration. */
export const easeReveal: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1], // out-expo
};

export const easeRevealFast: Transition = {
  duration: 0.45,
  ease: [0.25, 1, 0.5, 1], // out-quart
};

/** Stagger timing for groups of children (nav items, grid cards). */
export const staggerFast = 0.055;
export const staggerNormal = 0.08;
