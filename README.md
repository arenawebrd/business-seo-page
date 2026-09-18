# Plantilla SEO para negocios locales con Astro

Una plantilla reutilizable para negocios locales que necesitan un sitio rápido, estático y optimizado para SEO, con páginas de servicios, ubicaciones, blog, datos estructurados y una capa de entrada basada en hojas de cálculo.

Este proyecto comenzó como una demo del flujo SEO para un fontanero ficticio en Melbourne, pero ha sido reestructurado para servir como base reutilizable para negocios reales.

## Características

- Astro 5 + TypeScript + Tailwind CSS 4
- Exportación estática para SEO y rendimiento
- Capa de configuración reutilizable en `src/config/`
- Flujo de entrada basado en CSV/hojas de cálculo bajo `examples/template-data/`
- Script de importación para normalizar datos tabulares (`scripts/import-template.mjs`)
- Estructura preparada para negocios locales con schema.org
- Páginas de servicios, ubicaciones y blog
- Feature flags para activar o desactivar secciones como blog, ubicaciones, precios, formulario de contacto y WhatsApp

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
npm run import:template
npm run dev
```

## Compilar

```bash
npm run build
```

## Flujo con CSV / hoja de cálculo

La plantilla admite un flujo sencillo tipo workbook:

- rellenas tablas en archivos CSV dentro de `examples/template-data/`
- ejecutas el importador para normalizar los datos
- usas el payload generado como configuración base de la app

Ejemplo:

```bash
npm run import:template
```

Eso lee los archivos CSV y genera una salida normalizada en:

```text
src/generated/template-data.ts
```

## Datos de ejemplo incluidos

La carpeta `examples/template-data/` incluye ejemplos para:

- negocio
- contacto
- servicios
- ubicaciones

Ejemplos incluidos:

```text
examples/template-data/business.csv
examples/template-data/contact.csv
examples/template-data/services.csv
examples/template-data/locations.csv
```

## Casos de uso

La plantilla está pensada para negocios locales como:

- fontaneros
- electricistas
- limpieza
- cerrajeros
- dentistas
- clínicas
- servicios del hogar
- negocios de mantenimiento

La demo original de fontanería sigue sirviendo como referencia visual, pero la estructura ya está preparada para reutilizarse con otros negocios.

## Documentación relacionada

- `docs/template-data.md` — flujo de CSV y hojas de cálculo
- `CLAUDE.md` — reglas y convenciones del proyecto
