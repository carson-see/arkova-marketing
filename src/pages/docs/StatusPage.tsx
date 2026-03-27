import DocLayout, {
  DocH2,
  DocP,
  DocTable,
  DocCallout,
  DocCode,
  DocUl,
  DocLi,
  DocStrong,
} from '../../components/DocLayout';
import type { TocItem, SidebarSection } from '../../components/DocLayout';

const tocItems: TocItem[] = [
  { id: 'current-status', label: '1. Current Status' },
  { id: 'infrastructure', label: '2. Infrastructure' },
  { id: 'sla', label: '3. SLA' },
  { id: 'incident-response', label: '4. Incident Response' },
];

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Technical Wiki', href: '/wiki' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'SDKs', href: '/docs/sdks' },
  { label: 'Webhooks', href: '/docs/webhooks' },
  { label: 'MCP Server', href: '/docs/mcp' },
  { label: 'FAQ', href: '/docs/faq' },
  { label: 'Status', href: '/docs/status', active: true },
];

const breadcrumbs = [
  { label: 'Docs', href: '/docs' },
  { label: 'Status' },
];

export default function StatusPage() {
  return (
    <DocLayout
      title="System Status"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
    >
      {/* ═══ 1. Current Status ═══ */}
      <DocH2 id="current-status">1. Current Status</DocH2>

      <DocCallout type="tip">
        All systems operational. For real-time status updates, monitor the endpoints below.
      </DocCallout>

      <DocTable
        headers={['Service', 'Status', 'Endpoint']}
        rows={[
          ['Frontend (app.arkova.ai)', '<span class="text-emerald-400">Operational</span>', 'Vercel CDN'],
          ['Worker API', '<span class="text-emerald-400">Operational</span>', 'Google Cloud Run'],
          ['Database', '<span class="text-emerald-400">Operational</span>', 'Supabase (managed Postgres)'],
          ['Network Anchoring', '<span class="text-emerald-400">Operational</span>', 'Production network'],
          ['Search (search.arkova.ai)', '<span class="text-emerald-400">Operational</span>', 'Vercel'],
          ['MCP Server (edge.arkova.ai)', '<span class="text-emerald-400">Operational</span>', 'Cloudflare Workers'],
        ]}
      />

      <DocP>
        Health check endpoint: <DocCode>GET /api/v1/health</DocCode> — always available regardless
        of feature flags.
      </DocP>

      {/* ═══ 2. Infrastructure ═══ */}
      <DocH2 id="infrastructure">2. Infrastructure</DocH2>

      <DocTable
        headers={['Component', 'Provider', 'Region']}
        rows={[
          ['Frontend', 'Vercel CDN', 'Global edge'],
          ['Worker', 'Google Cloud Run', 'us-central1'],
          ['Database', 'Supabase', 'us-east-1'],
          ['Edge compute', 'Cloudflare Workers', 'Global edge'],
          ['Network RPC', 'Mempool.space + Blockstream (fallback)', 'Global'],
          ['Payments', 'Stripe', 'Global'],
        ]}
      />

      {/* ═══ 3. SLA ═══ */}
      <DocH2 id="sla">3. SLA</DocH2>

      <DocP>
        Arkova targets <DocStrong>99.9% uptime</DocStrong> for the Verification API and frontend
        services.
      </DocP>

      <DocUl>
        <DocLi>Worker services auto-scale on Cloud Run (1GB, max 3 instances)</DocLi>
        <DocLi>Database circuit breakers protect against cascading failures</DocLi>
      </DocUl>

      <DocCallout type="note">
        Enterprise customers can negotiate custom SLAs. Contact sales@arkova.ai.
      </DocCallout>

      {/* ═══ 4. Incident Response ═══ */}
      <DocH2 id="incident-response">4. Incident Response</DocH2>

      <DocP>
        Documented incident response procedures in compliance with SOC 2 CC7.2.
      </DocP>

      <DocUl>
        <DocLi>
          <DocStrong>Severity levels:</DocStrong> P1 (service down), P2 (degraded), P3
          (non-critical)
        </DocLi>
        <DocLi>
          <DocStrong>Response times:</DocStrong> P1 &lt; 15 minutes, P2 &lt; 1 hour, P3 &lt; 24
          hours
        </DocLi>
        <DocLi>Post-incident reviews published for P1/P2 incidents</DocLi>
        <DocLi>
          Contact for urgent issues: <DocStrong>support@arkova.ai</DocStrong>
        </DocLi>
      </DocUl>
    </DocLayout>
  );
}
