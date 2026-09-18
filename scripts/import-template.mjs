import fs from 'node:fs/promises';
import path from 'node:path';

const inputDir = path.resolve('examples/template-data');
const outputFile = path.resolve('src/generated/template-data.ts');
const validateOnly = process.argv.includes('--validate-only');

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

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    const record = { __row: index + 2 };
    headers.forEach((header, valueIndex) => {
      record[header] = values[valueIndex] ?? '';
    });
    return record;
  });
}

function isKeyValueTable(rows) {
  if (!rows.length) return false;
  const keys = Object.keys(rows[0]).filter((key) => key !== '__row').map((key) => key.toLowerCase());
  return keys.includes('field') && keys.includes('value');
}

function normalizeRows(rows) {
  if (!isKeyValueTable(rows)) return rows;

  return Object.fromEntries(
    rows
      .map((row) => [String(row.field ?? '').trim(), String(row.value ?? '').trim()])
      .filter(([key]) => key),
  );
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

function required(value, label, errors) {
  if (!String(value ?? '').trim()) errors.push(`${label} es obligatorio`);
}

function validateBoolean(value, label, errors) {
  if (!['true', 'false', '1', '0', 'yes', 'no', 'y', 'n'].includes(String(value).trim().toLowerCase())) {
    errors.push(`${label} debe ser true o false`);
  }
}

function validateUrl(value, label, errors) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
  } catch {
    errors.push(`${label} debe ser una URL http o https válida`);
  }
}

function validateData(data) {
  const errors = [];
  const business = data.business ?? {};
  const contact = data.contact ?? {};
  const services = data.services ?? [];
  const locations = data.locations ?? [];
  const faqs = data.faqs ?? [];
  const testimonials = data.testimonials ?? [];
  const social = data.social ?? [];

  for (const field of ['business_name', 'legal_name', 'site_url', 'description']) {
    required(business[field], `business.${field}`, errors);
  }
  validateUrl(business.site_url, 'business.site_url', errors);
  required(contact.phone_e164, 'contact.phone_e164', errors);
  required(contact.email, 'contact.email', errors);
  if (contact.email && !/^\S+@\S+\.\S+$/.test(contact.email)) errors.push('contact.email no es válido');

  const validateUniqueSlugs = (rows, label) => {
    const seen = new Set();
    rows.forEach((row, index) => {
      required(row.slug, `${label}[${index + 1}].slug`, errors);
      if (row.slug && seen.has(row.slug)) errors.push(`${label} tiene el slug duplicado: ${row.slug}`);
      if (row.slug) seen.add(row.slug);
      if (row.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) {
        errors.push(`${label}[${index + 1}].slug debe usar minúsculas y guiones`);
      }
    });
  };

  validateUniqueSlugs(services, 'services');
  validateUniqueSlugs(locations, 'locations');

  services.forEach((service, index) => {
    required(service.title, `services[${index + 1}].title`, errors);
    required(service.tagline, `services[${index + 1}].tagline`, errors);
    validateBoolean(service.emergency, `services[${index + 1}].emergency`, errors);
    validateBoolean(service.featured, `services[${index + 1}].featured`, errors);
    if (service.price_from && Number.isNaN(Number(service.price_from))) errors.push(`services[${index + 1}].price_from debe ser numérico`);
  });

  locations.forEach((location, index) => {
    required(location.name, `locations[${index + 1}].name`, errors);
    required(location.description, `locations[${index + 1}].description`, errors);
    validateBoolean(location.indexable, `locations[${index + 1}].indexable`, errors);
  });

  social.forEach((account, index) => {
    required(account.platform, `social[${index + 1}].platform`, errors);
    if (account.url) validateUrl(account.url, `social[${index + 1}].url`, errors);
    validateBoolean(account.enabled, `social[${index + 1}].enabled`, errors);
  });

  const serviceSlugs = new Set(services.map((service) => service.slug));
  const locationSlugs = new Set(locations.map((location) => location.slug));
  data.locationServices.forEach((relation, index) => {
    if (!locationSlugs.has(relation.location_slug)) errors.push(`location-services[${index + 1}] referencia una ubicación inexistente: ${relation.location_slug}`);
    if (!serviceSlugs.has(relation.service_slug)) errors.push(`location-services[${index + 1}] referencia un servicio inexistente: ${relation.service_slug}`);
  });

  faqs.forEach((faq, index) => {
    required(faq.scope, `faqs[${index + 1}].scope`, errors);
    required(faq.question, `faqs[${index + 1}].question`, errors);
    required(faq.answer, `faqs[${index + 1}].answer`, errors);
  });

  testimonials.forEach((testimonial, index) => {
    required(testimonial.quote, `testimonials[${index + 1}].quote`, errors);
    required(testimonial.author, `testimonials[${index + 1}].author`, errors);
    if (testimonial.rating && (Number(testimonial.rating) < 1 || Number(testimonial.rating) > 5)) {
      errors.push(`testimonials[${index + 1}].rating debe estar entre 1 y 5`);
    }
  });

  if (errors.length) {
    throw new Error(`Validación de datos fallida:\n- ${errors.join('\n- ')}`);
  }
}

