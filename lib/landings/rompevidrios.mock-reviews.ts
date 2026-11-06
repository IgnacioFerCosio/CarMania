/**
 * ⚠️ RESEÑAS DE MAQUETA, NO REALES. SÓLO PARA `npm run dev`.
 *
 * El Llavero Rescate PRO todavía no se vendió. Están para ver cómo quedan el
 * carrusel del hero, la opinión de "¿Qué incluye?" y la grilla de #reviews con
 * contenido. `app/rompevidrios/page.tsx` las usa sólo con
 * NODE_ENV=development: en las previews de Cloudflare y en producción no sale
 * nada inventado.
 *
 * Los nombres y las ciudades son de fantasía. Algunos textos parten de
 * reseñas de Amazon.com de un producto de la competencia (SafeProX),
 * traducidas y adaptadas; el resto, inventados. NO son opiniones de clientes
 * del Llavero Rescate PRO™ y no pueden publicarse como tales.
 *
 * Las imágenes viven en `public/mock/` (gitignored, nunca se deploya):
 *  - `ia-*.webp`: generadas con IA a partir de fotos reales del producto.
 *  - `real*-*.webp`: cuadros de videos de reseñas de YouTube de herramientas
 *    iguales (SafeHammer; canales How Do I? y Legit Finds), sólo de referencia.
 * Cada texto está escrito para que cuadre con SU imagen.
 *
 * NO pasarlas a `ROMPEVIDRIOS.reviews` ni sacarles la condición de dev.
 * Reemplazar por reseñas y fotos reales cuando haya ventas.
 */
import type { Review } from './types';

/** La grilla de 8 de #reviews (la misma `Reviews` del soporte). */
export const ROMPEVIDRIOS_MOCK_GRID_REVIEWS: readonly Review[] = [
  { name: 'Martín G.', location: 'La Plata', stars: 5, date: '', verified: true,
    image: '/mock/ia-vidrio-roto.webp',
    text: 'Ojalá no tener que usarlo nunca, pero el vidrio de prueba que viene en la caja se hizo pedazos apenas lo tocó la punta.' },
  { name: 'Laura P.', location: 'Rosario', stars: 5, date: '', verified: true,
    image: '/mock/real-2.webp',
    text: 'La hoja del cortador de cinturón queda escondida dentro de una ranura: no se ve nada filoso. Eso me dio tranquilidad por los chicos.' },
  { name: 'Diego R.', location: 'Córdoba', stars: 5, date: '', verified: true,
    image: '/mock/real3-3.webp',
    text: 'Rompió el vidrio en mil pedazos. Funciona de verdad. Probalo afuera, sobre un tacho, porque salen muchísimos pedacitos. Ya dejé uno en cada auto de casa.' },
  { name: 'Sergio A.', location: 'Mendoza', stars: 5, date: '', verified: true,
    image: '/mock/real-4.webp',
    text: 'Uff, es poderoso. Lo probé y hace exactamente lo que dice.' },
  { name: 'Carolina M.', location: 'Tucumán', stars: 4, date: '', verified: true,
    image: '/mock/ia-incluye.webp',
    text: 'Viene todo en la caja: el llavero, el vidrio de prueba y el soporte adhesivo. Funciona muy bien.' },
  { name: 'Julieta S.', location: 'Salta', stars: 5, date: '', verified: true,
    image: '/mock/ia-llave.webp',
    text: 'Lo llevo en la llave del auto, con la sillita de mi hijo atrás. Me da una sensación de seguridad.' },
  { name: 'Pablo F.', location: 'Neuquén', stars: 5, date: '', verified: true,
    image: '/mock/ia-soporte.webp',
    text: 'Lo dejé pegado en el soporte, sobre el tablero. Entra y sale fácil y lo tengo siempre a mano. Muy bueno.' },
  { name: 'Nadia C.', location: 'Mar del Plata', stars: 5, date: '', verified: true,
    image: '/mock/real-8.webp',
    text: 'Es chiquito y liviano, entra en la mano. Funciona.' },
];

/**
 * Las mini reseñas, con la misma foto de la grilla:
 *  - las primeras 3 van en el carrusel del hero (Martín, Julieta, Pablo);
 *  - la 4ª es la opinión de "¿Qué incluye?" (Carolina: trae todo en la caja).
 */
export const ROMPEVIDRIOS_MOCK_REVIEWS: readonly Review[] = [
  ROMPEVIDRIOS_MOCK_GRID_REVIEWS[0],
  ROMPEVIDRIOS_MOCK_GRID_REVIEWS[5],
  ROMPEVIDRIOS_MOCK_GRID_REVIEWS[6],
  ROMPEVIDRIOS_MOCK_GRID_REVIEWS[4],
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
