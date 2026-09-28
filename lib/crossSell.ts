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
  /** Precio con el descuento automático de Shopify aplicado. */
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
