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

const tocItems: TocItem[] = [
  { id: 'overview', label: '1. Overview' },
  { id: 'setup', label: '2. Setup' },
  { id: 'event-types', label: '3. Event Types' },
  { id: 'payload-format', label: '4. Payload Format' },
  { id: 'signature-verification', label: '5. Signature Verification' },
  { id: 'retry-policy', label: '6. Retry Policy' },
  { id: 'best-practices', label: '7. Best Practices' },
];

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Technical Wiki', href: '/wiki' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'SDKs', href: '/docs/sdks' },
  { label: 'Webhooks', href: '/docs/webhooks', active: true },
  { label: 'MCP Server', href: '/docs/mcp' },
  { label: 'FAQ', href: '/docs/faq' },
];

const breadcrumbs = [
  { label: 'Docs', href: '/docs' },
  { label: 'Webhooks' },
];

export default function WebhooksPage() {
  return (
    <DocLayout
      title="Webhooks"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
      lastUpdated="March 27, 2026"
    >
      {/* ── 1. Overview ── */}
      <DocH2 id="overview">1. Overview</DocH2>
      <DocP>
        Webhooks deliver real-time notifications when events occur in Arkova. Instead of polling the API, your
        server receives an HTTPS POST the moment something important happens.
      </DocP>
      <DocUl>
        <DocLi>HTTPS-only delivery (enforced at database level)</DocLi>
        <DocLi>Every delivery is signed with <DocStrong>HMAC-SHA256</DocStrong> for authenticity verification</DocLi>
      </DocUl>
      <DocCallout type="note">
        Webhooks are available on all plans. Configure them in <DocStrong>Settings → Webhooks</DocStrong>.
      </DocCallout>

      {/* ── 2. Setup ── */}
      <DocH2 id="setup">2. Setup</DocH2>
      <DocUl>
        <DocLi>Navigate to <DocStrong>Settings → Webhooks</DocStrong> in the Arkova dashboard</DocLi>
        <DocLi>Click <DocStrong>"Add Endpoint"</DocStrong></DocLi>
        <DocLi>Enter your HTTPS endpoint URL</DocLi>
        <DocLi>Select which events to subscribe to</DocLi>
        <DocLi>Copy your webhook signing secret (shown once)</DocLi>
      </DocUl>
      <DocCallout type="important">
        Your endpoint must respond with a <DocCode>2xx</DocCode> status within 30 seconds. Non-2xx responses trigger retries.
      </DocCallout>

      {/* ── 3. Event Types ── */}
      <DocH2 id="event-types">3. Event Types</DocH2>
      <DocTable
        headers={['Event', 'Trigger', 'Description']}
        rows={[
          ['<code>anchor.created</code>', 'New credential created', 'Fires when an anchor record is created'],
          ['<code>anchor.secured</code>', 'Network confirmation', 'Fires when the anchor transaction is confirmed in a block'],
          ['<code>anchor.revoked</code>', 'Credential revoked', 'Fires when a credential is revoked by the owner'],
          ['<code>anchor.verified</code>', 'Verification lookup', 'Fires when someone verifies the credential (optional, high volume)'],
          ['<code>attestation.created</code>', 'New attestation', 'Fires when an attestation claim is created'],
          ['<code>attestation.revoked</code>', 'Attestation revoked', 'Fires when an attestation is revoked'],
        ]}
      />

      {/* ── 4. Payload Format ── */}
      <DocH2 id="payload-format">4. Payload Format</DocH2>
      <DocP>Every webhook delivery sends a JSON body with the following shape:</DocP>
      <DocCodeBlock language="json">{`{
  "event": "anchor.secured",
  "timestamp": "2026-03-15T14:30:00Z",
  "data": {
    "public_id": "ARK-2026-00091",
    "status": "SECURED",
    "bitcoin_block": 204567,
    "network_receipt_id": "b8e381df09ca404e...",
    "issuer_name": "University of Michigan",
    "credential_type": "DIPLOMA"
  },
  "idempotency_key": "wh_evt_abc123def456"
}`}</DocCodeBlock>

      <DocP>Headers included on every delivery:</DocP>
      <DocUl>
        <DocLi><DocCode>X-Arkova-Signature</DocCode> — HMAC-SHA256 signature of the payload body</DocLi>
        <DocLi><DocCode>X-Arkova-Timestamp</DocCode> — ISO 8601 UTC timestamp</DocLi>
        <DocLi><DocCode>X-Arkova-Event</DocCode> — Event type (e.g., <DocCode>anchor.secured</DocCode>)</DocLi>
      </DocUl>

      {/* ── 5. Signature Verification ── */}
      <DocH2 id="signature-verification">5. Signature Verification</DocH2>
      <DocCallout type="important">
        Always verify webhook signatures. Reject unsigned or incorrectly signed payloads.
      </DocCallout>

      <DocH3>Node.js / TypeScript</DocH3>
      <DocCodeBlock language="typescript">{`import crypto from 'crypto';

function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`}</DocCodeBlock>

      <DocH3>Python</DocH3>
      <DocCodeBlock language="python">{`import hmac
import hashlib

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)`}</DocCodeBlock>

      {/* ── 6. Retry Policy ── */}
      <DocH2 id="retry-policy">6. Retry Policy</DocH2>
      <DocTable
        headers={['Attempt', 'Delay', 'Total Elapsed']}
        rows={[
          ['1', 'Immediate', '0'],
          ['2', '1 minute', '1 min'],
          ['3', '5 minutes', '6 min'],
          ['4', '30 minutes', '36 min'],
          ['5', '2 hours', '~2.5 hours'],
        ]}
      />
      <DocUl>
        <DocLi>After all 5 attempts are exhausted, the event goes to a <DocStrong>dead letter queue</DocStrong> (retained 30 days)</DocLi>
        <DocLi>Manual replay is available from the dashboard</DocLi>
        <DocLi>Consecutive failures trip a <DocStrong>circuit breaker</DocStrong> — the endpoint is disabled and probed after a cooldown period</DocLi>
        <DocLi>Rate limit: <DocStrong>100 deliveries/minute</DocStrong> per organization</DocLi>
      </DocUl>

      {/* ── 7. Best Practices ── */}
      <DocH2 id="best-practices">7. Best Practices</DocH2>
      <DocUl>
        <DocLi>Return <DocCode>200</DocCode> quickly, then process async — don't do heavy work in the handler</DocLi>
        <DocLi>Use the <DocCode>idempotency_key</DocCode> to deduplicate — the same event may be delivered more than once</DocLi>
        <DocLi>Verify signatures on every request — never trust unverified payloads</DocLi>
        <DocLi>Use a queue (Redis, SQS) for processing — decouple receipt from handling</DocLi>
        <DocLi>Monitor your endpoint's error rate in the Arkova dashboard</DocLi>
        <DocLi>Set up alerting for webhook failures</DocLi>
      </DocUl>
    </DocLayout>
  );
}
