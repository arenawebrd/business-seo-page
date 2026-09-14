import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    publishedAt: z.string(),
    readingMinutes: z.number(),
    primaryKeyword: z.string(),
    keywordCluster: z.array(z.string()),
    author: z.object({
      name: z.string(),
      role: z.string(),
      licence: z.string(),
      years: z.number(),
      bio: z.string(),
    }),
    heroImageAlt: z.string(),
    images: z.record(z.object({
      query: z.string(),
      alt: z.string(),
    })),
    tldr: z.string(),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    priceFrom: z.string(),
    emergency: z.boolean(),
    hero: z.object({
      heading: z.string(),
      sub: z.string(),
    }),
    trust: z.array(z.string()),
    problems: z.array(z.string()),
    included: z.array(z.string()),
    pricing: z.array(z.object({
      what: z.string(),
      price: z.string(),
    })),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })),
    testimonials: z.array(z.object({
      quote: z.string(),
      author: z.string(),
      suburb: z.string(),
    })),
  }),
});

export const collections = { blog, services };
