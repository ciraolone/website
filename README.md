# Sito Web Eleventy

Sito web statico generato con [Eleventy](https://www.11ty.dev/) seguendo le best practices per un codice ordinato e manutenibile.

## 🚀 Inizio Rapido

### Prerequisiti

- Node.js (versione 14 o superiore)
- npm o yarn

### Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run serve

# Oppure
npm run dev
```

Il sito sarà disponibile su tutti gli indirizzi di rete del server (localhost e IP locali) sulla porta 8080.

**Nota**: Il server di sviluppo supporta il reload automatico. Ogni modifica ai file verrà automaticamente riflessa nel browser.

### Build per Produzione

```bash
# Genera il sito statico
npm run build
```

I file generati saranno nella cartella `_site/`.

## 📁 Struttura del Progetto

```
.
├── src/                    # Directory sorgente
│   ├── _data/             # Data files (JSON, JS)
│   │   └── site.json      # Configurazione globale del sito
│   ├── _includes/         # Template e layouts
│   │   └── layouts/       # Layout templates
│   ├── assets/            # File statici
│   │   ├── css/           # Fogli di stile
│   │   ├── js/            # Script JavaScript
│   │   ├── images/        # Immagini
│   │   └── fonts/         # Font personalizzati
│   ├── index.njk          # Homepage
│   └── [altre pagine]/    # Altre pagine del sito
├── _site/                 # Output generato (non committare)
├── .eleventy.js           # Configurazione Eleventy
├── package.json           # Dipendenze e script
└── README.md              # Questo file
```

## 📝 Aggiungere Nuove Pagine

Crea un nuovo file nella directory `src/` con il front matter:

```markdown
---
layout: layouts/base.njk
title: Il Mio Titolo
description: Descrizione della pagina
---

# Contenuto della pagina
```

## 🎨 Personalizzazione

- **Configurazione globale**: Modifica `src/_data/site.json`
- **Stili**: Modifica `src/assets/css/main.css`
- **Layout**: Modifica `src/_includes/layouts/base.njk`
- **Configurazione Eleventy**: Modifica `.eleventy.js`

## 📚 Documentazione

Per maggiori dettagli sulle best practices implementate, consulta il file [INFO.md](./INFO.md).

## 📄 Licenza

MIT

