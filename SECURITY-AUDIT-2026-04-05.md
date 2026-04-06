# Arkova Security Audit Report

**Date:** 2026-04-05
**Scope:** arkova.ai, search.arkova.ai, app.arkova.ai
**Auditor:** Automated security review (Claude Code)
**Classification:** Internal — Confidential

---

## Executive Summary

A comprehensive security audit was conducted across the Arkova marketing site (arkova.ai), search portal (search.arkova.ai), and the main application platform (app.arkova.ai). The audit covered source code review, CI/CD pipeline analysis, external reconnaissance, and dependency scanning.

**Overall Assessment: GOOD — No critical vulnerabilities found.**

The codebase demonstrates mature security practices:
- SHA-pinned GitHub Actions with secret scanning
- HMAC-SHA256 API key authentication
- Comprehensive SSRF protection with IP range blocking
- Zod validation on all API inputs
- RLS enforced on all Supabase tables
- Stripe webhook signature verification
- Rate limiting across all tiers
- Error message sanitization preventing provider leakage

However, several medium and low severity findings were identified that should be addressed.

---

## Findings Summary

| ID | Severity | Category | Finding | Status |
|----|----------|----------|---------|--------|
| ARK-SEC-001 | Medium | Dependencies | 3 vulnerable npm packages in marketing site | Fix Available |
| ARK-SEC-002 | Medium | SSRF | DNS rebinding not mitigated in webhook delivery | Requires Code Change |
| ARK-SEC-003 | Medium | CSP | `unsafe-inline` in Content Security Policy | Requires Refactor |
| ARK-SEC-004 | Low | Headers | Missing HSTS preload directive | Config Change |
| ARK-SEC-005 | Low | Disclosure | Missing /.well-known/security.txt | Config Change |
| ARK-SEC-006 | Low | Info Leak | Email addresses exposed in contact form source | Informational |
| ARK-SEC-007 | Low | XSS Surface | `dangerouslySetInnerHTML` used in 4 components | Low Risk (static data) |
| ARK-SEC-008 | Info | Best Practice | No honeypot/CAPTCHA on contact form | Formspree handles |
| ARK-SEC-009 | Info | Headers | Missing X-DNS-Prefetch-Control header | Optional |
| ARK-SEC-010 | Info | SSRF | Crawler endpoint lacks DNS resolution validation | Behind auth |

---

## Detailed Findings

### ARK-SEC-001: Vulnerable npm Dependencies (Medium)

**Location:** `/tmp/arkova-marketing/package-lock.json`
**CVSS:** 5.3 (Medium)

Three npm packages have known vulnerabilities:

1. **flatted <= 3.4.1** (High) — Prototype Pollution via `parse()` (GHSA-rf6f-7fwh-wjgh)
2. **picomatch <= 2.3.1** (High) — Method Injection + ReDoS (GHSA-3v7f-55p6-f55p, GHSA-c2c7-rcm5-vvqj)
3. **brace-expansion < 1.1.13** (Moderate) — Zero-step sequence DoS (GHSA-f886-m6hf-6m8v)

**Fix:** Run `npm audit fix` — all have available patches.

**Impact:** These are development/build dependencies, not runtime. Risk is limited to build pipeline compromise or developer machine exploitation. However, supply chain attacks through build dependencies are a real vector.

---

### ARK-SEC-002: DNS Rebinding Not Mitigated in Webhook/Crawler SSRF Protection (Medium)

**Location:**
- `services/worker/src/webhooks/delivery.ts:45-65` (isPrivateUrl)
- `services/edge/src/cloudflare-crawler.ts:152-190` (isValidDomain)

**CVSS:** 4.3 (Medium)

Both SSRF protection functions validate hostnames/IPs at parse time but do not resolve DNS before the actual `fetch()` call. An attacker could register a domain that:
1. Resolves to a public IP during validation
2. Has a short TTL (or uses DNS rebinding) to resolve to `169.254.169.254` (cloud metadata) or `127.0.0.1` (internal services) when the actual fetch occurs

