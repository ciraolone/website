# 🧩 Guida Componenti Eleventy

Guida sintetica alle best practices per organizzare componenti in Eleventy + Nunjucks.

---

## 📁 Struttura Directory

```
src/_includes/
├── layouts/           # Layout di pagina (es. base.njk, post.njk)
├── components/        # Componenti riutilizzabili
│   ├── head.njk      # Meta tags e CSS
│   ├── navbar.njk    # Navigazione
│   ├── footer.njk    # Footer
│   ├── card.njk      # Card generica (con macro)
│   └── button.njk    # Button parametrico (con macro)
└── partials/          # Frammenti specifici (opzionale)
```

### ✅ Quando usare cosa

- **`layouts/`**: Struttura completa pagina (HTML wrapper)
- **`components/`**: Parti riutilizzabili (navbar, card, modali)
- **`partials/`**: Snippet specifici non riusabili (blocco hero homepage)

---

## 🔄 Include vs Macro

### Include - Per componenti statici

```njk
{# layouts/base.njk #}
{% include "components/navbar.njk" %}
```

**Quando usare:**

- Componente sempre identico (navbar, footer, head)
- Non servono parametri
- Accesso automatico a tutte le variabili del contesto

### Macro - Per componenti parametrici

```njk
{# components/button.njk #}
{% macro button(text, url, variant="primary") %}
  <a href="{{ url }}" class="btn btn-{{ variant }}">{{ text }}</a>
{% endmacro %}
```

```njk
{# Utilizzo #}
{% from "components/button.njk" import button %}
{{ button("Clicca qui", "/link", "secondary") }}
```

**Quando usare:**

- Componente configurabile (card, button, alert)
- Servono parametri/varianti
- Maggiore controllo e type-safety

---

## 🎯 Best Practices

### 1. **Single Responsibility**

Ogni componente fa una sola cosa:

```
✅ navbar.njk      → Solo navigazione
✅ footer.njk      → Solo footer
❌ header.njk      → Navbar + banner + breadcrumb (troppo!)
```

### 2. **Naming Conventions**

```
✅ navbar.njk         → Nome componente chiaro
✅ card.njk           → Generico, riutilizzabile
✅ hero-section.njk   → Specifico ma descrittivo
❌ comp1.njk          → Nome ambiguo
❌ navigation-bar-with-dropdown.njk  → Troppo verboso
```

### 3. **Parametri con Valori Default**

```njk
{% macro card(title, text, image="", buttonText="Scopri") %}
  {# image opzionale, buttonText con default #}
{% endmacro %}
```

### 4. **Classi CSS Configurabili**

```njk
{% macro button(text, url, className="") %}
  <a href="{{ url }}" class="btn {{ className }}">{{ text }}</a>
{% endmacro %}

{# Uso #}
{{ button("Click", "/link", "mt-4 shadow-lg") }}
```

### 5. **Documentazione nel File**

```njk
{#
  Card Component

  Parametri:
  - title (string, required): Titolo card
  - text (string, required): Descrizione
  - image (string, optional): Path immagine
  - url (string, optional): Link card

  Esempio:
  {{ card("Titolo", "Descrizione", "/img.jpg", "/link") }}
#}
{% macro card(title, text, image="", url="") %}
  ...
{% endmacro %}
```

---

## 📦 Esempi Pratici

### Layout Base Componentizzato

**`layouts/base.njk`:**

```njk
<!DOCTYPE html>
<html lang="{{ site.language }}">
{% include "components/head.njk" %}
<body class="flex flex-col min-h-screen">
  {% include "components/navbar.njk" %}

  <main class="flex-1">
    {{ content | safe }}
  </main>

  {% include "components/footer.njk" %}

  <script src="/assets/js/main.js"></script>
</body>
</html>
```

**Risultato:**

- ✅ Leggibile: Struttura chiara in 10 righe
- ✅ Manutenibile: Modifica navbar in un solo file
- ✅ Riutilizzabile: Componenti usabili in altri layout

