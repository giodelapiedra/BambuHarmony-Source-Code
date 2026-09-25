import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import LocationCard from '../cards/LocationCard';
import Reveal from '../common/Reveal';
import { locationBenefits } from '../../data/locationBenefits';
import facade from '../../assets/images/location/facade.jpg';

function EstateLocation() {
  return (
    <Section className="bg-cream/30">
      <Container>
        <SectionHeader
          eyebrow="Location"
          title="Perfectly Positioned for Peace of Mind"
          description="Nestled in the serene surroundings of Tanauan City, Batangas, Bambu Harmony Living offers the tranquility of nature while keeping residents and their families close to everything that matters."
        />
        <Reveal className="mb-12 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={facade}
            alt="The entrance signage of Bambu Harmony Living"
            loading="lazy"
            className="aspect-[16/7] w-full object-cover"
          />
        </Reveal>
        <Reveal stagger className="grid gap-8 md:grid-cols-3">
          {locationBenefits.map((benefit) => (
            <Reveal.Item key={benefit.id} className="h-full">
              <LocationCard {...benefit} />
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export default EstateLocation;
