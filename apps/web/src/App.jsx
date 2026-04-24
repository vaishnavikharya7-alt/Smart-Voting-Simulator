import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import EligibilityPage from './pages/EligibilityPage';
import QuizPage from './pages/QuizPage';
import LocationsPage from './pages/LocationsPage';
import ChatbotPage from './pages/ChatbotPage';
import FakeNewsPage from './pages/FakeNewsPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/fake-news" element={<FakeNewsPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;