# Home de tienda (`/tienda`) — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar una home de tienda en `/tienda` que liste los productos de CARMANIA, sin alterar en nada lo que sirve la landing del soporte en `/`.

**Architecture:** Next 14 App Router. La grilla se alimenta de una lista curada en `lib/config.ts` (no de un fetch de "todos los productos", que mostraría el soporte tres veces). Los precios se leen de Shopify en el build con el `getProduct` existente, con fallback a config. Antes de agregar la página hay que bajar del layout raíz la metadata que hoy está cableada al soporte.

**Tech Stack:** Next 14.2 (App Router, Server Components), React 18.3, TypeScript 5.5, Tailwind 3.4, Storefront API de Shopify.

**Spec:** `docs/superpowers/specs/2026-08-28-tienda-home-design.md`

## Global Constraints

- **`/` no cambia lo que sirve.** `app/page.tsx` se edita (recibe la metadata que baja del layout), pero el HTML resultante y la metadata servida deben ser idénticos a los de `main`. Es la URL de las campañas de Meta.
- **No se pushea nada.** Commits locales únicamente. El push lo ordena el usuario cuando existan los dos productos nuevos con su landing.
- **No se agrega framework de tests.** El proyecto no tiene ninguno y montar uno está fuera de alcance. El ciclo de verificación es `npx tsc --noEmit`, `npm run build`, y grep sobre el HTML prerenderizado en `.next/server/app/`.
- **Sin sistema visual nuevo.** Solo clases existentes: `heading-display`, `eyebrow`, paleta `ink-*` / `accent` (`#D70707`), fondo de sección `#24262A`, cards `rounded-2xl` + `border-ink-800` + `bg-ink-950`.
- **Copy editable va en `lib/config.ts`**, no hardcodeado en componentes (convención del proyecto, `CLAUDE.md`).
- Los packs x2 y x3 **no** aparecen en la grilla.

---

### Task 1: Bajar la metadata del soporte del layout raíz a la landing

Hoy `app/layout.tsx` declara `title`, `openGraph`, `alternates.canonical: '/'` y un `<link rel="preload">` del poster del hero. Los cuatro son del soporte. Con una sola página no molestan; con dos, el `canonical` le diría a Google que `/tienda` *es* `/`.

**Files:**
- Modify: `app/layout.tsx:24-46` (metadata) y `app/layout.tsx:57-66` (preload)
- Modify: `app/page.tsx` (recibe metadata propia + el preload)

**Interfaces:**
- Consumes: nada.
- Produces: `app/layout.tsx` exporta una `metadata` genérica de marca que las páginas hijas extienden. Cada página define su `export const metadata: Metadata`.

- [ ] **Step 1: Registrar el estado actual de `/` para comparar después**

Sirve de línea de base: al final del task, estos valores tienen que ser idénticos.

```bash
npm run build
grep -oE '<title>[^<]*</title>|rel="canonical" href="[^"]*"|rel="preload"[^>]*VideoPrincipal-poster[^>]*>' .next/server/app/index.html > /tmp/baseline-home.txt
cat /tmp/baseline-home.txt
```

Esperado: un `<title>` con "Soporte Magnético PRO™ — CARMANIA", un canonical a `https://oferta.carmaniaoficial.com`, y el preload del poster.

- [ ] **Step 2: Sacar del layout lo que es del soporte**

En `app/layout.tsx`, reemplazar el bloque `export const metadata` por:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://oferta.carmaniaoficial.com'),
  // El title/description/canonical los define cada página: este layout lo
  // comparten la landing del soporte y la home de tienda. Lo que queda acá
  // es solo lo que vale para todo el sitio.
  title: {
    default: 'CARMANIA',
    template: '%s',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'CARMANIA',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};
```

Y borrar del `<head>` el bloque completo del preload (el `<link rel="preload" as="image" href="/hero/VideoPrincipal-poster.webp" ... />` junto con su comentario), que pasa a la landing.

- [ ] **Step 3: Devolverle a la landing su metadata y su preload**

En `app/page.tsx`, agregar los imports y la metadata arriba del componente:

```tsx
import type { Metadata } from 'next';
import ReactDOM from 'react-dom';

