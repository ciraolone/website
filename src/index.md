---
layout: base.njk
title: Ciraolone
description: Pagina principale del sito
hero:
  title: "Ciao!👋"
  subtitle: "Mi chiamo Andrea e faccio video per farti imparare le cose."
  image: "/assets/images/andrea.png"
---

{% from "components/card.njk" import card %}
{% from "components/cardGrid.njk" import cardGrid %}

{{ card(
  image="/assets/images/dailytool-text.png",
  mediaPosition="right",
  imageAlt="Un tool al giorno",
  headerText="DailyTool",
  title="Un tool al giorno!",
  description="DailyTool è la mia nuova newsletter quotidiana. Ogni mattina nella tua mail un tool che può svoltarti la giornata.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/sblocca",
  className="my-6"
) }}

{{ card(
  image="/assets/images/sblocca_sq.png",
  mediaPosition="left",
  imageAlt="Sblocca il Content Creator che è in te",
  headerText="Sblocca il Content Creator che è in te",
  title="L'unico corso di cui hai bisogno per cominciare!",
  description="Fa per te se non riesci a cominciare, sei rimasto impantanato oppure senti di procedere col freno a mano tirato",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/sblocca",
  className="my-6"
) }}

## Dove vuoi seguirmi?

{% call cardGrid() %}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e969b83454294578678_youtube.avif",
  cardUrl="https://cira.link/youtube",
  imageAlt="Youtube",
  title="Youtube",
  description="Su YouTube realizzo tutorial, corsi gratuiti e video per aiutarti a migliorare la comunicazione online."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e964c12c420690e91b2_telegram.avif",
  cardUrl="https://cira.link/telegram",
  imageAlt="Telegram",
  title="Telegram",
  description="Su Telegram c'è un rapporto un po' più personale con me. Qui puoi dare un'occhiata al mio canale."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e96862d253d23916196_instagram.avif",
  cardUrl="https://cira.link/instagram",
  imageAlt="Instagram",
  title="Instagram",
  description="Su Instagram dialogo con la community e mostro, di tanto in tanto, il dietro le quinte del mio lavoro."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e969b8345406b578679_spotify.avif",
  cardUrl="https://cira.link/negati",
  imageAlt="Negati",
  title="Negati",
  description="Il podcast dove, con Vale e Matte, vi raccontiamo la nostra esperienza da imprenditori."
) }}
{{ card(
  logo="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64346e969b8345406b578679_spotify.avif",
  cardUrl="https://cira.link/passionepodcast",
  imageAlt="Passione Podcast",
  title="Passione Podcast",
  description="Il podcast su di me che imparo a fare un podcast, partendo da zero."
) }}
{% endcall %}
