import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ExternalLink, Download, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Types ─────────────────────────────────────────────── */

type Issue = {
  month: string;
  image: string;
  url: string;
  type: 'pdf' | 'interactive';
};

type YearGroup = {
  year: number;
  gradient: string;
  chipBg: string;
  chipText: string;
  issues: Issue[];
};

type CarouselCfg = {
  cardW: number;
  txMap: number[];
  scaleMap: number[];
  opMap: number[];
  maxOff: number;
  containerH: number;
};

/* ─── Data ───────────────────────────────────────────────── */

const DATA: YearGroup[] = [
  {
    year: 2026,
    gradient: 'from-navy-800 to-navy-950',
    chipBg: 'bg-navy-50',
    chipText: 'text-navy-700',
    issues: [
      { month: 'June',     image: '/newsletter/june-26.jpg',  url: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/06/JUNE-Newsletter-2026.pdf',     type: 'pdf' },
      { month: 'May',      image: '/newsletter/may-26.jpg',   url: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/05/May-Newsletter-2026.pdf',      type: 'pdf' },
      { month: 'April',    image: '/newsletter/April-26.jpg', url: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/04/NEWSLETTER-APRIL-2026-1.pdf',  type: 'pdf' },
      { month: 'March',    image: '/newsletter/March-26.jpg', url: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/03/March-Newsletter-2026.pdf',    type: 'pdf' },
      { month: 'February', image: '/newsletter/Feb-26.jpg',   url: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/02/February-Newsletter-2026.pdf', type: 'pdf' },
      { month: 'January',  image: '/newsletter/Jan-26.jpg',   url: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/01/January-Newsletter-2026.pdf',  type: 'pdf' },
    ],
  },
  {
    year: 2025,
    gradient: 'from-blue-700 to-indigo-900',
    chipBg: 'bg-blue-50',
    chipText: 'text-blue-700',
    issues: [
      { month: 'December',  image: '/newsletter/dec-25.jpg',   url: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/12/December-Newsletter-2025.pdf', type: 'pdf' },
      { month: 'November',  image: '/newsletter/nov-25.jpg',   url: 'https://online.pubhtml5.com/gdes/wxlb/', type: 'interactive' },
      { month: 'October',   image: '/newsletter/oct-25.jpg',   url: 'https://online.pubhtml5.com/gdes/zdqj/', type: 'interactive' },
      { month: 'September', image: '/newsletter/sept-25.jpg',  url: 'https://online.pubhtml5.com/gdes/zdqj/', type: 'interactive' },
      { month: 'August',    image: '/newsletter/aug-25.jpg',   url: 'https://online.pubhtml5.com/gdes/zdqj/', type: 'interactive' },
      { month: 'July',      image: '/newsletter/july-25.jpg',  url: 'https://online.pubhtml5.com/gdes/jjpf/', type: 'interactive' },
      { month: 'June',      image: '/newsletter/june-25.jpg',  url: 'https://online.pubhtml5.com/gdes/ivwd/', type: 'interactive' },
      { month: 'May',       image: '/newsletter/may-25.jpg',   url: 'https://online.pubhtml5.com/gdes/ovsf/', type: 'interactive' },
      { month: 'April',     image: '/newsletter/april-25.jpg', url: 'https://online.pubhtml5.com/gdes/fbvk/', type: 'interactive' },
      { month: 'March',     image: '/newsletter/march-25.jpg', url: 'https://online.pubhtml5.com/gdes/iytp/', type: 'interactive' },
      { month: 'February',  image: '/newsletter/fab-25.jpg',   url: 'https://online.pubhtml5.com/gdes/cwbu/', type: 'interactive' },
      { month: 'January',   image: '/newsletter/jan-25.jpg',   url: 'https://online.pubhtml5.com/gdes/vbim/', type: 'interactive' },
    ],
  },
  {
    year: 2024,
    gradient: 'from-violet-700 to-purple-900',
    chipBg: 'bg-violet-50',
    chipText: 'text-violet-700',
    issues: [
      { month: 'December',  image: '/newsletter/dec-24.jpg',   url: 'https://online.pubhtml5.com/gdes/foaf/', type: 'interactive' },
      { month: 'November',  image: '/newsletter/nov-24.png',   url: 'https://online.pubhtml5.com/gdes/hemb/', type: 'interactive' },
      { month: 'October',   image: '/newsletter/oct-24.jpg',   url: 'https://online.pubhtml5.com/gdes/wgwn/', type: 'interactive' },
      { month: 'September', image: '/newsletter/sept-24.png',  url: 'https://online.pubhtml5.com/gdes/xwpy/', type: 'interactive' },
      { month: 'August',    image: '/newsletter/aug-24.png',   url: 'https://online.pubhtml5.com/gdes/awqw/', type: 'interactive' },
      { month: 'July',      image: '/newsletter/july-24.jpg',  url: 'https://online.pubhtml5.com/gdes/erdm/', type: 'interactive' },
      { month: 'June',      image: '/newsletter/june-24.png',  url: 'https://online.pubhtml5.com/gdes/xucy/', type: 'interactive' },
      { month: 'May',       image: '/newsletter/may-24.png',   url: 'https://online.pubhtml5.com/gdes/nqop/', type: 'interactive' },
      { month: 'April',     image: '/newsletter/April-24.png', url: 'https://online.pubhtml5.com/gdes/lspt/', type: 'interactive' },
      { month: 'March',     image: '/newsletter/march-24.png', url: 'https://online.pubhtml5.com/gdes/fgpc/', type: 'interactive' },
      { month: 'February',  image: '/newsletter/feb-24.png',   url: 'https://online.pubhtml5.com/gdes/qaxa/', type: 'interactive' },
      { month: 'January',   image: '/newsletter/jan-24.png',   url: 'https://online.pubhtml5.com/gdes/qbhf/', type: 'interactive' },
    ],
  },
];

/* ─── Responsive carousel config ────────────────────────── */

function getCarouselCfg(): CarouselCfg {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  if (w < 640) {
    return { cardW: 245, txMap: [0, 218], scaleMap: [1, 0.75], opMap: [1, 0.55], maxOff: 1, containerH: 340 };
  }
  if (w < 1024) {
    return { cardW: 278, txMap: [0, 268, 490], scaleMap: [1, 0.80, 0.63], opMap: [1, 0.70, 0.42], maxOff: 2, containerH: 385 };
  }
  return { cardW: 310, txMap: [0, 315, 580], scaleMap: [1, 0.82, 0.65], opMap: [1, 0.75, 0.46], maxOff: 2, containerH: 425 };
}

/* ─── Carousel Card ─────────────────────────────────────── */

function CarouselCard({ issue, year, isActive, chipText, cardW }: {
  issue: Issue; year: number; isActive: boolean; chipText: string; cardW: number;
}) {
  const imgH = Math.round(cardW * 0.74);

  return (
    <div
      style={{ width: cardW }}
      className={`flex flex-col bg-white rounded-2xl overflow-hidden select-none transition-shadow duration-500 ${
        isActive
          ? 'shadow-[0_16px_56px_rgba(0,0,0,0.20)]'
          : 'shadow-[0_2px_14px_rgba(0,0,0,0.09)]'
      }`}
    >
      {/* Cover image */}
      <div style={{ height: imgH }} className="overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={issue.image}
          alt={`${issue.month} ${year}`}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-[0.96]'}`}
        />
      </div>

      {/* Card body */}
      <div className="px-4 pt-3 pb-3.5">
        <p className="font-display font-black text-navy-950 text-[15px] leading-tight">{issue.month} {year}</p>
        <p className="text-slate-400 text-[11px] mt-0.5 mb-3">New Horizon Express</p>
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-semibold">
            {issue.type === 'pdf'
              ? <Download size={9} strokeWidth={2} />
              : <BookOpen size={9} strokeWidth={2} />}
            {issue.type === 'pdf' ? 'PDF' : 'Interactive'}
          </div>
          {isActive && (
            <span className={`${chipText} text-[10px] font-bold flex items-center gap-1`}>
              Open <ExternalLink size={9} strokeWidth={2} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Carousel ─────────────────────────────────────────── */

function NewsletterCarousel({ group }: { group: YearGroup }) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);       // hover pause
  const manualRef = useRef(false);       // manual-nav pause
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cfg, setCfg] = useState<CarouselCfg>(getCarouselCfg);

  useEffect(() => {
    const handler = () => setCfg(getCarouselCfg());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const { issues, year, chipText } = group;
  const { cardW, txMap, scaleMap, opMap, maxOff, containerH } = cfg;

  // Manual navigation — pauses auto-play for 6 s then resumes
  function manualNav(delta: number) {
    manualRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { manualRef.current = false; }, 6000);
    setActive(a => (a + delta + issues.length) % issues.length);
  }

  const prev = () => manualNav(-1);
  const next = () => manualNav(1);

  // Auto-play — mounts once per year group, fires every 3.5 s
  useEffect(() => {
    const len = issues.length;
    const id = setInterval(() => {
      if (!pausedRef.current && !manualRef.current) setActive(a => (a + 1) % len);
    }, 3500);
    return () => {
      clearInterval(id);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Circular offset so wrapping cards appear on the correct side
  function circularOffset(i: number): number {
    let offset = i - active;
    const half = Math.floor(issues.length / 2);
    if (offset > half) offset -= issues.length;
    if (offset < -half) offset += issues.length;
    return offset;
  }

  function cardStyle(i: number): CSSProperties {
    const offset = circularOffset(i);
    const abs = Math.abs(offset);
    if (abs > maxOff) return { display: 'none' };
    const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;
    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translateX(calc(-50% + ${sign * txMap[abs]}px)) translateY(-50%) scale(${scaleMap[abs]})`,
      opacity: opMap[abs],
      zIndex: (maxOff + 1 - abs) * 5,
      transition: 'all 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  }

  return (
    <div>
      {/* ── Track ── */}
      <div className="relative overflow-hidden" style={{ height: containerH }}>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 lg:w-36 bg-gradient-to-r from-white to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 lg:w-36 bg-gradient-to-l from-white to-transparent z-30 pointer-events-none" />

        {/* Cards — pause auto-play only while hovering a card */}
        {issues.map((issue, i) => (
          <div
            key={`${year}-${issue.month}`}
            style={cardStyle(i)}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <a
              href={issue.url}
              target={i === active ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => { if (i !== active) { e.preventDefault(); setActive(i); } }}
            >
              <CarouselCard issue={issue} year={year} isActive={i === active} chipText={chipText} cardW={cardW} />
            </a>
          </div>
        ))}

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous issue"
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-full shadow-[0_2px_14px_rgba(0,0,0,0.14)] flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-200"
        >
          <ChevronLeft size={17} className="text-slate-600" strokeWidth={2.5} />
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next issue"
          className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-full shadow-[0_2px_14px_rgba(0,0,0,0.14)] flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-200"
        >
          <ChevronRight size={17} className="text-slate-600" strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function NewslettersPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeYear, setActiveYear] = useState<number>(DATA[0].year);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  // Slide the indicator to the active tab
  useEffect(() => {
    const idx = DATA.findIndex(d => d.year === activeYear);
    const btn = tabRefs.current[idx];
    if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [activeYear]);

  const activeGroup = DATA.find(d => d.year === activeYear)!;
  const totalIssues = DATA.reduce((s, d) => s + d.issues.length, 0);

  return (
    <div className="min-h-screen animate-[fadeIn_0.4s_ease-out]">

      {/* ── Hero ── */}
      <HeroSection
        image="/admission_cover.jpg"
        imageWidth="w-[50%]"
        gradientWidth="w-3/4"
        contentMaxWidth="lg:max-w-[50%]"
        badge="Publications · NHCE"
        headingSmall="New Horizon College of Engineering"
        headingMain="Newsletters"
        headingGhost="New Horizon Express"
        description="Stay connected with campus life, achievements, events and updates through our monthly newsletter — New Horizon Express."
        button={{ label: 'Browse Issues', to: '#issues' }}
        secondaryButton={{ label: 'Contact Us', to: '/contact' }}
      />


      {/* ── Issues ── */}
      <div id="issues" className="container-wide py-24 sm:py-24">

        {/* Year selector */}
        <AnimateIn variant="fade-up">
          <div className="mb-10 sm:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-slate-400 mb-4">Browse by Year</p>
            <div className="relative inline-flex items-center bg-slate-100 rounded-full p-2 gap-8 lg:gap-8">
              {/* Sliding pill */}
              <div
                className="absolute top-2 bottom-2 bg-navy-900 rounded-full shadow-sm pointer-events-none"
                style={{
                  left: pill.left,
                  width: pill.width,
                  transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
              {DATA.map((d, i) => (
                <button
                  key={d.year}
                  ref={el => { tabRefs.current[i] = el; }}
                  onClick={() => setActiveYear(d.year)}
                  className={`relative z-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl text-sm font-bold transition-colors duration-300 ${
                    activeYear === d.year ? 'text-white' : 'text-slate-500 hover:text-navy-800'
                  }`}
                >
                  {d.year}
                  {/* <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                    activeYear === d.year ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {d.issues.length}
                  </span> */}
                </button>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Section heading */}
        <AnimateIn variant="fade-up">
          <div className="flex items-end justify-between mb-10 pb-5 border-b border-slate-200">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
              {activeYear}{activeYear !== new Date().getFullYear() && <span className="text-slate-300 font-light"> Archive</span>}
            </h2>
            <p className="hidden sm:block text-slate-400 text-sm">{activeGroup.issues.length} issues</p>
          </div>
        </AnimateIn>

        {/* Coverflow carousel — remounts on year change to reset active index */}
        <AnimateIn variant="fade-up" delay={60}>
          <NewsletterCarousel key={activeYear} group={activeGroup} />
        </AnimateIn>

      </div>
    </div>
  );
}
