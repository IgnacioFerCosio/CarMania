# Landing "Parasol PRO™" — Diseño

**Fecha:** 2026-09-02
**Estado:** aprobado (brainstorming) — pendiente plan de implementación
**Fuente de contenido:** `C:\Users\ignaf\Downloads\Parasol_PRO_Landing_Contenido.md`

---

## 1. Objetivo

Segunda landing de conversión para CARMANIA, producto **Parasol PRO™**, en la
ruta `/parasol` del mismo proyecto Next. Convive con `/` (Soporte Magnético
PRO™) y `/tienda` — no reemplaza nada.

Reutiliza **exactamente** la estructura, paleta, tipografía y componentes de la
landing del soporte. Solo cambia el contenido (copy, media, precios). El doc de
contenido es explícito: "no rediseñes nada de estructura".

### Alcance de esta entrega

Scaffold completo con placeholders. **No se puede publicar todavía** porque
faltan datos externos:

- Precios reales (el doc dice "Completar los montos reales antes de publicar").
- Los 3 productos de Shopify (Parasol x1/x2/x3) — no existen → sin variant IDs.
- Video e imágenes del producto.

La página queda commiteada (sin push), renderizando con fallbacks/placeholders,
lista para completar cuando esos datos existan.

---

## 2. Enfoque arquitectónico

**Problema:** 32 componentes importan datos product-específicos directo de
`lib/config.ts` (un módulo global de un solo producto). Varias secciones además
tienen copy y rutas de assets hardcodeadas en el JSX. El carrito
(`lib/tiers.ts`) importa `UPSELL_CHAIN` como única fuente.

**Solución elegida (Enfoque B):** parametrizar los componentes con una prop
`config` **opcional** que defaultea a la config del soporte.

- `/` y `/tienda` pasan a recibir el mismo default que ya usaban → output
  byte-idéntico, sin cambio de comportamiento.
- `/parasol` pasa `config={PARASOL}`.
- Los diffs sobre componentes vivos son **aditivos** (agregar un parámetro con
  default), no cambian lógica.

**Descartado:**

- *Enfoque A (duplicar `components/parasol/*`)*: riesgo cero sobre `/` pero
  ~20 archivos casi idénticos y doble mantenimiento para una marca que ya tiene
  2 productos y sumará más. La "misma familia" se desincroniza.
- *Enfoque C (módulo de config activa)*: imposible — los Server Components los
  renderizan las dos rutas y no se puede cambiar un import por-ruta.

---

## 3. Estructura de archivos

```
lib/
  landings/
    types.ts        NUEVO — tipo LandingConfig
    soporte.ts      NUEVO — la data product-específica actual de config.ts, movida
    parasol.ts      NUEVO — contenido del doc, con placeholders
  config.ts         QUEDA para lo global de marca + re-export de soporte (compat)
  tiers.ts          buildTiers() recibe la chain por parámetro (default: soporte)

app/
  page.tsx          pasa config={SOPORTE} a las secciones
  parasol/
    page.tsx        NUEVO — pasa config={PARASOL}, compone las 11 secciones
  sitemap.ts        + entrada /parasol

components/
  sections/*.tsx    cada uno gana prop `config?: LandingConfig` (default: SOPORTE)
  sections/PitchBlock.tsx   NUEVO — headline con palabra accent + párrafo

docs/superpowers/specs/
  parasol-assets.md NUEVO — checklist de media pendiente
```

### 3.1 Qué queda global en `lib/config.ts`

`BRAND.name` (`'CARMANIA'`), `PROMO_BARS`, `MEDIA_FEATURED`, `TRACKING`,
`WHATSAPP`, `PAYMENTS`, `SHIPPING`, `RETURNS`, `URGENCY`, `STORE_PRODUCTS`,
`STORE_HEADLINES`.

Para no romper los ~32 imports existentes de golpe, `config.ts` re-exporta los
símbolos product-específicos desde `./landings/soporte` (`HEADLINES`, `BUNDLES`,
`REVIEWS`, etc.). Los componentes migran a leer de la prop `config`; el
re-export es la red de seguridad durante la migración y para cualquier consumidor
no migrado.

### 3.2 Regla anti-ciclo (obligatoria)

La dependencia es **unidireccional**: `config.ts` → `landings/*.ts`. Nunca al
revés.

- `landings/soporte.ts` y `landings/parasol.ts` **no pueden importar nada de
  `lib/config.ts`**. Si necesitan un valor compartido, va en `landings/types.ts`
  o se duplica como literal.
