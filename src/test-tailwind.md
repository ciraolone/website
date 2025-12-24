---
layout: base.njk
title: Test Tailwind CSS
description: Pagina di test per verificare che Tailwind funzioni
---

# Test Tailwind CSS 🎨

Questa pagina serve a verificare che Tailwind CSS sia correttamente installato e funzionante.

## Colori

<div class="grid grid-cols-3 gap-4 my-4">
  <div class="bg-red-500 text-white p-4 rounded text-center">Rosso</div>
  <div class="bg-green-500 text-white p-4 rounded text-center">Verde</div>
  <div class="bg-blue-500 text-white p-4 rounded text-center">Blu</div>
</div>

## Typography

<div class="space-y-4 my-4">
  <p class="text-2xl font-bold">Testo grande e grassetto</p>
  <p class="text-lg text-gray-600">Testo medio grigio</p>
  <p class="text-sm text-blue-500">Testo piccolo blu</p>
</div>

## Card con Shadow

<div class="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 my-4">
  <h3 class="text-xl font-semibold mb-2">Card con Shadow</h3>
  <p class="text-gray-600">Questa è una card stilizzata con Tailwind CSS. Se vedi ombra, bordi arrotondati e padding, Tailwind funziona! ✅</p>
</div>

## Buttons

<div class="flex gap-4 my-4">
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button Primary
  </button>
  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
    Button Secondary
  </button>
</div>

## Responsive Grid

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
  <div class="bg-purple-100 p-4 rounded">Colonna 1</div>
  <div class="bg-purple-200 p-4 rounded">Colonna 2</div>
  <div class="bg-purple-300 p-4 rounded">Colonna 3</div>
</div>

---

## Esempi con Markdown puro (senza HTML)

Ora puoi usare classi CSS direttamente nel Markdown usando la sintassi `{: .class-name}`:

### Paragrafo con classi

Paragrafo normale{: .text-blue-500 .font-bold}

### Heading con classi

### Titolo con classi Tailwind{: .text-3xl .text-purple-600 .mb-4}

### Liste con classi

- Primo elemento {: .bg-yellow-100 .p-2 .rounded }
- Secondo elemento{: .bg-yellow-200 .p-2 .rounded }
- Terzo elemento{: .bg-yellow-300 .p-2 .rounded }

### Link con classi

[Link stilizzato](https://example.com){: .text-green-600 .hover:text-green-800 .underline}

### Immagine con classi

![Test](https://via.placeholder.com/300){: .rounded-lg .shadow-lg .mx-auto}

### Blocco di codice con classi

```javascript
console.log("Hello World");
```

{: .bg-gray-800 .text-white .p-4 .rounded}

### Sintassi avanzata

Puoi anche combinare ID e classi multiple:

Paragrafo speciale{: #my-id .text-xl .font-semibold .text-indigo-600}

---

**Se vedi tutti questi elementi stilizzati correttamente, Tailwind CSS è installato e funzionante! 🎉**
