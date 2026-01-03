---
layout: base.njk
title: Corsi per creare contenuti digitali
description: I miei corsi per creare contenuti come se non ci fosse un domani.
hero:
  title: "Corsi per creare contenuti digitali"
---

{% from "components/card.njk" import card %}
{% from "components/cardGrid.njk" import cardGrid %}

{% call cardGrid() %}
{{ card(
  image="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/67689af467d23a39c2e3bb84_Sblocca%20il%20content%20creator%20che%20%C3%A8%20in%20te.avif",
  imageAlt="Sblocca il Content Creator che è in te",
  title="Sblocca il Content Creator che è in te!",
  description="Sei già pronto per creare contenuti. Anche se ancora non lo sai.",
  buttonText="Scopri di più",
  buttonUrl="/sblocca/"
) }}
{{ card(
  image="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64fdd0be65ba18cc5d7f88de_CREA%20CONTENUTI%20COME%20UN%20TRATTORE%20(1).avif",
  imageAlt="Crea contenuti come un trattore",
  title="Crea contenuti come un trattore!",
  description="Il nostro vero metodo per creare tanti contenuti di qualità, in poco tempo.",
  buttonText="Scopri di più",
  buttonUrl="/pages/masterclass-contenuti/"
) }}
{{ card(
  image="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64fc69c20a3ae14953aa99ce_Andrea%20e%20Matteo.avif",
  imageAlt="Fai podcast come un fabbro - Andrea e Matteo",
  title="Fai podcast come un fabbro!",
  description="Prendi in mano il microfono e picchia giù duro per raggiungere i tuoi obiettivi.",
  buttonText="Scopri di più",
  buttonUrl="/pages/masterclass-podcast/"
) }}
{{ card(
  image="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/66053a88c39da81a0953c08b_Lavora%20come%20un%20Drago.avif",
  imageAlt="Lavora come un drago",
  title="Lavora come un drago!",
  description="La masterclass completa per ottimizzare il lavoro e la crescita professionale dei freelance.",
  buttonText="Scopri di più",
  buttonUrl="/pages/masterclass-lavoro/"
) }}
{{ card(
  image="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64678dab588afd10979df15e_Notion-con-Debora.avif",
  imageAlt="Organizza il lavoro e la vita con Notion",
  title="Organizza il lavoro e la vita con Notion!",
  description="Il corso per scoprire l'applicazione che ha cambiato la vita a milioni di persone!",
  buttonText="Scopri di più",
  buttonUrl="/pages/notion/"
) }}
{{ card(
  image="https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/646780c4c3848d5d52f3e8ce_Copertina-OBS-1536x865.avif",
  imageAlt="OBS Studio per video e live streaming",
  title="OBS Studio per video e live streaming professionali!",
  description="Tutto quello che serve per fare video e dirette belli da vedere e piacevoli da ascoltare, in poco tempo.",
  buttonText="Scopri di più",
  buttonUrl="https://cira.link/obs"
) }}
{% endcall %}
