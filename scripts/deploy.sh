#!/usr/bin/env bash
# Ripubblica il sito su Cloudflare Pages. Il sito è statico e la pagina /brilla decide da sé, nel
# momento in cui viene costruita, in che fase del lancio si trova (attesa, sconto, vendita, chiuso)
# guardando l'orologio: per farla cambiare faccia non c'è niente da modificare, basta che Cloudflare
# la ricostruisca. Cloudflare ricostruisce a ogni push su GitHub, quindi qui ci si allinea al remoto
# — l'automazione dei video pubblica commit da sola e senza pull il push verrebbe rifiutato — e si
# manda un commit vuoto, che è il modo di dire "ricostruisci" senza cambiare una riga di sito. Lo
# lancia Andrea a mano quando serve e il cron ai passaggi di fase del lancio; tutto quello che
# succede finisce in ~/.local/state/website-deploy.log, dove stanno i log degli altri lavori
# automatici di questa macchina.
#
# Uso: scripts/deploy.sh ["messaggio del commit"]

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG="$HOME/.local/state/website-deploy.log"
MESSAGGIO="${1:-site: update ricostruzione del sito}"

cd "$REPO"

{
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') — $MESSAGGIO"
  git pull --rebase
  git commit --allow-empty -m "$MESSAGGIO"
  git push
  echo "--- fatto: Cloudflare ricostruisce da sé, ci vogliono un paio di minuti"
} >>"$LOG" 2>&1
