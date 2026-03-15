import { useState, useEffect } from 'react';
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
  Menu,
  X,
  ChevronDown,
  Linkedin,
  Twitter,
  Moon,
  Sun,
  Code2,
  Layers,
  Key,
  BarChart3,
  Webhook,
  Sparkles,
  Brain,
  ScanSearch,
} from 'lucide-react';
import { Section } from './components/Section';
import arkovaLogo from '/arkova-logo.png';

/* ─── Data ─── */
const FEATURES = [
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'Your files never leave your device. We fingerprint locally and anchor the proof — not the document.',
  },
  {
    icon: Eye,
    title: 'Public Verification',
    description: 'Anyone can verify a credential via a shareable link or QR code — no account needed.',
  },
  {
    icon: Download,
    title: 'Proof Certificates',
    description: 'Download PDF proof packages with complete audit trails for compliance and legal use.',
  },
  {
    icon: Zap,
    title: 'Bulk Processing',
    description: 'Upload CSV files to anchor hundreds of credentials in a single batch operation.',
  },
  {
    icon: Users,
    title: 'Organization Tools',
    description: 'Manage team members, credential templates, and organization-wide records from one dashboard.',
  },
  {
    icon: Clock,
    title: 'Immutable Timestamps',
    description: 'Every record is anchored with a cryptographic timestamp that cannot be altered or backdated.',
  },
];

const USE_CASES = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Degrees, transcripts, and academic certifications that anyone can verify instantly.',
    examples: ['Universities', 'Trade Schools', 'Bootcamps'],
  },
  {
    icon: Building2,
    title: 'Organizations',
    description: 'Professional licenses, compliance certificates, and institutional credentials.',
    examples: ['HR Departments', 'Compliance Teams', 'Registrars', 'Recruiters'],
  },
  {
    icon: FileText,
    title: 'Legal & IP',
    description: 'Contracts, patents, and intellectual property records with provable timestamps.',
    examples: ['Law Firms', 'Patent Offices', 'Notaries'],
  },
  {
    icon: Award,
    title: 'Professionals',
    description: 'Certifications, training records, and portfolio verification for career advancement.',
    examples: ['Freelancers', 'Consultants', 'Healthcare Workers'],
  },
];

const STEPS = [
  {
    step: '01',
    icon: Fingerprint,
    title: 'Upload & Fingerprint',
    description: 'Select your document. Arkova generates a unique cryptographic fingerprint in your browser. The file never leaves your device.',
  },
  {
    step: '02',
    icon: Lock,
    title: 'Anchor & Secure',
    description: 'Your fingerprint is permanently anchored to a public, tamper-proof network. This creates an immutable timestamp proving the document existed at that moment.',
  },
  {
    step: '03',
    icon: CheckCircle2,
    title: 'Verify Anytime',
    description: 'Share a verification link or QR code. Anyone can independently confirm the authenticity and timestamp of your document — no account required.',
  },
];

const API_FEATURES = [
  {
    icon: Code2,
    title: 'Verification API',
    description: 'Single-call verification lookup by public ID. Returns status, issuer, credential type, timestamps, and network receipt — all in one response.',
  },
  {
    icon: Layers,
    title: 'Batch Verification',
    description: 'Verify up to 100 credentials in a single API call. Ideal for background checks, compliance audits, and portfolio validation at scale.',
  },
  {
    icon: Key,
    title: 'API Key Management',
    description: 'Create, rotate, and revoke API keys with granular scopes. HMAC-SHA256 hashed storage. Full audit trail on every key lifecycle event.',
  },
  {
    icon: BarChart3,
    title: 'Usage Analytics',
    description: 'Real-time dashboards for API consumption, rate limit status, and verification volume. Track usage across keys and endpoints.',
  },
  {
    icon: Webhook,
    title: 'Webhooks & Events',
    description: 'Real-time notifications when credentials are anchored, verified, or revoked. HMAC-signed payloads with exponential retry backoff.',
  },
];

