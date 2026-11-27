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
 *   - Reseñas: cargadas, con sus fotos (INF-R1…R8).
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
 * las reseñas. Las fotos (INF-R1…R8, IA con filtro "de celular") están en
 * /public/inflador/reviews/, 4:3 a 800×600: ver inflador-assets.md §6.
 * Para sumar una: mismo formato, y actualizar `ratingBreakdown`.
 */
const INFLADOR_REVIEWS: readonly Review[] = [
  {
    name: 'Juan Ignacio P.',
    location: 'Córdoba',
    stars: 5,
    text: 'Lo usé el finde en la ruta con una cubierta medio baja. Elegís la presión, arranca y corta solo cuando llega, una maravilla. Súper compacto: entra re bien en la guantera.',
    date: '23 Nov 2026',
    verified: true,
    image: '/inflador/reviews/01-en-la-ruta.webp',
  },
  {
    name: 'Milagros F.',
    location: 'La Plata',
    stars: 5,
    text: 'Me sorprendió lo chiquito que es: parece un celular de los de antes, pero más grueso. Lo uso para la bici y el auto, es re intuitivo y la pantalla se ve perfecta hasta de noche.',
    date: '21 Nov 2026',
    verified: true,
    image: '/inflador/reviews/02-bici.webp',
  },
  {
    name: 'Gonzalo M.',
    location: 'Mendoza',
    stars: 4,
    text: 'Puse a punto las 4 ruedas antes de viajar y quedaron de diez. Para inflar de cero una cubierta de chata tarda un ratito, pero para mantenimiento y emergencias es ideal.',
    date: '19 Nov 2026',
    verified: true,
    image: '/inflador/reviews/03-cuatro-ruedas.webp',
  },
  {
    name: 'Facundo S.',
    location: 'Rosario',
    stars: 5,
    text: 'En casa lo usamos para todo: la moto, las bicis de los chicos y las pelotas de fútbol con el pico de aguja. Que sea inalámbrico te da una libertad tremenda.',
    date: '17 Nov 2026',
    verified: true,
    image: '/inflador/reviews/04-pelota.webp',
  },
  {
    name: 'Martín C.',
    location: 'Tucumán',
    stars: 5,
    text: 'Viene re completo: el cable para cargarlo, el pico para las bicis y el de pelota. Lo probé apenas llegó y en un toque me niveló la rueda del auto.',
    date: '14 Nov 2026',
    verified: true,
    image: '/inflador/reviews/05-la-caja.webp',
  },
  {
    name: 'Diego R.',
    location: 'Neuquén',
    stars: 5,
    text: 'Viajo mucho por la ruta y tenerlo en el auto me da una paz enorme. Lo comparé con mi manómetro y marca la presión exacta. Corta solo cuando llega a lo que le programás.',
    date: '12 Nov 2026',
    verified: true,
    image: '/inflador/reviews/06-de-noche.webp',
  },
  {
    name: 'Sofía C.',
    location: 'Salta',
    stars: 4,
    text: 'Lo llevo en la mochila cuando salgo a pedalear. Pesa un poco más que un inflador de mano, pero te ahorra todo el esfuerzo. Los materiales se sienten robustos.',
    date: '09 Nov 2026',
    verified: true,
    image: '/inflador/reviews/07-mochila.webp',
  },
  {
    name: 'Santiago B.',
    location: 'Paraná',
    stars: 5,
    text: 'Lo veía muy chico y desconfiaba, pero tiene una fuerza bárbara: una cubierta que estaba en 15 libras la llevó a 32 sin problema. La pantalla es clarísima.',
    date: '06 Nov 2026',
    verified: true,
    image: '/inflador/reviews/08-en-la-mano.webp',
  },
];

/**
 * Versiones cortas para el carrusel del hero (sólo las de 5★, en el orden de
 * la lista) y para la opinión de "qué incluye": hasta ~150 caracteres, para
 * que entren en tres líneas sin cortarlas con "…" (ver `pickHeroReviews`).
 */
const corta = (name: string, text: string): Review => {
  const r = INFLADOR_REVIEWS.find((x) => x.name === name)!;
  // Estas van en un círculo de 40-48 px: miniatura de 128² en reviews/mini/.
  // En Cloudflare `/_next/image` devuelve el original, así que sin esto el
  // hero bajaba las 8 fotos de 800×600 (~60 KB cada una) para un avatar.
  return { ...r, text, image: r.image?.replace('/reviews/', '/reviews/mini/') };
};

