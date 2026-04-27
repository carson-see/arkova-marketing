/**
 * FERPA (Family Educational Rights and Privacy Act) Compliance Page.
 *
 * Targets the keyword "FERPA compliance software". US education vertical
 * with relatively low competition — most legacy GRC platforms (Vanta, Drata,
 * Secureframe) skew SOC 2 / HIPAA / GDPR and have minimal FERPA-specific
 * coverage. Arkova has real product fit here: universities issue degrees
 * and transcripts; verifiable credential anchoring is exactly the use case.
 */

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Shield,
  Building2,
  Scale,
} from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { PrivateBetaBadge, BuildingNote } from '../../components/PrivateBetaBadge';
import { safeJsonLd } from '../../lib/safeJsonLd';

const KEY_RIGHTS = [
  {
    title: 'Right to inspect and review',
    description:
      'Parents (or eligible students 18+) have the right to inspect and review the student\'s education records within 45 days of a request. The institution must provide explanations and interpretations of the records.',
    arkova:
      'Anchored receipts of inspection requests, fulfillment timestamps, and the exact records produced. A FERPA examiner can verify the 45-day window was met for any prior request.',
  },
  {
    title: 'Right to request amendment',
    description:
      'Parents/eligible students may request that records they believe are inaccurate or misleading be amended. Institutions must respond, hold a formal hearing if denied, and allow a written statement of disagreement to be appended.',
    arkova:
      'Append-only amendment trail with cryptographic timestamps. Original records, amendment requests, hearing outcomes, and disagreement statements all linked into a verifiable chain.',
  },
  {
    title: 'Right to consent to disclosure',
    description:
      'Schools must obtain written consent before disclosing personally identifiable information from education records, except for specific exceptions (school officials with legitimate interest, transfer institutions, judicial orders, etc.).',
    arkova:
      'Disclosure log with anchored consent receipts: who consented, for what purpose, on what date, and what was actually disclosed. Disputes about prior consent become objectively verifiable.',
  },
  {
    title: 'Right to file a complaint',
    description:
      'Parents/eligible students may file a complaint with the U.S. Department of Education\'s Student Privacy Policy Office (SPPO) regarding alleged FERPA violations.',
    arkova:
      'Complete record-handling timeline anchored. When SPPO investigates, your institution can produce an immutable audit trail of every disclosure decision in the period.',
  },
];

const DIRECTORY_VS_PII = [
  {
    category: 'Directory information',
    examples: 'Name, address, phone, email, dates of attendance, enrollment status, photograph, degrees and awards received, participation in officially recognized activities.',
    rule: 'May be disclosed without consent IF the school provides annual notice and gives the student opportunity to opt out.',
  },
  {
    category: 'Education records (PII)',
    examples: 'Grades, transcripts, class lists, course schedules, disciplinary records, Social Security numbers, financial aid records, medical/psychological records related to treatment.',
    rule: 'Cannot be disclosed without written consent except under specific FERPA exceptions (legitimate educational interest, audit/evaluation, financial aid, etc.).',
  },
  {
    category: 'Sole-possession records',
    examples: 'Personal notes by school officials kept solely for personal use, not shared with anyone else, used as a memory aid.',
    rule: 'Not "education records" under FERPA. No FERPA disclosure restrictions.',
  },
  {
    category: 'Treatment records',
    examples: 'Records made by physicians, psychiatrists, psychologists for adult students used solely in connection with treatment, not disclosed for any other purpose.',
    rule: 'Not "education records" if used solely for treatment. Become education records if shared with anyone other than the treating professional.',
  },
];

const EVIDENCE_CATEGORIES = [
  {
    title: 'Annual notification of FERPA rights',
    detail:
      'Every year, the institution must notify parents/eligible students of their FERPA rights, the procedure for inspecting records, the procedure for amendment requests, and the criteria for "legitimate educational interest" used in disclosure decisions.',
  },
  {
    title: 'Directory information opt-out records',
    detail:
      'Documented opportunity for students/parents to opt out of directory-information disclosure, plus the actual list of opt-outs maintained throughout the academic year.',
  },
  {
    title: 'Disclosure log under §99.32',
    detail:
      'Record of each request for and disclosure of personally identifiable information from a student\'s education records. Required to include the parties who requested or received the information and their legitimate interests.',
  },
  {
    title: 'Consent records',
    detail:
      'Signed and dated written consent forms specifying records to be disclosed, purpose of disclosure, and party/parties to whom disclosure is made. FERPA has specific signature requirements (electronic signatures permitted with proper authentication).',
  },
  {
    title: 'Subcontractor / third-party agreements',
    detail:
      'Written agreements with third parties (cloud SaaS, analytics platforms, ed-tech vendors) requiring FERPA-equivalent protections. Annual due-diligence reviews. Required for the "school official" exception under §99.31(a)(1).',
  },
  {
    title: 'Training records',
    detail:
      'Documented FERPA training for all school officials with legitimate educational interest in records. Training content, attendance, and refresh dates.',
  },
];

