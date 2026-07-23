import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationTimelineSection } from "@/components/sections/EducationTimelineSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { sortedProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <EducationTimelineSection />
      <ProjectsSection
        projects={sortedProjects}
        showFilters
        eyebrow="Selected work"
        heading="A few things I've shipped recently."
      />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
