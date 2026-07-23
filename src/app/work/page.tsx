import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { sortedProjects } from "@/data/projects";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected projects by ${personal.fullName}.`,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work — ${personal.fullName}`,
    description: `Selected projects by ${personal.fullName}.`,
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="pt-32">
      <ProjectsSection
        projects={sortedProjects}
        showFilters
        eyebrow="All work"
        heading="Every project, filtered your way."
      />
    </div>
  );
}
