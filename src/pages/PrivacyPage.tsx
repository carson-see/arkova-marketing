import { useEffect } from 'react';

export default function PrivacyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0a0f14] pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-slate-300">
          <p className="text-sm text-slate-400">Effective Date: March 1, 2026 | Last Updated: March 18, 2026</p>

          <h2 className="text-2xl font-semibold text-white">Our Foundational Guarantee</h2>
          <p>Your documents never leave your device. This is not a feature — it is the architectural foundation of Arkova. Document fingerprinting (SHA-256) runs entirely in your browser using the Web Crypto API. We never receive, store, process, or have access to your original files.</p>

          <h2 className="text-2xl font-semibold text-white">What We Collect</h2>
          <p><strong>Document fingerprints:</strong> A one-way cryptographic hash (SHA-256) of your file. This cannot be reversed to reconstruct the original document.</p>
          <p><strong>Account information:</strong> Email address, name, and organization name when you create an account.</p>
          <p><strong>Credential metadata:</strong> Issuer name, credential type, issue/expiry dates, and field labels — never raw document text or PII.</p>
          <p><strong>Usage data:</strong> Page views, feature usage, and API call counts for service improvement.</p>

          <h2 className="text-2xl font-semibold text-white">What We Never Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Original documents, PDFs, images, or file contents</li>
            <li>Raw OCR text from your documents</li>
            <li>Social Security numbers, student IDs, or other PII from documents</li>
            <li>Browsing history outside of arkova.ai</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">AI Metadata Processing</h2>
          <p>When AI-powered extraction is enabled, only PII-stripped structured metadata (credential type, issuer, dates, field labels) may be sent to our servers for processing. Client-side PII stripping removes all personally identifiable information before anything leaves your browser. Raw OCR text and document bytes are never transmitted.</p>

          <h2 className="text-2xl font-semibold text-white">Data Security</h2>
          <p>All data is encrypted in transit (TLS 1.3) and at rest. Database access is enforced through Row Level Security (RLS) — every table has mandatory tenant isolation. API keys are hashed with HMAC-SHA256. Audit events are logged to an append-only, PII-scrubbed audit trail.</p>

          <h2 className="text-2xl font-semibold text-white">Your Rights</h2>
          <p>You may request deletion of your account and all associated data at any time. We support GDPR right-to-erasure, including anonymization of audit log entries. Contact <a href="mailto:hello@arkova.ai" className="text-[#82b8d0] hover:underline">hello@arkova.ai</a> to exercise your rights.</p>

          <h2 className="text-2xl font-semibold text-white">Public Verification</h2>
          <p>Credential verification is public by design. Anyone with a verification link or QR code can confirm a document's status and timestamp. No account is required. Only the credential's public ID and non-sensitive metadata are exposed — never the document itself or the holder's personal information.</p>

          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p>For privacy inquiries: <a href="mailto:hello@arkova.ai" className="text-[#82b8d0] hover:underline">hello@arkova.ai</a></p>
          <p>Arkova Technologies, Inc.</p>
        </div>
      </div>
    </div>
  );
}
