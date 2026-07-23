"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/composed/ProjectCard";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
  /** Home page passes a curated subset; /work passes the full list. */
  showFilters?: boolean;
  showViewAll?: boolean;
  eyebrow?: string;
  heading?: string;
}

export function ProjectsSection({
  projects,
  showFilters = false,
  showViewAll = false,
  eyebrow = "Selected work",
  heading = "Projects built to last past launch day.",
}: ProjectsSectionProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProjects =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="cv-auto py-28 sm:py-36">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container-content"
      >
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div variants={fadeUp} className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
            <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              {heading}
            </h2>
          </motion.div>

          {showViewAll && (
            <motion.div variants={fadeUp}>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                View all work
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          )}
        </div>

        {showFilters && (
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-pill border px-4 py-2 text-sm transition-colors",
                  activeCategory === category
                    ? "border-transparent bg-text-primary text-bg-primary"
                    : "border-glass-border/[0.14] text-text-secondary hover:text-text-primary"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer(0.07)}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
