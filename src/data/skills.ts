import {
  Code2,
  Coffee,
  Database,
  Braces,
  Code,
  PaintBucket,
  Server,
  FlaskConical,
  GitBranch,
  Github,
  Cpu,
  Layers,
  BookOpen,
} from "lucide-react";
import type { SkillGroup } from "@/types";

/**
 * Proficiency scaled consistently from yearsOfExperience:
 *   1 year  → 35–45%
 *   2 years → 55–70%
 *   3 years → 75–85%
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    description: "Core languages behind all my projects.",
    skills: [
      { name: "Python", icon: Code2, color: "#3776AB", proficiency: 72, yearsOfExperience: 2 },
      { name: "Java", icon: Coffee, color: "#EA2D2E", proficiency: 62, yearsOfExperience: 2 },
      { name: "SQL", icon: Database, color: "#4479A1", proficiency: 60, yearsOfExperience: 2 },
      { name: "JavaScript", icon: Braces, color: "#F0DB4F", proficiency: 65, yearsOfExperience: 2 },
    ],
  },
  {
    category: "Frontend",
    description: "Building interfaces that are responsive and clean.",
    skills: [
      { name: "HTML5", icon: Code, color: "#E34F26", proficiency: 82, yearsOfExperience: 3 },
      { name: "CSS3", icon: PaintBucket, color: "#1572B6", proficiency: 78, yearsOfExperience: 3 },
      { name: "JavaScript", icon: Braces, color: "#F0DB4F", proficiency: 65, yearsOfExperience: 2 },
      { name: "Flask (Templating)", icon: FlaskConical, color: "#7CDBFF", proficiency: 58, yearsOfExperience: 2 },
    ],
  },
  {
    category: "Backend",
    description: "Server-side logic and API development.",
    skills: [
      { name: "Flask", icon: FlaskConical, color: "#7CDBFF", proficiency: 62, yearsOfExperience: 2 },
      { name: "Node.js", icon: Server, color: "#6CC24A", proficiency: 42, yearsOfExperience: 1 },
    ],
  },
  {
    category: "Database",
    description: "Designing and managing data layers.",
    skills: [
      { name: "MongoDB", icon: Database, color: "#47A248", proficiency: 65, yearsOfExperience: 2 },
      { name: "SQL / MySQL", icon: Database, color: "#4479A1", proficiency: 60, yearsOfExperience: 2 },
    ],
  },
  {
    category: "CS Fundamentals",
    description: "The foundation that makes everything else work.",
    skills: [
      { name: "Data Structures & Algorithms", icon: Cpu, color: "#4F8CFF", proficiency: 60, yearsOfExperience: 2 },
      { name: "OOP", icon: Layers, color: "#7CDBFF", proficiency: 65, yearsOfExperience: 2 },
      { name: "DBMS", icon: BookOpen, color: "#4479A1", proficiency: 60, yearsOfExperience: 2 },
    ],
  },
  {
    category: "Tools",
    description: "The everyday toolkit that keeps projects moving.",
    skills: [
      { name: "Git", icon: GitBranch, color: "#F05033", proficiency: 62, yearsOfExperience: 2 },
      { name: "GitHub", icon: Github, color: "#C9C9C9", proficiency: 62, yearsOfExperience: 2 },
      { name: "VS Code", icon: Code2, color: "#007ACC", proficiency: 80, yearsOfExperience: 3 },
    ],
  },
];
