---
name: search-credentials
description: Search Arkova-anchored credentials using natural language. Returns ranked matches with public IDs, titles, and verification metadata. Requires an API key — no anonymous access.
version: 1.0.0
license: https://arkova.ai/terms
---

# search-credentials

Find Arkova-anchored credentials with natural-language queries.

## When to use

- A user asks "find all invoices we anchored in Q1."
- An agent needs to locate a credential before calling
  [verify-credential](../verify-credential/SKILL.md).
- You want to surface candidates for human review.

## Inputs

| Field         | Type    | Required | Notes                                |
| ------------- | ------- | -------- | ------------------------------------ |
| `query`       | string  | yes      | Natural-language query.              |
| `max_results` | integer | no       | 1–100, default 10.                   |

## How to call (HTTP)

```http
GET /api/v1/verify/search?q=<query>
Host: app.arkova.ai
X-API-Key: <your-key>
Accept: application/json
```

Or via OAuth 2.0 Bearer token (see
[oauth-protected-resource](https://arkova.ai/.well-known/oauth-protected-resource)).

## How to call (MCP)

```json
{
  "tool": "search_credentials",
  "arguments": { "query": "invoices issued in Q1 2026", "max_results": 10 }
}
```

MCP endpoint: `https://edge.arkova.ai/mcp`

## Response shape

```json
{
  "results": [
    {
      "public_id": "abc123",
      "title": "Invoice #4471",
      "issuer": "Acme Corp.",
      "anchored_at": "2026-02-03T14:01:11Z",
      "score": 0.91
    }
  ],
  "next_cursor": null
}
```

## Rate limits

- API key: 1,000 requests/min.
- Batch verification (separate endpoint): 10 requests/min.
- Headers `X-RateLimit-Remaining` and `Retry-After` returned on every
  response. Honor them.

## Privacy

Search runs over PII-stripped metadata only. Document contents never
leave the issuer's device — the platform cannot index original document
bodies. See <https://arkova.ai/privacy>.

## See also

- API reference: <https://arkova.ai/docs/api>
- verify-credential skill: <../verify-credential/SKILL.md>
- MCP server card: <https://arkova.ai/.well-known/mcp/server-card.json>
