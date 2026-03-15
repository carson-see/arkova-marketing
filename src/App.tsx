import { useState } from 'react';
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
} from 'lucide-react';
import { Section } from './components/Section';

/* ─── Logo SVG ─── */
function ArkovaLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
    >
      <rect width="32" height="32" rx="8" fill="#82b8d0" />
      <path
        d="M16 6L7 11v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12v-6L16 6z"
        fill="#ffffff"
        fillOpacity="0.25"
      />
      <path
        d="M16 8L9 12.2v5.3c0 4.63 3.2 8.95 7 10 3.8-1.05 7-5.37 7-10v-5.3L16 8z"
        fill="#ffffff"
        fillOpacity="0.15"
      />
      <path
        d="M16 10l-5 3v4c0 3.7 2.56 7.16 5 8 2.44-.84 5-4.3 5-8v-4l-5-3z"
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M13.5 16.5l2 2 3.5-4"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Data ─── */
const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'For individuals exploring document verification.',
    features: [
      '50 records per month',
      'Document fingerprinting',
      'Public verification links',
      'PDF proof certificates',
    ],
    cta: 'Request Early Access',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'For professionals who need reliable document anchoring.',
    features: [
      '500 records per month',
      'Priority anchoring',
      'Credential metadata',
      'Bulk CSV upload',
      'Webhook notifications',
      'API access',
    ],
    cta: 'Request Early Access',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with high-volume credentialing needs.',
    features: [
      'Unlimited records',
      'Dedicated support',
      'Custom integrations',
      'Organization management',
      'Audit reporting',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'Documents are fingerprinted in your browser. We never see, store, or transmit your files.',
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
    examples: ['HR Departments', 'Compliance Teams', 'Registrars'],
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
    q: 'Is my data safe?',
    a: "Your documents never leave your device — that's our foundational privacy guarantee, not just a feature. Fingerprints are anchored to a public, independently verifiable network. Even if our servers were compromised, your documents remain private because we never had them.",
  },
];

