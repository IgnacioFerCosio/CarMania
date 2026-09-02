/**
 * Config global de marca + de `/tienda`, y re-export de compat de la data del
 * soporte.
 *
 * La data product-específica de la landing `/` (copy, precios fallback,
 * bundles, reviews, FAQ, marcas…) se mudó a `lib/landings/soporte.ts`. Acá
 * quedan los símbolos globales (marca, envío, pagos, WhatsApp, tracking, promo
 * bars) y los de `/tienda`, más un bloque de re-export que mantiene andando
 * los ~32 imports que todavía leen estos nombres desde `@/lib/config`.
 */
import {
  SOPORTE,
  FALLBACK_PRICING,
  HEADLINES,
  CAR_BRANDS,
  STEPS_V2,
  BENEFITS,
  REVIEWS,
  RATING_BREAKDOWN,
  FAQ,
  QUALITY_BADGES,
  CERTIFICATIONS,
  TRUST_PILLARS,
  BUNDLES,
  UPSELL_CHAIN,
} from './landings/soporte';

// ─────────────────────────────────────────────────────────────────────────
// Re-export de compatibilidad. Los componentes migran de a poco a leer la
// config por prop; mientras tanto estos nombres mantienen andando los imports
// que todavía no se tocaron. NO agregues símbolos nuevos acá: lo que es de un
// producto va en `lib/landings/<producto>.ts`.
// ─────────────────────────────────────────────────────────────────────────
export type { TierId } from './landings/types';
export {
  FALLBACK_PRICING,
  HEADLINES,
  CAR_BRANDS,
  STEPS_V2,
  BENEFITS,
  REVIEWS,
  RATING_BREAKDOWN,
  FAQ,
  QUALITY_BADGES,
  CERTIFICATIONS,
  TRUST_PILLARS,
  BUNDLES,
  UPSELL_CHAIN,
};

/**
 * `name` es global de marca; el resto sale de la config del soporte. Así lo
 * consumen `Navbar`, `Hero`, `Pricing`, `Reviews` y `CartProvider` hoy.
 */
export const BRAND = {
  name: 'CARMANIA',
  ...SOPORTE.brand,
} as const;

export const URGENCY = {
  countdownHours: 24,
  stockLabel: 'STOCK BAJO',
} as const;

export const SHIPPING = {
  freeNationwide: true,
  message: 'Envío gratis a todo el país',
} as const;

export const PAYMENTS = {
  installments: 3,
  installmentsLabel: 'cuotas sin interés',
  provider: 'MercadoPago',
} as const;

export const RETURNS = {
  days: 30,
  label: 'Devolución 30 días sin preguntas',
} as const;

export const WHATSAPP = {
  number: '5492612460642', // formato internacional sin + ni espacios
  display: '+54 9 261 245-3172',
  prefilled: 'Hola CARMANIA! Estuve navegando por su tienda y quería consultar sobre...',
} as const;

export const TRACKING = {
  metaPixelId: '877870938398833',
} as const;

/**
 * Banner superior tipo "promo strip".
 * Lo dejamos en config para que lo puedas apagar/cambiar sin tocar el componente.
 */
export const PROMO_BARS = {
  top: {
    enabled: true,
    text: 'Envío gratis a todo el país · 3 cuotas sin interés',
  },
  sub: {
    enabled: true,
    text: '« OFERTA POR TIEMPO LIMITADO »',
  },
} as const;

/**
 * Medios donde apareció la marca (logo strip "Como se vio en").
 * Si todavía no tenés menciones reales, dejá ENABLED en false.
 * Cuando tengas logos, agregálos en /public/media/ y cambialos acá.
 */
export const MEDIA_FEATURED = {
  enabled: false,
  items: [
    { name: 'Clarín', logo: '/media/clarin.svg' },
    { name: 'La Nación', logo: '/media/lanacion.svg' },
    { name: 'Infobae', logo: '/media/infobae.svg' },
    { name: 'TikTok', logo: '/media/tiktok.svg' },
    { name: 'Instagram', logo: '/media/instagram.svg' },
  ],
} as const;

/**
 * Grid de "Un soporte, todos los lugares" — 6 cards con imagen de fondo
 * + label de categoría. Las imágenes las cargás en /public/use-cases/.
 * Si la imagen no existe, se muestra un placeholder con gradiente.
 */
export const USE_CASES = [
  { label: 'AUTO', image: '/use-cases/auto.jpg' },
  { label: 'VIAJES', image: '/use-cases/viajes.jpg' },
  { label: 'TRABAJO', image: '/use-cases/trabajo.jpg' },
  { label: 'GYM', image: '/use-cases/gym.jpg' },
  { label: 'ESPEJO', image: '/use-cases/espejo.jpg' },
  { label: 'COCINA', image: '/use-cases/cocina.jpg' },
] as const;

/**
 * Superficies compatibles — strip horizontal de 6 fotos lifestyle
 * mostrando dónde se adhiere el soporte. Sección "Un soporte, cualquier
 * superficie" que va debajo de Pricing.
 */
export const SURFACES = [
  { label: 'VIDRIO', image: '/surfaces/glass.jpg' },
  { label: 'CUERO', image: '/surfaces/leather.jpg' },
  { label: 'METAL', image: '/surfaces/metal.jpg' },
  { label: 'PLÁSTICO', image: '/surfaces/Plastic.jpg' },
  { label: 'MADERA', image: '/surfaces/wood.jpg' },
  { label: 'PIEDRA', image: '/surfaces/Stone2.jpg' },
] as const;

