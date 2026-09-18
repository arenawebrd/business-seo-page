# Local business SEO starter for Astro

A reusable Astro starter for local service businesses that need a fast, static, SEO-friendly website with structured data, service pages, location pages, blog support, and a spreadsheet-friendly data layer.

This project originally started as a demo of the SEO workflow for a fictional Melbourne plumber, but it has been refactored into a more reusable template for real-world local businesses.

## Highlights

- Astro 5 + TypeScript + Tailwind CSS 4
- Static export with SSG for SEO and performance
- Reusable configuration layer (`src/config`)
- Spreadsheet-friendly CSV data input via `examples/template-data/`
- Import script for normalizing tabular data to generated config (`scripts/import-template.mjs`)
- Local business SEO structure with schema.org components
- Service, location, and blog-ready content foundation
- Feature flags for enabling/disabling sections like blog, locations, pricing, contact form, and WhatsApp

## Project structure

```text
src/
  components/
  config/
  data/
  generated/
  layouts/
  pages/
  styles/
examples/
  template-data/
scripts/
  import-template.mjs
docs/
  template-data.md
```

## Quick start

```bash
npm install
npm run import:template
npm run dev
```

## Build

```bash
npm run build
```

## CSV / sheet workflow

This starter supports a simple workbook-style workflow:

- fill tables in CSV files under `examples/template-data/`
- run the importer to normalize the data
- use the generated payload as the app's configuration layer

Example:

```bash
npm run import:template
```

This reads the CSV files and generates a normalized payload in:

```text
src/generated/template-data.ts
```

## Notes

The template is designed to be adapted for local businesses such as:

- plumbers
- electricians
- cleaners
- locksmiths
- dentists
- clinics
- home services
- maintenance businesses

This is intentionally a general starter, while the demo content still includes a plumbing example as a reference implementation.

## Related docs

- `docs/template-data.md` — CSV and spreadsheet workflow
- `CLAUDE.md` — project-specific working rules and conventions
