import Hero from '../components/sections/Hero';
import BrandPromise from '../components/sections/BrandPromise';
import CareOptions from '../components/sections/CareOptions';
import Partnerships from '../components/sections/Partnerships';
import EstateLocation from '../components/sections/EstateLocation';
import LifestyleGallery from '../components/sections/LifestyleGallery';
import WhyChoose from '../components/sections/WhyChoose';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTASection from '../components/sections/CTASection';
import WaveDivider from '../components/common/WaveDivider';

const IVORY  = '#FAF7F0';
const FOREST = '#1F3D2B';
const CREAM  = '#F5EFE4'; // bg-cream/30 composited on ivory

function Home() {
  return (
    <>
      <Hero />
      <WaveDivider from={FOREST} to={IVORY}  shape="gentle"     height={72} />
      <BrandPromise />
      <WaveDivider from={IVORY}  to={CREAM}  shape="asymmetric" height={56} flip />
      <CareOptions />
      <WaveDivider from={CREAM}  to={IVORY}  shape="ripple"     height={56} />
      <Partnerships />
      <WaveDivider from={IVORY}  to={CREAM}  shape="gentle"     height={56} flip />
      <EstateLocation />
      <WaveDivider from={CREAM}  to={IVORY}  shape="asymmetric" height={56} />
      <LifestyleGallery />
      <WaveDivider from={IVORY}  to={CREAM}  shape="ripple"     height={56} flip />
      <WhyChoose />
      <WaveDivider from={CREAM}  to={FOREST} shape="gentle"     height={72} />
      <Testimonials />
      <WaveDivider from={FOREST} to={CREAM}  shape="asymmetric" height={72} flip />
      <FAQ />
      <WaveDivider from={CREAM}  to={FOREST} shape="ripple"     height={72} />
      <CTASection />
    </>
  );
}

export default Home;
