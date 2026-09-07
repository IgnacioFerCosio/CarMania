/**
 * LandingConfig del Soplador Turbo PRO™ (landing `/soplador`).
 *
 * Producto de origen: "X8 Mini Soplador Inalámbrico" de LAMBO TECH, modelo
 * LT-25119. Se vende SOLO en negro (el proveedor también lo ofrece en morado).
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts). SÍ puede
 * importar de `./soporte`.
 *
 * ⚠️ PLACEHOLDERS pendientes antes de que /soplador reciba tráfico:
 *   - Precios (`fallbackPricing`, `bundles[].fallbackPrice/Compare`,
 *     `upsellChain`): el producto no está cotizado en pesos — marcados
 *     `// TODO PRECIO REAL`. Lo único cierto es el costo del proveedor,
 *     US$ 11,00 por unidad en caja de 60.
 *   - Shopify: los 3 productos no existen; `productId`/`fallbackVariantId` en
 *     `''`. Con `''` el BuyButton queda deshabilitado ("Producto no
 *     disponible") en vez de habilitarse contra un merchandise inexistente.
 *   - Media bajo `/soplador/...`: NINGÚN archivo existe todavía. Ver el
 *     checklist en docs/superpowers/specs/soplador-assets.md.
 *   - Reseñas / `brand.socialProofCount` / `ratingBreakdown`: inventadas
 *     (ver el bloque de aviso sobre `SOPLADOR_REVIEWS`).
 *
 * ⚠️ SOBRE LAS SPECS. Los números (110.000 RPM, 68 m/s, 120 W, 2000 mAh,
 * 15-25 min, 265 g) salen de la ficha del proveedor y NO están verificados
 * contra una unidad física. Además hay contradicción en el mercado: varias
 * publicaciones de este mismo tipo de equipo declaran ~25 m/s a 110.000 RPM,
 * bastante lejos de los 68 m/s de la ficha. Antes de publicar conviene medir
 * o bajar el claim: una cifra de rendimiento inflada es exposición directa
 * bajo la ley de defensa del consumidor. Están marcadas `// TODO VERIFICAR`.
 */
import type { Bundle, LandingConfig, UpsellTier } from './types';
import { SOPORTE } from './soporte';

/**
 * ⚠️ RESEÑAS PLACEHOLDER — INVENTADAS.
 *
 * El Soplador Turbo PRO todavía no se vendió, así que estas reseñas son
 * ficticias y existen sólo para que la sección renderice completa en
 * desarrollo.
 *
 * NO PUBLICAR ASÍ. Reemplazar por reseñas reales antes de que /soplador
 * reciba tráfico. Lo mismo aplica a `brand.socialProofCount` y a
 * `ratingBreakdown`.
 */
const SOPLADOR_REVIEWS = [
  {
    name: 'Damián L.',
    location: 'Buenos Aires',
    stars: 5,
    text: 'Lo compré para las rejillas del aire, que no había forma de limpiarlas. Sale todo el polvo de una. Después terminé usándolo para el teclado de la compu y para la parrilla.',
    date: '22 Ago 2026',
    verified: true,
  },
  {
    name: 'Carolina B.',
    location: 'Córdoba',
    stars: 5,
    text: 'Venía comprando latas de aire comprimido cada dos por tres. Esta se carga por USB y listo, no gasto más en eso. Entra en la guantera sin problema.',
    date: '09 Ago 2026',
    verified: true,
  },
  {
    name: 'Nicolás F.',
    location: 'Rosario',
    stars: 5,
    text: 'Después de lavar el auto lo uso para volar el agua de los espejos y las molduras, donde el paño no llega. Se seca sin dejar marcas de gotas.',
    date: '30 Jul 2026',
    verified: true,
  },
  {
    name: 'Sofía M.',
    location: 'Mendoza',
    stars: 4,
    text: 'Anda muy bien y es más chiquito de lo que esperaba. Le pongo 4 porque la batería a máxima potencia no dura tanto, pero para limpiar el auto entero me alcanza de sobra.',
    date: '17 Jul 2026',
    verified: true,
  },
  {
    name: 'Rodrigo P.',
    location: 'Tucumán',
    stars: 5,
    text: 'Tengo perro y el pelo en la tapicería era una guerra. Con esto lo levanto de los rincones de los asientos y después lo junto. Cambió el trabajo por completo.',
    date: '02 Jul 2026',
    verified: true,
  },
] as const;

