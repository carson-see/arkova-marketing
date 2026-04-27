/**
 * Private Beta Badge — small chip that signals product status on framework
 * and comparison landing pages.
 *
 * The audit-funnel landing pages describe Arkova capabilities (multi-
 * jurisdiction coverage, cryptographic verification, control mappings,
 * evidence anchoring) in a way that reads as if everything is shipped at
 * GA. It isn't — Arkova is in private beta with pilot customers. The chip
 * makes that explicit at the top of the hero so prospects don't land with
 * the wrong expectation.
 */

import { Lock } from 'lucide-react';

export function PrivateBetaBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400 ${className}`}
      title="Arkova is in private beta — features described on this page are in development with pilot customers."
    >
      <Lock className="h-3 w-3" />
      Private Beta · Building
    </span>
  );
}

/**
 * BuildingNote — paragraph-form note used near CTAs to clarify status.
 */
export function BuildingNote({ className = '' }: { className?: string }) {
  return (
    <p className={`text-sm leading-relaxed text-white/60 ${className}`}>
      <strong className="text-white/85">Arkova is in private beta.</strong>{' '}
      Features described on this page are being built and refined with pilot customers right
      now. Some controls and integrations are live today; others are in active development.
      Talk to us about the parts most relevant to your workload.
    </p>
  );
}
