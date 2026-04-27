import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4ECDD",
        "cream-deep": "#EFE4D0",
        burnt: "#B5471B",
        "burnt-deep": "#8E3210",
        "burnt-soft": "#C75A22",
        gold: "#C9A24A",
        ink: "#1A140C",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        hero: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
