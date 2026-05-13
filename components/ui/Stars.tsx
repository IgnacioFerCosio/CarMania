/**
 * Render compacto de estrellas (1–5). Soporta medias estrellas para
 * promedios tipo 4.9.
 */
import { Icon } from './Icon';

type Props = {
  rating: number;
  size?: number;
  className?: string;
};

export function Stars({ rating, size = 16, className = '' }: Props) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const stars: ('full' | 'half' | 'empty')[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('full');
    else if (i === full && hasHalf) stars.push('half');
    else stars.push('empty');
  }

  return (
    <div
      className={`flex items-center gap-0.5 text-accent ${className}`}
      aria-label={`${rating} de 5 estrellas`}
      role="img"
    >
      {stars.map((s, i) => (
        <Icon
          key={i}
          name={s === 'half' ? 'star-half' : 'star'}
          className={s === 'empty' ? 'opacity-25' : ''}
          width={size}
          height={size}
        />
      ))}
    </div>
  );
}
