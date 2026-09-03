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
  /** Tag de spec arriba de la foto ("MAGSAFE + REGULABLE"). */
  specTag: string;
  /** Tag corto de variante/color, abajo a la derecha ("NEGRO"). */
  variantTag: string;
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
    specTag: 'MAGSAFE + IMÁN N52',
    variantTag: 'NEGRO',
  },
  {
    // ⚠️ El producto todavía NO existe en Shopify con este handle:
    // `getProduct('parasol-pro')` devuelve null y la card cae al
    // `fallbackPrice`, que es el precio provisorio de PARASOL.fallbackPricing
    // (ver el bloque de TODOs en lib/landings/parasol.ts). Antes de mandar
    // tráfico a /tienda hay que crear el producto y confirmar el precio.
    handle: 'parasol-pro',
    title: 'Parasol PRO™',
    blurb:
      'Se abre como un paraguas y cubre todo el parabrisas en 3 segundos. Bloquea los UV y mantiene el interior fresco.',
    image: '/parasol/hero/parasol-hero.webp',
    href: '/parasol',
    fallbackPrice: 29990, // TODO PRECIO REAL — espejo de PARASOL.fallbackPricing.price
    specTag: 'APERTURA EN 3 SEGUNDOS',
    variantTag: 'UNIVERSAL',
  },
] as const;

/**
 * Slots vacíos de la grilla — completan las 4 columnas mientras el catálogo
 * tenga 2 productos. No son links: no hay a dónde ir todavía.
 * Cuando sumes un producto real, borrá un slot de acá y agregalo arriba.
 */
export const STORE_COMING_SOON = [
  { id: 'slot-3', specTag: 'EN CAMINO', variantTag: '2026' },
  { id: 'slot-4', specTag: 'EN CAMINO', variantTag: '2026' },
] as const;

/** Copy del encabezado de /tienda. */
export const STORE_HEADLINES = {
  eyebrow: 'Tienda oficial',
  title: 'Accesorios que resuelven',
  titleAccent: 'problemas reales',
  sub: 'Productos elegidos de a uno, probados en la calle argentina. Envío gratis a todo el país y 30 días para devolverlo si no te convence.',
  // Heading de la grilla — existe para que la página no salte de h1 (StoreHero)
  // a h3 (título de cada ProductCard) sin un h2 en el medio.
  // ProductGrid le concatena `STORE_SECTIONS.gridTitleAccent` en rojo, así que
  // acá va sólo la primera parte.
  gridTitle: 'Nuestros',
} as const;

/**
 * Mensajes de la barra de anuncios de /tienda. Rotan en un marquee, como los
 * 3 de CARMOUNT. `/` y `/parasol` siguen con el mensaje único de PROMO_BARS.
 */
export const STORE_PROMO_MESSAGES = [
  'Envío gratis a todo el país',
  '30 días para devolverlo',
  '3 cuotas sin interés con MercadoPago',
] as const;

/**
 * Franja de 4 garantías, justo debajo del hero. Cada item se parte en dos
 * líneas: `top` grande en blanco, `bottom` chico en accent.
 */
export const STORE_TRUST_STRIP = [
  { icon: 'truck', top: 'Envío', bottom: 'Gratis' },
  { icon: 'rotate-left', top: '30 días', bottom: 'Devolución' },
  { icon: 'lock', top: 'Pago', bottom: 'Seguro' },
  { icon: 'whatsapp', top: 'Soporte', bottom: 'Real' },
] as const;

/**
 * Tiles de "Para cada lugar" — el carrusel horizontal debajo de la grilla.
 * Reusa las fotos lifestyle del soporte que ya viven en /public/use-cases.
 * `href` manda a la landing del producto que resuelve ese caso.
 */
