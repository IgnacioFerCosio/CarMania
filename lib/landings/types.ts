/**
 * Tipos de la config por landing.
 *
 * Cada producto con landing propia exporta un `LandingConfig` desde
 * `lib/landings/<producto>.ts`. Los componentes reciben ese objeto por prop.
 *
 * REGLA: los archivos de `lib/landings/` NO pueden importar de `lib/config.ts`.
 * La dependencia es unidireccional (`config.ts` → `landings/*.ts`); al revés
 * se cierra un ciclo, porque `STORE_PRODUCTS` (en config.ts) usa
 * `FALLBACK_PRICING` (acá).
 */
import type { IconName } from '@/components/ui/Icon';

/** Todos los ids válidos de la escalera de tiers, de single a x6. */
export type TierId = 'single' | 'double' | 'triple' | 'x4' | 'x5' | 'x6';

export type Bundle = {
  id: 'single' | 'double' | 'triple';
  /** GID del producto Shopify. `''` = todavía no existe en Shopify. */
  productId: string;
  /** GID de la variante; fallback si `getBundlesData` falla. `''` = no existe. */
  fallbackVariantId: string;
  label: string;
  subtitle: string;
  quantity: number;
  unitsLabel: string;
  badge: string | null;
  bonus: string;
  freeShipping: boolean;
  recommended: boolean;
  fallbackPrice: number;
  fallbackCompare: number;
  /** Foto de la card en #pricing. Antes se calculaba por índice en Pricing. */
  image: string;
};

export type UpsellTier = {
  id: TierId;
  productId: string;
  fallbackVariantId: string;
  quantity: number;
  unitsLabel: string;
  fallbackPrice: number;
};

/**
 * Venta cruzada del carrito: con cualquier nivel de un producto en el
 * carrito, se ofrece el x1 del otro con el descuento del combo (ver la regla
 * en `CROSS_SELLS`).
 *
 * El descuento NO lo aplica este código: es un descuento automático
 * "Comprá X, llevá Y" cargado en Shopify, que lo aplica en el carrito y lo
 * vuelve a validar en el checkout (si sacan el producto que lo habilita, se
 * cae solo). `discountAmount` es sólo el espejo para anunciar el precio antes
 * de agregarlo: si cambiás el descuento en Shopify, cambialo acá también.
 */
export type CrossSell = {
  /** La escalera que habilita la oferta (cualquier nivel cuenta). */
  triggers: readonly UpsellTier[];
  /**
   * La escalera del producto ofrecido. Se ofrece `offers[0]` (el x1), y sólo
   * si NINGÚN nivel de esta escalera está ya en el carrito.
   */
  offers: readonly UpsellTier[];
  /** Pesos que descuenta Shopify. Igual en todas: ver `CROSS_SELLS`. */
  discountAmount: number;
  name: string;
  pitch: string;
  image: string;
};

export type Review = {
  name: string;
  location: string;
  stars: number;
  text: string;
  date: string;
  verified: boolean;
  image?: string;
};

export type Benefit = {
  icon: string;
  title: string;
  desc: string;
  highlight: boolean;
};

export type Step = {
  n: number;
  title: string;
  desc: string;
  /** Video del paso. Antes vivía hardcodeado en HowItWorks.tsx. */
  video: string;
  image?: string;
};

export type PitchBlockData = {
  eyebrow?: string;
  headline: string;
  /** Subcadena de `headline` que se pinta en accent. */
  accentWord: string;
  body: string;
};

/**
 * Sección "qué incluye" (componente WhatsInBox): carrusel a la izquierda,
 * copy + lista de la caja + CTA + una reseña a la derecha.
 */
export type WhatsInBoxData = {
  /** La última palabra se pinta en accent. */
  headline: string;
  /** Arranque del párrafo, en negrita itálica accent. */
  lead: string;
  /** Sigue pegado a `lead`: arrancá con coma o espacio. */
  body: string;
  /** Línea chica debajo del párrafo. */
  note: string;
  items: readonly string[];
  gallery: readonly { src: string; alt: string }[];
  testimonial: Review;
};

/** Comparador before/after con divisor deslizable (componente BeforeAfter). */
export type BeforeAfterData = {
  headline: string;
  /** Subcadena de `headline` que se pinta en accent. */
  accentWord: string;
  body: string;
  beforeSrc: string;
  beforeAlt: string;
  beforeLabel: string;
  afterSrc: string;
  afterAlt: string;
  afterLabel: string;
};

export type HeroMedia = {
  /** 'video' → <video src poster>; 'image' → <Image src> (sin poster). */
  kind: 'video' | 'image';
  /** URL del video o de la imagen, según `kind`. */
  src: string;
  /** Poster del video (primer frame). Sólo aplica a `kind: 'video'`. */
  poster?: string;
  /** Dimensiones intrínsecas del media, para reservar el espacio. */
  width: number;
  height: number;
  badgeLine1: string;
  badgeLine2: string;
};