export const metadata: Metadata = {
  title: 'Soporte Magnético PRO™ — CARMANIA',
  description:
    'El soporte para celular que no se cae. Imán N52 grado militar + base al vacío. Envío gratis y 30 días de devolución.',
  openGraph: {
    title: 'Soporte Magnético PRO™ — CARMANIA',
    description:
      'El soporte para celular que no se cae. Imán N52 + base al vacío. Envío gratis y devolución 30 días.',
  },
  alternates: { canonical: '/' },
};
```

Y como primera línea del cuerpo de `HomePage()`, antes de los `let`:

```tsx
  // El poster del video del hero es el elemento LCP de ESTA página. Vivía en
  // el layout raíz, pero desde ahí se precargaba también en /tienda, donde la
  // imagen no existe y competía contra el LCP real.
  ReactDOM.preload('/hero/VideoPrincipal-poster.webp', {
    as: 'image',
    fetchPriority: 'high',
    type: 'image/webp',
  });
```

- [ ] **Step 4: Verificar que `/` quedó idéntica**

```bash
npx tsc --noEmit && npm run build
grep -oE '<title>[^<]*</title>|rel="canonical" href="[^"]*"|rel="preload"[^>]*VideoPrincipal-poster[^>]*>' .next/server/app/index.html > /tmp/after-home.txt
diff /tmp/baseline-home.txt /tmp/after-home.txt && echo "IDENTICO"
```

Esperado: `tsc` sin errores, build OK, y `diff` sin salida seguido de `IDENTICO`.

**Si el preload no aparece** en el HTML: `ReactDOM.preload` no está surtiendo efecto en esta versión. En ese caso, en vez de eso, mover el preload a `components/sections/Hero.tsx` renderizando `<link rel="preload" ... />` dentro del componente, y volver a correr esta verificación. No dejar el preload en el layout: eso es justamente lo que este task viene a arreglar.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "refactor(seo): bajar la metadata del soporte del layout a la landing"
```

---

### Task 2: Navbar con links configurables

`components/layout/Navbar.tsx:15` tiene los links cableados a anclas de la landing (`#how`, `#pricing`, `#reviews`, `#trust`, `#faq`) y el logo apunta a `#top`. En `/tienda` esas anclas no existen.

**Files:**
- Modify: `components/layout/Navbar.tsx:15-30` y el `<Link>` del logo (~línea 53)

**Interfaces:**
- Consumes: nada.
- Produces: `Navbar` acepta `{ links?: NavLink[]; homeHref?: string }`, con `type NavLink = { href: string; label: string; highlight?: boolean }` exportado desde el mismo archivo. Sin props se comporta exactamente como hoy.

- [ ] **Step 1: Convertir los links en prop con default**

En `components/layout/Navbar.tsx`, reemplazar la constante `LINKS` y la firma del componente:

```tsx
export type NavLink = { href: string; label: string; highlight?: boolean };

// Links de la landing del soporte. Son el default para no tener que
// pasarlos desde `app/page.tsx`, que ya los usaba implícitamente.
const LANDING_LINKS: NavLink[] = [
  { href: '#how', label: 'Cómo funciona' },
  { href: '#pricing', label: 'Oferta', highlight: true },
  { href: '#reviews', label: 'Reseñas' },
  { href: '#trust', label: 'Garantías' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar({
  links = LANDING_LINKS,
  homeHref = '#top',
}: {
  links?: NavLink[];
  homeHref?: string;
} = {}) {
```

Dentro del JSX, cambiar `LINKS.map(...)` por `links.map(...)` y el `href="#top"` del `<Link>` del logo por `href={homeHref}`.

- [ ] **Step 2: Verificar que la landing no cambió**

```bash
npx tsc --noEmit && npm run build
grep -oE 'href="#(how|pricing|reviews|trust|faq|top)"' .next/server/app/index.html | sort | uniq -c
```