export const STORE_ACTIVITIES = [
  { label: 'AUTO', image: '/use-cases/auto.jpg', href: '/' },
  { label: 'VIAJES', image: '/use-cases/viajes.jpg', href: '/' },
  { label: 'CASA', image: '/use-cases/cocina.jpg', href: '/' },
  { label: 'GYM', image: '/use-cases/gym.jpg', href: '/' },
  { label: 'TRABAJO', image: '/use-cases/trabajo.jpg', href: '/' },
  { label: 'ESPEJO', image: '/use-cases/espejo.jpg', href: '/' },
  { label: 'VERANO', image: '/parasol/use-cases/calor.webp', href: '/parasol' },
  { label: 'TABLERO', image: '/parasol/use-cases/tablero.webp', href: '/parasol' },
] as const;

/**
 * Reseñas de la tienda — formato CARMOUNT: un título corto en mayúsculas que
 * resume la reseña, después la cita y la firma.
 *
 * Son las reseñas REALES del soporte (SOPORTE.reviews), con el título
 * agregado acá. Si sumás reseñas de otro producto, aclaralo en `product`.
 */
export const STORE_REVIEWS = [
  {
    title: 'NO SE MUEVE NI EN RIPIO',
    text: 'Anduve por camino de ripio en Bariloche y el celular ni se movió. Los otros soportes que tuve se caían en el primer pozo.',
    name: 'Diego',
    location: 'NEUQUÉN',
  },
  {
    title: 'CERO MARCAS EN EL TABLERO',
    text: 'Lo que más me gustó es que lo saco y lo vuelvo a poner sin que quede pegote ni marca. En el auto de laburo eso me importaba.',
    name: 'Lucía',
    location: 'ROSARIO',
  },
  {
    title: 'PARECE DE FÁBRICA',
    text: 'Queda tan prolijo que un amigo me preguntó si venía con el auto. Es chiquito y no tapa nada del tablero.',
    name: 'Martín',
    location: 'CÓRDOBA',
  },
  {
    title: 'UNO EN CADA AUTO',
    text: 'Compré el pack de tres. Uno en la camioneta, uno en el auto de mi mujer y uno en el escritorio. Ya no busco dónde apoyar el celular.',
    name: 'Sebastián',
    location: 'MENDOZA',
  },
  {
    title: 'EL IMÁN ES OTRA COSA',
    text: 'Pensé que con la funda no iba a agarrar y agarra igual. Lo despegás de un tirón pero no se cae solo, es raro lo bien que está calibrado.',
    name: 'Carolina',
    location: 'LA PLATA',
  },
  {
    title: 'LLEGÓ ANTES DE LO QUE PENSABA',
    text: 'Lo pedí un martes y el jueves lo tenía. Vino bien embalado y con el aro de repuesto. Nada que reprochar.',
    name: 'Federico',
    location: 'SALTA',
  },
] as const;

/** Copy de las secciones nuevas de /tienda. */
export const STORE_SECTIONS = {
  heroTitle: 'REINVENTÁ',
  heroTitleAccent: 'TU AUTO',
  heroSub: 'Los accesorios que tu auto necesitaba, elegidos de a uno.',
  heroCta: 'Ver los productos',
  gridEyebrow: 'El catálogo completo',
  gridTitleAccent: 'productos',
  // CARMOUNT cierra la grilla con "SHOP ALL PRODUCTS" → /shop. Nosotros no
  // tenemos una segunda página de catálogo (esta ES el catálogo), así que el
  // botón manda al más vendido, que es un destino real.
  gridCtaLabel: 'Ver el más vendido',
  gridCtaHref: '/',
  activityTitle: 'Comprá por',
  activityTitleAccent: 'momento',
  reviewsEyebrow: 'Miles de conductores en toda la Argentina 🇦🇷',
  reviewsTitle: 'No nos creas a nosotros.',
} as const;

