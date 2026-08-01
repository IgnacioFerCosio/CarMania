/**
 * Cliente del Cart de la Storefront API.
 *
 * Todas estas funciones corren CLIENT-SIDE (las llama el CartProvider), por
 * eso van siempre con `revalidate: 0`. El checkout sigue siendo 100% de
 * Shopify: lo único que hacemos es llevar al usuario a `cart.checkoutUrl`.
 *
 * Ojo con el modelo de datos: los 3 bundles son PRODUCTOS distintos, no
 * variantes de uno solo. Subir la cantidad de una línea NO equivale a subir
 * de bundle — para eso está `swapCartLine`, que cambia el merchandiseId.
 */
import { shopifyFetch } from './shopify';

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  productTitle: string;
  imageUrl: string | null;
  /** Precio unitario de la variante. */
  unitPrice: number;
  /** compareAtPrice de la variante, si tiene. */
  compareAtPrice: number | null;
  /** Total de la línea ya con descuentos de Shopify aplicados. */
  lineTotal: number;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  /** Suma de las líneas antes de envío/impuestos. */
  subtotal: number;
  /** Lo que Shopify considera total en esta instancia del carrito. */
  total: number;
  /** Descuento total aplicado por Shopify (códigos automáticos, etc.). */
  discountTotal: number;
  lines: CartLine[];
};

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
      }
      totalAmount {
        amount
      }
    }
    discountAllocations {
      discountedAmount {
        amount
      }
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              product {
                title
                featuredImage {
                  # Miniatura ya redimensionada por el CDN de Shopify. Es
                  # clave: en Cloudflare el optimizador de imagenes de Next no
                  # optimiza (devuelve el original), asi que sin esto el
                  # carrito bajaba el PNG de 3,2 MB para un recuadro de 80x80.
                  url(transform: { maxWidth: 160, maxHeight: 160 })
                }
              }
            }
          }
        }
      }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string };
    totalAmount: { amount: string };
  };
  discountAllocations: { discountedAmount: { amount: string } }[];
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        cost: { totalAmount: { amount: string } };
        merchandise: {
          id: string;
          price: { amount: string };
          compareAtPrice: { amount: string } | null;
          product: { title: string; featuredImage: { url: string } | null };
        };
      };
    }[];
  };
} | null;

function normalize(raw: RawCart): Cart | null {
  if (!raw) return null;
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal: parseFloat(raw.cost.subtotalAmount.amount),
    total: parseFloat(raw.cost.totalAmount.amount),
    discountTotal: raw.discountAllocations.reduce(
      (acc, d) => acc + parseFloat(d.discountedAmount.amount),
      0,
    ),
    lines: raw.lines.edges.map((e) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      merchandiseId: e.node.merchandise.id,
      productTitle: e.node.merchandise.product.title,
      imageUrl: e.node.merchandise.product.featuredImage?.url ?? null,
      unitPrice: parseFloat(e.node.merchandise.price.amount),
      compareAtPrice: e.node.merchandise.compareAtPrice
        ? parseFloat(e.node.merchandise.compareAtPrice.amount)
        : null,
      lineTotal: parseFloat(e.node.cost.totalAmount.amount),
    })),
  };
}

/** Junta los userErrors de una mutación en un Error, o no hace nada. */
function throwOnUserErrors(errs: { message: string }[] | undefined) {
  if (errs && errs.length > 0) {
    throw new Error(errs.map((e) => e.message).join(', '));
  }
}

export async function createCart(
  merchandiseId: string,
  quantity = 1,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CreateCart($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    { lines: [{ merchandiseId, quantity }] },
    { revalidate: 0 },
  );

  throwOnUserErrors(data.cartCreate.userErrors);
  const cart = normalize(data.cartCreate.cart);
  if (!cart) throw new Error('Shopify no devolvió un carrito.');
  return cart;
}

/**
 * Trae un carrito existente. Devuelve `null` si el ID ya no sirve, que pasa
 * en dos casos:
 *   1. El carrito venció. Shopify borra los carritos abandonados dentro de
 *      los 30 días de creados.
 *   2. La compra se completó. Shopify borra el carrito al cerrar el checkout,
 *      así el cliente que vuelve arranca uno limpio en vez de reencontrarse
 *      con lo que ya pagó.
 * En ambos casos el provider lo interpreta como "arrancá uno nuevo".
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
    `,
    { cartId },
    { revalidate: 0 },
  );
  return normalize(data.cart);
}

export async function addCartLine(
  cartId: string,
  merchandiseId: string,
  quantity = 1,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation AddLine($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    { cartId, lines: [{ merchandiseId, quantity }] },
    { revalidate: 0 },
  );

  throwOnUserErrors(data.cartLinesAdd.userErrors);
  const cart = normalize(data.cartLinesAdd.cart);
  if (!cart) throw new Error('Shopify no devolvió un carrito.');
  return cart;
}

/** Cambia la cantidad de una línea existente. */
export async function updateCartLineQuantity(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation SetQty($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    { cartId, lines: [{ id: lineId, quantity }] },
    { revalidate: 0 },
  );

  throwOnUserErrors(data.cartLinesUpdate.userErrors);
  const cart = normalize(data.cartLinesUpdate.cart);
  if (!cart) throw new Error('Shopify no devolvió un carrito.');
  return cart;
}

/**
 * EL CORAZÓN DEL UPSELL.
 *
 * Cambia QUÉ PRODUCTO es una línea, manteniendo la línea (mismo lineId). No
 * es un incremento de cantidad: pasar de "Soporte" a "Pack x2" es reemplazar
 * el merchandiseId, porque son productos separados en Shopify.
 *
 * ⚠️ OJO: si `nextMerchandiseId` YA está en otra línea del carrito, Shopify
 * ignora la mutación en silencio (sin userErrors) y devuelve un carrito
 * inconsistente con totalQuantity 0. Verificado contra la tienda real. Por eso
 * el provider detecta ese caso ANTES y usa remove + updateCartLineQuantity en
 * lugar de llamar acá.
 */
export async function swapCartLine(
  cartId: string,
  lineId: string,
  nextMerchandiseId: string,
  quantity = 1,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation SwapLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    {
      cartId,
      lines: [{ id: lineId, merchandiseId: nextMerchandiseId, quantity }],
    },
    { revalidate: 0 },
  );

  throwOnUserErrors(data.cartLinesUpdate.userErrors);
  const cart = normalize(data.cartLinesUpdate.cart);
  if (!cart) throw new Error('Shopify no devolvió un carrito.');
  return cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation RemoveLine($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    { cartId, lineIds: [lineId] },
    { revalidate: 0 },
  );

  throwOnUserErrors(data.cartLinesRemove.userErrors);
  const cart = normalize(data.cartLinesRemove.cart);
  if (!cart) throw new Error('Shopify no devolvió un carrito.');
  return cart;
}
