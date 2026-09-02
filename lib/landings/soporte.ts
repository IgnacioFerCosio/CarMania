/**
 * LandingConfig del Soporte Magnético PRO™ (landing `/`).
 *
 * Toda la data product-específica que antes vivía suelta en `lib/config.ts`.
 * `lib/config.ts` re-exporta estos símbolos con sus nombres viejos para que
 * los imports existentes sigan compilando sin tocarse.
 *
 * REGLA: este archivo NO importa de `lib/config.ts` (ver types.ts).
 */
import type {
  Bundle,
  Benefit,
  LandingConfig,
  UpsellTier,
} from './types';

/**
 * Datos de marca del soporte. `name` (global, 'CARMANIA') se recompone en
 * `lib/config.ts`.
 */
export const BRAND_SOPORTE = {
  tagline: 'Soporte Magnético PRO™',
  productHandle: 'soporte-magnetico-pro',
  socialProofCount: '+3.500',
  socialProofLabel: 'clientes felices',
  averageRating: 4.9,
  reviewsCount: 412,
} as const;

/**
 * Precios fallback en ARS (se usan si la Storefront API no responde).
 * Los precios "vivos" se traen del producto en Shopify en build time.
 */
export const FALLBACK_PRICING = {
  price: 39990,
  compareAtPrice: 60000,
  currency: 'ARS',
} as const;

export const HEADLINES = {
  // Hero — Bold italic UPPERCASE. La última frase resaltada en accent (rojo).
  heroLine1: 'El soporte definitivo',
  heroLine2: 'para tu celular',
  heroSub:
    'Se adhiere al auto, al espejo, al escritorio o a la pared. Compatible con MagSafe para GPS, llamadas y filmar contenido.',
  heroBadge: 'NO SE CAE MÁS', // Texto sobre la imagen del producto en el hero (editable)
  pain: '¿Cuántas veces se te cayó el celular manejando?',
  painSub:
    'Estás siguiendo el GPS, te suena un mensaje, y cuando volvés a mirar la pantalla está en el piso del acompañante. Los soportes baratos no aguantan ni dos pozos sin soltarse.',
  finalCta: 'Manejá tranquilo. Tu celular no se mueve más.',
  // Bloques nuevos de la versión rediseñada
  useCases: 'Un soporte. Todos los lugares.',
  carCompat: 'Compatible con cualquier auto',
  whatsInBox: 'Sacalo, instalalo, te olvidás.',
  whatsInBoxSub:
    'Pensado para la vida real, no solo para el auto. Pegalo al parabrisas para usar GPS, a la pared de la cocina para seguir recetas, o al espejo del baño para filmarte. Lo movés de lugar en segundos.',
  whatsInBoxNoTools: 'Fácil de mover y reutilizar. Sin herramientas, sin marcas.',
  howItWorksLabel: 'Fácil de instalar',
  howItWorksTitle: '¿Cómo funciona?',
  // Copy de Benefits — antes hardcodeado en Benefits.tsx.
  benefitsEyebrow: 'Por qué CARMANIA',
  benefitsTitle: 'Pensado para autos argentinos',
  benefitsSub:
    'Probado en pozos, ripio, autopista y calor. Cada detalle está calibrado para que no te falle nunca.',
} as const;

/**
 * Media del hero — antes hardcodeado en Hero.tsx (video, poster, badge).
 */
export const HERO_MEDIA = {
  videoSrc: '/hero/VideoPrincipal.mp4',
  poster: '/hero/VideoPrincipal-poster.webp',
  width: 720,
  height: 1280,
  badgeLine1: 'NO SE',
  badgeLine2: 'CAE MÁS',
} as const;

/** Términos de `heroSub` que se pintan en accent — antes hardcodeado en Hero.tsx. */
export const HERO_SUB_HIGHLIGHTS = ['MagSafe', 'GPS'];

