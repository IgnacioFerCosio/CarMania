# CARMANIA Landing — Guía del proyecto

## Qué es esto
Landing page de conversión para el **Soporte Magnético PRO™** de CARMANIA.
Es el único producto de la marca por ahora — esta landing es toda la
presencia web del producto.

## Arquitectura
- **Next.js 14** (App Router, TypeScript, Tailwind CSS). Código propio.
- **Hosting:** Cloudflare Pages. Dominio: `oferta.carmaniaoficial.com`.
  (Antes era Vercel — la migración ya está hecha; no quedan paquetes ni
  config de Vercel en el repo.)
- **Headless de Shopify:** la landing lee precios/variantes vía Storefront
  API y, al comprar, redirige al checkout nativo de Shopify (donde está
  configurado MercadoPago como pasarela).
- La tienda online de Shopify se va a **ocultar** (tema vaciado + redirect
  a la landing). NO se protege con contraseña porque eso rompería el
  checkout.

## Decisiones importantes
- **Hosting en Cloudflare Pages** — se evaluó migrar la landing a Shopify y
  se descartó (implicaría un rewrite completo en Liquid). El costo de estar
  en Cloudflare es que **no hay ISR** (ver Gotchas).
- **SEO: la landing SÍ se indexa** (`robots`/`sitemap` + `index: true` en
  metadata). Es la única presencia web del producto, no hay tienda general
  que compita en los resultados de Google.
- **Bundles = productos Shopify separados** (no variantes). Los 3 product
  IDs viven en `lib/config.ts` → `BUNDLES`.
- **Pixel de Meta:** los eventos `PageView` / `ViewContent` / `AddToCart` /
  `InitiateCheckout` se disparan desde el código de la landing. El evento
  **`Purchase` ocurre en el checkout de Shopify** y debe configurarse del
  lado de Shopify (canal de ventas de Meta), NO en este repo.

## Datos de producto (¡importante para el copy!)
- El kit incluye **1 (una) chapita metálica adhesiva por unidad** — NO tres.
- Compatible con MagSafe nativo; si el celular no tiene MagSafe, se usa la
  chapita metálica adhesiva incluida.

## Archivos clave
- `lib/config.ts` — ~90% del copy editable: textos, precios fallback,
  bundles, reviews, FAQ, marcas. **Editar acá antes de tocar componentes.**
- `lib/shopify.ts` — cliente de la Storefront API (`getProduct`,
  `getBundlesData`, `createCheckout`).
- `app/page.tsx` — Server Component; fetchea Shopify **en el build**
  (ver Gotchas: los precios NO se actualizan solos).
- `components/commerce/BuyButton.tsx` — único punto que crea el carrito
  (`cartCreate`) y redirige al checkout de Shopify.

## Variables de entorno
4 variables, todas con prefijo `NEXT_PUBLIC_*` → son **públicas** (se
compilan en el JS del cliente). No hay secretos en el proyecto. Ver
`.env.example`. En Cloudflare Pages hay que cargarlas a mano en
*Settings → Environment variables* para Production y Preview. Como los
precios se resuelven en el build, si estas variables faltan el build sale
con los precios fallback de `lib/config.ts` en vez de fallar.

## Seguridad
- Headers configurados en `_headers` (formato de Cloudflare Pages): CSP,
  HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy. **No hay `vercel.json`.** `next.config.js` tiene su
  propio `headers()` casi idéntico, pero el que se sirve en producción es
  el de `_headers` — editá ese.
- **El dev server necesita `'unsafe-eval'`; producción NO.** Fast Refresh de
  Next compila con `eval`, así que sin ese flag el `npm run dev` tira un
  `EvalError` que mata el bundle del cliente entero: se cae la hidratación y
  los componentes `'use client'` dejan de montarse (los `<video>` de
  `LazyVideo` desaparecen sin dejar rastro en el DOM). Por eso el
  `headers()` de `next.config.js` lo agrega **solo** cuando
  `NODE_ENV === 'development'`. No lo copies a `_headers`: fuera de esa
  condición, la CSP de ambos archivos tiene que quedar espejada byte a byte.
- La CSP tiene `media-src 'self'`: **los videos tienen que estar en
  `/public`.** Apuntar un `<video>` a un CDN externo los rompe en
  producción.
- La CSP permite explícitamente `connect.facebook.net` / `facebook.com`
  (Meta Pixel) y `*.myshopify.com` (el `cartCreate` corre client-side).
- Los dos hosts raros de `connect-src` (`…ecs.us-east-2.on.aws` y
  `…us-central1.run.app`) son el **Conversions API Gateway** del pixel: la
  config del pixel (`connect.facebook.net/signals/config/<id>`, clave
  `openbridge`) le dice al navegador que mande una copia de cada evento ahí.
  Sin permitirlos, el pixel clásico anda igual pero la copia por servidor se
  descarta en silencio (sólo se ve en la consola). Si Meta rota esos hosts,
  hay que actualizarlos: se leen de esa misma URL de config.
- Tras un deploy, verificar el Pixel con la extensión **Meta Pixel Helper**
  por si la CSP bloqueó algo.

