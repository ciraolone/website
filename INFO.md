# Documentazione Progetto Eleventy + Tailwind CSS

Sito web realizzato con Eleventy e Tailwind CSS, deployato su Cloudflare pages.

## 📚 Risorse Principali

- **[Eleventy](https://www.11ty.dev/docs/)** - Static Site Generator
- **[Tailwind CSS v4](https://tailwindcss.com/docs/)** - Framework CSS utility-first
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Template Engine
- **[Web.dev Best Practices](https://web.dev/)** - Performance e SEO
- **[Tabler Icons](https://tabler.io/icons)** - Set di icone SVG

## Emoji

Usare `<span class="df-emoji" aria-hidden="true">🎯</span>` per emoji decorative, oppure `role="img" aria-label="descrizione"` per quelle con significato. Classi disponibili: `df-emoji-inline` (spazio a destra), `df-emoji-sm/lg/xl/2xl` (dimensioni), `df-emoji-wave/pulse` (animazioni). Stili in `main.css` sezione EMOJI SYSTEM.

## Icone (Tabler)

Nei template Nunjucks: `{% icon "tabler:home" %}` oppure `{% icon "tabler:arrow-right", class="df-icon-lg" %}`. Classi disponibili: `df-icon-inline` (spazio a destra), `df-icon-xs/sm/md/lg/xl/2xl` (dimensioni), `df-icon-thin/light/bold` (spessore linea), `df-icon-spin/pulse` (animazioni). Configurazione in `.eleventy.js`, stili in `main.css` sezione ICON SYSTEM.
