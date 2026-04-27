/**
 * WebMCP — exposes a small set of marketing-site tools to AI agents in the browser
 * via the WebMCP API (navigator.modelContext.provideContext).
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 *
 * The tools are intentionally scoped to the marketing site: navigation, research
 * discovery, and the llms.txt summary. They do NOT proxy the verification API —
 * agents that want to call the API directly should use the MCP server at
 * https://edge.arkova.ai/mcp (described in /.well-known/mcp/server-card.json) or
 * the HTTP API at https://app.arkova.ai/api/v1 (described in /.well-known/api-catalog).
 *
 * Loaded with `defer` so it runs after parse but before DOMContentLoaded — early
 * enough that agents inspecting the page right after load can discover the tools.
 */
(function () {
  'use strict';

  if (
    typeof navigator === 'undefined' ||
    !navigator.modelContext ||
    typeof navigator.modelContext.provideContext !== 'function'
  ) {
    return;
  }

  var PAGES = {
    home: '/',
    research: '/research',
    whitepaper: '/whitepaper',
    docs: '/docs',
    'docs.api': '/docs/api',
    'docs.mcp': '/docs/mcp',
    'docs.sdks': '/docs/sdks',
    'docs.webhooks': '/docs/webhooks',
    'docs.quickstart': '/docs/quickstart',
    'docs.faq': '/docs/faq',
    'docs.status': '/docs/status',
    contact: '/contact',
    roadmap: '/roadmap',
    privacy: '/privacy',
    terms: '/terms',
    wiki: '/wiki'
  };

  var ARTICLES = [
    { title: 'Anchoring Compliance to Bitcoin', url: 'https://arkova.ai/research/anchoring-compliance-bitcoin', author: 'Carson Seeger', published: '2025-11-21' },
    { title: 'Agentic Recordkeeping', url: 'https://arkova.ai/research/agentic-recordkeeping', author: 'Carson Seeger', published: '2026-01-15' },
    { title: 'The Convergence Stack', url: 'https://arkova.ai/research/convergence-stack', author: 'Carson Seeger', published: '2026-02-12' },
    { title: 'Modernizing Government Records', url: 'https://arkova.ai/research/government-records', author: 'Carson Seeger', published: '2026-03-10' },
    { title: 'The Real Cost of Audit Verification', url: 'https://arkova.ai/research/real-cost-of-audit-verification', author: 'Sarah Rushton', published: '2026-03-16' },
    { title: 'The Rise of the Agentic Economy', url: 'https://arkova.ai/research/rise-of-agentic-economy', author: 'Carson Seeger', published: '2026-03-27' },
    { title: 'The State of Compliance in 2026', url: 'https://arkova.ai/research/state-of-compliance-2026', author: 'Sarah Rushton', published: '2026-04-26' }
  ];

  navigator.modelContext.provideContext({
    name: 'arkova-marketing',
    description:
      'Arkova marketing site tools — navigate the site, list research articles, and read the llms.txt summary. ' +
      'For verification or search against anchored credentials, use the MCP server at https://edge.arkova.ai/mcp ' +
      '(see /.well-known/mcp/server-card.json) or the HTTP API at https://app.arkova.ai/api/v1.',
    tools: [
      {
        name: 'navigate_to',
        description:
          'Navigate this Arkova marketing site to a named page. Triggers a top-level navigation in the user\'s browser.',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'string',
              description: 'Page name. One of: ' + Object.keys(PAGES).join(', '),
              enum: Object.keys(PAGES)
            }
          },
          required: ['page'],
          additionalProperties: false
        },
        execute: function (args) {
          var page = args && args.page;
          var path = PAGES[page];
          if (!path) {
            return Promise.resolve({ ok: false, error: 'Unknown page: ' + page });
          }
          window.location.href = path;
          return Promise.resolve({ ok: true, navigated_to: path });
        }
      },
      {
        name: 'list_research_articles',
        description:
          'List Arkova research articles with titles, URLs, authors, and publish dates. Use this to surface candidate reading material before navigating.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        },
        execute: function () {
          return Promise.resolve({ articles: ARTICLES.slice() });
        }
      },
      {
        name: 'get_arkova_summary',
        description:
          'Return the canonical Arkova llms.txt summary as plain text — a concise, machine-readable description of what Arkova does, the API surface, and key links.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        },
        execute: function () {
          return fetch('/llms.txt', { headers: { Accept: 'text/plain' } })
            .then(function (res) {
              if (!res.ok) {
                return { ok: false, status: res.status };
              }
              return res.text().then(function (text) {
                return { ok: true, content_type: 'text/plain', summary: text };
              });
            })
            .catch(function (err) {
              return { ok: false, error: String(err && err.message ? err.message : err) };
            });
        }
      },
      {
        name: 'get_api_catalog',
        description:
          'Return the Arkova API catalog (RFC 9727 linkset) describing the verification API and MCP server endpoints, including service-doc and status URLs.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        },
        execute: function () {
          return fetch('/.well-known/api-catalog', { headers: { Accept: 'application/linkset+json' } })
            .then(function (res) {
              if (!res.ok) {
                return { ok: false, status: res.status };
              }
              return res.json().then(function (data) {
                return { ok: true, catalog: data };
              });
            })
            .catch(function (err) {
              return { ok: false, error: String(err && err.message ? err.message : err) };
            });
        }
      }
    ]
  });
})();
