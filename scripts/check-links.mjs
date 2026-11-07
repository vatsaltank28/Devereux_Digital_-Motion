#!/usr/bin/env node
/**
 * Link & anchor checker. Crawls every route in /sitemap.xml (plus the legal pages and a 404 probe),
 * collects every <a href>, and verifies:
 *   • internal links return 200
 *   • "#anchor" / "/path#anchor" targets exist on the destination page
 *   • no empty, "#" or javascript: hrefs
 *
 * Usage:  npm run build && npm start   (in one terminal)
 *         npm run check:links          (in another)   [BASE_URL=http://localhost:3000 by default]
 */
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const get = async (path) => {
  const res = await fetch(BASE + path, { redirect: "follow" });
  return { status: res.status, html: res.headers.get("content-type")?.includes("html") ? await res.text() : "" };
};

const sitemap = await get("/sitemap.xml");
const routes = new Set(["/", "/privacy", "/terms"]);
for (const m of (await (await fetch(BASE + "/sitemap.xml")).text()).matchAll(/<loc>([^<]+)<\/loc>/g)) {
  routes.add(new URL(m[1]).pathname);
}
if (sitemap.status !== 200) throw new Error(`sitemap.xml returned ${sitemap.status}`);

const pages = new Map(); // path -> { html, ids:Set }
const problems = [];

for (const path of routes) {
  const { status, html } = await get(path);
  if (status !== 200) {
    problems.push(`${path} → HTTP ${status}`);
    continue;
  }
  pages.set(path, { html, ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])) });
}

const checked = new Map(); // href -> status
let linkCount = 0;
for (const [path, { html }] of pages) {
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]*)"/g)) {
    const raw = m[1].replaceAll("&amp;", "&");
    linkCount++;
    if (raw === "" || raw === "#" || raw.startsWith("javascript:")) {
      problems.push(`${path}: empty/placeholder href "${raw}"`);
      continue;
    }
    if (/^(mailto:|tel:)/.test(raw)) continue;
    if (/^https?:\/\//.test(raw) && !raw.startsWith(BASE)) continue; // external — not checked

    const url = new URL(raw, BASE + path);
    const target = url.pathname;
    if (!checked.has(target)) checked.set(target, (await get(target)).status);
    if (checked.get(target) !== 200) problems.push(`${path}: ${raw} → HTTP ${checked.get(target)}`);

    if (url.hash.length > 1) {
      const ids = (pages.get(target) ?? { ids: new Set((await get(target)).html.matchAll(/\sid="([^"]+)"/g)) }).ids;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!(ids instanceof Set ? ids.has(id) : [...ids].some((x) => x[1] === id))) problems.push(`${path}: anchor ${raw} not found on ${target}`);
    }
  }
}

const missing = await get("/this-route-should-not-exist");
if (missing.status !== 404) problems.push(`unknown route returned ${missing.status}, expected 404`);

console.log(`Pages crawled: ${pages.size} · links inspected: ${linkCount} · unique internal targets: ${checked.size}`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(" ✗ " + p);
  process.exit(1);
}
console.log("✓ No broken links, dead anchors or placeholder hrefs.");
