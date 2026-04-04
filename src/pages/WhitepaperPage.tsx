/**
 * Whitepaper Page — renders the full Arkova whitepaper
 * with table of contents sidebar, styled tables, and email CTA.
 */

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { BreadcrumbJsonLd } from '../components/BreadcrumbJsonLd';

const TOC = [
  { id: 'attestation-challenge', label: '1. The Attestation Challenge' },
  { id: 'solution', label: '2. The Solution' },
  { id: 'platform-overview', label: '3. Platform Overview' },
  { id: 'technical-architecture', label: '4. Technical Architecture' },
  { id: 'verification-api', label: '5. Verification API' },
  { id: 'agentic-verification', label: '6. Agentic Verification' },
  { id: 'ai-intelligence', label: '7. AI-Powered Intelligence' },
  { id: 'compliance', label: '8. Compliance' },
  { id: 'use-cases', label: '9. Use Cases' },
  { id: 'business-model', label: '10. Business Model' },
  { id: 'competitive-landscape', label: '11. Competitive Landscape' },
  { id: 'risks', label: '12. Risks & Mitigation' },
  { id: 'roadmap', label: '13. Roadmap' },
  { id: 'conclusion', label: '14. Conclusion' },
  { id: 'team', label: '15. Team' },
];

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-arkova-ice/60 dark:border-white/5 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="bg-arkova-frost/50 dark:bg-white/[0.03] px-4 py-3 text-left font-semibold text-arkova-charcoal dark:text-white border-b border-arkova-ice/60 dark:border-white/5">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-arkova-slate dark:text-arkova-steel-light/60 border-b border-arkova-ice/30 dark:border-white/[0.03]">{children}</td>;
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-5 mt-16 text-2xl font-bold text-arkova-charcoal dark:text-white scroll-mt-24">{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 mt-8 text-lg font-bold text-arkova-charcoal dark:text-white">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mb-4 space-y-2 text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{children}</ul>;
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-arkova-steel/40" /><span>{children}</span></li>;
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-xl bg-arkova-charcoal/95 dark:bg-black/40 p-5 text-xs leading-relaxed font-mono text-arkova-steel-light">
      <code>{children}</code>
    </pre>
  );
}

