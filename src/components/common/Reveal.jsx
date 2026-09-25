import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';

/**
 * Fade-up-on-scroll wrapper. Subtle, plays once.
 * Use `stagger` to animate direct children in sequence (pair with <Reveal.Item>).
 */
function Reveal({ children, className = '', stagger = false, as: Component = 'div', ...props }) {
  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      className={className}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

function RevealItem({ children, className = '', as: Component = 'div', ...props }) {
  const MotionComponent = motion[Component] || motion.div;
  return (
    <MotionComponent className={className} variants={fadeUp} {...props}>
      {children}
    </MotionComponent>
  );
}

Reveal.Item = RevealItem;

export default Reveal;
