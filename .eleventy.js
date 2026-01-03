/**
 * Eleventy Configuration
 * Best practices: configurazione modulare e organizzata
 */

const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItStrikethrough = require("markdown-it-strikethrough-alt");
const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");
const { getPlaiceholder } = require("plaiceholder");

// Cache per i placeholder LQIP (evita di rigenerarli ad ogni build)
const LQIP_CACHE_DIR = ".cache/lqip";
if (!fs.existsSync(LQIP_CACHE_DIR)) {
  fs.mkdirSync(LQIP_CACHE_DIR, { recursive: true });
}

/**
 * Genera un placeholder LQIP (Low Quality Image Placeholder) in modo sincrono.
 * Usa una cache su disco per evitare di rigenerare ad ogni build.
 * @param {string} srcPath - Percorso del file immagine sorgente
 * @returns {string} - Data URL base64 del placeholder
 */
function getLqipSync(srcPath) {
  // Genera un nome file cache basato sul path
  const cacheFileName = srcPath.replace(/[\/\\:]/g, "_") + ".txt";
  const cachePath = path.join(LQIP_CACHE_DIR, cacheFileName);

  // Se esiste in cache, leggi e ritorna
  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, "utf-8");
  }

  // Altrimenti genera il placeholder con sharp (sincrono)
  // Sharp non ha API sincrone native, usiamo execSync per eseguire node in modo bloccante
  let base64 = "";
  const { execSync } = require("child_process");

  // Scriviamo uno script temporaneo che genera il placeholder
  const tempScript = `
    const sharp = require("sharp");
    const fs = require("fs");
    sharp("${srcPath.replace(/\\/g, "\\\\")}")
      .resize(10, 10, { fit: "cover" })
      .blur(1)
      .toBuffer()
      .then(buffer => {
        const base64 = "data:image/jpeg;base64," + buffer.toString("base64");
        fs.writeFileSync("${cachePath.replace(/\\/g, "\\\\")}", base64);
        console.log(base64);
      });
  `;

  try {
    // Esegui node in modo sincrono per generare il placeholder
    base64 = execSync(`node -e '${tempScript.replace(/'/g, "\\'")}'`, {
      encoding: "utf-8",
      cwd: process.cwd()
    }).trim();
  } catch (e) {
    // Fallback: ritorna un placeholder grigio
    base64 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f3f4f6'/%3E%3C/svg%3E";
  }

  // Leggi dalla cache se è stato scritto
  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, "utf-8");
  }

  return base64;
}

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
  // Copia file statici (immagini, font, etc.) senza processarli
  // Nota: il CSS viene compilato direttamente in _site/assets/css/ tramite npm run build:css
  eleventyConfig.addPassthroughCopy("src/assets/images");
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
  // FILTRO SINCRONO PER IMMAGINI OTTIMIZZATE
  // ============================================
  // Filtro per generare HTML di immagini ottimizzate con LQIP (usabile nelle macro Nunjucks)
  // - Immagini locali (/assets/...): ottimizzate con LQIP blur-up
  // - Immagini esterne (http/https): passate direttamente senza ottimizzazione
  //
  // Uso: {{ "/assets/images/foto.jpg" | optimizedImage("alt text", "css-class") | safe }}
  eleventyConfig.addFilter("optimizedImage", function(src, alt = "", className = "") {
    // Immagini esterne: passa direttamente senza ottimizzazione
    // Quando le sposterai in locale, verranno automaticamente ottimizzate
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return `<img src="${src}" alt="${alt}" class="${className}" loading="lazy">`;
    }

    // Immagini locali: ottimizza con eleventy-img + LQIP
    const srcPath = src.startsWith("/") ? "src" + src : src;

    // Genera LQIP placeholder
    const lqipBase64 = getLqipSync(srcPath);

    const options = {
      widths: [400, 800, 1200, null],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./_site/assets/images/optimized/",
      urlPath: "/assets/images/optimized/",
      filenameFormat: function(id, src, width, format) {
        const name = src.split("/").pop().split(".")[0];
        return `${name}-${width}w.${format}`;
      }
    };

    Image(srcPath, options);
    const metadata = Image.statsSync(srcPath, options);

    const largestImage = metadata.jpeg[metadata.jpeg.length - 1];
    const smallestJpeg = metadata.jpeg[0];

    const avifSrcset = metadata.avif.map(img => `${img.url} ${img.width}w`).join(", ");
    const webpSrcset = metadata.webp.map(img => `${img.url} ${img.width}w`).join(", ");
    const jpegSrcset = metadata.jpeg.map(img => `${img.url} ${img.width}w`).join(", ");

    return `<div class="lqip-wrapper ${className}" style="position:relative;background-image:url(${lqipBase64});background-size:cover;background-position:center;">
      <picture>
        <source type="image/avif" srcset="${avifSrcset}" sizes="auto">
        <source type="image/webp" srcset="${webpSrcset}" sizes="auto">
        <img
          src="${smallestJpeg.url}"
          srcset="${jpegSrcset}"
          sizes="auto"
          alt="${alt}"
          width="${largestImage.width}"
          height="${largestImage.height}"
          loading="lazy"
          decoding="async"
          class="lqip-image"
        >
      </picture>
    </div>`;
  });

  // ============================================
  // SHORTCODES
  // ============================================
  // Shortcode per immagini ottimizzate con eleventy-img + LQIP (blur placeholder)
  // Genera automaticamente formati WebP/AVIF e dimensioni responsive
  // LQIP: mostra un placeholder sfocato mentre l'immagine vera carica
  // Uso nei template: {% image "src/assets/images/foto.jpg", "Descrizione immagine" %}
  // Con classe CSS: {% image "src/assets/images/foto.jpg", "Descrizione", "my-class" %}
  // Con larghezze custom: {% image "src/assets/images/foto.jpg", "Descrizione", "", [400, 800] %}
  eleventyConfig.addShortcode("image", async function(src, alt, className = "", widths = [400, 800, 1200]) {
    // Validazione: alt è obbligatorio per accessibilità
    if (!alt) {
      throw new Error(`Immagine ${src} richiede un attributo alt per l'accessibilità`);
    }

    // Genera LQIP (Low Quality Image Placeholder)
    // Legge l'immagine e crea un placeholder base64 sfocato (~1KB)
    const imageBuffer = fs.readFileSync(src);
    const { base64 } = await getPlaiceholder(imageBuffer, { size: 10 });

    const metadata = await Image(src, {
      // Larghezze generate (null = originale)
      widths: [...widths, null],
      // Formati: AVIF (più leggero), WebP (compatibile), JPEG (fallback)
      formats: ["avif", "webp", "jpeg"],
      // Output nella cartella _site/assets/images/optimized/
      outputDir: "./_site/assets/images/optimized/",
      // URL pubblico delle immagini
      urlPath: "/assets/images/optimized/",
      // Nome file: hash del contenuto per cache-busting automatico
      filenameFormat: function(id, src, width, format) {
        const name = src.split("/").pop().split(".")[0];
        return `${name}-${width}w.${format}`;
      },
      // Cache su disco: evita di ri-processare immagini già ottimizzate
      // La cartella .cache va aggiunta a .gitignore
      cacheOptions: {
        duration: "1y",
        directory: ".cache"
      }
    });

    // Prende le dimensioni dall'immagine più grande (l'originale) per calcolare l'aspect ratio
    // Questo permette al browser di riservare lo spazio corretto prima del caricamento (no CLS)
    const largestImage = metadata.jpeg[metadata.jpeg.length - 1];

    // Genera srcset per ogni formato
    const avifSrcset = metadata.avif.map(img => `${img.url} ${img.width}w`).join(", ");
    const webpSrcset = metadata.webp.map(img => `${img.url} ${img.width}w`).join(", ");
    const jpegSrcset = metadata.jpeg.map(img => `${img.url} ${img.width}w`).join(", ");
    const smallestJpeg = metadata.jpeg[0];

    // HTML con LQIP: container con sfondo blur + immagine sopra
    // L'immagine è sempre visibile, il blur si vede solo durante il caricamento
    return `<div class="lqip-wrapper ${className}" style="position:relative;background-image:url(${base64});background-size:cover;background-position:center;">
      <picture>
        <source type="image/avif" srcset="${avifSrcset}" sizes="auto">
        <source type="image/webp" srcset="${webpSrcset}" sizes="auto">
        <img
          src="${smallestJpeg.url}"
          srcset="${jpegSrcset}"
          sizes="auto"
          alt="${alt}"
          width="${largestImage.width}"
          height="${largestImage.height}"
          loading="lazy"
          decoding="async"
          class="lqip-image"
        >
      </picture>
    </div>`;
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

