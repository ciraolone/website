# Documentazione Progetto Eleventy + Tailwind CSS

Questo documento descrive l'architettura, le configurazioni e le best practices implementate nel progetto.

---

## 📚 Risorse Principali

- **[Eleventy](https://www.11ty.dev/docs/)** - Static Site Generator
- **[Tailwind CSS v4](https://tailwindcss.com/docs/)** - Framework CSS utility-first
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Template Engine
- **[Web.dev Best Practices](https://web.dev/)** - Performance e SEO

---

## 🎨 Tailwind CSS v4: Migrazione e Configurazione

### ⚠️ IMPORTANTE: CSS vs SCSS

**Situazione attuale:**
- Il progetto è stato aggiornato da **Tailwind v3 a v4**
- La configurazione attuale usa **CSS nativo** (`main.css`) invece di SCSS
- SCSS è ancora installato (`sass@^1.97.1`) ma **non viene utilizzato**

**Tailwind v4 raccomanda CSS nativo perché:**

1. **Approccio CSS-first**: Tailwind v4 è stato riprogettato per sfruttare le moderne funzionalità CSS native
2. **Direttiva `@theme`**: La configurazione del tema avviene direttamente in CSS
3. **Performance migliori**: Variabili CSS native sono più performanti del preprocessing SCSS
4. **Meno dipendenze**: Non serve più il preprocessing SCSS per Tailwind

**Puoi tornare a SCSS se:**
- Hai bisogno di funzionalità SCSS specifiche (mixins, funzioni, nesting complesso)
- Preferisci l'organizzazione modulare con `@import` di file SCSS separati
- Hai già un sistema SCSS consolidato nel progetto

### 📦 Configurazione Attuale Tailwind v4

#### 1. **File CSS principale** (`src/assets/css/main.css`)

```css
/* Importa Tailwind CSS v4 */
@import "tailwindcss";

/* Plugin Typography per formattazione articoli */
@plugin "@tailwindcss/typography";

/* Configurazione tema con direttiva @theme (novità v4) */
@theme {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
}
```

**Novità rispetto a v3:**
- `@import "tailwindcss"` sostituisce le tre direttive `@tailwind base/components/utilities`
- `@theme` sostituisce la configurazione JavaScript in `tailwind.config.js`
- Le variabili CSS vengono generate automaticamente e sono accessibili ovunque

#### 2. **PostCSS Config** (`postcss.config.js`)

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // Plugin v4 (era 'tailwindcss' in v3)
    autoprefixer: {},
  },
}
```

**Cambio importante:**
- In v4 il plugin PostCSS è `@tailwindcss/postcss` (non più `tailwindcss`)
- Autoprefixer gestisce automaticamente i vendor prefixes
- Non serve più `postcss-import`

#### 3. **Tailwind Config** (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,md,njk,js}",
    "./src/_includes/**/*.{html,md,njk}",
    "./_site/**/*.html",
  ],
  plugins: [require("@tailwindcss/typography")],
};
```

**Nota:** In v4 la configurazione del tema si fa principalmente in CSS con `@theme`, questo file serve solo per `content` paths e plugin.

#### 4. **Build Scripts** (`package.json`)

```json
{
  "scripts": {
    "build:css": "mkdir -p _site/assets/css && postcss src/assets/css/main.css -o _site/assets/css/main.css",
    "watch:css": "nodemon",
    "dev": "concurrently \"npm run watch:css\" \"eleventy --serve\""
  }
}
```

**Flow di compilazione:**
1. PostCSS legge `main.css`
2. `@tailwindcss/postcss` processa le direttive Tailwind
3. Autoprefixer aggiunge vendor prefixes
4. Output finale in `_site/assets/css/main.css`

### 🔄 Differenze principali v3 → v4

| Feature | Tailwind v3 | Tailwind v4 |
|---------|-------------|-------------|
| **Config** | `tailwind.config.js` (JavaScript) | `@theme` in CSS + config.js minimal |
| **Import** | `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss";` |
| **PostCSS Plugin** | `tailwindcss` | `@tailwindcss/postcss` |
| **Tema** | Oggetto JavaScript | Variabili CSS con `@theme` |
| **Custom Utilities** | `@layer utilities { ... }` | `@utility nome { ... }` |
| **Variabili** | `theme('colors.red.500')` | `var(--color-red-500)` |

### 💡 Vantaggi di Tailwind v4

- ✅ **CSS-first**: Sfrutta le moderne funzionalità CSS native
- ✅ **Performance**: Variabili CSS native invece di interpolazione JavaScript
- ✅ **Semplicità**: Meno configurazione, più convenzioni
- ✅ **Type-safe**: Autocomplete migliore con variabili CSS
- ✅ **Dev Experience**: Hot reload più veloce

### 🤔 Quando considerare SCSS

**Restare con CSS nativo se:**
- Usi principalmente utility classes di Tailwind
- Non hai bisogno di mixins o funzioni SCSS complesse
- Vuoi massima compatibilità con Tailwind v4

**Tornare a SCSS se:**
- Hai bisogno di `@mixin`, `@function`, `@extend` di SCSS
- Vuoi organizzare CSS in file modulari con `@use` / `@forward`
- Hai logica CSS complessa (loop, condizioni)
- Preferisci nesting SCSS invece di quello CSS nativo

---

## 🏗️ Struttura del Progetto

```
website/
├── src/
│   ├── _data/              # Dati globali (site.json)
│   ├── _includes/          # Template riutilizzabili
│   │   ├── components/     # Componenti Nunjucks
│   │   └── layouts/        # Layout base
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css    # ⚡ CSS principale con Tailwind v4
│   │   ├── js/
│   │   ├── images/
│   │   └── videos/
│   └── index.md            # Homepage e altre pagine
├── _site/                  # Output (generato, gitignored)
├── .eleventy.js           # Configurazione Eleventy
├── tailwind.config.js     # Config Tailwind (minimal in v4)
├── postcss.config.js      # Config PostCSS
└── package.json           # Dipendenze e scripts
```

---

## ⚙️ Configurazione Eleventy

### 📝 File `.eleventy.js`

Configurazione modulare con sezioni ben commentate:

#### 1. **Passthrough Copy**
Copia file statici senza processarli:
```js
eleventyConfig.addPassthroughCopy("src/assets/images");
eleventyConfig.addPassthroughCopy("src/assets/js");
eleventyConfig.addPassthroughCopy("src/assets/videos");
eleventyConfig.addPassthroughCopy("src/assets/fonts");
```

#### 2. **Watch Targets**
Hot reload per file CSS/JS durante lo sviluppo:
```js
eleventyConfig.addWatchTarget("src/assets/css/main.css");
eleventyConfig.addWatchTarget("_site/assets/css/main.css");
eleventyConfig.addWatchTarget("src/assets/js/");
```

#### 3. **Markdown Configuration**
Supporto per attributi CSS inline in Markdown:
```js
const markdownItAttrs = require("markdown-it-attrs");

let markdownIt = require("markdown-it")({
  html: true,
  breaks: false,
  linkify: true,
});
markdownIt.use(markdownItAttrs);

eleventyConfig.setLibrary("md", markdownIt);
```

**Esempio utilizzo:**
```markdown
# Titolo {.text-4xl .font-bold .text-blue-600}
Paragrafo con classi Tailwind {.prose .prose-lg}
```

#### 4. **Filters Personalizzati**

- **`dateFormat`**: Formattazione date in italiano
  ```njk
  {{ post.date | dateFormat }}
  ```

- **`limit`**: Limita numero elementi array
  ```njk
  {% for item in items | limit(5) %}
  ```

- **`sortByDate`**: Ordina collezioni per data
  ```njk
  {% for post in posts | sortByDate %}
  ```

#### 5. **Shortcodes**

##### **`image`** - Immagini ottimizzate
```njk
{% image "path/to/image.jpg", "Descrizione", "class-css" %}
```
Genera:
```html
<img src="path/to/image.jpg" alt="Descrizione" class="class-css" loading="lazy">
```

##### **`externalLink`** - Link esterni sicuri
```njk
{% externalLink "https://example.com", "Testo link" %}
```
Genera:
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Testo link</a>
```

##### **`card`** - Card riutilizzabili (NUOVO)
```njk
{% card
  "/images/photo.jpg",        // image
  "Alt text",                  // imageAlt
  "Titolo Card",              // title
  "Descrizione della card",   // description
  "Leggi di più",             // buttonText (opzionale)
  "/link-button",             // buttonUrl (opzionale)
  "/link-card",               // cardUrl (se tutta la card è cliccabile)
  "custom-class",             // className (opzionale)
  "custom-image-class"        // imageClassName (opzionale)
%}
```

**Features card:**
- ✅ Supporta card cliccabili (wrap con `<a>`) o statiche (wrap con `<div>`)
- ✅ Immagine responsive con hover effect (scale 110%)
- ✅ Bottone opzionale (se non è card cliccabile)
- ✅ Classi CSS personalizzabili
- ✅ Lazy loading automatico per immagini

#### 6. **Collections**

```js
eleventyConfig.addCollection("pages", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    return !item.data.draft;
  });
});
```

Filtra automaticamente pagine con `draft: true` nel front matter.

---

## 🎨 Template System

### Layout Base (`base.njk`)

```njk
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} | {{ site.title }}</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <main>
    {{ content | safe }}
  </main>
