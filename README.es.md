# Plantilla SEO para negocios locales con Astro

Una plantilla reutilizable para negocios locales que necesitan un sitio rápido, estático y optimizado para SEO, con páginas de servicios, localidades, blog, datos estructurados y configuración basada en hojas de cálculo.

El proyecto comenzó como una demo del flujo SEO para un fontanero ficticio de Melbourne. Ahora combina esa demo con una base reutilizable y orientada a datos para webs de negocios locales.

## Características

- Astro 5, TypeScript y Tailwind CSS 4
- Salida estática para SEO y rendimiento
- Configuración reutilizable en `src/config/`
- Entrada CSV compatible con exportaciones de Excel y Google Sheets
- Validación con `npm run validate:data`
- Importación con `npm run import:template`
- Datos normalizados generados en `src/generated/template-data.ts`
- Tablas de ejemplo para negocio, contacto, horarios, redes sociales, servicios, localidades, FAQs, testimonios y relaciones entre localidades y servicios
- Base para datos estructurados de negocios locales
- Feature flags para módulos opcionales como blog, localidades, precios, formularios de contacto y WhatsApp

## Inicio rápido

```bash
npm install
npm run validate:data
npm run import:template
npm run check
npm run dev
```

Abre `http://localhost:4321` en el navegador.

Para generar y previsualizar el sitio estático:

```bash
npm run build
npm run preview
```

La salida de producción se genera en `dist/`.

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

El sitio no lee hojas de cálculo en runtime. Los datos se validan y normalizan antes del build, por lo que el sitio final sigue siendo estático.

Actualmente el importador lee archivos CSV. Más adelante se puede añadir un adaptador para `.xlsx` o Google Sheets sin modificar los componentes de las páginas.

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
| `npm run import:template` | Valida y genera los datos normalizados |
| `npm run build` | Genera el sitio estático |
| `npm run preview` | Previsualiza el build de producción |

## Crear un proyecto nuevo

1. Copia este repositorio.
2. Sustituye los archivos de `examples/template-data/` por los datos del nuevo negocio.
3. Revisa `src/config/site.ts`, la navegación, los feature flags, la marca y la URL del sitio.
4. Ejecuta `npm run validate:data`.
5. Ejecuta `npm run import:template`.
6. Ejecuta `npm run check` y `npm run build`.
7. Revisa títulos, descripciones, enlaces, datos estructurados, formularios y contenido antes de publicar.

## Estructura del proyecto

```text
src/
  components/       Componentes Astro reutilizables
  config/           Configuración del sitio, navegación y features
  content/          Collections de blog y servicios
  data/             Datos del negocio y de la demo
  generated/        Salida generada por el importador; no editar manualmente
  layouts/          Layouts compartidos
  pages/            Rutas estáticas
  styles/           Estilos globales
examples/
  template-data/   Ejemplos de entrada CSV
scripts/
  import-template.mjs
  fetch-pexels.mjs
docs/
  template-data.en.md
  template-data.es.md
```

## Demo y núcleo reutilizable

Las rutas `/v1`–`/v6` y los archivos de `src/references/` pertenecen a la demo original de SEO. Son ejemplos útiles, pero contienen voz, números, historias y opiniones específicas de Plumbing Co. Sustitúyelos o elimínalos al crear un proyecto para un cliente.

## Casos de uso

La plantilla puede adaptarse a fontaneros, electricistas, empresas de limpieza, cerrajeros, dentistas, clínicas, servicios del hogar, negocios de mantenimiento y otros negocios locales.

## Documentación

- [Guía de datos en inglés](docs/template-data.en.md)
- [Guía de datos en español](docs/template-data.es.md)
- [Instrucciones del proyecto en inglés](CLAUDE.md)
- [Instrucciones del proyecto en español](CLAUDE.es.md)
- [Prompts SEO de la demo original](prompts.md)
- [Referencia de SEO on-page](on-page-seo.md)
- [Especificación del proyecto](project_specs.md)
