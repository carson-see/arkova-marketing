import { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0a0f14] pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-lg max-w-none space-y-6 text-slate-300">
          <p className="text-sm text-slate-400">Effective Date: March 1, 2026 | Last Updated: March 18, 2026</p>

          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>By accessing or using Arkova ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

          <h2 className="text-2xl font-semibold text-white">2. Service Description</h2>
          <p>Arkova provides document verification infrastructure. The Service creates cryptographic fingerprints (SHA-256 hashes) of documents in your browser and anchors them to a permanent public record. Documents never leave your device.</p>

          <h2 className="text-2xl font-semibold text-white">3. What Arkova Does and Does Not Do</h2>
          <p><strong>Arkova proves:</strong> That a specific document existed at a specific time and has not been altered since anchoring.</p>
          <p><strong>Arkova does not:</strong> Verify the truthfulness, accuracy, or legal validity of document contents. Anchoring a document does not constitute legal certification, notarization, or endorsement of its contents.</p>

          <h2 className="text-2xl font-semibold text-white">4. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for the documents you choose to anchor.</li>
            <li>You must not use the Service to anchor fraudulent, illegal, or harmful content.</li>
            <li>You are responsible for maintaining the security of your account credentials and API keys.</li>
            <li>Organization administrators are responsible for their members' use of the Service.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">5. Verification API</h2>
          <p>API access is subject to rate limits and usage quotas per your subscription tier. API keys must be kept confidential. Arkova reserves the right to revoke API keys that violate these terms or rate limits.</p>

          <h2 className="text-2xl font-semibold text-white">6. Privacy</h2>
          <p>Your use of the Service is also governed by our <a href="/privacy" className="text-[#82b8d0] hover:underline">Privacy Policy</a>. The foundational guarantee — documents never leave your device — is an architectural commitment, not merely a policy choice.</p>

          <h2 className="text-2xl font-semibold text-white">7. Intellectual Property</h2>
          <p>You retain all rights to your documents. Arkova claims no ownership of documents you anchor. The cryptographic fingerprints and associated metadata are used solely to provide the verification service.</p>

          <h2 className="text-2xl font-semibold text-white">8. Limitation of Liability</h2>
          <p>Arkova provides the Service "as is" without warranty of any kind. Arkova is not liable for any damages arising from your use of the Service, including but not limited to reliance on verification results for legal, regulatory, or compliance purposes.</p>

          <h2 className="text-2xl font-semibold text-white">9. Modifications</h2>
          <p>Arkova may modify these terms at any time. Material changes will be communicated via email or in-app notification at least 30 days before taking effect. Continued use after changes constitutes acceptance.</p>

          <h2 className="text-2xl font-semibold text-white">10. Contact</h2>
          <p>Questions about these terms: <a href="mailto:hello@arkova.ai" className="text-[#82b8d0] hover:underline">hello@arkova.ai</a></p>
          <p>Arkova Technologies, Inc.</p>
        </div>
      </div>
    </div>
  );
}
