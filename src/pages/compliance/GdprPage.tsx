import { FrameworkEncyclopediaPage, type FrameworkEntry } from './_shared';

const entry: FrameworkEntry = {
  slug: 'gdpr',
  label: 'GDPR',
  jurisdiction: 'European Union',
  heroHeadline: 'GDPR evidence on a substrate where you can prove what you did, when',
  heroSubhead:
    'GDPR enforcement turns on records: the lawful basis you relied on, the consent you collected, the data subject request you fulfilled, the breach you assessed within 72 hours. Arkova anchors each of those records to a public ledger with a verifiable timestamp — so the supervisory authority does not have to take your vendor\'s word for any of it.',
  whatItIs: [
    'The General Data Protection Regulation (Regulation 2016/679) is the EU\'s comprehensive data-protection framework, applicable since 25 May 2018. It governs the processing of personal data of EU/EEA residents regardless of where the processor is located, with extraterritorial reach mirrored by virtually every later privacy law worldwide.',
    'GDPR organizes obligations around <strong class="text-white">six lawful bases</strong> for processing (consent, contract, legal obligation, vital interests, public task, legitimate interests), <strong class="text-white">eight data-subject rights</strong> (access, rectification, erasure, restriction, portability, objection, automated-decision rights, information), and a <strong class="text-white">supervisory-authority enforcement</strong> regime headed by the European Data Protection Board (EDPB).',
    'Penalties reach up to <strong class="text-white">€20M or 4% of global annual turnover</strong>, whichever is higher, for the most serious infringements. Most actual fines are smaller but six- and seven-figure fines are routine and indexed under EDPB\'s harmonized penalty guidelines.',
  ],
  keyRequirements: [
    {
      label: 'Records of processing activities (Article 30)',
      description:
        'Controllers and processors must maintain a record of all processing activities including purposes, categories of data, recipients, retention, and security measures. Available to the supervisory authority on request.',
    },
    {
      label: 'Lawful basis evidence',
      description:
        'For each processing activity, documented evidence of the lawful basis (Art. 6) and, for consent (Art. 7), proof of when consent was given, what was consented to, and that withdrawal is as easy as giving consent.',
    },
    {
      label: 'Data Subject Access Requests (Articles 15-22)',
      description:
        'Response within one calendar month (extensible to three for complex requests). Documented timeline of receipt, identity verification, fulfillment, and content provided.',
    },
    {
      label: '72-hour breach notification (Article 33-34)',
      description:
        'Personal data breaches must be notified to the supervisory authority within 72 hours of awareness. High-risk breaches also notified to data subjects without undue delay. Documented timeline is the entire game.',
    },
    {
      label: 'Data Protection Impact Assessment (Article 35)',
      description:
        'Required for high-risk processing. Versioned documentation showing the assessment, mitigations, and (where required) prior consultation with the supervisory authority.',
    },
    {
      label: 'International transfer safeguards (Articles 44-49)',
      description:
        'Standard Contractual Clauses, Binding Corporate Rules, adequacy decisions, or derogations. Signed agreements + transfer-impact assessments must be retrievable.',
    },
  ],
  howArkovaFits: [
    'Most GDPR investigations turn on whether the documentation you produce was actually in effect at the time of the processing being investigated. Arkova anchors each version of your privacy notice, consent record, DSAR fulfillment, breach assessment, and DPIA to a public ledger with a cryptographic timestamp. When the supervisory authority asks "what was your privacy notice on March 15th, 2024?" you produce the document + the public-ledger receipt. They verify both independently. No need to trust your CMS, your DPM tool, or any vendor.',
    'The 72-hour breach notification window in particular is where anchored timestamps are decisive. Arkova-anchored awareness, assessment, and notification timestamps make the timing claim objectively verifiable rather than reliant on vendor logs that the supervisory authority knows are mutable.',
  ],
  ctaPrompt:
    'If you process EU personal data and want GDPR evidence with verifiable timestamps your supervisory authority can validate independently, we\'d like to discuss an early-access pilot.',
};

export default function GdprPage() {
  return <FrameworkEncyclopediaPage entry={entry} />;
}
