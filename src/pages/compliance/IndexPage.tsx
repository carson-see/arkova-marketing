/**
 * Compliance Encyclopedia — /compliance index page.
 *
 * Lists every framework Arkova has a dedicated page for, grouped by region.
 * The intent is a "mini encyclopedia" of regulations Arkova can anchor evidence
 * for — not a marketing claim that we're SOC2-certified or HIPAA-audited
 * ourselves. Each entry links to a deep page (HIPAA, SOX, EU AI Act, DORA,
 * FERPA) or a compact entry (eIDAS, ESIGN, UETA, GDPR-summary, Australia APP,
 * Kenya DPA).
 */

import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BreadcrumbJsonLd } from '../../components/BreadcrumbJsonLd';
import { PrivateBetaBadge, BuildingNote } from '../../components/PrivateBetaBadge';
import { safeJsonLd } from '../../lib/safeJsonLd';

type Depth = 'deep' | 'compact';

interface FrameworkLink {
  label: string;
  jurisdiction: string;
  href: string;
  blurb: string;
  depth: Depth;
}

const GROUPS: { region: string; entries: FrameworkLink[] }[] = [
  {
    region: 'AI risk + cyber disclosure',
    entries: [
      {
        label: 'EU AI Act',
        jurisdiction: 'European Union',
        href: '/compliance/eu-ai-act',
        depth: 'deep',
        blurb:
          'Phased Aug 2024 → Aug 2027. High-risk AI obligations applicable Aug 2026. Regulation 2024/1689.',
      },
    ],
  },
  {
    region: 'United States — Federal',
    entries: [
      {
        label: 'HIPAA',
        jurisdiction: 'United States',
        href: '/compliance/hipaa',
        depth: 'deep',
        blurb:
          'Privacy Rule, Security Rule, Breach Notification Rule, Enforcement Rule. PHI minimum-necessary + ePHI safeguards. OCR enforcement up to $1.9M / violation / year.',
      },
      {
        label: 'SOX',
        jurisdiction: 'United States',
        href: '/compliance/sox',
        depth: 'deep',
        blurb:
          'Sarbanes-Oxley Act of 2002. Sections 302, 404, 409, 802. ICFR + management certification + auditor attestation for accelerated filers.',
      },
      {
        label: 'FERPA',
        jurisdiction: 'United States',
        href: '/compliance/ferpa',
        depth: 'deep',
        blurb:
          'Family Educational Rights and Privacy Act, 1974. Education records privacy for institutions receiving Department of Education funds.',
      },
      {
        label: 'ESIGN Act',
        jurisdiction: 'United States',
        href: '/compliance/esign',
        depth: 'compact',
        blurb:
          '2000 federal e-signature law. Intent, consent, association, retention. Pairs with state UETA for full coverage of US e-signed records.',
      },
      {
        label: 'UETA',
        jurisdiction: 'United States (49 states)',
        href: '/compliance/ueta',
        depth: 'compact',
        blurb:
          'Uniform Electronic Transactions Act, 1999. State-level e-signature law adopted by 49 states. Pairs with federal ESIGN.',
      },
    ],
  },
  {
    region: 'European Union',
    entries: [
      {
        label: 'GDPR',
        jurisdiction: 'European Union',
        href: '/compliance/gdpr',
        depth: 'compact',
        blurb:
          'General Data Protection Regulation, 2018. Six lawful bases, eight data-subject rights, 72-hour breach notification, up to €20M / 4% global turnover penalty.',
      },
      {
        label: 'DORA',
        jurisdiction: 'European Union',
        href: '/compliance/dora',
        depth: 'deep',
        blurb:
          'Digital Operational Resilience Act. Applicable since 17 January 2025. Five pillars covering ICT risk, incident reporting, resilience testing, third-party risk, info sharing.',
      },
      {
        label: 'eIDAS',
        jurisdiction: 'European Union',
        href: '/compliance/eidas',
        depth: 'compact',
        blurb:
          'Regulation 910/2014 + eIDAS 2.0. Three signature tiers (SES/AES/QES), Qualified Trust Service Providers, EU Digital Identity Wallet phasing in 2026.',
      },
    ],
  },
  {
    region: 'Asia-Pacific',
    entries: [
      {
        label: 'Australian Privacy Principles',
        jurisdiction: 'Australia',
        href: '/compliance/australia-app',
        depth: 'compact',
        blurb:
          '13 principles in Schedule 1 of the Privacy Act 1988. Notifiable Data Breaches scheme. Penalties up to AUD$50M / 30% adjusted turnover.',
      },
    ],
  },
  {
    region: 'Africa',
    entries: [
      {
        label: 'Kenya Data Protection Act',
        jurisdiction: 'Kenya',
        href: '/compliance/kenya-dpa',
        depth: 'compact',
        blurb:
          'Data Protection Act, 2019. Administered by the Office of the Data Protection Commissioner (ODPC). GDPR-style structure with mandatory controller/processor registration.',
      },
    ],
  },
];

