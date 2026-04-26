/**
 * Compliance Framework Explosion — side-by-side stacks comparing the
 * compliance footprint a global enterprise carried in 2018 vs 2026.
 * Same vendor-controlled substrate underneath both. The 2026 stack is
 * roughly 3x taller. Amber highlights frameworks added since 2020.
 */
export default function ComplianceFrameworkExplosion({ className = '' }: { className?: string }) {
  const PRE = '#dbeaf1';
  const PRE_TEXT = '#1c4257';
  const NEW = '#f59e0b';
  const NEW_TEXT = '#ffffff';

  const stack2018 = [
    { label: 'SOX' },
    { label: 'HIPAA / FERPA' },
    { label: 'GDPR' },
    { label: 'ESIGN / UETA' },
    { label: 'State statutes' },
  ];

  const stack2026 = [
    { label: 'APP (Australia)', isNew: true },
    { label: 'POPIA (South Africa)', isNew: true },
    { label: 'PDPA (Singapore)', isNew: true },
    { label: 'DPDP (India)', isNew: true },
    { label: 'LGPD (Brazil)', isNew: true },
    { label: '19 US state privacy laws', isNew: true },
    { label: 'DORA (EU, 2025)', isNew: true },
    { label: 'EU AI Act (2024 → 2027)', isNew: true },
    { label: 'NIST AI RMF (2023)', isNew: true },
    { label: 'SEC cyber disclosure (2023)', isNew: true },
    { label: 'SOX' },
    { label: 'HIPAA / FERPA' },
    { label: 'GDPR' },
    { label: 'ESIGN / UETA' },
  ];

  const blockH = 30;
  const blockGap = 4;
  const colW = 320;
  const colGap = 40;
  const padL = 30;
  const headerY = 40;
  const stackTop = 70;
  const tallestStack = stack2026.length * (blockH + blockGap) - blockGap;
  const substrateY = stackTop + tallestStack + 20;
  const substrateH = 56;
  const totalH = substrateY + substrateH + 60;
  const totalW = padL + colW + colGap + colW + padL;

  function renderStack(stack: { label: string; isNew?: boolean }[], xOffset: number) {
    const stackHeight = stack.length * (blockH + blockGap) - blockGap;
    const startY = stackTop + (tallestStack - stackHeight);
    return stack.map((item, i) => {
      const y = startY + i * (blockH + blockGap);
      const fill = item.isNew ? NEW : PRE;
      const text = item.isNew ? NEW_TEXT : PRE_TEXT;
      return (
        <g key={`${xOffset}-${i}`}>
          <rect
            x={xOffset}
            y={y}
            width={colW}
            height={blockH}
            rx={6}
            fill={fill}
            stroke={item.isNew ? '#d97706' : '#82b8d0'}
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <text
            x={xOffset + colW / 2}
            y={y + blockH / 2 + 4}
            textAnchor="middle"
            fill={text}
            fontSize="12"
            fontWeight="600"
            fontFamily="inherit"
          >
            {item.label}
          </text>
        </g>
      );
    });
  }

  const col1X = padL;
  const col2X = padL + colW + colGap;

  return (
    <svg viewBox={`0 0 ${totalW} ${totalH}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <title>Compliance frameworks: 2018 vs 2026</title>
      <desc>
        Side-by-side stacks of compliance frameworks a global enterprise must map against. The 2018 stack contains five
        frameworks. The 2026 stack contains fourteen, with ten added since 2020 highlighted in amber. The same
        vendor-controlled substrate runs underneath both years.
      </desc>

      {/* Column headers */}
      <text x={col1X + colW / 2} y={headerY} textAnchor="middle" fill="#303433" fontSize="20" fontWeight="700" fontFamily="inherit">
        2018
      </text>
      <text x={col1X + colW / 2} y={headerY + 22} textAnchor="middle" fill="#4a4f4e" fontSize="12" fontFamily="inherit">
        5 frameworks
      </text>

      <text x={col2X + colW / 2} y={headerY} textAnchor="middle" fill="#303433" fontSize="20" fontWeight="700" fontFamily="inherit">
        2026
      </text>
      <text x={col2X + colW / 2} y={headerY + 22} textAnchor="middle" fill="#4a4f4e" fontSize="12" fontFamily="inherit">
        14+ frameworks
      </text>

      {/* Stacks */}
      {renderStack(stack2018, col1X)}
      {renderStack(stack2026, col2X)}

      {/* Shared substrate */}
      <rect
        x={col1X}
        y={substrateY}
        width={col2X + colW - col1X}
        height={substrateH}
        rx={6}
        fill="#cbd5d6"
        stroke="#9ca3af"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <text
        x={(col1X + col2X + colW) / 2}
        y={substrateY + 22}
        textAnchor="middle"
        fill="#1f2937"
        fontSize="13"
        fontWeight="700"
        fontFamily="inherit"
      >
        Substrate (unchanged in 20 years)
      </text>
      <text
        x={(col1X + col2X + colW) / 2}
        y={substrateY + 42}
        textAnchor="middle"
        fill="#4a4f4e"
        fontSize="11"
        fontFamily="inherit"
      >
        Vendor-controlled audit logs &middot; Manual cross-references &middot; Screenshots and email threads
      </text>

      {/* Legend */}
      <g transform={`translate(${padL}, ${totalH - 36})`}>
        <rect x={0} y={0} width={14} height={14} rx={3} fill={NEW} />
        <text x={20} y={11} fill="#4a4f4e" fontSize="11" fontFamily="inherit">
          Added since 2020
        </text>
        <rect x={150} y={0} width={14} height={14} rx={3} fill={PRE} stroke="#82b8d0" strokeOpacity="0.4" />
        <text x={170} y={11} fill="#4a4f4e" fontSize="11" fontFamily="inherit">
          Pre-2020 baseline
        </text>
      </g>
    </svg>
  );
}
