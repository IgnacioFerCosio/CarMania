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
 *   2. Que ningún exclude tape una página (/, /parasol, /soporte/instalacion…),
 *      un redirect de next.config.js (/soporte) ni las imágenes optimizadas
 *      (/_next/image), que SÍ los resuelve la Function. Excluir eso los rompe
 *      en producción.
 *
 * Las páginas se buscan en todo `app/`, anidadas incluidas: `/soporte` no
 * tiene page.tsx pero `/soporte/instalacion` sí, y un `/soporte/*` la taparía.
 */
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
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

// `public/mock/` es de desarrollo (referencias para maquetar, ver MediaSlot):
// vive sólo en la máquina de quien la usa y nunca se deploya, así que no hay
// request que excluir. Se ignora SOLO mientras git no la trackee: si alguien la
// commitea por error, vuelve a contar como carpeta de /public (y a fallar).
const trackedMock = (() => {
  try {
    return execSync('git ls-files -- public/mock', { cwd: ROOT, encoding: 'utf8' }).trim() !== '';
  } catch {
    return false; // sin git: no hay forma de saber, se asume que no está trackeada
  }
})();
const mockDir = join(publicDir, 'mock');

for (const file of walk(publicDir)) {
  if (!trackedMock && file.startsWith(mockDir + sep)) continue;
  const url = '/' + relative(publicDir, file).split(sep).join('/');
  if (!excluded(url)) problemas.push(`  /public sin excluir: ${url}`);
}

// 2. Páginas, redirects y optimizador fuera de los excludes.
// Los grupos `(x)` no suman segmento a la URL; las carpetas `_x` son privadas.
const paginas = [];
const buscarPaginas = (dir, segmentos) => {
  if (readdirSync(dir).includes('page.tsx')) paginas.push('/' + segmentos.join('/'));
  for (const name of readdirSync(dir)) {
    if (name.startsWith('_') || name.startsWith('.')) continue;
    const sub = join(dir, name);
    if (!statSync(sub).isDirectory()) continue;
    buscarPaginas(sub, /^\(.*\)$/.test(name) ? segmentos : [...segmentos, name]);
  }
};
buscarPaginas(join(ROOT, 'app'), []);

const nextConfig = createRequire(import.meta.url)(join(ROOT, 'next.config.js'));
const redirects = (await nextConfig.redirects?.()) ?? [];
const rutas = [...paginas, ...redirects.map((r) => r.source)];

const imprescindibles = [
  ...rutas,
  ...rutas.filter((p) => p !== '/').map((p) => p + '/'),
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
console.log(
  `OK    routes (${exclude.length} excludes, ${paginas.length} páginas y ${redirects.length} redirects libres)`,
);
