import { useState, useEffect, useRef } from 'react';
import {
  Music, Cpu, Briefcase, BookOpen, Mic2, Footprints, Flame, Sparkles,
  Trophy, Star, Flower2, Heart, Award, CheckCircle2, ArrowRight,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Types ─────────────────────────────────────────────── */

type Category = 'fests' | 'celebrations' | 'sports' | 'special';

interface Event {
  id: number;
  name: string;
  category: Category;
  featured?: boolean;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  barBg: string;
  barLabel: string;
  textAccent: string;
  icon: React.ElementType;
}

/* ─── Category labels ────────────────────────────────────── */

const CAT_LABELS: Record<Category, string> = {
  fests:        'Flagship Fest',
  celebrations: 'Campus Celebration',
  sports:       'Sports Event',
  special:      'Special Event',
};

const CATEGORIES = [
  { id: 'all',          label: 'All Events',     count: 13 },
  { id: 'fests',        label: 'Flagship Fests', count: 4  },
  { id: 'celebrations', label: 'Celebrations',   count: 3  },
  { id: 'sports',       label: 'Sports Events',  count: 3  },
  { id: 'special',      label: 'Special Events', count: 3  },
];


/* ─── Event data ─────────────────────────────────────────── */

const EVENTS: Event[] = [
  {
    id: 1, name: 'SARGAM', category: 'fests', featured: true,
    tagline: 'Annual Student Cultural Fest',
    description: 'A student-led cultural fest built around a unique theme each year — celebrating music, dance, and artistic expression with multi-category competitions and attractive prize money. Sargam blends creativity with youthful pride, turning every performance into a celebration of art, gratitude, and collective spirit.',
    highlights: ['Multi-category competitions', 'Attractive prize money', 'Performances & connects', 'Annual campus tradition'],
    tags: ['Music', 'Dance', 'Arts', 'Cultural'],
    gradient: 'from-amber-900 via-yellow-800 to-amber-700',
    barBg: 'bg-amber-500', barLabel: 'CULTURAL FEST', textAccent: 'text-amber-600',
    icon: Music,
  },
  {
    id: 2, name: 'QuantumX', category: 'fests', featured: true,
    tagline: 'International Techno-Managerial Fest',
    description: 'NHCE\'s flagship 3-day international fest with 20+ events and 2000+ participants — featuring tech challenges, AI workshops, startup pitching, hardware/software competitions, and live concerts by famous artists from across India.',
    highlights: ['20+ events', '2000+ innovative minds', 'Prize pool in lakhs', 'Live concerts'],
    tags: ['Tech', 'AI', 'Innovation', 'Robotics', 'Management'],
    gradient: 'from-slate-950 via-blue-950 to-indigo-900',
    barBg: 'bg-blue-700', barLabel: 'TECH FEST', textAccent: 'text-blue-700',
    icon: Cpu,
  },
  {
    id: 3, name: 'RUDRAKSH', category: 'fests', featured: true,
    tagline: 'National Management & Cultural Fest',
    description: 'Annual national-level fest by the Department of Management Studies — challenging participants through business simulations, workshops, and cultural showcases across Marketing, Finance, HR, and Entrepreneurship. A dynamic platform for leadership, innovation, and collaboration.',
    highlights: ['National level competition', 'Business simulations', 'Networking opportunities', 'Cultural showcases'],
    tags: ['Management', 'Business', 'Strategy', 'Entrepreneurship'],
    gradient: 'from-violet-950 via-indigo-900 to-purple-900',
    barBg: 'bg-violet-700', barLabel: 'MGMT FEST', textAccent: 'text-violet-700',
    icon: Briefcase,
  },
  {
    id: 4, name: 'INITIUM', category: 'fests', featured: true,
    tagline: 'Inter-Collegiate Literary & Cultural Fest',
    description: 'NHCE\'s flagship literary and cultural fest since 2022 — 70+ events hosted, 11,753+ footfall, and 2,058+ participants celebrating literature, music, fashion, dance, gaming, and stand-up comedy. INITIUM transforms ideas into experiences without limits.',
    highlights: ['70+ events hosted', '11,753+ footfall', '2,058+ participants', 'Growing since 2022'],
    tags: ['Literary', 'Fashion', 'Dance', 'Gaming', 'Comedy'],
    gradient: 'from-rose-950 via-purple-950 to-fuchsia-900',
    barBg: 'bg-rose-600', barLabel: 'LIT FEST', textAccent: 'text-rose-600',
    icon: BookOpen,
  },
  {
    id: 5, name: 'TEDxNHCE – Iridescence', category: 'special',
    tagline: 'Ideas Worth Spreading',
    description: 'An idea-driven event celebrating diverse perspectives and meaningful conversations — bringing together students and speakers to inspire innovation, leadership, resilience, and self-discovery. TEDxNHCE creates a platform for curiosity, reflection, and expression.',
    highlights: ['Expert speaker series', 'Cultural performances', 'Student-led platform', 'Thought leadership'],
    tags: ['Ideas', 'Innovation', 'Leadership', 'Inspiration'],
    gradient: 'from-red-950 via-red-900 to-rose-900',
    barBg: 'bg-red-600', barLabel: 'TEDX EVENT', textAccent: 'text-red-600',
    icon: Mic2,
  },
  {
    id: 6, name: 'Unity Run 2026', category: 'sports',
    tagline: 'Silver Jubilee Community Marathon',
    description: 'A large-scale fitness and community marathon with 3K, 5K, and 10K categories — celebrating health and collective well-being. Participants receive timed BIB, event T-shirt, finisher medal, refreshments, and medical assistance. Part of NHCE\'s Silver Jubilee celebrations.',
    highlights: ['3K / 5K / 10K races', 'Timed BIB + Finisher medal', 'E-certificate provided', 'Silver Jubilee edition'],
    tags: ['Marathon', 'Fitness', 'Community', 'Health'],
    gradient: 'from-teal-950 via-teal-900 to-green-800',
    barBg: 'bg-teal-600', barLabel: 'MARATHON', textAccent: 'text-teal-600',
    icon: Footprints,
  },
  {
    id: 7, name: 'Deepavali Celebration', category: 'celebrations',
    tagline: 'Festival of Lights & Togetherness',
    description: 'A vibrant campus celebration with ceremonial lamp lighting, invocation dance, live concerts by famous bands from across India, and a spectacular fireworks display — reflecting the triumph of light over darkness, goodness over adversity, and knowledge over ignorance.',
    highlights: ['Lamp lighting ceremony', 'Live concerts by famous bands', 'Spectacular fireworks', 'Festive food stalls'],
    tags: ['Festive', 'Cultural', 'Music', 'Community'],
    gradient: 'from-orange-950 via-orange-900 to-amber-800',
    barBg: 'bg-orange-500', barLabel: 'DEEPAVALI', textAccent: 'text-orange-600',
    icon: Flame,
  },
  {
    id: 8, name: 'Garba Night', category: 'celebrations',
    tagline: 'Navratri Cultural Celebration',
    description: 'A vibrant Navratri celebration featuring Devi Pooja, Shri Durga Stuti recitation, ceremonial lamp lighting, traditional music, and live Garba and Dandiya sessions in colourful traditional attire — a memorable blend of spirituality, tradition, joy, and togetherness.',
    highlights: ['Garba & Dandiya sessions', 'Devi Pooja & Aarathi', 'DJ session & festive stalls', 'Traditional attire celebration'],
    tags: ['Navratri', 'Garba', 'Dandiya', 'Tradition'],
    gradient: 'from-pink-950 via-rose-900 to-pink-800',
    barBg: 'bg-pink-600', barLabel: 'NAVRATRI', textAccent: 'text-pink-600',
    icon: Sparkles,
  },
  {
    id: 9, name: 'Hidden Gems', category: 'special',
    tagline: 'Staff Talent Showcase & Pageant',
    description: 'A vibrant staff talent showcase featuring creative performances, staff fashion walk with imaginative themes and coordinated presentations, and the grand Mr. & Ms. New Horizon pageant — celebrating individuality, teamwork, and the vibrant culture of the New Horizon community.',
    highlights: ['Staff fashion walk', 'Mr. & Ms. New Horizon', 'Talent performances', 'Institutional celebration'],
    tags: ['Staff', 'Talent', 'Fashion', 'Pageant'],
    gradient: 'from-cyan-950 via-teal-900 to-cyan-800',
    barBg: 'bg-cyan-600', barLabel: 'STAFF FEST', textAccent: 'text-cyan-600',
    icon: Star,
  },
  {
    id: 10, name: 'NHCUP 2026', category: 'sports',
    tagline: 'State-Level Inter-School Sports Championship',
    description: 'A large-scale competitive championship with 11 sporting disciplines, 50+ schools, and 1200+ athletes — including basketball, football, volleyball, badminton, chess, table tennis, taekwondo, yoga, and more across New Horizon campuses.',
    highlights: ['11 sporting disciplines', '50+ schools participate', '1200+ athletes competing', 'Multiple age categories'],
    tags: ['Basketball', 'Football', 'Badminton', 'Taekwondo', 'Yoga'],
    gradient: 'from-emerald-950 via-emerald-900 to-green-800',
    barBg: 'bg-emerald-600', barLabel: 'SPORTS', textAccent: 'text-emerald-700',
    icon: Trophy,
  },
  {
    id: 11, name: "Founder's Day", category: 'special',
    tagline: 'Honouring Dr. Mohan Manghnani',
    description: 'A special annual celebration honouring the vision and legacy of Dr. Mohan Manghnani — with cultural performances, tributes, scholarship recognitions, and inspirational addresses that reflect NHCE\'s journey of excellence and holistic education.',
    highlights: ['Scholarship recognition', 'Cultural tributes', 'Inspirational addresses', 'Institutional legacy'],
    tags: ['Legacy', 'Tribute', 'Celebration', 'Scholarships'],
    gradient: 'from-navy-950 via-navy-900 to-blue-900',
    barBg: 'bg-navy-800', barLabel: 'FOUNDERS', textAccent: 'text-navy-900',
    icon: Award,
  },
  {
    id: 12, name: 'Ganesha Chaturthi', category: 'celebrations',
    tagline: 'Sacred Celebration of Wisdom & Prosperity',
    description: 'A vibrant campus gathering with Ganapathi Homa, traditional pooja, soulful bhajans, devotional songs, and cultural performances — bringing students, faculty, staff, and institution leadership together in prayer, celebration, and spiritual harmony.',
    highlights: ['Ganapathi Homa & Pooja', 'Bhajans & devotional songs', 'Prasadam distribution', 'Community gathering'],
    tags: ['Spiritual', 'Traditional', 'Devotional', 'Cultural'],
    gradient: 'from-yellow-900 via-amber-900 to-orange-800',
    barBg: 'bg-amber-600', barLabel: 'FESTIVAL', textAccent: 'text-amber-700',
    icon: Flower2,
  },
  {
    id: 13, name: 'Annual Staff Sports Meet', category: 'sports',
    tagline: 'Faculty & Staff Athletic Festival',
    description: 'Annual fitness celebration for faculty and staff — featuring indoor, outdoor, athletic, and recreational events that foster teamwork, institutional unity, and employee engagement. Organised by the Department of Physical Education with enthusiastic participation from hundreds of staff members.',
    highlights: ['Indoor & outdoor events', 'Hundreds of participants', 'Cross-institutional teams', 'Awards & recognition'],
    tags: ['Staff', 'Athletics', 'Teamwork', 'Recreation'],
    gradient: 'from-sky-950 via-blue-900 to-cyan-800',
    barBg: 'bg-sky-600', barLabel: 'SPORTS MEET', textAccent: 'text-sky-600',
    icon: Heart,
  },
];

/* ─── Event Row ──────────────────────────────────────────── */

function EventRow({ event, index }: { event: Event; index: number }) {
  const Icon = event.icon;
  const isReversed = index % 2 !== 0;

  const ImageArea = (
    <div className={`relative flex-shrink-0 h-[45%] lg:h-full bg-gradient-to-br ${event.gradient} overflow-hidden`}>
      {/* Ghost number */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-none select-none leading-none font-black text-white/[0.06]"
        style={{ fontSize: 'clamp(80px, 12vw, 160px)' }}>
        {String(event.id).padStart(2, '0')}
      </div>

      {/* Dark vignette bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Centered icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
          <Icon size={44} className="text-white" strokeWidth={1.5} />
        </div>
      </div>

      {/* Flagship badge */}
      {event.featured && (
        <div className="absolute top-5 left-5 z-10">
          <span className="bg-gold-400 text-gold-900 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            Flagship
          </span>
        </div>
      )}

      {/* Bottom tagline strip */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 z-10">
        <p className="text-white/50 text-xs font-bold uppercase tracking-[3px] leading-tight">{event.tagline}</p>
      </div>
    </div>
  );

  const Bar = (
    <div className={`${event.barBg} flex-shrink-0`}>
      {/* Mobile: horizontal strip */}
      <div className="lg:hidden flex items-center px-5 py-3.5">
        <span className="text-white text-xs font-black uppercase tracking-[5px]">{event.barLabel}</span>
      </div>
      {/* Desktop: vertical bar with rotated text */}
      <div className="hidden lg:flex items-center justify-center w-full h-full min-h-full">
        <span
          className="text-white text-[11px] font-black uppercase tracking-[5px] whitespace-nowrap"
          style={{
            writingMode: 'vertical-rl',
            transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)',
          }}>
          {event.barLabel}
        </span>
      </div>
    </div>
  );

  const ContentArea = (
    <div className="bg-white flex-1 min-h-0 lg:flex-none lg:h-full flex flex-col justify-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-12 xl:px-14">
      <h3 className="font-display font-black text-lg sm:text-2xl lg:text-4xl text-navy-950 mb-2 lg:mb-4 leading-tight">
        {event.name}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-sm lg:text-base leading-relaxed mb-3 lg:mb-6">{event.description}</p>

      {/* Tags — desktop only */}
      <div className="hidden lg:flex flex-wrap gap-2 mb-6">
        {event.tags.map(tag => (
          <span key={tag} className="bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-1.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Highlights — desktop only */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-8 border-b border-slate-100">
        {event.highlights.map(h => (
          <div key={h} className="flex items-start gap-2">
            <CheckCircle2 size={14} className="text-navy-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-slate-600 leading-snug">{h}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div>
        <button className={`inline-flex items-center gap-2 ${event.barBg} text-white text-sm font-bold px-5 py-2.5 lg:px-6 lg:py-3 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 shadow-sm`}>
          Explore Event <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      {/* ── Mobile: vertical stack fills stacked panel height ── */}
      <div className="lg:hidden flex flex-col h-full">
        {ImageArea}
        {Bar}
        {ContentArea}
      </div>
      {/* ── Desktop: 3-col grid fills full sticky height ── */}
      <div
        className="hidden lg:grid h-full"
        style={{ gridTemplateColumns: isReversed ? '65fr 52px 35fr' : '35fr 52px 65fr' }}>
        {isReversed
          ? <>{ContentArea}{Bar}{ImageArea}</>
          : <>{ImageArea}{Bar}{ContentArea}</>}
      </div>
    </div>
  );
}

/* ─── Stacked Events (desktop scroll animation) ──────────── */

const SCROLL_PER_CARD = 500;
const CARD_TOP = 72; // scrolled navbar height (sm:h-16 = 64px + gap)
const SLIDE_PX = 420; // scroll distance over which the panel slides up after last card

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function StackedEvents({ events }: { events: Event[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);

  const totalScroll = (events.length - 1) * SCROLL_PER_CARD;

  useEffect(() => {
    const container = containerRef.current;
    const panel     = panelRef.current;
    if (!container || !panel) return;

    function update() {
      const rect    = container!.getBoundingClientRect();
      const scrolled = CARD_TOP - rect.top; // px scrolled past the stick point

      // Panel top: follow the card until it clamps at CARD_TOP (the stick point)
      panel!.style.top = `${Math.max(CARD_TOP, rect.top)}px`;

      // Slide the panel upward after last card animation → CTA enters naturally from below
      const exitScrolled = Math.max(0, scrolled - totalScroll);
      const slideP = Math.min(1, exitScrolled / SLIDE_PX);
      const slideY = -slideP * (window.innerHeight - CARD_TOP);
      panel!.style.transform = `translateY(${slideY}px)`;

      const isInView = rect.bottom > 0 && rect.top < window.innerHeight;
      panel!.style.opacity = '1';
      panel!.style.visibility = (isInView && slideP < 1) ? 'visible' : 'hidden';

      // Card sits flush at the top of the panel (no centering margin).
      // Card top from viewport = CARD_TOP; startY slides card in from viewport bottom.
      const vh = window.innerHeight;
      const cardNaturalTop = CARD_TOP;
      const startY = vh - cardNaturalTop;

      // Update each card's transform directly — no React state = no flicker
      events.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        if (i === 0) {
          const nextP = easeInOut(Math.max(0, Math.min(1, scrolled / SCROLL_PER_CARD)));
          el.style.transform = `scale(${1 - nextP * 0.02})`;
        } else {
          const p     = easeInOut(Math.max(0, Math.min(1, (scrolled - (i - 1) * SCROLL_PER_CARD) / SCROLL_PER_CARD)));
          const nextP = easeInOut(Math.max(0, Math.min(1, (scrolled - i * SCROLL_PER_CARD) / SCROLL_PER_CARD)));
          // Slide from viewport bottom (startY) to natural centered position (0)
          el.style.transform = `translateY(${(1 - p) * startY}px) scale(${1 - nextP * 0.02})`;
        }
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update(); // set correct initial state immediately on mount
    return () => window.removeEventListener('scroll', update);
  }, []); // key={activeCategory} on parent remounts this when filter changes

  // Panel is full height so overflow:hidden clips at viewport bottom (cards slide in from there)
  const panelH = `calc(100vh - ${CARD_TOP}px)`;

  return (
    <div ref={containerRef} style={{ height: `calc(70vh + ${totalScroll}px)` }}>
      {/* Always-rendered fixed panel — visibility toggled via DOM, no React re-renders.
          `top` is updated dynamically: follows the card as it scrolls in, then clamps. */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: CARD_TOP,
          left: 0,
          right: 0,
          height: panelH,
          overflow: 'hidden',
          zIndex: 30,
          backgroundColor: 'white',
          visibility: 'hidden', // updated synchronously in scroll handler
        }}
      >
        <div className="container-wide">
          <div style={{ position: 'relative', height: '70vh' }}>
            {events.map((event, i) => (
              <div
                key={event.id}
                ref={el => { cardRefs.current[i] = el; }}
                style={i === 0 ? {
                  position: 'relative',
                  height: '100%',
                  zIndex: 1,
                  transform: 'scale(1)',
                  transformOrigin: 'top center',
                } : {
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  zIndex: i + 1,
                  transform: `translateY(calc(100vh - ${CARD_TOP}px))`,
                  transformOrigin: 'top center',
                }}
              >
                <EventRow event={event} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function CulturalActivitiesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredEvents = activeCategory === 'all'
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCategory);

  function scrollToEvents() {
    document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white animate-[fadeIn_0.4s_ease-out]">

      {/* ── Hero (unchanged) ── */}
      <HeroSection
        image="/cultural_event.jpg"
        imageWidth="w-[52%]"
        gradientWidth="w-3/4"
        contentMaxWidth="lg:max-w-[50%]"
        badge="Campus Life · NHCE"
        headingSmall="New Horizon College of Engineering"
        headingMain="Cultural Activities"
        headingGhost="Grand Celebrations"
        description="Where creativity meets community — 13 annual events, 4 flagship fests, and vibrant celebrations that define the spirit of the NHCE campus."
        button={{ label: 'Explore Events', onClick: scrollToEvents }}
        secondaryButton={{ label: 'Flagship Fests', onClick: () => { setActiveCategory('fests'); scrollToEvents(); } }}
      />

      {/* ── Events ── */}
      <div id="events-section" className="bg-white">
        <div className="container-wide py-12 sm:py-16 lg:py-20">

          {/* Section header */}
          <AnimateIn variant="fade-up">
            <div className="mb-8 sm:mb-10">
              <span className="badge mb-3">All Events</span>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="flex-1">
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-950 leading-tight">
                    The NHCE Campus Calendar
                  </h2>
                  <p className="text-slate-500 text-base mt-2">
                    Every event that makes NHCE campus life vibrant, unforgettable, and full of spirit.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-slate-100">
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                  {cat.label}
                  <span className={`text-xs font-black min-w-[20px] h-5 flex items-center justify-center rounded-full px-1.5 ${
                    activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>{cat.count}</span>
                </button>
              ))}
            </div>
          </AnimateIn>

          <StackedEvents key={activeCategory} events={filteredEvents} />

        </div>
      </div>

      {/* ── CTA ── */}
      <AnimateIn variant="fade-up">
        <div className="bg-gradient-to-br from-navy-800 to-navy-900">
          <div className="container-wide py-16 sm:py-20 text-center">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4 leading-tight">
              Join the Celebration
            </h2>
            <p className="text-white/55 text-base max-w-lg mx-auto mb-8 leading-relaxed">
              From flagship fests to festive traditions — every event at NHCE is an opportunity to create memories, discover talents, and celebrate together.
            </p>
            <a href="/admissions" className="btn-gold">
              Be Part of NHCE
            </a>
          </div>
        </div>
      </AnimateIn>

    </div>
  );
}
