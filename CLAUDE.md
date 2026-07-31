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
- La CSP tiene `media-src 'self'`: **los videos tienen que estar en
  `/public`.** Apuntar un `<video>` a un CDN externo los rompe en
  producción.
- La CSP permite explícitamente `connect.facebook.net` / `facebook.com`
  (Meta Pixel) y `*.myshopify.com` (el `cartCreate` corre client-side).
- Tras un deploy, verificar el Pixel con la extensión **Meta Pixel Helper**
  por si la CSP bloqueó algo.

## Comandos
- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npx tsc --noEmit` — chequeo de tipos

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
