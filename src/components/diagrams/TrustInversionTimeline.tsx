/**
 * Trust Inversion Timeline — horizontal timeline with 4 eras
 * showing the shift from institutional trust to mathematical verification.
 */
export default function TrustInversionTimeline({ className = '' }: { className?: string }) {
  const eras = [
    {
      x: 100, year: '1990s–2010s', label: 'Trust the Institution',
      desc: 'Paper certificates, notary stamps, phone call verification',
      fill: '#9ca3af', r: 10,
    },
    {
      x: 290, year: '2010s–2020s', label: 'Trust the Platform',
      desc: 'Digital records, database logs, API-based verification',
      fill: '#9ca3af', r: 10,
    },
    {
      x: 480, year: '2020s', label: 'Trust the Math',
      desc: 'Cryptographic fingerprints, network anchoring, mathematical proof',
      fill: '#f59e0b', r: 14, glow: true,
    },
    {
      x: 670, year: '2025+', label: 'Verify Everything',
      desc: 'Agentic verification, MCP tool calls, zero-trust audit trails',
      fill: '#82b8d0', r: 10,
    },
  ];

  return (
    <svg viewBox="0 0 780 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>Trust Inversion Timeline</title>
      <desc>Timeline: Trust the Institution, Trust the Platform, Trust the Math (inflection), Verify Everything</desc>

      <defs>
        <filter id="amber-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
        <marker id="arrow-timeline" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 3.5 L 0 7 z" fill="#82b8d0" />
        </marker>
      </defs>

      {/* Timeline line */}
      <line x1="60" y1="130" x2="730" y2="130" stroke="#dbeaf1" strokeWidth="2" markerEnd="url(#arrow-timeline)" />

      {eras.map((era, i) => (
        <g key={i}>
          {/* Glow for inflection point */}
          {era.glow && (
            <circle cx={era.x} cy={130} r={24} fill="#f59e0b" opacity="0.15" filter="url(#amber-glow)" />
          )}

          {/* Node */}
          <circle cx={era.x} cy={130} r={era.r} fill={era.fill} />

          {/* Year label */}
          <text x={era.x} y={100} textAnchor="middle" fill="#4a4f4e" fontSize="11" fontFamily="inherit" fontWeight="500">
            {era.year}
          </text>

          {/* Era label */}
          <text x={era.x} y={165} textAnchor="middle" fill="#303433" fontSize="13" fontWeight="700" fontFamily="inherit">
            {era.label}
          </text>

          {/* Description — wrap into 2 lines */}
          {era.desc.split(', ').reduce<string[][]>((acc, part, idx) => {
            const lineIdx = idx < 2 ? 0 : 1;
            if (!acc[lineIdx]) acc[lineIdx] = [];
            acc[lineIdx].push(part);
            return acc;
          }, []).map((line, li) => (
            <text key={li} x={era.x} y={185 + li * 15} textAnchor="middle" fill="#4a4f4e" fontSize="10" fontFamily="inherit">
              {line.join(', ')}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}
