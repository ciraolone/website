/**
 * Main JavaScript file
 * Best practice: codice organizzato e modulare
 */

(function() {
  'use strict';

  // Inizializzazione quando il DOM è pronto
  document.addEventListener('DOMContentLoaded', function() {
    init();
  });

  function init() {
    // LQIP: fade-in quando le immagini sono caricate
    setupLqipFadeIn();
  }

  // LQIP: aggiunge classe 'loaded' quando l'immagine è completamente caricata
  // Questo attiva il fade-in CSS da opacity:0 a opacity:1
  function setupLqipFadeIn() {
    const lqipImages = document.querySelectorAll('.lqip-container img');

    lqipImages.forEach(function(img) {
      // Se già caricata (es. da cache), mostra subito
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
      } else {
        // Altrimenti aspetta il load
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
      }
    });
  }

  // Esempio di funzione helper
  function setupMobileMenu() {
    // Logica per menu mobile
  }

})();

