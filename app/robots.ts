import type { MetadataRoute } from 'next';

/**
 * Genera /robots.txt en build.
 * La landing se indexa (es la única presencia web del producto), así que
 * permitimos el crawl completo y apuntamos al sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://oferta.carmaniaoficial.com/sitemap.xml',
    host: 'https://oferta.carmaniaoficial.com',
  };
}
