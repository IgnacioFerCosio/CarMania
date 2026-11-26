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

## 4. Imágenes

Cargadas el 2026-11-25 (generadas con IA a partir de la imagen maestra; los
originales están en la carpeta `CarMania/Inflador Pulse Pro`): INF-01 a INF-08
e INF-12. **Faltan** los pasos (INF-09 a 11) y los packs (INF-13 a 15): siguen
siendo una caja oscura "FOTO PENDIENTE" con su ID, el brief y la medida. Para reemplazarlo, subí la foto con el **mismo nombre y tamaño** en
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

## 5. Prompts de imágenes (2026-11-25)

> **Reemplazados por [inflador-prompts.md](inflador-prompts.md)** (v2: tamaño
> real del producto y salida de aire + luz LED arriba). Los de abajo quedan
> como historial.

**Paso 0, la imagen maestra.** Se genera primero y todas las demás la usan de
referencia, para que el producto sea siempre el mismo. Adjuntar
`docs/superpowers/specs/inflador-referencia-proveedor.png` (la foto del
proveedor, ampliada) y pedir el equipo **sin logo**. Guardar la que salga como
`inflador-maestra.png` (fuera de `/public`, no se publica).

> Using the attached supplier photo as the exact product reference, create a high-resolution studio product photo of this portable cordless tire inflator. Keep its exact shape and proportions: a vertical rounded-rectangle body, roughly the size of a thick smartphone, glossy piano-black front panel with a hidden digital display in the upper half, one round black power button with a thin red ring in the lower third, matte black sides, a fine air-vent grille along the bottom edge, and on the TOP end a threaded metal air outlet (where the hose connects) next to a small square LED light. Remove the "Lambo Tech" logo: the surface must be completely clean, no logo, no text. Show the display turned ON, glowing white segment digits reading "32" with small "PSI" units, and four small mode icons (car, motorcycle, bicycle, ball) lit dimly under the digits. Three-quarter front view, standing upright, on a seamless light grey background, soft even studio lighting, soft contact shadow. Square 1:1, photorealistic, ultra sharp, no text other than the display.

Después, para todas: adjuntar `inflador-maestra.png` y empezar el prompt con
*"Using the attached image as the exact product reference (same body, display
and red-ring button, no logo),"*. Estilo de las otras landings: estudio negro,
luz cenital suave y un toque de rojo `#D70707` en el borde de la luz.
Exportar a webp al tamaño de la tabla de §4 y subir con el mismo nombre.

**INF-02 · Card de /tienda** — `hero/inflador-oscuro.webp` (1200²):

