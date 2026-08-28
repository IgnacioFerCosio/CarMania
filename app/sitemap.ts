import type { MetadataRoute } from 'next';

/**
 * Genera /sitemap.xml en build.
 * El sitio tiene dos rutas indexables: la landing del soporte (one-page) y
 * la home de tienda en /tienda.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://oferta.carmaniaoficial.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://oferta.carmaniaoficial.com/tienda',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
