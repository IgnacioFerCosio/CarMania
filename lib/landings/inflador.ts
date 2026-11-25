/**
 * LandingConfig del Inflador Pulse PRO™ (landing `/inflador`).
 *
 * Producto del proveedor: "Mini compresor de aire inflador portátil Lambo
 * Tech LT-26010 multiuso recargable" (código D-07402; en fábrica, ATJ-006).
 * Es la familia de infladores inalámbricos de 150 PSI con pantalla digital,
 * corte automático, 4 modos (auto, moto, bici, pelota) y luz LED que venden
 * Powools, Teffim y decenas de marcas genéricas. Investigación y checklist en
 * docs/superpowers/specs/inflador-assets.md.
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts). SÍ puede
 * importar de `./soporte`.
 *
 * ⚠️ PLACEHOLDERS pendientes antes de que /inflador reciba tráfico:
 *   - Precios: provisorios, marcados `// TODO PRECIO REAL`. Cumplen las
 *     promesas del copy ("2ª al 50%", "3ª GRATIS"); lo vigila el test.
 *   - Shopify: los 3 productos no existen (`productId` en `''`): el botón
 *     queda deshabilitado ("Producto no disponible").
 *   - Imágenes: TODAS son cajas "FOTO PENDIENTE" con su ID (INF-01…15), que
 *     dicen qué va. Se reemplazan subiendo el archivo con el mismo nombre.
 *   - Reseñas: ninguna. La sección no sale hasta cargar reales.
 *
 * ⚠️ SOBRE LAS SPECS. Sólo uso lo que se ve en la foto del proveedor (la
 * caja muestra pantalla digital y 4 modos: auto, moto, bici y pelota; en la
 * bolsa vienen manguera, cable USB, picos y manual) y lo que comparten TODAS
 * las fichas del ATJ-006: 150 PSI de máxima y corte automático. Lo que varía
 * entre vendedores (mAh: 2000×2, 4000, 6000; tiempo de inflado; puerto de
 * carga; función powerbank) NO se promete hasta medir una unidad nuestra.
 * Lo que hay que confirmar está marcado `// TODO VERIFICAR`.
 */
import type { Bundle, LandingConfig, UpsellTier } from './types';
import { SOPORTE } from './soporte';

const INFLADOR_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el producto x1 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Nunca más sin aire.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ manguera y picos para todo',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 49990, // TODO PRECIO REAL
    fallbackCompare: 89990, // TODO PRECIO REAL
    image: '/inflador/bundles/InfladorX1.webp',
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
    bonus: 'Uno para cada auto de la casa',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 74990, // TODO PRECIO REAL — 1,5 × el x1 (redondeado)
    fallbackCompare: 179980, // TODO PRECIO REAL
    image: '/inflador/bundles/InfladorX2.webp',
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
    bonus: 'Para regalar (o para la moto)',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 99980, // TODO PRECIO REAL — 2 × el x1
    fallbackCompare: 269970, // TODO PRECIO REAL
    image: '/inflador/bundles/InfladorX3.webp',
  },
];

const INFLADOR_UPSELL_CHAIN: readonly UpsellTier[] = INFLADOR_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);