</body>
</html>
```

### Uso nei contenuti

```markdown
---
layout: layouts/base.njk
title: "Pagina di esempio"
description: "Descrizione per SEO"
---

# Contenuto della pagina

Questo è un paragrafo.
```

---

## 🚀 Performance

### ✅ Best Practices Implementate

1. **Lazy Loading Immagini**
   - Attributo `loading="lazy"` automatico nello shortcode `image`
   - Riduce il tempo di caricamento iniziale

2. **CSS Ottimizzato**
   - Tailwind genera solo le classi utilizzate (PurgeCSS integrato)
   - PostCSS con autoprefixer per compatibilità browser

3. **Hot Reload Efficiente**
   - Watch targets configurati solo per file che cambiano
   - Ricompilazione CSS separata da Eleventy

4. **Minificazione HTML** (preparato)
   - Attivabile con `ELEVENTY_ENV=production`
   - Struttura pronta per transform di minificazione

---

## 🔒 Sicurezza

### Link Esterni Sicuri

Shortcode `externalLink` include automaticamente:
- `target="_blank"` - Apre in nuova tab
- `rel="noopener noreferrer"` - Previene attacchi tabnabbing

### Environment Variables

- File `.env` gitignored per segreti
- Supporto `ELEVENTY_ENV` per configurazioni dev/prod

---

## 📊 SEO

### Meta Tags

Ogni pagina include nel front matter:
```yaml
---
title: "Titolo pagina"
description: "Descrizione per motori di ricerca"
---
```

### HTML Semantico

Struttura con elementi semantici:
```html
<header>
<nav>
<main>
<article>
<section>
<footer>
```

### URL Puliti

Struttura directory genera URL puliti automaticamente:
```
src/about.md → /about/
src/projects/index.md → /projects/
```

---

## 🛠️ Comandi Disponibili

```bash
# Sviluppo (watch mode con hot reload)
npm run dev

