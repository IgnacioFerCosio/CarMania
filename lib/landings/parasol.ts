/**
 * LandingConfig del Parasol PRO™ (landing `/parasol`).
 *
 * Todo el copy sale del doc de contenido
 * (`Parasol_PRO_Landing_Contenido.md`), tipado como `LandingConfig`. Sin
 * lógica nueva: es data.
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts). SÍ puede
 * importar de `./soporte` — reusar una landing config desde otra está
 * permitido (la extracción a un módulo compartido es una limpieza posterior).
 *
 * ⚠️ PLACEHOLDERS pendientes antes de que /parasol reciba tráfico:
 *   - Precios (`fallbackPricing`, `bundles[].fallbackPrice/Compare`,
 *     `upsellChain`): el producto no está cotizado — marcados `// TODO PRECIO REAL`.
 *   - Shopify: los 3 productos no existen; `productId`/`fallbackVariantId` en
 *     `''`. Con `''` el BuyButton queda deshabilitado ("Producto no
 *     disponible") en vez de habilitarse contra un merchandise inexistente.
 *   - Media bajo `/parasol/...`: los archivos todavía no existen.
 *   - Reseñas / `brand.socialProofCount` / `ratingBreakdown`: inventadas
 *     (ver el bloque de aviso sobre `PARASOL_REVIEWS`).
 */
import type { Bundle, LandingConfig, UpsellTier } from './types';
import { SOPORTE } from './soporte';

/**
 * ⚠️ RESEÑAS PLACEHOLDER — INVENTADAS.
 *
 * El Parasol PRO todavía no se vendió, así que estas reseñas son ficticias y
 * existen sólo para que la sección renderice completa en desarrollo.
 *
 * NO PUBLICAR ASÍ. Reemplazar por reseñas reales antes de que /parasol reciba
 * tráfico — ver el checklist en docs/superpowers/specs/parasol-assets.md.
 * Lo mismo aplica a `brand.socialProofCount` y a `ratingBreakdown`.
 */
const PARASOL_REVIEWS = [
  {
    name: 'Marcos T.',
    location: 'Buenos Aires',
    stars: 5,
    text: 'Lo dejo todo el día al sol en el laburo y ahora subo a un auto que se banca. El volante ya no quema y el aire enfría en la mitad de tiempo. Otra vida.',
    date: '18 Ago 2026',
    verified: true,
  },
  {
    name: 'Paula R.',
    location: 'Córdoba',
    stars: 5,
    text: 'Se abre como un paraguas, literal un movimiento y ya está puesto. El de cartón que tenía antes no cubría las puntas y se me caía cada vez que arrancaba.',
    date: '05 Ago 2026',
    verified: true,
  },
  {
    name: 'Gonzalo M.',
    location: 'Mendoza',
    stars: 5,
    text: 'Tengo una Amarok y entró perfecto en el parabrisas, pensé que iba a quedar chico. Se sostiene solo con los paños de sol, sin ventosas ni nada pegado.',
    date: '24 Jul 2026',
    verified: true,
  },
  {
    name: 'Julieta S.',
    location: 'Rosario',
    stars: 4,
    text: 'Cumple muy bien, el tablero dejó de recalentarse. Le saco una estrella porque la funda me costó un poco al principio para volver a guardarlo, después le agarrás la mano.',
    date: '11 Jul 2026',
    verified: true,
  },
  {
    name: 'Fernando A.',
    location: 'Salta',
    stars: 5,
    text: 'Acá el sol pega fuerte de verdad. Con esto el auto queda a la sombra completa, el plástico del tablero ya no se pone hirviendo. Lo guardo en la puerta y no molesta.',
    date: '28 Jun 2026',
    verified: true,
  },
] as const;

const PARASOL_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el producto x1 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Un parasol. Cero horno.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ funda incluida',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 29990, // TODO PRECIO REAL
    fallbackCompare: 45000, // TODO PRECIO REAL
    image: '/parasol/bundles/ParasolX1.webp',
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
    bonus: '+ 2 fundas incluidas',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 44985, // TODO PRECIO REAL
    fallbackCompare: 90000, // TODO PRECIO REAL
    image: '/parasol/bundles/ParasolX2.webp',
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
    bonus: '+ 3 fundas incluidas',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 59980, // TODO PRECIO REAL
    fallbackCompare: 135000, // TODO PRECIO REAL
    image: '/parasol/bundles/ParasolX3.webp',
  },
];

const PARASOL_UPSELL_CHAIN: readonly UpsellTier[] = PARASOL_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);