**Mitigating factors:**
- Webhook URLs require authenticated user to register
- Crawler endpoint requires `X-Cron-Secret` authentication
- `redirect: 'manual'` prevents redirect-based bypass
- Node.js URL parser normalizes decimal/hex/octal IPs

**Recommendation:** Add DNS resolution validation before fetch:
```typescript
import { resolve4 } from 'node:dns/promises';

async function resolveAndValidate(hostname: string): Promise<boolean> {
  const ips = await resolve4(hostname);
  return ips.every(ip => !isPrivateIp(ip));
}
```

---

### ARK-SEC-003: CSP Allows unsafe-inline for Scripts (Medium)

**Location:** `vercel.json` (marketing site)

**CVSS:** 4.0 (Medium)

The Content Security Policy includes `script-src 'self' 'unsafe-inline'` which weakens XSS protection. If an injection point were found, inline script execution would not be blocked by CSP.

**Mitigating factors:**
- No user input is rendered unsanitized (static site)
- React's JSX escaping prevents most XSS vectors
- `frame-ancestors 'none'` blocks framing attacks

**Recommendation:** Migrate to CSP nonces or hashes for inline scripts:
```
script-src 'self' 'nonce-{random}';
```
This requires SSR or a Vercel Edge Function to inject nonces.

---

### ARK-SEC-004: Missing HSTS Preload Directive (Low)

**Location:** `vercel.json` headers

**Current:** `Strict-Transport-Security: max-age=63072000; includeSubDomains`
**Recommended:** `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

Adding `preload` and submitting to hstspreload.org ensures browsers always use HTTPS for arkova.ai, even on first visit (prevents SSL stripping on first connection).

---

### ARK-SEC-005: Missing security.txt (Low)

**Location:** Missing `public/.well-known/security.txt`

No `security.txt` file exists per RFC 9116. This is a best practice for responsible disclosure and helps security researchers report vulnerabilities through proper channels.

**Recommendation:** Create `public/.well-known/security.txt`:
```
Contact: mailto:security@arkova.ai
Expires: 2027-04-05T00:00:00.000Z
Preferred-Languages: en
Canonical: https://arkova.ai/.well-known/security.txt
Policy: https://arkova.ai/security-policy
```

---

### ARK-SEC-006: Email Address Exposure in Contact Form (Low)

**Location:** `src/pages/ContactPage.tsx:128, 133`

Two email addresses are exposed in the page source:
- `sarah@arkova.ai` (hidden CC field, line 128)
- `carson@arkova.ai` (error message, line 133)

While these may be intentionally public, exposing staff emails in source code enables targeted phishing. The `_cc` hidden field is particularly unnecessary to expose client-side since Formspree can handle CC configuration server-side.

**Recommendation:** Configure CC recipients in Formspree dashboard instead of client-side hidden fields. Use a generic email in error messages (e.g., `hello@arkova.ai`).

---

### ARK-SEC-007: dangerouslySetInnerHTML Usage (Low)

**Location:**
- `src/pages/ArticlePage.tsx:135` — Article text blocks
- `src/pages/ArticlePage.tsx:67` — JSON-LD schema
- `src/components/DocLayout.tsx:132` — Doc table cells
- `src/pages/WhitepaperPage.tsx:114` — JSON-LD schema
- `src/components/BreadcrumbJsonLd.tsx:33` — Breadcrumb JSON-LD

**Assessment:** All instances render hardcoded static data from `src/data/articles.ts` or component props — not user input. The JSON-LD `dangerouslySetInnerHTML` is the standard React pattern for structured data.

The article text blocks contain HTML like `<strong>` and `<code>` tags in the static article dataset. No user-supplied content flows to these sinks.

**Risk:** Minimal. If the article data source were ever changed to accept external input (CMS, API), these would become XSS vectors.

**Recommendation:** Add a code comment documenting that these sinks must only receive trusted content. Consider using a safe HTML sanitizer (DOMPurify) as a defense-in-depth measure if a CMS is ever introduced.

---

### ARK-SEC-008: Contact Form Spam Protection (Info)

**Location:** `src/pages/ContactPage.tsx`

The contact form relies on Formspree for spam protection. No client-side honeypot field or CAPTCHA is present. Formspree provides server-side spam filtering, but adding a honeypot field is a low-effort defense-in-depth measure.

---

### ARK-SEC-009: Missing X-DNS-Prefetch-Control Header (Info)

**Location:** `vercel.json` headers

The `X-DNS-Prefetch-Control: off` header is not set. While minor, DNS prefetching can leak visited URLs to DNS servers. This is an optional hardening measure.

---

### ARK-SEC-010: Crawler SSRF — No DNS Resolution Validation (Info)

**Location:** `services/edge/src/cloudflare-crawler.ts:65-72`

The crawler fetches user-supplied domains (`https://{domain}`). While domain validation blocks IP addresses, internal hostnames, and reserved TLDs, DNS rebinding could theoretically bypass these checks. However, this endpoint is protected by `X-Cron-Secret` authentication, limiting the attack surface to compromised internal credentials.

