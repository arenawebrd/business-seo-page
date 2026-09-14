# Project specs — Plumbing Co SEO brief

## Overview

This is a demo site showing the SEO workflow for a fictional plumbing business in Melbourne, Australia. Six versions demonstrate progressive SEO implementation.

## Business

- **Name:** Plumbing Co
- **Location:** Melbourne, Victoria, Australia
- **Service area:** Inner south Melbourne (Prahran, South Yarra, Windsor, St Kilda, Armadale, Toorak, Malvern, Caulfield, Elwood, Brighton)
- **Phone:** (03) 9041 8200
- **Email:** hello@plumbingco.com.au
- **Established:** 2009
- **License:** VIC-PL-48217
- **Reviews:** 4.9 ★ (412 Google reviews)

## Site structure

- **Homepage:** / — Six-page demo + real site structure
- **Services:** /services/ — Service listing
- **Service detail:** /services/[slug]/ — Individual service pages
- **Blog:** /blog/ — Blog listing
- **Blog post:** /blog/[slug]/ — Individual blog posts
- **Demo versions:** /v1/ through /v6/

## Demo versions

| Version | Stage | Description |
|---------|-------|-------------|
| v1 | Scaffolded site | Homepage built from one-line prompt |
| v2 | AI blog slop | Generic AI blog post |
| v3 | Voice-injected | Same post with Marco's voice |
| v4 | Landing page | City+service landing page |
| v5 | On-page SEO | v3 + 80+ item checklist |
| v6 | Technical SEO | v5 + sitemap, robots, OG images, favicon |

## Content types

1. **Homepage sections:** Hero, FeatureGrid, HowItWorks, Testimonials, ServiceAreas, FinalCta
2. **Blog post:** Title, meta description, H1, H2s, paragraphs, lists, image, TL;DR, FAQs
3. **Service page:** Title, meta, H1, hero section, service details, pricing, FAQs, testimonials

## Technical

- **Framework:** Astro 5
- **Styling:** Tailwind CSS 4
- **TypeScript:** Yes
- **Output:** Static site
- **Sitemap:** Auto-generated via @astrojs/sitemap
- **Robots:** public/robots.txt
- **Images:** Pexels API (optional, run fetch-pexels.mjs)

## SEO checklist (applied in v5)

Full checklist in on-page-seo.md. Key items:
- Title tag with primary keyword
- Meta description
- H1 with keyword
- H2s with related keywords
- Internal linking
- Image alt text
- FAQ schema
- Breadcrumb schema
- Article schema
- Fast loading
- Mobile responsive

## Voice style

Marco's voice (from voice.md):
- Direct, no fluff
- Plain English, no jargon
- Specific numbers, not vague
- Active voice
- Conversational but professional
- Dad jokes sparingly (0-2 per page)
- "You" and "we" — direct address
- No superlatives ("best", "leading", "state-of-the-art")

## References

- `src/references/voice.md` — Writing style
- `src/references/humour.md` — Joke guidelines
- `src/references/stats.md` — Canonical business numbers
- `src/references/stories.md` — Recurring anecdotes
- `src/references/opinions.md` — Industry opinions
