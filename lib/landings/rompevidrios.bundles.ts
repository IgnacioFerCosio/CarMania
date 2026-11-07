/**
 * Packs y escalera de upsell del Llavero Rescate PRO™.
 *
 * Están separados de `./llavero-rescate` a propósito: `lib/landings/index.ts` arma
 * la escalera de todas las landings y el carrito la usa en el cliente. Si esa
 * unión importara la config entera, todo el copy del advertorial se cargaría
 * en el JS de TODAS las páginas, `/` incluida. Este archivo es lo único de la
 * landing que puede llegar al navegador fuera de `/llavero-rescate`.
 *
 * REGLA: este archivo NO importa de `./llavero-rescate` ni del config raíz.
 */
import type { Bundle, UpsellTier } from './types';

/**
 * No hay pack de 1: los ids `single`/`double`/`triple` son los de 2, 4 y 6
 * unidades (el tipo `Bundle` y `Pricing` trabajan con esos tres ids). La
 * escalera del carrito sube de a 2, así que nunca ofrece "llevá 1 más".
 *
 * El tachado es el precio de lista de 1 unidad ($35.000) × cantidad.
 * Ojo: el tachado tiene que haber existido de verdad (ley de defensa del
 * consumidor). La unidad suelta existe en Shopify sólo para componer los
 * packs: no está publicada y su precio no se muestra en ningún lado.
 */
export const PRECIO_LISTA = 35000;

export const ROMPEVIDRIOS_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: 'gid://shopify/Product/10411376902259',
    fallbackVariantId: 'gid://shopify/ProductVariant/67135147376755',
    label: 'LLEVÁ 2',
    subtitle: 'Para vos y tu pareja',
    quantity: 2,
    unitsLabel: '2 llaveros',
    badge: null,
    bonus: 'Vidrio de prueba incluido',
    includes: [
      { icon: 'keychain', text: '2 llaveros' },
      { icon: 'glass', text: '2 vidrios de prueba (uno por llavero)' },
      { icon: 'mount', text: '2 soportes adhesivos' },
    ],
    freeShipping: true,
    recommended: false,
    fallbackPrice: 49990,
    fallbackCompare: PRECIO_LISTA * 2,
    image: '/rompevidrios/packs/pack-2x.webp',
  },
  {
    id: 'double',
    productId: 'gid://shopify/Product/10411360288883',
    fallbackVariantId: 'gid://shopify/ProductVariant/67135122473075',
    label: 'LLEVÁ 4',
    subtitle: 'Uno para cada auto de la familia',
    quantity: 4,
    unitsLabel: '4 llaveros',
    badge: 'EL MÁS ELEGIDO',
    bonus: 'Vidrio de prueba incluido',
    includes: [
      { icon: 'keychain', text: '4 llaveros' },
      { icon: 'glass', text: '4 vidrios de prueba (uno por llavero)' },
      { icon: 'mount', text: '4 soportes adhesivos' },
    ],
    freeShipping: true,
    recommended: true,
    fallbackPrice: 74990,
    fallbackCompare: PRECIO_LISTA * 4,
    image: '/rompevidrios/packs/pack-4x.webp',
  },
  {
    id: 'triple',
    productId: 'gid://shopify/Product/10411377459315',
    fallbackVariantId: 'gid://shopify/ProductVariant/67135148294259',
    label: 'LLEVÁ 6',
    subtitle: 'Para toda la familia',
    quantity: 6,
    unitsLabel: '6 llaveros',
    badge: 'MEJOR PRECIO',
    bonus: 'Vidrio de prueba incluido',
    includes: [
      { icon: 'keychain', text: '6 llaveros' },
      { icon: 'glass', text: '6 vidrios de prueba (uno por llavero)' },
      { icon: 'mount', text: '6 soportes adhesivos' },
    ],
    freeShipping: true,
    recommended: false,
    fallbackPrice: 99990,
    fallbackCompare: PRECIO_LISTA * 6,
    image: '/rompevidrios/packs/pack-6x.webp',
  },
];

export const ROMPEVIDRIOS_UPSELL_CHAIN: readonly UpsellTier[] = ROMPEVIDRIOS_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);