> …create a premium product photo of the inflator standing upright, display on showing "32 PSI", its black flexible air hose coiled beside it. Centered on a seamless matte black studio background, soft top light, subtle red (#D70707) rim light on the edges, soft reflection on the floor. Square 1:1, photorealistic, no text other than the display.

**INF-01 · Hero** — `hero/inflador-hero.webp` (1080²; si después aparece el
video, éste queda de poster):

> …create a lifestyle photo: a hand holding the inflator next to a car tire, the black air hose screwed onto the tire valve, the display glowing "32 PSI" and clearly readable. Low angle, dark modern car (black or graphite alloy wheel), evening light with warm reflections, shallow depth of field, the product sharp in the foreground. Square 1:1, photorealistic, no logos, no text other than the display.

**Cuadros de beneficios** (`use-cases/*.webp`, 400×600, vertical 2:3, sin texto
ni logos salvo la pantalla):

1. INF-03 `inalambrico` — SIN CABLES:
   > …the inflator attached by its short hose to the front tire of a car parked on the shoulder of an Argentine highway at dusk, no cables anywhere, the driver crouching beside it, vertical 2:3, photorealistic.
2. INF-04 `pantalla` — PANTALLA DIGITAL:
   > …extreme close-up of the inflator's glossy black front with the display glowing "32 PSI" and the car mode icon lit, reflections on the glossy panel, dark background, red (#D70707) rim light, vertical 2:3, photorealistic.
3. INF-05 `corte` — CORTE AUTOMÁTICO:
   > …the inflator connected to a car tire valve, display showing "35 PSI" with a small check-style indicator, a hand stepping away from it (it works on its own), dark garage floor, soft light, vertical 2:3, photorealistic.
4. INF-06 `modos` — CUATRO MODOS:
   > …the inflator standing in the center surrounded by a car wheel, a motorcycle wheel, a bicycle wheel and a soccer ball, arranged on a dark studio floor, top light with a red (#D70707) rim, vertical 2:3, photorealistic.
5. INF-07 `luz` — LUZ LED:
   > …night scene on a dark road shoulder: the inflator's built-in LED light illuminating a car tire valve while it inflates, the only light source being the inflator and distant red tail lights, vertical 2:3, photorealistic, cinematic.
6. INF-08 `guantera` — ENTRA EN LA GUANTERA:
   > …the inflator with its coiled hose resting inside an open car glovebox, dark modern dashboard, the glovebox light on, vertical 2:3, photorealistic.

**Cómo funciona** (`how-to-use/*.webp`, 1200×1000; pueden pasar a video):

1. INF-09 `01-enrosca-la-manguera`:
   > …close-up of two hands screwing the inflator's black air hose onto a car tire valve, the inflator held in one hand, alloy wheel, daylight, landscape 6:5, photorealistic.
2. INF-10 `02-elegi-la-presion`:
   > …close-up of a thumb pressing the button below the inflator's display, display showing "32 PSI" with the car mode icon lit, hose connected to a tire in the blurred background, landscape 6:5, photorealistic.
3. INF-11 `03-se-corta-solo`:
   > …the inflator connected to a car tire and resting on the ground by itself, display showing the reached pressure "32 PSI", the person walking away out of focus, landscape 6:5, photorealistic.

**INF-12 · Qué incluye** — `whats-in-box/que-incluye.webp` (1024²). Adjuntar
también `public/logo.png`:

> …overhead flat lay on a matte black surface: a black product box with the attached CARMANIA logo and a thin red (#D70707) accent line, the inflator next to it, its black flexible air hose coiled, a black USB charging cable, three small nozzle adapters (ball needle, Presta and cone) and a small folded instruction leaflet. Even soft studio lighting, clean minimal arrangement, square 1:1, photorealistic, no other text or logos.

**INF-13…15 · Packs** — `bundles/InfladorX1/X2/X3.webp` (900²). Adjuntar la
INF-12 como escena y la maestra como producto:

> Using the first image as the scene and style reference (same black CARMANIA box, same surface and lighting) and the second image as the exact product, create a square product photo of a bundle: the CARMANIA box standing slightly behind, and in front of it TWO identical inflators standing upright side by side, displays on, each with its coiled hose. Photorealistic, premium, no text other than the logo on the box and the displays, no extra objects.

Para el x1: "ONE inflator"; para el x3: "THREE identical inflators", y en el x2
y el x3 una caja por unidad si entran.

**Comparativa (opcional)** — recortes con fondo transparente, ~320 px de alto,
en `comparativa/` (sumar la carpeta a `_routes.json` y cargar `image` en
`comparison.columns`):

- `pulse-pro.webp`: la maestra recortada, sin fondo.
- `compresor-12v.webp`: *"A typical cheap yellow 12V car air compressor with a long coiled power cable and cigarette-lighter plug, product cutout on a transparent background, studio lighting, photorealistic, no brand, no text."*
- `estacion.webp`: *"A coin-operated air pump station hose with its gauge head, as found at a gas station, product cutout on a transparent background, photorealistic, no brand, no text."*

## 6. Reseñas

Cargadas el 2026-11-25: 8 reseñas (6 de 5★ y 2 de 4★, promedio 4,75), con el
mismo formato que las del trabavolante (apellido abreviado y fecha; las fechas,
del 6 al 23 de noviembre de 2026, las puse yo). Los títulos que vinieron
("¡Una salvación!", etc.) no se usan: las cards de reseña no tienen título.
La de María Victoria va también como opinión en "qué incluye".

**Fotos** (800×600, 4:3, en `public/inflador/reviews/`). Cargadas el 2026-11-25,
generadas con IA (originales en `CarMania/Inflador Pulse Pro/Reviews`, r1…r8) y
pasadas por un filtro "de celular": algo de desenfoque, menos saturación y
contraste, negros levantados, viñeteo, grano (más en la de noche) y compresión
JPEG antes del webp. Para rehacer una, mismo nombre y mismo tratamiento:

| ID | Archivo | Reseña | Qué tendría que mostrar |
|---|---|---|---|
| INF-R1 | `01-en-la-ruta.webp` | Juan Ignacio P. | El inflador en la rueda del auto, en la ruta. |
| INF-R2 | `02-bici.webp` | Milagros F. | Inflando la bici. |
| INF-R3 | `03-cuatro-ruedas.webp` | Gonzalo M. | Poniendo a punto las ruedas antes de viajar. |
| INF-R4 | `04-pelota.webp` | Facundo S. | Inflando una pelota de fútbol con el pico de aguja. |
| INF-R5 | `05-la-caja.webp` | María Victoria C. | La caja negra CARMANIA abierta con el kit. |
| INF-R6 | `06-de-noche.webp` | Diego R. | Inflando de noche al costado de la ruta, con la luz. |
| INF-R7 | `07-mochila.webp` | Sofía C. | El inflador en la mochila, con la bici de montaña. |
| INF-R8 | `08-en-la-mano.webp` | Santiago B. | El inflador en la mano, pantalla en 32 PSI. |

Recortadas el 2026-11-25 a ~160 caracteres (las originales eran de ~400). El
carrusel del hero y la opinión de "qué incluye" usan versiones más cortas
todavía (`INFLADOR_HERO_REVIEWS` y `corta()`, hasta ~150), para que no se
corten con "…". Al recortarlas salieron la "linterna que trae arriba", el pico
"Presta" y los tiempos ("en un minuto", "al toque"), que la landing no promete.

**Prompts de las fotos.** Adjuntar `inflador-maestra.png` (en INF-R5, también
`queIncluye.jpeg` como referencia de la caja). Todas como foto de cliente: hecha
con el celular, natural, sin pose de estudio.

- **INF-R1** `01-en-la-ruta`: *Using the attached image as the exact product reference (same body, display and red-ring button, no logo; the air outlet where the hose screws in is on the TOP end of the body, next to a small square LED light, never on the side or bottom), create an amateur smartphone photo taken by a customer: the inflator connected by its hose to the rear tire of a silver hatchback parked on the gravel shoulder of an Argentine highway on a sunny afternoon, display showing "29 PSI" with the car mode icon lit (still inflating toward 32). Natural daylight, slightly imperfect framing, landscape 4:3, photorealistic, no text other than the display.*
- **INF-R2** `02-bici`: *Using the attached image as the exact product reference (same body, display and red-ring button, no logo; the air outlet where the hose screws in is on the TOP end of the body, next to a small square LED light, never on the side or bottom), create an amateur smartphone photo taken by a customer: a woman's hand holding the inflator connected to the rear tire of an urban bicycle leaning on a house wall at dusk, the display glowing clearly and showing "50 PSI" with the bicycle mode icon lit. Warm evening light, casual framing, landscape 4:3, photorealistic, no text other than the display.*
- **INF-R3** `03-cuatro-ruedas`: *Using the attached image as the exact product reference (same body, display and red-ring button, no logo; the air outlet where the hose screws in is on the TOP end of the body, next to a small square LED light, never on the side or bottom), create an amateur smartphone photo taken by a customer: the inflator on the floor of a home garage connected to the front tire of a family SUV loaded with luggage on the roof rack, ready for a trip, display showing "38 PSI" with the car mode icon lit. Morning light through the garage door, landscape 4:3, photorealistic, no text other than the display.*
- **INF-R4** `04-pelota`: *Using the attached image as the exact product reference (same body, display and red-ring button, no logo; the air outlet where the hose screws in is on the TOP end of the body, next to a small square LED light, never on the side or bottom), create an amateur smartphone photo taken by a customer: the inflator inflating a worn soccer ball with a needle adapter on the grass of a backyard, display showing "9 PSI" with the ball mode icon lit, a child's bicycle blurred in the background. Natural daylight, casual framing, landscape 4:3, photorealistic, no text other than the display.*
- **INF-R5** `05-la-caja`: *Using the first attached image as the exact product (air outlet and small square LED light on the TOP end of the body) and the second as the exact box (black CARMANIA box with its logo), create an amateur smartphone photo taken by a customer right after unboxing: the open box on a wooden kitchen table, the inflator, the braided hose, the USB cable and the nozzles laid out next to it, a hand holding the inflator with its display turned off (brand new, not used yet). Warm indoor light, landscape 4:3, photorealistic, no text other than the logo and the display.*
- **INF-R6** `06-de-noche`: *Using the attached image as the exact product reference (same body, display and red-ring button, no logo; the air outlet where the hose screws in is on the TOP end of the body, next to a small square LED light, never on the side or bottom), create an amateur smartphone photo taken by a customer at night: the inflator connected to the tire of a pickup truck on the shoulder of a Patagonian route, its LED light on, the display glowing "35 PSI" with the car mode icon lit, a phone flashlight adding light, dark empty steppe behind. Grainy night shot, landscape 4:3, photorealistic, no text other than the display.*
- **INF-R7** `07-mochila`: *Using the attached image as the exact product reference (same body, display and red-ring button, no logo; the air outlet where the hose screws in is on the TOP end of the body, next to a small square LED light, never on the side or bottom), create an amateur smartphone photo taken by a customer: the inflator with its display turned off, peeking out of the side pocket of an open hiking backpack resting next to a mountain bike on a dirt trail in the hills of Salta. Bright daylight, landscape 4:3, photorealistic, no text other than the display.*
- **INF-R8** `08-en-la-mano`: *Using the attached image as the exact product reference (same body, display and red-ring button, no logo; the air outlet where the hose screws in is on the TOP end of the body, next to a small square LED light, never on the side or bottom), create an amateur smartphone photo taken by a customer: a man's hand holding the inflator close to the camera, display showing "24 PSI" with the car mode icon lit (mid-inflation, the tire started at 15), the hose connected to the tire of a car in a residential street, blurred in the background. Natural daylight, landscape 4:3, photorealistic, no text other than the display.*
