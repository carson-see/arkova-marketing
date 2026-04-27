/**
 * Arkova vs Vanta — comparison page.
 *
 * Targets the keyword "Vanta alternatives" / "Vanta vs Arkova". Honest framing:
 * Vanta is genuinely the better fit for some buyers, Arkova for others. The
 * landing-page convention in this category is the "When X wins / When Y wins"
 * structure — it's what Vanta itself uses for its own comparison pages and
 * what builds trust with B2B compliance buyers comparing options.
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Minus } from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { safeJsonLd } from '../../lib/safeJsonLd';

type Cell = 'yes' | 'no' | 'partial' | string;

const COMPARISON_ROWS: { feature: string; arkova: Cell; vanta: Cell; note?: string }[] = [
  // ── Framework coverage
  { feature: 'SOC 2 (Type 1 + Type 2)', arkova: 'partial', vanta: 'yes', note: 'Vanta is the gold standard for SOC 2 onboarding' },
  { feature: 'ISO 27001', arkova: 'partial', vanta: 'yes' },
  { feature: 'HIPAA', arkova: 'yes', vanta: 'yes' },
  { feature: 'GDPR', arkova: 'yes', vanta: 'yes' },
  { feature: 'PCI DSS', arkova: 'no', vanta: 'yes' },
  { feature: 'SOX (financial reporting)', arkova: 'yes', vanta: 'partial', note: 'Vanta supports general controls but Arkova builds for ICFR depth' },
  { feature: 'FERPA (US education)', arkova: 'yes', vanta: 'no' },
  { feature: 'GLBA, FCRA, ADA, FLSA', arkova: 'yes', vanta: 'no' },
  { feature: 'EU AI Act', arkova: 'yes', vanta: 'partial' },
  { feature: 'DORA (EU operational resilience)', arkova: 'yes', vanta: 'partial' },
  { feature: 'NIST AI RMF', arkova: 'yes', vanta: 'partial' },
  { feature: 'SEC cybersecurity disclosure rule', arkova: 'yes', vanta: 'partial' },
  { feature: 'APAC frameworks (PDPA, APPI, DPDP, APP)', arkova: 'yes', vanta: 'partial' },
  { feature: 'African frameworks (POPIA, NDPR, Kenya DPA)', arkova: 'yes', vanta: 'no' },
  { feature: 'LATAM frameworks (LGPD, Law 1581)', arkova: 'yes', vanta: 'partial' },

  // ── Architecture
  { feature: 'Cryptographically anchored evidence', arkova: 'yes', vanta: 'no', note: 'Arkova\'s core moat — auditors verify each claim independently' },
  { feature: 'Append-only audit log on public ledger', arkova: 'yes', vanta: 'no' },
  { feature: 'Independent third-party verifiability (no vendor trust required)', arkova: 'yes', vanta: 'no' },
  { feature: 'Client-side document fingerprinting (docs never leave device)', arkova: 'yes', vanta: 'no' },
  { feature: 'AI-search-friendly (llms.txt, AI crawler access, SSR JSON-LD)', arkova: 'yes', vanta: 'partial' },

  // ── Operations
  { feature: 'Continuous evidence collection from cloud + SaaS integrations', arkova: 'partial', vanta: 'yes', note: 'Vanta has 200+ integrations; Arkova is building this layer' },
  { feature: 'Automated control testing', arkova: 'yes', vanta: 'yes' },
  { feature: 'Per-jurisdiction posture scoring', arkova: 'yes', vanta: 'partial' },
  { feature: 'Severity-ranked gap detection', arkova: 'yes', vanta: 'yes' },
  { feature: 'Audit-ready PDF export', arkova: 'yes', vanta: 'yes' },
  { feature: 'Regulatory-change monitoring', arkova: 'yes', vanta: 'yes' },
  { feature: 'Out-of-the-box auditor relationships', arkova: 'no', vanta: 'yes', note: 'Vanta has direct partnerships with most Big Four and mid-market audit firms' },
  { feature: 'Trust center / public compliance posture page', arkova: 'partial', vanta: 'yes' },

  // ── Developer
  { feature: 'Verification API', arkova: 'yes', vanta: 'partial' },
  { feature: 'Webhook events', arkova: 'yes', vanta: 'yes' },
  { feature: 'MCP server for AI agents', arkova: 'yes', vanta: 'no' },
  { feature: 'Open-source SDKs (TypeScript, Python)', arkova: 'yes', vanta: 'partial' },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === 'yes') return <Check className="h-5 w-5 text-emerald-400" />;
  if (value === 'no') return <X className="h-5 w-5 text-white/30" />;
  if (value === 'partial') return <Minus className="h-5 w-5 text-amber-400" />;
  return <span className="text-sm text-white/70">{value}</span>;
}

export default function VantaPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Arkova vs Vanta — Compliance Audit Automation Comparison',
    description:
      'Honest comparison of Arkova and Vanta. Vanta wins on SOC 2 maturity and integrations. Arkova wins on multi-jurisdiction breadth, cryptographic verification, and privacy-first architecture.',
    url: 'https://arkova.ai/compare/vanta',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Compare', url: 'https://arkova.ai/compare' },
          { name: 'Vanta', url: 'https://arkova.ai/compare/vanta' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }} />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden border-b border-cyber-cyan-border px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,212,255,0.08)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Compare · Arkova vs Vanta
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Vanta or Arkova: which fits your compliance program?
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            Honest comparison. Vanta is the gold standard for SOC 2 onboarding. Arkova is built for
            multi-jurisdiction operators who need cryptographically verifiable evidence. Most enterprises
            should pick the one that maps to their actual evidence problem, not the one with the bigger
            brand budget.
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link to="/contact" className="cyber-btn inline-flex items-center gap-2">
              Talk to Arkova
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#comparison-table"
              className="rounded-sm border border-cyber-cyan-border px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5"
            >
              Skip to the table
            </a>
          </div>
        </div>
      </section>

      {/* ═══ WHEN VANTA WINS ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                When Vanta is the better fit
              </p>
              <h2 className="mb-6 text-2xl font-bold text-white">Pick Vanta if</h2>
              <ul className="space-y-4 text-sm leading-relaxed text-white/70">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">SOC 2 is your primary or only framework.</strong>{' '}
                    Vanta has five years of dedicated SOC 2 onboarding. Their auditor relationships, control
                    library, and integration depth are best-in-class for SOC 2 specifically.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">You're an early-stage startup pursuing first SOC 2.</strong>{' '}
                    Vanta's self-serve onboarding gets a small team to a Type 1 in weeks. The ecosystem
                    of SOC 2-knowledgeable auditors trained on Vanta is enormous.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">You need 200+ pre-built integrations on day one.</strong>{' '}
                    Vanta's catalog of cloud, SaaS, and identity-provider integrations is unmatched. If your
                    evidence is going to come automatically from existing systems, Vanta is more mature here.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">You want a public trust center turnkey.</strong>{' '}
                    Vanta's Trust Center product is polished and widely recognized.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">Brand recognition matters in your sales cycle.</strong>{' '}
                    Procurement teams know Vanta. "We use Vanta" closes vendor reviews fast.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-sm border border-cyber-cyan/20 bg-cyber-cyan/[0.03] p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
                When Arkova is the better fit
              </p>
              <h2 className="mb-6 text-2xl font-bold text-white">Pick Arkova if</h2>
              <ul className="space-y-4 text-sm leading-relaxed text-white/70">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">You operate across multiple jurisdictions.</strong>{' '}
                    14+ frameworks: SOX, HIPAA, FERPA, FCRA, GLBA, ADA, GDPR, UK GDPR, Kenya DPA, Australia APP,
                    PIPEDA, PDPA Singapore, APPI Japan, DPDP India, POPIA, NDPR, Law 1581 Colombia, PDPA Thailand,
                    plus EU AI Act and DORA. Vanta's coverage skews US + EU.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">You need evidence verifiable without vendor trust.</strong>{' '}
                    Every Arkova-anchored record has a cryptographic receipt on a public ledger. An auditor
                    or counterparty can verify the record's existence and integrity using the document, the
                    public ledger, and a checksum tool. No trust in Arkova required.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">Document privacy is a hard constraint.</strong>{' '}
                    Documents are fingerprinted in your browser. The original file never leaves your device.
                    Only PII-stripped metadata flows to our systems. Required for HIPAA, FERPA, and most
                    high-trust contexts.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">You're preparing for EU AI Act, DORA, NIST AI RMF, or SEC cyber.</strong>{' '}
                    These regulations landed since 2023 and the legacy GRC platforms are still building dedicated
                    coverage. Arkova was designed for the modern stack.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">You want vendor-agnostic evidence that survives transitions.</strong>{' '}
                    System migrations and vendor sunsets routinely break audit chains. Arkova-anchored records
                    survive vendor change because the proof lives on a public ledger, not in a vendor database.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">You want first-class AI agent and MCP integration.</strong>{' '}
                    Arkova's MCP server lets your own AI agents query the verification surface directly.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section id="comparison-table" className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Feature comparison
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Side by side.</h2>
          <p className="mb-10 max-w-3xl text-white/70">
            Last verified against Vanta's public documentation in April 2026. Vanta updates rapidly; if you
            spot an inaccuracy <Link to="/contact" className="text-cyber-cyan hover:text-white">tell us</Link>{' '}
            and we will correct it. Honest comparisons help everyone.
          </p>

          <div className="overflow-x-auto rounded-sm border border-white/[0.08]">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-cyber-cyan">
                    Arkova
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white/70">
                    Vanta
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-t border-white/[0.04] transition-colors hover:bg-white/[0.015]"
                  >
                    <td className="px-4 py-3 text-white/85">
                      {row.feature}
                      {row.note && <div className="mt-0.5 text-xs italic text-white/50">{row.note}</div>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.arkova} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.vanta} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/60">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Full support
            </span>
            <span className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-amber-400" />
              Partial / in development
            </span>
            <span className="flex items-center gap-2">
              <X className="h-4 w-4 text-white/30" />
              Not supported
            </span>
          </div>
        </div>
      </section>

      {/* ═══ WHY THE DIFFERENCE EXISTS ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Architectural difference
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Why our coverage differs from Vanta's.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              Vanta and Arkova solve adjacent but distinct problems.
              <strong className="text-white"> Vanta automates the collection and presentation of compliance evidence</strong>{' '}
              from your existing systems, mapped to specific framework controls. Their core value is breadth of
              integrations and depth of SOC 2 maturity.
            </p>
            <p>
              <strong className="text-white">Arkova builds an evidence layer that does not depend on the system that produced the evidence.</strong>{' '}
              Every record has a cryptographic fingerprint anchored to a public ledger. A regulator, auditor,
              or counterparty verifies your claims by checking the document against the ledger — they do not
              have to trust Arkova, your file system, or any other vendor in the chain.
            </p>
            <p>
              These approaches are complementary more than competitive. A mature compliance program eventually
              wants both: aggregation (Vanta's strength) and independent verifiability (Arkova's strength).
              The difference is which one solves your most painful problem first.
            </p>
            <p>
              If your audit pain is "I have evidence in eight different SaaS tools and need it in one place" —
              Vanta is the right starting point. If your pain is "my auditors do not trust the evidence we
              produce because it is all stored by the same vendors that produced it, and our last vendor
              migration broke our audit history" — that is what Arkova was built to fix.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Common questions
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">FAQ</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">Can I use both Arkova and Vanta?</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Yes. Many compliance programs benefit from layering. Vanta handles SOC 2 evidence aggregation
                from your SaaS stack. Arkova anchors the high-stakes records (executed contracts, board
                approvals, ICFR sign-offs, AI risk assessments, regulatory submissions) for independent
                verifiability. Talk to us about integration patterns.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Why does Arkova not have a SOC 2 report yet?
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Arkova is in early access. Our SOC 2 Type II and ISO 27001 work are in progress and will
                ship before general availability. The architecture is privacy-first by design — documents
                never leave your device — so the surface our SOC 2 actually covers is intentionally small.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                What's the migration path if we already use Vanta?
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                You don't have to migrate. Most pilot customers keep Vanta running and use Arkova for the
                records that need independent verifiability. Our Verification API plugs into Vanta's
                evidence-export workflow — anchored receipts get attached to the same auditor evidence
                package.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">How does pricing compare?</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Arkova pricing is set in early-access partnerships, not public list pricing. We are
                deliberately working with a small number of pilot customers to nail product-market fit
                before going self-serve. If you are evaluating budget, we will share concrete numbers in
                a discovery call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Ready to compare on your specific workload?
          </h2>
          <p className="mb-10 text-lg text-white/70">
            Tell us your jurisdiction footprint and the frameworks you operate under. We will tell you
            honestly whether Arkova, Vanta, or some combination is the right fit. No pressure.
          </p>
          <Link to="/contact" className="cyber-btn inline-flex items-center gap-2">
            Talk to Arkova
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-6 text-sm text-white/50">
            Or read{' '}
            <Link
              to="/research/state-of-compliance-2026"
              className="text-cyber-cyan transition-colors hover:text-white"
            >
              The State of Compliance in 2026
            </Link>{' '}
            for the broader regulatory picture this comparison sits inside.
          </p>
        </div>
      </section>
    </>
  );
}
