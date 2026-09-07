/**
 * CHEQUEO DE ASSETS — que todo lo que el código pide exista en /public, con la
 * misma capitalización.
 *
 * Por qué existe: Cloudflare Pages sirve desde un filesystem CASE-SENSITIVE y
 * Windows no. Una ruta `/Parasol/foto.webp` contra una carpeta `parasol/`
 * anda perfecto en local y tira 404 en producción. Ya pasó una vez en este
 * repo. Por eso no alcanza con `fs.existsSync`: hay que comparar contra el
 * `readdir` real del directorio, que es lo único que distingue mayúsculas en
 * Windows.
 *
 * Además atrapa lo de siempre: un typo en el nombre, una foto que se renombró
 * en disco pero no en la config, un video que nunca se subió.
 *
 * Uso: node scripts/check-assets.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

/** Dónde buscar referencias a assets. */
const SOURCE_DIRS = ['lib', 'components', 'app'];
/**
 * Los comentarios no cuentan: varios docblocks traen rutas de ejemplo
 * ("reemplazá esto por <Image src='/specs/foo.png' />") que no son
 * referencias reales y ensuciarían el reporte.
 */
function sinComentarios(texto) {
  return texto
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // El `[^:]` evita comerse el `//` de las URLs (https://...).
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/** Extensiones que consideramos assets servidos desde /public. */
const ASSET_RE = /(["'`])(\/[^"'`\s]+\.(?:webp|jpe?g|png|svg|gif|mp4|webm|avif|ico|woff2?))\1/g;

/**
 * Assets que TODAVÍA no existen y lo sabemos. Cada entrada es deuda con
 * dueño: si querés que el check pase, o subís el archivo o borrás la
 * referencia. No agregues nada acá sin anotar por qué.
 *
 * Ver docs/superpowers/specs/soplador-assets.md
 */
const PENDIENTES = new Set([
  // Landing del soplador: no hay ni una imagen todavía.
  '/soplador/hero/soplador-hero.webp',
  '/soplador/use-cases/rejillas.webp',
  '/soplador/use-cases/tapizados.webp',
  '/soplador/use-cases/tablero.webp',
  '/soplador/use-cases/teclado.webp',
  '/soplador/use-cases/notebook.webp',
  '/soplador/use-cases/secado.webp',
  '/soplador/how-to-use/01-cargalo-por-usb.mp4',
  '/soplador/how-to-use/02-pone-la-boquilla.mp4',
  '/soplador/how-to-use/03-apreta-y-sopla.mp4',
  '/soplador/before-after/sin-soplador.webp',
  '/soplador/before-after/con-soplador.webp',
  '/soplador/bundles/SopladorX1.webp',
  '/soplador/bundles/SopladorX2.webp',
  '/soplador/bundles/SopladorX3.webp',
  // Packs del parasol: faltan las 3 fotos. Ver parasol-assets.md
  '/parasol/bundles/ParasolX1.webp',
  '/parasol/bundles/ParasolX2.webp',
  '/parasol/bundles/ParasolX3.webp',

  // ── Config inerte: se referencia pero NO se renderiza, así que no puede
  // dar 404. Está acá para que el check no la marque, no porque haya que
  // subir los archivos. Si algún día se activa, hay que conseguirlos.
  // `MEDIA_FEATURED` tiene enabled:false y ningún componente lo consume:
  '/media/clarin.svg',
  '/media/lanacion.svg',
  '/media/infobae.svg',
  '/media/tiktok.svg',
  '/media/instagram.svg',
  // `Step.image` es opcional y HowItWorks sólo usa `Step.video`:
  '/steps/01-instalar.jpg',
  '/steps/02-ajustar.jpg',
  '/steps/03-colocar.jpg',
]);

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|js|jsx|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

/**
 * Existe con ESTA capitalización exacta. Recorre segmento por segmento
 * comparando contra el readdir, porque en Windows `existsSync` dice que sí
 * aunque las mayúsculas no coincidan — que es justo el bug que buscamos.
 */
function existeConMayusculasExactas(rel) {
  const partes = rel.split('/').filter(Boolean);
  let actual = PUBLIC;
  for (const parte of partes) {
    let entradas;
    try {
      entradas = readdirSync(actual);
    } catch {
      return false;
    }
    if (!entradas.includes(parte)) return false;
    actual = join(actual, parte);
  }
  try {
    return statSync(actual).isFile();
  } catch {
    return false;
  }
}

const referencias = new Map(); // ruta -> [archivos que la piden]
for (const dir of SOURCE_DIRS) {
  for (const archivo of walk(join(ROOT, dir))) {
    const texto = sinComentarios(readFileSync(archivo, 'utf8'));
    for (const m of texto.matchAll(ASSET_RE)) {
      const ruta = posix.normalize(m[2]);
      if (!referencias.has(ruta)) referencias.set(ruta, []);
      const lista = referencias.get(ruta);
      const rel = archivo.slice(ROOT.length + 1).replace(/\\/g, '/');
      if (!lista.includes(rel)) lista.push(rel);
    }
  }
}

const faltan = [];
const pendientesVistos = new Set();
for (const [ruta, usadaEn] of referencias) {
  if (existeConMayusculasExactas(ruta)) continue;
  if (PENDIENTES.has(ruta)) {
    pendientesVistos.add(ruta);
    continue;
  }
  faltan.push({ ruta, usadaEn });
}

// Una entrada de PENDIENTES que ya existe es deuda saldada: hay que sacarla de
// la lista, si no el check deja de proteger ese archivo.
const yaNoHaceFalta = [...PENDIENTES].filter(
  (r) => !pendientesVistos.has(r) && existeConMayusculasExactas(r),
);

console.log(`assets referenciados: ${referencias.size}`);
if (pendientesVistos.size) {
  console.log(`pendientes conocidos: ${pendientesVistos.size} (ver los specs)`);
}

let rc = 0;
if (faltan.length) {
  rc = 1;
  console.error(`\nFALTAN ${faltan.length} asset(s):`);
  for (const { ruta, usadaEn } of faltan) {
    console.error(`  ${ruta}`);
    console.error(`      lo pide: ${usadaEn.join(', ')}`);
  }
  console.error(
    '\nOjo con las mayúsculas: en Cloudflare el filesystem distingue y en Windows no.',
  );
}
if (yaNoHaceFalta.length) {
  rc = 1;
  console.error(`\nEstos ya existen y siguen en PENDIENTES — sacalos de la lista:`);
  for (const r of yaNoHaceFalta) console.error(`  ${r}`);
}
if (!rc) console.log('OK    todos los assets existen');
process.exit(rc);
