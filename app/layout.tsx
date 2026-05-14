import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { TRACKING } from '@/lib/config';
import { MetaPixel } from '@/components/analytics/MetaPixel';
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
  title: 'Soporte Magnético PRO™ — CARMANIA',
  description:
    'El soporte para celular que no se cae. Imán N52 grado militar + base al vacío. Envío gratis y 30 días de devolución.',
  openGraph: {
    title: 'Soporte Magnético PRO™ — CARMANIA',
    description:
      'El soporte para celular que no se cae. Imán N52 + base al vacío. Envío gratis y devolución 30 días.',
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
      <body className="font-sans">
        <MetaPixel pixelId={TRACKING.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        {children}
      </body>
    </html>
  );
}
