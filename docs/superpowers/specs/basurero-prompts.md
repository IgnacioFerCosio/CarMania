# Basurero Elegance PRO™ — prompts de imágenes y videos (v1, 2026-11-27)

Mismo método que el inflador (`inflador-prompts.md`): primero una **imagen
maestra** del producto, sin logo, y después cada foto de la landing se genera
adjuntándola. Los videos salen de las fotos ya aprobadas (imagen → video).

## Las fotos de CarMount son SOLO referencia

En `C:\Users\ignaf\Desktop\Ecommerce\CarMania\Basurero Elegance Pro\Carmount\`
están las 10 fotos y el video de carmount.com. **Ninguna va a `public/` ni al
repo:** el producto lleva su logo "CARMOUNT" grabado y las fotos son suyas. Se
adjuntan únicamente para que la IA copie la forma del producto.

| Archivo | Qué muestra | Sirve para |
|---|---|---|
| `IMG_0869-Bearbeitet_web-768x768.jpg` | Producto solo, fondo de estudio oscuro, en diagonal | **Maestra** (forma, borde de la tapa) |
| `Car-Trash-Can-n4_web-768x768.jpg` | Tapa abierta, mano tirando un pañuelo, en el portavasos | **Maestra** (cómo abre la tapa) |
| `Car-Trash-Can-n3_web-768x768.jpg` | Dedo apretando la tapa, en el portavasos | Referencia de BAS-04 / BAS-10 |
| `Car-Trash-Can-n5_web-768x768.jpg` | Acostado en el bolsillo de la puerta | Referencia de BAS-08 |
| `car-trash-can-picture-6-768x768.jpg` | Dos unidades en las manos | Referencia de los packs |
| `Trash_Can_WEB_rf26.50 (1).mp4` | 12 s: unboxing, tirar, apretar la tapa, vaciarlo en un tacho | Referencia de ritmo para los videos |

## El producto (de la investigación)

Cilindro de **6,5 cm de diámetro y 14 cm de alto** (~465 ml), cuerpo de
**metal negro mate**, tapa arriba con un **aro fino de metal brillante** en el
borde. La tapa **se abre apretándola**: salta y queda abierta hacia un costado,
con bisagra. Adentro va una bolsita descartable. Datos de CarMount: hay que
confirmarlos con la ficha de nuestro proveedor (ver `basurero-assets.md`).

Para el tamaño: es del alto de una lata alta de energizante y algo más ancho;
una mano adulta lo rodea entero. Puesto en el portavasos, asoma unos 8–9 cm.

## Paso 0 — imagen maestra (`basurero-maestra.png`)

Adjuntar `IMG_0869-Bearbeitet_web-768x768.jpg` y `Car-Trash-Can-n4_web-768x768.jpg`.

```
Using the attached images only as a reference for the product's shape, create a new high-resolution studio product photo of a minimalist car cup-holder trash can. Exact design: a straight cylinder 6.5 cm in diameter and 14 cm tall, seamless matte black metal body with a very fine satin texture, a flat round lid on top with a thin polished silver metal ring around its edge, slightly rounded bottom edge. Absolutely NO logo, no text, no engraving anywhere on the body or the lid. Two units side by side: the left one closed, the right one with its hinged lid popped open at about 70 degrees to one side, showing a thin black liner bag folded over the inner rim. Three-quarter view from slightly above, seamless light grey background, soft even studio light, soft contact shadows. Square 1:1, photorealistic, ultra sharp, no text.
```

Si la tapa abierta sale mal, generar la maestra sólo con la unidad cerrada y
pedir la abierta aparte adjuntando esa.

## Bloque fijo (va al principio de TODOS los prompts de abajo)

Adjuntar siempre `basurero-maestra.png`.

```
Using the attached image as the exact product reference: a minimalist car cup-holder trash can, a straight matte black metal cylinder 6.5 cm in diameter and 14 cm tall (about the height of a tall energy-drink can, slightly wider), with a flat lid ringed by a thin polished silver edge. The lid opens by pressing it: it pops up on a hinge to one side. No logo, no text, no engraving anywhere. Keep its real size relative to hands, cup holders and the car interior: an adult hand wraps around it completely, and in a cup holder about 8–9 cm of it sticks out. It must never look bigger than it is.
```

En cada prompt de abajo, `[BLOQUE]` es ese texto. Los autos: interior moderno
oscuro, sin logos de marca en el volante ni en la palanca (ojo: la IA tiende a
copiar el BMW de las fotos de referencia).

## Producto y hero

**BAS-02 · Card de /tienda** → `hero/basurero-oscuro.webp` (1200²)
```
[BLOQUE] Create a premium product photo of one closed trash can standing upright, centered on a seamless matte black studio background, soft top light catching the silver ring of the lid, subtle red (#D70707) rim light on the edges of the cylinder, soft reflection on the glossy black floor. Square 1:1, photorealistic, no text.
```

**BAS-01 · Hero** → `hero/basurero-hero.webp` (1080²)
```
[BLOQUE] Create a lifestyle photo inside a modern dark car interior: the trash can sits in the center-console cup holder next to the gear selector, its lid popped open, and an adult hand is dropping a crumpled paper receipt into it. Warm evening light through the windshield, clean leather and dark trim, shallow depth of field with the trash can sharp in the foreground. No brand logos on the steering wheel or gear selector. Square 1:1, photorealistic, no text.
```

## Cuadros de beneficios (`use-cases/*.webp`, 400×600, vertical 2:3)

**BAS-03 · ENTRA EN EL PORTAVASOS** → `use-cases/portavasos.webp`
```
[BLOQUE] Create a photo of the closed trash can seated snugly in a car's center-console cup holder, right next to the gear selector, about 8–9 cm of it sticking out; dark modern interior, soft side light on the matte metal. Vertical 2:3, photorealistic, no logos, no text.
```

**BAS-04 · SE ABRE CON UN TOQUE** → `use-cases/tapa.webp`
```
[BLOQUE] Create a close-up of an adult index finger pressing the center of the lid of the trash can, which sits in a car cup holder; the lid is just starting to pop up on its hinge. Dark car interior, shallow depth of field, red (#D70707) rim light on the silver ring. Vertical 2:3, photorealistic, no logos, no text.
```

**BAS-05 · CUERPO DE METAL** → `use-cases/metal.webp`
```
[BLOQUE] Create a macro close-up of the trash can's matte black metal body and the polished silver ring of its lid, showing the fine satin texture of the metal, dramatic low light with a red (#D70707) rim on the edge, dark background. Vertical 2:3, photorealistic, no logos, no text.
```

**BAS-06 · BOLSITAS DE REPUESTO** → `use-cases/bolsitas.webp`
```
[BLOQUE] Create a photo from slightly above of the trash can with its lid open and a thin black liner bag fitted inside, the edge of the bag folded neatly over the inner rim; next to it on the console, a small roll of spare black liner bags. Dark car interior, soft light. Vertical 2:3, photorealistic, no logos, no text.
```

**BAS-07 · SE VACÍA EN SEGUNDOS** → `use-cases/vaciado.webp`
```
[BLOQUE] Create a photo of adult hands lifting a full, tied black liner bag out of the open trash can (paper receipts and wrappers visible through the bag's opening), the empty can held in the other hand, next to an open car door. Daylight, shallow depth of field. Vertical 2:3, photorealistic, no logos, no text.
```

**BAS-08 · TAMBIÉN EN LA PUERTA** → `use-cases/puerta.webp`
```
[BLOQUE] Create a photo of the closed trash can lying in the storage pocket of a car's front door panel, the door open, dark leather and trim with a warm accent stitch, soft light from outside. The trash can fits the pocket with room to spare. Vertical 2:3, photorealistic, no logos, no text.
```

## Cómo funciona (`how-to-use/*.webp`, 1200×1000)

Si pasan a video (abajo), estas fotos son el primer cuadro de cada clip.

**BAS-09 · Paso 1, ponelo en el portavasos** → `how-to-use/01-ponelo-en-el-portavasos.webp`
```
[BLOQUE] Create a photo of an adult hand placing the closed trash can into a car's center-console cup holder, the bottom of the can just entering the holder. Dark modern interior, soft light. Landscape 6:5, photorealistic, no logos, no text.
```

**BAS-10 · Paso 2, apretá y tirá** → `how-to-use/02-apreta-y-tira.webp`
```
[BLOQUE] Create a photo of the trash can in a car cup holder with its lid popped open, an adult hand dropping a crumpled tissue into it, the driver's other hand on the steering wheel in the background (out of focus). Landscape 6:5, photorealistic, no logos, no text.
```

**BAS-11 · Paso 3, cambiá la bolsita** → `how-to-use/03-cambia-la-bolsita.webp`
```
[BLOQUE] Create a photo of adult hands fitting a new black liner bag into the open trash can, folding its edge over the rim, the full tied bag resting beside it. Bright, clean light. Landscape 6:5, photorealistic, no logos, no text.
```

## Qué incluye y packs

**BAS-12 · Qué incluye** → `whats-in-box/que-incluye.webp` (1024²)
```
[BLOQUE] Create a flat-lay product photo on a seamless light grey background: a plain matte black gift box with no printing, the trash can standing next to it with its lid open, and a roll of spare black liner bags. Soft even light, soft shadows. Square 1:1, photorealistic, no logos, no text.
```

**BAS-13 · Pack x1** → `bundles/BasureroX1.webp` (900²)
```
[BLOQUE] Create a product photo of one closed trash can standing next to its plain matte black box (no printing), seamless dark grey studio background, soft top light, subtle red (#D70707) rim light. Square 1:1, photorealistic, no logos, no text.
```

**BAS-14 · Pack x2** → `bundles/BasureroX2.webp` (900²)
```
[BLOQUE] Same scene as the single-pack photo, but with two identical closed trash cans standing side by side in front of two plain matte black boxes. All at the same real scale. Square 1:1, photorealistic, no logos, no text.
```

**BAS-15 · Pack x3** → `bundles/BasureroX3.webp` (900²)
```
[BLOQUE] Same scene as the single-pack photo, but with three identical closed trash cans in a slight arc in front of three plain matte black boxes. All at the same real scale. Square 1:1, photorealistic, no logos, no text.
```

## Videos (imagen → video)

Formato de la landing, como el trabavolante: **MP4 cuadrado de 540², sin
audio, 3–5 s, que haga loop**, ~150–200 KB. Van en `/public/basurero/` (la CSP
sólo permite videos propios, `media-src 'self'`). Se genera a partir de la foto
aprobada del mismo slot, adjuntándola como primer cuadro; después se exporta a
540² con ffmpeg.

**Hero** (a partir de BAS-01) → `hero/basurero-hero.mp4` + poster `hero/basurero-hero-poster.webp`
```
Animate the attached photo. Static camera with a very slow push-in. An index finger presses the lid of the trash can in the cup holder, the lid pops open on its hinge, a hand drops a crumpled paper receipt inside, then a finger presses the lid closed. Natural, unhurried hand motion, soft evening light flickering gently. The product keeps its exact shape, size and matte black finish; no logo appears. 4 seconds, ends on a frame close to the first so it loops.
```

**Paso 1** (a partir de BAS-09) → `how-to-use/01-ponelo-en-el-portavasos.mp4`
```
Animate the attached photo. Static camera. The hand slides the closed trash can down into the cup holder until it sits snugly, then lets go and moves out of frame. 3 seconds, no camera shake, the product keeps its exact shape and size.
```

**Paso 2** (a partir de BAS-10) → `how-to-use/02-apreta-y-tira.mp4`
```
Animate the attached photo. Static camera. A finger presses the lid, it pops open, the hand drops a crumpled tissue inside, and the finger presses the lid closed again. 3–4 seconds, natural speed, the product keeps its exact shape and size.
```

**Paso 3** (a partir de BAS-11) → `how-to-use/03-cambia-la-bolsita.mp4`
```
Animate the attached photo. Static camera. The hands lift the full liner bag out, tie it, and fit a new empty liner bag into the can, folding its edge over the rim. 4 seconds, natural speed, the product keeps its exact shape and size.
```

Cuando estén los videos: en `lib/landings/basurero.ts`, `heroMedia` pasa a
`kind: 'video'` con su `poster` (como el trabavolante) y cada `steps[]` suma su
`video`. Si se suma una carpeta nueva a `/public/basurero/`, va a `_routes.json`.
