/**
 * SOX (Sarbanes-Oxley) Compliance Page — framework landing page.
 *
 * Targets the keyword "SOX compliance software" / "SOX audit automation" /
 * "ICFR automation". Captures intent from public-company audit prep teams
 * who currently run on Workiva/AuditBoard/spreadsheets and are looking for
 * cryptographically anchored evidence to reduce the FY-end fire drill.
 *
 * Funnels Sarah's "State of Compliance in 2026" article — that piece's $6.06M
 * audit-fee anchor argues directly for this page's pitch.
 */

import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Calendar, Building2, Scale, AlertCircle } from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { PrivateBetaBadge, BuildingNote } from '../../components/PrivateBetaBadge';
import { safeJsonLd } from '../../lib/safeJsonLd';

const KEY_SECTIONS = [
  {
    id: 'section-302',
    label: 'Section 302',
    title: 'Corporate Responsibility for Financial Reports',
    description:
      'CEO and CFO must personally certify the accuracy of financial reports and disclose deficiencies. False certification is criminally punishable.',
    arkova:
      'Anchored attestation receipts: the exact certification document signed, the version reviewed, and the timestamp — verifiable independently of your document management vendor.',
  },
  {
    id: 'section-404',
    label: 'Section 404',
    title: 'Management Assessment of Internal Controls',
    description:
      'The most operationally onerous section. Public companies must establish, document, test, and report on internal control over financial reporting (ICFR). External auditor must attest to management\'s assessment for accelerated filers.',
    arkova:
      'Each control test, walkthrough, and remediation is anchored. The complete control narrative + testing evidence package is reconstructable on demand without trusting your GRC vendor.',
  },
  {
    id: 'section-409',
    label: 'Section 409',
    title: 'Real-Time Disclosure',
    description:
      'Material changes to financial condition or operations must be disclosed on a "rapid and current basis" — typically within four business days via Form 8-K.',
    arkova:
      'Material-event disclosure timeline anchored from internal awareness through public filing. Audit trail proves disclosure timing met SOX 409 requirements.',
  },
  {
    id: 'section-802',
    label: 'Section 802',
    title: 'Document Retention',
    description:
      'Audit work papers must be retained for seven years. Knowing alteration or destruction with intent to obstruct an investigation is criminally punishable (up to 20 years imprisonment).',
    arkova:
      'Append-only audit log on a public ledger. Records cannot be retroactively altered or destroyed without detection — addresses both the retention and the anti-destruction mandate.',
  },
];

const TIMELINE = [
  {
    phase: 'Q1',
    label: 'Risk assessment + scoping',
    description:
      'Identify in-scope financial reporting processes, key controls, and material accounts. Update from prior year for new systems, M&A, and regulatory changes.',
  },
  {
    phase: 'Q2–Q3',
    label: 'Control testing',
    description:
      'Walk through each key control. Test design effectiveness, then operating effectiveness. Document deficiencies. Remediate where possible before year-end.',
  },
  {
    phase: 'Q4',
    label: 'Management assessment + external audit',
    description:
      'Management certifies ICFR effectiveness. External auditor (for accelerated filers) performs Section 404(b) attestation. Disclosure of any material weaknesses.',
  },
  {
    phase: 'FY-end',
    label: 'Form 10-K filing',
    description:
      "Annual report including management's ICFR assessment, auditor attestation (for accelerated filers), and material weakness disclosure if applicable. CEO and CFO 302 certifications attached.",
  },
];

const PAIN_POINTS = [
  {
    pain: 'Evidence collection drags into Q4',
    detail:
      'Walkthrough screenshots, system access reviews, change-management evidence, and journal-entry approvals get gathered manually from 10+ systems in the last 6 weeks of the year.',
  },
  {
    pain: 'Vendor migrations break audit chains',
    detail:
      'A new ERP, HRIS, or e-signature platform mid-year means historical audit evidence is scattered across the old vendor (often via expensive legacy access) and the new one.',
  },
  {
    pain: '404(b) auditor "reperformance" doubles the work',
    detail:
      'External auditors re-test a sample of controls. Without reproducible evidence, the team produces fresh walkthroughs for the auditor that mostly duplicate what management already did.',
  },
  {
    pain: 'ITGC scope creep',
    detail:
      'IT general controls (access, change, operations) keep expanding as the company adopts more SaaS. Each new system adds 5–15 controls that need annual testing.',
  },
];

