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
 *
 * Also injects per-page meta tags (title, description, canonical, OG) to fix
 * the critical SEO issue where all pages shared the homepage's meta tags.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes to prerender with per-page meta data
const ROUTES = [
  {
    path: '/',
    title: 'Arkova — Issue Once. Verify Forever.',
    description: 'Arkova uses AI and blockchain to create tamper-proof, independently verifiable records of your documents. Files never leave your device. Free tier available.',
  },
  {
    path: '/research',
    title: 'Research & Insights — Arkova',
    description: 'Analysis on document verification, compliance infrastructure, agentic recordkeeping, and digital trust from the Arkova team.',
  },
  {
    path: '/research/anchoring-compliance-bitcoin',
    title: 'Anchoring Compliance to Bitcoin — Arkova Research',
    description: 'How proof-of-work networks can transform enterprise compliance from vendor promises to cryptographic proof. By Carson Seeger.',
  },
  {
    path: '/research/agentic-recordkeeping',
    title: 'Agentic Recordkeeping: Why Autonomous AI Needs Verifiable Audit Trails — Arkova Research',
    description: 'Traditional audit logs were built for humans. AI agents need cryptographic proof. Exploring the verification infrastructure gap.',
  },
  {
    path: '/research/convergence-stack',
    title: 'The Convergence Stack: Why Blockchain + AI Is Infrastructure, Not Hype — Arkova Research',
    description: 'AI generates content at superhuman speed. Blockchain proves it existed. The real intersection is simpler than the hype suggests.',
  },
  {
    path: '/research/government-records',
    title: 'Modernizing Government Records: Cryptographic Verification for Public Trust — Arkova Research',
    description: 'Government verification runs on phone calls and faxes. Cryptographic anchoring offers instant, independent, cross-jurisdiction proof.',
  },
  {
    path: '/research/real-cost-of-audit-verification',
    title: 'The Real Cost of Audit Verification — Arkova Research',
    description: 'Audit fees average $3M but internal costs are 2-3x that. How blockchain and AI reduce the 1,000+ hours per year spent on evidence collection.',
  },
  {
    path: '/whitepaper',
    title: 'Whitepaper: The Universal Verification Layer — Arkova',
    description: 'Technical whitepaper on how Arkova anchors compliance-aligned metadata to blockchain for independently verifiable records. Architecture, API, compliance.',
  },
  {
    path: '/roadmap',
    title: 'Product Roadmap — Arkova',
    description: 'From credential verification to institutional attestations to legally recognized e-signatures. Arkova\'s phased approach to trustless compliance infrastructure.',
  },
  {
    path: '/contact',
    title: 'Contact — Arkova',
    description: 'Get in touch with the Arkova team. Request early access, discuss enterprise deployments, or explore partnership opportunities.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Arkova',
    description: 'How Arkova protects your data. Documents never leave your device. Learn about our cryptographic fingerprinting privacy model.',
  },
  {
    path: '/terms',
    title: 'Terms of Service — Arkova',
    description: 'Terms of service for the Arkova document verification platform. Governing usage, privacy guarantees, and verification API access.',
  },
];

function injectMeta(html, route) {
  const baseUrl = 'https://arkova.ai';
  const canonical = route.path === '/' ? baseUrl + '/' : baseUrl + route.path;

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  return html;
}

async function prerender() {
  const distPath = path.resolve(__dirname, 'dist');
  const templatePath = path.resolve(distPath, 'index.html');
  const serverEntryPath = path.resolve(distPath, 'server', 'entry-server.js');

  if (!fs.existsSync(templatePath)) {
    console.error('ERROR: dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  if (!fs.existsSync(serverEntryPath)) {
    console.error('ERROR: dist/server/entry-server.js not found. Run `vite build --ssr` first.');
    process.exit(1);
  }

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
      appHtml = render(route.path);
    } catch (err) {
      console.error(`ERROR: renderToString failed for route "${route.path}":`, err);
      process.exit(1);
    }

    let html = template.replace(rootDivPattern, `$1${appHtml}$2`);

    // Inject per-page meta tags (title, description, canonical, OG, Twitter)
    html = injectMeta(html, route);

    let outFile;
    if (route.path === '/') {
      outFile = path.resolve(distPath, 'index.html');
    } else {
      const dir = path.resolve(distPath, route.path.slice(1));
      fs.mkdirSync(dir, { recursive: true });
      outFile = path.resolve(dir, 'index.html');
    }

    fs.writeFileSync(outFile, html);

    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    const h2Count = (html.match(/<h2[\s>]/g) || []).length;
    totalH1 += h1Count;
    totalH2 += h2Count;

    console.log(`  ${route.path} → ${path.relative(distPath, outFile)} (${h1Count} h1, ${h2Count} h2)`);
  }

  console.log(`\nPrerender complete — ${ROUTES.length} routes, ${totalH1} h1, ${totalH2} h2 total`);

  if (totalH1 === 0 && totalH2 === 0) {
    console.error('WARNING: No heading tags found in prerendered output. SSR may have failed.');
    process.exit(1);
  }

  fs.rmSync(path.resolve(distPath, 'server'), { recursive: true, force: true });
  console.log('Cleaned up dist/server/');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
