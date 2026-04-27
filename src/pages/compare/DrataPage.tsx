/**
 * Arkova vs Drata — comparison page.
 *
 * Targets the keyword "Drata alternatives" / "Drata vs Arkova". Drata's
 * positioning skews enterprise GRC ("trust management platform"). Arkova's
 * differentiation vs Drata is similar to vs Vanta but with somewhat different
 * relative weighting — Drata has stronger enterprise scale, Arkova still
 * wins on multi-jurisdiction breadth and cryptographic verifiability.
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Minus } from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { safeJsonLd } from '../../lib/safeJsonLd';

type Cell = 'yes' | 'no' | 'partial' | string;

const COMPARISON_ROWS: { feature: string; arkova: Cell; drata: Cell; note?: string }[] = [
  // ── Framework coverage
  { feature: 'SOC 2 (Type 1 + Type 2)', arkova: 'partial', drata: 'yes', note: 'Drata\'s native automation depth is hard to beat for SOC 2' },
  { feature: 'ISO 27001 / 27017 / 27018 / 27701', arkova: 'partial', drata: 'yes' },
  { feature: 'HIPAA', arkova: 'yes', drata: 'yes' },
  { feature: 'GDPR', arkova: 'yes', drata: 'yes' },
  { feature: 'PCI DSS', arkova: 'no', drata: 'yes' },
  { feature: 'NIST 800-53 / CSF', arkova: 'partial', drata: 'yes' },
  { feature: 'SOX (financial reporting depth)', arkova: 'yes', drata: 'partial', note: 'Drata supports general controls; Arkova builds for ICFR depth' },
  { feature: 'FERPA (US education)', arkova: 'yes', drata: 'no' },
  { feature: 'GLBA, FCRA, ADA, FLSA', arkova: 'yes', drata: 'partial' },
  { feature: 'EU AI Act', arkova: 'yes', drata: 'partial' },
  { feature: 'DORA (EU operational resilience)', arkova: 'yes', drata: 'partial' },
  { feature: 'NIST AI RMF', arkova: 'yes', drata: 'partial' },
  { feature: 'SEC cybersecurity disclosure rule', arkova: 'yes', drata: 'partial' },
  { feature: 'APAC frameworks (PDPA, APPI, DPDP, APP)', arkova: 'yes', drata: 'partial' },
  { feature: 'African frameworks (POPIA, NDPR, Kenya DPA)', arkova: 'yes', drata: 'no' },
  { feature: 'LATAM frameworks (LGPD, Law 1581)', arkova: 'yes', drata: 'partial' },

  // ── Architecture
  { feature: 'Cryptographically anchored evidence', arkova: 'yes', drata: 'no', note: 'Arkova\'s core moat — auditors verify each claim independently' },
  { feature: 'Append-only audit log on public ledger', arkova: 'yes', drata: 'no' },
  { feature: 'Independent third-party verifiability (no vendor trust required)', arkova: 'yes', drata: 'no' },
  { feature: 'Client-side document fingerprinting (docs never leave device)', arkova: 'yes', drata: 'no' },
  { feature: 'AI-search-friendly (llms.txt, AI crawler access, SSR JSON-LD)', arkova: 'yes', drata: 'partial' },

  // ── Operations
  { feature: 'Continuous evidence collection from cloud + SaaS integrations', arkova: 'partial', drata: 'yes', note: 'Drata has 100+ deep integrations including agent-based CSPM' },
  { feature: 'Risk management module', arkova: 'partial', drata: 'yes' },
  { feature: 'Vendor risk management (TPRM)', arkova: 'partial', drata: 'yes' },
  { feature: 'Per-jurisdiction posture scoring', arkova: 'yes', drata: 'partial' },
  { feature: 'Severity-ranked gap detection', arkova: 'yes', drata: 'yes' },
  { feature: 'Audit-ready PDF export', arkova: 'yes', drata: 'yes' },
  { feature: 'Regulatory-change monitoring', arkova: 'yes', drata: 'yes' },
  { feature: 'Trust center / public compliance posture page', arkova: 'partial', drata: 'yes' },
  { feature: 'Pre-built auditor relationships', arkova: 'no', drata: 'yes', note: 'Drata partners with most Big Four and mid-market audit firms' },
  { feature: 'Enterprise pricing + contracting', arkova: 'partial', drata: 'yes' },

  // ── Developer
  { feature: 'Verification API', arkova: 'yes', drata: 'partial' },
  { feature: 'Webhook events', arkova: 'yes', drata: 'yes' },
  { feature: 'MCP server for AI agents', arkova: 'yes', drata: 'no' },
  { feature: 'Open-source SDKs (TypeScript, Python)', arkova: 'yes', drata: 'partial' },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === 'yes') return <Check className="h-5 w-5 text-emerald-400" />;
  if (value === 'no') return <X className="h-5 w-5 text-white/30" />;
  if (value === 'partial') return <Minus className="h-5 w-5 text-amber-400" />;
  return <span className="text-sm text-white/70">{value}</span>;
}

export default function DrataPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Arkova vs Drata — Compliance Audit Automation Comparison',
    description:
      'Honest Arkova vs Drata comparison. Drata wins on enterprise GRC depth, automation maturity, and integrations. Arkova wins on multi-jurisdiction breadth, cryptographic verification, and privacy-first architecture.',
    url: 'https://arkova.ai/compare/drata',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Compare', url: 'https://arkova.ai/compare' },
          { name: 'Drata', url: 'https://arkova.ai/compare/drata' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }} />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden border-b border-cyber-cyan-border px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,212,255,0.08)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Compare · Arkova vs Drata
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Drata or Arkova: which fits your compliance program?
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            Honest comparison. Drata is the strongest enterprise GRC platform on the market —
            deep automation, broad framework coverage, mature trust center. Arkova is built for
            multi-jurisdiction operators who need cryptographically verifiable evidence as
            independent of vendor systems as the proof itself.
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

      {/* ═══ WHEN EACH WINS ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                When Drata is the better fit
              </p>
              <h2 className="mb-6 text-2xl font-bold text-white">Pick Drata if</h2>
              <ul className="space-y-4 text-sm leading-relaxed text-white/70">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">You need enterprise-grade GRC depth.</strong>{' '}
                    Drata supports SOC 2, ISO 27001 family, HIPAA, GDPR, PCI DSS, NIST 800-53/CSF,
                    HITRUST, and more — with native automation for each. Their control-mapping engine
                    handles overlapping evidence across multiple frameworks better than most peers.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">Risk management + vendor management matter.</strong>{' '}
                    Drata's TPRM and risk modules are mature. If you're tracking 200+ vendors with
                    formal risk-tier reviews, Drata handles this better than most.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">You're scaling from startup to enterprise.</strong>{' '}
                    Drata's pricing tiers and feature gating are designed for the upgrade path.
                    Vanta's is simpler; Drata's grows with you longer.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">Continuous control monitoring is the priority.</strong>{' '}
                    Drata's agent-based collection and rule library catches drift quickly. Arkova's
                    continuous-monitoring layer is still being built.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>
                    <strong className="text-white">You want a polished trust center.</strong>{' '}
                    Drata's trust center is enterprise-credible out of the box.
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
                    14+ frameworks: SOX, HIPAA, FERPA, FCRA, GLBA, ADA, GDPR, UK GDPR, Kenya DPA,
                    Australia APP, PIPEDA, PDPA Singapore, APPI Japan, DPDP India, POPIA, NDPR, Law 1581
                    Colombia, PDPA Thailand, plus EU AI Act and DORA. Drata's coverage skews US + EU.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">Auditor independence is a hard requirement.</strong>{' '}
                    Every Arkova-anchored record has a cryptographic receipt on a public ledger. An
                    auditor or counterparty can verify the record independently using just the
                    document, the public ledger, and a checksum tool. No trust in Arkova required.
                    Drata's evidence requires trusting Drata.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">Document privacy is non-negotiable.</strong>{' '}
                    Arkova fingerprints documents in your browser. Originals never leave your device.
                    Required for HIPAA, FERPA, and most high-trust contexts.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">EU AI Act, DORA, NIST AI RMF, SEC cyber matter.</strong>{' '}
                    These regulations landed since 2023 and Drata is still building dedicated coverage.
                    Arkova was designed for the modern stack.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">Vendor migration is in your plan.</strong>{' '}
                    Drata is unusually durable as GRC vendors go — but every system change still
                    breaks audit chains. Arkova-anchored records survive vendor exit because the
                    proof lives on a public ledger, not a vendor database.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyber-cyan" />
                  <span>
                    <strong className="text-white">You want first-class AI agent and MCP integration.</strong>{' '}
                    Arkova's MCP server lets your own AI agents query the verification surface
                    directly.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section
        id="comparison-table"
        className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Feature comparison
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Side by side.</h2>
          <p className="mb-10 max-w-3xl text-white/70">
            Last verified against Drata's public documentation in April 2026. Drata ships fast; if you
            spot an inaccuracy{' '}
            <Link to="/contact" className="text-cyber-cyan hover:text-white">
              tell us
            </Link>{' '}
            and we'll correct it.
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
                    Drata
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
                        <CellIcon value={row.drata} />
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

      {/* ═══ ARCHITECTURAL DIFFERENCE ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Architectural difference
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Why our coverage diverges from Drata's.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              Drata and Arkova solve adjacent but distinct problems.{' '}
              <strong className="text-white">
                Drata builds the deepest automation pipeline for collecting compliance evidence
              </strong>{' '}
              from your existing systems and mapping it across overlapping framework controls. Their
              core value is engineering depth: agent-based CSPM, broad integration catalog, mature
              TPRM, and a control-mapping engine that handles SOC 2 + ISO 27001 + NIST simultaneously
              without manual remapping.
            </p>
            <p>
              <strong className="text-white">Arkova builds an evidence layer that does not depend
              on the system that produced the evidence.</strong>{' '}
              Every record gets a cryptographic fingerprint anchored to a public ledger. A regulator,
              auditor, or counterparty verifies your claims by checking the document against the
              ledger — they don't have to trust Arkova, your file system, or any other vendor.
            </p>
            <p>
              These approaches are complementary more than competitive at the architecture level. A
              mature compliance program eventually wants both: best-in-class aggregation +
              independent verifiability. The difference is which one solves your most painful
              problem today.
            </p>
            <p>
              If your audit pain is "I have evidence in 14 different SaaS tools and I need it
              continuously collected and mapped to 6 overlapping frameworks" — Drata is the right
              starting point. If your pain is "we operate across 8 jurisdictions, 4 of which are
              barely covered by the major US-EU GRC vendors, and our last vendor migration broke
              two years of audit history" — that's what Arkova was built to fix.
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
              <h3 className="mb-2 text-lg font-semibold text-white">Can I use both Arkova and Drata?</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Yes. Many compliance programs benefit from layering. Drata handles continuous
                evidence collection, control mapping, and trust center. Arkova anchors the
                high-stakes records — executed contracts, board approvals, ICFR sign-offs, AI risk
                assessments, regulatory submissions, multi-jurisdiction-specific evidence — for
                independent verifiability. Talk to us about integration patterns.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Why doesn't Arkova have a SOC 2 report yet?
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Arkova is in early access. Our SOC 2 Type II and ISO 27001 work is in progress and
                will ship before general availability. Architecture is privacy-first by design —
                documents never leave your device — so the surface our SOC 2 actually covers is
                intentionally small.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                What's the migration path if we already use Drata?
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                You don't have to migrate. Most pilot customers keep Drata running and use Arkova for
                the records that need independent verifiability. Our Verification API plugs into
                Drata's evidence-export workflow — anchored receipts get attached to the same
                auditor evidence package.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">How does pricing compare?</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Arkova pricing is set in early-access partnerships, not public list pricing. We're
                deliberately working with a small number of pilot customers to nail product-market
                fit before going self-serve. If you're evaluating budget, we'll share concrete
                numbers in a discovery call.
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
            Tell us your jurisdiction footprint and the frameworks you operate under. We'll tell
            you honestly whether Arkova, Drata, or some combination is the right fit.
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
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
