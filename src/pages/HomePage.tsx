import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  FileCheck,
  Lock,
  ArrowRight,
  GraduationCap,
  FileText,
  Download,
  ChevronDown,
  Code2,
  Layers,
  Key,
  BarChart3,
  Webhook,
  Sparkles,
  Brain,
  ScanSearch,
  Linkedin,
  UserCheck,
  ShieldCheck,
  Gauge,
  Bell,
  ListChecks,
  Globe,
} from 'lucide-react';
import { Section } from '../components/Section';

/* ─── Data ─── */
const FEATURES = [
  { icon: Gauge, title: 'Compliance Scorecard', description: 'A per-jurisdiction score, a gauge, and a prioritized gap list. Your posture across every regime you operate in, on one page.' },
  { icon: ListChecks, title: 'Gap Detection', description: 'Four categories, severity-ranked: MISSING, EXPIRED, EXPIRING_SOON, INSUFFICIENT. Know exactly what would fail an audit today.' },
  { icon: Sparkles, title: 'Prioritized Remediation', description: 'Recommendations scored by severity × penalty-risk ÷ effort. Quick wins, critical fixes, and upcoming deadlines — never "here are 200 findings, good luck."' },
  { icon: Bell, title: 'Regulatory Change Alerts', description: 'Rules move. We watch. Get in-app and email alerts the moment a regulation changes in a jurisdiction where you operate.' },
  { icon: Download, title: 'Audit-Ready PDF Export', description: 'Export a US-Letter compliance report — gauge, per-jurisdiction bars, gaps, recommendations, evidence — for your auditor, board, or regulator.' },
  { icon: Lock, title: 'Privacy-First Architecture', description: 'Documents never leave your device. We fingerprint locally and anchor the proof, not the file. Evidence auditors can independently verify.' },
];

const USE_CASES = [
  { icon: ShieldCheck, title: 'Compliance & Internal Audit', description: 'GRC, CISO, and internal audit teams collapse 3-week audit cycles into hours. Evidence compiles itself, gaps are pre-prioritized, and the PDF is ready for the auditor.' },
  { icon: Globe, title: 'Multi-Jurisdiction Operators', description: 'Operate across the US, EU, UK, LATAM, APAC, or Africa? One platform covers FERPA, HIPAA, FCRA, SOX, GDPR, Kenya DPA, APP, PIPEDA, PDPA, APPI, DPDP, POPIA, NDPR, and more.' },
  { icon: FileText, title: 'Legal, Discovery & Proof of Record', description: 'Law firms, patent holders, and contract parties timestamp and verify documents with cryptographic proof that survives vendor churn and system migrations.' },
  { icon: UserCheck, title: 'Background Checks & Talent', description: 'Staffing and HR teams verify credentials programmatically. One API call, instant result — no phone tag with registrar offices.' },
];

const STEPS = [
  { step: '01', icon: ScanSearch, title: 'Connect Your Records', description: 'Upload evidence or connect your existing systems. Fingerprints are generated locally — your documents never leave your device.' },
  { step: '02', icon: Gauge, title: 'Get Your Scorecard', description: 'Arkova maps your evidence to 100+ jurisdiction rules across 14 regulatory frameworks. A score, a gauge, and a prioritized gap list in minutes.' },
  { step: '03', icon: Download, title: 'Export & Remediate', description: 'Download an audit-ready PDF. Work the prioritized recommendations. Subscribe to regulatory-change alerts so you never find out about a rule shift from your auditor.' },
];

const JURISDICTIONS = [
  'FERPA', 'HIPAA', 'FCRA', 'SOX', 'GLBA', 'ADA',
  'GDPR', 'UK GDPR', 'Kenya DPA', 'Australia APP',
  'PIPEDA (Canada)', 'PDPA (Singapore)', 'APPI (Japan)', 'DPDP (India)',
  'POPIA (South Africa)', 'NDPR (Nigeria)', 'Law 1581 (Colombia)', 'PDPA (Thailand)',
];

