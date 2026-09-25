import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Sparkles, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import inviteImage from '../../assets/images/gallery/house.jpg';

/**
 * Scroll-triggered invitation to the inquiry form.
 *
 * Appears when the visitor scrolls past ~55% of the page — the point where
 * they've shown genuine interest. Shows up to twice per page load: it re-arms
 * once after the visitor closes it, giving a second chance to convert. It also
 * re-arms on every reload, so a returning/refreshing visitor sees it again.
 *
 * This used to collect name + phone itself. It no longer does: a second, thinner
 * entry point split lead quality, and /contact now runs the Initial Care &
 * Service Assessment that produces an estimated care level and monthly cost. One
 * funnel means every lead reaches the care team already scored. Hidden on
 * /contact, where the form already lives.
 */

const SCROLL_TRIGGER = 0.55;
const MAX_SHOWS = 2;
const REARM_DELAY = 700;
/** Kept at the original key so visitors who already converted are never nagged. */
const DISMISS_KEY = 'bh_lead_submitted';

function LeadCapturePopup() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ctaRef = useRef(null);

  const showsRef = useRef(0);
  useEffect(() => {
    // Never show again once the visitor has already been sent to the form
    if (localStorage.getItem(DISMISS_KEY)) return;
    if (pathname === '/contact' || open || showsRef.current >= MAX_SHOWS) return;

    let cleanup = () => {};
    const arm = () => {
      const onScroll = () => {
        const scrolled = window.scrollY + window.innerHeight;
        const trigger = document.documentElement.scrollHeight * SCROLL_TRIGGER;
        if (scrolled >= trigger) {
          showsRef.current += 1;
          setOpen(true);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanup = () => window.removeEventListener('scroll', onScroll);
    };

    // First show arms immediately; re-shows wait briefly so closing the popup
    // doesn't instantly reopen it from residual/momentum scrolling.
    const t = setTimeout(arm, showsRef.current === 0 ? 0 : REARM_DELAY);
    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, [pathname, open]);

  // Lock body scroll + Escape-to-close + autofocus while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => ctaRef.current?.focus(), 250);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open]);

  const goToForm = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setOpen(false);
    navigate('/contact');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Start your care assessment"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-forest/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-forest/10 md:grid-cols-2"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-forest shadow-md transition-colors hover:bg-white md:text-white md:bg-black/20 md:hover:bg-black/35"
            >
              <X size={18} />
            </button>

            {/* Visual side */}
            <div className="relative hidden min-h-[22rem] md:block">
              <img src={inviteImage} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-forest/20" />
              <div className="absolute bottom-0 p-8 text-white">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  <Sparkles size={14} /> Limited Suites Available
                </p>
                <p className="font-serif text-2xl leading-snug">
                  A sanctuary your family will be proud to call home.
                </p>
              </div>
            </div>

            {/* Invitation side */}
            <div className="p-7 sm:p-9">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold md:hidden">
                <Sparkles size={14} /> Limited Suites Available
              </p>
              <h3 className="font-serif text-2xl text-forest sm:text-3xl">
                Not sure which level of care is right?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Answer a short care assessment and get an{' '}
                <strong className="font-semibold text-charcoal">estimated care level</strong> and{' '}
                <strong className="font-semibold text-charcoal">indicative monthly cost</strong> right
                away — before you speak to anyone.
              </p>

              <ul className="mt-5 space-y-2.5 text-sm text-charcoal/75">
                {[
                  'See your estimate instantly, no waiting',
                  'Then choose: talk to a Care Advisor or book a visit',
                  'No obligation, and nothing is final until we review it with you',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-bamboo" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                ref={ctaRef}
                type="button"
                onClick={goToForm}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-white shadow-lg shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8954f]"
              >
                Start My Care Assessment
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 w-full text-center text-xs font-medium text-charcoal/45 underline-offset-2 transition-colors hover:text-charcoal/70 hover:underline"
              >
                Maybe later
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-charcoal/50">
                <Clock size={13} className="text-bamboo" />
                Takes about 3 minutes
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LeadCapturePopup;
