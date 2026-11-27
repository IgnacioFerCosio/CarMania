/**
 * LandingConfig del Basurero Elegance PRO™ (landing `/basurero`).
 *
 * El producto: el basurero de portavasos que vende CarMount ("Car Trash Can",
 * carmount.com/shop/car-trash-can). Un cilindro de metal negro mate que entra
 * en el portavasos, con tapa que se abre apretándola y bolsitas de repuesto.
 * Investigación y checklist en docs/superpowers/specs/basurero-assets.md;
 * prompts de las imágenes en basurero-prompts.md.
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts). SÍ puede
 * importar de `./soporte`.
 *
 * ⚠️ PENDIENTES antes de que /basurero reciba tráfico:
 *   - Specs: son las que publica CarMount (6,5 × 14 cm, ~465 ml, metal, 30
 *     bolsitas). Nuestra unidad puede ser distinta: todo lo que sale de ahí
 *     está marcado `// TODO VERIFICAR (dato de CarMount)`.
 *   - Precios: provisorios, marcados `// TODO PRECIO REAL`. Cumplen las
 *     promesas del copy ("2ª al 50%", "3ª GRATIS"); lo vigila el test.
 *   - Shopify: los 3 productos no existen (`productId` en `''`): el botón
 *     queda deshabilitado ("Producto no disponible").
 *   - Imágenes: TODAS son cajas "FOTO PENDIENTE" con su ID (BAS-01…15). Las
 *     fotos de CarMount NO se usan (tienen su logo y son suyas): sólo son la
 *     referencia para generar las nuestras.
 *   - Reseñas: 8, sin fotos, ciudad ni fecha (ver BASURERO_REVIEWS).
 */
import type { Bundle, LandingConfig, Review, UpsellTier } from './types';
import { SOPORTE } from './soporte';

/**
 * Reseñas del Elegance PRO (las pasó Ignacio el 2026-11-27 como reales, sin
 * fotos, ciudad ni fecha). Mismo formato que las otras landings; el título que
 * traían ("¡Buenísimo!", etc.) no entra en el formato y quedó afuera. Sin
 * `image`, la tarjeta es sólo texto; si llegan fotos de los clientes, van en
 * `image` (no fotos generadas). Ciudad y fecha, vacías hasta tenerlas.
 * Para sumar una: mismo formato, y actualizar `ratingBreakdown`.
 */
const BASURERO_REVIEWS: readonly Review[] = [
  {
    name: 'Laura M.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'Me encantó. Es re lindo, no parece un tacho de basura y queda perfecto en el portavasos. Muy práctico.',
    date: '', // TODO — fecha
    verified: true,
  },
  {
    name: 'Juan Ignacio P.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'Se nota que es de metal y no de plástico barato. El tamaño es ideal para el auto y encima viene con las bolsitas.',
    date: '', // TODO — fecha
    verified: true,
  },
  {
    name: 'Valentina G.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'Por fin un tacho de basura que no queda feo en el auto. Es re discreto, elegante y la tapa funciona espectacular.',
    date: '', // TODO — fecha
    verified: true,
  },
  {
    name: 'Carlos T.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'Ideal para tirar los papelitos, tickets y cositas que siempre quedan dando vueltas. Entra de diez en la consola central.',
    date: '', // TODO — fecha
    verified: true,
  },
  {
    name: 'Sofía B.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'Espectacular. Es chiquito pero súper útil. Te viene con los rollos de bolsitas que son re fáciles de cambiar. Muy cómodo.',
    date: '', // TODO — fecha
    verified: true,
  },
  {
    name: 'Diego F.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'Basta de bolsitas de súper colgadas por todos lados. Este tachito queda impecable y no molesta para nada.',
    date: '', // TODO — fecha
    verified: true,
  },
  {
    name: 'Martina R.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'La verdad que me sorprendió para bien. Es re fuerte, la tapa cierra perfecto y se limpia en un segundo. Un golazo.',
    date: '', // TODO — fecha
    verified: true,
  },
  {
    name: 'Mariano L.',
    location: '', // TODO — ciudad
    stars: 5,
    text: 'Cumple de diez. Calza justo en el portavasos de la puerta o del medio. Una de las mejores compras que hice para el auto.',
    date: '', // TODO — fecha
    verified: true,
  },
];

