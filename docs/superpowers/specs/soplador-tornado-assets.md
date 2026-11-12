# Soplador Tornado PRO™ — plan de material (todo IA)

Producto: soplador inalámbrico de alta potencia, formato pistola, con batería
intercambiable (botón rojo), cargador y manual. Lo vende LAMBO TECH (código
`D-040101/N19`). **No tenemos el producto en mano**: todo el material sale de
IA, con la foto del proveedor como referencia de forma.

Precios: x1 $119.990 · x2 $179.990 (2ª al 50%) · x3 $239.990 (3x2).
Specs exactas: **pendientes**. Ningún número (km/h, RPM, PA, mAh, autonomía)
entra al copy ni a una imagen hasta tenerlo del proveedor. Los videos de
referencia prometen "250 km/h" y "150.000 RPM", y la caja "35.000 PA": son de
otros modelos y no los copiamos.

## Regla de producto

- **Negro mate, sin logos** (ni Lambo Tech, ni Violent Fan, ni marcas de las
  referencias). El rojo del botón de la batería se queda: es el rojo de
  CARMANIA (`#D70707`).
- Siempre el mismo producto. Primero se hace **una imagen maestra** (el hero)
  y todas las demás se generan con esa como referencia, para que no cambie la
  forma de una toma a otra (el error más común con IA).
- No hacemos fotos de "clientes" con IA para las reseñas: eso sería presentar
  algo fabricado como real. Las reseñas esperan material real (`showsDrafts()`).

## Qué aprendimos de las referencias

`Desktop/Ecommerce/CarMania/Soplador/` (13 ads de Meta, ~25 s c/u, 9:16) y
seese.pro. Patrones que se repiten:

| Patrón | Por qué funciona | Lo usamos en |
|---|---|---|
| **POV con la explosión de hojas** en los primeros 2 s | El hook visual más usado; se entiende sin sonido | Hero (video), ads |
| **Prender el fuego de la parrilla** | Es el ángulo más argentino de todos: el asado | Casos de uso, ads |
| **Secar el auto después de lavarlo** | Une el producto con autos (nuestra marca) | Casos de uso, antes/después |
| **Vaciar un balde de agua de un soplido** | Demo de potencia sin decir un número | Beneficios, ads |
| **Escoba vs. soplador** (split) | El "antes" que todos conocen | Antes/después |
| **El cable enredado** (el soplador con cable) | Vende el "inalámbrico" | Pitch / ads |
| **Cambiar la batería en un clic** | Responde "¿cuánto dura?" sin dar números | Cómo funciona |
| **Unboxing en el maletín** | Muestra qué trae | Qué incluye |

seese.pro (marca escalada, mismo tipo de producto) arma la página así: hero
con GIF demo → beneficios en 3–4 cards → specs en números grandes → 4 casos de
uso con video → reseñas → FAQ. Ángulos: liviano, sin nafta ni cable, una mano,
todo el año. Ofrece un pack con **batería extra**: vale la pena preguntarle al
proveedor si vende baterías sueltas.

## Lista de tomas

Estructura igual a `/soplador` (Hero, UseCases, WhatsInBox, BeforeAfter,
HowItWorks, Pricing, BenefitsShowcase). Carpeta propuesta: `public/tornado/`.

### 1. Maestra — hacer primero
| ID | Qué | Formato |
|---|---|---|
| T-01 | Render de estudio: soplador negro con la batería puesta, 3/4 de perfil, fondo oscuro, luz de borde roja | 1:1, 1600 px |

### 2. Hero
| ID | Qué | Formato |
|---|---|---|
| T-02 | Video POV: la mano aprieta el gatillo y una vereda llena de hojas se limpia de golpe | 9:16 y 1:1, 5–6 s, loop |

### 3. Casos de uso (6, cuadradas)
| ID | Uso | Escena |
|---|---|---|
| T-03 | La parrilla | Carbón que prende con el chorro, brasas volando, asado al fondo |
| T-04 | Secar el auto | Agua que sale del capó y del parabrisas de un auto oscuro recién lavado |
| T-05 | La vereda | Hojas secas volando de una vereda de baldosas |
| T-06 | El garage / taller | Polvo y viruta del piso o de la mesa de trabajo |
| T-07 | El interior del auto | Tapizados y alfombras (la boquilla fina) |
| T-08 | El patio / pileta | Hojas fuera del borde de la pileta o del deck |

### 4. Qué incluye
| ID | Qué |
|---|---|
| T-09 | Flat lay: soplador, batería, cargador, boquillas y manual sobre fondo oscuro (confirmar el contenido con el proveedor) |
| T-10 | Despiece flotando, como el del turbo (`feat/soplador-turbo`) — motor, turbina, batería |

### 5. Antes / después (mismo encuadre)
| ID | Qué |
|---|---|
| T-11 / T-12 | Vereda o patio lleno de hojas → la misma, limpia |

### 6. Cómo funciona (3 videos, H.264, sin audio)
| ID | Paso |
|---|---|
| T-13 | Calzar la batería (clic) |
| T-14 | Elegir la boquilla |
| T-15 | Apretar el gatillo y soplar |

### 7. Beneficios
| ID | Qué |
|---|---|
| T-16 | Demo de potencia: un balde de agua vaciado por el chorro (imagen congelada del momento) |

### 8. Packs
`TornadoX1.webp`, `TornadoX2.webp`, `TornadoX3.webp` — 1, 2 y 3 unidades.

## Pendiente del proveedor

- Specs: velocidad del aire, potencia, batería (V / mAh), autonomía, tiempo de
  carga, peso, velocidades.
- Qué trae la caja exactamente (¿maletín? ¿cuántas boquillas?).
- ¿Vende baterías sueltas? (para un pack "con batería extra").
