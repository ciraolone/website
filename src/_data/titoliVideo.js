/**
 * Titoli dei video per la striscia che scorre in homepage (components/videoTicker.njk). Legge
 * src/api/videos.json, l'archivio dei video che n8n aggiorna ogni giorno, tiene solo i video (non le
 * playlist), li mescola e ne prende un campione. L'ordine casuale si decide a ogni build: siccome il
 * sito si ricostruisce ogni volta che n8n aggiorna l'archivio, la striscia cambia da sola quasi ogni
 * giorno. Il campione esiste per il peso della homepage: tutti i mille e passa titoli, ripetuti due
 * volte per lo scorrimento continuo, sarebbero oltre 250 KB di HTML; con 40 sono una decina.
 * Le emoji si tolgono dai titoli (scelta di Andrea): quelle in testa e in coda spariscono, quelle in
 * mezzo diventano un trattino, perché lì di solito separano due parti del titolo.
 * Espone anche `caratteri`, la lunghezza totale del testo, da cui il componente ricava la durata
 * dell'animazione in modo che la velocità resti la stessa qualunque sia la lunghezza dei titoli.
 */
const archivio = require('../api/videos.json');

const QUANTI_TITOLI = 40;

// Una "emoji" è un pittogramma (con l'eventuale selettore FE0F che lo disegna a colori), con
// attaccati tono della pelle e le emoji composte unite da ZWJ (👨‍💻). Fra i pittogrammi Unicode
// stanno anche ©, ® e ™, che nei titoli sono testo e devono restare: per questo sono esclusi.
const PITTOGRAMMA = '(?![©®™])\\p{Extended_Pictographic}\\uFE0F?';
const UNA_EMOJI = `${PITTOGRAMMA}(?:\\p{Emoji_Modifier}|\\u200D${PITTOGRAMMA})*`;
// Più emoji di fila, con gli spazi intorno, contano come una sola.
const GRUPPO = `\\s*(?:${UNA_EMOJI}\\s*)+`;
const EMOJI_IN_TESTA = new RegExp(`^${GRUPPO}`, 'u');
const EMOJI_IN_CODA = new RegExp(`${GRUPPO}$`, 'u');
const EMOJI_IN_MEZZO = new RegExp(GRUPPO, 'gu');

function togliEmoji(titolo) {
  return titolo
    .replace(EMOJI_IN_TESTA, '')
    .replace(EMOJI_IN_CODA, '')
    .replace(EMOJI_IN_MEZZO, ' - ')
    .trim();
}

function mescola(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const video = mescola(archivio.videos.filter((voce) => voce.type === 'video'))
  .slice(0, QUANTI_TITOLI)
  .map((voce) => ({ titolo: togliEmoji(voce.title), url: voce.url }));

module.exports = {
  video,
  caratteri: video.reduce((somma, voce) => somma + voce.titolo.length + 3, 0),
};
