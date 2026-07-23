"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionLink } from "@/components/composed/SectionLink";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";
import { navigation } from "@/data/navigation";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { springSnappy } from "@/lib/motion/transitions";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-32 overflow-hidden pb-10 pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 translate-y-1/2 rounded-full bg-aurora-a opacity-40 blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container-content"
      >
        <motion.div variants={fadeUp}>
          <GlassPanel
            variant="modal"
            elevated
            className="flex flex-col items-start gap-8 p-8 sm:p-12 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                Next step
              </p>
              <h2 className="text-balance mt-3 max-w-md text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                Let&apos;s build something worth shipping.
              </h2>
              <SectionLink
                sectionId="contact"
                className="mt-6 inline-flex items-center gap-2 text-base font-medium text-accent transition-opacity hover:opacity-75"
              >
                Start a conversation
                <ArrowUp className="rotate-45" size={16} />
              </SectionLink>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={link.label}
                  className="glass-surface flex h-11 w-11 items-center justify-center rounded-pill text-text-secondary transition-colors hover:text-text-primary"
                >
                  <link.icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-6 border-t border-line/[0.08] pt-8 sm:flex-row sm:justify-between"
        >
          <p className="font-mono text-sm text-text-secondary">{personal.fullName}</p>
          <ul className="flex items-center gap-6 text-sm text-text-tertiary">
            {navigation.map((item) => (
              <li key={item.href}>
                <SectionLink sectionId={item.href} className="transition-colors hover:text-text-primary">
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-col items-center justify-between gap-2 text-sm text-text-tertiary sm:flex-row"
        >
          <p>
            © {year} {personal.fullName}. All rights reserved.
          </p>
          <p>Designed &amp; Developed by {personal.fullName}</p>
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
            className="inline-flex items-center gap-2 text-text-tertiary transition-colors hover:text-text-primary"
          >
            Back to top
            <ArrowUp size={14} />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}
