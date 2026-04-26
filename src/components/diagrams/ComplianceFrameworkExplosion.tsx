/**
 * Compliance Framework Explosion — side-by-side on desktop, stacked on mobile.
 * Two stacks comparing the compliance footprint a global enterprise carried in
 * 2018 vs 2026. Same vendor-controlled substrate underneath both. Frameworks
 * added since 2020 are highlighted in amber.
 *
 * Built in HTML/CSS rather than SVG so block widths, text rendering, and
 * spacing all scale naturally across breakpoints. At <768px the two columns
 * stack vertically so framework labels stay readable on phones.
 */
type Framework = { label: string; isNew?: boolean };

const STACK_2018: Framework[] = [
  { label: 'SOX' },
  { label: 'HIPAA / FERPA' },
  { label: 'GDPR' },
  { label: 'ESIGN / UETA' },
  { label: 'State statutes' },
];

const STACK_2026: Framework[] = [
  { label: 'APP (Australia)', isNew: true },
  { label: 'POPIA (South Africa)', isNew: true },
  { label: 'PDPA (Singapore)', isNew: true },
  { label: 'DPDP (India)', isNew: true },
  { label: 'LGPD (Brazil)', isNew: true },
  { label: '19 US state privacy laws', isNew: true },
  { label: 'DORA (EU, 2025)', isNew: true },
  { label: 'EU AI Act (2024 → 2027)', isNew: true },
  { label: 'NIST AI RMF (2023)', isNew: true },
  { label: 'SEC cyber disclosure (2023)', isNew: true },
  { label: 'SOX' },
  { label: 'HIPAA / FERPA' },
  { label: 'GDPR' },
  { label: 'ESIGN / UETA' },
];

function Block({ label, isNew }: Framework) {
  return (
    <div
      className={`rounded-md border px-3 py-2 text-center text-xs font-semibold leading-tight md:text-sm ${
        isNew
          ? 'border-amber-600/60 bg-amber-500 text-white'
          : 'border-arkova-steel/40 bg-arkova-ice text-arkova-ocean dark:bg-arkova-ice/90'
      }`}
    >
      {label}
    </div>
  );
}

function StackColumn({ year, count, frameworks }: { year: string; count: string; frameworks: Framework[] }) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 text-center">
        <div className="text-2xl font-bold text-arkova-charcoal dark:text-white">{year}</div>
        <div className="text-xs text-arkova-slate dark:text-arkova-steel-light/60">{count}</div>
      </div>
      <div className="flex flex-1 flex-col-reverse gap-1.5">
        {frameworks.map((f) => (
          <Block key={f.label} {...f} />
        ))}
      </div>
    </div>
  );
}

export default function ComplianceFrameworkExplosion({ className = '' }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="Compliance frameworks: 2018 vs 2026. Five frameworks in 2018; fourteen in 2026 with ten added since 2020 highlighted in amber. The same vendor-controlled substrate sits underneath both years.">
      <div className="rounded-xl border border-arkova-ice/60 dark:border-white/10 bg-white/30 dark:bg-white/[0.02] p-5 md:p-8">
        {/* Stacks: stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <StackColumn year="2018" count="5 frameworks" frameworks={STACK_2018} />
          <StackColumn year="2026" count="14+ frameworks" frameworks={STACK_2026} />
        </div>

        {/* Shared substrate */}
        <div className="mt-6 rounded-lg border border-arkova-slate/40 bg-arkova-slate/10 px-5 py-4 text-center md:mt-8">
          <div className="text-sm font-semibold text-arkova-charcoal dark:text-white">
            Substrate (unchanged in 20 years)
          </div>
          <div className="mt-1 text-xs text-arkova-slate dark:text-arkova-steel-light/70">
            Vendor-controlled audit logs · Manual cross-references · Screenshots and email threads
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-arkova-slate dark:text-arkova-steel-light/70">
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-amber-500 border border-amber-600/60" />
            Added since 2020
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-arkova-ice border border-arkova-steel/40" />
            Pre-2020 baseline
          </span>
        </div>
      </div>

    </div>
  );
}
