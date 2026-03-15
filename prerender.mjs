/**
 * Prerender script — runs after `vite build` to inject SSR HTML into dist/index.html.
 *
 * Build pipeline:
 *   1. `vite build`               → client bundle in dist/
 *   2. `vite build --ssr ...`     → server entry in dist/server/
 *   3. `node prerender.mjs`       → injects rendered HTML into dist/index.html
 *
 * Result: AI crawlers see full marketing content in the initial HTML response
 * instead of an empty <div id="root"></div>.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  const distPath = path.resolve(__dirname, 'dist');
  const templatePath = path.resolve(distPath, 'index.html');
  const serverEntryPath = path.resolve(distPath, 'server', 'entry-server.js');

  // Validate build outputs exist
  if (!fs.existsSync(templatePath)) {
    console.error('ERROR: dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  if (!fs.existsSync(serverEntryPath)) {
    console.error('ERROR: dist/server/entry-server.js not found. Run `vite build --ssr` first.');
    process.exit(1);
  }

  // Import the server entry and render
  const { render } = await import(serverEntryPath);
  const appHtml = render();

  // Read the client-built HTML template
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Inject the prerendered HTML into the root div
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  // Write back
  fs.writeFileSync(templatePath, html);

  // Verify content was injected
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  const h2Count = (html.match(/<h2[\s>]/g) || []).length;
  const pCount = (html.match(/<p[\s>]/g) || []).length;

  console.log(`Prerender complete — ${h1Count} h1, ${h2Count} h2, ${pCount} p tags in output`);

  if (h1Count === 0 && h2Count === 0) {
    console.error('WARNING: No heading tags found in prerendered output. SSR may have failed.');
    process.exit(1);
  }

  // Clean up server build (not needed in production)
  fs.rmSync(path.resolve(distPath, 'server'), { recursive: true, force: true });
  console.log('Cleaned up dist/server/');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
