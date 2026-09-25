import { Quote } from 'lucide-react';
import StarRating from '../common/StarRating';

const avatarColors = [
  'bg-bamboo',
  'bg-gold',
  'bg-[#4FA89B]',
  'bg-[#C97B5A]',
  'bg-[#5B8DB8]',
  'bg-[#9B7BC9]',
];

function getInitials(name) {
  const words = name.replace(/&/g, ' ').split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function colorFor(name) {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarColors[sum % avatarColors.length];
}

function TestimonialCard({ quote, author, rating = 5 }) {
  return (
    <article className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm sm:w-[350px]">
      <div className="mb-4 flex items-start justify-between">
        <StarRating value={rating} />
        <Quote size={30} className="fill-white/10 text-white/10" aria-hidden="true" />
      </div>

      <p className="mb-6 flex-1 text-sm italic leading-relaxed text-white/80">
        &ldquo;{quote}&rdquo;
      </p>

      <footer className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${colorFor(
            author,
          )}`}
        >
          {getInitials(author)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-white">{author}</span>
        </span>
      </footer>
    </article>
  );
}

export default TestimonialCard;
