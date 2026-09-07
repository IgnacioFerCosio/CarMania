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
 *
 * ⚠️ Las 12 FOTOS son reales (clientes con el parasol puesto). Los 12 TEXTOS
 * NO: los escribí yo. Esa mezcla es la más peligrosa de todas — una foto real
 * le da credibilidad a un testimonio que nadie dio, y las estrellas alimentan
 * el 4,8 y el "12 reseñas verificadas" que muestra la sección.
 *
 * Antes de publicar hay dos salidas: conseguir los textos reales de quienes
 * mandaron esas fotos, o sacar la sección. Publicarla así es exposición
 * directa bajo la ley de defensa del consumidor.
 */
const PARASOL_REVIEWS = [
  {
    name: 'Marcos T.',
    location: 'Buenos Aires',
    stars: 5,
    text: 'Lo dejo todo el día al sol en el laburo y ahora subo a un auto que se banca. El volante ya no quema y el aire enfría en la mitad de tiempo. Otra vida.',
    date: '18 Ago 2026',
    verified: true,
    image: '/parasol/reviews/01-tablero-y-volante.webp',
  },
  {
    name: 'Paula R.',
    location: 'Córdoba',
    stars: 5,
    text: 'Se abre como un paraguas, literal un movimiento y ya está puesto. El de cartón que tenía antes no cubría las puntas y se me caía cada vez que arrancaba.',
    date: '05 Ago 2026',
    verified: true,
    image: '/parasol/reviews/04-varillas-desde-abajo.webp',
  },
  {
    name: 'Gonzalo M.',
    location: 'Mendoza',
    stars: 5,
    text: 'Tengo una Amarok y entró perfecto en el parabrisas, pensé que iba a quedar chico. Se sostiene solo con los paños de sol, sin ventosas ni nada pegado.',
    date: '24 Jul 2026',
    verified: true,
    image: '/parasol/reviews/07-camioneta-interior-claro.webp',
  },
  {
    name: 'Julieta S.',
    location: 'Rosario',
    stars: 4,
    text: 'Cumple muy bien, el tablero dejó de recalentarse. Le saco una estrella porque la funda me costó un poco al principio para volver a guardarlo, después le agarrás la mano.',
    date: '11 Jul 2026',
    verified: true,
    image: '/parasol/reviews/03-pantalla-central.webp',
  },
  {
    name: 'Fernando A.',
    location: 'Salta',
    stars: 5,
    text: 'Acá el sol pega fuerte de verdad. Con esto el auto queda a la sombra completa, el plástico del tablero ya no se pone hirviendo. Lo guardo en la puerta y no molesta.',
    date: '28 Jun 2026',
    verified: true,
    image: '/parasol/reviews/06-auto-blanco-en-la-calle.webp',
  },
  {
    name: 'Lucía V.',
    location: 'La Plata',
    stars: 5,
    text: 'Desde afuera no se ve nada adentro, que era medio lo que buscaba porque suelo dejar cosas en el asiento. Y de paso el auto deja de ser un horno.',
    date: '21 Ago 2026',
    verified: true,
    image: '/parasol/reviews/02-visto-desde-afuera.webp',
  },
  {
    name: 'Matías D.',
    location: 'Mar del Plata',
    stars: 5,
    text: 'Lo dejo puesto todo el día frente al mar y el tablero dejó de recalentarse. Se acomoda solo con los paños de sol, sin ventosas ni nada pegado.',
    date: '14 Ago 2026',
    verified: true,
    image: '/parasol/reviews/05-luz-de-visera.webp',
  },
  {
    name: 'Ana Clara P.',
    location: 'Neuquén',
    stars: 4,
    text: 'La pantalla del auto se ponía tan caliente que costaba verla. Ahora arranca normal. Le pongo 4 porque al plegado le tardé en agarrar la mano.',
    date: '01 Ago 2026',
    verified: true,
    image: '/parasol/reviews/08-mano-en-la-pantalla.webp',
  },
  {
    name: 'Sebastián R.',
    location: 'Santa Fe',
    stars: 5,
    text: 'El auto me queda al sol todo el día en el estacionamiento del trabajo. La diferencia al subir a la tarde es enorme, no hay con qué darle.',
    date: '22 Jul 2026',
    verified: true,
    image: '/parasol/reviews/09-tablero-con-pantalla.webp',
  },
  {
    name: 'Vanina L.',
    location: 'Tucumán',
    stars: 5,
    text: 'El volante era imposible de agarrar al mediodía. Con esto arranco sin tener que esperar cinco minutos a que se enfríe.',
    date: '08 Jul 2026',
    verified: true,
    image: '/parasol/reviews/10-volante-y-parabrisas.webp',
  },
  {
    name: 'Diego A.',
    location: 'Bahía Blanca',
    stars: 5,
    text: 'Tengo tapizado claro y se me estaba poniendo amarillo de tanto sol. Lo compré por eso puntualmente y cumple.',
    date: '25 Jun 2026',
    verified: true,
    image: '/parasol/reviews/11-interior-beige.webp',
  },
  {
    name: 'Emilia F.',
    location: 'San Juan',
    stars: 5,
    text: 'Plegado entra en la puerta y no ocupa nada. Lo pongo y lo saco en segundos, que era exactamente lo que no pasaba con el de cartón.',
    date: '12 Jun 2026',
    verified: true,
    image: '/parasol/reviews/12-consola-central.webp',
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
    useCasesTitle: 'Cero calor. Cero desgaste.',
    // Sin prefijo "Para": los labels ya son frases ("MENOS CALOR", etc.).
    useCasesPrefix: '',
  },
  // Misma lista de logos de marcas que el soporte (reuso deliberado; la
  // extracción a un módulo compartido es una limpieza posterior).
  carBrands: SOPORTE.carBrands,
  /**
   * Grid de problemas que resuelve el parasol. Primeras 3 = "CERO <problema>",
   * últimas 3 = "MÁS <beneficio>". El label se pinta como en el soporte:
   * primera palabra blanca, última en accent.
   */
  useCases: [
    { label: 'CERO CALOR', image: '/parasol/use-cases/calor.webp', alt: 'Interior del auto más fresco con el Parasol PRO puesto' },
    { label: 'CERO RAJADURAS', image: '/parasol/use-cases/tablero.webp', alt: 'Tablero protegido del sol, sin plásticos rajados' },
    { label: 'CERO DECOLORACIÓN', image: '/parasol/use-cases/tapizados.webp', alt: 'Asientos y tapizados sin decolorar por el sol' },
    { label: 'MÁS FRESCURA', image: '/parasol/use-cases/volante.webp', alt: 'Volante a la sombra, sin quemar al agarrarlo' },
    { label: 'MÁS PRIVACIDAD', image: '/parasol/use-cases/privacidad.webp', alt: 'El Parasol PRO tapa la vista al interior del auto desde afuera' },
    { label: 'MÁS CONFORT', image: '/parasol/use-cases/aire.webp', alt: 'Subir a un auto que ya está fresco, el aire acondicionado rinde más' },
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
  // Imagen del render del producto para el showcase de beneficios. Por ahora
  // reusa la del hero; se puede cambiar por un render dedicado.
  benefitsImage: {
    src: '/parasol/hero/parasol-hero.webp',
    alt: 'Parasol PRO desplegado',
  },
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
  /**
   * Comparador before/after. Fotos pendientes (mismo encuadre: parabrisas al
   * sol sin parasol / con parasol puesto) — ver parasol-assets.md.
   */
  beforeAfter: {
    headline: 'EL MISMO AUTO. OTRO INTERIOR.',
    accentWord: 'OTRO INTERIOR.',
    body: 'Deslizá para ver la diferencia. A la izquierda, sol directo sobre el tablero y el volante. A la derecha, sombra total — puesto en 3 segundos.',
    beforeSrc: '/parasol/before-after/sin-parasol.webp',
    beforeAlt: 'Interior del auto con sol directo sobre el tablero y el volante, sin parasol',
    beforeLabel: 'Sin parasol',
    afterSrc: '/parasol/before-after/con-parasol.webp',
    afterAlt: 'El mismo interior en sombra total con el Parasol PRO puesto en el parabrisas',
    afterLabel: 'Con parasol',
  },
  reviews: PARASOL_REVIEWS,
  ratingBreakdown: {
    average: 4.8,
    total: PARASOL_REVIEWS.length,
    stars: [
      { stars: 5, count: 10 },
      { stars: 4, count: 2 },
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