/**
 * Carrusel de la sección WhatsInBox. Todas las imágenes viven en
 * /public/what-includes/ y conviene que sean cuadradas (o casi): el carrusel
 * usa un contenedor 1:1 con `object-contain`, así ninguna infografía queda
 * con el texto cortado.
 *
 * Para sumar o sacar slides, editá este array — el componente se adapta solo.
 */
export const WHATS_IN_BOX_GALLERY = [
  {
    src: '/what-includes/QueIncluye.webp',
    alt: 'Contenido de la caja del Soporte Magnético PRO™',
  },
  {
    src: '/what-includes/CompatibilidadUniversal.webp',
    alt: 'Cómo instalar el anillo magnético si tu teléfono no tiene MagSafe, en 3 pasos',
  },
  {
    src: '/what-includes/FuncionaConTodos.webp',
    alt: 'Compatible con iPhone 12 y posteriores, y con Android usando el anillo metálico incluido',
  },
  {
    src: '/what-includes/guiaInstalacion.webp',
    alt: 'Guía de instalación del soporte con succión en el tablero o el parabrisas, en 4 pasos',
  },
] as const;

/**
 * "Qué incluye la caja" — para el bloque WhatsInBox.
 */
export const WHATS_IN_BOX = [
  'Soporte Magnético PRO™',
  'Aro metálico magnético',
  'Adhesivo de alto rendimiento',
  'Kit de limpieza',
] as const;

export const PAIN_POINTS = {
  before: [
    'Soportes que se sueltan en cada pozo',
    'Pegamentos que dejan marcas en el torpedo',
    'Brazos articulados que vibran y caen',
  ],
  after: [
    'Vacío industrial que se queda firme en cualquier superficie',
    'Lo levantás cuando quieras: cero residuos, cero marcas',
    'Imán N52 grado militar que no se mueve ni en ripio',
  ],
} as const;

export const HOW_IT_WORKS = [
  {
    n: 1,
    title: 'Pegás la base al vacío',
    desc: 'Apoyala en cualquier superficie lisa del torpedo y bajás la palanca. Listo en 3 segundos. Sin pegamento, sin marcas, sin tornillos.',
  },
  {
    n: 2,
    title: 'Acoplás la chapita magnética',
    desc: 'Pegás la chapita finita que viene incluida en tu celular o atrás de la funda. Ni se nota. Cargá inalámbrico igual.',
  },
  {
    n: 3,
    title: 'Manejá tranquilo',
    desc: 'Acercás el celular y se queda imantado al instante. Lo girás 360°, lo despegás cuando quieras, y vuelve a su lugar de un toque.',
  },
] as const;

/**
 * Specs técnicas del producto — sección "Nano-tech".
 * Las medidas las usamos visualmente alrededor del producto.
 */
export const TECH_SPECS = {
  eyebrow: 'PENSADO PARA AGARRAR EN CUALQUIER LUGAR',
  title: 'NANO-TECH QUE FUNCIONA',
  titleAccent: 'FUNCIONA',
  description:
    'Una base de succión al vacío con nano-tecnología que crea miles de micro-sellos para sujetarse a casi cualquier superficie. Al fin, podés concentrarte en manejar en lugar de pelearte con dónde poner el celular.',
  // Las dimensiones se muestran como callouts alrededor de la foto del producto.
  dimensions: [
    { label: 'Aro MagSafe', value: 'Compatible' },
    { label: 'Altura', value: '113 mm', sub: '4.44 in' },
    { label: 'Diámetro base', value: '60 mm', sub: '2.36 in' },
    { label: 'Altura base', value: '40 mm', sub: '1.57 in' },
  ],
} as const;

/**
 * ─────────────────────────────────────────────────────────────────────────
 * STORE_PRODUCTS — la grilla de /tienda.
 *
 * Lista CURADA a propósito: pedirle "todos los productos" a Shopify traería
 * el soporte tres veces, porque los packs x2 y x3 son productos separados y
 * no variantes (ver CLAUDE.md). Acá va un item por producto DISTINTO.
 *
 * `href` es a dónde linkea la card: el soporte manda a `/`, que es su
 * landing y la URL de las campañas. Cada producto nuevo manda a la suya.
 * ─────────────────────────────────────────────────────────────────────────
 */
export type StoreProduct = {
  handle: string;        // handle en Shopify — sirve para leer el precio vivo
  title: string;
  blurb: string;
  image: string;         // ruta en /public
  href: string;
  fallbackPrice: number; // ARS, si la Storefront API no responde
};

export const STORE_PRODUCTS: readonly StoreProduct[] = [
  {
    handle: 'soporte-magnetico-pro',
    title: 'Soporte Magnético PRO™',
    blurb:
      'Imán N52 grado militar y base al vacío. Se adhiere al auto, al espejo o al escritorio, y no se cae.',
    image: '/bundles/BundleX1.webp',
    href: '/',
    // Referencia a FALLBACK_PRICING en vez de repetir el número: ya había dos
    // copias de este precio (acá y en BUNDLES); una tercera copia suelta es
    // justo el tipo de desfase que el commit "sincronizar fallbacks con
    // Shopify" vino a limpiar.
    fallbackPrice: FALLBACK_PRICING.price,
  },
] as const;

/** Copy del encabezado de /tienda. */
export const STORE_HEADLINES = {
  eyebrow: 'Tienda oficial',
  title: 'Accesorios que resuelven',
  titleAccent: 'problemas reales',
  sub: 'Productos elegidos de a uno, probados en la calle argentina. Envío gratis a todo el país y 30 días para devolverlo si no te convence.',
  // Heading de la grilla — existe para que la página no salte de h1 (StoreHero)
  // a h3 (título de cada ProductCard) sin un h2 en el medio.
  gridTitle: 'Nuestros productos',
} as const;
