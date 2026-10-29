# Llavero Rescate PRO™ — checklist antes de publicar `/rompevidrios`

La landing está armada pero **no está lista para recibir tráfico**, así que
en producción está oculta: `comingSoon: true` en `STORE_PRODUCTS`
(`lib/config.ts`) hace que `/rompevidrios` responda 404, que no vaya al
sitemap, y que la card de `/tienda` se vea como "Próximamente" sin link.
**Publicarla es sacar ese flag.**

En `npm run dev` y en las previews de Cloudflare (toda rama que no sea
`main`) se ve entera, con los placeholders. Ahí también aparecen la sección
del bombero y la caja de reseñas, que en producción se ocultan mientras no
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
| RV-04 | `test/test-vidrio-lento.mp4` + `test/test-vidrio-lento-poster.webp` | El test | Video en loop | 1:1 | **El activo central.** El vidrio de prueba estallando en cámara lenta al apretar el llavero. | 5–6 s, cámara lenta, 1080×1080 |
| RV-05 | `test/vidrio-de-prueba.webp` | El test | Foto | 4:5 | El vidrio de prueba sano junto al llavero, como viene en la caja. | 1200×1500 |
| RV-06 | `pasos/01-apoyalo.mp4` | Cómo funciona | GIF (MP4) | 1:1 | Primer plano: el llavero apoyado en la esquina de la ventanilla lateral. | 3 s |
| RV-07 | `pasos/02-apreta.mp4` | Cómo funciona | GIF (MP4) | 1:1 | Primer plano: aprieta y el vidrio estalla. | 3 s, cámara lenta |
| RV-08 | `pasos/03-corta.mp4` | Cómo funciona | GIF (MP4) | 1:1 | El llavero cortando un cinturón tenso de un tirón. | 3 s |
| RV-09 | `pasos/despiece.webp` | Cómo funciona | Infografía | 16:9 | Despiece del llavero con flechas: resorte, punta de tungsteno, cuchilla protegida, argolla. | 1600×900, fondo negro |
| RV-10 | `comparativa/comparativa.webp` | Comparativa | Foto | 3:2 | Los tres juntos sobre una mesa: llavero, martillo de emergencia y un apoyacabezas. | 1500×1000 |
| RV-11 | `experto/bombero.mp4` + `experto/bombero-poster.webp` | Bombero | Video con audio y subtítulos | 9:16 | Bombero voluntario real, a cámara, 30–60 s: cómo salir de un auto atrapado y por qué llevar un rompevidrios en la llave. | Subtítulos quemados; **este sí con audio** (va con controles, sin autoplay) |
| RV-12 | `caja/que-incluye.webp` | Qué viene | Foto | 1:1 | Unboxing: caja abierta con llavero, vidrio de prueba y argolla. | 1600×1600 |
| RV-13 | `packs/pack-2x.webp` | Packs | Foto de producto | 1:1 | 2 llaveros sobre fondo negro, con 2 vidrios de prueba. También es la foto de la card en `/tienda`. | 1600×1600 |
| RV-14 | `packs/pack-4x.webp` | Packs | Foto de producto | 1:1 | 4 llaveros, cada uno en una llave de auto distinta. | 1600×1600 |
| RV-15 | `packs/pack-6x.webp` | Packs | Foto de producto | 1:1 | 6 llaveros en abanico. | 1600×1600 |
| RV-16 | `cierre/llave-en-mano.webp` | Cierre | Foto | 16:9 | Plano tranquilo: llaves con el llavero sobre el tablero, de noche, con luz de ciudad. | 1600×900 |

**Card de `/tienda`:** mientras no llegue RV-13 usa
`tienda/proximamente.webp`, un placeholder propio (llave roja + nombre). La
card "Próximamente" sí se ve en producción, y con la ruta de RV-13 se vería
rota. Cuando subas RV-13, apuntá `image` de la entrada en `STORE_PRODUCTS` a
`/rompevidrios/packs/pack-2x.webp` y borrá el placeholder.

**Carpetas nuevas:** cada subcarpeta de `public/rompevidrios/` tiene que
estar en `exclude` de `_routes.json` (ya están las diez de esta tabla). Si
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
- [ ] Garantía: **[Confirmar plazo: 30 días]**. Ojo: `Pricing` muestra
      "Devolución 30 días" y "Garantía 1 año" en todas las landings;
      confirmar que valgan para este producto.
- [ ] "Qué viene en la caja": confirmar con Spring.
- [ ] Bombero: nombre y cuartel reales ("[Nombre], bombero voluntario de
      [cuartel]"). Sin video real, la sección no sale en producción.
- [ ] "Descuento por transferencia" (debajo de los packs): confirmar que
      exista en el checkout.
- [ ] Badge "EL MÁS ELEGIDO" del pack 4x: sin ventas todavía es una promesa;
      revisarlo cuando haya datos.

### Lo que no se puede poner

- Reseñas inventadas: la lista va vacía hasta que haya reales con foto. En
  dev/preview se ve la caja "PENDIENTE"; en producción la sección no sale.
- Cifras de ventas, sellos, "recomendado por bomberos", ADAC, contadores de
  urgencia ("termina hoy", "quedan X").
- Que rompe "cualquier vidrio": no rompe el parabrisas ni vidrios laminados
  (lo dicen las dos primeras preguntas del FAQ).
- Seguro de envío o ítems tildados por defecto.