# Build produzione
npm run build

# Solo CSS
npm run build:css

# Watch CSS
npm run watch:css

# Pulisci output
npm run clean
```

---

## 🎯 Prossimi Passi / Roadmap

### Funzionalità da Considerare

1. **Image Optimization**
   - Plugin Eleventy per ottimizzazione automatica immagini
   - Generazione automatica di formati WebP/AVIF

2. **Sitemap & RSS**
   - Generazione automatica `sitemap.xml`
   - Feed RSS per blog (se implementato)

3. **Testing**
   - Test accessibilità (axe-core)
   - Test performance (Lighthouse CI)

4. **CI/CD**
   - GitHub Actions per build automatico
   - Deploy automatico (Netlify/Vercel)

5. **Component System**
   - Organizzare componenti riutilizzabili in `_includes/components/`
   - Documentazione componenti con Storybook-style

6. **Search**
   - Ricerca client-side con Pagefind o Lunr.js

---

## 📝 Naming Conventions

### File e Directory

- **Directory speciali**: Prefisso underscore (`_data`, `_includes`)
- **File**: lowercase-with-hyphens (`about-me.md`)
- **Template**: `.njk` extension
- **Variabili CSS**: `--color-*`, `--spacing-*`, `--font-*`

### Classi Tailwind

Preferire utility classes di Tailwind invece di CSS custom:
```html
<!-- ✅ Buono -->
<div class="bg-blue-600 text-white p-4 rounded-lg">

<!-- ❌ Da evitare se possibile -->
<div class="custom-blue-box">
```

---

## 🐛 Troubleshooting

### Il CSS non si aggiorna

1. Verifica che nodemon stia watchando il file corretto
2. Controlla che PostCSS compili senza errori
3. Fai hard refresh del browser (Ctrl+Shift+R)

### Classi Tailwind non funzionano

1. Verifica che i path in `tailwind.config.js` includano i tuoi file
2. Controlla che il CSS sia compilato correttamente
3. Assicurati di importare il CSS compilato nel layout

### Hot reload non funziona

1. Controlla i watch targets in `.eleventy.js`
2. Verifica che `concurrently` stia eseguendo entrambi i processi
3. Riavvia il server di sviluppo

---

## 📚 Risorse Utili

### Tailwind CSS v4
- [Documentazione Ufficiale](https://tailwindcss.com/docs/)
- [Upgrade Guide v3 → v4](https://tailwindcss.com/docs/upgrade-guide)
- [Typography Plugin](https://tailwindcss.com/docs/typography-plugin)

### Eleventy
- [Getting Started](https://www.11ty.dev/docs/getting-started/)
- [Filters](https://www.11ty.dev/docs/filters/)
- [Shortcodes](https://www.11ty.dev/docs/shortcodes/)
- [Collections](https://www.11ty.dev/docs/collections/)

### Markdown
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) - Attributi CSS in Markdown

---

## 🤝 Contribuire

Quando modifichi il progetto:

1. ✅ Documenta i cambiamenti importanti in questo file
2. ✅ Mantieni i commenti aggiornati in `.eleventy.js`
3. ✅ Testa in locale prima di committare
4. ✅ Usa commit messages descrittivi

---

**Ultimo aggiornamento:** 2025-12-31
**Versione Tailwind:** 4.1.18
**Versione Eleventy:** 2.0.1
