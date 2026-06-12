import { useState, useEffect } from 'react';
import Hero from '../components/sections/Hero';
import NotificationBar from '../components/sections/NotificationBar';
import About from '../components/sections/About';
import VideoSection from '../components/sections/VideoSection';
import Departments from '../components/sections/Departments';
import PlacementPartners from '../components/sections/PlacementPartners';
import Campus from '../components/sections/Campus';
import { News } from '../components/sections/EventsNews';
import { Search, X, Plus, BookOpen, Briefcase, Zap, Mail } from 'lucide-react';

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div className="text-center">
        <img
          src="/main_logo.png"
          alt="New Horizon College of Engineering"
          className="h-16 w-auto object-contain mx-auto mb-6"
        />
        <div className="w-40 h-0.5 bg-slate-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-full"
            style={{ animation: 'grow 1.6s ease-out forwards' }} />
        </div>
      </div>
      <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}

const EXPLORE_ITEMS = [
  { label: 'Admissions',   href: '/admissions',  icon: Plus,     isRoute: true  },
  { label: 'Programs',     href: '#departments', icon: BookOpen, isRoute: false },
  { label: 'Placements',   href: '#placements',  icon: Briefcase,isRoute: false },
  { label: 'News & Events',href: '#events',      icon: Zap,      isRoute: false },
  { label: 'Contact Us',   href: '#contact',     icon: Mail,     isRoute: false },
];

function ExploreButton() {
  const [open, setOpen] = useState(false);

  const handleClick = (item: typeof EXPLORE_ITEMS[0]) => {
    setOpen(false);
    if (item.isRoute) {
      window.location.href = item.href;
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 md:hidden">
      {open && (
        <>
          <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />
          <div className="flex flex-col items-end gap-2 mb-1">
            {EXPLORE_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className="flex items-center gap-3 bg-white text-navy-800 font-semibold text-sm px-5 py-3 rounded-full shadow-lg border border-slate-100 animate-[fadeSlideUp_0.2s_ease_both]"
              >
                {item.label}
                <item.icon size={15} className="text-blue-600" />
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

export default function HomePage() {
  const [loading, setLoading] = useState(() => !localStorage.getItem('nhce_loaded'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadDone = () => {
    localStorage.setItem('nhce_loaded', '1');
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen onDone={handleLoadDone} />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <main>
          <Hero />
          <NotificationBar />
          <About />
          <VideoSection />
          <Departments />
          <PlacementPartners />
          <Campus />
          <News />
        </main>
        <ExploreButton />
      </div>
    </>
  );
}