const FAQ = [
  {
    q: 'How does Arkova verify documents without seeing them?',
    a: 'Arkova uses cryptographic fingerprinting (SHA-256) that runs entirely in your browser. We only store the fingerprint — a one-way mathematical proof — never the document itself. This fingerprint is then anchored to a permanent public record.',
  },
  {
    q: 'Can anyone verify a credential?',
    a: "Yes. Verification is completely open. Anyone with a verification link or QR code can confirm a document's authenticity and timestamp independently. No account or software required.",
  },
  {
    q: 'What types of documents can I anchor?',
    a: 'Any digital file — PDFs, images, spreadsheets, presentations, contracts, certificates, transcripts. If it has a file, it can be fingerprinted and anchored.',
  },
  {
    q: 'How is this different from DocuSign or other e-signature tools?',
    a: "E-signature tools prove who signed a document. Arkova proves that a specific document existed at a specific time and has not been altered since. These are complementary — you can anchor a signed document to prove it hasn't changed after signing.",
  },
  {
    q: 'Can I integrate Arkova into my existing systems?',
    a: 'Absolutely. Our Verification API lets you verify credentials programmatically with a single API call. Batch endpoints support up to 100 verifications per request. We provide SDKs for Python, Node.js, and Go, plus webhook notifications for real-time events.',
  },
  {
    q: 'Is my data safe?',
    a: "Your documents never leave your device — that's our foundational privacy guarantee, not just a feature. Fingerprints are anchored to a public, independently verifiable network. Even if our servers were compromised, your documents remain private because we never had them.",
  },
];

/* ─── Dark mode hook ─── */
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('arkova-theme');
    if (stored) return stored === 'dark';
    return true; // default dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('arkova-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark(!dark) };
}

