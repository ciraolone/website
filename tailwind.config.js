/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,md,njk,js}",
  ],
  // Safelist per classi generate dinamicamente (es. cardGrid.njk)
  safelist: [
    { pattern: /^grid-cols-[1-6]$/ },
    { pattern: /^md:grid-cols-[1-6]$/ },
    { pattern: /^lg:grid-cols-[1-6]$/ },
    { pattern: /^gap-[2-8]$/ },
  ],
  // Nota: In Tailwind 4, la configurazione del tema si fa principalmente tramite CSS con @theme
  // I plugin si dichiarano nel CSS con @plugin (vedi src/assets/css/main.css)
  plugins: [],
};
