"use client";

import { motion } from "framer-motion";
import { TimelineItem } from "@/components/composed/TimelineItem";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import type { TimelineEntry } from "@/types";

/**
 * experience.ts and education.ts stay independent (each editable on its
 * own), and are only merged into the shared TimelineEntry shape here, at
 * the point of rendering — TimelineItem itself doesn't know about either
 * source file.
 */
const timeline: TimelineEntry[] = [
  ...experience.map(
    (entry): TimelineEntry => ({
      id: entry.id,
      type: "work",
      title: entry.role,
      organization: entry.company,
      period: entry.duration,
      description: entry.description,
      current: entry.current,
    })
  ),
  ...education.map(
    (entry): TimelineEntry => ({
      id: entry.id,
      type: "education",
      title: entry.degree,
      organization: entry.institution,
      period: `${entry.startDate} — ${entry.endDate}`,
      description: entry.description,
    })
  ),
];

export function EducationTimelineSection() {
  return (
    <section id="timeline" className="cv-auto py-28 sm:py-36">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container-content"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Background</p>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Experience & education.
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer(0.1)} className="mx-auto mt-12 max-w-3xl">
          {timeline.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} isLast={index === timeline.length - 1} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
