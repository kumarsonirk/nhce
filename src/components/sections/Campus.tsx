import { CAMPUS_HIGHLIGHTS } from '../../data/constants';
import MobileSlider from '../ui/MobileSlider';
import AnimateIn from '../ui/AnimateIn';

const FACILITIES = [
  {
    label: 'Main Block',
    desc: 'Smart classrooms, seminar halls, and faculty offices across 6 floors',
    icon: '🏛️',
    image: '/campus/classroom4.jpg',
  },
  {
    label: 'Library',
    desc: '60,000 sq.ft with 1 lakh+ volumes, journals, and digital resources',
    icon: '📚',
    image: '/campus/library.webp',
  },
  {
    label: 'Sports Complex',
    desc: 'Indoor & outdoor facilities covering cricket, basketball, and more',
    icon: '🏃',
    image: '/campus/sport.jpg',
  },
  {
    label: 'Innovation Lab',
    desc: 'Maker space, 3D printers, IoT kits, and a startup incubator',
    icon: '💡',
    image: '/campus/idea_labs.jpg',
  },
  {
    label: 'Cafeteria',
    desc: 'Multi-cuisine food court serving 2,000+ students every day',
    icon: '🍽️',
    image: '/campus/canteen1.jpg',
  },
  {
    label: 'Auditorium',
    desc: '2,000-seat air-conditioned hall for events and convocations',
    icon: '🎭',
    image: '/campus/auditorium.jpg',
  },
];

const KEY_STATS = [
  { value: '55', suffix: 'ac', label: 'Green Campus' },
  { value: '40+', suffix: '', label: 'Student Clubs' },
  { value: '24/7', suffix: '', label: 'Campus Access' },
];

export default function Campus() {
  return (
    <section id="campus" className="section-padding bg-white">
      <div className="container-wide">

        {/* Header */}
        <AnimateIn variant="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="badge bg-amber-100 text-amber-700 mb-3">🏫 Campus Life</span>
            <h2 className="heading-md text-navy-950">
              More Than Just{' '}
              <span className="text-gradient bg-gradient-to-r from-amber-500 to-orange-500">
                Classrooms
              </span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-lg">
              Life at NHCE is a vibrant blend of academics, sports, arts, and entrepreneurship.
              With world-class facilities on a 55-acre green campus, every day is an opportunity to grow.
            </p>
          </div>
          <div className="flex gap-6 flex-shrink-0">
            {KEY_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-black text-navy-900 text-2xl leading-none">
                  {s.value}<span className="text-amber-500 text-base">{s.suffix}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        </AnimateIn>

        {/* Facility cards — full width 3×2 */}
        <AnimateIn variant="fade-up" delay={100}>
        <div className="mb-6"><MobileSlider desktopClass="grid-cols-2 lg:grid-cols-3 gap-4">
            {FACILITIES.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-slate-200 overflow-hidden hover:border-navy-200 hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {/* Floating icon */}
                  <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-white/95 shadow-md flex items-center justify-center text-lg">
                    {f.icon}
                  </div>
                </div>
                {/* Text */}
                <div className="p-4">
                  <div className="font-semibold text-navy-900 text-sm mb-1 group-hover:text-navy-700 transition-colors">
                    {f.label}
                  </div>
                  <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
        </MobileSlider></div>
        </AnimateIn>

        {/* Highlights strip */}
        <AnimateIn variant="fade-up" delay={160}>
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-slate-200">
            {CAMPUS_HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="flex flex-col items-center text-center px-4 py-6 bg-slate-50 hover:bg-navy-50 transition-colors duration-200 cursor-default"
              >
                <span className="text-xl mb-2">{h.icon}</span>
                <div className="text-xs font-bold text-navy-900 mb-0.5">{h.title}</div>
                <div className="text-xs text-slate-500">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
        </AnimateIn>

      </div>
    </section>
  );
}
