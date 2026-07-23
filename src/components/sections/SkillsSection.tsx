"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { skillGroups } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="cv-auto py-28 sm:py-36">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container-content"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Capabilities</p>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            The toolkit behind the work.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.07)}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.category} variants={fadeUp}>
              <GlassPanel variant="card" className="flex h-full flex-col gap-5 p-8">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{group.category}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{group.description}</p>
                </div>
                <div className="flex flex-col gap-3">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${skill.color}1A`, color: skill.color }}
                      >
                        <skill.icon size={16} strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-sm font-medium text-text-primary">
                            {skill.name}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] text-text-tertiary">
                            {skill.yearsOfExperience}y
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-glass-fill/[0.08]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
