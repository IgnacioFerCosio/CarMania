/**
 * Landing del Trabavolante Titan PRO™.
 *
 * Misma estructura y componentes que la del soporte y la del parasol: lo
 * único que cambia es la config que reciben las secciones. El armado sigue al
 * soplador (producto que todavía no existe en Shopify):
 *   hero → beneficios en cuadros → marcas (es universal) → qué incluye →
 *   cómo funciona → comparativa → packs → beneficios → reseñas → garantía →
 *   FAQ → CTA final.
 *
 * La comparativa (vs. el bastón y la alarma) es la tabla de /llavero-rescate,
 * sin el mapa del auto: la comparación con el trabavolante de barra es el
 * ángulo más fuerte de los creativos de TitanLock.
 *
 * Las reseñas salen sólo cuando haya reales cargadas en la config.
 *
 * Ojo: los 3 productos todavía no existen en Shopify (productId en ''), así
 * que los botones de compra quedan deshabilitados a propósito. Ver el
 * checklist en docs/superpowers/specs/trabavolante-assets.md.
 *
 * MIENTRAS tenga `comingSoon: true` en STORE_PRODUCTS esta ruta responde 404
 * en producción. En `npm run dev` y en las previews se abre igual (ver
 * `isPublished`).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactDOM from 'react-dom';
import { Navbar } from '@/components/layout/Navbar';
import { CountdownBanner } from '@/components/layout/CountdownBanner';
import { PromoBar } from '@/components/layout/PromoBar';
import { Hero } from '@/components/sections/Hero';
import { UseCases } from '@/components/sections/UseCases';
import { WhatsInBox } from '@/components/sections/WhatsInBox';
import { CarBrands } from '@/components/sections/CarBrands';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ComparisonTable } from '@/components/advertorial/ComparisonTable';
import { BenefitsShowcase } from '@/components/sections/BenefitsShowcase';
import { Pricing } from '@/components/sections/Pricing';
import { Reviews } from '@/components/sections/Reviews';
import { ReviewsExpandable } from '@/components/sections/ReviewsExpandable';
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
import { TRABAVOLANTE } from '@/lib/landings/trabavolante';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, isPublished } from '@/lib/config';

const TRABAVOLANTE_STORE = STORE_PRODUCTS.find((p) => p.href === '/trabavolante')!;
export const revalidate = 300;

// `generateMetadata` y no `metadata`: Next resuelve la metadata ANTES de que
// el componente llame a notFound(), y el título del producto quedaba en el
// payload de la página 404. Mientras no esté publicada, no hay nada que decir.
export function generateMetadata(): Metadata {
  return isPublished(TRABAVOLANTE_STORE) ? METADATA : {};
}

const METADATA: Metadata = {
  title: TRABAVOLANTE.metadata.title,
  description: TRABAVOLANTE.metadata.description,
  // Next NO hace deep-merge de `openGraph` entre layout y page: el objeto de
  // la página REEMPLAZA al del layout. Por eso type/locale/siteName se repiten
  // acá aunque también estén en app/layout.tsx. No los borres.
  openGraph: {
    title: TRABAVOLANTE.metadata.ogTitle,
    description: TRABAVOLANTE.metadata.ogDescription,
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: TRABAVOLANTE.metadata.canonical },
};

export default async function TrabavolantePage() {
  if (!isPublished(TRABAVOLANTE_STORE)) notFound();

  // El poster del video del hero es el LCP de ESTA página (igual que en el
  // parasol). `ReactDOM.preload()` (vs. un <link> JSX) lo hoistea cerca del
  // principio de <head>. Apunta al mismo archivo que el `poster` del <video>.
  ReactDOM.preload(TRABAVOLANTE.heroMedia.poster, {
    as: 'image',
    fetchPriority: 'high',
    type: 'image/webp',
  });

  let productId = '';
  let bundlesData: Record<string, BundleData> = {};
  let price = TRABAVOLANTE.fallbackPricing.price;

  // Los productos del trabavolante todavía no existen: sus productId son ''.
  // Pedirle a Shopify un GID vacío o inventado devuelve un error top-level (no
  // un nodo null), así que filtramos antes de preguntar.
  const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);

  if (ids.length > 0) {
    try {
      const [product, data] = await Promise.all([
        TRABAVOLANTE.brand.productHandle
          ? getProduct(TRABAVOLANTE.brand.productHandle)
          : Promise.resolve(null),
        getBundlesData(ids),
      ]);
      if (product) productId = product.id;
      bundlesData = data;

      const single = TRABAVOLANTE.bundles.find((b) => b.id === 'single');
      const singleData = single ? data[single.productId] : undefined;
      if (singleData) price = singleData.price;
    } catch (err) {
      console.error('[Shopify] No pude traer datos de bundles del trabavolante:', err);
    }
  }

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={TRABAVOLANTE.brand.tagline}
    >
      <CountdownBanner />
      <PromoBar />
      {/* Mismos links que el soporte (default del Navbar): todas las
          landings tienen las mismas secciones. */}
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero config={TRABAVOLANTE} />

        {/* 2. Beneficios en 6 cuadros — "Ponelo. Trabalo. Olvidate." */}
        <UseCases config={TRABAVOLANTE} />

        {/* 3. Compatibilidad — "Entra en cualquier auto" */}
        <CarBrands config={TRABAVOLANTE} />

        {/* 4. Qué incluye — carrusel + caja + reseña, como en / */}
        {/* La foto de la reseña va en el círculo de la opinión, como en /llavero-rescate. */}
        <WhatsInBox
          data={{
            ...TRABAVOLANTE.whatsInBox,
            testimonialPhoto: TRABAVOLANTE.whatsInBox.testimonial?.image,
          }}
        />

        {/* 5. Cómo funciona (3 videos) */}
        <HowItWorks config={TRABAVOLANTE} />

        {/* 6. Comparativa: Titan PRO vs. bastón vs. alarma */}
        <ComparisonTable comparison={TRABAVOLANTE.comparison} bg="ink" />

        {/* 7. Pricing */}
        <Pricing productId={productId} bundlesData={bundlesData} config={TRABAVOLANTE} />

        {/* 8. Specs / beneficios */}
        <BenefitsShowcase config={TRABAVOLANTE} />

        {/* 9. Reseñas: sólo con reseñas reales cargadas */}
        {TRABAVOLANTE.reviews.length > 0 && (
          <Reviews config={TRABAVOLANTE}>
            <ReviewsExpandable reviews={TRABAVOLANTE.reviews} collapseAfter={8} />
          </Reviews>
        )}

        {/* 10. Garantía + medios de pago */}
        <div id="trust">
          <TrustBlock config={TRABAVOLANTE} />
        </div>

        {/* 11. FAQ */}
        <FAQ config={TRABAVOLANTE} />

        {/* 12. CTA final */}
        <BackToPricingCTA config={TRABAVOLANTE} />
      </main>

      <Footer />

      <WhatsAppFloat prefilled={TRABAVOLANTE.whatsappPrefilled} />
      <FloatingCartButton />
      <CartDrawer />

      {productId && (
        <PixelViewContent
          productId={productId}
          name={TRABAVOLANTE.brand.tagline}
          price={price}
        />
      )}
      {productId && (
        <KlaviyoViewedProduct
          productId={productId}
          name={TRABAVOLANTE.brand.tagline}
          price={price}
        />
      )}
    </CartProvider>
  );
}
