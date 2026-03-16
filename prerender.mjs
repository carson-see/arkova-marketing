/**
 * Prerender script — runs after `vite build` to inject SSR HTML into dist/.
 *
 * Build pipeline:
 *   1. `vite build`               → client bundle in dist/
 *   2. `vite build --ssr ...`     → server entry in dist/server/
 *   3. `node prerender.mjs`       → renders each route into its own HTML file
 *
 * Result: AI crawlers see full marketing content in the initial HTML response
 * instead of an empty <div id="root"></div>.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes to prerender — add new pages here
const ROUTES = [
  '/',
  '/research',
  '/research/anchoring-compliance-bitcoin',
  '/research/agentic-recordkeeping',
  '/research/convergence-stack',
  '/research/government-records',
  '/research/real-cost-of-audit-verification',
  '/whitepaper',
  '/roadmap',
  '/contact',
];

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

  // Import the server entry
  const { render } = await import(serverEntryPath);
  const template = fs.readFileSync(templatePath, 'utf-8');
  const rootDivPattern = /(<div\s+id="root"[^>]*>)(<\/div>)/;

  if (!rootDivPattern.test(template)) {
    console.error('ERROR: Could not find root div in dist/index.html');
    process.exit(1);
  }

  let totalH1 = 0;
  let totalH2 = 0;

  for (const route of ROUTES) {
    let appHtml;
    try {
      appHtml = render(route);
    } catch (err) {
      console.error(`ERROR: renderToString failed for route "${route}":`, err);
      process.exit(1);
    }

    const html = template.replace(rootDivPattern, `$1${appHtml}$2`);

    // Determine output path
    let outFile;
    if (route === '/') {
      outFile = path.resolve(distPath, 'index.html');
    } else {
      const dir = path.resolve(distPath, route.slice(1));
      fs.mkdirSync(dir, { recursive: true });
      outFile = path.resolve(dir, 'index.html');
    }

    fs.writeFileSync(outFile, html);

    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    const h2Count = (html.match(/<h2[\s>]/g) || []).length;
    totalH1 += h1Count;
    totalH2 += h2Count;

    console.log(`  ${route} → ${path.relative(distPath, outFile)} (${h1Count} h1, ${h2Count} h2)`);
  }

  console.log(`\nPrerender complete — ${ROUTES.length} routes, ${totalH1} h1, ${totalH2} h2 total`);

  if (totalH1 === 0 && totalH2 === 0) {
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
