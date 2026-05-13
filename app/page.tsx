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
import { getProduct } from '@/lib/shopify';
import { BRAND, FALLBACK_PRICING } from '@/lib/config';

// Re-renderizamos cada 5 minutos para reflejar cambios de precio en
// Shopify sin tener que hacer build manual.
export const revalidate = 300;

export default async function HomePage() {
  let variantId = '';
  let productId = '';
  let price: number = FALLBACK_PRICING.price;
  let compareAt: number | null = FALLBACK_PRICING.compareAtPrice;

  try {
    const product = await getProduct(BRAND.productHandle);
    if (product && product.variants[0]) {
      productId = product.id;
      variantId = product.variants[0].id;
      price = parseFloat(product.variants[0].price.amount);
      compareAt = product.variants[0].compareAtPrice
        ? parseFloat(product.variants[0].compareAtPrice.amount)
        : FALLBACK_PRICING.compareAtPrice;
    }
  } catch (err) {
    console.error('[Shopify] No pude traer el producto:', err);
  }

  return (
    <>
      {/* Header stack */}
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
          variantId={variantId}
          productId={productId}
          price={price}
          compareAtPrice={compareAt}
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

      {/* Overlays: sticky ATC + WhatsApp + insignia de garantía */}
      {variantId && (
        <StickyATC
          variantId={variantId}
          productId={productId}
          price={price}
          compareAtPrice={compareAt}
        />
      )}
      <WhatsAppFloat />
      {/* <GuaranteeBadge /> */}

      {/* Tracking — fire-and-forget */}
      {productId && (
        <PixelViewContent productId={productId} name={BRAND.tagline} price={price} />
      )}
    </>
  );
}
