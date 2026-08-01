/**
 * La escalera de bundles: single → double → triple.
 *
 * Los 3 son productos separados en Shopify, así que "subir de tier" es
 * cambiar de producto, no cambiar una cantidad. Este módulo resuelve, dado
 * el variantId que hay en una línea del carrito, cuál es el tier siguiente
 * y cuánto cuesta el salto.
 *
 * Los precios entran por parámetro (nunca hardcodeados acá) para que el copy
 * del upsell se actualice solo cuando cambien en Shopify.
 */
import { BUNDLES } from './config';
import type { BundleData } from './shopify';
import type { VariantPrice } from './shopify';

export type TierId = 'single' | 'double' | 'triple';

export type ResolvedTier = {
  id: TierId;
  label: string;
  unitsLabel: string;
  /** Unidades físicas que entrega este bundle. */
  units: number;
  variantId: string;
  price: number;
};

/**
 * Arma la escalera ordenada (single → double → triple).
 *
 * `bundlesData` viene del servidor (resuelto en el build). `livePrices` es el
 * refetch client-side; cuando está, pisa a los precios del build, que en
 * Cloudflare pueden estar viejos.
 */
export function buildTiers(
  bundlesData: Record<string, BundleData>,
  livePrices?: Record<string, VariantPrice>,
): ResolvedTier[] {
  const tiers: ResolvedTier[] = [];

  for (const b of BUNDLES) {
    const data = bundlesData[b.productId];
    const variantId = data?.variantId || b.fallbackVariantId;
    if (!variantId) continue;

    const live = livePrices?.[variantId];
    tiers.push({
      id: b.id,
      label: b.label,
      unitsLabel: b.unitsLabel,
      units: b.quantity,
      variantId,
      price: live?.price ?? data?.price ?? b.fallbackPrice,
    });
  }

  return tiers;
}

/** El tier al que pertenece un variantId, o null si no es de los nuestros. */
export function tierOf(
  tiers: ResolvedTier[],
  variantId: string,
): ResolvedTier | null {
  return tiers.find((t) => t.variantId === variantId) ?? null;
}

/**
 * El tier siguiente en la escalera, o null si ya está en el tope (triple)
 * o si el variantId no corresponde a ningún bundle conocido.
 */
export function nextTierOf(
  tiers: ResolvedTier[],
  variantId: string,
): ResolvedTier | null {
  const i = tiers.findIndex((t) => t.variantId === variantId);
  if (i === -1 || i === tiers.length - 1) return null;
  return tiers[i + 1];
}

/**
 * Lo que cuesta saltar de un tier al siguiente. Sale de restar los dos
 * precios reales de Shopify — nunca de una constante.
 *
 * Devuelve null si el salto no tiene sentido para mostrar (precio a la baja
 * o igual), que puede pasar si alguien deja precios inconsistentes cargados.
 */
export function upsellDelta(
  current: ResolvedTier,
  next: ResolvedTier,
): number | null {
  const delta = next.price - current.price;
  return delta > 0 ? delta : null;
}

/** Cuántas unidades extra suma el salto (para el copy). */
export function upsellExtraUnits(
  current: ResolvedTier,
  next: ResolvedTier,
): number {
  return Math.max(1, next.units - current.units);
}
