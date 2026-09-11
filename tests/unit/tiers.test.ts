/**
 * La escalera de upsell (`lib/tiers.ts`), con una chain de mentira.
 *
 * Lo que más importa acá es el borde entre productos: las páginas pasan la
 * UNIÓN de las chains de todas las landings, una detrás de otra, y el
 * "siguiente por índice" del último nivel de un producto es el primero del
 * otro. Eso no es un upsell. Se descubrió al conectar el parasol: soporte x6
 * ofrecía "parasol x1" y sólo no se veía porque el delta daba negativo.
 */
import { describe, it, expect } from 'vitest';
import {
  buildTiers,
  tierOf,
  nextTierOf,
  upsellDelta,
  upsellExtraUnits,
} from '@/lib/tiers';
import type { UpsellTier } from '@/lib/landings/types';
import type { BundleData } from '@/lib/shopify';

const tier = (
  id: UpsellTier['id'],
  producto: string,
  quantity: number,
  fallbackPrice: number,
): UpsellTier => ({
  id,
  productId: `gid://shopify/Product/${producto}-${quantity}`,
  fallbackVariantId: `gid://shopify/ProductVariant/${producto}-${quantity}`,
  quantity,
  unitsLabel: `${quantity} unidades`,
  fallbackPrice,
});

/** Dos productos: A con 3 niveles, B con 2. Como ALL_UPSELL_CHAINS. */
const A1 = tier('single', 'A', 1, 100);
const A2 = tier('double', 'A', 2, 150);
const A3 = tier('triple', 'A', 3, 200);
const B1 = tier('single', 'B', 1, 50);
const B2 = tier('double', 'B', 2, 75);
const CHAIN = [A1, A2, A3, B1, B2];

describe('buildTiers', () => {
  it('sin datos de Shopify cae al variantId y precio de config', () => {
    const tiers = buildTiers({}, undefined, CHAIN);
    expect(tiers.map((t) => t.variantId)).toEqual(CHAIN.map((t) => t.fallbackVariantId));
    expect(tiers.map((t) => t.price)).toEqual([100, 150, 200, 50, 75]);
  });

  it('el precio del build pisa al fallback, y el refetch client-side pisa al build', () => {
    const build: Record<string, BundleData> = {
      [A1.productId]: { variantId: 'gid://shopify/ProductVariant/live-A1', price: 110, compareAtPrice: null },
    };
    const conBuild = buildTiers(build, undefined, CHAIN);
    expect(conBuild[0]).toMatchObject({ variantId: 'gid://shopify/ProductVariant/live-A1', price: 110 });

    const live = {
      'gid://shopify/ProductVariant/live-A1': {
        variantId: 'gid://shopify/ProductVariant/live-A1',
        price: 120,
        compareAtPrice: null,
        availableForSale: true,
      },
    };
    const conLive = buildTiers(build, live, CHAIN);
    expect(conLive[0].price).toBe(120);
  });

  it('un tier sin variantId en ningún lado (producto que no existe) se saltea', () => {
    const fantasma: UpsellTier = { ...B1, productId: '', fallbackVariantId: '' };
    const tiers = buildTiers({}, undefined, [A1, fantasma, B2]);
    expect(tiers.map((t) => t.variantId)).toEqual([A1.fallbackVariantId, B2.fallbackVariantId]);
  });
});

describe('tierOf / nextTierOf', () => {
  const tiers = buildTiers({}, undefined, CHAIN);

  it('encuentra el tier por variantId, o null si no es nuestro', () => {
    expect(tierOf(tiers, A2.fallbackVariantId)?.id).toBe('double');
    expect(tierOf(tiers, 'gid://shopify/ProductVariant/otro')).toBeNull();
  });

  it('dentro de una escalera sube un nivel', () => {
    expect(nextTierOf(tiers, A1.fallbackVariantId)?.variantId).toBe(A2.fallbackVariantId);
    expect(nextTierOf(tiers, A2.fallbackVariantId)?.variantId).toBe(A3.fallbackVariantId);
    expect(nextTierOf(tiers, B1.fallbackVariantId)?.variantId).toBe(B2.fallbackVariantId);
  });

  it('el último nivel de un producto NO ofrece el primero del siguiente', () => {
    // A3 (3 unidades) → B1 (1 unidad) es un cambio de producto, no un upsell.
    expect(nextTierOf(tiers, A3.fallbackVariantId)).toBeNull();
  });

  it('el último de toda la lista y un variantId desconocido devuelven null', () => {
    expect(nextTierOf(tiers, B2.fallbackVariantId)).toBeNull();
    expect(nextTierOf(tiers, 'gid://shopify/ProductVariant/otro')).toBeNull();
  });
});

describe('upsellDelta / upsellExtraUnits', () => {
  const [a1, a2, a3] = buildTiers({}, undefined, [A1, A2, A3]);

  it('el salto cuesta la diferencia de precios reales', () => {
    expect(upsellDelta(a1, a2)).toBe(50);
    expect(upsellExtraUnits(a1, a2)).toBe(1);
    expect(upsellExtraUnits(a1, a3)).toBe(2);
  });

  it('sin delta positivo no hay nada que ofrecer', () => {
    expect(upsellDelta(a2, a1)).toBeNull();
    expect(upsellDelta(a2, { ...a2 })).toBeNull();
  });
});
