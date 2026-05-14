/**
 * Brand + landing config.
 * 90 % de los textos editables del landing viven acá.
 * Tocando este archivo cambiás copy, precios fallback, urgencia, badges,
 * WhatsApp, sin meterte con los componentes.
 */

export const BRAND = {
  name: 'CARMANIA',
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
  price: 44990,
  compareAtPrice: 60000,
  currency: 'ARS',
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
  number: '5492612453172', // formato internacional sin + ni espacios
  display: '+54 9 261 245-3172',
  prefilled: 'Hola CARMANIA! Estuve navegando por su tienda y quería consultar sobre...',
} as const;

export const TRACKING = {
  metaPixelId: '877870938398833',
} as const;

export const HEADLINES = {
  // Hero — Bold italic UPPERCASE. La última frase resaltada en accent (rojo).
  heroLine1: 'El soporte definitivo',
  heroLine2: 'para tu celular',
  heroSub:
    'Se adhiere al auto, al espejo, al escritorio o a la pared. Compatible con MagSafe para GPS, llamadas y filmar contenido.',
  heroBadge: 'PROBADO EN RUTA', // Texto sobre la imagen del producto en el hero (editable)
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
 * Marcas de autos compatibles. Por ahora son nombres en texto.
 * Si querés mostrar logos reales, ponelos en /public/brands/<slug>.svg
 * y cambiá el `logo` con la ruta.
 */
export const CAR_BRANDS = [
  { name: 'Toyota',        logo: '/brands/toyota.svg',     softWhite: false },
  { name: 'Ford',          logo: '/brands/ford.svg',       softWhite: true  },
  { name: 'Chevrolet',     logo: '/brands/chevrolet.svg',  softWhite: false },
  { name: 'Volkswagen',    logo: '/brands/volkswagen.svg', softWhite: false },
  { name: 'Renault',       logo: '/brands/renault.svg',    softWhite: false },
  { name: 'Peugeot',       logo: '/brands/peugeot.svg',    softWhite: true  },
  { name: 'Fiat',          logo: '/brands/fiat.svg',       softWhite: false },
  { name: 'Honda',         logo: '/brands/honda.svg',      softWhite: false },
  { name: 'Nissan',        logo: '/brands/nissan.svg',     softWhite: false },
  { name: 'Mercedes-Benz', logo: '/brands/mercedes.svg',   softWhite: false },
  { name: 'BMW',           logo: '/brands/bmw.svg',        softWhite: true  },
  { name: 'Audi',          logo: '/brands/audi.svg',       softWhite: false },
];

/**
 * "Qué incluye la caja" — para el bloque WhatsInBox.
 */
export const WHATS_IN_BOX = [
  'Soporte Magnético PRO™',
  'Aro metálico magnético',
  'Adhesivo de alto rendimiento',
  'Kit de limpieza',
] as const;

/**
 * Pasos de "Cómo funciona" con imagen.
 * Las imágenes van en /public/steps/.
 */
export const STEPS_V2 = [
  {
    n: 1,
    title: 'Instalá la base',
    desc: 'Pegá la base de succión a cualquier superficie lisa — parabrisas, espejo, escritorio. Girá el anillo inferior para fijarla.',
    image: '/steps/01-instalar.jpg',
  },
  {
    n: 2,
    title: 'Ajustá el ángulo',
    desc: 'Usá las articulaciones para inclinar, rotar o girar el soporte. Lo orientás exactamente como te queda mejor para ver.',
    image: '/steps/02-ajustar.jpg',
  },
  {
    n: 3,
    title: 'Colocá el celular',
    desc: 'Acercá tu celular al MagSafe y queda fijo al instante. Sin MagSafe nativo, usás la chapita metálica que viene incluida.',
    image: '/steps/03-colocar.jpg',
  },
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
    desc: 'Pegás una de las 3 chapitas finitas en tu celular o atrás de la funda. Ni se nota. Cargá inalámbrico igual.',
  },
  {
    n: 3,
    title: 'Manejá tranquilo',
    desc: 'Acercás el celular y se queda imantado al instante. Lo girás 360°, lo despegás cuando quieras, y vuelve a su lugar de un toque.',
  },
] as const;

type Benefit = { icon: string; title: string; desc: string; highlight: boolean };

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
    text: 'Ni en los pozos de la 7 se mueve. Encima viene con 3 chapitas distintas, así que lo uso entre el auto mío y el de mi vieja. Buenísimo.',
    date: '21 Feb 2026',
    verified: true,
    image: '/Reviews/revw7.webp',
  },
  {
    name: 'Lucía M.',
    location: 'Rosario',
    stars: 4,
    text: 'Excelente producto. Una estrella menos solo porque la chapita más chica no me quedó bien centrada al primer intento, pero las otras dos andan perfecto.',
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
    a: 'Sí, funciona con todos los celulares hasta 500g, con o sin funda. En el kit vienen 3 chapitas magnéticas distintas (una redonda, una rectangular y una para colocar dentro de la funda) para que elijas la que mejor se adapta al tuyo.',
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
 * ─────────────────────────────────────────────────────────────────────────
 */
type Bundle = {
  id: 'single' | 'double' | 'triple';
  productId: string;      // GID del producto Shopify
  label: string;
  subtitle: string;
  quantity: number;       // solo display ("1 unidad", "2 unidades", etc.)
  unitsLabel: string;
  badge: string | null;
  bonus: string;
  freeShipping: boolean;
  recommended: boolean;
  fallbackPrice: number;   // ARS — usado si Shopify API no responde
  fallbackCompare: number; // ARS
};

export const BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: 'gid://shopify/Product/8264328118387',
    label: 'LLEVÁ 1',
    subtitle: 'Un soporte. Mil usos.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ 1 chapita MagSafe',
    freeShipping: false,
    recommended: false,
    fallbackPrice: 44990,
    fallbackCompare: 89990,
  },
  {
    id: 'double',
    productId: 'gid://shopify/Product/8270224392307',
    label: 'LLEVÁ 2',
    subtitle: '50% OFF en la 2ª unidad.',
    quantity: 2,
    unitsLabel: '2 unidades · 2ª al 50%',
    badge: 'MÁS ELEGIDO',
    bonus: '+ 2 chapitas MagSafe',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 67485,
    fallbackCompare: 179980,
  },
  {
    id: 'triple',
    productId: 'gid://shopify/Product/8270224425075',
    label: 'LLEVÁ 3',
    subtitle: 'La 3ª unidad es GRATIS.',
    quantity: 3,
    unitsLabel: '3 unidades · 3ª GRATIS',
    badge: 'MEJOR PRECIO',
    bonus: '+ 3 chapitas MagSafe',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 89980,
    fallbackCompare: 269970,
  },
];

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
