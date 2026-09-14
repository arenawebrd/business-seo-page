# CLAUDE.md — Instructions for working with this project

This file is the source of truth for how to work with the SEO_brief Astro project. Read it before any content generation or code task.

## Project overview

This is a static Astro site demonstrating the SEO workflow for a fictional Melbourne plumber (Plumbing Co). Six versions show progressive SEO implementation from scaffold to full technical SEO.

- **Stack:** Astro 5, TypeScript, Tailwind CSS 4
- **Output:** Static site to `dist/`
- **Content:** Markdown files in `src/content/blog/` and `src/content/services/`, managed via Content Collections
- **Data:** TypeScript files in `src/data/` for structured content (business info, service data)
- **Components:** Astro components in `src/components/`

## Before writing content

Read these files FIRST:

1. `src/references/voice.md` — Marco's writing style
2. `src/references/humour.md` — Joke frequency and anti-patterns
3. `src/references/stats.md` — Canonical numbers (don't invent your own)
4. `src/references/stories.md` — Recurring anecdotes (use sparingly)
5. `src/references/opinions.md` — Industry opinions

These define the voice layer. Content that doesn't match these is wrong.

## Content structure

### Blog posts

Blog posts live in `src/content/blog/` as `.md` files. Each post has frontmatter matching the blog collection schema in `src/content.config.ts`:

```yaml
---
title: "Post title"
description: "Meta description"
slug: "post-slug"
publishedAt: "2024-01-15"
readingMinutes: 6
primaryKeyword: "primary keyword"
keywordCluster: ["related", "keywords"]
author:
  name: "Marco Reyes"
  role: "Licensed Plumber"
  licence: "VIC-PL-48217"
  years: 14
  bio: "Bio here"
heroImageAlt: "Alt text"
images:
  hero:
    query: "search query"
    alt: "alt text"
tldr: "One sentence summary"
faqs:
  - q: "Question"
    a: "Answer"
---
```

Body content follows frontmatter. Use standard markdown with headings (##, ###), paragraphs, lists, bold/italic as needed.

### Services

Services live in `src/content/services/` as `.md` files. Frontmatter matches the services collection schema:

```yaml
---
title: "Service title"
slug: "service-slug"
tagline: "Short tagline"
priceFrom: "$149"
emergency: false
hero:
  heading: "Hero heading"
  sub: "Hero subheading"
trust:
  - "Licence VIC-PL-48217"
  - "12-month workmanship warranty"
  - "No call-out fee"
problems:
  - "Problem 1"
  - "Problem 2"
included:
  - "Included item 1"
pricing:
  - what: "Service option"
    price: "$149 all-in"
faqs:
  - q: "Question"
    a: "Answer"
testimonials:
  - quote: "Customer quote"
    author: "Name"
    suburb: "Suburb"
---
```

### Collections config

The Content Collections schema is defined in `src/content.config.ts`. Don't change the schema without understanding the impact on all existing content. The schema validates frontmatter on build.

## Data files

- `src/data/business.ts` — Business info (name, address, phone, hours, service areas, socials, review). This is the single source of truth for business data. Import it where needed.
- `src/data/toilet-repair.ts` — Structured data for the toilet repair service page. Used by `src/pages/v4/index.astro`.

## Components

### Home components (`src/components/home/`)

- `Hero.astro` — Homepage hero with call to action
- `FeatureGrid.astro` — Service feature grid (5 services)
- `HowItWorks.astro` — 3-step process section
- `Testimonials.astro` — 3 customer testimonials
- `ServiceAreas.astro` — Service areas list
- `FinalCta.astro` — Final call to action section

### Blog components (`src/components/blog/`)

- `AuthorCard.astro` — Author bio card with initials avatar
- `BackToTop.astro` — Floating back-to-top button (appears on scroll)
- `BlogBody.astro` — Article wrapper with title, author info, and slot for content
- `Breadcrumbs.astro` — Breadcrumb navigation
- `FAQ.astro` — FAQ section with collapsible details
- `SectionImage.astro` — Responsive image with optional caption
- `TableOfContents.astro` — Sidebar table of contents (links to section IDs)
- `VersionBanner.astro` — Small version/chapter label

### SEO components (`src/components/seo/`)

- `BlogJsonLd.astro` — JSON-LD structured data for blog posts
- `LocalBusinessJsonLd.astro` — JSON-LD for LocalBusiness schema
- `OrganizationJsonLd.astro` — JSON-LD for Organization schema
- `TechSeoScorecard.astro` — Technical SEO scorecard display

### Site components (`src/components/site/`)

- `Header.astro` — Sticky header with navigation and call button
- `Footer.astro` — Footer with links and business info
- `Logo.astro` — SVG logo mark + name
- `VersionSwitcher.astro` — Version navigation for demo pages

## Pages

### Content pages

- `src/pages/index.astro` — Homepage (six-version demo + real site structure)
- `src/pages/about/index.astro` — About page
- `src/pages/contact/index.astro` — Contact page
- `src/pages/services/index.astro` — Services listing
- `src/pages/services/[slug].astro` — Individual service page
- `src/pages/blog/index.astro` — Blog listing
- `src/pages/blog/[slug].astro` — Individual blog post
- `src/pages/blog/why-your-toilet-keeps-running.astro` — Specific blog post (legacy, kept for reference)

### Demo version pages

- `src/pages/v1/index.astro` — Scaffolded site demo
- `src/pages/v2/index.astro` — AI blog slop demo
- `src/pages/v3/index.astro` — Voice-injected demo
- `src/pages/v4/index.astro` — Service landing page demo (Baldwin Park)
- `src/pages/v5/index.astro` — On-page SEO demo
- `src/pages/v6/index.astro` — Technical SEO demo

## Tech SEO

- Sitemap is generated automatically by `@astrojs/sitemap` based on `site` in `astro.config.mjs`
- Robots.txt is in `public/robots.txt`
- OG images and favicons are in `public/`
- JSON-LD structured data is in the SEO components — include relevant ones on each page

## When in doubt

1. Check if a similar component or page already exists
2. Read the relevant reference file in `src/references/`
3. Check `src/data/business.ts` for canonical business data
4. Import from `src/data/` rather than hardcoding business info in components
5. Use the Content Collections schema to validate new content

## File conventions

- Astro components use `.astro` extension
- Markdown content uses `.md` extension
- TypeScript data files use `.ts` extension
- Components are named with PascalCase (e.g., `AuthorCard.astro`)
- Pages use kebab-case for slugs (e.g., `why-your-toilet-keeps-running`)
- Directory structure mirrors the routes that render them
