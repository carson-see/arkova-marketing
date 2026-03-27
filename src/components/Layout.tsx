import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Linkedin,
  Twitter,
  Youtube,
  Menu,
  X,
  Search,
  ChevronDown,
  FileText,
  Shield,
  Code,
  BookOpen,
  Map,
  ArrowRight,
} from 'lucide-react';
import arkovaLogo from '/arkova-logo.png';

const HOME_SECTIONS = ['How It Works', 'Features', 'API', 'Use Cases', 'FAQ'];

/* ═══════════════════════════════════════════
   Search overlay
   ═══════════════════════════════════════════ */

const SEARCH_ITEMS = [
  { title: 'Whitepaper', description: 'Universal Verification Layer', href: '/whitepaper', category: 'Documents' },
  { title: 'Technical & Security Wiki', description: 'Architecture, security model, API reference', href: '/wiki', category: 'Documents' },
  { title: 'Documentation Hub', description: 'All documentation in one place', href: '/docs', category: 'Documents' },
  { title: 'Verification API', description: 'REST endpoints for credential verification', href: '/wiki#api-reference', category: 'API' },
  { title: 'Verification Response Schema', description: 'Frozen JSON response format', href: '/wiki#api-reference', category: 'API' },
  { title: 'Authentication', description: 'API keys, JWT, x402 payment auth', href: '/wiki#api-reference', category: 'API' },
  { title: 'Rate Limits', description: '100/min anonymous, 1,000/min API key', href: '/wiki#developer-reference', category: 'API' },
  { title: 'Security & Privacy', description: 'RLS, tenant isolation, audit trail', href: '/wiki#security-privacy', category: 'Architecture' },
  { title: 'Client-Side Processing', description: 'Documents never leave the device', href: '/wiki#security-privacy', category: 'Architecture' },
  { title: 'Non-Custodial Architecture', description: 'Document, financial, and key non-custody', href: '/wiki#system-overview', category: 'Architecture' },
  { title: 'AI Intelligence Suite', description: 'Extraction, search, fraud detection', href: '/wiki#ai-intelligence', category: 'Features' },
  { title: 'Compliance', description: 'SOX, ESIGN, eIDAS, FERPA, GDPR', href: '/wiki#terminology-compliance', category: 'Compliance' },
  { title: 'Webhooks', description: 'Event delivery, signatures, retry policy', href: '/wiki#developer-reference', category: 'API' },
  { title: 'Shared Responsibility', description: 'Partner integration responsibilities', href: '/wiki#shared-responsibility', category: 'Integration' },
  { title: 'Technology Stack', description: 'React, Supabase, Vite, Stripe, bitcoinjs-lib', href: '/wiki#developer-reference', category: 'Architecture' },
  { title: 'Roadmap', description: 'Three-phase product evolution', href: '/roadmap', category: 'Company' },
  { title: 'Research Articles', description: 'In-depth analysis and thought leadership', href: '/research', category: 'Company' },
  { title: 'Contact', description: 'Get in touch with the Arkova team', href: '/contact', category: 'Company' },
];

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Cmd+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!open) onClose(); // toggle handled by parent
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = query.length > 0
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS.slice(0, 8);

  const grouped = filtered.reduce<Record<string, typeof SEARCH_ITEMS>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleSelect = (href: string) => {
    onClose();
    navigate(href);
  };

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative mx-auto mt-20 max-w-2xl px-4" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden rounded-sm border border-white/[0.1] bg-cyber-bg shadow-2xl shadow-black/40">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
            <Search className="h-5 w-5 text-white/30" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/30 outline-none"
            />
            <kbd className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/25">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto py-2">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <p className="px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">
                  {category}
                </p>
                {items.map((item) => (
                  <button
                    key={item.href + item.title}
                    onClick={() => handleSelect(item.href)}
                    className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-cyber-cyan/[0.06]"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-white/70 truncate">{item.title}</p>
                      <p className="text-[12px] text-white/30 truncate">{item.description}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/15" />
                  </button>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="px-5 py-8 text-center text-[14px] text-white/30">
                No results for "{query}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Docs dropdown
   ═══════════════════════════════════════════ */

const DOCS_LINKS = [
  { icon: BookOpen, label: 'Documentation Hub', description: 'All docs in one place', href: '/docs' },
  { icon: FileText, label: 'Whitepaper', description: 'Technical whitepaper v2.0', href: '/whitepaper' },
  { icon: Shield, label: 'Technical Wiki', description: 'Architecture & security', href: '/wiki' },
  { icon: Code, label: 'API Reference', description: 'Endpoints & schemas', href: '/wiki#api-reference' },
  { icon: Map, label: 'Roadmap', description: 'Product evolution', href: '/roadmap' },
];

function DocsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-cyber-cyan ${
          open ? 'text-cyber-cyan' : 'text-white/50'
        }`}
      >
        Docs
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-sm border border-white/[0.08] bg-cyber-bg shadow-xl shadow-black/30">
          <div className="p-2">
            {DOCS_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-cyber-cyan/[0.06]"
                >
                  <Icon className="h-4 w-4 shrink-0 text-cyber-cyan/50" />
                  <div>
                    <p className="text-[13px] font-medium text-white/70">{link.label}</p>
                    <p className="text-[11.5px] text-white/30">{link.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Layout
   ═══════════════════════════════════════════ */

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Cmd+K opens search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (label: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      scrollTo(label.toLowerCase().replace(/\s+/g, '-'));
    } else {
      window.location.href = '/#' + label.toLowerCase().replace(/\s+/g, '-');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-white font-sans">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-cyan-border bg-cyber-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={arkovaLogo} alt="Arkova" className="h-10 w-auto brightness-150 contrast-90" />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {HOME_SECTIONS.map((label) => (
              <button
                key={label}
                onClick={() => handleNavClick(label)}
                className="text-sm font-medium text-white/50 transition-colors hover:text-cyber-cyan"
              >
                {label}
              </button>
            ))}
            <Link
              to="/research"
              className={`text-sm font-medium transition-colors hover:text-cyber-cyan ${
                location.pathname.startsWith('/research') ? 'text-cyber-cyan' : 'text-white/50'
              }`}
            >
              Research
            </Link>
            <DocsDropdown />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-sm border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[13px] text-white/30 transition-colors hover:border-white/[0.15] hover:text-white/50"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="ml-2 rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/20">
                ⌘K
              </kbd>
            </button>
            <a
              href="https://app.arkova.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/50 transition-colors hover:text-cyber-cyan"
            >
              App
            </a>
            {isHome ? (
              <button onClick={() => scrollTo('early-access')} className="cyber-btn">
                Request Early Access
              </button>
            ) : (
              <Link to="/#early-access" className="cyber-btn inline-block">
                Request Early Access
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white/40"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-cyber-cyan-border bg-cyber-bg px-6 py-4 md:hidden">
            {HOME_SECTIONS.map((label) => (
              <button
                key={label}
                onClick={() => handleNavClick(label)}
                className="block w-full py-3 text-left text-sm font-medium text-white/50"
              >
                {label}
              </button>
            ))}
            <Link
              to="/research"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-left text-sm font-medium text-white/50"
            >
              Research
            </Link>

            {/* Mobile docs section */}
            <div className="border-t border-white/[0.06] mt-2 pt-2">
              <p className="py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyber-cyan/50">
                Documentation
              </p>
              <Link
                to="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-left text-sm font-medium text-white/50"
              >
                Docs Hub
              </Link>
              <Link
                to="/whitepaper"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-left text-sm font-medium text-white/50"
              >
                Whitepaper
              </Link>
              <Link
                to="/wiki"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-left text-sm font-medium text-white/50"
              >
                Technical Wiki
              </Link>
              <Link
                to="/roadmap"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-left text-sm font-medium text-white/50"
              >
                Roadmap
              </Link>
            </div>

            <a
              href="https://app.arkova.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-left text-sm font-medium text-white/50"
            >
              App
            </a>
            <Link
              to={isHome ? '#early-access' : '/#early-access'}
              onClick={() => {
                setMobileMenuOpen(false);
                if (isHome) scrollTo('early-access');
              }}
              className="mt-3 block cyber-btn text-center"
            >
              Request Early Access
            </Link>
          </div>
        )}
      </nav>

      {/* ═══ SEARCH OVERLAY ═══ */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ═══ CONTENT ═══ */}
      {children}

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-cyber-cyan-border bg-cyber-bg-light px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link to="/" className="mb-4 flex items-center gap-2.5">
                <img src={arkovaLogo} alt="Arkova" className="h-10 w-auto brightness-150 contrast-90" />
              </Link>
              <p className="text-sm text-white/40">
                Tamper-proof document verification. Privacy-first. Independently verifiable.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.linkedin.com/company/arkovatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors hover:bg-cyber-cyan/10 hover:text-cyber-cyan"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/arkovatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors hover:bg-cyber-cyan/10 hover:text-cyber-cyan"
                  aria-label="X / Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCTTDFFSLxl85omCeJ9DBvrg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors hover:bg-cyber-cyan/10 hover:text-cyber-cyan"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-cyber-cyan">
                Product
              </h4>
              <ul className="space-y-2.5">
                {['How It Works', 'Features', 'API', 'Use Cases'].map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => handleNavClick(label)}
                      className="text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-cyber-cyan">
                Documentation
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/docs" className="text-sm text-white/40 transition-colors hover:text-white">
                    Docs Hub
                  </Link>
                </li>
                <li>
                  <Link to="/whitepaper" className="text-sm text-white/40 transition-colors hover:text-white">
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link to="/wiki" className="text-sm text-white/40 transition-colors hover:text-white">
                    Technical Wiki
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="text-sm text-white/40 transition-colors hover:text-white">
                    Research
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="text-sm text-white/40 transition-colors hover:text-white">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-cyber-cyan">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/contact" className="text-sm text-white/40 transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:careers@arkova.ai"
                    className="text-sm text-white/40 transition-colors hover:text-white"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-white/40 transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-white/40 transition-colors hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-cyber-cyan-border pt-8 text-center text-xs text-white/20">
            &copy; {new Date().getFullYear()} Arkova. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
