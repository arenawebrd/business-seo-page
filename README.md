# Local Business SEO Starter for Astro

A reusable Astro starter for local businesses that need a fast, static, SEO-friendly website with service pages, location pages, blog support, structured data, and spreadsheet-friendly configuration.

This project started as an SEO workflow demo for a fictional Melbourne plumber and has evolved into a reusable template for local business websites.

## Features

- Astro 5 + TypeScript + Tailwind CSS 4
- Static output for SEO and performance
- Reusable configuration in `src/config/`
- CSV input compatible with Excel and Google Sheets exports
- Data validation with `npm run validate:data`
- Data import and generation with `npm run import:template`
- Example tables for business data, contact details, hours, social profiles, services, locations, FAQs, testimonials, and relationships between locations and services
- Local business structured-data foundation
- Feature flags for optional modules such as blog, locations, pricing, contact forms, and WhatsApp

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
npm run validate:data
npm run import:template
npm run dev
```

Open `http://localhost:4321` in your browser.

To generate the static site:

```bash
npm run check
npm run build
```

The output is generated in `dist/`.

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

The site does not read spreadsheets at runtime. Data is processed before the build, so the final website remains static.

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
| `npm run import:template` | Validate and import CSV data |
| `npm run build` | Generate the static site |
| `npm run preview` | Preview the production build |

## Starting a new project

1. Copy this repository.
2. Replace the files in `examples/template-data/` with the new business data.
3. Review `src/config/site.ts` and the brand configuration.
4. Run `npm run validate:data`.
5. Run `npm run import:template`.
6. Run `npm run check` and `npm run build`.
7. Review titles, descriptions, links, structured data, and content before publishing.

## Use cases

The template can be adapted for plumbers, electricians, cleaning companies, locksmiths, dentists, clinics, home services, maintenance companies, and other local businesses.

The original plumbing demo remains as a visual reference, but the data workflow is intended for reuse in other industries.

## Documentation

- `docs/template-data.md` — CSV and spreadsheet data workflow
- `CLAUDE.md` — project rules and conventions
- `src/references/` — voice and content references from the original demo

---

# Plantilla SEO para negocios locales con Astro

Una plantilla reutilizable para negocios locales que necesitan un sitio rápido, estático y optimizado para SEO, con páginas de servicios, localidades, blog, datos estructurados y configuración basada en hojas de cálculo.

Este proyecto comenzó como una demo del flujo SEO para un fontanero ficticio de Melbourne y evolucionó hasta convertirse en una plantilla reutilizable para webs de negocios locales.

## Características

- Astro 5 + TypeScript + Tailwind CSS 4
- Salida estática para SEO y rendimiento
- Configuración reutilizable en `src/config/`
- Entrada CSV compatible con exportaciones de Excel y Google Sheets
- Validación de datos con `npm run validate:data`
- Importación y generación de datos con `npm run import:template`
- Tablas de ejemplo para negocio, contacto, horarios, redes sociales, servicios, localidades, FAQs, testimonios y relaciones entre localidades y servicios
- Base para datos estructurados de negocios locales
- Feature flags para módulos opcionales como blog, localidades, precios, formularios de contacto y WhatsApp

## Estructura del proyecto

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

## Inicio rápido

```bash
npm install
npm run validate:data
npm run import:template
npm run dev
```

Abre `http://localhost:4321` en el navegador.

Para generar el sitio estático:

```bash
npm run check
npm run build
```

La salida se genera en `dist/`.

## Flujo de datos

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

El sitio no lee hojas de cálculo en runtime. Los datos se procesan antes del build, por lo que el sitio final sigue siendo estático.

## Datos de ejemplo

La carpeta `examples/template-data/` contiene:

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

El contenido de ejemplo está basado en el proyecto ficticio Plumbing Co. Sustitúyelo antes de publicar una web real.

## Comandos

| Comando | Función |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run check` | Ejecuta las comprobaciones de Astro |
| `npm run validate:data` | Valida las tablas CSV sin generar archivos |
| `npm run import:template` | Valida e importa los datos CSV |
| `npm run build` | Genera el sitio estático |
| `npm run preview` | Previsualiza el build de producción |

## Crear un proyecto nuevo

1. Copia este repositorio.
2. Sustituye los archivos de `examples/template-data/` por los datos del nuevo negocio.
3. Revisa `src/config/site.ts` y la configuración de marca.
4. Ejecuta `npm run validate:data`.
5. Ejecuta `npm run import:template`.
6. Ejecuta `npm run check` y `npm run build`.
7. Revisa títulos, descripciones, enlaces, datos estructurados y contenido antes de publicar.

## Casos de uso

La plantilla puede adaptarse a fontaneros, electricistas, empresas de limpieza, cerrajeros, dentistas, clínicas, servicios del hogar, negocios de mantenimiento y otros negocios locales.

La demo original de fontanería continúa como referencia visual, pero el flujo de datos está pensado para reutilizarse en otros sectores.

## Documentación

- `docs/template-data.md` — flujo de datos CSV y hojas de cálculo
- `CLAUDE.md` — reglas y convenciones del proyecto
- `src/references/` — referencias de voz y contenido del ejemplo original
