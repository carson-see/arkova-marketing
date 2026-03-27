import DocLayout, {
  DocH2,
  DocH3,
  DocP,
  DocUl,
  DocLi,
  DocStrong,
  DocCodeBlock,
  DocTable,
  DocCallout,
} from '../../components/DocLayout';
import type { TocItem, SidebarSection } from '../../components/DocLayout';

const tocItems: TocItem[] = [
  { id: 'overview', label: '1. Overview' },
  { id: 'available-tools', label: '2. Available Tools' },
  { id: 'configuration', label: '3. Configuration' },
  { id: 'examples', label: '4. Examples' },
  { id: 'authentication', label: '5. Authentication' },
];

const sidebarSections: SidebarSection[] = [
  { label: 'Docs Home', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Technical Wiki', href: '/wiki' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'SDKs', href: '/docs/sdks' },
  { label: 'Webhooks', href: '/docs/webhooks' },
  { label: 'MCP Server', href: '/docs/mcp', active: true },
  { label: 'FAQ', href: '/docs/faq' },
];

const breadcrumbs = [
  { label: 'Docs', href: '/docs' },
  { label: 'MCP Server' },
];

export default function McpPage() {
  return (
    <DocLayout
      title="MCP Server"
      breadcrumbs={breadcrumbs}
      toc={tocItems}
      sidebar={sidebarSections}
      lastUpdated="March 27, 2026"
    >
      {/* ── 1. Overview ── */}
      <DocH2 id="overview">1. Overview</DocH2>
      <DocP>
        Arkova exposes a Model Context Protocol (MCP) server so AI agents can interact with the credential
        verification network using native tool calls.
      </DocP>
      <DocUl>
        <DocLi>Compatible with <DocStrong>Claude, GPT, custom LLM agents</DocStrong>, and any MCP-compatible client</DocLi>
        <DocLi>Streamable HTTP transport on Cloudflare Workers</DocLi>
      </DocUl>
      <DocCallout type="tip">
        MCP enables AI agents to verify credentials as native tool calls — no REST API parsing needed.
      </DocCallout>

      {/* ── 2. Available Tools ── */}
      <DocH2 id="available-tools">2. Available Tools</DocH2>
      <DocTable
        headers={['Tool', 'Description', 'Auth']}
        rows={[
          ['<code>verify_credential</code>', 'Verify a credential by public ID. Returns the frozen verification schema.', 'API key or OAuth 2.0'],
          ['<code>search_credentials</code>', 'Semantic search across verified credentials using natural language.', 'API key or OAuth 2.0'],
        ]}
      />

      <DocH3>Example Tool Call</DocH3>
      <DocCodeBlock language="json">{`{
  "tool": "verify_credential",
  "arguments": {
    "public_id": "ARK-2026-00091"
  }
}`}</DocCodeBlock>

      <DocH3>Example Response</DocH3>
      <DocCodeBlock language="json">{`{
  "verified": true,
  "status": "ACTIVE",
  "issuer_name": "University of Michigan",
  "credential_type": "DIPLOMA",
  "anchor_timestamp": "2026-03-10T08:00:00Z",
  "bitcoin_block": 204567
}`}</DocCodeBlock>

      {/* ── 3. Configuration ── */}
      <DocH2 id="configuration">3. Configuration</DocH2>

      <DocH3>Claude Desktop</DocH3>
      <DocCodeBlock language="json">{`{
  "mcpServers": {
    "arkova": {
      "url": "https://edge.arkova.ai/mcp",
      "headers": {
        "Authorization": "Bearer ak_live_your_key"
      }
    }
  }
}`}</DocCodeBlock>

      <DocH3>Claude Code</DocH3>
      <DocCodeBlock language="bash">{`claude mcp add arkova \\
  --transport http \\
  --url https://edge.arkova.ai/mcp \\
  --header "Authorization: Bearer ak_live_your_key"`}</DocCodeBlock>

      <DocH3>Custom Agents</DocH3>
      <DocCodeBlock language="typescript">{`import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const transport = new StreamableHTTPClientTransport(
  new URL('https://edge.arkova.ai/mcp'),
  { requestInit: { headers: { Authorization: 'Bearer ak_live_...' } } }
);

const client = new Client({ name: 'my-agent', version: '1.0' });
await client.connect(transport);

const result = await client.callTool({
  name: 'verify_credential',
  arguments: { public_id: 'ARK-2026-00091' },
});`}</DocCodeBlock>

      {/* ── 4. Examples ── */}
      <DocH2 id="examples">4. Examples</DocH2>

      <DocH3>Agent-to-Agent Trust</DocH3>
      <DocP>
        Agent A presents a verified record to Agent B. Both agents independently verify against the public
        ledger — no central intermediary needed.
      </DocP>
      <DocCodeBlock language="typescript">{`// Agent A: Issue and share
const anchor = await arkova.anchor({ fingerprint, label, credentialType: 'DIPLOMA' });
const shareableId = anchor.public_id; // "ARK-2026-00091"

// Agent B: Independently verify
const verification = await mcpClient.callTool({
  name: 'verify_credential',
  arguments: { public_id: shareableId },
});
// verification.verified === true — trusted without intermediary`}</DocCodeBlock>

      <DocH3>Semantic Search</DocH3>
      <DocCodeBlock language="text">{`User: "Find all computer science degrees from Big Ten universities issued after 2024"

Agent calls: search_credentials({ query: "computer science degrees Big Ten 2024" })

Returns: Ranked results with verification status, issuers, and timestamps`}</DocCodeBlock>

      {/* ── 5. Authentication ── */}
      <DocH2 id="authentication">5. Authentication</DocH2>
      <DocP>
        Dual authentication is supported: <DocStrong>OAuth 2.0</DocStrong> and <DocStrong>API key</DocStrong> (Bearer token).
      </DocP>
      <DocCallout type="note">
        Every MCP tool call is logged with timestamp, querying agent ID, and result — creating a defensible
        audit trail for regulated industries.
      </DocCallout>
      <DocUl>
        <DocLi>Rate limits apply: same as REST API (<DocStrong>1,000 req/min</DocStrong> per API key)</DocLi>
      </DocUl>
    </DocLayout>
  );
}