Esperado: `tsc` sin errores y los 6 anchors presentes, igual que antes del cambio.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "refactor(navbar): permitir pasar los links por props"
```

---

### Task 3: `STORE_PRODUCTS` y los componentes de la grilla

**Files:**
- Modify: `lib/config.ts` (nuevo export al final)
- Create: `components/commerce/ProductCard.tsx`
- Create: `components/sections/ProductGrid.tsx`

**Interfaces:**
- Consumes: `formatARS` de `lib/shopify.ts`.
- Produces:
  - `type StoreProduct = { handle: string; title: string; blurb: string; image: string; href: string; fallbackPrice: number }` y `STORE_PRODUCTS: readonly StoreProduct[]`, ambos desde `lib/config.ts`.
  - `ProductCard({ product, price }: { product: StoreProduct; price: number })`
  - `ProductGrid({ products }: { products: { product: StoreProduct; price: number }[] })`

- [ ] **Step 1: Agregar `STORE_PRODUCTS` a config**

Al final de `lib/config.ts`:

```ts
/**
 * ─────────────────────────────────────────────────────────────────────────
 * STORE_PRODUCTS — la grilla de /tienda.
 *
 * Lista CURADA a propósito: pedirle "todos los productos" a Shopify traería
 * el soporte tres veces, porque los packs x2 y x3 son productos separados y
 * no variantes (ver CLAUDE.md). Acá va un item por producto DISTINTO.
 *
 * `href` es a dónde linkea la card: el soporte manda a `/`, que es su
 * landing y la URL de las campañas. Cada producto nuevo manda a la suya.
 * ─────────────────────────────────────────────────────────────────────────
 */
export type StoreProduct = {
  handle: string;        // handle en Shopify — sirve para leer el precio vivo
  title: string;
  blurb: string;
  image: string;         // ruta en /public
  href: string;
  fallbackPrice: number; // ARS, si la Storefront API no responde
};

export const STORE_PRODUCTS: readonly StoreProduct[] = [
  {
    handle: 'soporte-magnetico-pro',
    title: 'Soporte Magnético PRO™',
    blurb:
      'Imán N52 grado militar y base al vacío. Se adhiere al auto, al espejo o al escritorio, y no se cae.',
    image: '/bundles/BundleX1.webp',
    href: '/',
    fallbackPrice: 39990,
  },
] as const;
```

- [ ] **Step 2: Crear `ProductCard`**

`components/commerce/ProductCard.tsx`:

```tsx
/**
 * Card de producto de la grilla de /tienda.
 *
 * Es un link entero a la landing del producto, no un botón de compra: la
 * venta se argumenta en la landing, no acá.
 *
 * Server Component — no tiene estado ni handlers.
 */
import Image from 'next/image';
import Link from 'next/link';
import type { StoreProduct } from '@/lib/config';
import { formatARS } from '@/lib/shopify';