export default function SoxPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SOX Compliance Audit Automation — Arkova',
    description:
      'SOX Section 302, 404, 409, and 802 evidence cryptographically anchored. Reduce ICFR audit prep from quarterly fire drill to continuous, queryable property of your records.',
    url: 'https://arkova.ai/compliance/sox',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
    mainEntity: {
      '@type': 'Service',
      name: 'SOX Compliance Audit Automation',
      provider: { '@id': 'https://arkova.ai/#org' },
      serviceType: 'Compliance Audit Automation',
      areaServed: { '@type': 'Place', name: 'United States' },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Compliance', url: 'https://arkova.ai/compliance' },
          { name: 'SOX', url: 'https://arkova.ai/compliance/sox' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }} />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden border-b border-cyber-cyan-border px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,212,255,0.08)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
              Compliance · SOX
            </p>
            <PrivateBetaBadge />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            SOX evidence that survives every system migration.
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            Average audit fees for US large accelerated filers reached <strong className="text-white">$6.06M in FY2024</strong>.
            Most of that cost is the time auditors and finance teams spend reconstructing evidence
            scattered across vendors that often won't be in the stack five years from now. Arkova
            anchors your ICFR evidence to a public ledger so your auditor can verify each test
            independently — no matter which GRC, ERP, or e-signature vendor you use today.
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link to="/contact" className="cyber-btn inline-flex items-center gap-2">
              Request Early Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/research/state-of-compliance-2026"
              className="rounded-sm border border-cyber-cyan-border px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5"
            >
              Read the research
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS SOX ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            What it is
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            The 23-year-old law every public company runs on.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              The Sarbanes-Oxley Act of 2002 followed the Enron, WorldCom, and Tyco scandals. Its
              central premise: management is personally responsible for the integrity of financial
              reports, and the controls that produce those reports must be documented, tested, and
              attested to by both management and an external auditor.
            </p>
            <p>
              SOX applies to every public company filing with the SEC — domestic and foreign private
              issuers — plus any private company that touches a public company's financial reporting
              (most notably outsourced service providers via SOC 1 reports). Penalties for willful
              violations include up to <strong className="text-white">$5M in fines and 20 years
              imprisonment</strong> under Section 802.
            </p>
            <p>
              In practice, "SOX compliance" means proving year over year that your{' '}
              <strong className="text-white">internal control over financial reporting (ICFR)</strong>{' '}
              was designed appropriately and operated effectively throughout the fiscal year. The bulk
              of the operational burden lives in Section 404.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ KEY SECTIONS ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Scale className="h-4 w-4" />
            The four sections that drive operational work
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            How Arkova maps to the SOX sections that hurt.
          </h2>

          <div className="space-y-4">
            {KEY_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-cyber-cyan/20"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-sm bg-cyber-cyan/10 px-2 py-0.5 font-mono text-xs font-semibold text-cyber-cyan">
                    {sec.label}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{sec.title}</h3>
                </div>
                <p className="mb-3 text-sm font-medium text-white/85">Requirement</p>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{sec.description}</p>
                <p className="mb-2 text-sm font-medium text-white/85">Arkova</p>
                <p className="text-sm leading-relaxed text-white/70">{sec.arkova}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ANNUAL TIMELINE ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Calendar className="h-4 w-4" />
            The annual SOX cycle
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Four phases. The same ones every year.
          </h2>

          <div className="space-y-4">
            {TIMELINE.map((p) => (
              <div
                key={p.phase}
                className="flex flex-col gap-3 rounded-sm border border-white/[0.08] bg-white/[0.015] p-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-cyber-cyan">{p.phase}</span>
                  <h3 className="text-base font-semibold text-white">{p.label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/70 sm:max-w-xl">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-sm border border-cyber-cyan/15 bg-cyber-cyan/[0.04] p-6">
            <p className="text-sm leading-relaxed text-white/85">
              Most of the cost lives in <strong className="text-white">Q4</strong>. When evidence
              must be regenerated under deadline pressure because the original artifacts can't be
              independently verified, control testing becomes a fire drill instead of a queryable
              property of the records themselves. That's the cycle Arkova breaks.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHAT AUDITORS ASK FOR ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <FileText className="h-4 w-4" />
            What a SOX 404 auditor asks for
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
            Five evidence categories every ICFR audit needs.
          </h2>

          <ol className="space-y-5 text-white/70">
            <li>
              <strong className="text-white">Process narratives + flowcharts.</strong>{' '}
              Documented description of each financial reporting process (revenue, expenditure, payroll,
              treasury, financial close) showing inputs, processing steps, controls, and outputs. Updated
              for any system or process change in the period.
            </li>
            <li>
              <strong className="text-white">Risk and control matrices (RCMs).</strong>{' '}
              For each in-scope process, the financial-statement assertions at risk, the controls that
              mitigate those risks, control owner, frequency, and test plan.
            </li>
            <li>
              <strong className="text-white">Walkthrough documentation.</strong>{' '}
              Evidence that the team has traced one transaction end-to-end through each key control —
              source documents, system screenshots, approval evidence, output reconciliations.
            </li>
            <li>
              <strong className="text-white">Test of operating effectiveness samples.</strong>{' '}
              For each key control, a sample of executions across the year with supporting evidence.
              IT general controls require year-long population evidence (access reviews, change
              management, batch monitoring).
            </li>
            <li>
              <strong className="text-white">Deficiency log + remediation evidence.</strong>{' '}
              Identified control deficiencies, severity classification (deficiency / significant
              deficiency / material weakness), remediation plan, and proof of remediation effectiveness.
            </li>
          </ol>
        </div>
      </section>

      {/* ═══ WHERE THE FIRE DRILL COMES FROM ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <AlertCircle className="h-4 w-4" />
            Why SOX prep gets painful
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Four failure modes Arkova removes.
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {PAIN_POINTS.map((p) => (
              <div key={p.pain} className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6">
                <h3 className="mb-3 text-base font-semibold text-white">{p.pain}</h3>
                <p className="text-sm leading-relaxed text-white/70">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO IS AFFECTED ═══ */}
      <section className="border-y border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Building2 className="h-4 w-4" />
            Who's in scope
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Public companies, foreign private issuers, and most service providers.
          </h2>
          <div className="space-y-4 text-white/70">
            <p>
              SOX applies to every issuer registered with the SEC, domestic or foreign. The cost
              tier depends on classification:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm">
              <li>
                <strong className="text-white">Large accelerated filers</strong> (≥$700M public float)
                — full Section 404(b) external auditor attestation required. Highest audit cost.
              </li>
              <li>
                <strong className="text-white">Accelerated filers</strong> ($75M–$700M public float)
                — also require 404(b) auditor attestation.
              </li>
              <li>
                <strong className="text-white">Smaller reporting companies + non-accelerated filers</strong>{' '}
                — 404(a) management assessment only. No external auditor attestation requirement
                (except in narrow circumstances).
              </li>
              <li>
                <strong className="text-white">Service providers</strong> (third-party SaaS, cloud,
                payroll, transaction processing) — typically issue SOC 1 reports because their
                customers' SOX ICFR depends on them.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Stop rebuilding SOX evidence from scratch every year.
          </h2>
          <p className="mb-6 text-lg text-white/70">
            If you're a public company looking for ICFR evidence that doesn't live
            inside your GRC vendor's database, we'd like to discuss an early-access pilot.
          </p>
          <BuildingNote className="mx-auto mb-10 max-w-2xl" />
          <Link to="/contact" className="cyber-btn inline-flex items-center gap-2">
            Request Early Access
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
            for the broader regulatory picture.
          </p>
        </div>
      </section>
    </>
  );
}
