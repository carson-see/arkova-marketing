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
    // Title: ≤60 chars (SCRUM-940). Description: ≤160 chars (SCRUM-936).
    title: 'Arkova — Compliance Audit Automation in Hours, Not Weeks',
    description: 'Compliance audit automation in early access. Per-jurisdiction scoring, gap detection, remediation, and audit-ready export. Privacy-first. Join the pilot.',
  },
  {
    path: '/research',
    title: 'Research & Insights — Arkova',
    description: 'Analysis on compliance audit automation, multi-jurisdiction regulatory posture, agentic recordkeeping, and digital trust from the Arkova team.',
  },
  {
    path: '/research/anchoring-compliance-bitcoin',
    title: 'Anchoring Compliance to Bitcoin — Arkova Research',
    description: 'How proof-of-work networks can transform enterprise compliance from vendor promises to cryptographic proof. By Carson Seeger.',
    article: { author: 'Carson Seeger', datePublished: '2025-11-21', dateModified: '2025-11-21' },
  },
  {
    path: '/research/agentic-recordkeeping',
    title: 'Agentic Recordkeeping: Why Autonomous AI Needs Verifiable Audit Trails — Arkova Research',
    description: 'Traditional audit logs were built for humans. AI agents need cryptographic proof. Exploring the verification infrastructure gap.',
    article: { author: 'Carson Seeger', datePublished: '2026-01-15', dateModified: '2026-01-15' },
  },
  {
    path: '/research/convergence-stack',
    title: 'The Convergence Stack: Why Blockchain + AI Is Infrastructure, Not Hype — Arkova Research',
    description: 'AI generates content at superhuman speed. Blockchain proves it existed. The real intersection is simpler than the hype suggests.',
    article: { author: 'Carson Seeger', datePublished: '2026-02-12', dateModified: '2026-02-12' },
  },
  {
    path: '/research/government-records',
    title: 'Modernizing Government Records: Cryptographic Verification for Public Trust — Arkova Research',
    description: 'Government verification runs on phone calls and faxes. Cryptographic anchoring offers instant, independent, cross-jurisdiction proof.',
    article: { author: 'Carson Seeger', datePublished: '2026-03-10', dateModified: '2026-03-10' },
  },
  {
    path: '/research/rise-of-agentic-economy',
    title: 'The Rise of the Agentic Economy: How AI Agents Are Becoming Economic Participants — Arkova Research',
    description: 'AI agents are buying, selling, verifying, and transacting. A $7.3B market is building the payment rails, identity systems, and trust infrastructure autonomous agents need.',
    article: { author: 'Carson Seeger', datePublished: '2026-03-27', dateModified: '2026-03-27' },
  },
  {
    path: '/research/real-cost-of-audit-verification',
    title: 'The Real Cost of Audit Verification — Arkova Research',
    description: 'Audit fees average $3M but internal costs are 2-3x that. How blockchain and AI reduce the 1,000+ hours per year spent on evidence collection.',
    article: { author: 'Sarah Rushton', datePublished: '2026-03-16', dateModified: '2026-03-16' },
  },
  {
    path: '/research/state-of-compliance-2026',
    title: "The State of Compliance in 2026: Why More Frameworks Won't Fix the Evidence Problem — Arkova Research",
    description: 'Average audit fees for US large accelerated filers reached $6.06M in FY2024. Meanwhile NIST AI RMF, EU AI Act, DORA, SEC cybersecurity disclosure, and 19 US state privacy statutes have landed on top of the existing framework stack. By Sarah Rushton.',
    article: { author: 'Sarah Rushton', datePublished: '2026-04-26', dateModified: '2026-04-26' },
    ogImage: '/research/state-of-compliance-2026-og.png',
  },
  {
    path: '/whitepaper',
    title: 'Whitepaper: The Universal Verification Layer — Arkova',
    description: 'Technical whitepaper on how Arkova anchors compliance-aligned metadata to blockchain for independently verifiable records. Architecture, API, compliance.',
  },
  {
    path: '/roadmap',
    title: 'Roadmap — Arkova Compliance Audit Automation',
    description: "A short, honest two-phase roadmap: the cryptographic evidence layer Arkova runs in production today, and the compliance audit automation product we're building on top of it with pilot customers.",
  },
  {
    path: '/contact',
    title: 'Contact — Arkova',
    description: 'Get in touch with the Arkova team. Request early access to the compliance audit automation platform, discuss pilot deployments, or explore partnership opportunities.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Arkova',
    description: 'How Arkova protects your data. Documents never leave your device — fingerprinting is client-side, only PII-stripped metadata flows to our systems.',
  },
  {
    path: '/terms',
    title: 'Terms of Service — Arkova',
    description: 'Terms of service for the Arkova compliance audit automation platform. Governing usage, privacy guarantees, and API access.',
  },
  {
    path: '/docs',
    title: 'Documentation — Arkova',
    description: 'Arkova documentation hub. Whitepaper, technical wiki, API reference, compliance guides, and integration resources.',
  },
  {
    path: '/wiki',
    title: 'Technical & Security Wiki — Arkova',
    description: 'Architecture deep-dive for partners, investors, and integration teams. Security model, RLS policies, API reference, and shared responsibility matrix.',
  },
  {
    path: '/docs/quickstart',
    title: 'Quickstart — Arkova Docs',
    description: 'Verify your first credential in 5 minutes. Step-by-step guide from account creation to API integration.',
  },
  {
    path: '/docs/api',
    title: 'API Reference — Arkova Docs',
    description: 'Verification API endpoints, authentication, rate limits, response schemas, batch operations, and error codes.',
  },
  {
    path: '/docs/sdks',
    title: 'SDKs — Arkova Docs',
    description: 'Official TypeScript and Python SDKs for the Arkova Verification API. Typed interfaces, retry logic, and examples.',
  },
  {
    path: '/docs/webhooks',
    title: 'Webhooks — Arkova Docs',
    description: 'Real-time webhook event delivery. Setup, event types, HMAC signature verification, retry policy, and best practices.',
  },
  {
    path: '/docs/mcp',
    title: 'MCP Server — Arkova Docs',
    description: 'Connect AI agents to Arkova via Model Context Protocol. Configuration for Claude, GPT, and custom agents.',
  },
  {
    path: '/docs/faq',
    title: 'FAQ — Arkova Docs',
    description: 'Technical FAQ covering security, API integration, network anchoring, AI features, and billing.',
  },
  {
    path: '/docs/status',
    title: 'Status — Arkova Docs',
    description: 'System status, infrastructure overview, SLA targets, and incident response procedures.',
  },
  // GEO-14: 404 page prerendered to dist/404.html — Vercel serves with 404 status
  {
    path: '/404',
    title: '404 — Page Not Found | Arkova',
    description: 'The page you are looking for does not exist. Return to the Arkova document verification platform.',
    is404: true,
  },
];

