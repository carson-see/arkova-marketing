import { FrameworkEncyclopediaPage, type FrameworkEntry } from './_shared';

const entry: FrameworkEntry = {
  slug: 'australia-app',
  label: 'Australian Privacy Principles',
  jurisdiction: 'Australia',
  heroHeadline: 'APP compliance evidence the OAIC can verify without trusting your stack',
  heroSubhead:
    'The Australian Privacy Principles under the Privacy Act 1988 set 13 principles covering collection, use, disclosure, security, and access. The Notifiable Data Breaches scheme requires reporting to the OAIC and affected individuals as soon as practicable. Arkova anchors the records that prove each principle was followed.',
  whatItIs: [
    'The <strong class="text-white">Australian Privacy Principles (APPs)</strong> are 13 principles in Schedule 1 of the Privacy Act 1988 (Cth). They apply to <strong class="text-white">APP entities</strong>: most Australian Government agencies plus private-sector organisations with annual turnover above AUD$3 million (with significant exceptions for smaller health, credit, and TFN-related operators).',
    'Privacy Act amendments through 2024–2026 have substantially strengthened the regime. The Notifiable Data Breaches (NDB) scheme, in effect since 22 February 2018, requires notification of "eligible data breaches" to the OAIC and affected individuals. Civil penalties for serious or repeated interferences with privacy reach up to AUD$50 million or 30% of adjusted turnover.',
    'The Privacy Act has extraterritorial application: foreign organisations carrying on business in Australia and collecting/holding personal information in Australia are subject to the APPs even without an Australian establishment.',
  ],
  keyRequirements: [
    {
      label: 'APP 1 — Open and transparent management',
      description:
        'Maintain a clearly expressed, up-to-date privacy policy. Privacy practices must be implemented and documented.',
    },
    {
      label: 'APP 3 — Collection of solicited personal information',
      description:
        'Personal information must be collected only when reasonably necessary for one or more of the entity\'s functions. Sensitive information requires consent.',
    },
    {
      label: 'APP 5 — Notification of collection',
      description:
        'At or before collection (or as soon as practicable after), notify the individual of the collection, the purposes, the recipients, the consequences of not collecting, and how to access/correct.',
    },
    {
      label: 'APP 8 — Cross-border disclosure',
      description:
        'Before disclosing personal information to an overseas recipient, take reasonable steps to ensure the recipient does not breach the APPs. The discloser remains accountable.',
    },
    {
      label: 'APP 11 — Security of personal information',
      description:
        'Take reasonable steps to protect personal information from misuse, interference, loss, unauthorized access, modification, or disclosure. Destroy or de-identify when no longer needed.',
    },
    {
      label: 'NDB scheme — Notifiable Data Breaches',
      description:
        'When an eligible data breach occurs (likely to result in serious harm), notify the OAIC and affected individuals as soon as practicable. Documented assessment of "eligible" status, timeline, and notification content required.',
    },
  ],
  howArkovaFits: [
    'OAIC investigations under the NDB scheme frequently turn on the "as soon as practicable" notification timing. Anchored timestamps for breach awareness, eligibility assessment, and notification dispatch make the timing claim objectively verifiable. Disputes about whether your team actually concluded the breach was eligible on day X (and notified by day Y) become trivial to resolve.',
    'For APP 1 transparency, anchored privacy-policy versions let you produce the exact policy in effect at any prior date. For APP 8 cross-border disclosure, anchored disclosure records establish the timeline and content of every offshore transfer — useful when an investigation looks at a specific incident months or years after the fact.',
  ],
  ctaPrompt:
    'If you\'re an APP entity that wants Australian privacy evidence with timestamps the OAIC can verify independently, we\'d like to discuss an early-access pilot.',
};

export default function AustraliaAppPage() {
  return <FrameworkEncyclopediaPage entry={entry} />;
}
