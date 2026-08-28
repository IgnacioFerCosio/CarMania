# Home de tienda (`/tienda`) — Diseño

**Fecha:** 2026-08-28
**Estado:** aprobado, pendiente de implementación

## Objetivo

Sumar una home de tienda que liste los productos de CARMANIA, sin tocar la
landing del Soporte Magnético PRO™ (`/`), que está en uso como destino de las
campañas de Meta.

## Contexto relevado

- El repo es una sola ruta: `app/page.tsx` sirve la landing en `/` de
  `oferta.carmaniaoficial.com`. No hay routing previo.
- Shopify tiene 3 productos, y los 3 son el mismo soporte en distinta cantidad
  (x1 $39.990, pack x2 $59.985, pack x3 $74.990). No hay un segundo producto
  todavía; hay dos en camino.
- `carmaniaoficial.com` es la tienda Shopify, ya ocultada con un redirect
  **client-side** (`window.location.replace`) hacia `oferta.`. Para un crawler
  no existe: responde 200 con el tema completo (verificado con user-agent de
  Googlebot el 2026-08-28).
- Build estático (`next build` sin adapter ni `_routes.json`): no hay
  middleware ni routing por hostname disponible.

## Decisiones

1. **La landing no se mueve.** Queda en `/`. Agregar rutas no altera las
   existentes, así que la campaña de Meta no se toca en ningún momento.
2. **La ruta es `/tienda`, no `/home`.** "Home" en una URL es redundante y no
   aporta señal a Google.
3. **Una landing propia por producto**, no una plantilla de ficha genérica.
   Convierte mejor y permite pautar cada producto por separado.
4. **La grilla es una lista curada en config, no un fetch de "todos los
   productos"** de Shopify. Un fetch automático mostraría el soporte tres
   veces, porque los packs son productos separados y no variantes.
5. **Los packs x2/x3 no van en la grilla.** El upsell entre cantidades ya está
   diseñado dentro de la landing; repetirlo en la grilla lo canibaliza.
6. **El gate de publicación es git, no código.** Se construye `/tienda`
   completa y se commitea en local. No se pushea nada hasta que los dos
   productos nuevos existan con su landing. Sin feature flags ni exclusiones
   del sitemap: sería complejidad muerta.

## Alcance

**Entra:** la página `/tienda`, sus componentes, la entrada en config, el
refactor de metadata del layout y el sitemap.

**No entra:** las landings de los dos productos nuevos. No existe la materia
prima (ni productos en Shopify, ni fotos, ni copy, ni precios); diseñarlas
ahora sería inventar. La grilla se construye lista para recibirlas.

## Rutas

| Ruta | Contenido | Estado |
|---|---|---|
| `/` | Landing del Soporte Magnético PRO™ | Intacta |
| `/tienda` | Home de tienda con la grilla | Nueva |
| `/<slug>` | Landing de cada producto nuevo | Futuras, fuera de este spec |

Cuando se publique, el redirect del apex pasa a apuntar a `/tienda` (cambio en
el tema de Shopify, fuera de este repo).

## Datos: `STORE_PRODUCTS`

Nuevo export en `lib/config.ts`, siguiendo la convención del proyecto de tener
el copy editable ahí antes que en los componentes. Cada entrada declara:

- `handle` — handle del producto en Shopify (para leer el precio en el build)
- `title`, `blurb` — copy de la card
- `image` — ruta en `/public`
- `href` — a dónde linkea (`/` para el soporte; el slug propio para los nuevos)
- `fallbackPrice` — ARS, usado si la Storefront API no responde

Al lanzar tiene una sola entrada (el soporte). Sumar un producto es agregar una
entrada más y su página.

Los precios se leen de Shopify en el build con el `getProduct` que ya existe en
`lib/shopify.ts`, con el mismo patrón de fallback que usa `app/page.tsx`. Aplica
el gotcha conocido: los precios se congelan en el build (no hay ISR en
Cloudflare Pages), así que un cambio de precio en Shopify exige redeploy.

## Refactor del layout (obligatorio)

`app/layout.tsx` tiene tres cosas del soporte cableadas en el layout raíz. Hoy
no molestan porque hay una sola página; rompen apenas se agregue la segunda.
Las tres bajan del layout a `app/page.tsx`:

1. **`alternates.canonical: '/'`** (`layout.tsx:37`) — el más grave. Le diría a
   Google que `/tienda` *es* `/`, canibalizando el SEO de todo lo que se sume.
