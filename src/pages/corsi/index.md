---
layout: base.njk
title: Corsi per creare contenuti digitali
description: I miei corsi per creare contenuti come se non ci fosse un domani.
hero:
  title: "Corsi per creare contenuti digitali"
prose: false
maxW: full
---

{% from "components/card.njk" import card %}
{% from "components/cardGrid.njk" import cardGrid %}

{% call cardGrid(colsXs="1",colsSm="2",colsMd="2",colsLg="3") %}
{{ card(
  image="/assets/images/sblocca.avif",
  imageAlt="Sblocca il Content Creator che è in te",
  title="Sblocca il Content Creator che è in te!",
  description="Sei già pronto per creare contenuti. Anche se ancora non lo sai.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/sblocca"
) }}
{{ card(
  image="/assets/images/trattore.avif",
  imageAlt="Crea contenuti come un trattore",
  title="Crea contenuti come un trattore!",
  description="Il nostro vero metodo per creare tanti contenuti di qualità, in poco tempo.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/trattore"
) }}
{{ card(
  image="/assets/images/obs.avif",
  imageAlt="OBS Studio per video e live streaming",
  title="OBS Studio per video e live streaming professionali!",
  description="Tutto quello che serve per fare video e dirette belli da vedere e piacevoli da ascoltare, in poco tempo.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/obs"
) }}
{{ card(
  image="/assets/images/fabbro.avif",
  imageAlt="Fai podcast come un fabbro - Andrea e Matteo",
  title="Fai podcast come un fabbro!",
  description="Prendi in mano il microfono e picchia giù duro per raggiungere i tuoi obiettivi.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/fabbro"
) }}
{{ card(
  image="/assets/images/drago.avif",
  imageAlt="Lavora come un drago",
  title="Lavora come un drago!",
  description="La masterclass completa per ottimizzare il lavoro e la crescita professionale dei freelance.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/drago"
) }}
{{ card(
  image="/assets/images/notion-corso.avif",
  imageAlt="Organizza il lavoro e la vita con Notion",
  title="Organizza il lavoro e la vita con Notion!",
  description="Il corso per scoprire l'applicazione che ha cambiato la vita a milioni di persone!",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/notion"
) }}

{% endcall %}
