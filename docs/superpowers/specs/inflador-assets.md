# Inflador Pulse PRO™ — investigación y checklist antes de publicar `/inflador`

La landing está armada con la estructura de `/trabavolante` y se ve en
`npm run dev` y en las previews, pero **no está lista para recibir tráfico**:
en producción está oculta con `comingSoon: true` en `STORE_PRODUCTS`
(`lib/config.ts`), así que `/inflador` da 404, no va al sitemap y no aparece en
`/tienda`. **Publicarla es sacar ese flag** después de cerrar todo lo de abajo.
Lo pendiente está marcado con `// TODO` en `lib/landings/inflador.ts`.

## 1. El producto

Del proveedor sólo tenemos una foto y una línea:

> D-07402 · ATJ-006充气泵 lambo tech · MINI COMPRESOR DE AIRE INFLADOR
> PORTÁTIL LAMBO TECH LT-26010 MULTIUSO RECARGABLE

En la foto se ven la caja ("Mini compresor portátil", pantalla digital y 4
íconos: auto, moto, bici, pelota), el equipo (negro brillante, vertical, con
un aro rojo), un manual "Tire Inflator", un cable USB, la manguera flexible y
una bolsita con picos.

**ATJ-006** es el código de fábrica de un inflador genérico que se vende con
muchas marcas (Powools, Teffim y otras). Lo que coincide en todas las fichas:

- 150 PSI de máxima (rango configurable de 3 a 150 PSI).
- Pantalla digital y corte automático a la presión elegida.
- 4 modos con presión por defecto: auto (~36 PSI), moto (~35), bici (~45) y
  pelota (~8).
- Luz LED.