---

## Positive Findings (Security Strengths)

These security controls were verified as properly implemented:

1. **CI/CD Security:** All GitHub Actions are SHA-pinned. TruffleHog + Gitleaks secret scanning in CI. Dependency auditing on every push.

2. **Authentication:** JWT verification with HMAC-SHA256 (local) or Supabase fallback. API keys use HMAC-SHA256 with dedicated secret. Empty HMAC secret fails closed (500, not bypass).

3. **Authorization:** RLS enforced on all tables. `FORCE ROW LEVEL SECURITY` applied. Service role operations restricted to worker.

4. **Input Validation:** Zod schemas on all API write paths. Request body validation before any DB operation.

5. **SSRF Protection:** Private IP regex matching, blocked hostnames, non-HTTP protocol blocking, `redirect: 'manual'` on webhook fetch, cloud metadata IP blocking.

6. **Rate Limiting:** Anonymous 100 req/min, API key 1000 req/min, batch 10 req/min. Headers exposed. 429 + Retry-After.

7. **Error Sanitization:** Provider names, API versions, internal details stripped from all error responses. Regex pattern matching catches Gemini, Stripe, Supabase, AWS, etc.

8. **Stripe Security:** Webhook signature verification via `constructEvent()`. Raw body parsing before JSON middleware. Idempotency via `billing_events` table.

9. **Constant-Time Auth:** Edge worker uses byte-by-byte XOR comparison for secret verification (timing attack resistant).

10. **CORS:** Production defaults to empty allowed origins (blocks all cross-origin). Explicit configuration required.

---

## Recommendations Priority

### Immediate (This Sprint)
1. `npm audit fix` on marketing site (ARK-SEC-001)
2. Add HSTS preload directive (ARK-SEC-004)
3. Create security.txt (ARK-SEC-005)
4. Move CC email to Formspree config (ARK-SEC-006)

### Next Sprint
5. Implement DNS resolution validation for webhook SSRF (ARK-SEC-002)
6. Evaluate CSP nonce strategy (ARK-SEC-003)

### Backlog
7. Add DOMPurify for article content if CMS is introduced (ARK-SEC-007)
8. Add honeypot field to contact form (ARK-SEC-008)

---

## Methodology

- **Source code review:** Manual inspection of auth, middleware, API endpoints, webhook delivery, AI extraction, billing, and chain operations
- **Dependency scanning:** `npm audit` on all packages
- **CI/CD audit:** GitHub Actions workflow analysis for expression injection, unpinned actions, secret exposure
- **External recon:** HTTP header analysis, robots.txt, sitemap.xml, exposed path enumeration
- **SSRF testing:** IP bypass verification (decimal, hex, octal, short notation) against Node.js URL parser
- **Configuration review:** Vercel, Cloudflare, Docker, and environment variable configuration

---

*Report generated 2026-04-05 by automated security review.*
