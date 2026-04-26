import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from 'lucide-react';
import arkovaLogo from '/arkova-logo.png';

const HOME_SECTIONS = ['How It Works', 'Features', 'API', 'Use Cases', 'FAQ'];

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
          open ? 'text-cyber-cyan' : 'text-white/75'
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
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (label: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      scrollTo(label.toLowerCase().replace(/\s+/g, '-'));
    } else {
      window.location.assign('/#' + label.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-white font-sans">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-cyan-border bg-cyber-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={arkovaLogo} alt="Arkova compliance audit automation platform logo" width={120} height={40} className="h-10 w-auto brightness-150 contrast-90" />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {HOME_SECTIONS.map((label) => (
              <button
                key={label}
                onClick={() => handleNavClick(label)}
                className="text-sm font-medium text-white/75 transition-colors hover:text-cyber-cyan"
              >
                {label}
              </button>
            ))}
            <Link
              to="/research"
              className={`text-sm font-medium transition-colors hover:text-cyber-cyan ${
                location.pathname.startsWith('/research') ? 'text-cyber-cyan' : 'text-white/75'
              }`}
            >
              Research
            </Link>
            <DocsDropdown />
            <a
              href="https://search.arkova.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/75 transition-colors hover:text-cyber-cyan"
            >
              Search
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://app.arkova.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/75 transition-colors hover:text-cyber-cyan"
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
            <a
              href="https://search.arkova.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/70"
              aria-label="Search"
            >
              <Search size={20} />
            </a>
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
                className="block w-full py-3 text-left text-sm font-medium text-white/75"
              >
                {label}
              </button>
            ))}
            <Link
              to="/research"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-left text-sm font-medium text-white/75"
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
                className="block w-full py-2.5 text-left text-sm font-medium text-white/75"
              >
                Docs Hub
              </Link>
              <Link
                to="/whitepaper"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-left text-sm font-medium text-white/75"
              >
                Whitepaper
              </Link>
              <Link
                to="/wiki"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-left text-sm font-medium text-white/75"
              >
                Technical Wiki
              </Link>
              <Link
                to="/roadmap"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-left text-sm font-medium text-white/75"
              >
                Roadmap
              </Link>
            </div>

            <a
              href="https://app.arkova.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-left text-sm font-medium text-white/75"
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

      {/* ═══ CONTENT ═══ */}
      {children}

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-cyber-cyan-border bg-cyber-bg-light px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link to="/" className="mb-4 flex items-center gap-2.5">
                <img src={arkovaLogo} alt="Arkova compliance audit automation platform logo" width={120} height={40} className="h-10 w-auto brightness-150 contrast-90" />
              </Link>
              <p className="text-sm text-white/70">
                Compliance audit automation. 14 regulatory frameworks. Privacy-first. Cryptographically anchored.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.linkedin.com/company/arkovatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-colors hover:bg-cyber-cyan/10 hover:text-cyber-cyan"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/arkovatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-colors hover:bg-cyber-cyan/10 hover:text-cyber-cyan"
                  aria-label="X / Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCTTDFFSLxl85omCeJ9DBvrg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-colors hover:bg-cyber-cyan/10 hover:text-cyber-cyan"
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
              <ul className="space-y-0.5">
                {['How It Works', 'Features', 'API', 'Use Cases'].map((label) => (
                  <li key={label}>
                    <a
                      href={`/#${label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(e) => { if (isHome) { e.preventDefault(); handleNavClick(label); } }}
                      className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-cyber-cyan">
                Documentation
              </h4>
              <ul className="space-y-0.5">
                <li>
                  <Link to="/docs" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
                    Docs Hub
                  </Link>
                </li>
                <li>
                  <Link to="/whitepaper" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link to="/wiki" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
                    Technical Wiki
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
                    Research
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-cyber-cyan">
                Company
              </h4>
              <ul className="space-y-0.5">
                <li>
                  <Link to="/contact" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:careers@arkova.ai"
                    className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <Link to="/privacy" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white">
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
