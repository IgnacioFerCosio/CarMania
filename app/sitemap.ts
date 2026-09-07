import type { MetadataRoute } from 'next';

/**
 * Genera /sitemap.xml en build.
 * El sitio tiene cuatro rutas indexables: la landing del soporte (one-page),
 * la home de tienda en /tienda y las landings de /parasol y /soplador.
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
    {
      url: 'https://oferta.carmaniaoficial.com/parasol',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://oferta.carmaniaoficial.com/soplador',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
