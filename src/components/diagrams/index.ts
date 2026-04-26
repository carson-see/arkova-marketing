import AgenticVerificationLoop from './AgenticVerificationLoop';
import TrustInversionTimeline from './TrustInversionTimeline';
import ConvergenceStack from './ConvergenceStack';
import GovernmentBeforeAfter from './GovernmentBeforeAfter';
import GovernmentMiddleware from './GovernmentMiddleware';
import ComplianceFrameworkExplosion from './ComplianceFrameworkExplosion';

/** Map diagram IDs (used in article data) to React components */
export const DIAGRAM_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  'agentic-verification-loop': AgenticVerificationLoop,
  'trust-inversion-timeline': TrustInversionTimeline,
  'convergence-stack': ConvergenceStack,
  'government-before-after': GovernmentBeforeAfter,
  'government-middleware': GovernmentMiddleware,
  'compliance-framework-explosion': ComplianceFrameworkExplosion,
};
