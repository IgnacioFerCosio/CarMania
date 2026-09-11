/**
 * CONTRATO CON SHOPIFY — que lo que la config dice que existe, exista de
 * verdad DESDE EL CANAL DE LA LANDING.
 *
 * Pega a la Storefront API con el mismo token público que usa la página. No
 * alcanza con mirar el admin: un producto puede estar activo y con precio y
 * aun así no estar publicado al canal "Carmania Headless", y entonces la
 * Storefront API lo devuelve `null` y el botón de compra falla con "No
 * pudimos agregar el producto". Pasó con los packs del parasol (eran bundles
 * y el admin no mostraba el canal en la ficha). El handle con `™` también
 * se hubiera visto acá.
 *
 * Necesita red y las variables de `.env.local`. Sin ellas se saltea y lo
 * dice — no falla, para que `npm test` siga sirviendo offline.
 *
 *   npm run check:shopify
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { SOPORTE } from '@/lib/landings/soporte';
import { PARASOL } from '@/lib/landings/parasol';
import { SOPLADOR } from '@/lib/landings/soplador';
import type { LandingConfig, UpsellTier } from '@/lib/landings/types';

// ── Entorno ──────────────────────────────────────────────────────────────
// Next carga .env.local solo; acá lo leemos a mano para no sumar dotenv.
function cargarEnvLocal() {
  let texto = '';
  try {
    texto = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8');
  } catch {
    return;
  }
  for (const linea of texto.split('\n')) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
cargarEnvLocal();

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? '2024-07';
const configurado = Boolean(DOMAIN && TOKEN);

async function storefront<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${DOMAIN}/api/${VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));
  return json.data!;
}

type Nodo = {
  id: string;
  handle: string;
  availableForSale: boolean;
  variants: { edges: { node: { id: string; availableForSale: boolean; price: { amount: string }; compareAtPrice: { amount: string } | null } }[] };
} | null;

const NODES_QUERY = /* GraphQL */ `
  query Contrato($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        handle
        availableForSale
        variants(first: 1) {
          edges { node { id availableForSale price { amount } compareAtPrice { amount } } }
        }
      }
    }
  }
`;

const HANDLE_QUERY = /* GraphQL */ `
  query Handle($handle: String!) { product(handle: $handle) { id } }
`;

// ── Qué se verifica ───────────────────────────────────────────────────────
const LANDINGS: [string, LandingConfig][] = [
  ['/', SOPORTE],
  ['/parasol', PARASOL],
  ['/soplador', SOPLADOR],
];

/** Sólo los tiers ya cargados: '' significa "no existe todavía", y eso es legítimo. */
function tiersCargados(cfg: LandingConfig): UpsellTier[] {
  return cfg.upsellChain.filter((t) => t.productId !== '');
}

if (!configurado) {
  console.warn(
    'check:shopify SALTEADO — faltan NEXT_PUBLIC_SHOPIFY_DOMAIN / NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN (.env.local).',
  );
}

describe.runIf(configurado).each(LANDINGS)('Shopify · %s', (_ruta, cfg) => {
  const tiers = tiersCargados(cfg);
  const porId = new Map<string, Nodo>();

  beforeAll(async () => {
    if (!tiers.length) return;
    const { nodes } = await storefront<{ nodes: Nodo[] }>(NODES_QUERY, {
      ids: tiers.map((t) => t.productId),
    });
    tiers.forEach((t, i) => porId.set(t.productId, nodes[i]));
  });

  it.runIf(tiers.length > 0).each(tiers.map((t) => [t.id, t] as const))(
    'tier %s: existe desde el canal de la landing y su variante es la de config',
    (_id, t) => {
      const nodo = porId.get(t.productId);
      expect(
        nodo,
        `${t.productId} no es visible desde la Storefront API. ¿Está publicado al canal "Carmania Headless"? (con bundles, publicar desde el listado de productos)`,
      ).not.toBeNull();
      expect(nodo!.availableForSale, `${t.id} no está disponible para la venta`).toBe(true);

      const v = nodo!.variants.edges[0]?.node;
      expect(v, `${t.id} no tiene variantes`).toBeDefined();
      expect(v.id, `${t.id}: fallbackVariantId desactualizado`).toBe(t.fallbackVariantId);
      expect(v.availableForSale, `${t.id}: la variante no está disponible`).toBe(true);
    },
  );

  it.runIf(tiers.length > 0).each(tiers.map((t) => [t.id, t] as const))(
    'tier %s: el fallbackPrice es espejo del precio en Shopify',
    (_id, t) => {
      const v = porId.get(t.productId)?.variants.edges[0]?.node;
      if (!v) return; // ya falló arriba con un mensaje mejor
      expect(
        Number(v.price.amount),
        `${t.id}: en config ${t.fallbackPrice}, en Shopify ${v.price.amount}. Actualizá el fallback (y redeployá: los precios se congelan en el build)`,
      ).toBe(t.fallbackPrice);
    },
  );

  it.runIf(tiers.length > 0)('el productHandle resuelve al producto x1', async () => {
    const { product } = await storefront<{ product: { id: string } | null }>(HANDLE_QUERY, {
      handle: cfg.brand.productHandle,
    });
    const single = cfg.bundles.find((b) => b.id === 'single')!;
    expect(
      product,
      `getProduct('${cfg.brand.productHandle}') devuelve null — el hero cae al precio fallback en silencio`,
    ).not.toBeNull();
    expect(product!.id).toBe(single.productId);
  });

  it.runIf(tiers.length > 0)('el compareAtPrice del x1 es el tachado de config', () => {
    const single = cfg.bundles.find((b) => b.id === 'single')!;
    const v = porId.get(single.productId)?.variants.edges[0]?.node;
    if (!v) return;
    expect(v.compareAtPrice ? Number(v.compareAtPrice.amount) : null).toBe(single.fallbackCompare);
  });
});
