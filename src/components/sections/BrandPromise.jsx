import { motion } from 'framer-motion';
import Container from '../common/Container';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { fadeUp } from '../../utils/animations';
import { MapPin, Calendar, HeartHandshake } from 'lucide-react';
import promiseImage from '../../assets/images/gallery/welcome-home.jpg';

const miniCards = [
  { title: 'Opened August 7, 2026', icon: Calendar },
  { title: 'Located in Daang Janopol, Santor, Tanauan City, Batangas', icon: MapPin },
  { title: 'Operated by LifeCare Rizal', icon: HeartHandshake },
];

function BrandPromise() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Editorial image with layered gold frame */}
          <Reveal className="relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-2xl border border-gold/40 md:block" />
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={promiseImage}
                alt="The welcome arch at the entrance of Bambu Harmony Living"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span className="gold-rule" />
                Welcome Home to Your Next Chapter
              </p>
              <h2 className="text-display mb-6 font-serif text-3xl text-forest md:text-4xl">
                A Community Built Around Comfort, Dignity, and Home
              </h2>
              <p className="mb-5 leading-relaxed text-charcoal/75">
                Whether you're planning your own retirement or exploring the best future for
                someone you love, Bambu Harmony Living offers a place where every resident can
                continue living with independence, meaningful experiences, and personalized support.
              </p>
              <p className="mb-8 leading-relaxed text-charcoal/75">
                In partnership with LifeCare Rizal, we bring together trusted healthcare expertise
                and the warmth of Filipino hospitality to create a retirement community that feels
                less like a facility — and more like home.
              </p>
            </Reveal>

            <Reveal stagger className="space-y-3">
              {miniCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    className="flex items-center gap-4 rounded-xl border border-cream bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-forest">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm font-medium text-charcoal">{card.title}</span>
                  </motion.div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default BrandPromise;
