# Inflador Pulse PRO™ — prompts de imágenes (v2, 2026-11-25)

Reemplaza a los prompts de `inflador-assets.md` §5 y §6. Cambios:
**tamaño real** (la IA lo agrandaba) y **posición fija** de la salida de aire y
la luz LED (arriba), con una imagen maestra nueva que ya las muestra.

## Medidas (de la investigación)

El LT-26010 es el ATJ-006 de fábrica: **13,6 × 8,9 × 4,7 cm, 420 g**
(fichas del Powools ATJ-006 en Newegg y Desertcart). Más o menos una lata de
gaseosa de alto, y entra entero en una mano. Al lado de una rueda de auto es
del alto del flanco de la cubierta, un tercio del diámetro de la llanta.

## Paso 0 — imagen maestra v2 (`inflador-maestra-v2.png`)

Adjuntar la foto del proveedor (`inflador-referencia-proveedor.png`) y la
maestra actual (`imagenBase.jpeg`).

```
Using the attached images as the exact product reference (the first is the real product, the second is the approved studio render), create a new high-resolution studio product photo of this compact cordless tire inflator. Keep its exact design: a vertical rounded-rectangle body 13.5 cm tall, 9 cm wide and 4.7 cm thick, glossy piano-black front with the digital display in the upper half, one round black button with a thin red ring in the lower third, matte black sides and a fine vent grille along the bottom edge. On the TOP end of the body: a threaded metal air outlet with a short black flexible air hose (about 20 cm long) screwed into it and curving gently to one side, and right next to the outlet a small square LED light, switched ON and glowing white. The display is ON, showing "32 PSI" in white segment digits with the car mode icon lit among four small icons (car, motorcycle, bicycle, ball). No logo, no text on the body. Three-quarter front view, standing upright, slightly from above so the top end with the outlet and the LED is clearly visible. Seamless light grey background, soft even studio light, soft contact shadow. Square 1:1, photorealistic, ultra sharp, no text other than the display.
```

Opcional, para que la IA entienda el tamaño: una segunda maestra en la mano
(`inflador-maestra-mano.png`), adjuntando la v2:

```
Using the attached image as the exact product reference, create a studio photo of an adult man's hand holding the inflator: the whole body fits inside the palm, fingers wrapping around its sides, the hose on the top end and the square LED light on. Light grey background, soft light. Square 1:1, photorealistic, true-to-life scale, no text other than the display.
```

## Bloque fijo (va al principio de TODOS los prompts de abajo)

Adjuntar siempre `inflador-maestra-v2.png` (y la de la mano, si la hiciste).

```
Using the attached image as the exact product reference: a compact cordless tire inflator, 13.5 cm tall, 9 cm wide and 4.7 cm thick, about the size of a soda can, that fits entirely in one adult hand. Same glossy black body, display and red-ring button, no logo. The air hose ALWAYS screws into the threaded outlet on the TOP end of the body, next to a small square LED light; never on the side or the bottom. Keep its real size relative to hands, tires and objects: it must never look bigger than it is.
```

En cada prompt de abajo, `[BLOQUE]` es ese texto.

## Producto y hero

**INF-02 · Card de /tienda** → `hero/inflador-oscuro.webp` (1200²)
```
[BLOQUE] Create a premium product photo of the inflator standing upright, display on showing "32 PSI" with the car icon lit, the square LED on, the short hose attached on top and curving down beside it. Centered on a seamless matte black studio background, soft top light, subtle red (#D70707) rim light on the edges, soft reflection on the floor. Square 1:1, photorealistic, no text other than the display.
```

**INF-01 · Hero** → `hero/inflador-hero.webp` (1080²)
```
[BLOQUE] Create a lifestyle photo: an adult hand holding the inflator (it fits entirely in the palm) next to a car tire, the short hose going from the top of the inflator to the tire valve, the display glowing "30 PSI" with the car icon lit. The inflator is about as tall as the tire's sidewall, much smaller than the rim. Low angle, dark modern car with a graphite alloy wheel, evening light with warm reflections, shallow depth of field, the product sharp in the foreground. Square 1:1, photorealistic, no logos, no text other than the display.
```

## Cuadros de beneficios (`use-cases/*.webp`, 400×600, vertical 2:3)

**INF-03 · SIN CABLES** → `use-cases/inalambrico.webp`
```
[BLOQUE] Create a photo of the inflator resting on the ground next to the front tire of a car parked on the shoulder of an Argentine highway at dusk, connected to the valve by its short hose from the top, no cables anywhere, the driver crouching beside it; the inflator is clearly small next to the wheel. Display showing "28 PSI" with the car icon lit. Vertical 2:3, photorealistic, no logos, no text other than the display.
```

