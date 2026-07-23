import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationTimelineSection } from "@/components/sections/EducationTimelineSection";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "About",
  description: `More about ${personal.fullName} — background, skills, and experience.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${personal.fullName}`,
    description: `More about ${personal.fullName} — background, skills, and experience.`,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-32">
      <AboutSection />
      <SkillsSection />
      <EducationTimelineSection />
    </div>
  );
}