**Lo que NO coincide entre vendedores, y por eso la landing no lo promete:**
la batería (2000 mAh ×2, 4000 o hasta 15.000 mAh según la ficha), la potencia
(50 a 70 W), la carga (USB-C o micro USB), el tiempo de inflado (de "menos de
1 minuto" a más de 3 minutos según la fuente) y la función powerbank. Hay que
medirlo con una unidad nuestra.

Fuentes: [Powools ATJ-006 en Newegg](https://www.newegg.com/powools-atj-006-charger/p/2YR-00SW-00053),
[manual del ATJ-006 (Manuals+)](https://manuals.plus/asin/B0DNQM8CWS),
[review de Auto Median](https://automedian.com/powools-atj-006-tire-inflator-150-psi-review/),
[Teffim ATJ-006](https://ja.manuals.plus/teffim/teffim-atj-006-tyre-inflator-user-manual).

## 2. Quién lo vende (consultado el 2026-11-25)

No encontré ninguna tienda escalada que venda **este** modelo con nombre y
código. El Lambo Tech aparece sólo en tiendas chicas de Argentina, sin stock y
sin specs. Lo más parecido:

| Tienda | Precio | Qué dice | Nota |
|---|---|---|---|
| [Cubica](https://cubicashop.com.ar/productos/mini-compresor-de-aire-portatil-lambo-tech/) | $59.990 (tachado $66.000) | "¡Inflá con rapidez y seguridad con Lambo Tech!" Sin specs. | Lambo Tech; sin stock. |
| [Nextcell](https://nextcell.com.ar/tienda/mini-compresor-aire-recargable-auto-moto-bici-lambo-tech-8566/) | $28.800 | 2×2000 mAh, 50 W, 40 min de uso, 13,5×8,5 cm | Lambo Tech **8566** (otro modelo); agotado. |
| [Driven](https://driven.com.ar/productos/compresor-inflador-usb/) | $63.762 (−16 %) | 3 a 150 PSI, USB-C y 12 V, 409 g, 2 años de garantía | Marca propia. "Chico, liviano y siempre encima". |
| [Clover](https://www.clovershop.com.ar/productos/compresor-de-aire-digital-recargable/) | $48.900 (−25 %) | 150 PSI, 70 W, 2×2000 mAh, corte automático | "El gadget que te salva en cualquier momento". |
| [Clobby](https://www.clobby.com.ar/productos/inflador-portatil-digital/) | $47.500 | 150 PSI, 4 modos, LED, corte automático | "¿Preparado para nunca más quedarte sin aire?" |
| [BoxyB. (Colombia)](https://boxybuy.com/products/inflador-portatil-4-en-1-mide-infla-ilumina-y-carga) | COP 109.900 | "4 en 1: mide, infla, ilumina y carga" (powerbank + SOS) | La landing más armada: casos de uso, 3 pasos, tabla vs. "otros", reseñas, FAQ. |

En Mercado Libre hay decenas de publicaciones genéricas de $40.000 a $85.000.

**Ángulos que se repiten:** emergencia en la ruta, "nunca más sin aire", no
depender de la estación de servicio, corte automático y presión exacta,
inalámbrico, entra en la guantera, sirve para auto/moto/bici/pelota.

## 3. Qué hay que decidir / confirmar

| Qué | Dónde | Estado |
|---|---|---|
| Precio de x1 / x2 / x3 | `INFLADOR_BUNDLES`, `fallbackPricing`, `STORE_PRODUCTS` | Provisorio: $49.990 / $74.990 / $99.980 (tachados $89.990 / $179.980 / $269.970). Cumple "2ª al 50 %" y "3ª GRATIS". |
| Crear los 3 productos en Shopify y publicarlos al canal "Carmania Headless" | `productId` / `fallbackVariantId` en `''` | Pendiente. |
| Handle del x1 | `brand.productHandle` y `STORE_PRODUCTS` | Supuesto: `inflador-pulse-pro`. |
| Specs con una unidad nuestra | `// TODO VERIFICAR` | Batería, puerto de carga, autonomía (¿cuántas ruedas?), tiempo de inflado, cuántos picos. |
| Si la unidad o la caja dicen "Lambo Tech" | — | La caja de la foto lo dice. Para las fotos, caja lisa o con el logo CARMANIA. |
| Plazos de envío | FAQ "¿Cuánto tarda en llegar?" | Igual que en las otras landings. |

## 4. Imágenes — todas pendientes

Hoy cada archivo es una caja oscura "FOTO PENDIENTE" con su ID, el brief y la
medida. Para reemplazarlo, subí la foto con el **mismo nombre y tamaño** en
`public/inflador/`. Todo se exporta al tamaño en que se ve (en Cloudflare
`/_next/image` devuelve el original).

| ID | Archivo | Qué va | Medida |
|---|---|---|---|
| INF-01 | `hero/inflador-hero.webp` | El Pulse PRO en la mano, inflando la rueda de un auto, pantalla a la vista. Ideal: pasarlo a un video de 540² (como el del trabavolante) con la pantalla subiendo hasta cortar. | 1080² |
| INF-02 | `hero/inflador-oscuro.webp` | Producto sobre fondo de estudio negro (card de `/tienda`). | 1200² |
| INF-03 | `use-cases/inalambrico.webp` | SIN CABLES: inflando en la ruta, sin cable a la cigarrera. | 400×600 |
| INF-04 | `use-cases/pantalla.webp` | PANTALLA DIGITAL: primer plano de la pantalla con la presión. | 400×600 |
| INF-05 | `use-cases/corte.webp` | CORTE AUTOMÁTICO: la pantalla llegando a la presión elegida. | 400×600 |
| INF-06 | `use-cases/modos.webp` | CUATRO MODOS: auto, moto, bici y pelota. | 400×600 |
| INF-07 | `use-cases/luz.webp` | LUZ LED: inflando de noche con la luz prendida. | 400×600 |
| INF-08 | `use-cases/guantera.webp` | ENTRA EN LA GUANTERA: el inflador en la guantera abierta. | 400×600 |
| INF-09 | `how-to-use/01-enrosca-la-manguera.webp` | Paso 1: enroscar la manguera en la válvula. | 1200×1000 |
| INF-10 | `how-to-use/02-elegi-la-presion.webp` | Paso 2: elegir modo y presión en la pantalla. | 1200×1000 |
| INF-11 | `how-to-use/03-se-corta-solo.webp` | Paso 3: apretar y esperar a que corte. | 1200×1000 |
| INF-12 | `whats-in-box/que-incluye.webp` | Caja, inflador, manguera, cable USB, picos y manual. | 1024² |
| INF-13…15 | `bundles/InfladorX1/X2/X3.webp` | 1, 2 y 3 infladores con su caja, fondo de estudio. | 900² |

Los pasos pueden pasar a video (`steps[].video`, MP4 cuadrado sin audio, como
los del trabavolante). La comparativa acepta un recorte sin fondo por columna
(`comparison.columns[].image`, webp con transparencia, ~320 px de alto, en
`public/inflador/comparativa/`; sumar esa carpeta a `_routes.json`).

## 5. Reseñas

Ninguna. La sección no sale hasta que haya reales en `reviews` (mismo formato
que las del trabavolante; actualizar `ratingBreakdown` y `brand.reviewsCount`).
