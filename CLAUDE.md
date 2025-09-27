# Website Project - Development Guide

## 🏗️ Architettura del Progetto

Questo è un sito web statico costruito con **Eleventy (11ty)** e **Tailwind CSS**.

### Stack Tecnologico

- **Static Site Generator**: Eleventy v3.1.2
- **CSS Framework**: Tailwind CSS v4.1.13
- **CSS Preprocessor**: SCSS con PostCSS
- **Build Tools**: npm-run-all, concurrently
- **Code Quality**: ESLint, Prettier

## 📁 Struttura Directory

```
.
├── pages/           # Content pages (gestite con Obsidian)
├── src/
│   ├── css/         # Stili SCSS e Tailwind
│   ├── layouts/     # Template Nunjucks
│   ├── includes/    # Componenti riutilizzabili
│   ├── data/        # File di dati globali
│   └── js/          # JavaScript personalizzato
├── site/            # Output di build (generato automaticamente)
└── node_modules/    # Dipendenze npm
```

**IMPORTANTE**: Le pagine in `pages/` sono gestite con Obsidian.
