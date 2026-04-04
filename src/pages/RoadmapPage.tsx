/**
 * Roadmap Page — Cyber-noir vertical timeline matching Stitch v1_4 design.
 * Glowing phase indicators with neon bars.
 */

import { ArrowRight, CheckCircle2, Clock, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BreadcrumbJsonLd } from '../components/BreadcrumbJsonLd';

const PHASES = [
  {
    number: 'I',
    title: 'Foundation',
    subtitle: 'API + Data Pipeline + Global Coverage',
    timeline: '2025–2026',
    status: 'In Progress' as const,
    description: 'Production-ready verification API with x402 micropayments and a global data ingestion pipeline anchoring regulatory documents from multiple jurisdictions.',
    items: [
      'Public REST API with x402 agent micropayment integration',
      'Global regulatory data ingestion pipeline',
      'Client-side SHA-256 fingerprinting — documents never leave your device',
      'MCP server for AI agent integration',
      'Organization management, credential templates, and bulk upload',
      'Developer documentation and API playground',
      'Multi-jurisdiction regulatory document anchoring',
    ],
    compliance: ['SOX', 'ESIGN', 'UETA', 'FERPA', 'GDPR'],
    bars: 1,
  },
  {
    number: 'II',
    title: 'Scale',
    subtitle: 'Compliance Intelligence',
    timeline: '2026–2027',
    status: 'Planned' as const,
    description: 'Scale verification infrastructure across jurisdictions and introduce compliance intelligence capabilities.',
    items: [
      'Multi-jurisdiction regulatory intelligence',
      'Compliance-as-a-service for automated checks',
      'Agent identity verification and compliance certificates',
      'Real-time regulatory change detection',
      'Enterprise compliance dashboards',
    ],
    compliance: ['SOC 2 Type I', 'EU AI Act', 'GDPR'],
    bars: 2,
  },
  {
    number: 'III',
    title: 'Dominance',
    subtitle: 'Enterprise Compliance Platform',
    timeline: '2027–2028',
    status: 'Future' as const,
    description: 'Enterprise-grade compliance infrastructure with autonomous monitoring, e-signatures, and global jurisdiction coverage.',
    items: [
      'Autonomous compliance monitoring and remediation',
      'E-signatures with jurisdiction-specific legal recognition',
      'Global coverage across 30+ jurisdictions',
      'Platform licensing for compliance product builders',
      'Continuous cryptographic audit trails',
    ],
    compliance: ['SOC 2 Type II', 'eIDAS', 'ETSI EN 319', 'GDPR'],
    bars: 3,
  },
];

const STATUS_CONFIG = {
  'In Progress': { color: 'text-cyber-cyan', bg: 'bg-cyber-cyan/15 border-cyber-cyan/30', icon: Clock },
  Planned: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: Circle },
  Future: { color: 'text-white/40', bg: 'bg-white/5 border-white/10', icon: Circle },
};

export default function RoadmapPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Roadmap', url: 'https://arkova.ai/roadmap' }]} />
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,212,255,0.06)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Product Roadmap
          </p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-white opacity-0 animate-fade-up md:text-5xl" style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-teal bg-clip-text text-transparent">
              Arkova Roadmap
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/40 opacity-0 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            From credential verification to institutional attestations to legally recognized e-signatures — a phased approach to trustless compliance infrastructure.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ VERTICAL TIMELINE ═══ */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Timeline with glowing connector */}
          <div className="relative">
            {/* Vertical glowing line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/40 via-cyber-cyan/20 to-transparent md:left-1/2 md:-translate-x-px" />

            <div className="space-y-16">
              {PHASES.map((phase, i) => {
                const config = STATUS_CONFIG[phase.status];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={phase.number}
                    className="relative opacity-0 animate-fade-up"
                    style={{ animationDelay: `${0.1 + i * 0.2}s` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 -translate-x-1/2 top-0 md:left-1/2">
                      <div className="h-4 w-4 rounded-full bg-cyber-cyan shadow-glow-md ring-4 ring-cyber-bg" />
                    </div>

                    {/* Card — alternates left/right on desktop */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      <div className="rounded-sm border border-cyber-cyan-border bg-cyber-bg-card/60 p-8 transition-all hover:border-cyber-cyan/40 hover:shadow-neon">

                        {/* Glowing phase bars (matching v1_4 design) */}
                        <div className="mb-6 flex gap-2">
                          {Array.from({ length: phase.bars }).map((_, j) => (
                            <div key={j} className="h-16 w-5 timeline-glow-bar" />
                          ))}
                        </div>

                        {/* Status badge */}
                        <div className="mb-4 flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.bg} ${config.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {phase.status === 'In Progress' ? 'COMPLETED' : phase.status === 'Planned' ? 'IN PROGRESS' : 'UPCOMING'}
                          </span>
                          <span className="text-xs font-mono text-white/25">{phase.timeline}</span>
                        </div>

                        {/* Title */}
                        <h2 className="mb-1 text-2xl font-bold text-white">{phase.title}</h2>
                        <p className="mb-2 text-sm font-medium text-cyber-cyan">{phase.subtitle}</p>
                        <p className="mb-6 text-sm leading-relaxed text-white/35">{phase.description}</p>

                        {/* Items */}
                        <ul className="mb-6 space-y-2">
                          {phase.items.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-white/40">
                              <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${phase.status === 'In Progress' ? 'text-cyber-cyan' : 'text-white/15'}`} />
                              {item}
                            </li>
                          ))}
                        </ul>

                        {/* Compliance badges */}
                        <div className="flex flex-wrap gap-2">
                          {phase.compliance.map((badge) => (
                            <span key={badge} className="rounded-full bg-cyber-cyan/5 border border-cyber-cyan/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyber-cyan/60">
                              {badge}
                            </span>
                          ))}
                        </div>

                        <p className="mt-4 text-xs text-white/20">Tag: {phase.status === 'In Progress' ? 'completed' : phase.status === 'Planned' ? 'in progress' : 'upcoming'}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Want to shape what we build next?</h2>
          <p className="mb-8 text-base text-white/35">We're actively partnering with universities, enterprises, and agent developers for our first deployments.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/contact" className="group flex items-center gap-2 cyber-btn">
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/whitepaper" className="rounded-sm border border-cyber-cyan-border px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5 hover:shadow-glow-sm">
              Read the Whitepaper
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
