'use client';

/**
 * Estado global del carrito.
 *
 * Persistencia: solo el ID del carrito en localStorage. Todo lo demás (líneas,
 * precios, totales) es siempre lo que devuelve Shopify — nunca guardamos
 * precios del lado del cliente, así no hay forma de que se desincronicen.
 *
 * No hay cuenta de cliente logueada: el carrito vive en este navegador.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  addCartLine,
  createCart,
  getCart,
  removeCartLine,
  swapCartLine,
  updateCartLineQuantity,
  type Cart,
} from '@/lib/cart';
import { getVariantsByIds, type BundleData, type VariantPrice } from '@/lib/shopify';
import { buildTiers, nextTierOf, type ResolvedTier } from '@/lib/tiers';
import { track } from '@/lib/tracking';
import { BRAND } from '@/lib/config';

const STORAGE_KEY = 'carmania_cart_id';
/** Dónde guardamos los parámetros de campaña de la visita. */
const UTM_KEY = 'carmania_utm';
/** Qué parámetros reenviamos al checkout. */
const UTM_RE = /^(utm_[a-z_]+|gclid|fbclid|ttclid)$/i;

type CartContextValue = {
  cart: Cart | null;
  tiers: ResolvedTier[];
  open: boolean;
  busy: boolean;
  error: string | null;
  /** Línea que el drawer debe resaltar (se apaga sola a los ~2 s). */
  highlightedLineId: string | null;
  openCart: () => void;
  closeCart: () => void;
  addTier: (variantId: string) => Promise<void>;
  upgradeLine: (lineId: string, nextVariantId: string) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  checkout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart tiene que usarse dentro de <CartProvider>');
  return ctx;
}

