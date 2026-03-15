/**
 * Government Middleware — hub-and-spoke diagram showing Arkova
 * as verification infrastructure connecting government agencies.
 */
export default function GovernmentMiddleware({ className = '' }: { className?: string }) {
  const spokes = [
    { label: 'State Licensing', fill: '#ede9fe', angle: 0 },
    { label: 'Universities', fill: '#dbeafe', angle: 60 },
    { label: 'Courts & Legal', fill: '#fef3c7', angle: 120 },
    { label: 'Vital Records', fill: '#fee2e2', angle: 180 },
    { label: 'Professional Certs', fill: '#d1fae5', angle: 240 },
    { label: 'Employers', fill: '#f3f4f6', angle: 300 },
  ];

  const cx = 320;
  const cy = 220;
  const hubR = 55;
  const spokeR = 170;
  const spokeW = 120;
  const spokeH = 42;

  return (
    <svg viewBox="0 0 640 460" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>Arkova as Government Middleware</title>
      <desc>Hub-and-spoke: Arkova verification infrastructure connecting licensing boards, universities, courts, vital records, professional certs, and employers</desc>

      <defs>
        <filter id="hub-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>
      </defs>

      {/* Spoke lines + nodes */}
      {spokes.map((spoke, i) => {
        const rad = (spoke.angle - 90) * (Math.PI / 180);
        const sx = cx + Math.cos(rad) * spokeR;
        const sy = cy + Math.sin(rad) * spokeR;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="#82b8d0" strokeWidth="1.5" />
            <rect
              x={sx - spokeW / 2}
              y={sy - spokeH / 2}
              width={spokeW}
              height={spokeH}
              rx={10}
              fill={spoke.fill}
              stroke="#82b8d0"
              strokeWidth="1"
            />
            <text x={sx} y={sy + 4} textAnchor="middle" fill="#303433" fontSize="11" fontWeight="600" fontFamily="inherit">
              {spoke.label}
            </text>
          </g>
        );
      })}

      {/* Hub glow */}
      <circle cx={cx} cy={cy} r={hubR + 12} fill="#82b8d0" opacity="0.1" filter="url(#hub-glow)" />

      {/* Hub circle */}
      <circle cx={cx} cy={cy} r={hubR} fill="#82b8d0" stroke="#5496ba" strokeWidth="2" />
      <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="inherit">
        Verification
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="inherit">
        Infrastructure
      </text>
      <text x={cx} y={cy + 24} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="inherit">
        ARKOVA
      </text>

      {/* Bottom tagline */}
      <text x={cx} y={440} textAnchor="middle" fill="#4a4f4e" fontSize="12" fontWeight="600" fontFamily="inherit" fontStyle="italic">
        Issue once. Verify anywhere. Trust the math.
      </text>
    </svg>
  );
}
