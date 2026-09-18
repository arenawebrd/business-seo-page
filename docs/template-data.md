# Sheet-based data template

This repository now includes a simple, CSV-driven data template that can be used as a foundation for future projects.

## Folder

- `examples/template-data/*.csv` — starter sheets you can fill in for a new project
- `scripts/import-template.mjs` — reads the CSV files and prints a structured JSON payload

## How to use

```bash
npm run import:template
```

This is a lightweight example of a workbook-style input flow:

- Business data
- Contact data
- Services
- Locations

The idea is that a client or editor fills the CSV rows, and a future importer converts them into `src/config` or `src/data` content.

## Recommended next step

For a production-ready template, extend the importer to generate:

- `src/config/site.ts`
- `src/data/business.ts`
- `src/content/services/*.md`
- `src/content/locations/*.md`
- `src/data/testimonials.ts`

This keeps the project static, typed, and easy to customize without hardcoded values in components.
