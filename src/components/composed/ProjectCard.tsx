"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { hoverLift } from "@/lib/motion/variants";
import type { Project } from "@/types";

const statusStyles: Record<Project["status"], string> = {
  Live: "bg-emerald-400/15 text-emerald-300",
  Completed: "bg-emerald-400/15 text-emerald-300",
  Current: "bg-accent/15 text-accent",
  "In Progress": "bg-amber-400/15 text-amber-300",
  Archived: "bg-text-tertiary/15 text-text-tertiary",
};

function ProjectLinkButton({
  href,
  label,
  icon: Icon,
}: {
  href?: string;
  label: string;
  icon: typeof Github;
}) {
  if (!href) {
    return (
      <button
        type="button"
        disabled
        title="Coming soon"
        aria-label={`${label} — coming soon`}
        className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-glass-border/[0.12] px-3 py-2 text-xs text-text-tertiary/60"
      >
        <Icon size={14} strokeWidth={1.75} />
        Coming Soon
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} — opens in a new tab`}
      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-glass-border/[0.14] px-3 py-2 text-xs text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
    >
      <Icon size={14} strokeWidth={1.75} />
      {label}
    </a>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const [from, to] = project.gradient;

  return (
    <motion.div variants={hoverLift} initial="rest" whileHover="hover" whileTap="tap" animate="rest">
      <GlassPanel variant="card" className="group flex h-full flex-col overflow-hidden">
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-bg-primary/20 transition-opacity duration-500 group-hover:opacity-0" />
          <span className="absolute bottom-4 left-5 font-mono text-xs tracking-[0.15em] text-white/85">
            {project.category}
          </span>
          <span
            className={`absolute right-4 top-4 rounded-pill px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-xl font-semibold tracking-tight text-text-primary">
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed text-text-secondary">{project.shortDescription}</p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-pill border border-glass-border/[0.14] px-2.5 py-1 font-mono text-[11px] text-text-tertiary"
              >
                {tech}
              </span>
            ))}
            <span className="ml-auto font-mono text-xs text-text-tertiary">{project.year}</span>
          </div>

          <div className="mt-auto flex gap-2 pt-4">
            <ProjectLinkButton href={project.githubUrl} label="GitHub" icon={Github} />
            <ProjectLinkButton href={project.liveUrl} label="Live Demo" icon={ExternalLink} />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