- Motivo concreto: `STORE_PRODUCTS` (que queda en `config.ts`) usa hoy
  `FALLBACK_PRICING.price`, y `FALLBACK_PRICING` se muda a `soporte.ts`. Eso
  fuerza `config.ts → soporte.ts`; cualquier import en sentido contrario cierra
  el ciclo.
- El tipo **`TierId`** (hoy exportado por `config.ts`, consumido por
  `lib/tiers.ts`) se muda a `landings/types.ts`. `config.ts` lo re-exporta para
  compatibilidad.

---

## 4. El tipo `LandingConfig`

Un objeto por landing (`soporte.ts`, `parasol.ts`) con esta forma. Cada campo
sale de un export actual de `config.ts` salvo los marcados NUEVO.

| Campo | Origen actual | Notas parasol |
|---|---|---|
| `brand` | `BRAND` | `tagline: 'Parasol PRO™'`, `productHandle: 'parasol-pro'`, `socialProofCount: 'Miles'`, `socialProofLabel: 'de autos protegidos'` |
| `fallbackPricing` | `FALLBACK_PRICING` | placeholder, `// TODO PRECIO REAL` |
| `headlines` | `HEADLINES` | copy del doc §3–§5 |
| `heroMedia` | hardcode en `Hero` | NUEVO campo: `{ videoSrc, poster, badgeLine1: 'SE ABRE EN', badgeLine2: '3 SEGUNDOS' }` |
| `heroSubHighlights` | hardcode en `Hero` | NUEVO: `Hero` hoy hace `heroSub.split(/(MagSafe\|GPS)/)` con las keywords fijas en el JSX. Pasa a ser `string[]` por landing. Soporte: `['MagSafe', 'GPS']` (idéntico a hoy). Parasol: `['paraguas', 'UV']` |
| `sectionCopy` | strings hardcodeados en JSX | NUEVO: títulos de `Reviews`, `FAQ`, `Surfaces`, H2 de `Pricing`, cierre de `Reviews`, heading de `CarBrands` |
| `carBrands` | `CAR_BRANDS` | mismos logos; heading "Se adapta a cualquier parabrisas" |
| `steps` + `stepVideos` | `STEPS_V2` + hardcode en `HowItWorks` | 3 pasos del doc §5; `stepVideos` movido a config |
| `benefits` | `BENEFITS` | 6 cards del doc §6 (primeras 2 con `highlight: true`) |
| `pitchBlocks` | — | NUEVO: `Array<{ eyebrow?, headline, accentWord, body }>` — §4 y §8 |
| `reviews` | `REVIEWS` | **placeholders genéricos inventados** — ver §4.1 |
| `ratingBreakdown` | `RATING_BREAKDOWN` | coherente con el total de `reviews` |
| `faq` | `FAQ` | 5 preguntas del doc §11 (la de envíos y la legal reusan texto del soporte) |
| `qualityBadges` | `QUALITY_BADGES` | §10 — devolución 30 días (10 legales), garantía |
| `certifications` | `CERTIFICATIONS` | igual que soporte o `enabled: false` |
| `trustPillars` | `TRUST_PILLARS` | igual |
| `bundles` | `BUNDLES` | 3 bundles, `productId`/`fallbackVariantId` = **`''`** (ver §7), precios placeholder, + campo `image` por bundle (ver abajo) |
| `upsellChain` | `UPSELL_CHAIN` | deriva de `bundles` (parasol no tiene x4–x6 por ahora) |
| `whatsapp` (override texto CTA) | `WHATSAPP` | `WhatsAppFloat` acepta texto vía prop; "Consultanos por tu Parasol PRO" |
| `metadata` | cada `page.tsx` | `{ title, description, ogTitle, ogDescription, canonical: '/parasol' }` |

### 4.1 Reseñas placeholder — no publicar sin reemplazar

`parasol.ts` lleva reseñas **genéricas inventadas** (nombre, ciudad, fecha,
texto), del mismo shape que las del soporte, para que la sección `Reviews`
renderice completa durante el desarrollo.

Son placeholders, igual que los precios. Se marcan en el archivo con un bloque
de comentario visible y entran en el **checklist de pre-publicación** (§10),
porque a diferencia de un precio placeholder — que se nota — una reseña falsa
pasa desapercibida y quedaría publicada como si fuera un cliente real.

Lo mismo aplica a `brand.socialProofCount` / `socialProofLabel` y a
`ratingBreakdown`: el doc de contenido pide arrancar con algo genérico
("Miles de autos ya protegidos") y cambiarlo por el número real apenas haya
data propia del parasol.

