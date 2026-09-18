# Plantilla de datos basada en hojas de cálculo

Esta carpeta contiene datos de ejemplo para probar el importador y servir como plantilla para nuevos proyectos.

## Archivos incluidos

- `business.csv`: identidad, dominio, idioma, moneda y datos generales.
- `contact.csv`: teléfono, email, WhatsApp y proveedor del formulario.
- `hours.csv`: horarios de apertura.
- `social.csv`: perfiles sociales y estado de cada enlace.
- `services.csv`: servicios, precios y servicios destacados.
- `locations.csv`: localidades y páginas locales.
- `location-services.csv`: relación entre localidades y servicios.
- `faqs.csv`: preguntas frecuentes globales, por servicio o por localidad.
- `testimonials.csv`: testimonios y valoraciones.

## Uso rápido

```bash
npm install
npm run validate:data
npm run import:template
npm run dev
```

`validate:data` comprueba campos obligatorios, slugs, booleanos, URLs, emails y referencias entre localidades y servicios. El comando de importación ejecuta esa validación antes de generar:

```text
src/generated/template-data.ts
```

## Flujo

```text
Excel / Google Sheet / CSV
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

El repositorio usa CSV como formato de entrada porque es fácil de exportar desde Excel o Google Sheets. El código no lee el CSV en runtime: los datos se transforman durante el desarrollo o el build y el sitio sigue siendo estático.

## Formatos

- Los archivos de configuración de una sola fila usan `field,value`.
- Las tablas de entidades usan una columna por campo.
- Los booleanos aceptan `true` o `false`.
- Los slugs deben usar minúsculas, números y guiones, por ejemplo `blocked-drains`.
- Los teléfonos internacionales deben usar formato E.164, por ejemplo `+61390418200`.
- Las URLs deben empezar por `http://` o `https://`.
- No uses datos falsos de reseñas en un proyecto real: los testimonios deben tener autorización.

## Pendiente

La base actual valida y normaliza los datos tabulares, pero todavía puede ampliarse para generar automáticamente contenido Markdown de servicios y localidades, importar archivos `.xlsx` directamente y conectar con Google Sheets mediante API.
