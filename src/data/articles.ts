/**
 * Article data for the Research & Insights section.
 *
 * NOTE: Research/editorial content is exempt from Constitution 1.3 copy-lint
 * banned terms. Articles discuss Bitcoin, blockchain, and related technologies
 * by name as part of industry analysis. This is distinct from Arkova product UI
 * copy, which must use approved terminology (e.g., "anchor" instead of "transaction").
 */

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // ISO 8601
  author: {
    name: string;
    title: string;
    avatar?: string;
    linkedin?: string;
  };
  category: 'Compliance' | 'Technology' | 'Industry' | 'Product';
  readTime: string;
  excerpt: string;
  ogImage?: string;
  /** Structured content sections for rendering */
  sections: ArticleSection[];
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'anchoring-compliance-bitcoin',
    title: 'Anchoring Compliance to Bitcoin: Why Critical Records Need a Stronger Foundation',
    subtitle: 'How proof-of-work networks can transform enterprise compliance from vendor promises to cryptographic proof',
    date: '2025-11-21',
    author: {
      name: 'Carson Seeger',
      title: 'CEO & Co-Founder',
      avatar: '/team-carson.png',
      linkedin: 'https://www.linkedin.com/in/carsonseeger/',
    },
    category: 'Compliance',
    readTime: '8 min read',
    excerpt:
      'Modern enterprises still validate authenticity through screenshots, vendor audit trails, and email threads. As regulations like SOX, ESIGN, UETA, and eIDAS raise the bar, organizations need a stronger foundation for proving what happened, when, and to whom.',
    sections: [
      {
        paragraphs: [
          'Modern enterprises validate authenticity through screenshots, vendor audit trails, and email threads. These tools were adequate when compliance meant filing cabinets and notarized signatures. They are not adequate now.',
          'Regulations are raising the bar. SOX mandates tamper-resistant retention of financial records. ESIGN and UETA give electronic signatures legal parity with ink — but only when the integrity of the underlying record can be independently verified. eIDAS 2 is pushing Europe toward qualified trust services that require cryptographic evidence of document provenance.',
          'The question is no longer whether enterprises need verifiable records. The question is what infrastructure those records should be built on.',
        ],
      },
      {
        heading: 'The Problem: Trust Failures at Scale',
        paragraphs: [
          'The cost of weak record verification is not theoretical. It is measured in fraud, liability, and institutional failure.',
          'Operation Nightingale exposed over 7,600 fraudulent nursing diplomas issued by a network of fake schools. These credentials passed through background checks, were accepted by hospitals, and put patients at risk — because the verification infrastructure trusted the credential issuer rather than demanding independent proof of the credential itself.',
          'Resume fraud is not an edge case. Studies consistently show that a majority of American workers have misrepresented qualifications on their resumes. Employers rely on self-reported credentials, reference checks with former colleagues, and background check vendors who themselves rely on the same fragile chain of institutional trust.',
          'The Minnesota welfare fraud case — involving billions in allegedly stolen taxpayer funds — revealed how systems designed to distribute resources at scale can be exploited when the underlying records lack independent verifiability. The compliance infrastructure assumed that records submitted through approved channels were legitimate. They were not.',
          'These are not isolated incidents. They are symptoms of a structural weakness: our compliance systems are only as strong as the institutions that maintain them, and those institutions are single points of failure.',
        ],
      },
      {
        heading: 'The Regulatory Landscape',
        paragraphs: [
          'The regulatory environment is evolving in a clear direction: toward independently verifiable, tamper-evident records.',
          'SOX (Sarbanes-Oxley) requires public companies to maintain auditable financial records with tamper-resistant retention. The SEC and PCAOB audit these requirements, and violations carry criminal penalties. But SOX was written for a paper-and-database world. It mandates retention and access controls, not cryptographic proof of integrity.',
          'ESIGN (Electronic Signatures in Global and National Commerce Act) and UETA (Uniform Electronic Transactions Act) established that electronic signatures and records carry the same legal weight as their physical counterparts. The critical caveat: the electronic record must be demonstrably intact and unaltered. As legal challenges to electronic evidence increase, "the vendor says it\'s authentic" is becoming an increasingly insufficient answer.',
          'eIDAS (Electronic Identification, Authentication and Trust Services) in Europe — and its successor eIDAS 2 — goes further, establishing a framework for qualified trust services that provide legal certainty for electronic transactions. eIDAS 2 explicitly requires cryptographic evidence of document provenance and integrity, moving beyond institutional trust toward mathematical proof.',
          'The trend is unmistakable: regulators are shifting from "keep records and control access" to "prove that records are authentic, unaltered, and independently verifiable." The infrastructure that supports current compliance practices was not designed for this standard.',
        ],
      },
      {
        heading: 'System Fragmentation: The Hidden Risk',
        paragraphs: [
          'Most compliance evidence today lives inside individual, siloed systems. Document management systems store contracts. E-signature platforms store signing events. HR systems store employee credentials. Background check vendors store verification results.',
          'Each of these systems maintains its own audit trail, its own integrity guarantees, and its own trust model. When a regulator, auditor, or opposing counsel asks "can you prove this document existed in this form on this date?" — the answer depends entirely on the trustworthiness of the specific system that holds the record.',
          'This is the fragmentation problem. There is no common layer of truth that spans systems. A signed contract in DocuSign, a credential verified by a background check vendor, and a financial record in an ERP system each rely on different trust authorities. If any one of those authorities is compromised, wrong, or simply unavailable, the compliance evidence falls apart.',
          'Regulators must accept these claims on faith. Auditors must trust that the vendor\'s internal logs have not been altered. Legal teams must argue that a platform\'s proprietary audit trail constitutes sufficient evidence. This is not verification — it is delegation of trust to third parties who have their own incentives, limitations, and failure modes.',
        ],
      },
      {
        heading: 'Why Bitcoin: The Case for Proof-of-Work Anchoring',
        paragraphs: [
          'Bitcoin\'s proof-of-work network has a unique combination of properties that make it suitable as an anchoring layer for compliance records.',
          'First, hashrate. Bitcoin\'s network processes more computational work per second than any other distributed system. This is not a marketing claim — it is a measurable physical reality. The energy expenditure required to alter a confirmed Bitcoin record exceeds what any single organization, and most nation-states, could plausibly deploy.',
          'Second, decentralization. Bitcoin\'s network is maintained by thousands of independent nodes across dozens of jurisdictions. No single entity controls the network, can censor entries, or can retroactively alter the record. This is fundamentally different from any vendor-maintained system, including "blockchain" solutions that rely on permissioned networks controlled by a small number of operators.',
          'Third, permanence. Once data is committed to the Bitcoin network, it is replicated across every full node. The record persists as long as the network persists — which, given its economic and institutional entrenchment, provides a durability guarantee that no single vendor or institution can match.',
          'The result: evidence that is timestamped, tamper-evident, and independently verifiable. Not because a vendor says so, but because the laws of physics and mathematics make it so.',
        ],
      },
      {
        heading: 'Arkova\'s Approach: Verification Middleware',
        paragraphs: [
          'Arkova is not a document storage platform. It is not a replacement for existing compliance systems. It is verification middleware — a layer that sits alongside existing infrastructure and creates independently verifiable records of document lifecycle events.',
          'The approach is straightforward. When a document is created, signed, amended, revoked, attested, or transferred, Arkova records metadata about that event — a cryptographic fingerprint of the document, a timestamp, and the nature of the action — and anchors it to the Bitcoin network.',
          'The document itself never leaves the organization\'s existing systems. Arkova does not store files, does not process document content server-side, and does not create a new silo. Instead, it creates a portable, vendor-independent audit trail that can be verified by anyone, at any time, without relying on Arkova or any other intermediary.',
          'This means that when a regulator asks "can you prove this document existed in this form on this date?" — the answer is not "our vendor says so." The answer is "here is a cryptographic proof anchored to a public network that you can verify independently, right now, with open-source tools."',
          'The shift is from "which system should I trust?" to "which proofs can anyone verify?" That is the foundation that critical records need — not vendor promises, but cryptographic proof.',
        ],
      },
      {
        heading: 'What This Means for Enterprise Compliance',
        paragraphs: [
          'The implications extend beyond record keeping.',
          'For regulated industries, Bitcoin-anchored audit trails provide evidence that meets the emerging standard: independently verifiable, tamper-evident, and system-agnostic. This is the direction SOX, eIDAS 2, and related frameworks are moving.',
          'For organizations managing credentials at scale — universities, professional licensing boards, healthcare systems — anchoring provides a verification mechanism that does not depend on the issuing institution remaining operational, cooperative, or trustworthy.',
          'For legal and IP use cases, timestamped proofs of document existence create evidence that is admissible, independently verifiable, and resistant to challenges of authenticity.',
          'The common thread: shifting trust from institutions to mathematics. Not because institutions are unnecessary, but because critical records deserve a foundation that does not depend on any single point of failure.',
          'The infrastructure for this shift exists today. The question is not whether organizations will adopt verifiable records, but when — and whether they will lead the transition or be compelled by regulators, markets, and competitors who moved first.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
