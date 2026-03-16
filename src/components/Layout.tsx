import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Linkedin,
  Twitter,
  Youtube,
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react';
import arkovaLogo from '/arkova-logo.png';

/* ─── Dark mode hook ─── */
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('arkova-theme');
    if (stored) return stored === 'dark';
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('arkova-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark(!dark) };
}

const HOME_SECTIONS = ['How It Works', 'Features', 'API', 'Use Cases', 'FAQ'];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dark, toggle: toggleDark } = useDarkMode();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Scroll to top on route change — instant, no smooth scroll
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
      window.location.href = '/#' + label.toLowerCase().replace(/\s+/g, '-');
    }
  };

  return (
    <div className="min-h-screen bg-arkova-mist dark:bg-arkova-charcoal font-sans transition-colors duration-300">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-arkova-ice/60 dark:border-white/5 bg-arkova-mist/80 dark:bg-arkova-charcoal/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={arkovaLogo} alt="Arkova" className="h-10 w-auto dark:brightness-150 dark:contrast-90" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {HOME_SECTIONS.map((label) => (
              <button
                key={label}
                onClick={() => handleNavClick(label)}
                className="text-sm font-medium text-arkova-slate dark:text-arkova-steel-light/70 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
              >
                {label}
              </button>
            ))}
            <Link
              to="/research"
              className={`text-sm font-medium transition-colors hover:text-arkova-charcoal dark:hover:text-white ${
                location.pathname.startsWith('/research')
                  ? 'text-arkova-steel dark:text-white'
                  : 'text-arkova-slate dark:text-arkova-steel-light/70'
              }`}
            >
              Research
            </Link>
            <Link
              to="/whitepaper"
              className={`text-sm font-medium transition-colors hover:text-arkova-charcoal dark:hover:text-white ${
                location.pathname === '/whitepaper'
                  ? 'text-arkova-steel dark:text-white'
                  : 'text-arkova-slate dark:text-arkova-steel-light/70'
              }`}
            >
              Whitepaper
            </Link>
            <Link
              to="/roadmap"
              className={`text-sm font-medium transition-colors hover:text-arkova-charcoal dark:hover:text-white ${
                location.pathname === '/roadmap'
                  ? 'text-arkova-steel dark:text-white'
                  : 'text-arkova-slate dark:text-arkova-steel-light/70'
              }`}
            >
              Roadmap
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-frost dark:hover:bg-white/5"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {isHome ? (
              <button
                onClick={() => scrollTo('early-access')}
                className="rounded-lg bg-arkova-steel px-5 py-2 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-arkova-deep hover:shadow-glow-md"
              >
                Request Early Access
              </button>
            ) : (
              <Link
                to="/#early-access"
                className="rounded-lg bg-arkova-steel px-5 py-2 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-arkova-deep hover:shadow-glow-md"
              >
                Request Early Access
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-arkova-slate dark:text-arkova-steel-light/60"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="text-arkova-charcoal dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-arkova-ice/60 dark:border-white/5 bg-arkova-mist dark:bg-arkova-charcoal px-6 py-4 md:hidden">
            {HOME_SECTIONS.map((label) => (
              <button
                key={label}
                onClick={() => handleNavClick(label)}
                className="block w-full py-3 text-left text-sm font-medium text-arkova-slate dark:text-arkova-steel-light/70"
              >
                {label}
              </button>
            ))}
            <Link
              to="/research"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-left text-sm font-medium text-arkova-slate dark:text-arkova-steel-light/70"
            >
              Research
            </Link>
            <Link
              to={isHome ? '#early-access' : '/#early-access'}
              onClick={() => { setMobileMenuOpen(false); if (isHome) scrollTo('early-access'); }}
              className="mt-3 block rounded-lg bg-arkova-steel px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Request Early Access
            </Link>
          </div>
        )}
      </nav>

      {/* ═══ CONTENT ═══ */}
      {children}

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-arkova-ice/60 dark:border-white/5 bg-arkova-frost dark:bg-arkova-charcoal px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link to="/" className="mb-4 flex items-center gap-2.5">
                <img src={arkovaLogo} alt="Arkova" className="h-10 w-auto dark:brightness-150 dark:contrast-90" />
              </Link>
              <p className="text-sm text-arkova-slate dark:text-arkova-steel-light/50">
                Tamper-proof document verification. Privacy-first. Independently verifiable.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.linkedin.com/company/arkovatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10 hover:text-arkova-charcoal dark:hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/arkovatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10 hover:text-arkova-charcoal dark:hover:text-white"
                  aria-label="X / Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCTTDFFSLxl85omCeJ9DBvrg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-arkova-frost dark:bg-white/5 text-arkova-slate dark:text-arkova-steel-light/60 transition-colors hover:bg-arkova-ice dark:hover:bg-white/10 hover:text-arkova-charcoal dark:hover:text-white"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal dark:text-white">
                Product
              </h4>
              <ul className="space-y-2.5">
                {['How It Works', 'Features', 'API', 'Use Cases'].map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => handleNavClick(label)}
                      className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal dark:text-white">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/research"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Research
                  </Link>
                </li>
                <li>
                  <Link
                    to="/whitepaper"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roadmap"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:careers@arkova.ai"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-arkova-charcoal dark:text-white">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-arkova-slate dark:text-arkova-steel-light/50 transition-colors hover:text-arkova-charcoal dark:hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-arkova-ice/60 dark:border-white/5 pt-8 text-center text-xs text-arkova-slate/60 dark:text-arkova-steel-light/30">
            &copy; {new Date().getFullYear()} Arkova All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
