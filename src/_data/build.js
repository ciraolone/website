/**
 * Dati della singola build del sito. Espone `build.versione`, un codice che cambia a ogni
 * pubblicazione e che i template attaccano agli indirizzi di CSS e JS (`main.css?v=...`). Quei file
 * hanno sempre lo stesso nome, ma src/_headers dice ai browser di tenerli in cache per un anno senza
 * richiederli: è il codice nuovo nell'indirizzo che, dopo ogni pubblicazione, obbliga a riscaricarli.
 * Se si toglie il `?v=` da un template, quel file resta vecchio nei browser fino a un anno.
 */
module.exports = {
  versione: Date.now().toString(36),
};
