import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  FileCheck,
  Lock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  Building2,
  GraduationCap,
  FileText,
  Award,
  Zap,
  Eye,
  Download,
  Users,
  Clock,
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
} from 'lucide-react';
import { Section } from '../components/Section';

/* ─── Data ─── */
const FEATURES = [
  { icon: Shield, title: 'Privacy-First', description: 'Your files never leave your device. We fingerprint locally and anchor the proof — not the document.' },
  { icon: Eye, title: 'Public Verification', description: 'Anyone can verify a credential via a shareable link or QR code — no account needed.' },
  { icon: Download, title: 'Proof Certificates', description: 'Download PDF proof packages with complete audit trails for compliance and legal use.' },
  { icon: Zap, title: 'Bulk Processing', description: 'Upload CSV files to anchor hundreds of credentials in a single batch operation.' },
  { icon: Users, title: 'Organization Tools', description: 'Manage team members, credential templates, and organization-wide records from one dashboard.' },
  { icon: Clock, title: 'Network-Anchored Timestamps', description: 'Every record is anchored to a public network with a cryptographic timestamp that cannot be altered.' },
];

const USE_CASES = [
  { icon: GraduationCap, title: 'Education', description: 'Degrees, transcripts, and academic certifications that anyone can verify instantly.' },
  { icon: Building2, title: 'Organizations', description: 'Professional licenses, compliance certificates, and institutional credentials.' },
  { icon: FileText, title: 'Legal & IP', description: 'Contracts, patents, and intellectual property records with provable timestamps.' },
  { icon: Award, title: 'Professionals', description: 'Certifications, training records, and portfolio verification for career advancement.' },
];

const STEPS = [
  { step: '01', icon: Fingerprint, title: 'Upload & Fingerprint', description: 'Select your document. Arkova generates a unique cryptographic fingerprint in your browser. The file never leaves your device.' },
  { step: '02', icon: Lock, title: 'Anchor to Network', description: 'Your fingerprint is permanently anchored to a public network. This creates an immutable timestamp — verifiable by anyone, forever.' },
  { step: '03', icon: CheckCircle2, title: 'Verify Anytime', description: 'Share a verification link or QR code. Anyone can independently confirm the authenticity — no account required.' },
];

const API_FEATURES = [
  { icon: Code2, title: 'Verification API', description: 'Single-call verification lookup by public ID. Returns status, issuer, timestamps, and network receipt.' },
  { icon: Layers, title: 'Batch Verification', description: 'Verify up to 100 credentials in a single API call. Ideal for background checks and compliance audits.' },
  { icon: Key, title: 'API Key Management', description: 'Create, rotate, and revoke API keys with granular scopes. HMAC-SHA256 secured. Full audit trail.' },
  { icon: BarChart3, title: 'Usage Analytics', description: 'Real-time dashboards for API consumption, rate limit status, and verification volume.' },
  { icon: Webhook, title: 'Webhooks & Events', description: 'Real-time notifications when credentials are anchored, verified, or revoked. HMAC-signed payloads.' },
];

