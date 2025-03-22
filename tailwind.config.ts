import type { Config } from "tailwindcss";
import daisyui from "daisyui";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "80px",
    },
    extend: {
      colors: {
        background: "#2E4057",
        title: "#333333",
        button: "#28AFB0",
        oceanBlue: "#2CB7BE",
      },
      fontFamily: {
        bricolage: ["var(--font-bricolage)"],
        montserrat: ["var(--font-montserrat)"],
        poppins: "var(--font-poppins)",
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
