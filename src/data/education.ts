import type { EducationEntry } from "@/types";

/** Ordered most-recent first. */
export const education: EducationEntry[] = [
  {
    id: "edu-parul-btech",
    institution: "Parul University, Vadodara",
    degree: "B.Tech – Artificial Intelligence & Data Science",
    startDate: "2024",
    endDate: "2028 (Expected)",
    description:
      "Core coursework spanning AI, data science, software engineering, data structures & algorithms, object-oriented programming, and database management systems.",
  },
  {
    id: "edu-hsc",
    institution: "Higher Secondary School",
    degree: "HSC (Higher Secondary Certificate)",
    startDate: "2022",
    endDate: "2024",
    description: "Completed Higher Secondary Certificate examination.",
  },
  {
    id: "edu-ssc",
    institution: "Secondary School",
    degree: "SSC (Secondary School Certificate)",
    startDate: "2020",
    endDate: "2022",
    description: "Completed Secondary School Certificate examination.",
  },
];
