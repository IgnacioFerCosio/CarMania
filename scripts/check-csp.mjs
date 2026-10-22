/**
 * CHEQUEO DE CSP — que la política de `_headers` y la de `next.config.js` digan
 * lo mismo.
 *
 * Por qué existe: hay DOS copias de la CSP. La que se sirve, en local y en
 * producción, es la de `next.config.js`: `next-on-pages` compila su `headers()`
 * en la Function de Cloudflare. La de `_headers` NO se aplica (Cloudflare sólo
 * lee un `_headers` en el directorio de salida, y el build copia `/public`, no
 * la raíz; verificado en prod el 2026-10-22), pero sigue en el repo y parece
 * la oficial. El CLAUDE.md pide que estén espejadas.
 *
 * Desincronizarlas confunde justo en el peor momento: alguien edita `_headers`
 * para habilitar un dominio, cree que lo arregló, y en producción la CSP lo
 * sigue bloqueando en silencio. Sin error en consola del servidor, sin build
 * roto — el Pixel deja de reportar o un video no carga y te enterás por las
 * ventas.
 *
 * La única diferencia legítima es `'unsafe-eval'`, que el dev server necesita
 * para Fast Refresh y en producción NO va.
 *
 * Uso: node scripts/check-csp.mjs
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Una CSP es un set de directivas; el orden y los espacios no significan nada. */
function parseCsp(valor) {
  const mapa = new Map();
  for (const parte of valor.split(';')) {
    const trozos = parte.trim().split(/\s+/).filter(Boolean);
    if (!trozos.length) continue;
    const [nombre, ...fuentes] = trozos;
    mapa.set(nombre, new Set(fuentes));
  }
  return mapa;
}

function diffCsp(a, b, etiquetaA, etiquetaB) {
  const problemas = [];
  for (const nombre of new Set([...a.keys(), ...b.keys()])) {
    const fa = a.get(nombre);
    const fb = b.get(nombre);
    if (!fa) {
      problemas.push(`  ${nombre}: falta en ${etiquetaA}`);
      continue;
    }
    if (!fb) {
      problemas.push(`  ${nombre}: falta en ${etiquetaB}`);
      continue;
    }
    const soloA = [...fa].filter((x) => !fb.has(x));
    const soloB = [...fb].filter((x) => !fa.has(x));
    if (soloA.length) problemas.push(`  ${nombre}: sólo en ${etiquetaA} → ${soloA.join(' ')}`);
    if (soloB.length) problemas.push(`  ${nombre}: sólo en ${etiquetaB} → ${soloB.join(' ')}`);
  }
  return problemas;
}

// ── La espejo: _headers (no se sirve, ver arriba) ──────────────────────────
const headers = readFileSync(join(ROOT, '_headers'), 'utf8');
const mHeaders = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/m);
if (!mHeaders) {
  console.error('No encontré la Content-Security-Policy en _headers.');
  process.exit(2);
}
const cspHeaders = parseCsp(mHeaders[1]);

// ── La que se sirve: next.config.js. Se le pide con NODE_ENV=production, que
//    es como corre el build de Cloudflare y cuando el propio config decide NO
//    incluir 'unsafe-eval'.
process.env.NODE_ENV = 'production';
const require = createRequire(import.meta.url);
const nextConfig = require(join(ROOT, 'next.config.js'));
const grupos = await nextConfig.headers();
const cabecera = grupos
  .flatMap((g) => g.headers)
  .find((h) => h.key.toLowerCase() === 'content-security-policy');
if (!cabecera) {
  console.error('next.config.js no define Content-Security-Policy.');
  process.exit(2);
}
const cspProduccion = parseCsp(cabecera.value);

// ── Comparación ─────────────────────────────────────────────────────────────
const problemas = diffCsp(cspHeaders, cspProduccion, '_headers', 'next.config.js');

// Chequeo aparte: 'unsafe-eval' NUNCA puede estar en la CSP de producción.
for (const [csp, archivo] of [
  [cspProduccion, 'next.config.js (NODE_ENV=production)'],
  [cspHeaders, '_headers'],
]) {
  if ([...csp.values()].some((f) => f.has("'unsafe-eval'"))) {
    problemas.push(`  ${archivo} incluye 'unsafe-eval' — eso es sólo para el dev server.`);
  }
}

if (problemas.length) {
  console.error('Las dos CSP no coinciden:\n');
  console.error(problemas.join('\n'));
  console.error(
    '\nLa que se sirve en producción es la de next.config.js. Si el cambio era' +
      '\na propósito, replicalo en _headers. Ver CLAUDE.md → Seguridad.',
  );
  process.exit(1);
}

console.log(`OK    las dos CSP coinciden (${cspProduccion.size} directivas)`);
