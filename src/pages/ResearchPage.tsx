import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Section } from '../components/Section';
import { BreadcrumbJsonLd } from '../components/BreadcrumbJsonLd';

const CATEGORY_COLORS: Record<string, string> = {
  Compliance: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Technology: 'bg-arkova-steel/10 text-arkova-ocean dark:bg-arkova-steel/10 dark:text-arkova-steel',
  Industry: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Product: 'bg-violet-500/10 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
};

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ResearchPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Research', url: 'https://arkova.ai/research' }]} />
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-36">
        <div className="absolute inset-0 bg-mesh-gradient dark:bg-mesh-dark" />
        <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-20 -right-32 h-96 w-96 rounded-full bg-arkova-steel/5 dark:bg-arkova-steel/3 blur-3xl animate-float" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-arkova-steel opacity-0 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Research & Insights
          </p>
          <h1
            className="mb-6 text-4xl font-bold tracking-tight text-arkova-charcoal dark:text-white opacity-0 animate-fade-up md:text-5xl"
            style={{ animationDelay: '0.2s' }}
          >
            Analysis on document verification,{' '}
            <span className="bg-gradient-to-r from-arkova-steel to-arkova-ocean bg-clip-text text-transparent">
              compliance infrastructure
            </span>
            , and digital trust
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg text-arkova-slate dark:text-arkova-steel-light/60 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.35s' }}
          >
            Deep dives into the regulatory landscape, technology decisions, and industry
            trends shaping how organizations prove what happened, when, and to whom.
          </p>
        </div>
      </section>

      {/* ═══ ARTICLE GRID ═══ */}
      <Section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8">
            {[...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).map((article) => (
              <Link
                key={article.slug}
                to={`/research/${article.slug}`}
                className="group rounded-2xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-8 shadow-card-rest dark:shadow-none transition-all hover:-translate-y-1 hover:shadow-card-hover dark:hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[article.category] ?? ''}`}>
                    <Tag className="h-3 w-3" />
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-arkova-slate dark:text-arkova-steel-light/50">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-bold text-arkova-charcoal dark:text-white transition-colors group-hover:text-arkova-steel md:text-2xl">
                  {article.title}
                </h2>

                <p className="mb-6 text-sm leading-relaxed text-arkova-slate dark:text-arkova-steel-light/60">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {article.author.avatar && (
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        decoding="async"
                        className="h-9 w-9 rounded-full border border-arkova-ice/60 dark:border-white/10 object-cover"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-arkova-charcoal dark:text-white">
                        {article.author.name}
                      </div>
                      <div className="text-xs text-arkova-slate dark:text-arkova-steel-light/50">
                        {formatDate(article.date)}
                      </div>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-sm font-medium text-arkova-steel transition-colors group-hover:text-arkova-ocean">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-arkova-charcoal dark:bg-black/40 px-6 py-16 md:py-20">
        <div className="absolute inset-0 bg-mesh-dark" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Ready to secure your records?
          </h2>
          <p className="mb-8 text-arkova-steel-light/70">
            Join the waitlist and be the first to create tamper-proof, verifiable records.
          </p>
          <Link
            to="/#early-access"
            className="inline-flex items-center gap-2 rounded-xl bg-arkova-steel px-8 py-3.5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-arkova-deep hover:shadow-glow-md"
          >
            Request Early Access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
