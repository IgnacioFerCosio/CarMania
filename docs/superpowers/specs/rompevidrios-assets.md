# Llavero Rescate PRO™ — checklist antes de publicar `/rompevidrios`

La landing está armada pero **no está lista para recibir tráfico**, así que
en producción está oculta: `comingSoon: true` en `STORE_PRODUCTS`
(`lib/config.ts`) hace que `/rompevidrios` responda 404, que no vaya al
sitemap, y que la card de `/tienda` se vea como "Próximamente" sin link.
**Publicarla es sacar ese flag.**

En `npm run dev` y en las previews de Cloudflare (toda rama que no sea
`main`) se ve entera, con los placeholders. Ahí también aparece la caja de reseñas, que en producción se oculta mientras no
haya material real.

Es una landing tipo advertorial: todo el copy y todos los assets están en
`lib/landings/rompevidrios.ts`.

---

## 1. Fotos y videos (2026-10-29: no existe ninguno)

Todo va en `public/rompevidrios/`. Cada asset es un `MediaSlot` en la config
con `pending: true`; mientras tanto, la página muestra una caja que dice qué
va ahí. **Para que aparezca:** subí el archivo con ese nombre exacto
(mayúsculas incluidas) y cambiá su `pending` a `false`. `check:assets` avisa
si te olvidás de alguna de las dos cosas.

Videos y "GIF": **MP4 H.264, sin audio, en loop, menos de 2 MB** (nada de
`.gif`). Imágenes en **webp**.

