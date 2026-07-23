import type { NavItem } from "@/types";

/**
 * The Navbar and Footer "Quick Links" render directly from this array.
 * `href` values are section ids on the home page — SectionLink handles
 * smooth-scrolling to them (or navigating home first from another page).
 * Add, remove, or reorder entries here, no component edits needed.
 */
export const navigation: NavItem[] = [
  { label: "Home", href: "top" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "work" },
  { label: "Services", href: "services" },
  { label: "Contact", href: "contact" },
];

/** Stable array reference for scroll-spy hooks — avoids recreating on every render. */
export const navigationSectionIds: string[] = navigation.map((item) => item.href);
