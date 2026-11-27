/**
 * LandingConfig del Basurero Elegance PRO™ (landing `/basurero`).
 *
 * ESQUELETO CON PLACEHOLDERS. La estructura es la de /inflador y
 * /trabavolante; el contenido real (producto, fotos, copy, precios) todavía
 * no está. Checklist en docs/superpowers/specs/basurero-assets.md.
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts). SÍ puede
 * importar de `./soporte`.
 *
 * ⚠️ TODO lo de abajo es provisorio:
 *   - Copy: genérico de basurero de auto, marcado `// TODO COPY`. A propósito
 *     NO promete specs (capacidad, material, medidas, si es impermeable, cómo
 *     se sujeta): eso sale del producto real.
 *   - Precios: provisorios, marcados `// TODO PRECIO REAL`. Cumplen las
 *     promesas del copy ("2ª al 50%", "3ª GRATIS"); lo vigila el test.
 *   - Shopify: los 3 productos no existen (`productId` en `''`): el botón
 *     queda deshabilitado ("Producto no disponible").
 *   - Imágenes: TODAS son cajas "FOTO PENDIENTE" con su ID (BAS-01…15).
 *     Se reemplazan subiendo el archivo con el mismo nombre y tamaño.
 *   - Reseñas: ninguna. La sección no sale hasta cargar reales.
 */
import type { Bundle, LandingConfig, UpsellTier } from './types';
import { SOPORTE } from './soporte';

const BASURERO_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el producto x1 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Tu auto ordenado.', // TODO COPY
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: 'Bonus provisorio', // TODO COPY
    freeShipping: true,
    recommended: false,
    fallbackPrice: 29990, // TODO PRECIO REAL
    fallbackCompare: 54990, // TODO PRECIO REAL
    image: '/basurero/bundles/BasureroX1.webp',
  },
  {
    id: 'double',
    productId: '', // TODO SHOPIFY — el producto x2 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 2',
    subtitle: '50% OFF en la 2ª unidad.',
    quantity: 2,
    unitsLabel: '2 unidades · 2ª al 50%',
    badge: 'MÁS ELEGIDO',
    bonus: 'Uno para cada auto de la casa', // TODO COPY
    freeShipping: true,
    recommended: true,
    fallbackPrice: 44990, // TODO PRECIO REAL — 1,5 × el x1 (redondeado)
    fallbackCompare: 109980, // TODO PRECIO REAL
    image: '/basurero/bundles/BasureroX2.webp',
  },
  {
    id: 'triple',
    productId: '', // TODO SHOPIFY — el producto x3 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 3',
    subtitle: 'La 3ª unidad es GRATIS.',
    quantity: 3,
    unitsLabel: '3 unidades · 3ª GRATIS',
    badge: '3X2',
    bonus: 'Para regalar', // TODO COPY
    freeShipping: true,
    recommended: false,
    fallbackPrice: 59980, // TODO PRECIO REAL — 2 × el x1
    fallbackCompare: 164970, // TODO PRECIO REAL
    image: '/basurero/bundles/BasureroX3.webp',
  },
];

const BASURERO_UPSELL_CHAIN: readonly UpsellTier[] = BASURERO_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);

