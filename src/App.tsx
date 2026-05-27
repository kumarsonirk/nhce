import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import VideoSection from './components/sections/VideoSection';
import Departments from './components/sections/Departments';
import PlacementPartners from './components/sections/PlacementPartners';
import Accreditations from './components/sections/Accreditations';
import NotificationBar from './components/sections/NotificationBar';
import Campus from './components/sections/Campus';
import { News } from './components/sections/EventsNews';
import Rankings from './components/sections/Rankings';
import { ArrowUp, Search, X, Plus, BookOpen, Briefcase, Zap, Mail } from 'lucide-react';

function ScrollToTop() {
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
      className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-navy-700 hover:bg-navy-800 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
    >
      <ArrowUp size={18} />
    </button>
  );
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div className="text-center">
        <img
          src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/07/nhce_25-scaled-1-2048x683.png"
          alt="New Horizon College of Engineering"
          className="h-16 w-auto object-contain mx-auto mb-6"
        />
        <div className="w-40 h-0.5 bg-slate-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-full" style={{ animation: 'grow 1.6s ease-out forwards' }} />
        </div>
      </div>
      <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}

const EXPLORE_ITEMS = [
  { label: 'Admissions', href: '#admissions', icon: Plus },
  { label: 'Programs',   href: '#departments', icon: BookOpen },
  { label: 'Placements', href: '#placements',  icon: Briefcase },
  { label: 'News & Events',  href: '#events',      icon: Zap },
  { label: 'Contact Us', href: '#contact',     icon: Mail },
];

function ExploreButton() {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 md:hidden">
      {open && (
        <>
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setOpen(false)}
          />
          <div className="flex flex-col items-end gap-2 mb-1">
            {EXPLORE_ITEMS.map(({ label, href, icon: Icon }) => (
              <button
                key={label}
                onClick={() => handleClick(href)}
                className="flex items-center gap-3 bg-white text-navy-800 font-semibold text-sm px-5 py-3 rounded-full shadow-lg border border-slate-100 animate-[fadeSlideUp_0.2s_ease_both]"
              >
                {label}
                <Icon size={15} className="text-blue-600" />
              </button>
            ))}
          </div>
        </>
      )}

      {open ? (
        <button
          onClick={() => setOpen(false)}
          className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center"
        >
          <X size={20} className="text-slate-700" />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-navy-700 text-white font-bold text-sm px-5 py-3 rounded-full shadow-xl"
        >
          <Search size={16} />
          Explore
        </button>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function useSectionAnimations() {
  useEffect(() => {
    const sections = document.querySelectorAll('main > section, main > div > section');
    sections.forEach(el => el.classList.add('section-hidden'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('section-hidden');
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [loading, setLoading] = useState(true);
  useSectionAnimations();

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Hero />
          <NotificationBar />
          <Rankings />
          <About />
          <VideoSection />
          <Departments />
          <PlacementPartners />
          <Campus />
          <News />
        </main>
        <Accreditations />
        <Footer />
        <ScrollToTop />
        <ExploreButton />
      </div>
    </>
  );
}
