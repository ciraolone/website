---
layout: base.njk
title: 'Brilla su YouTube'
description: 'Il corso super-accelerato per fare sul serio su YouTube, con Andrea Ciraolo e Sara Trecate: 18 lezioni, 4 lezioni in diretta e un gruppo riservato.'
hero:
  title: 'Brilla su YouTube'
  subtitle: 'Il corso super-accelerato per fare sul serio, con Andrea Ciraolo e Sara Trecate.'
  image: '/assets/images/brilla.png'
  tagline: 'I tuoi due esperti preferiti, ancora insieme.'
sidebarData:
  # Prezzo, prezzo barrato, testo e link del pulsante, nota sul pagamento e avviso NON si scrivono
  # qui: cambiano da soli a seconda della fase del lancio e stanno tutti in brilla.11tydata.js, il
  # file accanto a questo. L'avviso in particolare è lo stesso che compare nel contenuto qui a
  # fianco: si scrive una volta sola, di là.
  # Una lista sola, dal cuore del corso ai contorni, e in fondo il "per sempre" che è l'argomento
  # più forte: prima si dice cosa si riceve, poi che non scade mai.
  features:
    - '18 lezioni sui fondamentali'
    - '4 lezioni extra di approfondimento, in diretta'
    - '4 sessioni di Q&A'
    - '2 meeting di gruppo con noi'
    - 'Accesso per sempre al gruppo riservato'
    - 'Risorse e template indispensabili'
    - 'Certificato di partecipazione'
    - 'Bonus in regalo per oltre 350 €'
    - 'Tutto il materiale è tuo per sempre, anche le lezioni delle prossime edizioni'
---

{% from "components/alert.njk" import alert %}
{% from "components/card.njk" import card %}
{% from "components/cardGrid.njk" import cardGrid %}
{% from "components/countdown.njk" import countdown %}

{# Gli avvisi qui sotto si accendono e si spengono da soli in base alla fase del lancio, decisa
dalle date scritte in brilla.11tydata.js: quello che non è della fase in corso non finisce
nemmeno nella pagina pubblicata, e ogni avviso porta con sé il suo conto alla rovescia. Per
vedere l'anteprima di una fase diversa da quella di oggi — o tutte insieme, con FASE_FORZATA =
"debug" — si usa FASE_FORZATA in quel file.

Il blocco si vede solo da lg in su: sul telefono avviso e conto alla rovescia stanno soltanto
nella barra fissa in basso, in versione compressa. Ripeterli anche qui vorrebbe dire due volte
la stessa cosa su uno schermo che di spazio non ne ha.

I trattini nei tag ({%- -%}) servono a non lasciare righe vuote dentro il div: una riga vuota qui
dentro e markdown si mangerebbe l'HTML, riempiendolo di <p> e <br> (vedi il commento in
components/countdown.njk). #}

<div class="hidden lg:block" data-avvisi-principali>
{%- for nome, dati in brilla.fasi -%}
{%- if brilla.mostra[nome] -%}
{{ alert(dati.avviso, variant=dati.tipoAvviso) }}
{%- if dati.scadenza -%}
{{ countdown(dati.scadenza, title=dati.titoloCountdown) }}
{%- endif -%}
{%- endif -%}
{%- endfor -%}
</div>

**Stare su YouTube è un gran casino eh?** E se ti dicessimo che i tuoi due punti di riferimento per crescere su YouTube hanno fatto una combo e si sono riuniti per aiutarti ad acquisire in tempo record la sicurezza e competenza che ti servono per far brillare il tuo progetto?

Proprio noi - **Andrea Ciraolo** e **Sara Trecate** - saremo i tuoi tutor per i prossimi 30 giorni in un percorso di formazione ricco di lezioni, momenti di confronto e risorse riservate.

Non sarai più solo: sarai accompagnato nel tuo viaggio su YouTube se non dai migliori, quantomeno dai più simpatici. 😝

## Questo corso fa per te se...

{% call cardGrid() %}
{{ card(
  logoEmoji="🌱",
  title="Parti da zero",
  description="Hai una grande idea per il tuo canale, ma non sai da dove cominciare."
) }}
{{ card(
  logoEmoji="🤝",
  title="Ti senti solo",
  description="Troppe cose da fare e da imparare. Solo altri creator come te possono capirti."
) }}
{{ card(
  logoEmoji="📈",
  title="Vuoi di più",
  description="Nonostante gli sforzi, il contatore delle visualizzazioni piange."
) }}
{{ card(
  logo="/assets/images/icons/youtube-no.avif",
  imageAlt="Non hai ancora un canale",
  title="Non hai ancora un canale",
  description="Questo corso fa per te: ti aiuteremo a crearlo senza fare cavolate."
) }}
{{ card(
  logo="/assets/images/icons/youtube-si.avif",
  imageAlt="Hai già il tuo canale",
  title="Hai già il tuo canale",
  description="Questo corso fa per te: ti aiuteremo ad ottimizzarlo per la sua crescita."
) }}
{% endcall %}

