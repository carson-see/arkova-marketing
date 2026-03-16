import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ResearchPage from './pages/ResearchPage';
import ArticlePage from './pages/ArticlePage';
import WhitepaperPage from './pages/WhitepaperPage';
import RoadmapPage from './pages/RoadmapPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/:slug" element={<ArticlePage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </Layout>
  );
}
