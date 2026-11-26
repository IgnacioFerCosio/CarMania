/**
 * Landing del Inflador Pulse PRO™.
 *
 * Misma estructura y componentes que /trabavolante; lo único que cambia es la
 * config que reciben las secciones:
 *   hero → beneficios en cuadros → marcas → qué incluye → cómo funciona → packs →
 *   comparativa → reseñas → garantía → FAQ → CTA final.
 *
 * Sin TimeRace (sus escenas son las del trabavolante).
 *
 * Las reseñas salen sólo cuando haya reales cargadas en la config.
 *
 * Ojo: los 3 productos todavía no existen en Shopify (productId en ''), así
 * que los botones de compra quedan deshabilitados a propósito, y los pasos y
 * los packs siguen con placeholders "FOTO PENDIENTE". Ver el checklist en
 * docs/superpowers/specs/inflador-assets.md.
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
import { INFLADOR } from '@/lib/landings/inflador';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, isPublished } from '@/lib/config';

const INFLADOR_STORE = STORE_PRODUCTS.find((p) => p.href === '/inflador')!;
export const revalidate = 300;

// `generateMetadata` y no `metadata`: ver app/trabavolante/page.tsx.
export function generateMetadata(): Metadata {
  return isPublished(INFLADOR_STORE) ? METADATA : {};
}

const METADATA: Metadata = {
  title: INFLADOR.metadata.title,
  description: INFLADOR.metadata.description,
  // Next NO hace deep-merge de `openGraph` entre layout y page: el objeto de
  // la página REEMPLAZA al del layout. No borres type/locale/siteName.
  openGraph: {
    title: INFLADOR.metadata.ogTitle,
    description: INFLADOR.metadata.ogDescription,
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: INFLADOR.metadata.canonical },
};

export default async function InfladorPage() {
  if (!isPublished(INFLADOR_STORE)) notFound();

  // El poster del video del hero es el LCP de esta página (como en
  // /trabavolante). Apunta al mismo archivo que el `poster` del <video>.
  ReactDOM.preload(INFLADOR.heroMedia.poster, {
    as: 'image',
    fetchPriority: 'high',
    type: 'image/webp',
  });

  let productId = '';
  let bundlesData: Record<string, BundleData> = {};
  let price = INFLADOR.fallbackPricing.price;

  // Pedirle a Shopify un GID vacío devuelve un error top-level (no un nodo
  // null), así que filtramos los productos que todavía no existen.
  const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);

  if (ids.length > 0) {
    try {
      const [product, data] = await Promise.all([
        INFLADOR.brand.productHandle
          ? getProduct(INFLADOR.brand.productHandle)
          : Promise.resolve(null),
        getBundlesData(ids),
      ]);
      if (product) productId = product.id;
      bundlesData = data;

      const single = INFLADOR.bundles.find((b) => b.id === 'single');
      const singleData = single ? data[single.productId] : undefined;
      if (singleData) price = singleData.price;
    } catch (err) {
      console.error('[Shopify] No pude traer datos de bundles del inflador:', err);
    }
  }

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={INFLADOR.brand.tagline}
    >
      <CountdownBanner />
      <PromoBar />
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero config={INFLADOR} />

        {/* 2. Beneficios en 6 cuadros — "Elegí. Apretá. Listo." */}
        <UseCases config={INFLADOR} />

        {/* 3. Compatibilidad — "Sirve en cualquier auto" (los logos del soporte) */}
        <CarBrands config={INFLADOR} />

        {/* 4. Qué incluye */}
        {/* La foto de la reseña va en el círculo de la opinión, como en /trabavolante. */}
        <WhatsInBox
          data={{
            ...INFLADOR.whatsInBox,
            testimonialPhoto: INFLADOR.whatsInBox.testimonial?.image,
          }}
        />

        {/* 4. Cómo funciona (3 pasos) */}
        <HowItWorks config={INFLADOR} />

        {/* 5. Pricing */}
        <Pricing productId={productId} bundlesData={bundlesData} config={INFLADOR} />

        {/* 6. Comparativa: Pulse PRO vs. compresor 12 V vs. estación de servicio */}
        <ComparisonTable comparison={INFLADOR.comparison} bg="ink" />

        {/* 7. Reseñas: sólo con reseñas reales cargadas */}
        {INFLADOR.reviews.length > 0 && (
          <Reviews config={INFLADOR}>
            <ReviewsExpandable reviews={INFLADOR.reviews} collapseAfter={8} />
          </Reviews>
        )}

        {/* 8. Garantía + medios de pago */}
        <div id="trust">
          <TrustBlock config={INFLADOR} />
        </div>

        {/* 9. FAQ */}
        <FAQ config={INFLADOR} />

        {/* 10. CTA final */}
        <BackToPricingCTA config={INFLADOR} />
      </main>

      <Footer />

      <WhatsAppFloat prefilled={INFLADOR.whatsappPrefilled} />
      <FloatingCartButton />
      <CartDrawer />

      {productId && (
        <PixelViewContent productId={productId} name={INFLADOR.brand.tagline} price={price} />
      )}
      {productId && (
        <KlaviyoViewedProduct productId={productId} name={INFLADOR.brand.tagline} price={price} />
      )}
    </CartProvider>
  );
}
