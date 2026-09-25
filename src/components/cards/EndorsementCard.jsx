const avatarColors = [
  'bg-bamboo',
  'bg-gold',
  'bg-[#4FA89B]',
  'bg-[#C97B5A]',
  'bg-[#5B8DB8]',
  'bg-[#9B7BC9]',
];

function getInitials(name) {
  const words = name.replace(/[&“”"]/g, ' ').split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function colorFor(name) {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarColors[sum % avatarColors.length];
}

/**
 * Featured endorsement from an institutional partner or public official.
 * Larger and gold-accented so it reads ahead of the family review marquee.
 */
function EndorsementCard({ quote, author, roles = [], initials, link }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/25 bg-white/[0.07] p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.1]">
      {/* Oversized decorative quote glyph */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-4 select-none font-serif text-[7rem] leading-none text-gold/10 transition-colors duration-300 group-hover:text-gold/20"
      >
        &rdquo;
      </span>

      <blockquote className="relative mb-7 flex-1 text-[0.95rem] leading-relaxed text-white/85">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <footer className="relative border-t border-white/10 pt-5">
        <div className="flex items-center gap-3.5">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ring-2 ring-gold/30 ${colorFor(
              author,
            )}`}
          >
            {initials || getInitials(author)}
          </span>
          <span className="min-w-0">
            <cite className="block not-italic text-sm font-semibold uppercase tracking-[0.08em] text-gold">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold/80 hover:decoration-gold"
                >
                  {author}
                </a>
              ) : (
                author
              )}
            </cite>
            {roles.map((role) => (
              <span key={role} className="block text-xs italic leading-snug text-white/60">
                {role}
              </span>
            ))}
          </span>
        </div>
      </footer>
    </article>
  );
}

export default EndorsementCard;
