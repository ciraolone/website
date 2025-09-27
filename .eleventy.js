const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/css/');
  eleventyConfig.addPassthroughCopy({ 'src/js': 'assets/js' });

  // Image optimization shortcode
  eleventyConfig.addAsyncShortcode('optimizedImage', async function(src, alt, sizes = '100vw', className = '') {
    const metadata = await Image(src, {
      widths: [320, 640, 960, 1200],
      formats: ['avif', 'webp', 'jpeg'],
      outputDir: './site/assets/img/',
      urlPath: '/assets/img/'
    });

    const imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async',
      class: className
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    dir: {
      input: 'pages',
      output: 'site',
      includes: '../src/includes',
      layouts: '../src/layouts',
      data: '../src/data',
    },
  };
};
