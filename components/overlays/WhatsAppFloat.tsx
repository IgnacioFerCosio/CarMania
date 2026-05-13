'use client';

/**
 * Botón flotante de WhatsApp en la esquina inferior derecha.
 * Aparece después de 1.5s para no competir con el hero.
 *
 * El número y el mensaje precargado salen de lib/config.ts.
 */
import { useEffect, useState } from 'react';
import { WHATSAPP } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  const url = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.prefilled)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className={`group fixed bottom-[88px] right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-all duration-500 hover:scale-110 hover:bg-[#20bd5a] sm:bottom-20 sm:right-4 sm:h-14 sm:w-14 md:bottom-6 md:right-6 md:h-16 md:w-16 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40"
      />
      <Icon name="whatsapp" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink-950 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 md:inline">
        ¿Dudas? Escribinos
      </span>
    </a>
  );
}
