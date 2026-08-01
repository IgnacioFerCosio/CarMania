'use client';

/**
 * Carrusel de imágenes de producto.
 *
 * Contenedor 1:1 fijo + `object-contain`: reserva el espacio antes de que
 * carguen las imágenes (cero CLS) y nunca recorta el texto de las infografías.
 *
 * Navegación: flechas, puntos y ARRASTRE. El arrastre va con pointer events y
 * no con touch events, así el mismo código sirve para dedo, mouse y lápiz —
 * los emuladores de mobile en desktop mandan eventos de mouse, y con
 * `ontouchstart` el arrastre no andaba ahí.
 */
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Icon } from './Icon';

type Slide = { readonly src: string; readonly alt: string };

/** Cuánto hay que arrastrar (respecto del ancho) para que cambie de slide. */
const COMMIT_RATIO = 0.18;
/** Movimiento antes de decidir si el gesto es horizontal o vertical. */
const AXIS_LOCK_PX = 8;
/** Cuánto se frena el arrastre cuando ya no hay slide hacia ese lado. */
const EDGE_RESISTANCE = 3;

export function ProductCarousel({ slides }: { slides: readonly Slide[] }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startRef = useRef<{ x: number; y: number } | null>(null);
  const axisRef = useRef<'none' | 'x' | 'y'>('none');
  const widthRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const total = slides.length;

  /** Las flechas y los puntos sí dan la vuelta. */
  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  function onPointerDown(e: React.PointerEvent) {
    // Sólo botón principal del mouse; el touch no reporta botones.
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    axisRef.current = 'none';
    widthRef.current = viewportRef.current?.offsetWidth ?? 0;
  }

  function onPointerMove(e: React.PointerEvent) {
    const start = startRef.current;
    if (!start) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    // Hasta no saber la intención no tocamos nada: si el gesto es vertical,
    // el usuario está scrolleando la página y no hay que robarle el scroll.
    if (axisRef.current === 'none') {
      if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) return;
      axisRef.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axisRef.current === 'x') {
        setDragging(true);
        // Seguimos recibiendo move/up aunque el cursor se vaya del elemento.
        // Puede tirar si el pointer ya se liberó — no es motivo para cortar
        // el arrastre.
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* noop */
        }
      }
    }
    if (axisRef.current !== 'x') return;

    // En los extremos el arrastre se frena en vez de mostrar vacío.
    const atStart = index === 0 && dx > 0;
    const atEnd = index === total - 1 && dx < 0;
    setDrag(atStart || atEnd ? dx / EDGE_RESISTANCE : dx);
  }

  function endDrag() {
    if (axisRef.current === 'x') {
      const ratio = drag / (widthRef.current || 1);
      if (ratio < -COMMIT_RATIO) setIndex((i) => Math.min(i + 1, total - 1));
      else if (ratio > COMMIT_RATIO) setIndex((i) => Math.max(i - 1, 0));
    }
    startRef.current = null;
    axisRef.current = 'none';
    setDrag(0);
    setDragging(false);
  }

  if (total === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Imágenes del producto"
      className="relative mx-auto w-full max-w-lg"
    >
      {/* Ventana 1:1 — el alto queda reservado desde el primer render.
          `touch-action: pan-y` deja pasar el scroll vertical de la página y
          nos reserva el horizontal a nosotros. */}
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative aspect-square w-full touch-pan-y select-none overflow-hidden rounded-3xl bg-ink-950 ring-1 ring-inset ring-ink-800 ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
            // Mientras se arrastra no hay transición: la imagen tiene que
            // seguir al dedo 1:1. Al soltar vuelve para animar el encastre.
            transition: dragging ? 'none' : 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              className="relative h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 512px, 100vw"
                className="pointer-events-none object-contain"
                draggable={false}
                // La primera es la que se ve al llegar a la sección; el resto
                // puede esperar a que el usuario navegue.
                loading={i === 0 ? undefined : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          {/* Flechas */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-950/80 text-white backdrop-blur transition hover:border-accent hover:bg-ink-900 sm:left-3 sm:h-10 sm:w-10"
          >
            <Icon name="arrow-right" className="h-4 w-4 rotate-180 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-950/80 text-white backdrop-blur transition hover:border-accent hover:bg-ink-900 sm:right-3 sm:h-10 sm:w-10"
          >
            <Icon name="arrow-right" className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Puntos */}
          <div className="mt-4 flex items-center justify-center gap-1">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ver imagen ${i + 1} de ${total}`}
                aria-current={i === index}
                className="group flex items-center px-1.5 py-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-5 bg-accent'
                      : 'w-1.5 bg-ink-600 group-hover:bg-ink-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
