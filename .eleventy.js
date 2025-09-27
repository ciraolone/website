module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });

  return {
    dir: {
      input: "pages",
      output: "site",
      includes: "../src/includes",
      layouts: "../src/layouts",
      data: "../src/data"
    }
  };
};