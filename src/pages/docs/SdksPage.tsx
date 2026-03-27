import DocLayout, {
  DocH2,
  DocH3,
  DocP,
  DocStrong,
  DocCode,
  DocCodeBlock,
  DocCallout,
} from '../../components/DocLayout';
import type { TocItem, SidebarSection } from '../../components/DocLayout';

const tocItems: TocItem[] = [
  { id: 'overview', label: '1. Overview' },
  { id: 'typescript-sdk', label: '2. TypeScript SDK' },
  { id: 'ts-installation', label: 'Installation', level: 1 },
  { id: 'ts-initialize', label: 'Initialize', level: 1 },
  { id: 'ts-verify', label: 'Verify a Credential', level: 1 },
  { id: 'ts-batch-verify', label: 'Batch Verify', level: 1 },
  { id: 'ts-anchor', label: 'Submit an Anchor', level: 1 },
  { id: 'ts-usage', label: 'Check Usage', level: 1 },
  { id: 'ts-errors', label: 'Error Handling', level: 1 },
  { id: 'python-sdk', label: '3. Python SDK' },
  { id: 'py-installation', label: 'Installation', level: 1 },
  { id: 'py-initialize', label: 'Initialize', level: 1 },
  { id: 'py-verify', label: 'Verify a Credential', level: 1 },
  { id: 'py-batch-verify', label: 'Batch Verify', level: 1 },
  { id: 'py-anchor', label: 'Submit an Anchor', level: 1 },
  { id: 'py-errors', label: 'Error Handling', level: 1 },
  { id: 'common-patterns', label: '4. Common Patterns' },
  { id: 'webhook-verification', label: 'Webhook Verification', level: 1 },
  { id: 'retry-logic', label: 'Retry Logic', level: 1 },
  { id: 'type-safety', label: 'Type Safety', level: 1 },
];

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Technical Wiki', href: '/wiki' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'SDKs', href: '/docs/sdks', active: true },
  { label: 'Webhooks', href: '/docs/webhooks' },
  { label: 'MCP Server', href: '/docs/mcp' },
  { label: 'FAQ', href: '/docs/faq' },
];

const breadcrumbs = [
  { label: 'Docs', href: '/docs' },
  { label: 'SDKs' },
];

