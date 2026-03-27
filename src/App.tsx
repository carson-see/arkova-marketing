import { Routes, Route } from 'react-router-dom';
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
        <Route path="/docs/api" element={<DocsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Layout>
  );
}
