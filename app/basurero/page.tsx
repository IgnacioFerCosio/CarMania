/**
 * Landing del Basurero Elegance PRO™.
 *
 * ESQUELETO: misma estructura y componentes que /inflador y /trabavolante;
 * lo único que cambia es la config que reciben las secciones:
 *   hero → beneficios en cuadros → qué incluye → cómo funciona → packs →
 *   comparativa → reseñas → garantía → FAQ → CTA final.
 *
 * Sin CarBrands ni TimeRace por ahora (TimeRace tiene las escenas del
 * trabavolante; CarBrands se suma si el producto resulta universal).
 *
 * Las reseñas salen sólo cuando haya reales cargadas en la config.
 *
 * Ojo: todo el contenido es placeholder. Los 3 productos todavía no existen
 * en Shopify (productId en ''), así que los botones de compra quedan
 * deshabilitados a propósito, y todas las imágenes son "FOTO PENDIENTE".
 * Ver el checklist en docs/superpowers/specs/basurero-assets.md.
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
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ComparisonTable } from '@/components/advertorial/ComparisonTable';
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
import { BASURERO } from '@/lib/landings/basurero';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, isPublished } from '@/lib/config';

const BASURERO_STORE = STORE_PRODUCTS.find((p) => p.href === '/basurero')!;
export const revalidate = 300;

// `generateMetadata` y no `metadata`: ver app/trabavolante/page.tsx.
export function generateMetadata(): Metadata {
  return isPublished(BASURERO_STORE) ? METADATA : {};
}

const METADATA: Metadata = {
  title: BASURERO.metadata.title,
  description: BASURERO.metadata.description,
  // Next NO hace deep-merge de `openGraph` entre layout y page: el objeto de
  // la página REEMPLAZA al del layout. No borres type/locale/siteName.
  openGraph: {
    title: BASURERO.metadata.ogTitle,
    description: BASURERO.metadata.ogDescription,
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: BASURERO.metadata.canonical },
};

export default async function BasureroPage() {
  if (!isPublished(BASURERO_STORE)) notFound();

  // La imagen del hero es el LCP de esta página.
  ReactDOM.preload(BASURERO.heroMedia.src, {
    as: 'image',
    fetchPriority: 'high',
    type: 'image/webp',
  });

  let productId = '';
  let bundlesData: Record<string, BundleData> = {};
  let price = BASURERO.fallbackPricing.price;

  // Pedirle a Shopify un GID vacío devuelve un error top-level (no un nodo
  // null), así que filtramos los productos que todavía no existen.
  const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);

  if (ids.length > 0) {
    try {
      const [product, data] = await Promise.all([
        BASURERO.brand.productHandle
          ? getProduct(BASURERO.brand.productHandle)
          : Promise.resolve(null),
        getBundlesData(ids),
      ]);
      if (product) productId = product.id;
      bundlesData = data;

      const single = BASURERO.bundles.find((b) => b.id === 'single');
      const singleData = single ? data[single.productId] : undefined;
      if (singleData) price = singleData.price;
    } catch (err) {
      console.error('[Shopify] No pude traer datos de bundles del basurero:', err);
    }
  }

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={BASURERO.brand.tagline}
    >
      <CountdownBanner />
      <PromoBar />
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero config={BASURERO} />

        {/* 2. Beneficios en 6 cuadros */}
        <UseCases config={BASURERO} />

        {/* 3. Qué incluye */}
        <WhatsInBox data={BASURERO.whatsInBox} />

        {/* 4. Cómo funciona (3 pasos) */}
        <HowItWorks config={BASURERO} />

        {/* 5. Pricing */}
        <Pricing productId={productId} bundlesData={bundlesData} config={BASURERO} />

        {/* 6. Comparativa */}
        <ComparisonTable comparison={BASURERO.comparison} bg="ink" />

        {/* 7. Reseñas: sólo con reseñas reales cargadas */}
        {BASURERO.reviews.length > 0 && (
          <Reviews config={BASURERO}>
            <ReviewsExpandable reviews={BASURERO.reviews} collapseAfter={8} />
          </Reviews>
        )}

        {/* 8. Garantía + medios de pago */}
        <div id="trust">
          <TrustBlock config={BASURERO} />
        </div>

        {/* 9. FAQ */}
        <FAQ config={BASURERO} />

        {/* 10. CTA final */}
        <BackToPricingCTA config={BASURERO} />
      </main>

      <Footer />

      <WhatsAppFloat prefilled={BASURERO.whatsappPrefilled} />
      <FloatingCartButton />
      <CartDrawer />

      {productId && (
        <PixelViewContent productId={productId} name={BASURERO.brand.tagline} price={price} />
      )}
      {productId && (
        <KlaviyoViewedProduct productId={productId} name={BASURERO.brand.tagline} price={price} />
      )}
    </CartProvider>
  );
}