export const INFLADOR = {
  brand: {
    tagline: 'Inflador Pulse PRO™',
    productHandle: 'inflador-pulse-pro', // TODO SHOPIFY — confirmar al crear el producto
    // Estrellas y clientes de arriba de los packs: los de la marca (los del
    // soporte), como en /trabavolante. El producto todavía no tiene los suyos.
    socialProofCount: SOPORTE.brand.socialProofCount,
    socialProofLabel: SOPORTE.brand.socialProofLabel,
    averageRating: SOPORTE.brand.averageRating,
    reviewsCount: 0,
  },
  // Espejo del bundle x1.
  fallbackPricing: {
    price: 49990, // TODO PRECIO REAL
    compareAtPrice: 89990, // TODO PRECIO REAL
    currency: 'ARS',
  },
  headlines: {
    heroLine1: 'Inflá la rueda',
    heroLine2: 'sin buscar una gomería',
    heroSub:
      'Elegís la presión en la pantalla, apretás un botón y se corta solo cuando llega. Sin cables y tan chico que vive en la guantera.',
    finalCta: 'Elegí la presión. Apretá. Listo.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Pulse PRO',
    benefitsTitle: 'La gomería en la guantera',
    benefitsSub:
      'Una rueda baja gasta más nafta, se gasta antes y frena peor. Con el Pulse PRO la controlás en tu casa, en dos minutos.',
  },
  heroMedia: {
    // TODO FOTO — INF-01. Ideal: un video corto (como el del trabavolante)
    // con el inflador en la mano y la pantalla subiendo hasta cortar.
    kind: 'image',
    src: '/inflador/hero/inflador-hero.webp',
    width: 1080,
    height: 1080,
    badgeLine1: '150 PSI',
    badgeLine2: 'SIN CABLES',
  },
  heroSubHighlights: ['se corta solo', 'Sin cables'],
  sectionCopy: {
    pricingTitle: 'Probá tu Pulse PRO',
    pricingTitleAccent: '30 días gratis',
    reviewsTitle: 'Opiniones de',
    reviewsTitleAccent: 'clientes',
    reviewsFooter: 'de ruedas siempre a punto.',
    faqEyebrow: 'Dudas frecuentes',
    faqTitle: 'Respondemos lo que más nos preguntan',
    carBrandsTitle: 'Sirve en',
    carBrandsTitleAccent: 'cualquier auto',
    useCasesTitle: 'Elegí. Apretá. Listo.',
    // Sin prefijo "Para": los labels ya son beneficios, como en el trabavolante.
    useCasesPrefix: '',
  },
  // No se muestra (la página no usa CarBrands: sirve para cualquier válvula,
  // no depende de la marca del auto). Va porque el tipo lo pide.
  carBrands: SOPORTE.carBrands,
  /** Beneficios en 6 cuadros (primera palabra blanca, última en accent). */
  useCases: [
    { label: 'SIN CABLES', image: '/inflador/use-cases/inalambrico.webp', alt: 'Inflando la rueda de un auto en la ruta, sin cable a la cigarrera' },
    { label: 'PANTALLA DIGITAL', image: '/inflador/use-cases/pantalla.webp', alt: 'La pantalla del inflador marcando la presión' },
    { label: 'CORTE AUTOMÁTICO', image: '/inflador/use-cases/corte.webp', alt: 'El inflador se apaga solo al llegar a la presión elegida' },
    { label: 'CUATRO MODOS', image: '/inflador/use-cases/modos.webp', alt: 'Los modos de auto, moto, bici y pelota' },
    { label: 'LUZ LED', image: '/inflador/use-cases/luz.webp', alt: 'Inflando una rueda de noche con la luz del inflador' },
    { label: 'ENTRA EN LA GUANTERA', image: '/inflador/use-cases/guantera.webp', alt: 'El inflador guardado en la guantera del auto' },
  ],
  steps: [
    {
      n: 1,
      title: 'Enroscá la manguera',
      desc: 'La manguera flexible se enrosca en la válvula de la rueda. Para la bici, la pelota o un inflable, usás el pico que corresponda.',
      image: '/inflador/how-to-use/01-enrosca-la-manguera.webp',
    },
    {
      n: 2,
      title: 'Elegí la presión',
      desc: 'Prendelo, elegí el modo (auto, moto, bici o pelota) y ajustá la presión que dice tu auto. La pantalla te muestra la que tiene ahora.',
      image: '/inflador/how-to-use/02-elegi-la-presion.webp',
    },
    {
      n: 3,
      title: 'Apretá y olvidate',
      desc: 'Infla solo y se corta cuando llega a la presión exacta. Sin pasarte, sin manómetro aparte y sin agacharte a medir.',
      image: '/inflador/how-to-use/03-se-corta-solo.webp',
    },
  ],
  benefits: [
    {
      icon: 'bolt',
      title: 'Hasta 150 PSI',
      // TODO VERIFICAR — 150 PSI es lo que dicen todas las fichas del ATJ-006.
      desc: 'Alcanza para autos, camionetas, motos y bicis de ruta.',
      highlight: true,
    },
    {
      icon: 'check',
      title: 'Corte automático',
      desc: 'Se apaga solo al llegar a la presión que elegiste.',
      highlight: true,
    },
    {
      icon: 'rotate',
      title: 'Inalámbrico',
      // TODO VERIFICAR — puerto de carga (USB-C o micro USB) y autonomía.
      desc: 'Batería recargable por USB: sin cable a la cigarrera.',
      highlight: false,
    },
    {
      icon: 'sparkles',
      title: 'Luz LED',
      desc: 'Para la rueda que se pincha de noche.',
      highlight: false,
    },
    {
      icon: 'shield',
      title: 'Pantalla digital',
      desc: 'Medís la presión antes de inflar: también es tu manómetro.',
      highlight: false,
    },
    {
      icon: 'leaf',
      title: 'Compacto',
      desc: 'Entra en la guantera, en la puerta o en la mochila.',
      highlight: false,
    },
  ],
  pitchBlocks: [
    {
      eyebrow: 'El problema',
      headline: 'LA RUEDA SIEMPRE SE BAJA DONDE NO HAY GOMERÍA',
      accentWord: 'NO HAY GOMERÍA',
      body: 'Un domingo, de noche, en la ruta o con el compresor de la estación roto. El Pulse PRO está siempre en la guantera: inflás en dos minutos y seguís viaje.',
    },
  ],
  whatsInBox: {
    // La lista ya va bajo un "¿Qué incluye?" fijo del componente.
    headline: 'Todo para inflar lo que sea',
    lead: 'Chau a la fila del compresor.',
    body: ' El Pulse PRO trae la manguera y los picos para el auto, la moto, la bici, la pelota y los inflables de la pileta.',
    note: 'Se carga con el cable USB que viene en la caja.',
    // Lo que se ve en la foto del proveedor. TODO VERIFICAR — cuántos picos.
    items: [
      '1 Inflador Pulse PRO™',
      'Manguera flexible con rosca',
      'Picos para pelotas, bicis e inflables',
      'Cable USB de carga',
      'Manual de uso',
    ],
    gallery: [
      { src: '/inflador/whats-in-box/que-incluye.webp', alt: 'La caja, el Inflador Pulse PRO, la manguera, el cable USB y los picos' },
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
   * Comparativa (después de los packs): contra lo que la gente usa hoy, el
   * compresor de 12 V con cable y el de la estación de servicio. `image`
   * vacía = la columna sale sin figura, hasta tener los recortes.
   */
  comparison: {
    title: 'No es un compresor más.',
    accent: 'más.',
    columns: [
      { name: 'Pulse PRO™', image: '', width: 240, height: 420 },
      { name: 'Compresor 12 V', image: '', width: 336, height: 378 },
      { name: 'Estación de servicio', image: '', width: 336, height: 378 },
    ],
    rows: [
      { label: 'Sin cables', values: [true, false, false] },
      { label: 'Se corta solo a la presión justa', values: [true, false, 'a veces'] },
      { label: 'Siempre a mano', values: [true, true, false] },
      { label: 'Lo usás con el auto apagado', values: [true, false, true] },
      { label: 'Infla bicis, pelotas e inflables', values: [true, true, false] },
      { label: 'Luz para la noche', values: [true, false, false] },
    ],
  },
  faq: [
    {
      q: '¿Sirve para mi auto?',
      a: 'Sí. Sirve en cualquier auto, camioneta, moto o bici con válvula común (la de los autos). Para bicis con válvula fina y para pelotas e inflables, usás los picos que vienen en la caja.',
    },
    {
      // TODO VERIFICAR — tiempo real con una unidad nuestra.
      q: '¿Cuánto tarda en inflar una rueda?',
      a: 'Para completar una rueda de auto que está baja, un par de minutos. Una rueda totalmente desinflada lleva más: el Pulse PRO es para tener las ruedas siempre bien, no para reemplazar a la gomería después de un pinchazo grande.',
    },
    {
      q: '¿Qué presión le pongo?',
      a: 'La que dice el fabricante de tu auto: está en una etiqueta en el marco de la puerta del conductor o en el manual. Se mide con la rueda fría.',
    },
    {
      // TODO VERIFICAR — puerto y tiempo de carga.
      q: '¿Cómo se carga?',
      a: 'Con el cable USB que viene en la caja, desde un cargador de celular, la compu o el USB del auto. La pantalla muestra cuánta batería le queda.',
    },
    {
      q: '¿Cuántas ruedas infla con una carga?',
      // TODO VERIFICAR — medirlo con una unidad nuestra.
      a: 'Alcanza para poner a punto las 4 ruedas del auto, y te sobra para la bici o una pelota. Si se queda sin batería, se recarga y listo.',
    },
    {
      q: '¿Hace mucho ruido?',
      a: 'Es un compresor, así que se escucha mientras infla. Como se corta solo, no hace falta que te quedes al lado.',
    },
    {
      q: '¿Cuánto tarda en llegar?',
      // TODO: completar con los plazos reales de Andreani por zona antes de publicar
      a: 'El envío es gratis a todo el país y sale con código de seguimiento para verlo en tiempo real desde que despachamos. Los plazos de entrega varían según la zona.',
    },
    {
      q: '¿Puedo devolverlo si no me convence?',
      a: 'Sí. Si por cualquier motivo decidís que el Pulse PRO no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
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
      desc: 'Si tu inflador CARMANIA no funciona como esperabas, te reparamos las piezas o te lo reemplazamos completo. Vos seguís manejando tranquilo.',
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
  bundles: INFLADOR_BUNDLES,
  upsellChain: INFLADOR_UPSELL_CHAIN,
  whatsappPrefilled: 'Hola CARMANIA! Quería consultar por el Inflador Pulse PRO...',
  metadata: {
    title: 'Inflador Pulse PRO™ — CARMANIA',
    description:
      'Inflador inalámbrico con pantalla digital y corte automático: elegís la presión y se corta solo. Para auto, moto, bici y pelotas. Envío gratis y 30 días de devolución.',
    ogTitle: 'Inflador Pulse PRO™ — CARMANIA',
    ogDescription:
      'Elegí la presión, apretá y se corta solo. Sin cables, con luz LED y entra en la guantera. Envío gratis y devolución 30 días.',
    canonical: '/inflador',
  },
} satisfies LandingConfig;
