import type { MetadataRoute } from 'next';
import { STORE_PRODUCTS, isPublished } from '@/lib/config';

/**
 * Genera /sitemap.xml en build.
 * La landing del soporte (one-page), la home de tienda en /tienda y la
 * landing de cada producto publicado (las que tienen `comingSoon` responden
 * 404, así que no van).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const landings = STORE_PRODUCTS.filter(isPublished)
    .map((p) => p.href)
    .filter((href) => href !== '/')
    .map((href) => ({
      url: `https://oferta.carmaniaoficial.com${href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

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
    ...landings,
  ];
}
