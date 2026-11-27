# Basurero Elegance PRO™ — investigación y checklist antes de publicar `/basurero`

La landing está armada con la estructura de `/inflador` y `/trabavolante`
(hero, beneficios en 6 cuadros, qué incluye, cómo funciona, packs x1/x2/x3,
comparativa, reseñas, garantía, FAQ y CTA final) y el copy ya es el del
producto. Se ve en `npm run dev` y en las previews, pero en producción está
oculta con `comingSoon: true` en `STORE_PRODUCTS` (`lib/config.ts`): `/basurero`
da 404, no va al sitemap y no aparece en `/tienda`. **Publicarla es sacar ese
flag** después de cerrar todo lo de abajo. Lo pendiente está marcado con
`// TODO` en `lib/landings/basurero.ts`.

## 1. El producto (consultado el 2026-11-27)

Es el **Car Trash Can de CarMount** ([carmount.com/shop/car-trash-can](https://carmount.com/shop/car-trash-can/)):
un basurero cilíndrico de metal negro mate que va en el portavasos, con tapa
que se abre apretándola y bolsitas descartables adentro. Su material (10 fotos
y un video de 12 s) está en
`C:\Users\ignaf\Desktop\Ecommerce\CarMania\Basurero Elegance Pro\Carmount\` y
**sólo sirve de referencia**: el producto lleva su logo y las fotos son suyas.

**Las specs de la landing son las que publica CarMount**, no las de nuestra
unidad. Hasta tener la ficha del proveedor o una unidad en la mano, cada una
está marcada `// TODO VERIFICAR (dato de CarMount)`:

| Dato | Lo que dice CarMount | Dónde lo usamos | Estado |
|---|---|---|---|
| Medidas | 65 mm de diámetro × 140 mm de alto | Paso 1, FAQ, beneficios | Verificar |
| Capacidad | ~465 ml | FAQ | Verificar |
| Material | "Metal" (no dice cuál) | Cuadro, comparativa, FAQ | Verificar |
| Bolsitas incluidas | 30 | Bonus del x1, qué incluye, FAQ | Verificar (es una promesa de la caja) |
| Tapa | Se abre apretándola ("Quick Open & Close") | Hero, cuadros, pasos | Verificar si cierra sola o a mano |
| Usos | Portavasos; también bolsillo de la puerta, camioneta, lancha, escritorio | Cuadro, nota, FAQ | — |

**Cómo lo venden:** "The cleanest upgrade you'll make this year". Tres ejes:
metal (premium, no parece de plástico), abre y cierra rápido, y mejora cómo se
ve el interior. Precio US$39 el x1; packs "compra 2, llevá 3" a US$78 y
"compra 4, llevá 6" a US$156 (US$26 c/u), envío gratis desde US$50, 30 días de
devolución y 1 año de garantía. 10 reseñas, todas de 5 estrellas (son de sus
clientes: **no se usan**). Venden aparte un pack de 6 bolsitas de repuesto.

## 2. Qué hay que decidir / confirmar

| Qué | Dónde | Estado |
|---|---|---|
| Proveedor y ficha técnica | — | Pendiente. Dos candidatos de Alibaba comparados en `basurero-referentes.md`, junto con lo que hay que preguntarles. Con la ficha se cierran las specs de arriba. |
| Si la unidad o la caja traen marca | — | Para las fotos, caja lisa o con el logo CARMANIA. |
| Precio de x1 / x2 / x3 | `BASURERO_BUNDLES`, `fallbackPricing`, `STORE_PRODUCTS` | Provisorio: $29.990 / $44.990 / $59.980 (tachados $54.990 / $109.980 / $164.970). Cumple "2ª al 50 %" y "3ª GRATIS". |
| Crear los 3 productos en Shopify y publicarlos al canal "Carmania Headless" | `productId` / `fallbackVariantId` en `''` | Pendiente. Hasta entonces el botón dice "Producto no disponible". |
| Handle del x1 | `brand.productHandle` y `STORE_PRODUCTS` | Supuesto: `basurero-elegance-pro`. |
| Bolsitas de repuesto como producto aparte (como CarMount) | — | A decidir; serviría de upsell en el carrito. |
| Plazos de envío | FAQ "¿Cuánto tarda en llegar?" | Igual que en las otras landings. |

## 3. Imágenes — todas pendientes

Hoy cada archivo es una caja oscura "FOTO PENDIENTE" con su ID, el brief y la
medida. Los prompts para generarlas están en **`basurero-prompts.md`**. Para
reemplazarla, subí la foto con el **mismo nombre y tamaño** en
`public/basurero/`. Todo se exporta al tamaño en que se ve (en Cloudflare
`/_next/image` devuelve el original).

| ID | Archivo | Qué va | Medida |
|---|---|---|---|
| BAS-01 | `hero/basurero-hero.mp4` + `basurero-hero-poster.webp` | **Hecho, provisorio:** el video de producto de CarMount (12 s, 540², sin audio), con su logo a la vista. Decisión de Ignacio; reemplazar por uno propio cuando haya producto. | 540² |
| BAS-02 | `hero/basurero-oscuro.webp` | Producto sobre fondo de estudio negro (card de `/tienda`). | 1200² |
| BAS-03 | `use-cases/portavasos.webp` | ENTRA EN EL PORTAVASOS | 400×600 |
| BAS-04 | `use-cases/tapa.webp` | SE ABRE CON UN TOQUE | 400×600 |
| BAS-05 | `use-cases/metal.webp` | CUERPO DE METAL | 400×600 |
| BAS-06 | `use-cases/bolsitas.webp` | BOLSITAS DE REPUESTO | 400×600 |
| BAS-07 | `use-cases/vaciado.webp` | SE VACÍA EN SEGUNDOS | 400×600 |
| BAS-08 | `use-cases/puerta.webp` | TAMBIÉN EN LA PUERTA | 400×600 |
| BAS-09 | `how-to-use/01-ponelo-en-el-portavasos.webp` | Paso 1: ponerlo en el portavasos. | 1200×1000 |
| BAS-10 | `how-to-use/02-apreta-y-tira.webp` | Paso 2: apretar la tapa y tirar. | 1200×1000 |
| BAS-11 | `how-to-use/03-cambia-la-bolsita.webp` | Paso 3: cambiar la bolsita. | 1200×1000 |
| BAS-12 | `whats-in-box/que-incluye.webp` | Caja, basurero y bolsitas de repuesto. | 1024² |
| BAS-13…15 | `bundles/BasureroX1/X2/X3.webp` | 1, 2 y 3 basureros con su caja, fondo de estudio. | 900² |

El hero y los pasos pueden pasar a video (prompts en `basurero-prompts.md`):
`heroMedia` con `kind: 'video'` y `poster`, y `steps[].video` (MP4 cuadrado
sin audio). La comparativa acepta un recorte sin fondo por columna
(`comparison.columns[].image`, webp con transparencia, ~320 px de alto, en
`public/basurero/comparativa/`; sumar esa carpeta a `_routes.json`).

## 4. Reseñas

Ninguna. La sección no sale hasta que haya reales en `reviews` (mismo formato
que las del trabavolante; actualizar `ratingBreakdown` y `brand.reviewsCount`).
