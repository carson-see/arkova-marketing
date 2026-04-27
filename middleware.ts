/**
 * Vercel Edge Middleware — same-URL Markdown content negotiation for `/`.
 *
 * Why this exists (and why a vercel.json rewrite is not enough):
 *   For static-output projects (Vite SSG → dist/index.html), Vercel's pipeline
 *   evaluates static files BEFORE rewrites in vercel.json. Requests to `/`
 *   resolve to dist/index.html and are served immediately, so a rewrite with
 *   `has: [{ type: "header", key: "accept", ... }]` never gets a chance to
 *   fire. Edge Middleware runs BEFORE the filesystem check, which is the only
 *   way to do same-URL content negotiation for the root path on a static
 *   Vercel deployment without Next.js.
 *
 * Behavior:
 *   - GET / with Accept matching text/markdown -> rewrite to /index.md
 *     (transparent: client URL stays `/`, response body is the markdown file).
 *   - Vary: Accept added to every response so caches don't cross-pollute the
 *     HTML and markdown variants.
 *   - All other requests pass through untouched.
 *
 * History:
 *   First attempted in PR #23 (e1481b6), reverted in PR #25 after a false-
 *   positive correlation with a Vercel Bot Management challenge that was
 *   actually independent of this middleware (Bot Management challenges
 *   anonymous curl + automation-fingerprinted browsers; real visitors and the
 *   Vercel-authenticated fetch confirmed the homepage was serving correctly
 *   the entire time). Build logs were clean; runtime logs showed zero
 *   middleware errors. Re-shipping with a comment so we don't repeat the
 *   misdiagnosis.
 *
 * Spec references:
 *   - RFC 8288 (Web Linking)
 *   - https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

import { rewrite, next } from '@vercel/edge';

export const config = {
  matcher: ['/'],
};

// Match Accept header values that include text/markdown:
//   - bare:                 "text/markdown"
//   - leading types:        "text/html, text/markdown"
//   - trailing parameters:  "text/markdown;q=0.9"
//   - mixed:                "text/html, text/markdown;q=0.8, */*;q=0.5"
const MARKDOWN_RE = /(?:^|[, ])text\/markdown(?:[;, ]|$)/i;

export default function middleware(request: Request): Response {
  const accept = request.headers.get('accept') || '';

  if (request.method === 'GET' && MARKDOWN_RE.test(accept)) {
    const url = new URL('/index.md', request.url);
    const res = rewrite(url);
    res.headers.set('Vary', 'Accept');
    res.headers.set('Content-Type', 'text/markdown; charset=utf-8');
    return res;
  }

  const res = next();
  res.headers.set('Vary', 'Accept');
  return res;
}
