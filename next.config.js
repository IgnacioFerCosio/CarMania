/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // No exponemos en los headers que el sitio corre sobre Next.js.
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
    // AVIF primero (pesa ~25% menos que WebP); el navegador que no lo
    // soporte cae a WebP automáticamente.
    formats: ['image/avif', 'image/webp'],
  },

  // En el deploy de PRODUCCIÓN, cualquier visita por la URL *.vercel.app
  // se redirige (308) al dominio oficial. Los preview deploys NO se tocan:
  // la regla solo se compila cuando VERCEL_ENV === 'production'.
  async redirects() {
    if (process.env.VERCEL_ENV !== 'production') return [];
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '^.+\\.vercel\\.app$' }],
        destination: 'https://oferta.carmaniaoficial.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