const SOPLADOR_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el producto x1 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Un soplador. Cero polvo.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ boquilla y cable USB incluidos',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 24990, // TODO PRECIO REAL
    fallbackCompare: 39000, // TODO PRECIO REAL
    image: '/soplador/bundles/SopladorX1.webp',
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
    bonus: '+ 2 boquillas y 2 cables',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 37485, // TODO PRECIO REAL
    fallbackCompare: 78000, // TODO PRECIO REAL
    image: '/soplador/bundles/SopladorX2.webp',
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
    bonus: '+ 3 boquillas y 3 cables',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 49980, // TODO PRECIO REAL
    fallbackCompare: 117000, // TODO PRECIO REAL
    image: '/soplador/bundles/SopladorX3.webp',
  },
];

const SOPLADOR_UPSELL_CHAIN: readonly UpsellTier[] = SOPLADOR_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);

export const SOPLADOR = {
  brand: {
    tagline: 'Soplador Turbo PRO™',
    productHandle: 'soplador-turbo-pro',
    socialProofCount: 'Miles', // TODO: número real cuando haya ventas
    socialProofLabel: 'de rincones sin polvo',
    averageRating: 4.8,
    reviewsCount: SOPLADOR_REVIEWS.length, // TODO: reseñas reales
  },
  // TODO PRECIO REAL — coincide con el bundle x1; el producto no está cotizado.
  fallbackPricing: {
    price: 24990,
    compareAtPrice: 39000,
    currency: 'ARS',
  },
  headlines: {
    heroLine1: 'El soplador que limpia',
    heroLine2: 'donde no llegás',
    heroSub:
      'Un motor turbo del tamaño de tu mano que saca el polvo de las rejillas, los tapizados y cada rincón del auto. Inalámbrico, recargable por USB y sin latas descartables.',
    finalCta: 'Sacá el polvo de donde no llega ni el trapo.',
    howItWorksLabel: 'Listo en 3 pasos',
    howItWorksTitle: '¿Cómo funciona?',
    benefitsEyebrow: 'Por qué el Soplador Turbo PRO',
    benefitsTitle: 'Potencia de taller en la palma',
    benefitsSub:
      'Todo lo que junta polvo en el auto tiene un rincón donde no entra ni el trapo ni la aspiradora. Ahí es donde este entra.',
  },
  heroMedia: {
    // Imagen (no video): render del producto en negro. Es el LCP de /soplador.
    kind: 'image',
    src: '/soplador/hero/soplador-hero.webp',
    width: 1600,
    height: 1600,
    badgeLine1: 'HASTA',
    badgeLine2: '110.000 RPM', // TODO VERIFICAR — dato de la ficha del proveedor
  },
  heroSubHighlights: ['turbo', 'USB'],
  sectionCopy: {
    pricingTitle: 'Probá tu Soplador Turbo PRO',
    pricingTitleAccent: '30 días gratis',
    reviewsTitle: 'Opiniones de',
    reviewsTitleAccent: 'clientes',
    reviewsFooter: 'de autos que quedaron impecables.',
    faqEyebrow: 'Dudas frecuentes',
    faqTitle: 'Respondemos lo que más nos preguntan',
    carBrandsTitle: 'Anda en',
    carBrandsTitleAccent: 'cualquier auto',
    useCasesTitle: 'Un soplador. Todos los rincones.',
    // Con prefijo, como el soporte: los labels son lugares ("Para REJILLAS").
    useCasesPrefix: 'Para',
  },
  // La sección CarBrands NO se renderiza en /soplador: un soplador no tiene
  // compatibilidad por marca de auto, y la tira de logos sería relleno. Queda
  // acá sólo porque el tipo lo pide.
  carBrands: SOPORTE.carBrands,
  /**
   * Dónde se usa. Igual que el soporte: prefijo "Para" en blanco y la última
   * palabra del label en accent.
   */
  useCases: [
    { label: 'REJILLAS', image: '/soplador/use-cases/rejillas.webp', alt: 'Soplando el polvo de las rejillas de ventilación del auto' },
    { label: 'TAPIZADOS', image: '/soplador/use-cases/tapizados.webp', alt: 'Levantando migas y pelo de mascota de los pliegues del asiento' },
    { label: 'EL TABLERO', image: '/soplador/use-cases/tablero.webp', alt: 'Sacando polvo de las costuras y botones del tablero' },
    { label: 'EL TECLADO', image: '/soplador/use-cases/teclado.webp', alt: 'Limpiando entre las teclas de un teclado con el soplador' },
    { label: 'LA NOTEBOOK', image: '/soplador/use-cases/notebook.webp', alt: 'Soplando la salida de aire de una notebook' },
    { label: 'EL SECADO', image: '/soplador/use-cases/secado.webp', alt: 'Volando las gotas de agua de las molduras después de lavar el auto' },
  ],
  steps: [
    {
      n: 1,
      title: 'Cargalo por USB',
      desc: 'Se carga con el cable que viene incluido, en cualquier puerto USB: la compu, el cargador del celular o el del auto.',
      video: '/soplador/how-to-use/01-cargalo-por-usb.mp4',
    },
    {
      n: 2,
      title: 'Poné la boquilla',
      desc: 'Viene con una boquilla intercambiable que concentra el aire en un chorro fino, para entrar en las ranuras más angostas.',
      video: '/soplador/how-to-use/02-pone-la-boquilla.mp4',
    },
    {
      n: 3,
      title: 'Apretá y soplá',
      desc: 'Un botón y listo. Lo agarrás con una mano y vas sacando el polvo de cada rincón, sin cables ni compresor.',
      video: '/soplador/how-to-use/03-apreta-y-sopla.mp4',
    },
  ],
  benefits: [
    {
      icon: 'bolt',
      title: 'Motor turbo de alta velocidad',
      // TODO VERIFICAR — 110.000 RPM y 68 m/s salen de la ficha del proveedor.
      desc: 'Genera un chorro de aire capaz de levantar el polvo incrustado, no de empujarlo de un lado al otro.',
      highlight: true,
    },
    {
      icon: 'rotate-left',
      title: 'Se recarga, no se descarta',
      desc: 'Batería de litio con carga por USB. Cero latas de aire comprimido, cero gasto cada vez que querés limpiar.',
      highlight: true,
    },
    {
      icon: 'check',
      title: 'Cabe en una mano',
      // TODO VERIFICAR — 265 g según la ficha del proveedor.
      desc: 'Liviano y compacto: entra en la guantera y lo llevás donde lo necesites.',
      highlight: false,
    },
    {
      icon: 'rotate',
      title: 'Boquilla intercambiable',
      desc: 'Concentra el aire en un chorro fino para las ranuras, o soplá abierto para superficies grandes.',
      highlight: false,
    },
    {
      icon: 'shield',
      title: 'Protección contra sobrecalentamiento',
      desc: 'Materiales resistentes al calor y corte automático: el motor trabaja fuerte sin ponerse en riesgo.',
      highlight: false,
    },
    {
      icon: 'sparkles',
      title: 'No sólo para el auto',
      desc: 'Teclados, notebooks, cámaras, ventiladores, muebles. Donde haya polvo en un rincón, sirve.',
      highlight: false,
    },
  ],
  benefitsImage: {
    src: '/soplador/hero/soplador-hero.webp',
    alt: 'Soplador Turbo PRO en negro, con su boquilla intercambiable',
  },
  pitchBlocks: [
    {
      eyebrow: 'El problema',
      headline: 'EL POLVO SIEMPRE GANA EN LOS RINCONES',
      accentWord: 'EN LOS RINCONES',
      body: 'Podés pasar el trapo y la aspiradora todo lo que quieras: las rejillas del aire, las costuras de los asientos, los bordes del tablero y las ranuras de los botones siguen juntando polvo. Son lugares donde no entra ni una boquilla ni un paño. Ahí no sirve frotar más fuerte — hay que sacarlo con aire.',
    },
    {
      eyebrow: 'La alternativa',
      headline: 'DEJÁ DE COMPRAR LATAS DE AIRE COMPRIMIDO',
      accentWord: 'LATAS DE AIRE COMPRIMIDO',
      body: 'La lata se termina, hay que comprar otra, y cada vez sale plata. Encima pierde presión a medida que se vacía y no se puede inclinar sin que largue líquido. Este se carga por USB y sopla igual de fuerte la primera vez que la número cien.',
    },
  ],
  /**
   * Comparador before/after: mismas rejillas de ventilación, sucias y limpias.
   * Fotos pendientes — ver soplador-assets.md.
   */
  beforeAfter: {
    headline: 'LAS MISMAS REJILLAS. OTRO AUTO.',
    accentWord: 'OTRO AUTO.',
    body: 'Deslizá para ver la diferencia. A la izquierda, el polvo acumulado entre las aletas. A la derecha, las mismas rejillas después de una pasada.',
    beforeSrc: '/soplador/before-after/sin-soplador.webp',
    beforeAlt: 'Rejillas de ventilación del auto con polvo acumulado entre las aletas',
    beforeLabel: 'Antes',
    afterSrc: '/soplador/before-after/con-soplador.webp',
    afterAlt: 'Las mismas rejillas limpias después de usar el Soplador Turbo PRO',
    afterLabel: 'Después',
  },
  reviews: SOPLADOR_REVIEWS,
  ratingBreakdown: {
    average: 4.8,
    total: SOPLADOR_REVIEWS.length,
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
      q: '¿Cuánto dura la batería?',
      // TODO VERIFICAR — 15 a 25 min y 2000 mAh según la ficha del proveedor.
      a: 'Depende de la potencia que uses: a máxima rinde menos y a media, bastante más. Para limpiar el interior de un auto entero alcanza de sobra en una sola carga.',
    },
    {
      q: '¿Sirve para algo más que el auto?',
      a: 'Sí. Teclados, gabinetes de computadora, notebooks, cámaras, ventiladores, muebles y rincones de la casa. Donde haya polvo metido en una ranura, entra.',
    },
    {
      q: '¿Reemplaza a la aspiradora?',
      a: 'No, la complementa. La aspiradora levanta lo que está a la vista; el soplador saca lo que está metido en las ranuras y las costuras, donde ninguna boquilla llega. Lo normal es soplar primero y aspirar después.',
    },
    {
      q: '¿Cómo se carga?',
      a: 'Con el cable USB que viene incluido. Lo enchufás a la computadora, al cargador del celular o al del auto — no necesita una fuente especial.',
    },
    {
      q: '¿Cuánto tarda en llegar?',
      // TODO: completar con los plazos reales de Andreani por zona antes de publicar
      a: 'El envío es gratis a todo el país y sale con código de seguimiento para verlo en tiempo real desde que despachamos. Los plazos de entrega varían según la zona.',
    },
    {
      q: '¿Puedo devolverlo si no me convence?',
      a: 'Sí. Si por cualquier motivo decidís que el Soplador Turbo PRO no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
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
      desc: 'Si tu soplador CARMANIA no funciona como esperabas, te reparamos las piezas o te lo reemplazamos completo. Vos seguís manejando tranquilo.',
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
  bundles: SOPLADOR_BUNDLES,
  upsellChain: SOPLADOR_UPSELL_CHAIN,
  whatsappPrefilled: 'Hola CARMANIA! Quería consultar por el Soplador Turbo PRO...',
  metadata: {
    title: 'Soplador Turbo PRO™ — CARMANIA',
    description:
      'El soplador inalámbrico que saca el polvo de las rejillas, los tapizados y cada rincón del auto. Recargable por USB, sin latas descartables. Envío gratis y 30 días de devolución.',
    ogTitle: 'Soplador Turbo PRO™ — CARMANIA',
    ogDescription:
      'Motor turbo del tamaño de tu mano. Saca el polvo de donde no llega el trapo. Recargable por USB. Envío gratis y devolución 30 días.',
    canonical: '/soplador',
  },
} satisfies LandingConfig;