const API_FEATURES = [
  { icon: Code2, title: 'Audit API', description: 'Kick off an organization audit or fetch the latest scorecard with a single call. Per-jurisdiction scores, gaps, and recommendations — structured JSON.' },
  { icon: Layers, title: 'Batch Verification', description: 'Verify up to 100 records in a single call. Ideal for background checks, evidence runs, and discovery.' },
  { icon: Key, title: 'API Key Management', description: 'Create, rotate, and revoke API keys with granular scopes. HMAC-SHA256 secured. Full audit trail of every key action.' },
  { icon: BarChart3, title: 'Usage Analytics', description: 'Real-time dashboards for API consumption, rate-limit status, and audit volume.' },
  { icon: Webhook, title: 'Regulatory-Change Webhooks', description: 'Subscribe to rule changes in the jurisdictions you operate in. HMAC-signed payloads the moment a regulation shifts.' },
];

const FAQ = [
  { q: 'How much faster is an audit with Arkova vs. the manual process?', a: 'Typical compliance audits take weeks: compiling evidence across 10+ tools, mapping it to controls, and producing a report. Arkova maps your evidence to 100+ rules across 14 frameworks automatically, scores your posture per jurisdiction, ranks gaps by severity and penalty risk, and exports an audit-ready PDF. Weeks become hours. You still review; you just stop doing the compilation yourself.' },
  { q: 'Which regulations does Arkova cover today?', a: 'US federal (FERPA, HIPAA, SOX, FCRA, GLBA, ADA, FLSA, GINA), EU/UK GDPR, Kenya DPA, Australia APP, Canada PIPEDA, Singapore PDPA, Japan APPI, India DPDP, South Africa POPIA, Nigeria NDPR, Colombia Law 1581, Thailand PDPA, and Malaysia PDPA. 100+ jurisdiction rules across 14 regulatory frameworks, with new regimes added continuously. If you operate in a jurisdiction we do not yet cover, tell us — we prioritize by customer operating footprint.' },
  { q: 'What does the scorecard actually show me?', a: 'A per-jurisdiction score (0–100) with a gauge, a gap list categorized as MISSING / EXPIRED / EXPIRING_SOON / INSUFFICIENT, a prioritized remediation plan scored by severity × penalty risk ÷ effort, a regulatory-change timeline, and an audit-ready PDF export. Built for your GRC lead, CISO, internal audit, or outside counsel.' },
  { q: 'How does regulatory-change monitoring work?', a: 'Our cron pipeline watches the jurisdictions you subscribe to. When a rule changes, we compute the impact on your posture (NONE / INFO / IN_APP / EMAIL severity) and send you an in-app notification or email. You never find out about a rule change from your auditor again.' },
  { q: 'Is this proof auditor-grade? Will it hold up to SOC 2 / ISO / regulator review?', a: 'The evidence chain is cryptographic and independently verifiable: every anchor is a SHA-256 fingerprint committed to a public network, lifecycle events are in an append-only audit log, and every PDF export carries the cryptographic receipts auditors need. Our own SOC 2 Type II and ISO work is in progress — we document what is asserted and what is not, so auditors can make their own determination.' },
  { q: 'Is my data safe? Do you see our documents?', a: 'No. Your documents never leave your device. That is our foundational privacy guarantee, not a feature. Fingerprints are anchored to a public, independently verifiable network; only PII-stripped metadata flows to our servers. Even if our systems were breached, your documents remain private because we never had them.' },
  { q: 'Can I integrate Arkova into my GRC / ticketing / SIEM stack?', a: "Yes. The Audit API, batch verification endpoints, and regulatory-change webhooks are designed to plug into existing GRC platforms, ticketing (Jira, ServiceNow), ATS/HRIS, and background-screening workflows. HMAC-signed payloads, rate-limited, with a full audit trail of every call." },
];

/* ─── Scroll Observer ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const el = ref.current;
    if (el) el.querySelectorAll('.animate-in-view').forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Cyber Card Component ─── */
