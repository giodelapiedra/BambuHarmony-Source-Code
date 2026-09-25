import lifecareOps from '../assets/icons/lifecare-ops.png';
import srrv from '../assets/icons/srrv.png';
import cosmetic from '../assets/icons/cosmetic.png';
import praLogo from '../assets/logos/pra.png';
import lifecareLogo from '../assets/logos/lifecare-living.png';
import medicalCityLogo from '../assets/logos/the-medical-city.png';
import formaLogo from '../assets/logos/forma.png';
import stoTomasLogo from '../assets/logos/sto-tomas-doctors.png';

export const partnerships = [
  {
    id: 'lifecare-rizal',
    title: 'Operating Partner: LifeCare Rizal',
    description:
      'Professional healthcare expertise, personalized care planning, and day-to-day operational excellence delivered through our trusted partnership with LifeCare Rizal.',
    icon: lifecareOps,
  },
  {
    id: 'srrv',
    title: 'Resident Services: SRRV Assistance',
    description:
      "For international retirees looking to make the Philippines their home, we provide dedicated guidance and assistance throughout the Special Resident Retiree's Visa (SRRV) application process, making your transition as smooth and worry-free as possible.",
    icon: srrv,
  },
  {
    id: 'ferna-aesthetics',
    title: 'Wellness Partner: Forma Aesthetic Medical',
    description:
      'Residents enjoy access to wellness and aesthetic services designed to promote confidence, relaxation, and overall well-being through our partnership with Forma Aesthetic Medical.',
    icon: cosmetic,
  },
];

// Organisations Bambu Harmony Living formally partners with, shown as a linked
// logo wall beneath the partnership cards. `logo` is optional — organisations
// without a supplied logo fall back to their name set in the display serif.
export const partnerOrganizations = [
  {
    id: 'pra',
    name: 'Philippine Retirement Authority',
    url: 'https://www.pra.gov.ph/',
    logo: praLogo,
  },
  {
    id: 'lifecare',
    name: 'LifeCare Living Solutions Inc.',
    url: 'https://lifecareliving.ph/',
    logo: lifecareLogo,
  },
  {
    id: 'the-medical-city',
    name: 'The Medical City',
    url: 'https://www.themedicalcity.com/',
    logo: medicalCityLogo,
  },
  {
    id: 'forma-aesthetic-medical',
    name: 'Forma Aesthetic Medical',
    url: 'https://formaclinics.com/',
    logo: formaLogo,
  },
  {
    id: 'sto-tomas-doctors-hospital',
    name: 'Sto. Tomas Doctors Hospital and Medical Center Inc.',
    url: 'https://www.facebook.com/stotomasdoctorshmci/',
    logo: stoTomasLogo,
  },
];
