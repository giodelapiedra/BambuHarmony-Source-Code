import independent from '../assets/images/care/independent.jpg';
import assisted from '../assets/images/care/assisted.jpg';
import memory from '../assets/images/care/memory.jpg';
import independentIcon from '../assets/icons/independent-living.png';
import assistedIcon from '../assets/icons/assisted-living.png';
import memoryIcon from '../assets/icons/memory-care.png';

export const careOptions = [
  {
    id: 'independent-living',
    title: 'Independent Living',
    accommodation: '6 Private Suites',
    description:
      'Designed for active older adults who value independence, comfort, and a maintenance-free lifestyle within a vibrant retirement community in Tanauan City, Batangas.',
    features: [
      'Maintenance-Free Living — Enjoy beautifully maintained residences with housekeeping, laundry, and property upkeep thoughtfully taken care of by our hospitality team.',
      'Active & Engaging Lifestyle — Take part in wellness programs, community activities, recreational experiences, and meaningful social connections designed to enrich everyday life.',
      'Confidence & Peace of Mind — Live independently while knowing personalized support and professional medical care are readily available whenever needed.',
    ],
    badge: null,
    image: independent,
    icon: independentIcon,
  },
  {
    id: 'assisted-living',
    title: 'Assisted Living',
    accommodation: '16 Private Suites',
    description:
      'Designed for older adults who would benefit from additional daily support while continuing to enjoy a comfortable, independent, and fulfilling lifestyle.',
    features: [
      'Personalized Daily Support — Respectful assistance with daily routines, including grooming, bathing, dressing, mobility, and other everyday activities, designed for each resident\'s individual needs.',
      'Expert Care by LifeCare Rizal — Personalized care plans, medication management, and ongoing health monitoring delivered by experienced healthcare professionals in partnership with LifeCare Rizal.',
      'Holistic Wellness — Residents enjoy coordinated access to wellness and aesthetic services through our partnership with Forma Aesthetic Medical, supporting overall well-being and quality of life.',
    ],
    badge: 'Most Requested',
    image: assisted,
    icon: assistedIcon,
  },
  {
    id: 'memory-care',
    title: 'Specialized Memory Care',
    accommodation: 'Dedicated within our Care Suites',
    description:
      'Thoughtfully designed for individuals living with Alzheimer\'s disease and other forms of dementia, our Specialized Memory Care residence provides a safe, nurturing environment where every day is guided by familiarity, comfort, and compassionate support.',
    features: [
      'Safe & Familiar Environment — Purposefully designed spaces that promote comfort, reduce confusion, and encourage residents to move about with confidence.',
      'Meaningful Cognitive Engagement — Structured daily routines and thoughtfully planned activities that encourage connection, cognitive stimulation, and overall well-being.',
      'Compassionate Memory Care — Dedicated dementia-trained healthcare professionals provide personalized support with patience, understanding, and respect for every resident\'s unique journey.',
    ],
    badge: null,
    image: memory,
    icon: memoryIcon,
  },
];
