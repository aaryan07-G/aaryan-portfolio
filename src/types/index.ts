import type { LucideIcon } from "lucide-react";

/* ===================================================================
   NAVIGATION
   =================================================================== */

export interface NavItem {
  label: string;
  href: string;
}

/* ===================================================================
   PERSONAL
   =================================================================== */

export interface PersonalInfo {
  fullName: string;
  displayName: string;
  /** Short stylized handle — used as a subtle wordmark next to the nav avatar. */
  brandName: string;
  title: string;
  shortBio: string;
  aboutDescription: string;
  careerObjective: string;
  location: string;
  email: string;
  phone: string;
  availability: {
    isAvailable: boolean;
    label: string;
  };
  /** Shown in the contact section as a checklist. */
  availableFor: string[];
  /** e.g. "Usually within 24 hours" — shown in the contact section. */
  responseTime: string;
  /** Public path — e.g. "/resume/resume.pdf". Replace the file to update everywhere. */
  resumeUrl: string;
  /** Public path — e.g. "/profile/profile.jpg". Replace the file to update everywhere. */
  profileImage: string;
  hero: {
    greeting: string;
    heading: string;
    subtitle: string;
    /** Rotated in the hero for a bit of movement — kept short, 2-4 words each. */
    rotatingTitles: string[];
  };
}

/* ===================================================================
   SOCIAL
   =================================================================== */

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "email"
  | "phone"
  | "whatsapp"
  | "portfolio";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  icon: LucideIcon;
}

/* ===================================================================
   SKILLS
   =================================================================== */

export type SkillCategory = "Programming" | "Frontend" | "Backend" | "Database" | "AI" | "Tools";

export interface Skill {
  name: string;
  icon: LucideIcon;
  /** CSS color (hex) used for the skill's icon tint / progress bar. */
  color: string;
  /** 0-100 */
  proficiency: number;
  yearsOfExperience: number;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: Skill[];
}

/* ===================================================================
   PROJECTS
   =================================================================== */

export type ProjectStatus = "Live" | "In Progress" | "Completed" | "Archived" | "Current";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Public path — e.g. "/projects/project1.png". */
  image: string;
  category: string;
  features: string[];
  challenges: string[];
  status: ProjectStatus;
  year: string;
  /** Lower renders first. */
  displayOrder: number;
  featured: boolean;
  /** Two hex colors — fallback tint while `image` loads, and used for the category chip. */
  gradient: [string, string];
}

/* ===================================================================
   SERVICES
   =================================================================== */

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  startingPrice: string;
  features: string[];
}

/* ===================================================================
   EDUCATION & EXPERIENCE
   =================================================================== */

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  description: string;
  duration: string;
  technologies: string[];
  current?: boolean;
}

/** Shared shape the timeline UI renders — EducationTimelineSection maps
 *  ExperienceEntry[] and EducationEntry[] into this without either data
 *  file needing to know about the other. */
export type TimelineEntryType = "work" | "education";

export interface TimelineEntry {
  id: string;
  type: TimelineEntryType;
  title: string;
  organization: string;
  period: string;
  description: string;
  current?: boolean;
}

/* ===================================================================
   TESTIMONIALS
   =================================================================== */

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  /** Public path or external URL. */
  photo: string;
  review: string;
  /** 1-5 */
  rating: number;
}

/* ===================================================================
   STATS
   =================================================================== */

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

/* ===================================================================
   SEO
   =================================================================== */

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: "summary" | "summary_large_image";
  canonicalUrl: string;
}