/**
 * ─────────────────────────────────────────────────────────────────────────
 * INSTAGRAM — grilla curada, NO un feed en vivo.
 *
 * Por qué estática y no la API:
 *  - La CSP de `_headers` no habilita Instagram en `connect-src` ni ningún
 *    proveedor de widgets en `script-src`, así que un feed client-side no
 *    carga. Abrirla en la página que cobra no vale la pena.
 *  - La Basic Display API de Instagram se apagó en dic. 2024. El reemplazo
 *    pide cuenta profesional + app de Meta + token de 60 días, y este repo
 *    no tiene dónde guardar un secreto: las 4 env vars son `NEXT_PUBLIC_*`.
 *  - Sin ISR en Cloudflare Pages el feed quedaría congelado hasta el deploy
 *    igual, y las URLs de cdninstagram.com van firmadas y expiran.
 *
 * Si algún día se automatiza: un script pre-build que DESCARGUE las fotos a
 * `/public/instagram/` y reescriba este array. El componente no cambia.
 *
 * PARA ACTUALIZAR: subí la foto a /public/instagram/ y poné el permalink del
 * post en `href`. Los slots sin archivo muestran el placeholder con el
 * glifo de Instagram, así que la grilla nunca se rompe.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const INSTAGRAM = {
  handle: '@carmania.ar',
  url: 'https://www.instagram.com/carmania.ar/',
  // Línea de arriba de la grilla. Con `count` cargado se arma
  // "Sumate a los 12K que nos siguen en @handle"; con `count` en '' cae a
  // `leadPlain`. Dejalo vacío hasta tener el número real de seguidores.
  count: '', // TODO: seguidores reales, si querés publicarlos
  leadBefore: 'Sumate a los',
  leadAfter: 'que nos siguen en',
  leadPlain: 'Seguinos en',
  /**
   * Los archivos salen de las fotos del perfil, recortadas a 600x600 con el
   * smart-crop de sharp y pasadas a webp. Van de la más nueva a la más vieja.
   *
   * `href` vacío = el tile manda al perfil. Si querés que cada foto abra su
   * post, pegá acá el permalink (`https://www.instagram.com/p/XXXX/`).
   */
  posts: [
    {
      image: '/instagram/01.webp',
      alt: 'Soporte con el celular pegado al vidrio de la ventanilla del auto',
      href: '',
    },
    {
      image: '/instagram/02.webp',
      alt: 'Celular montado en el soporte en la mesa de un café en la vereda',
      href: '',
    },
    {
      image: '/instagram/03.webp',
      alt: 'Ala del avión sobre la cordillera',
      href: '',
    },
    {
      image: '/instagram/04.webp',
      alt: 'Colocando el celular con el GPS en el soporte, adentro del auto',
      href: '',
    },
    {
      image: '/instagram/05.webp',
      alt: 'Entrenando en el gimnasio con el celular montado filmando',
      href: '',
    },
    {
      image: '/instagram/06.webp',
      alt: 'Celular sujetado al espejo del baño para maquillarse',
      href: '',
    },
    {
      image: '/instagram/07.webp',
      alt: 'Manejando una Jeep con el celular montado mostrando el GPS',
      href: '',
    },
    {
      image: '/instagram/08.webp',
      alt: 'Soporte adherido a la ventanilla del avión con el celular puesto',
      href: '',
    },
    {
      image: '/instagram/09.webp',
      alt: 'Acercando el celular al soporte pegado al parabrisas',
      href: '',
    },
    {
      image: '/instagram/10.webp',
      alt: 'Honda Civic estacionado bajo un árbol',
      href: '',
    },
    {
      image: '/instagram/11.webp',
      alt: 'Elongando al lado de una camioneta blanca frente al río',
      href: '',
    },
    {
      image: '/instagram/12.webp',
      alt: 'Apoyado en una Jeep Compass en un parque',
      href: '',
    },
  ],
} as const;

/**
 * Banda de números, debajo de las reseñas.
 *
 * ⚠️ PLACEHOLDERS — no hay fuente para estos números todavía. Antes de
 * publicar: sacar los reales del panel de Shopify (clientes y unidades) o
 * bajar el claim a algo verificable. Publicar cifras infladas es riesgo de
 * ley de defensa del consumidor.
 */
export const STORE_STATS = [
  // TODO: dato real del panel de Shopify (clientes únicos).
  { value: '—', suffix: '+', label: 'Clientes felices' },
  // TODO: dato real del panel de Shopify (unidades vendidas).
  { value: '—', suffix: '+', label: 'Productos vendidos' },
  // 23 provincias + CABA. Sin "+": es el total, no un piso.
  { value: '24', suffix: '', label: 'Provincias con envío' },
] as const;
