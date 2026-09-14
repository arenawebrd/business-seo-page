// fetch-pexels.mjs — Download hero + section images from Pexels for blog posts
// Set PEXEL_API in .env and run: node scripts/fetch-pexels.mjs

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PEXEL_API = process.env.PEXEL_API;

if (!PEXEL_API) {
  console.error('Set PEXEL_API in .env before running');
  process.exit(1);
}

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  image: string;
  photographer: string;
  photographer_url: string;
}

interface PexelsSearchResult {
  total_results: number;
  photos: PexelsPhoto[];
}

async function searchPexels(query: string): Promise<PexelsPhoto[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`;
  const response = await fetch(url, {
    headers: { Authorization: PEXEL_API },
  });
  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }
  const data: PexelsSearchResult = await response.json();
  return data.photos;
}

async function downloadImage(url: string, dest: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(dest, buffer);
}

async function main() {
  const posts = [
    {
      slug: 'why-your-toilet-keeps-running',
      hero: 'toilet cistern flush mechanism',
      sections: ['plumber hands working', 'toilet flapper valve', 'bathroom plumbing'],
    },
    {
      slug: 'low-water-pressure',
      hero: 'low water pressure shower',
      sections: ['water pressure gauge', 'plumber fixing tap', 'corroded pipes'],
    },
    {
      slug: 'blocked-drain',
      hero: 'blocked sink drain',
      sections: ['plumber unclogging drain', 'drain snake', 'tree roots pipe'],
    },
  ];

  for (const post of posts) {
    const baseDir = join(__dirname, '..', 'public', 'images', 'blog', post.slug);
    await mkdir(baseDir, { recursive: true });

    console.log(`Fetching images for ${post.slug}...`);

    // Hero image
    const heroPhotos = await searchPexels(post.hero);
    if (heroPhotos.length > 0) {
      await downloadImage(heroPhotos[0].image, join(baseDir, 'hero.jpg'));
      console.log(`  ✓ hero.jpg`);
    }

    // Section images
    for (let i = 0; i < post.sections.length; i++) {
      const sectionPhotos = await searchPexels(post.sections[i]);
      if (sectionPhotos.length > 0) {
        const sectionName = post.sections[i].replace(/\s+/g, '-').toLowerCase();
        await downloadImage(sectionPhotos[0].image, join(baseDir, `${sectionName}.jpg`));
        console.log(`  ✓ ${sectionName}.jpg`);
      }
    }
  }

  console.log('\nDone! Images saved to public/images/blog/');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