export function ProductCard({
  product,
  price,
}: {
  product: StoreProduct;
  price: number;
}) {
  return (
    <Link
      href={product.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 transition hover:border-ink-700"
    >
      {/* El contenedor cuadrado reserva el espacio antes de que cargue la
          imagen, así la grilla no salta (mismo patrón que HowItWorks). */}
      <div className="relative aspect-square w-full overflow-hidden bg-ink-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <h3 className="font-display text-base font-black italic uppercase tracking-wider text-white">
          {product.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-300">
          {product.blurb}
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
            Desde
          </span>
          <span className="text-xl font-black text-white md:text-2xl">
            {formatARS(price)}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent">
          Ver producto
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Crear `ProductGrid`**

`components/sections/ProductGrid.tsx`. No fetchea nada: recibe los productos ya resueltos, así se puede renderizar desde cualquier página y probar sin red.

```tsx
/**
 * Grilla de productos de /tienda.
 *
 * Recibe los productos con su precio ya resuelto — no toca la red. Quien la
 * usa decide de dónde salen los precios (Shopify en el build, o el fallback
 * de config).
 */
import { ProductCard } from '@/components/commerce/ProductCard';
import type { StoreProduct } from '@/lib/config';

export function ProductGrid({
  products,
}: {
  products: { product: StoreProduct; price: number }[];
}) {
  return (
    <section id="productos" className="bg-[#24262A] py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={
            products.length === 1
              ? 'mx-auto grid max-w-sm gap-4 sm:gap-5'
              : 'grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6'
          }
        >
          {products.map(({ product, price }) => (
            <ProductCard key={product.handle} product={product} price={price} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar tipos**

```bash
npx tsc --noEmit
```

Esperado: sin errores. (Los componentes todavía no se renderizan en ninguna página — eso es el Task 4.)

- [ ] **Step 5: Commit**

```bash
git add lib/config.ts components/commerce/ProductCard.tsx components/sections/ProductGrid.tsx
git commit -m "feat(tienda): lista curada de productos y componentes de la grilla"
```

---

### Task 4: La página `/tienda`

**Files:**
- Create: `components/sections/StoreHero.tsx`
- Create: `app/tienda/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `lib/config.ts` (headlines de la tienda)

**Interfaces:**
- Consumes: `ProductGrid`, `STORE_PRODUCTS`, `StoreProduct`, `Navbar` con props (Task 2), `getProduct` y `formatARS` de `lib/shopify.ts`.
- Produces: la ruta `/tienda`.

- [ ] **Step 1: Agregar los headlines de la tienda a config**

Al final de `lib/config.ts`:

```ts
/** Copy del encabezado de /tienda. */
export const STORE_HEADLINES = {
  eyebrow: 'Tienda oficial',
  title: 'Accesorios que resuelven',
  titleAccent: 'problemas reales',
  sub: 'Productos elegidos de a uno, probados en la calle argentina. Envío gratis a todo el país y 30 días para devolverlo si no te convence.',
} as const;
```

- [ ] **Step 2: Crear `StoreHero`**

`components/sections/StoreHero.tsx`:

```tsx
/**
 * Encabezado de /tienda. Deliberadamente sobrio: sin video, sin countdown y
 * sin la presión de la landing de pauta. Quien llega acá está navegando la
 * marca, no cayendo de un anuncio.
 */
import { BRAND, STORE_HEADLINES } from '@/lib/config';
import { Stars } from '@/components/ui/Stars';

export function StoreHero() {
  return (
    <section className="bg-[#24262A] pt-10 sm:pt-14 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
        <p className="eyebrow">{STORE_HEADLINES.eyebrow}</p>
        <h1 className="heading-display mt-2 text-3xl leading-tight sm:text-4xl md:text-6xl">
          {STORE_HEADLINES.title}{' '}
          <span className="text-accent">{STORE_HEADLINES.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-300 md:text-base">
          {STORE_HEADLINES.sub}
        </p>

        {/* Prueba social agregada: los números, sin testimonios. Los reviews
            de config son del soporte y acá quedarían fuera de lugar. */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-300">
          <Stars rating={BRAND.averageRating} />
          <span>
            <strong className="text-white">{BRAND.averageRating}</strong> ·{' '}
            {BRAND.socialProofCount} {BRAND.socialProofLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
```

`Stars` está en `components/ui/Stars.tsx` y su firma es
`Stars({ rating, size = 16, className = '' })` — la prop es `rating`, ya
verificado.

- [ ] **Step 3: Crear la página**

`app/tienda/page.tsx`:

```tsx
/**
 * Home de tienda — grilla de productos de CARMANIA.
 *
 * Server Component. Lee el precio de cada producto de Shopify en el build y
 * cae al fallback de config si la API no responde, igual que `app/page.tsx`.
 *
 * Ojo con el gotcha del proyecto: en Cloudflare Pages no corre ISR, así que
 * estos precios se congelan en el build. Si cambiás un precio en Shopify,
 * hay que redeployar (ver CLAUDE.md → Gotchas).
 */
import type { Metadata } from 'next';
import { PromoBar } from '@/components/layout/PromoBar';
import { Navbar, type NavLink } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StoreHero } from '@/components/sections/StoreHero';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { TrustBlock } from '@/components/sections/TrustBlock';
import { CarBrands } from '@/components/sections/CarBrands';
import { WhatsAppFloat } from '@/components/overlays/WhatsAppFloat';
import { CartProvider } from '@/components/commerce/CartProvider';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { FloatingCartButton } from '@/components/commerce/FloatingCartButton';
import { getProduct, getBundlesData, type BundleData } from '@/lib/shopify';
import { BUNDLES, STORE_PRODUCTS, type StoreProduct } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tienda — CARMANIA',
  description:
    'Accesorios premium para tu auto. Envío gratis a todo el país, 3 cuotas sin interés y 30 días de devolución.',
  openGraph: {
    title: 'Tienda — CARMANIA',
    description:
      'Accesorios premium para tu auto. Envío gratis a todo el país y 30 días de devolución.',
  },
  alternates: { canonical: '/tienda' },
};

const STORE_LINKS: NavLink[] = [{ href: '#productos', label: 'Productos' }];

export default async function TiendaPage() {
  // Un fetch por producto. Con 1-3 productos no justifica una query batch;
  // si la lista crece, conviene una sola query con `nodes`.
  const products: { product: StoreProduct; price: number }[] = await Promise.all(
    STORE_PRODUCTS.map(async (product) => {
      try {
        const live = await getProduct(product.handle);
        const amount = live?.priceRange.minVariantPrice.amount;
        return {
          product,
          price: amount ? parseFloat(amount) : product.fallbackPrice,
        };
      } catch (err) {
        console.error(`[Shopify] No pude traer el precio de ${product.handle}:`, err);
        return { product, price: product.fallbackPrice };
      }
    }),
  );

  // El carrito se comparte con la landing (persiste entre páginas), así que
  // necesita los mismos precios de bundles. Sin esto `buildTiers` igual
  // funciona — cae a los `fallbackVariantId` de config — pero el drawer
  // mostraría precios de fallback y el visitante vería números distintos a
  // los de la landing.
  let bundlesData: Record<string, BundleData> = {};
  try {
    bundlesData = await getBundlesData(BUNDLES.map((b) => b.productId));
  } catch (err) {
    console.error('[Shopify] No pude traer datos de bundles:', err);
  }

  return (
    <CartProvider bundlesData={bundlesData}>
      <PromoBar />
      <Navbar links={STORE_LINKS} homeHref="/tienda" />

      <main>
        <StoreHero />
        <ProductGrid products={products} />
        <div id="trust">
          <TrustBlock />
        </div>
        <CarBrands />
      </main>

      <Footer />

      <WhatsAppFloat />
      <FloatingCartButton />
      <CartDrawer />
    </CartProvider>
  );
}
```

- [ ] **Step 4: Sumar `/tienda` al sitemap**

En `app/sitemap.ts`, reemplazar el cuerpo del `return` por:

```ts
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
  ];
```

Y actualizar el comentario de arriba, que hoy dice que la landing es una sola página.

- [ ] **Step 5: Verificar el build y los canonicals**

```bash
npx tsc --noEmit && npm run build
echo "--- canonical de / ---"
grep -oE 'rel="canonical" href="[^"]*"' .next/server/app/index.html
echo "--- canonical de /tienda ---"
grep -oE 'rel="canonical" href="[^"]*"' .next/server/app/tienda.html
echo "--- el preload del hero NO debe estar en /tienda ---"
grep -c 'VideoPrincipal-poster' .next/server/app/tienda.html
echo "--- links del navbar en /tienda ---"
grep -oE 'href="#(how|pricing|reviews|trust|faq)"' .next/server/app/tienda.html | sort -u
```

Esperado:
- canonical de `/` → `https://oferta.carmaniaoficial.com`
- canonical de `/tienda` → `https://oferta.carmaniaoficial.com/tienda`
- el `grep -c` del poster devuelve `0`
- de los anchors de la landing solo aparece `#trust` (la sección existe en `/tienda`); `#how`, `#pricing`, `#reviews` y `#faq` no deben aparecer

- [ ] **Step 6: Verificar en el navegador**

```bash
npm run dev
```

Con el dev server corriendo, abrir `http://localhost:3000/tienda` y confirmar:
- la grilla muestra la card del soporte con su precio y linkea a `/`
- el logo del navbar lleva a `/tienda` y "Productos" scrollea a la grilla
- el botón de carrito abre el drawer sin errores en consola
- `http://localhost:3000/` sigue viéndose exactamente igual que antes

- [ ] **Step 7: Commit**

```bash
git add app/tienda/page.tsx components/sections/StoreHero.tsx app/sitemap.ts lib/config.ts
git commit -m "feat(tienda): home de tienda en /tienda con grilla de productos"
```

---

## Estado final esperado

- `main` con 4 commits nuevos por encima de `edff40d`, **sin pushear**.
- `/tienda` funcionando en local, con una sola card (el soporte) hasta que existan los productos nuevos.
- `/` sirviendo exactamente el mismo HTML que antes.

## Después de este plan (fuera de alcance)

- Cargar los dos productos nuevos en Shopify y escribir su landing.
- Sumar sus entradas a `STORE_PRODUCTS`.
- Actualizar `CLAUDE.md`: la arquitectura deja de ser de una sola ruta.
- Cambiar el redirect del apex para que apunte a `/tienda`.
- Recién ahí, pushear todo junto.
