import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Rankings from './components/sections/Rankings';
import CallToAction from './components/sections/CallToAction';
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
import LifeAtNHCEPage from './pages/NewsPage';
import NewsListPage from './pages/NewsListPage';
import DetailPage from './pages/NewsDetailPage';
import ExamPage from './pages/ExamPage';
import AlumniPage from './pages/AlumniPage';
import ProfessionalCounsellingPage from './pages/ProfessionalCounsellingPage';
import CounsellingServicesPage from './pages/CounsellingServicesPage';
import CounsellingEventsPage from './pages/CounsellingEventsPage';
import AchievementsPage from './pages/AchievementsPage';
import IQACPage from './pages/IQACPage';
import CulturalActivitiesPage from './pages/CulturalActivitiesPage';
import KeyExecutivesPage from './pages/KeyExecutivesPage';
import NewslettersPage from './pages/NewslettersPage';
import CelebrityDiariesPage from './pages/CelebrityDiariesPage';
import CelebrityDiaryDetailPage from './pages/CelebrityDiaryDetailPage';
import EventsPage from './pages/EventsPage';
import IndustryCollaborationsPage from './pages/IndustryCollaborationsPage';
import AICTEIdeaLabPage from './pages/AICTEIdeaLabPage';
import StudentClubsPage from './pages/StudentClubsPage';
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
            <CallToAction />
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
        <Route path="/industry-collaborations" element={<IndustryCollaborationsPage />} />
        <Route path="/aicte-idea-lab" element={<AICTEIdeaLabPage />} />
        <Route path="/student-clubs" element={<StudentClubsPage />} />
        <Route path="/life-at-nhce" element={<LifeAtNHCEPage />} />
        <Route path="/life-at-nhce/:category/:slug" element={<DetailPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:slug" element={<DetailPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/professional-counselling" element={<ProfessionalCounsellingPage />} />
        <Route path="/counselling-services" element={<CounsellingServicesPage />} />
        <Route path="/counselling-events" element={<CounsellingEventsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/iqac" element={<IQACPage />} />
        <Route path="/key-executives" element={<KeyExecutivesPage />} />
        <Route path="/cultural-activities" element={<CulturalActivitiesPage />} />
        <Route path="/newsletters" element={<NewslettersPage />} />
        <Route path="/celebrity-diaries" element={<CelebrityDiariesPage />} />
        <Route path="/celebrity-diaries/:slug" element={<CelebrityDiaryDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}
