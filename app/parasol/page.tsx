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
