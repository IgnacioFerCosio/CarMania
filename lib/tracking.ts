/**
 * Cliente de tracking — Meta Pixel.
 * Las funciones son safe-by-default: si fbq no existe (ej. ad-blocker activo)
 * no rompen, simplemente no envían el evento.
 */

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: Record<string, unknown>) => void;
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

export const track = {
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
};
