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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com https://va.vercel-scripts.com https://static.klaviyo.com https://static.cloudflareinsights.com https://*.klaviyo.com; style-src 'self' 'unsafe-inline' https://*.klaviyo.com; img-src 'self' data: blob: https:; font-src 'self' https://*.klaviyo.com; media-src 'self'; connect-src 'self' https://connect.facebook.net https://www.facebook.com https://*.myshopify.com https://www.googletagmanager.com https://www.google-analytics.com https://vitals.vercel-insights.com https://cloudflareinsights.com https://*.klaviyo.com; frame-src https://www.facebook.com https://www.googletagmanager.com https://*.klaviyo.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
