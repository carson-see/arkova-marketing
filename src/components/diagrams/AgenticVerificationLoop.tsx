/**
 * Agentic Verification Loop — circular flow diagram showing
 * AI Agent Acts → Fingerprinted → Anchored → Proof → Verify
 */
export default function AgenticVerificationLoop({ className = '' }: { className?: string }) {
  // 5 nodes positioned in a circle
  const nodes = [
    { x: 300, y: 40, label: 'AI Agent Acts', sub: 'Autonomous action triggered', icon: '⚡' },
    { x: 530, y: 155, label: 'Action Fingerprinted', sub: 'SHA-256 hash of action data', icon: '🔏' },
    { x: 460, y: 330, label: 'Anchored to Network', sub: 'OP_RETURN in block', icon: '🛡️' },
    { x: 140, y: 330, label: 'Proof Generated', sub: 'JSON proof + Merkle path', icon: '📋' },
    { x: 70, y: 155, label: 'Anyone Can Verify', sub: 'Public API or UI', icon: '🔍' },
  ];

  // Arrow paths between consecutive nodes (curved)
  const arrows = [
    'M 370,70 Q 480,60 500,120',
    'M 560,200 Q 570,280 490,320',
    'M 420,360 Q 300,390 180,360',
    'M 110,320 Q 30,280 50,200',
    'M 100,125 Q 150,50 260,45',
  ];

  return (
    <svg viewBox="0 0 620 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>Agentic Verification Loop</title>
      <desc>Circular diagram: AI Agent Acts, Action Fingerprinted, Anchored to Network, Proof Generated, Anyone Can Verify</desc>

      <defs>
        <marker id="arrow-agentic" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 3.5 L 0 7 z" fill="#82b8d0" />
        </marker>
      </defs>

      {/* Center label */}
      <text x="300" y="195" textAnchor="middle" fill="#303433" fontSize="13" fontWeight="600" fontFamily="inherit">
        Zero-Knowledge
      </text>
      <text x="300" y="213" textAnchor="middle" fill="#303433" fontSize="13" fontWeight="600" fontFamily="inherit">
        Audit Trail
      </text>

      {/* Arrows */}
      {arrows.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#82b8d0" strokeWidth="2" markerEnd="url(#arrow-agentic)" strokeLinecap="round" />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <rect
            x={node.x - 80}
            y={node.y}
            width="160"
            height="60"
            rx="12"
            fill="white"
            stroke="#82b8d0"
            strokeWidth="2"
          />
          <text x={node.x} y={node.y + 22} textAnchor="middle" fill="#303433" fontSize="12" fontWeight="600" fontFamily="inherit">
            {node.icon} {node.label}
          </text>
          <text x={node.x} y={node.y + 40} textAnchor="middle" fill="#4a4f4e" fontSize="10" fontFamily="inherit">
            {node.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
