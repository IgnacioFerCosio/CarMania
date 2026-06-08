/**
 * Cliente de tracking — Meta Pixel + Klaviyo.
 * Las funciones son safe-by-default: si fbq / _learnq no existen
 * (ad-blocker, script bloqueado) no rompen nada.
 */

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: Record<string, unknown>) => void;
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
  // ── Meta Pixel ───────────────────────────────────────────────────────────

  pageView() {
    fbqSafe('track', 'PageView');
  },

  viewContent(p: ProductEventParams) {
    fbqSafe('track', 'ViewContent', { content_type: 'product', currency: 'ARS', ...p });
  },

  addToCart(p: ProductEventParams) {
    fbqSafe('track', 'AddToCart', { content_type: 'product', currency: 'ARS', ...p });
  },

  initiateCheckout(p: ProductEventParams) {
    fbqSafe('track', 'InitiateCheckout', { content_type: 'product', currency: 'ARS', ...p });
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
    klaviyoPush('Started Checkout', {
      ProductName: p.content_name,
      ProductID: p.content_ids?.[0],
      Quantity: p.num_items,
      Value: p.value,
      Currency: 'ARS',
    });
  },
};
