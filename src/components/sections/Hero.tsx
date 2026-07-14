import { useState, useEffect, useRef, useCallback } from 'react';

const SLIDES = [
  {
    id: 0,
    image: '/main_banner1.jpg',
    mobileImage: '/banner1.jpeg',
    alt: 'Admission',
  },
  {
    id: 1,
    image: '/sargam1.png',
    mobileImage: '/sargam_mobile.png',
    alt: 'Sargam 2026',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progKey, setProgKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
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

  // Desktop mouse-drag swipe support (mirrors the touch swipe logic below)
  useEffect(() => {
    if (!dragging) return;
    const handleMouseUp = (e: MouseEvent) => {
      if (dragStartX.current !== null) {
        const dx = e.clientX - dragStartX.current;
        if (Math.abs(dx) > 40) {
          if (dx < 0) goNext();
          else goPrev();
        }
      }
      dragStartX.current = null;
      setPaused(false);
      setDragging(false);
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [dragging, goNext, goPrev]);

  return (
    <section
      className="relative bg-gray-900 overflow-hidden h-[95svh] select-none"
      style={{ touchAction: 'pan-y', cursor: 'grab' }}
      onMouseDown={(e) => {
        dragStartX.current = e.clientX;
        setPaused(true);
        setDragging(true);
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        // Only trigger slide if horizontal swipe dominates (not a vertical scroll)
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          if (dx < 0) goNext();
          else goPrev();
        }
        touchStartX.current = null;
        touchStartY.current = null;
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
            className="hidden sm:block w-full h-full object-cover pointer-events-none"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Mobile image */}
          <img
            src={s.mobileImage}
            alt={s.alt}
            className="block sm:hidden w-full h-full object-cover object-center pointer-events-none"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}


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
