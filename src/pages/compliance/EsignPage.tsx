import { FrameworkEncyclopediaPage, type FrameworkEntry } from './_shared';

const entry: FrameworkEntry = {
  slug: 'esign',
  label: 'ESIGN Act',
  jurisdiction: 'United States',
  heroHeadline: 'ESIGN-compliant signing with audit trails that outlast the platform',
  heroSubhead:
    'ESIGN gives electronic signatures the same legal effect as wet ink for most US federal commerce. The hard part is not signing — it is producing the integrity-of-record evidence years later when the e-signature platform may not be the one you used at signing. Arkova anchors that integrity evidence to a public ledger.',
  whatItIs: [
    'The Electronic Signatures in Global and National Commerce Act of 2000 (ESIGN, 15 U.S.C. §7001 et seq.) is the federal law that gives e-signatures the same legal effect as handwritten signatures for transactions affecting interstate or foreign commerce. It is paired with state-level UETA, which has been adopted by 49 states (New York handles e-signatures via separate state law).',
    'ESIGN does not specify a particular signing technology. It requires four conditions for an electronic record to satisfy a legal "writing" requirement: <strong class="text-white">intent to sign</strong>, <strong class="text-white">consent to do business electronically</strong>, <strong class="text-white">association of the signature with the record</strong>, and <strong class="text-white">record retention sufficient for later reference</strong>. The fourth condition is where most evidence disputes arise.',
    'Certain transactions are explicitly excluded from ESIGN: wills, codicils, testamentary trusts, family law matters (divorce, adoption), court orders, certain notices (utility cancellation, foreclosure, eviction). These still require traditional execution.',
  ],
  keyRequirements: [
    {
      label: 'Intent to sign',
      description:
        'The signer must intend the act to constitute a signature. UI design matters — an unintentional click should not constitute a binding signature.',
    },
    {
      label: 'Consent to electronic records',
      description:
        'For consumer transactions, the signer must affirmatively consent to receive the record electronically and acknowledge they\'re able to access it. The consent itself must also be retained.',
    },
    {
      label: 'Association of signature with record',
      description:
        'The signature must be logically associated with the record being signed. Tampering with the record after signing must be detectable.',
    },
    {
      label: 'Record retention',
      description:
        'Electronic records must be capable of being accurately reproduced for later reference. Retention timelines depend on the underlying transaction type — federal regs may impose specific minimums.',
    },
    {
      label: 'Audit trail',
      description:
        'Not strictly required by ESIGN but expected in practice — courts evaluating contested e-signatures look for a clear trail showing who signed, when, with what intent, and that the record is unchanged since.',
    },
  ],
  howArkovaFits: [
    'Most ESIGN evidence disputes turn on the integrity-of-record requirement years after signing. The original e-signature platform may have been acquired, sunset a feature, changed export formats, or no longer offers access at a price you want to pay. Arkova anchors a SHA-256 fingerprint of the signed record to a public ledger at the moment of signing. Anyone with the original record can recompute the hash and verify it against the ledger entry — no dependency on the signing platform still existing.',
    'Combined with the platform\'s own audit trail (intent, consent, association), the public-ledger anchor provides the integrity-of-record proof courts look for when an electronic signature is challenged. The proof is independent of every vendor in the chain.',
  ],
  ctaPrompt:
    'If you execute a meaningful volume of contracts under ESIGN and want integrity evidence that survives your e-signature vendor changing, we\'d like to discuss an early-access pilot.',
};

export default function EsignPage() {
  return <FrameworkEncyclopediaPage entry={entry} />;
}
