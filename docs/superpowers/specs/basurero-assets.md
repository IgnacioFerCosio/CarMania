# Basurero Elegance PRO™ — checklist antes de publicar `/basurero`

La landing es un **esqueleto**: la estructura de `/inflador` y `/trabavolante`
(hero, beneficios en 6 cuadros, qué incluye, cómo funciona, packs x1/x2/x3,
comparativa, reseñas, garantía, FAQ y CTA final) con **todo el contenido en
placeholder**. Se ve en `npm run dev` y en las previews, pero en producción está
oculta con `comingSoon: true` en `STORE_PRODUCTS` (`lib/config.ts`): `/basurero`
da 404, no va al sitemap y no aparece en `/tienda`. **Publicarla es sacar ese
flag** después de cerrar todo lo de abajo. Lo pendiente está marcado con
`// TODO` en `lib/landings/basurero.ts`.

## 1. Qué hay que completar

| Qué | Dónde | Estado |
|---|---|---|
| Copy (hero, cuadros, pasos, qué incluye, comparativa, FAQ, metadata) | `// TODO COPY` en `lib/landings/basurero.ts` y la card de `STORE_PRODUCTS` | Placeholder genérico, sin specs. |
| Specs del producto (capacidad, material, medidas, cómo se sujeta, si es impermeable) | — | Sin datos. El copy no promete nada de esto. |
| Contenido de la caja | `whatsInBox.items` | Sólo "1 Basurero Elegance PRO™". |
| Precio de x1 / x2 / x3 | `BASURERO_BUNDLES`, `fallbackPricing`, `STORE_PRODUCTS` | Provisorio: $29.990 / $44.990 / $59.980 (tachados $54.990 / $109.980 / $164.970). Cumple "2ª al 50 %" y "3ª GRATIS". |
| Crear los 3 productos en Shopify y publicarlos al canal "Carmania Headless" | `productId` / `fallbackVariantId` en `''` | Pendiente. Hasta entonces el botón dice "Producto no disponible". |
| Handle del x1 | `brand.productHandle` y `STORE_PRODUCTS` | Supuesto: `basurero-elegance-pro`. |
| Si es universal, sumar la sección de marcas (`CarBrands`) | `app/basurero/page.tsx` | A decidir. |
| Plazos de envío | FAQ "¿Cuánto tarda en llegar?" | Igual que en las otras landings. |

## 2. Imágenes — todas pendientes

Hoy cada archivo es una caja oscura "FOTO PENDIENTE" con su ID, el brief y la
medida. Para reemplazarlo, subí la foto con el **mismo nombre y tamaño** en
`public/basurero/`. Todo se exporta al tamaño en que se ve (en Cloudflare
`/_next/image` devuelve el original).

| ID | Archivo | Qué va | Medida |
|---|---|---|---|
| BAS-01 | `hero/basurero-hero.webp` | El Elegance PRO puesto en el auto, en uso. Puede pasar a video de 540² (como el del trabavolante). | 1080² |
| BAS-02 | `hero/basurero-oscuro.webp` | Producto sobre fondo de estudio negro (card de `/tienda`). | 1200² |
| BAS-03…08 | `use-cases/beneficio-1…6.webp` | Un beneficio por cuadro (definir los 6 con el copy). | 400×600 |
| BAS-09 | `how-to-use/01-paso-1.webp` | Paso 1: cómo se coloca en el auto. | 1200×1000 |
| BAS-10 | `how-to-use/02-paso-2.webp` | Paso 2: uso en el día a día. | 1200×1000 |
| BAS-11 | `how-to-use/03-paso-3.webp` | Paso 3: cómo se vacía y se limpia. | 1200×1000 |
| BAS-12 | `whats-in-box/que-incluye.webp` | La caja y todo lo que trae. | 1024² |
| BAS-13…15 | `bundles/BasureroX1/X2/X3.webp` | 1, 2 y 3 basureros con su caja, fondo de estudio. | 900² |

Si los archivos finales cambian de nombre (p. ej. `beneficio-1` → `tapa`),
renombrá también la ruta en la config. Los pasos pueden pasar a video
(`steps[].video`, MP4 cuadrado sin audio). La comparativa acepta un recorte sin
fondo por columna (`comparison.columns[].image`, webp con transparencia, ~320 px
de alto, en `public/basurero/comparativa/`; sumar esa carpeta a `_routes.json`).

## 3. Reseñas

Ninguna. La sección no sale hasta que haya reales en `reviews` (mismo formato
que las del trabavolante; actualizar `ratingBreakdown` y `brand.reviewsCount`).
