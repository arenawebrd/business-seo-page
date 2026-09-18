# Project specification — reusable local business Astro starter

## Purpose

This repository is a reusable static Astro starter for local business websites. It also contains the original Plumbing Co SEO workflow demo, with routes `/v1` through `/v6`.

## Reusable layer

- Site configuration: `src/config/site.ts`
- Navigation: `src/config/navigation.ts`
- Feature flags: `src/config/features.ts`
- CSV examples: `examples/template-data/`
- Import and validation: `scripts/import-template.mjs`
- Generated payload: `src/generated/template-data.ts`
- Content collections: `src/content/blog/` and `src/content/services/`
- Local business routes: services and locations

## Demo data

The default example describes fictional Plumbing Co data for Melbourne, Australia. It must be replaced before production use. The voice, stories, opinions, reviews, prices, domain, phone number, and legal details under the demo references are not universal template defaults.

## Data tables

The example input includes business, contact, hours, social, services, locations, location-services, FAQs, and testimonials tables. Run `npm run validate:data` before importing them.

## Technical requirements

- Astro 5
- TypeScript
- Tailwind CSS 4
- Static output
- Sitemap through `@astrojs/sitemap`
- Robots file in `public/robots.txt`
- JSON-LD components in `src/components/seo/`

## Pre-release checklist

- Replace the placeholder domain in `astro.config.mjs`, site configuration, and `public/robots.txt`.
- Replace all fictional contact, legal, pricing, review, and business data.
- Run `npm run validate:data`.
- Run `npm run import:template`.
- Run `npm run check`.
- Run `npm run build`.
- Check canonical URLs, sitemap, robots, Open Graph, JSON-LD, forms, links, and accessibility.
- Confirm that every testimonial and review claim is authorized and factual.
