#!/usr/bin/env bash
# VERIFICACIÓN COMPLETA — lo que hay que correr antes de dar algo por bueno.
#
#   npm test
#
# Corre, en orden y cortando al primer fallo:
#   1. tsc            — tipos
#   2. check:assets   — que exista todo lo que el código pide de /public
#   3. check:csp      — que las dos copias de la CSP digan lo mismo
#   4. build          — que compile de verdad
#   5. gate           — que ninguna página haya cambiado sin querer
#
# Buildea en `.next-verify` y no en `.next` para no corromperle el cache al
# `next dev` que esté corriendo (ver `distDir` en next.config.js). Por eso es
# un .sh: en Windows los scripts de npm corren por cmd.exe, que no entiende
# `VAR=valor comando`.
#
# Efecto secundario que hay que limpiar: `next build` reescribe tsconfig.json
# para meterle "<distDir>/types/**/*.ts" al include, y de paso reformatea el
# archivo. Eso no va al repo, así que se restaura al terminar.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

export NEXT_BUILD_DIR="${NEXT_BUILD_DIR:-.next-verify}"

paso() { printf '\n\033[1m── %s\033[0m\n' "$1"; }

paso "1/5  tipos"
npx tsc --noEmit
echo "OK    tsc"

paso "2/5  assets"
node scripts/check-assets.mjs

paso "3/5  CSP"
node scripts/check-csp.mjs

paso "4/5  build"
npm run build >/dev/null
git checkout -- tsconfig.json 2>/dev/null || true
echo "OK    build ($NEXT_BUILD_DIR)"

paso "5/5  prerender"
bash scripts/prerender-gate.sh

printf '\n\033[1mTodo verde.\033[0m\n'
