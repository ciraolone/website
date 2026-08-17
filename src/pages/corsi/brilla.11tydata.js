/**
 * Fasi commerciali della pagina "Brilla su YouTube". Da qui si accende e si spegne, al momento
 * della build, tutto quello che cambia durante il lancio: gli avvisi in cima alla pagina, i conti
 * alla rovescia, il prezzo (pieno o scontato) e il pulsante di acquisto (presente, assente, con o
 * senza codice sconto). Le fasi sono quattro in fila — attesa → sconto → vendita → chiuso — e ogni
 * passaggio ha due date distinte: quella "ufficiale", che è ciò che comunichiamo e a cui puntano i
 * conti alla rovescia, e quella "sito", cioè il momento in cui la pagina cambia davvero faccia (in
 * anticipo per aprire le vendite, in ritardo per chiuderle, così nessuno resta fuori per un minuto).
 * Il sito è statico e viene ripubblicato a mano: la fase si decide al momento della build, quindi
 * finché non ricostruiamo il sito la pagina resta com'è. Da qui passa anche il pacchetto con
 * consulenza, che è una seconda offerta acquistabile solo mentre il corso è in vendita: prezzo,
 * link e "si vede / non si vede" stanno insieme a tutto il resto perché segue le stesse fasi.
 * Qui dentro stanno anche i testi degli avvisi di ogni fase (sono gli unici testi della pagina che
 * non vivono in brilla.md, perché devono comparire identici sia nel contenuto sia nel pannello di
 * acquisto): brilla.md li scorre con `brilla.fasi` e usa `brilla.mostra` per sapere quali far
 * vedere, mentre prezzo, prezzo barrato, link, nota di pagamento e avviso del pannello arrivano da
 * eleventyComputed e sovrascrivono il sidebarData scritto nel frontmatter della pagina.
 */

// Tutte le date in ora italiana: "+02:00" è l'ora legale (fine marzo → fine ottobre), "+01:00" il
// resto dell'anno. Le 24:00 di un giorno si scrivono come le 00:00 del giorno dopo.

// Date ufficiali: quelle che diciamo in giro e a cui puntano i conti alla rovescia.
const INIZIO_SCONTO_UFFICIALE = '2026-09-21T00:00:00+02:00';
const INIZIO_VENDITA_UFFICIALE = '2026-09-22T00:00:00+02:00';
const INIZIO_CHIUSO_UFFICIALE = '2026-09-28T00:00:00+02:00';

// Date del sito: quando la pagina cambia fase per davvero. Sono volutamente diverse da quelle
// ufficiali — si apre prima e si chiude dopo — per non tagliare fuori nessuno sul filo.
const INIZIO_SCONTO_SITO = '2026-09-20T21:00:00+02:00';
const INIZIO_VENDITA_SITO = '2026-09-22T06:00:00+02:00';
const INIZIO_CHIUSO_SITO = '2026-09-28T06:00:00+02:00';

// Prezzo e link di acquisto, nella versione piena e in quella scontata di 50 €. Il simbolo va
// attaccato alla cifra: nel font pixel ogni carattere è largo uguale e uno spazio si vede tanto.
const PREZZO_PIENO = '499€';
const PREZZO_SCONTATO = '449€';
const LINK_ACQUISTO = 'https://pay.hotmart.com/P97614971Q?off=9pp30lii';
const LINK_ACQUISTO_SCONTATO =
  'https://pay.hotmart.com/P97614971Q?checkoutMode=6&off=9pp30lii&offDiscount=LANCIO';

// Pacchetto con consulenza: il corso più un'ora e mezza in videochiamata con Sara e Andrea. Su
// Hotmart è una seconda offerta dello stesso prodotto, quindi ha un suo codice "off=" e un suo
// link, sia pieno sia scontato. Finché i due link qui sotto sono vuoti i pannelli della consulenza
// non compaiono affatto nella pagina: è la stessa regola del pulsante di acquisto, un pulsante che
// porta a un checkout che non esiste è peggio di nessun pulsante.
const PREZZO_CONSULENZA = '649€';
const PREZZO_CONSULENZA_SCONTATO = '599€';
const NOTA_SCONTO_CONSULENZA = '50 € di sconto, ma solo per oggi!';
const LINK_CONSULENZA = 'https://pay.hotmart.com/P97614971Q?off=mf6s7pom';
const LINK_CONSULENZA_SCONTATO =
  'https://pay.hotmart.com/P97614971Q?checkoutMode=6&off=mf6s7pom&offDiscount=SCONTOCONSULENZA';

