import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forage: {
          green: "#4a7c5f",
          "green-light": "#edf4ef",
          "green-dark": "#2d5a3d",
          brown: "#7a6248",
          "brown-light": "#f5efe8",
          red: "#8a3a2a",
          "red-light": "#fdf0ed",
          border: "#e8e4de",
          muted: "#9a9690",
          bg: "#f7f5f2",
          ink: "#2a2520",
          wetland: "#557278",
          grassland: "#6a4878",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Source Sans 3", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
