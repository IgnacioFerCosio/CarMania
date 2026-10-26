/**
 * Guía de instalación del Soporte Magnético PRO™ — a donde lleva el QR de la
 * caja. Post-compra: no es una página de venta.
 *
 * - Estática: sin Shopify en el build. El CartProvider va igual porque el
 *   header es el de /tienda y trae el botón del carrito; sin `bundlesData`
 *   cae a los precios de config, y sólo habla con Shopify si el cliente ya
 *   tenía un carrito guardado.
 * - noindex y fuera del sitemap (app/sitemap.ts no la lista).
 * - Pixel: sólo el PageView del layout. Acá no se dispara ViewContent.
 *
 * /soporte no tiene página: redirige a / (ver `redirects()` en next.config.js).
 */
import type { Metadata } from 'next';
import { Navbar, storeLinks } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InstallGuide } from '@/components/install/InstallGuide';
import { WhatsAppFloat } from '@/components/overlays/WhatsAppFloat';
import { CartProvider } from '@/components/commerce/CartProvider';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { SOPORTE_INSTALACION } from '@/lib/landings/instalacion/soporte';
import { ALL_UPSELL_CHAINS } from '@/lib/landings';

export const metadata: Metadata = {
  title: SOPORTE_INSTALACION.metadata.title,
  description: SOPORTE_INSTALACION.metadata.description,
  robots: { index: false, follow: true },
};

export default function SoporteInstalacionPage() {
  return (
    <CartProvider bundlesData={{}} upsellChain={ALL_UPSELL_CHAINS}>
      <Navbar
        links={storeLinks('/tienda#productos')}
        ctaHref="/tienda#productos"
        ctaLabel="Ver productos"
      />

      <InstallGuide config={SOPORTE_INSTALACION} />

      <Footer />

      <WhatsAppFloat prefilled={SOPORTE_INSTALACION.help.whatsappPrefilled} />
      <CartDrawer ctaHref="/tienda#productos" />
    </CartProvider>
  );
}
