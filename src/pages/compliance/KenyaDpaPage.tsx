import { FrameworkEncyclopediaPage, type FrameworkEntry } from './_shared';

const entry: FrameworkEntry = {
  slug: 'kenya-dpa',
  label: 'Kenya Data Protection Act',
  jurisdiction: 'Kenya',
  heroHeadline: 'Kenya DPA evidence the ODPC can verify without trusting your vendor',
  heroSubhead:
    'The Data Protection Act, 2019 made Kenya one of the first East African jurisdictions with a comprehensive privacy law. The Office of the Data Protection Commissioner (ODPC) actively enforces. Arkova anchors the records that prove your processing was lawful and your breach response was timely.',
  whatItIs: [
    'The <strong class="text-white">Data Protection Act, 2019</strong> (Act No. 24 of 2019) is Kenya\'s primary privacy framework. It is administered by the <strong class="text-white">Office of the Data Protection Commissioner (ODPC)</strong>, established in November 2020. The Act is supplemented by Data Protection (General) Regulations 2021 and Data Protection (Registration of Data Controllers and Data Processors) Regulations 2021.',
    'Kenya\'s DPA closely tracks GDPR in structure: lawful bases for processing, data-subject rights, breach notification, cross-border transfer rules, and a supervisory authority with enforcement powers. The framework has been actively enforced since 2022, with the ODPC issuing penalty notices and conducting compliance audits across sectors.',
    'Penalties under the DPA reach up to <strong class="text-white">KES 5 million or 1% of annual turnover</strong>, whichever is lower, for serious infringements. Registration with the ODPC is mandatory for most data controllers and processors above small-scale thresholds.',
  ],
  keyRequirements: [
    {
      label: 'Registration with the ODPC',
      description:
        'Mandatory registration for data controllers and processors handling personal data above prescribed thresholds. Annual renewal. Registration certificate evidencing scope of processing must be maintained.',
    },
    {
      label: 'Lawful basis for processing (Section 30)',
      description:
        'Processing requires consent, contract, legal obligation, vital interest, public function, or legitimate interest. Documented evidence of basis required for every processing activity.',
    },
    {
      label: 'Data-subject rights',
      description:
        'Rights to be informed, to access, to object to processing, to correction or deletion, to data portability. Documented response within statutory timelines.',
    },
    {
      label: 'Cross-border data transfer (Section 48)',
      description:
        'Transfer to a country, entity, or international organization outside Kenya requires adequate safeguards: ODPC approval, Standard Contractual Clauses, Binding Corporate Rules, or specific data-subject consent.',
    },
    {
      label: 'Data Protection Impact Assessment (Section 31)',
      description:
        'Required where processing is likely to result in high risk to rights and freedoms. Documented DPIA, including measures to address risks, must be retrievable.',
    },
    {
      label: 'Breach notification (Section 43)',
      description:
        'Personal data breaches must be notified to the ODPC within 72 hours of awareness where feasible, and to affected data subjects without undue delay where high risk. Documented assessment + timeline required.',
    },
  ],
  howArkovaFits: [
    'Most ODPC enforcement turns on documentation of timing: when the controller became aware of a breach, when notification was sent, what version of the privacy notice was in effect at the alleged collection date. Arkova anchors each of these records to a public ledger with cryptographic timestamps. The ODPC examiner verifies the timestamp against the public ledger directly, without depending on Kenyan-jurisdiction trust in any single vendor.',
    'For cross-border transfer evidence under Section 48, anchored Standard Contractual Clauses and the date they were executed remove disputes about which version was in force when a specific transfer occurred. Useful for African operators with a meaningful global SaaS footprint.',
  ],
  ctaPrompt:
    'If you operate in Kenya under the DPA and want privacy evidence with timestamps the ODPC can verify independently, we\'d like to discuss an early-access pilot.',
};

export default function KenyaDpaPage() {
  return <FrameworkEncyclopediaPage entry={entry} />;
}
