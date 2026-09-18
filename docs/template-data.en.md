# Template data workflow

This guide explains how to prepare the tabular input used by the Astro starter.

## Input folder

Place CSV files in:

```text
examples/template-data/
```

Included tables:

- `business.csv` — business identity, domain, language, currency, and general data.
- `contact.csv` — phone, email, WhatsApp, and contact form settings.
- `hours.csv` — opening hours.
- `social.csv` — social profiles and enabled state.
- `services.csv` — services, prices, and featured/emergency flags.
- `locations.csv` — locations and local landing-page data.
- `location-services.csv` — relationships between locations and services.
- `faqs.csv` — global, service, or location FAQs.
- `testimonials.csv` — testimonials and ratings.

## Commands

```bash
npm install
npm run validate:data
npm run import:template
```

`validate:data` checks required values, slugs, booleans, URLs, email format, numeric prices, duplicate slugs, and references between locations and services.

`import:template` runs the same validation and then generates:

```text
src/generated/template-data.ts
```

Do not edit that generated file manually. Edit the CSV input and run the importer again.

## Workflow

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
npm run check
          ↓
npm run build
```

The repository uses CSV as the interchange format because it can be exported from Excel or Google Sheets. The application does not read the CSV at runtime.

## Formats

- Single-record configuration tables use `field,value`, with one setting per row.
- Entity tables use one column per field and one row per entity.
- Boolean values should be `true` or `false`.
- Slugs use lowercase letters, numbers, and hyphens, for example `blocked-drains`.
- International phone numbers use E.164 format, for example `+61390418200`.
- URLs must start with `http://` or `https://`.
- Use real, authorized testimonials only on a production website.

## Current scope

The importer currently validates and normalizes the CSV tables into one generated TypeScript payload. It does not yet generate Markdown content files, read `.xlsx` files directly, or connect to the Google Sheets API.

## Creating a client project

1. Copy the example CSV files.
2. Replace the demo values.
3. Run `npm run validate:data`.
4. Fix every validation error.
5. Run `npm run import:template`.
6. Update the site configuration and long-form Markdown content.
7. Run `npm run check` and `npm run build`.
