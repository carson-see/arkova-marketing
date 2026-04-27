/**
 * HIPAA Compliance Page — US healthcare framework landing page.
 *
 * Targets the keyword "HIPAA compliance software" / "HIPAA audit automation".
 * Privacy-first architecture (client-side fingerprinting — documents never
 * leave the device) maps directly onto HIPAA's PHI minimum-necessary +
 * encryption-in-use requirements. This is one of Arkova's strongest framework
 * fits.
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Building2, Scale, AlertCircle } from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { PrivateBetaBadge, BuildingNote } from '../../components/PrivateBetaBadge';
import { safeJsonLd } from '../../lib/safeJsonLd';

const RULES = [
  {
    label: 'Privacy Rule',
    title: '45 CFR §164.500–§164.534',
    description:
      'Standards for the use and disclosure of Protected Health Information (PHI). Minimum-necessary rule, individual rights to access/amend records, accounting of disclosures, business associate agreements (BAAs).',
    arkova:
      'Anchored disclosure log per patient: who requested PHI, why, on what date, what was disclosed. The §164.528 accounting-of-disclosures requirement becomes a single API query against an immutable ledger instead of a manual reconstruction.',
  },
  {
    label: 'Security Rule',
    title: '45 CFR §164.302–§164.318',
    description:
      'Administrative, physical, and technical safeguards for electronic PHI (ePHI). Encryption-in-transit + at-rest, access controls, audit controls, integrity controls, transmission security.',
    arkova:
      'Client-side SHA-256 fingerprinting before any data leaves the device satisfies the §164.312(a)(2)(iv) encryption addressable specification by design. Append-only audit log on a public ledger satisfies the §164.312(b) audit-controls requirement with independent verifiability.',
  },
  {
    label: 'Breach Notification Rule',
    title: '45 CFR §164.400–§164.414',
    description:
      'Required notifications when a breach of unsecured PHI occurs. Individual notice within 60 days, HHS notice (timing depends on breach size), media notice for breaches affecting 500+ residents of a state.',
    arkova:
      'Anchored timeline per incident: when discovered, when assessed, when notifications sent. Disputes about whether notification met the 60-day window become objectively verifiable.',
  },
  {
    label: 'Enforcement Rule',
    title: '45 CFR §160.300–§160.552',
    description:
      'OCR investigation procedures, civil monetary penalties (up to $1.9M per violation per year, indexed for inflation), corrective action plans.',
    arkova:
      'OCR investigations frequently turn on whether claimed safeguards were operating at the time of the alleged violation. Anchored evidence + immutable timeline removes the "your logs say so but how do we know" question.',
  },
];

const SAFEGUARDS = [
  {
    category: 'Administrative',
    items: [
      'Security Management Process (§164.308(a)(1)) — risk analysis + risk management',
      'Workforce Security (§164.308(a)(3)) — access authorization, supervision, termination',
      'Information Access Management (§164.308(a)(4)) — access establishment + modification',
      'Security Awareness + Training (§164.308(a)(5))',
      'Security Incident Procedures (§164.308(a)(6))',
      'Contingency Plan (§164.308(a)(7)) — backup, disaster recovery, emergency mode',
      'Evaluation (§164.308(a)(8)) — periodic technical + non-technical evaluation',
      'Business Associate Contracts (§164.308(b)(1))',
    ],
  },
  {
    category: 'Physical',
    items: [
      'Facility Access Controls (§164.310(a)(1))',
      'Workstation Use + Security (§164.310(b), (c))',
      'Device + Media Controls (§164.310(d)(1))',
    ],
  },
  {
    category: 'Technical',
    items: [
      'Access Control (§164.312(a)(1)) — unique user IDs, emergency access, automatic logoff, encryption + decryption',
      'Audit Controls (§164.312(b))',
      'Integrity (§164.312(c)(1)) — mechanism to authenticate ePHI',
      'Person or Entity Authentication (§164.312(d))',
      'Transmission Security (§164.312(e)(1)) — integrity + encryption',
    ],
  },
];

const COVERED_ENTITIES = [
  {
    type: 'Health Plans',
    examples: 'Health insurance issuers, HMOs, Medicare/Medicaid programs, employer-sponsored group health plans, ACA marketplace plans.',
  },
  {
    type: 'Health Care Providers',
    examples: 'Hospitals, physicians, dentists, clinics, nursing homes, pharmacies — provided they transmit PHI in electronic form for HIPAA-defined transactions.',
  },
  {
    type: 'Health Care Clearinghouses',
    examples: 'Billing services, repricing companies, community health information systems that translate non-standard health data.',
  },
  {
    type: 'Business Associates',
    examples: 'Cloud SaaS, EHR vendors, transcription services, accounting firms, IT contractors — anyone creating, receiving, maintaining, or transmitting PHI on behalf of a covered entity. Subject to direct HIPAA liability since HITECH (2009).',
  },
];

export default function HipaaPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'HIPAA Compliance Audit Automation — Arkova',
    description:
      'HIPAA Privacy, Security, Breach Notification, and Enforcement Rule evidence cryptographically anchored. Privacy-first architecture maps directly onto PHI minimum-necessary and encryption requirements.',
    url: 'https://arkova.ai/compliance/hipaa',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
    mainEntity: {
      '@type': 'Service',
      name: 'HIPAA Compliance Audit Automation',
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
          { name: 'HIPAA', url: 'https://arkova.ai/compliance/hipaa' },
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
              Compliance · HIPAA
            </p>
            <PrivateBetaBadge />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            HIPAA evidence built on an architecture where PHI never leaves the device.
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            Documents are SHA-256 fingerprinted in your browser before anything reaches our
            systems. The original PHI never crosses the network. That isn't just a privacy
            convenience — it materially shrinks the surface area HIPAA's Security Rule applies to.
            What's left is metadata anchored to a public ledger so an OCR investigator can verify
            your audit log without trusting Arkova or any other vendor.
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

      {/* ═══ WHAT IS HIPAA ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            What it is
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            The 1996 law that became four rules and a $1.9M-per-violation penalty regime.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              HIPAA is the Health Insurance Portability and Accountability Act of 1996. The
              original act was about insurance portability when changing jobs; the compliance burden
              everyone refers to as "HIPAA" actually comes from regulations issued by HHS afterward
              — most notably the Privacy Rule (2003), the Security Rule (2005), the Breach
              Notification Rule (2009 under HITECH), and the Enforcement Rule.
            </p>
            <p>
              HIPAA applies to <strong className="text-white">covered entities</strong> (health
              plans, providers, clearinghouses) and to{' '}
              <strong className="text-white">business associates</strong> (anyone handling PHI on
              their behalf — direct HIPAA liability since HITECH 2009). Civil monetary penalties
              reach up to <strong className="text-white">$1.9M per violation category per year</strong>,
              indexed for inflation. Criminal penalties up to <strong className="text-white">10
              years imprisonment</strong> for knowing violations with intent to sell or transfer
              PHI for personal gain.
            </p>
            <p>
              The Office for Civil Rights (OCR) within HHS investigates complaints, performs
              periodic audits, and resolves cases either through corrective-action plans (most
              common) or through formal Resolution Agreements (with the highest penalties published).
              Most multi-million-dollar HIPAA settlements turn on whether the entity could prove
              the safeguards it claimed were operating actually were operating at the time.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FOUR RULES ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Scale className="h-4 w-4" />
            The four rules · how Arkova maps to each
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            HIPAA's four operational rules, anchored.
          </h2>

          <div className="space-y-4">
            {RULES.map((r) => (
              <div
                key={r.label}
                className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-cyber-cyan/20"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-sm bg-cyber-cyan/10 px-2 py-0.5 font-mono text-xs font-semibold text-cyber-cyan">
                    {r.label}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                </div>
                <p className="mb-3 text-sm font-medium text-white/85">Requirement</p>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{r.description}</p>
                <p className="mb-2 text-sm font-medium text-white/85">Arkova</p>
                <p className="text-sm leading-relaxed text-white/70">{r.arkova}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECURITY RULE SAFEGUARDS ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Shield className="h-4 w-4" />
            Security Rule safeguards
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Three categories of safeguards. Twenty-plus standards.
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {SAFEGUARDS.map((cat) => (
              <div key={cat.category} className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6">
                <h3 className="mb-4 text-lg font-bold text-white">{cat.category}</h3>
                <ul className="space-y-2 text-xs leading-relaxed text-white/70">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-2">
                      <span className="text-cyber-cyan">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-sm border border-cyber-cyan/15 bg-cyber-cyan/[0.04] p-6">
            <p className="text-sm leading-relaxed text-white/85">
              Arkova specifically targets the technical safeguards that produce the most evidence
              demand: <strong className="text-white">audit controls</strong> (§164.312(b)),{' '}
              <strong className="text-white">integrity</strong> (§164.312(c)(1)), and{' '}
              <strong className="text-white">encryption</strong> (§164.312(a)(2)(iv) +
              §164.312(e)(2)(ii)). Anchored receipts replace screenshot-and-spreadsheet evidence
              with cryptographic proof.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ COVERED ENTITIES ═══ */}
      <section className="border-y border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Building2 className="h-4 w-4" />
            Who's in scope
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Covered entities, business associates, and most of their downstream chain.
          </h2>

          <div className="space-y-5">
            {COVERED_ENTITIES.map((e) => (
              <div key={e.type} className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-5">
                <h3 className="mb-2 text-base font-semibold text-white">{e.type}</h3>
                <p className="text-sm leading-relaxed text-white/70">{e.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EVIDENCE CATEGORIES ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <FileText className="h-4 w-4" />
            What an OCR investigation asks for
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
            Six evidence categories every HIPAA program needs.
          </h2>

          <ol className="space-y-5 text-white/70">
            <li>
              <strong className="text-white">1. Risk analysis + risk-management plan.</strong>{' '}
              §164.308(a)(1)(ii)(A) requires an accurate, thorough assessment of potential risks
              and vulnerabilities to the confidentiality, integrity, and availability of ePHI.
              This is the single most-cited gap in OCR enforcement actions.
            </li>
            <li>
              <strong className="text-white">2. Policies + procedures.</strong>{' '}
              Documented policies covering each Privacy Rule and Security Rule standard. Required
              to be reviewed and updated periodically; updates must be evidenced.
            </li>
            <li>
              <strong className="text-white">3. Workforce training records.</strong>{' '}
              §164.530(b)(1) (Privacy) and §164.308(a)(5) (Security) both require workforce
              training. Records must show training was provided to all members of the workforce
              and to new hires within a reasonable period.
            </li>
            <li>
              <strong className="text-white">4. Audit-control logs.</strong>{' '}
              §164.312(b) requires hardware, software, or procedural mechanisms that record and
              examine activity in systems containing ePHI. Logs must be retained for at least 6
              years (§164.530(j)) and produced on request.
            </li>
            <li>
              <strong className="text-white">5. Business Associate Agreements (BAAs).</strong>{' '}
              Every third party with access to PHI requires a signed BAA per §164.504(e).
              Maintenance of an up-to-date BAA register with executed agreements is required for
              the §164.308(b)(1) standard.
            </li>
            <li>
              <strong className="text-white">6. Breach risk assessments + notification timeline.</strong>{' '}
              §164.402 requires a four-factor risk assessment to determine whether an impermissible
              use or disclosure constitutes a reportable breach. Notification timing under §164.404
              and §164.408 must be documented from discovery through individual + HHS + (if
              applicable) media notice.
            </li>
          </ol>
        </div>
      </section>

      {/* ═══ THE PRIVACY-FIRST ANGLE ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <AlertCircle className="h-4 w-4" />
            Why Arkova fits HIPAA particularly well
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            We can't leak PHI we never received.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              Most compliance-evidence platforms are themselves business associates because they
              ingest PHI to function. Every BAA you sign is one more breach surface, one more vendor
              to vet, one more audit exposure.
            </p>
            <p>
              Arkova's architecture is different. <strong className="text-white">Documents are
              SHA-256 fingerprinted in your browser using the Web Crypto API before anything
              touches our systems.</strong> Only the 64-character hash + structured metadata flow
              outward. The original PHI stays on your device. Even if our infrastructure were
              entirely compromised, the attacker would not have any of your PHI — because we
              never had it.
            </p>
            <p>
              This isn't a privacy nicety. It's an architectural property that:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm">
              <li>Substantially shrinks the surface where the Security Rule's encryption and access-control standards apply</li>
              <li>Reduces the BAA risk of using Arkova versus a vendor that ingests PHI</li>
              <li>Aligns with the §164.502(b) minimum-necessary standard by design</li>
              <li>Survives the worst breach scenarios because there is no PHI to breach</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Build a HIPAA evidence trail that fits behind your existing BAAs.
          </h2>
          <p className="mb-6 text-lg text-white/70">
            If you're a covered entity or business associate looking for PHI evidence that doesn't
            require Arkova to ever see your documents, we'd like to discuss an early-access pilot.
          </p>
          <BuildingNote className="mx-auto mb-10 max-w-2xl" />
          <Link to="/contact" className="cyber-btn inline-flex items-center gap-2">
            Request Early Access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