### Componente Parametrico Avanzato

**`components/card.njk`:**

```njk
{% macro card(
  title,
  description,
  image="",
  url="",
  buttonText="Leggi",
  variant="default"
) %}
  <div class="card card-{{ variant }}">
    {% if image %}
      <img src="{{ image }}" alt="{{ title }}" loading="lazy">
    {% endif %}

    <h3>{{ title }}</h3>
    <p>{{ description }}</p>

    {% if url %}
      <a href="{{ url }}" class="btn">{{ buttonText }}</a>
    {% endif %}
  </div>
{% endmacro %}
```

**Utilizzo:**

```njk
{% from "components/card.njk" import card %}

{# Card semplice #}
{{ card("Titolo", "Testo") }}

{# Card completa #}
{{ card(
  "Progetto XYZ",
  "Descrizione progetto",
  "/images/project.jpg",
  "/progetti/xyz",
  "Scopri di più",
  "featured"
) }}
```

---

## 🚀 Workflow Consigliato

### Step 1: Identifica componenti ripetuti

Cerca pattern ripetuti in più pagine:

- Navbar/Footer → Sempre uguali
- Card progetti → Sempre stessa struttura
- Form contatti → Riutilizzabile

### Step 2: Estrai in componenti

```bash
src/_includes/components/
├── navbar.njk     # Include statico
├── footer.njk     # Include statico
└── card.njk       # Macro parametrico
```

### Step 3: Refactora layout

Sostituisci codice duplicato con `{% include %}` o macro.

### Step 4: Documenta

Aggiungi commenti con parametri e esempi.

---

## 🎨 Pattern Avanzati

### Conditional Include

```njk
{# Mostra banner solo se definito #}
{% if showBanner %}
  {% include "components/banner.njk" %}
{% endif %}
```

### Dynamic Include

```njk
{# Layout variabile basato su tipo contenuto #}
{% include "layouts/" + layoutType + ".njk" %}
```

### Nested Components

```njk
{# components/section.njk #}
<section class="{{ className }}">
  {% include "components/heading.njk" %}
  {{ caller() }}  {# Contenuto iniettato #}
</section>

{# Uso con caller #}
{% call section(className="hero") %}
  <p>Contenuto personalizzato</p>
{% endcall %}
```

---

## ⚠️ Errori Comuni

### ❌ Componenti troppo specifici

```njk
{# homepage-hero-section-with-video.njk #}
{# ☝️ Usabile solo in una pagina! #}
```

**✅ Meglio:** `hero.njk` configurabile con parametri.

### ❌ Troppe dipendenze implicite

```njk
{# card.njk che assume esistano variabili globali #}
<div class="{{ globalTheme }}">  {# ❌ #}
```

**✅ Meglio:** Passa tutto come parametro.

### ❌ Logica complessa nei componenti

```njk
{# navbar.njk #}
{% for page in collections.all %}
  {% if page.data.showInNav and not page.data.draft %}
    {# ❌ Troppa logica! #}
  {% endif %}
{% endfor %}
```

**✅ Meglio:** Logica in `.eleventy.js` (collection/filter), componente solo per rendering.

---

## 📊 Checklist Qualità Componente

Prima di committare, verifica:

- [ ] Nome chiaro e descrittivo
- [ ] Parametri documentati
- [ ] Valori default sensati
- [ ] Nessuna dipendenza da variabili globali nascoste
- [ ] Testato con/senza parametri opzionali
- [ ] Classi CSS personalizzabili se necessario
- [ ] Esempio d'uso nel file o in docs

---

## 🔗 Riferimenti

- **[Nunjucks Templating](https://mozilla.github.io/nunjucks/templating.html)** - Docs ufficiali
- **[Eleventy Layouts](https://www.11ty.dev/docs/layouts/)** - Layout chain
- **[Tailwind Components](https://tailwindui.com/components)** - Esempi UI

---

**Ultimo aggiornamento:** 2025-12-31
**Refactoring:** [base.njk](../src/_includes/layouts/base.njk)
