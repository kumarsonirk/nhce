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
import { MessageCircle, X, Phone } from 'lucide-react';

function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-40 flex flex-col items-end gap-3">
      {/* Chat window */}
      {chatOpen && (
        <div className="mb-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-navy-900 to-navy-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={14} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-xs">NHCE Admission Help</div>
                <div className="text-white/60 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Online now
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="p-4">
            <div className="bg-slate-50 rounded-xl p-3 mb-3">
              <p className="text-xs text-slate-700">
                👋 Hi! I'm here to help you with admissions, programs, fees, and more. How can I assist you today?
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Admission Process', 'Fee Structure', 'Placements', 'Programs'].map(q => (
                <button key={q} className="text-xs px-3 py-1.5 border border-navy-200 text-navy-700 rounded-full hover:bg-navy-50 transition-colors">
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Type your question..." className="flex-1 text-xs border border-slate-200 rounded-full px-3 py-2 outline-none focus:border-navy-400" />
              <button className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={13} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick call button */}
      <a
        href="tel:+918023216776"
        className="w-11 h-11 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
        title="Call Admissions"
      >
        <Phone size={16} />
      </a>

      {/* Chat button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 ${
          chatOpen ? 'bg-slate-700' : 'bg-navy-900 hover:bg-navy-800'
        } text-white`}
      >
        {chatOpen ? <X size={18} /> : <MessageCircle size={18} />}
      </button>
    </div>
  );
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-navy-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-navy-950 font-display font-black text-2xl">NH</span>
        </div>
        <div className="font-display font-bold text-white text-xl mb-1">New Horizon</div>
        <div className="text-white/50 text-xs mb-5">College of Engineering</div>
        <div className="w-40 h-0.5 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-full animate-[loading_1.6s_ease-in-out_forwards]" style={{ animation: 'grow 1.6s ease-out forwards' }} />
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
        <FloatingActions />
      </div>
    </>
  );
}
