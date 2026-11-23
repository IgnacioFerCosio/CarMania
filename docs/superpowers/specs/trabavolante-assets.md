# Trabavolante Titan PRO™ — investigación y checklist antes de publicar `/trabavolante`

La landing está armada y se ve completa en `npm run dev` y en las previews,
pero **no está lista para recibir tráfico**: en producción está oculta con
`comingSoon: true` en `STORE_PRODUCTS` (`lib/config.ts`). Eso hace que
`/trabavolante` responda 404, que no vaya al sitemap y que la card de
`/tienda` diga "Próximamente" sin link. **Publicarla es sacar ese flag**,
después de cerrar todo lo de abajo. Todo está marcado con `// TODO` en
`lib/landings/trabavolante.ts`.

Material de origen: carpeta `CarMania/TITANLOCK` (fotos, creativos, 3 videos
y fotos de reseñas de TitanLock).

---

## 1. Qué hay que decidir / confirmar

| Qué | Dónde | Estado |
|---|---|---|
| Precio real de x1 / x2 / x3 | `TRABAVOLANTE_BUNDLES`, `fallbackPricing`, `STORE_PRODUCTS` | Provisorio: $39.990 / $59.990 / $79.990 (tachados $69.990 / $139.980 / $209.970). Cumplen "2ª al 50%" y "3ª GRATIS"; si cambian, el test de config avisa si el copy deja de cerrar. |
| Crear los 3 productos en Shopify y publicarlos al canal "Carmania Headless" | `productId` / `fallbackVariantId` en `''` | Pendiente. Mientras estén vacíos, el botón dice "Producto no disponible". |
| Handle real del x1 | `brand.productHandle` y `STORE_PRODUCTS` | Supuesto: `trabavolante-titan-pro`. Si Shopify deja el ™ (como en el parasol), hay que copiarlo tal cual. |
| Qué modelo llega | — | TitanLock tiene dos: el común (cable de 620 mm) y el Pro (720 mm, carcasa de aluminio, llave única por unidad). La landing no promete largo. |
| Si la unidad llega con "TITANLOCK" grabado en la carcasa | — | Se ve en casi todas las fotos. Si la nuestra viene lisa (o con nuestro logo), hay que rehacer las fotos donde se lee. |
| Specs | `benefits` (`// TODO VERIFICAR`) | Cable de acero trenzado de 5 mm, cilindro "clase B" anti-taladro, 3 llaves: salen de la ficha de TitanLock. Medir una unidad. |

**No se usan a propósito** (son de otra marca o no tienen fuente): "resiste
más de 2 toneladas", "compatible con el 99 % de los autos", "grado militar",
las encuestas "98 % / 97 % / 96 %" y "180.000 clientes". Si algún día se
quieren usar, tiene que ser con un ensayo o una encuesta nuestra.

## 2. Reseñas

Cargadas el 2026-11-23: 8 reseñas (7 de 5★ y 1 de 4★, promedio 4,88) con las
fotos de `TITANLOCK/Reviews Landing`, en `public/trabavolante/reviews/`
(800×600; las que llegaron más chicas, en su tamaño). Mismo formato que las
del soporte: apellido abreviado, tilde de verificada y fecha. Las fechas
(3 al 21 de noviembre de 2026) no vinieron con las reseñas. Ojo antes de publicar:

- En 4 fotos se lee **TITANLOCK** en la carcasa (en familia, en pareja, con las
  llaves y en la mano) y la de "puesto en el volante" es un auto con volante
  a la derecha, que no se vende en Argentina.
- La de Matías Sosa dice "viene con **dos** llaves"; la página promete 3.

## 3. Imágenes y videos — qué hay hoy y qué conviene rehacer

Todo está en `public/trabavolante/` y ya cableado. Para reemplazar un
archivo, subilo con el mismo nombre y tamaño. Todo se exporta al tamaño en
que se ve (en Cloudflare `/_next/image` devuelve el original).