export default function FerpaPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'FERPA Compliance — Audit-Ready Student-Records Evidence — Arkova',
    description:
      'FERPA compliance evidence layer for universities and K-12. Disclosure logs, consent records, third-party agreements, and amendment trails cryptographically anchored.',
    url: 'https://arkova.ai/compliance/ferpa',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
    mainEntity: {
      '@type': 'Service',
      name: 'FERPA Compliance Audit Automation',
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
          { name: 'FERPA', url: 'https://arkova.ai/compliance/ferpa' },
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
              Compliance · FERPA
            </p>
            <PrivateBetaBadge />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            FERPA evidence built for the institution that issues credentials.
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            Annual rights notifications, disclosure logs, consent records, third-party agreements,
            and amendment trails — all cryptographically anchored to a public ledger. Universities
            and K-12 districts get a FERPA evidence trail that survives the next SIS migration, the
            next ed-tech vendor change, and the next SPPO inquiry.
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

      {/* ═══ WHAT IS FERPA ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            What it is
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            The 50-year-old federal law every US school operates under.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              The Family Educational Rights and Privacy Act of 1974 (FERPA) is the federal law that
              governs the privacy of student education records. It applies to{' '}
              <strong className="text-white">every educational institution that receives funds
              under any program administered by the U.S. Department of Education</strong> — which
              effectively means every public K-12 district, every public university, and most
              private universities.
            </p>
            <p>
              FERPA grants four core rights to parents (and to "eligible students" 18 years old or
              attending post-secondary institutions): inspect and review records, request amendment
              of inaccurate records, consent to disclosure of personally identifiable information,
              and file a complaint with the Student Privacy Policy Office (SPPO) at the U.S.
              Department of Education.
            </p>
            <p>
              FERPA penalties are unusual: SPPO does not levy fines on individual records. Instead,
              the ultimate consequence is{' '}
              <strong className="text-white">withdrawal of federal funding</strong> from the
              institution. In practice, FERPA enforcement is reputational and operational —
              compliance officers worry about SPPO investigations, consent decrees, and the lawsuit
              risk from individual disclosure incidents.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FOUR RIGHTS ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Scale className="h-4 w-4" />
            Four rights · how Arkova maps to each
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            FERPA's four rights, with verifiable evidence behind each.
          </h2>

          <div className="space-y-4">
            {KEY_RIGHTS.map((r) => (
              <div
                key={r.title}
                className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-cyber-cyan/20"
              >
                <h3 className="mb-3 text-lg font-semibold text-white">{r.title}</h3>
                <p className="mb-3 text-sm font-medium text-white/85">Requirement</p>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{r.description}</p>
                <p className="mb-2 text-sm font-medium text-white/85">Arkova</p>
                <p className="text-sm leading-relaxed text-white/70">{r.arkova}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIRECTORY VS PII ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Shield className="h-4 w-4" />
            Record classification
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Four FERPA record categories determine your obligations.
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {DIRECTORY_VS_PII.map((cat) => (
              <div
                key={cat.category}
                className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-white">{cat.category}</h3>
                <p className="mb-3 text-sm font-medium text-white/85">Examples</p>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{cat.examples}</p>
                <p className="mb-2 text-sm font-medium text-white/85">FERPA rule</p>
                <p className="text-sm leading-relaxed text-white/70">{cat.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVIDENCE CATEGORIES ═══ */}
      <section className="border-y border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <FileText className="h-4 w-4" />
            What an SPPO inquiry asks for
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
            Six evidence categories every FERPA program needs.
          </h2>

          <ol className="space-y-5 text-white/70">
            {EVIDENCE_CATEGORIES.map((cat, i) => (
              <li key={cat.title}>
                <strong className="text-white">{i + 1}. {cat.title}.</strong>{' '}
                {cat.detail}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ WHO IS AFFECTED ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Building2 className="h-4 w-4" />
            Who's in scope
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Every institution receiving Department of Education funds.
          </h2>
          <div className="space-y-4 text-white/70">
            <p>
              FERPA scope is broad and indirect. The actual statutory hook is the receipt of federal
              education funds — but in practice this captures:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm">
              <li>
                <strong className="text-white">Public K-12 districts</strong> — every one of them via
                Title I, IDEA, and other federal programs.
              </li>
              <li>
                <strong className="text-white">Public universities and community colleges</strong> —
                all federal Title IV financial-aid recipients.
              </li>
              <li>
                <strong className="text-white">Most private universities</strong> — any institution
                whose students receive federal financial aid.
              </li>
              <li>
                <strong className="text-white">Charter schools, magnet schools, virtual schools</strong>{' '}
                — same federal-funding logic.
              </li>
              <li>
                <strong className="text-white">Third-party service providers</strong> (SIS vendors,
                LMS platforms, ed-tech SaaS) — bound by their school-official agreements under
                §99.31(a)(1).
              </li>
            </ul>
            <p className="text-sm">
              Private K-12 schools that don't accept federal funds are typically{' '}
              <em>not</em> subject to FERPA — but most align with FERPA practices voluntarily because
              parents expect equivalent protections.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Build a FERPA evidence trail that survives the next SIS migration.
          </h2>
          <p className="mb-6 text-lg text-white/70">
            We're working with universities and K-12 districts on cryptographically anchored
            student-records evidence. If your last SIS or LMS change broke parts of your
            disclosure log, talk to us.
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
