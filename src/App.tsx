import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Rankings from './components/sections/Rankings';
import HomePage from './pages/HomePage';
import AdmissionsPage from './pages/AdmissionsPage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import LeadershipPage from './pages/LeadershipPage';
import GovernancePage from './pages/GovernancePage';
import StatutoryCommitteePage from './pages/StatutoryCommitteePage';
import MandatoryDisclosurePage from './pages/MandatoryDisclosurePage';
import CampusFacilitiesPage from './pages/CampusFacilitiesPage';
import StudentServicesPage from './pages/StudentServicesPage';
import SportsPage from './pages/SportsPage';
import AcademicEnrichmentPage from './pages/AcademicEnrichmentPage';
import SocialOutreachPage from './pages/SocialOutreachPage';
import ContactPage from './pages/ContactPage';
import EverythingNHCEPage from './pages/NewsPage';
import DetailPage from './pages/NewsDetailPage';
import ExamPage from './pages/ExamPage';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-navy-700 hover:bg-navy-800 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <Rankings />
          </>
        } />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/governance" element={<GovernancePage />} />
        <Route path="/statutory-committee" element={<StatutoryCommitteePage />} />
        <Route path="/mandatory-disclosure" element={<MandatoryDisclosurePage />} />
        <Route path="/campus" element={<CampusFacilitiesPage />} />
        <Route path="/student-services" element={<StudentServicesPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/social-outreach" element={<SocialOutreachPage />} />
        <Route path="/academic-enrichment" element={<AcademicEnrichmentPage />} />
        <Route path="/everything@nhce" element={<EverythingNHCEPage />} />
        <Route path="/everything@nhce/:category/:slug" element={<DetailPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}