Campos que el soporte usa y el parasol **no** (`useCases`, `surfaces`,
`techSpecs`, `whatsInBox`, `whatsInBoxGallery`, `painPoints`): van en el tipo
como opcionales o requeridos-con-valor. La `parasol.ts` los completa con lo
mínimo o el tipo los marca `?`. Decisión de implementación: marcarlos requeridos
y que `parasol.ts` los llene con placeholders vacíos es más simple que
condicionar cada componente; pero como `/parasol/page.tsx` **no monta** esas
secciones, la vía limpia es tiparlos opcionales. **Elegido: opcionales.**

---

## 5. Mapa sección del doc → componente

| Doc | Componente | Acción |
|---|---|---|
| §1 barra oferta | `CountdownBanner` + `PromoBar` | reuso tal cual (ya product-agnostic) |
| §2 header | `Navbar` | `links` nuevos: `#como`, `#precios`, `#opiniones`, `#faq` |
| §3 hero | `Hero` | **fix**: usar `config.heroMedia` en vez del hardcode "NO SE / CAE MÁS"; copy nuevo; video placeholder. **Corrección de copy**: el subtítulo del doc mezcla tercera persona con imperativo ("Bloquea los rayos UV, *mantiné* el auto fresco y *protegé* el tablero"). Se normaliza a tercera persona — "Bloquea… mantiene… protege" — que es el patrón del soporte |
| §4 "UN HORNO" | `PitchBlock` (NUEVO) | `pitchBlocks[0]` |
| §5 cómo funciona | `HowItWorks` | 3 pasos nuevos; 3 videos placeholder; `stepVideos` desde config |
| §6 beneficios | `Benefits` | `benefits` = 6 cards del doc |
| §7 prueba social | inline en `Hero` + cierre de `Reviews` | via `brand.socialProofCount/Label` + `sectionCopy` |
| §8 "CARTÓN" | `PitchBlock` (NUEVO) | `pitchBlocks[1]` |
| §9 pricing | `Pricing` | 3 bundles placeholder; H2 via `sectionCopy` |
| §10 garantía + pagos | `TrustBlock` | `qualityBadges` del doc |
| §11 FAQ | `FAQ` | 5 preguntas del doc |
| §12 CTA final + WhatsApp | `BackToPricingCTA` + `WhatsAppFloat` | texto CTA via config |

## 6. Orden de `/parasol/page.tsx`

Respeta el orden relativo de `/` para las secciones compartidas; las propias del
parasol se encajan donde el doc las pide.

| # | Sección | id ancla (se mantiene el de soporte, opción A) |
|---|---|---|
| 1 | `Hero` | `#top` |
| 2 | `PitchBlock` "TU AUTO YA NO ES UN HORNO" | — |
| 3 | `CarBrands` | — |
| 4 | `HowItWorks` | `#how` |
| 5 | `Benefits` | `#benefits` |
| 6 | `PitchBlock` "DEJÁ DE PELEAR CON EL PARASOL DE CARTÓN" | — |
| 7 | `Pricing` | `#pricing` |
| 8 | `Reviews` | `#reviews` |
| 9 | `TrustBlock` | `#trust` |
| 10 | `FAQ` | `#faq` |
| 11 | `BackToPricingCTA` | vuelve a `#pricing` |

**Ojo anclas:** hoy varias secciones hardcodean su `id` (`#pricing`, `#how`,
`#reviews`, `#faq`). El `Navbar` de soporte apunta a esos. Para no romper `/`,
los `id` se mantienen en soporte. Para `/parasol` hay dos opciones:

- **A (elegida):** dejar los `id` como están (`#pricing`, `#how`, `#reviews`) y
  que el `Navbar` de parasol apunte a esos mismos. Menos cambios, cero riesgo.
- B: parametrizar el `id` de cada sección. Más quirúrgico pero más superficie.

→ El `Navbar` de `/parasol` usa `links` con los anclas actuales
(`#how`, `#pricing`, `#reviews`, `#faq`). Los labels sí cambian
("Cómo funciona", "Oferta", "Opiniones", "FAQ").

## 7. Carrito

### 7.1 Parametrización

- `buildTiers(bundlesData, livePrices, chain = UPSELL_CHAIN)` — parámetro
  opcional al final.
- `CartProvider` gana prop `upsellChain?` (default: soporte).
- `nextTierOf`, `tierOf`, `upsellDelta`, `upsellExtraUnits` — sin cambios
  (operan sobre el array ya resuelto).