/**
 * Copy de secciones — antes hardcodeado en Pricing.tsx / Reviews.tsx /
 * FAQ.tsx / CarBrands.tsx.
 */
export const SECTION_COPY = {
  pricingTitle: 'Probá tu CARMANIA',
  pricingTitleAccent: '30 días gratis',
  reviewsTitle: 'Reseñas de',
  reviewsTitleAccent: 'clientes',
  reviewsFooter: 'clientes que ya manejan tranquilos con CARMANIA.',
  faqEyebrow: 'Dudas frecuentes',
  faqTitle: 'Respondemos lo que más nos preguntan',
  carBrandsTitle: 'Compatible con',
  carBrandsTitleAccent: 'cualquier auto',
} as const;

/**
 * Marcas de autos compatibles. Por ahora son nombres en texto.
 * Si querés mostrar logos reales, ponelos en /public/brands/<slug>.svg
 * y cambiá el `logo` con la ruta.
 */
// `w`/`h` son la relación de aspecto real del SVG (su viewBox). El alto
// pintado lo fija el CSS (h-7/h-9/h-10); los atributos sólo sirven para que
// el navegador reserve el ancho correcto y el marquee no salte al cargar.
export const CAR_BRANDS = [
  { name: 'Toyota',        logo: '/brands/toyota.svg',     softWhite: false, w: 251,  h: 42   },
  { name: 'Ford',          logo: '/brands/ford.svg',       softWhite: true,  w: 1000, h: 345  },
  { name: 'Chevrolet',     logo: '/brands/chevrolet.svg',  softWhite: false, w: 700,  h: 327  },
  { name: 'Volkswagen',    logo: '/brands/volkswagen.svg', softWhite: false, w: 1024, h: 1024 },
  { name: 'Renault',       logo: '/brands/renault.svg',    softWhite: false, w: 500,  h: 438  },
  { name: 'Peugeot',       logo: '/brands/peugeot.svg',    softWhite: true,  w: 1587, h: 1123 },
  { name: 'Fiat',          logo: '/brands/fiat.svg',       softWhite: false, w: 110,  h: 68   },
  { name: 'Honda',         logo: '/brands/honda.svg',      softWhite: false, w: 2000, h: 1605 },
  { name: 'Nissan',        logo: '/brands/nissan.svg',     softWhite: false, w: 265,  h: 221  },
  { name: 'Mercedes-Benz', logo: '/brands/mercedes.svg',   softWhite: false, w: 1000, h: 1001 },
  { name: 'BMW',           logo: '/brands/bmw.svg',        softWhite: true,  w: 200,  h: 200  },
  { name: 'Audi',          logo: '/brands/audi.svg',       softWhite: false, w: 403,  h: 210  },
];

/**
 * Pasos de "Cómo funciona" con imagen.
 * Las imágenes van en /public/steps/.
 * `video` (el clip de cada paso) antes vivía hardcodeado en HowItWorks.tsx.
 */
export const STEPS_V2 = [
  {
    n: 1,
    title: 'Instalá la base',
    desc: 'Pegá la base de succión a cualquier superficie lisa — parabrisas, espejo, escritorio. Girá el anillo inferior para fijarla.',
    video: '/how-to-use/InstalaLaBase.mp4',
    image: '/steps/01-instalar.jpg',
  },
  {
    n: 2,
    title: 'Ajustá el ángulo',
    desc: 'Usá las articulaciones para inclinar, rotar o girar el soporte. Lo orientás exactamente como te queda mejor para ver.',
    video: '/how-to-use/ajustaAngulo.mp4',
    image: '/steps/02-ajustar.jpg',
  },
  {
    n: 3,
    title: 'Colocá el celular',
    desc: 'Acercá tu celular al MagSafe y queda fijo al instante. Sin MagSafe nativo, usás la chapita metálica que viene incluida.',
    video: '/how-to-use/colocaTuCelu.mp4',
    image: '/steps/03-colocar.jpg',
  },
] as const;

