/**
 * Article detail page — renders long-form content with Article JSON-LD schema.
 *
 * NOTE: Research/editorial content is exempt from Constitution 1.3 copy-lint
 * banned terms. Articles discuss Bitcoin and related technologies by name as
 * part of industry analysis — distinct from Arkova product UI copy.
 */

import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Linkedin, Twitter, LinkIcon, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getArticleBySlug, ARTICLES, type Article, type ContentBlock } from '../data/articles';
import { DIAGRAM_COMPONENTS } from '../components/diagrams';

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

function ArticleJsonLd({ article }: { article: Article }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    wordCount: article.sections.reduce(
      (sum, s) => {
        if (s.blocks) {
          return sum + s.blocks.reduce((bSum, b) => bSum + ('value' in b ? b.value.split(/\s+/).length : 'quote' in b ? b.quote.split(/\s+/).length : 0), 0);
        }
        return sum + (s.paragraphs?.reduce((pSum, p) => pSum + p.split(/\s+/).length, 0) ?? 0);
      },
      0
    ),
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.title,
      ...(article.author.linkedin && { url: article.author.linkedin }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Arkova',
      url: 'https://arkova.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://arkova.ai/arkova-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://arkova.ai/research/${article.slug}`,
    },
    image: article.ogImage || 'https://arkova.ai/arkova-logo.png',
    url: `https://arkova.ai/research/${article.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ShareButtons({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);
  const url = `https://arkova.ai/research/${article.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback: clipboard API unavailable (HTTP or denied permission)
    });
  };

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-arkova-slate dark:text-arkova-steel-light/50">
        Share
      </span>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-3.5 w-3.5" />
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10"
        aria-label="Share on X"
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>
      <button
        onClick={copyLink}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10"
        aria-label="Copy link"
      >
        {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <LinkIcon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

/* ─── Rich content block renderer ─── */
const STAT_VARIANTS: Record<string, string> = {
  blue: 'border-l-arkova-steel',
  green: 'border-l-emerald-500',
  amber: 'border-l-amber-500',
};

function RichBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <p className="mb-4 text-base leading-[1.8] text-arkova-slate dark:text-arkova-steel-light/70">
          {block.value}
        </p>
      );

    case 'stat':
      return (
        <div className={`my-8 rounded-xl border-l-[3px] ${STAT_VARIANTS[block.variant ?? 'blue']} bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-arkova-ice/60 dark:border-white/5 p-6`}>
          <div className="text-3xl font-bold text-arkova-charcoal dark:text-white">{block.value}</div>
          <div className="mt-1 text-sm text-arkova-slate dark:text-arkova-steel-light/60">{block.label}</div>
          {block.sourceUrl ? (
            <a href={block.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs italic text-arkova-slate/60 dark:text-arkova-steel-light/40 hover:text-arkova-steel">
              — {block.source}
            </a>
          ) : (
            <div className="mt-2 text-xs italic text-arkova-slate/60 dark:text-arkova-steel-light/40">— {block.source}</div>
          )}
        </div>
      );

    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-arkova-steel pl-6">
          <p className="text-xl italic text-arkova-charcoal dark:text-white leading-relaxed">
            &ldquo;{block.quote}&rdquo;
          </p>
          {block.attribution && (
            <footer className="mt-3">
              <span className="text-sm font-medium text-arkova-charcoal dark:text-white">{block.attribution}</span>
              {block.role && <span className="ml-1 text-xs text-arkova-slate dark:text-arkova-steel-light/50">{block.role}</span>}
            </footer>
          )}
        </blockquote>
      );

    case 'table':
      return (
        <div className="my-8 overflow-hidden rounded-xl border border-arkova-ice/60 dark:border-white/5 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl">
          {block.title && (
            <div className="border-b border-arkova-ice/60 dark:border-white/5 px-6 py-3">
              <h3 className="text-sm font-bold text-arkova-charcoal dark:text-white">{block.title}</h3>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-arkova-frost/50 dark:bg-white/[0.03]">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-arkova-slate dark:text-arkova-steel-light/60">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className={`border-t border-arkova-ice/40 dark:border-white/5 ${row.highlight ? 'bg-arkova-steel/5 dark:bg-arkova-steel/10' : ''}`}>
                    {row.cells.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 text-arkova-slate dark:text-arkova-steel-light/70 ${j === 0 ? 'font-medium text-arkova-charcoal dark:text-white' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.footnote && (
            <div className="border-t border-arkova-ice/40 dark:border-white/5 px-6 py-2">
              <p className="text-xs italic text-arkova-slate/60 dark:text-arkova-steel-light/40">{block.footnote}</p>
            </div>
          )}
        </div>
      );

    case 'diagram': {
      const DiagramComponent = DIAGRAM_COMPONENTS[block.id];
      if (!DiagramComponent) return null;
      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-xl border border-arkova-ice/60 dark:border-white/5 shadow-card-rest" role="img" aria-label={block.alt}>
            <DiagramComponent className="w-full" />
          </div>
          <figcaption className="mt-3 text-center text-sm italic text-arkova-slate/80 dark:text-arkova-steel-light/50">
            {block.caption}
          </figcaption>
        </figure>
      );
    }

    default:
      return null;
  }
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? '');
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 pt-28">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-arkova-charcoal dark:text-white">
            Article not found
          </h1>
          <Link
            to="/research"
            className="text-sm font-medium text-arkova-steel hover:text-arkova-ocean"
          >
            Back to Research
          </Link>
        </div>
      </div>
    );
  }

  // Related articles (exclude current)
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd article={article} />

      {/* ═══ ARTICLE HEADER ═══ */}
      <article className="px-6 pt-28 md:pt-36">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            to="/research"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research
          </Link>

          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[article.category] ?? ''}`}>
              <Tag className="h-3 w-3" />
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-arkova-slate dark:text-arkova-steel-light/50">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
            <span className="text-xs text-arkova-slate dark:text-arkova-steel-light/50">
              {formatDate(article.date)}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-arkova-charcoal dark:text-white md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="mb-8 text-lg text-arkova-slate dark:text-arkova-steel-light/60">
              {article.subtitle}
            </p>
          )}

          {/* Author + Share */}
          <div className="mb-12 flex items-center justify-between border-b border-arkova-ice/60 dark:border-white/5 pb-8">
            <div className="flex items-center gap-4">
              {article.author.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-12 w-12 rounded-full border-2 border-arkova-ice/60 dark:border-white/10 object-cover"
                />
              )}
              <div>
                <div className="flex items-center gap-2 font-medium text-arkova-charcoal dark:text-white">
                  {article.author.name}
                  {article.author.linkedin && (
                    <a href={article.author.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${article.author.name} on LinkedIn`} className="text-arkova-steel hover:text-arkova-ocean transition-colors">
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <div className="text-sm text-arkova-slate dark:text-arkova-steel-light/50">
                  {article.author.title}
                </div>
              </div>
            </div>
            <ShareButtons article={article} />
          </div>

          {/* ═══ ARTICLE BODY ═══ */}
          <div className="prose-arkova">
            {article.sections.map((section, i) => (
              <div key={i} className="mb-10">
                {section.heading && (
                  <h2 className="mb-5 text-2xl font-bold text-arkova-charcoal dark:text-white">
                    {section.heading}
                  </h2>
                )}
                {section.blocks
                  ? section.blocks.map((block, j) => (
                      <RichBlock key={j} block={block} />
                    ))
                  : (section.paragraphs ?? []).map((p, j) => (
                      <p
                        key={j}
                        className="mb-4 text-base leading-[1.8] text-arkova-slate dark:text-arkova-steel-light/70"
                      >
                        {p}
                      </p>
                    ))}
              </div>
            ))}
          </div>

          {/* ═══ ARTICLE FOOTER ═══ */}
          <div className="mt-12 border-t border-arkova-ice/60 dark:border-white/5 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {article.author.avatar && (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="h-12 w-12 rounded-full border-2 border-arkova-ice/60 dark:border-white/10 object-cover"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-arkova-charcoal dark:text-white">
                    Written by {article.author.name}
                    {article.author.linkedin && (
                      <a href={article.author.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${article.author.name} on LinkedIn`} className="text-arkova-steel hover:text-arkova-ocean transition-colors">
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-arkova-slate dark:text-arkova-steel-light/50">
                    {article.author.title} at Arkova
                  </div>
                </div>
              </div>
              <ShareButtons article={article} />
            </div>
          </div>
        </div>
      </article>

      {/* ═══ RELATED ARTICLES ═══ */}
      {related.length > 0 && (
        <section className="mt-20 border-t border-arkova-ice/60 dark:border-white/5 bg-arkova-frost/50 dark:bg-white/[0.02] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-8 text-lg font-bold text-arkova-charcoal dark:text-white">
              More from Arkova Research
            </h3>
            <div className="grid gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/research/${a.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-arkova-ice/60 dark:border-white/5 bg-white dark:bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:hover:bg-white/[0.05]"
                >
                  <div>
                    <div className="mb-1 text-xs text-arkova-slate dark:text-arkova-steel-light/50">
                      {formatDate(a.date)}
                    </div>
                    <div className="font-medium text-arkova-charcoal dark:text-white group-hover:text-arkova-steel">
                      {a.title}
                    </div>
                  </div>
                  <ArrowLeft className="h-4 w-4 rotate-180 text-arkova-steel opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
          </Link>
        </div>
      </section>
    </>
  );
}
