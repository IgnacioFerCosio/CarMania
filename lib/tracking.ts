/**
 * Cliente de tracking — Meta Pixel + TikTok Pixel + Klaviyo.
 * Las funciones son safe-by-default: si fbq / ttq / _learnq no existen
 * (ad-blocker, script bloqueado) no rompen nada.
 */

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: Record<string, unknown>) => void;
    ttq?: { track: (eventName: string, params?: Record<string, unknown>) => void };
    _learnq?: unknown[];
  }
}

type ProductEventParams = {
  content_ids?: string[];
  content_name?: string;
  content_type?: 'product';
  value?: number;
  currency?: string;
  num_items?: number;
};

function fbqSafe(action: string, eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (!window.fbq) return;
  try {
    window.fbq(action, eventName, params);
  } catch {
    /* swallow — tracking errors no deben tirar la UI */
  }
}

/**
 * TikTok pide los productos en un array `contents`, no en `content_ids` como
 * Meta. `quantity` va sólo con un producto: con varios, `num_items` es el total
 * del carrito y no la cantidad de cada uno.
 */
function ttqTrack(eventName: string, p: ProductEventParams) {
  if (typeof window === 'undefined') return;
  if (!window.ttq) return;
  const ids = p.content_ids ?? [];
  try {
    window.ttq.track(eventName, {
      contents: ids.map((content_id) => ({
        content_id,
        content_type: 'product',
        content_name: p.content_name,
        ...(ids.length === 1 && p.num_items ? { quantity: p.num_items } : {}),
      })),
      value: p.value,
      currency: 'ARS',
    });
  } catch {
    /* swallow */
  }
}

function klaviyoPush(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    window._learnq = window._learnq || [];
    (window._learnq as unknown[]).push(['track', eventName, params]);
  } catch {
    /* swallow */
  }
}

export const track = {
  // ── Meta Pixel + TikTok Pixel ────────────────────────────────────────────
  // El PageView de TikTok sale del snippet (ver TikTokPixel.tsx).

  pageView() {
    fbqSafe('track', 'PageView');
  },

  viewContent(p: ProductEventParams) {
    fbqSafe('track', 'ViewContent', { content_type: 'product', currency: 'ARS', ...p });
    ttqTrack('ViewContent', p);
  },

  addToCart(p: ProductEventParams) {
    fbqSafe('track', 'AddToCart', { content_type: 'product', currency: 'ARS', ...p });
    ttqTrack('AddToCart', p);
  },

  initiateCheckout(p: ProductEventParams) {
    fbqSafe('track', 'InitiateCheckout', { content_type: 'product', currency: 'ARS', ...p });
    ttqTrack('InitiateCheckout', p);
  },

  // ── Klaviyo ──────────────────────────────────────────────────────────────

  klaviyoViewedProduct(p: ProductEventParams) {
    klaviyoPush('Viewed Product', {
      ProductName: p.content_name,
      ProductID: p.content_ids?.[0],
      Price: p.value,
      Currency: 'ARS',
      URL: typeof window !== 'undefined' ? window.location.href : '',
    });
  },

  klaviyoAddedToCart(p: ProductEventParams) {
    klaviyoPush('Added to Cart', {
      ProductName: p.content_name,
      ProductID: p.content_ids?.[0],
      Quantity: p.num_items,
      Value: p.value,
      Currency: 'ARS',
    });
  },

  klaviyoStartedCheckout(p: ProductEventParams) {
    klaviyoPush('Checkout Started', {
      ProductName: p.content_name,
      ProductID: p.content_ids?.[0],
      Quantity: p.num_items,
      Value: p.value,
      Currency: 'ARS',
    });
  },
};
