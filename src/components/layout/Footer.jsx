import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { navLinks } from '../../data/navLinks';
import { partnerOrganizations } from '../../data/partnerships';
import { BRAND } from '../../utils/constants';

function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="mb-3 font-serif text-2xl text-white">{BRAND.name}</h3>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-white/80">
              Premium retirement living — Independent Living, Assisted Living, and Specialized Memory Care in Tanauan City, Batangas.
            </p>
            <p className="text-sm text-white/70">{BRAND.address}</p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-2 inline-block text-sm text-gold hover:underline"
            >
              {BRAND.email}
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Partnership
            </h4>
            <p className="text-sm text-white/80">Operated by {BRAND.operator}</p>

            <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-white/50">
              In Partnership With
            </p>
            <ul className="space-y-2">
              {partnerOrganizations.map((org) => (
                <li key={org.id}>
                  <a
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-snug text-white/80 hover:text-white"
                  >
                    {org.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          {BRAND.copyright}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
