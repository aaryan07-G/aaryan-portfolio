import type { ExperienceEntry } from "@/types";

/**
 * Currently project-based experience — will be updated with formal employment
 * or internship roles as they're obtained.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "role-freelance-dev",
    company: "Independent / Academic Projects",
    role: "Full Stack Web Developer",
    description:
      "Designing and building full-stack web applications independently — including a hotel booking site, a personal finance tracker, and a gym management system — while studying AI & Data Science at Parul University.",
    duration: "2024 — Present",
    technologies: ["Python", "Flask", "MongoDB", "JavaScript", "HTML", "CSS"],
    current: true,
  },
];
