import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import { storyVision, alliances } from '../../data/about';
import { fadeUp, staggerContainer } from '../../utils/animations';
import lifecareOps from '../../assets/icons/lifecare-ops.png';
import srrv from '../../assets/icons/srrv.png';
import cosmetic from '../../assets/icons/cosmetic.png';

const valueIcons = {
  dignity: HeartHandshake,
  joy: Sparkles,
  security: ShieldCheck,
};

const allianceIcons = {
  'lifecare-rizal': lifecareOps,
  srrv: srrv,
  ferna: cosmetic,
};

const TABS = [
  { key: 'story', label: 'Our Story & Vision' },
  { key: 'alliances', label: 'Strategic Alliances' },
];

function StoryTab() {
  return (
    <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-lg leading-relaxed text-charcoal/80 lg:col-span-2"
      >
        {storyVision.intro}
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-3 lg:col-span-3"
      >
        {storyVision.values.map((value) => {
          const Icon = valueIcons[value.icon] ?? ShieldCheck;
          return (
            <motion.div
              key={value.id}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-cream bg-white p-6 shadow-sm"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-forest">
                <Icon size={22} />
              </span>
              <h3 className="mb-2 font-serif text-xl text-forest">{value.title}</h3>
              <p className="text-sm leading-relaxed text-charcoal/75">{value.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function AlliancesTab() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-3"
    >
      {alliances.map((item) => {
        const icon = allianceIcons[item.id];
        return (
          <motion.article
            key={item.id}
            variants={fadeUp}
            className="group flex h-full flex-col rounded-2xl border border-cream bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cream/60 ring-1 ring-gold/20">
              <img src={icon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
            </span>
            <p className="eyebrow mb-2">{item.label}</p>
            <h3 className="mb-3 font-serif text-2xl text-forest">{item.title}</h3>
            <p className="text-sm leading-relaxed text-charcoal/75">{item.description}</p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

function StoryVision() {
  const [active, setActive] = useState('story');

  return (
    <Section>
      <Container>
        {/* Tabs */}
        <div className="mb-12 flex justify-center">
          <div
            role="tablist"
            aria-label="About Bambu Harmony"
            className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-cream bg-white p-1.5 shadow-sm"
          >
            {TABS.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.key)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 sm:px-7 ${
                    isActive ? 'text-white' : 'text-charcoal/70 hover:text-forest'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="about-tab-pill"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="tabpanel"
          >
            {active === 'story' ? <StoryTab /> : <AlliancesTab />}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}

export default StoryVision;