**INF-04 · PANTALLA DIGITAL** → `use-cases/pantalla.webp`
```
[BLOQUE] Create a close-up of the inflator held in an adult hand, showing the glossy black front with the display glowing "33 PSI" and the car mode icon lit, the top end with the hose and the square LED visible at the top of the frame, reflections on the glossy panel, dark background, red (#D70707) rim light. Vertical 2:3, photorealistic, no logos, no text other than the display.
```

**INF-05 · CORTE AUTOMÁTICO** → `use-cases/corte.webp`
```
[BLOQUE] Create a photo of the inflator standing on a dark garage floor next to a car tire, connected to the valve by the short hose from its top, display showing "35 PSI" with a small check-style indicator, a hand stepping away from it (it works on its own); the inflator is about as tall as the tire's sidewall. Soft light. Vertical 2:3, photorealistic, no logos, no text other than the display.
```

**INF-06 · CUATRO MODOS** → `use-cases/modos.webp`
```
[BLOQUE] Create a photo of the inflator standing on a dark studio floor in front of a car wheel, a motorcycle wheel, a bicycle wheel and a soccer ball, all at their real sizes (the inflator is slightly smaller than the soccer ball), display showing "9 PSI" with the ball icon lit, hose on top. Top light with a red (#D70707) rim. Vertical 2:3, photorealistic, no logos, no text other than the display.
```

**INF-07 · LUZ LED** → `use-cases/luz.webp`
```
[BLOQUE] Create a night scene on a dark road shoulder: the inflator on the ground next to a car tire, its square LED light on the top end lighting up the tire valve and the short hose, the display glowing "31 PSI", distant red tail lights in the background; the inflator is small next to the wheel. Vertical 2:3, photorealistic, cinematic, no logos, no text other than the display.
```

**INF-08 · ENTRA EN LA GUANTERA** → `use-cases/guantera.webp`
```
[BLOQUE] Create a photo of the inflator with its short hose attached on top, lying inside an open car glovebox next to the car's manual and a pair of sunglasses for scale, taking up only a small part of the glovebox, display off, dark modern dashboard, the glovebox light on. Vertical 2:3, photorealistic, no logos.
```

## Cómo funciona (`how-to-use/*.webp`, 1200×1000)

**INF-09 · Enroscá la manguera** → `how-to-use/01-enrosca-la-manguera.webp`
```
[BLOQUE] Create a close-up: one adult hand holds the inflator (it fits in the palm) while the other hand screws the end of its short hose, which comes out of the top of the inflator, onto a car tire valve; alloy wheel, daylight, display off. Landscape 6:5, photorealistic, no logos.
```

**INF-10 · Elegí la presión** → `how-to-use/02-elegi-la-presion.webp`
```
[BLOQUE] Create a close-up of an adult hand holding the inflator, the thumb pressing the button below the display, display showing "32 PSI" with the car mode icon lit, the hose going from its top to a tire in the blurred background. Landscape 6:5, photorealistic, no logos, no text other than the display.
```

**INF-11 · Apretá y olvidate** → `how-to-use/03-se-corta-solo.webp`
```
[BLOQUE] Create a photo of the inflator standing on the ground by itself next to a car tire, connected by the short hose from its top to the valve, display showing "32 PSI" (target reached), the person walking away out of focus; the inflator is about as tall as the tire's sidewall. Landscape 6:5, photorealistic, no logos, no text other than the display.
```

## Qué incluye y packs

**INF-12 · Qué incluye** → `whats-in-box/que-incluye.webp` (1024²). Ya está
aprobada; sólo si hay que rehacerla. Adjuntar también `public/logo.png`.
```
[BLOQUE] The second attached image is the brand logo. Create an overhead flat lay on a matte black surface: a realistic matte black rigid box with the CARMANIA logo printed on the lid, the inflator next to it (much smaller than the box lid), its short black flexible hose detached and coiled, a black USB charging cable, three small nozzle adapters (ball needle, Presta and cone) and a small folded instruction leaflet. Even soft studio lighting, clean minimal arrangement. Square 1:1, photorealistic, no other text or logos.
```