2. **`title` y `openGraph`** del soporte — cada página define los suyos.
3. **El `<link rel="preload">` del poster del hero** (`layout.tsx:60`) — en
   `/tienda` sería una precarga de prioridad alta de una imagen ausente,
   compitiendo contra el LCP real de esa página.

Queda en el layout raíz todo lo que sí es global: fuentes, GTM, Meta Pixel,
Cloudflare Analytics, Klaviyo, `metadataBase`, viewport, iconos.

## Navbar

`components/layout/Navbar.tsx` tiene los links cableados a anclas de la landing
(`#how`, `#pricing`, `#reviews`, `#trust`, `#faq`) y el logo apunta a `#top`. En
`/tienda` esas anclas no existen y los links quedarían muertos.

Los links pasan a entrar por props, con los actuales como default para no tocar
`app/page.tsx`. En `/tienda` recibe su propio juego, y el logo apunta a `/tienda`.

## Estructura de `/tienda`

```
PromoBar (top)                                    reusa
Navbar (links de tienda)                          reusa, con props
──────────────────────────────────────────────────────────────
StoreHero         NUEVO · sin video: H1 de marca + bajada + una línea
                  con los números agregados de reseñas (sin testimonios)
ProductGrid       NUEVO · una card por producto distinto
TrustBlock        reusa (TRUST_PILLARS)
CarBrands         reusa
──────────────────────────────────────────────────────────────
Footer                                            reusa
WhatsAppFloat · CartDrawer · FloatingCartButton    reusan
```

### Qué se reusa y qué no

**Reusable (es de marca):** `PROMO_BARS.top`, `TRUST_PILLARS`, `CAR_BRANDS`,
`WHATSAPP` (su mensaje predefinido ya dice "Estuve navegando por su tienda"),
`SHIPPING`, `PAYMENTS`, `RETURNS`, y el sistema de carrito completo.

**No se reusa (es del soporte):** `REVIEWS` y `FAQ` hablan del imán N52, MagSafe
y el Corolla — fuera de lugar en una home de tienda. `PROMO_BARS.sub`
("OFERTA POR TIEMPO LIMITADO") y el countdown son presión de landing de pauta.

De la prueba social se usan solo los agregados de `BRAND` (`socialProofCount`,
`averageRating`, `reviewsCount`), sin testimonios individuales.

## Estilos

Sin sistema visual nuevo. Se usan las clases y tokens existentes:
`heading-display`, `eyebrow`, la paleta `ink-*` / `accent`, el fondo `#24262A`.
Las cards siguen el patrón de `HowItWorks`: `rounded-2xl`, borde `ink-800`,
fondo `ink-950`.

## SEO

- `/tienda` define su propio `title`, `description`, `openGraph` y
  `alternates.canonical: '/tienda'`.
- Se agrega `/tienda` a `app/sitemap.ts`.
- `app/robots.ts` no cambia.

## Componentes nuevos

| Archivo | Responsabilidad |
|---|---|
| `app/tienda/page.tsx` | Server Component: lee precios de Shopify y compone la página |
| `components/sections/StoreHero.tsx` | Encabezado de marca de la tienda |
| `components/sections/ProductGrid.tsx` | Grilla; recibe los productos ya resueltos |
| `components/commerce/ProductCard.tsx` | Una card: imagen, título, blurb, precio, link |

`ProductGrid` no fetchea: recibe los datos por props. Así se puede renderizar en
cualquier página y se prueba sin red.

## Verificación

- `npx tsc --noEmit` sin errores.
- `npm run build` completa y prerenderiza `/` y `/tienda`.
- `/` sin cambios en lo que renderiza: mismo HTML visible y misma metadata
  que en `main`. El archivo `app/page.tsx` sí se edita — recibe el `title`,
  el `openGraph`, el `canonical` y el preload que bajan del layout — pero el
  resultado servido tiene que ser idéntico.
- El HTML de `/tienda` declara `canonical: /tienda`, y el de `/` sigue
  declarando `canonical: /`.
- El preload del poster del hero aparece solo en `/`.
- Los links del Navbar en `/tienda` apuntan a destinos existentes.
- El carrito abre y funciona desde `/tienda`.

## Pendientes fuera de este spec

- **El redirect del apex es client-side y los crawlers no lo ven**: Google
  puede indexar la tienda Shopify como duplicado. Conviene resolverlo con un
  301 real, o con `robots`/`canonical` del lado de Shopify.
- Actualizar `CLAUDE.md`: la arquitectura deja de ser de una sola ruta, y la
  decisión de "ocultar la tienda" ahora convive con una home propia.
- Cambiar el destino del redirect del apex a `/tienda` al publicar.
