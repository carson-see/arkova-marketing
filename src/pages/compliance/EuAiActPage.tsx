/**
 * EU AI Act Compliance Page — framework landing page.
 *
 * Targets the keyword "EU AI Act compliance" / "EU AI Act compliance software".
 * Captures search intent from buyers preparing for the August 2024 → August 2027
 * phased implementation, with deeper coverage of practical evidence requirements
 * than competitor pages (which mostly stop at "we map controls").
 */

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  Shield,
  CheckCircle2,
  FileText,
  Calendar,
  Building2,
  Scale,
} from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { PrivateBetaBadge, BuildingNote } from '../../components/PrivateBetaBadge';
import { safeJsonLd } from '../../lib/safeJsonLd';

const TIMELINE = [
  {
    date: '1 Aug 2024',
    label: 'Entered into force',
    description: 'EU AI Act published in the Official Journal. Phased implementation begins.',
    status: 'past' as const,
  },
  {
    date: '2 Feb 2025',
    label: 'Prohibitions applicable',
    description: 'Unacceptable-risk AI systems banned: social scoring, manipulative AI, real-time biometric ID in public (with narrow law-enforcement exceptions), emotion recognition in workplaces and schools, untargeted facial-image scraping.',
    status: 'past' as const,
  },
  {
    date: '2 Aug 2025',
    label: 'GPAI obligations applicable',
    description: 'General-Purpose AI model providers must comply: technical documentation, copyright policy, training-data transparency, systemic-risk model evaluations.',
    status: 'past' as const,
  },
  {
    date: '2 Aug 2026',
    label: 'High-risk obligations applicable',
    description: 'High-risk AI systems must comply with risk management, data governance, technical documentation, record-keeping, transparency, human oversight, accuracy, robustness, and cybersecurity requirements.',
    status: 'current' as const,
  },
  {
    date: '2 Aug 2027',
    label: 'Annex II high-risk extension',
    description: 'High-risk systems used as safety components of products covered by EU sectoral legislation (medical devices, machinery, toys, etc.) become applicable. Full EU AI Act compliance required across all in-scope deployments.',
    status: 'future' as const,
  },
];

const RISK_TIERS = [
  {
    tier: 'Unacceptable risk',
    icon: AlertTriangle,
    color: 'text-red-400 border-red-500/30 bg-red-500/[0.06]',
    examples: 'Social scoring · subliminal manipulation · real-time biometric ID in public · workplace and school emotion recognition · untargeted facial-image scraping',
    obligation: 'Banned. No deployment in the EU permitted.',
  },
  {
    tier: 'High risk',
    icon: AlertCircle,
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]',
    examples: 'Annex III: biometric ID, critical infrastructure, education access, employment, essential services (creditworthiness, public benefits), law enforcement, migration, justice, democratic processes. Annex II: AI as safety component of regulated products (medical devices, machinery, toys).',
    obligation: 'Risk management system · data governance · technical documentation · record-keeping · transparency · human oversight · accuracy + robustness + cybersecurity · post-market monitoring · conformity assessment + CE marking. Most onerous tier.',
  },
  {
    tier: 'Limited risk',
    icon: Shield,
    color: 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/[0.04]',
    examples: 'Chatbots, emotion-recognition systems, biometric categorization, deepfakes (text, audio, video).',
    obligation: 'Transparency obligations: users must be informed they are interacting with AI. Generated content must be labeled as AI-generated.',
  },
  {
    tier: 'Minimal risk',
    icon: CheckCircle2,
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.06]',
    examples: 'Spam filters, AI in video games, inventory optimization, recommendation engines below the high-risk threshold.',
    obligation: 'No mandatory obligations. Voluntary codes of conduct encouraged.',
  },
];

