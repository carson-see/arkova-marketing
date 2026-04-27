# Arkova — Compliance Audit Automation in Hours, Not Weeks

> Arkova is a compliance audit automation platform in early access, built on a
> production-grade, privacy-first, cryptographically-anchored evidence chain.
> Documents never leave the user's device — fingerprinting is client-side.

- Website: <https://arkova.ai>
- App: <https://app.arkova.ai>
- Contact: <hello@arkova.ai>
- llms.txt summary: <https://arkova.ai/llms.txt>
- llms-full.txt: <https://arkova.ai/llms-full.txt>

## What Arkova does

Arkova turns the slow, evidence-gathering parts of a compliance audit into a
pipeline. Per-jurisdiction posture scoring, gap detection, prioritized
remediation, regulatory-change alerts, and audit-ready PDF export — all on top
of an evidence chain that anchors document fingerprints to a public, permanent
network.

The cryptographic evidence layer runs in production today. The compliance
audit automation layer is being built with pilot customers.

## Why "privacy-first"

- Documents are SHA-256 fingerprinted entirely in the browser using the Web
  Crypto API.
- Only the fingerprint plus PII-stripped structured metadata leaves the
  device.
- The platform has no path to access or reconstruct the original document.

This is a foundational guarantee, not a setting that can be toggled off.

## How verification works

1. **Upload** — A user selects a document in their browser.
2. **Fingerprint** — SHA-256 is computed client-side. Document bytes never
   leave the device.
3. **Anchor** — The fingerprint is anchored to a permanent public network
   with a tamper-evident timestamp.
4. **Verify** — Anyone can re-compute the fingerprint and check it against
   the public record. No account required.

## Verification API

Base URL: `https://app.arkova.ai/api/v1`

| Method | Path                       | Purpose                                             |
| ------ | -------------------------- | --------------------------------------------------- |
| GET    | `/verify/:publicId`        | Verify a credential by public ID.                   |
| POST   | `/verify-anchor`           | Verify by SHA-256 fingerprint.                      |
| POST   | `/verify/batch`            | Batch verify up to 100 credentials per request.     |
| GET    | `/verify/search?q=<query>` | Semantic search across verified credentials.       |
| GET    | `/usage`                   | API usage stats for the authenticated key.          |

Auth: `X-API-Key` header or OAuth 2.0 Bearer token. Public verification
endpoints require no auth.

Rate limits: 100 req/min anonymous, 1,000 req/min API key, 10 req/min batch.
`X-RateLimit-Remaining` and `Retry-After` returned on every response.

Full API reference: <https://arkova.ai/docs/api>

## MCP Server

Endpoint: `https://edge.arkova.ai/mcp`
Transport: Streamable HTTP

Tools: `verify_credential`, `search_credentials`. See the
[server card](https://arkova.ai/.well-known/mcp/server-card.json) for input
schemas.

Setup guide: <https://arkova.ai/docs/mcp>

## Discovery endpoints (for agents)

- API catalog (RFC 9727): <https://arkova.ai/.well-known/api-catalog>
- OAuth Protected Resource Metadata (RFC 9728): <https://arkova.ai/.well-known/oauth-protected-resource>
- MCP server card: <https://arkova.ai/.well-known/mcp/server-card.json>
- Agent skills index: <https://arkova.ai/.well-known/agent-skills/index.json>
- Site map: <https://arkova.ai/sitemap.xml>
- Robots + Content Signals: <https://arkova.ai/robots.txt>

## Research

- [Anchoring Compliance to Bitcoin](https://arkova.ai/research/anchoring-compliance-bitcoin)
- [Agentic Recordkeeping](https://arkova.ai/research/agentic-recordkeeping)
- [The Convergence Stack](https://arkova.ai/research/convergence-stack)
- [Modernizing Government Records](https://arkova.ai/research/government-records)
- [The Real Cost of Audit Verification](https://arkova.ai/research/real-cost-of-audit-verification)
- [The Rise of the Agentic Economy](https://arkova.ai/research/rise-of-agentic-economy)
- [The State of Compliance in 2026](https://arkova.ai/research/state-of-compliance-2026)

## Resources

- Whitepaper: <https://arkova.ai/whitepaper>
- Roadmap: <https://arkova.ai/roadmap>
- Privacy: <https://arkova.ai/privacy>
- Terms: <https://arkova.ai/terms>
- Documentation: <https://arkova.ai/docs>
- Technical wiki: <https://arkova.ai/wiki>

## Founders

- Carson Seeger — <https://www.linkedin.com/in/carson-s-8b41061a/>
- Sarah Rushton — <https://www.linkedin.com/in/sljrushton/>
- Yaacov Petscher

## Structured data

Organization, SoftwareApplication, FAQPage, WebSite, WebPage (speakable),
Person, Article, BreadcrumbList, and TechArticle JSON-LD are emitted on the
HTML version of every page.
