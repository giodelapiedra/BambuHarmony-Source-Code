import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';
import { galleryItems } from '../../data/gallery';

function LifestyleGallery() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Our Spaces"
          title="Spaces Designed Around the Way You Want to Live"
          description="Every space at Bambu Harmony Living is thoughtfully designed to encourage comfort, connection, and everyday living. Surrounded by nature and inspired by the warmth of home, our community offers places where residents can relax, stay active, and enjoy life's meaningful moments."
        />
        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <Reveal.Item
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/80 via-forest/10 to-transparent p-6">
                <p className="font-serif text-lg text-white drop-shadow-sm">{item.title}</p>
              </div>
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export default LifestyleGallery;
