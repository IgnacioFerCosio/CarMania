'use client';

/**
 * FAQ — accordion accesible.
 * Solo una pregunta abierta a la vez (UX más limpia y mobile-first).
 */
import { useState } from 'react';
import { FAQ as ITEMS } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-accent sm:text-xs">
            Dudas frecuentes
          </span>
          <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white sm:mt-3 sm:text-3xl md:text-5xl">
            Respondemos lo que más nos preguntan
          </h2>
        </div>

        <ul className="mt-8 divide-y divide-ink-800 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/50 sm:mt-12">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-ink-900 sm:gap-4 sm:px-5 sm:py-5 md:px-7"
                >
                  <span className="font-display text-[15px] font-semibold leading-snug text-white sm:text-base md:text-lg">
                    {item.q}
                  </span>
                  <Icon
                    name="chevron-down"
                    className={`h-5 w-5 shrink-0 text-accent transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0">
                    <p className="px-4 pb-5 text-[13px] leading-relaxed text-ink-300 sm:px-5 sm:pb-6 sm:text-sm md:px-7 md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
