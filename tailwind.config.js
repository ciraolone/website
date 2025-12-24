/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,md,njk,js}",
    "./src/_includes/**/*.{html,md,njk}",
  ],
  theme: {
    extend: {
      // Estendi il tema con le tue variabili personalizzate se necessario
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
  plugins: [],
}
