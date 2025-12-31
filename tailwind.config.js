/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,md,njk,js}",
  ],
  // Nota: In Tailwind 4, la configurazione del tema si fa principalmente tramite CSS con @theme
  // I plugin si dichiarano nel CSS con @plugin (vedi src/assets/css/main.css)
  plugins: [],
};
