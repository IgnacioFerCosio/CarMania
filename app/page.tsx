/**
 * Página principal del landing — flujo rediseñado.
 *
 * Server Component — fetchea el producto de Shopify en build/SSR (con ISR
 * cada 5 min) y le pasa los precios + variantId a los componentes de
 * conversión que sí son client (BuyButton, StickyATC).
 *
 * Si la Storefront API falla o el handle no existe, usa los fallbacks de
 * lib/config.ts para que el landing nunca quede roto.
 */
import { Navbar } from '@/components/layout/Navbar';
import { CountdownBanner } from '@/components/layout/CountdownBanner';
import { PromoBar } from '@/components/layout/PromoBar';
import { SubPromoBar } from '@/components/layout/SubPromoBar';
import { Hero } from '@/components/sections/Hero';
import { UseCases } from '@/components/sections/UseCases';
import { CarBrands } from '@/components/sections/CarBrands';
import { WhatsInBox } from '@/components/sections/WhatsInBox';
import { TechSpecs } from '@/components/sections/TechSpecs';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Reviews } from '@/components/sections/Reviews';
import { Pricing } from '@/components/sections/Pricing';
import { Surfaces } from '@/components/sections/Surfaces';
import { FAQ } from '@/components/sections/FAQ';
import { BackToPricingCTA } from '@/components/sections/BackToPricingCTA';
import { TrustBlock } from '@/components/sections/TrustBlock';
// import { FinalCTA } from '@/components/sections/FinalCTA'; // ← deshabilitado
import { Footer } from '@/components/layout/Footer';
import { StickyATC } from '@/components/commerce/StickyATC';
import { WhatsAppFloat } from '@/components/overlays/WhatsAppFloat';
import { GuaranteeBadge } from '@/components/overlays/GuaranteeBadge';
import { PixelViewContent } from '@/components/analytics/MetaPixel';
import { getProduct, getBundlesData, type BundleData } from '@/lib/shopify';
import { BRAND, BUNDLES, FALLBACK_PRICING } from '@/lib/config';

// Re-renderizamos cada 5 minutos para reflejar cambios de precio en
// Shopify sin tener que hacer build manual.
export const revalidate = 300;

export default async function HomePage() {
  let productId = '';
  // Mapa { [productId]: { variantId, price, compareAtPrice } }
  let bundlesData: Record<string, BundleData> = {};

  // Precio base para PixelViewContent (single bundle)
  let price: number = FALLBACK_PRICING.price;

  try {
    const [product, data] = await Promise.all([
      getProduct(BRAND.productHandle),
      getBundlesData(BUNDLES.map((b) => b.productId)),
    ]);
    if (product) productId = product.id;
    bundlesData = data;

    const singleBundle = BUNDLES.find((b) => b.id === 'single')!;
    const singleData = data[singleBundle.productId];
    if (singleData) price = singleData.price;
  } catch (err) {
    console.error('[Shopify] No pude traer datos de bundles:', err);
  }

  // StickyATC usa el bundle recomendado (x2)
  const recommendedBundle = BUNDLES.find((b) => b.recommended)!;
  const stickyData = bundlesData[recommendedBundle.productId];
  const stickyVariantId = stickyData?.variantId ?? '';
  const stickyPrice = stickyData?.price ?? recommendedBundle.fallbackPrice;
  const stickyCompare = stickyData?.compareAtPrice ?? recommendedBundle.fallbackCompare;

  return (
    <>
      {/* Header stack */}
      <CountdownBanner />
      <PromoBar />
      <Navbar />
      {/* <SubPromoBar /> */}

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Casos de uso (grid 6 cards) */}
        <UseCases />

        {/* 3. Marcas compatibles (strip) */}
        <CarBrands />

        {/* 4. Qué incluye / "Unpack it" */}
        <WhatsInBox />

        {/* 5. Cómo funciona (3 pasos con foto) */}
        <HowItWorks />

        {/* 7. Pricing (bloque de conversión principal) */}
        <Pricing
          productId={productId}
          bundlesData={bundlesData}
        />

        {/* 7.5 Superficies compatibles (strip lifestyle) */}
        <Surfaces />

        {/* 6. Specs técnicas / Nano-tech */}
        <TechSpecs />

        

        {/* 6. Reseñas */}
        <Reviews />

        {/* 9. Compra segura (devolución / MP / envío) */}
        <div id="trust">
          <TrustBlock />
        </div>

        {/* 8. FAQ */}
        <FAQ />

        {/* 10. CTA final — devuelve al pricing */}
        <BackToPricingCTA />

        {/* <FinalCTA /> */}
      </main>

      <Footer />

      {/* Overlays: sticky ATC — usa el bundle recomendado (x2) */}
      {/* {stickyVariantId && (
        <StickyATC
          variantId={stickyVariantId}
          productId={productId}
          price={stickyPrice}
          compareAtPrice={stickyCompare}
        />
      )} */}
      <WhatsAppFloat />
      {/* <GuaranteeBadge /> */}

      {/* Tracking — fire-and-forget */}
      {productId && (
        <PixelViewContent productId={productId} name={BRAND.tagline} price={price} />
      )}
    </>
  );
}
