import DocLayout, {
  DocH2,
  DocH3,
  DocP,
  DocCode,
  DocCallout,
} from '../../components/DocLayout';
import type { TocItem, SidebarSection } from '../../components/DocLayout';

const tocItems: TocItem[] = [
  { id: 'general', label: '1. General' },
  { id: 'security-privacy', label: '2. Security & Privacy' },
  { id: 'api-integration', label: '3. API & Integration' },
  { id: 'bitcoin-anchoring', label: '4. Anchoring' },
  { id: 'ai-features', label: '5. AI Features' },
  { id: 'billing-pricing', label: '6. Billing & Pricing' },
];

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Technical Wiki', href: '/wiki' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'SDKs', href: '/docs/sdks' },
  { label: 'Webhooks', href: '/docs/webhooks' },
  { label: 'MCP Server', href: '/docs/mcp' },
  { label: 'FAQ', href: '/docs/faq', active: true },
];

const breadcrumbs = [
  { label: 'Docs', href: '/docs' },
  { label: 'FAQ' },
];

export default function FaqPage() {
  return (
    <DocLayout
      title="Frequently Asked Questions"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
    >
      {/* ═══ 1. General ═══ */}
      <DocH2 id="general">1. General</DocH2>

      <DocH3 id="what-is-arkova">What is Arkova?</DocH3>
      <DocP>
        Arkova is a jurisdiction-aware verification layer. It anchors compliance-aligned metadata
        to a public ledger. Documents never leave your device.
      </DocP>

      <DocH3 id="is-arkova-blockchain">Is Arkova a blockchain company?</DocH3>
      <DocP>
        No. Arkova is verification infrastructure that uses a public ledger as an immutable timestamping
        layer. Users never interact with chain economics.
      </DocP>

      <DocH3 id="need-to-know-bitcoin">Do I need to know anything about the anchoring network?</DocH3>
      <DocP>
        No. Arkova abstracts all chain complexity. You see status updates
        (<DocCode>PENDING</DocCode> → <DocCode>SECURED</DocCode>). No wallets, no gas fees,
        no transactions.
      </DocP>

      <DocH3 id="credential-types">What types of credentials can I verify?</DocH3>
      <DocP>
        13 types: <DocCode>DIPLOMA</DocCode>, <DocCode>CERTIFICATE</DocCode>,{' '}
        <DocCode>LICENSE</DocCode>, <DocCode>BADGE</DocCode>, <DocCode>ATTESTATION</DocCode>,{' '}
        <DocCode>FINANCIAL</DocCode>, <DocCode>LEGAL</DocCode>, <DocCode>INSURANCE</DocCode>,{' '}
        <DocCode>SEC_FILING</DocCode>, <DocCode>PATENT</DocCode>, <DocCode>REGULATION</DocCode>,{' '}
        <DocCode>PUBLICATION</DocCode>, <DocCode>OTHER</DocCode>.
      </DocP>

      {/* ═══ 2. Security & Privacy ═══ */}
      <DocH2 id="security-privacy">2. Security & Privacy</DocH2>

      <DocH3 id="store-documents">Does Arkova store my documents?</DocH3>
      <DocP>
        No. Documents are fingerprinted (SHA-256) entirely in your browser. Only the one-way hash
        and PII-stripped metadata are sent to the server.
      </DocP>
      <DocCallout type="important">
        This is Arkova's foundational privacy guarantee. There is no backdoor or "raw mode."
      </DocCallout>

      <DocH3 id="what-data-stored">What data does Arkova store?</DocH3>
      <DocP>
        Fingerprint (SHA-256 hash), credential metadata (issuer, type, dates), anchor status, and
        anchor transaction references. Never document content.
      </DocP>

      <DocH3 id="data-encrypted">Is my data encrypted?</DocH3>
      <DocP>
        All data in transit uses TLS. Database is encrypted at rest via Supabase (managed Postgres).
        API keys use HMAC-SHA256. Treasury signing keys are in cloud HSMs.
      </DocP>

      <DocH3 id="row-level-security">How does Row Level Security work?</DocH3>
      <DocP>
        Every table has <DocCode>FORCE ROW LEVEL SECURITY</DocCode>. Even if application code has a
        bug, the database refuses to return rows the user isn't authorized to see. Cross-tenant
        access is architecturally impossible.
      </DocP>

      <DocH3 id="can-arkova-see-documents">Can Arkova see my documents?</DocH3>
      <DocP>
        No. The <DocCode>generateFingerprint()</DocCode> function runs only in the browser. It is
        architecturally prohibited from being imported in server-side code.
      </DocP>

      {/* ═══ 3. API & Integration ═══ */}
      <DocH2 id="api-integration">3. API & Integration</DocH2>

      <DocH3 id="rate-limits">What are the rate limits?</DocH3>
      <DocP>
        Anonymous: 100 req/min/IP. API key: 1,000 req/min. Batch: 10 req/min. Enterprise: custom.
        Headers on every response.
      </DocP>

      <DocH3 id="schema-stable">Is the API schema stable?</DocH3>
      <DocP>
        Yes. The verification response schema is frozen. No field removals or type changes without a
        v2 prefix and 12-month deprecation notice. Additive nullable fields are allowed.
      </DocP>

      <DocH3 id="sdks-available">What SDKs are available?</DocH3>
      <DocP>
        TypeScript (<DocCode>@arkova/sdk</DocCode>) and Python (<DocCode>arkova</DocCode>). Both
        support verify, batch verify, anchor, and usage endpoints.
      </DocP>

      <DocH3 id="how-webhooks-work">How do webhooks work?</DocH3>
      <DocP>
        HTTPS-only delivery, HMAC-SHA256 signed, 5 retries with exponential backoff, dead letter
        queue for failures. See <a href="/docs/webhooks" className="text-cyber-cyan/70 hover:text-cyber-cyan transition-colors">/docs/webhooks</a>.
      </DocP>

      <DocH3 id="ai-agents-use">Can AI agents use Arkova?</DocH3>
      <DocP>
        Yes. MCP server at <DocCode>edge.arkova.ai/mcp</DocCode> for Claude, GPT, and custom
        agents. Also available via REST API. See <a href="/docs/mcp" className="text-cyber-cyan/70 hover:text-cyber-cyan transition-colors">/docs/mcp</a>.
      </DocP>

      {/* ═══ 4. Anchoring ═══ */}
      <DocH2 id="bitcoin-anchoring">4. Anchoring</DocH2>

      <DocH3 id="how-anchoring-works">How does network anchoring work?</DocH3>
      <DocP>
        Arkova writes 36 bytes to the anchoring network via <DocCode>OP_RETURN</DocCode>: ARKV prefix (4 bytes) +
        Merkle root hash (32 bytes). Multiple credentials are batched into a single transaction.
      </DocP>

      <DocH3 id="anchoring-time">How long does anchoring take?</DocH3>
      <DocP>
        Batches run every 5 minutes. Network confirmation typically takes 10-60 minutes. Status
        updates in real-time via the dashboard.
      </DocP>

      <DocH3 id="fee-spikes">What if network fees spike?</DocH3>
      <DocP>
        Arkova uses fee estimation and batching to keep costs low. During fee spikes, anchoring is
        queued and processed when fees normalize. Status is clearly shown as{' '}
        <DocCode>PENDING</DocCode>.
      </DocP>

      <DocH3 id="verify-without-arkova">Can I verify without Arkova?</DocH3>
      <DocP>
        Yes. The anchor transaction is public. Anyone can look up the OP_RETURN data, extract the
        Merkle root, and verify the hash. Arkova is not required for independent verification.
      </DocP>

      <DocH3 id="arkova-goes-down">What happens if Arkova goes down?</DocH3>
      <DocP>
        Verification proofs are anchored to a public, decentralized ledger. Proofs survive
        regardless of Arkova's operational status.
      </DocP>

      {/* ═══ 5. AI Features ═══ */}
      <DocH2 id="ai-features">5. AI Features</DocH2>

      <DocH3 id="ai-model">What AI model does Arkova use?</DocH3>
      <DocP>
        Gemini 2.0 Flash (primary), with Cloudflare Workers AI as fallback. Provider abstraction
        supports hot-swapping to OpenAI or Anthropic.
      </DocP>

      <DocH3 id="ai-accuracy">Is AI extraction accurate?</DocH3>
      <DocP>
        Current F1 score: 82.1% across 2,050+ evaluation entries. Best: CLE credentials (94.3%).
        Worst: LICENSE (59.4%). Human review queue catches low-confidence extractions.
      </DocP>

      <DocH3 id="ai-see-documents">Does AI see my documents?</DocH3>
      <DocP>
        No. AI operates on PII-stripped metadata only. Documents are processed client-side (PDF.js +
        Tesseract.js). Only stripped text reaches the server.
      </DocP>

      <DocH3 id="ai-required">Are AI features required?</DocH3>
      <DocP>
        No. All AI features are optional, gated by feature flags, and have manual fallback. AI
        failures never block the core verification workflow.
      </DocP>

      {/* ═══ 6. Billing & Pricing ═══ */}
      <DocH2 id="billing-pricing">6. Billing & Pricing</DocH2>

      <DocH3 id="free-tier">Is there a free tier?</DocH3>
      <DocP>
        Yes. A generous free tier is available to maximize developer adoption. See{' '}
        <a href="https://arkova.ai" className="text-cyber-cyan/70 hover:text-cyber-cyan transition-colors">arkova.ai</a>{' '}
        for current pricing.
      </DocP>

      <DocH3 id="ai-credits">How are AI credits counted?</DocH3>
      <DocP>
        Metadata extraction: 1 credit. Semantic search: 1 credit. Fraud analysis: 5 credits.
        Embedding generation: 1 credit.
      </DocP>

      <DocH3 id="pay-per-call">Can I pay per API call?</DocH3>
      <DocP>
        Yes. x402 micropayments (USDC on Base L2) enable pay-per-call access without a subscription.
      </DocP>
    </DocLayout>
  );
}
