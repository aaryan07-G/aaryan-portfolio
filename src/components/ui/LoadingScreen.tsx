"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { easeReveal } from "@/lib/motion/transitions";

interface LoadingScreenProps {
  /** Controls the exit animation from the parent via AnimatePresence. */
  isExiting?: boolean;
}

/**
 * Full-viewport glass loading state. Used both as the Suspense fallback
 * (app/loading.tsx) for route-level loading, and by <IntroReveal> for the
 * very first paint of the site. Kept purely presentational — the parent
 * owns timing and mount/unmount logic.
 */
export function LoadingScreen({ isExiting = false }: LoadingScreenProps) {
  const initials = personal.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 1, 1] }}
      aria-hidden={isExiting}
    >
      {/* ambient drift glow, consistent with hero background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-a opacity-60 blur-3xl animate-drift" />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <div className="glass-surface flex h-20 w-20 items-center justify-center rounded-2xl shadow-glass">
          <motion.span
            className="font-mono text-sm tracking-[0.2em] text-text-primary"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeReveal, delay: 0.1 }}
          >
            {initials}
          </motion.span>
        </div>

        <div className="relative h-px w-40 overflow-hidden rounded-full bg-line/[0.08]">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
