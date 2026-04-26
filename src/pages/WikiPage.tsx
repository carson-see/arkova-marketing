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
  DocDiagram,
} from '../components/DocLayout';
import type { TocItem, SidebarSection } from '../components/DocLayout';

const tocItems: TocItem[] = [
  { id: 'system-overview', label: '1. System Overview & Architecture' },
  { id: 'security-privacy', label: '2. Security & Privacy' },
  { id: 'terminology-compliance', label: '3. Terminology & Compliance' },
  { id: 'ai-intelligence', label: '4. AI Intelligence Suite' },
  { id: 'roadmap-evolution', label: '5. Roadmap & Evolution' },
  { id: 'developer-reference', label: '6. Developer Reference' },
  { id: 'api-reference', label: '7. API Reference' },
  { id: 'shared-responsibility', label: '8. Shared Responsibility' },
];

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Whitepaper', href: '/whitepaper' },
  {
    label: 'Technical Wiki',
    href: '/wiki',
    active: true,
    children: [
      { label: 'System Overview', href: '/wiki#system-overview' },
      { label: 'Security & Privacy', href: '/wiki#security-privacy' },
      { label: 'Terminology', href: '/wiki#terminology-compliance' },
      { label: 'AI Suite', href: '/wiki#ai-intelligence' },
      { label: 'Roadmap', href: '/wiki#roadmap-evolution' },
      { label: 'Dev Reference', href: '/wiki#developer-reference' },
      { label: 'API Reference', href: '/wiki#api-reference' },
      { label: 'Shared Responsibility', href: '/wiki#shared-responsibility' },
    ],
  },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'Research', href: '/research' },
];

const breadcrumbs = [
  { label: 'Docs', href: '/docs' },
  { label: 'Technical & Security Wiki' },
];

