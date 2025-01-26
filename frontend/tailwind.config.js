/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind processes all necessary files
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border) / <alpha-value>)", // Custom border color using CSS variables
      },
      borderColor: {
        border: "rgb(var(--border) / <alpha-value>)", // Ensure border colors can use this variable
      },
      backgroundColor: {
        background: "rgb(var(--background) / <alpha-value>)", // Background using CSS variable
      },
      textColor: {
        foreground: "rgb(var(--foreground) / <alpha-value>)", // Text color using CSS variable
      },
    },
  },
  plugins: [],
};
