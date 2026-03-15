import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ResearchPage from './pages/ResearchPage';
import ArticlePage from './pages/ArticlePage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/:slug" element={<ArticlePage />} />
      </Routes>
    </Layout>
  );
}
