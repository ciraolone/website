module.exports = {
  plugins: [
    require('postcss-import'),
    require('@csstools/postcss-sass')({
      silenceDeprecations: ['legacy-js-api']
    }),
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};
