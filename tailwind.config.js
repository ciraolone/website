/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,md,njk,js}",
    "./src/_includes/**/*.{html,md,njk}",
    "./_site/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
