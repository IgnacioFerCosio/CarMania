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
