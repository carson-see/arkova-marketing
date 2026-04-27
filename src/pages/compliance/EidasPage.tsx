import { FrameworkEncyclopediaPage, type FrameworkEntry } from './_shared';

const entry: FrameworkEntry = {
  slug: 'eidas',
  label: 'eIDAS',
  jurisdiction: 'European Union',
  heroHeadline: 'eIDAS-grade evidence anchored on a public ledger',
  heroSubhead:
    'eIDAS gives qualified electronic signatures and qualified trust services the same legal weight as handwritten signatures across the EU. Arkova adds an independent verification layer on top of your existing trust service provider — every signed document gets a cryptographic receipt that survives the trust service\'s archive, your DocuSign tenant, and any future migration.',
  whatItIs: [
    'eIDAS — short for "electronic IDentification, Authentication and trust Services" — is the EU framework that defines three legally distinct tiers of electronic signature: <strong class="text-white">Simple (SES)</strong>, <strong class="text-white">Advanced (AES)</strong>, and <strong class="text-white">Qualified (QES)</strong>. Only QES, issued via a Qualified Trust Service Provider (QTSP) using a Qualified Electronic Signature Creation Device (QSCD), has the same legal effect as a handwritten signature in every member state.',
    'The original Regulation 910/2014 has been amended by the eIDAS 2.0 framework, which introduces the European Digital Identity Wallet (EUDI Wallet) — a member-state-issued wallet every EU citizen and resident will be able to use across the bloc. eIDAS 2.0 is being phased in through 2026.',
    'eIDAS applies to every service provider relying on or issuing trust services in the EU. In practice, any cross-border B2B contract executed via electronic signature with EU counterparties touches eIDAS — even if the signing platform is American.',
  ],
  keyRequirements: [
    {
      label: 'Tiered signature recognition',
      description:
        'Member states must recognize SES, AES, and QES executed in any other member state. Higher tiers carry stronger evidentiary weight in court.',
    },
    {
      label: 'Qualified Trust Service Provider (QTSP) supervision',
      description:
        'QTSPs are listed on the EU Trusted List and audited every two years. Their certificates and timestamps carry presumption of integrity.',
    },
    {
      label: 'Qualified Electronic Time Stamps (QETS)',
      description:
        'Qualified timestamps issued by a QTSP carry presumption of accuracy and integrity of the data they sealed at the moment of timestamping.',
    },
    {
      label: 'Qualified Electronic Seals',
      description:
        'For legal persons (companies). Provide presumption of integrity and origin for sealed documents — the corporate-entity equivalent of QES.',
    },
    {
      label: 'Cross-border interoperability',
      description:
        'EUDI Wallet under eIDAS 2.0 will give every EU citizen a portable digital identity recognized across all 27 member states by 2026–2027.',
    },
  ],
  howArkovaFits: [
    'eIDAS gives you legally recognized signatures and timestamps. <strong class="text-white">It does not give you an evidence layer that survives your QTSP</strong> changing pricing, going under, or sunsetting an archive format. Arkova anchors a SHA-256 fingerprint of every signed document to a public ledger at the time of signing. The QTSP\'s qualified timestamp + Arkova\'s ledger anchor are independent attestations of the same fact: this exact document existed at this exact time.',
    'For cross-border B2B contracts where the QTSP is in one country and the relying parties are in another, the public-ledger anchor sidesteps the cross-border QTSP-trust-list lookup entirely. Anyone with the document can verify the anchor independently using <code class="rounded bg-white/5 px-1.5 py-0.5 text-xs">shasum</code> and a public block explorer.',
  ],
  ctaPrompt:
    'If you operate cross-border in the EU and want eIDAS evidence that does not depend on your QTSP staying in business, we\'d like to discuss an early-access pilot.',
};

export default function EidasPage() {
  return <FrameworkEncyclopediaPage entry={entry} />;
}
