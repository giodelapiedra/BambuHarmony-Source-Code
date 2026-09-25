import { ExternalLink } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import PartnershipCard from '../cards/PartnershipCard';
import Reveal from '../common/Reveal';
import { partnerships, partnerOrganizations } from '../../data/partnerships';

function Partnerships() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Thoughtful Partnerships"
          title="Thoughtful Partnerships. Meaningful Services."
        />
        <Reveal stagger className="grid gap-8 md:grid-cols-3">
          {partnerships.map((item) => (
            <Reveal.Item key={item.id} className="h-full">
              <PartnershipCard {...item} />
            </Reveal.Item>
          ))}
        </Reveal>

        <Reveal className="mt-14">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3 text-center">
            <span className="gold-rule" />
            In Partnership With
            <span className="gold-rule" />
          </p>
          <ul className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-5">
            {partnerOrganizations.map((org) => (
              <li key={org.id} className="w-[8.5rem] sm:w-40">
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={org.name}
                  className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-cream bg-white px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                >
                  {org.logo ? (
                    <>
                      <img
                        src={org.logo}
                        alt={`${org.name} logo`}
                        loading="lazy"
                        className="h-14 w-auto max-w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:h-16"
                      />
                      <span className="text-[0.7rem] font-medium leading-snug text-forest/80 transition-colors duration-300 group-hover:text-bamboo">
                        {org.name}
                      </span>
                    </>
                  ) : (
                    <span className="font-serif text-base leading-tight text-forest transition-colors duration-300 group-hover:text-bamboo">
                      {org.name}
                    </span>
                  )}
                  <ExternalLink
                    size={13}
                    className="shrink-0 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

export default Partnerships;
