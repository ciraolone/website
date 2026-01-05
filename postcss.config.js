/**
 * PostCSS Configuration
 *
 * PRODUZIONE (ELEVENTY_ENV=production):
 * - cssnano rimuove commenti e minifica il CSS
 *
 * SVILUPPO:
 * - I commenti vengono preservati per debug più facile
 */
const isProduction = process.env.ELEVENTY_ENV === "production";

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    // cssnano: minifica CSS e rimuove commenti solo in produzione
    ...(isProduction && {
      cssnano: {
        preset: ["default", {
          discardComments: { removeAll: true }  // Rimuove tutti i commenti
        }]
      }
    })
  }
}
