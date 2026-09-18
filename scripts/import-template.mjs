import fs from 'node:fs/promises';
import path from 'node:path';

const inputDir = path.resolve('examples/template-data');

function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(',').map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const record = {};
    headers.forEach((header, index) => {
      record[header] = (values[index] ?? '').trim();
    });
    return record;
  });
}

async function main() {
  try {
    const entries = await fs.readdir(inputDir, { withFileTypes: true });
    const csvFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.csv'))
      .map((entry) => entry.name)
      .sort();

    if (csvFiles.length === 0) {
      console.log('No CSV files found in examples/template-data');
      return;
    }

    const parsed = {};
    for (const fileName of csvFiles) {
      const content = await fs.readFile(path.join(inputDir, fileName), 'utf8');
      parsed[path.basename(fileName, '.csv')] = parseCsv(content);
    }

    console.log(JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.error('Unable to import template data');
    console.error(error);
    process.exitCode = 1;
  }
}

main();
