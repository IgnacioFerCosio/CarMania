/**
 * Landing del Soplador Turbo PRO™.
 *
 * Misma estructura y componentes que la del parasol (`app/parasol/page.tsx`):
 * lo único que cambia es la config que reciben las secciones.
 *
 * Una diferencia de armado respecto del parasol, a propósito: no se
 * renderiza `CarBrands`. Un soplador no tiene compatibilidad por marca de
 * auto, así que la tira de logos sería relleno. Los dos `PitchBlock` ("El
 * polvo siempre gana en los rincones" y "Dejá de comprar latas") tampoco
 * van, igual que en /parasol; su copy sigue en `SOPLADOR.pitchBlocks`.
 *
 * Ojo: los 3 productos todavía no existen en Shopify (productId en ''), así
 * que los botones de compra quedan deshabilitados a propósito. Ver el
 * checklist en docs/superpowers/specs/soplador-assets.md.
 *
 * MIENTRAS el soplador tenga `comingSoon: true` en STORE_PRODUCTS esta ruta
 * responde 404: la landing está en producción pero no se puede abrir. El
 * catálogo la muestra como "Próximamente". Sacar el flag la publica. En
 * `npm run dev` se abre igual (ver `isPublished`).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactDOM from 'react-dom';
import { Navbar, type NavLink } from '@/components/layout/Navbar';
import { CountdownBanner } from '@/components/layout/CountdownBanner';
import { PromoBar } from '@/components/layout/PromoBar';
import { Hero } from '@/components/sections/Hero';
import { UseCases } from '@/components/sections/UseCases';
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
import { SOPLADOR } from '@/lib/landings/soplador';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, isPublished } from '@/lib/config';

const SOPLADOR_STORE = STORE_PRODUCTS.find((p) => p.href === '/soplador')!;
export const revalidate = 300;

// `generateMetadata` y no `metadata`: Next resuelve la metadata ANTES de que
// el componente llame a notFound(), y el título del producto quedaba en el
// payload de la página 404. Mientras no esté publicada, no hay nada que decir.
export function generateMetadata(): Metadata {
  return isPublished(SOPLADOR_STORE) ? METADATA : {};
}

const METADATA: Metadata = {
  title: SOPLADOR.metadata.title,
  description: SOPLADOR.metadata.description,
  // Next NO hace deep-merge de `openGraph` entre layout y page: el objeto de
  // la página REEMPLAZA al del layout. Por eso type/locale/siteName se repiten
  // acá aunque también estén en app/layout.tsx. No los borres.
  openGraph: {
    title: SOPLADOR.metadata.ogTitle,
    description: SOPLADOR.metadata.ogDescription,
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: SOPLADOR.metadata.canonical },
};

const SOPLADOR_LINKS: NavLink[] = [
  { href: '#how', label: 'Cómo funciona' },
  { href: '#pricing', label: 'Oferta', highlight: true },
  { href: '#reviews', label: 'Opiniones' },
  { href: '#faq', label: 'FAQ' },
];

export default async function SopladorPage() {
  if (!isPublished(SOPLADOR_STORE)) notFound();

  // La imagen del hero es el LCP de ESTA página. `ReactDOM.preload()` (vs. un
  // <link> JSX) la hoistea cerca del principio de <head>. Apunta al archivo
  // real — el <img> del hero también, sin doble fetch.
  ReactDOM.preload(SOPLADOR.heroMedia.src, {
    as: 'image',
    fetchPriority: 'high',
    type: 'image/webp',
  });

  let productId = '';
  let bundlesData: Record<string, BundleData> = {};
  let price = SOPLADOR.fallbackPricing.price;

  // Los productos del soplador todavía no existen: sus productId son ''.
  // Pedirle a Shopify un GID vacío o inventado devuelve un error top-level (no
  // un nodo null), así que filtramos antes de preguntar.
  const ids = ALL_UPSELL_CHAINS.map((t) => t.productId).filter(Boolean);

  if (ids.length > 0) {
    try {
      const [product, data] = await Promise.all([
        SOPLADOR.brand.productHandle
          ? getProduct(SOPLADOR.brand.productHandle)
          : Promise.resolve(null),
        getBundlesData(ids),
      ]);
      if (product) productId = product.id;
      bundlesData = data;

      const single = SOPLADOR.bundles.find((b) => b.id === 'single');
      const singleData = single ? data[single.productId] : undefined;
      if (singleData) price = singleData.price;
    } catch (err) {
      console.error('[Shopify] No pude traer datos de bundles del soplador:', err);
    }
  }

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={SOPLADOR.brand.tagline}
    >
      <CountdownBanner />
      <PromoBar />
      <Navbar links={SOPLADOR_LINKS} ctaHref="#pricing" />

      <main>
        {/* 1. Hero */}
        <Hero config={SOPLADOR} />

        {/* 2. Grid de dónde se usa */}
        <UseCases config={SOPLADOR} />

        {/* 3. Antes / después — las rejillas con y sin una pasada */}
        {SOPLADOR.beforeAfter && <BeforeAfter data={SOPLADOR.beforeAfter} />}

        {/* 4. Cómo funciona (3 videos) */}
        <HowItWorks config={SOPLADOR} />

        {/* 5. Pricing */}
        <Pricing productId={productId} bundlesData={bundlesData} config={SOPLADOR} />

        {/* 6. Specs / beneficios */}
        <BenefitsShowcase config={SOPLADOR} />

        {/* 7. Reseñas */}
        <Reviews config={SOPLADOR}>
          <ReviewsExpandable reviews={SOPLADOR.reviews} collapseAfter={8} />
        </Reviews>

        {/* 8. Garantía + medios de pago */}
        <div id="trust">
          <TrustBlock config={SOPLADOR} />
        </div>

        {/* 9. FAQ */}
        <FAQ config={SOPLADOR} />

        {/* 10. CTA final */}
        <BackToPricingCTA config={SOPLADOR} />
      </main>

      <Footer />

      <WhatsAppFloat prefilled={SOPLADOR.whatsappPrefilled} />
      <FloatingCartButton />
      <CartDrawer />

      {productId && (
        <PixelViewContent
          productId={productId}
          name={SOPLADOR.brand.tagline}
          price={price}
        />
      )}
      {productId && (
        <KlaviyoViewedProduct
          productId={productId}
          name={SOPLADOR.brand.tagline}
          price={price}
        />
      )}
    </CartProvider>
  );
}
