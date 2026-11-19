# /soplador-tornado: auditoría antes de publicar (2026-11-19)

Medido sobre un **build de producción** (`next build` + `next start`, con la
landing visible como en una preview de Cloudflare), en mobile 375×812.

## Rendimiento

| Métrica | Resultado | Lectura |
|---|---|---|
| JS propio (First Load) | **139 KB** | En línea con el resto del sitio (138–140 KB). Bien. |
| TTFB / DOMContentLoaded / load (local) | 26 / 58 / 242 ms | Local, sin red real: sirven para comparar, no como dato de campo. |
| CLS | **0** | Sin saltos de diseño. Bien. |
| Long tasks (local) | 0 | En una PC rápida; en un Android medio los pixels sí pesan (ver abajo). |
| LCP | **no medible acá** | El panel del navegador no reporta pintadas. Medirlo con PageSpeed Insights sobre la preview de Cloudflare. |
| Peso al cargar (sin scrollear) | ~950 KB | 684 KB propios (de eso, 399 KB son el video del hero) + 266 KB de terceros. |

**Lo que está bien:**
- El LCP es el poster del hero (12 KB), con `preload` y `fetchpriority=high`.
- Los videos de "Miralo en acción" se montan recién cerca de la pantalla
  (`LazyVideo`), no en la carga.
- Las fuentes (2 × ~50 KB) van precargadas.

**Para mejorar (de más a menos impacto):**

1. **Imágenes más grandes que su tamaño en pantalla.** En Cloudflare
   `/_next/image` devuelve el original, así que pesa lo que pesa el archivo.
   | Imagen | Exportada | Se ve a | Propuesta |
   |---|---|---|---|
   | Casos de uso (6) | 800×1200, 65–165 KB c/u | ~110 px (mobile), ~210 px (desktop) | **480×720** |
   | Packs (3) | 900×900 | ~300 px | 600×600 |
   | Reseñas (8) | 800×600 | ~300 px | 600×450 |
   | Despiece | 1100×1100 | ~340 px | 700×700 |

   Ahorra del orden de 500–700 KB en un scroll completo, sin cambio visible.
2. **El video del hero baja entero al cargar (399 KB).** El poster ya es el
   LCP, pero en 4G el video compite con el JS de la página. Se puede arrancar
   el video recién después del `load`, con el poster fijo hasta entonces. El
   componente es compartido con el soporte: probarlo en las dos.
3. **Terceros: ~270 KB de JS** (Meta Pixel 97 + 169 KB de config, TikTok,
   Klaviyo diferido). Es lo que más pesa en un celular medio. Son necesarios
   para la pauta: no los tocaría antes de medir con PSI.

## Código

- **Bien:** config separada de la página, `generateMetadata` que no filtra el
  título en el 404, Shopify filtrado cuando no hay GIDs, reseñas condicionales,
  `npm test` en verde (tipos, assets, CSP, routes, gate).
- **No hay `og:image`** (en ninguna página del sitio): al compartir el link
  por WhatsApp o en Facebook sale sin imagen. Sumar una imagen 1200×630 al
  `openGraph` de la página (Next no hereda el del layout).
- `ViewContent` del Pixel/Klaviyo sólo se dispara con `productId`: hoy no se
  dispara. Se arregla solo al cargar los productos de Shopify.

## Bloqueantes antes de recibir tráfico

1. **Productos en Shopify**: los 3 `productId` están vacíos, así que **los
   botones de compra están deshabilitados**. Crear x1/x2/x3, publicarlos en el
   canal "Carmania Headless" y cargar los GIDs (`check:shopify` lo valida).
2. **Precios tachados** ($179.990 / $359.980 / $539.970) son provisorios. Un
   "precio normal" que nunca se cobró es exposición directa (Ley de Lealtad
   Comercial). Usar un precio de referencia real o sacar el tachado.
3. **"Miles de veredas sin hojas"** (prueba social del bloque de precios) es
   placeholder.
4. **Fotos de reseñas**: varias muestran gatillo rojo o directamente otro
   modelo (batería XINBAKE). Reemplazar por fotos del producto real.
5. **FAQ "¿Cuánto dura la batería?"**: respuesta genérica. Es la objeción
   número uno de este producto; medir con la muestra y poner minutos.
6. **Pack x3 a $239.990**: no se divide por 3 y Shopify Bundles lo parte en
   dos líneas en el pedido. $239.988 o $239.991 lo evitan.
7. Publicar: sacar `comingSoon` y `hidden` de la card en `lib/config.ts`.

## Conversión

Orden actual: Hero → Casos de uso → Qué incluye → Videos → Comparativa →
**Precios** → Beneficios → Reseñas → Garantía → FAQ → CTA final.

1. **Sumar la barra de compra fija en mobile (`StickyATC`).** El soporte la
   tiene y el Tornado no. En una página de ~14.700 px de alto en el celular es
   la mejora de conversión más directa.
2. **Mover Beneficios antes de los precios.** Hoy el "por qué" (despiece +
   6 beneficios) aparece después del precio. Orden propuesto:
   Hero → Casos de uso → Videos → **Beneficios** → Comparativa →
   **Qué incluye** → **Precios** → Reseñas → Garantía → FAQ → CTA.
   "Qué incluye" justo antes del precio responde "¿qué me llega?" en el
   momento de decidir.
3. **Badge del hero: un beneficio en vez de una ficha técnica.** "Presión de
   35.000 Pa" no le dice nada al comprador promedio (y es un dato sin medir).
   Algo como "Seca el auto sin tocarlo" o, cuando se mida, "X min de batería".
4. **Oferta: pack con batería extra.** Dos o tres sopladores no son una compra
   natural (sí lo eran los llaveros). "1 Tornado + batería extra" responde la
   objeción de autonomía y sube el ticket. Requiere que el proveedor venda
   baterías sueltas (Advenco vende una Bramer 21 V 2 Ah a ~$16.000).
5. **Video del hero**: el primer segundo muestra la toalla y el logo de
   Lamborghini antes que el soplador. Recortar ese tramo para que el producto
   aparezca de entrada.
6. **"Probá tu Soplador Tornado PRO 30 días gratis"**: es una devolución de
   30 días, no una prueba gratis. Mismo texto que en las otras landings;
   conviene "30 días de devolución" para no prometer algo distinto.
