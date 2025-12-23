# Best Practices Implementate nel Progetto Eleventy

Questo documento descrive tutte le best practices implementate nel progetto per garantire un codice ordinato, manutenibile e performante.

## 📚 Risorse

- [Documentazione Eleventy](https://www.11ty.dev/docs/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)
- [Web.dev Best Practices](https://web.dev/)

---

## 1. Struttura del Progetto

### ✅ Separazione delle Responsabilità

**Best Practice**: Organizzare il progetto in directory logiche e separate.

**Implementazione**:
```
src/
├── _data/          # Dati globali e configurazione
├── _includes/      # Template riutilizzabili
│   └── layouts/    # Layout base
├── assets/         # File statici (CSS, JS, immagini)
└── [pagine]/       # Contenuti del sito
```

---

## 2. Configurazione

### ✅ Configurazione Modulare

**Best Practice**: Usare un file di configurazione `.eleventy.js` ben organizzato con commenti.

**Implementazione**:
- Configurazione separata per passthrough, watch, filters, shortcodes
- Uso di variabili d'ambiente per configurazioni diverse (dev/prod)
- Configurazione centralizzata in `src/_data/site.json`

### ✅ Data Files Centralizzati

**Best Practice**: Usare data files per configurazioni globali.

**Implementazione**:
- `src/_data/site.json` contiene metadati globali (titolo, descrizione, autore)
- Accessibile in tutti i template tramite `site.*`

---

## 3. Organizzazione dei Template

### ✅ Layout System

**Best Practice**: Usare un sistema di layout gerarchico e riutilizzabile.

**Implementazione**:
- Layout base (`base.njk`) con struttura HTML completa
- Front matter per specificare il layout in ogni pagina
- Template engine Nunjucks per massima flessibilità

### ✅ Template Engine Consistente

**Best Practice**: Usare lo stesso template engine per tutti i file.

**Implementazione**:
- Nunjucks (`.njk`) come engine principale
- Markdown per contenuti con layout Nunjucks
- Configurazione in `.eleventy.js`

---

## 4. Gestione dei Dati

### ✅ Filters Personalizzati

**Best Practice**: Creare filters riutilizzabili per trasformazioni comuni.

**Implementazione**:
- `dateFormat`: formattazione date in italiano
- `limit`: limitare array
- `sortByDate`: ordinare per data

### ✅ Shortcodes

**Best Practice**: Usare shortcodes per componenti riutilizzabili.

**Implementazione**:
- `image`: per immagini con attributi standard
- `externalLink`: per link esterni con sicurezza

### ✅ Collections

**Best Practice**: Organizzare contenuti in collections logiche.

**Implementazione**:
- Collection `pages` che filtra automaticamente pagine draft
- Possibilità di estendere con altre collections (blog, progetti, etc.)

---

## 5. File Statici

### ✅ Passthrough Copy

**Best Practice**: Copiare file statici senza processarli.

**Implementazione**:
- Configurazione esplicita in `.eleventy.js`
- Organizzazione in directory `assets/`
- Separazione per tipo (css, js, images, fonts)

### ✅ Watch Targets

**Best Practice**: Monitorare file che cambiano durante lo sviluppo.

**Implementazione**:
- Watch su CSS e JS per hot reload
- Migliora l'esperienza di sviluppo

---

## 6. Performance

### ✅ Lazy Loading

**Best Practice**: Caricare immagini in modo lazy.

**Implementazione**:
- Attributo `loading="lazy"` nello shortcode `image`
- Migliora il tempo di caricamento iniziale

### ✅ Preconnect

**Best Practice**: Preconnettere a domini esterni importanti.

**Implementazione**:
- `<link rel="preconnect">` per Google Fonts nel layout base

### ✅ Minificazione (Preparato)

**Best Practice**: Minificare HTML in produzione.

**Implementazione**:
- Struttura preparata per trasform HTML minification
- Attivabile con variabile d'ambiente `ELEVENTY_ENV=production`

---

## 7. Manutenibilità

### ✅ Commenti e Documentazione

**Best Practice**: Commentare il codice e documentare le decisioni.

**Implementazione**:
- Commenti nel `.eleventy.js` che spiegano ogni sezione
- README.md con istruzioni chiare
- Questo file INFO.md con spiegazioni dettagliate

### ✅ Naming Conventions

**Best Practice**: Usare nomi chiari e consistenti.

**Implementazione**:
- Directory con underscore per speciali (`_data`, `_includes`)
- Nomi file in lowercase con hyphens
- Variabili CSS con prefisso `--color-`, `--spacing-`

### ✅ Separazione CSS/JS

**Best Practice**: Organizzare CSS e JS in file modulari.

**Implementazione**:
- CSS con variabili CSS per temi
- Commenti che organizzano sezioni
- JavaScript con IIFE per evitare scope globale

---

## 8. Sicurezza

### ✅ Link Esterni Sicuri

**Best Practice**: Aggiungere attributi di sicurezza ai link esterni.

**Implementazione**:
- Shortcode `externalLink` con `rel="noopener noreferrer"`
- Previene attacchi di tipo tabnabbing

### ✅ Environment Variables

**Best Practice**: Usare variabili d'ambiente per configurazioni sensibili.

**Implementazione**:
- `.env.example` come template
- `.env` nel `.gitignore`
- Supporto per `ELEVENTY_ENV`

---

## 9. SEO

### ✅ Meta Tags

**Best Practice**: Includere meta tags essenziali per SEO.

**Implementazione**:
- Meta description in ogni pagina
- Meta author
- Title tag dinamico
- Language e locale corretti

### ✅ Semantic HTML

**Best Practice**: Usare elementi HTML semantici.

**Implementazione**:
- `<header>`, `<nav>`, `<main>`, `<footer>`
- Heading hierarchy corretta
- Struttura logica

### ✅ URL Puliti

**Best Practice**: Usare permalink puliti e descrittivi.

**Implementazione**:
- Struttura directory che genera URL puliti
- Nomi file descrittivi

---

## 10. Version Control

### ✅ .gitignore Completo

**Best Practice**: Ignorare file non necessari nel repository.

**Implementazione**:
- `node_modules/`
- `_site/` (output)
- `.env` (variabili d'ambiente)
- File OS e IDE

### ✅ File di Esempio

**Best Practice**: Fornire file di esempio per configurazioni.

**Implementazione**:
- `.env.example` (se necessario)
- README con esempi

---

## 🎯 Best Practices Aggiuntive Consigliate

### Per Progetti Più Grandi:

1. **PostCSS/Sass**: Per CSS più avanzato
2. **Webpack/Rollup**: Per bundling JavaScript
3. **Image Optimization**: Plugin per ottimizzare immagini
4. **Sitemap Generata**: Generare sitemap.xml automaticamente
5. **RSS Feed**: Generare feed RSS per blog
6. **Paginazione**: Per liste lunghe di contenuti
7. **Search**: Implementare ricerca client-side
8. **Testing**: Aggiungere test automatizzati
9. **CI/CD**: Automatizzare build e deploy
10. **Accessibility Audit**: Strumenti per verificare accessibilità

---



