import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        // CSS variable mappings
        background: "var(--background)",
        foreground: "var(--foreground)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-magenta": "var(--accent-magenta)",
        "accent-purple": "var(--accent-purple)",
        "accent-green": "var(--accent-green)",
        "dark-bg-1": "var(--dark-bg-1)",
        "dark-bg-2": "var(--dark-bg-2)",
        "dark-text-1": "var(--dark-text-1)",
        "dark-text-2": "var(--dark-text-2)",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        
        // Theme variables
        dark: {
          background: "#000000",
          foreground: "#FFFFFF",
          card: "#0A0A0A",
          "card-foreground": "#FFFFFF",
          primary: "#FFFFFF",
          "primary-foreground": "#000000",
          secondary: "#1A1A1A",
          "secondary-foreground": "#FFFFFF",
          accent: "#00FFFF",
          "accent-foreground": "#000000",
        },
        light: {
          background: "#FFFFFF",
          foreground: "#000000",
          card: "#F5F5F5",
          "card-foreground": "#000000",
          primary: "#000000",
          "primary-foreground": "#FFFFFF",
          secondary: "#E5E5E5",
          "secondary-foreground": "#000000",
          accent: "#6600FF",
          "accent-foreground": "#FFFFFF",
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch-overlay": "glitch 1s linear infinite",
        "glow": "glow 2s infinite",
        "border-glow": "borderGlow 4s ease infinite",
        "shine": "shine 3s linear infinite",
        "scroll-pulse": "scroll-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(2px, -2px)" },
          "50%": { transform: "translate(-2px, 2px)" },
          "75%": { transform: "translate(2px, 2px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)" },
          "100%": { boxShadow: "0 0 5px rgba(0, 255, 255, 0.3)" },
        },
        borderGlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shine: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "scroll-pulse": {
          "0%": { transform: "translateY(0)", opacity: "0.8" },
          "50%": { transform: "translateY(5px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
