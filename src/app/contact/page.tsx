import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${personal.fullName}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${personal.fullName}`,
    description: `Get in touch with ${personal.fullName}.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-32">
      <ContactSection />
    </div>
  );
}
