import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';
import { whyChoose, whyChooseTrustStatement } from '../../data/whyChoose';
import { Check } from 'lucide-react';

function WhyChoose() {
  return (
    <Section className="bg-cream/30">
      <Container>
        <SectionHeader
          title="Why Choose Bambu Harmony Living"
          description={whyChooseTrustStatement}
        />
        <Reveal stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((benefit) => (
            <Reveal.Item
              as="li"
              key={benefit}
              className="flex h-full items-start gap-3 rounded-2xl bg-white p-5 shadow-sm"
            >
              <Check className="mt-0.5 shrink-0 text-bamboo" size={18} />
              <span className="text-sm text-charcoal/80">{benefit}</span>
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export default WhyChoose;
