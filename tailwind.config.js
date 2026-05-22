/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,css}"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: "var(--bg-global)",
          surface: "var(--bg-surface)",
          hover: "var(--bg-surface-hover)",
          border: "var(--border-color)",
          text: "var(--text-main)",
          muted: "var(--text-muted)",
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
        },
      },
    },
  },
  plugins: [],
};
