'use client';

/**
 * KlaviyoViewedProduct — dispara "Viewed Product" cuando ya tenemos
 * los datos del producto cargados desde Shopify.
 * Espejo exacto de PixelViewContent pero para Klaviyo.
 */
import { useEffect } from 'react';
import { track } from '@/lib/tracking';

export function KlaviyoViewedProduct({
  productId,
  name,
  price,
}: {
  productId: string;
  name: string;
  price: number;
}) {
  useEffect(() => {
    track.klaviyoViewedProduct({
      content_ids: [productId],
      content_name: name,
      value: price,
    });
  }, [productId, name, price]);
  return null;
}
