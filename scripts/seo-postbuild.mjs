// Post-build SEO pass.
//
// The site is a client-rendered SPA, so crawlers that do not execute JS would
// otherwise see one identical <head> for every URL. This script takes the
// built dist/index.html and writes a copy per route with that route's title,
// description, canonical, social tags and JSON-LD baked in as static HTML —
// then emits sitemap.xml. The React app still hydrates normally on top.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  routes,
  getPageSeo,
  buildJsonLd,
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  LOCALE,
} from '../src/data/seo.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const START = '<!--seo:start';
const END = '<!--seo:end-->';

const escapeAttr = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function headFor(path) {
  const { title, description, noindex } = getPageSeo(path);
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
  const jsonLd = buildJsonLd(path);

  const tags = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${
      noindex
        ? 'noindex,follow'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    }" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:locale" content="${LOCALE}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];

  if (jsonLd) {
    // "</script>" inside JSON would close the tag early.
    const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" id="seo-jsonld">${json}</script>`);
  }

  return tags.map((tag) => `    ${tag}`).join('\n');
}

function sitemap(lastmod) {
  const urls = routes
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const template = await readFile(join(DIST, 'index.html'), 'utf8');
const start = template.indexOf(START);
const end = template.indexOf(END);

if (start === -1 || end === -1) {
  throw new Error('seo-postbuild: marker comments missing from dist/index.html');
}

const before = template.slice(0, start);
const after = template.slice(end + END.length);

for (const path of routes) {
  const html = `${before}${START} generated -->\n${headFor(path)}\n    ${END}${after}`;
  const target = path === '/' ? join(DIST, 'index.html') : join(DIST, path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  console.log(`seo-postbuild: wrote ${target.replace(DIST, 'dist')}`);
}

const today = new Date().toISOString().slice(0, 10);
await writeFile(join(DIST, 'sitemap.xml'), sitemap(today), 'utf8');
console.log(`seo-postbuild: wrote dist/sitemap.xml (${routes.length} urls, lastmod ${today})`);