/* ─── App ─── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { dark, toggle: toggleDark } = useDarkMode();

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NAV_LINKS = ['How It Works', 'Features', 'API', 'Use Cases', 'FAQ'];

  return (
    <div className="min-h-screen bg-white dark:bg-arkova-charcoal font-sans transition-colors duration-300">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-arkova-ice/60 dark:border-white/5 bg-white/80 dark:bg-arkova-charcoal/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5">
            <img src={arkovaLogo} alt="Arkova" className="h-10 w-auto dark:brightness-150 dark:contrast-90" />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase().replace(/\s+/g, '-'))}
                className="text-sm font-medium text-arkova-slate dark:text-arkova-steel-light/70 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-frost dark:hover:bg-white/5"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#early-access"
              onClick={(e) => { e.preventDefault(); scrollTo('early-access'); }}
              className="rounded-lg bg-arkova-steel px-5 py-2 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-arkova-deep hover:shadow-glow-md"
            >
              Request Early Access
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-arkova-slate dark:text-arkova-steel-light/60"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="text-arkova-charcoal dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-arkova-charcoal px-6 py-4 md:hidden">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase().replace(/\s+/g, '-'))}
                className="block w-full py-3 text-left text-sm font-medium text-arkova-slate dark:text-arkova-steel-light/70"
              >
                {label}
              </button>
            ))}
            <a
              href="#early-access"
              onClick={(e) => { e.preventDefault(); scrollTo('early-access'); }}
              className="mt-3 block rounded-lg bg-arkova-steel px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Request Early Access
            </a>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative overflow-hidden px-6 pb-24 pt-28 md:pt-36 lg:pt-40">
        <div className="absolute inset-0 bg-mesh-gradient dark:bg-mesh-dark" />
        <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-20 -right-32 h-96 w-96 rounded-full bg-arkova-steel/5 dark:bg-arkova-steel/3 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-arkova-ice/30 dark:bg-arkova-ocean/10 blur-3xl animate-float-delayed" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-arkova-steel/20 dark:border-arkova-steel/10 bg-arkova-frost dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-arkova-ocean dark:text-arkova-steel opacity-0 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Lock className="h-3.5 w-3.5" />
            Your documents never leave your device
          </div>

          <h1
            className="mb-6 text-5xl font-bold tracking-tight text-arkova-charcoal dark:text-white opacity-0 animate-fade-up md:text-7xl"
            style={{ animationDelay: '0.2s' }}
          >
            Verify Once.
            <br />
            <span className="bg-gradient-to-r from-arkova-steel to-arkova-ocean bg-clip-text text-transparent">
              Trust Forever.
            </span>
          </h1>

          <p
            className="mx-auto mb-10 max-w-2xl text-lg text-arkova-slate dark:text-arkova-steel-light/60 opacity-0 animate-fade-up md:text-xl"
            style={{ animationDelay: '0.35s' }}
          >
            Arkova creates tamper-proof records of your documents using cryptographic
            fingerprinting. Verify credentials, protect intellectual property, and
            establish provenance — without ever uploading your files.
          </p>

          <div
            className="flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-up sm:flex-row"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="#early-access"
              onClick={(e) => { e.preventDefault(); scrollTo('early-access'); }}
              className="group flex items-center gap-2 rounded-xl bg-arkova-steel px-8 py-3.5 text-base font-semibold text-white shadow-glow-md transition-all hover:bg-arkova-deep hover:shadow-glow-lg"
            >
              Request Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="rounded-xl border border-arkova-ice dark:border-white/10 px-8 py-3.5 text-base font-semibold text-arkova-charcoal dark:text-white transition-all hover:border-arkova-steel/30 hover:bg-arkova-frost dark:hover:bg-white/5"
            >
              See How It Works
            </button>
          </div>
        </div>

        {/* Hero metrics */}
        <div
          className="relative mx-auto mt-20 max-w-3xl opacity-0 animate-fade-up"
          style={{ animationDelay: '0.65s' }}
        >
          <div className="gradient-border rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-sm">
            <div className="grid grid-cols-3 divide-x divide-arkova-ice/60 dark:divide-white/10 px-4 py-6 md:px-8 md:py-8">
              {[
                { label: 'Document Exposure', value: 'Zero' },
                { label: 'Independently Verifiable', value: '100%' },
                { label: 'Account Required to Verify', value: 'Never' },
              ].map((metric) => (
                <div key={metric.label} className="px-2 text-center md:px-4">
                  <div className="font-mono text-2xl font-bold text-arkova-steel md:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-arkova-slate dark:text-arkova-steel-light/50 md:text-sm">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="border-y border-arkova-ice/60 dark:border-white/5 bg-arkova-frost dark:bg-white/[0.02] px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-arkova-slate dark:text-arkova-steel-light/60">
          {[
            { icon: Shield, text: 'Client-side processing only' },
            { icon: Lock, text: 'SHA-256 fingerprinting' },
            { icon: Globe, text: 'Independently verifiable' },
            { icon: FileCheck, text: 'Permanent proof records' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-emerald-500" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section id="how-it-works" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              How It Works
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Three steps to permanent proof
            </h2>
            <p className="mx-auto max-w-xl text-arkova-slate dark:text-arkova-steel-light/60">
              Create a permanent, independently verifiable record of any document in seconds.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="group relative rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-8 shadow-card-rest dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-card-hover dark:hover:bg-white/[0.05]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5">
                  <item.icon className="h-7 w-7 text-arkova-steel" />
                </div>
                <div className="mb-3 font-mono text-xs font-medium text-arkova-steel/60">
                  STEP {item.step}
                </div>
                <h3 className="mb-3 text-xl font-bold text-arkova-charcoal dark:text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="features" className="bg-arkova-frost/50 dark:bg-white/[0.02] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              Features
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Everything you need to prove authenticity
            </h2>
            <p className="mx-auto max-w-xl text-arkova-slate dark:text-arkova-steel-light/60">
              Built for individuals, professionals, and organizations who need verifiable proof.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-6 shadow-card-rest dark:shadow-none transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5">
                  <feature.icon className="h-5 w-5 text-arkova-steel" />
                </div>
                <h3 className="mb-2 text-base font-bold text-arkova-charcoal dark:text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ AI INTELLIGENCE ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              AI-Powered
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Intelligent credential processing
            </h2>
            <p className="mx-auto max-w-2xl text-arkova-slate dark:text-arkova-steel-light/60">
              Arkova uses AI to automatically extract metadata, classify credential types, and
              detect anomalies — all while keeping your documents private on your device.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'AI Metadata Extraction',
                description: 'Automatically identify credential types, issuers, dates, and key fields. No manual data entry — AI reads the document so you don\'t have to.',
              },
              {
                icon: ScanSearch,
                title: 'Anomaly Detection',
                description: 'AI-powered analysis flags inconsistencies, expired credentials, and potential issues before they become problems.',
              },
              {
                icon: Brain,
                title: 'Smart Classification',
                description: 'Automatically categorize credentials by type — degrees, licenses, certifications, contracts — and organize your records intelligently.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-8 shadow-card-rest dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-card-hover dark:hover:bg-white/[0.05]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-arkova-ocean/20 to-arkova-steel/5">
                  <item.icon className="h-7 w-7 text-arkova-ocean dark:text-arkova-steel" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-arkova-charcoal dark:text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 gradient-border rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-8 text-center md:p-10">
            <p className="text-arkova-slate dark:text-arkova-steel-light/60">
              <span className="font-semibold text-arkova-charcoal dark:text-white">Privacy preserved.</span>{' '}
              AI processing uses only PII-stripped metadata extracted on your device. Your documents and personal
              information never reach our servers.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══ VERIFICATION API (Phase 1.5) ═══ */}
      <Section id="api" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              Verification API
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Integrate verification into anything
            </h2>
            <p className="mx-auto max-w-2xl text-arkova-slate dark:text-arkova-steel-light/60">
              Verify credentials programmatically. Background checks, compliance audits,
              hiring workflows — verify at scale with a single API call.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {API_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-6 shadow-card-rest dark:shadow-none transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-arkova-ocean/20 to-arkova-steel/5">
                  <feature.icon className="h-5 w-5 text-arkova-ocean dark:text-arkova-steel" />
                </div>
                <h3 className="mb-2 text-base font-bold text-arkova-charcoal dark:text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section id="use-cases" className="bg-arkova-frost/50 dark:bg-white/[0.02] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              Use Cases
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Built for every industry
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="group text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5 transition-all group-hover:shadow-glow-sm">
                  <uc.icon className="h-8 w-8 text-arkova-steel" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-arkova-charcoal dark:text-white">{uc.title}</h3>
                <p className="mb-4 text-sm text-arkova-slate dark:text-arkova-steel-light/60">{uc.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {uc.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full bg-arkova-frost dark:bg-white/5 px-3 py-1 text-xs font-medium text-arkova-ocean dark:text-arkova-steel"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ SECURITY / PRIVACY ═══ */}
      <Section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="gradient-border rounded-3xl bg-white dark:bg-white/[0.03] p-10 text-center md:p-16">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5">
              <Shield className="h-8 w-8 text-arkova-steel" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Your privacy is our architecture
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-arkova-slate dark:text-arkova-steel-light/60">
              Arkova is built from the ground up so that your documents never leave your
              device. Fingerprinting happens entirely in your browser using the Web Crypto
              API. We anchor the fingerprint — never the file. Even if our
              servers were compromised, your documents remain private.
            </p>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { label: 'Zero-knowledge architecture', value: 'Privacy', icon: Lock },
                { label: 'SHA-256 Web Crypto API', value: 'Security', icon: Shield },
                { label: 'Append-only audit trail', value: 'Integrity', icon: FileCheck },
              ].map(({ label, value, icon: Icon }) => (
                <div key={value} className="rounded-xl bg-arkova-frost/60 dark:bg-white/[0.03] p-6">
                  <Icon className="mx-auto mb-3 h-6 w-6 text-arkova-steel" />
                  <div className="text-xl font-bold text-arkova-steel">{value}</div>
                  <div className="mt-1 text-sm text-arkova-slate dark:text-arkova-steel-light/50">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ AGENTIC RECORD KEEPING ═══ */}
      <Section className="bg-arkova-frost/50 dark:bg-white/[0.02] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              The Future
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Infrastructure for Agentic Record Keeping
            </h2>
            <p className="mx-auto max-w-2xl text-arkova-slate dark:text-arkova-steel-light/60">
              As AI agents become participants in credentialing, hiring, and compliance workflows,
              the records they rely on need to be machine-verifiable, tamper-proof, and independently auditable.
              Arkova is building that layer.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Agent-Readable Verification',
                description: 'Our API is designed for autonomous systems. AI agents can verify credentials programmatically — no human in the loop required.',
              },
              {
                icon: Globe,
                title: 'Trust Without Intermediaries',
                description: 'Agents don\'t call references. They need cryptographic proof. Arkova provides independently verifiable records that any system can validate.',
              },
              {
                icon: Layers,
                title: 'Credential Intelligence',
                description: 'Structured metadata, classification, and anomaly detection — giving machines the context they need to make trust decisions at scale.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-8 shadow-card-rest dark:shadow-none transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-arkova-ocean/20 to-arkova-steel/5">
                  <item.icon className="h-6 w-6 text-arkova-ocean dark:text-arkova-steel" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-arkova-charcoal dark:text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq" className="bg-arkova-frost/50 dark:bg-white/[0.02] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              FAQ
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal dark:text-white md:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 font-semibold text-arkova-charcoal dark:text-white">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-arkova-steel transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-arkova-ice/60 dark:border-white/5 px-6 py-5">
                    <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ EARLY ACCESS CTA ═══ */}
      <section
        id="early-access"
        className="relative overflow-hidden bg-arkova-charcoal dark:bg-black/40 px-6 py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-mesh-dark" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Be first to verify what matters
          </h2>
          <p className="mb-10 text-lg text-arkova-steel-light/70">
            Join the waitlist for early access. We'll notify you when Arkova is ready.
          </p>

          <form
            action="https://formspree.io/f/xpwzgvkp"
            method="POST"
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/30 backdrop-blur-sm focus:border-arkova-steel/50 focus:outline-none focus:ring-1 focus:ring-arkova-steel/50"
            />
            <button
              type="submit"
              className="rounded-xl bg-arkova-steel px-8 py-3.5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-arkova-deep hover:shadow-glow-md"
            >
              Join Waitlist
            </button>
          </form>

          <p className="mt-4 text-xs text-white/30">No spam. We'll only email you when we launch.</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-arkova-charcoal px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center gap-2.5">
                <img src={arkovaLogo} alt="Arkova" className="h-10 w-auto dark:brightness-150 dark:contrast-90" />
              </div>
              <p className="text-sm text-arkova-slate dark:text-arkova-steel-light/50">
                Tamper-proof document verification. Privacy-first. Independently verifiable.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.linkedin.com/company/arkova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10 hover:text-arkova-charcoal dark:hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/arkaboratory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10 hover:text-arkova-charcoal dark:hover:text-white"
                  aria-label="X / Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal dark:text-white">
                Product
              </h4>
              <ul className="space-y-2.5">
                {['How It Works', 'Features', 'API', 'Use Cases'].map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(label.toLowerCase().replace(/\s+/g, '-'))}
                      className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal dark:text-white">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="mailto:hello@arkova.ai"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:careers@arkova.ai"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal dark:text-white">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-arkova-ice/60 dark:border-white/5 pt-8 text-center text-xs text-arkova-slate/60 dark:text-arkova-steel-light/30">
            &copy; {new Date().getFullYear()} Arkova Technologies, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