const BASURERO_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el producto x1 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Chau basura en el piso.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ 30 bolsitas de regalo', // TODO VERIFICAR (dato de CarMount)
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
    bonus: '+ 60 bolsitas de regalo',
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
    bonus: '+ 90 bolsitas de regalo',
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
    reviewsCount: BASURERO_REVIEWS.length,
  },
  // Espejo del bundle x1.
  fallbackPricing: {
    price: 29990, // TODO PRECIO REAL
    compareAtPrice: 54990, // TODO PRECIO REAL
    currency: 'ARS',
  },
  headlines: {
    heroLine1: 'Chau basura',
    heroLine2: 'en el piso del auto',
    heroSub:
      'Un basurero de metal que entra en el portavasos. Apretás la tapa, tirás el papel y la cerrás: el auto queda limpio y sin bolsitas colgando.',
    finalCta: 'Tu auto limpio, sin pensarlo.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Elegance PRO',
    benefitsTitle: 'El lugar que le faltaba a tu auto',
    benefitsSub:
      'Si no hay dónde tirar el ticket, termina en la puerta, en el piso o abajo del asiento. Con el Elegance PRO lo tirás en el momento y el auto nunca llega a ensuciarse.',
  },
  heroMedia: {
    // 540×540 H.264 sin audio, CRF 30, ~410 KB (como el del trabavolante).
    // ⚠️ Es el video de producto de CarMount desde 1,8 s (sin el tramo de la caja, 10 s): se ve su logo en
    // la caja y en el producto. Decisión de Ignacio (2026-11-27), a sabiendas
    // de que es material de ellos. Reemplazarlo por uno propio cuando
    // tengamos producto. El poster es su primer frame (el LCP).
    kind: 'video',
    src: '/basurero/hero/basurero-hero.mp4',
    poster: '/basurero/hero/basurero-hero-poster.webp',
    width: 540,
    height: 540,
    // Cortos: "PORTAVASOS" no entra en el ancho del badge.
    badgeLine1: 'CUERPO',
    badgeLine2: 'DE METAL',
  },
  heroSubHighlights: ['entra en el portavasos', 'sin bolsitas colgando'],
  sectionCopy: {
    pricingTitle: 'Probá tu Elegance PRO',
    pricingTitleAccent: '30 días gratis',
    reviewsTitle: 'Opiniones de',
    reviewsTitleAccent: 'clientes',
    reviewsFooter: 'de autos siempre limpios.',
    faqEyebrow: 'Dudas frecuentes',
    faqTitle: 'Respondemos lo que más nos preguntan',
    carBrandsTitle: 'Entra en',
    carBrandsTitleAccent: 'cualquier auto',
    useCasesTitle: 'Apretá. Tirá. Listo.',
    // Sin prefijo "Para": los labels ya son beneficios, como en el trabavolante.
    useCasesPrefix: '',
  },
  // "Entra en cualquier auto", antes de qué incluye: las marcas de la tira
  // del soporte.
  carBrands: SOPORTE.carBrands,
  /** Beneficios en 6 cuadros (primera palabra blanca, última en accent). */
  useCases: [
    { label: 'EN EL PORTAVASOS', image: '/basurero/use-cases/portavasos.webp', alt: 'El basurero puesto en el portavasos, al lado de la palanca de cambios' },
    { label: 'ABRE AL TOQUE', image: '/basurero/use-cases/tapa.webp', alt: 'Un dedo apretando la tapa del basurero para abrirla' },
    { label: 'CUERPO DE METAL', image: '/basurero/use-cases/metal.webp', alt: 'Primer plano del cuerpo de metal negro mate del basurero' },
    { label: 'BOLSITAS INCLUIDAS', image: '/basurero/use-cases/bolsitas.webp', alt: 'El basurero con una bolsita de repuesto puesta adentro' },
    { label: 'AUTOS CON PERILLA', image: '/basurero/use-cases/perilla.webp', alt: 'El basurero en el portavasos de un SUV nuevo, al lado de la perilla de cambios' },
    { label: 'VA EN LA PUERTA', image: '/basurero/use-cases/puerta.webp', alt: 'El basurero guardado en el bolsillo de la puerta del auto' },
  ],
  steps: [
    {
      n: 1,
      title: 'Ponelo en el portavasos',
      // TODO VERIFICAR (dato de CarMount) — 6,5 cm de diámetro.
      desc: 'Mide 6,5 cm de diámetro: entra en el portavasos de casi cualquier auto y queda firme. Si lo necesitás libre, va en el bolsillo de la puerta.',
      image: '/basurero/how-to-use/01-ponelo-en-el-portavasos.webp',
    },
    {
      n: 2,
      title: 'Apretá y tirá',
      desc: 'Apretás la tapa, tirás el ticket, el pañuelo o el envoltorio y la cerrás. Con una mano y sin sacar la vista de la calle.',
      image: '/basurero/how-to-use/02-apreta-y-tira.webp',
    },
    {
      n: 3,
      title: 'Cambiá la bolsita',
      desc: 'Cuando se llena, sacás la bolsita, ponés una nueva y listo. Sin tachos sucios ni papeles sueltos.',
      image: '/basurero/how-to-use/03-cambia-la-bolsita.webp',
    },
  ],
  // No se muestran en la página (no usa Benefits), pero el tipo los pide.
  benefits: [
    {
      icon: 'check',
      title: 'Entra en el portavasos',
      // TODO VERIFICAR (dato de CarMount) — 6,5 × 14 cm.
      desc: '6,5 cm de diámetro y 14 cm de alto.',
      highlight: true,
    },
    {
      icon: 'bolt',
      title: 'Se abre con un toque',
      desc: 'Apretás la tapa y tirás, con una mano.',
      highlight: true,
    },
    {
      icon: 'shield',
      title: 'De metal',
      desc: 'No se rompe ni se ve barato.',
      highlight: false,
    },
    {
      icon: 'sparkles',
      title: 'Bolsitas de repuesto',
      // TODO VERIFICAR (dato de CarMount) — 30 bolsitas.
      desc: 'Se vacía en segundos, sin ensuciarse.',
      highlight: false,
    },
  ],
  pitchBlocks: [
    {
      eyebrow: 'El problema',
      headline: 'LA BASURA DEL AUTO SIEMPRE TERMINA EN EL PISO',
      accentWord: 'EN EL PISO',
      body: 'El ticket del estacionamiento, el pañuelo, el envoltorio del alfajor. Sin un lugar donde tirarlos, terminan en la puerta o abajo del asiento. El Elegance PRO está siempre a mano, en el portavasos.',
    },
  ],
  whatsInBox: {
    // La lista ya va bajo un "¿Qué incluye?" fijo del componente.
    headline: 'Todo para un auto siempre limpio',
    lead: 'Chau bolsita colgada del asiento.',
    body: ' El Elegance PRO viene con las bolsitas de repuesto, así lo vaciás en segundos desde el primer día.',
    note: 'También sirve en la camioneta del trabajo, en la lancha o en el escritorio.',
    // TODO VERIFICAR (dato de CarMount) — qué trae nuestra caja y cuántas bolsitas.
    items: ['1 Basurero Elegance PRO™', '30 bolsitas de repuesto'],
    // La de Juan Ignacio: habla del metal y de las bolsitas que trae la caja.
    testimonial: BASURERO_REVIEWS[1],
    gallery: [
      { src: '/basurero/whats-in-box/que-incluye.webp', alt: 'La caja, el Basurero Elegance PRO y las bolsitas de repuesto' },
    ],
  },
  reviews: BASURERO_REVIEWS,
  ratingBreakdown: {
    average: 5, // 40 / 8
    total: BASURERO_REVIEWS.length,
    stars: [
      { stars: 5, count: 8 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  },
  /**
   * Comparativa (después de los packs): contra lo que la gente usa hoy, la
   * bolsita colgada del asiento y el basurero de plástico. Las figuras son
   * recortes sin fondo (webp con alfa) en `public/basurero/comparativa/`.
   */
  comparison: {
    title: 'No es un basurero más.',
    accent: 'más.',
    columns: [
      { name: 'Elegance PRO™', image: '/basurero/comparativa/elegance-pro.webp', width: 235, height: 420 },
      { name: 'Bolsita colgada', image: '/basurero/comparativa/bolsita-colgada.webp', width: 336, height: 378 },
      { name: 'Basurero de plástico', image: '/basurero/comparativa/basurero-plastico.webp', width: 336, height: 378 },
    ],
    rows: [
      { label: 'Entra en el portavasos', values: [true, false, 'a veces'] },
      { label: 'Queda cerrado', values: [true, false, 'a veces'] },
      { label: 'Firme en las curvas', values: [true, false, false] },
      { label: 'De metal, no se rompe', values: [true, false, false] },
      { label: 'Bolsitas de repuesto incluidas', values: [true, false, false] },
      { label: 'Estética premium', values: [true, false, false] },
      { label: 'Ideal en autos nuevos con perilla', values: [true, false, false] },
    ],
  },
  /**
   * Debajo de la comparativa: la prueba de la lata. Una lata común mide
   * 6,6 cm de diámetro; el Elegance PRO, 6,5 (TODO VERIFICAR, dato de
   * CarMount): si la medida real del proveedor es más ancha, esto deja de ser
   * cierto y hay que cambiarlo.
   */
  fitCheck: {
    eyebrow: 'Antes de comprar',
    title: '¿Entra en tu portavasos?',
    accent: 'portavasos?',
    steps: ['¿Entra una lata de gaseosa?', 'Entonces entra el Elegance PRO.'],
    diameter: '6,5 cm',
    height: '14 cm',
    tips: [
      {
        icon: 'check',
        title: 'La prueba de la lata',
        desc: 'Mide 6,5 cm de diámetro, lo mismo que una lata. Si la lata entra en tu portavasos, el Elegance PRO también.',
      },
      {
        icon: 'rotate',
        title: 'Al lado de la perilla',
        desc: 'En los autos nuevos que cambian con perilla, la consola queda despejada y el basurero, a mano.',
      },
      {
        icon: 'shield',
        title: '¿Portavasos muy ancho?',
        desc: 'También va en el bolsillo de la puerta, parado o acostado.',
      },
    ],
    cta: { label: 'Quiero el mío', href: '#pricing' },
  },
  faq: [
    {
      q: '¿Entra en el portavasos de mi auto?',
      // TODO VERIFICAR (dato de CarMount) — medidas.
      a: 'Mide 6,5 cm de diámetro y 14 cm de alto, así que entra en la mayoría de los portavasos, de un auto chico a una camioneta. Si tu portavasos es más ancho o lo necesitás libre, también va en el bolsillo de la puerta.',
    },
    {
      q: '¿Sirve en los autos nuevos que tienen perilla en vez de palanca?',
      a: 'Sí, y ahí es donde mejor queda. En los autos que cambian con una perilla giratoria, la consola queda despejada y el portavasos a mano: el Elegance PRO va justo ahí, al lado de la perilla, y combina con ese interior.',
    },
    {
      q: '¿Cuánto le entra?',
      // TODO VERIFICAR (dato de CarMount) — ~465 ml.
      a: 'Unos 465 ml: tickets, pañuelos, envoltorios, chicles y el papelito del estacionamiento. Es para la basura de todos los días, no para una botella entera.',
    },
    {
      q: '¿Cómo se vacía?',
      a: 'Sacás la bolsita, ponés una nueva y listo. Lleva unos segundos y no te ensuciás las manos.',
    },
    {
      q: '¿Se mueve cuando manejo?',
      a: 'En un portavasos de su medida queda firme, también en las curvas y los pozos.',
    },
    {
      q: '¿De qué está hecho?',
      // TODO VERIFICAR (dato de CarMount) — material exacto.
      a: 'El cuerpo es de metal: aguanta el uso de todos los días y queda bien en cualquier interior, no parece un tacho de plástico.',
    },
    {
      q: '¿Trae bolsitas?',
      // TODO VERIFICAR (dato de CarMount) — 30 bolsitas.
      a: 'Sí, viene con 30 bolsitas de repuesto.',
    },
    {
      q: '¿Lo puedo usar fuera del auto?',
      a: 'Sí. Sirve en la camioneta del trabajo, en la lancha, en el motorhome o arriba del escritorio.',
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
    title: 'Basurero Elegance PRO™ — CARMANIA',
    description:
      'Basurero de metal para el auto que entra en el portavasos: apretás la tapa, tirás y listo. Con bolsitas de repuesto. Envío gratis y 30 días de devolución.',
    ogTitle: 'Basurero Elegance PRO™ — CARMANIA',
    ogDescription:
      'Chau basura en el piso del auto. Entra en el portavasos, se abre con un toque y es de metal. Envío gratis y devolución 30 días.',
    canonical: '/basurero',
  },
} satisfies LandingConfig;
