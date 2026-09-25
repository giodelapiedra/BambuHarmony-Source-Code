// NB: extension is required — this module is also imported directly by Node.
import { faqs } from './faqs.js';

// Single source of truth for all SEO metadata.
// Consumed at runtime by <Seo /> and at build time by scripts/seo-postbuild.mjs,
// so this file must stay plain JS (no JSX, no asset imports).

export const SITE_URL = 'https://www.bambuharmony.ph';
export const SITE_NAME = 'Bambu Harmony Living';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOCALE = 'en_PH';

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Daang Janopol, Santor',
  addressLocality: 'Tanauan City',
  addressRegion: 'Batangas',
  addressCountry: 'PH',
};

export const pages = {
  '/': {
    title: 'Retirement Home in Tanauan City, Batangas | Bambu Harmony Living',
    description:
      'Premium retirement living in Tanauan City, Batangas — Independent Living, Assisted Living and Specialized Memory Care with 24/7 resident support. Book a facility visit.',
    breadcrumb: [],
  },
  '/about': {
    title: 'About Us | Premium Senior Living Community in Batangas',
    description:
      'Bambu Harmony Living is a premium retirement community in Tanauan City, Batangas — operated with LifeCare Rizal and built on trusted healthcare and Filipino hospitality.',
    breadcrumb: [{ name: 'About', path: '/about' }],
  },
  '/care-options': {
    title: 'Independent Living, Assisted Living & Memory Care | Batangas',
    description:
      'Compare Independent Living, Assisted Living and Specialized Memory Care at Bambu Harmony Living in Tanauan City, Batangas — personalized care plans and 24/7 support.',
    breadcrumb: [{ name: 'Care Options', path: '/care-options' }],
  },
  '/location': {
    title: 'Our Estate in Santor, Tanauan City, Batangas | Bambu Harmony',
    description:
      'Bambu Harmony Living sits along Daang Janopol, Santor, Tanauan City, Batangas — about 1.5 hours from Metro Manila and only 5–10 minutes from nearby hospitals.',
    breadcrumb: [{ name: 'Location', path: '/location' }],
  },
  '/contact': {
    title: 'Get Started | Contact Bambu Harmony Living',
    description:
      'Start with a free initial care assessment for an estimated care level and monthly cost, then talk to a care advisor or book a facility visit at Bambu Harmony Living in Tanauan City, Batangas. SRRV guidance for retirees abroad.',
    breadcrumb: [{ name: 'Contact', path: '/contact' }],
  },
};

export const routes = Object.keys(pages);

const NOT_FOUND = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: 'The page you are looking for is no longer available.',
  breadcrumb: [],
  noindex: true,
};

/** Normalise a pathname ("/about/" -> "/about") and return its SEO entry. */
export function getPageSeo(pathname = '/') {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  return { path: clean, ...(pages[clean] || NOT_FOUND) };
}

const organization = {
  '@type': ['RetirementCommunity', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description:
    'Premium retirement living community in Tanauan City, Batangas offering Independent Living, Assisted Living and Specialized Memory Care.',
  url: SITE_URL,
  image: OG_IMAGE,
  logo: OG_IMAGE,
  email: 'adm.bambuharmony@gmail.com',
  address: ADDRESS,
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Batangas' },
    { '@type': 'AdministrativeArea', name: 'CALABARZON' },
    { '@type': 'AdministrativeArea', name: 'Metro Manila' },
    { '@type': 'Country', name: 'Philippines' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '17:00',
    },
  ],
  knowsAbout: [
    'Independent Living',
    'Assisted Living',
    'Specialized Memory Care',
    'Dementia and Alzheimer’s care',
    'Special Resident Retiree’s Visa (SRRV)',
  ],
  parentOrganization: { '@type': 'Organization', name: 'LifeCare Rizal' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Care Options',
    itemListElement: [
      'Independent Living',
      'Assisted Living',
      'Specialized Memory Care',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, provider: { '@id': `${SITE_URL}/#organization` } },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en-PH',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

function breadcrumbLd(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '/' : crumb.path}`,
    })),
  };
}

const faqLd = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

/** Full JSON-LD graph for a route. */
export function buildJsonLd(pathname = '/') {
  const { path, breadcrumb, noindex } = getPageSeo(pathname);
  if (noindex) return null;

  const graph = [organization, website];
  if (breadcrumb.length) graph.push(breadcrumbLd(breadcrumb));
  if (path === '/') graph.push(faqLd);

  return { '@context': 'https://schema.org', '@graph': graph };
}