export const BENEFITS: readonly Benefit[] = [
  {
    icon: 'shield',
    title: 'Imán N52 grado militar',
    desc: 'El neodimio más fuerte que existe en venta civil. Aguanta hasta 500 g — celulares grandes con funda gruesa incluidos — y no se mueve ni en caminos de ripio.',
    highlight: true,
  },
  {
    icon: 'vacuum',
    title: 'Sujeción al vacío real',
    desc: 'Base con palanca de succión que se adhiere al instante a cualquier superficie lisa. Apretás, y queda firme como soldado.',
    highlight: true,
  },
  {
    icon: 'leaf',
    title: 'No daña tu celular',
    desc: 'El campo magnético está calibrado: no afecta GPS, brújula, batería, ni la carga inalámbrica. 100% seguro probado.',
    highlight: false,
  },
  {
    icon: 'rotate',
    title: 'Rotación 360° con bloqueo',
    desc: 'Bola articulada de aluminio aeroespacial. Ajustás el ángulo perfecto y se queda exactamente ahí.',
    highlight: false,
  },
  {
    icon: 'sparkles',
    title: 'Sin pegamentos ni residuos',
    desc: 'Lo movés de auto en auto sin dejar una sola marca. Lo regalás, lo prestás, lo cambiás de lugar — siempre queda como nuevo.',
    highlight: false,
  },
  {
    icon: 'bolt',
    title: 'Carga rápida compatible',
    desc: 'Diseño abierto: enchufás el cable mientras está colocado. USB-C, Lightning o inalámbrica, todo funciona.',
    highlight: false,
  },
];

export const REVIEWS = [
  {
    name: 'Martín G.',
    location: 'Buenos Aires',
    stars: 5,
    text: 'Lo uso hace 3 meses en mi Corolla y no se movió ni un milímetro. Probé tres soportes antes y todos terminaron en la guantera. Este es otra historia.',
    date: '12 Mar 2026',
    verified: true,
    image: '/Reviews/revw5.webp',
  },
  {
    name: 'Sofía R.',
    location: 'Córdoba',
    stars: 5,
    text: 'Llegó en 2 días con seguimiento. Lo instalé sin tocar nada del auto y aguanta mi iPhone 14 Pro como si nada. Súper recomendado.',
    date: '28 Feb 2026',
    verified: true,
    image: '/Reviews/revw6.webp',
  },
  {
    name: 'Diego P.',
    location: 'Mendoza',
    stars: 5,
    text: 'Ni en los pozos de la 7 se mueve. Lo paso del auto mío al de mi vieja en segundos, sin pegamento ni marcas. Buenísimo.',
    date: '21 Feb 2026',
    verified: true,
    image: '/Reviews/revw7.webp',
  },
  {
    name: 'Lucía M.',
    location: 'Rosario',
    stars: 5,
    text: 'La chapita magnética quedó perfecta y el soporte no se movió ni un centímetro desde que lo instalé. Lo tengo en el parabrisas hace más de un mes y aguanta todo: pozos, frenadas, calor. Diez puntos.',
    date: '10 Feb 2026',
    verified: true,
    image: '/Reviews/revv1-500x500.jpg',
  },
  {
    name: 'Federico A.',
    location: 'La Plata',
    stars: 5,
    text: 'Compra protegida con MP, llegó en 48hs y la calidad es muy superior a lo que esperaba. Vale cada peso. Ya le compré uno a mi hermano.',
    date: '02 Feb 2026',
    verified: true,
    image: '/Reviews/revv2-500x500.jpg',
  },
  {
    name: 'Valentina C.',
    location: 'Tucumán',
    stars: 5,
    text: 'Lo tengo pegado en el parabrisas hace dos meses y ni con el calor del verano se despegó. Mi celular siempre a la vista para el GPS. Lo recomiendo a todo el mundo.',
    date: '18 Ene 2026',
    verified: true,
    image: '/Reviews/clutchXrev2.jpg',
  },
  {
    name: 'Ramiro S.',
    location: 'Salta',
    stars: 5,
    text: 'Tengo un Xiaomi sin MagSafe y con el aro que viene incluido funciona perfectísimo. Se siente sólido, no tiene nada que ver con los soportes de pinza que usaba antes.',
    date: '09 Ene 2026',
    verified: true,
    image: '/Reviews/clutchXrev5.jpg',
  },
  {
    name: 'Carolina B.',
    location: 'Mar del Plata',
    stars: 5,
    text: 'Ruta Buenos Aires–MDP ida y vuelta y el celular quieto todo el viaje. El imán es una bestia. Además el empaque está muy cuidado, se nota que es un producto serio.',
    date: '27 Dic 2025',
    verified: true,
    image: '/Reviews/clutchXrev6.jpg',
  },
] as const;

