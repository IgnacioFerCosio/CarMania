import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
// Removed Vercel-specific analytics packages (migrated to Cloudflare)
import { TRACKING } from '@/lib/config';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import './globals.css';

const GTM_ID = 'GTM-TMK9STLD';

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
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
      <head>
        {/* Google Tag Manager — script principal */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="font-sans">
        {/* Google Tag Manager — noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <MetaPixel pixelId={TRACKING.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        {children}
        {/* Vercel analytics removed — using Cloudflare + GTM + MetaPixel instead */}
        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "7324ac88c1c24a8ab7fe57cca550f06c"}'
        />

        {/* Klaviyo */}
        <Script
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=RLXPcd"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
