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

{{ card(
  image="/assets/images/andrea.png",
  mediaPosition="top",
  imageAlt="Andrea Ciraolo",
  title="Ciao!👋 Mi chiamo Andrea e faccio video per farti imparare le cose.",
  className="my-6"
) }}

## Cosa possiamo fare assieme

{{ card(
  image="/assets/images/dailytool-text.png",
  mediaPosition="right",
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
  mediaPosition="left",
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
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e969b83454294578678_youtube.avif",
  cardUrl="https://cira.link/youtube",
  imageAlt="Youtube",
  title="Youtube",
  description="Tutorial, corsi gratuiti e approfondimenti su software, intelligenza artificiale, automazioni e creazione di contenuti."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e964c12c420690e91b2_telegram.avif",
  cardUrl="https://cira.link/telegram",
  imageAlt="Telegram",
  title="Telegram",
  description="Aggiornamenti, dietro le quinte, promozioni e riepiloghi per restare sempre al passo con le cose che faccio."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e96862d253d23916196_instagram.avif",
  cardUrl="https://cira.link/instagram",
  imageAlt="Instagram",
  title="Instagram",
  description="Ehm, non lo amo molto e non passo spesso da quelle parti. Lì solo gli aggiornamenti più rilevanti."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e969b8345406b578679_spotify.avif",
  cardUrl="https://cira.link/negati",
  imageAlt="Negati",
  title="Negati",
  description="Il podcast dove, insieme a Vale e Matte, condividiamo senza filtri gioie e dolori della vita da freelance e imprenditore."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e969b8345406b578679_spotify.avif",
  cardUrl="https://cira.link/passionepodcast",
  imageAlt="Passione Podcast",
  title="Passione Podcast",
  description="Il mio primo podcast. Parla di me che imparo a fare un podcast, partendo da zero. Un reperto storico."
) }}
{% endcall %}
