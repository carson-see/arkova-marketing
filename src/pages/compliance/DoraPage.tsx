/**
 * DORA (Digital Operational Resilience Act) Compliance Page.
 *
 * Targets the keyword "DORA compliance" / "DORA compliance software".
 * Applicable since 17 January 2025 across ~20 financial-entity categories
 * in the EU. Lower competition than SOX/HIPAA because the regulation is
 * recent and most legacy GRC platforms are still building dedicated
 * coverage.
 */

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  AlertTriangle,
  Building2,
  Calendar,
  Scale,
  FileText,
  Shield,
} from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { PrivateBetaBadge, BuildingNote } from '../../components/PrivateBetaBadge';
import { safeJsonLd } from '../../lib/safeJsonLd';

const FIVE_PILLARS = [
  {
    title: 'ICT Risk Management',
    icon: Shield,
    description:
      'Comprehensive ICT risk-management framework covering identification, protection, detection, response, recovery, and learning. Annual review by management body. Documented risk-tolerance levels and digital operational resilience strategy.',
    arkova:
      'Anchored ICT risk register with versioned receipts. Annual management-body reviews are timestamped to a public ledger so an EBA/ESMA examiner can verify the review actually happened on the date claimed.',
  },
  {
    title: 'ICT-Related Incident Management',
    icon: AlertTriangle,
    description:
      'Single, harmonized process for classifying, managing, and reporting ICT incidents. Major incidents must be reported to the competent authority within strict timelines (initial within 4 hours, intermediate within 72 hours, final within 1 month).',
    arkova:
      'Append-only incident log with cryptographic timestamps. Each report-to-authority milestone is anchored — disputes about timing become objectively verifiable.',
  },
  {
    title: 'Digital Operational Resilience Testing',
    icon: AlertTriangle,
    description:
      'Annual testing program for ICT systems. Significant entities must conduct threat-led penetration testing (TLPT) every 3 years using TIBER-EU framework. Test results, remediation actions, and lessons learned must be documented.',
    arkova:
      'TLPT scope, methodology, findings, and remediation evidence anchored. Three-year cycle reconstructable on demand without trusting your testing-vendor archive.',
  },
  {
    title: 'ICT Third-Party Risk Management',
    icon: Building2,
    description:
      'Comprehensive register of all ICT third-party arrangements. Pre-contractual due diligence. Mandatory contractual provisions. Ongoing monitoring. Concentration-risk assessment. Critical ICT TPPs come under direct EU oversight.',
    arkova:
      'Third-party register with anchored due-diligence packets per vendor. Contract versions, audit reports, and exit-plan rehearsals all on-ledger. Survives the third party itself going under.',
  },
  {
    title: 'Information Sharing',
    icon: FileText,
    description:
      'Voluntary cyber-threat information sharing among financial entities. Trusted communities. Anonymization where appropriate. Compatible with GDPR and competition law.',
    arkova:
      'Information-sharing attestations cryptographically signed. Counterparties can verify the integrity of shared threat indicators without trusting a centralized intermediary.',
  },
];

const TIMELINE = [
  {
    date: '14 Dec 2022',
    label: 'Adopted by EU Council',
    description: 'DORA finalised after trilogue. Two-year implementation runway begins.',
    status: 'past' as const,
  },
  {
    date: '16 Jan 2023',
    label: 'Entered into force',
    description: 'Regulation 2022/2554 published in the Official Journal.',
    status: 'past' as const,
  },
  {
    date: '17 Jan 2025',
    label: 'Applicable',
    description:
      'DORA becomes binding on ~20 categories of EU financial entities. Penalties up to 2% of annual worldwide turnover (or €1M for individuals) for non-compliance.',
    status: 'past' as const,
  },
  {
    date: '2025–2026',
    label: 'Continuous compliance + RTS finalisation',
    description:
      'Final batches of Regulatory Technical Standards (RTS) and Implementing Technical Standards (ITS) under finalisation. First incident-reporting cycles. Initial competent-authority examinations.',
    status: 'current' as const,
  },
  {
    date: '2027+',
    label: 'TLPT three-year cycle',
    description:
      'Significant entities complete first three-year threat-led penetration testing cycle under TIBER-EU framework.',
    status: 'future' as const,
  },
];