const ROADMAP = [
  'NIST AI RMF (United States)',
  'SEC Cybersecurity Disclosure Rule (United States)',
  'PIPEDA (Canada)',
  'PDPA (Singapore)',
  'APPI (Japan)',
  'DPDP (India)',
  'POPIA (South Africa)',
  'NDPR (Nigeria)',
  'LGPD (Brazil)',
  'Law 1581 (Colombia)',
  'PDPA (Thailand)',
];

function DepthBadge({ depth }: { depth: Depth }) {
  if (depth === 'deep') {
    return (
      <span className="inline-flex items-center rounded-full border border-cyber-cyan/20 bg-cyber-cyan/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyber-cyan/80">
        Deep dive
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/50">
      Summary
    </span>
  );
}

export default function ComplianceIndexPage() {
  const total = GROUPS.reduce((n, g) => n + g.entries.length, 0);

  const indexSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Compliance Encyclopedia — Arkova',
    description:
      'Encyclopedia of compliance frameworks Arkova anchors evidence for. EU AI Act, HIPAA, SOX, GDPR, DORA, FERPA, eIDAS, ESIGN, UETA, Australian Privacy Principles, Kenya DPA, and more. Each entry links to a dedicated page.',
    url: 'https://arkova.ai/compliance',
    isPartOf: { '@id': 'https://arkova.ai/#org' },
    hasPart: GROUPS.flatMap((g) =>
      g.entries.map((e) => ({
        '@type': 'WebPage',
        url: `https://arkova.ai${e.href}`,
        name: `${e.label} Compliance — Arkova`,
      })),
    ),
  };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Compliance', url: 'https://arkova.ai/compliance' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(indexSchema) }} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-cyber-cyan-border px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-circuit" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,212,255,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
              Compliance encyclopedia
            </p>
            <PrivateBetaBadge />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Frameworks Arkova anchors evidence for.
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-white/70 md:text-xl">
            A working reference of <strong className="text-white">{total}</strong> regulations across
            US federal, EU, APAC, and Africa. Deep-dive pages cover the operational regimes (HIPAA,
            SOX, EU AI Act, DORA, FERPA). Compact entries summarize the rest. Every entry maps to
            specific evidence categories Arkova can anchor on top of your existing GRC stack.
          </p>
          <div className="rounded-sm border border-white/[0.08] bg-white/[0.015] p-4 text-sm leading-relaxed text-white/60">
            <strong className="text-white">A note on what these pages claim.</strong> Arkova does not
            certify your organisation against any of these frameworks — that's the auditor's job.
            What we do is anchor the evidence trail you produce so it remains verifiable independently
            of any single vendor in your stack. The pages below describe how each framework's
            documentation maps to that anchor.
          </div>
        </div>
      </section>

      {/* GROUPS */}
      {GROUPS.map((group) => (
        <section
          key={group.region}
          className="border-t border-cyber-cyan-border px-6 py-16 md:py-20 [&:nth-child(odd)]:bg-cyber-bg-light/30"
        >
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
              <BookOpen className="h-4 w-4" />
              {group.region}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {group.entries.map((entry) => (
                <Link
                  key={entry.href}
                  to={entry.href}
                  className="group rounded-sm border border-white/[0.08] bg-white/[0.015] p-5 transition-colors hover:border-cyber-cyan/20 hover:bg-white/[0.03]"
                >
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyber-cyan">
                      {entry.label}
                    </h3>
                    <DepthBadge depth={entry.depth} />
                  </div>
                  <p className="mb-3 text-[11px] uppercase tracking-wider text-white/40">
                    {entry.jurisdiction}
                  </p>
                  <p className="text-sm leading-relaxed text-white/70">{entry.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ROADMAP */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg-light/30 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            Coverage roadmap
          </p>
          <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
            Not yet on the encyclopedia.
          </h2>
          <p className="mb-8 max-w-3xl text-white/70">
            Frameworks we know we'll need pages for and are working through in priority order. If
            you operate under one of these and want to talk shop, contact us.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {ROADMAP.map((label) => (
              <div
                key={label}
                className="rounded-sm border border-white/[0.08] bg-white/[0.015] px-3 py-2.5 text-sm text-white/60"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Layer Arkova onto whichever framework hurts the most first.
          </h2>
          <p className="mb-6 text-lg text-white/70">
            Tell us your jurisdiction footprint and which frameworks are causing the most evidence
            pain. We'll show you which Arkova capabilities can anchor your existing program.
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
              The State of Compliance in 2026
            </Link>{' '}
            for the broader regulatory picture.
          </p>
        </div>
      </section>
    </>
  );
}