- `CartProvider` usa hoy `BRAND.tagline` como `content_name` del tracking
  (`addTier`, `upgradeLine`, `checkout`). Gana prop `productName?` para no
  reportar "Soporte Magnético PRO™" desde `/parasol`.
- `BuyButton` — sin cambios (ya 100% props).

### 7.2 Placeholders: string vacío, NO un GID falso

**Decisión crítica.** `BuyButton` resuelve la disponibilidad con
`const unavailable = !variantId`. Un GID placeholder tipo
`'gid://shopify/Product/PARASOL_X1_TODO'` es un string **truthy**:

- el botón queda **habilitado**,
- al click dispara `cartCreate` contra un merchandise inexistente,
- el drawer muestra *"No pudimos agregar el producto. Reintentá en un
  momento"* — un error transitorio engañoso.

Por eso `productId` y `fallbackVariantId` de los 3 bundles del parasol van en
**`''`**. En `Pricing`, `shopifyData?.variantId ?? b.fallbackVariantId` resuelve
a `''` → `unavailable = true` → botón deshabilitado con el mensaje correcto
("Producto no disponible. Recargá la página o escribinos por WhatsApp").

Además, `app/parasol/page.tsx` **filtra los productIds vacíos antes de llamar a
`getBundlesData`** y omite la llamada si no queda ninguno. Motivo: con un GID
malformado la Storefront API devuelve un **error top-level** (no un nodo
`null`), que haría tirar a `shopifyFetch`, ensuciar cada build con un error y
gastar una request al pedo. Con IDs vacíos filtrados, el caso ni se presenta.

Cuando existan los productos reales, se reemplazan los `''` por los GIDs y todo
el flujo (fetch, precios vivos, upsell, checkout) funciona sin más cambios.

### 7.3 Carrito compartido entre landings

El `cart_id` vive en un único `localStorage` (`carmania_cart_id`), así que el
carrito **persiste entre `/` y `/parasol`**. Si `buildTiers` recibiera solo la
chain de la página actual, una línea del otro producto caería en
`tierOf() → null` y **perdería su banner de upsell** (verificado en
`CartDrawer.tsx:180-183` — degrada sin romper, pero el upsell desaparece).

**Solución:** las dos páginas (y `/tienda`) pasan la **unión** de las chains
(soporte + parasol) a `getBundlesData` y a `buildTiers`. Costo: los productIds
de ambos productos en una sola query de build. Beneficio: el drawer resuelve
tiers correctamente sin importar en qué página se abra.

Mientras el parasol tenga IDs vacíos, la unión es efectivamente la del soporte
(los vacíos se filtran), así que esto no cambia nada hasta que existan los
productos.

### 7.4 Imágenes de bundle

`Pricing` arma hoy la foto por índice: `` `/bundles/BundleX${index}.webp` ``.
Cada bundle gana un campo **`image`** en config, y `BundleImage` pasa a recibir
la ruta en vez de calcularla. Soporte conserva sus rutas actuales (output
idéntico); parasol apunta a `/parasol/bundles/ParasolX{1,2,3}.webp`.

## 8. SEO / metadata / performance

- `app/parasol/page.tsx` → `metadata` con title/description/OG del doc y
  `alternates.canonical: '/parasol'`. Hereda `robots: { index: true }` del
  layout (el doc quiere que se indexe).
- **`export const revalidate = 300`** — mismo valor que `/` y `/tienda`. De
  adorno mientras Cloudflare no corra ISR (ver CLAUDE.md → Gotchas), pero
  consistente.
- **LCP:** `app/page.tsx` hace `ReactDOM.preload()` del poster del hero, con un
  comentario explícito de que se sacó del layout raíz justo para no precargarlo
  en `/tienda`, donde competía contra el LCP real. `/parasol` debe hacer **su
  propio** `ReactDOM.preload()` apuntando a `config.heroMedia.poster`
  (`as: 'image'`, `fetchPriority: 'high'`, `type: 'image/webp'`). Sin esto la
  landing nueva arranca con peor LCP que la del soporte.
- `app/sitemap.ts` → nueva entrada
  `https://oferta.carmaniaoficial.com/parasol`, `priority: 0.9`.
- `robots.ts` — sin cambios (`allow: '/'` ya cubre `/parasol`).

## 9. Tracking

- Pixel `PageView` (layout) y `ViewContent` / `AddToCart` / `InitiateCheckout`
  (componentes) — mismo pixel ID global, funcionan sin cambios.
- `Purchase` ocurre en el checkout de Shopify (fuera de este repo), cuando los
  productos existan.
