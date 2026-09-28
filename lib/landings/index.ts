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
 * Cada entrada tiene su gemelo en Shopify → Descuentos (automáticos,
 * creados el 2026-09-28). Sólo aplican a 1 unidad por pedido y NO se
 * combinan entre sí: si no, con ambos productos se descontarían los dos.
 *   · "Combo Soporte + Parasol" — cualquier soporte → parasol x1 −$20.000
 *   · "Combo Parasol + Soporte" — cualquier parasol → soporte x1 −$20.000
 *
 * ⚠️ Los montos TIENEN que ser iguales. Con los dos productos en el carrito
 * se cumplen las dos condiciones y Shopify aplica una sola, la que elige él
 * (la más grande; en empate, la que quiere — hoy la del soporte). No hay
 * forma de decirle "la del producto que entró último". Con montos iguales da
 * lo mismo cuál gane: el total baja siempre `CROSS_SELL_DISCOUNT`, que es lo
 * que anuncia la card. Por eso la card promete cuánto sube el total, no el
 * precio de una línea. El test de config lo hace cumplir.
 *
 * Se necesitan los dos (y no uno solo) por los packs: "comprá soporte,
 * llevá parasol x1" cubre al que entró por el parasol x1, pero no al que
 * tiene el parasol x2 o x3, porque ahí no hay un x1 al que descontarle.
 *
 * El soplador no entra: todavía no está incorporado como producto.
 */
export const CROSS_SELL_DISCOUNT = 20000;

export const CROSS_SELLS: readonly CrossSell[] = [
  {
    triggers: SOPORTE.upsellChain,
    offers: PARASOL.upsellChain,
    discountAmount: CROSS_SELL_DISCOUNT,
    name: PARASOL.brand.tagline,
    pitch: 'Tu auto fresco aunque quede al sol.',
    image: PARASOL.bundles[0].image,
  },
  {
    triggers: PARASOL.upsellChain,
    offers: SOPORTE.upsellChain,
    discountAmount: CROSS_SELL_DISCOUNT,
    name: SOPORTE.brand.tagline,
    pitch: 'El celu firme y a la vista mientras manejás.',
    image: SOPORTE.bundles[0].image,
  },
];

/** Cómo se llama el combo en el pie del carrito. */
export const CROSS_SELL_LABEL = 'Combo Soporte + Parasol';