// Nota dentro al pulsante di acquisto: sta qui e non nel frontmatter perché compare e sparisce
// insieme al checkout, nelle fasi in cui non si può comprare.
const NOTA_PAGAMENTO = 'Puoi pagare in 3 rate.';

// Quando il corso non si può comprare il pulsante non sparisce: porta alla lista d'attesa, così
// anche chi arriva fuori tempo massimo lascia un contatto invece di andarsene.
const TESTO_ACQUISTO = 'Acquista subito!';
const TESTO_LISTA_ATTESA = "Lista d'attesa";
const LINK_LISTA_ATTESA = 'https://forms.gle/vGz4DyWTzf1TDfQcA';

// Cosa dice la pagina in ogni fase. Ogni fase ha un avviso (con il suo colore) e, tranne l'ultima,
// un conto alla rovescia verso la fase successiva. Questi testi sono scritti una volta sola e
// finiscono in due posti — nel contenuto a sinistra e nel pannello di acquisto a destra — così i
// due avvisi non possono mai dire cose diverse. Sono tutti rossi per scelta: durante un lancio
// ogni avviso è un avviso, e alternare i colori li faceva sembrare di importanza diversa.
// Colori possibili: info, success, warning, error.
const FASI = {
  attesa: {
    avviso:
      'Segnati le date! Le iscrizioni a Brilla su YouTube sono aperte dal 21 al 27 settembre.',
    tipoAvviso: 'error',
    titoloCountdown: 'Le iscrizioni aprono fra:',
    scadenza: INIZIO_SCONTO_UFFICIALE,
  },
  sconto: {
    avviso:
      'Le iscrizioni sono aperte, e solo per oggi Brilla su YouTube costa 50 € in meno!',
    tipoAvviso: 'error',
    titoloCountdown: 'ATTENZIONE! Lo sconto di 50 € scade fra:',
    scadenza: INIZIO_VENDITA_UFFICIALE,
  },
  vendita: {
    avviso:
      'Le iscrizioni a Brilla su YouTube sono aperte, ma solo fino a domenica 27 settembre.',
    tipoAvviso: 'error',
    titoloCountdown: 'Attenzione! Le iscrizioni chiudono fra:',
    scadenza: INIZIO_CHIUSO_UFFICIALE,
  },
  chiuso: {
    avviso:
      'Oh no! Le iscrizioni a Brilla su YouTube sono chiuse. Seguici per sapere quando riapriranno!',
    tipoAvviso: 'error',
    titoloCountdown: '',
    scadenza: '',
  },
};

// Il conto alla rovescia verso l'apertura si vede sempre: serve a far segnare la data in calendario
// e mancano settimane. Gli altri due — la fine dello sconto e la chiusura delle iscrizioni — si
// vedono solo nelle ultime 72 ore, perché un timer che scende per giorni non mette fretta a nessuno,
// la mette solo quando la scadenza è a portata di mano. Il conto si fa al momento della build: il
// countdown della chiusura compare quindi solo se il sito viene ricostruito dentro quelle 72 ore.
const FINESTRA_COUNTDOWN_ORE = 72;

// Anteprima: scrivi qui il nome di una fase per vedere la pagina come sarà in quel momento.
// Con "debug" la pagina mostra tutti i blocchi di tutte le fasi insieme, per controllarli in
// un colpo solo. Lascia '' (stringa vuota) perché la fase si regoli da sola in base alle date.
const FASE_FORZATA = '';

const FASI_VALIDE = ['attesa', 'sconto', 'vendita', 'chiuso', 'debug'];

function faseCorrente() {
  if (FASE_FORZATA) {
    if (!FASI_VALIDE.includes(FASE_FORZATA)) {
      throw new Error(
        `brilla.11tydata.js: FASE_FORZATA "${FASE_FORZATA}" non esiste. Valori possibili: ${FASI_VALIDE.join(', ')}.`,
      );
    }
    console.warn(
      `[brilla] FASE_FORZATA attiva: la pagina è bloccata sulla fase "${FASE_FORZATA}".`,
    );
    return FASE_FORZATA;
  }

  const adesso = Date.now();

  if (adesso < Date.parse(INIZIO_SCONTO_SITO)) {
    return 'attesa';
  }
  if (adesso < Date.parse(INIZIO_VENDITA_SITO)) {
    return 'sconto';
  }
  if (adesso < Date.parse(INIZIO_CHIUSO_SITO)) {
    return 'vendita';
  }

  return 'chiuso';
}

const fase = faseCorrente();
const isDebug = fase === 'debug';

