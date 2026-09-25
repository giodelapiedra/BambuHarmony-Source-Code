import { motion } from 'framer-motion';
import Container from '../common/Container';
import Button from '../common/Button';
import { fadeUp } from '../../utils/animations';
import ctaImage from '../../assets/images/gallery/gardens.jpg';

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-white md:py-32">
      <img
        src={ctaImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-forest/85" />

      <Container className="relative">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="eyebrow mb-5 flex items-center justify-center gap-3 text-gold">
            <span className="inline-block h-px w-10 bg-gold" />
            Take the First Step
          </p>
          <h2 className="text-display mb-5 font-serif text-3xl text-white md:text-4xl lg:text-5xl">
            Come Experience Bambu Harmony Living
          </h2>
          <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-white/85">
            The best way to discover what makes our community special is to experience it
            firsthand. Visit us, explore our thoughtfully designed spaces, and see how every
            day is lived with comfort, connection, and peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="gold">
              Book a Facility Visit
            </Button>
            <Button to="/contact" variant="outlineLight">
              Talk to a Care Advisor
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default CTASection;
