export interface Location {
  slug: string;
  suburb: string;
  tagline: string;
  description: string;
  distance: string;
  services: string[];
  highlight: string;
}

export const locations: Location[] = [
  {
    slug: "prahran",
    suburb: "Prahran",
    tagline: "Same-day plumber in Prahran.",
    description:
      "Prahran's go-to plumber since 2009. We know every era of housing here — from Victorian terraces on Chapel Street to new apartments on Commercial Road. Most jobs done same-day, flat price upfront.",
    distance: "5 min from our office",
    services: ["Toilet repair", "Blocked drains", "Hot water systems", "Leaking taps", "Burst pipes"],
    highlight: "We're based in Prahran — fastest response in the area.",
  },
  {
    slug: "south-yarra",
    suburb: "South Yarra",
    tagline: "Licensed plumber in South Yarra.",
    description:
      "South Yarra apartments and period homes keep us busy. High-rises, heritage buildings, new builds — we've worked in all of them. On-site in under 30 minutes.",
    distance: "8 min from our office",
    services: ["Toilet repair", "Blocked drains", "Hot water systems", "Leaking taps", "Low water pressure"],
    highlight: "Fast response to South Yarra — we're just across the river.",
  },
  {
    slug: "windsor",
    suburb: "Windsor",
    tagline: "Plumber Windsor locals trust.",
    description:
      "Windsor's mix of old and new means we see everything — from Victorian drainage issues to modern apartment plumbing. Same-day service, honest pricing.",
    distance: "7 min from our office",
    services: ["Toilet repair", "Blocked drains", "Leaking taps", "Burst pipes", "Hot water systems"],
    highlight: "Windsor is one of our most-serviced suburbs.",
  },
  {
    slug: "st-kilda",
    suburb: "St Kilda",
    tagline: "Emergency plumber in St Kilda.",
    description:
      "St Kilda's older plumbing stock means more urgent callouts. We handle everything from burst pipes in heritage flats to blocked drains in beachside cafés. 24/7 emergency available.",
    distance: "12 min from our office",
    services: ["Blocked drains", "Burst pipes", "Toilet repair", "Hot water systems", "Leaking taps"],
    highlight: "Emergency plumber St Kilda — on-site in under 60 minutes.",
  },
  {
    slug: "armadale",
    suburb: "Armadale",
    tagline: "Plumber Armadale — flat prices.",
    description:
      "Armadale's premium homes deserve a premium service. We treat your property with care — drop sheets, clean work, no mess left behind. Upfront pricing, no surprises.",
    distance: "10 min from our office",
    services: ["Toilet repair", "Hot water systems", "Leaking taps", "Blocked drains", "Burst pipes"],
    highlight: "Trusted by Armadale homeowners since 2009.",
  },
  {
    slug: "toorak",
    suburb: "Toorak",
    tagline: "Plumber Toorak — premium service.",
    description:
      "Toorak homes often have complex plumbing systems — multiple bathrooms, heated floors, smart toilets. We service all of it with the same flat pricing and no call-out fee.",
    distance: "12 min from our office",
    services: ["Hot water systems", "Toilet repair", "Leaking taps", "Burst pipes", "Low water pressure"],
    highlight: "We service Toorak's most complex plumbing systems.",
  },
  {
    slug: "malvern",
    suburb: "Malvern",
    tagline: "Same-day plumber Malvern.",
    description:
      "Malvern's tree-lined streets are full of period homes with character — and characterful plumbing. We know the common issues and fix them fast.",
    distance: "10 min from our office",
    services: ["Toilet repair", "Blocked drains", "Leaking taps", "Hot water systems", "Burst pipes"],
    highlight: "Malvern's trusted plumber — 15 years and counting.",
  },
  {
    slug: "caulfield",
    suburb: "Caulfield",
    tagline: "Plumber Caulfield — same-day service.",
    description:
      "Caulfield's mix of family homes and apartments keeps our team busy. We handle strata and residential jobs with equal care. Flat prices, same-day.",
    distance: "14 min from our office",
    services: ["Toilet repair", "Blocked drains", "Hot water systems", "Leaking taps", "Low water pressure"],
    highlight: "Caulfield plumber — residential and strata.",
  },
  {
    slug: "elwood",
    suburb: "Elwood",
    tagline: "Plumber Elwood — honest pricing.",
    description:
      "Elwood's coastal location means salt air and older pipes. We handle the plumbing issues that come with beachside living — corrosion, blockages, and hot water problems.",
    distance: "15 min from our office",
    services: ["Blocked drains", "Hot water systems", "Leaking taps", "Toilet repair", "Burst pipes"],
    highlight: "Elwood's coastal plumber — we know the salt-air problems.",
  },
  {
    slug: "brighton",
    suburb: "Brighton",
    tagline: "Plumber Brighton — same-day if we can.",
    description:
      "Brighton families need reliable plumbing — and a plumber who shows up when they say they will. We've been serving Brighton since 2009 with upfront pricing and no call-out fee.",
    distance: "18 min from our office",
    services: ["Toilet repair", "Blocked drains", "Hot water systems", "Leaking taps", "Burst pipes"],
    highlight: "Brighton's family plumber — honest, reliable, fast.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