export default function SdksPage() {
  return (
    <DocLayout
      title="SDKs"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
    >
      {/* ═══ 1. Overview ═══ */}
      <DocH2 id="overview">1. Overview</DocH2>
      <DocP>
        Arkova provides official SDKs for <DocStrong>TypeScript</DocStrong> and <DocStrong>Python</DocStrong>.
        Both wrap the REST Verification API with typed interfaces.
      </DocP>
      <DocCallout type="tip">
        SDKs are the recommended way to integrate. They handle authentication, retries,
        error parsing, and type safety.
      </DocCallout>

      {/* ═══ 2. TypeScript SDK ═══ */}
      <DocH2 id="typescript-sdk">2. TypeScript SDK</DocH2>

      <DocH3 id="ts-installation">Installation</DocH3>
      <DocCodeBlock language="bash">npm install @arkova/sdk</DocCodeBlock>

      <DocH3 id="ts-initialize">Initialize</DocH3>
      <DocCodeBlock language="typescript">{`import { ArkovaClient } from '@arkova/sdk';

const arkova = new ArkovaClient({
  apiKey: process.env.ARKOVA_API_KEY!,
  // baseUrl: 'https://app.arkova.ai/api/v1' (default)
});`}</DocCodeBlock>

      <DocH3 id="ts-verify">Verify a Credential</DocH3>
      <DocCodeBlock language="typescript">{`const result = await arkova.verify('ARK-2026-00091');

if (result.verified) {
  console.log(\`Status: \${result.status}\`);
  console.log(\`Issuer: \${result.issuer_name}\`);
  console.log(\`Anchored: \${result.anchor_timestamp}\`);
  console.log(\`Network block: \${result.bitcoin_block}\`);
}`}</DocCodeBlock>

      <DocH3 id="ts-batch-verify">Batch Verify</DocH3>
      <DocCodeBlock language="typescript">{`const results = await arkova.verifyBatch([
  'ARK-2026-00091',
  'ARK-2026-00092',
  'ARK-2026-00093',
]);

for (const r of results) {
  console.log(\`\${r.record_uri}: \${r.status}\`);
}`}</DocCodeBlock>

      <DocH3 id="ts-anchor">Submit an Anchor</DocH3>
      <DocCodeBlock language="typescript">{`const anchor = await arkova.anchor({
  fingerprint: 'a1b2c3d4e5f6...64-char-hex',
  label: 'Bachelor of Science',
  credentialType: 'DIPLOMA',
  metadata: {
    issuer: 'University of Michigan',
    issuedDate: '2026-01-15',
  },
});`}</DocCodeBlock>

      <DocH3 id="ts-usage">Check Usage</DocH3>
      <DocCodeBlock language="typescript">{`const usage = await arkova.usage();
console.log(\`Verifications this month: \${usage.verify_count}\`);
console.log(\`Remaining quota: \${usage.remaining}\`);`}</DocCodeBlock>

      <DocH3 id="ts-errors">Error Handling</DocH3>
      <DocCodeBlock language="typescript">{`import { ArkovaError } from '@arkova/sdk';

try {
  await arkova.verify('ARK-INVALID');
} catch (err) {
  if (err instanceof ArkovaError) {
    console.log(err.status);  // 404
    console.log(err.code);    // "not_found"
    console.log(err.message); // "Credential not found"
  }
}`}</DocCodeBlock>

      {/* ═══ 3. Python SDK ═══ */}
      <DocH2 id="python-sdk">3. Python SDK</DocH2>

      <DocH3 id="py-installation">Installation</DocH3>
      <DocCodeBlock language="bash">pip install arkova</DocCodeBlock>

      <DocH3 id="py-initialize">Initialize</DocH3>
      <DocCodeBlock language="python">{`from arkova import ArkovaClient

client = ArkovaClient(api_key="ak_live_...")`}</DocCodeBlock>

      <DocH3 id="py-verify">Verify a Credential</DocH3>
      <DocCodeBlock language="python">{`result = client.verify("ARK-2026-00091")

if result.verified:
    print(f"Status: {result.status}")
    print(f"Issuer: {result.issuer_name}")
    print(f"Network block: {result.bitcoin_block}")`}</DocCodeBlock>

      <DocH3 id="py-batch-verify">Batch Verify</DocH3>
      <DocCodeBlock language="python">{`results = client.verify_batch([
    "ARK-2026-00091",
    "ARK-2026-00092",
])

for r in results:
    print(f"{r.record_uri}: {r.status}")`}</DocCodeBlock>

      <DocH3 id="py-anchor">Submit an Anchor</DocH3>
      <DocCodeBlock language="python">{`anchor = client.anchor(
    fingerprint="a1b2c3d4e5f6...64-char-hex",
    label="Bachelor of Science",
    credential_type="DIPLOMA",
    metadata={
        "issuer": "University of Michigan",
        "issued_date": "2026-01-15",
    },
)`}</DocCodeBlock>

      <DocH3 id="py-errors">Error Handling</DocH3>
      <DocCodeBlock language="python">{`from arkova import ArkovaError

try:
    client.verify("ARK-INVALID")
except ArkovaError as e:
    print(e.status)   # 404
    print(e.code)     # "not_found"
    print(e.message)  # "Credential not found"`}</DocCodeBlock>

      {/* ═══ 4. Common Patterns ═══ */}
      <DocH2 id="common-patterns">4. Common Patterns</DocH2>

      <DocH3 id="webhook-verification">Webhook Verification</DocH3>
      <DocCodeBlock language="typescript">{`import { verifyWebhookSignature } from '@arkova/sdk';

app.post('/webhook', (req, res) => {
  const isValid = verifyWebhookSignature(
    req.body,
    req.headers['x-arkova-signature'],
    process.env.WEBHOOK_SECRET!
  );
  if (!isValid) return res.status(401).send('Invalid signature');
  // Process event...
});`}</DocCodeBlock>

      <DocH3 id="retry-logic">Retry Logic</DocH3>
      <DocCallout type="note">
        Both SDKs automatically retry on 429 (rate limit) and 503 (service unavailable)
        with exponential backoff. No manual retry logic needed.
      </DocCallout>

      <DocH3 id="type-safety">Type Safety</DocH3>
      <DocCallout type="tip">
        The TypeScript SDK exports all response types. Import <DocCode>VerificationResult</DocCode>,{' '}
        <DocCode>AnchorResult</DocCode>, <DocCode>UsageResponse</DocCode> etc. for full IntelliSense support.
      </DocCallout>
    </DocLayout>
  );
}
