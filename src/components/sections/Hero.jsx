import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { fadeUp, staggerContainer } from '../../utils/animations';
import heroImage from '../../assets/images/hero/banner.jpg';

const heroBadges = [
  'Tanauan City, Batangas',
  'Independent Living',
  'Assisted Living',
  'Specialized Memory Care',
  'Operated by LifeCare Rizal',
];

function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-forest text-white">
      {/* Cinematic photographic backdrop with slow Ken Burns drift */}
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      />
      {/* Tint + gradient for legible white text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest/60 to-transparent"
      />

      <Container className="relative py-28 md:py-36">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
          >
            <span className="inline-block h-px w-10 bg-gold" />
            Premium Retirement Living in Tanauan City, Batangas
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-display mb-6 font-serif text-5xl text-white md:text-6xl lg:text-7xl"
          >
            Welcome Home to Your Next Chapter
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mb-9 max-w-2xl text-lg leading-relaxed text-white/85"
          >
            A premium retirement living community in Tanauan City, Batangas where older
            adults can embrace life with comfort, dignity, and purpose — and where families
            gain the peace of mind of knowing the people they love are truly at home.
          </motion.p>
          <motion.div variants={fadeUp} className="mb-12 flex flex-wrap gap-4">
            <Button to="/contact" variant="gold">
              Book a Facility Visit
            </Button>
            <Button to="/care-options" variant="outlineLight">
              Explore Care Options
            </Button>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
            {heroBadges.map((badge) => (
              <Badge
                key={badge}
                className="border border-white/20 bg-white/10 text-white backdrop-blur-sm"
              >
                {badge}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ChevronDown size={26} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}

export default Hero;