| Archivo | Qué es hoy | ¿Rehacer? |
|---|---|---|
| `hero/trabavolante-hero.mp4` (+ `-poster.webp`) | Video "Ponelo. Trabalo. Olvidate." de TitanLock, recortado arriba de su franja de logo. 720², sin audio, ~0,9 MB. El poster es el LCP. | Sí: la carcasa dice TITANLOCK y es UGC de UK (volante a la derecha). Ideal: mismo guion grabado con nuestra unidad. |
| `hero/trabavolante-oscuro.webp` | Producto recortado sobre fondo de estudio negro. Card de `/tienda`. 1200². | Conviene un render/foto propio con caja CARMANIA, como `bundles/BundleX1.webp` del soporte. |
| `bundles/TrabavolanteX1/X2/X3.webp` | El mismo recorte ×1, ×2, ×3 sobre fondo de estudio, sin llaves (las llaves plateadas no se podían separar del fondo). 900². | Igual que arriba: ideal con la caja y las llaves. |
| `benefits/trabavolante-producto.webp` | Recorte con transparencia, para el bloque de beneficios. | Ídem. |
| `use-cases/*.webp` (6) | Cuadros de los videos: cortafríos, anclaje al cinturón, tirón, volante, funda, llave. 600×900. | Sí si cambia el video. |
| `how-to-use/01…03.mp4` | Cortes de los videos: envolver, enganchar, tirar. 640², sin audio. | Ídem. |
| `whats-in-box/01-producto.webp` | Recorte sobre fondo de estudio. | Ídem bundles. |
| `whats-in-box/02-en-la-mano.webp` | `infalible.png` sin la franja naranja con el logo. Se lee TITANLOCK grabado en la carcasa. | Sí. |
| `whats-in-box/03-cerradura.webp` | `llavesCerradura.png` sin el texto ni el círculo. Se lee TITANLOCK. | Sí. |
| `whats-in-box/04-volante-trabado.webp` | Cuadro del video con el trabavolante puesto. | Sí si cambia el video. |
| `reviews/01…08.webp` | Fotos de las reseñas (ver §2). | Si llegan fotos sin el logo de TitanLock. |
| `comparativa/titan-pro.webp` | El recorte del producto girado, para la tabla. 170×320, transparente. | Ídem bundles. |
| `comparativa/baston.webp`, `comparativa/alarma.webp` | **No existen**: las columnas salen sin figura (`image: ''`). | Generar (prompts en §6). |

**Lo que no se usó** (está en la carpeta, pero tiene texto en inglés, el
logo de TitanLock en grande, caras de terceros o claims sin fuente): las
infografías de porcentajes, la grilla de caras UGC, `creativos estaticos/*`,
`comoseusa.png`, `SeInstalaEnSegundos.png`, `AUTOINTOCABLE.png`. Sus mensajes
(se instala en segundos, vs. el trabavolante de barra, desbloqueo con llave)
están en la landing como texto, con la tipografía y los colores de la marca.

## 4. Investigación de TitanLock (Ouvra Automotive, UK) — 2026-11-20

Fuente: `ouvra.store/products/titanlock`, `/products/titanlockpro` y la home.
`titanslock.com` no cargó (error de SSL).

- **Estructura de su landing:** barra de oferta → rating "4.9/5 (200+
  reviews)" → título + subtítulo ("traba tu volante como una bóveda en un
  click") → precio con tachado → 6 íconos (universal, cable trenzado, se
  instala en segundos, anti-sierra, anti-taladro, anti-martillo) → color →
  CTA "Proteger mi auto" → envío gratis / clientes / garantía de por vida →
  descripción → qué incluye → video + 4 ganchos → testimonios de
  "profesionales" → cómo se usa (3 pasos: envolvé, hacé click, andate) →
  tabla "TitanLock vs. otros" → FAQ → reseñas.
- **Specs que declaran:** cable de acero de 5 mm, cilindro clase B
  anti-taladro, 3 llaves, 620 mm (común) / 720 mm (Pro, con carcasa de
  aluminio y llave única por unidad). En la caja: lock, 3 llaves, manual.
  Sin peso ni medidas de la carcasa.
- **Oferta:** £34 (tachado £49) el común, £44 (tachado £62,99) el Pro.
  "Comprá 2+ y llevate 3 regalos" (no dicen cuáles; venden sueltos una funda
  Faraday, una bolsa y un llavero). Garantía de devolución "de por vida".
- **Ganchos de copy:** disuasión visible ("lo ven y pasan de largo"),
  comodidad vs. el bastón ("lo usás siempre porque es fácil"), "bóveda" /
  "fortaleza", "grado militar". En los creativos en español: "Ponelo.
  Trabalo. Olvidate.", "¿Todavía usás el trabavolante viejo y bulto?",
  "Dormí tranquilo sabiendo que tu auto es intocable".
- **Prueba social:** 180.000+ clientes, 520.000+ autos, testimonios de
  "editores" con atribuciones que cambian entre páginas. Nada verificable.
