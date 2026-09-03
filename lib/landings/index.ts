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
import type { UpsellTier } from './types';

export const ALL_UPSELL_CHAINS: readonly UpsellTier[] = [
  ...SOPORTE.upsellChain,
  ...PARASOL.upsellChain,
];
