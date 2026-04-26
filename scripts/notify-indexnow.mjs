#!/usr/bin/env node
/**
 * Notify IndexNow when new content ships.
 *
 * IndexNow is supported by Bing, Yandex, Seznam, and Naver. ChatGPT's web
 * search uses Bing's index, so faster Bing indexing → faster ChatGPT
 * citation visibility for new articles. Google does not support IndexNow
 * but observes the protocol.
 *
 * Usage:
 *   node scripts/notify-indexnow.mjs                 # all URLs from sitemap
 *   node scripts/notify-indexnow.mjs <url> [<url>]   # specific URLs
 *
 * Run AFTER a successful prod deploy (not on PR previews — those URLs are
 * authenticated and the IndexNow servers can't fetch them). The script is
 * intentionally separate from `npm run build` so we don't spam IndexNow
 * for every preview build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HOST = 'arkova.ai';
const KEY = '36d0d99309c2747ab4d0a0d8dd610551';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function urlsFromSitemap() {
  const sitemapPath = path.resolve(ROOT, 'dist', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`Sitemap not found at ${sitemapPath}. Run 'npm run build' first.`);
    process.exit(1);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

async function notify(urlList) {
  if (urlList.length === 0) {
    console.log('No URLs to notify. Exiting.');
    return;
  }
  if (urlList.length > 10000) {
    console.error('IndexNow accepts at most 10,000 URLs per request.');
    process.exit(1);
  }

  // Sanity: every URL must share the host of the key file
  const bad = urlList.filter((u) => {
    try {
      return new URL(u).hostname !== HOST;
    } catch {
      return true;
    }
  });
  if (bad.length > 0) {
    console.error(`URLs not on ${HOST}:`, bad.slice(0, 5));
    process.exit(1);
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`Notifying IndexNow about ${urlList.length} URL(s)...`);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // Per spec: 200 = OK, 202 = accepted (key validation pending), other = error
  if (res.status === 200 || res.status === 202) {
    console.log(`Success — ${res.status} ${res.statusText}`);
    if (urlList.length <= 10) {
      urlList.forEach((u) => console.log(`  ${u}`));
    } else {
      console.log(`  (${urlList.length} URLs)`);
    }
  } else {
    const text = await res.text().catch(() => '');
    console.error(`Failed — ${res.status} ${res.statusText}\n${text}`);
    process.exit(1);
  }
}

const argv = process.argv.slice(2);
const urls = argv.length > 0 ? argv : urlsFromSitemap();
notify(urls).catch((err) => {
  console.error('Error notifying IndexNow:', err);
  process.exit(1);
});
