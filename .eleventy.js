/**
 * Eleventy Configuration
 * Best practices: configurazione modulare e organizzata
 */

module.exports = function(eleventyConfig) {
  // ============================================
  // PASSTHROUGH COPIES
  // ============================================
  // Copia file statici (immagini, font, etc.) senza processarli
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "/" });
  
  // ============================================
  // WATCH TARGETS
  // ============================================
  // File da monitorare durante lo sviluppo (per hot reload automatico)
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/assets/images/");
  
  // ============================================
  // SERVER CONFIGURATION (Browsersync)
  // ============================================
  // Configurazione del server di sviluppo
  eleventyConfig.setServerOptions({
    // Mostra tutti gli host disponibili
    showAllHosts: true,
    // Porta di default (può essere sovrascritta con --port)
    port: 8080,
    // Abilita il reload automatico quando i file cambiano
    domDiff: true,
    // Abilita il live reload (ricarica automatica della pagina)
    liveReload: true,
    // Mostra notifiche nel browser quando i file cambiano
    notify: false,
    // Apri automaticamente il browser
    open: false
  });

  // ============================================
  // FILTERS
  // ============================================
  // Filtro per formattare date
  eleventyConfig.addFilter("dateFormat", function(date, format) {
    const d = new Date(date);
    if (format === "year") {
      return d.getFullYear();
    }
    if (format === "iso") {
      return d.toISOString();
    }
    return d.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Filtro per limitare testo
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Filtro per ordinare array
  eleventyConfig.addFilter("sortByDate", function(array) {
    return array.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  // ============================================
  // SHORTCODES
  // ============================================
  // Shortcode per immagini responsive
  eleventyConfig.addShortcode("image", function(src, alt, className = "") {
    return `<img src="${src}" alt="${alt}" class="${className}" loading="lazy">`;
  });

  // Shortcode per link esterni
  eleventyConfig.addShortcode("externalLink", function(url, text) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  // ============================================
  // COLLECTIONS
  // ============================================
  // Collection per pagine (escludendo quelle con draft: true)
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/**/*.md").filter(item => {
      return !item.data.draft;
    });
  });

  // ============================================
  // TRANSFORMS
  // ============================================
  // Minifica HTML in produzione (esempio base)
  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        // Qui potresti aggiungere una libreria di minificazione
        return content;
      }
      return content;
    });
  }

  // ============================================
  // CONFIGURAZIONE
  // ============================================
  return {
    // Directory di input
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
      output: "_site"
    },
    // Template engines supportati
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // Permalink prettier
    pathPrefix: "/"
  };
};