- UTMs: `CartProvider` ya los captura y reenvía — sin cambios.

## 10. Assets pendientes (`docs/superpowers/specs/parasol-assets.md`)

Se crea un checklist con las rutas exactas bajo `/public/parasol/`:

- `hero/parasol-video.mp4` + `hero/parasol-video-poster.webp` (elemento LCP)
- `how-to-use/01-funda.mp4`, `02-abrir.mp4`, `03-encajar.mp4`
- `bundles/ParasolX1.webp`, `ParasolX2.webp`, `ParasolX3.webp`
- reviews (opcional)

**CSP:** todos los `<video>` deben servirse desde `/public` (`media-src 'self'`
en `_headers`). Apuntar a un CDN externo los rompe en producción.

Mientras los assets no existan, los componentes ya degradan a placeholder
(gradiente + inicial, poster faltante) sin romper la página.

### 10.1 Checklist de pre-publicación

Nada de esto bloquea el scaffold, pero **todo tiene que estar tildado antes de
que `/parasol` reciba tráfico**. Va en `parasol-assets.md` junto a la lista de
media.

- [ ] Precios reales en `bundles` (los 3) — reemplazan los placeholders
- [ ] `productId` + `fallbackVariantId` reales de Shopify (los 3) — hoy en `''`
- [ ] Video del hero + poster
- [ ] 3 videos de `HowItWorks`
- [ ] 3 fotos de bundle
- [ ] **Reseñas reales** — reemplazar las inventadas de §4.1
- [ ] **`socialProofCount` / `socialProofLabel` reales** — hoy "Miles de autos protegidos"
- [ ] **`ratingBreakdown` real** — coherente con las reseñas reales
- [ ] Redeploy después de tocar precios (ver CLAUDE.md → Gotchas: el ISR no
      corre en Cloudflare, los precios se congelan en el build)
- [ ] Verificar el Pixel con Meta Pixel Helper por si la CSP bloqueó algo

## 11. Verificación (antes de cerrar la implementación)

1. `npx tsc --noEmit` — limpio.
2. `npm run build` — OK.
3. `npm run dev` → `/` y `/tienda`: diff visual, **sin cambios** (defaults
   intactos). Comparar screenshots contra `main`.
4. `/parasol`: 11 secciones renderizan, sin errores de consola. Los 3 botones de
   compra están **deshabilitados** mostrando "Producto no disponible" (no
   habilitados tirando error de carrito). Meta Pixel dispara `PageView` +
   `ViewContent`.
5. **Carrito cruzado:** agregar un soporte desde `/`, navegar a `/parasol`,
   abrir el drawer → la línea del soporte conserva su banner de upsell.
6. **Build limpio:** `npm run build` sin errores de Shopify en el log
   (confirma que el filtro de IDs vacíos funciona).
7. Screenshots de `/parasol` (desktop + mobile) y de `/` para el commit.

## 12. Fuera de alcance

- Crear los productos en Shopify.
- Precios reales.
- Producción de video/fotos.
- Decidir subdominio vs subruta (queda `/parasol`; un subdominio se mapea
  después en Cloudflare sin tocar código).
- Migrar el soporte a la app nativa de Bundles/Multipack.
- Adoptar `PitchBlock` en la landing del soporte (posible después).
- `npm run` push / deploy — Ignacio lo ordena.

## 13. Riesgos

| Riesgo | Mitigación |
|---|---|
| Regresión visual en `/` al parametrizar 32 archivos | Prop `config` con default = soporte → output idéntico. `tsc` + diff visual de screenshots obligatorio. |
| Import circular `config.ts` ↔ `landings/*.ts` | Regla unidireccional de §3.2, verificada por `tsc`. `TierId` se muda a `types.ts`. |
| `config.ts` re-export mal armado rompe imports | Migración incremental; el re-export mantiene compat mientras tanto. |
| GIDs placeholder truthy habilitan el botón de compra y tiran error de carrito | Placeholders en `''`, no GIDs falsos (§7.2). Filtrar IDs vacíos antes de `getBundlesData`. |
| Línea del otro producto pierde el upsell en el carrito compartido | Pasar la unión de ambas chains a `buildTiers` en las tres páginas (§7.3). |
| `/parasol` con peor LCP que `/` | `ReactDOM.preload()` propio del poster (§8). Medir con Lighthouse antes de publicar. |
| Anclas duplicadas entre `/` y `/parasol` | Son páginas distintas, mismo `id` en cada una no colisiona. El `Navbar` de parasol apunta a los anclas locales. |
