/**
 * Cliente para la Storefront API de Shopify.
 *
 * Para que esto funcione necesitás definir:
 *   NEXT_PUBLIC_SHOPIFY_DOMAIN          (ej. carmania-9625.myshopify.com)
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN (token público de Storefront API)
 *   NEXT_PUBLIC_SHOPIFY_API_VERSION      (ej. 2025-01)
 *
 * El token "Storefront" es PÚBLICO por diseño — está pensado para vivir en
 * código de cliente. No confundir con el token "Admin", ese sí es privado.
 */

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? '';
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? '';
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? '2025-01';

const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  opts: { revalidate?: number } = {},
): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      'Faltan variables de entorno de Shopify. Revisá NEXT_PUBLIC_SHOPIFY_DOMAIN y NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN en tu .env.',
    );
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: opts.revalidate ?? 300 }, // ISR cada 5 min por defecto
  });

  if (!res.ok) {
    throw new Error(`Shopify API ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

const PRODUCT_QUERY = /* GraphQL */ `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 8) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

type ProductQueryResponse = {
  product: {
    id: string;
    handle: string;
    title: string;
    description: string;
    availableForSale: boolean;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: { node: ShopifyImage }[] };
    variants: { edges: { node: ShopifyVariant }[] };
  } | null;
};

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductQueryResponse>(PRODUCT_QUERY, { handle });
  if (!data.product) return null;

  return {
    ...data.product,
    images: data.product.images.edges.map((e) => e.node),
    variants: data.product.variants.edges.map((e) => e.node),
  };
}

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!, $discountCodes: [String!]) {
    cartCreate(input: { lines: $lines, discountCodes: $discountCodes }) {
      cart {
        id
        checkoutUrl
        discountCodes {
          code
          applicable
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`;

type CartCreateResponse = {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
      discountCodes: { code: string; applicable: boolean }[];
    } | null;
    userErrors: { message: string; field?: string[] }[];
  };
};

/**
 * Crea un carrito con la variante + cantidad y, opcionalmente, un código de
 * descuento que se aplica server-side. Devuelve la URL del checkout nativo
 * de Shopify (donde MercadoPago ya está configurado como pasarela).
 *
 * El frontend hace `window.location.href = checkoutUrl`. Si el discountCode
 * no existe o no es aplicable, Shopify igual crea el carrito (sin descuento)
 * y lo logueamos para debug.
 */
export async function createCheckout(
  variantId: string,
  quantity = 1,
  discountCode?: string,
): Promise<string> {
  const data = await shopifyFetch<CartCreateResponse>(
    CART_CREATE,
    {
      lines: [{ merchandiseId: variantId, quantity }],
      discountCodes: discountCode ? [discountCode] : [],
    },
    { revalidate: 0 },
  );

  const errs = data.cartCreate.userErrors;
  if (errs.length > 0) {
    throw new Error(`Cart error: ${errs.map((e) => e.message).join(', ')}`);
  }
  if (!data.cartCreate.cart) {
    throw new Error('Shopify no devolvió un carrito.');
  }

  // Aviso si el code no se aplicó — útil para detectar typos en Shopify admin.
  if (discountCode) {
    const found = data.cartCreate.cart.discountCodes.find((d) => d.code === discountCode);
    if (!found || !found.applicable) {
      console.warn(
        `[Shopify] Discount code "${discountCode}" no aplicó. ` +
          `Revisá que el código exista en Admin → Discounts y esté activo para este producto.`,
      );
    }
  }

  return data.cartCreate.cart.checkoutUrl;
}

/**
 * Formatea precios en formato argentino: $44.990
 * (separador de miles con punto, sin decimales si son .00)
 */
export function formatARS(amount: number | string): string {
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  const rounded = Math.round(n);
  return `$${rounded.toLocaleString('es-AR')}`;
}
