# Parasol PRO™ — Assets pendientes y checklist de pre-publicación

Extraído de `docs/superpowers/specs/2026-09-02-parasol-landing-design.md`
(§10 y §10.1). La landing `/parasol` ya está commiteada y renderiza con
fallbacks/placeholders; nada de esta lista bloquea el scaffold, pero todo
tiene que estar resuelto antes de que la ruta reciba tráfico.

## 10. Assets

Todo bajo `/public/parasol/`.

**Ya cargados** (optimizados desde `Parasol/Landing/nueva landing/`):

- ✅ `hero/parasol-hero.webp` — imagen del producto, LCP (PNG 5.5MB → webp 43KB, 1600×1600)
- ✅ `how-to-use/01-sacalo-de-la-funda.mp4` · `02-abrilo-como-paraguas.mp4` · `03-encajalo-parabrisas.mp4` — re-encodeados H.264 sin audio, 720×720, ~0.6–1MB c/u (fuente ~7MB c/u)
- ✅ `use-cases/{calor,tablero,privacidad,volante,aire,tapizados}.webp` — 6 fotos del grid (generadas con Gemini, optimizadas 800px webp, 33–83KB c/u)
- ✅ `before-after/{sin,con}-parasol.webp` — comparador deslizable (Gemini, 1600px webp, ~100KB/83KB)

- ✅ `bundles/ParasolX1.webp`, `ParasolX2.webp`, `ParasolX3.webp` — las mismas fotos que tienen los productos en Shopify (x1 es el hero; x2/x3 generadas con Gemini), 1600px webp, 51–82KB c/u
- ✅ `reviews/*.webp` — 12 fotos

**Pendientes:** nada.

**CSP:** todos los `<video>` deben servirse desde `/public` (`media-src 'self'`
en `_headers`). Apuntar a un CDN externo los rompe en producción.

Los assets del **soporte** se quedan donde estaban (`/public/hero`,
`/public/how-to-use`, `/public/use-cases`, …); la separación es por el prefijo
`/parasol/`. Migrar el soporte a `/public/soporte/` es otro laburo (toca su
config, que está en producción).

### 10.1 Checklist de pre-publicación

Nada de esto bloquea el scaffold, pero **todo tiene que estar tildado antes de
que `/parasol` reciba tráfico**.

- [x] Precios reales en `bundles` (los 3) — espejo de Shopify (2026-09-11)
- [x] `productId` + `fallbackVariantId` reales de Shopify (los 3)
- [ ] **Publicar Pack x2 y Pack x3 al canal "Carmania Headless"** en Shopify.
      Hoy están sólo en Tienda online + Facebook & Instagram: la Storefront
      API devuelve `null` para los dos, así que la landing no puede leerlos ni
      agregarlos al carrito. El x1 sí está publicado.
- [x] Imagen del hero — `hero/parasol-hero.webp`
- [x] 3 videos de `HowItWorks`
- [x] 6 fotos del grid de casos de uso — `use-cases/*.webp`
- [x] 2 fotos del comparador antes/después — `before-after/{sin,con}-parasol.webp`
- [x] 3 fotos de bundle
- [ ] **Reseñas reales** — reemplazar las inventadas de §4.1
- [ ] **`socialProofCount` / `socialProofLabel` reales** — hoy "Miles de autos protegidos"
- [ ] **`ratingBreakdown` real** — coherente con las reseñas reales
- [ ] Redeploy después de tocar precios (ver CLAUDE.md → Gotchas: el ISR no
      corre en Cloudflare, los precios se congelan en el build)
- [ ] Verificar el Pixel con Meta Pixel Helper por si la CSP bloqueó algo
- [x] Pasar `upsellChain={ALL_UPSELL_CHAINS}` en app/page.tsx y app/tienda/page.tsx
      (y cambiar el `ids` a `ALL_UPSELL_CHAINS.map(t => t.productId).filter(Boolean)`).
      Hecho el 2026-09-11 junto con los IDs; `nextTierOf` corta en el borde
      entre productos para que soporte x6 no ofrezca "parasol x1" como upsell.
