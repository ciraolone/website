---
layout: base.njk
title: Tutti i video di Andrea Ciraolo
description: Cerca e filtra tra tutti i video e le playlist del canale YouTube.
prose: false
maxW: "4xl"
hero:
  title: "Tutti i miei video"
---

Ehi! 👋 Qui trovi tutti, ma proprio tutti, i video e le playlist del mio canale YouTube. Da quando ci do dentro ho pubblicato <span class="font-accent underline" id="totaleVideo">tanti</span> video gratuiti! Usa la barra di ricerca per trovare un argomento specifico.

<div class="video-archive mt-8">
  <!-- Barra di ricerca -->
  <div class="flex gap-0 mb-8">
    <input
      type="search"
      id="searchInput"
      placeholder="Cerca per titolo o descrizione (min. 3 caratteri)..."
      class="grow px-5 py-3 bg-white border-2 border-black border-r-0 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow transition-all"
    >
    <button
      id="searchBtn"
      type="button"
      class="px-5 py-3 bg-primary border-2 border-black font-semibold hover:bg-primary-light shadow transition-all"
      title="Cerca"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </button>
  </div>

  <!-- Contenitore per i risultati -->
  <div id="risultati" class="grid grid-cols-1 gap-4">
    <!-- I risultati della ricerca verranno inseriti qui dal JavaScript -->
  </div>

  <!-- Pulsante "Carica Altri" -->
  <div id="caricaAltri" class="text-center mt-8 hidden">
    <button class="px-6 py-3 bg-primary border-2 border-black font-bold hover:bg-primary-light hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 shadow transition-all">
      Carica altri risultati
    </button>
    <p class="text-gray-500 text-sm mt-2" id="contatoreRisultati"></p>
  </div>

  <!-- Messaggio per quando non ci sono risultati -->
  <div id="nessunRisultato" class="text-center py-12 hidden">
    <p class="text-xl text-gray-500">Nessun risultato trovato per i filtri impostati.</p>
  </div>
</div>

<script src="/assets/js/video-archive.js"></script>
