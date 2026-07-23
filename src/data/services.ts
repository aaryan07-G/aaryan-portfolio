import { Layout, Briefcase, User, Smartphone, Plug, Database, Gauge } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications — frontend, backend, and database working together as one clean system.",
    icon: Layout,
    startingPrice: "Contact for pricing",
    features: ["React / Next.js frontend", "Node.js / Python backend", "Database design & integration"],
  },
  {
    title: "Business Websites",
    description:
      "Professional, conversion-focused websites for small businesses — fast, clean, and easy to update.",
    icon: Briefcase,
    startingPrice: "Contact for pricing",
    features: ["Custom design", "Contact & inquiry forms", "SEO-friendly structure"],
  },
  {
    title: "Portfolio Websites",
    description:
      "Personal portfolio sites that make a strong first impression for students, freelancers, and creatives.",
    icon: User,
    startingPrice: "Contact for pricing",
    features: ["Modern, premium UI", "Smooth animations", "Mobile-first design"],
  },
  {
    title: "Responsive UI Development",
    description:
      "Interfaces that look and work great on every screen size, from mobile to ultra-wide desktop.",
    icon: Smartphone,
    startingPrice: "Contact for pricing",
    features: ["Mobile-first layouts", "Cross-browser testing", "Accessible components"],
  },
  {
    title: "API Integration",
    description:
      "Connecting your application to third-party services and internal APIs, cleanly and reliably.",
    icon: Plug,
    startingPrice: "Contact for pricing",
    features: ["REST API integration", "Authentication flows", "Error handling & retries"],
  },
  {
    title: "Database Design",
    description:
      "Data models and schemas built to stay correct and fast as your application grows.",
    icon: Database,
    startingPrice: "Contact for pricing",
    features: ["Schema design", "Query optimization", "MongoDB, MySQL & Firebase"],
  },
  {
    title: "Website Optimization",
    description:
      "Speeding up existing sites — better load times, cleaner code, and improved Core Web Vitals.",
    icon: Gauge,
    startingPrice: "Contact for pricing",
    features: ["Performance audits", "Image & asset optimization", "SEO improvements"],
  },
];
