---
layout: base.njk
title: Press Kit
description: Press Kit di Andrea Ciraolo - Bio, link e foto per la stampa
hero:
  title: "Press Kit"
---

{% from "components/card.njk" import card %}
{% from "components/cardGrid.njk" import cardGrid %}

## Bio breve

Sono Andrea Ciraolo e sono un content creator. Faccio video per chi vuole realizzare contenuti online, organizzarsi meglio e essere più efficace nella sua professione.

## Descrizione

Sono un Content Creator specializzato in video educational per aziende e professionisti che vogliono comunicare online.

Laureato in Scienze e Tecniche Psicologiche, dopo essermi licenziato dal precedente lavoro (direttore di case di riposo) ho creato un podcast su come non sapevo fare podcast (Passione Podcast).

Quasi per caso ho cominciato a fare tutorial su YouTube e il canale ha cominciato a crescere guadagnando autorevolezza agli occhi degli utenti e della piattaforma: sono ai primi posti dei risultati di ricerca per la maggior parte dei programmi per la creazione di contenuti.

Oggi ho una community fedele e appassionata, e offro con passione contenuti gratuiti quasi ogni giorno. Aiuto professionisti e aziende a crescere online tramite corsi, formazione e consulenze.

Per saperne di più puoi visitare la pagina [Chi sono](/pages/chi-sono/).

## Link

Se vuoi linkare alcune delle cose che faccio, scegli tra questi link quelli più adatti alla nostra collaborazione.

- **Sito** [https://ciraolone.com](https://ciraolone.com)
- **Youtube** [https://www.cira.link/youtube](https://www.cira.link/youtube)
- **Newsletter** [https://www.cira.link/newsletter](https://www.cira.link/newsletter)
- **Telegram** [https://www.cira.link/telegram](https://www.cira.link/telegram)
- **Instagram** [https://www.cira.link/instagram](https://www.cira.link/instagram)

## Foto

Se hai bisogno di una foto, puoi scegliere tra queste.

{% call cardGrid() %}
{{ card(
  image="/assets/images/andrea-001.avif",
  imageAlt="Andrea Ciraolo - Foto 1"
) }}
{{ card(
  image="/assets/images/andrea-002.avif",
  imageAlt="Andrea Ciraolo - Foto 2"
) }}
{{ card(
  image="/assets/images/andrea-003.avif",
  imageAlt="Andrea Ciraolo - Foto 3"
) }}
{{ card(
  image="/assets/images/andrea-004.avif",
  imageAlt="Andrea Ciraolo - Foto 4"
) }}
{% endcall %}
