---
layout: base.njk
description: Pagina principale del sito
hideNavbar: true
# hero:
#   title: "Ciao!👋"
#   subtitle: "Mi chiamo Andrea e faccio video per farti imparare le cose."
#   image: "/assets/images/andrea.png"
---

{% from "components/card.njk" import card %}
{% from "components/cardGrid.njk" import cardGrid %}
{% from "components/videoTicker.njk" import videoTicker %}

{# La homepage non ha hero, e per Google ogni pagina deve avere un titolo principale: questo è
invisibile a schermo e la grafica resta quella delle card #}

<h1 class="sr-only">Andrea Ciraolo</h1>

{{ card(
  image="/assets/images/andrea.png",
  mediaPosition="top",
  imageAlt="Andrea Ciraolo",
  title="Ciao!👋 Mi chiamo Andrea e faccio video per farti imparare le cose.",
  className="my-6"
) }}

{{ videoTicker(titoliVideo) }}

## Cosa possiamo fare assieme

{{ card(
  image="/assets/images/tutti-i-video.png",
  mediaPosition="right",
  imageAlt="Le copertine di alcuni video del canale",
  headerText="Tutti i miei video",
  title="Imparare gratis, quando ti serve.",
  description="Più di mille video e playlist del canale YouTube, in un solo posto: cerca l'argomento e trovi il tutorial giusto.",
  buttonText="Cerca fra i video",
  buttonUrl="/video/",
  className="my-6"
) }}

{{ card(
  image="/assets/images/dailytool-text.png",
  mediaPosition="left",
  imageAlt="Un tool al giorno",
  headerText="DailyTool - Newsletter",
  title="Scoprire nuovi tool, ogni giorno.",
  description="Ogni mattina nella tua mail un tool che può svoltarti la giornata.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/dailytool",
  className="my-6"
) }}

{{ card(
  image="/assets/images/sblocca_sq.png",
  mediaPosition="right",
  imageAlt="Sblocca il Content Creator che è in te",
  headerText="Sblocca il Content Creator che è in te",
  title="Un corso per cominciare a creare contenuti.",
  description="L'unico di cui hai davvero bisogno!",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/sblocca",
  className="my-6"
) }}

## Dove puoi seguirmi

{% call cardGrid(colsXs="1",colsSm="2",colsMd="2",colsLg="2") %}
{{ card(
  logo="/assets/images/icons/youtube.avif",
  cardUrl="https://cira.link/youtube",
  imageAlt="Youtube",
  title="Youtube",
  description="Tutorial, corsi gratuiti e approfondimenti su software, intelligenza artificiale, automazioni e creazione di contenuti."
) }}
{{ card(
  logo="/assets/images/icons/telegram.avif",
  cardUrl="https://cira.link/telegram",
  imageAlt="Telegram",
  title="Telegram",
  description="Aggiornamenti, dietro le quinte, promozioni e riepiloghi per restare sempre al passo con le cose che faccio."
) }}
{{ card(
  logo="/assets/images/icons/instagram.avif",
  cardUrl="https://cira.link/instagram",
  imageAlt="Instagram",
  title="Instagram",
  description="Ehm, non lo amo molto e non passo spesso da quelle parti. Lì solo gli aggiornamenti più rilevanti."
) }}
{{ card(
  logo="/assets/images/icons/spotify.avif",
  cardUrl="https://cira.link/negati",
  imageAlt="Negati",
  title="Negati",
  description="Il podcast dove, insieme a Vale e Matte, condividiamo senza filtri gioie e dolori della vita da freelance e imprenditore."
) }}
{{ card(
  logo="/assets/images/icons/spotify.avif",
  cardUrl="https://cira.link/passionepodcast",
  imageAlt="Passione Podcast",
  title="Passione Podcast",
  description="Il mio primo podcast. Parla di me che imparo a fare un podcast, partendo da zero. Un reperto storico."
) }}
{% endcall %}
