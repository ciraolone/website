/**
 * Eleventy Configuration
 * Best practices: configurazione modulare e organizzata
 */

const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItStrikethrough = require("markdown-it-strikethrough-alt");
const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfig) {
  // ============================================
  // MARKDOWN CONFIGURATION
  // ============================================
  // Configura markdown-it con plugin:
  // - markdownItAttrs: attributi CSS (usa {:} per evitare conflitti con Nunjucks)
  // - markdownItStrikethrough: barrato con ~~testo~~
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs, {
    leftDelimiter: '{:',
    rightDelimiter: '}',
    allowedAttributes: ['id', 'class', 'src', 'alt', 'title', 'width', 'height']
  }).use(markdownItStrikethrough);
  
  eleventyConfig.setLibrary("md", markdownLibrary);
  // ============================================
  // PASSTHROUGH COPIES
  // ============================================
  // Copia file statici (font, js, video, etc.) senza processarli
  // Nota: il CSS viene compilato direttamente in _site/assets/css/ tramite npm run build:css
  //
  // IMMAGINI: Le immagini vengono generate da eleventy-img direttamente in _site/assets/images/
  // Manteniamo passthrough solo per file che NON devono essere ottimizzati (SVG, placeholders)
  eleventyConfig.addPassthroughCopy("src/assets/images/*.svg");
  eleventyConfig.addPassthroughCopy("src/assets/images/placeholders");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/videos");
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon": "/" });

  // Cloudflare Pages: file _redirects per gestire i redirect lato server
  // Documentazione: https://developers.cloudflare.com/pages/configuration/redirects/
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  
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
  // Filtro per renderizzare markdown inline (es. **grassetto**, *corsivo*)
  // Usa renderInline per evitare wrapper <p> indesiderati nei componenti
  eleventyConfig.addFilter('md', function(content) {
    if (!content) { return ''; }
    return markdownLibrary.renderInline(content);
  });

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
  // IMMAGINI RESPONSIVE (eleventy-img)
  // ============================================
  // PERCHÉ: Le immagini PNG originali sono troppo pesanti (fino a 2.5MB).
  // Questo filter genera versioni ottimizzate AVIF/WebP/JPEG con srcset.
  //
  // COME FUNZIONA:
  // - statsSync() permette uso sincrono nelle macro Nunjucks
  // - Image() avvia generazione in background, statsSync() legge i metadati
  // - La cache interna evita rigenerazioni inutili
  //
  // COMPORTAMENTO:
  // - URL esterni (http/https): restituisce <img> semplice (salta ottimizzazione)
  // - Immagini piccole (sizes ≤ 64px): genera solo 1 versione (no srcset)
  // - Immagini normali: genera <picture> con srcset completo
  //
  // ATTENZIONE se modifichi:
  // - Cambiare widths richiede rebuild completo (rm -rf _site/assets/images/*.avif *.webp)
  // - L'hash nel nome file permette cache immutable (1 anno)

  const imageConfig = {
    // Formati output: AVIF (più piccolo), WebP (compatibile), JPEG (fallback)
    // Ordine importante: browser sceglie il primo supportato
    formats: ["avif", "webp", "jpeg"],

    // Larghezze generate: 320, 640, 960 + originale
    widths: [320, 640, 960, "auto"],

    // Directory output (dentro _site)
    outputDir: "./_site/assets/images/",
    urlPath: "/assets/images/",

    // Qualità per formato
    sharpAvifOptions: { quality: 50 },  // AVIF 50 ≈ JPEG 80 percepito
    sharpWebpOptions: { quality: 80 },
    sharpJpegOptions: { quality: 80 },

    // Nome file con hash per cache busting (permette max-age=31536000, immutable)
    filenameFormat: function(id, src, width, format) {
      const name = path.basename(src, path.extname(src));
      return `${name}-${width}w-${id}.${format}`;
    }
    // NOTA: La cache per immagini locali funziona automaticamente:
    // se l'immagine sorgente non è cambiata e l'output esiste, salta l'elaborazione
  };

  // Filter per immagini responsive (usabile nelle macro Nunjucks)
  // Uso: {{ src | responsiveImg({ alt: "...", sizes: "100vw", className: "..." }) | safe }}
  eleventyConfig.addFilter("responsiveImg", function(src, options = {}) {
    const { alt = "", sizes = "100vw", className = "", loading = "lazy" } = options;

    // Salta URL esterni: restituisce <img> semplice
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return `<img src="${src}" alt="${alt}" class="${className}" loading="${loading}">`;
    }

    // Risolvi percorso relativo (src può essere /assets/images/...)
    const imagePath = src.startsWith("/") ? `./src${src}` : src;

    // Calcola se è un'immagine piccola (sizes ≤ 64px)
    const sizesNum = parseInt(sizes, 10);
    const isSmall = !isNaN(sizesNum) && sizesNum <= 64;

    // Configurazione per questa immagine
    const opts = {
      ...imageConfig,
      // Per immagini piccole: solo 1 versione (no srcset)
      widths: isSmall ? ["auto"] : imageConfig.widths
    };

    // Avvia generazione (asincrona in background, non blocca)
    Image(imagePath, opts);

    // Ottieni metadati sincronamente
    const metadata = Image.statsSync(imagePath, opts);

    // Attributi per l'elemento img
    const imageAttributes = {
      alt,
      sizes: isSmall ? undefined : sizes,  // No sizes per immagini piccole
      loading,
      decoding: "async",
      class: className || undefined
    };

    // Genera HTML <picture> con srcset
    return Image.generateHTML(metadata, imageAttributes);
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

