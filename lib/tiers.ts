/**
 * La escalera de tiers: single → double → triple → x4 → x5 → x6.
 *
 * Cada nivel es un producto separado en Shopify, así que "subir de tier" es
 * cambiar de producto, no cambiar una cantidad. Este módulo resuelve, dado
 * el variantId que hay en una línea del carrito, cuál es el tier siguiente
 * y cuánto cuesta el salto — recorriendo UPSELL_CHAIN por posición, sin
 * casos hardcodeados por id: agregar o sacar un nivel es editar esa lista,
 * nada de esto necesita tocarse.
 *
 * Los precios entran por parámetro (nunca hardcodeados acá) para que el copy
 * del upsell se actualice solo cuando cambien en Shopify.
 */
import { UPSELL_CHAIN } from './config';
import type { BundleData } from './shopify';
import type { VariantPrice } from './shopify';

export type TierId = 'single' | 'double' | 'triple' | 'x4' | 'x5' | 'x6';

export type ResolvedTier = {
  id: TierId;
  label: string;
  unitsLabel: string;
  /** Unidades físicas que entrega este nivel. */
  units: number;
  variantId: string;
  price: number;
};

/**
 * Arma la escalera ordenada (single → double → triple → x4 → x5 → x6),
 * recorriendo UPSELL_CHAIN en el orden en que está declarada — no hay
 * ningún salto ni caso especial por id acá.
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

  for (const t of UPSELL_CHAIN) {
    const data = bundlesData[t.productId];
    const variantId = data?.variantId || t.fallbackVariantId;
    if (!variantId) continue;

    const live = livePrices?.[variantId];
    tiers.push({
      id: t.id as TierId,
      label: t.unitsLabel,
      unitsLabel: t.unitsLabel,
      units: t.quantity,
      variantId,
      price: live?.price ?? data?.price ?? t.fallbackPrice,
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
 * El tier siguiente en la escalera, o null si ya está en el último nivel de
 * UPSELL_CHAIN o si el variantId no corresponde a ningún tier conocido.
 * Como es puramente posicional (índice + 1), el tope se ajusta solo con lo
 * que tenga la lista — hoy es x6, pero si se agrega o saca un nivel esto no
 * necesita tocarse.
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
