# CARMANIA Landing — Soporte Magnético PRO™

Landing headless para [carmaniaoficial.com](https://carmaniaoficial.com), conectado a la tienda Shopify vía Storefront API. Pensado para correr en `oferta.carmaniaoficial.com` y dirigir todo el tráfico de Meta Ads al checkout nativo de Shopify (con MercadoPago ya integrado).

- **Stack**: Next.js 14 (App Router) · TypeScript · Tailwind CSS
- **Backend**: Shopify Storefront API 2025-01
- **Deploy**: Vercel
- **Tracking**: Meta Pixel

---

## 🚀 Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar las variables de entorno
cp .env.example .env.local
# (.env.local ya viene precargado con los valores de CARMANIA — para usar
#  otra tienda, editá los valores)

# 3. Levantar dev
npm run dev
# abrís http://localhost:3000
```

---

## ⚙️ Variables de entorno

Todas viven en `.env.local` (o en el dashboard de Vercel).

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_SHOPIFY_DOMAIN` | Subdominio `.myshopify.com` de la tienda | `carmania-9625.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Token público de Storefront API | `40713e31...` |
| `NEXT_PUBLIC_SHOPIFY_API_VERSION` | Versión de la API | `2025-01` |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID del Pixel de Meta. Vacío = no trackear | `877870938398833` |

> **Nota sobre el token Storefront**: es PÚBLICO por diseño de Shopify, pensado para vivir en el cliente. No confundir con el token "Admin" (ese sí es privado).

---

## 🛍️ Cómo conectar a Shopify

1. En tu admin de Shopify ir a **Apps → Headless** (o crear una **Custom App** con permisos de Storefront API).
2. Habilitar los scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
3. Copiar el **Storefront access token** y pegarlo en `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`.
4. El producto que mostramos se identifica por su **handle** (slug de la URL del producto). Está hardcoded en `lib/config.ts` → `BRAND.productHandle`. Para cambiar el producto, editá esa línea.

### Flujo de checkout

`BuyButton.tsx` llama a `createCheckout(variantId, quantity)`, que hace una mutation `cartCreate` y obtiene `checkoutUrl`. Esa URL es el checkout nativo de Shopify, donde MercadoPago ya está cableado como pasarela de pago.

```
Click "Comprar" → cartCreate mutation → window.location.href = checkoutUrl
```

---

## ✏️ Cómo editar contenido

**Casi todo el copy del landing vive en un solo archivo: [`lib/config.ts`](lib/config.ts).**

| Querés cambiar... | Editá... |
|---|---|
| Headlines, subheadlines | `HEADLINES` |
| Beneficios (los 6 cards) | `BENEFITS` |
| "Cómo funciona" (3 pasos) | `HOW_IT_WORKS` |
| Reviews | `REVIEWS` |
| FAQ | `FAQ` |
| Comparación antes/después | `PAIN_POINTS` |
| Bloque de "compra segura" | `TRUST_PILLARS` |
| Número de WhatsApp y mensaje | `WHATSAPP` |
| Cuántos clientes mostrar ("+3.500") | `BRAND.socialProofCount` |
| Horas del countdown | `URGENCY.countdownHours` |
| Días de devolución | `RETURNS.days` |
| Cuotas sin interés | `PAYMENTS.installments` |

**Para cambiar precios**: no toques el código. Cambialos en Shopify → la API los trae automáticamente cada 5 min (ISR).

**Para usar las fotos reales del producto** (vez de los placeholders SVG): abrí `components/Hero.tsx`, buscá el comentario `Para reemplazarlo con foto real` y seguí el snippet de ejemplo.

---

## 🚢 Deploy a Vercel

### Primer deploy

```bash
npm i -g vercel
vercel --prod
```

O por GitHub:
1. Push del repo a GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → seleccionar el repo.
3. En **Environment Variables**, copiar las 4 vars del `.env.local`.
4. Deploy.

### Conectar al dominio `oferta.carmaniaoficial.com`

1. **En Vercel**: Settings → Domains → Add `oferta.carmaniaoficial.com`. Vercel te da el target del CNAME (algo como `cname.vercel-dns.com`).
2. **En GoDaddy**: My Products → tu dominio → DNS → Add Record:
   ```
   Type:  CNAME
   Name:  oferta
   Value: cname.vercel-dns.com   (el que te dio Vercel)
   TTL:   1 hour
   ```
3. Esperás 5-15 minutos a que propague. Vercel emite el certificado SSL automáticamente.

### Variables en Vercel

Todas las que están en `.env.example` van pegadas tal cual en Vercel. Recordá que **las que empiezan con `NEXT_PUBLIC_` se exponen al cliente** — está OK para Storefront token y Pixel ID; nunca pongas tokens privados con ese prefijo.

---

## 📊 Tracking de Meta Pixel

Eventos que se disparan automáticamente:

| Evento | Cuándo | Dónde está el código |
|---|---|---|
| `PageView` | Al cargar la página | `components/MetaPixel.tsx` |
| `ViewContent` | Apenas el producto carga | `components/MetaPixel.tsx` (`PixelViewContent`) |
| `AddToCart` | Click en cualquier botón "Comprar" | `components/BuyButton.tsx` |
| `InitiateCheckout` | Justo antes de redirigir al checkout | `components/BuyButton.tsx` |

El evento `Purchase` lo dispara Shopify desde su lado del checkout — para conectarlo, configurá la **Conversion API** desde el admin de Shopify (Settings → Customer events → Meta).

---

## 🗂️ Estructura del proyecto

```
.
├── app/
│   ├── layout.tsx       # HTML root + carga del Pixel + fonts
│   ├── page.tsx         # Server component que fetchea Shopify y arma el landing
│   └── globals.css      # Tailwind base
├── components/          # Todo el UI (Navbar, Hero, Pricing, etc.)
├── lib/
│   ├── config.ts        # ⭐ Single source of truth del copy
│   ├── shopify.ts       # Cliente de Storefront API + formatARS()
│   └── tracking.ts      # Wrapper safe sobre fbq()
├── public/              # Acá va tu logo.png cuando lo subas
├── .env.example         # Plantilla de variables
├── vercel.json          # Headers de seguridad + región
└── README.md
```

---

## 🧪 Probar el checkout sin gastar plata

Shopify tiene **Bogus Gateway** para testear el flujo completo sin movimiento real de dinero:

1. Admin Shopify → Settings → Payments → Manage manual payments → activar **Bogus Gateway**.
2. Ir al landing en local → Click "Comprar" → completar checkout con el método "Bogus".
3. Tarjetas de prueba en la [docs de Shopify](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/test).

---

## ✅ Checklist antes de salir a Meta Ads

- [ ] Logo cargado en `/public/logo.png` y referenciado en `components/Navbar.tsx`
- [ ] Imágenes reales del producto (cambiar el placeholder en `Hero.tsx`)
- [ ] Pixel ID confirmado en Events Manager (test events andan)
- [ ] Variables de entorno cargadas en Vercel
- [ ] DNS apuntando a Vercel (`oferta.carmaniaoficial.com`)
- [ ] Probar checkout completo con Bogus Gateway
- [ ] Verificar que el Storefront token tiene los 4 scopes habilitados
- [ ] Test de mobile real (no solo DevTools — Lighthouse mobile 90+)

---

## 🤝 Soporte y mantenimiento

Para preguntas sobre el código → revisar comentarios inline (cada componente tiene un docblock arriba explicando qué hace).

Bugs comunes:
- **"Faltan variables de entorno de Shopify"** → revisar `.env.local`, los nombres son exactos (case-sensitive).
- **Producto no aparece** → confirmar handle en Shopify (admin → producto → URL slug).
- **Precios no se actualizan** → ISR cachea 5 min. Para forzar, redeployar o esperar.
