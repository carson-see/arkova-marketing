/**
 * DocsPage — Google Cloud-style documentation hub landing page.
 * Card grid linking to all documentation sections.
 */

import { Link } from 'react-router-dom';
import { FileText, Shield, Code, ChevronRight, Cpu, Scale, Webhook, Zap, HelpCircle, Bot } from 'lucide-react';

const PRIMARY_DOCS = [
  {
    icon: FileText,
    title: 'Whitepaper',
    description: 'The Universal Verification Layer for Records, Credentials, and Asset Attestations. Full technical architecture, compliance alignment, competitive landscape, and product roadmap.',
    href: '/whitepaper',
    badge: 'v2.0',
  },
  {
    icon: Shield,
    title: 'Technical & Security Wiki',
    description: 'Architecture deep-dive for partners, investors, and integration teams. Security model, RLS policies, client-side processing boundary, and shared responsibility matrix.',
    href: '/wiki',
    badge: 'v1.0',
  },
];

const REFERENCE_DOCS = [
  {
    icon: Zap,
    title: 'Quickstart',
    description: 'Verify your first credential in 5 minutes. Step-by-step guide from account creation to API integration.',
    href: '/docs/quickstart',
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'Verification endpoints, authentication, rate limits, response schemas, and error codes.',
    href: '/docs/api',
  },
  {
    icon: Cpu,
    title: 'SDKs',
    description: 'Official TypeScript and Python SDKs with typed interfaces, retry logic, and full API coverage.',
    href: '/docs/sdks',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Real-time event delivery. HMAC signatures, retry policy, circuit breakers, and integration guide.',
    href: '/docs/webhooks',
  },
  {
    icon: Bot,
    title: 'MCP Server',
    description: 'Connect AI agents (Claude, GPT, custom) to Arkova for native tool-based credential verification.',
    href: '/docs/mcp',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Technical FAQ covering security, API, anchoring, AI features, billing, and common integration questions.',
    href: '/docs/faq',
  },
  {
    icon: Scale,
    title: 'Compliance & Terminology',
    description: 'GDPR, SOC 2, FERPA, eIDAS alignment. Enterprise terminology policy and credential type taxonomy.',
    href: '/wiki#terminology-compliance',
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="border-b border-white/[0.06] bg-cyber-bg-light/50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyber-cyan/60">
            Documentation
          </p>
          <h1 className="mb-4 text-[36px] font-bold text-white tracking-tight">
            Arkova Documentation
          </h1>
          <p className="max-w-2xl text-[16px] leading-relaxed text-white/75">
            Everything you need to understand Arkova's verification infrastructure — from architecture
            and security to API integration and compliance alignment.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Primary docs — large cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {PRIMARY_DOCS.map((doc) => {
            const Icon = doc.icon;
            return (
              <Link
                key={doc.title}
                to={doc.href}
                className="group relative rounded-sm border border-white/[0.06] bg-white/[0.015] p-7 transition-all hover:border-cyber-cyan/20 hover:bg-white/[0.03]"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-cyber-cyan/[0.08]">
                    <Icon className="h-5 w-5 text-cyber-cyan/70" />
                  </div>
                  {doc.badge && (
                    <span className="rounded-sm bg-cyber-cyan/[0.08] px-2 py-0.5 text-[11px] font-medium text-cyber-cyan/70">
                      {doc.badge}
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-[18px] font-semibold text-white group-hover:text-cyber-cyan transition-colors">
                  {doc.title}
                </h3>
                <p className="mb-5 text-[14px] leading-relaxed text-white/70">
                  {doc.description}
                </p>
                <span className="flex items-center gap-1 text-[13px] font-medium text-cyber-cyan/60 group-hover:text-cyber-cyan transition-colors">
                  Read document
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Reference docs — smaller cards */}
        <div className="mt-12 border-t border-white/[0.06] pt-12">
          <h2 className="mb-6 text-[20px] font-semibold text-white">Reference & Guides</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REFERENCE_DOCS.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link
                  key={doc.title}
                  to={doc.href}
                  className="group rounded-sm border border-white/[0.06] bg-white/[0.015] p-5 transition-all hover:border-cyber-cyan/20 hover:bg-white/[0.03]"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm bg-cyber-cyan/[0.06]">
                    <Icon className="h-4 w-4 text-cyber-cyan/60" />
                  </div>
                  <h3 className="mb-1.5 text-[15px] font-semibold text-white group-hover:text-cyber-cyan transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/70">
                    {doc.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-16 border-t border-white/[0.06] pt-12">
          <h2 className="mb-6 text-[20px] font-semibold text-white">Quick links</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'System Architecture', href: '/wiki#system-overview' },
              { label: 'Security & Privacy', href: '/wiki#security-privacy' },
              { label: 'Verification API', href: '/wiki#api-reference' },
              { label: 'Compliance Posture', href: '/wiki#terminology-compliance' },
              { label: 'AI Intelligence Suite', href: '/wiki#ai-intelligence' },
              { label: 'Developer Reference', href: '/wiki#developer-reference' },
              { label: 'Shared Responsibility', href: '/wiki#shared-responsibility' },
              { label: 'System Status', href: '/docs/status' },
              { label: 'Product Roadmap', href: '/roadmap' },
              { label: 'Contact Sales', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center gap-2 rounded-sm px-3 py-2.5 text-[13.5px] text-white/75 transition-colors hover:bg-white/[0.03] hover:text-cyber-cyan"
              >
                <ChevronRight className="h-3.5 w-3.5 text-white/20" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
