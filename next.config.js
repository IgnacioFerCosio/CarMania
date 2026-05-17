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
};

module.exports = nextConfig;
