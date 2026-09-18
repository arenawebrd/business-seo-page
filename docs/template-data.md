# Plantilla basada en hojas de cálculo

Este repositorio incluye una base para trabajar con datos de negocio en formato tabular y convertirlos en una estructura reutilizable para un proyecto Astro.

## Carpeta de ejemplo

Los ejemplos de entrada viven en:

```text
examples/template-data/
```

Archivos incluidos:

- `business.csv`
- `contact.csv`
- `services.csv`
- `locations.csv`

## Cómo usarlo

```bash
npm install
npm run import:template
```

Ese comando lee los CSV y genera un archivo normalizado en:

```text
src/generated/template-data.ts
```

## Qué hace el importador

El script:

- lee cada CSV de la carpeta de ejemplo
- interpreta filas con formato `field,value`
- interpreta tablas con columnas fijas
- normaliza valores comunes como `true/false`, `números` y `strings`
- genera un payload listo para usar como datos de la aplicación

## Flujo recomendado

```text
Hoja / CSV
  ↓
examples/template-data/
  ↓
npm run import:template
  ↓
src/generated/template-data.ts
  ↓
Astro build
```

## Importante

La lógica actual sirve como base para una plantilla reutilizable, pero todavía puede ampliarse con:

- validación de columnas requeridas
- validación de entradas por schema
- importación de horarios
- importación de testimonios
- importación de FAQs
- soporte para archivos `.xlsx`
- generación automática de páginas y contenido desde la hoja

## Estructura general

```text
examples/template-data/
  business.csv
  contact.csv
  services.csv
  locations.csv

scripts/
  import-template.mjs

src/generated/
  template-data.ts
```

## Siguiente paso recomendado

Extender el importer para generar:

- `src/config/site.ts`
- `src/data/business.ts`
- `src/content/services/*.md`
- `src/content/locations/*.md`
- `src/data/testimonials.ts`

Así la plantilla queda lista para reutilizarse sin hardcodear valores en componentes.
