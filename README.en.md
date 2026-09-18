# Local Business SEO Starter for Astro

A reusable Astro starter for local businesses that need a fast, static, SEO-friendly website with service pages, location pages, blog support, structured data, and spreadsheet-friendly configuration.

The project began as an SEO workflow demo for a fictional Melbourne plumber. It now combines that demo with a reusable data-driven foundation for local business websites.

## Features

- Astro 5, TypeScript, and Tailwind CSS 4
- Static output for SEO and performance
- Reusable configuration in `src/config/`
- CSV input compatible with Excel and Google Sheets exports
- Data validation with `npm run validate:data`
- Data import with `npm run import:template`
- Generated normalized data in `src/generated/template-data.ts`
- Example tables for business data, contact details, hours, social profiles, services, locations, FAQs, testimonials, and location/service relationships
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

To generate the static site:

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

The importer currently reads CSV files. An `.xlsx` or Google Sheets adapter can be added later without changing the page components.

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
4. Run `npm run validate:data`.
5. Run `npm run import:template`.
6. Run `npm run check` and `npm run build`.
7. Review titles, descriptions, links, structured data, forms, and content before publishing.

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
  template-data/   CSV input examples
scripts/
  import-template.mjs
  fetch-pexels.mjs
docs/
  template-data.en.md
  template-data.es.md
```

## Demo content and reusable core

The `/v1`–`/v6` routes and the files in `src/references/` belong to the original SEO demonstration. They are useful examples, but they contain Plumbing Co-specific voice, numbers, stories, and opinions. Replace or remove them when creating a client project.

## Use cases

The template can be adapted for plumbers, electricians, cleaning companies, locksmiths, dentists, clinics, home services, maintenance companies, and other local businesses.

## Documentation

- [English template data guide](docs/template-data.en.md)
- [Spanish template data guide](docs/template-data.es.md)
- [Project instructions](CLAUDE.md)
- [Spanish project instructions](CLAUDE.es.md)
- [SEO prompts used by the original demo](prompts.md)
- [On-page SEO reference](on-page-seo.md)
- [Project specification](project_specs.md)
