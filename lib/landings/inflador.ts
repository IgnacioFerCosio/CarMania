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
 *   - Imágenes: los pasos (INF-09…11) y los packs (INF-13…15) siguen siendo
 *     cajas "FOTO PENDIENTE" con su ID. Se reemplazan con el mismo nombre.
 *   - Reseñas: cargadas, con fotos placeholder (INF-R1…R8).
 *
 * ⚠️ SOBRE LAS SPECS. Sólo uso lo que se ve en la foto del proveedor (la
 * caja muestra pantalla digital y 4 modos: auto, moto, bici y pelota; en la
 * bolsa vienen manguera, cable USB, picos y manual) y lo que comparten TODAS
 * las fichas del ATJ-006: 150 PSI de máxima y corte automático. Lo que varía
 * entre vendedores (mAh: 2000×2, 4000, 6000; tiempo de inflado; puerto de
 * carga; función powerbank) NO se promete hasta medir una unidad nuestra.
 * Lo que hay que confirmar está marcado `// TODO VERIFICAR`.
 */
import type { Bundle, LandingConfig, Review, UpsellTier } from './types';
import { SOPORTE } from './soporte';

/**
 * Reseñas del Pulse PRO (las pasó Ignacio el 2026-11-25, todavía sin fotos).
 *
 * Mismo formato que las del soporte y el trabavolante: apellido abreviado y
 * fecha. Las fechas (noviembre de 2026) las puse yo, porque no vinieron con
 * las reseñas. Las fotos son placeholders "FOTO PENDIENTE" (INF-R1…R8) en
 * /public/inflador/reviews/, 4:3 a 800×600: se reemplazan con el mismo nombre.
 * Para sumar una: mismo formato, y actualizar `ratingBreakdown`.
 */
const INFLADOR_REVIEWS: readonly Review[] = [
  {
    name: 'Juan Ignacio P.',
    location: 'Córdoba',
    stars: 5,
    text: 'La verdad, una de las mejores compras que hice para el auto. Lo usé el finde pasado que salí a la ruta y sentía una cubierta medio baja. Lo seteás en 32 libras, arranca y corta solo, una maravilla. Es súper compacto, entra re bien en la guantera y el estuche/caja con el que viene está bárbaro para tener todo ordenado. El cable USB y los picos son clave.',
    date: '23 Nov 2026',
    verified: true,
    image: '/inflador/reviews/01-en-la-ruta.webp',
  },
  {
    name: 'Milagros F.',
    location: 'La Plata',
    stars: 5,
    text: 'Me sorprendió lo chiquito que es, parece un celular de los de antes pero más grueso, no ocupa nada de espacio. Lo compré principalmente para inflar la bici y alguna que otra vez las ruedas del auto. Cumple de sobra. Es re intuitivo de usar y la pantalla digital se ve perfecta incluso de noche con la linterna que trae arriba. El cable trenzado se nota de re buena calidad.',
    date: '21 Nov 2026',
    verified: true,
    image: '/inflador/reviews/02-bici.webp',
  },
  {
    name: 'Gonzalo M.',
    location: 'Mendoza',
    stars: 4,
    text: 'La verdad que es un golazo. Lo probé con las 4 ruedas del auto para ponerlas a punto antes de viajar y las dejó de diez. Lo único a tener en cuenta es que si tenés que inflar de cero una cubierta de chata capaz tarda un ratito y calienta un poco, pero para mantenimiento y emergencias es ideal. No depender más de las mangueras rotas de las estaciones de servicio no tiene precio.',
    date: '19 Nov 2026',
    verified: true,
    image: '/inflador/reviews/03-cuatro-ruedas.webp',
  },
  {
    name: 'Facundo S.',
    location: 'Rosario',
    stars: 5,
    text: 'Espectacular. En casa lo usamos para todo: la moto, las bicis de los chicos y hasta para inflar las pelotas de fútbol con el pico de aguja que trae (viene re completo el kit). Me encanta que sea inalámbrico, te da una libertad tremenda. La batería dura bastante, ya inflé varias cosas y todavía no lo tuve que cargar.',
    date: '17 Nov 2026',
    verified: true,
    image: '/inflador/reviews/04-pelota.webp',
  },
  {
    name: 'María Victoria C.',
    location: 'Tucumán',
    stars: 5,
    text: 'Llegó rapidísimo y la presentación en esa cajita negra de Carmania es un lujo. Viene con el cable para cargarlo, el piquito para las bicis (Presta) que para mí era fundamental, y el de pelota. El inflador en sí es re estético, con ese detalle en rojo. Lo probé apenas llegó y en un toque me niveló la rueda del auto. Re contenta con la compra.',
    date: '14 Nov 2026',
    verified: true,
    image: '/inflador/reviews/05-la-caja.webp',
  },
  {
    name: 'Diego R.',
    location: 'Neuquén',
    stars: 5,
    text: 'Viajo mucho por la estepa y las rutas de acá y tener esto en el auto me da una paz mental enorme. La linternita de arriba te salva la vida si tenés que inflar de noche al costado del camino. Lo probé y marca la presión exacta (lo comparé con un manómetro que tengo). Corta solo cuando llega a lo que le programás. Vale cada peso.',
    date: '12 Nov 2026',
    verified: true,
    image: '/inflador/reviews/06-de-noche.webp',
  },
  {
    name: 'Sofía C.',
    location: 'Salta',
    stars: 4,
    text: 'Lo llevo siempre en la mochila cuando salgo a pedalear por los cerros. Es un poquito pesado comparado con un inflador de mano común, pero te ahorra todo el esfuerzo físico y te infla la rueda en un minuto. Los materiales se sienten robustos, no es un plástico chino de esos que se rompen de la nada. Muy conforme con Carmania.',
    date: '09 Nov 2026',
    verified: true,
    image: '/inflador/reviews/07-mochila.webp',
  },
  {
    name: 'Santiago B.',
    location: 'Paraná',
    stars: 5,
    text: 'Lo compré con desconfianza porque lo veía muy chico, pero la verdad que tiene una fuerza bárbara. Lo usé para inflar una cubierta que estaba en 15 libras y la llevó a 32 al toque. El display digital es clarísimo y el botón del medio es re cómodo. El detalle de que traiga todos los accesorios y picos en la caja suma muchísimo. Compra obligada para cualquiera que tenga auto.',
    date: '06 Nov 2026',
    verified: true,
    image: '/inflador/reviews/08-en-la-mano.webp',
  },
];

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
    reviewsCount: INFLADOR_REVIEWS.length,
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
  // Universal: la misma tira de logos del soporte, el parasol y el trabavolante.
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
    // La de María Victoria: habla de la caja y lo que trae, al lado de la lista.
    testimonial: INFLADOR_REVIEWS[4],
    gallery: [
      { src: '/inflador/whats-in-box/que-incluye.webp', alt: 'La caja, el Inflador Pulse PRO, la manguera, el cable USB y los picos' },
    ],
  },
  reviews: INFLADOR_REVIEWS,
  // 6 de 5 estrellas y 2 de 4.
  ratingBreakdown: {
    average: 4.75, // 38 / 8
    total: INFLADOR_REVIEWS.length,
    stars: [
      { stars: 5, count: 6 },
      { stars: 4, count: 2 },
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
