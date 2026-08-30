/**
 * Home de tienda — grilla de productos de CARMANIA.
 *
 * Server Component. Lee el precio de cada producto de Shopify en el build y
 * cae al fallback de config si la API no responde, igual que `app/page.tsx`.
 *
 * Ojo con el gotcha del proyecto: en Cloudflare Pages no corre ISR, así que
 * estos precios se congelan en el build. Si cambiás un precio en Shopify,
 * hay que redeployar (ver CLAUDE.md → Gotchas).
 */
import type { Metadata } from 'next';
import { PromoBar } from '@/components/layout/PromoBar';
import { Navbar, type NavLink } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StoreHero } from '@/components/sections/StoreHero';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { TrustBlock } from '@/components/sections/TrustBlock';
import { CarBrands } from '@/components/sections/CarBrands';
import { WhatsAppFloat } from '@/components/overlays/WhatsAppFloat';
import { CartProvider } from '@/components/commerce/CartProvider';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { FloatingCartButton } from '@/components/commerce/FloatingCartButton';
import { getProduct, getBundlesData, type BundleData } from '@/lib/shopify';
import { STORE_PRODUCTS, UPSELL_CHAIN, type StoreProduct } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tienda — CARMANIA',
  description:
    'Accesorios premium para tu auto. Envío gratis a todo el país, 3 cuotas sin interés y 30 días de devolución.',
  // Next NO hace deep-merge de `openGraph` entre layout y page: el objeto
  // de la página REEMPLAZA al del layout. Por eso type/locale/siteName se
  // repiten acá aunque también estén en app/layout.tsx. No los borres.
  openGraph: {
    title: 'Tienda — CARMANIA',
    description:
      'Accesorios premium para tu auto. Envío gratis a todo el país y 30 días de devolución.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  alternates: { canonical: '/tienda' },
};

const STORE_LINKS: NavLink[] = [{ href: '#productos', label: 'Productos' }];

// Re-renderizamos cada 5 minutos para reflejar cambios de precio en
// Shopify sin tener que hacer build manual. Mismo valor que app/page.tsx,
// por la misma razón (ver comentario ahí); de adorno mientras el ISR no
// corra en Cloudflare Pages.
export const revalidate = 300;

async function getProducts(): Promise<{ product: StoreProduct; price: number }[]> {
  // Un fetch por producto. Con 1-3 productos no justifica una query batch;
  // si la lista crece, conviene una sola query con `nodes`.
  return Promise.all(
    STORE_PRODUCTS.map(async (product) => {
      try {
        const live = await getProduct(product.handle);
        const amount = live?.priceRange.minVariantPrice.amount;
        return {
          product,
          price: amount ? parseFloat(amount) : product.fallbackPrice,
        };
      } catch (err) {
        console.error(`[Shopify] No pude traer el precio de ${product.handle}:`, err);
        return { product, price: product.fallbackPrice };
      }
    }),
  );
}

async function getBundles(): Promise<Record<string, BundleData>> {
  // El carrito se comparte con la landing (persiste entre páginas), así que
  // necesita los mismos precios. UPSELL_CHAIN, no BUNDLES: incluye también
  // Pack x4/x5/x6 (solo alcanzables vía el upsell del carrito). Sin esto,
  // `buildTiers` igual funciona para esos 3 niveles — cae a los
  // `fallbackVariantId`/`fallbackPrice` de config — pero mostraría un precio
  // desactualizado hasta que el refetch client-side lo corrija (y ese
  // refetch puede fallar en silencio, ver lib/tiers.ts).
  try {
    return await getBundlesData(UPSELL_CHAIN.map((t) => t.productId));
  } catch (err) {
    console.error('[Shopify] No pude traer datos de bundles:', err);
    return {};
  }
}

export default async function TiendaPage() {
  // Los precios de STORE_PRODUCTS y los de BUNDLES no dependen entre sí —
  // los pedimos en paralelo en vez de esperar uno para arrancar el otro
  // (mismo criterio que app/page.tsx).
  const [products, bundlesData] = await Promise.all([getProducts(), getBundles()]);

  return (
    <CartProvider bundlesData={bundlesData}>
      <PromoBar />
      <Navbar links={STORE_LINKS} homeHref="/tienda" ctaHref="#productos" />

      <main>
        <StoreHero />
        <ProductGrid products={products} />
        <div id="trust">
          <TrustBlock />
        </div>
        <CarBrands />
      </main>

      <Footer />

      <WhatsAppFloat />
      <FloatingCartButton />
      <CartDrawer ctaHref="#productos" />
    </CartProvider>
  );
}
