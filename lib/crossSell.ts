/**
 * Resuelve qué venta cruzada mostrar en el carrito, si alguna.
 *
 * Igual que `lib/tiers.ts`: los precios entran por parámetro y los variantId
 * se resuelven con los datos del build (o el fallback de config), así que no
 * hay nada hardcodeado por id acá.
 */
import type { CrossSell, UpsellTier } from './landings/types';
import type { BundleData, VariantPrice } from './shopify';

export type ResolvedCrossSell = {
  variantId: string;
  name: string;
  pitch: string;
  image: string;
  /** Precio de lista del x1: lo que pagaría sin la oferta. */
  price: number;
  /**
   * Cuánto sube el total del carrito al sumarlo. NO es necesariamente el
   * precio con el que queda esta línea: Shopify puede ponerle el descuento a
   * la otra (ver `CROSS_SELLS`). Lo que sí es siempre cierto es el total.
   */
  offerPrice: number;
  discountAmount: number;
};

function variantOf(t: UpsellTier, bundlesData: Record<string, BundleData>): string {
  return bundlesData[t.productId]?.variantId || t.fallbackVariantId;
}

/**
 * La primera venta cruzada que aplica al carrito, o null.
 *
 * Aplica cuando hay algún nivel de `triggers` en el carrito y ninguno de
 * `offers`. Con los dos productos adentro no se ofrece nada: ya lo tiene, y
 * los descuentos de Shopify no se combinan, así que no habría precio especial
 * que cumplir.
 *
 * También devuelve null si el descuento dejaría el precio en cero o negativo
 * (precios mal cargados): mejor no mostrar la oferta que anunciar un número
 * que el checkout no va a cobrar.
 */
export function crossSellFor(
  cartVariantIds: readonly string[],
  crossSells: readonly CrossSell[],
  bundlesData: Record<string, BundleData>,
  livePrices?: Record<string, VariantPrice>,
): ResolvedCrossSell | null {
  const inCart = new Set(cartVariantIds);
  const has = (chain: readonly UpsellTier[]) =>
    chain.some((t) => inCart.has(variantOf(t, bundlesData)));

  for (const cs of crossSells) {
    const offer = cs.offers[0];
    if (!offer || !has(cs.triggers) || has(cs.offers)) continue;

    const variantId = variantOf(offer, bundlesData);
    if (!variantId) continue;

    const live = livePrices?.[variantId];
    if (live && !live.availableForSale) continue;

    const price = live?.price ?? bundlesData[offer.productId]?.price ?? offer.fallbackPrice;
    const offerPrice = price - cs.discountAmount;
    if (offerPrice <= 0) continue;

    return {
      variantId,
      name: cs.name,
      pitch: cs.pitch,
      image: cs.image,
      price,
      offerPrice,
      discountAmount: cs.discountAmount,
    };
  }

  return null;
}

/**
 * Si el combo le saca a esta línea el banner de "subir de pack".
 *
 * Sólo cuenta cuando el otro producto del combo también está en el carrito.
 * Ahí hay dos motivos para ocultarlo:
 *
 *  1. La línea entró desde la card (`crossSell`). Es el complemento: el
 *     banner de pack lo conserva el producto que el cliente eligió primero.
 *     No se puede decidir por la línea que tiene el descuento: en x1 + x1
 *     Shopify se lo pone siempre a la misma, sin importar cuál entró antes.
 *     Si las dos están marcadas (sacó uno y lo volvió a sumar desde la card)
 *     no hay "primero" y este motivo no aplica a ninguna.
 *
 *  2. Es un x1 y el otro producto no tiene x1. El combo descuenta un x1, así
 *     que al subir de pack ya no quedaría ningún x1 al que aplicárselo y el
 *     total subiría $20.000 más de lo que anuncia el banner. (Si el otro sí
 *     tiene x1, el descuento se muda ahí y el banner dice la verdad.)
 */
type LineRef = { merchandiseId: string; crossSell: boolean };

export function comboBlocksUpsell(
  line: LineRef,
  cartLines: readonly LineRef[],
  crossSells: readonly CrossSell[],
  bundlesData: Record<string, BundleData>,
): boolean {
  const inCart = new Set(cartLines.map((l) => l.merchandiseId));

  for (const cs of crossSells) {
    const own = cs.offers.map((t) => variantOf(t, bundlesData));
    const other = cs.triggers.map((t) => variantOf(t, bundlesData));
    if (!own.includes(line.merchandiseId)) continue;
    if (!other.some((id) => inCart.has(id))) continue;

    const otherMarked = cartLines.some(
      (l) => l.crossSell && other.includes(l.merchandiseId),
    );
    if (line.crossSell && !otherMarked) return true;
    if (line.merchandiseId === own[0] && !inCart.has(other[0])) return true;
  }

  return false;
}
