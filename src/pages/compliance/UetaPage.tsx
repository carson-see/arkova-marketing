import { FrameworkEncyclopediaPage, type FrameworkEntry } from './_shared';

const entry: FrameworkEntry = {
  slug: 'ueta',
  label: 'UETA',
  jurisdiction: 'United States (49 states)',
  heroHeadline: 'UETA-grade record integrity that does not need to trust your vendor',
  heroSubhead:
    'UETA establishes electronic signatures and records as legally equivalent to paper at the state level. It pairs with federal ESIGN and is adopted by 49 states. The integrity-of-record requirement under UETA §12 is where Arkova\'s public-ledger anchor adds independent evidence on top of any signing platform.',
  whatItIs: [
    'The Uniform Electronic Transactions Act (UETA), promulgated by the Uniform Law Commission in 1999, has been adopted by 49 of the 50 US states (New York implements e-signatures via its own state law, ESRA, which is functionally similar). UETA gives electronic signatures and records the same legal effect as their paper equivalents for transactions where parties have agreed to conduct business electronically.',
    'UETA is the state-law parallel to federal ESIGN. They overlap heavily but UETA covers some transactions ESIGN does not, and vice versa. Most US contracts touching interstate commerce are covered by both.',
    'UETA §12 specifically addresses record retention: an electronic record must <strong class="text-white">accurately reflect the information set forth in the original</strong> and remain <strong class="text-white">accessible for later reference</strong>. The integrity component of this requirement is what most evidence challenges focus on years after signing.',
  ],
  keyRequirements: [
    {
      label: 'Agreement to conduct business electronically',
      description:
        'UETA only applies when both parties have agreed (explicitly or by conduct) to conduct the transaction electronically. The agreement itself must be evidenceable.',
    },
    {
      label: 'Attribution',
      description:
        'UETA §9: an electronic record or signature is attributable to a person if it was the act of that person. Determined "from the context and surrounding circumstances at the time of its creation, execution, or adoption."',
    },
    {
      label: 'Effect of changes/errors',
      description:
        'UETA §10: rules for handling changes to electronic records during transmission. Changes must be detectable, and recipients must be able to demand a corrected version.',
    },
    {
      label: 'Retention of records',
      description:
        'UETA §12: an electronic record must accurately reflect the information set forth in the original and remain accessible. State-specific retention timelines apply on top of this.',
    },
    {
      label: 'Notarization equivalence',
      description:
        'UETA §11: an electronic signature of a notary public, plus all other information required to be in a notarial acknowledgment, satisfies notarial requirements (subject to state implementation of remote notarization).',
    },
  ],
  howArkovaFits: [
    'UETA §12 retention turns on whether your electronic record accurately reflects the original. When that record sits inside a vendor\'s system that has changed export formats, been acquired, or sunsetted a feature, proving accurate reflection becomes archaeology. Arkova anchors a SHA-256 fingerprint of the record at execution. Five years later, anyone with the original document can hash it and verify against the public ledger — proof that the record matches what was originally signed, independent of every vendor in the chain.',
    'For attribution under UETA §9, Arkova does not replace your e-signature platform\'s identity-binding (that\'s where DocuSign, Adobe Sign, etc. shine). It complements that with a tamper-evident timestamp anyone can verify.',
  ],
  ctaPrompt:
    'If your business runs on US contracts under UETA and you want integrity evidence that does not depend on your signing vendor, we\'d like to discuss an early-access pilot.',
  deepLinkHref: '/compliance/esign',
  deepLinkLabel: 'ESIGN page (UETA\'s federal counterpart)',
};

export default function UetaPage() {
  return <FrameworkEncyclopediaPage entry={entry} />;
}
