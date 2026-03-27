import { Link } from 'react-router-dom';
import DocLayout, {
  DocH2,
  DocH3,
  DocP,
  DocUl,
  DocLi,
  DocStrong,
  DocCode,
  DocCodeBlock,
  DocCallout,
} from '../../components/DocLayout';
import type { TocItem, SidebarSection } from '../../components/DocLayout';

/* ═══════════════════════════════════════════
   Table of Contents
   ═══════════════════════════════════════════ */

const tocItems: TocItem[] = [
  { id: 'prerequisites', label: '1. Prerequisites' },
  { id: 'create-account', label: '2. Create an Account' },
  { id: 'upload-credential', label: '3. Upload Your First Credential' },
  { id: 'anchor-bitcoin', label: '4. Anchor to the Network' },
  { id: 'share-verify', label: '5. Share & Verify' },
  { id: 'integrate-api', label: '6. Integrate via API' },
  { id: 'next-steps', label: '7. Next Steps' },
];

/* ═══════════════════════════════════════════
   Sidebar
   ═══════════════════════════════════════════ */

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart', active: true },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Technical Wiki', href: '/wiki' },
  { label: 'API Reference', href: '/docs/api' },
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
  { label: 'Getting Started' },
];

/* ═══════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════ */

export default function QuickstartPage() {
  return (
    <DocLayout
      title="Quickstart — Verify your first credential in 5 minutes"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
      lastUpdated="March 2026"
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. Prerequisites
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="prerequisites">1. Prerequisites</DocH2>

      <DocCallout type="note">
        Arkova is currently in beta. Request early access at{' '}
        <Link to="/" className="text-cyber-cyan hover:underline">arkova.ai</Link>.
      </DocCallout>

      <DocH3>What you need</DocH3>
      <DocUl>
        <DocLi>
          A <DocStrong>modern browser</DocStrong> — Chrome, Firefox, Safari, or Edge
        </DocLi>
        <DocLi>
          An <DocStrong>email address</DocStrong> for account creation
        </DocLi>
      </DocUl>

      <DocP>
        No software installation required — Arkova runs entirely in the browser.
      </DocP>

      <DocP>
        For API integration: any HTTP client or one of our SDKs (<DocCode>Python</DocCode>,{' '}
        <DocCode>TypeScript</DocCode>).
      </DocP>

      {/* ═══════════════════════════════════════════════════════════════
          2. Create an Account
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="create-account">2. Create an Account</DocH2>

      <DocUl>
        <DocLi>
          Go to <DocStrong>app.arkova.ai</DocStrong> and click{' '}
          <DocStrong>"Create Account"</DocStrong>
        </DocLi>
        <DocLi>Enter your email and password</DocLi>
        <DocLi>Verify your email address</DocLi>
      </DocUl>

      <DocCallout type="tip">
        For organization accounts, you'll be prompted to create or join an organization after
        signing in.
      </DocCallout>

      {/* ═══════════════════════════════════════════════════════════════
          3. Upload Your First Credential
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="upload-credential">3. Upload Your First Credential</DocH2>

      <DocUl>
        <DocLi>
          Navigate to <DocStrong>Documents</DocStrong> from the sidebar
        </DocLi>
        <DocLi>
          Click <DocStrong>"Secure Document"</DocStrong>
        </DocLi>
        <DocLi>
          Select or drag-and-drop your document (PDF, image, or other file)
        </DocLi>
      </DocUl>

      <DocCallout type="important">
        Your document never leaves your device. Arkova generates a SHA-256 fingerprint entirely in
        your browser using the Web Crypto API. Only the fingerprint and PII-stripped metadata are
        sent to the server.
      </DocCallout>

      <DocP>
        If AI extraction is enabled, Arkova will automatically extract metadata (issuer, dates,
        credential type) from the document.
      </DocP>

      <DocP>
        Review and confirm the extracted metadata, then click{' '}
        <DocStrong>"Anchor"</DocStrong> to submit the credential for network anchoring.
      </DocP>

      {/* ═══════════════════════════════════════════════════════════════
          4. Anchor to the Network
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="anchor-bitcoin">4. Anchor to the Network</DocH2>

      <DocP>
        Once submitted, your credential enters the anchoring pipeline. You can track it through
        these status stages:
      </DocP>

      <DocUl>
        <DocLi>
          <DocStrong>PENDING</DocStrong> — Queued for the next anchoring batch
        </DocLi>
        <DocLi>
          <DocStrong>SUBMITTED</DocStrong> — Anchor transaction broadcast to the network
        </DocLi>
        <DocLi>
          <DocStrong>SECURED</DocStrong> — Transaction confirmed in a network block. Your credential
          now has an immutable timestamp.
        </DocLi>
      </DocUl>

      <DocCallout type="note">
        Anchoring batches run every 5 minutes. Multiple credentials are combined into a single
        network transaction using a Merkle tree, keeping costs low while maintaining individual
        verifiability.
      </DocCallout>

      <DocP>
        Each anchor contains: <DocCode>ARKV</DocCode> prefix (4 bytes) + Merkle root hash (32 bytes)
        written via <DocCode>OP_RETURN</DocCode>.
      </DocP>

      {/* ═══════════════════════════════════════════════════════════════
          5. Share & Verify
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="share-verify">5. Share &amp; Verify</DocH2>

      <DocP>
        Once <DocStrong>SECURED</DocStrong>, your credential gets a public verification page.
        Share it via: direct link, QR code, or embed.
      </DocP>

      <DocP>
        Anyone can verify without an account — they see: verification status, issuer, timestamp,
        anchor transaction reference, and lifecycle timeline.
      </DocP>

      <DocP>
        Download a <DocStrong>PDF proof certificate</DocStrong> for offline verification.
      </DocP>

      <DocCodeBlock language="text">{`https://app.arkova.ai/verify/ARK-2026-XXXXX`}</DocCodeBlock>

      {/* ═══════════════════════════════════════════════════════════════
          6. Integrate via API
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="integrate-api">6. Integrate via API</DocH2>

      <DocP>
        For programmatic verification, use the Verification API.
      </DocP>

      <DocCodeBlock language="bash">{`# Verify a credential
curl https://app.arkova.ai/api/v1/verify/ARK-2026-00091

# With API key for higher rate limits
curl -H "Authorization: Bearer ak_live_your_key" \\
  https://app.arkova.ai/api/v1/verify/ARK-2026-00091`}</DocCodeBlock>

      <DocCodeBlock language="typescript">{`import { ArkovaClient } from '@arkova/sdk';

const client = new ArkovaClient({ apiKey: 'ak_live_...' });
const result = await client.verify('ARK-2026-00091');

console.log(result.verified);  // true
console.log(result.status);    // "ACTIVE"`}</DocCodeBlock>

      <DocP>
        See the full{' '}
        <Link to="/docs/api" className="text-cyber-cyan hover:underline">API Reference</Link> and{' '}
        <Link to="/docs/sdks" className="text-cyber-cyan hover:underline">SDK documentation</Link>{' '}
        for more details.
      </DocP>

      {/* ═══════════════════════════════════════════════════════════════
          7. Next Steps
          ═══════════════════════════════════════════════════════════════ */}
      <DocH2 id="next-steps">7. Next Steps</DocH2>

      <DocUl>
        <DocLi>
          Set up webhooks to receive real-time notifications{' '}
          <Link to="/docs/webhooks" className="text-cyber-cyan hover:underline">/docs/webhooks</Link>
        </DocLi>
        <DocLi>
          Explore the full API Reference{' '}
          <Link to="/docs/api" className="text-cyber-cyan hover:underline">/docs/api</Link>
        </DocLi>
        <DocLi>
          Install the Python or TypeScript SDK{' '}
          <Link to="/docs/sdks" className="text-cyber-cyan hover:underline">/docs/sdks</Link>
        </DocLi>
        <DocLi>
          Connect AI agents via MCP{' '}
          <Link to="/docs/mcp" className="text-cyber-cyan hover:underline">/docs/mcp</Link>
        </DocLi>
        <DocLi>
          Read the Whitepaper for the full architecture{' '}
          <Link to="/whitepaper" className="text-cyber-cyan hover:underline">/whitepaper</Link>
        </DocLi>
        <DocLi>
          Dive into the Technical Wiki for security details{' '}
          <Link to="/wiki" className="text-cyber-cyan hover:underline">/wiki</Link>
        </DocLi>
      </DocUl>
    </DocLayout>
  );
}
