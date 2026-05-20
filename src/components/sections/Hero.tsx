import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 0,
    image: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/04/admission_open_desk.jpg',
    mobileImage: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/04/admission_open_mobile.jpg',
    alt: 'Admissions Open 2025–26',
  },
  {
    id: 1,
    image: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/01/48-hours-HACKATHON-1-scaled.jpg',
    mobileImage: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/01/48-hours-HACKATHON-mobile-1.jpg',
    alt: '48-Hour Hackathon at NHCE',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progKey, setProgKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const total = SLIDES.length;

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setProgKey(k => k + 1);
      setAnimating(false);
    }, 500);
  }, [animating, current]);

  const goNext = useCallback(() => goTo((current + 1) % total), [current, goTo, total]);
  const goPrev = useCallback(() => goTo((current - 1 + total) % total), [current, goTo, total]);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(goNext, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [goNext, paused]);

  return (
    <section
      className="relative bg-gray-900 overflow-hidden sm:[min-height:60vh]"
      style={{ minHeight: '60vh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; setPaused(true); }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta < -50) goNext();
        else if (delta > 50) goPrev();
        touchStartX.current = null;
        setPaused(false);
      }}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* Desktop image */}
          <img
            src={s.image}
            alt={s.alt}
            className="hidden sm:block w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Mobile image */}
          <img
            src={s.mobileImage}
            alt={s.alt}
            className="block sm:hidden w-full h-full object-cover object-top"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Prev arrow */}
      <button
        onClick={goPrev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next arrow */}
      <button
        onClick={goNext}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative overflow-hidden rounded-full transition-all duration-300 focus:outline-none"
            style={{ width: i === current ? 32 : 8, height: 8, background: i === current ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.5)' }}
          >
            {i === current && (
              <div
                key={progKey}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: '#f59e0b', animation: paused ? 'none' : 'dotFill 6s linear forwards' }}
              />
            )}
          </button>
        ))}
      </div>

      <style>{`@keyframes dotFill { from{width:0%} to{width:100%} }`}</style>
    </section>
  );
}
