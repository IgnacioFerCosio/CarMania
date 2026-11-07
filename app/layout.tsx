import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
// Removed Vercel-specific analytics packages (migrated to Cloudflare)
import { TRACKING } from '@/lib/config';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { TikTokPixel } from '@/components/analytics/TikTokPixel';
import './globals.css';

// Cargamos Inter en su versión variable para tener todos los pesos (incluido 900)
// y ambos estilos (normal + italic). Eso nos habilita los headlines en
// "BOLD ITALIC UPPERCASE" sin tener que sumar otra fuente.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oferta.carmaniaoficial.com'),
  // El title/description/canonical los define cada página: este layout lo
  // comparten la landing del soporte y la home de tienda. Lo que queda acá
  // es solo lo que vale para todo el sitio.
  title: {
    default: 'CARMANIA',
    template: '%s',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  robots: { index: true, follow: true },
  // Monograma CM. El SVG es el que usan los navegadores modernos; los PNG de
  // 32 y 192 (múltiplo de 48, lo que pide Google) son el respaldo, y el
  // apple-touch es cuadrado y sin esquinas porque iOS las redondea solo.
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={inter.variable}>
      {/* Sin Google Tag Manager (2026-09-21): el contenedor GTM-TMK9STLD
          tenía una sola etiqueta, GA4 (G-0Z48MJSSZ2), y GA4 no se usa. Eran
          290 KB y ~260 ms de main thread por visita — el INP de producción
          estaba en 81% "bueno" y los terceros eran la causa. La analítica
          queda en Cloudflare Web Analytics + Meta Pixel + Klaviyo, que van
          por su cuenta. Si vuelve, hay que reabrir googletagmanager.com y
          google-analytics.com en las DOS CSP (_headers y next.config.js). */}
      <body className="font-sans">
        <MetaPixel pixelId={TRACKING.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        <TikTokPixel pixelId={TRACKING.tiktokPixelId} />
        {children}
        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "7324ac88c1c24a8ab7fe57cca550f06c"}'
        />

        {/* Klaviyo. `lazyOnload` (después de window.load) y no
            `afterInteractive`: no hay nada de Klaviyo above the fold, y los
            eventos de lib/tracking.ts van a la cola `_learnq`, que el script
            drena cuando carga. Sacarlo del camino crítico le devuelve ~200 ms
            de main thread a la hidratación en celulares lentos. */}
        <Script
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=RLXPcd"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