export const BASURERO = {
  brand: {
    tagline: 'Basurero Elegance PRO™',
    productHandle: 'basurero-elegance-pro', // TODO SHOPIFY — confirmar al crear el producto
    // Estrellas y clientes de arriba de los packs: los de la marca (los del
    // soporte), como en /trabavolante. El producto todavía no tiene los suyos.
    socialProofCount: SOPORTE.brand.socialProofCount,
    socialProofLabel: SOPORTE.brand.socialProofLabel,
    averageRating: SOPORTE.brand.averageRating,
    reviewsCount: 0,
  },
  // Espejo del bundle x1.
  fallbackPricing: {
    price: 29990, // TODO PRECIO REAL
    compareAtPrice: 54990, // TODO PRECIO REAL
    currency: 'ARS',
  },
  // TODO COPY — todos los textos de la landing.
  headlines: {
    heroLine1: 'Tu auto ordenado',
    heroLine2: 'sin bolsitas colgando',
    heroSub:
      'Un lugar fijo para la basura del auto: tickets, envoltorios, pañuelos y botellitas. Texto provisorio hasta tener el producto.',
    finalCta: 'Tu auto, como el primer día.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Elegance PRO',
    benefitsTitle: 'Chau a la basura en el piso',
    benefitsSub: 'Texto provisorio: el beneficio principal del basurero, en una o dos líneas.',
  },
  heroMedia: {
    // TODO FOTO — BAS-01. Puede pasar a video (como el del trabavolante).
    kind: 'image',
    src: '/basurero/hero/basurero-hero.webp',
    width: 1080,
    height: 1080,
    badgeLine1: 'ELEGANCE', // TODO COPY
    badgeLine2: 'PRO',
  },
  heroSubHighlights: ['basura del auto'], // TODO COPY
  sectionCopy: {
    pricingTitle: 'Probá tu Elegance PRO',
    pricingTitleAccent: '30 días gratis',
    reviewsTitle: 'Opiniones de',
    reviewsTitleAccent: 'clientes',
    reviewsFooter: 'de autos ordenados.',
    faqEyebrow: 'Dudas frecuentes',
    faqTitle: 'Respondemos lo que más nos preguntan',
    carBrandsTitle: 'Entra en',
    carBrandsTitleAccent: 'cualquier auto',
    useCasesTitle: 'Ordenado. Limpio. Listo.', // TODO COPY
    useCasesPrefix: '',
  },
  // No se muestra (la página no usa CarBrands). Va porque el tipo lo pide.
  // Si el basurero resulta universal, se puede sumar la sección.
  carBrands: SOPORTE.carBrands,
  /** Beneficios en 6 cuadros (primera palabra blanca, última en accent). TODO COPY */
  useCases: [
    { label: 'BENEFICIO UNO', image: '/basurero/use-cases/beneficio-1.webp', alt: 'Basurero Elegance PRO — beneficio 1' },
    { label: 'BENEFICIO DOS', image: '/basurero/use-cases/beneficio-2.webp', alt: 'Basurero Elegance PRO — beneficio 2' },
    { label: 'BENEFICIO TRES', image: '/basurero/use-cases/beneficio-3.webp', alt: 'Basurero Elegance PRO — beneficio 3' },
    { label: 'BENEFICIO CUATRO', image: '/basurero/use-cases/beneficio-4.webp', alt: 'Basurero Elegance PRO — beneficio 4' },
    { label: 'BENEFICIO CINCO', image: '/basurero/use-cases/beneficio-5.webp', alt: 'Basurero Elegance PRO — beneficio 5' },
    { label: 'BENEFICIO SEIS', image: '/basurero/use-cases/beneficio-6.webp', alt: 'Basurero Elegance PRO — beneficio 6' },
  ],
  // TODO COPY — los pasos dependen de cómo se instala el producto real.
  steps: [
    {
      n: 1,
      title: 'Paso 1',
      desc: 'Texto provisorio: cómo se coloca en el auto.',
      image: '/basurero/how-to-use/01-paso-1.webp',
    },
    {
      n: 2,
      title: 'Paso 2',
      desc: 'Texto provisorio: cómo se usa en el día a día.',
      image: '/basurero/how-to-use/02-paso-2.webp',
    },
    {
      n: 3,
      title: 'Paso 3',
      desc: 'Texto provisorio: cómo se vacía y se limpia.',
      image: '/basurero/how-to-use/03-paso-3.webp',
    },
  ],
  // TODO COPY — no se muestran en la página (no usa Benefits), pero el tipo
  // los pide.
  benefits: [
    { icon: 'check', title: 'Beneficio 1', desc: 'Texto provisorio.', highlight: true },
    { icon: 'shield', title: 'Beneficio 2', desc: 'Texto provisorio.', highlight: true },
    { icon: 'sparkles', title: 'Beneficio 3', desc: 'Texto provisorio.', highlight: false },
    { icon: 'leaf', title: 'Beneficio 4', desc: 'Texto provisorio.', highlight: false },
  ],
  pitchBlocks: [
    {
      eyebrow: 'El problema',
      headline: 'LA BASURA DEL AUTO SIEMPRE TERMINA EN EL PISO',
      accentWord: 'EN EL PISO',
      body: 'Texto provisorio: el problema que resuelve el Elegance PRO.',
    },
  ],
  whatsInBox: {
    // La lista ya va bajo un "¿Qué incluye?" fijo del componente.
    headline: 'Todo lo que viene en la caja', // TODO COPY
    lead: 'Texto provisorio.',
    body: ' Qué trae el Elegance PRO, cuando tengamos el producto.',
    note: 'Nota provisoria.',
    // TODO VERIFICAR — el contenido real de la caja.
    items: ['1 Basurero Elegance PRO™'],
    gallery: [
      { src: '/basurero/whats-in-box/que-incluye.webp', alt: 'La caja y el Basurero Elegance PRO' },
    ],
  },
  reviews: [],
  ratingBreakdown: {
    average: 0,
    total: 0,
    stars: [
      { stars: 5, count: 0 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  },
  /**
   * Comparativa (después de los packs). TODO COPY — contra qué se compara
   * (bolsita colgada, basurero común…) y las filas. `image` vacía = la
   * columna sale sin figura.
   */
  comparison: {
    title: 'No es un basurero más.',
    accent: 'más.',
    columns: [
      { name: 'Elegance PRO™', image: '', width: 240, height: 420 },
      { name: 'Bolsita colgada', image: '', width: 336, height: 378 },
      { name: 'Basurero común', image: '', width: 336, height: 378 },
    ],
    rows: [
      { label: 'Ventaja 1', values: [true, false, false] },
      { label: 'Ventaja 2', values: [true, false, true] },
      { label: 'Ventaja 3', values: [true, true, false] },
    ],
  },
  faq: [
    {
      q: '¿Entra en mi auto?', // TODO COPY
      a: 'Texto provisorio: compatibilidad y dónde se coloca.',
    },
    {
      q: '¿Cómo se limpia?', // TODO COPY
      a: 'Texto provisorio.',
    },
    {
      q: '¿Cuánto tarda en llegar?',
      // TODO: completar con los plazos reales de Andreani por zona antes de publicar
      a: 'El envío es gratis a todo el país y sale con código de seguimiento para verlo en tiempo real desde que despachamos. Los plazos de entrega varían según la zona.',
    },
    {
      q: '¿Puedo devolverlo si no me convence?',
      a: 'Sí. Si por cualquier motivo decidís que el Elegance PRO no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
    },
  ],
  qualityBadges: [
    {
      badge: '30',
      badgeSub: 'DÍAS',
      title: 'DEVOLUCIÓN 30 DÍAS',
      desc: 'Si por cualquier motivo decidís que CARMANIA no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
    },
    {
      badge: '1',
      badgeSub: 'AÑO',
      title: 'GARANTÍA 1 AÑO',
      desc: 'Si tu basurero CARMANIA no funciona como esperabas, te lo reemplazamos completo. Vos seguís manejando tranquilo.',
    },
    {
      badge: '★',
      badgeSub: 'USUARIOS',
      title: 'PROBADO POR CLIENTES REALES',
      desc: 'Para crear el CARMANIA definitivo, cada decisión de diseño la validamos con clientes reales. El producto es lo que es gracias a ellos.',
    },
  ],
  certifications: {
    enabled: false,
    title: 'Certificado por',
    desc: '',
    items: [],
  },
  trustPillars: SOPORTE.trustPillars,
  bundles: BASURERO_BUNDLES,
  upsellChain: BASURERO_UPSELL_CHAIN,
  whatsappPrefilled: 'Hola CARMANIA! Quería consultar por el Basurero Elegance PRO...',
  metadata: {
    // TODO COPY
    title: 'Basurero Elegance PRO™ — CARMANIA',
    description:
      'Basurero para el auto: tu auto ordenado y sin basura en el piso. Envío gratis y 30 días de devolución.',
    ogTitle: 'Basurero Elegance PRO™ — CARMANIA',
    ogDescription: 'Tu auto ordenado y sin basura en el piso. Envío gratis y devolución 30 días.',
    canonical: '/basurero',
  },
} satisfies LandingConfig;
