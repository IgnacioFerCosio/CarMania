# Soplador Turbo PRO™ — checklist antes de publicar `/soplador`

La landing está armada y navegable, pero **no está lista para recibir
tráfico**. Todo lo de acá está marcado con `// TODO` en el código.

Producto de origen: **X8 Mini Soplador Inalámbrico**, LAMBO TECH, modelo
`LT-25119`. Se vende **sólo el negro** (el proveedor también lo hace en
morado). Costo del proveedor: **US$ 11,00 por unidad**, caja de 60.

---

## 1. Imágenes y videos — NINGUNO existe todavía

Todas las rutas ya están cableadas en `lib/landings/soplador.ts`. Apenas
pongas los archivos con estos nombres, aparecen solos.

### Hero — `public/soplador/hero/`
| Archivo | Qué es |
|---|---|
| `soplador-hero.webp` | Render del producto **en negro**, con la boquilla al lado. Cuadrado, 1600×1600. Es el LCP de la página y también la foto de la card en `/tienda` y la imagen del bloque de beneficios. |

### Casos de uso — `public/soplador/use-cases/` (6, cuadradas)
| Archivo | Qué muestra |
|---|---|
| `rejillas.webp` | Soplando las rejillas de ventilación del auto |
| `tapizados.webp` | Levantando migas / pelo de mascota de los pliegues del asiento |
| `tablero.webp` | Sacando polvo de costuras y botones del tablero |
| `teclado.webp` | Limpiando entre las teclas |
| `notebook.webp` | Soplando la salida de aire de una notebook |
| `secado.webp` | Volando gotas de agua de las molduras después de lavar |

### Cómo se usa — `public/soplador/how-to-use/` (3 videos, H.264, sin audio)
| Archivo | Paso |
|---|---|
| `01-cargalo-por-usb.mp4` | Enchufar el cable USB |
| `02-pone-la-boquilla.mp4` | Calzar la boquilla intercambiable |
| `03-apreta-y-sopla.mp4` | Apretar el botón y soplar un rincón |

> La CSP tiene `media-src 'self'`: los videos **tienen que** estar en
> `/public`, no en un CDN externo.

### Antes / después — `public/soplador/before-after/` (mismo encuadre)
| Archivo | Qué muestra |
|---|---|
| `sin-soplador.webp` | Rejillas con polvo entre las aletas |
| `con-soplador.webp` | Las mismas rejillas limpias |

> Ojo con lo que pasó con el parasol: el primer par de fotos era demasiado
> parecido entre sí y el comparador no se entendía. La diferencia tiene que
> leerse de un vistazo.

### Packs — `public/soplador/bundles/`
`SopladorX1.webp`, `SopladorX2.webp`, `SopladorX3.webp` — 1, 2 y 3 unidades.

---

## 2. Precios

Ninguno es real. Están puestos para que la página renderice.

| Pack | Provisorio | Comparación |
|---|---|---|
| x1 | $24.990 | $39.000 |
| x2 (2ª al 50%) | $37.485 | $78.000 |
| x3 (3ª gratis) | $49.980 | $117.000 |

El único dato cierto es el costo: **US$ 11,00 FOB por unidad**. Falta sumar
importación, logística y margen para llegar al precio en pesos.

---

## 3. Shopify

Los 3 productos (x1, x2, x3) **no existen**. Sus `productId` y
`fallbackVariantId` están en `''`, y con eso el botón de compra queda
deshabilitado a propósito — no se habilita contra un merchandise inexistente.

Recordá que en este proyecto **los packs son productos separados, no
variantes** (ver CLAUDE.md).

---

## 4. Specs — hay una contradicción que resolver

Estos números salen de la ficha del proveedor y **no están verificados**:

| Spec | Ficha |
|---|---|
| Velocidad | 110.000 RPM |
| Velocidad de aire | 68 m/s |
| Batería | 2000 mAh |
| Potencia | 120 W |
| Tiempo de uso | 15 – 25 min |
| Carga | USB 5V |
| Peso | 265 g |

**El problema:** varias publicaciones de este mismo tipo de equipo, también a
110.000 RPM, declaran **~25 m/s**, no 68. Es una diferencia demasiado grande
para ser ruido. Antes de publicar hay que medirlo o bajar el claim.

Por eso en la landing **no hay ninguna cifra de rendimiento en el copy
visible**: las specs numéricas quedaron sólo en el badge del hero
(`110.000 RPM`) y comentadas en el código. El resto del texto describe el
efecto, no el número. Publicar una cifra inflada es exposición directa bajo la
ley de defensa del consumidor.

---

## 5. Reseñas y prueba social

- `SOPLADOR_REVIEWS`: **5 reseñas inventadas**. No publicar así.
- `brand.socialProofCount`: `'Miles'` — poner el número real cuando haya ventas.
- `ratingBreakdown`: derivado de las reseñas falsas.

---

## 6. Copy pendiente

- FAQ "¿Cuánto tarda en llegar?" — completar con los plazos reales de Andreani
  por zona. Hoy está redactada sin prometer un plazo concreto.
- FAQ "¿Cuánto dura la batería?" — hoy responde en cualitativo. Cuando midas
  los minutos reales, ponelos.
