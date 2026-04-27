/**
 * Shared chrome for compact framework pages in the compliance encyclopedia.
 *
 * Deep landing pages (HIPAA, EU AI Act, SOX, DORA, FERPA) compose their own
 * layout. Compact entries (eIDAS, ESIGN, UETA, GDPR-summary, Australia APP,
 * Kenya DPA, etc.) use this shell so the encyclopedia stays consistent.
 */

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { PrivateBetaBadge, BuildingNote } from '../../components/PrivateBetaBadge';
import { safeJsonLd } from '../../lib/safeJsonLd';

export interface FrameworkEntry {
  /** URL slug, e.g. 'eidas' */
  slug: string;
  /** Display label, e.g. 'eIDAS' */
  label: string;
  /** Short jurisdiction tag, e.g. 'European Union' */
  jurisdiction: string;
  /** Hero headline (no period) */
  heroHeadline: string;
  /** Hero subhead — 2-3 sentences */
  heroSubhead: string;
  /** "What it is" body paragraphs */
  whatItIs: string[];
  /** Key requirements (3-6 items) */
  keyRequirements: { label: string; description: string }[];
  /** How Arkova fits — 1-2 paragraphs */
  howArkovaFits: string[];
  /** Honest CTA (conditional, no over-claims) */
  ctaPrompt: string;
  /** Optional: link to the deep-page version of this framework */
  deepLinkHref?: string;
  deepLinkLabel?: string;
}

export function FrameworkEncyclopediaPage({ entry }: { entry: FrameworkEntry }) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${entry.label} Compliance — Arkova`,
    description: entry.heroSubhead,
    url: `https://arkova.ai/compliance/${entry.slug}`,
    isPartOf: { '@id': 'https://arkova.ai/#org' },
    mainEntity: {
      '@type': 'Service',
      name: `${entry.label} Compliance Audit Automation`,
      provider: { '@id': 'https://arkova.ai/#org' },
      serviceType: 'Compliance Audit Automation',
      areaServed: { '@type': 'Place', name: entry.jurisdiction },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Compliance', url: 'https://arkova.ai/compliance' },
          { name: entry.label, url: `https://arkova.ai/compliance/${entry.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-cyber-cyan-border px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,212,255,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
              Compliance · {entry.label}
            </p>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/60">
              {entry.jurisdiction}
            </span>
            <PrivateBetaBadge />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            {entry.heroHeadline}.
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">{entry.heroSubhead}</p>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link to="/contact" className="cyber-btn inline-flex items-center gap-2">
              Request Early Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/compliance"
              className="rounded-sm border border-cyber-cyan-border px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5"
            >
              All frameworks
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">What it is</p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">{entry.label} in plain English.</h2>
          <div className="space-y-5 text-white/70">
            {entry.whatItIs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* KEY REQUIREMENTS */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Key requirements
          </p>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            What {entry.label} actually asks of you.
          </h2>
          <div className="space-y-4">
            {entry.keyRequirements.map((r) => (
              <div key={r.label} className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-5">
                <h3 className="mb-2 text-base font-semibold text-white">{r.label}</h3>
                <p className="text-sm leading-relaxed text-white/70">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW ARKOVA FITS */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            How Arkova fits
          </p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Where Arkova adds an independent layer.
          </h2>
          <div className="space-y-5 text-white/70">
            {entry.howArkovaFits.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Layer cryptographic evidence on top of your {entry.label} program.
          </h2>
          <p className="mb-6 text-lg text-white/70">{entry.ctaPrompt}</p>
          <BuildingNote className="mx-auto mb-10 max-w-2xl" />
          <Link to="/contact" className="cyber-btn inline-flex items-center gap-2">
            Request Early Access
            <ArrowRight className="h-4 w-4" />
          </Link>
          {entry.deepLinkHref && entry.deepLinkLabel && (
            <p className="mt-6 text-sm text-white/50">
              Or read the{' '}
              <Link to={entry.deepLinkHref} className="text-cyber-cyan transition-colors hover:text-white">
                {entry.deepLinkLabel}
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
