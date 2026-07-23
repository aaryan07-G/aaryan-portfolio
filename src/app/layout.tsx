import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";
import { fontSans, fontMono } from "@/lib/fonts";
import { ThemeProvider, themeInitScript } from "@/lib/theme/theme-provider";
import { IntroReveal } from "@/components/layout/IntroReveal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";
import { seo } from "@/data/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: `%s — ${personal.fullName}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: personal.fullName, url: seo.siteUrl }],
  creator: personal.fullName,
  alternates: {
    canonical: seo.canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: seo.siteUrl,
    title: seo.ogTitle,
    description: seo.ogDescription,
    siteName: personal.fullName,
    images: [{ url: seo.ogImage }],
  },
  twitter: {
    card: seo.twitterCard,
    title: seo.ogTitle,
    description: seo.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060608" },
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.fullName,
  jobTitle: personal.title,
  description: personal.aboutDescription,
  url: seo.siteUrl,
  image: `${seo.siteUrl}${personal.profileImage}`,
  sameAs: socialLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Runs before hydration to set the correct theme class and avoid a flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* MotionConfig with reducedMotion="user" makes every Framer Motion
            animation in the app automatically respect the OS-level
            prefers-reduced-motion setting — transforms are skipped in favor
            of opacity-only transitions, with zero per-component work. */}
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <CursorSpotlight />
            <IntroReveal>
              <Navbar />
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
              <Footer />
            </IntroReveal>
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
