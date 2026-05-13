'use client';

/**
 * Carga el Meta Pixel con el ID que esté en NEXT_PUBLIC_META_PIXEL_ID.
 * Si no hay ID configurado, no inyecta nada — útil para previews y dev.
 *
 * Eventos automáticos:
 *   - PageView (al montar)
 *
 * Eventos manuales:
 *   - ViewContent (lo dispara <PixelViewContent /> cuando ya tenés
 *     el producto cargado)
 *   - AddToCart / InitiateCheckout (los dispara BuyButton)
 *
 * El Pixel queda en window.fbq y la lib lib/tracking lo usa de forma segura.
 */
import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/tracking';

type Props = { pixelId?: string };

export function MetaPixel({ pixelId }: Props) {
  useEffect(() => {
    if (!pixelId) return;
    // PageView se loguea apenas el pixel termina de cargar.
    track.pageView();
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Dispara un ViewContent cuando ya tenemos los datos del producto.
 * Va dentro del page para fire-and-forget.
 */
export function PixelViewContent({
  productId,
  name,
  price,
}: {
  productId: string;
  name: string;
  price: number;
}) {
  useEffect(() => {
    track.viewContent({
      content_ids: [productId],
      content_name: name,
      value: price,
    });
  }, [productId, name, price]);
  return null;
}