/* ─── App ─── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-arkova-ice/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5">
            <ArkovaLogo size={28} />
            <span className="text-lg font-bold tracking-tight text-arkova-charcoal">Arkova</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {['How It Works', 'Features', 'Use Cases', 'Pricing', 'FAQ'].map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase().replace(/\s+/g, '-'))}
                className="text-sm font-medium text-arkova-slate transition-colors hover:text-arkova-charcoal"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#early-access"
              onClick={(e) => { e.preventDefault(); scrollTo('early-access'); }}
              className="rounded-lg bg-arkova-steel px-5 py-2 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-arkova-deep hover:shadow-glow-md"
            >
              Request Early Access
            </a>
          </div>

          <button
            className="text-arkova-charcoal md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-arkova-ice/60 bg-white px-6 py-4 md:hidden">
            {['How It Works', 'Features', 'Use Cases', 'Pricing', 'FAQ'].map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase().replace(/\s+/g, '-'))}
                className="block w-full py-3 text-left text-sm font-medium text-arkova-slate"
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
        <div className="absolute inset-0 bg-mesh-gradient" />
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
        <div className="pointer-events-none absolute -top-20 -right-32 h-96 w-96 rounded-full bg-arkova-steel/5 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-arkova-ice/30 blur-3xl animate-float-delayed" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-arkova-steel/20 bg-arkova-frost px-4 py-1.5 text-sm font-medium text-arkova-ocean opacity-0 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Lock className="h-3.5 w-3.5" />
            Your documents never leave your device
          </div>

          <h1
            className="mb-6 text-5xl font-bold tracking-tight text-arkova-charcoal opacity-0 animate-fade-up md:text-7xl"
            style={{ animationDelay: '0.2s' }}
          >
            Verify Once.
            <br />
            <span className="bg-gradient-to-r from-arkova-steel to-arkova-ocean bg-clip-text text-transparent">
              Trust Forever.
            </span>
          </h1>

          <p
            className="mx-auto mb-10 max-w-2xl text-lg text-arkova-slate opacity-0 animate-fade-up md:text-xl"
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
              className="rounded-xl border border-arkova-ice px-8 py-3.5 text-base font-semibold text-arkova-charcoal transition-all hover:border-arkova-steel/30 hover:bg-arkova-frost"
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
          <div className="gradient-border rounded-2xl bg-white/60 backdrop-blur-sm">
            <div className="grid grid-cols-3 divide-x divide-arkova-ice/60 px-4 py-6 md:px-8 md:py-8">
              {[
                { label: 'Verification Time', value: '<1s' },
                { label: 'Document Exposure', value: 'Zero' },
                { label: 'Independently Verifiable', value: '100%' },
              ].map((metric) => (
                <div key={metric.label} className="px-2 text-center md:px-4">
                  <div className="font-mono text-2xl font-bold text-arkova-steel md:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-arkova-slate md:text-sm">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="border-y border-arkova-ice/60 bg-arkova-frost px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-arkova-slate">
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
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal md:text-4xl">
              Three steps to permanent proof
            </h2>
            <p className="mx-auto max-w-xl text-arkova-slate">
              Create a permanent, independently verifiable record of any document in seconds.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="group relative rounded-2xl border border-arkova-ice/60 bg-white p-8 shadow-card-rest transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5">
                  <item.icon className="h-7 w-7 text-arkova-steel" />
                </div>
                <div className="mb-3 font-mono text-xs font-medium text-arkova-steel/60">
                  STEP {item.step}
                </div>
                <h3 className="mb-3 text-xl font-bold text-arkova-charcoal">{item.title}</h3>
                <p className="text-sm leading-relaxed text-arkova-slate">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="features" className="bg-arkova-frost/50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              Features
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal md:text-4xl">
              Everything you need to prove authenticity
            </h2>
            <p className="mx-auto max-w-xl text-arkova-slate">
              Built for individuals, professionals, and organizations who need verifiable proof.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-arkova-ice/60 bg-white p-6 shadow-card-rest transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5">
                  <feature.icon className="h-5 w-5 text-arkova-steel" />
                </div>
                <h3 className="mb-2 text-base font-bold text-arkova-charcoal">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-arkova-slate">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section id="use-cases" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              Use Cases
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal md:text-4xl">
              Built for every industry
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="group text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5 transition-all group-hover:shadow-glow-sm">
                  <uc.icon className="h-8 w-8 text-arkova-steel" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-arkova-charcoal">{uc.title}</h3>
                <p className="mb-4 text-sm text-arkova-slate">{uc.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {uc.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full bg-arkova-frost px-3 py-1 text-xs font-medium text-arkova-ocean"
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
      <Section className="bg-arkova-frost/50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="gradient-border rounded-3xl bg-white p-10 text-center md:p-16">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-arkova-steel/15 to-arkova-steel/5">
              <Shield className="h-8 w-8 text-arkova-steel" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal md:text-4xl">
              Your privacy is our architecture
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-arkova-slate">
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
                <div key={value} className="rounded-xl bg-arkova-frost/60 p-6">
                  <Icon className="mx-auto mb-3 h-6 w-6 text-arkova-steel" />
                  <div className="text-xl font-bold text-arkova-steel">{value}</div>
                  <div className="mt-1 text-sm text-arkova-slate">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ PRICING ═══ */}
      <Section id="pricing" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              Pricing
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="text-arkova-slate">Start free. Scale as you grow. No hidden fees.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 transition-all hover:-translate-y-1 ${
                  plan.highlighted
                    ? 'border-arkova-steel bg-white shadow-glow-md ring-1 ring-arkova-steel/20'
                    : 'border-arkova-ice/60 bg-white shadow-card-rest hover:shadow-card-hover'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block rounded-full bg-arkova-frost px-3 py-1 text-xs font-semibold text-arkova-ocean">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-arkova-charcoal">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-arkova-charcoal">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-arkova-slate">{plan.period}</span>}
                </div>
                <p className="mt-3 text-sm text-arkova-slate">{plan.description}</p>

                <a
                  href="#early-access"
                  onClick={(e) => { e.preventDefault(); scrollTo('early-access'); }}
                  className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-arkova-steel text-white shadow-glow-sm hover:bg-arkova-deep hover:shadow-glow-md'
                      : 'border border-arkova-ice text-arkova-charcoal hover:border-arkova-steel/30 hover:bg-arkova-frost'
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-arkova-slate">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq" className="bg-arkova-frost/50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel">
              FAQ
            </p>
            <h2 className="mb-4 text-3xl font-bold text-arkova-charcoal md:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-arkova-ice/60 bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 font-semibold text-arkova-charcoal">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-arkova-steel transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-arkova-ice/60 px-6 py-5">
                    <p className="text-sm leading-relaxed text-arkova-slate">{item.a}</p>
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
        className="relative overflow-hidden bg-arkova-charcoal px-6 py-24 md:py-32"
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
      <footer className="border-t border-arkova-ice/60 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center gap-2.5">
                <ArkovaLogo size={24} />
                <span className="text-base font-bold text-arkova-charcoal">Arkova</span>
              </div>
              <p className="text-sm text-arkova-slate">
                Tamper-proof document verification. Privacy-first. Independently verifiable.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.linkedin.com/company/arkova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost text-arkova-slate transition-colors hover:bg-arkova-ice hover:text-arkova-charcoal"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/arkaboratory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost text-arkova-slate transition-colors hover:bg-arkova-ice hover:text-arkova-charcoal"
                  aria-label="X / Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal">
                Product
              </h4>
              <ul className="space-y-2.5">
                {['How It Works', 'Features', 'Pricing', 'Use Cases'].map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(label.toLowerCase().replace(/\s+/g, '-'))}
                      className="text-sm text-arkova-slate transition-colors hover:text-arkova-charcoal"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="mailto:hello@arkova.ai"
                    className="text-sm text-arkova-slate transition-colors hover:text-arkova-charcoal"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:careers@arkova.ai"
                    className="text-sm text-arkova-slate transition-colors hover:text-arkova-charcoal"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-arkova-slate transition-colors hover:text-arkova-charcoal"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-arkova-slate transition-colors hover:text-arkova-charcoal"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-arkova-ice/60 pt-8 text-center text-xs text-arkova-slate/60">
            &copy; {new Date().getFullYear()} Arkova Technologies, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
