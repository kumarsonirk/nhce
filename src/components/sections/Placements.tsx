import { useState, useEffect } from 'react';
import { TrendingUp, Award, Users, Building2 } from 'lucide-react';
import { RECRUITERS } from '../../data/constants';

const PLACEMENT_STATS = [
  { val: '98%', label: 'Placement Rate', sub: 'Batch 2024', icon: <TrendingUp size={18} />, color: 'from-green-400 to-emerald-600' },
  { val: '₹42L', label: 'Highest CTC', sub: 'Tech Sector', icon: <Award size={18} />, color: 'from-gold-400 to-amber-600' },
  { val: '₹6.8L', label: 'Average CTC', sub: 'All branches', icon: <Users size={18} />, color: 'from-blue-400 to-indigo-600' },
  { val: '120+', label: 'Recruiters', sub: 'Fortune 500 included', icon: <Building2 size={18} />, color: 'from-purple-400 to-violet-600' },
];

const SECTOR_DATA = [
  { sector: 'Software & IT', pct: 62, color: 'from-blue-500 to-indigo-600' },
  { sector: 'Core Engineering', pct: 18, color: 'from-orange-500 to-red-600' },
  { sector: 'Analytics & AI', pct: 12, color: 'from-purple-500 to-pink-600' },
  { sector: 'Management & Consulting', pct: 8, color: 'from-green-500 to-teal-600' },
];

export default function Placements() {
  const [marqueeOffset, setMarqueeOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueeOffset(o => o - 1);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const totalWidth = RECRUITERS.length * 160;
  const offset = ((marqueeOffset % totalWidth) + totalWidth) % totalWidth;

  return (
    <section id="placements" className="section-padding bg-white">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-green-100 text-green-700 mb-3">🎯 Placement Cell</span>
          <h2 className="heading-md text-navy-950 mb-4">
            Careers That{' '}
            <span className="text-gradient bg-gradient-to-r from-green-600 to-emerald-500">
              Define Futures
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Our dedicated Training & Placement Cell connects students with India's top companies through
            year-round campus drives, internships, and industry mentorship programs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {PLACEMENT_STATS.map((s) => (
            <div key={s.label} className="card p-5 text-center group hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
              </div>
              <div className="font-display font-black text-2xl text-navy-950 mb-0.5">{s.val}</div>
              <div className="text-sm font-semibold text-slate-700 mb-0.5">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two column: chart + top companies */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          {/* Sector breakdown */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-navy-900 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-500 rounded-full" /> Placement by Sector — 2024
            </h3>
            <div className="space-y-4">
              {SECTOR_DATA.map(s => (
                <div key={s.sector}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">{s.sector}</span>
                    <span className="font-bold text-navy-700">{s.pct}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>2,847 students placed</span>
              <span className="text-green-600 font-semibold">↑ 3.2% from 2023</span>
            </div>
          </div>

          {/* Year-wise trend */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-navy-900 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-navy-700 rounded-full" /> Year-wise Package Trend
            </h3>
            <div className="space-y-4">
              {[
                { year: '2024', highest: 42, avg: 6.8, placed: 98 },
                { year: '2023', highest: 38, avg: 6.1, placed: 95 },
                { year: '2022', highest: 30, avg: 5.4, placed: 92 },
                { year: '2021', highest: 24, avg: 4.8, placed: 88 },
              ].map(y => (
                <div key={y.year} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-8">{y.year}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      className="h-7 bg-gradient-to-r from-navy-600 to-navy-400 rounded-lg flex items-center px-2 transition-all duration-1000"
                      style={{ width: `${(y.avg / 8) * 100}%`, minWidth: 60 }}
                    >
                      <span className="text-white text-xs font-bold">₹{y.avg}L avg</span>
                    </div>
                    <span className="text-xs font-medium text-gold-600">↑ {y.highest}L max</span>
                  </div>
                  <span className="text-xs text-green-600 font-semibold w-10 text-right">{y.placed}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recruiters marquee */}
        <div>
          <div className="text-center mb-6">
            <h3 className="font-display font-bold text-navy-900 text-xl">Our Recruiters</h3>
            <p className="text-slate-500 text-sm">120+ companies trust NHCE graduates</p>
          </div>
          <div className="overflow-hidden py-4 relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex gap-4 marquee-wrapper">
              <div
                className="flex gap-4 marquee-inner"
                style={{
                  transform: `translateX(-${offset % (totalWidth / 2)}px)`,
                  transition: 'none',
                }}
              >
                {[...RECRUITERS, ...RECRUITERS].map((rec, i) => (
                  <div
                    key={`${rec.name}-${i}`}
                    className="flex-shrink-0 h-14 px-6 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-pointer group"
                    style={{ minWidth: 140 }}
                  >
                    <span
                      className="font-bold text-sm text-slate-700 transition-colors duration-300"
                    >
                      {rec.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="btn-primary">
              View All Recruiters & Placement Reports
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