{# Richiamo breve al pacchetto con consulenza: sta qui, subito dopo che il lettore si è riconosciuto
in uno dei casi qui sopra, e non nell'apertura — prima che si sappia cos'è il corso una seconda
offerta è solo una distrazione. Non spiega niente: il pulsante porta al pannello lungo in fondo alla
pagina (l'ancora #consulenza), che è l'unico posto dove si compra. Esiste solo per accompagnare al
checkout, quindi compare solo quando il pacchetto si può prendere per davvero — non in attesa, dove
il pannello in fondo si racconta da sé: la regola sta in brilla.11tydata.js. #}

{% if brilla.consulenza.siVende %}
{{ card(
  title="Vuoi anche una consulenza?",
  description="Volendo, solo quest'anno c'è un pacchetto che aggiunge al corso **un'ora e mezza di videochiamata con noi**, tutta dedicata al tuo canale.",
  buttonText="Scopri il pacchetto",
  buttonUrl="#consulenza",
  className="my-8"
) }}
{% endif %}

## Cosa c'è qui dentro?

Questo è il corso accelerato più denso che troverai in giro. Vogliamo darti più valore possibile e farti ottenere il massimo dai tuoi prossimi 30 giorni.

In questa terza edizione troverai il percorso completo che abbiamo registrato e che ti consentirà di sapere tutto, ma proprio tutto, quello che serve per cominciare con il piede giusto. Ma non solo! Abbiamo pensato 4 ulteriori lezioni in diretta per fare l'upgrade definitivo.

Ecco l'elenco completo di cosa è incluso nella tua iscrizione.

**18 Lezioni da seguire quando vuoi.** Avrai subito disponibili 18 lezioni di oltre 1 ora, dove affronteremo i concetti più importanti che ti servono per ottenere risultati su YouTube. Questo è il percorso che abbiamo realizzato durante le prime edizioni e contiene tutta l'esperienza che abbiamo accumulato in questi tanti anni di YouTube. Più sotto trovi il programma dettagliato.

**4 Lezioni da seguire in diretta.** Dal monetizzare con le pubblicità di YouTube all'automatizzare il lavoro, dalle collaborazioni all'estetica del canale, abbiamo pensato a 4 argomenti caldi e fondamentali su cui fare un approfondimento. Ogni settimana per 30 giorni parteciperai ad una lezione di 1 ora in diretta. Se non riesci ad esserci, puoi guardare la registrazione quando vuoi. Guarda il programma più sotto!

**4 Sessioni di Domande & Risposte.** Al termine di ogni lezione siamo a disposizione per rispondere alle tue domande sull'argomento trattato.

**Gruppo riservato.** Farai parte di un gruppo privato all'interno del quale confrontarti con altri creator nella tua stessa situazione, condividere le tue idee o preoccupazioni e ricevere da tutti i partecipanti (noi compresi) feedback, suggerimenti e supporto. Nel gruppo troverai anche gli oltre 100 partecipanti per poterti confrontare con chi è più avanti in questo percorso. Ovviamente vale anche per te: sarai nel gruppo anche nelle prossime edizioni a fare da guida ai nuovi iscritti!

**2 Meeting di gruppo.** In aggiunta alle lezioni, due appuntamenti extra durante il percorso: ci incontriamo tutti insieme in videoconferenza per chiacchierare, fare il punto e condividere i progressi. Siamo a tua disposizione per rispondere a dubbi e perplessità.

**Risorse indispensabili.** Gli elenchi completi di programmi e attrezzatura, ma anche i template, le checklist e le risorse che usiamo davvero per noi e per i nostri clienti per gestire la programmazione, realizzazione e pubblicazione dei contenuti. Riceverai anche il certificato di partecipazione!

**Tanti - ma proprio tanti - bonus.** Corsi, libri, video... visto che ti vogliamo già bene, più sotto in questa pagina troverai l'elenco dei regali che abbiamo riservato per te.

## Sara e Andrea la combo perfetta

{{ card(
  image="/assets/images/andrea_sara_01.avif",
  imageAlt="Andrea e Sara"
) }}

Una è precisa, chirurgica e infallibile. L'altro è casinista, creativo ed efficace. Abbiamo tanti valori in comune, ma modi moooolto diversi per realizzarli. 😅

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

**Sara** crea contenuti e gestisce canali YouTube - i suoi e quelli degli altri - dal 2016, ed è una maga dell'organizzazione: da quando ha lanciato il suo canale (i suoi due canali!) pubblica un video alla settimana. Sempre allo stesso giorno, sempre alla stessa ora. È in grado di comprendere le dinamiche e i trend della piattaforma come pochi e definisce il suo calendario editoriale con assoluta consapevolezza. Se ti serve una strategia a prova di errore, è lei che stai cercando.

**Andrea** alterna settimane in cui pubblica un (lungo) video al giorno ad altre in cui va in letargo. Ha oltre 200.000 iscritti e pensa ancora di averli imbrogliati tutti, e nel frattempo aiuta professionisti e aziende a crescere online con corsi, formazione e consulenze. La maggior parte delle cose che fa falliscono, ma ne fa così tante che in mezzo è facile trovare qualche successo. Se vuoi dare una bella spallata al tuo progetto, ti serve proprio lui.

</div>

In coppia diventiamo lo Youtuber perfetto ed è per questo che abbiamo voluto realizzare questo percorso insieme!

## Il percorso fondamentale

Il percorso fondamentale comprende le 18 lezioni tenute da noi su tutti i concetti più importanti che servono per ottenere risultati su YouTube. Questo è il programma dettagliato.

1. Come creare e ottimizzare il tuo canale
2. Come caricare correttamente i tuoi video
3. Personal Branding: trovare l’identità del tuo canale
4. Le strategie per fare dei video che vadano bene
5. Video, audio e non solo: tutta l’attrezzatura che ti serve
6. Video editing di base per content creator
7. Scrivere e interpretare bene i tuoi video
8. Come realizzare titoli e miniature che facciano cliccare
9. I segreti dell’algoritmo e delle statistiche
10. Gli short e il riutilizzo di contenuti su Instagram e TikTok
11. E tutto il resto? Dirette, podcast, playlist e post
12. Come riunire una solida community attorno a te
13. 10 modi per guadagnare con YouTube
14. Partita IVA per content creator - il punto del commercialista
15. Consigli molto pratici per aumentare le views
16. Intelligenza Artificiale per content creator professionisti
17. Come trovare e gestire gli sponsor (e farsi pagare di più!)
18. Come gestire le critiche, gli hater e la paura del giudizio

## 4 lezioni per fare l'upgrade

Abbiamo pensato ad altri 4 argomenti caldi e fondamentali su cui fare un approfondimento: 4 lezioni bonus a cui puoi partecipare in diretta facendo le tue domande o che puoi guardare registrate subito dopo, quando vuoi. Eccole qui.

19. Monetizzare con le pubblicità di YouTube (il programma partner)
20. Automazioni per content creator: fare di più in meno tempo
21. Fare collaborazioni e interviste in modo strategico
22. Estetica del canale, del brand e set design

{# Questa sezione risponde alla domanda di chi sta con la carta in mano: cosa arriva, quando, e cosa
resta dopo. Le date dell'edizione non sono scritte qui di proposito: stanno nel documento
riepilogativo su Drive (edizione 03: lezioni il 5, 12, 19 e 26 ottobre, meeting il 13 e 27) e
l'orario non è ancora deciso. Se un giorno si decide di pubblicarle, vanno aggiornate a ogni
edizione insieme alle date di brilla.11tydata.js. #}

## Cosa succede quando ti iscrivi

📩 Ricevi la mail con l'accesso all'area riservata e l'invito al gruppo.
▶️ Le 18 lezioni del percorso fondamentale sono già lì, complete, da guardare quando vuoi.
📅 Ricevi il calendario con gli appuntamenti in diretta (non ti preoccupare, se non puoi partecipare guardi la registrazione).
👥 Entri nel gruppo riservato, dove ci sono anche i partecipanti delle edizioni precedenti.
🎁 I bonus sono tuoi immediatamente, insieme a tutto il resto del materiale.

**E quando il corso finisce?** Resta tutto tuo. Le lezioni, le risorse e i template non scadono, il gruppo riservato rimane aperto e continuerai a ricevere anche il materiale delle prossime edizioni, senza pagare più niente.

## Cosa otterrai con questo corso

💡 La tua presenza su YouTube sarà brillante, come meriti.
💡 Conoscerai le tecniche per aumentare views e iscritti.
💡 Avrai finalmente chiara la strada da percorrere per il raggiungimento dei tuoi obiettivi.
💡 Saprai gestire il tuo canale senza fare le solite cavolate.
💡 Avrai messo su lo studio di registrazione giusto per le tue reali necessità.
💡 Farai più video in meno tempo.
💡 Imparerai come muoverti agilmente e non ti farai sopraffare da YouTube.
💡 Avrai coltivato buone relazioni (e possibili collaborazioni) con content creator simili a te.

## I bonus in regalo

Iscrivendoti a Brilla su YouTube avrai accesso gratuito e illimitato a tutti questi bonus!

{# I due libri di Sara si chiamano "Kit di Sopravvivenza su Youtube" e "Guadagna subito con Youtube":
il "t" minuscolo sta anche sul suo sito, sono titoli di prodotti e vanno lasciati così. Fuori dai
titoli, sulla pagina la piattaforma si scrive sempre "YouTube". #}

🎁 Il corso di Andrea "**Sblocca il Content Creator che è in te!**" per sbloccare il tuo vero potenziale prima ancora di cominciare. (**Vale 19,00 €**)
🎁 Il corso di Andrea "**OBS Studio per video e live streaming professionali**" per usare alla grande il più famoso programma per registrare video e andare in diretta. (**Vale 199,00 €**)
🎁 Il libro di Sara "**Kit di Sopravvivenza su Youtube**", una collezione di risorse per migliorare il tuo canale YouTube adesso. Uno strumento indispensabile per tutti gli youtuber. (**Vale 49,99 €**)
🎁 Il libro di Sara "**Guadagna subito con Youtube**", una irripetibile risorsa per iniziare subito a guadagnare su YouTube senza dover attendere i requisiti di monetizzazione. (**Vale 69,99 €**)
🎁 3 animazioni (**pulsante "iscriviti"**, **"clicca la campanella"** e **"lascia un like"**) e 1 filigrana per i tuoi video dal sito di Sara - [creatoridicontenuti.it](https://creatoridicontenuti.it) - aumenta le interazioni sui tuoi video in modo professionale (**Vale 14,98 €**)

{# Il titolo della card è in font pixel, dove ogni carattere è largo uguale: qui il simbolo dell'euro
sta attaccato alla cifra come nel pannello di acquisto, mentre nel testo normale della pagina è
staccato. #}

{{ card(title="~~352,96~~€ 👉 0€", description="Non so se ti rendi conto! 😱", textAlign="center", className="max-w-sm mx-auto") }}

{# Pannello lungo del pacchetto con consulenza: è il bersaglio del pulsante in alto (id
"consulenza") ed è l'unico punto della pagina da cui si arriva al suo checkout. scroll-mt-8 serve
a non incollare il pannello al bordo superiore quando lo scroll ci arriva. Prezzo, barrato, nota
sulle rate e nota sullo sconto arrivano da brilla.11tydata.js e cambiano con la fase: la card li
dispone come la barra di acquisto su mobile, prezzo in pixel accanto al pulsante. Prima
dell'apertura arrivano tutti vuoti e resta solo il racconto del pacchetto, senza niente da
cliccare; a iscrizioni chiuse il pannello non c'è affatto. #}

{% if brilla.consulenza.mostra %}

## Il pacchetto consulenza

<div id="consulenza" class="scroll-mt-8">
{{ card(
  image="/assets/images/andrea_sara_consulenza.jpg",
  imageAlt="Andrea e Sara",
  title="1 ora e mezza di videochiamata con noi!",
  description="Il corso ti dà tutto quello che serve, ma se vuoi che guardiamo il **tuo** canale, da soli insieme a te, c'è questo pacchetto: un'ora e mezza in videochiamata con noi due tutta dedicata al tuo progetto. Ci racconti dove sei e dove vuoi arrivare, facciamo il punto assieme e ne usciamo con una bella lista di cose concrete da fare.",
  buttonText="Prendilo!",
  buttonUrl=brilla.consulenza.link,
  price=brilla.consulenza.prezzo,
  oldPrice=brilla.consulenza.prezzoBarrato,
  paymentNote=brilla.consulenza.notaPagamento,
  discountNote=brilla.consulenza.notaSconto,
  className="my-8"
) }}
</div>
{% endif %}