export const PARASOL = {
  brand: {
    tagline: 'Parasol PRO™',
    productHandle: 'parasol-pro',
    socialProofCount: 'Miles', // TODO: número real cuando haya ventas del parasol
    socialProofLabel: 'de autos protegidos',
    averageRating: 4.8,
    reviewsCount: PARASOL_REVIEWS.length, // TODO: reseñas reales
  },
  // TODO PRECIO REAL — coincide con el bundle x1; el producto no está cotizado.
  fallbackPricing: {
    price: 29990,
    compareAtPrice: 45000,
    currency: 'ARS',
  },
  headlines: {
    heroLine1: 'El parasol definitivo',
    heroLine2: 'para tu auto',
    // El doc mezclaba tercera persona con imperativo ("Bloquea… mantiné…
    // protegé"). Normalizado a tercera persona, que es el patrón del soporte.
    heroSub:
      'Se despliega como un paraguas y cubre todo el parabrisas al instante. Bloquea los rayos UV, mantiene el auto fresco y protege el tablero y el volante del sol.',
    finalCta: 'Bajá a un auto fresco. Sin pelear con el cartón.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Parasol PRO',
    benefitsTitle: 'Pensado para el sol argentino',
    benefitsSub:
      'Verano tras verano de dejar el auto al rayo del sol. Cada detalle está pensado para que no se convierta en un horno.',
  },
  heroMedia: {
    // Imagen (no video): render del producto. Es el LCP de /parasol.
    kind: 'image',
    src: '/parasol/hero/parasol-hero.webp',
    width: 1600,
    height: 1600,
    badgeLine1: 'SE ABRE EN',
    badgeLine2: '3 SEGUNDOS',
  },
  heroSubHighlights: ['paraguas', 'UV'],
  sectionCopy: {
    pricingTitle: 'Probá tu Parasol PRO',
    pricingTitleAccent: '30 días gratis',
    reviewsTitle: 'Opiniones de',
    reviewsTitleAccent: 'clientes',
    reviewsFooter: 'de autos que suben a la sombra.',
    faqEyebrow: 'Dudas frecuentes',
    faqTitle: 'Respondemos lo que más nos preguntan',
    carBrandsTitle: 'Se adapta a',
    carBrandsTitleAccent: 'cualquier parabrisas',
    useCasesTitle: 'Menos calor. Menos desgaste.',
    // Sin prefijo "Para": los labels ya son frases ("MENOS CALOR", etc.).
    useCasesPrefix: '',
  },
  // Misma lista de logos de marcas que el soporte (reuso deliberado; la
  // extracción a un módulo compartido es una limpieza posterior).
  carBrands: SOPORTE.carBrands,
  /**
   * Grid de problemas que resuelve el parasol. Fotos pendientes — hoy caen al
   * placeholder de gradiente (ver docs/superpowers/specs/parasol-assets.md).
   */
  useCases: [
    { label: 'MENOS CALOR', image: '/parasol/use-cases/calor.jpg', alt: 'Interior del auto más fresco con el Parasol PRO puesto' },
    { label: 'MENOS RAJADURAS', image: '/parasol/use-cases/tablero.jpg', alt: 'Tablero protegido del sol, sin plásticos rajados' },
    { label: 'MÁS PRIVACIDAD', image: '/parasol/use-cases/privacidad.jpg', alt: 'El Parasol PRO tapa la vista al interior del auto desde afuera' },
    { label: 'VOLANTE FRESCO', image: '/parasol/use-cases/volante.jpg', alt: 'Volante a la sombra, sin quemar al agarrarlo' },
    { label: 'MÁS FRESCO AL SUBIR', image: '/parasol/use-cases/aire.jpg', alt: 'Subir a un auto que ya está fresco, el aire acondicionado rinde más' },
    { label: 'MENOS DECOLORACIÓN', image: '/parasol/use-cases/tapizados.jpg', alt: 'Asientos y tapizados sin decolorar por el sol' },
  ],
  steps: [
    {
      n: 1,
      title: 'Sacalo de la funda',
      desc: 'Viene con su propia funda compacta, entra en la guantera o la puerta sin ocupar espacio.',
      video: '/parasol/how-to-use/01-sacalo-de-la-funda.mp4',
    },
    {
      n: 2,
      title: 'Abrilo como un paraguas',
      desc: 'Un solo movimiento y se despliega completo — no hay que armar piezas ni acomodar varillas.',
      video: '/parasol/how-to-use/02-abrilo-como-paraguas.mp4',
    },
    {
      n: 3,
      title: 'Encajalo en el parabrisas',
      desc: 'Se acomoda por dentro, sostenido por los mismos paños de sol del auto. Sin ventosas, sin pegamento, sin dejar marcas.',
      video: '/parasol/how-to-use/03-encajalo-parabrisas.mp4',
    },
  ],
  benefits: [
    {
      icon: 'shield',
      title: 'Bloqueo UV real',
      desc: 'Protege tablero, volante y asientos de la decoloración y el rajado por sol.',
      highlight: true,
    },
    {
      icon: 'leaf',
      title: 'Baja la temperatura interior',
      desc: 'Subís a un auto sensiblemente más fresco, sin esperar a que el aire acondicionado haga todo el trabajo.',
      highlight: true,
    },
    {
      icon: 'bolt',
      title: 'Apertura tipo paraguas',
      desc: 'Armado y guardado en segundos, no minutos.',
      highlight: false,
    },
    {
      icon: 'rotate',
      title: 'Tamaño universal',
      desc: 'Se adapta al parabrisas de la gran mayoría de autos, camionetas y SUVs.',
      highlight: false,
    },
    {
      icon: 'sparkles',
      title: 'Ultra compacto',
      desc: 'Se pliega y entra en su funda; no ocupa espacio en la guantera ni en el baúl.',
      highlight: false,
    },
    {
      icon: 'check',
      title: 'Liviano',
      desc: 'Se maneja con una mano, entra y sale del auto sin esfuerzo.',
      highlight: false,
    },
  ],
  pitchBlocks: [
    {
      eyebrow: 'El problema',
      headline: 'TU AUTO YA NO ES UN HORNO',
      accentWord: 'UN HORNO',
      body: 'Sabés lo que es abrir la puerta después de dejarlo al sol: el volante quema, el aire acondicionado tarda en enfriar, y el tablero se va rajando con los años. El Parasol PRO corta la luz solar antes de que entre — no combate el calor después, lo evita desde el primer rayo.',
    },
    {
      eyebrow: 'La alternativa',
      headline: 'DEJÁ DE PELEAR CON EL PARASOL DE CARTÓN',
      accentWord: 'PARASOL DE CARTÓN',
      body: 'Ya sabés cómo termina: el clásico plegable de cartón o tela fina se deforma, no cubre bien las puntas, se cae apenas movés el auto, y a los meses termina en la basura. El Parasol PRO se abre y cierra como un paraguas de verdad — mismo mecanismo resistente, pensado para durar.',
    },
  ],
  reviews: PARASOL_REVIEWS,
  ratingBreakdown: {
    average: 4.8,
    total: PARASOL_REVIEWS.length,
    stars: [
      { stars: 5, count: 4 },
      { stars: 4, count: 1 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  },
  faq: [
    {
      q: '¿Le sirve a mi auto?',
      a: 'El Parasol PRO tiene tamaño universal y cubre la gran mayoría de parabrisas de autos, camionetas y SUVs. Se ajusta por dentro, sostenido con los paños de sol.',
    },
    {
      q: '¿Cómo lo guardo?',
      a: 'Viene con su propia funda. Plegado, entra cómodo en la guantera, la puerta o debajo del asiento.',
    },
    {
      q: '¿Necesita ventosas o pegamento?',
      a: 'No. Se sostiene solo, encastrado con los paños de sol del auto — no deja marcas ni residuos.',
    },
    {
      q: '¿Cuánto tarda en llegar?',
      // TODO: completar con los plazos reales de Andreani por zona antes de publicar
      a: 'El envío es gratis a todo el país y sale con código de seguimiento para verlo en tiempo real desde que despachamos. Los plazos de entrega varían según la zona.',
    },
    {
      q: '¿Puedo devolverlo si no me convence?',
      a: 'Sí. Si por cualquier motivo decidís que el Parasol PRO no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
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
      desc: 'Si tu parasol CARMANIA no funciona como esperabas, te reparamos las piezas o te lo reemplazamos completo. Vos seguís manejando tranquilo.',
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
  bundles: PARASOL_BUNDLES,
  upsellChain: PARASOL_UPSELL_CHAIN,
  whatsappPrefilled: 'Hola CARMANIA! Quería consultar por el Parasol PRO...',
  metadata: {
    title: 'Parasol PRO™ — CARMANIA',
    description:
      'El parasol que se abre como un paraguas y cubre todo el parabrisas en 3 segundos. Bloquea los rayos UV y mantiene el auto fresco. Envío gratis y 30 días de devolución.',
    ogTitle: 'Parasol PRO™ — CARMANIA',
    ogDescription:
      'Se abre en 3 segundos y cubre todo el parabrisas. Bloquea los rayos UV y protege el tablero. Envío gratis y devolución 30 días.',
    canonical: '/parasol',
  },
} satisfies LandingConfig;
