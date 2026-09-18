# Local Business SEO Starter for Astro

[Español](README.es.md)

A reusable Astro starter for local businesses that need a fast, static, SEO-friendly website with service pages, location pages, blog support, structured data, and spreadsheet-friendly configuration.

The project began as an SEO workflow demo for a fictional Melbourne plumber. It now combines that demo with a reusable, data-driven foundation for local business websites.

## Features

- Astro 5, TypeScript, and Tailwind CSS 4
- Static output for SEO and performance
- Reusable configuration in `src/config/`
- CSV input compatible with Excel and Google Sheets exports
- Validation with `npm run validate:data`
- Import and generation with `npm run import:template`
- Generated normalized data in `src/generated/template-data.ts`
- Example tables for business, contact, hours, social profiles, services, locations, FAQs, testimonials, and location/service relationships
- Local business structured-data foundation
- Feature flags for optional modules such as blog, locations, pricing, contact forms, and WhatsApp

## Quick start

```bash
npm install
npm run validate:data
npm run import:template
npm run check
npm run dev
```

Open `http://localhost:4321` in your browser.

To generate and preview the static site:

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Data workflow

```text
Excel / Google Sheets / CSV
          ↓
examples/template-data/
          ↓
npm run validate:data
          ↓
npm run import:template
          ↓
src/generated/template-data.ts
          ↓
npm run build
```

The site does not read spreadsheets at runtime. Data is validated and normalized before the build, so the final website remains static.

The importer currently reads CSV files. It does not yet read `.xlsx` files directly or connect to the Google Sheets API.

## Example data

The `examples/template-data/` directory contains:

```text
business.csv
contact.csv
hours.csv
social.csv
services.csv
locations.csv
location-services.csv
faqs.csv
testimonials.csv
```

The example content is based on the fictional Plumbing Co project. Replace it before publishing a real website.

## CSV formats

Single-record tables use two columns:

```csv
field,value
business_name,Example Business
site_url,https://example.com
```

Entity tables use one column per field and one row per entity. Use `true` or `false` for booleans, lowercase hyphenated slugs such as `blocked-drains`, E.164 phone numbers such as `+61390418200`, and `http://` or `https://` URLs.

Use real, authorized testimonials and factual business claims only.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run check` | Run Astro checks |
| `npm run validate:data` | Validate CSV tables without generating files |
| `npm run import:template` | Validate and generate normalized data |
| `npm run build` | Generate the static site |
| `npm run preview` | Preview the production build |

## Starting a new project

1. Copy this repository.
2. Replace the files in `examples/template-data/` with the new business data.
3. Review `src/config/site.ts`, navigation, feature flags, branding, and the site URL.
4. Run `npm run validate:data` and fix every error.
5. Run `npm run import:template`.
6. Replace the demo content in `src/content/` and `src/references/`.
7. Update `astro.config.mjs` and `public/robots.txt` with the real production domain.
8. Run `npm run check` and `npm run build`.
9. Review titles, descriptions, links, structured data, forms, images, and accessibility before publishing.

## Project structure

```text
src/
  components/       Reusable Astro components
  config/           Site, navigation, and feature configuration
  content/          Blog and service content collections
  data/             Business and demo data
  generated/        Generated importer output; do not edit manually
  layouts/          Shared page layouts
  pages/            Static routes
  styles/           Global styles
examples/
  template-data/    CSV input examples
scripts/
  import-template.mjs
  fetch-pexels.mjs
public/
  robots.txt
  favicon and OG assets
```

## Configuration and content

- `src/config/site.ts` — reusable site and business configuration.
- `src/config/navigation.ts` — navigation items.
- `src/config/features.ts` — optional feature flags.
- `src/data/business.ts` — compatibility adapter for existing components.
- `src/content.config.ts` — Content Collections schemas.
- `src/generated/template-data.ts` — generated output; do not edit manually.
- `src/content/blog/` — blog posts.
- `src/content/services/` — service content.

Long-form editorial content belongs in Markdown and Content Collections, not oversized CSV cells.

## Demo content and reusable core

The `/v1`–`/v6` routes and `src/references/` belong to the original SEO demonstration. They contain Plumbing Co-specific voice, numbers, stories, opinions, reviews, and prices. Replace or remove them when creating a client project.

## SEO and deployment checklist

Before publishing:

- Replace the placeholder domain in `astro.config.mjs`, configuration, and `public/robots.txt`.
- Replace fictional contact, legal, pricing, review, and business data.
- Confirm canonical URLs, Open Graph URLs, sitemap, and JSON-LD.
- Confirm every page has an appropriate title and meta description.
- Check internal links, forms, images, mobile layout, keyboard focus, and contrast.
- Confirm testimonials and review claims are real and authorized.
- Run `npm run validate:data`, `npm run check`, and `npm run build`.

## Current limitations

The current importer validates and normalizes CSV data into one generated TypeScript payload. It does not yet generate Markdown pages automatically, read `.xlsx` files directly, or connect to Google Sheets. Those adapters can be added without changing the page components.

## License and project-specific data

The default business data and SEO references are fictional demonstration data. Review licensing, privacy, legal, image, review, and content requirements before using the starter for a real business.