// In debug tutti i blocchi sono accesi insieme, così si vedono in una sola pagina.
const mostra = {
  attesa: isDebug || fase === 'attesa',
  sconto: isDebug || fase === 'sconto',
  vendita: isDebug || fase === 'vendita',
  chiuso: isDebug || fase === 'chiuso',
};

const isScontoAttivo = isDebug || fase === 'sconto';
const siPuoComprare = isDebug || fase === 'sconto' || fase === 'vendita';

// Svuota la scadenza delle fasi il cui conto alla rovescia non è ancora ora di mostrare: la pagina
// e il pannello disegnano il countdown solo dove la scadenza c'è, quindi basta togliere quella.
// Quando si sta guardando un'anteprima con FASE_FORZATA i countdown si vedono comunque, sennò non
// ci sarebbe modo di controllarli mesi prima del lancio.
function scadenzaVisibile(nome, scadenza) {
  if (!scadenza || nome === 'attesa' || FASE_FORZATA) {
    return scadenza;
  }

  const oreDaAspettare = (Date.parse(scadenza) - Date.now()) / (60 * 60 * 1000);
  return oreDaAspettare <= FINESTRA_COUNTDOWN_ORE ? scadenza : '';
}

const fasi = Object.fromEntries(
  Object.entries(FASI).map(([nome, dati]) => [
    nome,
    { ...dati, scadenza: scadenzaVisibile(nome, dati.scadenza) },
  ]),
);

// Avviso e conto alla rovescia del pannello di acquisto: sono gli stessi della fase in corso, così
// destra e sinistra dicono sempre la stessa cosa. In debug il pannello fa vedere la fase sconto,
// che è quella con dentro più roba (prezzo barrato, link scontato).
const datiDelPannello = fasi[isDebug ? 'sconto' : fase];

// Il pacchetto con consulenza si racconta già in fase di attesa — è una cosa in più da sapere prima
// che apriamo — ma prezzo, pulsante e note compaiono solo quando lo si può prendere per davvero,
// e il richiamo breve in mezzo alla pagina, che serve solo a portare al checkout, compare con loro.
// A iscrizioni chiuse il pacchetto sparisce del tutto: era l'extra di quest'anno, tenerlo in pagina
// dopo la chiusura significherebbe soltanto far venire voglia di una cosa che non c'è più.
const linkConsulenza = isScontoAttivo
  ? LINK_CONSULENZA_SCONTATO
  : LINK_CONSULENZA;
const prezzoConsulenza = isScontoAttivo
  ? PREZZO_CONSULENZA_SCONTATO
  : PREZZO_CONSULENZA;
const siVendeConsulenza = siPuoComprare && linkConsulenza !== '';
const consulenza = {
  mostra: fase !== 'chiuso',
  siVende: siVendeConsulenza,
  prezzo: siVendeConsulenza ? prezzoConsulenza : '',
  prezzoBarrato: siVendeConsulenza && isScontoAttivo ? PREZZO_CONSULENZA : '',
  link: siVendeConsulenza ? linkConsulenza : '',
  notaPagamento: siVendeConsulenza ? NOTA_PAGAMENTO : '',
  notaSconto: siVendeConsulenza && isScontoAttivo ? NOTA_SCONTO_CONSULENZA : '',
};

module.exports = {
  brilla: {
    fase: fase,
    isDebug: isDebug,
    mostra: mostra,
    fasi: fasi,
    consulenza: consulenza,
  },

  eleventyComputed: {
    sidebarData: {
      // A iscrizioni chiuse il prezzo sparisce: mostrare quanto costava una cosa che non si può
      // più prendere non serve a niente e fa sembrare la pagina vecchia.
      price: () => {
        if (fase === 'chiuso') {
          return '';
        }
        return isScontoAttivo ? PREZZO_SCONTATO : PREZZO_PIENO;
      },

      oldPrice: () => (isScontoAttivo ? PREZZO_PIENO : ''),

      // Nelle fasi in cui non si compra il pulsante non porta a un checkout chiuso: porta alla
      // lista d'attesa.
      ctaText: () => (siPuoComprare ? TESTO_ACQUISTO : TESTO_LISTA_ATTESA),

      ctaUrl: () => {
        if (!siPuoComprare) {
          return LINK_LISTA_ATTESA;
        }
        return isScontoAttivo ? LINK_ACQUISTO_SCONTATO : LINK_ACQUISTO;
      },

      paymentNote: () => (siPuoComprare ? NOTA_PAGAMENTO : ''),
      urgencyNote: () => datiDelPannello.avviso,
      urgencyVariant: () => datiDelPannello.tipoAvviso,
      countdownDeadline: () => datiDelPannello.scadenza,
    },
  },
};