const ARKOVA_CONTROLS = [
  {
    article: 'Article 9 — Risk management system',
    requirement: 'Continuous, iterative risk management process across the AI system lifecycle. Documented identification, analysis, evaluation, and mitigation of risks.',
    arkova: 'Cryptographically anchored risk-assessment records with immutable timestamps. Each risk-management cycle is anchored, so an auditor can reconstruct the exact state of your risk register at any review date.',
  },
  {
    article: 'Article 10 — Data governance',
    requirement: 'Training, validation, and test datasets must be relevant, representative, free of errors, and complete. Documentation of data provenance, gathering processes, and data preparation.',
    arkova: 'Anchored data-source attestations with cryptographic fingerprints of dataset versions. Independent verification that the dataset claimed in your audit is the dataset actually used.',
  },
  {
    article: 'Article 11 + Annex IV — Technical documentation',
    requirement: 'Comprehensive technical documentation covering system design, development methodology, training data, validation procedures, performance metrics, and post-market monitoring.',
    arkova: 'Versioned, anchored technical documentation. Every revision is timestamped. Auditors verify that the version provided matches the version reviewed at any prior date — without trusting your file system.',
  },
  {
    article: 'Article 12 — Record-keeping (logging)',
    requirement: 'Automatic event logging during system operation. Logs must enable traceability and post-market monitoring.',
    arkova: 'Append-only audit log with cryptographic anchoring. Logs cannot be retroactively altered. Each event has an independently verifiable receipt.',
  },
  {
    article: 'Article 14 — Human oversight',
    requirement: 'Documented human oversight measures, training of oversight personnel, and intervention protocols.',
    arkova: 'Oversight events (intervention, override, escalation) anchored with operator identity and timestamp. Full chain of custody from AI decision to human review.',
  },
  {
    article: 'Article 17 — Quality management system',
    requirement: 'Documented QMS for compliance with the EU AI Act, including configuration management, testing protocols, and post-market plan.',
    arkova: 'QMS document hierarchy with cryptographic version control. Each policy revision creates a new anchored receipt — the QMS history is independently auditable.',
  },
  {
    article: 'Article 26 + 50 — Transparency',
    requirement: 'Users must be informed when interacting with AI. AI-generated content (deepfakes, synthetic media) must be labeled. Documentation of disclosures to data subjects.',
    arkova: 'Anchored disclosure attestations: when, to whom, what was disclosed. Verifiable proof that transparency obligations were met at the time required.',
  },
];

