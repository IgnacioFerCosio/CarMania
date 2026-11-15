/**
 * LandingConfig del Soplador Tornado PRO™ (landing `/soplador-tornado`).
 *
 * Producto de origen: Lambo Tech LT-2522 (línea Violent Fan), soplador
 * inalámbrico formato pistola con batería desmontable. Negro con detalles
 * rojos. Reemplaza al Soplador Turbo PRO (`/soplador`, pausado el 2026-11-12).
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts). SÍ puede
 * importar de `./soporte`.
 *
 * Material: todo IA, el producto no está en mano. Plan, tomas y reglas en
 * docs/superpowers/specs/soplador-tornado-assets.md. Ningún archivo de
 * `/tornado/...` existe todavía (ver PENDIENTES en scripts/check-assets.mjs).
 *
 * ⚠️ SPECS. Del proveedor sólo tenemos: 35.000 Pa, batería Li-Ion 21 V
 * desmontable, cargador de pared 220 V, sólo sopla (no aspira). La etiqueta
 * comercial dice "36V / 48V": NO lo usamos, son 21 V nominales. No hay
 * km/h, RPM, autonomía, tiempo de carga ni peso: no se inventan. No trae
 * boquillas ni maletín.
 *
 * ⚠️ Pendientes antes de recibir tráfico:
 *   - Shopify: los 3 productos no existen (`productId` en ''), el botón de
 *     compra queda deshabilitado.
 *   - Precios tachados (`fallbackCompare`): provisorios, `// TODO TACHADO`.
 *   - `socialProofCount` ("Miles"): placeholder hasta tener ventas.
 */
import type { Bundle, LandingConfig, UpsellTier } from './types';
import { SOPORTE } from './soporte';
import { pickHeroReviews } from './heroReviews';

/**
 * Reseñas del Soplador Tornado PRO (cargadas el 2026-11-12, en el orden que
 * pasó la marca, cada una con su foto en /tornado/reviews/0N.webp).
 * Las fechas son de referencia: si hay fechas reales, reemplazarlas.
 */
