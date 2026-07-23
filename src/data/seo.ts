import type { SeoConfig } from "@/types";

const siteUrl = "https://yourdomain.com";

export const seo: SeoConfig = {
  title: "Aaryan Gurav | Full Stack Web Developer & AI & Data Science Student",
  description:
    "Portfolio of Aaryan Gurav — Aspiring Software Developer, Full Stack Web Developer, and AI & Data Science student at Parul University, Vadodara. Open to internship and entry-level opportunities.",
  keywords: [
    "Aaryan Gurav",
    "Full Stack Web Developer",
    "AI & Data Science",
    "Software Engineer",
    "Parul University",
    "Portfolio",
    "Web Developer Vadodara",
    "Python Developer",
    "Flask Developer",
  ],
  siteUrl,
  ogTitle: "Aaryan Gurav | Full Stack Web Developer & AI & Data Science Student",
  ogDescription:
    "Portfolio of Aaryan Gurav — Aspiring Software Developer, Full Stack Web Developer, and AI & Data Science student at Parul University, Vadodara.",
  ogImage: "/profile/profile.jpg",
  twitterCard: "summary_large_image",
  canonicalUrl: siteUrl,
};
