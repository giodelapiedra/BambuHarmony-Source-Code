import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import { navLinks } from '../../data/navLinks';
import { useScrollHeader } from '../../hooks/useScrollHeader';
import { BRAND } from '../../utils/constants';
import logo from '../../assets/icons/logo-trim-optimized.png';

function Navbar() {
  const isScrolled = useScrollHeader();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-ivory'
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link to="/" aria-label={`${BRAND.name} — home`} className="shrink-0">
          <img
            src={logo}
            alt={`${BRAND.name} logo`}
            width={640}
            height={216}
            className="h-14 w-auto drop-shadow-[0_1px_2px_rgba(60,50,20,0.35)] md:h-16 lg:h-[4.5rem]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `group relative text-sm transition-colors hover:text-forest ${
                  isActive ? 'text-forest font-medium' : 'text-charcoal/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <Button to="/contact" variant="primary">
            Schedule a Tour
          </Button>
        </nav>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {isOpen && (
        <nav className="border-t border-cream bg-white px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-charcoal/80 hover:text-forest"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Button to="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                Schedule a Tour
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
