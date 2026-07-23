/**
 * Smoothly scrolls to a section on the current page by id. Accounts for the
 * fixed floating navbar height so the section isn't tucked underneath it.
 * Falls back silently if the target doesn't exist on the current page.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  const NAV_OFFSET = 96;
  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
