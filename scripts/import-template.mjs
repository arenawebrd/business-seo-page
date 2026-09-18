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

function normalizeRecord(record, keyMap = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(record)) {
    const targetKey = keyMap[key] ?? key;
    normalized[targetKey] = value;
  }
  return normalized;
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
    throw new Error(`No CSV files found in ${inputDir}`);
  }

  const parsed = {};
  for (const fileName of csvFiles) {
    const filePath = path.join(inputDir, fileName);
    const content = await fs.readFile(filePath, 'utf8');
    parsed[path.basename(fileName, '.csv')] = parseCsv(content);
  }

  const businessRows = parsed.business ?? [];
  const contactRows = parsed.contact ?? [];
  const servicesRows = parsed.services ?? [];
  const locationsRows = parsed.locations ?? [];

  const businessRecord = normalizeRecord(businessRows[0] ?? {}, {
    business_name: 'businessName',
    legal_name: 'legalName',
    site_url: 'siteUrl',
    license_number: 'licenseNumber',
    phone_display: 'phoneDisplay',
    phone_e164: 'phoneE164',
    whatsapp_number: 'whatsappNumber',
    whatsapp_message: 'whatsappMessage',
  });

  const contactRecord = normalizeRecord(contactRows[0] ?? {}, {
    phone_display: 'phoneDisplay',
    phone_e164: 'phoneE164',
    email: 'email',
    whatsapp_enabled: 'whatsappEnabled',
    whatsapp_number: 'whatsappNumber',
    whatsapp_message: 'whatsappMessage',
    contact_form_enabled: 'contactFormEnabled',
    contact_form_provider: 'contactFormProvider',
  });

  const templateData = {
    site: {
      businessName: businessRecord.businessName ?? 'Your business name',
      legalName: businessRecord.legalName ?? 'Your business name Pty Ltd',
      siteUrl: businessRecord.siteUrl ?? 'https://example.com',
      locale: businessRecord.locale ?? 'en-AU',
      language: businessRecord.language ?? 'en',
      currency: businessRecord.currency ?? 'AUD',
      tagline: businessRecord.tagline ?? 'Your tagline',
      description: businessRecord.description ?? 'Your business description',
      foundationYear: toNumber(businessRecord.founded ?? businessRecord.foundation_year ?? businessRecord.founded_year),
      jobsCompleted: toNumber(businessRecord.jobs_completed ?? businessRecord.jobsCompleted),
      licenseNumber: businessRecord.license_number ?? businessRecord.licenseNumber ?? '',
      schemaType: businessRecord.schema_type ?? 'LocalBusiness',
    },
    contact: {
      phoneDisplay: contactRecord.phoneDisplay ?? businessRecord.phoneDisplay ?? '(00) 0000 0000',
      phoneE164: contactRecord.phoneE164 ?? businessRecord.phoneE164 ?? '+61000000000',
      email: contactRecord.email ?? businessRecord.email ?? 'hello@example.com',
      whatsappEnabled: toBoolean(contactRecord.whatsappEnabled ?? true),
      whatsappNumber: contactRecord.whatsappNumber ?? businessRecord.whatsappNumber ?? '+61000000000',
      whatsappMessage: contactRecord.whatsappMessage ?? 'Hi, I need help.',
      contactFormEnabled: toBoolean(contactRecord.contactFormEnabled ?? true),
      contactFormProvider: contactRecord.contactFormProvider ?? 'mailto',
    },
    services: servicesRows.map((service) => ({
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      priceFrom: service.price_from ?? service.priceFrom ?? '0',
      emergency: toBoolean(service.emergency),
      featured: toBoolean(service.featured),
    })),
    locations: locationsRows.map((location) => ({
      slug: location.slug,
      name: location.name,
      tagline: location.tagline,
      description: location.description,
      distance: location.distance,
      indexable: toBoolean(location.indexable),
    })),
    raw: parsed,
  };

  const output = `// This file is generated by scripts/import-template.mjs.
// Do not edit manually.

export const templateData = ${JSON.stringify(templateData, null, 2)} as const;

export type TemplateData = typeof templateData;
`;

  await fs.writeFile(outputFile, output, 'utf8');
  console.log(`Generated ${path.relative(process.cwd(), outputFile)}`);
}

main().catch((error) => {
  console.error('Unable to generate template data');
  console.error(error);
  process.exitCode = 1;
});
