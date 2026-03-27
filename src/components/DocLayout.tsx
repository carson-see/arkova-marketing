/**
 * DocLayout — Google Cloud-style documentation layout.
 * Clean sidebar navigation, breadcrumbs, callout boxes, and structured content.
 */

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Copy, Check, Info, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export interface TocItem {
  id: string;
  label: string;
  level?: number;
}

export interface SidebarSection {
  label: string;
  href: string;
  active?: boolean;
  children?: { label: string; href: string; active?: boolean }[];
}

interface DocLayoutProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  toc: TocItem[];
  sidebar: SidebarSection[];
  lastUpdated?: string;
  children: ReactNode;
}

/* ═══════════════════════════════════════════
   Reusable doc primitives
   ═══════════════════════════════════════════ */

export function DocH2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="group mb-4 mt-14 text-[22px] font-semibold text-white scroll-mt-24 border-b border-white/[0.06] pb-3">
      <a href={`#${id}`} className="hover:text-cyber-cyan transition-colors">
        {children}
      </a>
    </h2>
  );
}

export function DocH3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mb-3 mt-8 text-[17px] font-semibold text-white/90 scroll-mt-24">
      {children}
    </h3>
  );
}

export function DocP({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[14.5px] leading-[1.75] text-white/55">{children}</p>;
}

export function DocUl({ children }: { children: ReactNode }) {
  return <ul className="mb-5 ml-1 space-y-2">{children}</ul>;
}

export function DocLi({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[14.5px] leading-[1.75] text-white/55">
      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-cyan/40" />
      <span>{children}</span>
    </li>
  );
}

export function DocStrong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-white/80">{children}</strong>;
}

export function DocCode({ children }: { children: string }) {
  return (
    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-cyber-cyan/80">
      {children}
    </code>
  );
}

export function DocCodeBlock({ children, language }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-5 rounded-sm border border-white/[0.06] bg-[#0d1117]">
      {language && (
        <div className="border-b border-white/[0.06] px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-white/25">
          {language}
        </div>
      )}
      <button
        onClick={copy}
        className="absolute right-3 top-2.5 rounded p-1.5 text-white/20 transition-colors hover:bg-white/[0.06] hover:text-white/50"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-cyber-teal" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono text-white/60">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function DocTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-sm border border-white/[0.06]">
      <table className="w-full text-[13.5px]">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02]">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-white/70">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.03] last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-white/50" dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type CalloutType = 'note' | 'tip' | 'warning' | 'important';

const calloutConfig: Record<CalloutType, { icon: typeof Info; border: string; bg: string; title: string; titleColor: string }> = {
  note: { icon: Info, border: 'border-blue-500/30', bg: 'bg-blue-500/[0.04]', title: 'Note', titleColor: 'text-blue-400' },
  tip: { icon: Lightbulb, border: 'border-cyber-teal/30', bg: 'bg-cyber-teal/[0.04]', title: 'Tip', titleColor: 'text-cyber-teal' },
  warning: { icon: AlertTriangle, border: 'border-amber-500/30', bg: 'bg-amber-500/[0.04]', title: 'Warning', titleColor: 'text-amber-400' },
  important: { icon: AlertTriangle, border: 'border-red-400/30', bg: 'bg-red-400/[0.04]', title: 'Important', titleColor: 'text-red-400' },
};

