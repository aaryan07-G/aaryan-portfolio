"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { services } from "@/data/services";
import { scrollToSection } from "@/lib/scroll";

export function ServicesSection() {
  return (
    <section id="services" className="cv-auto py-28 sm:py-36">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container-content"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">What I do</p>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Services built around your project&apos;s needs.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.07)}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {services.map((service, i) => (
            <motion.div key={service.title} variants={fadeUp}>
              <GlassPanel
                as="button"
                variant="card"
                onClick={() => scrollToSection("contact")}
                aria-label={`Enquire about ${service.title} — scrolls to the contact section`}
                className="group flex h-full w-full flex-col gap-5 p-8 text-left transition-colors hover:bg-glass-fill/[0.08] focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                    <service.icon size={20} strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </div>
                <ul className="mt-1 space-y-1.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-text-tertiary"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <p className="font-mono text-xs text-accent">{service.startingPrice}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100">
                    Get in touch
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
