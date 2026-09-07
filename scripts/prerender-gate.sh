#!/usr/bin/env bash
# GATE DE PRERENDER — la red de seguridad contra romper una página sin querer.
#
# Compara el HTML que Next prerenderiza para cada ruta contra un baseline
# guardado en el repo. Diff vacío = esa página quedó igual.
#
# Sirve para lo que ningún type-check ni lint ve: cambiar un componente
# compartido y alterar sin querer una página que no estabas tocando. En esta
# base pasó varias veces — tocar el Navbar, la config o el CartProvider mueve
# las cuatro rutas a la vez.
#
# ── Cómo se usa ────────────────────────────────────────────────────────────
#   npm run gate            compara y devuelve OK/DIFF por página (exit 1 si hay diff)
#   npm run gate:capture    re-captura el baseline
#
# Un DIFF NO es necesariamente un error: si el cambio era a propósito,
# mirás el diff, confirmás que es lo que querías, y recapturás. Lo que el gate
# evita es que un cambio se cuele SIN que nadie lo haya mirado.
#
# ── Qué normaliza y por qué ────────────────────────────────────────────────
# El HTML de Next trae ruido que cambia en cada build sin que cambie nada real:
#   - un tag por línea (viene minificado en una sola, así diff da contexto útil
#     en vez de "binary files differ")
#   - las URLs de /_next/static/... (llevan hash de build)
#   - las refs `static/chunks/<name>-<hash>.js` del payload RSC y las listas de
#     chunks de cada client-reference (`I[<id>,[<chunks>],"Nombre"]` → `I[NORM,"Nombre"]`).
#     El chunk-graph es plumbing de webpack: se mueve al reordenar un módulo o
#     al sumar una ruta que comparte los mismos `'use client'`. Se conserva el
#     NOMBRE del componente, así que "se agregó o sacó un client component"
#     SÍ aparece en el diff — que es justo lo que interesa vigilar.
#   - el hash de la clase de fuente (__variable_xxxx)
#   - el buildId (aleatorio por build)
#
# El <body> renderizado y el árbol de contenido del payload se comparan enteros.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

BASE="tests/baseline"
# Misma carpeta que el build de verificación, para no pisar el .next que tenga
# levantado un dev server. Ver `distDir` en next.config.js.
DIST="${NEXT_BUILD_DIR:-.next}"
# Las rutas prerenderizadas. Si agregás una landing, sumala acá.
ROUTES=(index tienda parasol soplador)
mode="${1:-check}"

if [ ! -d "$DIST/server/app" ]; then
  echo "No encuentro $DIST/server/app — corré el build primero." >&2
  exit 2
fi

norm() {
  sed -E \
    -e 's#"\]\)</script><script>self\.__next_f\.push\(\[1,"##g' \
    -e 's#(/_next/)?static/(chunks|css|media)/[^"'"'"'\\ ]*#static/\2/NORM#g' \
    -e 's#-[0-9a-f]{8,}\.js#-NORM.js#g' \
    -e 's#I\[[0-9]+,\[[^]]*\],#I[NORM,#g' \
    -e 's#__(variable|className)_[A-Za-z0-9]+#__\1_NORM#g' \
    -e 's#(\\?"buildId\\?":\\?")[^"\\]+#\1NORM#g' \
    -e 's#><#>\n<#g' \
    "$1" \
  | grep -vxE '<script src="static/chunks/NORM"( (async|defer|nomodule)="")*>' \
  | grep -vxE '</script>'
}

if [ "$mode" = "capture" ]; then
  mkdir -p "$BASE"
  for f in "${ROUTES[@]}"; do
    norm "$DIST/server/app/$f.html" > "$BASE/$f.html"
    echo "capturado  $f"
  done
  exit 0
fi

rc=0
for f in "${ROUTES[@]}"; do
  norm "$DIST/server/app/$f.html" > "/tmp/gate-$f.html"
  if diff -q "$BASE/$f.html" "/tmp/gate-$f.html" >/dev/null; then
    echo "OK    $f"
  else
    echo "DIFF  $f    → diff $BASE/$f.html /tmp/gate-$f.html"
    rc=1
  fi
done

if [ $rc -ne 0 ]; then
  echo ""
  echo "Alguna página cambió. Si era a propósito: mirá el diff y después"
  echo "corré 'npm run gate:capture' para aceptar el nuevo estado."
fi
exit $rc
