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
import { BUNDLES, STORE_PRODUCTS, type StoreProduct } from '@/lib/config';

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

export default async function TiendaPage() {
  // Un fetch por producto. Con 1-3 productos no justifica una query batch;
  // si la lista crece, conviene una sola query con `nodes`.
  const products: { product: StoreProduct; price: number }[] = await Promise.all(
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

  // El carrito se comparte con la landing (persiste entre páginas), así que
  // necesita los mismos precios de bundles. Sin esto `buildTiers` igual
  // funciona — cae a los `fallbackVariantId` de config — pero el drawer
  // mostraría precios de fallback y el visitante vería números distintos a
  // los de la landing.
  let bundlesData: Record<string, BundleData> = {};
  try {
    bundlesData = await getBundlesData(BUNDLES.map((b) => b.productId));
  } catch (err) {
    console.error('[Shopify] No pude traer datos de bundles:', err);
  }

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
      <CartDrawer />
    </CartProvider>
  );
}
