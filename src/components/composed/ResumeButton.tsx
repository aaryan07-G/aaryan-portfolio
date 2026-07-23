"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { personal } from "@/data/personal";
import { glassIn } from "@/lib/motion/variants";
import type { ComponentProps } from "react";

type ButtonVariant = ComponentProps<typeof Button>["variant"];
type ButtonSize = ComponentProps<typeof Button>["size"];

interface ResumeButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * On desktop, opens an in-page preview modal (embedded PDF + a real download
 * link). On mobile, embedded PDF viewers are unreliable, so it skips the
 * modal and downloads/opens the file directly.
 */
export function ResumeButton({ label = "Download Resume", variant = "glass", size = "lg", className }: ResumeButtonProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    setIsDesktop(query.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isPreviewOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isPreviewOpen]);

  const handleClick = () => {
    if (isDesktop) {
      setIsPreviewOpen(true);
    } else {
      window.open(personal.resumeUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={handleClick}>
        <Download size={size === "lg" ? 18 : 16} strokeWidth={1.75} />
        {label}
      </Button>

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg-primary/70 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreviewOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Résumé preview"
          >
            <motion.div
              variants={glassIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <GlassPanel variant="modal" elevated className="flex max-h-[85vh] flex-col p-4 sm:p-6">
                <div className="flex items-center justify-between pb-4">
                  <p className="text-sm font-medium text-text-primary">Résumé Preview</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={personal.resumeUrl}
                      download
                      className="inline-flex items-center gap-1.5 rounded-pill border border-glass-border/[0.14] px-3 py-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
                    >
                      <Download size={13} />
                      Download
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(false)}
                      aria-label="Close résumé preview"
                      className="flex h-8 w-8 items-center justify-center rounded-pill text-text-secondary transition-colors hover:bg-glass-fill/[0.08] hover:text-text-primary"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="min-h-0 flex-1 overflow-hidden rounded-lg bg-white">
                  <iframe
                    src={`${personal.resumeUrl}#view=FitH`}
                    title="Résumé preview"
                    className="h-[70vh] w-full"
                  />
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
