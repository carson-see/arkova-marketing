/**
 * Contact Page — Formspree-powered contact form with Nordic Vault styling.
 */

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xojkngwn', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-6 pb-12 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-mesh-gradient dark:bg-mesh-dark" />
        <div className="absolute inset-0 bg-subtle-dots" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Contact Us
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-arkova-charcoal dark:text-white opacity-0 animate-fade-up md:text-5xl" style={{ animationDelay: '0.2s' }}>
            Let's talk
          </h1>
          <p className="mx-auto max-w-xl text-base text-arkova-slate dark:text-arkova-steel-light/60 opacity-0 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            Whether you're a university, enterprise, or building AI agents that need verifiable records — we'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ FORM + INFO ═══ */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_380px]">

          {/* Form */}
          <div className="gradient-border rounded-2xl bg-white dark:bg-white/[0.03] p-8 md:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-arkova-charcoal dark:text-white">Message sent!</h2>
                <p className="text-sm text-arkova-slate dark:text-arkova-steel-light/60">We'll be in touch within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm font-medium text-arkova-steel hover:text-arkova-ocean transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-arkova-slate dark:text-arkova-steel-light/50">
                      Full Name <span className="text-arkova-steel">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-arkova-ice/60 dark:border-white/10 bg-arkova-mist dark:bg-white/[0.03] px-4 py-3 text-sm text-arkova-charcoal dark:text-white placeholder:text-arkova-slate/40 focus:border-arkova-steel/50 focus:outline-none focus:ring-1 focus:ring-arkova-steel/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-arkova-slate dark:text-arkova-steel-light/50">
                      Email <span className="text-arkova-steel">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-arkova-ice/60 dark:border-white/10 bg-arkova-mist dark:bg-white/[0.03] px-4 py-3 text-sm text-arkova-charcoal dark:text-white placeholder:text-arkova-slate/40 focus:border-arkova-steel/50 focus:outline-none focus:ring-1 focus:ring-arkova-steel/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-arkova-slate dark:text-arkova-steel-light/50">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    placeholder="Your organization (optional)"
                    className="w-full rounded-xl border border-arkova-ice/60 dark:border-white/10 bg-arkova-mist dark:bg-white/[0.03] px-4 py-3 text-sm text-arkova-charcoal dark:text-white placeholder:text-arkova-slate/40 focus:border-arkova-steel/50 focus:outline-none focus:ring-1 focus:ring-arkova-steel/30"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-arkova-slate dark:text-arkova-steel-light/50">
                    Topic <span className="text-arkova-steel">*</span>
                  </label>
                  <select
                    name="subject"
                    required
                    className="w-full rounded-xl border border-arkova-ice/60 dark:border-white/10 bg-arkova-mist dark:bg-white/[0.03] px-4 py-3 text-sm text-arkova-charcoal dark:text-white focus:border-arkova-steel/50 focus:outline-none focus:ring-1 focus:ring-arkova-steel/30"
                  >
                    <option value="">Select a topic...</option>
                    <option value="general">General Inquiry</option>
                    <option value="early-access">Request Early Access</option>
                    <option value="enterprise">Enterprise / Government</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press / Media</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-arkova-slate dark:text-arkova-steel-light/50">
                    Message <span className="text-arkova-steel">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your verification needs..."
                    className="w-full rounded-xl border border-arkova-ice/60 dark:border-white/10 bg-arkova-mist dark:bg-white/[0.03] px-4 py-3 text-sm text-arkova-charcoal dark:text-white placeholder:text-arkova-slate/40 focus:border-arkova-steel/50 focus:outline-none focus:ring-1 focus:ring-arkova-steel/30 resize-none"
                  />
                </div>

                <input type="hidden" name="_subject" value="New Arkova Contact Form Submission" />

                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please email us directly at hello@arkova.ai
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-arkova-steel px-8 py-3.5 text-sm font-semibold text-white shadow-glow-md transition-all hover:bg-arkova-deep hover:shadow-glow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-6">
              <h3 className="mb-4 text-base font-bold text-arkova-charcoal dark:text-white">Other ways to reach us</h3>
              <div className="space-y-4">
                <a href="mailto:hello@arkova.ai" className="flex items-center gap-3 text-sm text-arkova-slate dark:text-arkova-steel-light/60 hover:text-arkova-ocean transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5">
                    <Mail className="h-4 w-4 text-arkova-steel" />
                  </div>
                  hello@arkova.ai
                </a>
                <a href="https://www.linkedin.com/company/arkovatech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-arkova-slate dark:text-arkova-steel-light/60 hover:text-arkova-ocean transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5">
                    <Linkedin className="h-4 w-4 text-arkova-steel" />
                  </div>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-6">
              <h3 className="mb-3 text-base font-bold text-arkova-charcoal dark:text-white">For enterprise & government</h3>
              <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">
                Looking for a pilot, integration, or custom deployment? Select "Enterprise / Government" above and we'll connect you with the right team.
              </p>
            </div>

            <div className="rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-6">
              <h3 className="mb-3 text-base font-bold text-arkova-charcoal dark:text-white">For press & media</h3>
              <p className="text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">
                Select "Press / Media" above or email us directly. We're happy to provide quotes, background, and technical details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