- **FAQ que usamos de base:** compatibilidad, cómo ponerlo para que quede
  justo, cómo se saca, si raya el volante, funda de volante, llaves
  perdidas, devoluciones. Sumamos "¿reemplaza a la alarma?".

## 5. Para publicar

1. Cerrar §1 y §2.
2. `comingSoon` fuera de `STORE_PRODUCTS` y link al nav de `/tienda` con
   `badge: 'NUEVO'` (como se hizo con el resto).
3. Si entra en el combo del carrito: crear los dos descuentos en Shopify
   antes de sumarlo a `CROSS_SELLS` (ver `lib/landings/index.ts`).
4. `npm test` y, como el gate va a marcar `/tienda` y `/trabavolante`,
   revisar el diff y `npm run gate:capture`.

## 6. Prompts de imágenes (2026-11-23)

Para todos: adjuntar `TITANLOCK.png` como referencia del producto y pedir la
carcasa **lisa, sin logo ni texto**. Las fundas naranjas son parte del
producto: se dejan. Fondo y luz como los packs del soporte y del parasol
(estudio negro, luz cenital suave, un toque de rojo `#D70707` en el borde de
la luz). Exportar al tamaño indicado y reemplazar con el mismo nombre.

**Imagen principal del producto** — `hero/trabavolante-oscuro.webp` (1200²) y
de ahí `whats-in-box/01-producto.webp` (1024²) y `bundles/TrabavolanteX1/X2/X3.webp` (900², con 1/2/3 unidades):

> Premium product photo of a steering wheel lock: a flexible braided steel cable covered in a thick black padded sleeve with two orange rings, forming a loop, ending in a matte black lock body shaped like a seatbelt tongue, smooth surface with no logo or text. Next to it, three silver keys. Centered on a seamless matte black studio background, soft top light, subtle red (#D70707) rim light on the edges, soft reflection on the floor. Square, 1:1, photorealistic, sharp, no text.

**Qué trae la caja** — `whats-in-box/02…04` (1024²; hoy dicen TITANLOCK):

> Overhead flat lay on a matte black surface: a black product box with a thin red (#D70707) accent line and no visible text, the steering wheel lock (black padded cable loop with orange rings and a black seatbelt-tongue lock body, no logos) coiled next to it, three silver keys fanned out, and a small folded instruction leaflet. Even soft studio lighting, clean minimal arrangement, square 1:1, photorealistic, no text or logos.

**Tabla comparativa** — recortes con fondo transparente, verticales (~320 px de alto):

> `comparativa/baston.webp`: A classic red and black steering wheel club lock bar (long telescopic bar with two hooks), product cutout on a transparent background, standing diagonally, studio lighting, photorealistic, no brand, no text.

> `comparativa/alarma.webp`: A generic black car alarm remote key fob with two buttons, product cutout on a transparent background, slightly angled, studio lighting, photorealistic, no brand, no text.

**Cuadros de características** (`use-cases/*.webp`, 600×900, vertical 2:3, interior de auto oscuro, luz dramática lateral, sin texto ni logos):

1. `acero` — ACERO DE 5 MM:
   > Extreme macro of a braided steel cable inside a black padded sleeve, the cut end showing the twisted steel strands, dark car interior background, dramatic side light with a red (#D70707) rim, vertical 2:3, photorealistic, no text.
2. `cinturon` — ANCLA AL CINTURÓN:
   > Close-up of a matte black lock body clicked into a car seatbelt buckle receiver between the front seat and the center console, a black padded cable rising from it, dark interior, soft directional light, vertical 2:3, photorealistic, no logos.
3. `traba` — VOLANTE TRABADO:
   > A driver's hand trying to turn a leather steering wheel that is held by a taut black padded cable running down to the seat, tension visible, dark car interior at night, vertical 2:3, photorealistic, no text.
4. `segundos` — LISTO EN SEGUNDOS:
   > A hand quickly wrapping a black padded cable with orange rings around the top of a steering wheel, slight motion blur on the hand, sharp cable, dark car interior, vertical 2:3, photorealistic.
5. `volante` — CERO RAYONES:
   > Macro of a thick soft black padded sleeve resting on a stitched leather steering wheel, showing no marks on the leather, shallow depth of field, warm soft light, vertical 2:3, photorealistic.
6. `llaves` — 3 LLAVES:
   > Three identical silver security keys on an open palm, next to a matte black lock body with no logo, dark background, soft top light with a red (#D70707) rim, vertical 2:3, photorealistic, no text.