## Comandos
- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npx tsc --noEmit` — chequeo de tipos
- **`npm test`** — verificación completa, ver abajo

## Testing

`npm test` corre siete pasos y corta al primer fallo. **Correlo antes de dar
cualquier cambio por bueno.** La única dependencia es Vitest (dev), porque
Node no resuelve los imports sin extensión de `lib/`.

| Paso | Qué protege |
|---|---|
| `tsc` | tipos |
| `test:unit` | la escalera de upsell (`lib/tiers.ts`) y los invariantes de la config |
| `check:assets` | que exista en `/public` todo lo que el código pide |
| `check:csp` | que las dos copias de la CSP digan lo mismo |
| `check:shopify` | que cada producto de la config exista **desde el canal de la landing** |
| `build` | que compile |
| `gate` | que ninguna página haya cambiado sin querer |

**Lo que NO cubre:** el carrito en el browser (agregar, upsell, persistir entre
páginas). Eso es client-side contra Shopify en vivo y hoy se prueba a mano.

Buildea en `.next-verify`, así que **no le rompe el cache al `next dev`** que
tengas levantado.

**El gate de prerender** es el que más vale. Compara el HTML prerenderizado de
las 4 rutas contra un baseline en `tests/baseline/`. Existe porque acá casi
todo es compartido: tocar el Navbar, `lib/config.ts` o el `CartProvider` mueve
las cuatro páginas a la vez, y `/` es la que factura.

Un `DIFF` **no es necesariamente un error**. Si el cambio era a propósito:
mirá el diff que te imprime, confirmá que es lo que querías, y aceptalo con
`npm run gate:capture`. Lo que el gate impide es que algo se cuele sin que
nadie lo haya mirado.

**`check:assets`** compara contra el `readdir` real y no con `existsSync`,
porque Cloudflare distingue mayúsculas y Windows no: `/Parasol/foto.webp`
contra una carpeta `parasol/` anda en local y tira 404 en producción. Ya pasó.
Los archivos que todavía no existen viven en la lista `PENDIENTES` del script,
cada uno con su motivo.

**`check:csp`** compara `_headers` (la que se sirve) contra `next.config.js`
(la de dev). Desincronizarlas falla en silencio: agregás un dominio en dev,
anda todo, y en producción la CSP lo bloquea sin un solo error visible.

**`test:unit`** (`tests/unit/`) prueba `nextTierOf` y compañía con una chain
de mentira — en particular que el último nivel de un producto no ofrezca el
primero del siguiente como upsell — y que la config cierre: precios tachados
mayores que los reales, unidades que suben en cada nivel, GIDs sin repetir
entre productos, `fallbackPricing` espejo del x1, la card de `/tienda` con el
mismo handle y precio que su landing, y que las promesas del copy ("2ª al
50%", "3ª GRATIS", "3x2 en packs") cierren contra los números, con $10 de
tolerancia por el redondeo de Shopify.

**`check:shopify`** (`tests/contract/`) pega a la Storefront API con el mismo
token público que usa la página. Verifica que cada `productId` cargado sea
visible desde ese canal, que su variante sea el `fallbackVariantId`, que el
precio y el tachado coincidan con el fallback, y que `productHandle` resuelva.
Existe porque un producto puede estar activo en el admin y no publicado al
canal "Carmania Headless" — la API lo devuelve `null` y el botón falla con
"No pudimos agregar el producto"; pasó con los packs del parasol (bundles,
que el admin publica sólo desde el listado). Necesita red y `.env.local`; sin
eso se saltea avisando, para que `npm test` siga sirviendo offline.

Si agregás una landing: sumá su ruta a `ROUTES` en `scripts/prerender-gate.sh`
y su config a `LANDINGS` en los dos tests.

## Gotchas
- **Los precios de Shopify se congelan en el build.** `app/page.tsx` declara
  `revalidate = 300` y `lib/shopify.ts` pasa `next: { revalidate: 300 }`,
  pero **el ISR no corre en Cloudflare Pages**: las rutas con `revalidate` se
  prerenderizan durante el build y se sirven como assets estáticos. O sea que
  el `revalidate = 300` queda de adorno.
  Consecuencia: **si cambiás un precio en Shopify, la landing lo sigue
  mostrando viejo hasta el próximo deploy.** El checkout sí lo toma en vivo,
  así que quedan desfasados entre sí.
  Verificado en producción (2026-07-30): mismo `ETag` entre requests con
  cache-buster y cero headers de revalidación (`age`, `cf-cache-status`,
  `x-nextjs-cache`).
  Arreglo rápido: redeploy. Arreglo durable pendiente: webhook
  `products/update` de Shopify → Deploy Hook de Cloudflare Pages.
- Ojo con la dirección del desfase: si SUBÍS un precio, el cliente ve el
  viejo (más barato) y el checkout le cobra el nuevo. Redeployá siempre
  después de tocar precios.
- Si editás una imagen en `/public` y no se actualiza en dev, borrá la
  carpeta `.next` (cache de Next.js) y reiniciá el server.