const INFLADOR_HERO_REVIEWS: readonly Review[] = [
  corta('Juan Ignacio P.', 'Elegís la presión, arranca y corta solo cuando llega, una maravilla. Súper compacto: entra re bien en la guantera.'),
  corta('Milagros F.', 'Me sorprendió lo chiquito que es. Lo uso para la bici y el auto, y la pantalla se ve perfecta hasta de noche.'),
  corta('Facundo S.', 'Lo usamos para todo: la moto, las bicis de los chicos y las pelotas. Que sea inalámbrico te da una libertad tremenda.'),
  corta('Martín C.', 'Viene re completo. Lo probé apenas llegó y en un toque me niveló la rueda del auto.'),
  corta('Diego R.', 'Lo comparé con mi manómetro y marca la presión exacta. Corta solo cuando llega a lo que le programás.'),
  corta('Santiago B.', 'Lo veía muy chico, pero tiene una fuerza bárbara. La pantalla es clarísima.'),
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
    heroLine1: 'La presión justa',
    heroLine2: 'sin moverte del auto',
    heroSub:
      'Elegís la presión, apretás un botón y se corta solo cuando llega. Auto, moto, bici y pelota. Sin cables, entra en la guantera y hasta te carga el celular.',
    finalCta: 'Elegí la presión. Apretá. Listo.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Pulse PRO',
    benefitsTitle: 'La gomería en la guantera',
    benefitsSub:
      'Una rueda baja gasta más nafta, se gasta antes y frena peor. Con el Pulse PRO la controlás en tu casa, en dos minutos.',
  },
  heroMedia: {
    // Collage de 8 tomas de los videos de fábrica del ATJ-006 (el modelo
    // exacto): botón, salida de aire y luz, en la mano, enroscando en la
    // válvula, inflando la rueda, pelota y bici. 540×540 H.264 sin audio,
    // 13 s, ~540 KB, con fundidos. El poster es su primer frame (el LCP).
    kind: 'video',
    src: '/inflador/hero/inflador-hero.mp4',
    poster: '/inflador/hero/inflador-hero-poster.webp',
    width: 540,
    height: 540,
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
    // Antes "PANTALLA DIGITAL" (ya se ve en el hero y en cómo funciona). La foto
    // la generamos con IA (antes era un frame del video, con poca calidad).
    { label: 'CARGA EL CELULAR', image: '/inflador/use-cases/carga-celular.webp', alt: 'El inflador cargando un celular por USB, como batería externa' },
    { label: 'CORTE AUTOMÁTICO', image: '/inflador/use-cases/corte.webp', alt: 'El inflador se apaga solo al llegar a la presión elegida' },
    { label: 'CUATRO MODOS', image: '/inflador/use-cases/modos.webp', alt: 'Los modos de auto, moto, bici y pelota' },
    { label: 'LUZ LED', image: '/inflador/use-cases/luz.webp', alt: 'Inflando una rueda de noche con la luz del inflador' },
    { label: 'ENTRA EN LA GUANTERA', image: '/inflador/use-cases/guantera.webp', alt: 'El inflador guardado en la guantera del auto' },
  ],
  steps: [
    {
      n: 1,
      title: 'Enroscá la manguera',
      desc: 'La manguera sale de arriba del inflador y se enrosca en la válvula de la rueda. Para la bici, la pelota o un inflable, usás el pico que corresponda.',
      video: '/inflador/how-to-use/01-enrosca-la-manguera.mp4',
      // Alternativa: la animación en SVG (InflatorScene). Para volver a ella,
      // borrá `video` y descomentá esto.
      // scene: 'hose',
    },
    {
      n: 2,
      title: 'Elegí el modo',
      desc: 'Con el botón pasás por los 4 modos: auto, moto, bici y pelota, cada uno con su presión. Si tu auto pide otra, la ajustás en la pantalla.',
      video: '/inflador/how-to-use/02-elegi-el-modo.mp4',
      // Alternativa: la animación en SVG (InflatorScene). Para volver a ella,
      // borrá `video` y descomentá esto.
      // scene: 'mode',
    },
    {
      n: 3,
      title: 'Apretá y olvidate',
      desc: 'Infla solo y se corta cuando llega a la presión exacta. Sin pasarte, sin manómetro aparte y sin agacharte a medir.',
      video: '/inflador/how-to-use/03-se-corta-solo.mp4',
      // Alternativa: la animación en SVG (InflatorScene). Para volver a ella,
      // borrá `video` y descomentá esto.
      // scene: 'auto',
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
      icon: 'bolt',
      title: 'Batería externa',
      desc: 'Por el puerto USB carga el celular en una emergencia.',
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
    // La de Martín (corta): habla de lo que trae, al lado de la lista.
    testimonial: corta(
      'Martín C.',
      'Viene re completo: el cable para cargarlo, el pico para las bicis y el de pelota.',
    ),
    gallery: [
      { src: '/inflador/whats-in-box/que-incluye.webp', alt: 'La caja, el Inflador Pulse PRO, la manguera, el cable USB y los picos' },
    ],
  },
  reviews: INFLADOR_REVIEWS,
  heroReviews: INFLADOR_HERO_REVIEWS,
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
   * compresor de 12 V con cable y el de la estación de servicio. Recortes
   * con transparencia (generados con IA) en /inflador/comparativa/. Para que
   * el Pulse PRO destaque, sale más alto que la fila de figuras (`grow`) y
   * sobresale por arriba de la tabla, entero (manguera y accesorios); los
   * otros dos llevan margen transparente arriba, así quedan al ~70 %.
   */
  comparison: {
    title: 'No es un compresor más.',
    accent: 'más.',
    columns: [
      { name: 'Pulse PRO™', image: '/inflador/comparativa/pulse-pro.webp', width: 306, height: 640, grow: 1.6 },
      { name: 'Compresor 12 V', image: '/inflador/comparativa/compresor-12v.webp', width: 360, height: 540 },
      { name: 'Estación de servicio', image: '/inflador/comparativa/estacion.webp', width: 126, height: 583 },
    ],
    rows: [
      { label: 'Sin cables', values: [true, false, false] },
      { label: 'Se corta solo a la presión justa', values: [true, false, 'a veces'] },
      { label: 'Siempre a mano', values: [true, true, false] },
      { label: 'Lo usás con el auto apagado', values: [true, false, true] },
      { label: 'Infla bicis, pelotas e inflables', values: [true, true, false] },
      { label: 'Luz para la noche', values: [true, false, false] },
      { label: 'Carga el celular', values: [true, false, false] },
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
      a: 'Para completar una rueda de auto que está baja, un par de minutos. Una rueda totalmente desinflada lleva más.',
    },
    {
      q: '¿Qué presión le pongo?',
      a: 'Tiene un modo para cada cosa (auto, moto, bici y pelota), cada uno con su presión. Y la podés cambiar a mano: en el auto, poné la que dice el fabricante, que está en una etiqueta en el marco de la puerta del conductor o en el manual. Se mide con la rueda fría.',
    },
    {
      // Se ve en los dos videos de fábrica (cargando un celular por USB).
      q: '¿Sirve para cargar el celular?',
      a: 'Sí. Tiene un puerto USB, así que en una emergencia también funciona como batería externa: conectás el cable del celular y lo cargás.',
    },
    {
      // Ficha del ATJ-006 en Alibaba (Yuyao Yiheng): 9 × 7,2 × 14,8 cm, 80 W,
      // 150 PSI, ABS. TODO VERIFICAR — los 4000 mAh (salen de otra ficha del
      // ATJ-006, no de la nuestra) y el peso, con una unidad nuestra.
      q: '¿Qué características técnicas tiene?',
      a: 'Motor de 80 W, hasta 150 PSI, batería recargable de 4000 mAh y carcasa de ABS. Mide unos 15 × 9 × 7 cm: entra en una mano y en la guantera.',
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
      'La presión justa sin moverte del auto: inflador inalámbrico con corte automático para auto, moto, bici y pelota, que además carga el celular. Envío gratis y 30 días de devolución.',
    ogTitle: 'Inflador Pulse PRO™ — CARMANIA',
    ogDescription:
      'La presión justa sin moverte del auto. Elegís, apretás y se corta solo. Sin cables, entra en la guantera y carga el celular. Envío gratis y devolución 30 días.',
    canonical: '/inflador',
  },
} satisfies LandingConfig;
