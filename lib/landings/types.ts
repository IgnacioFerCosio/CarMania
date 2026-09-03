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
  pitchBlocks: readonly PitchBlockData[];
  /** Comparador before/after. Opcional — el soporte no lo usa. */
  beforeAfter?: BeforeAfterData;
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
