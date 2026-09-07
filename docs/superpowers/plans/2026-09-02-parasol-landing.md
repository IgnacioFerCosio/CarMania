# Landing /parasol — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar una segunda landing de conversión en `/parasol` (producto Parasol PRO™) que reutiliza los componentes de la landing del soporte, sin cambiar el output de `/` ni de `/tienda`.

**Architecture:** Los ~32 componentes leen hoy datos product-específicos de `lib/config.ts` (módulo global de un solo producto). Se extrae ese contenido a `lib/landings/soporte.ts` y `lib/landings/parasol.ts`, ambos tipados con `LandingConfig`. Cada componente que la landing nueva necesita gana una prop `config` **opcional cuyo default es la config de soporte** — así el render de `/` queda byte-idéntico y los diffs sobre componentes vivos son aditivos.

**Tech Stack:** Next.js 14 (App Router), TypeScript 5.5, Tailwind 3.4, Shopify Storefront API. Sin framework de tests en el repo.

**Spec:** `docs/superpowers/specs/2026-09-02-parasol-landing-design.md`

---

## Global Constraints

- **El proyecto no tiene test framework.** No agregues uno — está fuera de alcance. El ciclo de verificación de cada tarea es: `npx tsc --noEmit` + `npm run build` + **diff de HTML prerenderizado contra el baseline** (ver "Gate de regresión" abajo) + verificación en browser cuando la tarea toca render.
- **`/` y `/tienda` no pueden cambiar su output.** Toda prop `config` nueva lleva `= SOPORTE` como default. El diff de HTML es el gate que lo prueba.
- **`lib/landings/*.ts` NUNCA importa de `lib/config.ts`.** La dependencia es unidireccional `config.ts → landings/*.ts`. Motivo: `STORE_PRODUCTS` (queda en `config.ts`) usa `FALLBACK_PRICING`, que se muda a `soporte.ts`.
- **Placeholders de Shopify en `''` (string vacío), nunca un GID falso.** `BuyButton` usa `const unavailable = !variantId`; un GID falso es truthy y habilita el botón contra un producto inexistente.
- **Videos en `/public`.** La CSP de `_headers` tiene `media-src 'self'` — un `<video>` apuntando a un CDN externo no carga en producción.
- **No pushear.** Ignacio ordena el push (cada push = redeploy de producción). Commitear es libre.
- **Branch:** `feat/parasol-landing` (ya creada, con el spec commiteado).
- **Idioma del copy:** español rioplatense (voseo), igual que la landing del soporte.
- **Mensajes de commit:** terminan con la línea `Co-Authored-By:` que te indique el controller en el dispatch (cambia por modelo). Si no te la pasa: `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.

### Gate de regresión (se usa en todas las tareas 1-8)

El controller ya capturó el baseline del HTML prerenderizado de `/` y `/tienda` (Task 0), en `.superpowers/sdd/baseline/{index,tienda}.html`, y dejó el script del gate en `.superpowers/sdd/gate.sh`.

**Comando único del gate** (corré esto donde el plan diga "gate de regresión"):

```bash
npx tsc --noEmit && npm run build && bash .superpowers/sdd/gate.sh
```

Imprime `OK index` / `OK tienda` si esas dos páginas no cambiaron, o `DIFF <página>` con la línea de `diff` para inspeccionar. El script ya normaliza lo no determinista (hashes de `/_next/static/`, `buildId`, hash de la clase de fuente).

Para **re-capturar** el baseline (solo cuando el plan lo diga explícitamente, p. ej. Task 4):

```bash
bash .superpowers/sdd/gate.sh capture
```

**Caveat:** `.env.local` existe, así que el build pega a Shopify en vivo. Si el `DIFF` muestra **solo** diferencias de precio en las cards de pricing, es Shopify moviéndose, no tu cambio — re-capturá el baseline y seguí. Cualquier otra diferencia es una regresión real.

---

## File Structure

**Crear:**
- `lib/landings/types.ts` — tipos `LandingConfig`, `Bundle`, `UpsellTier`, `Review`, `Benefit`, `Step`, `PitchBlockData`, `HeroMedia`, `SectionCopy`, `TierId`
- `lib/landings/soporte.ts` — la data product-específica actual, movida sin cambiar un solo valor
- `lib/landings/parasol.ts` — contenido del doc del parasol, con placeholders
- `components/sections/PitchBlock.tsx` — headline con palabra accent + párrafo
- `app/parasol/page.tsx` — la página nueva
- `docs/superpowers/specs/parasol-assets.md` — checklist de media y de pre-publicación

**Modificar:**
- `lib/config.ts` — se queda con lo global de marca + re-export de `soporte` (compat)
- `lib/tiers.ts` — `buildTiers` recibe la chain por parámetro
- `components/commerce/CartProvider.tsx` — props `upsellChain?`, `productName?`
- `components/sections/Hero.tsx` — prop `config?`, usa `heroMedia` y `heroSubHighlights`
- `components/sections/Pricing.tsx` — prop `config?`, imagen por bundle
- `components/sections/{HowItWorks,Benefits,Reviews,FAQ,CarBrands,TrustBlock,BackToPricingCTA}.tsx` — prop `config?`
- `components/overlays/WhatsAppFloat.tsx` — prop de texto
- `app/page.tsx` — pasa la unión de chains
- `app/tienda/page.tsx` — pasa la unión de chains
- `app/sitemap.ts` — entrada `/parasol`

**Explícitamente FUERA de alcance (YAGNI):** `UseCases`, `Surfaces`, `TechSpecs`, `WhatsInBox`, `PainPoint`, `FinalCTA`, `StickyATC`, `GuaranteeBadge`, `SubPromoBar`, `HeroTestimonialCarousel`, `ProductGrid`, `StoreHero`, `ProductCard`. La landing del parasol no los monta y el re-export de `config.ts` los mantiene funcionando sin tocarlos.

---

## Task 0: Capturar el baseline de regresión — HECHA POR EL CONTROLLER

Ya está. El controller:

1. Verificó árbol limpio en `feat/parasol-landing`.
2. Buildeó (`✓ Compiled successfully`; `/` = 5.14 kB / 119 kB First Load, `/tienda` = 209 B / 112 kB).
3. Escribió `.superpowers/sdd/gate.sh` (normaliza `/_next/static/` hashes, `buildId`, y el hash de la clase de fuente) y capturó el baseline en `.superpowers/sdd/baseline/{index,tienda}.html` (2207 líneas normalizadas).
4. Verificó que el gate es determinista: dos rebuilds consecutivos del código sin cambios dan `OK index` / `OK tienda`.

Los implementers de las tareas 1-8 corren el gate con `npx tsc --noEmit && npm run build && bash .superpowers/sdd/gate.sh`.

---

## Task 1: Extraer `lib/landings/` (types + soporte) y adelgazar `config.ts`

Mudanza mecánica de datos. Cero cambios de componente, cero cambios de valor.

**Files:**
- Create: `lib/landings/types.ts`
- Create: `lib/landings/soporte.ts`
- Modify: `lib/config.ts`

**Interfaces:**
- Produces: `LandingConfig` y los tipos auxiliares desde `@/lib/landings/types`; `SOPORTE: LandingConfig` desde `@/lib/landings/soporte`. `lib/config.ts` re-exporta todos los símbolos product-específicos que hoy exporta, con los mismos nombres y valores, para que los ~32 imports existentes sigan compilando sin tocarse.

- [ ] **Step 1: Crear `lib/landings/types.ts`**

```ts
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

