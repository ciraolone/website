/**
 * Eleventy Configuration
 * Best practices: configurazione modulare e organizzata
 */

const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  // ============================================
  // MARKDOWN CONFIGURATION
  // ============================================
  // Configura markdown-it con il plugin per attributi (classi CSS)
  // Usa delimitatori diversi da { } per evitare conflitti con Nunjucks
  // Permette di usare sintassi come {: .class-name} o {: #id .class1 .class2}
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs, {
    leftDelimiter: '{:',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class', 'src', 'alt', 'title', 'width', 'height']
  });
  
  eleventyConfig.setLibrary("md", markdownLibrary);
  // ============================================
  // PASSTHROUGH COPIES
  // ============================================
  // Copia file statici (immagini, font, etc.) senza processarli
  // Nota: il CSS viene compilato direttamente in _site/assets/css/ tramite npm run build:css
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/videos");
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "/" });
  
  // ============================================
  // WATCH TARGETS
  // ============================================
  // File da monitorare durante lo sviluppo (per hot reload automatico)
  // Nota: il CSS viene compilato direttamente in _site/assets/css/ tramite npm run watch:css
  eleventyConfig.addWatchTarget("src/assets/css/main.css");
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

  // Shortcode per card riutilizzabile
  eleventyConfig.addShortcode("card", function(image, imageAlt, title, description, buttonText, buttonUrl, cardUrl, className, imageClassName) {
    const hasCardUrl = cardUrl && cardUrl !== "";
    const hasButton = buttonText && buttonUrl && !hasCardUrl;
    const wrapperTag = hasCardUrl ? "a" : "div";
    const wrapperClass = hasCardUrl 
      ? `group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 no-underline block ${className || ""}`
      : `bg-white rounded-2xl overflow-hidden shadow-md ${className || ""}`;
    const hrefAttr = hasCardUrl ? `href="${cardUrl}"` : "";
    
    let html = `<${wrapperTag} ${hrefAttr} class="${wrapperClass.trim()}">`;
    
    if (image && image !== "") {
      const altText = imageAlt || title || "Immagine card";
      html += `<div class="w-full h-48 overflow-hidden bg-gray-200">`;
      html += `<img src="${image}" alt="${altText}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${imageClassName || ""}" loading="lazy">`;
      html += `</div>`;
    }
    
    html += `<div class="p-6">`;
    
    if (title && title !== "") {
      const titleClass = hasCardUrl ? "text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors" : "text-xl font-bold text-gray-900 mb-2";
      html += `<h3 class="${titleClass}">${title}</h3>`;
    }
    
    if (description && description !== "") {
      html += `<p class="text-gray-600 text-sm leading-relaxed">${description}</p>`;
    }
    
    if (hasButton) {
      html += `<div class="mt-4">`;
      html += `<a href="${buttonUrl}" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">${buttonText}</a>`;
      html += `</div>`;
    }
    
    html += `</div>`;
    html += `</${wrapperTag}>`;
    
    return html;
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

