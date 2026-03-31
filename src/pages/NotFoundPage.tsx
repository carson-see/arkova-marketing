/**
 * 404 Not Found Page — GEO-14: Proper HTTP 404 for unknown routes.
 *
 * Prerendered to dist/404.html. Vercel serves this file with a 404 status
 * for any URL that doesn't match a prerendered static file.
 */

import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-circuit" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,212,255,0.06)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-sm border border-cyber-cyan-border bg-cyber-bg-card/60">
          <Shield className="h-10 w-10 text-cyber-cyan" />
        </div>

        {/* Status */}
        <p className="mb-4 font-mono text-sm font-bold uppercase tracking-widest text-cyber-cyan">
          404 — Not Found
        </p>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-bold italic tracking-tight text-white md:text-6xl">
          Record not found.
        </h1>

        {/* Subtext */}
        <p className="mb-10 text-lg text-white/40">
          The page you're looking for doesn't exist or has been moved.
          Unlike credentials on Arkova, this URL has no immutable record.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm border border-cyber-cyan-border bg-cyber-bg-card/60 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-cyber-cyan hover:text-cyber-cyan"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Arkova
        </Link>
      </div>
    </section>
  );
}
