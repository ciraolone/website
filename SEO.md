## Architettura Dati e Metadati

[ ] Configurare Title e Description dinamici nel layout Implementare un layout (es. base.njk) che popoli il tag <title> e il meta description usando le variabili del Front Matter. Prevedere un fallback per la descrizione troncando il contenuto se non specificata manualmente.

[ ] Inserire il Canonical URL in tutte le pagine Aggiungere il tag <link rel="canonical"> nell'head puntando all'URL assoluto della pagina corrente. Questo previene problemi di contenuto duplicato, specialmente se i parametri URL variano.

[ ] Generare immagini Open Graph (OG) al build time Utilizzare plugin come eleventy-plugin-og-image per creare automaticamente le immagini di anteprima per i social network basate sul titolo del post. Migliora il CTR sulle condivisioni social.

[ ] Implementare i Dati Strutturati JSON-LD Inserire blocchi script application/ld+json nei template. Usare lo schema Person per la home page e Article o TechArticle per i singoli post, popolando i campi dinamicamente (headline, author, datePublished).

## Performance e Core Web Vitals

[ ] Utilizzare eleventy-img per la conversione degli asset Sostituire i tag <img> standard con shortcode che utilizzano eleventy-img. Generare formati moderni (AVIF, WebP) e fornire markup <picture> con srcset per il responsive loading.

[ ] Impostare dimensioni esplicite per le immagini Assicurarsi che ogni immagine abbia attributi width e height nel markup HTML finale. Questo permette al browser di riservare lo spazio prima del caricamento, azzerando il Cumulative Layout Shift (CLS).

[ ] Minificare l'HTML in produzione Aggiungere una trasformazione (transform) nel file di configurazione .eleventy.js per usare html-minifier. Rimuovere spazi bianchi, commenti e ritorni a capo inutili per ridurre il peso del payload HTML.

[ ] Inlinare il CSS Critico (Above the Fold) Estrarre e inserire direttamente nell'head (tag <style>) il CSS necessario al rendering della parte visibile della pagina. Caricare il resto del CSS in modo asincrono per migliorare il First Contentful Paint (FCP).

[ ] Configurare il caricamento dei font Ospitare i file font localmente (formato WOFF2) e utilizzare la proprietà CSS font-display: swap. Questo evita il testo invisibile (FOIT) durante il download del font, migliorando la UX e le metriche di velocità.

## Configurazione Cloudflare Pages

[ ] Creare il file \_headers per la cache Aggiungere un file \_headers nella root della build. Impostare Cache-Control: public, max-age=31536000, immutable per la cartella degli asset statici e una cache breve o nulla per i file HTML per garantire aggiornamenti rapidi.

[ ] Impostare Security Headers nel file \_headers Configurare header di sicurezza come X-Content-Type-Options: nosniff, X-Frame-Options: DENY e Content-Security-Policy (CSP) per proteggere il sito e segnalare affidabilità ai motori di ricerca.

[ ] Gestire i redirect tramite \_redirects Utilizzare il file \_redirects di Cloudflare per gestire i codici 301 lato edge. È preferibile rispetto ai meta refresh o ai redirect JS perché avviene prima che la richiesta raggiunga il browser.

[ ] Abilitare HTTP/3 e QUIC Verificare nella dashboard di Cloudflare che il supporto a HTTP/3 e QUIC sia attivo. Questo protocollo riduce drasticamente la latenza di connessione, specialmente su reti mobili instabili.

## Struttura e Indicizzazione

[ ] Verificare la gerarchia degli Heading (H1-H6) Controllare che ogni pagina abbia un unico h1 e che i sottotitoli (h2, h3) seguano un ordine sequenziale logico senza salti di livello. Essenziale per l'accessibilità e la comprensione della struttura da parte dei crawler.

[ ] Usare tag HTML Semantici Strutturare i layout utilizzando <main>, <article>, <nav>, <aside> e <footer> invece di div generici. Fornisce contesto semantico immediato agli user agent e alle tecnologie assistive.

[ ] Generare automaticamente la Sitemap XML Configurare un plugin o un template dedicato per generare sitemap.xml a ogni build, includendo tutte le pagine della collection all ed escludendo pagine di servizio o utility (es. 404).

[ ] Creare il file robots.txt Inserire un file robots.txt nella root che permetta l'accesso ai bot (User-agent: \*, Allow: /) e indichi la posizione assoluta della sitemap XML.

[ ] Standardizzare i Trailing Slashes Decidere se usare URL con o senza slash finale (es. /post/ vs /post) e configurare Eleventy e i link interni per mantenere coerenza assoluta, evitando catene di redirect e segnali misti ai motori di ricerca.

## Il 5% Tecnico Mancante

[ ] Pagina 404 Custom (404.html) Cloudflare Pages cerca automaticamente un file 404.html nella root. Deve esistere e fornire link utili per riportare l'utente in carreggiata. Senza di questa, un errore genera una pagina bianca o generica, aumentando il Bounce Rate.

[ ] Feed RSS/Atom Per un blog tecnico è fondamentale. Google usa i feed per scoprire nuovi contenuti rapidamente. Con Eleventy si usa eleventy-plugin-rss. Il link al feed va inserito nell'head (<link rel="alternate" type="application/rss+xml" ...>).

[ ] Controllo Link Rotti in Build Un sito statico non dovrebbe mai avere link interni rotti. Integrare un tool come html-proofer o script custom nella pipeline di build per bloccare il deploy se ci sono 404 interni.

[ ] Analytics Privacy-Friendly Senza misurazione non c'è ottimizzazione. Installa una soluzione leggera (es. Plausible, Fathom o Cloudflare Web Analytics) che non impatti i Core Web Vitals come farebbe un vecchio tag di Google Analytics mal configurato.

[ ] Attributi rel="noopener noreferrer" sui link esterni Assicurarsi (manualmente o via plugin markdown) che i link che aprono in nuove schede (target="\_blank") abbiano questi attributi per sicurezza e performance.
