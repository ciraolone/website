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
    // Menu dropdown accessibile via click (mobile) e hover (desktop)
    setupMobileMenu();
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

  // Menu dropdown: funziona con click su mobile e hover su desktop
  // - Click sul bottone: apre/chiude il menu
  // - Click fuori dal menu: chiude il menu
  // - Tasto Escape: chiude il menu
  function setupMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var dropdown = document.getElementById('menu-dropdown');

    if (!toggle || !dropdown) return;

    // Click sul bottone Menu
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.contains('block');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Click fuori dal menu: chiude
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        closeMenu();
      }
    });

    // Tasto Escape: chiude il menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });

    function openMenu() {
      dropdown.classList.remove('hidden');
      dropdown.classList.add('block');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('block');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

})();