export default function EuAiActPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'EU AI Act Compliance — Arkova',
    description:
      'EU AI Act compliance evidence layer. Risk management, data governance, technical documentation, and audit logs cryptographically anchored for independent verification.',
    url: 'https://arkova.ai/compliance/eu-ai-act',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
    mainEntity: {
      '@type': 'Service',
      name: 'EU AI Act Compliance Audit Automation',
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
          { name: 'EU AI Act', url: 'https://arkova.ai/compliance/eu-ai-act' },
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
              Compliance · EU AI Act
            </p>
            <PrivateBetaBadge />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            EU AI Act compliance, on a substrate auditors can verify.
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            High-risk AI obligations become applicable on 2&nbsp;August&nbsp;2026. Arkova anchors your
            risk management, data governance, technical documentation, and audit logs to a public ledger,
            so an auditor or regulator can verify every claim without trusting your file system.
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

      {/* ═══ WHAT IS THE EU AI ACT ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            What it is
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            The first comprehensive horizontal AI law.
          </h2>
          <div className="space-y-5 text-white/70">
            <p>
              The EU AI Act (Regulation 2024/1689) is the world's first comprehensive legal framework
              specifically governing artificial intelligence. It takes a risk-based approach: AI systems
              are classified into four tiers based on their potential to cause harm, and obligations
              scale accordingly.
            </p>
            <p>
              The law applies extraterritorially. If you are placing an AI system on the EU market, or
              its output affects people in the EU, you fall in scope, regardless of where your company
              is incorporated. Penalties reach up to <strong className="text-white">€35&nbsp;million or
              7% of global annual turnover</strong>, whichever is higher, for prohibited-AI violations.
              €15M / 3% for most other violations.
            </p>
            <p>
              The act entered into force on 1 August 2024 and phases in through 2 August 2027. The
              prohibition tier and General-Purpose AI obligations are already applicable. The high-risk
              tier — where most enterprise AI deployments will land — becomes applicable on 2&nbsp;August&nbsp;2026.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Calendar className="h-4 w-4" />
            Implementation timeline
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Five dates that determine your obligations.
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
                      : isPast
                        ? 'border-white/[0.08] bg-white/[0.015]'
                        : 'border-white/[0.08] bg-white/[0.01]'
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
                        {isCurrent ? 'Next deadline' : isPast ? 'In effect' : 'Upcoming'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{event.label}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{event.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ RISK TIERS ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Risk classification
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Four tiers determine what you owe.
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {RISK_TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div key={tier.tier} className={`rounded-sm border p-6 ${tier.color}`}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <h3 className="text-lg font-bold text-white">{tier.tier}</h3>
                  </div>
                  <p className="mb-3 text-sm font-medium text-white/85">Examples</p>
                  <p className="mb-4 text-sm leading-relaxed text-white/70">{tier.examples}</p>
                  <p className="mb-2 text-sm font-medium text-white/85">Obligation</p>
                  <p className="text-sm leading-relaxed text-white/70">{tier.obligation}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-white/60">
            Most enterprise AI deployments land in the <strong className="text-white">high-risk</strong> tier,
            and the high-risk tier is where the evidence-and-audit burden sits. The rest of this page focuses
            on the high-risk obligations Arkova helps you anchor.
          </p>
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
            If you place AI on the EU market, you are covered.
          </h2>
          <div className="space-y-4 text-white/70">
            <p>
              The EU AI Act applies to <strong className="text-white">providers</strong> (you build or rebrand
              an AI system), <strong className="text-white">deployers</strong> (you use an AI system in your
              operations), <strong className="text-white">importers</strong>, <strong className="text-white">distributors</strong>,
              and <strong className="text-white">authorized representatives</strong>. It applies regardless of
              where you are incorporated, if any of these conditions are met:
            </p>
            <ul className="ml-5 list-disc space-y-2 text-sm">
              <li>You place an AI system or General-Purpose AI model on the EU market</li>
              <li>You put an AI system into service in the EU</li>
              <li>You are a provider or deployer outside the EU but the AI system's output is used in the EU</li>
            </ul>
            <p>
              In practice this captures most US, UK, APAC, and LATAM enterprises operating globally. The
              extraterritorial scope mirrors GDPR.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ARKOVA CONTROL MAPPING ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <Scale className="h-4 w-4" />
            How Arkova maps to high-risk obligations
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Evidence that does not depend on trust in your vendors.
          </h2>
          <p className="mb-10 max-w-3xl text-white/70">
            High-risk AI obligations require continuous documentation. Arkova does not replace your existing AI
            governance, MLOps, or risk-management tools — it sits next to them and anchors their output to a
            public ledger so a regulator, auditor, or counterparty can verify each claim independently.
          </p>

          <div className="space-y-4">
            {ARKOVA_CONTROLS.map((control) => (
              <div
                key={control.article}
                className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-cyber-cyan/20"
              >
                <h3 className="mb-2 font-mono text-sm font-semibold text-cyber-cyan">{control.article}</h3>
                <p className="mb-3 text-sm font-medium text-white/85">Requirement</p>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{control.requirement}</p>
                <p className="mb-2 text-sm font-medium text-white/85">Arkova</p>
                <p className="text-sm leading-relaxed text-white/70">{control.arkova}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU NEED ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <FileText className="h-4 w-4" />
            What an EU AI Act audit asks for
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
            The seven evidence categories every high-risk system needs.
          </h2>

          <ol className="space-y-5 text-white/70">
            <li>
              <strong className="text-white">Risk management documentation.</strong>{' '}
              The risk register at every milestone. Identification, analysis, evaluation, mitigation steps,
              residual-risk assessments. Versioned across the AI system's lifecycle.
            </li>
            <li>
              <strong className="text-white">Data governance records.</strong>{' '}
              Training, validation, and test dataset provenance. Sampling decisions. Bias assessments.
              Data-preparation and labeling protocols. Data-subject rights handling for personal data.
            </li>
            <li>
              <strong className="text-white">Technical documentation (Annex IV).</strong>{' '}
              Full system description, intended purpose, hardware, software, design choices, training methodology,
              performance metrics on relevant demographics, accuracy and robustness measurements, cybersecurity
              controls, and human-oversight measures.
            </li>
            <li>
              <strong className="text-white">Automatic operation logs.</strong>{' '}
              Append-only event logs covering the AI system's operational period. Sufficient detail to enable
              post-market monitoring, incident reconstruction, and traceability of decisions.
            </li>
            <li>
              <strong className="text-white">Conformity assessment records.</strong>{' '}
              Either internal control (Annex VI) or third-party assessment (Annex VII), depending on the system.
              EU declaration of conformity. CE marking. Notified-body certificates where applicable.
            </li>
            <li>
              <strong className="text-white">Quality management system documentation.</strong>{' '}
              QMS scope, policies, procedures, configuration management, change-control records, test protocols,
              and post-market plan, all with audit trail.
            </li>
            <li>
              <strong className="text-white">Transparency and human-oversight evidence.</strong>{' '}
              Disclosures made to deployers and end-users. Records of human-oversight interventions. Training
              of oversight personnel. Operator-error and override events.
            </li>
          </ol>

          <div className="mt-10 rounded-sm border border-cyber-cyan/15 bg-cyber-cyan/[0.04] p-6">
            <p className="text-sm leading-relaxed text-white/85">
              Each of these categories is currently produced by 3–7 different tools at most enterprises (MLOps,
              data-catalog, GRC, e-signature, document management, ticketing). The hard part is not generating
              the evidence — it is assembling a coherent, audit-ready evidence package that survives vendor
              transitions. That is the problem Arkova exists to solve.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Get ready for 2 August 2026.
          </h2>
          <p className="mb-6 text-lg text-white/70">
            We are working with early-access partners on EU AI Act readiness right now. If you are deploying
            high-risk AI in the EU, we want to hear about your evidence stack.
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
              the State of Compliance in 2026
            </Link>{' '}
            for the broader regulatory picture.
          </p>
        </div>
      </section>
    </>
  );
}
