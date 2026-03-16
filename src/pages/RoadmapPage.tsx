/**
 * Roadmap Page — sleek, high-level "at a glance" roadmap
 * with 3 phase cards connected by a timeline visual.
 */

import { ArrowRight, CheckCircle2, Clock, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PHASES = [
  {
    number: 'I',
    title: 'Foundation',
    subtitle: 'Credentialing & Verification API',
    timeline: '2025–2026',
    status: 'In Progress' as const,
    description: 'Trustless credential verification for universities, HR, and compliance teams.',
    items: [
      'Client-side SHA-256 cryptographic fingerprinting',
      'Bitcoin-anchored proof of existence and timing',
      'Public verification pages with QR codes',
      'REST Verification API with batch processing',
      'AI-powered metadata extraction and classification',
      'MCP server for AI agent integration',
      'Organization management and credential templates',
      'Webhook notifications and event streaming',
    ],
    compliance: ['SOX', 'ESIGN', 'UETA', 'FERPA'],
    color: 'steel' as const,
  },
  {
    number: 'II',
    title: 'Attestations',
    subtitle: 'Agentic Verification Layer',
    timeline: '2026–2027',
    status: 'Planned' as const,
    description: 'Extend verification into institutional attestations, asset provenance, and autonomous agent workflows.',
    items: [
      'Immutable attestations for supply chain and ESG',
      'Agent identity verification and trust delegation',
      'Record authenticity oracle for AI systems',
      'Chain-of-custody dashboards',
      'Enterprise system integrations (SAP GRC, IBM Sterling)',
      'AI-powered fraud detection and compliance reports',
    ],
    compliance: ['SOC 2 Type I', 'EU AI Act'],
    color: 'ocean' as const,
  },
  {
    number: 'III',
    title: 'E-Signatures',
    subtitle: 'Compliance Unification Layer',
    timeline: '2027–2028',
    status: 'Future' as const,
    description: 'Unify verification, attestations, and legally binding signatures into one trustless compliance fabric.',
    items: [
      'Jurisdiction-compliant signature engine (AdES + PKI)',
      'QTSP integration for eIDAS qualified trust services',
      'Hybrid storage with on-chain proof',
      'SOC 2 evidence bundle and compliance center',
      'Platform licensing for agent providers',
    ],
    compliance: ['SOC 2 Type II', 'eIDAS', 'ETSI EN 319'],
    color: 'deep' as const,
  },
];

const STATUS_STYLES = {
  'In Progress': 'bg-arkova-steel/15 text-arkova-ocean dark:text-arkova-steel border border-arkova-steel/20',
  Planned: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  Future: 'bg-arkova-slate/10 text-arkova-slate dark:text-arkova-steel-light/50 border border-arkova-slate/10',
};

const STATUS_ICONS = {
  'In Progress': Clock,
  Planned: Circle,
  Future: Circle,
};

const COLOR_ACCENTS = {
  steel: {
    icon: 'from-arkova-steel/20 to-arkova-steel/5',
    dot: 'bg-arkova-steel',
    number: 'text-arkova-steel',
  },
  ocean: {
    icon: 'from-arkova-ocean/20 to-arkova-steel/5',
    dot: 'bg-arkova-ocean',
    number: 'text-arkova-ocean dark:text-arkova-steel',
  },
  deep: {
    icon: 'from-arkova-deep/20 to-arkova-ocean/5',
    dot: 'bg-arkova-deep',
    number: 'text-arkova-deep dark:text-arkova-steel-light/60',
  },
};

export default function RoadmapPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-mesh-gradient dark:bg-mesh-dark" />
        <div className="absolute inset-0 bg-subtle-dots" />
        <div className="pointer-events-none absolute -top-20 -right-32 h-96 w-96 rounded-full bg-arkova-steel/5 dark:bg-arkova-steel/3 blur-3xl animate-float" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Product Roadmap
          </p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-arkova-charcoal dark:text-white opacity-0 animate-fade-up md:text-5xl" style={{ animationDelay: '0.2s' }}>
            Building the verification layer
            <br />
            <span className="bg-gradient-to-r from-arkova-steel to-arkova-ocean bg-clip-text text-transparent">
              for the agentic economy
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-arkova-slate dark:text-arkova-steel-light/60 opacity-0 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            From credential verification to institutional attestations to legally recognized e-signatures — a phased approach to trustless compliance infrastructure.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ TIMELINE ═══ */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">

          {/* Desktop: horizontal timeline connector */}
          <div className="hidden md:block relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
              <div className="h-full w-full bg-gradient-to-r from-arkova-steel/40 via-arkova-ocean/30 to-arkova-deep/20" />
            </div>
            <div className="relative flex justify-between px-[16%]">
              {PHASES.map((phase) => (
                <div key={phase.number} className="flex flex-col items-center">
                  <div className={`h-4 w-4 rounded-full ${COLOR_ACCENTS[phase.color].dot} ring-4 ring-arkova-mist dark:ring-arkova-charcoal`} />
                  <span className="mt-2 text-xs font-medium text-arkova-slate dark:text-arkova-steel-light/50">{phase.timeline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {PHASES.map((phase, i) => {
              const StatusIcon = STATUS_ICONS[phase.status];
              return (
                <div
                  key={phase.number}
                  className="group relative rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-8 shadow-card-rest dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-card-hover dark:hover:bg-white/[0.05] opacity-0 animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.15}s` }}
                >
                  {/* Mobile timeline dot */}
                  <div className="md:hidden absolute -left-3 top-10">
                    <div className={`h-3 w-3 rounded-full ${COLOR_ACCENTS[phase.color].dot}`} />
                  </div>

                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <div className={`font-mono text-4xl font-bold ${COLOR_ACCENTS[phase.color].number}`}>{phase.number}</div>
                      <div className="mt-1 text-xs font-medium text-arkova-slate dark:text-arkova-steel-light/50 md:hidden">{phase.timeline}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[phase.status]}`}>
                      <StatusIcon className="h-3 w-3" />
                      {phase.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-1 text-xl font-bold text-arkova-charcoal dark:text-white">{phase.title}</h2>
                  <p className="mb-4 text-sm font-medium text-arkova-steel">{phase.subtitle}</p>
                  <p className="mb-6 text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{phase.description}</p>

                  {/* Items */}
                  <ul className="mb-6 space-y-2.5">
                    {phase.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-arkova-slate dark:text-arkova-steel-light/60">
                        <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${phase.status === 'In Progress' ? 'text-arkova-steel' : 'text-arkova-slate/30 dark:text-arkova-steel-light/20'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Compliance badges */}
                  <div className="flex flex-wrap gap-2">
                    {phase.compliance.map((badge) => (
                      <span key={badge} className="rounded-full bg-arkova-frost dark:bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-arkova-ocean dark:text-arkova-steel">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile vertical connector line */}
          <div className="md:hidden absolute left-[21px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-arkova-steel/30 via-arkova-ocean/20 to-transparent pointer-events-none" style={{ display: 'none' }} />
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-arkova-charcoal dark:bg-black/40 px-6 py-20">
        <div className="absolute inset-0 bg-mesh-dark" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Want to shape what we build next?</h2>
          <p className="mb-8 text-base text-arkova-steel-light/70">We're actively partnering with universities, enterprises, and agent developers for our first deployments.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="mailto:hello@arkova.ai" className="group flex items-center gap-2 rounded-xl bg-arkova-steel px-8 py-3.5 text-sm font-semibold text-white shadow-glow-md transition-all hover:bg-arkova-deep hover:shadow-glow-lg">
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link to="/whitepaper" className="rounded-xl border border-white/10 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-arkova-steel/30 hover:bg-white/5">
              Read the Whitepaper
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