export const FAQ = [
  {
    q: '¿De verdad sostiene el celular en pozos y caminos de ripio?',
    a: 'Sí. El N52 es el grado más alto de imán neodimio que se vende. Aguanta hasta 500g sin moverse — eso incluye un iPhone 15 Pro Max o un Samsung S24 Ultra con funda. Lo probaron miles de clientes en Argentina, en autos de calle y en rutas de tierra.',
  },
  {
    q: '¿No daña la pintura ni los plásticos del auto?',
    a: 'Para nada. La base es de vacío, no de pegamento. Se levanta limpia cuando vos quieras y no deja una sola marca. Lo podés cambiar de auto las veces que necesites.',
  },
  {
    q: '¿Funciona con celulares grandes o con funda gruesa?',
    a: 'Sí. El soporte es compatible con MagSafe: si tu iPhone tiene MagSafe nativo (como el iPhone 12 y posteriores), lo colocás directamente y queda fijo al instante. Si tu celular no cuenta con MagSafe, en el kit viene incluido un aro metálico adhesivo que pegás en el back de tu celu o de la funda, y a partir de ahí funciona igual. Recomendamos que la funda sea compatible con MagSafe para la mejor adherencia.',
  },
  {
    q: '¿El imán le borra datos al celular o le hace mal?',
    a: 'No. Los celulares modernos no usan memoria magnética — los iPhones, Samsungs, Motorolas y Xiaomis de los últimos 10 años son completamente inmunes. El imán no afecta la pantalla, la batería, el GPS ni la carga inalámbrica.',
  },
] as const;

export const TRUST_PILLARS = [
  {
    icon: 'mp',
    title: 'Compra protegida',
    desc: 'Pagás con MercadoPago. Si algo no sale como esperabas, MP te devuelve la plata.',
  },
  {
    icon: 'truck',
    title: 'Envío con seguimiento',
    desc: 'Gratis a todo el país. Te llega un código para seguirlo en tiempo real desde que sale.',
  },
  {
    icon: 'rotate-left',
    title: 'Devolución 30 días',
    desc: 'Si no te convence, lo devolvés sin preguntas en los primeros 30 días. Te devolvemos cada peso.',
  },
] as const;

