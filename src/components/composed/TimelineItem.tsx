"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { fadeUp } from "@/lib/motion/variants";
import type { TimelineEntry } from "@/types";

export function TimelineItem({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) {
  const Icon = entry.type === "education" ? GraduationCap : Briefcase;

  return (
    <motion.div variants={fadeUp} className="relative flex gap-6 pb-10">
      <div className="flex flex-col items-center">
        <div
          className={`glass-surface flex h-11 w-11 shrink-0 items-center justify-center rounded-pill ${
            entry.current ? "shadow-glow-accent" : ""
          }`}
        >
          <Icon size={17} strokeWidth={1.75} className="text-accent" />
        </div>
        {!isLast && <div className="mt-2 w-px flex-1 bg-line/[0.1]" />}
      </div>

      <GlassPanel variant="card" className="mb-2 flex-1 p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-text-primary">{entry.title}</h3>
          <span className="font-mono text-xs text-text-tertiary">{entry.period}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-accent">{entry.organization}</p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{entry.description}</p>
      </GlassPanel>
    </motion.div>
  );
}
