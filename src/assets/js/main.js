/**
 * Main JavaScript file
 * Best practice: codice organizzato e modulare
 */

(function () {
  'use strict';

  // Inizializzazione quando il DOM è pronto
  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  function init() {
    // LQIP: fade-in quando le immagini sono caricate
    setupLqipFadeIn();
    // Menu dropdown accessibile via click (mobile) e hover (desktop)
    setupMobileMenu();
    // Conti alla rovescia delle scadenze commerciali
    setupCountdowns();
    // Spazio sotto al contenuto pari all'altezza della barra di acquisto mobile
    setupMobileCtaSpacer();
    // Avviso e countdown del pannello di acquisto: solo quando quello grande è fuori schermo
    setupAvvisiSidebar();
  }

  // La barra di acquisto fissa in basso (solo mobile) copre il fondo della pagina. Lo spazio
  // vuoto che le sta sotto deve essere alto esattamente quanto lei, e la sua altezza dipende dai
  // testi che ci finiscono dentro (nota di urgenza su una o due righe, conto alla rovescia sì o
  // no): se la misuriamo qui, cambiare quei testi non lascia più contenuto nascosto dietro.
  function adattaSpacerMobile() {
    const bar = document.querySelector('[data-mobile-cta]');
    const spacer = document.querySelector('[data-mobile-cta-spacer]');

    if (!bar || !spacer) {
      return;
    }

    spacer.style.height = bar.offsetHeight + 'px';
  }

  function setupMobileCtaSpacer() {
    adattaSpacerMobile();
    window.addEventListener('resize', adattaSpacerMobile);
  }

  // L'avviso e il conto alla rovescia compaiono due volte nella pagina: in grande dentro al
  // contenuto e in piccolo nel pannello di acquisto (la colonna a destra su desktop, la barra
  // fissa in basso su mobile). Finché si vede quello grande, la copia piccola è solo rumore:
  // resta nascosta e si accende quando il blocco grande esce dallo schermo. Accendendola e
  // spegnendola la barra mobile cambia altezza, quindi ogni volta va rimisurato anche lo spazio
  // sotto al contenuto.
  function setupAvvisiSidebar() {
    const principali = document.querySelector('[data-avvisi-principali]');
    const copie = document.querySelectorAll('[data-avvisi-sidebar]');

    if (copie.length === 0) {
      return;
    }

    // Pagina senza avvisi nel contenuto: allora quelli del pannello non sono una copia di
    // niente, sono gli unici, e restano sempre accesi.
    if (!principali) {
      copie.forEach(function (copia) {
        copia.classList.remove('hidden');
      });
      adattaSpacerMobile();
      return;
    }

    // Su mobile la barra fissa copre la parte bassa dello schermo: senza questo margine il blocco
    // grande risulterebbe "visibile" anche quando è nascosto dietro la barra, e la copia piccola
    // sparirebbe mentre non si legge né l'una né l'altra. La misura è quella della barra chiusa
    // (le copie a questo punto sono ancora nascoste); su desktop la barra non c'è e vale zero.
    const barra = document.querySelector('[data-mobile-cta]');
    const margineBasso = barra ? barra.offsetHeight : 0;

    const osservatore = new IntersectionObserver(
      function (voci) {
        const siVedeIlPrincipale = voci[0].isIntersecting;

        copie.forEach(function (copia) {
          copia.classList.toggle('hidden', siVedeIlPrincipale);
        });

        adattaSpacerMobile();
      },
      { rootMargin: '0px 0px -' + margineBasso + 'px 0px' },
    );

    osservatore.observe(principali);
  }

  // LQIP: aggiunge classe 'loaded' quando l'immagine è completamente caricata
  // Questo attiva il fade-in CSS da opacity:0 a opacity:1
  function setupLqipFadeIn() {
    const lqipImages = document.querySelectorAll('.lqip-container img');

    lqipImages.forEach(function (img) {
      // Se già caricata (es. da cache), mostra subito
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
      } else {
        // Altrimenti aspetta il load
        img.addEventListener('load', function () {
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
    const toggle = document.getElementById('menu-toggle');
    const dropdown = document.getElementById('menu-dropdown');

    if (!toggle || !dropdown) {
      return;
    }

    // Click sul bottone Menu
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('block');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Click fuori dal menu: chiude
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        closeMenu();
      }
    });

    // Tasto Escape: chiude il menu
    document.addEventListener('keydown', function (e) {
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

  // Countdown: aggiorna ogni secondo i blocchi generati da components/countdown.njk
  function setupCountdowns() {
    const countdowns = document.querySelectorAll('[data-countdown]');

    if (countdowns.length === 0) {
      return;
    }

    updateAllCountdowns();
    setInterval(updateAllCountdowns, 1000);

    function updateAllCountdowns() {
      countdowns.forEach(updateCountdown);
    }
  }

  function updateCountdown(countdown) {
    const deadline = new Date(
      countdown.getAttribute('data-countdown-deadline'),
    ).getTime();
    const remaining = deadline - Date.now();

    // Scaduto (o data scritta male): il blocco sparisce invece di mostrare zeri o "NaN"
    if (isNaN(remaining) || remaining <= 0) {
      countdown.classList.add('hidden');
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const units = [
      { name: 'days', value: Math.floor(totalSeconds / 86400) },
      { name: 'hours', value: Math.floor(totalSeconds / 3600) % 24 },
      { name: 'minutes', value: Math.floor(totalSeconds / 60) % 60 },
      { name: 'seconds', value: totalSeconds % 60 },
    ];

    // Un'unità a zero si mostra solo se c'è qualcosa sopra di lei: sotto le 24 ore il
    // riquadro dei giorni sparisce invece di restare lì a segnare zero. I secondi ci sono
    // sempre, altrimenti nell'ultimo minuto il countdown resterebbe senza numeri.
    let hasLargerUnit = false;

    units.forEach(function (unit) {
      const isRelevant =
        hasLargerUnit || unit.value > 0 || unit.name === 'seconds';

      setCountdownUnit(countdown, unit.name, unit.value, isRelevant);
      hasLargerUnit = hasLargerUnit || unit.value > 0;
    });
  }

  function setCountdownUnit(countdown, unit, value, isRelevant) {
    const box = countdown.querySelector('[data-countdown-unit="' + unit + '"]');
    const number = box && box.querySelector('[data-countdown-value]');

    if (!number) {
      return;
    }

    box.classList.toggle('hidden', !isRelevant);
    number.textContent = value < 10 ? '0' + value : String(value);
  }
})();
