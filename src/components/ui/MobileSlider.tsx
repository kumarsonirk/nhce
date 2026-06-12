import { useRef, useState, useEffect } from 'react';
import React from 'react';

export default function MobileSlider({
  children,
  desktopClass,
}: {
  children: React.ReactNode;
  desktopClass: string;
}) {
  const items = React.Children.toArray(children);
  const n     = items.length;

  // Layout: [clone-last, ...real items, clone-first]
  // Indices: 0 = clone-last | 1…n = real | n+1 = clone-first
  const extended = n > 1 ? [items[n - 1], ...items, items[0]] : items;

  const [extIdx, setExtIdx]           = useState(n > 1 ? 1 : 0); // start at real-0
  const [transitioning, setTransitioning] = useState(true);
  const [dragging, setDragging]       = useState(false);
  const [dragOffset, setDragOffset]   = useState(0);

  const pausedRef      = useRef(false);
  const userStoppedRef = useRef(false);
  const touchStartX    = useRef(0);
  const touchStartY    = useRef(0);
  const touchCurrX     = useRef(0);
  const axisLocked     = useRef<boolean | null>(null);
  const containerRef   = useRef<HTMLDivElement>(null);

  // Real index (0-based) for dots
  const realIdx =
    n > 1
      ? extIdx === 0 ? n - 1 : extIdx === n + 1 ? 0 : extIdx - 1
      : 0;

  // After reaching a clone, silently jump to the real counterpart
  useEffect(() => {
    if (n <= 1) return;
    if (extIdx !== 0 && extIdx !== n + 1) return;

    const target = extIdx === 0 ? n : 1;
    const t = setTimeout(() => {
      setTransitioning(false);
      setExtIdx(target);
      // Re-enable transition after the DOM has painted the silent jump
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitioning(true))
      );
    }, 460); // matches transition duration

    return () => clearTimeout(t);
  }, [extIdx, n]);

  // Autoplay
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (n <= 1) return;
    autoRef.current = setInterval(() => {
      if (pausedRef.current || userStoppedRef.current) return;
      setTransitioning(true);
      setExtIdx(prev => prev + 1);
    }, 3500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [n]);

  // Hover → pause autoplay
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const pause  = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    return () => {
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, []);

  // ── Touch ───────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrX.current  = e.touches[0].clientX;
    axisLocked.current  = null;
    setDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    // Lock axis on first significant movement
    if (axisLocked.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      axisLocked.current = Math.abs(dx) >= Math.abs(dy);
    }

    if (axisLocked.current) {
      touchCurrX.current = e.touches[0].clientX;
      setDragOffset(dx);
    }
  };

  const onTouchEnd = () => {
    const dx = touchCurrX.current - touchStartX.current;
    setDragging(false);
    setDragOffset(0);

    if (axisLocked.current && Math.abs(dx) > 50) {
      userStoppedRef.current = true; // manual swipe stops autoplay
      setTransitioning(true);
      setExtIdx(prev => (dx < 0 ? prev + 1 : prev - 1));
    }

    axisLocked.current = null;
  };

  const goTo = (idx: number) => {
    setTransitioning(true);
    setExtIdx(idx + 1);
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <>
      {/* Mobile looping slider */}
      <div className="md:hidden" ref={containerRef}>
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(-${extIdx * 100}% + ${dragOffset}px))`,
              transition:
                dragging || !transitioning
                  ? 'none'
                  : 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            {extended.map((child, i) => (
              <div key={i} className="flex-none w-full">
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {n > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  realIdx === i
                    ? 'w-5 h-2 bg-navy-700'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop grid — unchanged */}
      <div className={`hidden md:grid ${desktopClass}`}>
        {children}
      </div>
    </>
  );
}