export type UseCase = {
  label: string;
  image: string;
  /** alt de la foto — cada landing lo redacta a su producto. */
  alt: string;
};

export type SectionCopy = {
  pricingTitle: string;
  pricingTitleAccent: string;
  reviewsTitle: string;
  reviewsTitleAccent: string;
  reviewsFooter: string;
  faqEyebrow: string;
  faqTitle: string;
  carBrandsTitle: string;
  carBrandsTitleAccent: string;
  /** Título del grid de casos de uso; la última palabra va en accent. */
  useCasesTitle: string;
  /** Prefijo de cada label del grid ('Para' en el soporte, '' en el parasol). */
  useCasesPrefix: string;
};

export type CarBrand = {
  name: string;
  logo: string;
  softWhite: boolean;
  w: number;
  h: number;
};

export type LandingConfig = {
  brand: {
    tagline: string;
    productHandle: string;
    socialProofCount: string;
    socialProofLabel: string;
    averageRating: number;
    reviewsCount: number;
  };
  fallbackPricing: { price: number; compareAtPrice: number; currency: string };
  headlines: {
    heroLine1: string;
    heroLine2: string;
    heroSub: string;
    /** Sólo soporte: los consume `PainPoint`, que está fuera de alcance. */
    pain?: string;
    painSub?: string;
    finalCta: string;
    howItWorksLabel: string;
    howItWorksTitle: string;
    benefitsEyebrow: string;
    benefitsTitle: string;
    benefitsSub: string;
  };
  heroMedia: HeroMedia;
  /** Términos de `heroSub` que se pintan en accent. */
  heroSubHighlights: string[];
  sectionCopy: SectionCopy;
  /** Grid "dónde/para qué" (componente UseCases). */
  useCases: readonly UseCase[];
  carBrands: CarBrand[];
  steps: readonly Step[];
  benefits: readonly Benefit[];
  /**
   * Imagen del producto para el componente `BenefitsShowcase` (cards flotando
   * alrededor). Opcional — con esto la landing usa `BenefitsShowcase`, sin
   * esto usa el grid plano de `Benefits`.
   */
  benefitsImage?: { src: string; alt: string };
  pitchBlocks: readonly PitchBlockData[];
  /** Comparador before/after. Opcional — el soporte no lo usa. */
  beforeAfter?: BeforeAfterData;
  /**
   * Sección "qué incluye". Opcional — la del soporte todavía lee sus
   * constantes de `lib/config.ts` (ver WhatsInBox.tsx).
   */
  whatsInBox?: WhatsInBoxData;
  reviews: readonly Review[];
  ratingBreakdown: {
    average: number;
    total: number;
    stars: readonly { stars: number; count: number }[];
  };
  faq: readonly { q: string; a: string }[];
  qualityBadges: readonly {
    badge: string;
    badgeSub: string;
    title: string;
    desc: string;
  }[];
  certifications: {
    enabled: boolean;
    title: string;
    desc: string;
    items: readonly string[];
  };
  trustPillars: readonly { icon: string; title: string; desc: string }[];
  bundles: readonly Bundle[];
  upsellChain: readonly UpsellTier[];
  /** Texto prellenado del botón de WhatsApp. */
  whatsappPrefilled: string;
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    canonical: string;
  };
};

/**
 * Un lugar de la página donde va una foto, un "GIF" o un video. Mientras el
 * archivo no exista (`pending: true`), `MediaSlot` dibuja una caja que dice
 * qué va ahí; cuando lo subís con ese nombre y pasás `pending` a false,
 * aparece solo.
 *
 * `check:assets` lee los slots con `pending: true` directo de la config y no
 * los marca como faltantes. Uno con `pending: false` sin archivo, sí. Para
 * que el script los encuentre, cada slot va como objeto literal sin llaves
 * adentro.
 */
export type MediaSlot = {
  /** ID corto para hablar del asset: 'RV-01', 'RV-02'… */
  id: string;
  /** Los "GIF" se entregan como MP4 cortos, nunca como .gif. */
  kind: 'image' | 'video' | 'gif';
  /** Ruta final en /public, aunque el archivo todavía no exista. */
  src: string;
  /** Poster para videos (primer frame). */
  poster?: string;
  /** Proporción para reservar el espacio. */
  aspect: '1:1' | '4:5' | '9:16' | '16:9' | '3:2';
  alt: string;
  /** Qué tiene que mostrar, en una frase. Se ve en el placeholder. */
  brief: string;
  /** Formato y especificación técnica. Se ve en el placeholder. */
  spec: string;
  /** true = el archivo todavía no existe → se muestra el placeholder. */
  pending: boolean;
  /**
   * Video con sonido (el del bombero): va con controles y sin autoplay,
   * porque un autoplay con audio el navegador lo bloquea.
   */
  withAudio?: boolean;
};

