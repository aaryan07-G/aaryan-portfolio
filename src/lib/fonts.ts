import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Inter carries both display and body duty, the way SF Pro does on Apple's
 * own pages — the personality comes from weight, tracking and scale rather
 * than mixing families. Variable weight range keeps hero display text and
 * body copy on a single optical system.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * Utility face for the "spec sheet" details — dates, tags, coordinates,
 * nav indices — anywhere content should read as data rather than prose.
 */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});
