import DocLayout, {
  DocH2,
  DocH3,
  DocP,
  DocUl,
  DocLi,
  DocStrong,
  DocCode,
  DocCodeBlock,
  DocTable,
  DocCallout,
} from '../../components/DocLayout';
import type { TocItem, SidebarSection } from '../../components/DocLayout';

/* ═══════════════════════════════════════════
   Table of contents
   ═══════════════════════════════════════════ */

const tocItems: TocItem[] = [
  { id: 'overview', label: '1. Overview' },
  { id: 'authentication', label: '2. Authentication' },
  { id: 'verification', label: '3. Verification' },
  { id: 'batch-verification', label: '4. Batch Verification' },
  { id: 'anchoring', label: '5. Anchoring' },
  { id: 'attestations', label: '6. Attestations' },
  { id: 'ai-intelligence', label: '7. AI Intelligence' },
  { id: 'key-management', label: '8. Key Management' },
  { id: 'usage-billing', label: '9. Usage & Billing' },
  { id: 'errors', label: '10. Errors' },
];

/* ═══════════════════════════════════════════
   Sidebar (shared across doc pages)
   ═══════════════════════════════════════════ */

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Technical Wiki', href: '/wiki' },
  { label: 'API Reference', href: '/docs/api', active: true },
  { label: 'SDKs', href: '/docs/sdks' },
  { label: 'Webhooks', href: '/docs/webhooks' },
  { label: 'MCP Server', href: '/docs/mcp' },
  { label: 'FAQ', href: '/docs/faq' },
];

/* ═══════════════════════════════════════════
   Breadcrumbs
   ═══════════════════════════════════════════ */

const breadcrumbs = [
  { label: 'Docs', href: '/docs' },
  { label: 'API Reference' },
];

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */

