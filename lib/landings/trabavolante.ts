/**
 * LandingConfig del Trabavolante Titan PRO™ (landing `/trabavolante`).
 *
 * Producto de origen: el trabavolante de cable que vende Ouvra Automotive
 * (UK) como "TitanLock™": un cable de acero que se envuelve en el volante y
 * se engancha en el anclaje del cinturón de seguridad. Investigación de su
 * landing, sus specs y sus creativos en
 * docs/superpowers/specs/trabavolante-assets.md.
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts). SÍ puede
 * importar de `./soporte`.
 *
 * ⚠️ PLACEHOLDERS pendientes antes de que /trabavolante reciba tráfico:
 *   - Precios (`fallbackPricing`, `bundles[].fallbackPrice/Compare`): no hay
 *     precio definido — marcados `// TODO PRECIO REAL`. Los de ahora cumplen
 *     las promesas del copy ("2ª al 50%", "3ª GRATIS"), así que si cambian
 *     hay que mantener esa relación o cambiar el copy (lo vigila el test).
 *   - Shopify: los 3 productos no existen; `productId`/`fallbackVariantId` en
 *     `''`. Con `''` el BuyButton queda deshabilitado ("Producto no
 *     disponible") en vez de habilitarse contra un merchandise inexistente.
 *     El `productHandle` es el que debería salir del título; confirmalo al
 *     crear el producto (al parasol Shopify le dejó el ™ en el handle).
 *   - Reseñas: vacías hasta tener las reales (ver `TRABAVOLANTE_REVIEWS`).
 *   - Imágenes y videos: salen del material de TitanLock, con el logo de
 *     ellos grabado en la carcasa. Ver el checklist de assets.
 *
 * ⚠️ SOBRE LAS SPECS. Cable de acero trenzado de 5 mm, cilindro "clase B"
 * anti-taladro y 3 llaves salen de la ficha de TitanLock y NO están
 * verificados contra una unidad nuestra. Lo que NO se usa a propósito, porque
 * no tiene fuente: "resiste más de 2 toneladas", "compatible con el 99 % de
 * los autos", "grado militar" y las encuestas "98 % / 97 % / 96 %" de sus
 * creativos (son de sus clientes, no de los nuestros). Una cifra de
 * seguridad inflada es exposición directa bajo la ley de defensa del
 * consumidor. Lo que hay que confirmar está marcado `// TODO VERIFICAR`.
 */
import type { Bundle, LandingConfig, Review, UpsellTier } from './types';
import { SOPORTE } from './soporte';

/**
 * Reseñas del Titan PRO: vacío hasta que lleguen las reales.
 *
 * Con la lista vacía la página no muestra la sección de reseñas, ni el
 * carrusel de opiniones del hero, ni la opinión de "qué incluye". Para
 * cargarlas: cada una con `name`, `location`, `stars`, `text`, `date`
 * ('12 Nov 2026'), `verified` y, si tiene foto, `image` en
 * /public/trabavolante/reviews/ (4:3, ~1000 px de ancho, webp). Después,
 * `ratingBreakdown` con el conteo real por estrellas y, si se quiere,
 * `whatsInBox.testimonial` apuntando a una de ellas.
 */
const TRABAVOLANTE_REVIEWS: readonly Review[] = [];

const TRABAVOLANTE_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el producto x1 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Un auto intocable.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ 3 llaves incluidas',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 39990, // TODO PRECIO REAL
    fallbackCompare: 69990, // TODO PRECIO REAL
    image: '/trabavolante/bundles/TrabavolanteX1.webp',
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
    bonus: '+ 3 llaves por unidad',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 59990, // TODO PRECIO REAL — 1,5 × el x1 (redondeado)
    fallbackCompare: 139980, // TODO PRECIO REAL
    image: '/trabavolante/bundles/TrabavolanteX2.webp',
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
    bonus: '+ 3 llaves por unidad',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 79990, // TODO PRECIO REAL — 2 × el x1 (redondeado)
    fallbackCompare: 209970, // TODO PRECIO REAL
    image: '/trabavolante/bundles/TrabavolanteX3.webp',
  },
];

const TRABAVOLANTE_UPSELL_CHAIN: readonly UpsellTier[] = TRABAVOLANTE_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);