| ID | Archivo | Sección | Tipo | Proporción | Qué tiene que mostrar | Especificación |
|---|---|---|---|---|---|---|
| RV-01 | `hero/hero.mp4` + `hero/hero-poster.webp` | Hero | Video en loop | 4:5 | Mano sacando la llave del auto con el llavero colgado; lo apoya en la ventanilla, aprieta, el vidrio estalla. Auto real de fondo. | 6–8 s, 1080×1350. Es el único asset que carga sin esperar al scroll |
| RV-02 | `historia/inundacion.webp` | Escenario | Foto | 16:9 | Calle o autopista inundada con autos con el agua por las puertas. Propia o con licencia; nunca de un caso real sin permiso. | 1600×900 |
| RV-03 | `historia/apoyacabezas.mp4` | El mito | GIF (MP4) | 4:5 | Alguien intenta sacar el apoyacabezas de un auto nuevo y no sale. | 4–5 s |
| RV-04 | `test/test-vidrio-lento.mp4` + `test/test-vidrio-lento-poster.webp` | Sin usar: sacado del carrusel el 2026-11-05 (queda para otra sección) | Video en loop | 1:1 | **El activo central.** El vidrio de prueba estallando en cámara lenta al apretar el llavero. | 5–6 s, cámara lenta, 1080×1080 |
| RV-05 | `test/vidrio-de-prueba.webp` | "¿Qué incluye?" (carrusel, slide 4) | Foto | 1:1 | El vidrio de prueba sano junto al llavero, como viene en la caja. | 1600×1600 |
| RV-06 | `pasos/01-colocalo.mp4` | Cómo funciona (paso 1 "Colocalo") | GIF (MP4) | 1:1 | Montaje: el llavero entra y sale de su soporte en el tablero o la consola, y colgado de la llave. | 4–6 s |
| RV-07 | `pasos/02-apreta.mp4` | Cómo funciona | GIF (MP4) | 1:1 | Primer plano: aprieta y el vidrio estalla. | 3 s, cámara lenta |
| RV-08 | `pasos/03-corta.mp4` | Cómo funciona | GIF (MP4) | 1:1 | El llavero cortando un cinturón tenso de un tirón. | 3 s |
| RV-12 | `caja/que-incluye.webp` | "¿Qué incluye?" (carrusel, slide 1: la que se ve al cargar) | Foto | 1:1 | Todos los elementos juntos: llavero, vidrio de prueba y soporte adhesivo. **Cargada (2026-11-05):** imagen de IA con el logo de Carmania compuesto encima (2 llaveros, 2 vidrios, 2 soportes sobre pasto). Cuando haya muestra física, reemplazar por foto real. | 1200×1200 |
| RV-13 | `packs/pack-2x.webp` | Packs | Foto de producto | 1:1 | 2 llaveros sobre fondo negro, con 2 vidrios de prueba. También es la foto de la card en `/tienda`. | 1600×1600 |
| RV-14 | `packs/pack-4x.webp` | Packs | Foto de producto | 1:1 | 4 llaveros, cada uno en una llave de auto distinta. | 1600×1600 |
| RV-15 | `packs/pack-6x.webp` | Packs | Foto de producto | 1:1 | 6 llaveros en abanico. | 1600×1600 |
| RV-16 | `cierre/llave-en-mano.webp` | Cierre | Foto | 16:9 | Plano tranquilo: llaves con el llavero sobre el tablero, de noche, con luz de ciudad. | 1600×900 |
| RV-17 | `incluye/punta-tungsteno.webp` | "¿Qué incluye?" (carrusel, slide 2) | Foto macro | 1:1 | Macro de la punta de tungsteno, bien de cerca y con foco nítido. | 1600×1600 |
| RV-18 | `incluye/cuchilla-cinturon.webp` | "¿Qué incluye?" (carrusel, slide 3) | Foto macro | 1:1 | Macro de la ranura de la cuchilla, con un cinturón entrando. | 1600×1600 |
| RV-19 | `incluye/soporte-adhesivo.webp` | "¿Qué incluye?" (carrusel, slide 5) | Foto | 1:1 | El soporte adhesivo pegado en el tablero, con el llavero encastrado. | 1600×1600 |
| RV-20 | `situaciones/auto-inundado.webp` | "Cuando cada segundo cuenta" (tarjeta 1) | Foto vertical | 2:3 | Auto en una calle inundada, con el agua a la altura de las puertas. | 1000×1500 |
| RV-21 | `situaciones/puerta-trabada.webp` | "Cuando cada segundo cuenta" (tarjeta 2) | Foto vertical | 2:3 | Una mano tirando de la manija de una puerta que no abre. | 1000×1500 |
| RV-22 | `situaciones/cinturon-trabado.webp` | "Cuando cada segundo cuenta" (tarjeta 3) | Foto vertical | 2:3 | Primer plano de la mano en el botón del cinturón, que no se suelta. | 1000×1500 |
| RV-23 | `situaciones/choque-en-ruta.webp` | "Cuando cada segundo cuenta" (tarjeta 4) | Foto vertical | 2:3 | Auto accidentado al costado de la ruta (propia o con licencia, sin personas reconocibles). | 1000×1500 |
| RV-24 | `situaciones/auto-volcado.webp` | "Cuando cada segundo cuenta" (tarjeta 5) | Foto vertical | 2:3 | Auto dado vuelta sobre el techo (propia o con licencia). | 1000×1500 |
| RV-25 | `situaciones/sin-ayuda-cerca.webp` | "Cuando cada segundo cuenta" (tarjeta 6) | Foto vertical | 2:3 | Ruta desierta de noche, con un auto parado y las balizas prendidas. | 1000×1500 |

**La grilla "Cuando cada segundo cuenta"** es la misma `UseCases` que usa `/`
entre el hero y el banner de marcas: 6 tarjetas verticales con la etiqueta
abajo (la última palabra, en rojo). Las 6 situaciones, sus etiquetas y su
texto están en `SITUACIONES` (`lib/landings/rompevidrios.ts`). Son lugares
donde sirve el llavero; no prometen un resultado. Cuidado con las fotos de
accidentes: sólo propias o con licencia, y sin personas reconocibles.
Desde 2026-11-05 las 6 están cargadas (`pending: false`): son imágenes
generadas con IA, con los originales en `Martillo/Imágenes Landing`, exportadas
a 1000×1500 en `public/rompevidrios/situaciones/`. Antes de publicar: que no
se reconozca el modelo del auto ni la patente, y poner la etiqueta de
"contenido generado con IA" que pida Meta en los anuncios.

