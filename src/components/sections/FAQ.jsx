import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import { faqs } from '../../data/faqs';
import { useToggle } from '../../hooks/useToggle';
import { ChevronDown } from 'lucide-react';

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-cream">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-serif text-lg text-forest">{question}</span>
        <ChevronDown
          className={`shrink-0 text-bamboo transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      {isOpen && (
        <p className="pb-5 text-sm leading-relaxed text-charcoal/80">{answer}</p>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <Section className="bg-cream/30">
      <Container>
        <SectionHeader title="Frequently Asked Questions" />
        <div className="mx-auto max-w-3xl rounded-2xl bg-white px-6 shadow-sm md:px-8">
          {faqs.map((faq) => (
            <FAQAccordionItem key={faq.id} {...faq} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FAQAccordionItem({ question, answer }) {
  const { value: isOpen, toggle } = useToggle(false);
  return <FAQItem question={question} answer={answer} isOpen={isOpen} onToggle={toggle} />;
}

export default FAQ;
