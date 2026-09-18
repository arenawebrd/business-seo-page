import fs from 'node:fs/promises';
import path from 'node:path';

const inputDir = path.resolve('examples/template-data');
const outputFile = path.resolve('src/generated/template-data.ts');

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current);
  return result.map((item) => item.trim());
}

function parseCsv(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] ?? '';
    });
    return record;
  });
}

function toBoolean(value) {
  const normalized = String(value).trim().toLowerCase();
  if (['true', '1', 'yes', 'y'].includes(normalized)) return true;
  if (['false', '0', 'no', 'n'].includes(normalized)) return false;
  return Boolean(value);
}

function toNumber(value) {
  const normalized = String(value).trim();
  if (!normalized) return 0;
  return Number(normalized);
}

async function main() {
  await fs.mkdir(path.dirname(outputFile), { recursive: true });

  const entries = await fs.readdir(inputDir, { withFileTypes: true });
  const csvFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.csv'))
    .map((entry) => entry.name)
    .sort();

  if (csvFiles.length === 0) {
    throw new Error(`No se encontraron archivos CSV en ${inputDir}`);
  }

  const parsed = {};
  for (const fileName of csvFiles) {
    const filePath = path.join(inputDir, fileName);
    const content = await fs.readFile(filePath, 'utf8');
    const rows = parseCsv(content);

    const normalized = rows.length > 0 && Object.keys(rows[0]).length >= 2 &&
      ['field', 'value'].includes(Object.keys(rows[0])[0]?.toLowerCase?.() ?? '') &&
      ['field', 'value'].includes(Object.keys(rows[0])[1]?.toLowerCase?.() ?? '')
      ? Object.fromEntries(
          rows.map((row) => [String(row.field ?? row.key ?? row.name ?? '').trim(), String(row.value ?? row.val ?? '').trim()])
            .filter(([key]) => key)
        )
      : rows;

    parsed[path.basename(fileName, '.csv')] = normalized;
  }

  const business = parsed.business ?? {};
  const contact = parsed.contact ?? {};
  const services = Array.isArray(parsed.services) ? parsed.services : [];
  const locations = Array.isArray(parsed.locations) ? parsed.locations : [];

  const templateData = {
    site: {
      businessName: business.business_name ?? business.businessName ?? 'Tu nombre de negocio',
      legalName: business.legal_name ?? business.legalName ?? 'Tu negocio SL',
      siteUrl: business.site_url ?? business.siteUrl ?? 'https://example.com',
      locale: business.locale ?? 'en-AU',
      language: business.language ?? 'en',
      currency: business.currency ?? 'AUD',
      tagline: business.tagline ?? 'Tu slogan',
      description: business.description ?? 'Tu descripción',
      foundationYear: toNumber(business.founded ?? business.foundation_year ?? business.founded_year ?? 2024),
      jobsCompleted: toNumber(business.jobs_completed ?? business.jobsCompleted ?? 0),
      licenseNumber: business.license_number ?? business.licenseNumber ?? '',
      schemaType: business.schema_type ?? business.schemaType ?? 'LocalBusiness',
    },
    contact: {
      phoneDisplay: contact.phone_display ?? contact.phoneDisplay ?? '(00) 0000 0000',
      phoneE164: contact.phone_e164 ?? contact.phoneE164 ?? '+61000000000',
      email: contact.email ?? 'hello@example.com',
      whatsappEnabled: toBoolean(contact.whatsapp_enabled ?? contact.whatsappEnabled ?? true),
      whatsappNumber: contact.whatsapp_number ?? contact.whatsappNumber ?? '+61000000000',
      whatsappMessage: contact.whatsapp_message ?? contact.whatsappMessage ?? 'Hola, necesito ayuda.',
      contactFormEnabled: toBoolean(contact.contact_form_enabled ?? contact.contactFormEnabled ?? true),
      contactFormProvider: contact.contact_form_provider ?? contact.contactFormProvider ?? 'mailto',
    },
    services: services.map((service) => ({
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      priceFrom: service.price_from ?? service.priceFrom ?? '0',
      emergency: toBoolean(service.emergency),
      featured: toBoolean(service.featured),
    })),
    locations: locations.map((location) => ({
      slug: location.slug,
      name: location.name,
      tagline: location.tagline,
      description: location.description,
      distance: location.distance,
      indexable: toBoolean(location.indexable),
    })),
    raw: {
      business,
      contact,
      services,
      locations,
    },
  };

  const output = `// Este archivo se genera con scripts/import-template.mjs.
// No lo edites manualmente.

export const templateData = ${JSON.stringify(templateData, null, 2)} as const;

export type TemplateData = typeof templateData;
`;

  await fs.writeFile(outputFile, output, 'utf8');
  console.log(`Archivo generado: ${path.relative(process.cwd(), outputFile)}`);
}

main().catch((error) => {
  console.error('No se pudo generar el archivo de datos de la plantilla');
  console.error(error);
  process.exitCode = 1;
});
