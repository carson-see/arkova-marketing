import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Linkedin,
  Twitter,
  Youtube,
  Menu,
  X,
} from 'lucide-react';
import arkovaLogo from '/arkova-logo.png';

const HOME_SECTIONS = ['How It Works', 'Features', 'API', 'Use Cases', 'FAQ'];

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

          <div className="hidden items-center gap-8 md:flex">
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
                location.pathname.startsWith('/research')
                  ? 'text-cyber-cyan'
                  : 'text-white/50'
              }`}
            >
              Research
            </Link>
            <Link
              to="/whitepaper"
              className={`text-sm font-medium transition-colors hover:text-cyber-cyan ${
                location.pathname === '/whitepaper'
                  ? 'text-cyber-cyan'
                  : 'text-white/50'
              }`}
            >
              Whitepaper
            </Link>
            <Link
              to="/roadmap"
              className={`text-sm font-medium transition-colors hover:text-cyber-cyan ${
                location.pathname === '/roadmap'
                  ? 'text-cyber-cyan'
                  : 'text-white/50'
              }`}
            >
              Roadmap
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isHome ? (
              <button
                onClick={() => scrollTo('early-access')}
                className="cyber-btn"
              >
                Request Early Access
              </button>
            ) : (
              <Link
                to="/#early-access"
                className="cyber-btn inline-block"
              >
                Request Early Access
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
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
            <Link
              to="/whitepaper"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-left text-sm font-medium text-white/50"
            >
              Whitepaper
            </Link>
            <Link
              to="/roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-left text-sm font-medium text-white/50"
            >
              Roadmap
            </Link>
            <Link
              to={isHome ? '#early-access' : '/#early-access'}
              onClick={() => { setMobileMenuOpen(false); if (isHome) scrollTo('early-access'); }}
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
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/research" className="text-sm text-white/40 transition-colors hover:text-white">
                    Research
                  </Link>
                </li>
                <li>
                  <Link to="/whitepaper" className="text-sm text-white/40 transition-colors hover:text-white">
                    Whitepaper
                  </Link>
                </li>
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
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-cyber-cyan">
                Legal
              </h4>
              <ul className="space-y-2.5">
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
