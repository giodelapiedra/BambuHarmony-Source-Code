// Official endorsements from Bambu Harmony Living's institutional partners and
// public officials. These are the headline proof points — rendered as large
// featured cards above the family reviews. `roles` renders one line per entry.
export const endorsements = [
  {
    id: 'tmc-cagurangan',
    quote:
      'I am very, very happy that we have signed an agreement with Bambu, where we will be providing home care services and all sorts of medical services. I hope you can send your loved ones here when they need these services. We’re happy that Bambu Harmony contributes to the geriatric medicine services and programs that we have at The Medical City.',
    author: 'Raquel Cagurangan',
    roles: ['Group Chief Officer, Strategic Accounts', 'The Medical City'],
  },
  {
    id: 'pra-zozobrado',
    quote:
      'These are the things that we are looking forward to—partnering with retirement facilities. And with your help—with help like Bambu Harmony Living—we can make it. And we will continue to be the number one retirement destination.',
    author: 'Roberto “Bob” Zozobrado',
    roles: ['General Manager & CEO', 'Philippine Retirement Authority'],
  },
  {
    id: 'tanauan-collantes',
    quote:
      'We warmly welcome you to our city. We are very fortunate to have Bambu Harmony Living establish its retirement community here in Tanauan. The City Government of Tanauan welcomes you and extends its 100 percent support to Bambu Harmony Living and its community.',
    author: 'Mayor Sonny Perez Collantes',
    roles: ['City Government of Tanauan'],
  },
  {
    id: 'lifecare-living-solutions',
    quote:
      'Bambu is committed to providing resident-centered care. All of Bambu’s staff underwent training at LifeCare Rizal to ensure that we maintain the same standards and quality of care. We’re so happy that Bambu finally opened its doors and that we can begin caring for residents. We look forward to working alongside Bambu in providing quality, resident-centered care to all its incoming residents.',
    author: 'LifeCare Living Solutions Inc.',
    initials: 'LC',
    roles: ['Operating Partner'],
    link: 'https://lifecareliving.ph/',
  },
  {
    id: 'educare-farrow',
    quote:
      'It’s wonderful to hear that the Philippines is number one in the world. I can actually attest to that from Australia’s point of view. Whenever I’ve visited an aged care centre, a Filipino has always been number one in aged care, especially when it comes to compassion. I’m sure that anybody living here in the future will have a wonderful life.',
    author: 'Robert Farrow',
    roles: [
      'Manager, Educare College Australia | Director, IHCS Australia',
      'National Marketing Manager, APM',
    ],
  },
  {
    id: 'forma-marasigan',
    quote:
      'We are proud to be in partnership with Bambu Harmony, where we will be addressing the cosmetic and aesthetic concerns of its residents. We will help you look and feel younger throughout your stay. We look forward to working closely with Bambu and I wish Bambu Harmony success in the years ahead.',
    author: 'Dr. Glenn Marasigan',
    roles: ['Board-Certified Cosmetic Surgeon | Forma Aesthetic Medical'],
  },
];

// Family reviews — shown in the auto-scrolling marquee beneath the endorsements.
export const testimonials = [
  {
    id: 'testimonial-1',
    quote:
      "Mom cried when we first toured. Not from sadness - she said it felt like the home she always wanted. We were the ones who were nervous, not her.",
    author: 'Maria R.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    quote:
      "Dad told me last week he's the happiest he's been in years. I haven't heard him say that since before Mom passed. I didn't expect this place to do that.",
    author: 'James L.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    quote:
      "Lola used to sit alone at home all day. Now she has a whole circle - they eat together, watch TV together, pray together. She's not lonely anymore.",
    author: 'Elena S.',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    quote:
      "I'm a doctor. I know exactly what to look for. The clinical care here is solid, but what actually impressed me was how they spoke to my father - with respect, not pity.",
    author: 'Dr. Antonio M.',
    rating: 5,
  },
  {
    id: 'testimonial-5',
    quote:
      "I visited unannounced one afternoon. The staff were laughing with Mama like old friends. That one visit told me everything I needed to know.",
    author: 'Grace V.',
    rating: 5,
  },
  {
    id: 'testimonial-6',
    quote:
      "We flew in from Canada to set everything up and honestly, they handled more than we did. By the time we left, our parents were already comfortable. That's rare.",
    author: 'Cherrie D.',
    rating: 4,
  },
  {
    id: 'testimonial-7',
    quote:
      "Papa calls us after dinner now just to tell us what he ate. That's new. He never called just to share something happy before.",
    author: 'Roberto C.',
    rating: 5,
  },
  {
    id: 'testimonial-8',
    quote:
      "We visited Lola expecting to feel guilty. We left feeling relieved. She introduced us to her new friends like we were the guests and she lived there forever.",
    author: 'Patricia & Mark T.',
    rating: 5,
  },
  {
    id: 'testimonial-9',
    quote:
      "I'm based in Dubai so I can't check in person. But the staff sends photos without me asking. Last week it was Mama dancing at the activity program. I cried happy tears.",
    author: 'Liza Fernandez',
    rating: 5,
  },
  {
    id: 'testimonial-10',
    quote:
      "The hardest part was convincing myself, not Papa. He adjusted faster than I expected. Watching him thrive here made me realize we made the right call.",
    author: 'Miguel Santos',
    rating: 5,
  },
  {
    id: 'testimonial-11',
    quote:
      "Tita calls it her resort. She tells everyone back home she lives in a beautiful estate. Honestly at this point she's the one selling it, not us.",
    author: 'Aileen Cruz',
    rating: 5,
  },
  {
    id: 'testimonial-12',
    quote:
      "We looked at six places. This was the only one where the residents looked genuinely happy - not just cared for, but happy. There's a difference.",
    author: 'Daniel & Rhea Lim',
    rating: 5,
  },
];

export const testimonialStats = {
  count: testimonials.length,
  average:
    Math.round(
      (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) * 10,
    ) / 10,
};
