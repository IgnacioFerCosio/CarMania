/**
 * ⚠️ RESEÑAS DE MAQUETA, INVENTADAS. SÓLO PARA `npm run dev`.
 *
 * El Llavero Rescate PRO todavía no se vendió. Están para ver cómo queda el
 * carrusel del hero con contenido (sin él, el hero queda más bajo que el de
 * las otras landings). `app/rompevidrios/page.tsx` las usa sólo con
 * NODE_ENV=development: en las previews de Cloudflare y en producción el
 * hero sale sin carrusel.
 *
 * NO pasarlas a `ROMPEVIDRIOS.reviews` ni sacarles la condición de dev.
 * Reemplazar por reseñas reales cuando haya ventas.
 */
import type { Review } from './types';

export const ROMPEVIDRIOS_MOCK_REVIEWS: readonly Review[] = [
  {
    name: 'Martín G.',
    location: 'La Plata',
    stars: 5,
    text: 'Probé el vidrio de prueba apenas llegó y se partió al toque, sin hacer fuerza. Ahora lo llevo colgado de la llave del auto.',
    date: '',
    verified: true,
  },
  {
    name: 'Laura P.',
    location: 'Rosario',
    stars: 5,
    text: 'Compré el pack de 4: uno para cada auto de la familia. Es chiquito, no molesta en el llavero y sé que lo tengo a mano.',
    date: '',
    verified: true,
  },
  {
    name: 'Diego R.',
    location: 'Córdoba',
    stars: 5,
    text: 'El martillo lo tenía en la guantera y nunca me acordaba. Este va con la llave, así que está siempre. Corta el cinturón muy fácil.',
    date: '',
    verified: true,
  },
  // La 4ª no sale en el carrusel del hero (muestra las primeras 3): es la
  // opinión de la sección "¿Qué incluye?", como la del soporte.
  {
    name: 'Sergio A.',
    location: 'Mendoza',
    stars: 5,
    text: 'Lo probé con el vidrio de prueba el día que llegó. Ahora uno va en mi llave y el otro en el auto de mi señora.',
    date: '',
    verified: true,
  },
];

/**
 * ⚠️ MAQUETA, SÓLO `npm run dev`: la grilla de 8 reseñas de #reviews (la misma
 * `Reviews` del soporte). Los textos son reseñas de Amazon.com de un producto
 * de la competencia (SafeProX), traducidas y adaptadas, con nombres de
 * fantasía: NO son opiniones de clientes del Llavero Rescate PRO™ y no pueden
 * publicarse como tales. Las fotos son de Unsplash (licencia gratuita), puestas
 * de referencia (`public/mock/foto-*.webp`, gitignored, nunca se deploya).
 */
export const ROMPEVIDRIOS_MOCK_GRID_REVIEWS: readonly Review[] = [
  { name: 'Martín G.', location: 'La Plata', stars: 5, date: '', verified: true, image: '/mock/foto-1.webp',
    text: 'Ojalá no tener que usarlo nunca, pero el vidrio de prueba que viene en la caja se hizo pedazos apenas lo tocó la punta.' },
  { name: 'Laura P.', location: 'Rosario', stars: 5, date: '', verified: true, image: '/mock/foto-2.webp',
    text: 'Rompió el vidrio en mil pedazos. Funciona de verdad. Probalo afuera, sobre un tacho, porque salen muchísimos pedacitos. Ya dejé uno en cada auto de casa.' },
  { name: 'Diego R.', location: 'Córdoba', stars: 5, date: '', verified: true, image: '/mock/foto-3.webp',
    text: 'Compré el pack de 6 para regalarles uno a mis hijos grandes, "por las dudas". Vienen nuevos, bien armados y de a dos en cada caja. El vidrio de prueba lo guardé: ya vi en los videos que funciona.' },
  { name: 'Sergio A.', location: 'Mendoza', stars: 5, date: '', verified: true, image: '/mock/foto-4.webp',
    text: 'Uff, es poderoso. Lo probé y hace exactamente lo que dice.' },
  { name: 'Carolina M.', location: 'Tucumán', stars: 4, date: '', verified: true, image: '/mock/foto-5.webp',
    text: 'Trae el vidrio de prueba en el paquete. Funciona muy bien.' },
  { name: 'Julieta S.', location: 'Salta', stars: 5, date: '', verified: true, image: '/mock/foto-6.webp',
    text: 'Me da una sensación de seguridad.' },
  { name: 'Pablo F.', location: 'Neuquén', stars: 5, date: '', verified: true, image: '/mock/foto-7.webp',
    text: 'Muy bueno.' },
  { name: 'Nadia C.', location: 'Mar del Plata', stars: 5, date: '', verified: true, image: '/mock/foto-8.webp',
    text: 'Funciona.' },
];

/** 7 de 5 estrellas y 1 de 4 (el promedio sale de las 8 de arriba). */
export const ROMPEVIDRIOS_MOCK_BREAKDOWN = {
  average: 4.88,
  total: 8,
  stars: [
    { stars: 5, count: 7 },
    { stars: 4, count: 1 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
};
