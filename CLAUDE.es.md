# CLAUDE.es.md — Instrucciones del proyecto

Este archivo es la referencia principal para trabajar con código y contenido en esta plantilla Astro. Para inglés, consulta [`CLAUDE.md`](CLAUDE.md).

## Objetivo del proyecto

Esta es una plantilla Astro estática y reutilizable para webs de negocios locales. La implementación original demuestra un flujo SEO para el negocio ficticio Plumbing Co mediante `/v1`–`/v6`. La capa reutilizable incluye configuración del sitio, feature flags, Content Collections, componentes SEO para negocios locales y ejemplos de entrada basados en CSV.

## Tecnologías y salida

- Astro 5
- TypeScript
- Tailwind CSS 4
- `output: 'static'`
- Salida de build: `dist/`
- Entrada CSV: `examples/template-data/`
- Datos generados: `src/generated/template-data.ts`

## Flujo de datos

1. Edita o sustituye los CSV de `examples/template-data/`.
2. Ejecuta `npm run validate:data`.
3. Ejecuta `npm run import:template`.
4. Revisa `src/generated/template-data.ts`; no lo edites manualmente.
5. Ejecuta `npm run check` y `npm run build`.

El CSV es un formato de entrada, no una base de datos de runtime. El importador actual no lee directamente archivos `.xlsx` ni Google Sheets.

## Fuentes de configuración

- `src/config/site.ts` — configuración reutilizable del sitio y del negocio.
- `src/config/navigation.ts` — elementos de navegación.
- `src/config/features.ts` — feature flags.
- `src/data/business.ts` — adaptador de compatibilidad para componentes existentes.
- `src/content.config.ts` — schemas de Content Collections.
- `src/generated/template-data.ts` — salida generada por el importador.

Prioriza la configuración y los imports de datos en lugar de hardcodear valores del negocio en componentes. No edites manualmente archivos generados.

## Reglas de contenido

Los archivos de `src/references/` describen la voz y los datos del demo ficticio Plumbing Co. Léelos antes de editar ese contenido, pero no reutilices sus afirmaciones para otro cliente sin sustituirlas:

- `voice.md`
- `humour.md`
- `stats.md`
- `stories.md`
- `opinions.md`
- `used-keywords.md`

Para un proyecto nuevo, sustituye esas referencias por datos de marca, legales, factuales y editoriales específicos del cliente.

## Ubicación del contenido

- Artículos: `src/content/blog/*.md`
- Servicios: `src/content/services/*.md`
- Ejemplos de localidades: `examples/template-data/locations.csv`
- Contenido largo: Markdown/Content Collections, no celdas CSV excesivamente grandes.

El frontmatter debe coincidir con `src/content.config.ts`. Ejecuta `npm run check` después de modificar schemas o frontmatter.

## Componentes reutilizables

- Inicio: `src/components/home/`
- Blog: `src/components/blog/`
- SEO: `src/components/seo/`
- Estructura del sitio: `src/components/site/`

Mantén los componentes genéricos. Los textos, números, URLs, teléfonos y reseñas específicas deben estar en configuración o datos de contenido.

## SEO y despliegue

- El sitemap lo genera `@astrojs/sitemap` usando `site` en `astro.config.mjs`.
- `public/robots.txt` debe usar la URL real del sitemap de producción.
- Canonical, Open Graph y JSON-LD deben usar la URL real del sitio.
- No publiques dominios placeholder ni reseñas de demostración.
- Valida las páginas y enlaces generados antes del despliegue.
