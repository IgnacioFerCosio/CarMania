/**
 * La venta cruzada del carrito (`lib/crossSell.ts`) y su config.
 *
 * Lo que protege: que la oferta aparezca sólo cuando Shopify la va a cobrar
 * así. El descuento vive en Shopify (automático "Comprá X, llevá Y"); si el
 * carrito anuncia la oferta en un caso donde ese descuento no aplica, el
 * cliente ve un precio y el checkout le cobra otro.
 */
import { describe, it, expect } from 'vitest';
import { crossSellFor } from '@/lib/crossSell';
import { CROSS_SELLS, CROSS_SELL_DISCOUNT } from '@/lib/landings';
import type { CrossSell, UpsellTier } from '@/lib/landings/types';
import type { BundleData } from '@/lib/shopify';

const tier = (producto: string, quantity: number, fallbackPrice: number): UpsellTier => ({
  id: quantity === 1 ? 'single' : quantity === 2 ? 'double' : 'triple',
  productId: `gid://shopify/Product/${producto}-${quantity}`,
  fallbackVariantId: `gid://shopify/ProductVariant/${producto}-${quantity}`,
  quantity,
  unitsLabel: `${quantity} unidades`,
  fallbackPrice,
});

const A = [tier('A', 1, 100), tier('A', 2, 150), tier('A', 3, 200)];
const B = [tier('B', 1, 50), tier('B', 2, 75)];
const v = (t: UpsellTier) => t.fallbackVariantId;

const CS: CrossSell[] = [
  { triggers: A, offers: B, discountAmount: 20, name: 'B', pitch: '', image: '/b.webp' },
  { triggers: B, offers: A, discountAmount: 40, name: 'A', pitch: '', image: '/a.webp' },
];

describe('crossSellFor', () => {
  it('carrito vacío: nada', () => {
    expect(crossSellFor([], CS, {})).toBeNull();
  });

  it('con A en el carrito ofrece el x1 de B, con el descuento restado', () => {
    expect(crossSellFor([v(A[0])], CS, {})).toMatchObject({
      variantId: v(B[0]),
      price: 50,
      offerPrice: 30,
      discountAmount: 20,
    });
  });

  it('cualquier nivel habilita la oferta, no sólo el x1', () => {
    expect(crossSellFor([v(A[2])], CS, {})?.variantId).toBe(v(B[0]));
  });

  it('funciona en las dos direcciones', () => {
    expect(crossSellFor([v(B[1])], CS, {})).toMatchObject({ variantId: v(A[0]), offerPrice: 60 });
  });

  it('si ya hay CUALQUIER nivel del otro producto, no ofrece nada', () => {
    expect(crossSellFor([v(A[0]), v(B[1])], CS, {})).toBeNull();
    expect(crossSellFor([v(A[0]), v(B[0])], CS, {})).toBeNull();
  });

  it('resuelve variantes y precios igual que las tiers: build pisa fallback, live pisa build', () => {
    const build: Record<string, BundleData> = {
      [A[0].productId]: { variantId: 'live-A1', price: 100, compareAtPrice: null },
      [B[0].productId]: { variantId: 'live-B1', price: 55, compareAtPrice: null },
    };
    expect(crossSellFor(['live-A1'], CS, build)).toMatchObject({
      variantId: 'live-B1',
      price: 55,
      offerPrice: 35,
    });

    const live = {
      'live-B1': { variantId: 'live-B1', price: 60, compareAtPrice: null, availableForSale: true },
    };
    expect(crossSellFor(['live-A1'], CS, build, live)?.offerPrice).toBe(40);
  });

  it('no ofrece algo sin stock', () => {
    const live = {
      [v(B[0])]: { variantId: v(B[0]), price: 50, compareAtPrice: null, availableForSale: false },
    };
    expect(crossSellFor([v(A[0])], CS, {}, live)).toBeNull();
  });

  it('no anuncia un precio en cero o negativo', () => {
    const caro: CrossSell[] = [{ ...CS[0], discountAmount: 50 }];
    expect(crossSellFor([v(A[0])], caro, {})).toBeNull();
  });
});

describe('CROSS_SELLS (config real)', () => {
  it.each(CROSS_SELLS.map((cs) => [cs.name, cs]))('%s: la oferta cierra', (_, cs) => {
    const offer = cs.offers[0];
    // Los descuentos de Shopify apuntan al x1 del otro producto.
    expect(offer.quantity).toBe(1);
    expect(cs.discountAmount).toBeGreaterThan(0);
    expect(cs.discountAmount).toBeLessThan(offer.fallbackPrice);

    // El producto que habilita no puede ser el mismo que se ofrece.
    const triggerIds = new Set(cs.triggers.map((t) => t.productId));
    expect(cs.offers.some((t) => triggerIds.has(t.productId))).toBe(false);
  });

  it('todas descuentan lo mismo', () => {
    // Con los dos productos en el carrito Shopify aplica UN descuento y elige
    // él cuál. Sólo con montos iguales el total sube lo que anunció la card.
    const montos = new Set(CROSS_SELLS.map((cs) => cs.discountAmount));
    expect([...montos]).toEqual([CROSS_SELL_DISCOUNT]);
  });

  it('cada oferta tiene su vuelta: si A ofrece B, B ofrece A', () => {
    for (const cs of CROSS_SELLS) {
      const back = CROSS_SELLS.find((o) => o.triggers === cs.offers);
      expect(back?.offers).toBe(cs.triggers);
    }
  });

  it('el precio con descuento no queda más barato que la unidad del pack x2 del mismo producto', () => {
    // Si el complemento sale menos que "la 2ª al 50%", le canibaliza el pack
    // al propio producto. Mismo margen de $10 que el resto por el redondeo.
    for (const cs of CROSS_SELLS) {
      const [x1, x2] = cs.offers;
      const segundaUnidad = x2.fallbackPrice - x1.fallbackPrice;
      expect(x1.fallbackPrice - cs.discountAmount).toBeGreaterThanOrEqual(segundaUnidad - 10);
    }
  });
});
