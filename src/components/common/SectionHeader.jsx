import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  as: Heading = 'h2', // page heroes pass "h1" so every route has exactly one
}) {
  const isCenter = align === 'center';
  const alignClass = isCenter ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`mb-14 flex max-w-3xl flex-col ${alignClass} ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow mb-4 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
          <span className="gold-rule" />
          {eyebrow}
        </p>
      )}
      {title && (
        <Heading className="text-display mb-5 font-serif text-3xl text-forest md:text-4xl lg:text-[2.75rem]">
          {title}
        </Heading>
      )}
      {description && (
        <p className="text-base leading-relaxed text-charcoal/75 md:text-lg">{description}</p>
      )}
    </motion.div>
  );
}

export default SectionHeader;
