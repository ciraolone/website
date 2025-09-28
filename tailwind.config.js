/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{html,md,njk}', './src/**/*.{html,njk,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
