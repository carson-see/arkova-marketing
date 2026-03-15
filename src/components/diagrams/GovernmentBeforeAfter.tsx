/**
 * Government Before/After — split-screen comparison showing
 * current verification process vs. cryptographic verification.
 */
export default function GovernmentBeforeAfter({ className = '' }: { className?: string }) {
  const left = [
    { label: 'Citizen requests record', tag: '6–8 weeks' },
    { label: 'Agency mails physical copy', tag: '$15–25 fee' },
    { label: 'Recipient receives paper', tag: '' },
    { label: 'Recipient calls issuer', tag: '15–30 min hold' },
    { label: 'Issuer manually confirms', tag: 'Often fails' },
  ];

  const right = [
    { label: 'Agency issues credential', tag: 'Instant' },
    { label: 'Credential fingerprinted', tag: 'SHA-256' },
    { label: 'Verifiable link shared', tag: 'Shareable' },
    { label: 'Anyone scans to verify', tag: '< 2 seconds' },
    { label: 'Math confirms authenticity', tag: 'No phone call' },
  ];

  const rowH = 58;
  const startY = 60;
  const colW = 340;

  return (
    <svg viewBox="0 0 740 390" className={className} xmlns="http://www.w3.org/2000/svg">
      <title>Government Verification: Before and After</title>
      <desc>Side-by-side comparison of current paper-based government verification versus cryptographic verification</desc>

      {/* Headers */}
      <text x={170} y={30} textAnchor="middle" fill="#6b7280" fontSize="14" fontWeight="700" fontFamily="inherit">
        Current Process
      </text>
      <text x={560} y={30} textAnchor="middle" fill="#82b8d0" fontSize="14" fontWeight="700" fontFamily="inherit">
        With Cryptographic Verification
      </text>

      {/* Divider */}
      <line x1={370} y1={10} x2={370} y2={380} stroke="#dbeaf1" strokeWidth="1" strokeDasharray="4 4" />
      <rect x={350} y={180} width={40} height={28} rx={6} fill="#303433" />
      <text x={370} y={199} textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="inherit">VS</text>

      {/* Left column */}
      {left.map((row, i) => {
        const y = startY + i * rowH;
        return (
          <g key={`l${i}`}>
            <rect x={10} y={y} width={colW} height={46} rx={8} fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
            <text x={24} y={y + 20} fill="#303433" fontSize="12" fontWeight="500" fontFamily="inherit">{row.label}</text>
            {row.tag && (
              <g>
                <rect x={24} y={y + 27} width={row.tag.length * 7 + 12} height={16} rx={4} fill="#fecaca" />
                <text x={30} y={y + 39} fill="#991b1b" fontSize="9" fontWeight="600" fontFamily="inherit">{row.tag}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* Right column */}
      {right.map((row, i) => {
        const y = startY + i * rowH;
        return (
          <g key={`r${i}`}>
            <rect x={390} y={y} width={colW} height={46} rx={8} fill="#dbeaf1" stroke="#82b8d0" strokeWidth="1" />
            <text x={404} y={y + 20} fill="#303433" fontSize="12" fontWeight="500" fontFamily="inherit">{row.label}</text>
            {row.tag && (
              <g>
                <rect x={404} y={y + 27} width={row.tag.length * 7 + 12} height={16} rx={4} fill="#d1fae5" />
                <text x={410} y={y + 39} fill="#065f46" fontSize="9" fontWeight="600" fontFamily="inherit">{row.tag}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* Connecting arrows */}
      {[0, 1, 2, 3, 4].map(i => {
        const y = startY + i * rowH + 23;
        return (
          <line key={i} x1={350} y1={y} x2={390} y2={y} stroke="#82b8d0" strokeWidth="1.5" strokeDasharray="3 2" />
        );
      })}
    </svg>
  );
}
