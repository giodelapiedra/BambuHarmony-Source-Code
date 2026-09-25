import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import CareOptions from '../components/sections/CareOptions';
import CTASection from '../components/sections/CTASection';
import WaveDivider from '../components/common/WaveDivider';

const FOREST = '#1F3D2B';
const CREAM  = '#F5EFE4';

function CareOptionsPage() {
  return (
    <>
      <Section className="bg-forest py-20 text-white md:py-28">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Care Options"
            title="Every Resident Gets the Right Amount of Love and Support"
            description="Explore our Independent Living, Assisted Living, and Specialized Memory Care residences — each thoughtfully designed around comfort, dignity, and personalized support."
            align="left"
            className="text-white [&_h1]:text-white [&_p]:text-white/85"
          />
        </Container>
      </Section>
      <WaveDivider from={FOREST} to={CREAM}  shape="gentle"     height={72} />
      <CareOptions />
      <WaveDivider from={CREAM}  to={FOREST} shape="asymmetric" height={72} flip />
      <CTASection />
    </>
  );
}

export default CareOptionsPage;
