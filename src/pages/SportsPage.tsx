import { useEffect, useState } from 'react';
import { Trophy, Dumbbell, Sun, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

const ACH_SLIDES = [
  '/sports/Sports Achievement LED_SLide45.jpg',
  '/sports/Sports Achievement LED_SLide46.jpg',
  '/sports/Sports Achievement LED_SLide47.jpg',
  '/sports/Sports Achievement LED_SLide48.jpg',
  '/sports/Sports Achievement LED_SLide49.jpg',
  '/sports/Sports Achievement_2024.jpg',
];

const SPORTS = [
  {
    id: 'basketball',
    name: 'Basketball',
    cover: '/sports/basketball4.JPG',
    tag: 'Indoor & Outdoor',
    color: '#f97316',
    desc: 'State-level competitors with both indoor and outdoor courts. Regular VTU tournament participants.',
    featured: true,
  },
  {
    id: 'football',
    name: 'Football',
    cover: '/sports/football2.JPG',
    tag: 'Outdoor',
    color: '#16a34a',
    desc: 'A passionate squad representing NHCE across intercollegiate and university leagues.',
    featured: false,
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    cover: '/sports/volley_ball1.JPG',
    tag: 'Indoor & Outdoor',
    color: '#2563eb',
    desc: 'Competitive teams trained by professional coaches — regular VTU participants.',
    featured: false,
  },
  {
    id: 'throwball',
    name: 'Throwball',
    cover: '/sports/throwball1.JPG',
    tag: 'Outdoor',
    color: '#dc2626',
    desc: 'Championship wins at intercollegiate tournaments and state-level representation.',
    featured: false,
  },
  {
    id: 'kabaddi',
    name: 'Kabaddi',
    cover: '/sports/kabbadi1.JPG',
    tag: 'Outdoor',
    color: '#7c3aed',
    desc: 'Traditional sport played with intensity — representing the college at VTU level.',
    featured: false,
  },
  {
    id: 'chess',
    name: 'Chess',
    cover: '/sports/chess.JPG',
    tag: 'Indoor',
    color: '#475569',
    desc: 'Annual intercollegiate chess tournaments hosted by NHCE with national-level participants.',
    featured: false,
  },
];

const OUTDOOR = [
  'Cricket practice pitches & nets',
  'Tennis court',
  'Throw Ball court',
  'Volley Ball court',
  'Basketball court',
  'Football ground',
  'Outdoor Gymnasium',
];

const INDOOR = [
  'Indoor Basketball court',
  'Badminton courts',
  'Table Tennis boards',
  'Chess & Carrom',
  'Indoor Gymnasium',
];

export default function SportsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') setLightbox(p => p === null ? null : (p + ACH_SLIDES.length - 1) % ACH_SLIDES.length);
      if (e.key === 'ArrowRight') setLightbox(p => p === null ? null : (p + 1) % ACH_SLIDES.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-white">

      <HeroSection
        image="/sports/basketball3.JPG"
        badge="Physical Education · NHCE"
        headingSmall="New Horizon College of Engineering"
        headingMain="Sports"
        headingGhost="at NHCE"
        description="Played with fervour and passion. Professional coaches, state-level tournaments, and a culture that values every athlete."
        button={{ label: 'View Achievements', href: '#achievements' }}
        secondaryButton={{ label: 'Our Sports', href: '#disciplines' }}
      />

      {/* ── STATS STRIP ───────────────────────────────────── */}
      <section className="bg-slate-950">
        <div className="container-wide">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { n: '6+',    label: 'Sports Played'        },
              { n: '12+',   label: 'Courts & Fields'      },
              { n: 'VTU',   label: 'University Level'     },
              { n: 'State', label: 'Tournaments'          },
            ].map(s => (
              <div key={s.label} className="px-6 py-7 text-center">
                <div className="text-3xl sm:text-4xl font-black text-orange-400 mb-1">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPORTS BENTO GRID ─────────────────────────────── */}
      <section id="disciplines" className="container-wide py-16 lg:py-24">
        <AnimateIn variant="fade-up">
        <div className="mb-10">
          <p className="text-xs font-bold text-orange-500 tracking-[4px] uppercase mb-2">Disciplines</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-none">Sports We Play</h2>
        </div>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={100}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 lg:auto-rows-[260px]">
          {SPORTS.map(sport => (
            <div
              key={sport.id}
              className={[
                'group relative overflow-hidden rounded-2xl cursor-default',
                sport.featured
                  ? 'col-span-2 h-[240px] sm:h-[300px] lg:col-span-2 lg:row-span-2 lg:h-auto'
                  : 'h-[160px] sm:h-[200px] lg:h-auto',
              ].join(' ')}
            >
              <img
                src={sport.cover}
                alt={sport.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay — taller on hover to cover description area */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: sport.color }} />
              {/* Label + description */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border border-white/20 text-white/60 mb-2">
                  {sport.tag}
                </span>
                <h3 className={`text-white font-black leading-tight ${sport.featured ? 'text-3xl sm:text-4xl' : 'text-lg sm:text-2xl'}`}>
                  {sport.name}
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p className={[
                    'min-h-0 overflow-hidden text-white/75 leading-relaxed text-sm',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100',
                    sport.featured ? 'pt-2' : 'pt-1.5',
                  ].join(' ')}>
                    {sport.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </AnimateIn>
      </section>

      {/* ── ACHIEVEMENTS SLIDER ───────────────────────────── */}
      <section id="achievements" className="bg-slate-950 py-16 lg:py-24 overflow-hidden">
        <div className="container-wide mb-10">
          <AnimateIn variant="fade-up">
          <div className="flex items-end gap-4 mb-1">
            <Trophy size={28} className="text-orange-400 flex-shrink-0 mb-0.5" />
            <p className="text-xs font-bold text-orange-500 tracking-[4px] uppercase">Record of Excellence</p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-none mb-3">Achievements</h2>
          <p className="text-white/45 text-base max-w-lg leading-relaxed">
            State championships, university medals, and intercollegiate glory —
            a relentless pursuit of winning year after year.
          </p>
          </AnimateIn>
        </div>

        {/* Infinite scroll track */}
        <div className="relative">
          <div
            className="flex gap-4"
            style={{ animation: 'galleryScroll 28s linear infinite', width: 'max-content' }}
          >
            {[...ACH_SLIDES, ...ACH_SLIDES].map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i % ACH_SLIDES.length)}
                className="flex-shrink-0 rounded-xl overflow-hidden group/slide relative"
                style={{ width: '440px', height: '280px' }}
              >
                <img
                  src={src}
                  alt={`Achievement ${(i % ACH_SLIDES.length) + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/slide:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 size={22} className="text-white opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 drop-shadow" />
                </div>
              </button>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── FACILITIES ────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="container-wide mb-10">
          <p className="text-xs font-bold text-orange-500 tracking-[4px] uppercase mb-2">Infrastructure</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-none mb-3">Facilities</h2>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed">
            An indoor stadium with state-of-the-art facilities and a spacious, well-maintained
            ground let students play and hone their skills every day.
          </p>
        </div>

        <AnimateIn variant="fade-up" delay={80}>
        <div className="container-wide grid lg:grid-cols-2 gap-4">
          {/* Outdoor */}
          <div className="relative rounded-2xl overflow-hidden min-h-[440px] group">
            <img
              src="/sports/volley_ball2.JPG"
              alt="Outdoor facilities"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
            <div className="relative h-full flex flex-col justify-between p-7 sm:p-9">
              {/* Top label */}
              <div className="flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30">
                <Sun size={12} className="text-orange-400" />
                <span className="text-xs font-bold text-orange-300 tracking-[2px] uppercase">Outdoor</span>
              </div>
              {/* Bottom list */}
              <div>
                <p className="text-white/30 text-sm font-semibold uppercase tracking-widest mb-4">
                  {OUTDOOR.length} facilities
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {OUTDOOR.map(item => (
                    <li key={item} className="flex items-center gap-2 text-white/80 text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Indoor */}
          <div className="relative rounded-2xl overflow-hidden min-h-[440px] group">
            <img
              src="/sports/basketball2.jpg"
              alt="Indoor facilities"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
            <div className="relative h-full flex flex-col justify-between p-7 sm:p-9">
              {/* Top label */}
              <div className="flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30">
                <Dumbbell size={12} className="text-blue-400" />
                <span className="text-xs font-bold text-blue-300 tracking-[2px] uppercase">Indoor</span>
              </div>
              {/* Bottom list */}
              <div>
                <p className="text-white/30 text-sm font-semibold uppercase tracking-widest mb-4">
                  {INDOOR.length} facilities
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {INDOOR.map(item => (
                    <li key={item} className="flex items-center gap-2 text-white/80 text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        </AnimateIn>
      </section>

      {/* ── HOD QUOTE ─────────────────────────────────────── */}
      <section className="container-wide py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row gap-8 items-start w-full">
          <img
            src="/public/sports/sanjay-sv.webp"
            alt="Mr. Sanjay S V"
            className="w-24 h-24 sm:w-64 sm:h-64 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-orange-500 tracking-[4px] uppercase mb-3">
              Head of Department
            </p>
            <p className="text-base md:text-lg font-black text-slate-700 leading-snug mb-5">
             Sports at the NHCE are played with much fervour and passion. There is emphasis on regular exercise and physical fitness. All games are supervised by professional coaches. Team spirit and the desire to give the best possible performance are our watchwords. Within a short span of time NHCE has seen tremendous improvement in the technique, fitness level as well as performance of our students in the sports arena. Our students regularly participate in tournaments including those at the state level.
            </p>
            <p className="font-black text-slate-900 text-xl">Mr. Sanjay S V</p>
            <p className="text-slate-400 text-base mt-0.5">
              HOD – Physical Education and Sports · NHCE
            </p>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
          style={{ animation: 'fadeIn 0.2s ease both' }}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={18} className="text-white" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + ACH_SLIDES.length - 1) % ACH_SLIDES.length); }}
          >
            <ChevronLeft size={22} className="text-white" />
          </button>

          {/* Image */}
          <div className="px-16 sm:px-24 w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <img
              key={lightbox}
              src={ACH_SLIDES[lightbox]}
              alt={`Achievement ${lightbox + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-xl"
              style={{ animation: 'fadeIn 0.18s ease both' }}
            />
            <p className="text-white/30 text-sm text-center mt-3 tabular-nums">
              {lightbox + 1} / {ACH_SLIDES.length}
            </p>
          </div>

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % ACH_SLIDES.length); }}
          >
            <ChevronRight size={22} className="text-white" />
          </button>
        </div>
      )}

    </div>
  );
}
