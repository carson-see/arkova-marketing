import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ResearchPage from './pages/ResearchPage';
import ArticlePage from './pages/ArticlePage';
import WhitepaperPage from './pages/WhitepaperPage';
import WikiPage from './pages/WikiPage';
import DocsPage from './pages/DocsPage';
import RoadmapPage from './pages/RoadmapPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import QuickstartPage from './pages/docs/QuickstartPage';
import ApiReferencePage from './pages/docs/ApiReferencePage';
import SdksPage from './pages/docs/SdksPage';
import WebhooksPage from './pages/docs/WebhooksPage';
import McpPage from './pages/docs/McpPage';
import FaqPage from './pages/docs/FaqPage';
import StatusPage from './pages/docs/StatusPage';
import EuAiActPage from './pages/compliance/EuAiActPage';
import VantaComparePage from './pages/compare/VantaPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/:slug" element={<ArticlePage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="/wiki" element={<WikiPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/quickstart" element={<QuickstartPage />} />
        <Route path="/docs/api" element={<ApiReferencePage />} />
        <Route path="/docs/sdks" element={<SdksPage />} />
        <Route path="/docs/webhooks" element={<WebhooksPage />} />
        <Route path="/docs/mcp" element={<McpPage />} />
        <Route path="/docs/faq" element={<FaqPage />} />
        <Route path="/docs/status" element={<StatusPage />} />
        <Route path="/compliance/eu-ai-act" element={<EuAiActPage />} />
        <Route path="/compare/vanta" element={<VantaComparePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SpeedInsights />
    </Layout>
  );
}
