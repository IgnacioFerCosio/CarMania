/**
 * Landing del Llavero Rescate PRO™ — tipo advertorial.
 *
 * Recorrido: hero, situaciones, qué incluye, cómo funciona, comparativa, packs,
 * medidas, reseñas, garantía, FAQ y cierre. Las secciones de historia y mito
 * están comentadas más abajo; su copy sigue en la config. La estética es la de las otras landings de la marca: mismo
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
 * MIENTRAS tenga `comingSoon: true` en STORE_PRODUCTS esta ruta se puede abrir
 * sólo con la URL, para probarla: no está en el sitemap, /tienda la muestra como
 * "Próximamente" sin link y lleva `noindex`. A diferencia de /soplador, no da
 * 404. Publicarla es sacar ese flag. 
 */
import type { Metadata } from 'next';
import ReactDOM from 'react-dom';
import { Navbar } from '@/components/layout/Navbar';
import { CountdownBanner } from '@/components/layout/CountdownBanner';
import { PromoBar } from '@/components/layout/PromoBar';
import { Hero } from '@/components/sections/Hero';
import { UseCases } from '@/components/sections/UseCases';
import { CarBrands } from '@/components/sections/CarBrands';
import { WhatsInBox } from '@/components/sections/WhatsInBox';
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
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, showsDrafts } from '@/lib/config';

const STORE = STORE_PRODUCTS.find((p) => p.href === '/llavero-rescate')!;
const ADV = ROMPEVIDRIOS.advertorial;
// Cifra de clientes de la marca (la misma del botón final), para el cierre de #reviews.
const REVIEWS_PROOF_COUNT = SOPORTE.brand.socialProofCount;
// Las cards de los packs: tres columnas en desktop, una en el celular.
const PACK_SIZES = '(min-width: 768px) 33vw, 100vw';
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

// Con `comingSoon` se abre con la URL, pero los buscadores no la indexan.
export function generateMetadata(): Metadata {
  return STORE.comingSoon ? { ...METADATA, robots: { index: false, follow: false } } : METADATA;
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
          config={ROMPEVIDRIOS}
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
            misma sección que el soporte (WhatsInBox), sin carrusel por ahora
            (sólo la foto del pasto). La opinión de abajo aparece con 4 reseñas. */}
        <WhatsInBox
          data={{
            headline: ADV.includes.headline,
            lead: ADV.includes.lead,
            body: ADV.includes.body,
            note: ADV.includes.note,
            items: ADV.includes.items,
            // La 4ª reseña: las 3 primeras van en el carrusel del hero.
            testimonial: ROMPEVIDRIOS.reviews[3],
            testimonialPhoto: ROMPEVIDRIOS.reviews[3]?.image,
          }}
          // Por ahora, sólo la foto del pasto con los productos (RV-12), en la
          // misma ventana 1:1 del carrusel. El carrusel vuelve cuando haya más
          // imágenes: `ADV.includes.slides` ya las tiene en orden.
          media={
            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-ink-950 ring-1 ring-inset ring-ink-800">
                <MediaSlot
                  slot={ADV.includes.slides[0]}
                  fill
                  sizes="(min-width: 768px) 512px, 100vw"
                />
              </div>
            </div>
          }
        />

        {/* 5. Cómo funciona (#how) */}
        <StepsGrid steps={ADV.steps} bg="gray" />

        {/* 6. Comparativa */}
        <ComparisonTable comparison={ADV.comparison} bg="ink" />

        {/* 7. Elegí tu pack (#pricing) — los únicos botones que agregan al carrito */}
        <Pricing
          productId={productId}
          bundlesData={bundlesData}
          config={PRICING_CONFIG}
          bundleMedia={{
            single: <MediaSlot slot={ADV.packs.images.single} fill sizes={PACK_SIZES} />,
            double: <MediaSlot slot={ADV.packs.images.double} fill sizes={PACK_SIZES} />,
            triple: <MediaSlot slot={ADV.packs.images.triple} fill sizes={PACK_SIZES} />,
          }}
        />

        {/* 8. Medidas y especificaciones: como TechSpecs del soporte */}
        <SpecsBlock specs={ADV.specs} />

        {/* 9. Reseñas (#reviews). Sin ninguna, placeholder en
            dev/preview y nada en producción. Debajo de los packs, como en el soporte. */}
        {hasReviews ? (
          <Reviews
            config={{
              ...ROMPEVIDRIOS,
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
