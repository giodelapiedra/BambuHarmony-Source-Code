import { Star } from 'lucide-react';

/**
 * Renders a 5-star rating. `value` is 1–5 (integer).
 */
function StarRating({ value = 5, size = 16, className = '' }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rated ${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            size={size}
            className={filled ? 'fill-gold text-gold' : 'fill-cream text-cream'}
          />
        );
      })}
    </div>
  );
}

export default StarRating;
