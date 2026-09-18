# Flujo de datos de la plantilla

Esta guía explica cómo preparar la entrada tabular que utiliza la plantilla Astro.

## Carpeta de entrada

Coloca los archivos CSV en:

```text
examples/template-data/
```

Tablas incluidas:

- `business.csv` — identidad, dominio, idioma, moneda y datos generales.
- `contact.csv` — teléfono, email, WhatsApp y formulario de contacto.
- `hours.csv` — horarios de apertura.
- `social.csv` — perfiles sociales y estado de cada enlace.
- `services.csv` — servicios, precios y flags de destacados/urgencias.
- `locations.csv` — localidades y datos de páginas locales.
- `location-services.csv` — relaciones entre localidades y servicios.
- `faqs.csv` — FAQs globales, por servicio o por localidad.
- `testimonials.csv` — testimonios y valoraciones.

## Comandos

```bash
npm install
npm run validate:data
npm run import:template
```

`validate:data` comprueba campos obligatorios, slugs, booleanos, URLs, formato de email, precios numéricos, slugs duplicados y referencias entre localidades y servicios.

`import:template` ejecuta la misma validación y después genera:

```text
src/generated/template-data.ts
```

No edites manualmente ese archivo generado. Edita los CSV y vuelve a ejecutar el importador.

## Flujo

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

El repositorio usa CSV como formato de intercambio porque se puede exportar desde Excel o Google Sheets. La aplicación no lee los CSV en runtime.

## Formatos

- Las tablas de configuración de un único registro usan `field,value`, con una configuración por fila.
- Las tablas de entidades usan una columna por campo y una fila por entidad.
- Los booleanos deben ser `true` o `false`.
- Los slugs usan minúsculas, números y guiones, por ejemplo `blocked-drains`.
- Los teléfonos internacionales usan formato E.164, por ejemplo `+61390418200`.
- Las URLs deben empezar por `http://` o `https://`.
- En una web real solo deben usarse testimonios reales y autorizados.

## Alcance actual

El importador valida y normaliza las tablas CSV en un único payload TypeScript generado. Todavía no genera archivos Markdown, no lee `.xlsx` directamente ni conecta con la API de Google Sheets.

## Crear un proyecto para un cliente

1. Copia los CSV de ejemplo.
2. Sustituye los datos de demostración.
3. Ejecuta `npm run validate:data`.
4. Corrige todos los errores de validación.
5. Ejecuta `npm run import:template`.
6. Actualiza la configuración del sitio y el contenido Markdown largo.
7. Ejecuta `npm run check` y `npm run build`.