export const TRABAVOLANTE = {
  brand: {
    tagline: 'Trabavolante Titan PRO™',
    productHandle: 'trabavolante-titan-pro', // TODO SHOPIFY — confirmar al crear el producto
    // Estrellas y clientes de arriba de los packs: los de la marca (los del
    // soporte), como en /llavero-rescate. El producto todavía no tiene los suyos.
    socialProofCount: SOPORTE.brand.socialProofCount,
    socialProofLabel: SOPORTE.brand.socialProofLabel,
    averageRating: SOPORTE.brand.averageRating,
    reviewsCount: TRABAVOLANTE_REVIEWS.length,
  },
  // Espejo del bundle x1.
  fallbackPricing: {
    price: 39990, // TODO PRECIO REAL
    compareAtPrice: 69990, // TODO PRECIO REAL
    currency: 'ARS',
  },
  headlines: {
    heroLine1: 'Tu auto intocable',
    heroLine2: 'en 3 segundos',
    heroSub:
      'Se envuelve en el volante y se engancha en el cinturón de seguridad: el volante no gira y el auto no se mueve. Cable de acero de 5 mm, cerradura anti-taladro y 3 llaves.',
    finalCta: 'Ponelo. Trabalo. Olvidate.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Titan PRO',
    benefitsTitle: 'Pensado para la calle argentina',
    benefitsSub:
      'El que roba busca el auto más fácil. Un trabavolante a la vista hace que pase de largo antes de intentarlo.',
  },
  heroMedia: {
    kind: 'video',
    src: '/trabavolante/hero/trabavolante-hero.mp4',
    poster: '/trabavolante/hero/trabavolante-hero-poster.webp',
    // 720×720 H.264 sin audio, CRF 31, ~0,9 MB. Sale del video "Ponelo.
    // Trabalo. Olvidate." de TitanLock recortado arriba de la franja con su
    // logo. El poster es el primer frame del video ya encodeado (el LCP).
    width: 720,
    height: 720,
    // No "X EN 3 SEGUNDOS" como el parasol y el llavero (y el título ya lo
    // dice): el anclaje al cinturón es lo que no tiene ningún otro.
    badgeLine1: 'ANCLADO AL',
    badgeLine2: 'CINTURÓN',
  },
  heroSubHighlights: ['cinturón de seguridad', 'acero de 5 mm'],
  sectionCopy: {
    pricingTitle: 'Probá tu Titan PRO',
    pricingTitleAccent: '30 días gratis',
    reviewsTitle: 'Opiniones de',
    reviewsTitleAccent: 'clientes',
    reviewsFooter: 'de autos que duermen tranquilos.',
    faqEyebrow: 'Dudas frecuentes',
    faqTitle: 'Respondemos lo que más nos preguntan',
    carBrandsTitle: 'Entra en',
    carBrandsTitleAccent: 'cualquier auto',
    useCasesTitle: 'Ponelo. Trabalo. Olvidate.',
    // Sin prefijo "Para": los labels ya son beneficios, como en el parasol.
    useCasesPrefix: '',
  },
  // Universal: sirve en cualquier auto con volante y cinturón (reuso de la
  // lista de logos del soporte, como el parasol).
  carBrands: SOPORTE.carBrands,
  /**
   * Beneficios en 6 cuadros de los videos (primera palabra blanca, última en
   * accent). Todos salen del material de TitanLock, sin su franja de logo.
   */
  useCases: [
    { label: 'ACERO DE 5 MM', image: '/trabavolante/use-cases/acero.webp', alt: 'Un cortafríos contra el cable de acero del trabavolante' },
    { label: 'ANCLA AL CINTURÓN', image: '/trabavolante/use-cases/cinturon.webp', alt: 'La traba enganchada en el anclaje del cinturón de seguridad' },
    { label: 'VOLANTE TRABADO', image: '/trabavolante/use-cases/traba.webp', alt: 'Tirando del trabavolante puesto: no se suelta' },
    { label: 'LISTO EN SEGUNDOS', image: '/trabavolante/use-cases/segundos.webp', alt: 'El trabavolante envuelto en el volante de un auto' },
    { label: 'CERO RAYONES', image: '/trabavolante/use-cases/volante.webp', alt: 'La funda acolchada del cable sobre el volante, sin marcarlo' },
    { label: '3 LLAVES', image: '/trabavolante/use-cases/llaves.webp', alt: 'Una de las llaves del trabavolante en la mano' },
  ],
  steps: [
    {
      n: 1,
      title: 'Envolvé el volante',
      desc: 'Pasá el cable alrededor del aro del volante. La funda acolchada lo protege: no raya ni marca el cuero.',
      video: '/trabavolante/how-to-use/01-envolve-el-volante.mp4',
    },
    {
      n: 2,
      title: 'Enganchalo en el cinturón',
      desc: 'La traba entra en el anclaje del cinturón de seguridad, igual que la hebilla. Hace click y queda cerrada.',
      video: '/trabavolante/how-to-use/02-engancha-el-cinturon.mp4',
    },
    {
      n: 3,
      title: 'Olvidate',
      desc: 'El volante ya no gira y el cable no se suelta. Para sacarlo, girás la llave y listo.',
      video: '/trabavolante/how-to-use/03-olvidate.mp4',
    },
  ],
  benefits: [
    {
      icon: 'shield',
      title: 'Cable de acero de 5 mm',
      // TODO VERIFICAR — espesor y trenzado, contra una unidad nuestra.
      desc: 'Acero trenzado y recubierto: firme contra el tirón y sin marcar el interior.',
      highlight: true,
    },
    {
      icon: 'lock',
      title: 'Cerradura anti-taladro',
      // TODO VERIFICAR — "clase B" sale de la ficha de TitanLock.
      desc: 'Cilindro de seguridad clase B, con 3 llaves incluidas.',
      highlight: true,
    },
    {
      icon: 'bolt',
      title: 'Se pone en segundos',
      desc: 'Envolvés, hacés click y te bajás. Por eso lo usás todos los días.',
      highlight: false,
    },
    {
      icon: 'rotate',
      title: 'Universal',
      desc: 'Sirve en autos, camionetas y SUVs: alcanza con volante y cinturón de seguridad.',
      highlight: false,
    },
    {
      icon: 'sparkles',
      title: 'Compacto',
      desc: 'Se enrolla y entra en la guantera, la puerta o abajo del asiento.',
      highlight: false,
    },
    {
      icon: 'check',
      title: 'No raya el volante',
      desc: 'La funda acolchada cubre el cable: ni marcas en el cuero ni en el plástico.',
      highlight: false,
    },
  ],
  benefitsImage: {
    src: '/trabavolante/benefits/trabavolante-producto.webp',
    alt: 'Trabavolante Titan PRO',
  },
  pitchBlocks: [
    {
      eyebrow: 'El problema',
      headline: 'EL QUE ROBA BUSCA EL AUTO MÁS FÁCIL',
      accentWord: 'MÁS FÁCIL',
      body: 'Nadie quiere perder tiempo en la calle. Un auto con el volante trabado a la vista es un auto que obliga a cortar acero frente a todos: el que roba lo ve, pasa de largo y busca otro. El Titan PRO no espera a que intenten: los desanima antes.',
    },
  ],
  whatsInBox: {
    headline: 'Todo lo que trae la caja',
    lead: 'Chau al bastón de un metro.',
    body: ' El Titan PRO se enrolla y entra en la guantera, así lo usás cada vez que te bajás y no sólo cuando te acordás.',
    note: 'Sin instalación: no se atornilla ni se pega nada al auto.',
    items: ['1 Trabavolante Titan PRO™', '3 llaves de seguridad', 'Manual de uso'],
    gallery: [
      { src: '/trabavolante/whats-in-box/01-producto.webp', alt: 'Trabavolante Titan PRO' },
      { src: '/trabavolante/whats-in-box/02-en-la-mano.webp', alt: 'La traba del Titan PRO en la mano, adentro de un auto' },
      { src: '/trabavolante/whats-in-box/03-cerradura.webp', alt: 'La cerradura anti-taladro de la traba' },
      { src: '/trabavolante/whats-in-box/04-volante-trabado.webp', alt: 'El Titan PRO puesto en el volante' },
    ],
  },
  reviews: TRABAVOLANTE_REVIEWS,
  // Sin reseñas todavía: la sección no se muestra. Con las reales, el
  // promedio y el conteo por estrellas de verdad.
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
   * Comparativa (entre "cómo funciona" y los packs), con la misma tabla que
   * /llavero-rescate y sin el mapa del auto: acá no importa dónde está cada
   * cosa. `image` vacía = la columna sale sin figura, hasta tener el recorte
   * (webp con transparencia, ~320 px de alto, en /trabavolante/comparativa/).
   */
  comparison: {
    title: 'Lo que el bastón y la alarma no hacen.',
    accent: 'no hacen.',
    columns: [
      { name: 'Titan PRO™', image: '/trabavolante/comparativa/titan-pro.webp', width: 170, height: 320 },
      { name: 'Bastón clásico', image: '', width: 0, height: 0 }, // TODO recorte del bastón
      { name: 'Alarma', image: '', width: 0, height: 0 }, // TODO recorte del control de la alarma
    ],
    rows: [
      { label: 'Traba el volante', values: [true, true, false] },
      { label: 'Anclado al cinturón', values: [true, false, false] },
      { label: 'Se pone en segundos', values: [true, false, 'se activa sola'] },
      { label: 'Entra en la guantera', values: [true, false, 'va instalada'] },
      { label: 'Sin instalador ni cables', values: [true, true, false] },
    ],
  },
  faq: [
    {
      q: '¿Le sirve a mi auto?',
      a: 'Sí, si tiene volante y cinturón de seguridad: autos, camionetas y SUVs. El cable es flexible y se acomoda a casi todos los volantes y anclajes.',
    },
    {
      q: '¿Cómo lo pongo para que quede bien firme?',
      a: 'Pasá el cable por la parte del volante que lo deje más corto hasta el cinturón. Si tu volante queda lejos del anclaje, enrollalo por la parte de arriba del aro para que quede más justo.',
    },
    {
      q: '¿Cómo se saca?',
      a: 'Metés la llave, la girás y la traba sale del anclaje del cinturón. Son dos segundos.',
    },
    {
      q: '¿Raya o daña el volante?',
      a: 'No. El cable va dentro de una funda acolchada y la traba entra en el anclaje igual que la hebilla del cinturón. Tampoco hay que atornillar ni pegar nada.',
    },
    {
      q: '¿Funciona con funda de volante?',
      a: 'Sí, el cable se envuelve por arriba de la funda.',
    },
    {
      q: '¿Qué pasa si pierdo las llaves?',
      a: 'Vienen 3, así que te podés guardar una de repuesto. Si las perdieras todas, lo abre un cerrajero, como cualquier candado.',
    },
    {
      q: '¿Reemplaza a la alarma?',
      a: 'No, la complementa. La alarma avisa cuando ya están adentro; el Titan PRO hace que el auto no se pueda manejar y se ve desde afuera, que es lo que hace que elijan otro.',
    },
    {
      q: '¿Cuánto tarda en llegar?',
      // TODO: completar con los plazos reales de Andreani por zona antes de publicar
      a: 'El envío es gratis a todo el país y sale con código de seguimiento para verlo en tiempo real desde que despachamos. Los plazos de entrega varían según la zona.',
    },
    {
      q: '¿Puedo devolverlo si no me convence?',
      a: 'Sí. Si por cualquier motivo decidís que el Titan PRO no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
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
      desc: 'Si tu trabavolante CARMANIA no funciona como esperabas, te reparamos las piezas o te lo reemplazamos completo. Vos seguís manejando tranquilo.',
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
  // Genérico en el soporte (MercadoPago / envío con seguimiento / devolución
  // 30 días, sin nombrar el producto) — se reusa tal cual.
  trustPillars: SOPORTE.trustPillars,
  bundles: TRABAVOLANTE_BUNDLES,
  upsellChain: TRABAVOLANTE_UPSELL_CHAIN,
  whatsappPrefilled: 'Hola CARMANIA! Quería consultar por el Trabavolante Titan PRO...',
  metadata: {
    title: 'Trabavolante Titan PRO™ — CARMANIA',
    description:
      'El trabavolante que se engancha al cinturón de seguridad. Cable de acero de 5 mm, cerradura anti-taladro y se pone en 3 segundos. Envío gratis y 30 días de devolución.',
    ogTitle: 'Trabavolante Titan PRO™ — CARMANIA',
    ogDescription:
      'Envolvé el volante, enganchalo al cinturón y olvidate. Acero de 5 mm y cerradura anti-taladro. Envío gratis y devolución 30 días.',
    canonical: '/trabavolante',
  },
} satisfies LandingConfig;
