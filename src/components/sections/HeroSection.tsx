"use client";

import { useRef } from "react";
import { Avatar } from "@/components/composed/Avatar";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/composed/MagneticButton";
import { RotatingText } from "@/components/composed/RotatingText";
import { ResumeButton } from "@/components/composed/ResumeButton";
import { personal } from "@/data/personal";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { scrollToSection } from "@/lib/scroll";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax: the aurora background drifts and fades as the
  // hero scrolls out of view — clamped to the section's own scroll range so
  // it never runs unbounded on a fast scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32"
    >
      {/* Ambient aurora glass background — the signature element, echoed
          quietly in the loading screen and footer */}
      <motion.div
        style={{ y: auroraY }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-1/4 top-0 h-[70vmax] w-[70vmax] rounded-full bg-aurora-a blur-3xl animate-drift-slow" />
        <div className="absolute -right-1/4 bottom-0 h-[60vmax] w-[60vmax] rounded-full bg-aurora-b blur-3xl animate-drift" />
        <div className="absolute inset-0 bg-bg-primary/40" />
      </motion.div>

      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        animate="visible"
        style={{ opacity: contentOpacity, y: contentY }}
        className="container-content"
      >
        <motion.div variants={fadeUp}>
          <GlassPanel
            variant="chip"
            spotlight={false}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs text-text-secondary"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                personal.availability.isAvailable ? "bg-emerald-400" : "bg-text-tertiary"
              }`}
            />
            {personal.availability.label}
          </GlassPanel>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-sm uppercase tracking-[0.2em] text-text-tertiary"
        >
          {personal.hero.greeting}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-balance mt-3 max-w-4xl font-sans font-semibold tracking-tight text-text-primary [font-size:clamp(2.75rem,4.5vw+1.25rem,6rem)] [line-height:1.04]"
        >
          {personal.hero.heading}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="mt-4 text-balance max-w-2xl font-mono text-xl text-accent sm:text-2xl"
        >
          <RotatingText items={personal.hero.rotatingTitles} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-balance mt-6 max-w-xl text-lg text-text-secondary sm:text-xl"
        >
          {personal.hero.subtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection("contact")}>
            Hire Me
            <ArrowUpRight size={18} strokeWidth={2} />
          </MagneticButton>
          <Button variant="glass" size="lg" onClick={() => scrollToSection("work")}>
            View Projects
          </Button>
          <ResumeButton label="Download Resume" variant="glass" size="lg" />
          <Button variant="ghost" size="lg" onClick={() => scrollToSection("contact")}>
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex items-center gap-3 text-sm text-text-tertiary"
        >
          <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-glass-border/[0.16]">
            <Avatar fill sizes="24px" className="object-cover text-[9px]" />
          </span>
          <span className="font-mono">{personal.location}</span>
          <span aria-hidden="true">·</span>
          <span>{personal.responseTime}</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-tertiary"
        >
          <span className="text-xs tracking-[0.2em]">SCROLL</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
