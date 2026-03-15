/**
 * The Convergence Stack — 5 horizontal layers stacked vertically,
 * widest at bottom (trust), narrowest at top (application).
 */
export default function ConvergenceStack({ className = '' }: { className?: string }) {
  const layers = [
    { w: 480, label: 'Application Layer', sub: 'Credential management · Verification API · Embeddable widgets', fill: '#82b8d0', text: 'white' },
    { w: 420, label: 'AI Intelligence Layer', sub: 'Document classification · Metadata extraction · Anomaly detection', fill: '#a8d1e2', text: '#303433' },
    { w: 360, label: 'Privacy-Preserving Processing', sub: 'Client-side fingerprinting · Zero document exposure · PII stripping', fill: '#c5dfe9', text: '#303433' },
    { w: 300, label: 'Cryptographic Anchoring', sub: 'OP_RETURN embedding · SHA-256 fingerprints · Merkle proofs', fill: '#dbeaf1', text: '#303433' },
    { w: 240, label: 'Global Timestamp Network', sub: '900+ EH/s · No single point of failure · 16+ years uptime', fill: '#edf5f9', text: '#303433' },
  ];

  // Reverse so widest draws first (bottom)
  const reversed = [...layers].reverse();
  const gap = 12;
  const layerH = 64;
  const totalH = reversed.length * (layerH + gap) - gap;
  const startY = 40;

  return (
    <svg viewBox="0 0 560 420" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>The Convergence Stack</title>
      <desc>Five-layer architecture: Global Timestamp Network, Cryptographic Anchoring, Privacy Processing, AI Intelligence, Application Layer</desc>

      {reversed.map((layer, i) => {
        const y = startY + i * (layerH + gap);
        const x = (560 - layer.w) / 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={layer.w} height={layerH} rx="10" fill={layer.fill} stroke="#82b8d0" strokeWidth="1.5" />
            <text x={280} y={y + 24} textAnchor="middle" fill={layer.text} fontSize="13" fontWeight="700" fontFamily="inherit">
              {layer.label}
            </text>
            <text x={280} y={y + 44} textAnchor="middle" fill={layer.text === 'white' ? 'rgba(255,255,255,0.8)' : '#4a4f4e'} fontSize="10" fontFamily="inherit">
              {layer.sub}
            </text>
          </g>
        );
      })}

      {/* Side labels */}
      <text x="18" y={startY + totalH / 2 - 8} textAnchor="middle" fill="#4a4f4e" fontSize="10" fontWeight="600" fontFamily="inherit" transform={`rotate(-90, 18, ${startY + totalH / 2})`}>
        TRUST INCREASES ↓
      </text>
      <text x="542" y={startY + totalH / 2 + 8} textAnchor="middle" fill="#4a4f4e" fontSize="10" fontWeight="600" fontFamily="inherit" transform={`rotate(90, 542, ${startY + totalH / 2})`}>
        FLEXIBILITY INCREASES ↑
      </text>
    </svg>
  );
}