async function readTables() {
  const entries = await fs.readdir(inputDir, { withFileTypes: true });
  const csvFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.csv'))
    .map((entry) => entry.name)
    .sort();

  if (!csvFiles.length) throw new Error(`No se encontraron archivos CSV en ${inputDir}`);

  const parsed = {};
  for (const fileName of csvFiles) {
    const content = await fs.readFile(path.join(inputDir, fileName), 'utf8');
    parsed[path.basename(fileName, '.csv')] = normalizeRows(parseCsv(content));
  }
  return parsed;
}

async function main() {
  const parsed = await readTables();
  validateData({
    business: parsed.business,
    contact: parsed.contact,
    social: parsed.social ?? [],
    services: parsed.services ?? [],
    locations: parsed.locations ?? [],
    locationServices: parsed['location-services'] ?? [],
    faqs: parsed.faqs ?? [],
    testimonials: parsed.testimonials ?? [],
  });

  if (validateOnly) {
    console.log('Datos CSV válidos.');
    return;
  }

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  const business = parsed.business ?? {};
  const contact = parsed.contact ?? {};
  const services = Array.isArray(parsed.services) ? parsed.services : [];
  const locations = Array.isArray(parsed.locations) ? parsed.locations : [];

  const templateData = {
    site: {
      businessName: business.business_name ?? 'Tu nombre de negocio',
      legalName: business.legal_name ?? 'Tu negocio',
      siteUrl: business.site_url ?? 'https://example.com',
      locale: business.locale ?? 'es-ES',
      language: business.language ?? 'es',
      currency: business.currency ?? 'EUR',
      tagline: business.tagline ?? 'Tu slogan',
      description: business.description ?? 'Tu descripción',
      foundationYear: toNumber(business.founded),
      jobsCompleted: toNumber(business.jobs_completed),
      licenseNumber: business.license_number ?? '',
      schemaType: business.schema_type ?? 'LocalBusiness',
    },
    contact: {
      phoneDisplay: contact.phone_display ?? '(00) 000 000 000',
      phoneE164: contact.phone_e164 ?? '+34000000000',
      email: contact.email ?? 'hola@example.com',
      whatsappEnabled: toBoolean(contact.whatsapp_enabled ?? false),
      whatsappNumber: contact.whatsapp_number ?? '',
      whatsappMessage: contact.whatsapp_message ?? 'Hola, necesito ayuda.',
      contactFormEnabled: toBoolean(contact.contact_form_enabled ?? true),
      contactFormProvider: contact.contact_form_provider ?? 'mailto',
    },
    hours: parsed.hours ?? [],
    social: parsed.social ?? [],
    features: parsed.features ?? [],
    services: services.map((service) => ({
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      priceFrom: service.price_from ?? '0',
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
    locationServices: parsed['location-services'] ?? [],
    faqs: parsed.faqs ?? [],
    testimonials: parsed.testimonials ?? [],
    raw: parsed,
  };

  const output = `// Este archivo se genera con scripts/import-template.mjs.\n// No lo edites manualmente.\n\nexport const templateData = ${JSON.stringify(templateData, null, 2)} as const;\n\nexport type TemplateData = typeof templateData;\n`;
  await fs.writeFile(outputFile, output, 'utf8');
  console.log(`Archivo generado: ${path.relative(process.cwd(), outputFile)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
