import { useRef, useState, useEffect, useCallback } from 'react';
import React from 'react';

export default function MobileSlider({
  children,
  desktopClass,
}: {
  children: React.ReactNode;
  desktopClass: string;
}) {
  const items = React.Children.toArray(children);
  const n = items.length;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const jumping = useRef(false);

  // Layout: [clone-of-last, ...real-items, clone-of-first]
  const cloned = n > 1 ? [items[n - 1], ...items, items[0]] : items;

  // Jump without animation by directly setting scrollLeft
  const jumpTo = useCallback((realIdx: number) => {
    const el = ref.current;
    if (!el) return;
    // realIdx is 0-based within real items; stored at position realIdx+1 in cloned array
    el.scrollLeft = (realIdx + 1) * el.offsetWidth;
  }, []);

  // Smooth scroll to a real index (used by dot clicks)
  const goTo = useCallback((realIdx: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: (realIdx + 1) * el.offsetWidth, behavior: 'smooth' });
    setActive(realIdx);
  }, []);

  // Start on real item 0 (position 1 in cloned array)
  useEffect(() => {
    const el = ref.current;
    if (!el || n <= 1) return;
    el.scrollLeft = el.offsetWidth;
  }, [n]);

  // Detect scroll settle → update dot + handle loop jump
  useEffect(() => {
    const el = ref.current;
    if (!el || n <= 1) return;

    let timer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      if (jumping.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const idx = Math.round(el.scrollLeft / el.offsetWidth);

        if (idx === 0) {
          jumping.current = true;
          el.scrollLeft = n * el.offsetWidth;
          setActive(n - 1);
          setTimeout(() => { jumping.current = false; }, 50);
        } else if (idx === n + 1) {
          jumping.current = true;
          el.scrollLeft = el.offsetWidth;
          setActive(0);
          setTimeout(() => { jumping.current = false; }, 50);
        } else {
          setActive(idx - 1);
        }
      }, 120);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); clearTimeout(timer); };
  }, [n, jumpTo]);

  // Autoplay: advance to next slide every 3s, pause on touch
  useEffect(() => {
    const el = ref.current;
    if (!el || n <= 1) return;

    let paused = false;
    const play = () => {
      if (paused || jumping.current) return;
      setActive(prev => {
        const next = (prev + 1) % n;
        el.scrollTo({ left: (next + 1) * el.offsetWidth, behavior: 'smooth' });
        return next;
      });
    };

    const interval = setInterval(play, 3000);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume, { passive: true });

    return () => {
      clearInterval(interval);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [n]);

  return (
    <>
      {/* Mobile: looping snap slider */}
      <div className="md:hidden">
        <div
          ref={ref}
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cloned.map((child, i) => (
            <div key={i} className="flex-none w-full snap-start">
              {child}
            </div>
          ))}
        </div>

        {n > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  active === i ? 'w-5 h-2 bg-navy-700' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: normal grid */}
      <div className={`hidden md:grid ${desktopClass}`}>
        {children}
      </div>
    </>
  );
}
