import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./scenes/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#02030a",
        mist: "#91b4ff",
        aurora: "#76d7ff",
        ember: "#ff9966",
        gold: "#ffdd88"
      },
      boxShadow: {
        glow: "0 0 80px rgba(118, 215, 255, 0.25)"
      },
      backgroundImage: {
        "space-grid":
          "radial-gradient(circle at center, rgba(118,215,255,0.08) 0, rgba(118,215,255,0.02) 20%, transparent 60%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
