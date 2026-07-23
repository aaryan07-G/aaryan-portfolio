import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
      },
    },
    extend: {
      colors: {
        bg: {
          primary: "rgb(var(--bg-primary) / <alpha-value>)",
          secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--text-tertiary) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
        glass: {
          fill: "rgb(var(--glass-fill) / <alpha-value>)",
          border: "rgb(var(--glass-border) / <alpha-value>)",
          highlight: "rgb(var(--glass-highlight) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.65" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.375rem", { lineHeight: "1.5" }],
        "2xl": ["1.75rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        "3xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "4xl": ["2.875rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "5xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "6xl": ["4.75rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "7xl": ["6rem", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        pill: "999px",
      },
      backdropBlur: {
        xs: "6px",
        glass: "20px",
        "glass-lg": "32px",
      },
      boxShadow: {
        glass: "0 8px 32px -8px rgb(0 0 0 / 0.35), inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
        "glass-lg": "0 24px 64px -16px rgb(0 0 0 / 0.45), inset 0 1px 0 0 rgb(255 255 255 / 0.08)",
        "glow-accent": "0 0 60px -12px rgb(var(--accent) / 0.45)",
      },
      backgroundImage: {
        "glass-edge":
          "linear-gradient(180deg, rgb(255 255 255 / 0.14) 0%, rgb(255 255 255 / 0) 40%)",
        "aurora-a":
          "radial-gradient(circle at 30% 20%, rgb(var(--accent) / 0.35), transparent 60%)",
        "aurora-b":
          "radial-gradient(circle at 70% 60%, rgb(var(--accent-soft) / 0.28), transparent 55%)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 26s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        content: "80rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