function CyberCard({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`border border-cyber-cyan-border bg-cyber-bg-card/60 backdrop-blur-sm ${hover ? 'transition-all duration-300 hover:border-cyber-cyan/40 hover:shadow-neon hover:-translate-y-0.5' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Component ─── */
export default function HomePage() {
  const pageRef = useScrollReveal();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={pageRef}>
      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative overflow-hidden px-6 pb-20 pt-28 md:pt-36 lg:pt-44">
        {/* Circuit board background */}
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,212,255,0.08)_0%,transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(0,100,180,0.05)_0%,transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-1.5 text-sm font-medium text-cyber-cyan opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <Gauge className="h-3.5 w-3.5" />
                Compliance Audit Automation
              </div>

              <h1 className="mb-6 text-5xl font-bold tracking-tight text-white opacity-0 animate-fade-up md:text-7xl" style={{ animationDelay: '0.2s' }}>
                Audits in hours,
                <br />
                <span className="bg-gradient-to-r from-cyber-cyan to-cyber-teal bg-clip-text text-transparent">
                  not weeks.
                </span>
              </h1>

              <p className="mb-6 max-w-lg text-lg text-white/40 opacity-0 animate-fade-up md:text-xl" style={{ animationDelay: '0.35s' }}>
                Arkova maps your evidence to 100+ rules across 14 regulatory frameworks, scores your posture per jurisdiction, and ranks gaps by severity and penalty risk — so your next audit takes hours, not weeks.
              </p>

              <p className="mb-10 max-w-lg text-sm text-white/25 opacity-0 animate-fade-up leading-relaxed" style={{ animationDelay: '0.45s' }}>
                A compliance audit platform built on privacy-first, cryptographically-anchored evidence. Fingerprinting happens in your browser — documents never leave your device. Every control check is independently verifiable. Export an audit-ready PDF, subscribe to regulatory-change alerts, and retire the quarterly fire drill.
              </p>

              <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-up sm:flex-row lg:justify-start" style={{ animationDelay: '0.5s' }}>
                <button onClick={() => scrollTo('early-access')} className="group flex items-center gap-2 cyber-btn">
                  Request Early Access
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="https://app.arkova.ai/compliance/scorecard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-cyber-cyan-border px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5 hover:shadow-glow-sm"
                >
                  See Your Compliance Score
                </a>
              </div>
            </div>

            {/* Hero Visual — Shield with neon glow */}
            <div className="hidden lg:flex items-center justify-center opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyber-cyan/10 blur-[80px]" />
                <div className="relative h-80 w-80 rounded-sm border border-cyber-cyan-border bg-gradient-to-br from-cyber-cyan/[0.06] to-transparent backdrop-blur-sm flex items-center justify-center animate-glow-pulse">
                  <div className="h-48 w-48 rounded-sm border border-cyber-cyan/20 bg-gradient-to-br from-cyber-cyan/10 to-transparent flex items-center justify-center rotate-12">
                    <Shield className="h-20 w-20 text-cyber-cyan/40" />
                  </div>
                  {/* Floating dots with glow */}
                  <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-cyber-cyan/30 animate-float shadow-glow-sm" />
                  <div className="absolute -bottom-4 -left-4 h-4 w-4 rounded-full bg-cyber-cyan/20 animate-float-delayed shadow-glow-sm" />
                  <div className="absolute top-1/2 -right-6 h-3 w-3 rounded-full bg-cyber-cyan/15 animate-float" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar — stats strip (matching v1_3 2x2 grid) */}
        <div className="relative mx-auto mt-20 max-w-4xl opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: '14', label: 'Regulatory Frameworks' },
              { value: '100+', label: 'Jurisdiction Rules' },
              { value: 'Hours', label: 'Audit Cycle, Not Weeks' },
              { value: 'Zero', label: 'Document Exposure' },
            ].map((stat) => (
              <CyberCard key={stat.label} hover={false} className="px-6 py-5 text-center">
                <div className="font-mono text-xl font-bold text-cyber-cyan md:text-2xl">{stat.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/25">{stat.label}</div>
              </CyberCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AUDIT MY ORGANIZATION (Primary Pillar) ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Audit My Organization</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Your compliance posture, end-to-end, in one click</h2>
            <p className="mx-auto max-w-2xl text-white/35">
              Stop chasing evidence across 10 tools. Arkova maps what you already have to the regulations you actually operate under, flags the gaps that would fail an audit today, and tells you what to fix first. Read our <Link to="/research" className="text-cyber-cyan hover:text-white transition-colors underline underline-offset-2">research</Link> on audit automation.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Gauge, title: 'Per-Jurisdiction Scoring', description: '0–100 posture score per regime. A gauge, per-jurisdiction bars, and the exact controls behind every number.' },
              { icon: ListChecks, title: 'Gap Detection', description: 'MISSING · EXPIRED · EXPIRING_SOON · INSUFFICIENT. Severity-ranked so the things that would fail today are at the top.' },
              { icon: Sparkles, title: 'Prioritized Remediation', description: 'Recommendations scored by severity × penalty risk ÷ effort. Quick wins, critical fixes, and upcoming deadlines.' },
              { icon: Bell, title: 'Regulatory-Change Alerts', description: 'We watch the jurisdictions you operate in. In-app and email alerts the moment a rule changes.' },
            ].map((item) => (
              <CyberCard key={item.title} className="p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-cyber-cyan/10 border border-cyber-cyan/20">
                  <item.icon className="h-6 w-6 text-cyber-cyan" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/35">{item.description}</p>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ JURISDICTIONS STRIP ═══ */}
      <Section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Coverage</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">14 regulatory frameworks. 100+ rules. One platform.</h2>
            <p className="mx-auto max-w-2xl text-white/35">Operate in one jurisdiction or eighteen — the scorecard, gap list, and evidence chain look the same. No separate vendor per regime.</p>
          </div>
          <CyberCard hover={false} className="p-6 md:p-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {JURISDICTIONS.map((j) => (
                <div
                  key={j}
                  className="rounded-sm border border-cyber-cyan/15 bg-cyber-cyan/[0.03] px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-cyber-cyan/70"
                >
                  {j}
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-white/30">Plus: FLSA · GINA · Cyber Essentials (UK) · SOC 2 evidence mapping · more added continuously.</p>
          </CyberCard>
        </div>
      </Section>

      {/* ═══ TRACTION / SOCIAL PROOF ═══ */}
      <Section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Platform Traction</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Built on production-grade evidence</h2>
            <p className="mx-auto max-w-2xl text-white/35">
              A compliance audit platform is only as good as the evidence chain underneath it. Ours is already in production, at scale.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { value: '1.4M+', label: 'Cryptographically Anchored Records' },
              { value: '100+', label: 'Jurisdiction Rules Encoded' },
              { value: '14', label: 'Regulatory Frameworks' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <CyberCard key={stat.label} hover={false} className="p-6 text-center md:p-8">
                <div className="font-mono text-2xl font-bold text-cyber-cyan md:text-3xl lg:text-4xl">{stat.value}</div>
                <div className="mt-2 text-xs font-medium uppercase tracking-wider text-white/30 md:text-sm">{stat.label}</div>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ AI INTELLIGENCE ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">AI-Powered</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Evidence mapping, not evidence manual-labor</h2>
            <p className="mx-auto max-w-2xl text-white/35">
              Our extraction and intelligence models read your records, map them to the right controls, flag what is missing or stale, and draft remediation — while documents stay private on your device.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Sparkles, title: 'Evidence Extraction', description: "Identify record types, issuers, dates, and key fields automatically — across 20+ credential categories. Your evidence inventory builds itself." },
              { icon: ScanSearch, title: 'Gap & Anomaly Detection', description: 'Flag expired, inconsistent, and insufficient evidence before your auditor finds it. Four-category severity so you know what to fix first.' },
              { icon: Brain, title: 'Compliance Intelligence', description: 'Retrieval-augmented reasoning over FCRA, HIPAA, FERPA, and expanding regimes. Answers that cite the statute or case behind every claim.' },
            ].map((item) => (
              <CyberCard key={item.title} className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-cyber-cyan/10 border border-cyber-cyan/20">
                  <item.icon className="h-7 w-7 text-cyber-cyan" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/35">{item.description}</p>
              </CyberCard>
            ))}
          </div>
          {/* Privacy callout */}
          <CyberCard hover={false} className="mt-10 p-8 text-center md:p-10 border-cyber-cyan/10">
            <p className="text-white/40">
              <span className="font-semibold text-white">Privacy preserved.</span>{' '}
              Documents are fingerprinted in your browser using the Web Crypto API. Only PII-stripped metadata flows to our servers. The original document and personal information remain on your device.
            </p>
          </CyberCard>
        </div>
      </Section>

      {/* ═══ AUDIT API ═══ */}
      <Section id="api" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Audit API</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Plug compliance into your existing stack</h2>
            <p className="mx-auto max-w-2xl text-white/35">
              Trigger an organization audit, pull the latest scorecard, subscribe to regulatory-change events, and verify individual records — all from the same API. GRC, ticketing, SIEM, HRIS. See the <Link to="/roadmap" className="text-cyber-cyan hover:text-white transition-colors underline underline-offset-2">product roadmap</Link> for what's coming.
            </p>
          </div>
          <CyberCard hover={false} className="mb-8 p-6 border-cyber-cyan/15">
            <p className="text-sm leading-relaxed text-white/40">
              <span className="font-semibold text-white">Weeks of audit prep, one endpoint.</span>{' '}
              A compliance team calls <code className="rounded bg-cyber-cyan/10 px-1.5 py-0.5 font-mono text-xs text-cyber-cyan">POST /api/v1/compliance/audit</code> and gets a per-jurisdiction scorecard, severity-ranked gaps, prioritized recommendations, and a signed audit-ready PDF.
            </p>
          </CyberCard>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {API_FEATURES.map((feature) => (
              <CyberCard key={feature.title} className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-cyber-cyan/10 border border-cyber-cyan/20">
                  <feature.icon className="h-5 w-5 text-cyber-cyan" />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/35">{feature.description}</p>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section id="how-it-works" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">How It Works</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Three steps to a shippable audit</h2>
            <p className="mx-auto max-w-xl text-white/35">Get to a per-jurisdiction scorecard and audit-ready PDF in minutes — not a quarter-long reporting cycle.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((item, i) => (
              <CyberCard key={item.step} className={`animate-in-view stagger-${i + 1} p-8`}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-cyber-cyan/10 border border-cyber-cyan/20">
                  <item.icon className="h-7 w-7 text-cyber-cyan" />
                </div>
                <div className="mb-3 font-mono text-xs font-medium text-cyber-cyan/50">STEP {item.step}</div>
                <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/35">{item.description}</p>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section id="use-cases" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Who It's For</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Built for the teams that own compliance</h2>
            <p className="mx-auto max-w-2xl text-white/35">From GRC leads closing the quarter to multi-jurisdiction operators managing 14 regimes at once.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((uc) => (
              <CyberCard key={uc.title} className="p-6 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-sm bg-cyber-cyan/10 border border-cyber-cyan/20">
                  <uc.icon className="h-7 w-7 text-cyber-cyan" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{uc.title}</h3>
                <p className="text-sm text-white/35">{uc.description}</p>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="features" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Features</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Everything you need to close an audit</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <CyberCard key={feature.title} className={`animate-in-view stagger-${i + 1} p-6`}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-cyber-cyan/10 border border-cyber-cyan/20">
                  <feature.icon className="h-5 w-5 text-cyber-cyan" />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/35">{feature.description}</p>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ TEAM ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Team</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Built by people who understand trust</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Carson', title: 'Founder & CEO', bio: '10+ years in technical product and program management across regulated industries. Built Arkova to give organizations verification infrastructure that outlasts any single vendor.', photo: '/team-carson.png', profileUrl: 'https://www.linkedin.com/in/carson-s-8b41061a/', profileType: 'linkedin' as const },
              { name: 'Sarah', title: 'Founder & COO', bio: 'Over 20 years launching products through compliance-heavy supply chains taught Sarah one thing: documentation verification is broken at every level.', photo: '/team-sarah.png', profileUrl: 'https://www.linkedin.com/in/sljrushton/', profileType: 'linkedin' as const },
              { name: 'Yaacov', title: 'Founder & Advisor', bio: '20 years Research & Data Science experience. Senior Member of the National Academy of Inventors.', photo: '/team-yaacov.png', profileUrl: 'https://scholar.google.com/citations?user=MUGWLDoAAAAJ&hl=en', profileType: 'scholar' as const },
            ].map((member) => (
              <CyberCard key={member.name} className="p-6 text-center">
                <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border border-cyber-cyan/20">
                  <img src={member.photo} alt={`${member.name}, ${member.title} at Arkova`} width={112} height={112} className="h-full w-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-cyber-cyan">{member.title}</p>
                <p className="text-sm leading-relaxed text-white/35">{member.bio}</p>
                <a
                  href={member.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyber-cyan transition-colors hover:text-white"
                >
                  {member.profileType === 'linkedin' ? <Linkedin className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                  {member.profileType === 'linkedin' ? 'LinkedIn' : 'Google Scholar'}
                </a>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PRIVACY / SECURITY / INTEGRITY ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <CyberCard hover={false} className="p-10 text-center md:p-16 border-cyber-cyan/15 animate-glow-pulse">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Your privacy is our architecture</h2>
            <p className="mx-auto mb-10 max-w-2xl text-white/35">
              Built from the ground up so documents never leave your device. Fingerprinting happens in your browser. We anchor the fingerprint — never the file. Learn more in our <Link to="/whitepaper" className="text-cyber-cyan hover:text-white transition-colors underline underline-offset-2">technical whitepaper</Link>.
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { label: 'Zero-knowledge architecture', value: 'Privacy', icon: Lock },
                { label: 'SHA-256 Web Crypto API', value: 'Security', icon: Shield },
                { label: 'Append-only audit trail', value: 'Integrity', icon: FileCheck },
              ].map(({ label, value, icon: Icon }) => (
                <div key={value} className="rounded-sm bg-cyber-cyan/[0.04] border border-cyber-cyan/[0.12] p-6">
                  <Icon className="mx-auto mb-3 h-7 w-7 text-cyber-cyan" />
                  <div className="text-xl font-bold text-cyber-cyan">{value}</div>
                  <div className="mt-1 text-sm text-white/25">{label}</div>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">FAQ</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Common questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <details key={i} className="group overflow-hidden rounded-sm border border-cyber-cyan-border bg-cyber-bg-card/40">
                <summary className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4 font-semibold text-white">{item.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-cyber-cyan transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-cyber-cyan-border px-6 py-5">
                  <p className="text-sm leading-relaxed text-white/35">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ EARLY ACCESS CTA ═══ */}
      <section id="early-access" className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Retire the quarterly audit fire drill</h2>
          <p className="mb-10 text-lg text-white/35">Join the waitlist. We'll notify you when it's your turn for a pilot. Have questions? <Link to="/contact" className="text-cyber-cyan hover:text-white transition-colors underline underline-offset-2">Contact us</Link>.</p>
          <form action="https://formspree.io/f/mpqynjnp" method="POST" className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="cyber-input flex-1"
            />
            <button type="submit" className="cyber-btn">
              Join Waitlist
            </button>
          </form>
          <p className="mt-4 text-xs text-white/15">No spam. We'll only email you when we launch.</p>
        </div>
      </section>

      {/* Last updated — visible for AI freshness signals */}
      <div className="px-6 pb-6 text-center">
        <p className="text-[10px] text-white/10 font-mono">Last updated: March 2026</p>
      </div>
    </div>
  );
}
