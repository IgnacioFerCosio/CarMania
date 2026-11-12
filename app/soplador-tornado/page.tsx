/**
 * Landing del Soplador Tornado PRO™.
 *
 * Misma estructura que `/soplador` (Turbo PRO, pausado): cambia sólo la
 * config. Diferencias a propósito:
 *   - Sin `CarBrands` ni `PitchBlock`, igual que /soplador.
 *   - `Reviews` sólo si `TORNADO.reviews` tiene alguna.
 *
 * Los 3 productos todavía no existen en Shopify (productId en ''), así que
 * los botones de compra quedan deshabilitados. Material pendiente: ver
 * docs/superpowers/specs/soplador-tornado-assets.md.
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
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { HowItWorks } from '@/components/sections/HowItWorks';
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
import { TORNADO } from '@/lib/landings/tornado';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, isPublished } from '@/lib/config';

const TORNADO_STORE = STORE_PRODUCTS.find((p) => p.href === '/soplador-tornado')!;
export const revalidate = 300;

// `generateMetadata` y no `metadata`: ver app/soplador/page.tsx.
export function generateMetadata(): Metadata {
  return isPublished(TORNADO_STORE) ? METADATA : {};
}

const METADATA: Metadata = {
  title: TORNADO.metadata.title,
  description: TORNADO.metadata.description,
  // Next no hace deep-merge de `openGraph`: type/locale/siteName se repiten.
  openGraph: {
    title: TORNADO.metadata.ogTitle,
    description: TORNADO.metadata.ogDescription,
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: TORNADO.metadata.canonical },
};

export default async function SopladorTornadoPage() {
  if (!isPublished(TORNADO_STORE)) notFound();

  // La imagen del hero es el LCP de esta página.
  ReactDOM.preload(TORNADO.heroMedia.src, {
    as: 'image',
    fetchPriority: 'high',
    type: 'image/webp',
  });

  let productId = '';
  let bundlesData: Record<string, BundleData> = {};
  let price = TORNADO.fallbackPricing.price;

  // GIDs vacíos (productos que no existen todavía) se filtran antes de
  // preguntarle a Shopify: un GID vacío da error top-level.
  const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);
  const tornadoExiste = TORNADO.bundles.some((b) => b.productId);

  if (ids.length > 0) {
    try {
      const [product, data] = await Promise.all([
        tornadoExiste ? getProduct(TORNADO.brand.productHandle) : Promise.resolve(null),
        getBundlesData(ids),
      ]);
      if (product) productId = product.id;
      bundlesData = data;

      const single = TORNADO.bundles.find((b) => b.id === 'single');
      const singleData = single ? data[single.productId] : undefined;
      if (singleData) price = singleData.price;
    } catch (err) {
      console.error('[Shopify] No pude traer datos de bundles del tornado:', err);
    }
  }

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={TORNADO.brand.tagline}
    >
      <CountdownBanner />
      <PromoBar />
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero config={TORNADO} />

        {/* 2. Usos */}
        <UseCases config={TORNADO} />

        {/* 3. Qué incluye */}
        {TORNADO.whatsInBox && <WhatsInBox data={TORNADO.whatsInBox} />}

        {/* 4. Antes / después — la vereda con y sin hojas */}
        {TORNADO.beforeAfter && <BeforeAfter data={TORNADO.beforeAfter} />}

        {/* 5. Cómo funciona (3 videos) */}
        <HowItWorks config={TORNADO} />

        {/* 6. Pricing */}
        <Pricing productId={productId} bundlesData={bundlesData} config={TORNADO} />

        {/* 7. Beneficios */}
        <BenefitsShowcase config={TORNADO} />

        {/* 8. Reseñas — sólo con reseñas reales */}
        {TORNADO.reviews.length > 0 && (
          <Reviews config={TORNADO}>
            <ReviewsExpandable reviews={TORNADO.reviews} collapseAfter={8} />
          </Reviews>
        )}

        {/* 9. Garantía + medios de pago */}
        <div id="trust">
          <TrustBlock config={TORNADO} />
        </div>

        {/* 10. FAQ */}
        <FAQ config={TORNADO} />

        {/* 11. CTA final */}
        <BackToPricingCTA config={TORNADO} />
      </main>

      <Footer />

      <WhatsAppFloat prefilled={TORNADO.whatsappPrefilled} />
      <FloatingCartButton />
      <CartDrawer />

      {productId && (
        <PixelViewContent productId={productId} name={TORNADO.brand.tagline} price={price} />
      )}
      {productId && (
        <KlaviyoViewedProduct productId={productId} name={TORNADO.brand.tagline} price={price} />
      )}
    </CartProvider>
  );
}