const FAQ = [
  { q: 'How does Arkova verify documents without seeing them?', a: 'Arkova uses cryptographic fingerprinting (SHA-256) that runs entirely in your browser. We only store the fingerprint — a one-way mathematical proof — never the document itself. This fingerprint is then anchored to a public network, creating a permanent, independently verifiable record.' },
  { q: 'Can anyone verify a credential?', a: "Yes. Verification is completely open. Anyone with a verification link or QR code can confirm a document's authenticity and timestamp independently. No account or software required." },
  { q: 'What types of documents can I anchor?', a: 'Any digital file — PDFs, images, spreadsheets, presentations, contracts, certificates, transcripts. If it has a file, it can be fingerprinted and anchored.' },
  { q: 'How is this different from DocuSign or other e-signature tools?', a: "E-signature tools prove who signed a document. Arkova proves that a specific document existed at a specific time and has not been altered since. These are complementary — you can anchor a signed document to prove it hasn't changed after signing." },
  { q: 'Can I integrate Arkova into my existing systems?', a: 'Absolutely. Our Verification API lets you verify credentials programmatically with a single API call. Batch endpoints support up to 100 verifications per request. Webhook notifications provide real-time events.' },
  { q: 'Is my data safe?', a: "Your documents never leave your device — that's our foundational privacy guarantee, not just a feature. Fingerprints are anchored to a public, independently verifiable network. Even if our servers were compromised, your documents remain private because we never had them." },
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
                <Lock className="h-3.5 w-3.5" />
                Provable Verification
              </div>

              <h1 className="mb-6 text-5xl font-bold tracking-tight text-white opacity-0 animate-fade-up md:text-7xl" style={{ animationDelay: '0.2s' }}>
                Issue Once.
                <br />
                <span className="bg-gradient-to-r from-cyber-cyan to-cyber-teal bg-clip-text text-transparent">
                  Verify Forever.
                </span>
              </h1>

              <p className="mb-10 max-w-lg text-lg text-white/40 opacity-0 animate-fade-up md:text-xl" style={{ animationDelay: '0.35s' }}>
                Every record an agent touches needs to be independently verifiable, tamper-proof, and portable.
                Arkova is the verification layer — using AI and cryptographic anchoring to make that possible.
              </p>

              <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-up sm:flex-row lg:justify-start" style={{ animationDelay: '0.5s' }}>
                <button onClick={() => scrollTo('early-access')} className="group flex items-center gap-2 cyber-btn">
                  Request Early Access
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => scrollTo('how-it-works')} className="rounded-sm border border-cyber-cyan-border px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5 hover:shadow-glow-sm">
                  See How It Works
                </button>
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
              { value: 'Zero', label: 'Document Exposure' },
              { value: '100%', label: 'Independently Verifiable' },
              { value: 'SHA-256', label: 'Client-Side Fingerprinting' },
              { value: 'No', label: 'Account Required to Verify' },
            ].map((stat) => (
              <CyberCard key={stat.label} hover={false} className="px-6 py-5 text-center">
                <div className="font-mono text-xl font-bold text-cyber-cyan md:text-2xl">{stat.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/25">{stat.label}</div>
              </CyberCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AGENTIC VERIFICATION ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">The Future of Records</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Infrastructure for Agentic Verification</h2>
            <p className="mx-auto max-w-2xl text-white/35">
              As AI agents become participants in credentialing, hiring, and compliance workflows, the records they rely on need to be machine-verifiable, tamper-proof, and independently auditable.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Zap, title: 'Agent Micropayments', description: 'AI agents autonomously pay per verification via the x402 protocol — machine-to-machine payments with zero human intervention. Compliance at machine speed.' },
              { icon: Globe, title: 'Global Regulatory Coverage', description: 'SEC filings, patents, regulations, and academic papers — cryptographically anchored and searchable. Expanding across jurisdictions worldwide.' },
              { icon: Layers, title: 'Compliance Intelligence', description: 'AI-powered regulatory analysis built on cryptographically verified data. Every insight traces back to an anchored, tamper-proof source.' },
            ].map((item) => (
              <CyberCard key={item.title} className="p-8">
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

      {/* ═══ AI INTELLIGENCE ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">AI-Powered</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Intelligent credential processing</h2>
            <p className="mx-auto max-w-2xl text-white/35">
              AI extracts metadata, classifies credential types, and detects anomalies — all while keeping your documents private on your device.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Sparkles, title: 'Metadata Extraction', description: "Automatically identify credential types, issuers, dates, and key fields. AI reads the document so you don't have to." },
              { icon: ScanSearch, title: 'Anomaly Detection', description: 'Flags inconsistencies, expired credentials, and potential issues before they become problems.' },
              { icon: Brain, title: 'Smart Classification', description: 'Categorize credentials by type — degrees, licenses, certifications, contracts — and organize records intelligently.' },
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

      {/* ═══ VERIFICATION API ═══ */}
      <Section id="api" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">Verification API</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Integrate verification into anything</h2>
            <p className="mx-auto max-w-2xl text-white/35">
              Verify credentials programmatically. Background checks, compliance audits, hiring workflows — verify at scale with a single API call.
            </p>
          </div>
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
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Three steps to permanent proof</h2>
            <p className="mx-auto max-w-xl text-white/35">Create a permanent, independently verifiable record of any document in seconds.</p>
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
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Built for every industry that needs proof</h2>
            <p className="mx-auto max-w-2xl text-white/35">From universities issuing degrees to law firms timestamping contracts.</p>
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
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Everything you need to prove authenticity</h2>
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
              { name: 'Carson', title: 'Founder & CEO', bio: 'A decade of rescuing distressed technical programs under regulatory pressure showed Carson that organizations need proof infrastructure that doesn\'t depend on any single vendor.', photo: '/team-carson.png', profileUrl: 'https://www.linkedin.com/in/carson-s-8b41061a/', profileType: 'linkedin' as const },
              { name: 'Sarah', title: 'Founder & COO', bio: 'Over 20 years launching products through compliance-heavy supply chains taught Sarah one thing: documentation verification is broken at every level.', photo: '/team-sarah.png', profileUrl: 'https://www.linkedin.com/in/sljrushton/', profileType: 'linkedin' as const },
              { name: 'Yaacov', title: 'Founder & Advisor', bio: '20 years Research & Data Science experience. Senior Member of the National Academy of Inventors.', photo: '/team-yaacov.png', profileUrl: 'https://scholar.google.com/citations?user=MUGWLDoAAAAJ&hl=en', profileType: 'scholar' as const },
            ].map((member) => (
              <CyberCard key={member.name} className="p-6 text-center">
                <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border border-cyber-cyan/20">
                  <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
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
              Built from the ground up so documents never leave your device. Fingerprinting happens in your browser. We anchor the fingerprint — never the file.
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
              <div key={i} className="overflow-hidden rounded-sm border border-cyber-cyan-border bg-cyber-bg-card/40">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left">
                  <span className="pr-4 font-semibold text-white">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-cyber-cyan transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-cyber-cyan-border px-6 py-5">
                    <p className="text-sm leading-relaxed text-white/35">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ EARLY ACCESS CTA ═══ */}
      <section id="early-access" className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Be first to verify what matters</h2>
          <p className="mb-10 text-lg text-white/35">Join the waitlist for early access. We'll notify you when Arkova is ready.</p>
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
    </div>
  );
}
