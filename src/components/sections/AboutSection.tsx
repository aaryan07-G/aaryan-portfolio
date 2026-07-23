"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/composed/Avatar";
import { ResumeButton } from "@/components/composed/ResumeButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { personal } from "@/data/personal";

export function AboutSection() {
  return (
    <section id="about" className="cv-auto py-28 sm:py-36">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container-content"
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              About
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-balance mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
            >
              {personal.shortBio}
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-6 max-w-2xl space-y-4 text-text-secondary">
              <p>{personal.aboutDescription}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <GlassPanel variant="card" className="flex gap-4 p-6">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="font-medium text-text-primary">Career Objective</p>
                  <p className="mt-1 text-sm text-text-secondary">{personal.careerObjective}</p>
                </div>
              </GlassPanel>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <ResumeButton label="Download résumé" variant="glass" size="md" />
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="lg:sticky lg:top-32 lg:h-fit">
            <GlassPanel
              variant="modal"
              elevated
              className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-a opacity-70 blur-3xl animate-drift-slow" />
              </div>
              <Avatar
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="relative object-cover text-6xl"
                priority={false}
              />
            </GlassPanel>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
