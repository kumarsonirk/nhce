import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Award, ChevronRight } from 'lucide-react';
import { DEPARTMENTS } from '../../data/constants';
import MobileSlider from '../ui/MobileSlider';
import AnimateIn from '../ui/AnimateIn';

const FILTERS = ['all', 'ug', 'pg'] as const;
type Filter = typeof FILTERS[number];

export default function Departments() {
  const [filter, setFilter] = useState<Filter>('all');
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const updatePill = (idx: number) => {
    const btn = btnRefs.current[idx];
    if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
  };

  // Set pill position on mount (no animation flash)
  useLayoutEffect(() => { updatePill(0); }, []);

  // Slide pill when filter changes
  useEffect(() => { updatePill(FILTERS.indexOf(filter)); }, [filter]);

  const ugDepts = ['CSE', 'ECE', 'CE', 'EEE', 'AIML'];
  const filtered = filter === 'ug'
    ? DEPARTMENTS.filter(d => ugDepts.includes(d.code))
    : filter === 'pg'
    ? DEPARTMENTS.filter(d => !ugDepts.includes(d.code))
    : DEPARTMENTS;

  return (
    <section id="departments" className="section-padding bg-slate-50">
      <div className="container-wide">

        {/* Header */}
        <AnimateIn variant="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="badge bg-navy-100 text-navy-700 mb-3">Programs & Departments</span>
            <h2 className="heading-md text-navy-950">
              Build Your{' '}
              <span className="text-gradient bg-gradient-to-r from-navy-700 to-gold-500">
                Expertise
              </span>
            </h2>
            <p className="text-slate-500 text-base mt-2 max-w-md">
              Choose from 12+ programs spanning engineering, management, and computing.
            </p>
          </div>
          <div className="relative flex w-full justify-between md:w-fit md:justify-start bg-white border border-slate-200 gap-4 md:gap-20 p-1 rounded-full">
            {/* Sliding bubble indicator */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-navy-900 pointer-events-none"
              style={{
                left: pill.left,
                width: pill.width,
                transition: 'left 0.55s cubic-bezier(0.34,1.4,0.64,1), width 0.55s cubic-bezier(0.34,1.4,0.64,1)',
              }}
            />
            {FILTERS.map((f, i) => (
              <button
                key={f}
                ref={el => { btnRefs.current[i] = el; }}
                onClick={() => setFilter(f)}
                className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === f ? 'text-white' : 'text-slate-500 hover:text-navy-700'
                }`}
              >
                {f === 'all' ? 'All Programs' : f === 'ug' ? 'UG' : 'PG'}
              </button>
            ))}
          </div>
        </div>
        </AnimateIn>

        {/* Grid */}
        <AnimateIn variant="fade-up" delay={140}>
        <MobileSlider key={filter} desktopClass="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((dept) => (
            <div
              key={dept.code}
className="bg-white rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
            >
              {/* Image section */}
              <div className="relative h-44">
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  {/* Color tint overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-30`} />

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dept.color}`} />

                  {/* Badges — top right */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-white text-xs font-bold tracking-wide bg-gradient-to-r ${dept.color} shadow-md`}>
                      {dept.code}
                    </span>
                    {dept.accredited && (
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white/95 text-green-700 flex items-center gap-1 shadow-sm">
                        <Award size={9} /> NBA
                      </span>
                    )}
                  </div>
                </div>

                {/* Floating icon — bottom left */}
                <div className="absolute -bottom-0 left-4 translate-y-1/2 w-12 h-12 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-2xl z-10">
                  {dept.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 pt-8">
                <h3 className="font-bold text-navy-900 text-base leading-snug mb-2.5 group-hover:text-navy-600 transition-colors">
                  {dept.name}
                </h3>

                {/* Stats row */}
                <div className="flex gap-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Users size={11} className="text-slate-400" />
                    {dept.students.toLocaleString()} students
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} className="text-slate-400" />
                    {dept.intake}/yr intake
                  </span>
                </div>

                {/* CTA */}
                <button className="w-full flex items-center justify-between text-xs font-semibold text-navy-700 hover:text-navy-900 transition-colors group/btn border-t border-slate-100 pt-3">
                  <span>Explore Program</span>
                  <ChevronRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </MobileSlider>
        </AnimateIn>

        {/* CTA */}
        <AnimateIn variant="fade-up" delay={80}>
        <div className="text-center mt-10">
          <Link to="/programs" className="btn-primary">
            View All Programs & Courses <ChevronRight size={15} />
          </Link>
        </div>
        </AnimateIn>
      </div>
    </section>
  );
}
