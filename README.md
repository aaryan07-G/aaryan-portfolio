# Portfolio — Foundation (Phase 0–1)

Apple-inspired "Liquid Glass" personal portfolio. Next.js App Router + TypeScript + Tailwind CSS + Framer Motion + Lucide React.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's included in this phase

- Full project scaffold, TypeScript config, Tailwind design tokens
- Theme system (light/dark/system) with no-flash SSR handling
- Font loading (`next/font`, zero layout shift)
- Glass material primitive (`GlassPanel`) and `Button`, `ThemeToggle`
- Floating glass `Navbar` (scroll-aware, active-route indicator, mobile sheet)
- `HeroSection` with ambient animated background
- `LoadingScreen` + `IntroReveal` (first-paint intro, also used as the route-level Suspense fallback)
- Glass `Footer`
- Shared animation system: `lib/motion/variants.ts`, `lib/motion/transitions.ts`
- Scroll/motion hooks: `useScrollDirection`, `usePrefersReducedMotion`

## Before you personalize

Edit `src/data/site-config.ts` — this is the single source of truth for your
name, role, tagline, social links, and nav items. Every component reads from
it; nothing is hardcoded per-component.

## Conventions

- **Primitives** (`components/ui`) never know about page content.
- **Sections** (`components/sections`) own their own data shape and animation variants.
- All colors are CSS variables (`src/app/globals.css`) consumed via Tailwind's `rgb(var(--x) / <alpha-value>)` pattern — never hardcode a hex value in a component.
- All motion durations/springs come from `lib/motion` — don't inline new spring configs in components.
- `prefers-reduced-motion` is handled globally (CSS) and locally (`usePrefersReducedMotion`) — any new animated component should respect it.

## Next phases

See the project PRD for the full roadmap: Phase 2 (Featured Work, Capabilities,
About teaser, CTA sections), Phase 3 (`/work` index + case study template),
Phase 4 (`/about`, `/contact`), Phase 5 (accessibility/performance/SEO pass).
