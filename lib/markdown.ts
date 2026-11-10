import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";
import { createHighlighter } from "shiki";

export type Toc = { id: string; text: string }[];

const LANGS = new Set(["bash", "prisma", "sql", "ts", "yaml"]);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// One highlighter for every page rendered by this process.
let highlighter: ReturnType<typeof createHighlighter> | undefined;

/**
 * Renders one of our own trusted markdown files (path relative to content/) at build time.
 * h2 headings get ids and feed the table of contents; code is highlighted with shiki (no client JS);
 * a lone image becomes a <figure>; external links open in a new tab.
 */
export async function renderMarkdown(path: string): Promise<{ html: string; toc: Toc }> {
  const hl = await (highlighter ??= createHighlighter({ themes: ["github-light", "github-dark"], langs: [...LANGS] }));
  const toc: Toc = [];

  const md = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        if (depth !== 2) return `<h${depth}>${inner}</h${depth}>\n`;
        const text = tokens.map((t) => t.raw).join("").replace(/[`*]/g, "");
        const id = slugify(text);
        toc.push({ id, text });
        return `<h2 id="${id}">${inner}</h2>\n`;
      },
      code({ text, lang }) {
        const known = lang && LANGS.has(lang) ? lang : "text";
        const html = hl.codeToHtml(text, {
          lang: known,
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        });
        return `<div class="code" data-lang="${esc(lang || "text")}">${html}</div>\n`;
      },
      image({ href, text }) {
        return `<figure><img src="${esc(href)}" alt="${esc(text)}" loading="lazy"><figcaption>${esc(text)}</figcaption></figure>`;
      },
      paragraph({ tokens }) {
        const inner = this.parser.parseInline(tokens);
        // a lone image becomes a <figure>, which cannot sit inside a <p>
        return tokens.length === 1 && tokens[0].type === "image" ? inner : `<p>${inner}</p>\n`;
      },
    },
  });

  // The fixed "content" segment scopes the file trace to that folder, not the whole project.
  const html = (md.parse(readFileSync(join(process.cwd(), "content", path), "utf8"), { async: false }) as string)
    // github-dark comments (#6a737d) are 3.76:1 on the code background; #8b949e is 5.9:1
    .replace(/--shiki-dark:#6a737d/gi, "--shiki-dark:#8b949e")
    // external links open in a new tab, so readers keep their place
    .replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener noreferrer" href="$1');

  return { html, toc };
}
