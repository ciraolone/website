/**
 * Titoli dei video per la striscia che scorre in homepage (components/videoTicker.njk). Legge
 * src/api/videos.json, l'archivio dei video che n8n aggiorna ogni giorno, tiene solo i video (non le
 * playlist), li mescola e ne prende un campione. L'ordine casuale si decide a ogni build: siccome il
 * sito si ricostruisce ogni volta che n8n aggiorna l'archivio, la striscia cambia da sola quasi ogni
 * giorno. Il campione esiste per il peso della homepage: tutti i mille e passa titoli, ripetuti due
 * volte per lo scorrimento continuo, sarebbero oltre 250 KB di HTML; con 40 sono una decina.
 * Espone anche `caratteri`, la lunghezza totale del testo, da cui il componente ricava la durata
 * dell'animazione in modo che la velocità resti la stessa qualunque sia la lunghezza dei titoli.
 */
const archivio = require('../api/videos.json');

const QUANTI_TITOLI = 40;

function mescola(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const video = mescola(
  archivio.videos.filter((voce) => voce.type === 'video'),
).slice(0, QUANTI_TITOLI);

module.exports = {
  video: video.map((voce) => ({ titolo: voce.title, url: voce.url })),
  caratteri: video.reduce((somma, voce) => somma + voce.title.length + 3, 0),
};
