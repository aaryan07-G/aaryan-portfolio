import type { PersonalInfo } from "@/types";

/**
 * Single source of truth for identity content.
 *
 * To update your portfolio:
 * 1. Edit the fields below.
 * 2. Replace /public/profile/profile.jpg with your real photo.
 * 3. Replace /public/resume/resume.pdf with your real résumé.
 * No component code needs to change for any of the above.
 */
export const personal: PersonalInfo = {
  fullName: "Aaryan Gurav",
  displayName: "Aaryan Gurav",
  brandName: "Aaryannn",
  title: "Aspiring Software Developer | Full Stack Web Developer | AI & Data Science Student",
  shortBio:
    "Passionate B.Tech student specializing in Artificial Intelligence & Data Science with a strong foundation in software development, object-oriented programming, and data structures & algorithms.",
  aboutDescription:
    "I am currently pursuing a Bachelor of Technology in Artificial Intelligence & Data Science at Parul University, Vadodara (Expected 2028). I have hands-on experience developing full-stack web applications using Python, Java, Flask, MongoDB, SQL, HTML, CSS, and JavaScript. I am enthusiastic about building scalable software solutions, solving complex problems, and continuously learning modern technologies — and I am actively seeking internship and entry-level software engineering opportunities.",
  careerObjective:
    "To become a highly skilled Software Engineer by building innovative, user-focused applications using Full Stack Development and Artificial Intelligence.",
  location: "Vadodara, Gujarat, India",
  email: "aaaryanxdrive@gmail.com",
  phone: "+91 9404051028",
  availability: {
    isAvailable: true,
    label: "Open to internship & entry-level opportunities",
  },
  availableFor: [
    "Internship Opportunities",
    "Freelance Projects",
    "Entry-Level Software Engineering Roles",
  ],
  responseTime: "Usually within 24 hours",
  resumeUrl: "/resume/resume.pdf",
  profileImage: "/profile/profile.jpg",
  hero: {
    greeting: "Hello, I'm",
    heading: "Aaryan Gurav",
    subtitle: "Building scalable software with Full Stack Development & Artificial Intelligence.",
    rotatingTitles: [
      "Full Stack Web Developer",
      "AI & Data Science Student",
      "Aspiring Software Engineer",
    ],
  },
};

/** Normalized phone number safe for tel: links (no spaces/dashes). */
export const phoneHref = `tel:${personal.phone.replace(/[\s-]/g, "")}`;
