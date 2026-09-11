/**
 * Invariantes de la config de cada landing. Es data escrita a mano, y el
 * copy hace promesas de precio ("2ª al 50%", "3ª GRATIS", "3x2 en packs")
 * que tienen que cerrar contra los números cargados al lado.
 *
 * Nada de esto lo ve `tsc`: los tipos aceptan cualquier número.
 */
import { describe, it, expect } from 'vitest';
import { SOPORTE } from '@/lib/landings/soporte';
import { PARASOL } from '@/lib/landings/parasol';
import { SOPLADOR } from '@/lib/landings/soplador';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, STORE_PRICE_PERKS } from '@/lib/config';
import type { LandingConfig } from '@/lib/landings/types';

const LANDINGS: Record<string, LandingConfig> = {
  '/': SOPORTE,
  '/parasol': PARASOL,
  '/soplador': SOPLADOR,
};

const GID_PRODUCT = /^gid:\/\/shopify\/Product\/\d+$/;
const GID_VARIANT = /^gid:\/\/shopify\/ProductVariant\/\d+$/;

/**
 * Shopify redondea a los $10 (59.985 es exacto pero 67.485 quedó 67.490).
 * Una diferencia mayor ya no es redondeo: es que la promesa del copy no se
 * cumple y hay que cambiar el precio o el copy.
 */
const REDONDEO = 10;

describe.each(Object.entries(LANDINGS))('landing %s', (_ruta, cfg) => {
  const { bundles, upsellChain, fallbackPricing } = cfg;
  const single = bundles.find((b) => b.id === 'single')!;
  const double = bundles.find((b) => b.id === 'double')!;
  const triple = bundles.find((b) => b.id === 'triple')!;

  it('tiene los 3 bundles con 1, 2 y 3 unidades', () => {
    expect(bundles.map((b) => [b.id, b.quantity])).toEqual([
      ['single', 1],
      ['double', 2],
      ['triple', 3],
    ]);
  });

  it('productId y fallbackVariantId van juntos: los dos vacíos o los dos GIDs', () => {
    for (const b of bundles) {
      if (b.productId === '' && b.fallbackVariantId === '') continue;
      expect(b.productId, b.id).toMatch(GID_PRODUCT);
      expect(b.fallbackVariantId, b.id).toMatch(GID_VARIANT);
    }
  });

  it('el precio tachado es mayor que el real, y el real sube con las unidades', () => {
    for (const b of bundles) {
      expect(b.fallbackCompare, b.id).toBeGreaterThan(b.fallbackPrice);
    }
    expect(double.fallbackPrice).toBeGreaterThan(single.fallbackPrice);
    expect(triple.fallbackPrice).toBeGreaterThan(double.fallbackPrice);
  });

  it('cada unidad sale más barata cuantas más llevás', () => {
    const porUnidad = bundles.map((b) => b.fallbackPrice / b.quantity);
    expect(porUnidad[1]).toBeLessThan(porUnidad[0]);
    expect(porUnidad[2]).toBeLessThan(porUnidad[1]);
  });

  it('fallbackPricing es espejo del bundle x1', () => {
    expect(fallbackPricing.price).toBe(single.fallbackPrice);
    expect(fallbackPricing.compareAtPrice).toBe(single.fallbackCompare);
  });

  it('"2ª al 50%" cierra contra los precios', () => {
    const copy = `${double.subtitle} ${double.unitsLabel}`;
    if (!/50\s*%/.test(copy)) return;
    expect(Math.abs(double.fallbackPrice - single.fallbackPrice * 1.5)).toBeLessThanOrEqual(REDONDEO);
  });

  it('"3ª GRATIS" / 3x2 cierra contra los precios', () => {
    const copy = `${triple.subtitle} ${triple.unitsLabel} ${triple.badge ?? ''}`;
    if (!/GRATIS|3\s*X\s*2/i.test(copy)) return;
    expect(triple.fallbackPrice).toBeLessThanOrEqual(single.fallbackPrice * 2 + REDONDEO);
  });

  it('la chain arranca con los 3 bundles y las unidades suben en cada nivel', () => {
    for (const [i, b] of bundles.entries()) {
      expect(upsellChain[i], b.id).toMatchObject({
        id: b.id,
        productId: b.productId,
        fallbackVariantId: b.fallbackVariantId,
        quantity: b.quantity,
        fallbackPrice: b.fallbackPrice,
      });
    }
    for (let i = 1; i < upsellChain.length; i++) {
      expect(upsellChain[i].quantity, upsellChain[i].id).toBeGreaterThan(upsellChain[i - 1].quantity);
      expect(upsellChain[i].fallbackPrice, upsellChain[i].id).toBeGreaterThan(upsellChain[i - 1].fallbackPrice);
    }
  });
});

describe('ALL_UPSELL_CHAINS', () => {
  it('ningún GID se repite entre productos', () => {
    const productos = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);
    const variantes = ALL_UPSELL_CHAINS.map((t) => t.fallbackVariantId).filter(Boolean);
    expect(new Set(productos).size).toBe(productos.length);
    expect(new Set(variantes).size).toBe(variantes.length);
  });
});

describe('/tienda', () => {
  it('cada card apunta a su landing con el mismo handle y el mismo precio', () => {
    for (const p of STORE_PRODUCTS) {
      const cfg = LANDINGS[p.href];
      expect(cfg, `no hay landing para ${p.href}`).toBeDefined();
      expect(p.handle, p.title).toBe(cfg.brand.productHandle);
      expect(p.fallbackPrice, p.title).toBe(cfg.fallbackPricing.price);
    }
  });

  it('"3x2 en packs" se cumple en todo producto que ya se vende', () => {
    if (!STORE_PRICE_PERKS.some((p) => /3\s*x\s*2/i.test(p.label))) return;
    for (const [ruta, cfg] of Object.entries(LANDINGS)) {
      const single = cfg.bundles.find((b) => b.id === 'single')!;
      const triple = cfg.bundles.find((b) => b.id === 'triple')!;
      if (!triple.productId) continue; // todavía no existe en Shopify
      expect(triple.fallbackPrice, ruta).toBeLessThanOrEqual(single.fallbackPrice * 2 + REDONDEO);
    }
  });
});
