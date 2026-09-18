// Este archivo se genera con scripts/import-template.mjs.
// No lo edites manualmente.

export const templateData = {
  "site": {
    "businessName": "Plumbing Co",
    "legalName": "Plumbing Co Pty Ltd",
    "siteUrl": "https://plumbing-co.example.com",
    "locale": "en-AU",
    "language": "en",
    "currency": "AUD",
    "tagline": "Honest plumbers. Same-day if we can.",
    "description": "Licensed plumbers serving Melbourne's inner south since 2009.",
    "foundationYear": 2009,
    "jobsCompleted": 18420,
    "licenseNumber": "VIC-PL-48217",
    "schemaType": "Plumber"
  },
  "contact": {
    "phoneDisplay": "(03) 9041 8200",
    "phoneE164": "+61390418200",
    "email": "hello@plumbingco.com.au",
    "whatsappEnabled": true,
    "whatsappNumber": "+61390418200",
    "whatsappMessage": "Hi Plumbing Co, I need help with a plumbing issue.",
    "contactFormEnabled": true,
    "contactFormProvider": "mailto"
  },
  "services": [
    {
      "slug": "blocked-drains",
      "title": "Blocked drains",
      "tagline": "Clear the blockage without the drama.",
      "priceFrom": "199",
      "emergency": true,
      "featured": true
    },
    {
      "slug": "burst-pipes",
      "title": "Burst pipes",
      "tagline": "Fast response for urgent pipe issues.",
      "priceFrom": "350",
      "emergency": true,
      "featured": true
    },
    {
      "slug": "hot-water",
      "title": "Hot water systems",
      "tagline": "No hot water? We'll find out why.",
      "priceFrom": "250",
      "emergency": true,
      "featured": true
    },
    {
      "slug": "leaking-taps",
      "title": "Leaking taps",
      "tagline": "Small drip or bigger problem? We'll fix it.",
      "priceFrom": "99",
      "emergency": false,
      "featured": true
    },
    {
      "slug": "toilet-repair",
      "title": "Toilet repair",
      "tagline": "Running toilet? We'll fix it.",
      "priceFrom": "149",
      "emergency": false,
      "featured": true
    }
  ],
  "locations": [
    {
      "slug": "prahran",
      "name": "Prahran",
      "tagline": "Same-day plumber in Prahran.",
      "description": "Prahran's go-to plumber since 2009.",
      "distance": "5 min",
      "indexable": true
    },
    {
      "slug": "south-yarra",
      "name": "South Yarra",
      "tagline": "Licensed plumber in South Yarra.",
      "description": "South Yarra apartments and period homes keep us busy.",
      "distance": "8 min",
      "indexable": true
    },
    {
      "slug": "windsor",
      "name": "Windsor",
      "tagline": "Plumber Windsor locals trust.",
      "description": "Windsor's mix of old and new means we see everything.",
      "distance": "7 min",
      "indexable": true
    }
  ],
  "raw": {
    "business": {
      "business_name": "Plumbing Co",
      "legal_name": "Plumbing Co Pty Ltd",
      "site_url": "https://plumbing-co.example.com",
      "tagline": "Honest plumbers. Same-day if we can.",
      "description": "Licensed plumbers serving Melbourne's inner south since 2009.",
      "industry": "plumber",
      "schema_type": "Plumber",
      "language": "en",
      "locale": "en-AU",
      "currency": "AUD",
      "license_number": "VIC-PL-48217"
    },
    "contact": {
      "phone_display": "(03) 9041 8200",
      "phone_e164": "+61390418200",
      "email": "hello@plumbingco.com.au",
      "whatsapp_enabled": "true",
      "whatsapp_number": "+61390418200",
      "whatsapp_message": "Hi Plumbing Co, I need help with a plumbing issue.",
      "contact_form_enabled": "true",
      "contact_form_provider": "mailto"
    },
    "services": [
      {
        "slug": "blocked-drains",
        "title": "Blocked drains",
        "tagline": "Clear the blockage without the drama.",
        "price_from": "199",
        "emergency": "true",
        "featured": "true"
      },
      {
        "slug": "burst-pipes",
        "title": "Burst pipes",
        "tagline": "Fast response for urgent pipe issues.",
        "price_from": "350",
        "emergency": "true",
        "featured": "true"
      },
      {
        "slug": "hot-water",
        "title": "Hot water systems",
        "tagline": "No hot water? We'll find out why.",
        "price_from": "250",
        "emergency": "true",
        "featured": "true"
      },
      {
        "slug": "leaking-taps",
        "title": "Leaking taps",
        "tagline": "Small drip or bigger problem? We'll fix it.",
        "price_from": "99",
        "emergency": "false",
        "featured": "true"
      },
      {
        "slug": "toilet-repair",
        "title": "Toilet repair",
        "tagline": "Running toilet? We'll fix it.",
        "price_from": "149",
        "emergency": "false",
        "featured": "true"
      }
    ],
    "locations": [
      {
        "slug": "prahran",
        "name": "Prahran",
        "tagline": "Same-day plumber in Prahran.",
        "description": "Prahran's go-to plumber since 2009.",
        "distance": "5 min",
        "indexable": "true"
      },
      {
        "slug": "south-yarra",
        "name": "South Yarra",
        "tagline": "Licensed plumber in South Yarra.",
        "description": "South Yarra apartments and period homes keep us busy.",
        "distance": "8 min",
        "indexable": "true"
      },
      {
        "slug": "windsor",
        "name": "Windsor",
        "tagline": "Plumber Windsor locals trust.",
        "description": "Windsor's mix of old and new means we see everything.",
        "distance": "7 min",
        "indexable": "true"
      }
    ]
  }
} as const;

export type TemplateData = typeof templateData;
