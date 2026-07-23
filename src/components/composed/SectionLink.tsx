"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

interface SectionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Section id on the home page, e.g. "contact" (no leading #). */
  sectionId: string;
  children: React.ReactNode;
}

/**
 * Used by the Navbar and Footer for links that point at a section on the
 * home page (About, Skills, Projects, Services, Contact). On the home page
 * it smooth-scrolls directly; from any other page it navigates to the home
 * page first, then scrolls once there.
 */
export function SectionLink({ sectionId, children, onClick, ...props }: SectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (isHome) {
      event.preventDefault();
      scrollToSection(sectionId);
    } else {
      event.preventDefault();
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <Link href={`/#${sectionId}`} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