const TORNADO_REVIEWS = [
  {
    name: 'Facundo R.',
    location: 'Córdoba',
    stars: 5,
    text: 'Tremenda potencia tiene este bichito, no te das una idea lo que tira para el tamaño que tiene. Lo probé apenas me llegó y en dos minutos me sacó toda la tierra de las alfombras y las salidas del aire del auto. Muy cómodo el agarre tipo taladro y súper liviano para manipularlo con una sola mano.',
    date: '10 Nov 2026',
    verified: true,
    image: '/tornado/reviews/01.webp',
  },
  {
    name: 'Martín G.',
    location: 'Buenos Aires',
    stars: 5,
    text: 'Excelente compra, la verdad me sorprendió la calidad de los materiales y la fuerza del chorro de aire. Lo uso tanto para sopletear la compu en casa como para secar las gotas que quedan en los espejos y parrilla después de lavar la camioneta. La batería se banca re bien varias pasadas sin perder fuerza.',
    date: '07 Nov 2026',
    verified: true,
    image: '/tornado/reviews/02.webp',
  },
  {
    name: 'Rodrigo S.',
    location: 'Santa Fe',
    stars: 4,
    text: 'Muy buena turbina, las aspas giran a unas revoluciones terribles y tiene mucha polenta. Le pongo 4 estrellas solo porque a máxima potencia hace bastante ruido (lógico por la velocidad de la turbina), pero cumple de diez para limpiar el taller, el auto y sacar pelusas de rincones difíciles.',
    date: '03 Nov 2026',
    verified: true,
    image: '/tornado/reviews/03.webp',
  },
  {
    name: 'Lucas M.',
    location: 'Mendoza',
    stars: 5,
    text: 'Un espectáculo, jubilé el ventilador viejo para limpiar polvo. El gatillo regulable es un golazo porque podés dosificar el aire según lo que estés limpiando sin volar todo a la mierda. Encastra firme la batería y se siente bien robusto en la mano.',
    date: '30 Oct 2026',
    verified: true,
    image: '/tornado/reviews/04.webp',
  },
  {
    name: 'Nicolás P.',
    location: 'CABA',
    stars: 5,
    text: 'Súper práctico que la batería sea desmontable y encastre al toque como una herramienta profesional. Lo tengo en el escritorio para mantener impecable el teclado, el mousepad y el gabinete de la PC, y los fines de semana me lo llevo al auto. Cero cables molestando, un lujo.',
    date: '26 Oct 2026',
    verified: true,
    image: '/tornado/reviews/05.webp',
  },
  {
    name: 'Ezequiel T.',
    location: 'Neuquén',
    stars: 5,
    text: 'Lo compré específicamente para secar el auto después de lavarlo y evitar marcas de agua en la pintura negra, y es un viaje de ida. Te saca toda el agua de las molduras, burletes y llantas en un toque sin tener que andar pasando microfibra por todos lados. Muy conforme con la compra.',
    date: '21 Oct 2026',
    verified: true,
    image: '/tornado/reviews/06.webp',
  },
  {
    name: 'Hernán B.',
    location: 'Entre Ríos',
    stars: 4,
    text: 'Llegó todo completo en orden: la pistola, la batería, el cargador y el manual. Anda bárbaro y tira un caudal de aire impresionante para el tamaño. El único detalle es que el cable del cargador podría ser un poquito más largo, pero después de eso un 10, súper recomendable.',
    date: '17 Oct 2026',
    verified: true,
    image: '/tornado/reviews/07.webp',
  },
  {
    name: 'Sebastián V.',
    location: 'Tucumán',
    stars: 5,
    text: 'Una herramienta indispensable si sos fanático de tener el auto y el taller limpios. Buena terminación, gatillo sensible y una fuerza de soplado que te sorprende apenas lo apretás. Llegó rápido y funciona tal cual se muestra.',
    date: '12 Oct 2026',
    verified: true,
    image: '/tornado/reviews/08.webp',
  },
] as const;

const TORNADO_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el producto x1 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Un soplador. Cero hojas.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ batería y cargador incluidos',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 119990,
    fallbackCompare: 179990, // TODO TACHADO — provisorio
    image: '/tornado/bundles/TornadoX1.webp',
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
    bonus: '+ 2 baterías y 2 cargadores',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 179990,
    fallbackCompare: 359980, // TODO TACHADO — provisorio (2 × el tachado del x1)
    image: '/tornado/bundles/TornadoX2.webp',
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
    bonus: '+ 3 baterías y 3 cargadores',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 239990,
    fallbackCompare: 539970, // TODO TACHADO — provisorio (3 × el tachado del x1)
    image: '/tornado/bundles/TornadoX3.webp',
  },
];

const TORNADO_UPSELL_CHAIN: readonly UpsellTier[] = TORNADO_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);

