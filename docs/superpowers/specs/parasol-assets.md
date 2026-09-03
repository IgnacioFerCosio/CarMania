# Parasol PRO™ — Assets pendientes y checklist de pre-publicación

Extraído de `docs/superpowers/specs/2026-09-02-parasol-landing-design.md`
(§10 y §10.1). La landing `/parasol` ya está commiteada y renderiza con
fallbacks/placeholders; nada de esta lista bloquea el scaffold, pero todo
tiene que estar resuelto antes de que la ruta reciba tráfico.

## 10. Assets pendientes

Checklist con las rutas exactas bajo `/public/parasol/`:

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
que `/parasol` reciba tráfico**.

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
- [ ] Pasar `upsellChain={ALL_UPSELL_CHAINS}` en app/page.tsx y app/tienda/page.tsx
      (y cambiar el `ids` a `ALL_UPSELL_CHAINS.map(t => t.productId).filter(Boolean)`).
      Necesario para que una línea de parasol en el carrito conserve su banner de
      upsell si el usuario la ve desde / o /tienda. Hoy es imposible (BuyButton
      del parasol deshabilitado), pero apenas existan los variant IDs reales de
      Shopify hay que hacerlo.
