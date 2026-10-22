/**
 * CHEQUEO DE _routes.json — qué requests pasan por la Function de Cloudflare.
 *
 * Cloudflare Pages cobra (y limita: 100.000/día en el plan gratis) cada
 * request que entra al `_worker.js` que genera next-on-pages. Sin
 * `_routes.json`, entra TODO salvo `/_next/static/*`: cada logo, foto y video
 * de /public cuenta, y una visita a / suma ~35 requests. Con las carpetas de
 * /public excluidas, Pages las sirve directo como estáticos (gratis, sin
 * límite y un poco más rápido).
 *
 * next-on-pages lee este archivo de la raíz del repo y le agrega
 * `/_next/static/*` al build.
 *
 * Verifica dos cosas:
 *   1. Que todo lo que está en /public quede cubierto por algún exclude.
 *      Si agregás una carpeta nueva y no la sumás, no se rompe nada: sólo
 *      vuelve a pasar por la Function y a contar. Por eso falla acá.
 *   2. Que ningún exclude tape una página (/, /parasol, /tienda, /soplador)
 *      ni las imágenes optimizadas (/_next/image), que SÍ las resuelve la
 *      Function. Excluir eso las rompe en producción.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const routes = JSON.parse(readFileSync(join(ROOT, '_routes.json'), 'utf8'));
const exclude = routes.exclude ?? [];

// Mismo matching que Cloudflare: `*` matchea cualquier cosa, incluidas barras.
const toRegex = (rule) =>
  new RegExp('^' + rule.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
const rules = exclude.map(toRegex);
const excluded = (path) => rules.some((r) => r.test(path));

const problemas = [];

// 1. Todo /public cubierto.
const walk = (dir) =>
  readdirSync(dir).filter((n) => !n.startsWith('.')).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
const publicDir = join(ROOT, 'public');
for (const file of walk(publicDir)) {
  const url = '/' + relative(publicDir, file).split(sep).join('/');
  if (!excluded(url)) problemas.push(`  /public sin excluir: ${url}`);
}

// 2. Páginas y optimizador fuera de los excludes.
const appDir = join(ROOT, 'app');
const paginas = ['/'];
for (const name of readdirSync(appDir)) {
  const dir = join(appDir, name);
  if (statSync(dir).isDirectory() && readdirSync(dir).includes('page.tsx')) paginas.push('/' + name);
}
const imprescindibles = [
  ...paginas,
  ...paginas.filter((p) => p !== '/').map((p) => p + '/'),
  '/_next/image',
  '/robots.txt',
  '/sitemap.xml',
];
for (const path of imprescindibles) {
  if (excluded(path)) problemas.push(`  un exclude tapa ${path}, que lo resuelve la Function`);
}

if (problemas.length) {
  console.error('_routes.json desincronizado:\n' + problemas.join('\n'));
  process.exit(1);
}
console.log(`OK    routes (${exclude.length} excludes, ${paginas.length} páginas libres)`);
