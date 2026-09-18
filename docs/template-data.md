# Sheet-based data template

This repository includes a simple CSV-driven data template that can be reused across projects.

## Folder structure

- `examples/template-data/*.csv` — the editable source tables
- `scripts/import-template.mjs` — reads those tables and generates a normalized payload
- `src/generated/template-data.ts` — generated normalized data for the app

## How to use

```bash
npm run import:template
```

This is intentionally workbook-friendly:

- a table for business information
- a table for contact details
- a table for services
- a table for locations

The pattern is designed to map well to a real spreadsheet or Excel workbook with multiple tabs.

## What the importer does

It reads every CSV in `examples/template-data`, parses the rows, normalizes a few common fields, and emits a single generated TypeScript payload in `src/generated/template-data.ts`.

This is the bridge between:

- spreadsheet-friendly input
- type-safe app configuration
- static Astro pages

## Recommended next step

Extend the importer to generate:

- `src/config/site.ts`
- `src/data/business.ts`
- `src/content/services/*.md`
- `src/content/locations/*.md`
- `src/data/testimonials.ts`

That would make the template fully reusable for client projects without hardcoded values in components.
