import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import VideoSection from './components/sections/VideoSection';
import Departments from './components/sections/Departments';
import PlacementPartners from './components/sections/PlacementPartners';
import Campus from './components/sections/Campus';
import { News } from './components/sections/EventsNews';
import Rankings from './components/sections/Rankings';
import { ArrowUp } from 'lucide-react';

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

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Hero />
          <Rankings />
          <About />
          <VideoSection />
          <Departments />
          <PlacementPartners />
          <Campus />
          <News />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
