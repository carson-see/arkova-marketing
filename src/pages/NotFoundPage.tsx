import { Link } from 'react-router-dom';
import { ShieldOff, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pt-36 lg:pt-44">
      <div className="absolute inset-0 bg-circuit" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.06)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-sm border border-cyber-cyan/20 bg-cyber-cyan/5">
          <ShieldOff className="h-12 w-12 text-cyber-cyan/50" />
        </div>

        <h1 className="mb-4 text-6xl font-bold tracking-tight text-white md:text-8xl">
          <span className="bg-gradient-to-r from-cyber-cyan to-cyber-teal bg-clip-text text-transparent">404</span>
        </h1>

        <p className="mb-2 text-xl font-semibold text-white">Page not found</p>
        <p className="mb-10 text-white/35">
          The page you are looking for does not exist or has been moved. Head back to the homepage to explore Arkova's document verification platform.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 cyber-btn"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
