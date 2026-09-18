# Plantilla SEO para negocios locales con Astro

Una plantilla reutilizable para negocios locales que necesitan un sitio rápido, estático y optimizado para SEO, con páginas de servicios, localidades, blog, datos estructurados y una capa de entrada basada en hojas de cálculo.

## Características

- Astro 5 + TypeScript + Tailwind CSS 4.
- Exportación estática para SEO y rendimiento.
- Configuración reutilizable en `src/config/`.
- Entrada basada en CSV exportados desde Excel o Google Sheets.
- Validación de datos con `npm run validate:data`.
- Importación y generación de datos con `npm run import:template`.
- Servicios, localidades, FAQs, testimonios, horarios y redes sociales como tablas de ejemplo.
- Datos estructurados preparados para negocios locales.
- Feature flags para activar o desactivar módulos.

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
npm run build
```

La salida se crea en `dist/`.

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
Astro
```

El sitio no depende de leer hojas de cálculo en producción. Los datos se procesan antes de generar el sitio, por lo que el resultado sigue siendo estático.

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

Los datos son de demostración y están basados en el ejemplo de Plumbing Co. Sustitúyelos antes de publicar un proyecto real.

## Estructura

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

## Comandos

| Comando | Función |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run check` | Ejecuta las comprobaciones de Astro |
| `npm run validate:data` | Valida las tablas CSV sin generar archivos |
| `npm run import:template` | Valida e importa los CSV |
| `npm run build` | Genera el sitio estático |
| `npm run preview` | Previsualiza la compilación |

## Crear un proyecto nuevo

1. Copia el repositorio.
2. Sustituye los archivos de `examples/template-data/` por los datos del nuevo negocio.
3. Revisa `src/config/site.ts` y las configuraciones de marca.
4. Ejecuta `npm run validate:data`.
5. Ejecuta `npm run import:template`.
6. Ejecuta `npm run check` y `npm run build`.
7. Revisa títulos, descripciones, enlaces, datos estructurados y contenido antes de publicar.

## Casos de uso

La plantilla puede adaptarse a fontaneros, electricistas, empresas de limpieza, cerrajeros, dentistas, clínicas, servicios del hogar y negocios de mantenimiento.

La demo visual original de fontanería continúa dentro del proyecto como referencia, pero el flujo de datos está pensado para reutilizarse en otros sectores.

## Documentación

- `docs/template-data.md`: formato de las tablas y flujo de importación.
- `CLAUDE.md`: reglas y convenciones del proyecto.
- `src/references/`: referencias de voz y contenido del ejemplo original.
