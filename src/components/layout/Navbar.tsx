import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useInView';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-navy-600 to-gold-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="container-wide">
        <div className="flex items-center justify-between h-24">

          {/* Logo — left */}
          <a href="#" className="flex items-center group">
            <img
              src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/07/nhce_25-scaled-1-2048x683.png"
              alt="New Horizon College of Engineering"
              className="h-16 w-auto object-contain"
            />
          </a>

          {/* Hamburger — right */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} className="text-slate-700" /> : <Menu size={20} className="text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
          <div className="container-wide py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { label: 'About NHCE', href: '#about' },
              { label: 'Departments', href: '#departments' },
              { label: 'Admissions', href: '#admissions' },
              { label: 'Placements', href: '#placements' },
              { label: 'Research', href: '#research' },
              { label: 'Campus Life', href: '#campus' },
              { label: 'Rankings', href: '#rankings' },
              { label: 'Faculty', href: '#faculty' },
              { label: 'Events', href: '#events' },
              { label: 'News', href: '#news' },
              { label: 'Contact', href: '#contact' },
              { label: 'Student Portal', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setIsOpen(false);
                  const el = document.querySelector(item.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-navy-50 transition-colors group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-navy-200 group-hover:bg-navy-600 transition-colors flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-navy-700 transition-colors">{item.label}</span>
              </a>
            ))}
            <div className="sm:col-span-2 lg:col-span-3 pt-4 border-t border-slate-100 mt-2 flex flex-wrap gap-3">
              <a href="#admissions" onClick={() => setIsOpen(false)} className="btn-primary text-sm">Apply Now 2025–26</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="border border-slate-200 rounded-full px-6 py-2.5 text-sm font-medium text-slate-600 hover:border-navy-400 hover:text-navy-700 transition-colors">Student Portal</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