export const TORNADO = {
  brand: {
    tagline: 'Soplador Tornado PRO™',
    productHandle: 'soplador-tornado-pro',
    socialProofCount: 'Miles', // TODO PLACEHOLDER: número real cuando haya ventas
    socialProofLabel: 'de veredas sin hojas',
    averageRating: 4.8, // 6 de 5★ y 2 de 4★ (4,75)
    reviewsCount: TORNADO_REVIEWS.length,
  },
  fallbackPricing: {
    price: 119990,
    compareAtPrice: 179990, // TODO TACHADO — espejo del x1
    currency: 'ARS',
  },
  headlines: {
    heroLine1: 'Un tornado en tu mano.',
    heroLine2: 'Sin cable, sin nafta.',
    heroSub:
      'Soplador inalámbrico de alta potencia: vuela las hojas de la vereda, seca el auto después de lavarlo y prende el fuego de la parrilla en segundos. Batería desmontable y recargable.',
    finalCta: 'Lo que antes era media hora de escoba, ahora es una pasada.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Soplador Tornado PRO',
    benefitsTitle: 'Potencia de verdad, en una mano',
    benefitsSub:
      'La fuerza de un soplador de jardín en el tamaño de un taladro. Sin cable que arrastrar ni enchufe que buscar.',
  },
  heroMedia: {
    // Video de secado del auto (de Commonkart, con permiso; recortado sin la
    // marca de agua). El poster es el LCP de /soplador-tornado.
    kind: 'video',
    src: '/tornado/videos/secado.mp4',
    poster: '/tornado/videos/secado-poster.webp',
    width: 480,
    height: 764,
    badgeLine1: 'PRESIÓN DE',
    badgeLine2: '35.000 Pa', // dato del proveedor (ficha LT-2522)
  },
  heroSubHighlights: ['inalámbrico', 'parrilla'],
  sectionCopy: {
    pricingTitle: 'Probá tu Soplador Tornado PRO',
    pricingTitleAccent: '30 días gratis',
    reviewsTitle: 'Opiniones de',
    reviewsTitleAccent: 'clientes',
    reviewsFooter: 'que dejaron la escoba.',
    faqEyebrow: 'Dudas frecuentes',
    faqTitle: 'Respondemos lo que más nos preguntan',
    carBrandsTitle: 'Anda en',
    carBrandsTitleAccent: 'cualquier auto',
    useCasesTitle: 'Un soplador. Mil usos.',
    // Sin prefijo, como el parasol: el rótulo es el beneficio y la última
    // palabra va en rojo ("CERO HOJAS").
    useCasesPrefix: '',
  },
  // No se renderiza en /soplador-tornado (no hay compatibilidad por marca).
  // Queda sólo porque el tipo lo pide.
  carBrands: SOPORTE.carBrands,
  /** Casos de uso: tomas T-03 a T-08 del plan. */
  useCases: [
    { label: 'FUEGO RÁPIDO', image: '/tornado/use-cases/parrilla.webp', alt: 'Prendiendo el carbón de la parrilla con el chorro del soplador' },
    { label: 'CERO GOTAS', image: '/tornado/use-cases/secado.webp', alt: 'Volando el agua del capó de un auto recién lavado' },
    { label: 'CERO HOJAS', image: '/tornado/use-cases/vereda.webp', alt: 'Barriendo con aire las hojas secas de la vereda' },
    { label: 'CERO VIRUTA', image: '/tornado/use-cases/taller.webp', alt: 'Sacando el polvo y la viruta de la mesa de trabajo' },
    { label: 'CERO POLVO', image: '/tornado/use-cases/pc.webp', alt: 'Soplando el polvo de adentro del gabinete de una PC' },
    { label: 'PILETA LIMPIA', image: '/tornado/use-cases/patio.webp', alt: 'Volando las hojas del borde de la pileta y del deck' },
  ],
  /**
   * Tomas T-13 a T-15 del plan. Por ahora con fotos fijas (`image`): no hay
   * videos de uso que respeten el producto. Cuando los haya, sumar `video`
   * (tiene prioridad sobre la foto).
   */
  steps: [
    {
      n: 1,
      title: 'Cargá la batería',
      desc: 'Enchufá el cargador de pared que viene en la caja y dejá la batería cargando.',
      image: '/tornado/whats-in-box/que-incluye.webp',
    },
    {
      n: 2,
      title: 'Calzala en el mango',
      desc: 'La batería entra de un clic abajo de la empuñadura. Se saca igual de fácil para volver a cargarla.',
      image: '/tornado/reviews/05.webp',
    },
    {
      n: 3,
      title: 'Apretá el gatillo',
      desc: 'Apuntá y soplá. Hojas, agua, polvo o brasas: con una mano y sin cable que arrastrar.',
      image: '/tornado/use-cases/secado.webp',
    },
  ],
  /**
   * Videos de Commonkart (con permiso, recortados sin la marca de agua y sin
   * audio). Ocupan el lugar de "Cómo funciona", que no tiene material propio.
   */
  videoShowcase: {
    eyebrow: 'Miralo en acción',
    title: 'Sin trucos: así sopla',
    accent: 'así sopla',
    videos: [
      { src: '/tornado/videos/secado.mp4', label: 'Seca el auto sin tocarlo' },
      { src: '/tornado/videos/patio.mp4', label: 'Las hojas, fuera en una pasada' },
      { src: '/tornado/videos/escoba.mp4', label: 'Escoba vs. Tornado' },
    ],
  },
  /**
   * Comparativa (misma tabla que /llavero-rescate, sin el mapa del auto).
   * TODO imágenes: faltan los recortes sin fondo del soplador a nafta y del de
   * cable (`image: ''` = la columna sale sin figura). Van en
   * /tornado/comparativa/nafta.webp y cable.webp.
   */
  comparison: {
    title: 'Tres sopladores. Uno solo sin cable ni nafta.',
    accent: 'Uno solo sin cable ni nafta.',
    columns: [
      { name: 'Tornado PRO™', image: '/tornado/comparativa/tornado.webp', width: 213, height: 320 },
      { name: 'Soplador a nafta', image: '', width: 240, height: 320 },
      { name: 'Soplador con cable', image: '', width: 240, height: 320 },
    ],
    rows: [
      { label: 'Sin cable ni alargue', values: [true, true, false] },
      { label: 'Sin nafta ni humo', values: [true, false, true] },
      { label: 'Arranca con el gatillo', values: [true, false, true] },
      { label: 'Se usa con una mano', values: [true, false, 'algunos'] },
      { label: 'Lo guardás en un cajón', values: [true, false, false] },
    ],
  },
  benefits: [
    {
      icon: 'bolt',
      title: '35.000 Pa de presión',
      desc: 'Un chorro que mueve hojas mojadas y vuela el agua del auto, no una brisa que las corre de lugar.',
      highlight: true,
    },
    {
      icon: 'rotate-left',
      title: 'Batería desmontable',
      desc: 'De litio y recargable. La sacás del mango, la cargás en el enchufe de la pared y la volvés a calzar.',
      highlight: true,
    },
    {
      icon: 'check',
      title: 'Sin cable, sin nafta',
      desc: 'Ni alargue que arrastrar por el patio ni motor que arrancar. Lo agarrás y soplás.',
      highlight: false,
    },
    {
      icon: 'rotate',
      title: 'Formato pistola',
      desc: 'Se agarra como un taladro: con una mano y apuntando justo donde querés.',
      highlight: false,
    },
    {
      icon: 'shield',
      title: 'Seca sin tocar la pintura',
      desc: 'Después de lavar el auto, el aire saca el agua de las juntas y los espejos sin pasarle un trapo encima.',
      highlight: false,
    },
    {
      icon: 'sparkles',
      title: 'Prende el fuego',
      desc: 'Unos segundos de aire sobre el carbón y la parrilla arranca. Sin cartón ni abanico.',
      highlight: false,
    },
  ],
  benefitsImage: {
    // Despiece (T-10).
    src: '/tornado/benefits/despiece.webp',
    alt: 'Soplador Tornado PRO desarmado: rejilla, turbina y motor salen del cabezal, y abajo la placa y la batería',
  },
  // No se renderizan (igual que en /soplador); el tipo los pide.
  pitchBlocks: [
    {
      eyebrow: 'El problema',
      headline: 'EL CABLE SIEMPRE QUEDA CORTO',
      accentWord: 'QUEDA CORTO',
      body: 'Los sopladores con cable te atan al enchufe: alargue, nudos y el cable enganchado en cada planta. Y los de nafta hacen ruido, pesan y hay que arrancarlos.',
    },
  ],
  // Sin `beforeAfter` por ahora: faltan las fotos (T-11 / T-12) y la sección
  // se veía en negro. Cuando estén, volver a cargarla con
  // /tornado/before-after/antes.webp y despues.webp.
  /** Contenido de la caja según el proveedor (2026-11-12). */
  whatsInBox: {
    headline: 'Calzá la batería y soplá.',
    lead: 'Pensado para la casa',
    body: ', el auto y el patio. Vereda, garage, parrilla, el auto recién lavado o la PC llena de polvo: lo cargás en la pared y lo llevás a donde haga falta.',
    note: 'Inalámbrico, con batería de litio desmontable y recargable.',
    items: ['Soplador Tornado PRO™', 'Batería de litio recargable', 'Cargador de pared', 'Manual'],
    gallery: [
      {
        src: '/tornado/whats-in-box/que-incluye.webp',
        alt: 'Lo que trae la caja: soplador, batería, cargador de pared y manual',
      },
    ],
    // La de secar el auto: es el ángulo principal.
    testimonial: TORNADO_REVIEWS[5],
  },
  reviews: TORNADO_REVIEWS,
  // El hero muestra sólo las de 5★, cortadas al largo de las del soporte.
  heroReviews: pickHeroReviews(TORNADO_REVIEWS),
  ratingBreakdown: {
    average: 4.8,
    total: TORNADO_REVIEWS.length,
    stars: [
      { stars: 5, count: 6 },
      { stars: 4, count: 2 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  },
  faq: [
    {
      q: '¿Cuánto dura la batería?',
      // TODO — pedir autonomía y tiempo de carga al proveedor.
      a: 'Depende de cuánto lo uses seguido: es un soplador de alta potencia y trabaja en tandas. Como la batería es desmontable, se carga aparte en el enchufe de la pared mientras guardás el soplador.',
    },
    {
      q: '¿También aspira?',
      a: 'No, sólo sopla. Está pensado para mover hojas, polvo y agua de un lugar a otro, o para avivar el fuego, no para juntarlos.',
    },
    {
      q: '¿Qué trae la caja?',
      a: 'El soplador, una batería de litio recargable, el cargador de pared y el manual.',
    },
    {
      q: '¿Sirve para secar el auto?',
      a: 'Sí. Después de lavarlo, el aire saca el agua de los espejos, las juntas y las llantas, donde el trapo no llega, sin tocar la pintura.',
    },
    {
      q: '¿Cuánto tarda en llegar?',
      // TODO: completar con los plazos reales de Andreani por zona antes de publicar
      a: 'El envío es gratis a todo el país y sale con código de seguimiento para verlo en tiempo real desde que despachamos. Los plazos de entrega varían según la zona.',
    },
    {
      q: '¿Puedo devolverlo si no me convence?',
      a: 'Sí. Si por cualquier motivo decidís que el Soplador Tornado PRO no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
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
      desc: 'Si tu soplador CARMANIA no funciona como esperabas, te reparamos las piezas o te lo reemplazamos completo.',
    },
    {
      badge: '✓',
      badgeSub: 'ENVÍO',
      title: 'ENVÍO GRATIS',
      desc: 'A todo el país, con código de seguimiento desde que despachamos.',
    },
  ],
  certifications: {
    enabled: false,
    title: 'Certificado por',
    desc: '',
    items: [],
  },
  trustPillars: SOPORTE.trustPillars,
  bundles: TORNADO_BUNDLES,
  upsellChain: TORNADO_UPSELL_CHAIN,
  whatsappPrefilled: 'Hola CARMANIA! Quería consultar por el Soplador Tornado PRO...',
  metadata: {
    title: 'Soplador Tornado PRO™ — CARMANIA',
    description:
      'Soplador inalámbrico de alta potencia con batería desmontable. Para la vereda, el auto, la parrilla y el taller. Envío gratis y 30 días de devolución.',
    ogTitle: 'Soplador Tornado PRO™ — CARMANIA',
    ogDescription:
      'Un tornado en tu mano: sin cable y sin nafta. Hojas, agua, polvo y brasas. Envío gratis y devolución 30 días.',
    canonical: '/soplador-tornado',
  },
} satisfies LandingConfig;
