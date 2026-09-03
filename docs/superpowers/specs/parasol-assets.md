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

**Pendientes:**

- `use-cases/{calor,tablero,privacidad,volante,aire,tapizados}.jpg` — 6 fotos del
  grid "menos calor / menos desgaste". Hoy caen al placeholder (gradiente +
  inicial). `next/image` tira un `400` en consola por cada una hasta que existan
  — cosmético, no rompe nada.
- `bundles/ParasolX1.webp`, `ParasolX2.webp`, `ParasolX3.webp` — fotos de las cards de pricing.
- reviews (opcional)

**CSP:** todos los `<video>` deben servirse desde `/public` (`media-src 'self'`
en `_headers`). Apuntar a un CDN externo los rompe en producción.

Los assets del **soporte** se quedan donde estaban (`/public/hero`,
`/public/how-to-use`, `/public/use-cases`, …); la separación es por el prefijo
`/parasol/`. Migrar el soporte a `/public/soporte/` es otro laburo (toca su
config, que está en producción).

### 10.1 Checklist de pre-publicación

Nada de esto bloquea el scaffold, pero **todo tiene que estar tildado antes de
que `/parasol` reciba tráfico**.

- [ ] Precios reales en `bundles` (los 3) — reemplazan los placeholders
- [ ] `productId` + `fallbackVariantId` reales de Shopify (los 3) — hoy en `''`
- [x] Imagen del hero — `hero/parasol-hero.webp`
- [x] 3 videos de `HowItWorks`
- [ ] 6 fotos del grid de casos de uso — `use-cases/{calor,tablero,privacidad,volante,aire,tapizados}.jpg`
- [ ] 3 fotos de bundle
- [ ] **Reseñas reales** — reemplazar las inventadas de §4.1
- [ ] **`socialProofCount` / `socialProofLabel` reales** — hoy "Miles de autos protegidos"
- [ ] **`ratingBreakdown` real** — coherente con las reseñas reales
- [ ] Redeploy después de tocar precios (ver CLAUDE.md → Gotchas: el ISR no
      corre en Cloudflare, los precios se congelan en el build)
- [ ] Verificar el Pixel con Meta Pixel Helper por si la CSP bloqueó algo
- [ ] Pasar `upsellChain={ALL_UPSELL_CHAINS}` en app/page.tsx y app/tienda/page.tsx
      (y cambiar el `ids` a `ALL_UPSELL_CHAINS.map(t => t.productId).filter(Boolean)`).
      Necesario para que una línea de parasol en el carrito conserve su banner de
      upsell si el usuario la ve desde / o /tienda. Hoy es imposible (BuyButton
      del parasol deshabilitado), pero apenas existan los variant IDs reales de
      Shopify hay que hacerlo.
