# Documentazione Progetto Eleventy + Tailwind CSS

Sito web realizzato con Eleventy e Tailwind CSS, deployato su Cloudflare pages.

## 📚 Risorse Principali

- **[Eleventy](https://www.11ty.dev/docs/)** - Static Site Generator
- **[Tailwind CSS v4](https://tailwindcss.com/docs/)** - Framework CSS utility-first
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Template Engine
- **[eleventy-img](https://www.11ty.dev/docs/plugins/image/)** - Ottimizzazione immagini
- **[Web.dev Best Practices](https://web.dev/)** - Performance e SEO

## 🖼️ Gestione Immagini

Il sito usa `@11ty/eleventy-img` per ottimizzare automaticamente le immagini durante il build.

### Uso nei template

```nunjucks
{# Uso base #}
{% image "src/assets/images/foto.jpg", "Descrizione immagine" %}

{# Con classe CSS #}
{% image "src/assets/images/foto.jpg", "Descrizione", "my-class" %}

{# Con larghezze personalizzate #}
{% image "src/assets/images/foto.jpg", "Descrizione", "", [400, 800] %}
```