export type HeroMedia = {
  videoSrc: string;
  poster: string;
  /** Dimensiones intrínsecas del video, para reservar el espacio. */
  width: number;
  height: number;
  badgeLine1: string;
  badgeLine2: string;
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
  carBrands: CarBrand[];
  steps: readonly Step[];
  benefits: readonly Benefit[];
  pitchBlocks: readonly PitchBlockData[];
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
```

- [ ] **Step 2: Crear `lib/landings/soporte.ts`**

Mové desde `lib/config.ts`, **sin cambiar ningún valor**: `BRAND` (menos `name`), `FALLBACK_PRICING`, `HEADLINES`, `CAR_BRANDS`, `STEPS_V2`, `BENEFITS`, `REVIEWS`, `RATING_BREAKDOWN`, `FAQ`, `QUALITY_BADGES`, `CERTIFICATIONS`, `TRUST_PILLARS`, `BUNDLES`, `UPSELL_CHAIN`.

Campos nuevos a completar con los valores que hoy están hardcodeados en los componentes:

- `heroMedia`: `{ videoSrc: '/hero/VideoPrincipal.mp4', poster: '/hero/VideoPrincipal-poster.webp', width: 720, height: 1280, badgeLine1: 'NO SE', badgeLine2: 'CAE MÁS' }` (de `Hero.tsx:143-168`)
- `heroSubHighlights`: `['MagSafe', 'GPS']` (de `Hero.tsx:43`)
- `steps[].video`: `'/how-to-use/InstalaLaBase.mp4'`, `'/how-to-use/ajustaAngulo.mp4'`, `'/how-to-use/colocaTuCelu.mp4'` (de `HowItWorks.tsx:12-16`), en ese orden
- `bundles[].image`: `'/bundles/BundleX1.webp'`, `'/bundles/BundleX2.webp'`, `'/bundles/BundleX3.webp'` (de `Pricing.tsx:253`, que hoy lo arma por índice)
- `headlines.benefitsEyebrow`: `'Por qué CARMANIA'`, `benefitsTitle`: `'Pensado para autos argentinos'`, `benefitsSub`: `'Probado en pozos, ripio, autopista y calor. Cada detalle está calibrado para que no te falle nunca.'` (de `Benefits.tsx:15-23`)
- `sectionCopy`: `{ pricingTitle: 'Probá tu CARMANIA', pricingTitleAccent: '30 días gratis', reviewsTitle: 'Reseñas de', reviewsTitleAccent: 'clientes', reviewsFooter: 'clientes que ya manejan tranquilos con CARMANIA.', faqEyebrow: 'Dudas frecuentes', faqTitle: 'Respondemos lo que más nos preguntan', carBrandsTitle: 'Compatible con', carBrandsTitleAccent: 'cualquier auto' }`
  - Los valores salen de `Pricing.tsx:42`, `Reviews.tsx:38-39`, `Reviews.tsx:113-116`, `FAQ.tsx:18-23`, `HEADLINES.carCompat`. **Verificá cada string contra el archivo**: el gate de HTML diff falla si cambia una coma.
- `whatsappPrefilled`: el valor actual de `WHATSAPP.prefilled`
- `metadata`: los valores actuales de `app/page.tsx:46-62`

Terminá el archivo con el objeto agregador:

```ts
export const SOPORTE: LandingConfig = {
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
};
```

`pitchBlocks: []` — la landing del soporte no usa `PitchBlock` (los bloques §4/§8 son del parasol). Ver la nota de YAGNI en File Structure.

- [ ] **Step 3: Adelgazar `lib/config.ts`**

Borrá de `config.ts` todo lo que se mudó y agregá los re-exports. `BRAND` se recompone acá para conservar `name` (global) junto a los campos del soporte, que es la forma en que lo consumen `Navbar`, `Hero`, `Pricing`, `Reviews` y `CartProvider` hoy.

```ts
import { SOPORTE } from './landings/soporte';

// Re-export de compatibilidad. Los componentes migran de a poco a leer la
// config por prop; mientras tanto estos nombres mantienen andando los imports
// que todavía no se tocaron. NO agregues símbolos nuevos acá: lo que es de un
// producto va en `lib/landings/<producto>.ts`.
export type { TierId } from './landings/types';
export const FALLBACK_PRICING = SOPORTE.fallbackPricing;
export const HEADLINES = SOPORTE.headlines;
export const CAR_BRANDS = SOPORTE.carBrands;
export const STEPS_V2 = SOPORTE.steps;
export const BENEFITS = SOPORTE.benefits;
export const REVIEWS = SOPORTE.reviews;
export const RATING_BREAKDOWN = SOPORTE.ratingBreakdown;
export const FAQ = SOPORTE.faq;
export const QUALITY_BADGES = SOPORTE.qualityBadges;
export const CERTIFICATIONS = SOPORTE.certifications;
export const TRUST_PILLARS = SOPORTE.trustPillars;
export const BUNDLES = SOPORTE.bundles;
export const UPSELL_CHAIN = SOPORTE.upsellChain;

export const BRAND = {
  name: 'CARMANIA',
  ...SOPORTE.brand,
} as const;
```

Quedan **sin tocar** en `config.ts` (son globales de marca o de `/tienda`): `URGENCY`, `SHIPPING`, `PAYMENTS`, `RETURNS`, `WHATSAPP`, `TRACKING`, `PROMO_BARS`, `MEDIA_FEATURED`, `USE_CASES`, `SURFACES`, `WHATS_IN_BOX`, `WHATS_IN_BOX_GALLERY`, `PAIN_POINTS`, `HOW_IT_WORKS`, `TECH_SPECS`, `STORE_PRODUCTS`, `STORE_HEADLINES`, `StoreProduct`.

> `USE_CASES`, `SURFACES`, `WHATS_IN_BOX*`, `PAIN_POINTS`, `HOW_IT_WORKS` y `TECH_SPECS` son del soporte, pero sus componentes están fuera de alcance (ver File Structure), así que se quedan en `config.ts` sin mudarse. Mudarlos sería trabajo sin consumidor.

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit
```

Expected: sin salida (0 errores). Si aparece `Type 'readonly [...]' is not assignable to 'Bundle[]'`, el campo del tipo tiene que ser `readonly` — ya lo son en `LandingConfig`; revisá que no hayas escrito `Bundle[]` en vez de `readonly Bundle[]`.

- [ ] **Step 5: Gate de regresión**

```bash
npx tsc --noEmit && npm run build && bash .superpowers/sdd/gate.sh
```

Expected: `OK index`, `OK tienda`.

Si difiere: `diff "$BASE/baseline/index.html" /tmp/index.now.html | head -40`. Casi siempre es un string copiado con un carácter distinto al mudarlo. Corregilo — **no re-captures el baseline para tapar el diff.**

- [ ] **Step 6: Commit**

```bash
git add lib/landings/types.ts lib/landings/soporte.ts lib/config.ts
git commit -m "refactor(config): extraer la data del soporte a lib/landings/

Primer paso para soportar mas de una landing. `lib/config.ts` queda con lo
global de marca y re-exporta los simbolos product-especificos desde
`landings/soporte.ts`, asi los ~32 imports existentes siguen compilando sin
tocarse. Los valores no cambian: el HTML prerenderizado de / y /tienda es
identico al del commit anterior.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: Parametrizar el carrito

**Files:**
- Modify: `lib/tiers.ts`
- Modify: `components/commerce/CartProvider.tsx`

**Interfaces:**
- Consumes: `UpsellTier`, `TierId` de `@/lib/landings/types`; `SOPORTE` de `@/lib/landings/soporte` (Task 1).
- Produces: `buildTiers(bundlesData, livePrices?, chain?)` con `chain: readonly UpsellTier[] = SOPORTE.upsellChain`. `<CartProvider bundlesData upsellChain? productName?>` — `upsellChain: readonly UpsellTier[] = SOPORTE.upsellChain`, `productName: string = SOPORTE.brand.tagline`.

- [ ] **Step 1: `lib/tiers.ts` — chain por parámetro**

Reemplazá el import y la firma de `buildTiers`. El resto del archivo (`tierOf`, `nextTierOf`, `upsellDelta`, `upsellExtraUnits`) **no se toca**: opera sobre el array ya resuelto.

```ts
import { SOPORTE } from './landings/soporte';
import type { TierId, UpsellTier } from './landings/types';
import type { BundleData, VariantPrice } from './shopify';

export type { TierId };

// ... ResolvedTier sin cambios ...

/**
 * Arma la escalera ordenada recorriendo `chain` en el orden en que está
 * declarada — no hay ningún salto ni caso especial por id acá.
 *
 * `chain` defaultea a la del soporte para no romper a los llamadores viejos.
 * Las páginas pasan la UNIÓN de las chains de todas las landings, porque el
 * carrito persiste entre páginas: sin eso, una línea del otro producto cae en
 * `tierOf() → null` y pierde su banner de upsell.
 */
export function buildTiers(
  bundlesData: Record<string, BundleData>,
  livePrices?: Record<string, VariantPrice>,
  chain: readonly UpsellTier[] = SOPORTE.upsellChain,
): ResolvedTier[] {
  const tiers: ResolvedTier[] = [];

  for (const t of chain) {
    const data = bundlesData[t.productId];
    const variantId = data?.variantId || t.fallbackVariantId;
    if (!variantId) continue;

    const live = livePrices?.[variantId];
    tiers.push({
      id: t.id,
      unitsLabel: t.unitsLabel,
      units: t.quantity,
      variantId,
      price: live?.price ?? data?.price ?? t.fallbackPrice,
    });
  }

  return tiers;
}
```

> El `if (!variantId) continue;` ya existía y es justo lo que hace que los bundles del parasol con `productId: ''` / `fallbackVariantId: ''` no entren en la escalera. No lo saques.

- [ ] **Step 2: `CartProvider` — props nuevas**

Firma:

```tsx
export function CartProvider({
  bundlesData,
  upsellChain = SOPORTE.upsellChain,
  productName = SOPORTE.brand.tagline,
  children,
}: {
  bundlesData: Record<string, BundleData>;
  upsellChain?: readonly UpsellTier[];
  productName?: string;
  children: React.ReactNode;
}) {
```

Imports: sacá `import { BRAND } from '@/lib/config';`, agregá `import { SOPORTE } from '@/lib/landings/soporte';` y `import type { UpsellTier } from '@/lib/landings/types';`.

`useMemo` de tiers:

```tsx
const tiers = useMemo(
  () => buildTiers(bundlesData, livePrices, upsellChain),
  [bundlesData, livePrices, upsellChain],
);
```

Y reemplazá los tres usos de `BRAND.tagline` por `productName`: en `addTier` (`content_name: added?.productTitle ?? productName`), en `upgradeLine` (`content_name: swapped?.productTitle ?? productName`) y en `checkout` (`content_name: productName`).

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

Expected: sin salida.

- [ ] **Step 4: Gate de regresión**

```bash
npx tsc --noEmit && npm run build && bash .superpowers/sdd/gate.sh
```

Expected: `OK index`, `OK tienda`.

- [ ] **Step 5: Smoke test del carrito en el browser**

`CartProvider` es client-side, así que el HTML prerenderizado no prueba que el carrito siga andando. Verificá a mano:

1. `preview_start` con `{name: "carmania-dev"}`
2. Navegá a `/`, scrolleá a `#pricing`
3. Click en "Lo quiero — oferta" (card x2) → el drawer abre con la línea cargada
4. Confirmá que aparece el banner **"Sumá una unidad más"** debajo de la línea
5. Click en el banner → la línea salta a 3 unidades
6. `read_console_messages` con `onlyErrors: true`

Expected: el upsell funciona en los dos pasos y la consola no tiene errores.

- [ ] **Step 6: Commit**

```bash
git add lib/tiers.ts components/commerce/CartProvider.tsx
git commit -m "refactor(cart): recibir la upsell chain por parametro

buildTiers() y CartProvider aceptan la chain (y el nombre de producto del
tracking) por parametro, con default en la del soporte. Habilita que una
segunda landing use su propia escalera de bundles sin tocar la logica de
tiers, que sigue siendo puramente posicional.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Parametrizar `Hero`

Es el componente con más hardcode: el badge ignora `HEADLINES.heroBadge` y las keywords del resaltado están en el JSX.

**Files:**
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `LandingConfig` de `@/lib/landings/types`, `SOPORTE` de `@/lib/landings/soporte`.
- Produces: `<Hero config? />` con `config: LandingConfig = SOPORTE`.

- [ ] **Step 1: Firma y threading**

```tsx
import { BRAND } from '@/lib/config';
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { HeroTestimonialCarousel } from '@/components/ui/HeroTestimonialCarousel';

export function Hero({ config = SOPORTE }: { config?: LandingConfig } = {}) {
  const { headlines, heroMedia, heroSubHighlights, brand } = config;
```

`BRAND` se sigue importando solo si quedara algún uso de `BRAND.name`; el social proof pasa a `brand.socialProofCount` / `brand.socialProofLabel` (vienen de `config`). Si `BRAND` queda sin usar, sacá el import.

- [ ] **Step 2: Headline y subtítulo con highlights parametrizados**

El `split` hoy es `/(MagSafe|GPS)/` fijo. Construilo desde `heroSubHighlights`, escapando los términos por si alguno trae un carácter de regex:

```tsx
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, terms: string[]) {
  if (terms.length === 0) return [text];
  const re = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'g');
  return text.split(re);
}
```

En el JSX:

```tsx
<h1 className="heading-display text-center text-[26px] leading-[1.05] sm:text-3xl sm:leading-[0.95] md:text-5xl lg:text-6xl">
  {headlines.heroLine1}{' '}
  <span className="text-accent">{headlines.heroLine2}</span>
</h1>
```

```tsx
<p className="max-w-xl text-[15px] leading-relaxed text-ink-200 sm:text-base md:text-lg">
  {highlight(headlines.heroSub, [...heroSubHighlights]).map((chunk, i) =>
    heroSubHighlights.includes(chunk) ? (
      <span key={i} className="font-bold italic text-accent">
        {chunk}
      </span>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  )}
</p>
```

> Con `heroSubHighlights: ['MagSafe', 'GPS']` esto produce exactamente los mismos nodos que el `split(/(MagSafe|GPS)/)` de hoy — el gate de HTML lo confirma.

- [ ] **Step 3: `HeroMedia` desde config**

`HeroMedia` pasa a recibir el objeto. Fijate que el badge **hoy está hardcodeado** (`NO SE` / `CAE MÁS`) e ignora la config — esto lo arregla.

```tsx
function HeroMedia({ media }: { media: LandingConfig['heroMedia'] }) {
  return (
    <div
      id="hero-media"
      className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-950 ring-1 ring-inset ring-white/5 md:aspect-auto md:h-full"
    >
      <video
        src={media.videoSrc}
        poster={media.poster}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        preload="metadata"
        width={media.width}
        height={media.height}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
      />

      <div className="absolute bottom-4 right-4 max-w-[60%] text-right sm:bottom-5 sm:right-5">
        <span className="font-display text-2xl font-black italic uppercase leading-none text-white drop-shadow-lg sm:text-3xl md:text-5xl">
          {media.badgeLine1}
          <br />
          {media.badgeLine2}
        </span>
      </div>
    </div>
  );
}
```

Y en el llamador: `<HeroMedia media={heroMedia} />`.

`PAYMENT_LOGOS` se queda hardcodeado en el archivo — son los medios de pago de la marca, iguales para toda landing.

- [ ] **Step 4: Type check + gate de regresión**

```bash
npx tsc --noEmit && npm run build && bash .superpowers/sdd/gate.sh
```

Expected: `OK index`, `OK tienda`. Un diff acá casi seguro es el `highlight()` produciendo nodos distintos — comparalo con `diff ... | head -20`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "refactor(hero): recibir la config por prop

El badge sobre el video estaba hardcodeado ('NO SE / CAE MAS') e ignoraba
HEADLINES.heroBadge; ahora sale de config.heroMedia. Las keywords del
resaltado del subtitulo, que estaban fijas en el JSX como /(MagSafe|GPS)/,
pasan a config.heroSubHighlights.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: Parametrizar `Pricing`

**Files:**
- Modify: `components/sections/Pricing.tsx`

**Interfaces:**
- Consumes: `LandingConfig`, `SOPORTE`, `BundleData` de `@/lib/shopify`.
- Produces: `<Pricing productId bundlesData config? />` con `config: LandingConfig = SOPORTE`.

- [ ] **Step 1: Firma**

```tsx
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';
import { PAYMENTS, RETURNS } from '@/lib/config';

type Props = {
  productId: string;
  bundlesData: Record<string, BundleData>;
  config?: LandingConfig;
};

export function Pricing({ productId, bundlesData, config = SOPORTE }: Props) {
  const { brand, bundles, sectionCopy } = config;
```

`PAYMENTS` y `RETURNS` siguen viniendo de `config.ts` — son globales de marca.

- [ ] **Step 2: Header con `sectionCopy`**

```tsx
<span className="text-sm font-semibold text-accent">
  {brand.averageRating}/5 · {brand.socialProofCount} {brand.socialProofLabel}
</span>
```

```tsx
<h2 className="heading-display mt-3 text-2xl leading-tight sm:mt-4 sm:text-3xl md:text-5xl lg:text-6xl">
  {sectionCopy.pricingTitle}{' '}
  <span className="text-accent">{sectionCopy.pricingTitleAccent}</span>
</h2>
```

> Chequeá el espaciado: hoy el JSX es `Probá tu CARMANIA <span>30 días gratis</span>`. Con `pricingTitle: 'Probá tu CARMANIA'` y el `{' '}` explícito, el HTML sale igual.

- [ ] **Step 3: `BUNDLES.map` → `bundles.map`, e imagen por bundle**

Cambiá el `.map` para iterar `bundles`. En el cuerpo, la imagen deja de calcularse por índice:

```tsx
<BundleImage src={b.image} alt={b.label} accent={b.recommended} />
```

Y el helper:

```tsx
function BundleImage({
  src,
  alt,
  accent,
}: {
  src: string;
  alt: string;
  accent: boolean;
}) {
  return (
    <div
      className={`relative my-5 aspect-square w-full overflow-hidden rounded-2xl bg-ink-950 ${accent ? 'ring-1 ring-inset ring-accent/30' : 'ring-1 ring-inset ring-ink-800'
        }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 33vw, 100vw"
      />
    </div>
  );
}
```

> **Ojo:** el `alt` de hoy es `` `Bundle opción ${index}` ``. Cambiarlo a `b.label` mejora la accesibilidad pero **hace fallar el gate de HTML**. Es un cambio deliberado y deseable. Cuando el `DIFF` aparezca, confirmá que las **únicas** líneas distintas son los tres `alt`, y re-capturá el baseline.

El parámetro `idx` del `.map` queda sin uso — sacalo de la firma para que no falle el lint.

- [ ] **Step 4: Type check + build**

```bash
npx tsc --noEmit && npm run build
```

Expected: compila sin errores.

- [ ] **Step 5: Verificar el diff acotado y re-capturar el baseline**

```bash
bash .superpowers/sdd/gate.sh
diff .superpowers/sdd/baseline/index.html /tmp/gate-index.html
```

Expected: el gate marca `DIFF index`, y el `diff` muestra **solo** diferencias en los `alt` de las 3 imágenes de bundle (`Bundle opción 1|2|3` → `LLEVÁ 1|2|3`). `tienda` debe seguir en `OK`. **Si aparece cualquier otra cosa, es una regresión — arreglala antes de seguir.**

Con el diff confirmado como intencional, re-capturá el baseline (queda alineado para las tareas 5-8):

```bash
bash .superpowers/sdd/gate.sh capture && bash .superpowers/sdd/gate.sh
```

Expected: `OK index` / `OK tienda` tras re-capturar.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Pricing.tsx
git commit -m "refactor(pricing): recibir la config por prop

Los bundles, el copy del header y la foto de cada card salen de la config.
La imagen dejaba de calcularse por indice (/bundles/BundleX{i}.webp) y pasa
a ser un campo del bundle, para que otra landing apunte a las suyas. De paso
el alt deja de ser 'Bundle opcion N' y usa el label de la card.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: Parametrizar las secciones de contenido

Threading mecánico de la prop en los 7 componentes restantes que la landing del parasol monta.

**Files:**
- Modify: `components/sections/HowItWorks.tsx`
- Modify: `components/sections/Benefits.tsx`
- Modify: `components/sections/Reviews.tsx`
- Modify: `components/sections/FAQ.tsx`
- Modify: `components/sections/CarBrands.tsx`
- Modify: `components/sections/TrustBlock.tsx`
- Modify: `components/sections/BackToPricingCTA.tsx`
- Modify: `components/overlays/WhatsAppFloat.tsx`

**Interfaces:**
- Consumes: `LandingConfig`, `SOPORTE`.
- Produces: cada uno acepta `config?: LandingConfig = SOPORTE`. `WhatsAppFloat` acepta además `prefilled?: string` (default: `WHATSAPP.prefilled`).

- [ ] **Step 1: Leer los 8 archivos antes de tocarlos**

Varios tienen copy en el JSX que no está en `config.ts`. Necesitás los strings exactos para pasarlos a `sectionCopy` sin cambiar un carácter.

- [ ] **Step 2: Aplicar el patrón a cada archivo**

El patrón es idéntico en los 8:

```tsx
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';

export function Componente({ config = SOPORTE }: { config?: LandingConfig } = {}) {
  const { /* lo que use */ } = config;
```

Sustituciones por archivo:

- **`HowItWorks`** — `HEADLINES` → `config.headlines` (`howItWorksLabel`, `howItWorksTitle`); `STEPS_V2` → `config.steps`. **Borrá la constante `STEP_VIDEOS`** del archivo y usá `s.video` en el `LazyVideo` (`<LazyVideo src={s.video} ... />`). El `.map` ya no necesita el índice `i`.
- **`Benefits`** — `BENEFITS` → `config.benefits`; el eyebrow, el h2 y el párrafo pasan a `config.headlines.benefitsEyebrow` / `benefitsTitle` / `benefitsSub`.
- **`Reviews`** — `REVIEWS` → `config.reviews`; `RATING_BREAKDOWN` → `config.ratingBreakdown`; `BRAND.socialProofCount` → `config.brand.socialProofCount`; el h2 → `sectionCopy.reviewsTitle` + `reviewsTitleAccent`; el párrafo de cierre → `sectionCopy.reviewsFooter`. El `'image' in r` deja de hacer falta: `Review.image` ya es opcional en el tipo, así que pasá `image={r.image}` directo.
- **`FAQ`** — `FAQ as ITEMS` → `config.faq`; el eyebrow y el h2 → `sectionCopy.faqEyebrow` / `faqTitle`. Es `'use client'`: la prop entra igual, pero la página que lo monta es Server Component y le pasa un objeto serializable — OK.
- **`CarBrands`** — `CAR_BRANDS` → `config.carBrands`; el título → `sectionCopy.carBrandsTitle` + `carBrandsTitleAccent`.
- **`TrustBlock`** — `QUALITY_BADGES` → `config.qualityBadges`; `CERTIFICATIONS` → `config.certifications`; `TRUST_PILLARS` → `config.trustPillars` (si los usa; verificá al leerlo).
- **`BackToPricingCTA`** — `HEADLINES.finalCta` → `config.headlines.finalCta`.
- **`WhatsAppFloat`** — agregá `prefilled?: string` con default `WHATSAPP.prefilled`; el resto de `WHATSAPP` (número, display) queda global.

- [ ] **Step 3: Type check + build**

```bash
npx tsc --noEmit && npm run build
```

Expected: compila sin errores.

- [ ] **Step 4: Gate de regresión**

```bash
npx tsc --noEmit && npm run build && bash .superpowers/sdd/gate.sh
```

Expected: `OK index`, `OK tienda`.

Este es el gate más valioso del plan: 8 archivos con copy copiado a mano. Cualquier tilde o coma perdida aparece acá. Si difiere, `diff "$BASE/baseline/index.html" /tmp/index.now.html` te dice exactamente qué string quedó mal.

- [ ] **Step 5: Commit**

```bash
git add components/sections/HowItWorks.tsx components/sections/Benefits.tsx \
        components/sections/Reviews.tsx components/sections/FAQ.tsx \
        components/sections/CarBrands.tsx components/sections/TrustBlock.tsx \
        components/sections/BackToPricingCTA.tsx components/overlays/WhatsAppFloat.tsx
git commit -m "refactor(sections): recibir la config por prop

Las 7 secciones que monta la landing nueva mas el boton de WhatsApp aceptan
config con default en soporte. El copy que estaba suelto en el JSX (titulos
de Reviews, FAQ, CarBrands y el bloque de Benefits) pasa a sectionCopy, y los
videos de HowItWorks dejan de vivir en una constante del componente para ser
un campo de cada paso.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: Crear `PitchBlock`

Componente nuevo para los bloques §4 ("UN HORNO") y §8 ("CARTÓN") del doc, que no matchean nada existente.

**Files:**
- Create: `components/sections/PitchBlock.tsx`

**Interfaces:**
- Consumes: `PitchBlockData` de `@/lib/landings/types`, `Icon` de `@/components/ui/Icon`.
- Produces: `<PitchBlock data={PitchBlockData} />`.

- [ ] **Step 1: Escribir el componente**

Sigue el lenguaje visual de `PainPoint` (eyebrow en accent, h2 display, párrafo centrado) sin las dos columnas de bullets.

```tsx
/**
 * PITCH BLOCK — headline grande + párrafo de empatía, centrado.
 *
 * Bloque de argumentación pura: un dolor o una comparación contra la
 * alternativa mala, sin listas ni imagen. La palabra `accentWord` se pinta en
 * rojo dentro del headline.
 *
 * Se usa en la landing del parasol para "TU AUTO YA NO ES UN HORNO" y
 * "DEJÁ DE PELEAR CON EL PARASOL DE CARTÓN".
 */
import type { PitchBlockData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';

export function PitchBlock({ data }: { data: PitchBlockData }) {
  const { eyebrow, headline, accentWord, body } = data;

  // Cortamos el headline en la palabra resaltada para colorear sólo esa parte
  // — mismo criterio que TechSpecs con `titleAccent`.
  const i = headline.indexOf(accentWord);
  const before = i >= 0 ? headline.slice(0, i) : headline;
  const after = i >= 0 ? headline.slice(i + accentWord.length) : '';

  return (
    <section className="bg-ink-950 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent sm:text-xs">
            <Icon name="alert" className="h-4 w-4" />
            {eyebrow}
          </span>
        )}

        <h2 className="heading-display mt-3 text-2xl leading-tight sm:text-3xl md:text-5xl">
          {before}
          {i >= 0 && <span className="text-accent">{accentWord}</span>}
          {after}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300 sm:mt-5 sm:text-base md:text-lg">
          {body}
        </p>
      </div>
    </section>
  );
}
```

> `indexOf` en vez de `split`: si `accentWord` apareciera dos veces, `split` rompería el texto en tres pedazos y duplicaría el resaltado. Con `indexOf` se pinta solo la primera aparición.

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: sin salida. El componente todavía no lo monta nadie — esto solo confirma que compila.

- [ ] **Step 3: Verificar que `Icon` tiene el nombre `alert`**

```bash
grep -n "alert" components/ui/Icon.tsx
```

Expected: una línea que define el icono `alert` (lo usa `PainPoint.tsx:14`). Si no existiera, sacá el bloque del eyebrow del componente.

- [ ] **Step 4: Commit**

```bash
git add components/sections/PitchBlock.tsx
git commit -m "feat(sections): agregar PitchBlock

Headline grande con palabra en accent + parrafo, centrado y sin listas. Cubre
los dos bloques de argumentacion de la landing del parasol que no matcheaban
ningun componente existente.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Escribir `lib/landings/parasol.ts`

Todo el contenido del doc, tipado. Sin código nuevo — es data.

**Files:**
- Create: `lib/landings/parasol.ts`

**Interfaces:**
- Consumes: `LandingConfig` y tipos auxiliares de `./types`.
- Produces: `PARASOL: LandingConfig`.

- [ ] **Step 1: Escribir el archivo**

Fuente de contenido: `C:\Users\ignaf\Downloads\Parasol_PRO_Landing_Contenido.md`. Reglas:

- **`productId` y `fallbackVariantId` de los 3 bundles en `''`.** Ver Global Constraints.
- **Precios placeholder** con `// TODO PRECIO REAL` en cada uno.
- **Rutas de media bajo `/parasol/`** aunque los archivos todavía no existan.
- `upsellChain` deriva de `bundles` con el mismo patrón que `soporte.ts` (`bundles.map(...)`), sin niveles x4-x6.
- `pitchBlocks` con los dos bloques del doc.

Valores decididos en el spec (§4, §4.1, §5):

```ts
brand: {
  tagline: 'Parasol PRO™',
  productHandle: 'parasol-pro',
  socialProofCount: 'Miles',
  socialProofLabel: 'de autos protegidos',
  averageRating: 4.8,
  reviewsCount: 0, // TODO: reseñas reales
},

headlines: {
  heroLine1: 'El parasol definitivo',
  heroLine2: 'para tu auto',
  // El doc mezclaba tercera persona con imperativo ("Bloquea… mantiné…
  // protegé"). Normalizado a tercera persona, que es el patrón del soporte.
  heroSub:
    'Se despliega como un paraguas y cubre todo el parabrisas al instante. Bloquea los rayos UV, mantiene el auto fresco y protege el tablero y el volante del sol.',
  // ...
},

heroSubHighlights: ['paraguas', 'UV'],

heroMedia: {
  videoSrc: '/parasol/hero/parasol-video.mp4',
  poster: '/parasol/hero/parasol-video-poster.webp',
  width: 720,
  height: 1280,
  badgeLine1: 'SE ABRE EN',
  badgeLine2: '3 SEGUNDOS',
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
```

`steps` (doc §5), con los videos:

```ts
steps: [
  {
    n: 1,
    title: 'Sacalo de la funda',
    desc: 'Viene con su propia funda compacta, entra en la guantera o la puerta sin ocupar espacio.',
    video: '/parasol/how-to-use/01-funda.mp4',
  },
  {
    n: 2,
    title: 'Abrilo como un paraguas',
    desc: 'Un solo movimiento y se despliega completo — no hay que armar piezas ni acomodar varillas.',
    video: '/parasol/how-to-use/02-abrir.mp4',
  },
  {
    n: 3,
    title: 'Encajalo en el parabrisas',
    desc: 'Se acomoda por dentro, sostenido por los mismos paños de sol del auto. Sin ventosas, sin pegamento, sin dejar marcas.',
    video: '/parasol/how-to-use/03-encajar.mp4',
  },
],
```

`benefits` (doc §6):

```ts
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
```

**Antes de commitear, verificá que los 6 iconos existan:**

```bash
for n in shield leaf bolt rotate sparkles check; do
  grep -q "'$n'\|\"$n\"\|^  $n:" components/ui/Icon.tsx && echo "OK $n" || echo "FALTA $n"
done
```

Expected: `OK` en los 6. Un icono inexistente renderiza vacío **sin tirar error**, así que esto no se detecta solo. Si falta alguno, sustituilo por uno que sí exista.

`faq` (doc §11) — las 3 primeras salen del doc; las 2 últimas reusan el texto de envíos y el legal, **copiados de `soporte.ts`** (no los reescribas: el de devolución tiene implicancias legales):

```ts
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
    a: '<COPIAR de soporte.ts — la respuesta de envíos/Andreani con los plazos por zona>',
  },
  {
    q: '¿Puedo devolverlo si no me convence?',
    a: '<COPIAR de soporte.ts — el texto legal de devolución a 30 días>',
  },
],
```

> Si `soporte.ts` no tuviera una FAQ de envíos (la lista actual son 4 preguntas sobre el imán), escribí la de envíos a partir de `SHIPPING.message` y la de devolución a partir de `RETURNS.days` + el texto de `QUALITY_BADGES[0].desc`, que ya dice "te devolvemos cada peso dentro de los 30 días posteriores a la entrega".

`bundles` (doc §9):

```ts
// ⚠️ TODO PRECIO REAL — placeholders. El producto no está cotizado todavía.
// ⚠️ TODO SHOPIFY — los 3 productos no existen; productId/variantId en ''
//    hasta que se creen. Con '' el BuyButton muestra "Producto no disponible"
//    en vez de habilitarse contra un merchandise inexistente.
bundles: [
  {
    id: 'single',
    productId: '',
    fallbackVariantId: '',
    label: 'LLEVÁ 1',
    subtitle: 'Un parasol. Cero horno.',
    quantity: 1,
    unitsLabel: '1 unidad',
    badge: null,
    bonus: '+ funda incluida',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 29990,   // TODO PRECIO REAL
    fallbackCompare: 45000, // TODO PRECIO REAL
    image: '/parasol/bundles/ParasolX1.webp',
  },
  {
    id: 'double',
    productId: '',
    fallbackVariantId: '',
    label: 'LLEVÁ 2',
    subtitle: '50% OFF en la 2ª unidad.',
    quantity: 2,
    unitsLabel: '2 unidades · 2ª al 50%',
    badge: 'MÁS ELEGIDO',
    bonus: '+ 2 fundas incluidas',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 44985,   // TODO PRECIO REAL
    fallbackCompare: 90000, // TODO PRECIO REAL
    image: '/parasol/bundles/ParasolX2.webp',
  },
  {
    id: 'triple',
    productId: '',
    fallbackVariantId: '',
    label: 'LLEVÁ 3',
    subtitle: 'La 3ª unidad es GRATIS.',
    quantity: 3,
    unitsLabel: '3 unidades · 3ª GRATIS',
    badge: '3X2',
    bonus: '+ 3 fundas incluidas',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 59980,    // TODO PRECIO REAL
    fallbackCompare: 135000, // TODO PRECIO REAL
    image: '/parasol/bundles/ParasolX3.webp',
  },
],
```

> Los precios son placeholders con la **estructura de descuento correcta** (2ª al 50%, 3ª gratis) sobre un precio base inventado de $29.990. Cuando Ignacio cotice, sólo cambian los 6 números.

`upsellChain` deriva de `bundles`, igual que en `soporte.ts`:

```ts
const PARASOL_BUNDLES: readonly Bundle[] = [ /* los 3 de arriba */ ];

const PARASOL_UPSELL_CHAIN: readonly UpsellTier[] = PARASOL_BUNDLES.map((b) => ({
  id: b.id,
  productId: b.productId,
  fallbackVariantId: b.fallbackVariantId,
  quantity: b.quantity,
  unitsLabel: b.unitsLabel,
  fallbackPrice: b.fallbackPrice,
}));
```

`reviews` + `ratingBreakdown`: placeholders genéricos inventados (decisión del spec §4.1). Encabezalos con un comentario de bloque bien visible:

```ts
/**
 * ⚠️ RESEÑAS PLACEHOLDER — INVENTADAS.
 *
 * El Parasol PRO todavía no se vendió, así que estas reseñas son ficticias y
 * existen sólo para que la sección renderice completa en desarrollo.
 *
 * NO PUBLICAR ASÍ. Reemplazar por reseñas reales antes de que /parasol reciba
 * tráfico — ver el checklist en docs/superpowers/specs/parasol-assets.md.
 * Lo mismo aplica a `brand.socialProofCount` y a `ratingBreakdown`.
 */
```

Escribí 4-8 reseñas coherentes con el producto (calor, tablero, facilidad de armado) y un `ratingBreakdown` cuyo `total` coincida con la cantidad de reseñas.

`metadata`:

```ts
metadata: {
  title: 'Parasol PRO™ — CARMANIA',
  description:
    'El parasol que se abre como un paraguas y cubre todo el parabrisas en 3 segundos. Bloquea los rayos UV y mantiene el auto fresco. Envío gratis y 30 días de devolución.',
  ogTitle: 'Parasol PRO™ — CARMANIA',
  ogDescription:
    'Se abre en 3 segundos y cubre todo el parabrisas. Bloquea los rayos UV y protege el tablero. Envío gratis y devolución 30 días.',
  canonical: '/parasol',
},
```

`certifications`: `{ enabled: false, ... }` — no hay certificaciones propias del parasol.

`whatsappPrefilled`: `'Hola CARMANIA! Quería consultar por el Parasol PRO...'`

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: sin salida. Si falta un campo requerido de `LandingConfig`, TypeScript te dice cuál — completalo. Los campos solo-soporte (`useCases`, `surfaces`, etc.) no están en el tipo, así que no hacen falta.

- [ ] **Step 3: Verificar la regla anti-ciclo**

```bash
grep -n "lib/config\|from '\.\./config'\|from '\./\.\./config'" lib/landings/parasol.ts lib/landings/soporte.ts lib/landings/types.ts
```

Expected: **sin resultados**. Cualquier match viola la regla unidireccional de Global Constraints.

- [ ] **Step 4: Commit**

```bash
git add lib/landings/parasol.ts
git commit -m "feat(parasol): agregar la config de contenido del Parasol PRO

Todo el copy del doc de contenido, tipado como LandingConfig. Los 3 bundles
van con productId/variantId en string vacio porque los productos todavia no
existen en Shopify: asi el BuyButton queda deshabilitado mostrando 'Producto
no disponible' en vez de habilitarse contra un merchandise inexistente.
Precios, media y resenas son placeholders marcados con TODO.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: Crear `/parasol` y cablear la unión de chains

**Files:**
- Create: `app/parasol/page.tsx`
- Create: `docs/superpowers/specs/parasol-assets.md`
- Modify: `app/page.tsx`
- Modify: `app/tienda/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: todo lo de las tareas 1-7.
- Produces: la ruta `/parasol` renderizando las 11 secciones del spec §6.

- [ ] **Step 1: Crear `lib/landings/index.ts` con la unión de chains**

Va primero porque `app/parasol/page.tsx` (Step 2) lo importa.

```ts
/**
 * La unión de las escaleras de upsell de todas las landings.
 *
 * El carrito persiste entre páginas (un solo `carmania_cart_id` en
 * localStorage), así que el drawer tiene que poder resolver el tier de
 * cualquier producto, no sólo el de la landing que se está mirando. Con la
 * chain de una sola landing, una línea del otro producto cae en
 * `tierOf() → null` y pierde su banner de upsell.
 */
import { SOPORTE } from './soporte';
import { PARASOL } from './parasol';
import type { UpsellTier } from './types';

export const ALL_UPSELL_CHAINS: readonly UpsellTier[] = [
  ...SOPORTE.upsellChain,
  ...PARASOL.upsellChain,
];
```

- [ ] **Step 2: Escribir `app/parasol/page.tsx`**

Puntos que **no** son obvios y el spec exige:

1. `ReactDOM.preload()` del poster propio (spec §8 — sin esto la landing arranca con peor LCP que `/`).
2. Filtrar los `productId` vacíos antes de llamar a `getBundlesData`, y omitir la llamada si no queda ninguno (spec §7.2).
3. Pasar la **unión** de chains a `CartProvider` (spec §7.3).
4. `export const revalidate = 300`.

```tsx
/**
 * Landing del Parasol PRO™.
 *
 * Misma estructura y componentes que la landing del soporte (`app/page.tsx`):
 * lo único que cambia es la config que reciben las secciones.
 *
 * Ojo: los 3 productos todavía no existen en Shopify (productId en ''), así
 * que los botones de compra quedan deshabilitados a propósito. Ver el
 * checklist de pre-publicación en docs/superpowers/specs/parasol-assets.md.
 */
import type { Metadata } from 'next';
import ReactDOM from 'react-dom';
import { Navbar, type NavLink } from '@/components/layout/Navbar';
import { CountdownBanner } from '@/components/layout/CountdownBanner';
import { PromoBar } from '@/components/layout/PromoBar';
import { Hero } from '@/components/sections/Hero';
import { PitchBlock } from '@/components/sections/PitchBlock';
import { CarBrands } from '@/components/sections/CarBrands';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Benefits } from '@/components/sections/Benefits';
import { Pricing } from '@/components/sections/Pricing';
import { Reviews } from '@/components/sections/Reviews';
import { TrustBlock } from '@/components/sections/TrustBlock';
import { FAQ } from '@/components/sections/FAQ';
import { BackToPricingCTA } from '@/components/sections/BackToPricingCTA';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/components/commerce/CartProvider';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { FloatingCartButton } from '@/components/commerce/FloatingCartButton';
import { WhatsAppFloat } from '@/components/overlays/WhatsAppFloat';
import { PixelViewContent } from '@/components/analytics/MetaPixel';
import { KlaviyoViewedProduct } from '@/components/analytics/KlaviyoEvents';
import { getProduct, getBundlesData, type BundleData } from '@/lib/shopify';
import { PARASOL } from '@/lib/landings/parasol';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';

export const revalidate = 300;

export const metadata: Metadata = {
  title: PARASOL.metadata.title,
  description: PARASOL.metadata.description,
  // Next NO hace deep-merge de `openGraph` entre layout y page: el objeto de
  // la página REEMPLAZA al del layout. Por eso type/locale/siteName se repiten
  // acá aunque también estén en app/layout.tsx. No los borres.
  openGraph: {
    title: PARASOL.metadata.ogTitle,
    description: PARASOL.metadata.ogDescription,
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: PARASOL.metadata.canonical },
};

const PARASOL_LINKS: NavLink[] = [
  { href: '#how', label: 'Cómo funciona' },
  { href: '#pricing', label: 'Oferta', highlight: true },
  { href: '#reviews', label: 'Opiniones' },
  { href: '#faq', label: 'FAQ' },
];

export default async function ParasolPage() {
  // El poster del video del hero es el LCP de ESTA página. `ReactDOM.preload()`
  // (vs. un <link> JSX) es lo que lo hoistea cerca del principio de <head>.
  ReactDOM.preload(PARASOL.heroMedia.poster, {
    as: 'image',
    fetchPriority: 'high',
    type: 'image/webp',
  });

  let productId = '';
  let bundlesData: Record<string, BundleData> = {};
  let price = PARASOL.fallbackPricing.price;

  // Los productos del parasol todavía no existen: sus productId son ''. Pedirle
  // a Shopify un GID vacío o inventado devuelve un error top-level (no un nodo
  // null), así que filtramos antes de preguntar.
  const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);

  if (ids.length > 0) {
    try {
      const [product, data] = await Promise.all([
        PARASOL.brand.productHandle
          ? getProduct(PARASOL.brand.productHandle)
          : Promise.resolve(null),
        getBundlesData(ids),
      ]);
      if (product) productId = product.id;
      bundlesData = data;

      const single = PARASOL.bundles.find((b) => b.id === 'single');
      const singleData = single ? data[single.productId] : undefined;
      if (singleData) price = singleData.price;
    } catch (err) {
      console.error('[Shopify] No pude traer datos de bundles del parasol:', err);
    }
  }

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={PARASOL.brand.tagline}
    >
      <CountdownBanner />
      <PromoBar />
      <Navbar links={PARASOL_LINKS} homeHref="#top" ctaHref="#pricing" />

      <main>
        <Hero config={PARASOL} />
        <PitchBlock data={PARASOL.pitchBlocks[0]} />
        <CarBrands config={PARASOL} />
        <HowItWorks config={PARASOL} />
        <Benefits config={PARASOL} />
        <PitchBlock data={PARASOL.pitchBlocks[1]} />
        <Pricing productId={productId} bundlesData={bundlesData} config={PARASOL} />
        <Reviews config={PARASOL} />
        <div id="trust">
          <TrustBlock config={PARASOL} />
        </div>
        <FAQ config={PARASOL} />
        <BackToPricingCTA config={PARASOL} />
      </main>

      <Footer />

      <WhatsAppFloat prefilled={PARASOL.whatsappPrefilled} />
      <FloatingCartButton />
      <CartDrawer />

      {productId && (
        <PixelViewContent
          productId={productId}
          name={PARASOL.brand.tagline}
          price={price}
        />
      )}
      {productId && (
        <KlaviyoViewedProduct
          productId={productId}
          name={PARASOL.brand.tagline}
          price={price}
        />
      )}
    </CartProvider>
  );
}
```

- [ ] **Step 3: Cablear la unión en `app/page.tsx` y `app/tienda/page.tsx`**

En ambos, reemplazá `UPSELL_CHAIN.map((t) => t.productId)` por la unión filtrada, y pasale la chain al provider:

```tsx
import { ALL_UPSELL_CHAINS } from '@/lib/landings';

// ...
const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);
const [product, data] = await Promise.all([
  getProduct(BRAND.productHandle),
  getBundlesData(ids),
]);
```

```tsx
<CartProvider bundlesData={bundlesData} upsellChain={ALL_UPSELL_CHAINS}>
```

> Mientras el parasol tenga `productId: ''`, `.filter(Boolean)` los descarta y `ids` termina siendo exactamente la lista de hoy — el gate de regresión tiene que seguir dando `OK`.

- [ ] **Step 4: Agregar `/parasol` al sitemap**

En `app/sitemap.ts`, sumá al array (y actualizá el comentario del docblock, que dice "dos rutas indexables"):

```ts
{
  url: 'https://oferta.carmaniaoficial.com/parasol',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.9,
},
```

- [ ] **Step 5: Escribir `docs/superpowers/specs/parasol-assets.md`**

Con la lista de media del spec §10 y el checklist de pre-publicación del §10.1, copiados tal cual.

- [ ] **Step 6: Type check + build**

```bash
npx tsc --noEmit && npm run build
```

Expected: compila, y en la tabla de rutas aparece `/parasol`. **El log no debe tener errores de Shopify** — eso confirma que el filtro de IDs vacíos funciona.

- [ ] **Step 7: Gate de regresión**

```bash
npx tsc --noEmit && npm run build && bash .superpowers/sdd/gate.sh
```

Expected: `OK index`, `OK tienda`.

- [ ] **Step 8: Commit**

```bash
git add app/parasol/page.tsx lib/landings/index.ts app/page.tsx \
        app/tienda/page.tsx app/sitemap.ts docs/superpowers/specs/parasol-assets.md
git commit -m "feat(parasol): agregar la landing en /parasol

Las 11 secciones del spec, reusando los componentes de la landing del soporte
con la config del parasol. Detalles que no son obvios:

- preload propio del poster del hero, que es el LCP de esta pagina
- se filtran los productId vacios antes de pedirle bundles a Shopify, porque
  un GID inexistente devuelve un error top-level y no un nodo null
- las tres paginas pasan la union de las upsell chains al CartProvider: el
  carrito persiste entre paginas y con una sola chain la linea del otro
  producto perdia su banner de upsell

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 9: Verificación end-to-end

Nada de código. Es el gate final antes de entregar.

**Files:** ninguno (salvo fixes que surjan).

- [ ] **Step 1: Levantar el dev server**

`preview_start` con `{name: "carmania-dev"}`.

- [ ] **Step 2: `/` y `/tienda` sin regresiones**

Navegá a las dos, screenshot de cada una, y `read_console_messages` con `onlyErrors: true`.

Expected: se ven igual que siempre, consola sin errores. El gate de HTML ya probó el markup; esto cubre lo que pasa después de hidratar.

- [ ] **Step 3: `/parasol` renderiza completa**

Navegá a `/parasol` y con `read_page` confirmá las 11 secciones en este orden: Hero, PitchBlock (HORNO), CarBrands, HowItWorks, Benefits, PitchBlock (CARTÓN), Pricing, Reviews, TrustBlock, FAQ, BackToPricingCTA.

Expected: las 11, en ese orden, con el copy del parasol (no del soporte).

- [ ] **Step 4: Los botones de compra están deshabilitados**

En `#pricing` de `/parasol`, inspeccioná las 3 cards.

Expected: los 3 botones **`disabled`**, cada uno con el texto "Producto no disponible. Recargá la página o escribinos por WhatsApp."

**Este es el check más importante de la tarea.** Si algún botón está habilitado, un `productId`/`fallbackVariantId` quedó con un valor truthy — volvé a `lib/landings/parasol.ts` y ponelo en `''`.

- [ ] **Step 5: Carrito cruzado entre landings**

1. Navegá a `/`, agregá el bundle x2 al carrito
2. Navegá a `/parasol`
3. Abrí el drawer con el botón flotante

Expected: la línea del soporte sigue ahí **y conserva su banner "Sumá una unidad más"**. Si el banner no aparece, la unión de chains no está llegando al `CartProvider` de `/parasol` (Task 8, Step 1).

- [ ] **Step 6: Consola y anclas**

`read_console_messages` con `onlyErrors: true` en `/parasol`, y probá los 4 links del navbar.

Expected: sin errores; los 4 links scrollean a su sección.

- [ ] **Step 7: Mobile**

`resize_window` con `{preset: "mobile"}`, recargá, screenshot de `/parasol`.

Expected: sin scroll horizontal, el hero legible, las cards de pricing apiladas en el orden mobile (x2 → x3 → x1, que es el `mobileOrder` de `Pricing`).

Acordate de volver a `{preset: "desktop"}` al terminar.

- [ ] **Step 8: Screenshots finales para Ignacio**

Mandá con `SendUserFile`: `/parasol` desktop, `/parasol` mobile, y `/` desktop (la prueba de que no cambió).

- [ ] **Step 9: Reporte de estado**

Resumí en el chat:
- Qué quedó andando
- Qué está bloqueado esperando datos (precios, productos de Shopify, media, reseñas reales)
- El recordatorio de que **no se pushea** hasta que Ignacio confirme

---

## Notas de ejecución

- **Si un gate de regresión falla, no sigas.** Un diff inesperado en `/` significa que se rompió algo en la landing que factura. La única excepción documentada es el Task 4 Step 5 (los 3 `alt` de las imágenes de bundle), donde el diff es intencional y el baseline se re-captura.
- **Al mudar copy, copiá y pegá.** El grueso de las tareas 1 y 5 es mover strings entre archivos. Retipearlos a mano es la forma más probable de romper el gate.
- **`npm run dev` necesita `'unsafe-eval'` en la CSP y ya lo tiene** (`next.config.js` lo agrega solo en desarrollo). Si en dev ves un `EvalError` y los `<video>` desaparecen del DOM, es eso — no lo copies a `_headers`.
- **No crear productos en Shopify.** Está fuera de alcance (spec §12).
