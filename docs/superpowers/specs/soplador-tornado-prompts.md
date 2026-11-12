# Soplador Tornado PRO™ — prompts de IA

Para pegar en ChatGPT (imágenes), Gemini, Midjourney, Higgsfield, etc.
Plan y reglas en `soplador-tornado-assets.md`.

**Siempre adjuntá la maestra (T-01) como imagen de referencia.** Sin eso, la
IA inventa otro soplador en cada toma. En Midjourney: `--cref` / `--oref` con
la maestra; en ChatGPT/Gemini: subila junto con el prompt.

Los prompts van en inglés: casi todas las herramientas responden mejor.

## Bloque fijo (pegalo al final de cada prompt)

```
The blower must be EXACTLY the one in the reference image: a matte black cordless pistol-grip air blower, cylindrical head with the fan intake at the front, trigger grip, detachable battery pack under the handle with a red button. No logos, no text, no brand names anywhere. Photorealistic, natural lighting, shallow depth of field, shot on a smartphone, 4K.
```

## Tomas

**T-01 Maestra** (ya hecha en Canva, `MAHat5rzcmo`) — 1:1
```
Studio product render of the cordless blower, 3/4 side view, battery attached, on a dark charcoal background with a subtle red rim light. Centered, lots of breathing room.
```

**T-03 La parrilla** (hecha, `MAHat2Dk6yk`) — 1:1
```
First-person view: a hand holding the blower, pointing the nozzle straight at the charcoal of an Argentine parrilla (grill). The coals glow orange and sparks fly from the airflow. Pieces of meat on the grill in the background. Dusk.
```

**T-04 Secar el auto** (rehacer: el de Canva no apunta al capó) — 1:1
```
First-person view: a hand holding the blower, aiming the nozzle down at the hood of a dark car that was just washed. A fan of water droplets is being blasted off the paint, clearly flying away from the airflow. Daylight, no car brand visible.
```

**T-05 La vereda** — 1:1
```
First-person view: a hand holding the blower over a tiled sidewalk in front of a house, a strip of the sidewalk already clean and a wave of dry autumn leaves flying away from the nozzle.
```

**T-06 El taller** — 1:1
```
First-person view: a hand holding the blower over a home workshop workbench, blowing a cloud of sawdust and metal shavings off the bench. Tools hanging on the wall behind.
```

**T-07 La PC** — 1:1
```
A hand holding the blower close to an open desktop PC case on a desk, a puff of dust coming out of the fans and heatsink. Desk lamp light.
```

**T-08 El patio** — 1:1
```
First-person view: a hand holding the blower on a wooden pool deck, leaves flying off the edge of the deck away from the pool. Sunny day.
```

**T-09 Qué incluye** — 1:1
```
Top-down flat lay on a dark background: the blower, its detachable battery pack, a wall charger with a cylindrical plug and a small user manual with a blank cover, neatly arranged. Nothing else.
```

**T-10 Despiece** — 1:1 o 4:5. Los modelos fallan cuando se les pide "todo
flotando": mezclan ejes y dejan el cuerpo casi entero. Hay que pedir dos ejes
fijos y el orden exacto de las piezas:
```
Technical exploded-view product render of a cordless pistol-grip air blower, side view (profile, camera perpendicular to the blower), on a seamless dark charcoal background with soft studio light and a subtle red rim light.

The blower is split into its two clamshell housing halves, pulled apart left and right with a small gap, both perfectly aligned, showing the inside.

The head parts are exploded FORWARD along ONE straight horizontal axis, the axis of the airflow, evenly spaced, in this exact order from the back of the head to the front: electric motor, fan impeller (many curved blades), round fan shroud, front grille ring.

The handle parts are exploded DOWNWARD along ONE straight vertical axis, evenly spaced, in this exact order from top to bottom: trigger switch, small circuit board, battery terminal plate, detachable battery pack with red release button.

Every part is clearly separated, nothing overlapping, no wires crossing between parts, no extra or duplicated parts. Matte black plastic, no logos, no text, no labels. Photorealistic, sharp focus, 4K.
```
Si sigue saliendo mal, dos alternativas que la IA resuelve mejor:
- **Corte (cutaway):** el soplador entero con una ventana recortada en el
  cabezal que deja ver motor y turbina, y la batería apenas separada abajo.
- **Armado a mano:** generar cada pieza sola sobre fondo transparente y
  componer el despiece en Canva o Photoshop. Es más trabajo, pero queda exacto.

**T-11 / T-12 Antes y después** — 1:1, **mismo encuadre en las dos**
```
T-11: A tiled sidewalk in front of a house completely covered in dry leaves, eye level, no people.
T-12: Exactly the same sidewalk, same angle and light, now completely clean, the leaves pushed to the edge.
```
(Generá T-11, y para T-12 pedí "edit this image: remove the leaves from the sidewalk".)

**T-16 Potencia** — 1:1
```
Frozen-motion shot: the blower aimed at a plastic bucket of water on the ground, the water blasting out of the bucket in a big splash from the airflow.
```

**T-02 Video hero** (Higgsfield, Kling, Veo, Sora — de imagen a video) — 9:16 y 1:1, 5 s
```
Start from T-05. The hand presses the trigger and the leaves explode off the sidewalk in a wave, the camera follows the airflow. Handheld, realistic, no text.
```

**T-13 a T-15 Cómo funciona** (videos cortos, 3–4 s c/u)
```
T-13: A hand plugs the battery pack into the wall charger, the charger light turns on.
T-14: A hand slides the battery pack into the bottom of the handle until it clicks.
T-15: A hand presses the trigger and the blower blasts leaves off a patio.
```

**Packs** — 1:1, fondo oscuro como la maestra
```
Studio render of 1 (2 / 3) identical blowers side by side, each with its battery attached, dark charcoal background, red rim light.
```
