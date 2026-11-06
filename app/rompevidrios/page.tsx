/**
 * Landing del Llavero Rescate PRO™ — tipo advertorial.
 *
 * No es una landing de producto como /parasol: es una nota larga que cuenta
 * una historia (inundación, puertas trabadas), desarma el mito del
 * apoyacabezas, demuestra que funciona con el vidrio de prueba y recién al
 * final vende. La estética es la de las otras landings de la marca: mismo
 * CountdownBanner, PromoBar, Navbar y Hero, fondos negro y negro-gris
 * alternados, títulos `heading-display` y botones píldora.
 *
 * Todo el copy y los assets salen de `ROMPEVIDRIOS.advertorial`
 * (lib/landings/rompevidrios.ts). Cada foto/video es un `MediaSlot`: mientras
 * el archivo no exista se ve un placeholder que dice qué va ahí. Ver el
 * checklist en docs/superpowers/specs/rompevidrios-assets.md.
 *
 * Sin pack de 1: los packs son 2x / 4x / 6x (ver el comentario de los
 * bundles en la config).
 *
 * MIENTRAS tenga `comingSoon: true` en STORE_PRODUCTS esta ruta responde 404
 * en producción. En `npm run dev` y en las previews de Cloudflare se ve
 * entera (ver `isPublished` / `showsDrafts`). Las reseñas, que esperan
 * material real, siguen la misma regla.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactDOM from 'react-dom';
import { Navbar } from '@/components/layout/Navbar';
import { CountdownBanner } from '@/components/layout/CountdownBanner';
import { PromoBar } from '@/components/layout/PromoBar';
import { Hero } from '@/components/sections/Hero';
import { UseCases } from '@/components/sections/UseCases';
import { CarBrands } from '@/components/sections/CarBrands';
import { WhatsInBox } from '@/components/sections/WhatsInBox';
import { ProductCarousel } from '@/components/ui/ProductCarousel';
import { BackToPricingCTA } from '@/components/sections/BackToPricingCTA';
import { Footer } from '@/components/layout/Footer';
import { Pricing } from '@/components/sections/Pricing';
import { Reviews } from '@/components/sections/Reviews';
import { FAQ } from '@/components/sections/FAQ';
import { CartProvider } from '@/components/commerce/CartProvider';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { FloatingCartButton } from '@/components/commerce/FloatingCartButton';
import { WhatsAppFloat } from '@/components/overlays/WhatsAppFloat';
import { PixelViewContent } from '@/components/analytics/MetaPixel';
import { KlaviyoViewedProduct } from '@/components/analytics/KlaviyoEvents';
import { MediaSlot } from '@/components/advertorial/MediaSlot';
// Escenario y mito desactivados por ahora (no borrar): el copy sigue en
// ROMPEVIDRIOS.advertorial.story / .myth.
// import { StoryBlock } from '@/components/advertorial/StoryBlock';
import { StepsGrid } from '@/components/advertorial/StepsGrid';
import { ComparisonTable } from '@/components/advertorial/ComparisonTable';
import { ReviewsPlaceholder } from '@/components/advertorial/ReviewsPlaceholder';
import { SpecsBlock } from '@/components/advertorial/SpecsBlock';
import { TrustBlock } from '@/components/sections/TrustBlock';
import { ClosingBlock } from '@/components/advertorial/ClosingBlock';
import { StickyCTA } from '@/components/advertorial/StickyCTA';
import { getProduct, getBundlesData, type BundleData } from '@/lib/shopify';
import { ROMPEVIDRIOS } from '@/lib/landings/rompevidrios';
import { SOPORTE } from '@/lib/landings/soporte';
import {
  ROMPEVIDRIOS_MOCK_REVIEWS,
  ROMPEVIDRIOS_MOCK_GRID_REVIEWS,
  ROMPEVIDRIOS_MOCK_BREAKDOWN,
} from '@/lib/landings/rompevidrios.mock-reviews';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, isPublished, showsDrafts } from '@/lib/config';

const STORE = STORE_PRODUCTS.find((p) => p.href === '/rompevidrios')!;
const ADV = ROMPEVIDRIOS.advertorial;
// Cifra de clientes de la marca (la misma del botón final), para el cierre de #reviews.
const REVIEWS_PROOF_COUNT = SOPORTE.brand.socialProofCount;
// Estrellas, promedio y clientes de arriba de los packs: son los de la marca
// (los mismos del soporte); el producto todavía no tiene los suyos.
const PRICING_CONFIG = {
  ...ROMPEVIDRIOS,
  brand: {
    ...ROMPEVIDRIOS.brand,
    averageRating: SOPORTE.brand.averageRating,
    socialProofCount: SOPORTE.brand.socialProofCount,
    socialProofLabel: SOPORTE.brand.socialProofLabel,
  },
};
export const revalidate = 300;

// `generateMetadata` y no `metadata`, por lo mismo que en /soplador: sin esto
// el título del producto quedaba en el payload de la página 404.
export function generateMetadata(): Metadata {
  return isPublished(STORE) ? METADATA : {};
}

const METADATA: Metadata = {
  title: ROMPEVIDRIOS.metadata.title,
  description: ROMPEVIDRIOS.metadata.description,
  // Next NO hace deep-merge de `openGraph` entre layout y page: el objeto de
  // la página REEMPLAZA al del layout. Por eso type/locale/siteName se repiten.
  openGraph: {
    title: ROMPEVIDRIOS.metadata.ogTitle,
    description: ROMPEVIDRIOS.metadata.ogDescription,
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: ROMPEVIDRIOS.metadata.canonical },
};

export default async function RompevidriosPage() {
  if (!isPublished(STORE)) notFound();
  const drafts = showsDrafts();

  // La portada del video del hero es el LCP, como en / y /parasol:
  // `ReactDOM.preload()` la hoistea al principio de <head>. Apunta al mismo
  // archivo que el `poster` del <video>, sin doble fetch. Mientras RV-01 sea
  // placeholder no hay archivo que precargar.
  const heroSlot = ADV.hero.media;
  if (!heroSlot.pending && heroSlot.poster) {
    ReactDOM.preload(heroSlot.poster, { as: 'image', fetchPriority: 'high', type: 'image/webp' });
  }

  let productId = '';
  let bundlesData: Record<string, BundleData> = {};
  let price = ROMPEVIDRIOS.fallbackPricing.price;

  // Mismo filtro que /soplador: un GID vacío hace fallar la query entera.
  const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);
  const ownIds = ROMPEVIDRIOS.bundles.map((b) => b.productId).filter(Boolean);

  if (ids.length > 0) {
    try {
      const [product, data] = await Promise.all([
        ownIds.length > 0 ? getProduct(ROMPEVIDRIOS.brand.productHandle) : Promise.resolve(null),
        getBundlesData(ids),
      ]);
      if (product) productId = product.id;
      bundlesData = data;

      const entry = data[ROMPEVIDRIOS.bundles[0].productId];
      if (entry) price = entry.price;
    } catch (err) {
      console.error('[Shopify] No pude traer datos de bundles del rompevidrios:', err);
    }
  }

  const hasReviews = ROMPEVIDRIOS.reviews.length > 0;

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={ROMPEVIDRIOS.brand.tagline}
    >
      <CountdownBanner />
      <PromoBar />
      {/* Mismos links que las otras landings (default del Navbar): esta
          también tiene #how, #pricing, #reviews, #trust y #faq. */}
      <Navbar />

      <main>
        {/* 1. Hero — el mismo de las otras landings, con el slot RV-01 */}
        <Hero
          config={
            // Carrusel de maqueta SÓLO en `npm run dev` (ver el archivo de
            // mock-reviews). En preview y producción, sin reseñas reales no hay carrusel.
            process.env.NODE_ENV === 'development'
              ? { ...ROMPEVIDRIOS, reviews: ROMPEVIDRIOS_MOCK_REVIEWS }
              : ROMPEVIDRIOS
          }
          media={<MediaSlot slot={ADV.hero.media} fill eager sizes="(min-width: 768px) 50vw, 100vw" />}
        />

        {/* Escenario ("Imaginate…") y mito ("Yo rompo el vidrio con el
            apoyacabezas") — desactivados por ahora, no borrar.
        <StoryBlock
          heading={ADV.story}
          paragraphs={ADV.story.paragraphs}
          media={ADV.story.media}
          mediaAfter={ADV.story.mediaAfter}
          closing={ADV.story.closing}
          bg="gray"
        />
        <StoryBlock heading={ADV.myth} paragraphs={ADV.myth.paragraphs} media={ADV.myth.media} narrowMedia />
        */}

        {/* 2. Situaciones — la misma grilla de 6 tarjetas que usa / entre el
            hero y el banner de marcas */}
        <UseCases
          config={ROMPEVIDRIOS}
          media={ADV.situations.map((s) => (
            <MediaSlot
              key={s.id}
              slot={s}
              fill
              compact
              sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
            />
          ))}
        />

        {/* 3. Banner de marcas — el mismo de / y /soplador */}
        <CarBrands config={ROMPEVIDRIOS} />

        {/* 4. "Sabés que funciona antes de necesitarlo" + ¿Qué incluye? — la
            misma sección que el soporte (WhatsInBox), con su carrusel y una
            opinión abajo. Los slides no llevan texto propio. */}
        <WhatsInBox
          data={{
            headline: ADV.includes.headline,
            lead: ADV.includes.lead,
            body: ADV.includes.body,
            note: ADV.includes.note,
            items: ADV.includes.items,
            // Opinión de MAQUETA sólo en dev (ver el archivo de mock-reviews):
            // sin reseñas reales no se muestra ninguna.
            testimonial:
              process.env.NODE_ENV === 'development' ? ROMPEVIDRIOS_MOCK_REVIEWS[3] : undefined,
            testimonialPhoto:
              process.env.NODE_ENV === 'development' ? ROMPEVIDRIOS_MOCK_REVIEWS[3].image : undefined,
          }}
          media={
            <ProductCarousel
              nodes={ADV.includes.slides.map((slot) => (
                <MediaSlot key={slot.id} slot={slot} fill sizes="(min-width: 768px) 512px, 100vw" />
              ))}
            />
          }
        />

        {/* 5. Cómo funciona (#how) */}
        <StepsGrid steps={ADV.steps} bg="gray" />

        {/* 6. Comparativa */}
        <ComparisonTable comparison={ADV.comparison} bg="black" />

        {/* 7. Elegí tu pack (#pricing) — los únicos botones que agregan al carrito */}
        <Pricing
          productId={productId}
          bundlesData={bundlesData}
          config={PRICING_CONFIG}
          bundleMedia={{
            single: <MediaSlot slot={ADV.packs.images.single} fill />,
            double: <MediaSlot slot={ADV.packs.images.double} fill />,
            triple: <MediaSlot slot={ADV.packs.images.triple} fill />,
          }}
        />

        {/* 8. Medidas y especificaciones: como TechSpecs del soporte */}
        <SpecsBlock specs={ADV.specs} />

        {/* 9. Reseñas (#reviews): sólo reales. Sin ninguna, placeholder en
            dev/preview y nada en producción. Debajo de los packs, como en el soporte. */}
        {hasReviews ? (
          <Reviews
            config={{
              ...ROMPEVIDRIOS,
              brand: { ...ROMPEVIDRIOS.brand, socialProofCount: REVIEWS_PROOF_COUNT },
            }}
          />
        ) : process.env.NODE_ENV === 'development' ? (
          // Grilla de MAQUETA (8 reseñas con foto) sólo en `npm run dev`; ver el
          // archivo de mock-reviews. En preview y producción, nada inventado.
          <Reviews
            config={{
              ...ROMPEVIDRIOS,
              reviews: ROMPEVIDRIOS_MOCK_GRID_REVIEWS,
              ratingBreakdown: ROMPEVIDRIOS_MOCK_BREAKDOWN,
              brand: { ...ROMPEVIDRIOS.brand, socialProofCount: REVIEWS_PROOF_COUNT },
            }}
          />
        ) : (
          drafts && (
            <ReviewsPlaceholder
              reviews={ADV.reviews}
              sectionCopy={ROMPEVIDRIOS.sectionCopy}
              bg="gray"
            />
          )
        )}

        {/* 10. Calidad garantizada (#trust) — las 3 cards del soporte */}
        <div id="trust">
          <TrustBlock config={ROMPEVIDRIOS} />
        </div>

        {/* 11. FAQ */}
        <FAQ config={ROMPEVIDRIOS} />

        {/* 12. Cierre ("Dos mañanas posibles"), donde el soporte tiene el BackToPricingCTA */}
        <ClosingBlock closing={ADV.closing} />

        {/* 12. "¿Listo para tener tu CARMANIA?" — el botón final del soporte */}
        <BackToPricingCTA config={ROMPEVIDRIOS} />
      </main>

      <Footer />

      <StickyCTA label={ADV.cta.label} href={ADV.cta.href} />
      <WhatsAppFloat prefilled={ROMPEVIDRIOS.whatsappPrefilled} />
      <FloatingCartButton />
      <CartDrawer />

      {productId && (
        <PixelViewContent productId={productId} name={ROMPEVIDRIOS.brand.tagline} price={price} />
      )}
      {productId && (
        <KlaviyoViewedProduct productId={productId} name={ROMPEVIDRIOS.brand.tagline} price={price} />
      )}
    </CartProvider>
  );
}
