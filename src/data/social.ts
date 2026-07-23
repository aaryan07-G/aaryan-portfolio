import { Github, Linkedin, Instagram, Mail, Phone, Globe } from "lucide-react";
import type { SocialLink } from "@/types";
import { personal, phoneHref } from "./personal";

/**
 * Raw URLs — the values you actually edit. Leave a field empty/undefined to
 * omit that channel everywhere it's rendered (nav, footer, contact).
 */
export const socialUrls = {
  github: "https://github.com/aaryan07-G",
  linkedin: "https://www.linkedin.com/in/aaaryan07/",
  instagram: "https://instagram.com/aaaryann_07",
  portfolio: "https://yourdomain.com",
};

/**
 * Render-ready list — every icon-linked social chip in the app (footer,
 * contact page, nav) maps over this array, so adding/removing a platform
 * here is the only edit needed to add/remove it everywhere.
 */
export const socialLinks: SocialLink[] = [
  { platform: "github", label: "GitHub", href: socialUrls.github, icon: Github },
  { platform: "linkedin", label: "LinkedIn", href: socialUrls.linkedin, icon: Linkedin },
  { platform: "instagram", label: "Instagram", href: socialUrls.instagram, icon: Instagram },
  { platform: "email", label: "Email", href: `mailto:${personal.email}`, icon: Mail },
  { platform: "phone", label: "Phone", href: phoneHref, icon: Phone },
  { platform: "portfolio", label: "Portfolio", href: socialUrls.portfolio, icon: Globe },
];