/**
 * ─────────────────────────────────────────────────────────────────────────
 * BUNDLES — Cada bundle es un PRODUCTO independiente en Shopify (con su
 * propio precio, compareAtPrice y discount config).
 *
 *   Bundle x1 → productId 8264328118387
 *   Bundle x2 → productId 8270224392307
 *   Bundle x3 → productId 8270224425075
 *
 * En tiempo de render fetcheamos la primera variante de cada producto y
 * obtenemos su variantId + precios. Los `fallback*` solo se usan si la
 * Storefront API falla.
 *
 * `image` (foto de la card en #pricing) antes lo armaba `Pricing.tsx` por
 * índice; ahora vive con el dato.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: 'gid://shopify/Product/8264328118387',
    fallbackVariantId: 'gid://shopify/ProductVariant/44945337450611',
    label: 'LLEVÁ 1',
    subtitle: 'Un soporte. Mil usos.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ 1 chapita MagSafe',
    freeShipping: false,
    recommended: false,
    fallbackPrice: 39990,
    fallbackCompare: 60000,
    image: '/bundles/BundleX1.webp',
  },
  {
    id: 'double',
    productId: 'gid://shopify/Product/8270224392307',
    fallbackVariantId: 'gid://shopify/ProductVariant/44965343035507',
    label: 'LLEVÁ 2',
    subtitle: '50% OFF en la 2ª unidad.',
    quantity: 2,
    unitsLabel: '2 unidades · 2ª al 50%',
    badge: 'MÁS ELEGIDO',
    bonus: '+ 2 chapitas MagSafe',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 59985,
    fallbackCompare: 120000,
    image: '/bundles/BundleX2.webp',
  },
  {
    id: 'triple',
    productId: 'gid://shopify/Product/8270224425075',
    fallbackVariantId: 'gid://shopify/ProductVariant/44965343199347',
    label: 'LLEVÁ 3',
    subtitle: 'La 3ª unidad es GRATIS.',
    quantity: 3,
    unitsLabel: '3 unidades · 3ª GRATIS',
    badge: 'MEJOR PRECIO',
    bonus: '+ 3 chapitas MagSafe',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 74990,
    fallbackCompare: 180000,
    image: '/bundles/BundleX3.webp',
  },
];

/**
 * ─────────────────────────────────────────────────────────────────────────
 * UPSELL_CHAIN — la escalera completa del banner "Sumá una unidad más" del
 * carrito (lib/tiers.ts la recorre por posición, sin casos por id).
 *
 * A propósito NO es lo mismo que BUNDLES: BUNDLES son los 3 packs que se ven
 * como card en /#pricing (Llevá 1 / Llevá 2 / Llevá 3). Pack x4/x5/x6 existen
 * en Shopify pero NO están en ninguna colección ni en la landing — solo se
 * llega a ellos vía el upsell del carrito. Si agregáramos esos 3 directo a
 * BUNDLES, `Pricing.tsx` (que hace `BUNDLES.map(...)`) los mostraría como
 * card sin querer.
 *
 * Los primeros 3 niveles se derivan de BUNDLES (misma fuente, sin duplicar
 * datos); los 3 nuevos van fallbackVariantId/fallbackPrice, igual que los
 * anteriores. Verificados contra la tienda real, 2026-08-30.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const UPSELL_CHAIN: readonly UpsellTier[] = [
  ...BUNDLES.map((b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  })),
  {
    id: 'x4',
    productId: 'gid://shopify/Product/8379013693555',
    fallbackVariantId: 'gid://shopify/ProductVariant/45421351731315',
    quantity: 4,
    unitsLabel: '4 unidades',
    fallbackPrice: 89989,
  },
  {
    id: 'x5',
    productId: 'gid://shopify/Product/8379013595251',
    fallbackVariantId: 'gid://shopify/ProductVariant/45421351501939',
    quantity: 5,
    unitsLabel: '5 unidades',
    fallbackPrice: 99988,
  },
  {
    id: 'x6',
    productId: 'gid://shopify/Product/8379012939891',
    fallbackVariantId: 'gid://shopify/ProductVariant/45421349765235',
    quantity: 6,
    unitsLabel: '6 unidades',
    fallbackPrice: 109987,
  },
];

/**
 * Rating breakdown — barras de % por estrella para el header de Reviews.
 * Los totales acá deberían sumar BRAND.reviewsCount.
 */
export const RATING_BREAKDOWN = {
  average: 4.9,
  total: 412,
  stars: [
    { stars: 5, count: 372 },
    { stars: 4, count: 32 },
    { stars: 3, count: 5 },
    { stars: 2, count: 2 },
    { stars: 1, count: 1 },
  ],
} as const;

