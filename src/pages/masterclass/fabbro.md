---
layout: base.njk
title: "Masterclass: Fai podcast come un fabbro"
description: Prendi in mano il microfono e picchia giù duro per raggiungere i tuoi obiettivi. Questa masterclass fa per te se vuoi creare il tuo primo podcast o migliorarne uno esistente!
hero:
  title: "Fai podcast come un fabbro!"
  subtitle: "Prendi in mano il microfono e picchia giù duro per raggiungere i tuoi obiettivi."
  image: "https://cdn.prod.website-files.com/6419b3813e7298d5896dcbc0/64fc69c20a3ae14953aa99ce_Andrea%20e%20Matteo.avif"
# sidebarData:
#   alert: "Le iscrizioni alla Masterclass sono chiuse in questo momento!"
#   tagline: "Questa Masterclass fa per te se... vuoi creare il tuo primo podcast o migliorare quello che hai già!"
#   features:
#     - "8 ore di lezione"
#     - "Corso aggiornato su Audacity"
#     - "Strumenti e bonus inclusi"
#     - "Corsi in regalo"
#     - "Aggiornamenti periodici in diretta"
#     - "Accesso illimitato e per sempre"
#   secondaryTitle: "Lo prendi una volta, è tuo per sempre"
#   secondarySubtitle: "Hai capito bene: l'acquisto è lifetime."
#   secondaryFeatures:
#     - "Tutto il materiale è tuo per sempre"
#     - "Riceverai gratis tutti i futuri aggiornamenti"
---

{% from "components/card.njk" import card %}
{% from "components/accordion.njk" import accordion %}
{% from "components/alert.njk" import alert %}

{{ alert("Oh no! Le iscrizioni alla Masterclass sono chiuse in questo momento.", variant="warning") }}

## Cosa imparerai

Ecco cosa sarai in grado di fare dopo aver seguito la Masteclass.

1️⃣ **Realizzare un gran podcast:** che tu parta da zero o abbia già un podcast, uscirai da questa Masterclass in grado di fare un podcast che funzioni veramente.

2️⃣ **Pubblicare tanti episodi in poco tempo:** la quantità è l'elemento che più di tutti determina il successo di un podcast, ma il tempo che abbiamo a disposizione è limitato.

3️⃣ **Migliorare la qualità del risultato finale:** a volte bastano piccole accortezze per farti ascoltare meglio dal tuo pubblico offrendogli un prodotto migliore.

4️⃣ **Ottenere più ascolti:** una delle difficoltà più grandi quando si fa un podcast è promuoverlo, e noi ti raccontiamo le nostre strategie per farlo conoscere.

5️⃣ **Monetizzare e convertire i clienti:** è possibile guadagnare con un podcast? Sì, ma devi farlo nel modo giusto!

## Contenuto del corso

Queste sono le sezioni in cui è suddivisa la Masteclass.

- Perché devi assolutamente fare il tuo podcast
- Quali tipi di podcast esistono? Trova il tuo format
- Tutta la strumentazione di cui hai bisogno
- Come registrare bene in ogni situazione
- Corso sul software Audacity
- Come distribuire il podcast su tutte le piattaforme
- Come scrivere la scaletta o lo script del podcast
- Voce e interpretazione: come parlare per essere convincenti
- Dove trovare la musica e i suoni (anche gratis)
- Le strategie per aumentare gli ascolti
- Come monetizzare il podcast
- 10 consigli per spaccare
- Domande & Risposte

## Bonus e strumenti GRATUITI

In questa Masterclass sono inclusi numerosi strumenti e bonus aggiuntivi a cui avrai accesso GRATUITAMENTE.

**Strumenti inclusi nella Masterclass:**

⚒️ Slide della Masterclass, che puoi consultare con calma

⚒️ Elenco dei tool per portare il tuo podcast ad un altro livello

⚒️ Checklist e template che usiamo per gestire la nostra produzione di contenuti

⚒️ Elenco dei podcast italiani da ascoltare ASSOLUTAMENTE per prendere spunto

⚒️ Elenco delle migliori app per ascoltare podcast

**Corsi in regalo:**

🎁 Crea il tuo podcast con Audacity (di Andrea e Matteo, lo abbiamo registrato apposta e dura due ore e mezza!) **NOVITÀ!**

🎁 Impara a fare podcast in un'ora (di Matteo, vale 59,99€)

🎁 Crea il tuo podcast con GarageBand (di Matteo e Andrea, vale 99,99€)

🎁 OBS Studio per video e live streaming professionali (di Andrea, vale 199,99€)

🎁 Strategia Patreon (di Andrea, vale 99,99€)

🎁 Come fare un video al giorno e non uscire fuori di testa (di Andrea, vale 49,99€)

## FAQ: domande frequenti

{{ accordion(
  items=[
    {
      title: "Devo avere conoscenze tecniche per partecipare?",
      content: "Non ti serve alcuna conoscenza tecnica per partecipare alla masterclass. In tutta onestà ti consigliamo di ascoltare qualche podcast prima di iscriverti, per avere un'idea anche solo generale del mezzo di comunicazione che analizzeremo."
    },
    {
      title: "Devo già avere un podcast?",
      content: "Assolutamente no! Questa Masterclass serve a diventare fabbri del podcast partendo da zero. Ti daremo tutte le informazioni necessarie per iniziare a creare il tuo podcast e portarlo a un ottimo livello."
    },
    {
      title: "Come funziona la Masterclass?",
      content: "La Masterclass è in diretta su Zoom, ma rimarrà online per sempre. Inoltre, nel corso dei mesi successivi aggiungeremo nuovi contenuti, con la stessa modalità della Masterclass: prima in diretta su Zoom, poi la registrazione online. Quindi puoi seguire gli eventi dal vivo, oppure guardare le registrazioni successivamente."
    },
    {
      title: "L'accesso è a vita?",
      content: "È il minimo sindacale! Non solo il corso sarà tuo per sempre, ma riceverai (gratis) anche tutti i futuri aggiornamenti!"
    },
    {
      title: "Posso pagare a rate?",
      content: "Altroché! Se lo desideri, puoi pagare in 3 rate mensili."
    }
  ],
  defaultOpen=0
) }}

## I docenti

{{ card(
  image="/assets/images/andrea.avif",
  mediaPosition="left",
  imageAlt="Andrea Ciraolo",
  headerText="Andrea Ciraolo",
  description="Sono **Andrea Ciraolo** e sono un Content Creator. Faccio video per chi vuole creare contenuti. Aiuto professionisti e aziende a crescere online tramite corsi, formazione e consulenze.",
  className="my-6"
) }}

{{ card(
  image="/assets/images/matteo.avif",
  mediaPosition="right",
  imageAlt="Matteo Scandolin",
  headerText="Matteo Scandolin",
  description="Sono **Matteo Scandolin** e aiuto realtà molto grandi, agenzie di comunicazione e persone normali che vogliono realizzare il podcast dei loro sogni.",
  className="my-6"
) }}
