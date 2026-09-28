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
 * LA REGLA: soporte + parasol en el carrito, en el pack que sea, = el total
 * baja `CROSS_SELL_DISCOUNT`. Nada más. No importa el orden, ni los packs, ni
 * cuántas veces se agregue o saque algo.
 *
 * Shopify lo cumple con dos descuentos automáticos "Comprá X, llevá Y"
 * (Shopify → Descuentos, creados el 2026-09-28), 1 unidad por pedido y NO
 * combinables entre sí (si no, con ambos productos se descontarían los dos):
 *   · "Combo Soporte + Parasol" — cualquier soporte → cualquier parasol
 *   · "Combo Parasol + Soporte" — cualquier parasol → cualquier soporte
 * Los dos "cualquier" importan: si el descuento fuera sólo sobre el x1, subir
 * de pack lo rompería y el banner de pack prometería menos de lo que sube el
 * total. Así, cada producto conserva siempre su propio upsell.
 *
 * ⚠️ Los montos TIENEN que ser iguales. Con los dos productos se cumplen las
 * dos condiciones y Shopify aplica una sola, la que elige él (la más grande;
 * en empate, la que quiere). Con montos iguales da lo mismo cuál gane. Por
 * eso también el drawer muestra el combo como del par (franja y pie) y no en
 * la línea que Shopify eligió. El test de config lo hace cumplir.
 *
 * Si agregás un pack nuevo a una escalera, sumalo también a los dos
 * descuentos en Shopify (en "Comprá" de uno y en "Llevá" del otro).
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