export function DocCallout({ type = 'note', title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
  const config = calloutConfig[type];
  const Icon = config.icon;
  return (
    <div className={`my-5 rounded-sm border-l-[3px] ${config.border} ${config.bg} px-5 py-4`}>
      <div className={`mb-1.5 flex items-center gap-2 text-[13px] font-semibold ${config.titleColor}`}>
        <Icon className="h-4 w-4" />
        {title || config.title}
      </div>
      <div className="text-[14px] leading-[1.7] text-white/50">{children}</div>
    </div>
  );
}

export function DocDiagram({ children }: { children: string }) {
  return (
    <div className="my-6 overflow-x-auto rounded-sm border border-white/[0.06] bg-[#0d1117] p-5">
      <pre className="text-[12px] leading-[1.6] font-mono text-cyber-cyan/60 whitespace-pre">{children}</pre>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main DocLayout
   ═══════════════════════════════════════════ */

export default function DocLayout({ title, breadcrumbs, toc, sidebar, lastUpdated, children }: DocLayoutProps) {
  const [activeSection, setActiveSection] = useState(toc[0]?.id ?? '');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { threshold: 0.1, rootMargin: '-80px 0px -65% 0px' }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="min-h-screen pt-16">
      {/* Breadcrumbs */}
      <div className="border-b border-white/[0.06] bg-cyber-bg-light/50">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-6 py-3 text-[13px]">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/20" />}
              {crumb.href ? (
                <Link to={crumb.href} className="text-cyber-cyan/70 hover:text-cyber-cyan transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-white/40">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-0 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_200px]">

          {/* ═══ LEFT SIDEBAR ═══ */}
          <aside className="hidden lg:block border-r border-white/[0.06]">
            <nav className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto py-8 pr-6">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-cyber-cyan/60" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyber-cyan/60">Documentation</span>
              </div>
              {sidebar.map((section, i) => (
                <div key={i} className="mb-1">
                  <Link
                    to={section.href}
                    className={`block rounded-sm px-3 py-2 text-[13.5px] font-medium transition-colors ${
                      section.active
                        ? 'bg-cyber-cyan/[0.08] text-cyber-cyan border-l-2 border-cyber-cyan'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
                    }`}
                  >
                    {section.label}
                  </Link>
                  {section.children && (
                    <div className="ml-3 mt-0.5 space-y-0.5 border-l border-white/[0.06] pl-3">
                      {section.children.map((child, j) => (
                        <Link
                          key={j}
                          to={child.href}
                          className={`block rounded-sm px-2 py-1.5 text-[12.5px] transition-colors ${
                            child.active
                              ? 'text-cyber-cyan font-medium'
                              : 'text-white/40 hover:text-white/70'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Mobile sidebar toggle */}
          <div className="lg:hidden py-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="flex w-full items-center justify-between rounded-sm border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] font-medium text-white/60"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-cyber-cyan/60" />
                Documentation Menu
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSidebarOpen && (
              <nav className="mt-2 space-y-1 rounded-sm border border-white/[0.08] bg-white/[0.02] p-3">
                {sidebar.map((section, i) => (
                  <Link
                    key={i}
                    to={section.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`block rounded-sm px-3 py-2 text-[13px] ${
                      section.active ? 'text-cyber-cyan font-medium' : 'text-white/50'
                    }`}
                  >
                    {section.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* ═══ MAIN CONTENT ═══ */}
          <main className="min-w-0 py-8 lg:px-10">
            <h1 className="mb-2 text-[28px] font-bold text-white tracking-tight">{title}</h1>
            {lastUpdated && (
              <p className="mb-8 text-[13px] text-white/30">Last updated: {lastUpdated}</p>
            )}

            {/* Mobile TOC */}
            <div className="mb-8 xl:hidden">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="flex w-full items-center justify-between rounded-sm border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] font-medium text-white/60"
              >
                On this page
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileTocOpen && (
                <nav className="mt-2 space-y-0.5 rounded-sm border border-white/[0.08] bg-white/[0.02] p-3">
                  {toc.map(({ id, label, level }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className={`block rounded px-3 py-1.5 text-[12.5px] text-white/40 hover:text-white/70 ${(level ?? 0) > 0 ? 'ml-3' : ''}`}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            <div ref={contentRef} className="max-w-[800px]">
              {children}
            </div>
          </main>

          {/* ═══ RIGHT TOC (on this page) ═══ */}
          <aside className="hidden xl:block">
            <nav className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto py-8 pl-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">On this page</p>
              {toc.map(({ id, label, level }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block py-1.5 text-[12px] transition-colors ${
                    (level ?? 0) > 0 ? 'pl-3' : ''
                  } ${
                    activeSection === id
                      ? 'text-cyber-cyan font-medium'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