**INF-13…15 · Packs** → `bundles/InfladorX1/X2/X3.webp` (900²). Adjuntar
`queIncluye.jpeg` (escena) y la maestra v2 (producto).
```
Using the first image as the scene and style reference (same black CARMANIA box, same surface and lighting) and the second image as the exact product (13.5 cm tall, it must look small next to the box, with the hose on its top end and a small square LED next to it), create a square product photo of a bundle: TWO CARMANIA boxes standing slightly behind, and in front of them TWO identical inflators standing upright side by side, displays on showing "32 PSI", each with its short hose on top. Photorealistic, premium, no text other than the logo on the boxes and the displays, no extra objects.
```
Para el x1: "ONE CARMANIA box … ONE inflator"; para el x3: "THREE … THREE".

## Reseñas (`reviews/*.webp`, 800×600, 4:3, como foto de cliente)

**INF-R1 · Juan Ignacio** → `reviews/01-en-la-ruta.webp`
```
[BLOQUE] Create an amateur smartphone photo taken by a customer: the inflator on the gravel next to the rear tire of a silver hatchback parked on the shoulder of an Argentine highway on a sunny afternoon, connected by its short hose from the top to the valve, display showing "29 PSI" with the car icon lit (still inflating toward 32); it is small next to the wheel. Natural daylight, slightly imperfect framing, landscape 4:3, photorealistic, no text other than the display.
```

**INF-R2 · Milagros** → `reviews/02-bici.webp`
```
[BLOQUE] Create an amateur smartphone photo taken by a customer: a woman's hand holding the inflator (it fits in her palm) connected by its short hose from the top to the rear tire valve of an urban bicycle leaning on a house wall at dusk, the square LED on, display showing "50 PSI" with the bicycle icon lit. Warm evening light, casual framing, landscape 4:3, photorealistic, no text other than the display.
```

**INF-R3 · Gonzalo** → `reviews/03-cuatro-ruedas.webp`
```
[BLOQUE] Create an amateur smartphone photo taken by a customer: the inflator on the floor of a home garage connected by its short hose from the top to the front tire of a family SUV loaded with luggage on the roof rack, display showing "38 PSI" with the car icon lit; the inflator is small next to the big SUV wheel. Morning light through the garage door, landscape 4:3, photorealistic, no text other than the display.
```

**INF-R4 · Facundo** → `reviews/04-pelota.webp`
```
[BLOQUE] Create an amateur smartphone photo taken by a customer: a hand holding the inflator next to a worn soccer ball on the grass of a backyard, the hose going from the top of the inflator to the ball through a needle adapter, display showing "9 PSI" with the ball icon lit; the inflator is smaller than the ball. A child's bicycle blurred in the background. Natural daylight, landscape 4:3, photorealistic, no text other than the display.
```

**INF-R5 · Martín (antes María Victoria)** → `reviews/05-la-caja.webp` (adjuntar también `queIncluye.jpeg`)
```
[BLOQUE] The second attached image is the exact box (black CARMANIA box with its logo). Create an amateur smartphone photo taken by a customer right after unboxing: the open box on a wooden kitchen table, the hose, the USB cable and the nozzles laid out next to it, a woman's hand holding the inflator (it fits in her palm) with its display turned off, brand new. Warm indoor light, landscape 4:3, photorealistic, no text other than the logo.
```

**INF-R6 · Diego** → `reviews/06-de-noche.webp`
```
[BLOQUE] Create an amateur smartphone photo taken by a customer at night: the inflator on the ground next to the tire of a pickup truck on the shoulder of a Patagonian route, connected by its short hose from the top, its square LED on lighting the valve, display glowing "35 PSI" with the car icon lit; it is small next to the big pickup wheel. Dark empty steppe behind. Grainy night shot, landscape 4:3, photorealistic, no text other than the display.
```

**INF-R7 · Sofía** → `reviews/07-mochila.webp`
```
[BLOQUE] Create an amateur smartphone photo taken by a customer: the inflator, display off, with its hose coiled, peeking out of the side pocket of an open hiking backpack (it fits easily in the pocket) resting next to a mountain bike on a dirt trail in the hills of Salta. Bright daylight, landscape 4:3, photorealistic, no text or logos.
```

**INF-R8 · Santiago** → `reviews/08-en-la-mano.webp`
```
[BLOQUE] Create an amateur smartphone photo taken by a customer: a man's hand holding the inflator close to the camera (it fits entirely in his palm), display showing "24 PSI" with the car icon lit (mid-inflation, the tire started at 15), the hose going from its top to the tire of a car in a residential street, blurred in the background. Natural daylight, landscape 4:3, photorealistic, no text other than the display.
```
