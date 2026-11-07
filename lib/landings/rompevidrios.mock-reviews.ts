import type { Review } from './types';

/** La grilla de 8 de #reviews (la misma `Reviews` del soporte). */
export const ROMPEVIDRIOS_MOCK_GRID_REVIEWS: readonly Review[] = [
  { name: 'Martín G.', location: 'La Plata', stars: 5, date: '', verified: false,
    image: '/rompevidrios/reviews/ia-vidrio-roto.webp',
    text: 'Ojalá no tener que usarlo nunca, pero el vidrio de prueba que viene en la caja se hizo pedazos apenas lo tocó la punta.' },
  { name: 'Laura P.', location: 'Rosario', stars: 5, date: '', verified: false,
    image: '/rompevidrios/reviews/real-2.webp',
    text: 'La hoja del cortador de cinturón queda escondida dentro de una ranura: no se ve nada filoso. Eso me dio tranquilidad por los chicos.' },
  { name: 'Diego R.', location: 'Córdoba', stars: 5, date: '', verified: false,
    image: '/rompevidrios/reviews/real3-3.webp',
    text: 'Rompió el vidrio en mil pedazos. Funciona de verdad. Probalo afuera, sobre un tacho, porque salen muchísimos pedacitos. Ya dejé uno en cada auto de casa.' },
  { name: 'Sergio A.', location: 'Mendoza', stars: 5, date: '', verified: false,
    image: '/rompevidrios/reviews/real-4.webp',
    text: 'Uff, es poderoso. Lo probé y hace exactamente lo que dice.' },
  { name: 'Carolina M.', location: 'Tucumán', stars: 4, date: '', verified: false,
    image: '/rompevidrios/reviews/ia-incluye.webp',
    text: 'Viene todo en la caja: el llavero, el vidrio de prueba y el soporte adhesivo. Funciona muy bien.' },
  { name: 'Julieta S.', location: 'Salta', stars: 5, date: '', verified: false,
    image: '/rompevidrios/reviews/ia-llave.webp',
    text: 'Lo llevo en la llave del auto, con la sillita de mi hijo atrás. Me da una sensación de seguridad.' },
  { name: 'Pablo F.', location: 'Neuquén', stars: 5, date: '', verified: false,
    image: '/rompevidrios/reviews/ia-soporte.webp',
    text: 'Lo dejé pegado en el soporte, sobre el tablero. Entra y sale fácil y lo tengo siempre a mano. Muy bueno.' },
  { name: 'Nadia C.', location: 'Mar del Plata', stars: 5, date: '', verified: false,
    image: '/rompevidrios/reviews/real-8.webp',
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
