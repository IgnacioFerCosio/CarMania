# CARMANIA Landing — Guía del proyecto

## Qué es esto
Landing page de conversión para el **Soporte Magnético PRO™** de CARMANIA.
Es el único producto de la marca por ahora — esta landing es toda la
presencia web del producto.

## Arquitectura
- **Next.js 14** (App Router, TypeScript, Tailwind CSS). Código propio.
- **Hosting:** Vercel. Dominio: `oferta.carmaniaoficial.com`.
- **Headless de Shopify:** la landing lee precios/variantes vía Storefront
  API y, al comprar, redirige al checkout nativo de Shopify (donde está
  configurado MercadoPago como pasarela).
- La tienda online de Shopify se va a **ocultar** (tema vaciado + redirect
  a la landing). NO se protege con contraseña porque eso rompería el
  checkout.

## Decisiones importantes
- **Hosting en Vercel** — se evaluó migrar la landing a Shopify y se
  descartó (implicaría un rewrite completo en Liquid).
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
- `app/page.tsx` — Server Component; fetchea Shopify con ISR
  (`revalidate = 300`, o sea cada 5 min).
- `components/commerce/BuyButton.tsx` — único punto que crea el carrito
  (`cartCreate`) y redirige al checkout de Shopify.

## Variables de entorno
4 variables, todas con prefijo `NEXT_PUBLIC_*` → son **públicas** (se
compilan en el JS del cliente). No hay secretos en el proyecto. Ver
`.env.example`. En Vercel hay que cargarlas a mano en
*Settings → Environment Variables* para los entornos Production y Preview.

## Seguridad
- Headers configurados en `vercel.json`: CSP, HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- La CSP permite explícitamente `connect.facebook.net` / `facebook.com`
  (Meta Pixel) y `*.myshopify.com` (el `cartCreate` corre client-side).
- Tras un deploy, verificar el Pixel con la extensión **Meta Pixel Helper**
  por si la CSP bloqueó algo.

## Comandos
- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npx tsc --noEmit` — chequeo de tipos

## Gotchas
- Si editás una imagen en `/public` y no se actualiza en dev, borrá la
  carpeta `.next` (cache de Next.js) y reiniciá el server.
