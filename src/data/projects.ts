import type { Project } from "@/types";

/**
 * Projects listed on the resume, plus the live Cafe Website and this Portfolio.
 * - `image` → drop a real screenshot at the same path and it updates automatically.
 * - `displayOrder` controls render order (lower first).
 * - `featured: true` → appears on the home page preview.
 */
export const projects: Project[] = [
  {
    slug: "hotel-management-website",
    title: "Hotel Management Website",
    shortDescription:
      "A responsive hotel website with booking-related features, clean UI, and performance-optimised layouts.",
    description:
      "Designed and developed a responsive hotel website with booking-related features and user-friendly navigation. Focused on clean UI, responsive layouts, and performance optimisation.",
    techStack: ["HTML", "CSS", "JavaScript"],
    image: "/projects/project1.png",
    category: "Business Website",
    features: [
      "Booking-related UI and navigation",
      "Responsive, mobile-first layout",
      "Performance-optimised assets",
    ],
    challenges: [
      "Keeping image-heavy pages fast on slower mobile connections",
      "Clean responsive grid without a CSS framework",
    ],
    status: "In Progress",
    year: "2024",
    displayOrder: 1,
    featured: true,
    gradient: ["#C9945A", "#5A3D24"],
  },
  {
    slug: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    shortDescription:
      "A finance management app for tracking income, expenses, and budgets with full CRUD and database integration.",
    description:
      "Built a finance management application for tracking income, expenses, and budgets. Implemented CRUD functionality and database integration with MongoDB. Designed an intuitive interface for efficient financial management.",
    techStack: ["Python", "Flask", "MongoDB", "HTML", "CSS", "JavaScript"],
    image: "/projects/project2.png",
    category: "Web Application",
    features: [
      "Income and expense tracking with budget categories",
      "Full CRUD via Flask REST endpoints",
      "Persistent storage with MongoDB",
    ],
    challenges: [
      "Flexible data model for varied spending categories",
      "Charts that stay readable as data grows",
    ],
    status: "Completed",
    year: "2024",
    displayOrder: 2,
    featured: true,
    gradient: ["#3ECF8E", "#1F8F5C"],
  },
  {
    slug: "gym-management-system",
    title: "Gym Management System",
    shortDescription:
      "A web-based system for managing memberships, attendance, and subscription plans with an admin dashboard.",
    description:
      "Developed a web-based management system for handling memberships, attendance, and subscription plans. Designed an admin dashboard with database connectivity. Improved data organisation and operational efficiency.",
    techStack: ["Flask", "MongoDB", "HTML", "CSS", "JavaScript"],
    image: "/projects/project3.png",
    category: "Management System",
    features: [
      "Membership and subscription plan management",
      "Attendance tracking with database connectivity",
      "Admin dashboard for operational oversight",
    ],
    challenges: [
      "Modelling recurring memberships and renewal cycles",
      "Interface simple enough for non-technical gym staff",
    ],
    status: "In Progress",
    year: "2025",
    displayOrder: 3,
    featured: true,
    gradient: ["#4F8CFF", "#1E3A8A"],
  },
  {
    slug: "cafe-website",
    title: "Cafe Website",
    shortDescription:
      "A responsive café website with a menu showcase and warm, inviting visual design.",
    description:
      "A responsive website for a café, focused on presenting the menu and atmosphere clearly with a warm visual identity and smooth, subtle animation throughout.",
    techStack: ["React", "Tailwind CSS"],
    liveUrl: "https://coffee-cafe-dusky.vercel.app/",
    image: "/projects/project5.png",
    category: "Business Website",
    features: [
      "Menu showcase with categorised items",
      "Warm, brand-consistent visual design",
      "Smooth scroll and hover animations",
    ],
    challenges: [
      "Balancing rich imagery with fast load times",
      "Menu layout that scales as items are added",
    ],
    status: "Live",
    year: "2024",
    displayOrder: 4,
    featured: false,
    gradient: ["#8B5E34", "#D97757"],
  },
  {
    slug: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    shortDescription:
      "This site — a premium Liquid Glass portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    description:
      "My personal portfolio, built with a fully data-driven architecture: Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion, with a custom Apple-inspired Liquid Glass design system.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/projects/project4.png",
    category: "Portfolio",
    features: [
      "Custom Liquid Glass design system",
      "Fully data-driven content architecture",
      "Accessible, responsive, and performance-optimised",
    ],
    challenges: [
      "Glass material system readable in both light and dark themes",
      "Animation-heavy pages that stay fast and accessible",
    ],
    status: "Current",
    year: "2025",
    displayOrder: 5,
    featured: false,
    gradient: ["#4F8CFF", "#7CDBFF"],
  },
];

export const featuredProjects = [...projects]
  .filter((p) => p.featured)
  .sort((a, b) => a.displayOrder - b.displayOrder);

export const sortedProjects = [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
