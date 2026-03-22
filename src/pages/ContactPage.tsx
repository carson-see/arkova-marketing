/**
 * Contact Page — Cyber-noir styled contact form matching Stitch v1_1/v1_6 designs.
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
      const res = await fetch('https://formspree.io/f/mpqynjnp', {
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
      {/* ═══ SPLIT HERO + FORM ═══ */}
      <section className="relative min-h-screen overflow-hidden pt-20">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,212,255,0.06)_0%,transparent_60%)]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          {/* Left — headline */}
          <div>
            <h1 className="mb-6 text-4xl font-bold italic tracking-tight text-white opacity-0 animate-fade-up md:text-6xl" style={{ animationDelay: '0.2s' }}>
              Want to shape
              <br />
              what we build
              <br />
              next?
            </h1>
            <p className="max-w-md text-lg text-white/40 opacity-0 animate-fade-up" style={{ animationDelay: '0.35s' }}>
              Get in touch with our team to learn more about the Arkova platform and partnership opportunities.
            </p>

            {/* Info cards below headline */}
            <div className="mt-10 space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="rounded-sm border border-cyber-cyan-border bg-cyber-bg-card/60 p-5">
                <h3 className="mb-3 text-sm font-bold text-white">Other ways to reach us</h3>
                <div className="space-y-3">
                  <a href="mailto:hello@arkova.ai" className="flex items-center gap-3 text-sm text-white/40 hover:text-cyber-cyan transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                      <Mail className="h-4 w-4 text-cyber-cyan" />
                    </div>
                    hello@arkova.ai
                  </a>
                  <a href="https://www.linkedin.com/company/arkovatech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/40 hover:text-cyber-cyan transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                      <Linkedin className="h-4 w-4 text-cyber-cyan" />
                    </div>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-sm border border-cyber-cyan-border bg-cyber-bg-card/60 backdrop-blur-sm p-8 md:p-10 opacity-0 animate-fade-up shadow-neon" style={{ animationDelay: '0.3s' }}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-sm bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">Message sent!</h2>
                <p className="text-sm text-white/40">We'll be in touch within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm font-medium text-cyber-cyan hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                    Name
                  </label>
                  <input type="text" name="name" required placeholder="Your name" className="cyber-input" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                    Email
                  </label>
                  <input type="email" name="email" required placeholder="you@company.com" className="cyber-input" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                    What can we help with?
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what you're looking for — partnerships, early access, enterprise pilot, API integration, or anything else..."
                    className="cyber-input resize-none"
                  />
                </div>

                <input type="hidden" name="_subject" value="Arkova Contact Form — New Inquiry" />
                <input type="hidden" name="_cc" value="sarah@arkova.ai" />

                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please email us directly at carson@arkova.ai
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group flex w-full items-center justify-center gap-2 cyber-btn disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyber-bg/30 border-t-cyber-bg" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Get in Touch
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
