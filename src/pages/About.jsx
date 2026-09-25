import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import StoryVision from '../components/sections/StoryVision';
import WhyChoose from '../components/sections/WhyChoose';
import CTASection from '../components/sections/CTASection';
import WaveDivider from '../components/common/WaveDivider';
import aboutHero from '../assets/images/hero/about.jpg';

const IVORY  = '#FAF7F0';
const FOREST = '#1F3D2B';
const CREAM  = '#F5EFE4';

function About() {
  return (
    <>
      <Section className="relative overflow-hidden bg-forest py-20 text-white md:py-28">
        {/* Photographic backdrop */}
        <img
          src={aboutHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Forest tint for legible white text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/85 to-forest/60"
        />
        <Container className="relative">
          <SectionHeader
            as="h1"
            eyebrow="About Us"
            title="A Premium Retirement Living Community"
            description="Bambu Harmony Living is a premium retirement living community thoughtfully created for older adults who wish to embrace life with comfort, purpose, and peace of mind — supported by personalized care and the warmth of Filipino hospitality."
            align="left"
            className="text-white [&_h1]:text-white [&_p]:text-white/85"
          />
        </Container>
      </Section>
      <WaveDivider from={FOREST} to={IVORY}  shape="gentle"     height={72} />
      <StoryVision />
      <WaveDivider from={IVORY}  to={CREAM}  shape="asymmetric" height={56} flip />
      <WhyChoose />
      <WaveDivider from={CREAM}  to={FOREST} shape="ripple"     height={72} />
      <CTASection />
    </>
  );
}

export default About;
