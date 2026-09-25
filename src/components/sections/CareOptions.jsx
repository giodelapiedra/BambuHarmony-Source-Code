import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import CareTierCard from '../cards/CareTierCard';
import Reveal from '../common/Reveal';
import { careOptions } from '../../data/careOptions';

function CareOptions() {
  return (
    <Section className="bg-cream/30">
      <Container>
        <SectionHeader
          eyebrow="Care That Fits You or Your Loved One"
          title="Every Resident Gets the Right Amount of Love and Support"
        />
        <Reveal stagger className="grid gap-8 lg:grid-cols-3">
          {careOptions.map((option) => (
            <Reveal.Item key={option.id} className="h-full">
              <CareTierCard {...option} />
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export default CareOptions;
