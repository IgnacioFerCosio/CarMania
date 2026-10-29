/**
 * Landing del Llavero Rescate PRO™ — tipo advertorial.
 *
 * No es una landing de producto como /parasol: es una nota larga que cuenta
 * una historia (inundación, puertas trabadas), desarma el mito del
 * apoyacabezas, demuestra que funciona con el vidrio de prueba y recién al
 * final vende. Fondos alternados: negro para hero, prueba y oferta; blanco
 * para las partes "nota", que se leen como un artículo.
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
 * entera (ver `isPublished` / `showsDrafts`). Las secciones que esperan
 * material real (bombero, reseñas) siguen la misma regla.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar, type NavLink } from '@/components/layout/Navbar';
import { PromoBar } from '@/components/layout/PromoBar';
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
import { AdvertorialHero } from '@/components/advertorial/AdvertorialHero';
import { StoryBlock } from '@/components/advertorial/StoryBlock';
import { ProofBlock } from '@/components/advertorial/ProofBlock';
import { StepsGrid } from '@/components/advertorial/StepsGrid';
import { ComparisonTable } from '@/components/advertorial/ComparisonTable';
import { ExpertVideo } from '@/components/advertorial/ExpertVideo';
import { BoxContents } from '@/components/advertorial/BoxContents';
import { ReviewsPlaceholder } from '@/components/advertorial/ReviewsPlaceholder';
import { GuaranteeBlock } from '@/components/advertorial/GuaranteeBlock';
import { ClosingBlock } from '@/components/advertorial/ClosingBlock';
import { StickyCTA } from '@/components/advertorial/StickyCTA';
import { getProduct, getBundlesData, type BundleData } from '@/lib/shopify';
import { ROMPEVIDRIOS } from '@/lib/landings/rompevidrios';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';
import { STORE_PRODUCTS, isPublished, showsDrafts } from '@/lib/config';

const STORE = STORE_PRODUCTS.find((p) => p.href === '/rompevidrios')!;
const ADV = ROMPEVIDRIOS.advertorial;
export const revalidate = 300;

// Las secciones de la nota no son las de las otras landings: el nav apunta a
// las que existen acá.
const LINKS: NavLink[] = [
  { href: '#how', label: 'Cómo funciona' },
  { href: '#packs', label: 'Packs', highlight: true },
  { href: '#garantia', label: 'Garantía' },
  { href: '#faq', label: 'FAQ' },
];

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
  // El bombero sin video real no sale en producción (en dev/preview, con placeholder).
  const showExpert = !ADV.expert.media.pending || drafts;

  return (
    <CartProvider
      bundlesData={bundlesData}
      upsellChain={ALL_UPSELL_CHAINS}
      productName={ROMPEVIDRIOS.brand.tagline}
    >
      {/* Sin CountdownBanner: en esta landing no hay contadores de urgencia. */}
      <PromoBar messages={[ADV.promoBar]} />
      <Navbar links={LINKS} ctaHref={ADV.cta.href} ctaLabel="Ver packs" />

      <main>
        {/* 3. Hero */}
        <AdvertorialHero
          hero={ADV.hero}
          cta={ADV.cta}
          socialProofCount={ROMPEVIDRIOS.brand.socialProofCount}
          rating={ROMPEVIDRIOS.brand.averageRating}
        />

        {/* 4. Escenario */}
        <StoryBlock
          title={ADV.story.title}
          paragraphs={ADV.story.paragraphs}
          media={ADV.story.media}
          mediaAfter={ADV.story.mediaAfter}
          closing={ADV.story.closing}
        />

        {/* 5. El mito */}
        <StoryBlock
          title={ADV.myth.title}
          paragraphs={ADV.myth.paragraphs}
          media={ADV.myth.media}
          narrowMedia
        />

        {/* 6. El test de 3 segundos */}
        <ProofBlock proof={ADV.proof} cta={ADV.cta} />

        {/* 7. Cómo funciona */}
        <StepsGrid steps={ADV.steps} />

        {/* 8. Comparativa */}
        <ComparisonTable comparison={ADV.comparison} />

        {/* 9. Bombero voluntario */}
        {showExpert && <ExpertVideo expert={ADV.expert} />}

        {/* 10. Qué viene en la caja */}
        <BoxContents box={ADV.box} />

        {/* 11. Reseñas: sólo reales. Sin ninguna, placeholder en dev/preview
            y nada en producción. */}
        {hasReviews ? (
          <Reviews config={ROMPEVIDRIOS} />
        ) : (
          drafts && <ReviewsPlaceholder reviews={ADV.reviews} />
        )}

        {/* 12. Elegí tu pack — los únicos botones que agregan al carrito */}
        <Pricing
          id="packs"
          productId={productId}
          bundlesData={bundlesData}
          config={ROMPEVIDRIOS}
          sub={ADV.packs.sub}
          footnote={ADV.packs.footnote}
          bundleMedia={{
            single: <MediaSlot slot={ADV.packs.images.single} sizes="(min-width: 768px) 33vw, 100vw" />,
            double: <MediaSlot slot={ADV.packs.images.double} sizes="(min-width: 768px) 33vw, 100vw" />,
            triple: <MediaSlot slot={ADV.packs.images.triple} sizes="(min-width: 768px) 33vw, 100vw" />,
          }}
        />

        {/* 13. Preguntas frecuentes */}
        <FAQ config={ROMPEVIDRIOS} tone="light" />

        {/* 14. Garantía */}
        <GuaranteeBlock guarantee={ADV.guarantee} />

        {/* 15. Cierre */}
        <ClosingBlock closing={ADV.closing} cta={ADV.cta} />
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
