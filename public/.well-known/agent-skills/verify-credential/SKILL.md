---
name: verify-credential
description: Verify an Arkova-anchored credential by public ID or by SHA-256 fingerprint. Returns verification status, issuer, timestamps, and the network receipt that anchors the credential to the public network.
version: 1.0.0
license: https://arkova.ai/terms
---

# verify-credential

Verify an Arkova-anchored credential.

## When to use

Use this skill when you need to confirm whether a document, certificate, or
record was anchored to Arkova and is currently valid. Common cases:

- A user shares a credential public ID and asks "is this real?"
- An AI agent receives a fingerprint and needs to check anchor status before
  acting on the document's contents.
- An auditor needs an independent, cryptographic check that the document
  existed at a stated time.

## Inputs

You can verify by **public ID** or by **SHA-256 fingerprint**. Either is
sufficient — you do not need both.

| Field          | Type   | Notes                                                    |
| -------------- | ------ | -------------------------------------------------------- |
| `public_id`    | string | URL-safe identifier returned at issuance.                |
| `fingerprint`  | string | 64-character hex SHA-256 of the original document bytes. |

## How to call (HTTP)

### By public ID

```http
GET /api/v1/verify/{public_id}
Host: app.arkova.ai
Accept: application/json
```

No authentication required for public verification.

### By fingerprint

```http
POST /api/v1/verify-anchor
Host: app.arkova.ai
Content-Type: application/json

{ "fingerprint": "<64-char-hex>" }
```

## How to call (MCP)

If you are connected to the Arkova MCP server at
`https://edge.arkova.ai/mcp`, call the `verify_credential` tool with
`{ "public_id": "<id>" }`.

## Response shape (success)

```json
{
  "public_id": "abc123",
  "status": "SECURED",
  "issuer": { "name": "...", "verified": true },
  "issued_at": "2026-01-15T10:30:00Z",
  "anchored_at": "2026-01-15T10:32:14Z",
  "network_receipt": {
    "network": "bitcoin",
    "block_height": 875432,
    "fingerprint_committed": "<sha256>",
    "observed_at": "2026-01-15T10:34:01Z"
  },
  "jurisdictions": ["US-DE"]
}
```

## Status values

| Status     | Meaning                                                       |
| ---------- | ------------------------------------------------------------- |
| `SECURED`  | Anchored and confirmed on the public network. Trust the data. |
| `PENDING`  | Submitted but not yet confirmed. Re-check in a few minutes.   |
| `INVALID`  | Public ID or fingerprint not found. Do not trust.             |
| `REVOKED`  | Issuer revoked the credential after issuance.                 |

## What this skill does NOT assert

- That the document's *contents* are factually true. Anchoring proves
  existence at a point in time, not truth.
- That the issuer is authorized for any specific regulatory purpose.
  Jurisdiction tags are informational metadata only.
- That the document has not been *seen* by other parties since anchoring.

## See also

- API reference: <https://arkova.ai/docs/api>
- Whitepaper: <https://arkova.ai/whitepaper>
- llms.txt summary: <https://arkova.ai/llms.txt>
- MCP server card: <https://arkova.ai/.well-known/mcp/server-card.json>