/**
 * Quality Guaranteed — 3 cards con badge circular grande estilo "sello".
 * Reemplaza el TrustBlock anterior con un layout más visual.
 */
export const QUALITY_BADGES = [
  {
    badge: '30',
    badgeSub: 'DÍAS',
    title: 'DEVOLUCIÓN 30 DÍAS',
    desc:
      'Si por cualquier motivo decidís que CARMANIA no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
  },
  {
    badge: '1',
    badgeSub: 'AÑO',
    title: 'GARANTÍA 1 AÑO',
    desc:
      'Si tu soporte CARMANIA no funciona como esperabas, te reparamos las piezas o te lo reemplazamos completo. Vos seguís manejando tranquilo.',
  },
  {
    badge: '★',
    badgeSub: 'USUARIOS',
    title: 'PROBADO POR CLIENTES REALES',
    desc:
      'Para crear el CARMANIA definitivo, cada decisión de diseño la validamos con clientes reales. El producto es lo que es gracias a ellos.',
  },
] as const;

/**
 * Certificaciones que mostramos abajo del bloque de garantía.
 * Si todavía no las tenés, dejá `enabled: false` y desaparece la fila.
 */
export const CERTIFICATIONS = {
  enabled: true,
  title: 'Certificado por',
  desc: 'Nuestra fábrica fue revisada y aprobada por las agencias relevantes — incluyendo la FDA y los estándares europeos RoHS y CE.',
  items: ['FDA', 'RoHS', 'CE'],
} as const;

/** Texto prellenado del botón de WhatsApp — copia literal de `WHATSAPP.prefilled`. */
export const WHATSAPP_PREFILLED =
  'Hola CARMANIA! Estuve navegando por su tienda y quería consultar sobre...';

/** Metadata de la landing — mismos valores que el `export const metadata` de `app/page.tsx`. */
export const METADATA = {
  title: 'Soporte Magnético PRO™ — CARMANIA',
  description:
    'El soporte para celular que no se cae. Imán N52 grado militar + base al vacío. Envío gratis y 30 días de devolución.',
  ogTitle: 'Soporte Magnético PRO™ — CARMANIA',
  ogDescription:
    'El soporte para celular que no se cae. Imán N52 + base al vacío. Envío gratis y devolución 30 días.',
  canonical: '/',
} as const;

/**
 * `satisfies` (no `: LandingConfig`) a propósito: así `config.ts` puede
 * re-exportar `SOPORTE.headlines` / `SOPORTE.carBrands` / etc. conservando el
 * tipo completo de cada const. Con la anotación estricta, el acceso por
 * propiedad angostaría a `LandingConfig` y perdería las keys sólo-soporte
 * (`HEADLINES.carCompat`, `.whatsInBox`, …) que todavía leen componentes
 * fuera de alcance (CarBrands, WhatsInBox, UseCases). `SOPORTE` sigue siendo
 * asignable a `LandingConfig` en todos los consumidores.
 */
export const SOPORTE = {
  brand: BRAND_SOPORTE,
  fallbackPricing: FALLBACK_PRICING,
  headlines: HEADLINES,
  heroMedia: HERO_MEDIA,
  heroSubHighlights: HERO_SUB_HIGHLIGHTS,
  sectionCopy: SECTION_COPY,
  carBrands: CAR_BRANDS,
  steps: STEPS_V2,
  benefits: BENEFITS,
  pitchBlocks: [],
  reviews: REVIEWS,
  ratingBreakdown: RATING_BREAKDOWN,
  faq: FAQ,
  qualityBadges: QUALITY_BADGES,
  certifications: CERTIFICATIONS,
  trustPillars: TRUST_PILLARS,
  bundles: BUNDLES,
  upsellChain: UPSELL_CHAIN,
  whatsappPrefilled: WHATSAPP_PREFILLED,
  metadata: METADATA,
} satisfies LandingConfig;