export function CartProvider({
  bundlesData,
  children,
}: {
  bundlesData: Record<string, BundleData>;
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [livePrices, setLivePrices] = useState<Record<string, VariantPrice>>();
  const [highlightedLineId, setHighlightedLineId] = useState<string | null>(null);

  const highlightTimer = useRef<ReturnType<typeof setTimeout>>();

  // Precios del build como base; el refetch client-side los pisa cuando llega.
  const tiers = useMemo(
    () => buildTiers(bundlesData, livePrices),
    [bundlesData, livePrices],
  );

  // ── Guardar los parámetros de campaña de la visita ────────────────────────
  // En la tienda nativa Shopify captura la atribución con sus propios scripts.
  // Acá, headless, el checkoutUrl que devuelve la Storefront API NO hereda los
  // UTM: si no los reenviamos, las órdenes aparecen como tráfico directo y las
  // campañas quedan sin atribuir.
  useEffect(() => {
    const entrantes = new URLSearchParams(window.location.search);
    const campaign: Record<string, string> = {};
    entrantes.forEach((v, k) => {
      if (UTM_RE.test(k)) campaign[k] = v;
    });
    // Sólo pisamos lo guardado si esta visita trae parámetros propios.
    if (Object.keys(campaign).length > 0) {
      try {
        sessionStorage.setItem(UTM_KEY, JSON.stringify(campaign));
      } catch {
        /* noop */
      }
    }
  }, []);

  // ── Rehidratar el carrito guardado ────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const stored = safeGet(STORAGE_KEY);
    if (!stored) return;

    getCart(stored)
      .then((c) => {
        if (cancelled) return;
        // null ⇒ el carrito venció o ya se compró. Se descarta y el próximo
        // "agregar" arranca uno nuevo.
        if (!c) safeRemove(STORAGE_KEY);
        else setCart(c);
      })
      .catch(() => {
        if (!cancelled) safeRemove(STORAGE_KEY);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Precios vivos: se piden al abrir el drawer ────────────────────────────
  // La página se prerenderiza en el build y Cloudflare no revalida, así que
  // los precios que llegan por props pueden estar viejos. El banner de upsell
  // tiene que anunciar el mismo número que después cobra el checkout.
  useEffect(() => {
    if (!open || livePrices) return;
    const ids = tiers.map((t) => t.variantId);
    if (ids.length === 0) return;

    let cancelled = false;
    getVariantsByIds(ids)
      .then((p) => {
        if (!cancelled) setLivePrices(p);
      })
      .catch(() => {
        /* nos quedamos con los precios del build */
      });

    return () => {
      cancelled = true;
    };
  }, [open, livePrices, tiers]);

  // ── Bloquear el scroll del body mientras el drawer está abierto ───────────
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    return () => clearTimeout(highlightTimer.current);
  }, []);

  const highlight = useCallback((lineId: string) => {
    setHighlightedLineId(lineId);
    clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setHighlightedLineId(null), 2200);
  }, []);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  /**
   * Agrega un bundle al carrito y abre el drawer.
   *
   * Si el producto YA está en el carrito hay dos caminos:
   *
   *  - No es el tier más alto ⇒ no se incrementa la cantidad. Dos "Soporte"
   *    sueltos salen $79.980 cuando el Pack x2 sale $59.985; en vez de
   *    dejarlo pagar de más, se abre el drawer resaltando la línea para que
   *    el banner de upsell ofrezca el combo que le conviene.
   *
   *  - Es el tier más alto (Pack x3) ⇒ sí se incrementa. Acá no hay ningún
   *    bundle mejor al que mandarlo, así que bloquear la segunda unidad sería
   *    un callejón sin salida: no habría forma de comprar 6 unidades.
   */
  const addTier = useCallback(
    async (variantId: string) => {
      if (busy) return;
      setError(null);

      const existing = cart?.lines.find((l) => l.merchandiseId === variantId);
      if (existing) {
        const hasUpsell = nextTierOf(tiers, variantId) !== null;

        if (hasUpsell) {
          setOpen(true);
          highlight(existing.id);
          return;
        }

        setBusy(true);
        try {
          const next = await updateCartLineQuantity(
            cart!.id,
            existing.id,
            existing.quantity + 1,
          );
          setCart(next);
          setOpen(true);
          highlight(existing.id);

          const params = {
            content_ids: [variantId],
            content_name: existing.productTitle,
            value: existing.unitPrice,
            num_items: 1,
          };
          track.addToCart(params);
          track.klaviyoAddedToCart(params);
        } catch (err) {
          console.error('[Cart] addTier(increment)', err);
          setError('No pudimos agregar el producto. Reintentá en un momento.');
          // Abrimos igual: el mensaje de error se muestra dentro del drawer.
          setOpen(true);
        } finally {
          setBusy(false);
        }
        return;
      }

      setBusy(true);
      try {
        const next = cart
          ? await addCartLine(cart.id, variantId, 1)
          : await createCart(variantId, 1);

        setCart(next);
        safeSet(STORAGE_KEY, next.id);

        // Recién ahora abrimos: si abriésemos antes, el drawer aparecería
        // vacío y el producto entraría un segundo después.
        setOpen(true);

        const added = next.lines.find((l) => l.merchandiseId === variantId);
        if (added) highlight(added.id);

        const params = {
          content_ids: [variantId],
          content_name: added?.productTitle ?? BRAND.tagline,
          value: added?.lineTotal ?? 0,
          num_items: 1,
        };
        track.addToCart(params);
        track.klaviyoAddedToCart(params);
      } catch (err) {
        console.error('[Cart] addTier', err);
        setError('No pudimos agregar el producto. Reintentá en un momento.');
        setOpen(true);
      } finally {
        setBusy(false);
      }
    },
    [busy, cart, highlight, tiers],
  );

  /** El upsell: cambia el producto de la línea, no la cantidad. */
  const upgradeLine = useCallback(
    async (lineId: string, nextVariantId: string) => {
      if (!cart || busy) return;
      const source = cart.lines.find((l) => l.id === lineId);
      if (!source) return;

      setBusy(true);
      setError(null);
      try {
        // Si el tier destino YA está en otra línea, `cartLinesUpdate` con
        // merchandiseId no hace nada y encima devuelve un carrito con
        // totalQuantity 0. Hay que consolidar a mano: borrar la línea de
        // origen y sumarle su cantidad a la línea que ya existe.
        const target = cart.lines.find(
          (l) => l.merchandiseId === nextVariantId && l.id !== lineId,
        );

        let next: Cart;
        if (target) {
          await removeCartLine(cart.id, lineId);
          next = await updateCartLineQuantity(
            cart.id,
            target.id,
            target.quantity + source.quantity,
          );
        } else {
          next = await swapCartLine(
            cart.id,
            lineId,
            nextVariantId,
            source.quantity,
          );
        }
        setCart(next);

        const swapped = next.lines.find((l) => l.merchandiseId === nextVariantId);
        if (swapped) highlight(swapped.id);

        const params = {
          content_ids: [nextVariantId],
          content_name: swapped?.productTitle ?? BRAND.tagline,
          value: swapped?.lineTotal ?? 0,
          num_items: 1,
        };
        track.addToCart(params);
        track.klaviyoAddedToCart(params);
      } catch (err) {
        console.error('[Cart] upgradeLine', err);
        setError('No pudimos actualizar el carrito. Reintentá en un momento.');
      } finally {
        setBusy(false);
      }
    },
    [cart, busy, highlight],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cart || busy) return;
      setBusy(true);
      setError(null);
      try {
        const next = await removeCartLine(cart.id, lineId);
        setCart(next);
      } catch (err) {
        console.error('[Cart] removeLine', err);
        setError('No pudimos quitar el producto. Reintentá en un momento.');
      } finally {
        setBusy(false);
      }
    },
    [cart, busy],
  );

  const checkout = useCallback(() => {
    if (!cart) return;
    const params = {
      content_ids: cart.lines.map((l) => l.merchandiseId),
      content_name: BRAND.tagline,
      value: cart.total,
      num_items: cart.totalQuantity,
    };
    track.initiateCheckout(params);
    track.klaviyoStartedCheckout(params);
    window.location.href = withCampaignParams(cart.checkoutUrl);
  }, [cart]);

  const value: CartContextValue = {
    cart,
    tiers,
    open,
    busy,
    error,
    highlightedLineId,
    openCart,
    closeCart,
    addTier,
    upgradeLine,
    removeLine,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Le pega al checkoutUrl los parámetros de campaña de la visita. Shopify los
 * lee del querystring del checkout, así que con esto la orden queda atribuida
 * a la campaña que la trajo.
 */
function withCampaignParams(checkoutUrl: string): string {
  try {
    const guardados = sessionStorage.getItem(UTM_KEY);
    if (!guardados) return checkoutUrl;
    const campaign = JSON.parse(guardados) as Record<string, string>;

    const url = new URL(checkoutUrl);
    for (const [k, v] of Object.entries(campaign)) {
      // No pisamos nada que Shopify ya haya puesto en la URL.
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    return url.toString();
  } catch {
    // Ante cualquier problema, mejor ir al checkout sin atribución que no ir.
    return checkoutUrl;
  }
}

// localStorage puede tirar en navegación privada — nada de esto debe romper la UI.
function safeGet(k: string): string | null {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}
function safeSet(k: string, v: string) {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* noop */
  }
}
function safeRemove(k: string) {
  try {
    localStorage.removeItem(k);
  } catch {
    /* noop */
  }
}
