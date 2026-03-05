import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7f0",
          100: "#dceede",
          200: "#b8ddb9",
          300: "#88c48b",
          400: "#5aa55e",
          500: "#3d8b41",
          600: "#2d6f31",
          700: "#255829",
          800: "#1f4723",
          900: "#1a3b1e",
          950: "#0d200f",
        },
        earth: {
          50: "#fdf8f0",
          100: "#f9edd8",
          200: "#f2d8af",
          300: "#e9bd7e",
          400: "#e0a050",
          500: "#d6872e",
          600: "#c06d23",
          700: "#9f5420",
          800: "#804421",
          900: "#693a1f",
          950: "#3a1c0e",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e3e9e3",
          200: "#c7d4c7",
          300: "#a1b5a1",
          400: "#789178",
          500: "#587558",
          600: "#445d44",
          700: "#384b38",
          800: "#2e3e2e",
          900: "#273427",
          950: "#131c13",
        },
        cream: "#faf8f5",
        ivory: "#fffef9",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
