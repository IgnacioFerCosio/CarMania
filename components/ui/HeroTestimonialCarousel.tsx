'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { REVIEWS } from '@/lib/config';
import { Stars } from '@/components/ui/Stars';

const heroReviews = REVIEWS.slice(0, 3);

export function HeroTestimonialCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % heroReviews.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-8 border-t border-ink-800 pt-6">
      {/* Stacked reviews — all rendered, only active is visible */}
      <div className="grid [grid-template-areas:'stack']">
        {heroReviews.map((r, i) => (
          <div
            key={r.name}
            style={{ gridArea: 'stack' }}
            className={`flex max-w-md items-start gap-3 transition-opacity duration-700 ${
              i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-ink-800 ring-1 ring-inset ring-ink-700">
              <Image
                src={r.image}
                alt={r.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1 text-sm">
              <Stars rating={r.stars} size={14} />
              <p className="mt-1.5 italic leading-relaxed text-ink-200">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="mt-2 text-xs font-bold text-white">
                {r.name}{' '}
                <span className="font-normal text-ink-400">/ {r.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation — el <button> es el área táctil; el <span> es el dot visible */}
      <div className="mt-2 flex items-center">
        {heroReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ver reseña ${i + 1}`}
            className="group flex items-center px-1.5 py-2"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-4 bg-accent' : 'w-1.5 bg-ink-600 group-hover:bg-ink-400'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