export default function ApiReferencePage() {
  return (
    <DocLayout
      title="API Reference"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
      lastUpdated="2026-03-27"
    >
      {/* ─── 1. Overview ─── */}
      <DocH2 id="overview">Overview</DocH2>
      <DocP>
        Base URL: <DocCode>https://app.arkova.ai/api/v1</DocCode>
      </DocP>
      <DocCallout type="tip">
        Interactive Swagger UI available at <DocCode>/api/docs</DocCode>. OpenAPI 3.0 spec downloadable at{' '}
        <DocCode>/api/docs/spec.json</DocCode>.
      </DocCallout>
      <DocUl>
        <DocLi>All responses are JSON. All timestamps are ISO 8601 UTC.</DocLi>
        <DocLi>
          The verification response schema is frozen — no breaking changes without a{' '}
          <DocCode>v2</DocCode> prefix and 12-month deprecation.
        </DocLi>
      </DocUl>

      {/* ─── 2. Authentication ─── */}
      <DocH2 id="authentication">Authentication</DocH2>
      <DocP>
        Two authentication methods are supported: <DocStrong>Bearer token</DocStrong> and{' '}
        <DocStrong>X-API-Key header</DocStrong>.
      </DocP>
      <DocCodeBlock language="bash">{`# Bearer token
curl https://app.arkova.ai/api/v1/verify/ARK-2026-001 \\
  -H "Authorization: Bearer YOUR_API_KEY"

# X-API-Key header
curl https://app.arkova.ai/api/v1/verify/ARK-2026-001 \\
  -H "X-API-Key: YOUR_API_KEY"`}</DocCodeBlock>
      <DocUl>
        <DocLi>
          API keys are created in the dashboard under <DocStrong>Settings → API Keys</DocStrong>.
        </DocLi>
        <DocLi>
          Keys use HMAC-SHA256 — the raw key is shown once at creation and never stored.
        </DocLi>
        <DocLi>
          Scoped permissions: <DocCode>verify</DocCode>, <DocCode>verify:batch</DocCode>,{' '}
          <DocCode>keys:manage</DocCode>, <DocCode>usage:read</DocCode>.
        </DocLi>
      </DocUl>
      <DocCallout type="important">
        Never expose API keys in client-side code. Keys should only be used server-side.
      </DocCallout>

      {/* ─── 3. Verification ─── */}
      <DocH2 id="verification">Verification</DocH2>

      <DocH3 id="verify-single">GET /verify/{'{publicId}'}</DocH3>
      <DocP>
        Verify a single credential. Authentication is optional — an API key unlocks higher rate limits.
      </DocP>
      <DocP>
        <DocStrong>Response schema:</DocStrong>
      </DocP>
      <DocCodeBlock language="json">{`{
  "verified": true,
  "status": "ACTIVE",
  "issuer_name": "University of Michigan",
  "recipient_identifier": "sha256:ab3f...",
  "credential_type": "DIPLOMA",
  "issued_date": "2026-01-15T00:00:00Z",
  "expiry_date": null,
  "anchor_timestamp": "2026-03-10T08:00:00Z",
  "bitcoin_block": 204567,
  "network_receipt_id": "b8e381df09ca404e...",
  "merkle_proof_hash": null,
  "record_uri": "https://app.arkova.ai/verify/ARK-2026-001",
  "jurisdiction": "US-MI"
}`}</DocCodeBlock>
      <DocCallout type="note">
        <DocCode>jurisdiction</DocCode> is omitted when null — it is never returned as{' '}
        <DocCode>null</DocCode>.
      </DocCallout>
      <DocP>
        <DocStrong>Status values:</DocStrong>{' '}
        <DocCode>ACTIVE</DocCode>, <DocCode>REVOKED</DocCode>, <DocCode>SUPERSEDED</DocCode>,{' '}
        <DocCode>EXPIRED</DocCode>, <DocCode>PENDING</DocCode>
      </DocP>

      <DocH3 id="verify-proof">GET /verify/{'{publicId}'}/proof</DocH3>
      <DocP>Download the cryptographic proof package for a credential.</DocP>

      <DocH3 id="verify-search">GET /verify/search</DocH3>
      <DocP>
        Semantic search across credentials — designed for AI agents, ATS platforms, and background
        check integrations.
      </DocP>

      <DocH3 id="verify-entity">GET /verify/entity</DocH3>
      <DocP>
        Cross-reference an entity against public records (EDGAR, Federal Register, DAPIP, OpenAlex).
      </DocP>

      {/* ─── 4. Batch Verification ─── */}
      <DocH2 id="batch-verification">Batch Verification</DocH2>

      <DocH3 id="batch-verify-post">POST /verify/batch</DocH3>
      <DocP>
        Verify up to 100 credentials in a single request. Authentication is required (API key).
      </DocP>
      <DocP>
        <DocStrong>Request body:</DocStrong>
      </DocP>
      <DocCodeBlock language="json">{`{
  "public_ids": ["ARK-2026-001", "ARK-2026-002"]
}`}</DocCodeBlock>
      <DocUl>
        <DocLi>
          Synchronous for ≤20 items. For &gt;20 items the request is processed asynchronously and
          returns a <DocCode>job_id</DocCode>.
        </DocLi>
      </DocUl>

      <DocH3 id="batch-job-status">GET /jobs/{'{jobId}'}</DocH3>
      <DocP>Poll the status of an async batch verification job.</DocP>

      {/* ─── 5. Anchoring ─── */}
      <DocH2 id="anchoring">Anchoring</DocH2>

      <DocH3 id="anchor-post">POST /anchor</DocH3>
      <DocP>
        Submit a credential fingerprint for network anchoring. Authentication is required (API key or
        x402). The endpoint is idempotent — it returns <DocCode>200</DocCode> if the fingerprint
        already exists.
      </DocP>
      <DocP>
        <DocStrong>Request body:</DocStrong>
      </DocP>
      <DocCodeBlock language="json">{`{
  "fingerprint": "a1b2c3d4e5f6...64-char-hex",
  "label": "Bachelor of Science in Computer Science",
  "credential_type": "DIPLOMA",
  "metadata": {
    "issuer": "University of Michigan",
    "issued_date": "2026-01-15"
  }
}`}</DocCodeBlock>

      {/* ─── 6. Attestations ─── */}
      <DocH2 id="attestations">Attestations</DocH2>
      <DocTable
        headers={['Method', 'Endpoint', 'Auth', 'Description']}
        rows={[
          ['<code>POST</code>', '<code>/attestations</code>', 'Required', 'Create an attestation claim'],
          ['<code>GET</code>', '<code>/attestations</code>', 'Public', 'List with cursor-based pagination'],
          ['<code>GET</code>', '<code>/attestations/{publicId}</code>', 'Public', 'Retrieve a single attestation'],
          ['<code>PATCH</code>', '<code>/attestations/{publicId}/revoke</code>', 'Required (owner)', 'Revoke with optional reason'],
        ]}
      />
      <DocUl>
        <DocLi>
          <DocStrong>Types:</DocStrong> identity, employment, education, certification, compliance.
        </DocLi>
        <DocLi>
          <DocStrong>Lifecycle:</DocStrong> Created (active) → Expired (auto) or Revoked (manual).
        </DocLi>
      </DocUl>

      {/* ─── 7. AI Intelligence ─── */}
      <DocH2 id="ai-intelligence">AI Intelligence</DocH2>
      <DocTable
        headers={['Method', 'Endpoint', 'Description']}
        rows={[
          ['<code>POST</code>', '<code>/ai/extract</code>', 'Extract metadata from PII-stripped text (1 AI credit)'],
          ['<code>POST</code>', '<code>/ai/extract/batch</code>', 'Batch extraction'],
          ['<code>POST</code>', '<code>/ai/embed</code>', 'Generate 768-dim embedding (1 AI credit)'],
          ['<code>GET</code>', '<code>/ai/search</code>', 'Semantic search (1 AI credit)'],
          ['<code>POST</code>', '<code>/ai/integrity/compute</code>', 'Fraud / integrity score 0-100 (5 AI credits)'],
          ['<code>POST</code>', '<code>/ai/fraud/visual</code>', 'Visual fraud detection'],
          ['<code>GET</code>', '<code>/ai/review</code>', 'Admin review queue'],
          ['<code>POST</code>', '<code>/ai/feedback</code>', 'Submit extraction corrections'],
          ['<code>POST</code>', '<code>/knowledge/query</code>', 'Knowledge base query against 29K+ records'],
        ]}
      />
      <DocCallout type="note">
        All AI endpoints require JWT authentication. AI features are gated by server-side feature
        flags.
      </DocCallout>

      {/* ─── 8. Key Management ─── */}
      <DocH2 id="key-management">Key Management</DocH2>
      <DocP>All key-management endpoints require Supabase JWT authentication.</DocP>
      <DocTable
        headers={['Method', 'Endpoint', 'Description']}
        rows={[
          ['<code>POST</code>', '<code>/keys</code>', 'Create a new API key (raw key returned once)'],
          ['<code>GET</code>', '<code>/keys</code>', 'List API keys (masked)'],
          ['<code>PATCH</code>', '<code>/keys/{keyId}</code>', 'Update key name or scopes'],
          ['<code>DELETE</code>', '<code>/keys/{keyId}</code>', 'Revoke an API key'],
        ]}
      />

      {/* ─── 9. Usage & Billing ─── */}
      <DocH2 id="usage-billing">Usage &amp; Billing</DocH2>

      <DocH3>GET /usage</DocH3>
      <DocP>Returns current-month API usage across all organization keys.</DocP>

      <DocH3>Rate Limits</DocH3>
      <DocTable
        headers={['Tier', 'Limit']}
        rows={[
          ['Anonymous', '100 req / min'],
          ['API Key', '1,000 req / min'],
          ['Batch', '10 req / min'],
          ['Enterprise', 'Custom'],
        ]}
      />
      <DocUl>
        <DocLi>
          Every response includes rate-limit headers:{' '}
          <DocCode>X-RateLimit-Limit</DocCode>, <DocCode>X-RateLimit-Remaining</DocCode>,{' '}
          <DocCode>X-RateLimit-Reset</DocCode>.
        </DocLi>
        <DocLi>
          HTTP <DocCode>429</DocCode> is returned with a <DocCode>Retry-After</DocCode> header when
          the limit is exceeded.
        </DocLi>
      </DocUl>

      {/* ─── 10. Errors ─── */}
      <DocH2 id="errors">Errors</DocH2>
      <DocP>All errors follow a consistent envelope:</DocP>
      <DocCodeBlock language="json">{`{
  "error": "not_found",
  "message": "Credential with public ID ARK-2026-999 not found"
}`}</DocCodeBlock>
      <DocTable
        headers={['Status', 'Code', 'Meaning']}
        rows={[
          ['400', '<code>bad_request</code>', 'Invalid or missing parameters'],
          ['401', '<code>unauthorized</code>', 'Missing or invalid authentication'],
          ['402', '<code>payment_required</code>', 'Insufficient credits or no active plan'],
          ['403', '<code>forbidden</code>', 'Valid auth but insufficient permissions'],
          ['404', '<code>not_found</code>', 'Resource does not exist'],
          ['409', '<code>conflict</code>', 'Duplicate or state conflict'],
          ['429', '<code>rate_limited</code>', 'Too many requests — check Retry-After header'],
          ['503', '<code>service_unavailable</code>', 'Temporary outage — retry with back-off'],
        ]}
      />
    </DocLayout>
  );
}
