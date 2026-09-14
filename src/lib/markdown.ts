type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export function parseMarkdown(src: string): Block[] {
  const lines = src.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const flushPara = (buffer: string[]) => {
    const text = buffer.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^##\s/.test(line)) {
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "").trim() });
      i++;
      continue;
    }
    if (/^###\s/.test(line)) {
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "").trim() });
      i++;
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const buffer: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^##?\s/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      buffer.push(lines[i]);
      i++;
    }
    flushPara(buffer);
  }

  return blocks;
}

function renderInline(text: string): string {
  let result = text;
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  result = result.replace(/`([^`]+)`/g, '<code class="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[0.9em]">$1</code>');
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const isExternal = /^https?:\/\//i.test(href);
    if (isExternal) {
      return `<a href="${href}" target="_blank" rel="noopener nofollow" class="text-brand underline-offset-4 hover:underline">${label}</a>`;
    }
    return `<a href="${href}" class="text-brand underline-offset-4 hover:underline">${label}</a>`;
  });
  return result;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type SectionImage = {
  file: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  pexelsUrl: string;
  width: number;
  height: number;
};

export function renderMarkdown(src: string, sectionImages: Record<string, SectionImage> = {}): string {
  const blocks = parseMarkdown(src);
  const items: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "h2": {
        const slug = slugifyHeading(b.text);
        const img = sectionImages[slug];
        if (img) {
          items.push(`<figure class="my-8">
  <img src="${img.file}" alt="${img.alt}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async" sizes="(min-width: 768px) 720px, 100vw" class="aspect-[16/9] w-full rounded-2xl object-cover shadow-card" />
  <figcaption class="mt-2 text-center text-[11px] text-ink/70">Photo by <a href="${img.photographerUrl}" target="_blank" rel="noopener nofollow" class="text-ink/80 underline-offset-4 hover:text-ink hover:underline">${img.photographer}</a> on <a href="${img.pexelsUrl}" target="_blank" rel="noopener nofollow" class="text-ink/80 underline-offset-4 hover:text-ink hover:underline">Pexels</a></figcaption>
</figure>`);
        }
        items.push(`<h2 id="${slug}">${renderInline(b.text)}</h2>`);
        break;
      }
      case "h3":
        items.push(`<h3>${renderInline(b.text)}</h3>`);
        break;
      case "p":
        items.push(`<p>${renderInline(b.text)}</p>`);
        break;
      case "ul":
        items.push(`<ul>${b.items.map((it) => `<li>${renderInline(it)}</li>`).join("")}</ul>`);
        break;
      case "ol":
        items.push(`<ol>${b.items.map((it) => `<li>${renderInline(it)}</li>`).join("")}</ol>`);
        break;
    }
  }
  return items.join("\n");
}
