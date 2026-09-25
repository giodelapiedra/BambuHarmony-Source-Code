import { Trees, Stethoscope, Building, ShieldCheck } from 'lucide-react';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import EstateLocation from '../components/sections/EstateLocation';
import CTASection from '../components/sections/CTASection';
import WaveDivider from '../components/common/WaveDivider';

const IVORY  = '#FAF7F0';
const FOREST = '#1F3D2B';
const CREAM  = '#F5EFE4';

const estateFeatures = [
  {
    icon: Building,
    title: 'Modern Organic Design',
    description: 'Natural surroundings and thoughtfully crafted spaces that encourage comfort, relaxation, and meaningful everyday living.',
  },
  {
    icon: Trees,
    title: 'Beautiful Outdoor Spaces',
    description: 'Landscaped gardens and bamboo pathways that invite peaceful walks, fresh air, and quiet moments in nature.',
  },
  {
    icon: ShieldCheck,
    title: 'Comfortable Private Suites',
    description: 'Elegant residences designed to provide privacy, comfort, and a true sense of home for every stage of retirement.',
  },
  {
    icon: Stethoscope,
    title: 'Lifestyle Amenities',
    description: 'Welcoming shared spaces where wellness, recreation, and meaningful connections come together.',
  },
];

function LocationPage() {
  return (
    <>
      <Section className="bg-forest py-20 text-white md:py-28">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="The Estate"
            title="Where Every Space Feels Like Home"
            description="Located at Daang Janopol, Santor, Tanauan City, Batangas, Bambu Harmony Living is thoughtfully designed to bring together modern organic architecture, beautifully landscaped grounds, and inviting shared spaces that encourage comfort, connection, and everyday living. Surrounded by nature yet conveniently connected, our community offers a peaceful setting where residents can embrace retirement with comfort, dignity, and peace of mind."
            align="left"
            className="text-white [&_h1]:text-white [&_p]:text-white/85"
          />
        </Container>
      </Section>
      <WaveDivider from={FOREST} to={IVORY}  shape="ripple"     height={72} />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Designed Around Well-Being"
            title="Every Space Designed to Feel Like Home"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {estateFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="h-full rounded-2xl border border-cream bg-white p-6 shadow-sm"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-forest">
                    <Icon size={22} />
                  </span>
                  <h3 className="mb-2 font-serif text-lg text-forest">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/75">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      <WaveDivider from={IVORY}  to={CREAM}  shape="gentle"     height={56} flip />
      <EstateLocation />
      <WaveDivider from={CREAM}  to={FOREST} shape="asymmetric" height={72} />
      <CTASection />
    </>
  );
}

export default LocationPage;