**La sección "Sabés que funciona antes de necesitarlo" + "¿Qué incluye?"** es
la misma que `WhatsInBox` del soporte: el mismo `ProductCarousel` (ventana
1:1, flechas, puntos y arrastre), la lista "¿Qué incluye?", el botón
"Comprar ahora" y una opinión abajo. Los slides del carrusel son los de
`ROMPEVIDRIOS.advertorial.includes.slides` y **no llevan texto propio**: si
querés que una foto diga qué es (por ejemplo "Punta de tungsteno"), escribilo
dentro de la imagen, como las infografías del soporte. Todas son 1:1.
La opinión de abajo es de maqueta y sólo se ve en `npm run dev`
(`rompevidrios.mock-reviews.ts`): hasta que haya una reseña real, en
producción y en las previews la sección sale sin opinión.
También se reusa el banner de marcas de autos de `/` ("Lo llevás en
cualquier auto"), justo debajo del hero. Las secciones "Imaginate…" (RV-02) y
"El mito" (RV-03) están desactivadas en `app/rompevidrios/page.tsx`: sus slots
y su copy siguen en la config.

**Cómo optimizar el hero (RV-01), igual que `/` y `/parasol`:** 720 px de
ancho como máximo (la caja del hero nunca pasa de ~600 px), H.264 sin audio,
CRF 28–31, `faststart`. Así queda en ~0,7 Mbps. El poster
(`hero/hero-poster.webp`) es **el primer cuadro del video ya encodeado**,
para que no salte cuando arranca; es el LCP y la página lo precarga sola
apenas el slot pasa a `pending: false`.

**Maqueta local (para ver cómo queda antes de filmar):** guardá cualquier
video o foto de referencia en `public/mock/` con el ID del slot como nombre:
`RV-04.mp4`, `RV-02.jpg`, etc. Los videos van en `.mp4`; las fotos pueden
ser `.webp`, `.jpg`, `.jpeg` o `.png`. En `npm run dev` se dibujan encima del
placeholder (recargá la página); si un slot no tiene archivo, sigue el
placeholder. La carpeta está en `.gitignore` y el código sólo la mira en
dev, así que **nunca llega al repo, a las previews ni a producción**: ahí
puede ir material que no es nuestro. No reemplaza al asset final: eso sigue
siendo subir `slot.src` y pasar `pending` a `false`. (En la consola de dev
van a aparecer 404 de `/mock/...` por los slots sin archivo; es esperable.)

**Comparativa (no son slots):** la tabla de "Llavero, martillo o apoyacabezas"
usa tres recortes sin fondo (webp con transparencia) en
`public/rompevidrios/comparativa/`: `llavero-diagonal.webp` (el llavero con el
logo, recortado de la foto de IA), `martillo-diagonal.webp` y
`apoyacabezas.webp`. **El martillo y el apoyacabezas salen de fotos de
internet** que pasó Ignacio: antes de publicar, confirmar la licencia o
reemplazarlas por fotos propias o generadas. Para cambiar uno, exportá un
webp con transparencia (máx. ~420 px de lado) con un nombre NUEVO (el
optimizador de imágenes de Next cachea por URL y no se entera de que el
archivo cambió) y actualizá `comparison.columns` en la config. La carpeta ya
está en `_routes.json`.

**Card de `/tienda`:** mientras no llegue RV-13 usa
`tienda/proximamente.webp`, un placeholder propio (llave roja + nombre). La
card "Próximamente" sí se ve en producción, y con la ruta de RV-13 se vería
rota. Cuando subas RV-13, apuntá `image` de la entrada en `STORE_PRODUCTS` a
`/rompevidrios/packs/pack-2x.webp` y borrá el placeholder.

**Carpetas nuevas:** cada subcarpeta de `public/rompevidrios/` tiene que
estar en `exclude` de `_routes.json` (ya están las doce de esta tabla). Si
sumás otra, agregala; `check:routes` falla si falta.

---

## 2. Shopify

- [ ] Crear los 3 packs como **productos separados** (no variantes):
      2x, 4x y 6x. **No hay pack de 1.** En la config usan los ids
      `single`/`double`/`triple` con 2, 4 y 6 unidades.
- [ ] Publicarlos al canal **"Carmania Headless"** (desde el listado de
      productos, como los packs del parasol). Si no, la Storefront API
      devuelve `null` y el botón falla.
- [ ] Cargar `productId` y `fallbackVariantId` de cada pack en
      `lib/landings/rompevidrios.ts`. Con `''` los botones quedan
      deshabilitados.
- [ ] Confirmar el handle del pack 2x (`brand.productHandle`, hoy
      `llavero-rescate-pro`) y el `handle` de la entrada en `STORE_PRODUCTS`.
- [ ] Precios: 2x $29.990, 4x $44.990, 6x $54.990. **Tachado:** $19.990 por
      unidad × cantidad. **Confirmar el precio de lista real**: el tachado
      tiene que haber existido de verdad.
- [ ] Correr `npm run check:shopify`: verifica que cada pack sea visible y
      que el precio y el tachado coincidan con la config.

### Venta cruzada con el soporte (pendiente)

El plan es ofrecer el soporte con el rompevidrios en el carrito, y al revés.
**No está cableado** porque la card "Completá tu auto" siempre anuncia un
descuento de combo, y hoy no existe ninguno para este par. Para sumarlo:

1. Crear en Shopify los dos descuentos automáticos "Comprá X, llevá Y"
   (rompevidrios → soporte y soporte → rompevidrios), con cualquier pack de
   cada lado.
2. Si el monto no es `CROSS_SELL_DISCOUNT` ($20.000), hay que separar el
   monto por par en `lib/landings/index.ts`: hoy todos los combos usan el
   mismo, y los descuentos no combinables necesitan montos iguales cuando
   compiten (ver el comentario de `CROSS_SELLS`).
3. Sumar las dos entradas a `CROSS_SELLS`.

La escalera del rompevidrios ya está en `ALL_UPSELL_CHAINS`, así que el
upsell de pack (2x → 4x → 6x) funciona apenas existan los productos.

---

## 3. Copy que falta confirmar

Todo esto aparece entre corchetes en la página o con `// TODO` en la config.

- [ ] `brand.socialProofCount`: la cifra real de clientes. Vacía, la línea
      "[cifra] conductores ya lo llevan" del hero y la del header de packs
      no se muestran.
- [ ] FAQ "¿Es peligroso con chicos?": **[Confirmar si tiene traba]**.
- [ ] FAQ "¿Cuánto tarda en llegar?": **[X] días hábiles** por Andreani.
- [ ] Garantía (cards "Calidad garantizada"): **30 días de devolución y 1 año de garantía**. Ojo: `Pricing` muestra
      "Devolución 30 días" y "Garantía 1 año" en todas las landings;
      confirmar que valgan para este producto.
- [ ] "¿Qué incluye?": confirmar con Spring que la caja traiga el soporte adhesivo (hoy figura como incluido). La argolla no se menciona en ningún lado: no se sabe si viene.
- [ ] "Descuento por transferencia" (debajo de los packs): confirmar que
      exista en el checkout.
- [ ] Badge "EL MÁS ELEGIDO" del pack 4x: sin ventas todavía es una promesa;
      revisarlo cuando haya datos.

### Lo que no se puede poner

- Reseñas inventadas: la lista va vacía hasta que haya reales con foto. En
  dev/preview se ve la caja "PENDIENTE"; en producción la sección no sale.
- Cifras de ventas, sellos, "recomendado por bomberos", ADAC, "quedan X".
- **Ojo con el `CountdownBanner`:** desde 2026-10-30 la página usa el mismo
  header que las otras landings, con la "Oferta relámpago" de 8 horas. Ese
  contador se reinicia solo cada 8 horas, así que la oferta no vence nunca.
  Es una urgencia que no existe, y la ley de defensa del consumidor puede
  verlo como publicidad engañosa (le pasa igual a `/`, `/parasol` y
  `/soplador`). El plan original lo descartaba; quedó por decisión de
  estética de marca. Revisarlo antes de publicar.
- Que rompe "cualquier vidrio": no rompe el parabrisas ni vidrios laminados
  (lo dicen las dos primeras preguntas del FAQ).
- Seguro de envío o ítems tildados por defecto.