export default function WikiPage() {
  return (
    <DocLayout
      title="Technical & Security Wiki"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
      lastUpdated="March 2026"
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. System Overview & Architecture
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="system-overview">1. System Overview &amp; Architecture</DocH2>

      <DocH3>What Arkova Is</DocH3>
      <DocP>
        Arkova is a <DocStrong>jurisdiction-aware verification layer</DocStrong> that enables
        organizations to issue, anchor, and verify credentials against the anchoring network. It
        transforms documents such as diplomas, certificates, licenses, attestations, and compliance
        records into tamper-evident digital credentials — without ever taking custody of the
        underlying documents.
      </DocP>
      <DocP>
        Arkova is <DocStrong>not</DocStrong> a blockchain company. It is a{' '}
        <DocStrong>verification infrastructure</DocStrong> company that uses a public ledger as an immutable
        timestamping layer.
      </DocP>

      <DocH3>The Verification Layer Concept</DocH3>

      <DocDiagram>{`┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│   ISSUER    │  anchor   │   ARKOVA    │  verify   │  VERIFIER   │
│ (University,│ ────────► │ Verification│ ◄──────── │ (Employer,  │
│  Employer,  │          │   Layer     │          │  Regulator, │
│  Regulator) │          │             │          │  Partner)   │
└─────────────┘          └─────────────┘          └─────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │   ANCHORING     │
                     │   NETWORK       │
                     │  (Immutable     │
                     │   Timestamp)    │
                     └─────────────────┘`}</DocDiagram>

      <DocP>
        <DocStrong>How it works:</DocStrong>
      </DocP>
      <DocUl>
        <DocLi>
          The Issuer uploads or creates a credential. The document is fingerprinted (SHA-256)
          entirely on the user's device. Only the fingerprint — never the document — leaves the
          browser.
        </DocLi>
        <DocLi>
          Arkova anchors the fingerprint to the anchoring network via an OP_RETURN output containing a 36-byte
          payload (ARKV prefix + SHA-256 hash).
        </DocLi>
        <DocLi>
          Any Verifier can query Arkova's API or public verification page to confirm the
          credential's authenticity, timestamp, issuer, and status.
        </DocLi>
      </DocUl>

      <DocH3>Non-Custodial Architecture</DocH3>
      <DocTable
        headers={['Dimension', 'What This Means']}
        rows={[
          [
            'Document Non-Custody',
            'Documents never leave the user\'s device. Arkova never receives, stores, transmits, or processes raw document content. Only a one-way SHA-256 fingerprint is stored.',
          ],
          [
            'Financial Non-Custody',
            'Arkova does not store, accept, or manage user cryptocurrency. All on-chain fees are paid from an Arkova-managed corporate fee account.',
          ],
          [
            'Key Non-Custody',
            'Treasury signing keys are secured in cloud HSMs (AWS KMS / GCP Cloud HSM). No human has access to raw private key material.',
          ],
        ]}
      />

      <DocCallout type="important">
        This design eliminates regulated data custody risk. Arkova does not become a custodian of
        PII, financial assets, or cryptographic material.
      </DocCallout>

      <DocH3>Schema-First Build Philosophy</DocH3>
      <DocUl>
        <DocLi>
          <DocStrong>Schema First</DocStrong> — Define Postgres tables, columns, constraints, and
          Row Level Security policies before writing any application code.
        </DocLi>
        <DocLi>
          <DocStrong>Migration Immutability</DocStrong> — Once a migration is applied, it is never
          modified. Changes are expressed as compensating migrations.
        </DocLi>
        <DocLi>
          <DocStrong>Type Generation</DocStrong> — TypeScript types are auto-generated from the
          database schema, ensuring compile-time safety across the full stack.
        </DocLi>
        <DocLi>
          <DocStrong>Validation at the Boundary</DocStrong> — All write paths are validated with Zod
          schemas before reaching the database.
        </DocLi>
      </DocUl>

      {/* ═══════════════════════════════════════════════════════════════
          2. Security & Privacy
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="security-privacy">2. Security &amp; Privacy</DocH2>

      <DocH3>Mandatory Row Level Security (RLS)</DocH3>
      <DocP>
        Every table in the Arkova database has <DocCode>FORCE ROW LEVEL SECURITY</DocCode> enabled.
        This is a non-negotiable architectural constraint.
      </DocP>

      <DocCallout type="note">
        Even if application code has a bug, the database will refuse to return rows the authenticated
        user is not authorized to see. <DocCode>FORCE ROW LEVEL SECURITY</DocCode> means RLS
        policies apply even to the table owner.
      </DocCallout>

      <DocTable
        headers={['Table', 'Policy']}
        rows={[
          ['anchors', 'Users see own anchors + org anchors (via org membership)'],
          ['profiles', 'Users see own profile only'],
          ['organizations', 'Members see their own org'],
          ['audit_events', 'Users see own events only'],
          ['api_keys', 'ORG_ADMIN only (not readable by ORG_MEMBER)'],
          ['webhook_endpoints', 'ORG_ADMIN full CRUD for own org'],
          ['billing_events', 'User reads own; append-only (triggers block UPDATE/DELETE)'],
          ['attestations', 'Public read; write restricted to authenticated users'],
        ]}
      />

      <DocH3>Tenant Isolation</DocH3>
      <DocP>
        Multi-tenancy is enforced at the database level, not the application level. Every row carries
        an <DocCode>org_id</DocCode> foreign key. RLS policies use <DocCode>auth.uid()</DocCode> to
        resolve the caller's identity. Cross-tenant data access is architecturally impossible.
      </DocP>

      <DocH3>The Client-Side Processing Boundary</DocH3>

      <DocCallout type="important">
        Documents never leave the user's device. This is Arkova's foundational privacy guarantee.
      </DocCallout>

      <DocDiagram>{`┌─────────────────────────────────────────────────────────┐
│  USER'S DEVICE (Browser)                                │
│                                                         │
│  Document  ──►  PDF.js / Tesseract.js  ──►  Raw OCR    │
│                 (Web Worker)                Text         │
│                                              │          │
│                                              ▼          │
│                                    PII Stripping        │
│                                              │          │
│  SHA-256 Fingerprint  ◄──── Document ────────┤          │
│       (32 bytes)                             │          │
│            │                                 ▼          │
│            │                     PII-Stripped Metadata   │
└────────────┼─────────────────────────┼──────────────────┘
             │                         │
     ────────┼─────────────────────────┼──── NETWORK BOUNDARY
             │                         │
             ▼                         ▼
    ┌─────────────┐          ┌─────────────────┐
    │  Supabase   │          │  Worker (AI)    │
    └─────────────┘          └─────────────────┘`}</DocDiagram>

      <DocP>
        <DocStrong>Why this matters for partners:</DocStrong>
      </DocP>
      <DocUl>
        <DocLi>Arkova is not a data processor under GDPR for document content</DocLi>
        <DocLi>There is no "raw mode" bypass</DocLi>
        <DocLi>
          The <DocCode>generateFingerprint()</DocCode> function is architecturally prohibited from
          being imported in server-side code
        </DocLi>
        <DocLi>
          Client-side PII stripping uses regex-based removal of SSNs, student IDs, DOBs, emails,
          phones, and names
        </DocLi>
      </DocUl>

      <DocH3>Audit Trail</DocH3>
      <DocP>
        All significant actions logged to immutable, append-only <DocCode>audit_events</DocCode>{' '}
        table. Triggers reject all UPDATE and DELETE — even from <DocCode>service_role</DocCode>.
        Event categories: AUTH, ANCHOR, PROFILE, ORG, ADMIN, SYSTEM. PII fields nullified at write
        time.
      </DocP>

      <DocH3>API Key Security</DocH3>
      <DocP>
        Keys hashed with HMAC-SHA256 using <DocCode>API_KEY_HMAC_SECRET</DocCode>. Raw keys never
        stored after initial creation. Supports scoped permissions:{' '}
        <DocCode>verify</DocCode>, <DocCode>verify:batch</DocCode>,{' '}
        <DocCode>keys:manage</DocCode>, <DocCode>usage:read</DocCode>.
      </DocP>

      <DocH3>On-Chain Content Policy</DocH3>
      <DocP>
        Only 36 bytes are ever written to the anchoring network: <DocCode>ARKV</DocCode> (4 bytes) + SHA-256 hash
        (32 bytes). Forbidden from on-chain: filenames, file sizes, MIME types, user IDs, org IDs,
        email addresses, any PII.
      </DocP>

      {/* ═══════════════════════════════════════════════════════════════
          3. Terminology & Compliance
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="terminology-compliance">3. Terminology &amp; Compliance</DocH2>

      <DocH3>Strict Enterprise Terminology</DocH3>
      <DocTable
        headers={['Banned Term', 'Required Alternative', 'Rationale']}
        rows={[
          ['Wallet', 'Fee Account / Billing Account', 'Avoids confusion with custodial cryptocurrency wallets'],
          ['Transaction', 'Network Receipt / Anchor Receipt', 'Prevents association with financial transactions'],
          ['Hash', 'Fingerprint', 'Enterprise-friendly; conveys intent without jargon'],
          ['Block', 'Network Confirmation', 'Avoids blockchain-specific terminology'],
          ['Blockchain / Bitcoin', 'Anchoring Network / Production Network', 'Technology-neutral messaging'],
          ['Testnet / Mainnet', 'Test Environment / Production Network', 'Standard enterprise naming'],
          ['Gas', 'Network Fee', 'Not applicable but reserved'],
          ['UTXO / Broadcast', '(internal only)', 'No user-visible equivalent'],
        ]}
      />

      <DocCallout type="note">
        This policy is CI-enforced via <DocCode>npm run lint:copy</DocCode>. All user-visible
        strings are centralized in <DocCode>src/lib/copy.ts</DocCode>.
      </DocCallout>

      <DocH3>Credential Types</DocH3>
      <DocTable
        headers={['Type', 'Examples']}
        rows={[
          ['DIPLOMA', 'University degrees, academic diplomas'],
          ['CERTIFICATE', 'Professional certifications, course completions'],
          ['LICENSE', 'Professional licenses, regulatory permits'],
          ['BADGE', 'Digital badges, micro-credentials'],
          ['ATTESTATION', 'Third-party attestation claims'],
          ['FINANCIAL', 'Financial compliance documents'],
          ['LEGAL', 'Legal agreements, contracts'],
          ['INSURANCE', 'Insurance certificates, COIs'],
          ['SEC_FILING', 'SEC regulatory filings'],
          ['PATENT', 'Patent filings and grants'],
          ['REGULATION', 'Regulatory documents'],
          ['PUBLICATION', 'Academic publications'],
          ['OTHER', 'General-purpose catch-all'],
        ]}
      />

      <DocH3>Compliance Posture</DocH3>
      <DocTable
        headers={['Requirement', "Arkova's Approach"]}
        rows={[
          ['GDPR', 'Non-custodial for documents. Fingerprints are one-way hashes. Account deletion implemented with full cascade.'],
          ['SOC 2', 'Evidence collection documented. Branch protection, RLS, audit trails, and key management provide CC6.1/CC6.3/CC7.2 controls.'],
          ['Data Retention', 'Configurable retention policies. cleanup_expired_data RPC runs on schedule. Legal hold overrides prevent deletion when active.'],
          ['CCPA', 'Account deletion cascade covers all personal data. No sale of personal information.'],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          4. AI Intelligence Suite
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="ai-intelligence">4. AI Intelligence Suite</DocH2>

      <DocH3>Overview</DocH3>
      <DocP>
        Arkova's AI operates exclusively on PII-stripped metadata, never on raw document content.
      </DocP>

      <DocH3>Architecture</DocH3>
      <DocDiagram>{`┌────────────────────────────────────┐
│  Client (Browser)                  │
│  OCR (PDF.js + Tesseract.js)       │
│         │                          │
│         ▼                          │
│  PII Stripping (regex-based)       │
│         │                          │
│         ▼                          │
│  Stripped Text + Fingerprint       │
└─────────┼──────────────────────────┘
          │  POST /api/v1/ai/extract
          ▼
┌────────────────────────────────────┐
│  Worker (Server)                   │
│  IAIProvider Interface             │
│    ├── GeminiProvider (primary)    │
│    ├── Cloudflare AI (fallback)    │
│    └── Replicate (QA only)        │
│         │                          │
│         ▼                          │
│  Structured Metadata Fields        │
│  + Confidence Score (0-1)          │
│  + Integrity Score (0-100)         │
└────────────────────────────────────┘`}</DocDiagram>

      <DocH3>Capabilities</DocH3>
      <DocTable
        headers={['Capability', 'Description']}
        rows={[
          ['Metadata Extraction', 'Extracts structured fields from PII-stripped OCR text using Gemini Flash. Returns confidence scores per field.'],
          ['Batch Extraction', 'Process multiple credentials in a single request. Up to 100 items.'],
          ['Semantic Search', 'Natural language search across all credentials using pgvector embeddings (768-dim).'],
          ['Fraud / Integrity Scoring', 'Computes 0-100 integrity score. Scores below 60 auto-flagged for human review.'],
          ['Visual Fraud Detection', 'Image-based fraud analysis for credential documents.'],
          ['Human Review Queue', 'Flagged credentials surface in admin review queue with disposition workflow.'],
          ['Extraction Feedback', 'Closed-loop learning: human corrections improve future accuracy.'],
          ['Knowledge Query', 'Retrieval-augmented generation against 29,000+ public records. Returns cited sources.'],
        ]}
      />

      <DocH3>Cost-Efficiency Model</DocH3>
      <DocTable
        headers={['Operation', 'Cost', 'Model']}
        rows={[
          ['Metadata Extraction', '1 AI credit', 'Gemini 2.0 Flash'],
          ['Semantic Search', '1 AI credit', 'text-embedding-004'],
          ['Fraud Analysis', '5 AI credits', 'Gemini 2.0 Flash'],
          ['Embedding Generation', '1 AI credit', 'text-embedding-004'],
          ['RAG Query', 'Variable', 'Gemini + pgvector'],
        ]}
      />

      <DocCallout type="tip">
        Gemini Flash provides extraction accuracy on par with larger models (F1=82.1%) at ~$0.075
        per 1M input tokens. The provider abstraction layer supports hot-swapping to OpenAI or
        Anthropic.
      </DocCallout>

      <DocH3>Feature Flags</DocH3>
      <DocTable
        headers={['Flag', 'Gates', 'Default']}
        rows={[
          ['ENABLE_AI_EXTRACTION', 'All extraction endpoints + client-side pipeline', 'false'],
          ['ENABLE_SEMANTIC_SEARCH', 'pgvector search endpoints', 'false'],
          ['ENABLE_AI_FRAUD', 'Fraud analysis pipeline', 'false'],
        ]}
      />

      <DocH3>Public Data Pipeline</DocH3>
      <DocTable
        headers={['Source', 'Records', 'Update Frequency']}
        rows={[
          ['SEC EDGAR', 'Filings', 'Continuous'],
          ['Federal Register', 'Regulatory actions', 'Continuous'],
          ['DAPIP (Dept. of Education)', 'Institutional data', 'Batch (resumable)'],
          ['OpenAlex', 'Academic publications', 'Every 30 minutes'],
          ['Total', '29,000+', 'Auto-growing via Cloud Scheduler'],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          5. Roadmap & Evolution
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="roadmap-evolution">5. Roadmap &amp; Evolution</DocH2>

      <DocH3>Three-Phase Product Evolution</DocH3>
      <DocTable
        headers={['Phase', 'Name', 'Status', 'Description']}
        rows={[
          ['Phase 1', 'Credentialing MVP', '<strong>Live (94% complete)</strong>', 'Issue, anchor, verify credentials. Network anchoring. AI extraction. Verification API. Payments.'],
          ['Phase 1.5', 'Foundation', '<strong>In Progress</strong>', 'Public records pipeline, x402 micropayments, RAG intelligence, SDKs, multi-chain support.'],
          ['Phase 2', 'Attestations', 'Planned', 'Third-party attestation claims, lifecycle management, network anchoring.'],
          ['Phase 3', 'E-Signatures', 'Planned', 'Legally recognized electronic signatures on anchoring infrastructure.'],
        ]}
      />

      <DocH3>Detailed Milestone Roadmap</DocH3>
      <DocTable
        headers={['Milestone', 'Target', 'Key Deliverables']}
        rows={[
          ['Beta Launch (Signet)', '<strong>Complete</strong>', '1,572+ SECURED anchors, 13 beta stories, 2,236 tests'],
          ['Production Network', 'Q2 2026', 'Production treasury funding, batch anchoring, production receipts'],
          ['Base L2 Anchoring', 'Q2 2026', 'Multi-chain support via Base'],
          ['Attestation API v1', 'Q2 2026', '5 attestation types, revocation, expiry, CRUD API'],
          ['x402 Micropayments', 'Q2 2026', 'USDC on Base L2, pay-per-call API'],
          ['Python & TypeScript SDKs', 'Q2 2026', 'Partner integration libraries'],
          ['E-Signature Layer', 'Q4 2026', 'Legally binding signatures anchored to the anchoring network'],
        ]}
      />

      <DocH3>Infrastructure Metrics</DocH3>
      <DocTable
        headers={['Metric', 'Value']}
        rows={[
          ['Database Migrations', '121'],
          ['Test Suite', '2,433+ tests (1,024 frontend + 1,409 worker)'],
          ['Stories Completed', '180 / 192 (94%)'],
          ['Security Audit Findings', '24 / 24 resolved (100%)'],
          ['SECURED Anchors', '1,572+'],
          ['Public Records Indexed', '29,000+'],
          ['Vector Embeddings', '9,300+'],
          ['AI Eval F1 Score', '82.1%'],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          6. Developer Reference
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="developer-reference">6. Developer Reference</DocH2>

      <DocH3>Technology Stack</DocH3>
      <DocTable
        headers={['Layer', 'Technology', 'Purpose']}
        rows={[
          ['Frontend', 'React 18 + TypeScript', 'Single-page application'],
          ['Styling', 'Tailwind CSS + shadcn/ui', 'Component library and design system'],
          ['Bundler', 'Vite', 'Development and production builds'],
          ['Routing', 'react-router-dom v6', 'Client-side routing'],
          ['Database', 'Supabase (Postgres)', 'Managed Postgres with auth, realtime, RLS'],
          ['Auth', 'Supabase Auth', 'Email/password, Google OAuth, MFA/TOTP'],
          ['Worker', 'Node.js + Express', 'Webhooks, anchoring jobs, cron, AI processing'],
          ['Validation', 'Zod', 'Runtime schema validation'],
          ['Payments', 'Stripe (SDK + webhooks)', 'Subscription billing (worker-only)'],
          ['Micropayments', 'x402 Protocol (USDC on Base L2)', 'Pay-per-call API access'],
          ['Chain (Anchoring)', 'bitcoinjs-lib + Cloud HSM', 'OP_RETURN anchoring'],
          ['Chain (Base L2)', 'viem', 'EVM-based anchoring'],
          ['AI (Primary)', 'Gemini 2.0 Flash', 'Extraction, fraud, RAG'],
          ['AI (Fallback)', 'Cloudflare Workers AI', 'Gated by ENABLE_AI_FALLBACK'],
          ['Vector Search', 'pgvector', '768-dim embeddings'],
          ['Testing', 'Vitest + Playwright', 'Unit, integration, RLS, E2E'],
          ['Formal Verification', 'TLA PreCheck', 'State machine correctness proofs'],
          ['Observability', 'Sentry', 'Error tracking with PII scrubbing'],
          ['Edge Compute', 'Cloudflare Workers', 'MCP server, queue processing'],
          ['Ingress', 'Cloudflare Tunnel', 'Zero Trust, no public ports'],
          ['CI/CD', 'GitHub Actions → Vercel + Railway', 'Automated deploy on merge'],
        ]}
      />

      <DocH3>Infrastructure Topology</DocH3>
      <DocDiagram>{`┌──────────────────────────────────────────────────────────────┐
│  Internet                                                     │
│                                                               │
│  ┌───────────────┐    ┌───────────────┐    ┌──────────────┐ │
│  │  Vercel CDN   │    │  Cloudflare   │    │  Cloud Run   │ │
│  │  (Frontend)   │    │  Tunnel       │    │  (Worker)    │ │
│  │  React SPA    │    │  Zero Trust   │    │  Express API │ │
│  └───────┬───────┘    └───────┬───────┘    └──────┬───────┘ │
│          │                    │                    │          │
│          ▼                    ▼                    ▼          │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Supabase (Managed Postgres)                         │    │
│  │  • Auth  • Realtime  • RLS  • pgvector              │    │
│  └──────────────────────────────────────────────────────┘    │
│          │                                    │              │
│          ▼                                    ▼              │
│  ┌───────────────┐                   ┌───────────────┐      │
│  │  Stripe       │                   │  Anchoring  │      │
│  │  (Payments)   │                   │  Base L2      │      │
│  └───────────────┘                   └───────────────┘      │
└──────────────────────────────────────────────────────────────┘`}</DocDiagram>

      <DocH3>Webhook Reliability</DocH3>
      <DocTable
        headers={['Standard', 'Specification']}
        rows={[
          ['Delivery Protocol', 'HTTPS only (enforced by database CHECK constraint)'],
          ['Signature', 'HMAC-SHA256 on full payload body. X-Arkova-Signature header.'],
          ['Retry Policy', '5 attempts with exponential backoff: immediate → 1m → 5m → 30m → 2h'],
          ['Circuit Breaker', 'Consecutive failures trip the circuit. Probe after cooldown.'],
          ['Dead Letter Queue', 'After all retries, events retained 30 days. Manual replay available.'],
          ['Timeout', '30-second delivery timeout'],
          ['Rate Limit', '100 deliveries/minute per organization'],
          ['Idempotency', 'idempotency_key prevents duplicate processing'],
        ]}
      />

      <DocH3>Webhook Events</DocH3>
      <DocTable
        headers={['Event', 'Trigger']}
        rows={[
          ['anchor.created', 'New credential anchor created'],
          ['anchor.secured', 'Anchor confirmed on the anchoring network'],
          ['anchor.revoked', 'Credential revoked'],
          ['anchor.verified', 'Verification lookup performed'],
          ['attestation.created', 'New attestation claim created'],
          ['attestation.revoked', 'Attestation revoked'],
        ]}
      />

      <DocH3>Authentication Methods</DocH3>
      <DocTable
        headers={['Method', 'Use Case', 'Header']}
        rows={[
          ['API Key (Bearer)', 'Verification API, batch operations', 'Authorization: Bearer ak_live_...'],
          ['API Key (Header)', 'Alternative API key delivery', 'X-API-Key: ak_live_...'],
          ['Supabase JWT', 'Key management, AI endpoints', 'Authorization: Bearer eyJ...'],
          ['x402 Payment', 'Pay-per-call (no subscription)', 'HTTP 402 → USDC payment → retry with proof'],
        ]}
      />

      <DocH3>Rate Limiting</DocH3>
      <DocTable
        headers={['Scope', 'Limit', 'Response']}
        rows={[
          ['Anonymous (public verification)', '100 req/min per IP', 'HTTP 429 + Retry-After'],
          ['API Key holders', '1,000 req/min per key', 'HTTP 429 + Retry-After'],
          ['Batch endpoints', '10 req/min per API key', 'HTTP 429 + Retry-After'],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          7. API Reference
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="api-reference">7. API Reference</DocH2>

      <DocH3>Base URL</DocH3>
      <DocCodeBlock language="bash">{'https://{worker-host}/api/v1'}</DocCodeBlock>

      <DocCallout type="tip">
        Interactive documentation (Swagger UI) is available at <DocCode>/api/docs</DocCode>. The
        OpenAPI 3.0 spec is downloadable at <DocCode>/api/docs/spec.json</DocCode>.
      </DocCallout>

      <DocH3>Authentication</DocH3>
      <DocCodeBlock language="bash">{`# Bearer token
curl -H "Authorization: Bearer ak_live_your_key_here" \\
  https://api.arkova.ai/api/v1/verify/ARK-2026-001

# Header
curl -H "X-API-Key: ak_live_your_key_here" \\
  https://api.arkova.ai/api/v1/verify/ARK-2026-001`}</DocCodeBlock>

      <DocH3>Verification Endpoints</DocH3>
      <DocTable
        headers={['Method', 'Endpoint', 'Auth', 'Description']}
        rows={[
          ['GET', '/verify/{publicId}', 'Optional', 'Verify a single credential. Returns frozen schema.'],
          ['POST', '/verify/batch', 'Required', 'Batch verify up to 100 credentials.'],
          ['GET', '/verify/{publicId}/proof', 'Optional', 'Download cryptographic proof package.'],
          ['GET', '/verify/entity', 'Required', 'Cross-reference entity against public records.'],
          ['GET', '/verify/search', 'Required', 'Agentic semantic search. Designed for AI agents.'],
          ['GET', '/jobs/{jobId}', 'Required', 'Poll async batch job status.'],
          ['GET', '/usage', 'Required', 'Current month API usage.'],
        ]}
      />

      <DocH3>Verification Response Schema (Frozen)</DocH3>

      <DocCallout type="important">
        The verification response schema is frozen — fields cannot be removed or renamed after
        publication. Only additive nullable fields may be added.
      </DocCallout>

      <DocCodeBlock language="json">{`{
  "verified": true,
  "status": "ACTIVE",
  "issuer_name": "University of Michigan",
  "recipient_identifier": "sha256:ab3f...",
  "credential_type": "DIPLOMA",
  "issued_date": "2026-01-15T00:00:00Z",
  "expiry_date": null,
  "anchor_timestamp": "2026-03-10T08:00:00Z",
  "network_block": 204567,
  "network_receipt_id": "b8e381df09ca404e...",
  "merkle_proof_hash": null,
  "record_uri": "https://app.arkova.ai/verify/ARK-2026-001",
  "jurisdiction": "US-MI"
}`}</DocCodeBlock>

      <DocP>
        Status values: <DocCode>ACTIVE</DocCode>, <DocCode>REVOKED</DocCode>,{' '}
        <DocCode>SUPERSEDED</DocCode>, <DocCode>EXPIRED</DocCode>, <DocCode>PENDING</DocCode>
      </DocP>

      <DocCallout type="note">
        <DocCode>jurisdiction</DocCode> is omitted when null — it is never returned as null.
      </DocCallout>

      <DocH3>Anchoring Endpoint</DocH3>
      <DocTable
        headers={['Method', 'Endpoint', 'Auth', 'Description']}
        rows={[
          ['POST', '/anchor', 'Required', 'Submit fingerprint for network anchoring. Idempotent.'],
        ]}
      />

      <DocCodeBlock language="json">{`{
  "fingerprint": "a1b2c3d4e5f6...64-char-hex",
  "label": "Bachelor of Science in Computer Science",
  "credential_type": "DIPLOMA",
  "metadata": {
    "issuer": "University of Michigan",
    "issued_date": "2026-01-15"
  }
}`}</DocCodeBlock>

      <DocH3>Attestation Endpoints</DocH3>
      <DocTable
        headers={['Method', 'Endpoint', 'Auth', 'Description']}
        rows={[
          ['POST', '/attestations', 'Required', 'Create an attestation claim.'],
          ['GET', '/attestations', 'Public', 'List attestations with cursor-based pagination.'],
          ['GET', '/attestations/{publicId}', 'Public', 'Retrieve a single attestation.'],
          ['PATCH', '/attestations/{publicId}/revoke', 'Required (owner)', 'Revoke with optional reason.'],
        ]}
      />

      <DocH3>AI Intelligence Endpoints</DocH3>
      <DocTable
        headers={['Method', 'Endpoint', 'Description']}
        rows={[
          ['POST', '/ai/extract', 'Extract structured metadata from PII-stripped text'],
          ['POST', '/ai/extract/batch', 'Batch extraction'],
          ['POST', '/ai/embed', 'Generate 768-dim pgvector embedding'],
          ['GET', '/ai/search', 'Natural language semantic search'],
          ['POST', '/ai/integrity/compute', 'Compute fraud/integrity score (0-100)'],
          ['POST', '/ai/fraud/visual', 'Visual fraud detection'],
          ['GET', '/ai/review', 'List flagged items in review queue'],
          ['POST', '/ai/feedback', 'Submit extraction corrections'],
          ['POST', '/knowledge/query', 'RAG query against knowledge base'],
        ]}
      />

      <DocH3>Error Response Format</DocH3>
      <DocCodeBlock language="json">{`{
  "error": "not_found",
  "message": "Credential with public ID ARK-2026-999 not found"
}`}</DocCodeBlock>

      <DocTable
        headers={['HTTP Status', 'Meaning']}
        rows={[
          ['400', 'Invalid request parameters'],
          ['401', 'Authentication required or invalid'],
          ['402', 'Payment required (x402 or insufficient credits)'],
          ['403', 'Insufficient permissions'],
          ['404', 'Resource not found'],
          ['409', 'Conflict (e.g., already revoked)'],
          ['429', 'Rate limit exceeded'],
          ['503', 'Feature not enabled'],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          8. Shared Responsibility
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="shared-responsibility">8. Shared Responsibility</DocH2>

      <DocH3>Partner Integration Responsibilities</DocH3>
      <DocTable
        headers={['Responsibility', 'Arkova', 'Partner']}
        rows={[
          ['Credential Anchoring', 'Manages network transactions and chain confirmation', 'Submits fingerprints and metadata via API'],
          ['Document Processing', 'Provides client-side SDKs for fingerprinting and OCR', 'Runs fingerprinting in their own client'],
          ['Document Storage', '<strong>Does not store documents</strong>', 'Stores and manages original documents'],
          ['PII Management', 'Strips PII client-side before server transmission', 'Ensures PII not embedded in metadata sent to API'],
          ['API Key Security', 'Issues keys, enforces HMAC hashing, scoped permissions', 'Stores keys securely. Rotates on schedule.'],
          ['Webhook Verification', 'Signs all webhooks with HMAC-SHA256', 'Verifies X-Arkova-Signature on receipt'],
          ['Rate Limit Compliance', 'Enforces limits and returns Retry-After headers', 'Implements backoff. Caches results.'],
          ['Data Retention', 'Configurable retention policies. Legal hold support.', 'Defines retention requirements.'],
          ['AI Extraction Accuracy', 'Targets F1 > 80% across credential types', 'Submits feedback corrections to improve accuracy'],
          ['Schema Versioning', 'Frozen v1 schema. 12-month deprecation for breaking changes.', 'Builds against versioned schema.'],
        ]}
      />

      <DocH3>Investor Infrastructure Summary</DocH3>
      <DocTable
        headers={['Dimension', 'Detail']}
        rows={[
          ['Hosting', 'Vercel (frontend CDN), Cloud Run (worker), Supabase (managed Postgres)'],
          ['Security', 'Cloudflare Zero Trust, RLS on every table, HMAC-SHA256 API keys, cloud HSM signing, SOC 2 evidence'],
          ['Scalability', 'Stateless worker, Postgres connection pooling, CDN-cached frontend, async batch processing'],
          ['Reliability', 'Circuit breakers, dead letter queues, exponential backoff, idempotent webhooks'],
          ['AI Infrastructure', 'Provider-agnostic, credit-based cost controls, feature-flagged rollout, 2,050+ entry golden dataset'],
          ['Compliance', 'GDPR (non-custodial), SOC 2, immutable audit trail, configurable retention, legal hold'],
          ['Chain Strategy', 'Public ledger (immutability) + Base L2 (cost efficiency). Non-custodial. Technology-neutral UX.'],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          Footer
          ═══════════════════════════════════════════════════════════════ */}
      <div className="mt-16 border-t border-white/[0.06] pt-8 text-center">
        <DocP>
          For questions, contact{' '}
          <a
            href="mailto:support@arkova.ai"
            className="text-cyber-cyan/70 hover:text-cyber-cyan transition-colors"
          >
            support@arkova.ai
          </a>
        </DocP>
        <p className="text-[12px] text-white/25">Version 1.0 | March 2026</p>
      </div>
    </DocLayout>
  );
}
