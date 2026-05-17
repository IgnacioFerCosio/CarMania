import type { MetadataRoute } from 'next';

/**
 * Genera /sitemap.xml en build.
 * La landing es una sola página (one-page), así que el sitemap solo
 * lista la home.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://oferta.carmaniaoficial.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
