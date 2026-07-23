"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/composed/Avatar";
import { SectionLink } from "@/components/composed/SectionLink";
import { personal } from "@/data/personal";
import { navigation, navigationSectionIds } from "@/data/navigation";
import { socialLinks } from "@/data/social";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { sheetIn, staggerContainer, fadeUp } from "@/lib/motion/variants";
import { springSoft } from "@/lib/motion/transitions";

export function Navbar() {
  const { direction, isScrolled } = useScrollDirection();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(navigationSectionIds);

  // Escape closes the mobile sheet, and scrolling is locked while it's open
  // so the page behind it doesn't drift under a fixed glass overlay.
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  // Close automatically on route change (e.g. a link inside was clicked).
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-5"
        initial={false}
        animate={{ y: direction === "down" && isScrolled && !isMenuOpen ? -96 : 0 }}
        transition={springSoft}
      >
        <GlassPanel
          as="nav"
          variant="nav"
          elevated={isScrolled}
          className="flex w-full max-w-3xl items-center justify-between gap-2 px-2 py-2 sm:px-3"
          aria-label="Primary"
        >
          <Link
            href="/"
            aria-label={`${personal.displayName} — home`}
            className="group ml-1 flex shrink-0 items-center gap-2"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-pill ring-1 ring-glass-border/[0.14] transition-opacity group-hover:opacity-80">
              <Avatar fill sizes="40px" className="object-cover text-sm" priority />
            </span>
            <span className="hidden font-mono text-sm tracking-wide text-text-primary transition-opacity group-hover:opacity-70 sm:inline">
              {personal.brandName}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive = isHome && activeSection === item.href;
              return (
                <li key={item.href} className="relative">
                  <SectionLink
                    sectionId={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative z-10 block rounded-pill px-4 py-2 text-sm transition-colors",
                      isActive
                        ? "text-bg-primary"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {item.label}
                  </SectionLink>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-pill bg-text-primary"
                      transition={springSoft}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 lg:flex">
              {socialLinks
                .filter((link) => link.platform === "github" || link.platform === "linkedin")
                .map((link) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-pill text-text-secondary transition-colors hover:bg-glass-fill/[0.08] hover:text-text-primary"
                  >
                    <link.icon size={16} strokeWidth={1.75} />
                  </a>
                ))}
            </div>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-pill border border-glass-border/[0.14] bg-glass-fill/[0.06] px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-glass-fill/[0.09]"
              aria-label={`Send email to ${personal.email}`}
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="glass-surface flex h-10 w-10 items-center justify-center rounded-pill text-text-primary md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </GlassPanel>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-x-4 top-24 z-40 md:hidden"
            variants={sheetIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <GlassPanel variant="modal" elevated className="p-3">
              <motion.ul
                variants={staggerContainer()}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                {navigation.map((item) => (
                  <motion.li key={item.href} variants={fadeUp}>
                    <SectionLink
                      sectionId={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isHome && activeSection === item.href ? "page" : undefined}
                      className="block rounded-lg px-4 py-3 text-base text-text-primary transition-colors hover:bg-glass-fill/[0.08]"
                    >
                      {item.label}
                    </SectionLink>
                  </motion.li>
                ))}
                <motion.li variants={fadeUp}>
                  <a
                    href={`mailto:${personal.email}`}
                    className="block rounded-lg px-4 py-3 text-base text-accent transition-colors hover:bg-glass-fill/[0.08]"
                  >
                    Let&apos;s talk
                  </a>
                </motion.li>
                <motion.li variants={fadeUp} className="mt-1 flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-text-tertiary">Theme</span>
                  <ThemeToggle />
                </motion.li>
                <motion.li variants={fadeUp} className="flex items-center gap-2 px-4 py-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      aria-label={link.label}
                      className="glass-surface flex h-9 w-9 items-center justify-center rounded-pill text-text-secondary transition-colors hover:text-text-primary"
                    >
                      <link.icon size={15} strokeWidth={1.75} />
                    </a>
                  ))}
                </motion.li>
              </motion.ul>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