/**
 * Landing tipo advertorial (`/rompevidrios`): una nota larga que cuenta una
 * historia, demuestra que funciona y recién al final vende. Reusa Pricing,
 * FAQ y Reviews, así que es un `LandingConfig` completo más este bloque con
 * el copy y los slots de cada sección. Los campos de `LandingConfig` que la
 * página no renderiza (useCases, steps, benefits…) van vacíos.
 */
export type AdvertorialData = {
  /** Texto de la barra de arriba. */
  promoBar: string;
  /** El botón que se repite en la página: siempre baja a los packs. */
  cta: { label: string; href: string };
  hero: {
    /** "[cifra] conductores ya lo llevan": se oculta si `brand.socialProofCount` está vacío. */
    socialProofSuffix: string;
    title: string;
    sub: string;
    bullets: readonly string[];
    /** Línea chica debajo del botón. */
    note: string;
    media: MediaSlot;
  };
  story: {
    title: string;
    paragraphs: readonly string[];
    /** Después de cuántos párrafos va la media. */
    mediaAfter: number;
    media: MediaSlot;
    /** Cierre del bloque, en negrita. */
    closing: string;
  };
  myth: { title: string; paragraphs: readonly string[]; media: MediaSlot };
  proof: { title: string; body: string; media: MediaSlot; secondary: MediaSlot };
  steps: {
    title: string;
    items: readonly { n: number; title: string; desc: string; media: MediaSlot }[];
    exploded: { title: string; media: MediaSlot };
  };
  comparison: {
    title: string;
    /** La primera columna es la nuestra. */
    columns: readonly string[];
    /** true = ✓, false = ✗, string = texto tal cual ("depende del auto"). */
    rows: readonly { label: string; values: readonly (boolean | string)[] }[];
    media: MediaSlot;
  };
  expert: { title: string; caption: string; media: MediaSlot };
  box: { title: string; items: readonly string[]; media: MediaSlot };
  reviews: { title: string; placeholder: string };
  packs: { sub: string; footnote: string; images: Record<Bundle['id'], MediaSlot> };
  guarantee: { title: string; body: string };
  closing: {
    title: string;
    columns: readonly { tone: 'without' | 'with'; text: string }[];
    media: MediaSlot;
  };
};

export type AdvertorialConfig = LandingConfig & { advertorial: AdvertorialData };

/**
 * Guía de instalación post-compra (`/<producto>/instalacion`), la página a la
 * que lleva el QR de la caja. La arma `InstallGuide` con un objeto de estos
 * por producto, en `lib/landings/instalacion/<producto>.ts`.
 *
 * No es una página de venta: no hay precios, ni countdown, ni Shopify en el
 * build. Va con más imagen y video que texto; `ring` es opcional (el parasol
 * no tiene aro, por ejemplo).
 */
export type InstallImage = {
  src: string;
  /** Las imágenes traen texto adentro: el alt lo repite entero. */
  alt: string;
  width: number;
  height: number;
};

export type InstallGuideConfig = {
  metadata: { title: string; description: string };
  eyebrow: string;
  title: string;
  /** Subcadena de `title` que se pinta en accent. */
  titleAccent: string;
  /**
   * El video completo de la instalación, de punta a punta. El único que carga
   * sin esperar al scroll. Cuadrado, en /public.
   */
  video: { src: string; poster: string };
  box: {
    title: string;
    items: readonly { qty: string; name: string; note?: string }[];
  };
  steps: {
    title: string;
    image: InstallImage;
    /**
     * Una línea corta por paso. Repite lo que dice la imagen porque a 375 px
     * el texto de la imagen queda de ~8 px.
     */
    items: readonly string[];
  };
  /** El aro metálico adhesivo, para celulares o fundas sin MagSafe. */
  ring?: {
    title: string;
    lead: string;
    image: InstallImage;
    /** La regla que no se puede pasar por alto (dónde va el aro). */
    rule: { title: string; desc: string };
    stepsImage: InstallImage;
    steps: readonly string[];
    notes: readonly { icon: IconName; text: string }[];
  };
  troubleshooting: {
    title: string;
    /** Cada respuesta es una lista corta: un ítem por cosa para probar. */
    items: readonly { q: string; a: readonly string[] }[];
  };
  help: {
    title: string;
    whatsappLabel: string;
    whatsappPrefilled: string;
    instagramLead: string;
  };
  /** Botón de cierre, a la tienda. Nada de venta cruzada puntual. */
  outro: { label: string; href: string };
};
