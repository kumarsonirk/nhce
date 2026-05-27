import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, GraduationCap, Building2, FlaskConical, Trophy,
  Users, CalendarDays, Newspaper, Phone, BookOpen,
  Briefcase, Landmark, UserCircle, Search, ArrowRight
} from 'lucide-react';
import { useScrollProgress } from '../../hooks/useInView';

const navItems = [
  { label: 'About NHCE',    href: '#about',       icon: GraduationCap, color: 'from-blue-500 to-indigo-600',    glow: 'group-hover:shadow-blue-500/30' },
  { label: 'Departments',   href: '#departments', icon: Building2,     color: 'from-violet-500 to-purple-600',  glow: 'group-hover:shadow-violet-500/30' },
  { label: 'Admissions',    href: '#admissions',  icon: BookOpen,      color: 'from-emerald-400 to-teal-600',   glow: 'group-hover:shadow-emerald-500/30' },
  { label: 'Placements',    href: '#placements',  icon: Briefcase,     color: 'from-amber-400 to-orange-500',   glow: 'group-hover:shadow-amber-500/30' },
  { label: 'Research',      href: '#research',    icon: FlaskConical,  color: 'from-cyan-400 to-sky-600',       glow: 'group-hover:shadow-cyan-500/30' },
  { label: 'Campus Life',   href: '#campus',      icon: Landmark,      color: 'from-pink-400 to-rose-500',      glow: 'group-hover:shadow-pink-500/30' },
  { label: 'Rankings',      href: '#rankings',    icon: Trophy,        color: 'from-yellow-400 to-amber-500',   glow: 'group-hover:shadow-yellow-500/30' },
  { label: 'Faculty',       href: '#faculty',     icon: Users,         color: 'from-indigo-400 to-blue-600',    glow: 'group-hover:shadow-indigo-500/30' },
  { label: 'Events',        href: '#events',      icon: CalendarDays,  color: 'from-teal-400 to-emerald-600',   glow: 'group-hover:shadow-teal-500/30' },
  { label: 'News',          href: '#news',        icon: Newspaper,     color: 'from-red-400 to-rose-600',       glow: 'group-hover:shadow-red-500/30' },
  { label: 'Contact',       href: '#contact',     icon: Phone,         color: 'from-slate-400 to-slate-600',    glow: 'group-hover:shadow-slate-400/30' },
  { label: 'Student Portal',href: '#contact',     icon: UserCircle,    color: 'from-fuchsia-400 to-purple-600', glow: 'group-hover:shadow-fuchsia-500/30' },
];

const stats = [
  { value: '3000+', label: 'Annual Placements' },
  { value: 'A+', label: 'NAAC Grade' },
  { value: '#1', label: 'Ranked in Bangalore' },
  { value: '25+', label: 'Years of Excellence' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const progress = useScrollProgress();

  const filtered = query.trim()
    ? navItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : navItems;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      setInHero(window.scrollY < window.innerHeight * 0.82);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setQuery('');
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => { setIsOpen(false); setQuery(''); }}
      />

    <header
      ref={menuRef}
      className={`max-sm:fixed sm:sticky py-4 top-0 z-50 w-full transition-all duration-500 ${
        scrolled || !inHero || isOpen
          ? 'bg-white shadow-sm border-b border-slate-100'
          : ''
      }`}
    >

        <div className="flex items-center justify-between h-16 sm:h-24 px-4 sm:px-6">
          <a href="#" className="flex items-center">
            <img
              src="/main_logo.webp"
              alt="New Horizon College of Engineering"
              className="h-16 sm:h-16 w-auto object-contain"
            />
          </a>

          <div className="flex items-center gap-1">
            <button
              onClick={() => { setIsOpen(true); setTimeout(() => searchRef.current?.focus(), 100); }}
              className="w-10 h-10 rounded-xl hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-black drop-shadow" />
            </button>
            <button
              onClick={() => { setIsOpen(!isOpen); setQuery(''); }}
              className="w-10 h-10 rounded-xl hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen
                ? <X size={20} className="text-slate-700" />
                : <Menu size={20} className="text-black drop-shadow" />}
            </button>
          </div>
        </div>

      {/* Light launcher panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-slate-50 border-t border-slate-200 shadow-2xl">

          {/* Search bar */}
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="container-wide flex justify-center">
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 w-full max-w-md focus-within:border-navy-400 focus-within:ring-2 focus-within:ring-navy-100 transition-all shadow-sm">
                <Search size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search NHCE..."
                  className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Icon grid */}
          <div className="container-wide py-8">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {filtered.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer ${item.glow} hover:shadow-lg`}
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <span className="text-xs font-medium text-slate-500 group-hover:text-slate-800 text-center leading-tight transition-colors">
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-400 text-sm py-4">No results for &ldquo;{query}&rdquo;</p>
            )}
          </div>

          {/* Bottom bar — stats + CTAs */}
          <div className="border-t border-slate-200 bg-white">
            <div className="container-wide py-4 flex flex-wrap items-center justify-between gap-4">
              {/* Stats */}
              <div className="flex items-center gap-6 flex-wrap">
                {stats.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    {i > 0 && <span className="hidden sm:block w-px h-4 bg-slate-200" />}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-navy-700">{s.value}</span>
                      <span className="text-xs text-slate-400">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <a
                  href="#admissions"
                  onClick={() => handleNavClick('#admissions')}
                  className="flex items-center gap-2 bg-navy-700 hover:bg-navy-800 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                >
                  Apply Now 2025–26 <ArrowRight size={14} />
                </a>
                <a
                  href="#contact"
                  onClick={() => handleNavClick('#contact')}
                  className="text-sm font-medium text-slate-600 hover:text-navy-700 border border-slate-200 hover:border-navy-300 px-5 py-2.5 rounded-full transition-all"
                >
                  Student Portal
                </a>
              </div>
            </div>
          </div>

        </div>
      )}
    </header>
    </>
  );
}