/** Escape HTML special characters for safe injection into tags and attributes. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Serialize a value for embedding inside a <script type="application/ld+json">
 * tag. JSON.stringify alone leaves "</script>" literal in the output, which
 * the HTML parser would treat as an end-of-script delimiter regardless of
 * script type. Mirrors src/lib/safeJsonLd.ts (kept duplicated here so the
 * build script has no module dependency).
 */
const LS_PS_REGEX = new RegExp('[  ]', 'g');
function safeJsonLd(value) {
  return JSON.stringify(value, null, 2)
    .replace(/</g, '\\u003c')
    .replace(LS_PS_REGEX, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
}

function injectMeta(html, route) {
  const baseUrl = 'https://arkova.ai';
  const canonical = route.path === '/' ? baseUrl + '/' : baseUrl + route.path;
  const safeTitle = escapeHtml(route.title);
  const safeDescription = escapeHtml(route.description);

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${safeTitle}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${safeDescription}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${safeDescription}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${safeDescription}" />`
  );

  // Per-route OG image (falls back to global og-image.png if route has no ogImage)
  if (route.ogImage) {
    const absoluteOgImage = route.ogImage.startsWith('http')
      ? route.ogImage
      : baseUrl + route.ogImage;
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${absoluteOgImage}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${absoluteOgImage}" />`
    );
  }

  return html;
}

function buildWhitepaperSchema(route) {
  if (route.path !== '/whitepaper') return '';
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arkova.ai' },
      { '@type': 'ListItem', position: 2, name: 'Whitepaper', item: 'https://arkova.ai/whitepaper' },
    ],
  };
  return `\n    <script type="application/ld+json">\n    ${safeJsonLd(breadcrumb).replace(/\n/g, '\n    ')}\n    </script>`;
}

function buildArticleSchema(route) {
  if (!route.article) return '';
  const baseUrl = 'https://arkova.ai';
  const url = baseUrl + route.path;
  const headline = route.title.replace(' — Arkova Research', '');
  const authorLinkedIn = route.article.author === 'Sarah Rushton'
    ? 'https://www.linkedin.com/in/sljrushton/'
    : 'https://www.linkedin.com/in/carson-s-8b41061a/';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: route.description,
    url,
    datePublished: route.article.datePublished,
    dateModified: route.article.dateModified,
    author: {
      '@type': 'Person',
      name: route.article.author,
      sameAs: [authorLinkedIn],
    },
    publisher: { '@id': 'https://arkova.ai/#org' },
    mainEntityOfPage: url,
    image: baseUrl + '/arkova-logo.png',
    articleSection: 'Research',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article > p:first-of-type'],
    },
  };

  const slug = route.path.split('/').pop();
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Research', item: baseUrl + '/research' },
      { '@type': 'ListItem', position: 3, name: headline, item: url },
    ],
  };

  return `\n    <script type="application/ld+json">\n    ${safeJsonLd(articleSchema).replace(/\n/g, '\n    ')}\n    </script>\n    <script type="application/ld+json">\n    ${safeJsonLd(breadcrumbSchema).replace(/\n/g, '\n    ')}\n    </script>`;
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

    // Inject Article + BreadcrumbList JSON-LD for research articles
    const articleSchemas = buildArticleSchema(route);
    if (articleSchemas) {
      html = html.replace('</head>', articleSchemas + '\n  </head>');
    }

    // Inject BreadcrumbList for whitepaper page
    const whitepaperSchemas = buildWhitepaperSchema(route);
    if (whitepaperSchemas) {
      html = html.replace('</head>', whitepaperSchemas + '\n  </head>');
    }

    // Inject noindex for 404 page
    if (route.is404) {
      html = html.replace(
        /<meta\s+name="robots"[^>]*>/,
        '<meta name="robots" content="noindex, nofollow" />'
      );
    }

    let outFile;
    if (route.path === '/') {
      outFile = path.resolve(distPath, 'index.html');
    } else if (route.is404) {
      // GEO-14: write to dist/404.html — Vercel serves this with a 404 HTTP status
      outFile = path.resolve(distPath, '404.html');
    } else {
      const dir = path.resolve(distPath, route.path.slice(1));
      fs.mkdirSync(dir, { recursive: true });
      outFile = path.resolve(dir, 'index.html');
    }

    fs.writeFileSync(outFile, html);

    // Copy /404 page to dist/404.html so Vercel serves it for unknown routes
    if (route.path === '/404') {
      const notFoundFile = path.resolve(distPath, '404.html');
      fs.writeFileSync(notFoundFile, html);
      console.log(`  ${route.path} → 404.html (copy for Vercel)`);
    }

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
