# Backlog

- **WATCH CSS** — In sviluppo (`npm run dev`) nodemon guarda solo `src/assets/css/main.css`, quindi quando si aggiungono classi Tailwind nuove dentro un template `.njk` o `.md` il CSS non viene ricompilato e le classi non hanno effetto: sembra un bug di layout ma è solo il CSS vecchio. Per ora si rimedia lanciando a mano `npm run build:css`. Da valutare: far guardare a nodemon anche `src/**/*.njk` e `src/**/*.md`.
