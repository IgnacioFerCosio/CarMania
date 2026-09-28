/**
 * La unión de las escaleras de upsell de todas las landings.
 *
 * El carrito persiste entre páginas (un solo `carmania_cart_id` en
 * localStorage), así que el drawer tiene que poder resolver el tier de
 * cualquier producto, no sólo el de la landing que se está mirando. Con la
 * chain de una sola landing, una línea del otro producto cae en
 * `tierOf() → null` y pierde su banner de upsell.
 */
import { SOPORTE } from './soporte';
import { PARASOL } from './parasol';
import { SOPLADOR } from './soplador';
import type { CrossSell, UpsellTier } from './types';

export const ALL_UPSELL_CHAINS: readonly UpsellTier[] = [
  ...SOPORTE.upsellChain,
  ...PARASOL.upsellChain,
  ...SOPLADOR.upsellChain,
];

/**
 * Ventas cruzadas del carrito (ver `CrossSell` en ./types).
 *
 * Viven acá y no en cada landing porque cada una apunta a la OTRA: soporte
 * importando parasol y parasol importando soporte cerraría un ciclo.
 *
 * Cada entrada tiene su gemelo en Shopify → Descuentos, creados el
 * 2026-09-28. Los dos NO se combinan entre sí (si no, con ambos productos en
 * el carrito se descontarían los dos) y sólo aplican a 1 unidad por pedido.
 *   · "Parasol PRO con tu Soporte" — cualquier soporte → parasol x1 −$20.000
 *   · "Soporte PRO con tu Parasol" — cualquier parasol → soporte x1 −$16.000
 *
 * El soplador no entra: todavía no está incorporado como producto.
 */
export const CROSS_SELLS: readonly CrossSell[] = [
  {
    triggers: SOPORTE.upsellChain,
    offers: PARASOL.upsellChain,
    discountAmount: 20000,
    name: PARASOL.brand.tagline,
    pitch: 'Tu auto fresco aunque quede al sol.',
    image: PARASOL.bundles[0].image,
  },
  {
    triggers: PARASOL.upsellChain,
    offers: SOPORTE.upsellChain,
    discountAmount: 16000,
    name: SOPORTE.brand.tagline,
    pitch: 'El celu firme y a la vista mientras manejás.',
    image: SOPORTE.bundles[0].image,
  },
];
