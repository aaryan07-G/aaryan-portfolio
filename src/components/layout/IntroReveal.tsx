"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeReveal } from "@/lib/motion/transitions";

const MIN_DISPLAY_MS = 700;

/**
 * Shows the glass loading screen once per session on first paint, then
 * reveals the app with a soft fade. Reduced-motion users skip straight to
 * content — no forced delay, no transform.
 */
export function IntroReveal({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const alreadyVisited = sessionStorage.getItem("intro-shown");
    if (alreadyVisited) {
      setIsReady(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsReady(true);
      sessionStorage.setItem("intro-shown", "1");
    }, MIN_DISPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Avoid a server/client mismatch flash: render children invisibly until
  // we know whether to show the intro.
  if (!hasMounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <>
      <AnimatePresence>{!isReady && <LoadingScreen key="intro" />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ ...easeReveal, delay: isReady ? 0.1 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
