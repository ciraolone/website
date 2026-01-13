/**
 * Video Archive - Ricerca e filtro video YouTube
 *
 * Funzionalità:
 * - Caricamento video da API esterna
 * - Ricerca fuzzy per titolo e descrizione
 * - Lazy loading delle thumbnail
 * - Infinite scroll per caricamento progressivo
 */

(function () {
  "use strict";

  // === CONFIGURAZIONE ===
  const API_ENDPOINT_GETALL =
    "https://n8n.ciraolo.cloud/webhook/yt-video-getall";
  const MAX_INITIAL_RENDER = 20;

  // === STATO GLOBALE ===
  let datiVideo = [];
  let thumbnailObserver = null;
  let scrollObserver = null;
  let searchTimeout = null;
  let risultatiFiltrati = [];
  let risultatiMostrati = 0;
  // Modalità admin: mostra pulsanti di amministrazione se ?admin è nell'URL
  let isAdmin = new URLSearchParams(window.location.search).has("admin");

  // === ELEMENTI DOM ===
  let contenitoreRisultati;
  let inputRicerca;
  let messaggioNessunRisultato;
  let caricaAltriDiv;
  let contatoreRisultati;
  let totaleVideoEl;

  // === INIZIALIZZAZIONE ===
  document.addEventListener("DOMContentLoaded", function () {
    // Verifica che siamo nella pagina giusta
    contenitoreRisultati = document.getElementById("risultati");
    if (!contenitoreRisultati) return;

    inputRicerca = document.getElementById("searchInput");
    messaggioNessunRisultato = document.getElementById("nessunRisultato");
    caricaAltriDiv = document.getElementById("caricaAltri");
    contatoreRisultati = document.getElementById("contatoreRisultati");
    totaleVideoEl = document.getElementById("totaleVideo");

    inizializzaThumbnailObserver();
    inizializzaScrollObserver();
    setupEventListeners();
    caricaDati();
  });

  function setupEventListeners() {
    if (inputRicerca) {
      inputRicerca.addEventListener("keyup", aggiornaVistaConDebounce);
    }
    var searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
      searchBtn.addEventListener("click", aggiornaVista);
    }
    if (caricaAltriDiv) {
      const btn = caricaAltriDiv.querySelector("button");
      if (btn) {
        btn.addEventListener("click", caricaAltriRisultati);
      }
    }
  }

  // === CARICAMENTO DATI ===
  async function caricaDati() {
    try {
      contenitoreRisultati.innerHTML = `
        <div class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          <p class="font-accent text-xl mt-4">Caricamento video in corso...</p>
        </div>
      `;

      const response = await fetch(API_ENDPOINT_GETALL);
      const data = await response.json();

      datiVideo = data.map(function (item) {
        return {
          video_id: item.video_id || "",
          title: item.title || "",
          description: item.description_short || "",
          date: item.date || null,
          views: item.viewCount || null,
          comments: item.commentCount || null,
          likes: item.likeCount || null,
          dislikes: item.dislikeCount || null,
          duration: item.duration || null,
          privacyStatus: item.privacyStatus || null,
        };
      });

      // Ordina per data (più recente prima)
      datiVideo.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      // Aggiorna contatore totale video
      aggiornaContatoreTotale();

      mostraVideoProgressivo(datiVideo, true);
    } catch (error) {
      console.error("Errore nel caricamento dei dati:", error);
      contenitoreRisultati.innerHTML = `
        <div class="text-center py-12">
          <p class="text-xl text-red-600">Errore nel caricamento dei video</p>
          <p class="text-gray-500 mt-2">Riprova più tardi o contatta l'amministratore</p>
          <button id="retryBtn" class="mt-4 px-6 py-2 bg-primary border-2 border-black font-bold hover:bg-primary-light shadow transition-all">
            Riprova
          </button>
        </div>
      `;
      document
        .getElementById("retryBtn")
        .addEventListener("click", caricaDati);
    }
  }

  // === OBSERVERS ===
  function inizializzaThumbnailObserver() {
    if (thumbnailObserver) {
      thumbnailObserver.disconnect();
    }

    thumbnailObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            var src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
              thumbnailObserver.unobserve(img);
            }
          }
        });
      },
      { rootMargin: "50px" }
    );
  }

  function inizializzaScrollObserver() {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (
            entry.isIntersecting &&
            risultatiMostrati < risultatiFiltrati.length
          ) {
            caricaAltriRisultati();
          }
        });
      },
      { rootMargin: "200px" }
    );
  }

  // === UTILITÀ ===
  function creaUrlYouTube(id) {
    if (!id) return "#";
    if (id.startsWith("PL")) {
      return "https://www.youtube.com/playlist?list=" + id;
    }
    return "https://youtu.be/" + id;
  }

  function formattaData(dataString) {
    if (!dataString) return "Data non disponibile";
    // Rimuovi virgolette extra se presenti (es. "\"2018-08-22...\"")
    var cleanedString = dataString.replace(/^"|"$/g, "");
    var data = new Date(cleanedString);
    if (isNaN(data.getTime())) return "Data non disponibile";
    return data.getFullYear().toString();
  }

  function formattaDurata(secondi) {
    if (secondi === null || secondi === undefined || secondi <= 0) return "";
    var ore = Math.floor(secondi / 3600);
    var minuti = Math.floor((secondi % 3600) / 60);

    var risultato = "";
    if (ore > 0) {
      risultato += ore + "h ";
    }
    if (minuti >= 0) {
      risultato += minuti + "m";
    }
    return risultato.trim();
  }

  function normalizzaTesto(testo) {
    return testo
      .toLowerCase()
      .replace(/[-\s_]/g, "")
      .replace(/[àáâäãå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôöõ]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "c")
      .replace(/[ñ]/g, "n");
  }

  function verificaMatch(testo, query) {
    var testoNormalizzato = normalizzaTesto(testo);
    var queryNormalizzata = normalizzaTesto(query);

    if (testoNormalizzato.includes(queryNormalizzata)) {
      return true;
    }

    var paroleQuery = query
      .toLowerCase()
      .split(/[-\s_]+/)
      .filter(function (p) {
        return p.length > 0;
      });
    return paroleQuery.every(function (parola) {
      var parolaNormalizzata = normalizzaTesto(parola);
      return testoNormalizzato.includes(parolaNormalizzata);
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // === AZIONI ===
  function copiaLink(link, buttonElement, event) {
    event.stopPropagation();
    navigator.clipboard.writeText(link).then(function () {
      mostraFeedback(buttonElement, "success");
    });
  }

  function copiaDettagli(titolo, link, buttonElement, event) {
    event.stopPropagation();
    var testoDaCopiare = "📺 " + titolo + " " + link;
    navigator.clipboard.writeText(testoDaCopiare).then(function () {
      mostraFeedback(buttonElement, "success");
    });
  }

  function mostraFeedback(buttonElement, type) {
    var originalIcon = buttonElement.innerHTML;
    var iconHtml =
      type === "success"
        ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';

    buttonElement.innerHTML = iconHtml;
    setTimeout(function () {
      buttonElement.innerHTML = originalIcon;
    }, 1500);
  }

  // === RENDERING ===
  function mostraVideoProgressivo(videoDaMostrare, reset) {
    if (reset === undefined) reset = true;

    if (reset) {
      contenitoreRisultati.innerHTML = "";
      risultatiMostrati = 0;
      risultatiFiltrati = videoDaMostrare;
    }

    if (risultatiFiltrati.length === 0 && reset) {
      messaggioNessunRisultato.classList.remove("hidden");
      caricaAltriDiv.classList.add("hidden");
      return;
    } else {
      messaggioNessunRisultato.classList.add("hidden");
    }

    var fineSlice = Math.min(
      risultatiMostrati + MAX_INITIAL_RENDER,
      risultatiFiltrati.length
    );
    var videosDaMostrare = risultatiFiltrati.slice(risultatiMostrati, fineSlice);

    videosDaMostrare.forEach(function (video) {
      var isPlaylist = video.video_id && video.video_id.startsWith("PL");
      var viewUrl = creaUrlYouTube(video.video_id);
      var dataFormattata = formattaData(video.date);
      var durataFormattata = formattaDurata(video.duration);

      var escapedTitle = escapeHtml(video.title);
      var escapedDescription = escapeHtml(video.description);

      var editUrl, statsUrl;
      if (isPlaylist) {
        editUrl =
          "https://studio.youtube.com/playlist/" + video.video_id + "/edit";
        statsUrl =
          "https://studio.youtube.com/playlist/" +
          video.video_id +
          "/analytics/tab-overview/period-default";
      } else {
        editUrl =
          "https://studio.youtube.com/video/" + video.video_id + "/edit";
        statsUrl =
          "https://studio.youtube.com/video/" +
          video.video_id +
          "/analytics/tab-overview/period-default";
      }

      // Thumbnail placeholder (solo per video, non playlist)
      var thumbnailHtml =
        '<div class="w-full h-full bg-gray-100 flex items-center justify-center">' +
        '<div class="animate-pulse">' +
        '<svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' +
        "</div>" +
        "</div>" +
        '<img data-src="https://img.youtube.com/vi/' +
        video.video_id +
        '/sddefault.jpg" alt="' +
        escapedTitle +
        '" class="lazy-thumbnail absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300">';

      // Testo pulsante guarda
      var watchButtonText = isPlaylist ? "Guarda i video" : "Guarda il video";

      // Pulsanti admin (solo se ?admin è nell'URL)
      var adminButtonsHtml = "";
      if (isAdmin) {
        adminButtonsHtml =
          '<div class="flex items-center gap-1">' +
          '<a href="' +
          editUrl +
          '" target="_blank" rel="noopener noreferrer" title="Modifica" class="text-gray-500 hover:text-accent p-1">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>' +
          "</a>" +
          '<a href="' +
          statsUrl +
          '" target="_blank" rel="noopener noreferrer" title="Statistiche" class="text-gray-500 hover:text-accent p-1">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>' +
          "</a>" +
          '<button data-action="copy-link" data-url="' +
          viewUrl +
          '" title="Copia link" class="text-gray-500 hover:text-accent p-1">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' +
          "</button>" +
          '<button data-action="copy-details" data-title="' +
          escapedTitle +
          '" data-url="' +
          viewUrl +
          '" title="Copia dettagli" class="text-gray-500 hover:text-accent p-1">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>' +
          "</button>" +
          "</div>";
      }

      // Pulsante guarda video
      var watchButtonHtml =
        '<a href="' +
        viewUrl +
        '" target="_blank" rel="noopener noreferrer" class="inline-block border-2 border-black px-5 py-3 font-semibold text-black shadow focus:outline-0 bg-primary hover:bg-primary-light hover:shadow-none hover:translate-x-1 hover:translate-y-1 focus-ring-primary rounded-default">' +
        watchButtonText +
        "</a>";

      // Costruisci la colonna thumbnail in modo diverso per playlist vs video
      var thumbnailColumnHtml;
      if (isPlaylist) {
        // Playlist: thumbnail a tutta altezza senza data sotto
        thumbnailColumnHtml =
          '<div class="w-full sm:w-64 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">' +
          '<a href="' +
          viewUrl +
          '" target="_blank" rel="noopener noreferrer" class="relative bg-primary h-full min-h-32 flex items-center justify-center">' +
          '<span class="font-accent text-2xl text-black">Playlist</span>' +
          "</a>" +
          "</div>";
      } else {
        // Video: thumbnail con data/durata sotto
        thumbnailColumnHtml =
          '<div class="w-full sm:w-64 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">' +
          '<a href="' +
          viewUrl +
          '" target="_blank" rel="noopener noreferrer" class="block relative bg-gray-100 aspect-video">' +
          thumbnailHtml +
          "</a>" +
          '<div class="bg-gray-100 px-2 py-2 text-gray-600 text-xs text-center">' +
          '<span class="video-date">' +
          dataFormattata +
          (durataFormattata ? " • " + durataFormattata : "") +
          "</span>" +
          "</div>" +
          "</div>";
      }

      var cardHtml =
        '<div class="video-card bg-white border-2 border-black shadow flex flex-col sm:flex-row overflow-hidden">' +
        thumbnailColumnHtml +
        // Colonna contenuto
        '<div class="p-4 flex flex-col grow overflow-hidden">' +
        "<div>" +
        '<a href="' +
        viewUrl +
        '" target="_blank" rel="noopener noreferrer" class="block">' +
        '<h3 class="text-base font-semibold text-black hover:text-accent transition-colors mb-2">' +
        escapedTitle +
        "</h3>" +
        "</a>" +
        '<p class="video-description text-sm text-gray-600 mb-2">' +
        escapedDescription +
        "</p>" +
        "</div>" +
        // Footer con pulsanti (sempre allineati a destra, con admin a sinistra se presente)
        '<div class="mt-auto flex items-center justify-end gap-2">' +
        adminButtonsHtml +
        watchButtonHtml +
        "</div>" +
        "</div>" +
        "</div>";

      contenitoreRisultati.insertAdjacentHTML("beforeend", cardHtml);
    });

    // Aggiungi event listener ai nuovi pulsanti admin
    var nuoveCard = contenitoreRisultati.querySelectorAll(
      ".video-card:not([data-initialized])"
    );
    nuoveCard.forEach(function (card) {
      card.setAttribute("data-initialized", "true");

      var copyLinkBtn = card.querySelector('[data-action="copy-link"]');
      if (copyLinkBtn) {
        copyLinkBtn.addEventListener("click", function (e) {
          copiaLink(this.dataset.url, this, e);
        });
      }

      var copyDetailsBtn = card.querySelector('[data-action="copy-details"]');
      if (copyDetailsBtn) {
        copyDetailsBtn.addEventListener("click", function (e) {
          copiaDettagli(this.dataset.title, this.dataset.url, this, e);
        });
      }
    });

    risultatiMostrati = fineSlice;

    // Aggiorna UI "carica altri"
    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    if (risultatiMostrati < risultatiFiltrati.length) {
      caricaAltriDiv.classList.remove("hidden");
      contatoreRisultati.textContent =
        "Mostrati " +
        risultatiMostrati +
        " di " +
        risultatiFiltrati.length +
        " risultati";

      if (scrollObserver) {
        scrollObserver.observe(caricaAltriDiv);
      }
    } else {
      caricaAltriDiv.classList.add("hidden");
      if (risultatiFiltrati.length > MAX_INITIAL_RENDER) {
        contatoreRisultati.textContent =
          "Tutti i " + risultatiFiltrati.length + " risultati mostrati";
        contatoreRisultati.parentElement.classList.remove("hidden");
      } else {
        contatoreRisultati.parentElement.classList.add("hidden");
      }
    }

    // Lazy loading thumbnail
    if (thumbnailObserver) {
      var lazyImages = contenitoreRisultati.querySelectorAll(
        ".lazy-thumbnail:not([data-observed])"
      );
      lazyImages.forEach(function (img) {
        img.setAttribute("data-observed", "true");
        img.onload = function () {
          this.style.opacity = "1";
          var loadingDiv = this.parentElement.querySelector(".animate-pulse");
          if (loadingDiv && loadingDiv.parentElement) {
            loadingDiv.parentElement.style.display = "none";
          }
        };
        thumbnailObserver.observe(img);
      });
    }
  }

  // === FILTRI ===
  function aggiornaVista() {
    var query = inputRicerca.value.toLowerCase().trim();

    var risultati = [];

    // Filtro testo
    if (query.length >= 3) {
      risultati = datiVideo.filter(function (video) {
        var matchTitolo = verificaMatch(video.title, query);
        var matchDescrizione =
          video.description && verificaMatch(video.description, query);
        return matchTitolo || matchDescrizione;
      });

      // Metti le playlist prima dei video nei risultati di ricerca
      risultati.sort(function (a, b) {
        var aIsPlaylist = a.video_id.startsWith("PL");
        var bIsPlaylist = b.video_id.startsWith("PL");
        if (aIsPlaylist && !bIsPlaylist) return -1;
        if (!aIsPlaylist && bIsPlaylist) return 1;
        return 0;
      });
    } else {
      risultati = datiVideo.slice();
    }

    mostraVideoProgressivo(risultati);
  }

  function aggiornaVistaConDebounce() {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(function () {
      aggiornaVista();
    }, 300);
  }

  function caricaAltriRisultati() {
    mostraVideoProgressivo(risultatiFiltrati, false);
  }

  function aggiornaContatoreTotale() {
    // Conta solo i video (escludi le playlist)
    var soloVideo = datiVideo.filter(function (v) {
      return !v.video_id.startsWith("PL");
    });

    // Totale video
    if (totaleVideoEl) {
      totaleVideoEl.textContent = soloVideo.length.toString();
    }
  }
})();