function InlineBadge({ children, color = 'steel' }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    steel: 'bg-arkova-steel/10 text-arkova-ocean dark:text-arkova-steel',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}>{children}</span>;
}

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState('attestation-challenge');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.1, rootMargin: '-80px 0px -60% 0px' }
    );

    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Whitepaper', url: 'https://arkova.ai/whitepaper' }]} />
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'Arkova: The Universal Verification Layer for Records, Credentials, and Asset Attestations',
            datePublished: '2026-03-15',
            dateModified: '2026-03-15',
            author: [
              { '@id': 'https://arkova.ai/#carson-seeger' },
              { '@id': 'https://arkova.ai/#sarah-rushton' },
            ],
            publisher: { '@id': 'https://arkova.ai/#org' },
            description: 'Technical whitepaper on how Arkova anchors compliance-aligned metadata to a public ledger for independently verifiable records.',
            articleSection: 'Technology',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://arkova.ai/whitepaper',
            },
            wordCount: 5200,
            image: 'https://arkova.ai/og-image.png',
          }),
        }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-mesh-gradient dark:bg-mesh-dark" />
        <div className="absolute inset-0 bg-subtle-dots" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>Technical Whitepaper — Version 2.0</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-arkova-charcoal dark:text-white opacity-0 animate-fade-up md:text-5xl" style={{ animationDelay: '0.2s' }}>
            The Universal Verification Layer for Records, Credentials, and Asset Attestations
          </h1>
          <p className="mb-8 text-base text-arkova-slate dark:text-arkova-steel-light/60 opacity-0 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            By Carson Seeger & Sarah Rushton · March 2026
          </p>
          <div className="flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row" style={{ animationDelay: '0.5s' }}>
            <a href="#attestation-challenge" className="group flex items-center gap-2 rounded-xl bg-arkova-steel px-8 py-3.5 text-sm font-semibold text-white shadow-glow-md transition-all hover:bg-arkova-deep hover:shadow-glow-lg">
              Read the Whitepaper
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ CONTENT ═══ */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">

          {/* TOC sidebar — desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-steel">Contents</p>
              {TOC.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    activeSection === id
                      ? 'bg-arkova-steel/10 font-medium text-arkova-ocean dark:text-arkova-steel'
                      : 'text-arkova-slate dark:text-arkova-steel-light/50 hover:text-arkova-charcoal dark:hover:text-white'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          {/* TOC mobile */}
          <div className="lg:hidden">
            <button onClick={() => setTocOpen(!tocOpen)} className="flex w-full items-center justify-between rounded-xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm font-medium text-arkova-charcoal dark:text-white">
              Table of Contents
              <ChevronDown className={`h-4 w-4 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
            </button>
            {tocOpen && (
              <nav className="mt-2 space-y-1 rounded-xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-3">
                {TOC.map(({ id, label }) => (
                  <a key={id} href={`#${id}`} onClick={() => setTocOpen(false)} className="block rounded-lg px-3 py-1.5 text-xs text-arkova-slate dark:text-arkova-steel-light/50 hover:text-arkova-charcoal dark:hover:text-white">
                    {label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Body */}
          <article ref={contentRef} className="max-w-none">

            {/* ═══ SECTION 1 ═══ */}
            <SectionHeading id="attestation-challenge">1. The Attestation Challenge</SectionHeading>

            <SubHeading>1.1 Rising audit costs and compliance pressure</SubHeading>
            <P>Audit costs and expectations keep rising while evidence remains hard to trust across systems and borders. Public-company audit fees increased 6.4% in 2023 to an average of about $3.01 million per enterprise, and the new Global Internal Audit Standards became effective for quality assessments on January 9, 2025. Regulations including Sarbanes-Oxley (SOX), ESIGN, UETA, and eIDAS are raising the bar for retention, tamper evidence, and cross-border compatibility.</P>

            <SubHeading>1.2 Verification gaps persist</SubHeading>
            <P>Verification gaps show up in multiple markets. In healthcare, Operation Nightingale uncovered over 7,600 fraudulent nursing diplomas that were used to obtain professional licenses across 47+ states. In hiring, surveys indicate a majority of American workers have misrepresented something on a resume. In government benefits, Minnesota investigations revealed billions in allegedly stolen taxpayer funds. These failures share a common root: verification processes that rely on the issuer's cooperation rather than independent mathematical proof.</P>

            <SubHeading>1.3 Technology solutions are emerging, but slowly</SubHeading>
            <P>The root problem is the absence of a neutral, portable proof layer for records and their lifecycle events. Conventional audit trails live inside vendor-controlled systems, forcing third parties to trust operator access controls and change management. As assets and attestations migrate on-chain, investors and regulators will expect independently checkable proofs of holdings and lifecycle events, not screenshots or PDFs.</P>

            <SubHeading>1.4 The agent trust gap</SubHeading>
            <P>AI agents are rapidly becoming the primary interface between people, institutions, and records. As these agents retrieve, present, and act on documents — credentials, contracts, licenses, certificates — a fundamental trust gap has emerged: there is no standardized way to verify that a record an agent presents is authentic, unaltered, and issued by the claimed source.</P>
            <P>When an AI agent takes an autonomous action — signing a contract, filing a regulatory report, making a hiring recommendation — the only evidence is a log entry in whatever system the agent runs on. That log is mutable, controlled by the agent's operator, and provides no independent verification.</P>

            {/* ═══ SECTION 2 ═══ */}
            <SectionHeading id="solution">2. The Solution</SectionHeading>
            <P>Arkova provides the universal verification layer that has been missing. By anchoring compliance-aligned event metadata to a neutral public ledger while leaving sensitive content in existing systems, any counterparty can validate that a specific item existed, was signed, or was updated at a given time, and whether it remains active or has been revoked or superseded.</P>
            <P>Arkova's initial deployment focus is credential verification — one of the most universal and immediately measurable verification problems. By solving credential verification first, Arkova establishes the infrastructure needed for lifecycle tracking, independent verification, and compliance-aligned evidence before expanding to legal documents, asset attestations, and audit artifacts.</P>

            {/* ═══ SECTION 3 ═══ */}
            <SectionHeading id="platform-overview">3. Platform Overview</SectionHeading>
            <P>Arkova is middleware that adds provable integrity to documents, signatures, credentials, and real-world asset attestations. Evidence becomes portable, tamper-evident, and easy to share. Your files stay where they are. Arkova supplies the independent proof layer.</P>

            <SubHeading>3.1 What users do</SubHeading>
            <Ul>
              <Li>Upload or register a record from existing systems such as SharePoint, Google Drive, or Amazon S3.</Li>
              <Li>Sign or co-sign as usual with your preferred e-signature tool.</Li>
              <Li>Attest to facts such as a credential's validity or an inventory snapshot.</Li>
              <Li>Share a verification link with counterparties for sampling, diligence, or onboarding.</Li>
              <Li>Update lifecycle status when needed — revoke, supersede, or renew.</Li>
              <Li>Verify any shared record in seconds with a simple check rather than a back-and-forth.</Li>
            </Ul>

            <SubHeading>3.2 What users get</SubHeading>
            <Ul>
              <Li>A tamper-evident timeline of lifecycle events for each record that is independently verifiable.</Li>
              <Li>Clear status semantics that survive system changes: active, revoked, superseded, and expired.</Li>
              <Li>A public verification page that counterparties can check without trusting a vendor — no account required.</Li>
              <Li>Proofs that travel across borders and between organizations, reducing manual reconciliation.</Li>
              <Li>Downloadable PDF proof certificates with complete audit trails for compliance and legal use.</Li>
            </Ul>

            <SubHeading>3.3 What Arkova is not</SubHeading>
            <Ul>
              <Li><strong>Not a token or trading product.</strong> Arkova never issues tokens and does not monetize customer data.</Li>
              <Li><strong>Not a data-custody platform.</strong> Sensitive documents remain in your storage and e-signature tools.</Li>
              <Li><strong>Not a rip and replace.</strong> Arkova integrates with current workflows and systems as middleware.</Li>
              <Li><strong>Not legal counsel or an external auditor.</strong> Proofs are designed to support, not replace, those functions.</Li>
            </Ul>

            {/* ═══ SECTION 4 ═══ */}
            <SectionHeading id="technical-architecture">4. Technical Architecture</SectionHeading>
            <P>Arkova adds a portable proof layer to the systems you already use. Record content remains in the customer's existing systems or on user devices, and Arkova receives only cryptographic fingerprints and structured metadata required for verification. This boundary is a core architectural principle designed to minimize regulatory exposure, storage risk, and data-residency obligations.</P>

            <SubHeading>4.1 At a glance</SubHeading>
            <P><strong>Hash and timestamp events</strong> — When a record is created, signed, amended, revoked, or attested, Arkova generates a cryptographic fingerprint (SHA-256) of the payload and timestamps the event. Fingerprinting runs entirely in the user's browser using the Web Crypto API — the document never leaves the user's device.</P>
            <P><strong>Anchor the proof to the network</strong> — A compact commitment containing the fingerprint and event data is written to the anchoring network via OP_RETURN transaction with the ARKV protocol prefix. This creates a public, tamper-evident reference that any counterparty can look up.</P>
            <P><strong>Keep documents in existing storage</strong> — Files remain in your DMS, e-signature tool, student information system, or inventory platform. Arkova stores only minimal metadata needed for verification.</P>
            <P><strong>Provide a public verification page</strong> — Each record gets a shareable link and QR code. A counterparty can validate integrity and timing, view the lifecycle timeline, and see the current state — no account required.</P>

            <SubHeading>4.2 What Arkova records for each event</SubHeading>
            <Ul>
              <Li>Fingerprint of the file, credential, or asset snapshot (SHA-256, 64 hex characters)</Li>
              <Li>Event type and version pointer (create, sign, amend, revoke, attest, transfer, renew)</Li>
              <Li>Event time and anchoring transaction reference</Li>
              <Li>Issuer or organization identifier and optional jurisdiction tag</Li>
              <Li>Credential type, metadata fields, and lineage tracking</Li>
            </Ul>

            <SubHeading>4.3 How verification works</SubHeading>
            <Ul>
              <Li>The verifier opens the shared link, scans the QR code, or calls the Verification API.</Li>
              <Li>Arkova recomputes the fingerprint or checks the declared identifier.</Li>
              <Li>The fingerprint and event details are compared against the network anchor via the chain index (O(1) lookup).</Li>
              <Li>The page returns a clear result with the timeline and current status, along with the public transaction reference.</Li>
            </Ul>

            <SubHeading>4.4 Status and version handling</SubHeading>
            <P>Events are chained, not overwritten. New versions create new entries that point to prior ones. Revocations and supersessions are explicit and visible. Status values include: ACTIVE, REVOKED, SUPERSEDED, and EXPIRED.</P>

            {/* ═══ SECTION 5 ═══ */}
            <SectionHeading id="verification-api">5. Verification API</SectionHeading>
            <P>The Verification API transforms Arkova from a credential product into verification infrastructure. An agent, ATS platform, background check provider, or compliance system can call the API and receive a machine-readable, independently verifiable response — no browser, no login, no human in the loop.</P>

            <SubHeading>5.1 Core endpoints</SubHeading>
            <P><strong>Single verification:</strong> <code className="font-mono text-xs bg-arkova-frost dark:bg-white/[0.05] rounded px-1.5 py-0.5">GET /api/v1/verify/:publicId</code></P>
            <P><strong>Batch verification:</strong> <code className="font-mono text-xs bg-arkova-frost dark:bg-white/[0.05] rounded px-1.5 py-0.5">POST /api/v1/verify/batch</code> — up to 100 credentials per request.</P>
            <P><strong>Usage tracking:</strong> <code className="font-mono text-xs bg-arkova-frost dark:bg-white/[0.05] rounded px-1.5 py-0.5">GET /api/v1/usage</code></P>

            <SubHeading>5.2 Frozen response schema</SubHeading>
            <P>The API response schema is frozen once published. No field removals, type changes, or semantic changes without a new version prefix and 12-month deprecation notice.</P>
            <CodeBlock>{`{
  "verified": true,
  "status": "ACTIVE",
  "issuer_name": "University of Michigan",
  "credential_type": "DEGREE",
  "issued_date": "2025-05-15",
  "anchor_timestamp": "2025-05-16T09:12:44Z",
  "network_receipt_id": "b8e381df09ca404e...",
  "record_uri": "https://app.arkova.ai/verify/ARK-2025-00091"
}`}</CodeBlock>

            <SubHeading>5.3 Rate limits</SubHeading>
            <TableWrapper>
              <thead><tr><Th>Tier</Th><Th>Limit</Th></tr></thead>
              <tbody>
                <tr><Td>Anonymous</Td><Td>100 req/min per IP</Td></tr>
                <tr><Td>API key</Td><Td>1,000 req/min per key</Td></tr>
                <tr><Td>Batch endpoints</Td><Td>10 req/min per key</Td></tr>
                <tr><Td>Enterprise</Td><Td>Custom</Td></tr>
              </tbody>
            </TableWrapper>

            {/* ═══ SECTION 6 ═══ */}
            <SectionHeading id="agentic-verification">6. Agentic Verification Layer</SectionHeading>
            <P>As AI agents become participants in credentialing, hiring, and compliance workflows, the records they rely on need to be machine-verifiable, tamper-proof, and independently auditable.</P>

            <SubHeading>6.1 Agent-native tools</SubHeading>
            <P>Arkova exposes a remote Model Context Protocol (MCP) server that AI agents — Claude, GPT, custom agents — can call as native tools: <code className="font-mono text-xs bg-arkova-frost dark:bg-white/[0.05] rounded px-1.5 py-0.5">verify_credential</code> and <code className="font-mono text-xs bg-arkova-frost dark:bg-white/[0.05] rounded px-1.5 py-0.5">search_credentials</code>.</P>

            <SubHeading>6.2 Agent-to-agent trust</SubHeading>
            <P>Agent A presents a verified record to Agent B. Arkova's anchor provides the shared trust layer without a central intermediary. Both agents can independently verify the record against the public ledger.</P>

            <SubHeading>6.3 Audit trail for AI decisions</SubHeading>
            <P>Every verification call is logged with timestamp, querying agent ID, and result — creating a defensible audit trail for regulated industries.</P>

            {/* ═══ SECTION 7 ═══ */}
            <SectionHeading id="ai-intelligence">7. AI-Powered Intelligence</SectionHeading>
            <P>Arkova's AI features enhance the user experience without blocking core verification. All AI features have manual fallback.</P>

            <SubHeading>7.1 Smart extraction <InlineBadge color="emerald">complete</InlineBadge></SubHeading>
            <P>AI-powered metadata extraction identifies credential types, issuers, dates, and key fields from PII-stripped metadata. Documents are processed entirely on the user's device — only PII-stripped structured metadata flows to the server. The provider abstraction layer supports hot-swappable AI backends.</P>

            <SubHeading>7.2 Semantic search <InlineBadge color="emerald">complete</InlineBadge></SubHeading>
            <P>pgvector-powered semantic search enables natural language queries across the credential database. The embedding schema and infrastructure are deployed.</P>

            <SubHeading>7.3 Anomaly detection <InlineBadge color="emerald">complete</InlineBadge></SubHeading>
            <P>AI-powered analysis flags inconsistencies — date logic violations, issuer mismatches, field inconsistencies — and generates integrity scores per credential. Never makes definitive fraud claims — scores and flags only.</P>

            {/* ═══ SECTION 8 ═══ */}
            <SectionHeading id="compliance">8. Globally Accepted Compliance</SectionHeading>
            <P>Arkova supports compliance by supplying independently verifiable evidence of integrity, timing, and lifecycle state. We do not provide legal advice.</P>

            <TableWrapper>
              <thead><tr><Th>Framework</Th><Th>Requirement</Th><Th>What Arkova Provides</Th></tr></thead>
              <tbody>
                <tr><Td><strong>SOX / PCAOB</strong></Td><Td>Tamper-resistant format retention</Td><Td>Network-anchored audit trails, immutable event timelines</Td></tr>
                <tr><Td><strong>ESIGN / UETA</strong></Td><Td>Electronic signature legal parity</Td><Td>Lifecycle tracking for signed documents, cross-vendor evidence</Td></tr>
                <tr><Td><strong>eIDAS / eIDAS 2</strong></Td><Td>Qualified trust services</Td><Td>Jurisdiction-aware metadata, timestamped proofs portable across borders</Td></tr>
                <tr><Td><strong>FERPA</strong></Td><Td>Student education records privacy</Td><Td>Client-side processing — documents never leave the device</Td></tr>
                <tr><Td><strong>EU AI Act</strong></Td><Td>Traceability for high-risk AI</Td><Td>Audit trail for every AI-assisted verification decision</Td></tr>
              </tbody>
            </TableWrapper>

            {/* ═══ SECTION 9 ═══ */}
            <SectionHeading id="use-cases">9. Use Cases</SectionHeading>

            <SubHeading>9.1 Cross-border credential verification</SubHeading>
            <P>With Arkova, the issuer registers each credential event as compliance-aligned metadata. The public verification page exposes a tamper-evident timeline. Employers and regulators validate the claim without accessing the issuer's internal systems, and the proof survives vendor changes.</P>

            <SubHeading>9.2 Legal documents and e-signature chain of custody</SubHeading>
            <P>Each create, sign, amend, and revoke event receives an anchor and a human-readable timeline. Opposing counsel, clients, and courts can see the version lineage and confirm that the artifact matches a recorded fingerprint at a point in time.</P>

            <SubHeading>9.3 Real-world asset attestations</SubHeading>
            <P>Producers and custodians attest to inventory snapshots and transfers as event proofs. Each lot or asset gains a verifiable history that shows where and when custody changed and whether the current status matches stated holdings.</P>

            <SubHeading>9.4 Audit evidence portability for SOX and ICFR</SubHeading>
            <P>Teams register key evidence as verifiable events that are independent of any single vendor. Auditors use a stable verification page for sampling and exception review.</P>

            <SubHeading>9.5 Government records modernization</SubHeading>
            <P>Agency-issued credentials are fingerprinted in the recipient's browser (FERPA-compliant), anchored with a timestamp, and shareable via verification link and QR code. Any employer, agency, or member of the public can verify authenticity in seconds, independently.</P>

            {/* ═══ SECTION 10 ═══ */}
            <SectionHeading id="business-model">10. Business Model</SectionHeading>
            <P>Arkova is delivered as a subscription platform with tiered plans aligned to organizational scale and deployment scope. The subscription includes the core verification service, verification pages, reporting, APIs, and standard support. Arkova never issues tokens and does not monetize customer data.</P>

            {/* ═══ SECTION 11 ═══ */}
            <SectionHeading id="competitive-landscape">11. Competitive Landscape</SectionHeading>
            <TableWrapper>
              <thead><tr><Th>Company</Th><Th>Vertical</Th><Th>How Arkova is Differentiated</Th></tr></thead>
              <tbody>
                <tr><Td><strong>Workiva</strong></Td><Td>Audit & GRC</Td><Td>Public, portable proofs that counterparties can verify without Workiva; event lifecycles survive vendor changes</Td></tr>
                <tr><Td><strong>SAP GRC</strong></Td><Td>Audit & GRC</Td><Td>Neutral, ledger-anchored verification across SAP and non-SAP systems</Td></tr>
                <tr><Td><strong>DocuSign</strong></Td><Td>E-signature</Td><Td>Cross-vendor signature evidence layer — verify without trusting a single e-sign tool</Td></tr>
                <tr><Td><strong>Interfolio</strong></Td><Td>Academic</Td><Td>Neutral proof layer so employers and regulators can verify independently</Td></tr>
                <tr><Td><strong>SimpleProof</strong></Td><Td>Timestamping</Td><Td>Adds lifecycle semantics, revocation/supersession, and unified reporting</Td></tr>
              </tbody>
            </TableWrapper>

            {/* ═══ SECTION 12 ═══ */}
            <SectionHeading id="risks">12. Risks and Mitigation</SectionHeading>
            <TableWrapper>
              <thead><tr><Th>Risk</Th><Th>Why It Matters</Th><Th>Mitigation</Th></tr></thead>
              <tbody>
                <tr><Td><strong>Compliance interpretation</strong></Td><Td>Standards vary by jurisdiction</Td><Td>Shared-responsibility model; claims are "compliance-aligned," not determinative</Td></tr>
                <tr><Td><strong>Privacy and metadata exposure</strong></Td><Td>Poorly chosen metadata can reveal sensitive information</Td><Td>Minimal metadata by default; configurable redaction; DPIA support</Td></tr>
                <tr><Td><strong>Ledger fee/latency volatility</strong></Td><Td>Network fees and confirmation times vary</Td><Td>Batch scheduling, fee estimation, pending status UX</Td></tr>
                <tr><Td><strong>Integration complexity</strong></Td><Td>Evidence scattered across tools</Td><Td>Scoped pilots, reference connectors, SSO, documentation</Td></tr>
                <tr><Td><strong>Security and key management</strong></Td><Td>Treasury and API keys require protection</Td><Td>AWS KMS, HMAC-SHA256, least-privilege design, incident runbooks</Td></tr>
              </tbody>
            </TableWrapper>

            {/* ═══ SECTION 13 ═══ */}
            <SectionHeading id="roadmap">13. Roadmap</SectionHeading>

            <SubHeading>Phase I: Foundation — Credentialing & Verification API (2025–2026)</SubHeading>
            <P>Trustless credential verification for universities, HR, and compliance teams. REST Verification API with batch processing. AI-powered metadata extraction. MCP server for AI agent integration.</P>

            <SubHeading>Phase II: Attestations + Agentic Verification (2026–2027)</SubHeading>
            <P>Extend verification into institutional attestations, asset provenance, and autonomous agent workflows. Enterprise system integrations. AI-powered fraud detection and compliance reports.</P>

            <SubHeading>Phase III: Legally Recognized E-Signatures (2027–2028)</SubHeading>
            <P>Jurisdiction-compliant signature engine (AdES + PKI). QTSP integration for eIDAS. SOC 2 evidence bundle and compliance center. Platform licensing for agent providers.</P>

            {/* ═══ SECTION 14 ═══ */}
            <SectionHeading id="conclusion">14. Conclusion</SectionHeading>
            <P>Organizations lack a portable, independently verifiable evidence layer. Proofs are trapped in vendor-controlled systems, revocation states are inconsistent, and cross-party checks are slow and costly. AI agents compound the problem — they need machine-speed verification without human intermediaries.</P>
            <P>Arkova delivers a universal, jurisdiction-aware verification layer for documents, signatures, credentials, and real-world assets. By anchoring compliance-aligned metadata to a public ledger, Arkova reduces audit costs, accelerates verification, and provides trust that survives system and vendor changes.</P>
            <blockquote className="my-8 border-l-[3px] border-arkova-steel/40 pl-6 py-2">
              <p className="text-lg font-medium italic text-arkova-charcoal dark:text-white">"The question is no longer which system to trust — it's which proofs anyone can verify."</p>
            </blockquote>

            {/* ═══ SECTION 15 ═══ */}
            <SectionHeading id="team">15. About the Team</SectionHeading>
            <P><strong>Carson Seeger</strong> — Founder & CEO. 10+ years in technical product and program management across regulated industries.</P>
            <P><strong>Sarah Rushton</strong> — Founder & COO. 20 years experience as a Product / Program Manager in FMCG. Launched over 1,000 SKUs to market.</P>
            <P><strong>Dr. Yaacov Petscher</strong> — Founder & Advisor. 20 years Research & Data Science experience. Senior Member of the National Academy of Inventors.</P>
            <P><strong>Dr. Periwinkle Doerfler</strong> — Technical Advisor. Security architecture review.</P>

            <div className="mt-12 border-t border-arkova-ice/60 dark:border-white/5 pt-8 text-center">
              <P>Website: <a href="https://arkova.ai" className="text-arkova-steel hover:text-arkova-ocean">arkova.ai</a> · Email: <a href="mailto:hello@arkova.ai" className="text-arkova-steel hover:text-arkova-ocean">hello@arkova.ai</a></P>
              <p className="text-xs text-arkova-slate/60 dark:text-arkova-steel-light/30 italic mt-4">Arkova — Issue Once. Verify Forever.</p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
