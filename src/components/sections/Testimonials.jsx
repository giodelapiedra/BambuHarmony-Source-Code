import Container from '../common/Container';
import EndorsementCard from '../cards/EndorsementCard';
import Reveal from '../common/Reveal';
import { endorsements } from '../../data/testimonials';

function Testimonials() {
  return (
    <section className="overflow-hidden bg-forest py-20 text-white md:py-28">
      <Container>
        <div className="mb-14 text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="inline-block h-px w-10 bg-gold" />
            Trusted by Partners and Leaders
          </p>
          <h2 className="text-display font-serif text-3xl text-white md:text-4xl lg:text-[2.75rem]">
            Stories of Trust and{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 text-gold">Peace of Mind</span>
              {/* Hand-drawn highlight stroke (not a straight line) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2.5 left-0 z-0 h-3 w-full overflow-visible"
              >
                <defs>
                  <linearGradient id="phm-underline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C8A96A" />
                    <stop offset="50%" stopColor="#6F8F5F" />
                    <stop offset="100%" stopColor="#C8A96A" />
                  </linearGradient>
                </defs>
                <path
                  d="M4,10 C55,3 105,15 155,8 C205,2 250,14 296,6"
                  fill="none"
                  stroke="url(#phm-underline)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/70">
            Healthcare institutions, local government, and industry leaders on why they stand
            behind Bambu Harmony Living.
          </p>
        </div>

        {/* Featured endorsements — the headline proof points */}
        <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {endorsements.map((item) => (
            <Reveal.Item key={item.id} className="h-full">
              <EndorsementCard {...item} />
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export default Testimonials;