const ENTITIES_IN_SCOPE = [
  'Credit institutions',
  'Payment institutions',
  'Electronic money institutions',
  'Investment firms',
  'Crypto-asset service providers (under MiCA)',
  'Central securities depositories',
  'Central counterparties',
  'Trading venues',
  'Trade repositories',
  'Managers of alternative investment funds',
  'Management companies (UCITS)',
  'Data reporting service providers',
  'Insurance and reinsurance undertakings',
  'Insurance intermediaries',
  'Institutions for occupational retirement provision',
  'Credit rating agencies',
  'Administrators of critical benchmarks',
  'Crowdfunding service providers',
  'Securitisation repositories',
  'ICT third-party service providers (where designated as critical)',
];

export default function DoraPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'DORA Compliance — Audit-Ready ICT Resilience Evidence — Arkova',
    description:
      'EU Digital Operational Resilience Act (DORA) compliance evidence layer. ICT risk management, incident reporting, resilience testing, and third-party risk anchored for independent verification.',
    url: 'https://arkova.ai/compliance/dora',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
    mainEntity: {
      '@type': 'Service',
      name: 'DORA Compliance Audit Automation',
      provider: { '@id': 'https://arkova.ai/#org' },
      serviceType: 'Compliance Audit Automation',
      areaServed: { '@type': 'Place', name: 'European Union' },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Compliance', url: 'https://arkova.ai/compliance' },
          { name: 'DORA', url: 'https://arkova.ai/compliance/dora' },
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
              Compliance · DORA
            </p>
            <PrivateBetaBadge />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            DORA evidence built for the next examination, not the last one.
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            DORA has been applicable since 17&nbsp;January&nbsp;2025. ICT risk-management framework
            documentation, major-incident reports filed within 4 / 72 / 30-day windows, threat-led
            penetration tests, and a third-party register that survives vendor exit — all anchored
            to a public ledger so EBA, ESMA, EIOPA, or your national competent authority can verify
            the timeline of every claim.
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

      {/* ═══ WHAT IS DORA ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            What it is
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            One ICT-resilience rulebook for every EU financial entity.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              DORA (Regulation 2022/2554) harmonises ICT risk management across the EU financial
              sector. Before DORA, ICT resilience was governed by a patchwork of EBA, ESMA, and
              EIOPA guidelines layered on top of national supervisory practice. DORA replaces that
              patchwork with a single, directly applicable regulation.
            </p>
            <p>
              The regulation organises ICT operational resilience into{' '}
              <strong className="text-white">five pillars</strong>: risk management, incident
              reporting, resilience testing, third-party risk, and information sharing. Penalties
              for non-compliance reach <strong className="text-white">2% of annual worldwide
              turnover</strong> for entities (€1M for individuals).
            </p>
            <p>
              Critical ICT third-party providers (designated by the European Supervisory Authorities)
              come under direct EU oversight — a first in EU financial regulation. Cloud
              hyperscalers, core-banking SaaS, and trade-execution systems are all candidates.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FIVE PILLARS ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Scale className="h-4 w-4" />
            Five pillars · how Arkova maps to each
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            DORA's five operational areas, anchored.
          </h2>

          <div className="space-y-4">
            {FIVE_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-cyber-cyan/20"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-cyber-cyan" />
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  </div>
                  <p className="mb-3 text-sm font-medium text-white/85">Requirement</p>
                  <p className="mb-4 text-sm leading-relaxed text-white/70">{p.description}</p>
                  <p className="mb-2 text-sm font-medium text-white/85">Arkova</p>
                  <p className="text-sm leading-relaxed text-white/70">{p.arkova}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Calendar className="h-4 w-4" />
            Implementation timeline
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Five dates that matter.
          </h2>

          <div className="space-y-4">
            {TIMELINE.map((event) => {
              const isPast = event.status === 'past';
              const isCurrent = event.status === 'current';
              return (
                <div
                  key={event.date}
                  className={`rounded-sm border p-6 ${
                    isCurrent
                      ? 'border-cyber-cyan/40 bg-cyber-cyan/[0.04]'
                      : 'border-white/[0.08] bg-white/[0.015]'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-sm font-semibold ${
                          isCurrent ? 'text-cyber-cyan' : isPast ? 'text-white/70' : 'text-white/50'
                        }`}
                      >
                        {event.date}
                      </span>
                      <span
                        className={`rounded-sm px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${
                          isCurrent
                            ? 'bg-cyber-cyan/20 text-cyber-cyan'
                            : isPast
                              ? 'bg-white/[0.06] text-white/50'
                              : 'bg-white/[0.04] text-white/40'
                        }`}
                      >
                        {isCurrent ? 'In progress' : isPast ? 'Done' : 'Upcoming'}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{event.label}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{event.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ ENTITIES IN SCOPE ═══ */}
      <section className="border-y border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Building2 className="h-4 w-4" />
            Who's in scope
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            ~20 financial-entity categories, plus critical ICT TPPs.
          </h2>
          <div className="space-y-4 text-white/70">
            <p>
              DORA applies to substantially every regulated financial entity operating in the EU.
              The scope is broader than any prior single ICT-resilience regulation:
            </p>
            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {ENTITIES_IN_SCOPE.map((entity) => (
                <div key={entity} className="flex items-baseline gap-2">
                  <span className="text-cyber-cyan">·</span>
                  <span>{entity}</span>
                </div>
              ))}
            </div>
            <p className="text-sm">
              Microenterprises (≤10 employees, ≤€2M turnover or balance sheet) face proportionate
              requirements — not the full regime. Significance criteria for TLPT requirements are
              set in the relevant RTS.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ EVIDENCE CATEGORIES ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <FileText className="h-4 w-4" />
            What a DORA examiner asks for
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
            Six evidence categories every examination needs.
          </h2>

          <ol className="space-y-5 text-white/70">
            <li>
              <strong className="text-white">ICT risk management framework + management-body approval.</strong>{' '}
              Documented framework approved at least annually by the management body. Risk-tolerance
              levels, digital operational resilience strategy, and review minutes.
            </li>
            <li>
              <strong className="text-white">Incident classification and reporting log.</strong>{' '}
              All ICT incidents classified by severity. Major incidents reported to the competent
              authority within initial 4-hour, intermediate 72-hour, and final 1-month windows. Proof
              of timing is critical — DORA explicitly penalises late reporting.
            </li>
            <li>
              <strong className="text-white">ICT third-party register and contractual evidence.</strong>{' '}
              Single register of all ICT third-party arrangements. Pre-contractual due diligence,
              mandatory contractual provisions (audit rights, exit plans, sub-outsourcing), and
              ongoing-monitoring records.
            </li>
            <li>
              <strong className="text-white">Operational resilience test results.</strong>{' '}
              Annual program of vulnerability scans, scenario-based tests, network security
              assessments. For significant entities: TLPT (TIBER-EU) every 3 years.
            </li>
            <li>
              <strong className="text-white">Business continuity + disaster recovery plans.</strong>{' '}
              Tested annually. RTO/RPO targets per critical function. Backup and recovery procedures.
              Cross-border continuity arrangements where applicable.
            </li>
            <li>
              <strong className="text-white">Information-sharing attestations.</strong>{' '}
              Records of cyber-threat information shared with other financial entities through
              trusted communities, including legal-basis documentation under GDPR.
            </li>
          </ol>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Build a DORA evidence layer that survives every vendor exit.
          </h2>
          <p className="mb-6 text-lg text-white/70">
            We're working with EU financial entities on cryptographically anchored ICT-resilience
            evidence. If your last competent-authority interaction left you reconstructing timelines
            from screenshots and email threads, talk to us.
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
